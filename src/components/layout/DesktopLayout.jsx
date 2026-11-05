import { useMemo, useState } from 'react'
import Header from './Header.jsx'
import PeopleSection from '../people/PeopleSection.jsx'
import ItemList from '../items/ItemList.jsx'
import ChargesForm from '../charges/ChargesForm.jsx'
import SummaryCard from '../summary/SummaryCard.jsx'
import Toast from '../ui/Toast.jsx'
import { useBill } from '../../context/BillContext.jsx'
import { calculateSummary } from '../../utils/calculate.js'
import { buildCompleteReceiptText } from '../../utils/format.js'

export default function DesktopLayout() {
  const state = useBill()
  const { people, items } = state
  const [copied, setCopied] = useState(false)

  const summary = useMemo(() => calculateSummary(state), [state])

  const copyText = useMemo(() => {
    return buildCompleteReceiptText(state, summary)
  }, [state, summary])

  async function handleCopy() {
    if (!copyText) return
    try {
      await navigator.clipboard.writeText(copyText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2200)
    } catch {
      // ignore
    }
  }

  const hasData = people.length > 0 || items.length > 0

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header isDesktop onCopy={handleCopy} hasData={hasData} />

      <main className="w-full px-6 lg:px-8 py-5 flex-1">
        <div className="grid grid-cols-12 gap-6 items-start">
          {/* Panel Kiri: Peserta & Biaya Tambahan */}
          <div className="col-span-12 lg:col-span-4 xl:col-span-3 space-y-5">
            <PeopleSection />
            <ChargesForm />
          </div>

          {/* Panel Tengah: Pesanan (Sejajar persis dengan Peserta & Ringkasan) */}
          <div className="col-span-12 lg:col-span-8 xl:col-span-5">
            <ItemList showInlineForm />
          </div>

          {/* Panel Kanan: Ringkasan & Total Tagihan (Sticky hanya jika halaman memanjang) */}
          <div className="col-span-12 lg:col-span-12 xl:col-span-4 sticky top-20 self-start space-y-4">
            <SummaryCard showTotalCard />
          </div>
        </div>
      </main>

      <Toast show={copied} message="Rincian lengkap siap dikirim ke WhatsApp!" />
    </div>
  )
}
