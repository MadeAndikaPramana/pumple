import { Badge } from '@/components/ui/badge'
import { TIERS, type TierKey } from '@/types'

interface TierBadgeProps {
  tier: TierKey
  size?: 'sm' | 'md'
}

/**
 * Tier chip built on the shadcn Badge primitive. Per-tier color is applied
 * inline (outside the static variant set) and Legend keeps its glow.
 */
export default function TierBadge({ tier, size = 'sm' }: TierBadgeProps) {
  const { label, color } = TIERS[tier]

  return (
    <Badge
      variant="outline"
      size={size}
      style={{
        backgroundColor: `${color}1c`,
        color,
        borderColor: `${color}40`,
        textShadow: tier === 'legend' ? `0 0 8px ${color}80` : undefined,
      }}
    >
      {label}
    </Badge>
  )
}
