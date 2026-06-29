'use client'

import { motion } from 'framer-motion'
import { Trophy, Flame, TrendingUp, Target, Coins, Crown } from 'lucide-react'
import { TIERS, type TierKey } from '@/types'
import TierBadge from '@/components/ui/TierBadge'
import { LEADERBOARD } from '@/lib/mock-data'

const TIER_ICONS: Record<TierKey, React.ReactNode> = {
  apprentice: <TrendingUp size={11} />,
  trader:     <TrendingUp size={11} />,
  sniper:     <Target size={11} />,
  whale:      <Coins size={11} />,
  legend:     <Crown size={11} />,
}

const RANK_COLORS = ['#FBBF24', '#94A3B8', '#D97706']

export default function LeaderboardPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <div>
          <h1 className="text-sm font-bold text-pumple-text">Global Rankings</h1>
          <p className="text-pumple-muted text-[11px] mt-0.5">Season 1 · Resets in 14 days</p>
        </div>
        <div className="flex gap-1.5">
          <button className="text-[11px] font-bold px-2.5 py-1 rounded-md bg-pumple-primary text-black">
            All Time
          </button>
          <button className="text-[11px] text-pumple-muted px-2.5 py-1 rounded-md bg-pumple-elevated border border-pumple-border hover:text-pumple-text transition-colors">
            Weekly
          </button>
          <button className="text-[11px] text-pumple-muted px-2.5 py-1 rounded-md bg-pumple-elevated border border-pumple-border hover:text-pumple-text transition-colors">
            Monthly
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-pumple-card border border-pumple-border rounded-[10px] overflow-hidden">
        {/* Header row */}
        <div
          className="grid px-3.5 py-2 text-pumple-muted text-[10px] uppercase tracking-[0.04em] font-bold"
          style={{
            gridTemplateColumns: '34px 1fr 76px 52px 52px 72px',
            borderBottom: '1px solid #1E2235',
          }}
        >
          <span>#</span>
          <span>Trader</span>
          <span>Accuracy</span>
          <span>Calls</span>
          <span>Streak</span>
          <span>$PUMP</span>
        </div>

        {/* Data rows */}
        {LEADERBOARD.map(entry => {
          const tierColor = TIERS[entry.tier].color
          const isTop3 = entry.rank <= 3
          const streakHot = entry.streak >= 3

          return (
            <div
              key={entry.rank}
              className="grid px-3.5 py-2.5 items-center hover:bg-pumple-elevated/50 transition-colors"
              style={{
                gridTemplateColumns: '34px 1fr 76px 52px 52px 72px',
                borderBottom: '1px solid #1E2235',
              }}
            >
              {/* Rank */}
              <div className="flex items-center">
                {isTop3 ? (
                  <Trophy size={14} style={{ color: RANK_COLORS[entry.rank - 1] }} />
                ) : (
                  <span className="text-pumple-muted text-[11px] font-bold">#{entry.rank}</span>
                )}
              </div>

              {/* Trader */}
              <div className="flex items-center gap-2">
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${tierColor}20`, border: `1px solid ${tierColor}40` }}
                >
                  <span style={{ color: tierColor }}>{TIER_ICONS[entry.tier]}</span>
                </div>
                <div>
                  <p className="text-[11px] font-semibold text-pumple-text">{entry.user}</p>
                  <TierBadge tier={entry.tier} size="sm" />
                </div>
              </div>

              {/* Accuracy */}
              <span className="text-pumple-primary text-[11px] font-bold">{entry.accuracy}</span>

              {/* Calls */}
              <span className="text-pumple-muted text-[11px]">{entry.calls}</span>

              {/* Streak */}
              <div className="flex items-center gap-1">
                {streakHot && (
                  <Flame
                    size={11}
                    style={{ color: entry.streak >= 5 ? '#FBBF24' : '#F43F5E' }}
                  />
                )}
                <span
                  className="text-[11px] font-bold"
                  style={{ color: entry.streak >= 5 ? '#FBBF24' : '#F1F5F9' }}
                >
                  {entry.streak}
                </span>
              </div>

              {/* $PUMP */}
              <span className="text-pumple-accent text-[11px] font-bold">{entry.pump}</span>
            </div>
          )
        })}
      </div>
    </motion.div>
  )
}
