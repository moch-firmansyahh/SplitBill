import { cn } from '../../utils/cn'

export default function EmptyState({
  illustration,
  message,
  description,
  action,
  className = '',
}) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center py-8 px-4 text-center select-none',
        className
      )}
    >
      {illustration && (
        <div className="mb-3 transform transition-transform hover:scale-105">
          {illustration}
        </div>
      )}
      <p className="text-base font-bold text-foreground max-w-xs">
        {message}
      </p>
      {description && (
        <p className="text-sm text-muted-foreground mt-1 max-w-xs">
          {description}
        </p>
      )}
      {action && <div className="mt-4">{action}</div>}
    </div>
  )
}
