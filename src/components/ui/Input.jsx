import { cn } from '../../utils/cn'

export default function Input({
  label,
  id,
  type = 'text',
  value,
  onChange,
  placeholder,
  prefix,
  error,
  className = '',
  containerClassName = '',
  ...props
}) {
  return (
    <div className={cn('w-full', containerClassName)}>
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-semibold text-foreground mb-1.5"
        >
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {prefix && (
          <span className="absolute left-3 text-sm font-bold text-muted-foreground pointer-events-none select-none">
            {prefix}
          </span>
        )}
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={cn(
            'h-11 w-full rounded-xl border-2 border-border bg-card px-3 text-base text-foreground placeholder:text-muted-foreground font-medium transition-colors duration-150',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background',
            prefix && 'pl-9',
            error && 'border-destructive focus-visible:ring-destructive',
            className
          )}
          {...props}
        />
      </div>
      {error && (
        <p className="text-xs font-semibold text-destructive mt-1">{error}</p>
      )}
    </div>
  )
}
