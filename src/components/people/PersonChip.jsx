import { useState } from 'react'
import { X, Pencil, Check } from 'lucide-react'
import { useBillDispatch } from '../../context/BillContext.jsx'
import ConfirmDialog from '../ui/ConfirmDialog.jsx'
import Avatar from '../ui/Avatar.jsx'

export default function PersonChip({ person, index = 0 }) {
  const dispatch = useBillDispatch()
  const [editing, setEditing] = useState(false)
  const [name, setName] = useState(person.name)
  const [showConfirm, setShowConfirm] = useState(false)

  function handleSave() {
    const trimmed = name.trim()
    if (!trimmed) {
      setName(person.name)
      setEditing(false)
      return
    }
    dispatch({ type: 'UPDATE_PERSON', payload: { id: person.id, name: trimmed } })
    setEditing(false)
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') handleSave()
    if (e.key === 'Escape') {
      setName(person.name)
      setEditing(false)
    }
  }

  return (
    <>
      <div className="inline-flex items-center gap-2 bg-card text-foreground rounded-full border-2 border-border pl-1 pr-2.5 py-1 text-sm font-bold shadow-[2px_2px_0_0_var(--border)] transition-all group">
        <Avatar name={person.name} index={index} size="sm" />
        {editing ? (
          <div className="flex items-center gap-1">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={handleKeyDown}
              onBlur={handleSave}
              autoFocus
              className="bg-transparent border-b-2 border-border outline-none w-20 text-sm text-foreground font-bold px-1"
            />
            <button
              type="button"
              onClick={handleSave}
              className="p-1 hover:bg-secondary rounded-full transition-colors cursor-pointer text-foreground"
              aria-label={`Simpan nama ${person.name}`}
            >
              <Check size={14} />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-1.5">
            <span className="truncate max-w-[120px]">{person.name}</span>
            <button
              type="button"
              onClick={() => setEditing(true)}
              className="p-1 hover:bg-secondary rounded-full text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              aria-label={`Ubah nama ${person.name}`}
            >
              <Pencil size={12} />
            </button>
            <button
              type="button"
              onClick={() => setShowConfirm(true)}
              className="p-1 hover:bg-destructive hover:text-white rounded-full text-muted-foreground transition-colors cursor-pointer"
              aria-label={`Hapus ${person.name}`}
            >
              <X size={12} />
            </button>
          </div>
        )}
      </div>

      <ConfirmDialog
        open={showConfirm}
        title={`Hapus ${person.name}?`}
        message={`${person.name} akan dihapus dari semua pesanan.`}
        confirmLabel="Hapus"
        onConfirm={() => {
          dispatch({ type: 'REMOVE_PERSON', payload: person.id })
          setShowConfirm(false)
        }}
        onCancel={() => setShowConfirm(false)}
      />
    </>
  )
}
