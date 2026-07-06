'use client'

import { Clock, Coins, Eye, Crown, Target, TrendingUp } from 'lucide-react'
import { TIERS, type TierKey, type TribeWar } from '@/types'
import TierBadge from '@/components/ui/TierBadge'

const TIER_ICONS: Record<TierKey, React.ReactNode> = {
  apprentice: <TrendingUp size={20} />,
  trader:     <TrendingUp size={20} />,
  sniper:     <Target size={20} />,
  whale:      <Coins size={20} />,
  legend:     <Crown size={20} />,
}

function fmtPnl(n: number) {
  return `${n > 0 ? '+' : ''}${n.toFixed(1)}%`
}

function TribeSide({ tribe, align }: { tribe: TribeWar['tribe1']; align: 'left' | 'right' }) {
  const color = TIERS[tribe.tier].color
  const isRight = align === 'right'

  return (
    <div className={`flex-1 min-w-0 ${isRight ? 'text-right' : ''}`}>
      <div className={`flex items-center gap-2 ${isRight ? 'flex-row-reverse' : ''}`}>
        <div
          className="w-12 h-12 rounded-[10px] flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: `${color}20`, border: `1px solid ${color}`, color }}
        >
          {TIER_ICONS[tribe.tier]}
        </div>
        <div className="min-w-0">
          <p className="text-sm font-black text-pumple-text truncate">{tribe.name}</p>
          <TierBadge tier={tribe.tier} size="md" />
        </div>
      </div>
      <p className="text-[11px] text-pumple-muted mt-2">{tribe.members} members</p>
      <p className="text-[11px] text-pumple-muted">{tribe.positions} active positions</p>
    </div>
  )
}

export default function TribeWarCard({ war }: { war: TribeWar }) {
  const c1 = TIERS[war.tribe1.tier].color
  const c2 = TIERS[war.tribe2.tier].color
  const split = Math.max(5, Math.min(95, 50 + (war.tribe1.totalPnL - war.tribe2.totalPnL) / 2))

  return (
    <div className="p-card p-card-hover rounded-[16px] overflow-hidden mb-4">
      {/* Accent stripe */}
      <div className="h-1" style={{ background: `linear-gradient(to right, ${c1}, ${c2})` }} />

      {/* Header */}
      <div className="p-4 pb-0 flex items-center justify-between flex-wrap gap-2">
        <span className="font-display text-xs font-bold text-pumple-muted tracking-[0.18em]">TRIBE WAR</span>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-[11px] font-bold text-pumple-gold">
            <Clock size={11} />
            {war.timeLeft}
          </span>
          <span className="text-[11px] font-black text-pumple-accent">{war.prizePool}</span>
          <span className="flex items-center gap-1 text-[11px] text-pumple-muted">
            <Eye size={11} />
            {war.watchers.toLocaleString()}
          </span>
        </div>
      </div>

      {/* War area */}
      <div className="flex items-center gap-4 p-4">
        <TribeSide tribe={war.tribe1} align="left" />

        {/* Score bar */}
        <div className="flex-1 max-w-[200px] flex flex-col items-center gap-2">
          <div className="flex items-center gap-2">
            <span
              className="text-lg font-black px-2 py-0.5 rounded"
              style={{ color: c1, backgroundColor: `${c1}20` }}
            >
              {fmtPnl(war.tribe1.totalPnL)}
            </span>
            <span className="text-[10px] text-pumple-muted">vs</span>
            <span
              className="text-lg font-black px-2 py-0.5 rounded"
              style={{ color: c2, backgroundColor: `${c2}20` }}
            >
              {fmtPnl(war.tribe2.totalPnL)}
            </span>
          </div>
          <div className="w-full h-3 bg-pumple-dim rounded-full overflow-hidden flex">
            <div className="h-full transition-all duration-1000" style={{ width: `${split}%`, backgroundColor: c1 }} />
            <div className="h-full transition-all duration-1000" style={{ width: `${100 - split}%`, backgroundColor: c2 }} />
          </div>
        </div>

        <TribeSide tribe={war.tribe2} align="right" />
      </div>

      {/* Footer */}
      <div className="border-t border-pumple-border p-3 flex justify-between items-center">
        <span className="text-[11px] text-pumple-muted">
          {war.tribe1.members + war.tribe2.members} members contributing
        </span>
        <button className="btn-ghost text-[11px] px-3 py-1">
          <Eye size={11} />
          Watch War
        </button>
      </div>
    </div>
  )
}
