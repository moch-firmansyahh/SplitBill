import { useState, useEffect } from 'react'
import { Plus, Check } from 'lucide-react'
import Button from '../ui/Button.jsx'
import Input from '../ui/Input.jsx'
import Chip from '../ui/Chip.jsx'
import Avatar from '../ui/Avatar.jsx'
import { useBill, useBillDispatch } from '../../context/BillContext.jsx'
import { generateId } from '../../utils/id.js'

export default function ItemForm({
  itemToEdit = null,
  onSuccess = null,
  isModal = false,
}) {
  const { people } = useBill()
  const dispatch = useBillDispatch()

  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [qty, setQty] = useState('1')
  const [sharedBy, setSharedBy] = useState([])

  useEffect(() => {
    if (itemToEdit) {
      setName(itemToEdit.name)
      setPrice(String(itemToEdit.price))
      setQty(String(itemToEdit.qty))
      setSharedBy(itemToEdit.sharedBy || [])
    } else {
      setName('')
      setPrice('')
      setQty('1')
      // By default, everyone is selected
      setSharedBy(people.map((p) => p.id))
    }
  }, [itemToEdit, people])

  function handleToggleShare(personId) {
    setSharedBy((prev) =>
      prev.includes(personId)
        ? prev.filter((id) => id !== personId)
        : [...prev, personId]
    )
  }

  function handleSelectAll() {
    setSharedBy(people.map((p) => p.id))
  }

  function handleClearAll() {
    setSharedBy([])
  }

  function handleSubmit(e) {
    e.preventDefault()
    const trimmedName = name.trim()
    const parsedPrice = parseInt(price, 10)
    const parsedQty = parseInt(qty, 10)

    if (!trimmedName || isNaN(parsedPrice) || parsedPrice < 0) return
    if (isNaN(parsedQty) || parsedQty < 1) return

    if (itemToEdit) {
      dispatch({
        type: 'UPDATE_ITEM',
        payload: {
          id: itemToEdit.id,
          name: trimmedName,
          price: parsedPrice,
          qty: parsedQty,
        },
      })
      // Update participants if changed
      // To ensure sync with itemToEdit sharedBy:
      if (JSON.stringify(itemToEdit.sharedBy) !== JSON.stringify(sharedBy)) {
        // Update sharedBy by adjusting items in state
        people.forEach((p) => {
          const wasIn = itemToEdit.sharedBy.includes(p.id)
          const isIn = sharedBy.includes(p.id)
          if (wasIn !== isIn) {
            dispatch({
              type: 'TOGGLE_SHARE',
              payload: { itemId: itemToEdit.id, personId: p.id },
            })
          }
        })
      }
    } else {
      dispatch({
        type: 'ADD_ITEM',
        payload: {
          id: generateId('i'),
          name: trimmedName,
          price: parsedPrice,
          qty: parsedQty,
          sharedBy: sharedBy.length > 0 ? sharedBy : people.map((p) => p.id),
        },
      })
      setName('')
      setPrice('')
      setQty('1')
      setSharedBy(people.map((p) => p.id))
    }

    onSuccess?.()
  }

  const isValid =
    name.trim() !== '' &&
    price !== '' &&
    !isNaN(parseInt(price, 10)) &&
    parseInt(price, 10) >= 0 &&
    qty !== '' &&
    !isNaN(parseInt(qty, 10)) &&
    parseInt(qty, 10) >= 1

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_140px_90px] gap-3">
        <Input
          label="Nama Menu"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nasi Goreng, Es Teh, dll"
        />
        <Input
          label="Harga Satuan"
          type="number"
          prefix="Rp"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="25000"
          min="0"
          className="tabular-nums font-bold"
        />
        <Input
          label="Qty"
          type="number"
          value={qty}
          onChange={(e) => setQty(e.target.value)}
          placeholder="1"
          min="1"
          className="tabular-nums font-bold"
        />
      </div>

      {/* Participant selector */}
      {people.length > 0 && (
        <div className="pt-1">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Siapa yang ikut?
            </span>
            <div className="flex gap-2 text-xs">
              <button
                type="button"
                onClick={handleSelectAll}
                className="font-bold text-foreground hover:underline cursor-pointer"
              >
                Pilih semua
              </button>
              <span className="text-muted-foreground">•</span>
              <button
                type="button"
                onClick={handleClearAll}
                className="font-bold text-muted-foreground hover:text-foreground cursor-pointer"
              >
                Kosongkan
              </button>
            </div>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {people.map((person, index) => {
              const active = sharedBy.includes(person.id)
              return (
                <Chip
                  key={person.id}
                  size="sm"
                  active={active}
                  onClick={() => handleToggleShare(person.id)}
                  icon={<Avatar name={person.name} index={index} size="sm" className="w-5 h-5 text-[10px]" />}
                >
                  {person.name}
                </Chip>
              )
            })}
          </div>
        </div>
      )}

      <div className="flex justify-end gap-2 pt-2">
        <Button
          type="submit"
          disabled={!isValid}
          className="w-full md:w-auto"
        >
          {itemToEdit ? (
            <>
              <Check size={18} className="mr-1.5" />
              Simpan Perubahan
            </>
          ) : (
            <>
              <Plus size={18} className="mr-1.5" />
              Tambah ke Pesanan
            </>
          )}
        </Button>
      </div>
    </form>
  )
}
