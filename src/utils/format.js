/**
 * Format integer rupiah menjadi string, contoh: Rp 25.000
 * @param {number} amount - integer rupiah
 * @returns {string}
 */
export function formatRupiah(amount) {
  const formatted = Math.abs(amount)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, '.')

  return amount < 0 ? `-Rp ${formatted}` : `Rp ${formatted}`
}

/**
 * Buat teks rincian lengkap split bill yang siap dikirim ke WhatsApp
 * @param {{ people: Array, items: Array, charges: Object }} state
 * @param {{ perPerson: Array, grandTotal: number, unassignedItems: Array }} summary
 * @returns {string}
 */
export function buildCompleteReceiptText(state, summary) {
  const { people, items, charges } = state
  if (!people.length && !items.length) return ''

  const personMap = {}
  people.forEach((p) => {
    personMap[p.id] = p.name
  })

  const lines = [
    '🧾 *RINCIAN LENGKAP SPLIT BILL*',
    '================================',
    '',
  ]

  // 1. Daftar Pesanan
  if (items.length > 0) {
    lines.push('📋 *DAFTAR PESANAN:*')
    items.forEach((item, idx) => {
      const itemSubtotal = item.price * item.qty
      const qtyStr = item.qty > 1 ? ` (${item.qty}x @ ${formatRupiah(item.price)})` : ''
      lines.push(`${idx + 1}. ${item.name}${qtyStr} = ${formatRupiah(itemSubtotal)}`)
      if (item.sharedBy.length > 0) {
        const names = item.sharedBy.map((id) => personMap[id] || 'Teman').join(', ')
        lines.push(`   👥 Ikut: ${names}`)
      } else {
        lines.push('   ⚠️ Belum ada yang ikut')
      }
    })
    lines.push('')
  }

  // 2. Subtotal & Biaya Tambahan
  const totalSubtotal = summary.perPerson.reduce((acc, p) => acc + p.subtotal, 0)
  lines.push('💰 *TOTAL BIAYA:*')
  lines.push(`• Subtotal: ${formatRupiah(totalSubtotal)}`)

  if (charges.discount.value > 0) {
    const discLabel = charges.discount.type === 'percent' ? ` (${charges.discount.value}%)` : ''
    const totalDiscount = summary.perPerson.reduce((acc, p) => acc + p.discount, 0)
    lines.push(`• Diskon${discLabel}: -${formatRupiah(totalDiscount)}`)
  }

  if (charges.service.value > 0) {
    const srvLabel = charges.service.type === 'percent' ? ` (${charges.service.value}%)` : ''
    const totalService = summary.perPerson.reduce((acc, p) => acc + p.service, 0)
    lines.push(`• Service${srvLabel}: +${formatRupiah(totalService)}`)
  }

  if (charges.tax.value > 0) {
    const taxLabel = charges.tax.type === 'percent' ? ` (${charges.tax.value}%)` : ''
    const totalTax = summary.perPerson.reduce((acc, p) => acc + p.tax, 0)
    lines.push(`• Pajak/PPN${taxLabel}: +${formatRupiah(totalTax)}`)
  }

  lines.push(`*GRAND TOTAL: ${formatRupiah(summary.grandTotal)}*`)
  lines.push('')
  lines.push('--------------------------------')

  // 3. Rincian Per Orang
  lines.push('👥 *PEMBAGIAN PER ORANG:*')
  lines.push('')

  summary.perPerson.forEach((pSummary) => {
    const personName = personMap[pSummary.personId] || 'Teman'
    const personalItems = items.filter((item) =>
      item.sharedBy.includes(pSummary.personId)
    )

    lines.push(`*${personName}* ➔ *${formatRupiah(pSummary.total)}*`)
    if (personalItems.length > 0) {
      personalItems.forEach((item) => {
        const portion = Math.floor(
          (item.price * item.qty) / item.sharedBy.length
        )
        const shareNote = item.sharedBy.length > 1 ? ` (1/${item.sharedBy.length})` : ''
        lines.push(`  • ${item.name}${shareNote}: ${formatRupiah(portion)}`)
      })
    }

    // Detail biaya per orang jika ada diskon/service/pajak
    const hasExtra = pSummary.discount > 0 || pSummary.service > 0 || pSummary.tax > 0
    if (hasExtra) {
      const extraDetails = []
      if (pSummary.discount > 0) extraDetails.push(`Diskon -${formatRupiah(pSummary.discount)}`)
      if (pSummary.service > 0) extraDetails.push(`Service +${formatRupiah(pSummary.service)}`)
      if (pSummary.tax > 0) extraDetails.push(`Pajak +${formatRupiah(pSummary.tax)}`)
      lines.push(`  ℹ️ ${extraDetails.join(' | ')}`)
    }
    lines.push('')
  })

  lines.push('================================')
  lines.push('Dihitung dengan Split Bill')

  return lines.join('\n')
}
