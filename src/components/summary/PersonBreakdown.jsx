import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import Avatar from '../ui/Avatar.jsx'
import { formatRupiah } from '../../utils/format.js'

export default function PersonBreakdown({
  person,
  index = 0,
  items = [],
  summaryItem = null,
}) {
  const [expanded, setExpanded] = useState(false)

  if (!summaryItem) return null

  // Find which items this person shares
  const personalItems = items.filter((item) =>
    item.sharedBy.includes(person.id)
  )

  return (
    <div className="border-2 border-border rounded-xl bg-card overflow-hidden transition-all duration-150">
      <div
        onClick={() => setExpanded(!expanded)}
        className="flex items-center justify-between p-3.5 hover:bg-secondary/40 cursor-pointer select-none transition-colors"
      >
        <div className="flex items-center gap-3">
          <Avatar name={person.name} index={index} size="md" />
          <div>
            <h4 className="font-bold text-base text-foreground leading-tight">
              {person.name}
            </h4>
            <span className="text-xs text-muted-foreground font-semibold">
              {personalItems.length} menu yang diikuti
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-lg font-extrabold tabular-nums text-foreground">
            {formatRupiah(summaryItem.total)}
          </span>
          <div className="p-1 rounded-full text-muted-foreground hover:text-foreground">
            {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </div>
        </div>
      </div>

      {expanded && (
        <div className="px-4 pb-4 pt-2 border-t-2 border-dashed border-border/40 bg-secondary/15 text-sm space-y-2.5 animate-in fade-in duration-150">
          <div className="space-y-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Rincian Menu:
            </span>
            {personalItems.length === 0 ? (
              <p className="text-xs text-muted-foreground italic">
                Tidak ada menu yang diikuti.
              </p>
            ) : (
              personalItems.map((item) => {
                const portion = Math.floor(
                  (item.price * item.qty) / item.sharedBy.length
                )
                return (
                  <div
                    key={item.id}
                    className="flex items-center justify-between text-xs py-0.5"
                  >
                    <span className="truncate max-w-[180px] text-foreground font-medium">
                      {item.name} {item.qty > 1 ? `(${item.qty}x)` : ''}
                      <span className="text-muted-foreground ml-1">
                        ÷ {item.sharedBy.length} org
                      </span>
                    </span>
                    <span className="tabular-nums font-bold text-foreground">
                      {formatRupiah(portion)}
                    </span>
                  </div>
                )
              })
            )}
          </div>

          <div className="border-t border-border/20 pt-2 space-y-1 text-xs">
            <div className="flex justify-between text-muted-foreground">
              <span>Subtotal</span>
              <span className="tabular-nums font-bold">
                {formatRupiah(summaryItem.subtotal)}
              </span>
            </div>
            {summaryItem.discount > 0 && (
              <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-medium">
                <span>Diskon</span>
                <span className="tabular-nums font-bold">
                  -{formatRupiah(summaryItem.discount)}
                </span>
              </div>
            )}
            {summaryItem.service > 0 && (
              <div className="flex justify-between text-muted-foreground">
                <span>Service</span>
                <span className="tabular-nums font-bold">
                  +{formatRupiah(summaryItem.service)}
                </span>
              </div>
            )}
            {summaryItem.tax > 0 && (
              <div className="flex justify-between text-muted-foreground">
                <span>Pajak</span>
                <span className="tabular-nums font-bold">
                  +{formatRupiah(summaryItem.tax)}
                </span>
              </div>
            )}
            <div className="flex justify-between pt-1 border-t border-border/40 font-extrabold text-foreground text-sm">
              <span>Total Bersih</span>
              <span className="tabular-nums">
                {formatRupiah(summaryItem.total)}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
