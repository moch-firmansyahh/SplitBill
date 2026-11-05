import ResponsiveOverlay from './ResponsiveOverlay'
import Button from './Button'

export default function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = 'Hapus',
  cancelLabel = 'Batal',
  onConfirm,
  onCancel,
}) {
  return (
    <ResponsiveOverlay open={open} onClose={onCancel} title={title}>
      <p className="text-sm text-muted-foreground mb-6">
        {message}
      </p>
      <div className="flex justify-end gap-2.5">
        <Button variant="outline" size="sm" onClick={onCancel}>
          {cancelLabel}
        </Button>
        <Button variant="destructive" size="sm" onClick={onConfirm}>
          {confirmLabel}
        </Button>
      </div>
    </ResponsiveOverlay>
  )
}
