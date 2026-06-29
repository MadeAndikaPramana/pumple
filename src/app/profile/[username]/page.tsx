'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Zap, CheckCircle, Users, MessageSquare, Repeat2, Heart, Target, TrendingUp } from 'lucide-react'
import { TIERS, RARITY_COLORS, type TierKey } from '@/types'
import TierBadge from '@/components/ui/TierBadge'
import SignalCard from '@/components/ui/SignalCard'
import { FEED_POSTS, SIGNALS } from '@/lib/mock-data'

const PROFILE = {
  username: 'CryptoSniper_X',
  displayName: 'Crypto Sniper',
  tier: 'sniper' as TierKey,
  accuracy: '78.4%',
  bio: 'Full-time trader. SMC + Fibonacci confluences only. No noise, only precision entries. 📊',
  totalCalls: 234,
  winStreak: 5,
  followers: 1243,
  following: 89,
  pumpEarned: '4,100',
  tribe: 'SMC Snipers',
  joinedDate: 'Jan 2025',
  coinAccuracy: [
    { coin: 'BTC', rate: 82, calls: 89 },
    { coin: 'ETH', rate: 71, calls: 67 },
    { coin: 'SOL', rate: 89, calls: 45 },
    { coin: 'AVAX', rate: 68, calls: 33 },
  ],
  bestCall: { coin: 'SOL/USDT', direction: 'LONG', entry: '$95.00', result: '+38.2%', date: 'Mar 2025' },
  tierProgress: {
    current: 'sniper' as TierKey,
    nextTier: 'whale' as TierKey,
    progress: 67,
    requirements: [
      { label: 'Accuracy ≥ 80%', current: '78.4%', met: false },
      { label: 'Total calls ≥ 300', current: '234', met: false },
      { label: 'Win streak ≥ 7', current: '5', met: false },
    ],
  },
}

const PROFILE_TABS = ['Posts', 'Signals', 'Called It', 'Liked']

const POST_TYPE_STYLES: Record<string, { color: string; bg: string }> = {
  Analysis: { color: '#38BDF8', bg: '#38BDF815' },
  Signal:   { color: '#4ADE80', bg: '#4ADE8015' },
  News:     { color: '#FBBF24', bg: '#FBBF2415' },
  Degen:    { color: '#F43F5E', bg: '#F43F5E15' },
}

