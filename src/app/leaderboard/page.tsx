'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Trophy, Wallet, Box } from 'lucide-react'
import { TIERS } from '@/types'
import TierBadge from '@/components/ui/TierBadge'
import { LEADERBOARD } from '@/lib/mock-data'

type Entry = (typeof LEADERBOARD)[number]

const TIME_FILTERS = ['Last 7D', 'Last 30D', 'All Time']

function rankBadgeStyle(rank: number): React.CSSProperties {
  if (rank === 1) return { backgroundColor: '#FBBF24', color: '#000' }
  if (rank === 2) return { backgroundColor: '#94A3B8', color: '#000' }
  return { backgroundColor: '#CD7C3A', color: '#fff' }
}

function initials(user: string) {
  return user.slice(0, 2).toUpperCase()
}

function walletAddress(user: string) {
  return `${user.slice(0, 4)}...${user.slice(-4)}`
}

function SignalPill({ coin, multiple, small }: { coin: string; multiple: string; small?: boolean }) {
  const size = small ? 'text-[10px]' : 'text-[11px]'
  return (
    <div className="flex items-center gap-1.5 bg-pumple-elevated border border-pumple-border rounded-full px-2.5 py-1">
      <div className="w-5 h-5 rounded-full bg-pumple-dim flex items-center justify-center text-[9px] font-bold text-pumple-muted flex-shrink-0">
        {coin[0]}
      </div>
      <span className={`${size} font-semibold text-pumple-text`}>{coin}</span>
      <span className={`${size} font-black text-pumple-primary`}>{multiple}</span>
    </div>
  )
}

