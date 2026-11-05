import { useState } from 'react'
import { Tag, UtensilsCrossed, Receipt, ChevronDown, ChevronUp } from 'lucide-react'
import Card from '../ui/Card.jsx'
import Badge from '../ui/Badge.jsx'
import Segmented from '../ui/Segmented.jsx'
import { useBill, useBillDispatch } from '../../context/BillContext.jsx'
import { formatRupiah } from '../../utils/format.js'
import { cn } from '../../utils/cn.js'

function ChargeRow({ label, icon: Icon, chargeType, charge }) {
  const dispatch = useBillDispatch()

  function handleTypeChange(newType) {
    dispatch({
      type: 'SET_CHARGE',
      payload: { chargeType, field: 'type', value: newType },
    })
    dispatch({
      type: 'SET_CHARGE',
      payload: { chargeType, field: 'value', value: 0 },
    })
  }

  function handleValueChange(e) {
    const raw = e.target.value
    if (raw === '') {
      dispatch({
        type: 'SET_CHARGE',
        payload: { chargeType, field: 'value', value: 0 },
      })
      return
    }
    const parsed = parseInt(raw, 10)
    if (isNaN(parsed) || parsed < 0) return
    if (charge.type === 'percent' && parsed > 100) return
    dispatch({
      type: 'SET_CHARGE',
      payload: { chargeType, field: 'value', value: parsed },
    })
  }

  return (
    <div className="p-3.5 rounded-xl border-2 border-border bg-card shadow-[2px_2px_0_0_var(--border)] space-y-2.5">
      {/* Header bar: Label & Segmented toggle */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {Icon && <Icon size={18} className="text-muted-foreground" />}
          <span className="font-bold text-base text-foreground">
            {label}
          </span>
        </div>
        <Segmented
          size="sm"
          options={[
            { label: '%', value: 'percent' },
            { label: 'Rp', value: 'amount' },
          ]}
          value={charge.type}
          onChange={handleTypeChange}
        />
      </div>

      {/* Input area: luas, tinggi, teks besar & terbaca jelas */}
      <div className="relative flex items-center">
        {charge.type === 'amount' && (
          <span className="absolute left-3.5 text-base font-extrabold text-muted-foreground pointer-events-none select-none">
            Rp
          </span>
        )}
        <input
          type="number"
          value={charge.value === 0 ? '' : charge.value}
          onChange={handleValueChange}
          placeholder="0"
          min="0"
          max={charge.type === 'percent' ? '100' : undefined}
          className={cn(
            'h-12 w-full rounded-xl border-2 border-border bg-background px-3.5 text-lg font-extrabold text-foreground placeholder:text-muted-foreground tabular-nums transition-colors duration-150',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background',
            charge.type === 'amount' ? 'pl-12 pr-4 text-right' : 'pr-10 text-right',
            '[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
          )}
        />
        {charge.type === 'percent' && (
          <span className="absolute right-3.5 text-base font-extrabold text-muted-foreground pointer-events-none select-none">
            %
          </span>
        )}
      </div>
    </div>
  )
}

export default function ChargesForm({ defaultOpen = false }) {
  const { charges } = useBill()
  const [isOpen, setIsOpen] = useState(defaultOpen)

  const activeCharges = []
  if (charges.discount.value > 0) {
    activeCharges.push(
      `Diskon ${charges.discount.type === 'percent' ? `${charges.discount.value}%` : formatRupiah(charges.discount.value)}`
    )
  }
  if (charges.service.value > 0) {
    activeCharges.push(
      `Service ${charges.service.type === 'percent' ? `${charges.service.value}%` : formatRupiah(charges.service.value)}`
    )
  }
  if (charges.tax.value > 0) {
    activeCharges.push(
      `Pajak ${charges.tax.type === 'percent' ? `${charges.tax.value}%` : formatRupiah(charges.tax.value)}`
    )
  }

  return (
    <Card className="ticket transition-all duration-200">
      {/* Header Akordion yang bisa diklik */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between cursor-pointer select-none group"
      >
        <div className="flex-1 pr-2">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold leading-tight text-foreground">
              Biaya Tambahan
            </h2>
            {activeCharges.length > 0 && (
              <Badge variant="primary" className="text-[10px] py-0 px-2">
                {activeCharges.length} aktif
              </Badge>
            )}
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            {activeCharges.length > 0
              ? activeCharges.join(' • ')
              : isOpen
                ? 'Atur diskon, service, & pajak'
                : 'Diskon, service, & pajak (Klik untuk atur)'}
          </p>
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            setIsOpen(!isOpen)
          }}
          className="w-8 h-8 rounded-full border-2 border-border bg-secondary hover:bg-primary text-foreground flex items-center justify-center transition-all duration-150 shadow-[1px_1px_0_0_var(--border)] active:scale-95 cursor-pointer shrink-0"
          aria-label={isOpen ? 'Tutup form biaya tambahan' : 'Buka form biaya tambahan'}
        >
          {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
      </div>

      {/* Konten yang muncul saat panah diklik */}
      {isOpen && (
        <div className="space-y-3 pt-3.5 mt-3 border-t-2 border-dashed border-border/40 animate-in fade-in duration-200">
          <ChargeRow
            label="Diskon"
            icon={Tag}
            chargeType="discount"
            charge={charges.discount}
          />
          <ChargeRow
            label="Service"
            icon={UtensilsCrossed}
            chargeType="service"
            charge={charges.service}
          />
          <ChargeRow
            label="Pajak"
            icon={Receipt}
            chargeType="tax"
            charge={charges.tax}
          />
        </div>
      )}
    </Card>
  )
}
