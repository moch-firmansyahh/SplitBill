import { useState } from 'react'
import { Trash2, Pencil, AlertCircle } from 'lucide-react'
import { useBill, useBillDispatch } from '../../context/BillContext.jsx'
import { formatRupiah } from '../../utils/format.js'
import Card from '../ui/Card.jsx'
import Chip from '../ui/Chip.jsx'
import Badge from '../ui/Badge.jsx'
import Avatar from '../ui/Avatar.jsx'
import ConfirmDialog from '../ui/ConfirmDialog.jsx'

export default function ItemCard({ item, onEdit }) {
  const { people } = useBill()
  const dispatch = useBillDispatch()
  const [showConfirm, setShowConfirm] = useState(false)

  const hasNoPeople = item.sharedBy.length === 0
  const subtotal = item.price * item.qty

  function handleToggle(personId) {
    dispatch({ type: 'TOGGLE_SHARE', payload: { itemId: item.id, personId } })
  }

  return (
    <>
      <div
        className={`border-2 rounded-2xl p-4 transition-all duration-150 ticket ${
          hasNoPeople
            ? 'border-warning bg-amber-50/40 dark:bg-amber-950/20'
            : 'border-border bg-card'
        }`}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-baseline gap-2 flex-wrap">
              <h3 className="font-bold text-base text-foreground truncate">
                {item.name}
              </h3>
              <span className="text-xs font-semibold text-muted-foreground">
                {item.qty > 1 ? `${item.qty} × ` : ''}{formatRupiah(item.price)}
              </span>
            </div>
            <p className="text-lg font-extrabold tabular-nums text-foreground mt-0.5">
              {formatRupiah(subtotal)}
            </p>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            {onEdit && (
              <button
                type="button"
                onClick={() => onEdit(item)}
                className="p-1.5 rounded-lg border-2 border-transparent hover:border-border hover:bg-secondary text-muted-foreground hover:text-foreground transition-all cursor-pointer"
                aria-label={`Ubah ${item.name}`}
              >
                <Pencil size={16} />
              </button>
            )}
            <button
              type="button"
              onClick={() => setShowConfirm(true)}
              className="p-1.5 rounded-lg border-2 border-transparent hover:border-border hover:bg-destructive hover:text-white text-muted-foreground transition-all cursor-pointer"
              aria-label={`Hapus ${item.name}`}
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>

        {/* Separator dashed */}
        <div className="border-t-2 border-dashed border-border/40 my-3" />

        {/* Participant chips */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Yang ikut ({item.sharedBy.length}/{people.length})
            </span>
            {hasNoPeople && (
              <Badge variant="warning" icon={<AlertCircle size={12} />}>
                Belum ada yang ikut
              </Badge>
            )}
          </div>

          {people.length === 0 ? (
            <p className="text-xs text-muted-foreground italic">
              Tambah peserta terlebih dahulu.
            </p>
          ) : (
            <div className="flex flex-wrap gap-1.5">
              {people.map((person, index) => {
                const active = item.sharedBy.includes(person.id)
                return (
                  <Chip
                    key={person.id}
                    size="sm"
                    active={active}
                    onClick={() => handleToggle(person.id)}
                    icon={<Avatar name={person.name} index={index} size="sm" className="w-5 h-5 text-[10px]" />}
                    aria-label={`${active ? 'Keluarkan' : 'Ikutkan'} ${person.name}`}
                  >
                    {person.name}
                  </Chip>
                )
              })}
            </div>
          )}
        </div>
      </div>

      <ConfirmDialog
        open={showConfirm}
        title={`Hapus ${item.name}?`}
        message="Item ini akan dihapus dari daftar pesanan."
        confirmLabel="Hapus"
        onConfirm={() => {
          dispatch({ type: 'REMOVE_ITEM', payload: item.id })
          setShowConfirm(false)
        }}
        onCancel={() => setShowConfirm(false)}
      />
    </>
  )
}
