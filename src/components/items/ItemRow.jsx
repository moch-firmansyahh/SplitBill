import { useState } from 'react'
import { Trash2, Pencil, Check, X } from 'lucide-react'
import { useBill, useBillDispatch } from '../../context/BillContext.jsx'
import { formatRupiah } from '../../utils/format.js'
import ConfirmDialog from '../ui/ConfirmDialog.jsx'

export default function ItemRow({ item }) {
  const { people } = useBill()
  const dispatch = useBillDispatch()
  const [editing, setEditing] = useState(false)
  const [editName, setEditName] = useState(item.name)
  const [editPrice, setEditPrice] = useState(String(item.price))
  const [editQty, setEditQty] = useState(String(item.qty))
  const [showConfirm, setShowConfirm] = useState(false)

  const hasNoPeople = item.sharedBy.length === 0

  function handleSave() {
    const trimmed = editName.trim()
    const parsedPrice = parseInt(editPrice, 10)
    const parsedQty = parseInt(editQty, 10)

    if (!trimmed || isNaN(parsedPrice) || parsedPrice < 0 || isNaN(parsedQty) || parsedQty < 1) {
      handleCancel()
      return
    }

    dispatch({
      type: 'UPDATE_ITEM',
      payload: { id: item.id, name: trimmed, price: parsedPrice, qty: parsedQty },
    })
    setEditing(false)
  }

  function handleCancel() {
    setEditName(item.name)
    setEditPrice(String(item.price))
    setEditQty(String(item.qty))
    setEditing(false)
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') handleSave()
    if (e.key === 'Escape') handleCancel()
  }

  function handleToggle(personId) {
    dispatch({ type: 'TOGGLE_SHARE', payload: { itemId: item.id, personId } })
  }

  return (
    <>
      <div
        className={`rounded-lg border p-3 transition-colors duration-150 ${
          hasNoPeople
            ? 'border-amber-400 dark:border-amber-300 bg-amber-50 dark:bg-amber-900/20'
            : 'border-slate-200 dark:border-slate-700'
        }`}
      >
        {editing ? (
          <div className="flex flex-col gap-2 md:flex-row md:items-center">
            <input
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
              className="flex-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-2 py-1 text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <input
              type="number"
              value={editPrice}
              onChange={(e) => setEditPrice(e.target.value)}
              onKeyDown={handleKeyDown}
              min="0"
              className="w-full md:w-28 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-2 py-1 text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 tabular-nums"
            />
            <input
              type="number"
              value={editQty}
              onChange={(e) => setEditQty(e.target.value)}
              onKeyDown={handleKeyDown}
              min="1"
              className="w-full md:w-20 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-2 py-1 text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 tabular-nums"
            />
            <div className="flex gap-1">
              <button
                onClick={handleSave}
                className="p-1.5 rounded-lg hover:bg-emerald-100 dark:hover:bg-emerald-900 text-emerald-600 dark:text-emerald-400 transition-colors duration-150"
                aria-label="Simpan perubahan"
              >
                <Check size={16} />
              </button>
              <button
                onClick={handleCancel}
                className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 transition-colors duration-150"
                aria-label="Batal edit"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-medium text-slate-800 dark:text-slate-100 truncate">
                  {item.name}
                </span>
                <span className="text-sm text-slate-500 dark:text-slate-400">
                  {item.qty > 1 ? `${item.qty}x` : ''} {formatRupiah(item.price)}
                </span>
                {item.qty > 1 && (
                  <span className="text-sm font-semibold tabular-nums text-slate-700 dark:text-slate-200">
                    = {formatRupiah(item.price * item.qty)}
                  </span>
                )}
              </div>
            </div>
            <div className="flex gap-1 shrink-0">
              <button
                onClick={() => setEditing(true)}
                className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 transition-colors duration-150"
                aria-label={`Edit ${item.name}`}
              >
                <Pencil size={16} />
              </button>
              <button
                onClick={() => setShowConfirm(true)}
                className="p-1.5 rounded-lg hover:bg-rose-100 dark:hover:bg-rose-900 text-rose-500 dark:text-rose-400 transition-colors duration-150"
                aria-label={`Hapus ${item.name}`}
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        )}

        {/* Toggle peserta */}
        {people.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-2">
            {people.map((person) => {
              const active = item.sharedBy.includes(person.id)
              return (
                <button
                  key={person.id}
                  onClick={() => handleToggle(person.id)}
                  className={`text-xs rounded-full px-2.5 py-1 font-medium transition-colors duration-150 ${
                    active
                      ? 'bg-emerald-500 text-white dark:bg-emerald-500'
                      : 'bg-slate-200 text-slate-500 dark:bg-slate-700 dark:text-slate-400'
                  }`}
                  aria-label={`${active ? 'Keluarkan' : 'Tambahkan'} ${person.name} dari ${item.name}`}
                >
                  {person.name}
                </button>
              )
            })}
          </div>
        )}

        {hasNoPeople && (
          <p className="text-xs text-amber-600 dark:text-amber-300 mt-2">
            Belum ada yang ikut
          </p>
        )}
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