const CALLED_IT_RECORDS = [
  { coin: 'ETH/USDT', direction: 'SHORT' as const, entry: '$3,450', result: '-12.3%', date: 'Jun 2025', verified: true },
  { coin: 'BTC/USDT', direction: 'LONG' as const, entry: '$58,200', result: '+18.7%', date: 'May 2025', verified: true },
  { coin: 'SOL/USDT', direction: 'LONG' as const, entry: '$142.00', result: '+24.1%', date: 'Apr 2025', verified: true },
]

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('Posts')
  const tierColor = TIERS[PROFILE.tier].color
  const nextTierColor = TIERS[PROFILE.tierProgress.nextTier].color
  const initials = PROFILE.displayName.split(' ').map(w => w[0]).join('')

  const userPosts = FEED_POSTS.filter(p => p.user === PROFILE.username)
  const userSignals = SIGNALS.filter(s => s.user === PROFILE.username)

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="max-w-[720px]"
    >
      {/* Profile header card */}
      <div className="bg-pumple-card border border-pumple-border rounded-[12px] mb-4 overflow-hidden">
        {/* Banner */}
        <div
          className="h-28 relative"
          style={{ background: 'linear-gradient(to right, #1A1D27, #2A2D3E)' }}
        >
          {/* Avatar */}
          <div
            className="absolute -bottom-5 left-4 w-16 h-16 rounded-full flex items-center justify-center text-xl font-black"
            style={{
              backgroundColor: `${tierColor}20`,
              border: `4px solid ${tierColor}`,
              color: tierColor,
            }}
          >
            {initials}
            {/* Tier badge overlay */}
            <div className="absolute -bottom-1 -right-1">
              <TierBadge tier={PROFILE.tier} size="sm" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="pt-8 pb-4 px-4">
          <div className="flex justify-between items-start mb-2">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-base font-black text-pumple-text">{PROFILE.displayName}</span>
                <span className="text-sm text-pumple-muted">@{PROFILE.username}</span>
                <span className="text-[11px] text-pumple-muted">· Joined {PROFILE.joinedDate}</span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <TierBadge tier={PROFILE.tier} size="md" />
                <span className="text-pumple-primary text-lg font-black">{PROFILE.accuracy}</span>
              </div>
            </div>
            <button
              className="text-xs font-bold px-4 py-1.5 rounded-md transition-colors"
              style={{ backgroundColor: `${tierColor}20`, color: tierColor, border: `1px solid ${tierColor}40` }}
            >
              Follow
            </button>
          </div>

          <p className="text-sm text-pumple-muted leading-relaxed mb-3">{PROFILE.bio}</p>

          {/* Stats row */}
          <div className="flex items-center gap-5 flex-wrap">
            {[
              { label: 'Calls',      value: PROFILE.totalCalls.toString() },
              { label: 'Accuracy',   value: PROFILE.accuracy },
              { label: 'Streak',     value: `${PROFILE.winStreak}🔥` },
              { label: 'Followers',  value: PROFILE.followers.toLocaleString() },
              { label: 'Following',  value: PROFILE.following.toString() },
            ].map(stat => (
              <div key={stat.label}>
                <p className="text-sm font-black text-pumple-text">{stat.value}</p>
                <p className="text-[10px] text-pumple-muted">{stat.label}</p>
              </div>
            ))}
            <div className="ml-auto flex items-center gap-1">
              <Zap size={12} className="text-pumple-accent" />
              <span className="text-pumple-accent font-bold text-sm">{PROFILE.pumpEarned}</span>
              <span className="text-pumple-muted text-[10px]">$PUMP</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tier Progression */}
      <div className="bg-pumple-card border border-pumple-border rounded-[12px] p-4 mb-4">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-sm font-bold text-pumple-text">Tier Progress</span>
          <TierBadge tier={PROFILE.tierProgress.current} size="sm" />
          <span className="text-pumple-muted text-xs">→</span>
          <TierBadge tier={PROFILE.tierProgress.nextTier} size="sm" />
        </div>
        <div className="h-2 bg-pumple-dim rounded-full overflow-hidden mb-1.5">
          <div
            className="h-full rounded-full transition-all"
            style={{ width: `${PROFILE.tierProgress.progress}%`, backgroundColor: tierColor }}
          />
        </div>
        <div className="flex justify-between mb-3">
          <span className="text-[10px] text-pumple-muted">Progress to {TIERS[PROFILE.tierProgress.nextTier].label}</span>
          <span className="text-[10px] font-bold" style={{ color: nextTierColor }}>{PROFILE.tierProgress.progress}%</span>
        </div>
        <div className="flex flex-col gap-1.5">
          {PROFILE.tierProgress.requirements.map(req => (
            <div key={req.label} className="flex items-center gap-2">
              <CheckCircle
                size={13}
                style={{ color: req.met ? '#4ADE80' : '#2A2D3E', flexShrink: 0 }}
              />
              <span className="text-[11px] text-pumple-muted flex-1">{req.label}</span>
              <span
                className="text-[11px] font-bold"
                style={{ color: req.met ? '#4ADE80' : '#64748B' }}
              >
                {req.current}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Content tabs */}
      <div className="flex border-b border-pumple-border mb-4">
        {PROFILE_TABS.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2.5 text-sm transition-colors ${
              activeTab === tab
                ? 'border-b-2 border-pumple-primary text-pumple-text font-bold -mb-px'
                : 'text-pumple-muted hover:text-pumple-text'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab: Posts */}
      {activeTab === 'Posts' && (
        <div>
          {(userPosts.length > 0 ? userPosts : FEED_POSTS).map(post => {
            const tc = TIERS[post.tier as TierKey].color
            const typeStyle = POST_TYPE_STYLES[post.type] ?? POST_TYPE_STYLES.Analysis
            return (
              <div
                key={post.id}
                className="bg-pumple-card border border-pumple-border rounded-[12px] p-4 mb-3"
              >
                <div className="flex items-start gap-3">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold"
                    style={{ backgroundColor: `${tc}20`, border: `2px solid ${tc}60`, color: tc }}
                  >
                    {post.user[0]}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-sm font-semibold text-pumple-text">{post.user}</span>
                      <TierBadge tier={post.tier as TierKey} size="sm" />
                      <span className="text-pumple-muted text-[11px]">· {post.timeAgo}</span>
                    </div>
                    <span
                      className="inline-block text-[10px] font-bold px-1.5 py-0 rounded mt-0.5"
                      style={{ backgroundColor: typeStyle.bg, color: typeStyle.color }}
                    >
                      {post.type}
                    </span>
                  </div>
                </div>
                <p className="mt-2 ml-12 text-sm leading-relaxed text-pumple-text">{post.content}</p>
                <div className="mt-3 ml-12 flex items-center gap-6">
                  <button className="flex items-center gap-1.5 text-pumple-muted text-xs hover:text-pumple-blue transition-colors">
                    <MessageSquare size={13} />{post.replies}
                  </button>
                  <button className="flex items-center gap-1.5 text-pumple-muted text-xs hover:text-pumple-primary transition-colors">
                    <Repeat2 size={13} />{post.reposts}
                  </button>
                  <button className="flex items-center gap-1.5 text-pumple-muted text-xs hover:text-pumple-red transition-colors">
                    <Heart size={13} />{post.likes}
                  </button>
                  <button className="flex items-center gap-1.5 text-pumple-muted text-xs font-semibold hover:text-pumple-accent transition-colors">
                    <Target size={13} />{post.calledIt}
                  </button>
                </div>
              </div>
            )
          })}

          {/* Track record */}
          <div className="mt-6">
            <h3 className="text-sm font-bold text-pumple-text mb-3">Win Rate by Coin</h3>
            <div className="grid grid-cols-2 gap-3 mb-4">
              {PROFILE.coinAccuracy.map(ca => (
                <div key={ca.coin} className="bg-pumple-elevated rounded-[8px] p-3">
                  <p className="text-xs font-bold text-pumple-muted mb-1">{ca.coin}</p>
                  <p className="text-pumple-primary font-black text-lg">{ca.rate}%</p>
                  <p className="text-[10px] text-pumple-muted mb-1.5">{ca.calls} calls</p>
                  <div className="h-1.5 bg-pumple-dim rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${ca.rate}%`, backgroundColor: '#4ADE80' }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-pumple-elevated rounded-[8px] p-3">
              <p className="text-[10px] text-pumple-muted font-bold mb-2">Best Call Ever 🏆</p>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm font-black text-pumple-text">{PROFILE.bestCall.coin}</span>
                <span
                  className="text-[11px] font-bold px-1.5 py-0.5 rounded-[3px]"
                  style={{ backgroundColor: '#4ADE8020', color: '#4ADE80', border: '1px solid #4ADE8040' }}
                >
                  {PROFILE.bestCall.direction}
                </span>
                <span className="text-pumple-muted text-[11px]">Entry {PROFILE.bestCall.entry}</span>
              </div>
              <p className="text-pumple-primary font-black text-2xl mt-1">{PROFILE.bestCall.result}</p>
              <p className="text-pumple-muted text-[10px] mt-0.5">{PROFILE.bestCall.date}</p>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Signals */}
      {activeTab === 'Signals' && (
        <div>
          {(userSignals.length > 0 ? userSignals : SIGNALS).map(signal => (
            <SignalCard key={signal.id} signal={signal} />
          ))}
        </div>
      )}

      {/* Tab: Called It */}
      {activeTab === 'Called It' && (
        <div className="flex flex-col gap-3">
          {CALLED_IT_RECORDS.map((record, i) => {
            const isLong = record.direction === 'LONG'
            const dirColor = isLong ? '#4ADE80' : '#F43F5E'
            return (
              <div key={i} className="bg-pumple-card border border-pumple-border rounded-[12px] p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-pumple-text">{record.coin}</span>
                    <span
                      className="text-[11px] font-bold px-1.5 py-0.5 rounded-[3px]"
                      style={{ backgroundColor: `${dirColor}20`, color: dirColor, border: `1px solid ${dirColor}40` }}
                    >
                      {record.direction}
                    </span>
                    <span className="text-pumple-muted text-[11px]">Entry {record.entry}</span>
                  </div>
                  <span
                    className="flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.5 rounded-[3px]"
                    style={{ backgroundColor: '#4ADE8020', color: '#4ADE80', border: '1px solid #4ADE8040' }}
                  >
                    <CheckCircle size={9} />
                    Called It
                  </span>
                </div>
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-pumple-primary font-black text-lg">{record.result}</span>
                  <span className="text-pumple-muted text-[11px]">{record.date}</span>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Tab: Liked */}
      {activeTab === 'Liked' && (
        <div className="flex flex-col items-center justify-center py-16 text-pumple-muted">
          <Heart size={32} className="mb-3 opacity-30" />
          <p className="text-sm">Posts you liked will appear here</p>
        </div>
      )}
    </motion.div>
  )
}
