'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Radio, Target, Swords, Flame, Bot, Shield, Crown, Sparkles } from 'lucide-react'
import StatCard from '@/components/ui/StatCard'
import SignalCard from '@/components/ui/SignalCard'
import TierBadge from '@/components/ui/TierBadge'
import TraderAvatar from '@/components/ui/TraderAvatar'
import { SIGNALS, BATTLES, FEED_POSTS, LEADERBOARD } from '@/lib/mock-data'
import { TIERS } from '@/types'

const STATS = [
  { label: 'Signals today',   value: '247',      icon: Radio,   color: '#1FD978' },
  { label: 'Your accuracy',   value: '78.4%',    icon: Target,  color: '#C084FC' },
  { label: 'Active battles',  value: '34',       icon: Swords,  color: '#FACC15' },
  { label: 'Win streak',      value: '5 days',   icon: Flame,   color: '#86EFAC' },
]

function confColor(c: number): string {
  return c >= 80 ? '#1FD978' : c >= 65 ? '#FACC15' : '#FF6467'
}

export default function DashboardPage() {
  const topSignal = SIGNALS[0]
  const topBattle = BATTLES[0]
  const trendingPosts = [...FEED_POSTS].sort((a, b) => b.likes - a.likes).slice(0, 2)
  const topSignals = [...SIGNALS].sort((a, b) => b.confidence - a.confidence).slice(0, 3)
  const topTrader = LEADERBOARD[0]

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
                style={{ animation: 'float-bob 3s ease-in-out infinite', filter: 'drop-shadow(0 0 6px rgba(250, 204, 21,0.6))' }}
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

          {/* Join-a-tribe nudge — compact inline banner */}
          <Link
            href="/tribes"
            className="p-card p-card-hover flex items-center gap-3 px-3 py-2.5 mt-4 group"
          >
            <div className="w-8 h-8 rounded-[10px] bg-pumple-primary/12 border border-pumple-primary/25 flex items-center justify-center flex-shrink-0">
              <Shield size={15} className="text-pumple-primary" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-pumple-text truncate">You haven&apos;t joined a tribe yet</p>
              <p className="text-[11px] text-pumple-muted truncate">Team up to compete together and earn more $PUMP</p>
            </div>
            <span className="btn-outline-lime text-[11px] px-3 py-1.5 flex-shrink-0">
              Discover tribes →
            </span>
          </Link>

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
                  <span className="font-bold tnum" style={{ color: topBattle.player1.currentPnL >= 0 ? '#1FD978' : '#FF6467' }}>
                    {topBattle.player1.currentPnL >= 0 ? '+' : ''}{topBattle.player1.currentPnL}%
                  </span>
                </div>
                {topBattle.player2 && (
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-pumple-text">{topBattle.player2.username}</span>
                    <span className="font-bold tnum" style={{ color: topBattle.player2.currentPnL >= 0 ? '#1FD978' : '#FF6467' }}>
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

          {/* 4. Trending in feed — full width, dense 2-col posts */}
          <div className="p-card p-card-hover p-4 mt-4">
            <p className="font-display text-sm font-bold text-pumple-text mb-3">Trending in feed</p>
            <div className="grid sm:grid-cols-2 gap-x-4 gap-y-3">
              {trendingPosts.map(post => {
                const tierColor = TIERS[post.tier].color
                return (
                  <div key={post.id} className="flex gap-2.5 min-w-0">
                    <TraderAvatar name={post.user} tier={post.tier} size="sm" className="!border-2" />
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 mb-0.5 min-w-0">
                        <span className="text-xs font-semibold text-pumple-text truncate">{post.user}</span>
                        <TierBadge tier={post.tier} size="sm" />
                      </div>
                      <p className="text-[11px] text-pumple-muted truncate">{post.content}</p>
                      <div className="flex items-center gap-2 mt-0.5 text-[10px] tnum text-pumple-muted">
                        <span>{post.likes} likes</span>
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

        {/* Right sidebar */}
        <div className="w-[300px] flex-shrink-0 hidden lg:flex flex-col gap-4 sticky top-4 self-start">

          {/* Top Signals */}
          <div className="p-card p-4">
            <div className="flex justify-between items-center mb-3">
              <span className="font-display text-sm font-bold text-pumple-text">Top signals</span>
              <Link href="/signals" className="text-[11px] font-semibold text-pumple-primary hover:underline">View all</Link>
            </div>
            {topSignals.map((s, i) => {
              const dirColor = s.direction === 'LONG' ? '#1FD978' : '#FF6467'
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
          <div className="p-card p-3">
            <p className="font-display text-sm font-bold text-pumple-text mb-2.5">Top trader</p>
            <div className="flex items-center gap-3">
              <Link href={`/profile/${topTrader.user}`} className="relative flex-shrink-0">
                <Crown
                  size={14}
                  className="absolute -top-2 left-1/2 -translate-x-1/2 text-pumple-gold z-10"
                  style={{ filter: 'drop-shadow(0 0 5px rgba(250, 204, 21,0.7))' }}
                />
                <TraderAvatar name={topTrader.user} tier={topTrader.tier} size="md" glow />
              </Link>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5 min-w-0">
                  <Link
                    href={`/profile/${topTrader.user}`}
                    className="text-sm font-bold text-pumple-text truncate hover:text-pumple-primary transition-colors"
                  >
                    {topTrader.user}
                  </Link>
                  <TierBadge tier={topTrader.tier} size="sm" />
                </div>
                <p className="text-[10px] tnum text-pumple-muted">{topTrader.calls} calls · {topTrader.streak} streak</p>
              </div>
              <span className="font-display text-lg font-bold tnum text-pumple-primary text-glow-lime flex-shrink-0">
                {topTrader.accuracy}
              </span>
            </div>
            <Link
              href={`/profile/${topTrader.user}`}
              className="block text-[11px] font-semibold text-pumple-primary mt-2.5 hover:underline"
            >
              View profile →
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
