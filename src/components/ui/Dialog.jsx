import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import { cn } from '../../utils/cn'
import IconButton from './IconButton'

export default function Dialog({
  open,
  onClose,
  title,
  children,
  className = '',
  maxWidth = 'max-w-md',
}) {
  const dialogRef = useRef(null)

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape' && open) {
        onClose?.()
      }
    }
    if (open) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="fixed inset-0"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        className={cn(
          'relative w-full rounded-2xl border-2 border-border bg-card p-6 text-card-foreground shadow-[4px_4px_0_0_var(--border)] z-10 animate-in zoom-in-95 duration-150',
          maxWidth,
          className
        )}
      >
        <div className="flex items-center justify-between mb-4">
          {title && (
            <h3 className="text-xl font-bold leading-tight">
              {title}
            </h3>
          )}
          <IconButton
            variant="ghost"
            onClick={onClose}
            aria-label="Tutup dialog"
            className="w-8 h-8 -mr-1"
          >
            <X size={18} />
          </IconButton>
        </div>
        {children}
      </div>
    </div>
  )
}
