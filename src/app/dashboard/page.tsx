'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Radio, Target, Swords, Flame, Bot, Shield, Crown } from 'lucide-react'
import StatCard from '@/components/ui/StatCard'
import SignalCard from '@/components/ui/SignalCard'
import TierBadge from '@/components/ui/TierBadge'
import { SIGNALS, BATTLES, FEED_POSTS, LEADERBOARD } from '@/lib/mock-data'
import { TIERS } from '@/types'

const STATS = [
  { label: 'Signals today',   value: '247',      icon: Radio,   color: '#4ADE80' },
  { label: 'Your accuracy',   value: '78.4%',    icon: Target,  color: '#A78BFA' },
  { label: 'Active battles',  value: '34',       icon: Swords,  color: '#FBBF24' },
  { label: 'Win streak',      value: '5 days',   icon: Flame,   color: '#A3E635' },
]

function confColor(c: number): string {
  return c >= 80 ? '#4ADE80' : c >= 65 ? '#FBBF24' : '#F43F5E'
}

export default function DashboardPage() {
  const topSignal = SIGNALS[0]
  const topBattle = BATTLES[0]
  const trendingPosts = [...FEED_POSTS].sort((a, b) => b.likes - a.likes).slice(0, 2)
  const topSignals = [...SIGNALS].sort((a, b) => b.confidence - a.confidence).slice(0, 3)
  const topTrader = LEADERBOARD[0]
  const traderTierColor = TIERS[topTrader.tier].color

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* Trending strip */}
      <p className="text-xs font-bold text-pumple-muted mb-2">🔥 Hot right now</p>
      <div className="flex gap-3 overflow-x-auto pb-2 mb-3">
        <Link
          href="/signals/1"
          className="flex-shrink-0 min-w-[220px] bg-pumple-card border border-pumple-border rounded-[10px] p-2.5 flex items-center gap-2 cursor-pointer hover:border-pumple-primary/30 transition-colors"
        >
          <Radio size={14} className="text-pumple-primary flex-shrink-0" />
          <span className="text-xs font-bold text-pumple-text">BTC/USDT</span>
          <span className="text-[10px] text-pumple-primary ml-auto">87% confidence</span>
        </Link>
        <Link
          href="/battles"
          className="flex-shrink-0 min-w-[220px] bg-pumple-card border border-pumple-border rounded-[10px] p-2.5 flex items-center gap-2 cursor-pointer hover:border-pumple-primary/30 transition-colors"
        >
          <Swords size={14} className="text-pumple-accent flex-shrink-0" />
          <span className="text-xs font-bold text-pumple-text">BTC/USDT Battle</span>
          <span className="text-[10px] text-pumple-muted ml-auto">847 watching</span>
        </Link>
        <Link
          href="/tribes"
          className="flex-shrink-0 min-w-[220px] bg-pumple-card border border-pumple-border rounded-[10px] p-2.5 flex items-center gap-2 cursor-pointer hover:border-pumple-primary/30 transition-colors"
        >
          <Crown size={14} className="text-pumple-gold flex-shrink-0" />
          <span className="text-xs font-bold text-pumple-text">Legend Circle</span>
          <span className="text-[10px] text-pumple-primary ml-auto">88.7% accuracy</span>
        </Link>
      </div>

      {/* 1. Stats row — full width */}
      <div className="grid grid-cols-4 gap-2 mb-3">
        {STATS.map(stat => (
          <StatCard
            key={stat.label}
            label={stat.label}
            value={stat.value}
            icon={stat.icon}
            color={stat.color}
          />
        ))}
      </div>

      {/* Main + sidebar */}
      <div className="flex gap-4 mt-3">

        {/* Main column */}
        <div className="flex-1 min-w-0">

          {/* 2. Top signal spotlight */}
          <div className="flex justify-between items-center mb-2.5">
            <h2 className="text-sm font-bold text-pumple-text">Today&apos;s top signal</h2>
            <Link href="/signals" className="text-[11px] text-pumple-primary hover:underline">
              View all signals →
            </Link>
          </div>
          <div className="max-w-[680px]">
            <SignalCard signal={topSignal} />
          </div>

          {/* 3. AI insight + Battle highlight */}
          <div className="grid grid-cols-2 gap-4 mt-4">

            {/* AI insight */}
            <div className="bg-pumple-card border border-pumple-border rounded-[12px] p-4">
              <div className="flex items-center gap-2 mb-3">
                <Bot size={15} className="text-pumple-primary" />
                <span className="text-sm font-bold text-pumple-text">AI&apos;s take today</span>
              </div>
              <p className="text-xs text-pumple-muted leading-relaxed">
                Market sentiment leans bullish with BTC holding above key support. SMC structures align across BTC and SOL, while ETH shows short-term weakness. Watch for continuation above $68k on BTC.
              </p>
              <Link href="/ai" className="inline-block text-[11px] text-pumple-primary mt-3 hover:underline">
                Ask AI Analyst →
              </Link>
            </div>

            {/* Live battle highlight */}
            <div className="bg-pumple-card border border-pumple-border rounded-[12px] p-4">
              <div className="flex items-center gap-2 mb-3">
                <Swords size={15} className="text-pumple-accent" />
                <span className="text-sm font-bold text-pumple-text">Hottest battle</span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-pumple-text truncate">
                    {topBattle.player1.username} vs {topBattle.player2?.username ?? 'Open'}
                  </span>
                  <span className="text-[10px] text-pumple-muted flex-shrink-0">
                    {topBattle.stake ? `${topBattle.stake} · ` : ''}{topBattle.watchers} watching
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-pumple-primary">{topBattle.player1.username}</span>
                  <span className="font-bold" style={{ color: topBattle.player1.currentPnL >= 0 ? '#4ADE80' : '#F43F5E' }}>
                    {topBattle.player1.currentPnL >= 0 ? '+' : ''}{topBattle.player1.currentPnL}%
                  </span>
                </div>
                {topBattle.player2 && (
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-pumple-text">{topBattle.player2.username}</span>
                    <span className="font-bold" style={{ color: topBattle.player2.currentPnL >= 0 ? '#4ADE80' : '#F43F5E' }}>
                      {topBattle.player2.currentPnL >= 0 ? '+' : ''}{topBattle.player2.currentPnL}%
                    </span>
                  </div>
                )}
                <div className="flex items-center gap-1 text-[11px] text-pumple-muted">
                  <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
                  {topBattle.timeLeft ?? topBattle.duration} left
                </div>
              </div>
              <Link href="/battles" className="inline-block text-[11px] text-pumple-primary mt-3 hover:underline">
                View arena →
              </Link>
            </div>
          </div>

          {/* 4. Tribe CTA + Trending in feed */}
          <div className="grid grid-cols-2 gap-4 mt-4">

            {/* Tribe CTA */}
            <div className="bg-pumple-card border border-pumple-border rounded-[12px] p-4 flex flex-col items-center text-center">
              <Shield size={28} className="text-pumple-muted mb-3" />
              <p className="text-sm font-semibold text-pumple-text mb-1">You haven&apos;t joined a tribe yet</p>
              <p className="text-xs text-pumple-muted leading-relaxed mb-3">
                Join a tribe to compete together and earn more $PUMP
              </p>
              <Link
                href="/tribes"
                className="inline-block text-xs font-bold border border-pumple-primary/30 text-pumple-primary rounded-md px-3 py-1.5 hover:bg-pumple-primary/10 transition-colors"
              >
                Discover tribes →
              </Link>
            </div>

            {/* Trending in feed */}
            <div className="bg-pumple-card border border-pumple-border rounded-[12px] p-4">
              <p className="text-sm font-bold text-pumple-text mb-3">Trending in feed</p>
              <div className="flex flex-col gap-3">
                {trendingPosts.map(post => {
                  const tierColor = TIERS[post.tier].color
                  return (
                    <div key={post.id} className="flex gap-2.5">
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                        style={{ backgroundColor: `${tierColor}20`, border: `2px solid ${tierColor}60`, color: tierColor }}
                      >
                        {post.user[0].toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <span className="text-xs font-semibold text-pumple-text">{post.user}</span>
                          <TierBadge tier={post.tier} size="sm" />
                        </div>
                        <p className="text-[11px] text-pumple-muted truncate">{post.content}</p>
                        <div className="flex items-center gap-2 mt-0.5 text-[10px] text-pumple-muted">
                          <span>♥ {post.likes}</span>
                          <span>· {post.reposts} reposts</span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
              <Link href="/feed" className="inline-block text-[11px] text-pumple-primary mt-3 hover:underline">
                Go to feed →
              </Link>
            </div>
          </div>
        </div>

        {/* Right sidebar */}
        <div className="w-[300px] flex-shrink-0 hidden lg:flex flex-col gap-4 sticky top-4 self-start">

          {/* Top Signals */}
          <div className="bg-pumple-card border border-pumple-border rounded-[12px] p-4">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-bold text-pumple-text">Top signals</span>
              <Link href="/signals" className="text-[11px] text-pumple-primary hover:underline">View all</Link>
            </div>
            {topSignals.map((s, i) => {
              const dirColor = s.direction === 'LONG' ? '#4ADE80' : '#F43F5E'
              return (
                <div
                  key={s.id}
                  className="flex items-center justify-between py-2"
                  style={{ borderBottom: i < topSignals.length - 1 ? '1px solid #1E2235' : 'none' }}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="text-[9px] font-bold px-1.5 py-0.5 rounded-[3px]"
                      style={{ backgroundColor: `${dirColor}20`, color: dirColor, border: `1px solid ${dirColor}40` }}
                    >
                      {s.direction}
                    </span>
                    <span className="text-xs font-bold text-pumple-text">{s.coin}</span>
                  </div>
                  <span className="text-xs font-bold" style={{ color: confColor(s.confidence) }}>
                    {s.confidence}%
                  </span>
                </div>
              )
            })}
          </div>

          {/* Top Trader */}
          <div className="bg-pumple-card border border-pumple-border rounded-[12px] p-4">
            <p className="text-sm font-bold text-pumple-text mb-3">Top trader</p>
            <div className="flex flex-col items-center text-center">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center text-xl font-black"
                style={{ backgroundColor: `${traderTierColor}20`, border: `2px solid ${traderTierColor}60`, color: traderTierColor }}
              >
                {topTrader.user[0].toUpperCase()}
              </div>
              <span className="text-sm font-bold text-pumple-text mt-2">{topTrader.user}</span>
              <div className="mt-1">
                <TierBadge tier={topTrader.tier} size="sm" />
              </div>
              <span className="text-xl font-black text-pumple-primary mt-1">{topTrader.accuracy}</span>
            </div>
            <div className="flex justify-center gap-4 mt-2 pt-2 border-t border-pumple-border">
              <div className="text-center">
                <p className="text-[9px] uppercase font-bold text-pumple-muted mb-0.5">Calls</p>
                <p className="text-xs font-bold text-pumple-text">{topTrader.calls}</p>
              </div>
              <div className="text-center">
                <p className="text-[9px] uppercase font-bold text-pumple-muted mb-0.5">Streak</p>
                <p className="text-xs font-bold text-pumple-text">{topTrader.streak}</p>
              </div>
            </div>
            <Link
              href={`/profile/${topTrader.user}`}
              className="block text-[11px] text-pumple-primary mt-2 text-center hover:underline"
            >
              View profile →
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
