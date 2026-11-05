import { cn } from '../../utils/cn'

export default function Button({
  children,
  onClick,
  variant = 'default',
  size = 'md',
  pill = false,
  type = 'button',
  disabled = false,
  className = '',
  ...props
}) {
  const base =
    'inline-flex items-center justify-center font-bold transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer'

  const variants = {
    default:
      'bg-primary text-primary-foreground border-2 border-border shadow-[2px_2px_0_0_var(--border)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none hover:brightness-95',
    dark:
      'bg-ink text-ink-foreground border-2 border-border shadow-[2px_2px_0_0_var(--border)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none',
    outline:
      'bg-card text-card-foreground border-2 border-border hover:bg-secondary active:translate-x-[2px] active:translate-y-[2px]',
    ghost:
      'bg-transparent text-foreground hover:bg-secondary',
    destructive:
      'bg-destructive text-white border-2 border-border shadow-[2px_2px_0_0_var(--border)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none hover:brightness-95',
  }

  const sizes = {
    sm: 'h-9 px-3 text-sm min-h-[36px]',
    md: 'h-11 px-4 text-base min-h-[44px]',
    lg: 'h-12 px-6 text-lg min-h-[48px]',
  }

  const radius = pill ? 'rounded-full' : 'rounded-xl'

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(base, variants[variant], sizes[size], radius, className)}
      {...props}
    >
      {children}
    </button>
  )
}
