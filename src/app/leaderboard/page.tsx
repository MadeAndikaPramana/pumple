'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Trophy, Crown } from 'lucide-react'
import { TIERS } from '@/types'
import TierBadge from '@/components/ui/TierBadge'
import TraderAvatar from '@/components/ui/TraderAvatar'
import { LEADERBOARD } from '@/lib/mock-data'

type Entry = (typeof LEADERBOARD)[number]

const TIME_FILTERS = ['Last 7D', 'Last 30D', 'All Time']

function rankBadgeStyle(rank: number): React.CSSProperties {
  if (rank === 1) return { backgroundColor: '#FACC15', color: '#000' }
  if (rank === 2) return { backgroundColor: '#71717A', color: '#000' }
  return { backgroundColor: '#CD7C3A', color: '#fff' }
}

function initials(user: string) {
  return user.slice(0, 2).toUpperCase()
}

function walletAddress(user: string) {
  return `${user.slice(0, 4)}...${user.slice(-4)}`
}

function SignalPill({ coin, multiple }: { coin: string; multiple: string }) {
  return (
    <div className="flex items-center gap-1.5 bg-pumple-elevated border border-pumple-border rounded-full px-2 py-0.5">
      <div className="w-4 h-4 rounded-full bg-pumple-dim flex items-center justify-center text-[8px] font-bold text-pumple-muted flex-shrink-0">
        {coin[0]}
      </div>
      <span className="text-[10px] font-semibold text-pumple-text">{coin}</span>
      <span className="text-[10px] font-black tnum text-pumple-primary">{multiple}</span>
    </div>
  )
}

function Metric({
  label,
  value,
  color,
  glow,
  className,
}: {
  label: string
  value: string
  color: string
  glow?: boolean
  className?: string
}) {
  return (
    <div className={`text-right ${className ?? ''}`}>
      <p className="text-[9px] font-bold text-pumple-muted tracking-widest">{label}</p>
      <p className={`font-display text-sm font-bold tnum ${color} ${glow ? 'text-glow-lime' : ''}`}>{value}</p>
    </div>
  )
}

function LeaderRow({ entry, featured }: { entry: Entry; featured: boolean }) {
  const tierColor = TIERS[entry.tier].color
  const isFirst = entry.rank === 1

  return (
    <div
      className={`p-card p-card-hover px-3 py-2.5 mb-2 ${isFirst ? '!border-pumple-gold/40' : ''}`}
      style={isFirst ? { animation: 'gold-pulse 3s ease-in-out infinite' } : undefined}
    >
      <div className="flex items-center gap-3">
        {/* Rank */}
        <div className="w-7 flex-shrink-0 flex justify-center">
          {featured ? (
            <span
              className="flex items-center gap-0.5 text-[11px] font-black px-1.5 py-0.5 rounded-full"
              style={rankBadgeStyle(entry.rank)}
            >
              {isFirst ? <Crown size={10} /> : <Trophy size={10} />}
              {entry.rank}
            </span>
          ) : (
            <span className="text-sm font-black tnum text-pumple-muted">#{entry.rank}</span>
          )}
        </div>

        {/* Avatar */}
        <Link href={`/profile/${entry.user}`} className="flex-shrink-0 relative">
          {isFirst && (
            <Crown
              size={15}
              className="absolute -top-2.5 left-1/2 -translate-x-1/2 text-pumple-gold z-10"
              style={{ animation: 'float-bob 3s ease-in-out infinite', filter: 'drop-shadow(0 0 5px rgba(250, 204, 21,0.7))' }}
            />
          )}
          <TraderAvatar name={entry.user} initials={initials(entry.user)} tier={entry.tier} size="md" glow={isFirst} />
        </Link>

        {/* Identity */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5 min-w-0">
            <Link
              href={`/profile/${entry.user}`}
              className="font-bold text-sm text-pumple-text hover:text-pumple-primary transition-colors truncate"
            >
              {entry.user}
            </Link>
            <TierBadge tier={entry.tier} size="sm" />
          </div>
          <p className="text-[10px] text-pumple-muted truncate">
            {walletAddress(entry.user)} · <span className="tnum">{entry.calls}</span> calls
          </p>
        </div>

        {/* Metrics (collapse progressively on small screens) */}
        <div className="hidden sm:flex items-center gap-5 flex-shrink-0">
          <Metric label="ACCURACY" value={entry.accuracy} color="text-pumple-primary" glow={isFirst} />
          <Metric label="WIN RATE" value={entry.winRate} color="text-pumple-accent" />
          <Metric label="PORTFOLIO" value={entry.portfolio} color="text-pumple-text" className="hidden lg:block" />
        </div>

        {/* Recent calls — desktop only */}
        <div className="hidden xl:flex gap-1.5 flex-shrink-0">
          {entry.recentSignals.slice(0, 3).map((s, i) => (
            <SignalPill key={i} coin={s.coin} multiple={s.multiple} />
          ))}
        </div>

        {/* Follow */}
        <button className="btn-ghost text-[11px] px-3 py-1 flex-shrink-0">Follow</button>
      </div>

      {/* Mobile metrics */}
      <div className="flex sm:hidden items-center gap-5 mt-2 pl-10">
        <Metric label="ACCURACY" value={entry.accuracy} color="text-pumple-primary" glow={isFirst} />
        <Metric label="WIN RATE" value={entry.winRate} color="text-pumple-accent" />
      </div>
    </div>
  )
}

export default function LeaderboardPage() {
  const [activeFilter, setActiveFilter] = useState('Last 7D')

  const topThree = LEADERBOARD.slice(0, 3)
  const runnersUp = LEADERBOARD.slice(3)

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-5 gap-3 flex-wrap">
        <div>
          <h1 className="flex items-center gap-2 font-display text-2xl font-bold text-pumple-text">
            <Trophy size={22} className="text-pumple-gold" style={{ filter: 'drop-shadow(0 0 8px rgba(250, 204, 21,0.5))' }} />
            Callout leaderboard
          </h1>
          <p className="text-sm text-pumple-muted mt-1">Top traders ranked by verified signal performance.</p>
        </div>
        <div className="flex gap-1.5 flex-shrink-0">
          {TIME_FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`pill text-[11px] px-3 py-1.5 ${activeFilter === f ? 'pill--active' : ''}`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Podium — dense rows */}
      <p className="flex items-center gap-1.5 text-[11px] font-black text-pumple-gold tracking-widest mb-3">
        <Crown size={12} />
        TOP 3
      </p>
      {topThree.map(entry => (
        <LeaderRow key={entry.rank} entry={entry} featured />
      ))}

      {/* Runners up */}
      <p className="text-[11px] font-black text-pumple-muted tracking-widest mb-3 mt-6">RUNNERS UP</p>
      {runnersUp.map(entry => (
        <LeaderRow key={entry.rank} entry={entry} featured={false} />
      ))}
    </motion.div>
  )
}
