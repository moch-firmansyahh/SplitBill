import { cn } from '../../utils/cn'

export default function Chip({
  children,
  active = false,
  onClick,
  onRemove,
  icon,
  className = '',
  size = 'md',
  ...props
}) {
  const sizeClasses = {
    sm: 'text-xs py-1 px-2.5 gap-1',
    md: 'text-sm py-1.5 px-3 gap-1.5',
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'inline-flex items-center font-bold rounded-full transition-all duration-150 cursor-pointer select-none',
        sizeClasses[size],
        active
          ? 'bg-primary text-primary-foreground border-2 border-border shadow-[1px_1px_0_0_var(--border)]'
          : 'bg-secondary text-secondary-foreground border-2 border-transparent hover:border-border',
        className
      )}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
      {onRemove && (
        <span
          role="button"
          tabIndex={0}
          onClick={(e) => {
            e.stopPropagation()
            onRemove()
          }}
          className="ml-1 p-0.5 rounded-full hover:bg-black/10 inline-flex items-center justify-center cursor-pointer"
          aria-label="Hapus"
        >
          ×
        </span>
      )}
    </button>
  )
}