function TopCard({ entry }: { entry: Entry }) {
  const tierColor = TIERS[entry.tier].color
  const isFirst = entry.rank === 1

  return (
    <div
      className={`bg-pumple-card border rounded-[16px] p-5 relative overflow-hidden ${
        isFirst ? 'border-pumple-primary/40 self-start -mt-2' : 'border-pumple-border'
      }`}
      style={isFirst ? { boxShadow: '0 0 20px rgba(74,222,128,0.08)' } : undefined}
    >
      {/* Rank badge */}
      <div
        className="absolute top-3 left-3 text-[11px] font-black px-2 py-0.5 rounded-full flex items-center gap-1"
        style={rankBadgeStyle(entry.rank)}
      >
        <Trophy size={10} />
        {entry.rank}
      </div>

      {/* Follow */}
      <button className="absolute top-3 right-3 bg-pumple-elevated border border-pumple-border text-[11px] font-bold px-3 py-1 rounded-md text-pumple-muted hover:border-pumple-primary hover:text-pumple-primary transition-colors">
        Follow
      </button>

      {/* User info */}
      <div className="flex items-center gap-3 mt-6 mb-4">
        <Link href={`/profile/${entry.user}`} className="flex-shrink-0">
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center text-lg font-black"
            style={{ backgroundColor: `${tierColor}20`, border: `2px solid ${tierColor}`, color: tierColor }}
          >
            {initials(entry.user)}
          </div>
        </Link>
        <div className="min-w-0">
          <Link
            href={`/profile/${entry.user}`}
            className="block text-base font-black text-pumple-text truncate hover:text-pumple-primary transition-colors"
          >
            {entry.user}
          </Link>
          <p className="text-[11px] text-pumple-muted">{walletAddress(entry.user)}</p>
          <div className="mt-1">
            <TierBadge tier={entry.tier} size="sm" />
          </div>
        </div>
      </div>

      {/* Main metrics */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-pumple-elevated rounded-[10px] p-3">
          <p className="text-[9px] font-bold text-pumple-muted tracking-widest">AVG ACCURACY</p>
          <p className="text-2xl font-black text-pumple-primary">{entry.accuracy}</p>
        </div>
        <div className="bg-pumple-elevated rounded-[10px] p-3">
          <p className="text-[9px] font-bold text-pumple-muted tracking-widest">WIN RATE</p>
          <p className="text-2xl font-black text-pumple-accent">{entry.winRate}</p>
        </div>
      </div>

      {/* Secondary metrics */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        <div className="flex items-center gap-1.5">
          <Wallet size={12} className="text-pumple-muted flex-shrink-0" />
          <span className="text-[9px] text-pumple-muted">PORTFOLIO</span>
          <span className="text-xs font-bold text-pumple-text ml-auto">{entry.portfolio}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Box size={12} className="text-pumple-muted flex-shrink-0" />
          <span className="text-[9px] text-pumple-muted">HOLDINGS</span>
          <span className="text-xs font-bold text-pumple-text ml-auto">{entry.holdings}</span>
        </div>
      </div>

      {/* Updated indicator */}
      <div className="flex items-center gap-1 text-[10px] text-pumple-muted mb-3">
        <span className="w-1.5 h-1.5 rounded-full bg-pumple-primary animate-pulse" />
        Updated just now
      </div>

      {/* Recent signals */}
      <p className="text-[9px] font-bold text-pumple-muted tracking-widest mb-2">RECENT CALLS</p>
      <div className="flex gap-2 flex-wrap">
        {entry.recentSignals.map((s, i) => (
          <SignalPill key={i} coin={s.coin} multiple={s.multiple} />
        ))}
      </div>
    </div>
  )
}

export default function LeaderboardPage() {
  const [activeFilter, setActiveFilter] = useState('Last 7D')

  // Featured order: [rank2, rank1, rank3] — rank 1 in the center.
  const featured = [LEADERBOARD[1], LEADERBOARD[0], LEADERBOARD[2]]
  const runnersUp = LEADERBOARD.slice(3)

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-black text-pumple-text">Callout leaderboard</h1>
          <p className="text-sm text-pumple-muted mt-1">Top traders ranked by verified signal performance.</p>
        </div>
        <div className="flex gap-1.5 flex-shrink-0">
          {TIME_FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`text-[11px] px-3 py-1.5 rounded-full transition-colors ${
                activeFilter === f
                  ? 'bg-pumple-primary text-black font-bold'
                  : 'bg-pumple-elevated border border-pumple-border text-pumple-muted hover:text-pumple-text'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Top 3 featured */}
      <div className="grid grid-cols-3 gap-4 mb-8 items-start">
        {featured.map(entry => (
          <TopCard key={entry.rank} entry={entry} />
        ))}
      </div>

      {/* Runners up */}
      <p className="text-[11px] font-black text-pumple-muted tracking-widest mb-3">RUNNERS UP</p>
      {runnersUp.map(entry => {
        const tierColor = TIERS[entry.tier].color
        return (
          <div key={entry.rank} className="bg-pumple-card border border-pumple-border rounded-[12px] p-4 mb-3">
            <div className="flex items-center gap-4">
              <span className="text-sm font-black text-pumple-muted w-6 flex-shrink-0">#{entry.rank}</span>
              <Link href={`/profile/${entry.user}`} className="flex-shrink-0">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-black"
                  style={{ backgroundColor: `${tierColor}20`, border: `2px solid ${tierColor}`, color: tierColor }}
                >
                  {initials(entry.user)}
                </div>
              </Link>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <Link href={`/profile/${entry.user}`} className="font-bold text-sm text-pumple-text hover:text-pumple-primary transition-colors">{entry.user}</Link>
                  <TierBadge tier={entry.tier} size="sm" />
                </div>
                <p className="text-[11px] text-pumple-muted">{entry.calls} recent calls</p>
              </div>
              <div className="flex items-center gap-6 flex-shrink-0">
                <div>
                  <p className="text-[9px] text-pumple-muted tracking-widest">AVG ACCURACY</p>
                  <p className="font-black text-pumple-primary text-sm">{entry.accuracy}</p>
                </div>
                <div>
                  <p className="text-[9px] text-pumple-muted tracking-widest">WIN RATE</p>
                  <p className="font-black text-pumple-accent text-sm">{entry.winRate}</p>
                </div>
                <button className="border border-pumple-border rounded-md px-3 py-1 text-[11px] font-bold text-pumple-muted hover:border-pumple-primary hover:text-pumple-primary transition-colors">
                  Follow
                </button>
              </div>
            </div>

            {/* Signal pills */}
            <div className="mt-2 ml-10 flex gap-2 flex-wrap">
              {entry.recentSignals.map((s, i) => (
                <SignalPill key={i} coin={s.coin} multiple={s.multiple} small />
              ))}
            </div>
          </div>
        )
      })}
    </motion.div>
  )
}
