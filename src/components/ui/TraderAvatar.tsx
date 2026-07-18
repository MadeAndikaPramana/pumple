import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { TIERS, type TierKey } from '@/types'
import { cn } from '@/lib/utils'

const SIZES = {
  sm: { box: 'w-8 h-8', text: 'text-xs' },   // 32px
  md: { box: 'w-10 h-10', text: 'text-sm' }, // 40px
} as const

interface TraderAvatarProps {
  name: string
  /** Override the fallback text (defaults to first letter of `name`). */
  initials?: string
  tier?: TierKey
  /** Explicit ring/text color — overrides tier color (e.g. rarity). */
  color?: string
  size?: keyof typeof SIZES
  glow?: boolean
  className?: string
}

/**
 * Initials avatar built on the shadcn Avatar primitive. Mock traders have no
 * image URLs, so this always renders the tier-colored fallback with a ring.
 */
export default function TraderAvatar({
  name,
  initials,
  tier,
  color,
  size = 'sm',
  glow,
  className,
}: TraderAvatarProps) {
  const c = color ?? (tier ? TIERS[tier].color : '#A1A1AA')
  const s = SIZES[size]
  const label = (initials ?? name.slice(0, 1)).toUpperCase()

  return (
    <Avatar
      className={cn(s.box, className)}
      style={{
        border: `2px solid ${c}`,
        boxShadow: glow ? `0 0 14px ${c}55` : undefined,
      }}
    >
      <AvatarFallback
        className={cn(s.text, 'font-black')}
        style={{ backgroundColor: `${c}20`, color: c }}
      >
        {label}
      </AvatarFallback>
    </Avatar>
  )
}
