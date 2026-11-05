/**
 * Hitung ringkasan pembagian tagihan
 *
 * Aturan:
 * 1. subtotal item = harga x qty, dibagi rata ke peserta di sharedBy
 * 2. Urutan: subtotal, diskon, service, pajak
 * 3. Diskon, service, pajak dibagi proporsional terhadap subtotal tiap peserta
 * 4. Dibulatkan ke rupiah, selisih pembulatan ditambahkan ke peserta dengan porsi terbesar
 * 5. Item tanpa peserta tidak dihitung, ditandai peringatan
 *
 * @param {{ people, items, charges }} state
 * @returns {{ perPerson: Array, grandTotal: number, unassignedItems: string[] }}
 */
export function calculateSummary(state) {
  const { people, items, charges } = state

  // Cari item tanpa peserta
  const unassignedItems = items
    .filter((item) => item.sharedBy.length === 0)
    .map((item) => item.id)

  // Item yang punya peserta
  const assignedItems = items.filter((item) => item.sharedBy.length > 0)

  if (people.length === 0 || assignedItems.length === 0) {
    return {
      perPerson: people.map((p) => ({
        personId: p.id,
        subtotal: 0,
        discount: 0,
        service: 0,
        tax: 0,
        total: 0,
      })),
      grandTotal: 0,
      unassignedItems,
    }
  }

  // Hitung subtotal per orang
  const subtotals = {}
  for (const person of people) {
    subtotals[person.id] = 0
  }

  for (const item of assignedItems) {
    const itemTotal = item.price * item.qty
    const shareCount = item.sharedBy.length
    const perPerson = Math.floor(itemTotal / shareCount)
    const remainder = itemTotal - perPerson * shareCount

    for (let i = 0; i < item.sharedBy.length; i++) {
      const pid = item.sharedBy[i]
      if (subtotals[pid] !== undefined) {
        subtotals[pid] += perPerson + (i < remainder ? 1 : 0)
      }
    }
  }

  // Total subtotal semua orang
  const totalSubtotal = Object.values(subtotals).reduce((a, b) => a + b, 0)

  if (totalSubtotal === 0) {
    return {
      perPerson: people.map((p) => ({
        personId: p.id,
        subtotal: 0,
        discount: 0,
        service: 0,
        tax: 0,
        total: 0,
      })),
      grandTotal: 0,
      unassignedItems,
    }
  }

  // Hitung nilai charges
  function resolveCharge(charge, base) {
    if (charge.type === 'percent') {
      return Math.round((base * charge.value) / 100)
    }
    return charge.value
  }

  const totalDiscount = resolveCharge(charges.discount, totalSubtotal)
  const afterDiscount = totalSubtotal - totalDiscount
  const totalService = resolveCharge(charges.service, afterDiscount)
  const afterService = afterDiscount + totalService
  const totalTax = resolveCharge(charges.tax, afterService)
  const grandTotal = afterService + totalTax

  // Bagi proporsional ke tiap orang
  const result = people.map((person) => {
    const sub = subtotals[person.id] || 0
    const ratio = sub / totalSubtotal

    return {
      personId: person.id,
      subtotal: sub,
      discountExact: totalDiscount * ratio,
      serviceExact: totalService * ratio,
      taxExact: totalTax * ratio,
    }
  })

  // Bulatkan dan distribusi selisih
  const rounded = result.map((r) => ({
    personId: r.personId,
    subtotal: r.subtotal,
    discount: Math.round(r.discountExact),
    service: Math.round(r.serviceExact),
    tax: Math.round(r.taxExact),
  }))

  // Hitung total per orang
  rounded.forEach((r) => {
    r.total = r.subtotal - r.discount + r.service + r.tax
  })

  // Cek selisih pembulatan
  const sumTotals = rounded.reduce((a, r) => a + r.total, 0)
  const diff = grandTotal - sumTotals

  if (diff !== 0) {
    // Tambahkan selisih ke peserta dengan porsi terbesar
    let maxIdx = 0
    let maxSubtotal = 0
    for (let i = 0; i < rounded.length; i++) {
      if (rounded[i].subtotal > maxSubtotal) {
        maxSubtotal = rounded[i].subtotal
        maxIdx = i
      }
    }
    rounded[maxIdx].total += diff
  }

  return {
    perPerson: rounded,
    grandTotal,
    unassignedItems,
  }
}
