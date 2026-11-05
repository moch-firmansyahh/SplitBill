import { cn } from '../../utils/cn'

const AVATAR_COLORS = [
  '#FFB4A2', // salmon
  '#B5E48C', // hijau muda
  '#A0C4FF', // biru muda
  '#FDFFB6', // kuning pucat
  '#CDB4DB', // ungu muda
  '#9BF6FF', // cyan muda
]

export function getAvatarColor(index = 0) {
  return AVATAR_COLORS[Math.abs(index) % AVATAR_COLORS.length]
}

export function getInitials(name = '') {
  const parts = name.trim().split(/\s+/)
  if (parts.length === 0 || !parts[0]) return '?'
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[1][0]).toUpperCase()
}

export default function Avatar({
  name = '',
  index = 0,
  size = 'md',
  className = '',
  onClick,
  ...props
}) {
  const initials = getInitials(name)
  const color = getAvatarColor(index)

  const sizeClasses = {
    sm: 'w-7 h-7 text-xs border-[1.5px]',
    md: 'w-9 h-9 text-xs border-2',
    lg: 'w-11 h-11 text-sm border-2',
    xl: 'w-14 h-14 text-base border-2',
  }

  return (
    <div
      onClick={onClick}
      style={{ backgroundColor: color }}
      className={cn(
        'rounded-full border-border text-slate-900 font-extrabold flex items-center justify-center shrink-0 select-none shadow-[1px_1px_0_0_var(--border)]',
        sizeClasses[size],
        onClick && 'cursor-pointer hover:scale-105 active:scale-95 transition-transform',
        className
      )}
      title={name}
      {...props}
    >
      {initials}
    </div>
  )
}

export function AvatarStack({ people = [], max = 4, size = 'sm', className = '' }) {
  const visible = people.slice(0, max)
  const remaining = people.length - max

  return (
    <div className={cn('flex items-center -space-x-2 overflow-hidden py-0.5', className)}>
      {visible.map((person, idx) => (
        <Avatar
          key={person.id || idx}
          name={person.name}
          index={person.index ?? idx}
          size={size}
          className="ring-2 ring-card"
        />
      ))}
      {remaining > 0 && (
        <div
          className={cn(
            'rounded-full border-2 border-border bg-secondary text-secondary-foreground font-bold flex items-center justify-center shrink-0 ring-2 ring-card select-none text-xs',
            size === 'sm' ? 'w-7 h-7' : 'w-9 h-9'
          )}
        >
          +{remaining}
        </div>
      )}
    </div>
  )
}
