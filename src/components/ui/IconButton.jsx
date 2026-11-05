import { cn } from '../../utils/cn'

export default function IconButton({
  children,
  onClick,
  'aria-label': ariaLabel,
  variant = 'default',
  type = 'button',
  disabled = false,
  className = '',
  ...props
}) {
  const base =
    'w-10 h-10 rounded-full border-2 border-border flex items-center justify-center transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer'

  const variants = {
    default:
      'bg-card text-foreground hover:bg-secondary active:scale-95 shadow-[1px_1px_0_0_var(--border)] active:shadow-none',
    primary:
      'bg-primary text-primary-foreground hover:brightness-95 active:scale-95 shadow-[1px_1px_0_0_var(--border)] active:shadow-none',
    ghost:
      'bg-transparent text-foreground hover:bg-secondary border-transparent hover:border-border',
    destructive:
      'bg-card text-destructive hover:bg-destructive hover:text-white active:scale-95 shadow-[1px_1px_0_0_var(--border)] active:shadow-none',
  }

  return (
    <button
      type={type}
      onClick={onClick}
      aria-label={ariaLabel}
      disabled={disabled}
      className={cn(base, variants[variant], className)}
      {...props}
    >
      {children}
    </button>
  )
}
