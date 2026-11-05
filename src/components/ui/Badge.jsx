import { cn } from '../../utils/cn'

export default function Badge({
  children,
  variant = 'muted',
  icon,
  className = '',
  ...props
}) {
  const base =
    'inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold border-2 select-none'

  const variants = {
    success:
      'bg-emerald-100 text-emerald-900 border-border dark:bg-emerald-950 dark:text-emerald-200',
    warning:
      'bg-amber-100 text-amber-950 border-warning dark:bg-amber-950/60 dark:text-amber-200',
    muted:
      'bg-muted text-muted-foreground border-border',
    primary:
      'bg-primary text-primary-foreground border-border',
  }

  return (
    <span className={cn(base, variants[variant], className)} {...props}>
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </span>
  )
}
