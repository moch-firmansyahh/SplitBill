import { Check } from 'lucide-react'
import { cn } from '../../utils/cn'

export default function Toast({
  show,
  message = 'Ringkasan disalin!',
  icon = <Check size={18} className="text-primary" />,
  className = '',
}) {
  if (!show) return null

  return (
    <div
      className={cn(
        'fixed z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl border-2 border-border bg-ink text-ink-foreground font-bold shadow-[3px_3px_0_0_var(--border)] transition-all animate-in fade-in slide-in-from-bottom-4 duration-200 select-none',
        // Bottom on mobile, top-right on desktop
        'bottom-24 left-1/2 -translate-x-1/2 lg:bottom-auto lg:top-6 lg:right-6 lg:left-auto lg:translate-x-0',
        className
      )}
    >
      {icon}
      <span className="text-sm">{message}</span>
    </div>
  )
}
