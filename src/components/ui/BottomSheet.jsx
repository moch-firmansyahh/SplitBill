import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import { cn } from '../../utils/cn'
import IconButton from './IconButton'

export default function BottomSheet({
  open,
  onClose,
  title,
  children,
  className = '',
}) {
  const sheetRef = useRef(null)

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
    <div className="fixed inset-0 z-50 flex flex-col justify-end bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="fixed inset-0"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        ref={sheetRef}
        role="dialog"
        aria-modal="true"
        className={cn(
          'relative w-full rounded-t-3xl border-t-2 border-x-2 border-border bg-card p-6 text-card-foreground shadow-2xl z-10 max-h-[88vh] overflow-y-auto animate-in slide-in-from-bottom duration-200',
          className
        )}
      >
        {/* Handle bar */}
        <div className="w-12 h-1.5 rounded-full bg-border/30 mx-auto mb-4" />

        <div className="flex items-center justify-between mb-4">
          {title && (
            <h3 className="text-xl font-bold leading-tight">
              {title}
            </h3>
          )}
          <IconButton
            variant="ghost"
            onClick={onClose}
            aria-label="Tutup lembar"
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
