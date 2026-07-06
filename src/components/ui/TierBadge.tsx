import { TIERS, type TierKey } from '@/types'

interface TierBadgeProps {
  tier: TierKey
  size?: 'sm' | 'md'
}

export default function TierBadge({ tier, size = 'sm' }: TierBadgeProps) {
  const { label, color } = TIERS[tier]

  const sizeClass = size === 'sm'
    ? 'px-1.5 py-0 text-[10px]'
    : 'px-2 py-0.5 text-[11px]'

  return (
    <span
      className={`inline-flex items-center gap-1 rounded font-bold uppercase tracking-wide ${sizeClass}`}
      style={{
        backgroundColor: `${color}1c`,
        color,
        border: `1px solid ${color}40`,
        textShadow: tier === 'legend' ? `0 0 8px ${color}80` : undefined,
      }}
    >
      {label}
    </span>
  )
}
