import { useMemo } from 'react'
import { AlertCircle } from 'lucide-react'
import Card from '../ui/Card.jsx'
import Badge from '../ui/Badge.jsx'
import EmptyState from '../ui/EmptyState.jsx'
import { CoinsIllustration } from '../ui/Illustration.jsx'
import PersonBreakdown from './PersonBreakdown.jsx'
import TotalCard from './TotalCard.jsx'
import { useBill } from '../../context/BillContext.jsx'
import { calculateSummary } from '../../utils/calculate.js'
import { buildCompleteReceiptText } from '../../utils/format.js'

export default function SummaryCard({ showTotalCard = true }) {
  const state = useBill()
  const { people, items } = state

  const summary = useMemo(() => calculateSummary(state), [state])

  const unassignedItemsList = useMemo(() => {
    return summary.unassignedItems.map((id) => {
      const item = items.find((i) => i.id === id)
      return item || { id, name: 'Item tanpa nama' }
    })
  }, [summary.unassignedItems, items])

  const copyText = useMemo(() => {
    return buildCompleteReceiptText(state, summary)
  }, [state, summary])

  if (people.length === 0 && items.length === 0) {
    return (
      <Card title="Ringkasan" className="ticket">
        <EmptyState
          illustration={<CoinsIllustration />}
          message="Hasil perhitungan kosong."
          description="Isi peserta dan pesanan dulu, nanti dihitung otomatis."
        />
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {/* Warning if items have no people */}
      {unassignedItemsList.length > 0 && (
        <div className="p-3.5 rounded-xl border-2 border-warning bg-amber-50/70 dark:bg-amber-950/40 text-amber-950 dark:text-amber-200 shadow-[2px_2px_0_0_var(--warning)]">
          <div className="flex items-center gap-2 mb-1.5">
            <AlertCircle size={18} className="text-warning shrink-0" />
            <h4 className="font-bold text-xs uppercase tracking-wider">
              {unassignedItemsList.length} menu belum ada yang ikut:
            </h4>
          </div>
          <div className="flex flex-wrap gap-1.5 ml-6">
            {unassignedItemsList.map((item) => (
              <Badge key={item.id} variant="warning">
                {item.name}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Breakdown per orang */}
      <Card
        title="Ringkasan per Orang"
        subtitle={`${people.length} orang patungan`}
        className="ticket"
      >
        {people.length === 0 ? (
          <p className="text-sm text-muted-foreground italic text-center py-4">
            Belum ada peserta yang dimasukkan.
          </p>
        ) : (
          <div className="space-y-2.5">
            {people.map((person, index) => {
              const pSummary = summary.perPerson.find(
                (p) => p.personId === person.id
              )
              return (
                <PersonBreakdown
                  key={person.id}
                  person={person}
                  index={index}
                  items={items}
                  summaryItem={pSummary}
                />
              )
            })}
          </div>
        )}
      </Card>

      {/* Total Card */}
      {showTotalCard && (
        <TotalCard grandTotal={summary.grandTotal} copyText={copyText} />
      )}
    </div>
  )
}
