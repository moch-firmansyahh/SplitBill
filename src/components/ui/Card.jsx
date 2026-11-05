import { cn } from '../../utils/cn'

export default function Card({
  title,
  subtitle,
  children,
  variant = 'default',
  className = '',
  action,
  ...props
}) {
  const base = 'border-2 border-border rounded-2xl p-4 md:p-5 transition-colors duration-150'

  const variants = {
    default: 'bg-card text-card-foreground',
    ticket: 'bg-card text-card-foreground ticket',
    ink: 'bg-ink text-ink-foreground',
    secondary: 'bg-secondary text-secondary-foreground',
  }

  return (
    <div className={cn(base, variants[variant], className)} {...props}>
      {(title || subtitle || action) && (
        <div className="flex items-center justify-between mb-3 gap-2">
          <div>
            {title && (
              <h2 className="text-lg font-bold leading-tight">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-sm text-muted-foreground mt-0.5">
                {subtitle}
              </p>
            )}
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </div>
      )}
      {children}
    </div>
  )
}
