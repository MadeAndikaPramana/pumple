'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Radio, Target, Swords, Flame, Bot, Shield } from 'lucide-react'
import StatCard from '@/components/ui/StatCard'
import SignalCard from '@/components/ui/SignalCard'
import TierBadge from '@/components/ui/TierBadge'
import { SIGNALS, BATTLES, FEED_POSTS } from '@/lib/mock-data'
import { TIERS } from '@/types'

const STATS = [
  { label: 'Signals today',   value: '247',      icon: Radio,   color: '#4ADE80' },
  { label: 'Your accuracy',   value: '78.4%',    icon: Target,  color: '#A78BFA' },
  { label: 'Active battles',  value: '34',       icon: Swords,  color: '#FBBF24' },
  { label: 'Win streak',      value: '5 days',   icon: Flame,   color: '#A3E635' },
]

export default function DashboardPage() {
  const topSignal = SIGNALS[0]
  const topBattle = BATTLES[0]
  const trendingPosts = [...FEED_POSTS].sort((a, b) => b.likes - a.likes).slice(0, 2)

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* 1. Stats row */}
      <div className="grid grid-cols-4 gap-2.5 mb-4">
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
              <span className="text-sm font-bold text-pumple-text">{topBattle.coin}</span>
              <span className="text-[10px] text-pumple-muted">{topBattle.stake} stake · {topBattle.watchers} watching</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="font-semibold text-pumple-primary">{topBattle.user1.name}</span>
              <span
                className="text-[10px] font-bold px-1.5 py-0.5 rounded"
                style={{ backgroundColor: '#4ADE8020', color: '#4ADE80' }}
              >
                {topBattle.user1.prediction}
              </span>
              <span className="text-pumple-dim font-bold">VS</span>
              <span
                className="text-[10px] font-bold px-1.5 py-0.5 rounded"
                style={{ backgroundColor: '#F43F5E20', color: '#F43F5E' }}
              >
                {topBattle.user2.prediction}
              </span>
              <span className="font-semibold text-pumple-red">{topBattle.user2.name}</span>
            </div>
            <div className="flex items-center gap-1 text-[11px] text-pumple-muted">
              <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
              {topBattle.timeLeft} left
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
    </motion.div>
  )
}
