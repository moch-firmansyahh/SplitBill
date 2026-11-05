import { cn } from '../../utils/cn'

export default function Segmented({
  options = [],
  value,
  onChange,
  className = '',
  size = 'md',
}) {
  const sizeClasses = {
    sm: 'text-xs h-8 px-2.5',
    md: 'text-sm h-10 px-3',
  }

  return (
    <div
      className={cn(
        'inline-flex items-center bg-secondary p-1 rounded-xl border-2 border-border gap-1 select-none',
        className
      )}
    >
      {options.map((opt) => {
        const isActive = opt.value === value
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={cn(
              'inline-flex items-center justify-center font-bold rounded-lg transition-all duration-150 cursor-pointer whitespace-nowrap',
              sizeClasses[size],
              isActive
                ? 'bg-primary text-primary-foreground border-2 border-border shadow-[1px_1px_0_0_var(--border)]'
                : 'text-muted-foreground hover:text-foreground border-2 border-transparent'
            )}
          >
            {opt.icon && <span className="mr-1.5">{opt.icon}</span>}
            {opt.label}
          </button>
        )
      })}
    </div>
  )
}
