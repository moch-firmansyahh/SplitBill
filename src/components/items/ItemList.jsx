import { useState } from 'react'
import { Plus } from 'lucide-react'
import Card from '../ui/Card.jsx'
import Button from '../ui/Button.jsx'
import EmptyState from '../ui/EmptyState.jsx'
import { ReceiptIllustration } from '../ui/Illustration.jsx'
import ResponsiveOverlay from '../ui/ResponsiveOverlay.jsx'
import ItemCard from './ItemCard.jsx'
import ItemForm from './ItemForm.jsx'
import { useBill } from '../../context/BillContext.jsx'

export default function ItemList({ showInlineForm = true }) {
  const { items } = useBill()
  const [modalOpen, setModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState(null)

  function handleOpenAdd() {
    setEditingItem(null)
    setModalOpen(true)
  }

  function handleEdit(item) {
    setEditingItem(item)
    setModalOpen(true)
  }

  return (
    <>
      <Card
        title="Daftar Pesanan"
        subtitle={`${items.length} menu tercatat`}
        className="ticket"
        action={
          !showInlineForm && (
            <Button
              size="sm"
              onClick={handleOpenAdd}
              aria-label="Tambah item"
            >
              <Plus size={16} className="mr-1" />
              Tambah
            </Button>
          )
        }
      >
        {showInlineForm && (
          <div className="mb-5 p-4 rounded-xl border-2 border-border bg-secondary/40 shadow-[1px_1px_0_0_var(--border)]">
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
              + Tambah Menu Baru
            </h3>
            <ItemForm />
          </div>
        )}

        {items.length === 0 ? (
          <EmptyState
            illustration={<ReceiptIllustration />}
            message="Belum ada pesanan."
            description="Catat apa saja makanan dan minuman yang dipesan."
            action={
              !showInlineForm && (
                <Button onClick={handleOpenAdd}>
                  <Plus size={18} className="mr-1.5" />
                  Tambah Pesanan Pertama
                </Button>
              )
            }
          />
        ) : (
          <div className="space-y-3">
            {items.map((item) => (
              <ItemCard key={item.id} item={item} onEdit={handleEdit} />
            ))}
          </div>
        )}
      </Card>

      {/* Modal / BottomSheet for Add & Edit */}
      <ResponsiveOverlay
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingItem ? `Ubah ${editingItem.name}` : 'Tambah Menu Baru'}
      >
        <ItemForm
          itemToEdit={editingItem}
          onSuccess={() => setModalOpen(false)}
          isModal
        />
      </ResponsiveOverlay>
    </>
  )
}
