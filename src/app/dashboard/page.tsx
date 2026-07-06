'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Radio, Target, Swords, Flame, Bot, Shield, Crown, Sparkles } from 'lucide-react'
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
      <p className="flex items-center gap-1.5 text-xs font-bold text-pumple-muted mb-2">
        <Flame size={12} className="text-pumple-gold" />
        Hot right now
      </p>
      <div className="flex gap-3 overflow-x-auto pb-2 mb-3">
        <Link
          href="/signals/1"
          className="p-card p-card-hover flex-shrink-0 min-w-[220px] rounded-[10px] p-2.5 flex items-center gap-2 cursor-pointer"
        >
          <Radio size={14} className="text-pumple-primary flex-shrink-0" />
          <span className="text-xs font-bold text-pumple-text">BTC/USDT</span>
          <span className="text-[10px] font-bold tnum text-pumple-primary ml-auto">87% confidence</span>
        </Link>
        <Link
          href="/battles"
          className="p-card p-card-hover flex-shrink-0 min-w-[220px] rounded-[10px] p-2.5 flex items-center gap-2 cursor-pointer"
        >
          <Swords size={14} className="text-pumple-accent flex-shrink-0" />
          <span className="text-xs font-bold text-pumple-text">BTC/USDT Battle</span>
          <span className="text-[10px] tnum text-pumple-muted ml-auto">847 watching</span>
        </Link>
        <Link
          href="/tribes"
          className="p-card p-card-hover flex-shrink-0 min-w-[220px] rounded-[10px] p-2.5 flex items-center gap-2 cursor-pointer"
        >
          <Crown size={14} className="text-pumple-gold flex-shrink-0" />
          <span className="text-xs font-bold text-pumple-text">Legend Circle</span>
          <span className="text-[10px] font-bold tnum text-pumple-primary ml-auto">88.7% accuracy</span>
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

          {/* 2. King of the Hill — top signal spotlight */}
          <div className="flex justify-between items-center mb-2.5">
            <h2 className="flex items-center gap-2 font-display text-sm font-bold text-pumple-text">
              <Crown
                size={16}
                className="text-pumple-gold"
                style={{ animation: 'float-bob 3s ease-in-out infinite', filter: 'drop-shadow(0 0 6px rgba(251,191,36,0.6))' }}
              />
              King of the Hill
              <span className="text-[9px] font-black uppercase tracking-wider text-pumple-gold bg-pumple-gold/10 border border-pumple-gold/30 px-1.5 py-0.5 rounded-full">
                Top signal
              </span>
            </h2>
            <Link href="/signals" className="text-[11px] font-semibold text-pumple-primary hover:underline">
              View all signals →
            </Link>
          </div>
          <div className="max-w-[680px] king-frame [&>div]:mb-0">
            <SignalCard signal={topSignal} />
          </div>

          {/* 3. AI insight + Battle highlight */}
          <div className="grid grid-cols-2 gap-4 mt-4">

            {/* AI insight */}
            <div className="p-card p-card-hover p-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 rounded-md bg-pumple-primary/15 border border-pumple-primary/30 flex items-center justify-center">
                  <Bot size={13} className="text-pumple-primary" />
                </div>
                <span className="font-display text-sm font-bold text-pumple-text">AI&apos;s take today</span>
                <Sparkles size={11} className="text-pumple-accent" />
              </div>
              <p className="text-xs text-pumple-muted leading-relaxed">
                Market sentiment leans bullish with BTC holding above key support. SMC structures align across BTC and SOL, while ETH shows short-term weakness. Watch for continuation above $68k on BTC.
              </p>
              <Link href="/ai" className="inline-block text-[11px] font-semibold text-pumple-primary mt-3 hover:underline">
                Ask AI Analyst →
              </Link>
            </div>

            {/* Live battle highlight */}
            <div className="p-card p-card-hover p-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 rounded-md bg-pumple-accent/15 border border-pumple-accent/30 flex items-center justify-center">
                  <Swords size={13} className="text-pumple-accent" />
                </div>
                <span className="font-display text-sm font-bold text-pumple-text">Hottest battle</span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-pumple-text truncate">
                    {topBattle.player1.username} vs {topBattle.player2?.username ?? 'Open'}
                  </span>
                  <span className="text-[10px] tnum text-pumple-muted flex-shrink-0">
                    {topBattle.stake ? `${topBattle.stake} · ` : ''}{topBattle.watchers} watching
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-pumple-primary">{topBattle.player1.username}</span>
                  <span className="font-bold tnum" style={{ color: topBattle.player1.currentPnL >= 0 ? '#4ADE80' : '#F43F5E' }}>
                    {topBattle.player1.currentPnL >= 0 ? '+' : ''}{topBattle.player1.currentPnL}%
                  </span>
                </div>
                {topBattle.player2 && (
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-pumple-text">{topBattle.player2.username}</span>
                    <span className="font-bold tnum" style={{ color: topBattle.player2.currentPnL >= 0 ? '#4ADE80' : '#F43F5E' }}>
                      {topBattle.player2.currentPnL >= 0 ? '+' : ''}{topBattle.player2.currentPnL}%
                    </span>
                  </div>
                )}
                <div className="flex items-center gap-1.5 text-[11px] text-pumple-muted">
                  <span className="live-dot live-dot--gold" aria-hidden />
                  {topBattle.timeLeft ?? topBattle.duration} left
                </div>
              </div>
              <Link href="/battles" className="inline-block text-[11px] font-semibold text-pumple-primary mt-3 hover:underline">
                View arena →
              </Link>
            </div>
          </div>

          {/* 4. Tribe CTA + Trending in feed */}
          <div className="grid grid-cols-2 gap-4 mt-4">

            {/* Tribe CTA */}
            <div className="p-card p-card-hover p-4 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-[14px] bg-pumple-elevated border border-pumple-border flex items-center justify-center mb-3">
                <Shield size={22} className="text-pumple-muted" />
              </div>
              <p className="text-sm font-semibold text-pumple-text mb-1">You haven&apos;t joined a tribe yet</p>
              <p className="text-xs text-pumple-muted leading-relaxed mb-3">
                Join a tribe to compete together and earn more $PUMP
              </p>
              <Link href="/tribes" className="btn-outline-lime text-xs px-3.5 py-1.5">
                Discover tribes →
              </Link>
            </div>

            {/* Trending in feed */}
            <div className="p-card p-card-hover p-4">
              <p className="font-display text-sm font-bold text-pumple-text mb-3">Trending in feed</p>
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
                        <div className="flex items-center gap-2 mt-0.5 text-[10px] tnum text-pumple-muted">
                          <span>♥ {post.likes}</span>
                          <span>· {post.reposts} reposts</span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
              <Link href="/feed" className="inline-block text-[11px] font-semibold text-pumple-primary mt-3 hover:underline">
                Go to feed →
              </Link>
            </div>
          </div>
        </div>

        {/* Right sidebar */}
        <div className="w-[300px] flex-shrink-0 hidden lg:flex flex-col gap-4 sticky top-4 self-start">

          {/* Top Signals */}
          <div className="p-card p-4">
            <div className="flex justify-between items-center mb-3">
              <span className="font-display text-sm font-bold text-pumple-text">Top signals</span>
              <Link href="/signals" className="text-[11px] font-semibold text-pumple-primary hover:underline">View all</Link>
            </div>
            {topSignals.map((s, i) => {
              const dirColor = s.direction === 'LONG' ? '#4ADE80' : '#F43F5E'
              return (
                <Link
                  href={`/signals/${s.id}`}
                  key={s.id}
                  className={`flex items-center justify-between py-2 -mx-2 px-2 rounded-lg hover:bg-pumple-elevated/60 transition-colors ${
                    i < topSignals.length - 1 ? 'border-b border-pumple-border' : ''
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="text-[9px] font-black px-1.5 py-0.5 rounded"
                      style={{ backgroundColor: `${dirColor}1c`, color: dirColor, border: `1px solid ${dirColor}40` }}
                    >
                      {s.direction}
                    </span>
                    <span className="text-xs font-bold text-pumple-text">{s.coin}</span>
                  </div>
                  <span className="text-xs font-black tnum" style={{ color: confColor(s.confidence) }}>
                    {s.confidence}%
                  </span>
                </Link>
              )
            })}
          </div>

          {/* Top Trader */}
          <div className="p-card p-4">
            <p className="font-display text-sm font-bold text-pumple-text mb-3">Top trader</p>
            <div className="flex flex-col items-center text-center">
              <div className="relative">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center text-xl font-black"
                  style={{
                    backgroundColor: `${traderTierColor}20`,
                    border: `2px solid ${traderTierColor}`,
                    color: traderTierColor,
                    boxShadow: `0 0 18px ${traderTierColor}40`,
                  }}
                >
                  {topTrader.user[0].toUpperCase()}
                </div>
                <Crown
                  size={16}
                  className="absolute -top-2 left-1/2 -translate-x-1/2 text-pumple-gold"
                  style={{ filter: 'drop-shadow(0 0 5px rgba(251,191,36,0.7))' }}
                />
              </div>
              <span className="text-sm font-bold text-pumple-text mt-2">{topTrader.user}</span>
              <div className="mt-1">
                <TierBadge tier={topTrader.tier} size="sm" />
              </div>
              <span className="font-display text-xl font-bold tnum text-pumple-primary mt-1 text-glow-lime">{topTrader.accuracy}</span>
            </div>
            <div className="flex justify-center gap-4 mt-2 pt-2 border-t border-pumple-border">
              <div className="text-center">
                <p className="text-[9px] uppercase font-bold text-pumple-muted mb-0.5">Calls</p>
                <p className="text-xs font-bold tnum text-pumple-text">{topTrader.calls}</p>
              </div>
              <div className="text-center">
                <p className="text-[9px] uppercase font-bold text-pumple-muted mb-0.5">Streak</p>
                <p className="text-xs font-bold tnum text-pumple-text">{topTrader.streak}</p>
              </div>
            </div>
            <Link
              href={`/profile/${topTrader.user}`}
              className="block text-[11px] font-semibold text-pumple-primary mt-2 text-center hover:underline"
            >
              View profile →
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
