'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  CheckCircle, ShieldCheck, TrendingUp, Swords, Shield, Crown, Target,
  Coins, Zap, Trophy,
} from 'lucide-react'
import { TIERS, RARITY_COLORS, type TierKey, type Rarity } from '@/types'
import TierBadge from '@/components/ui/TierBadge'
import { PROFILE_SIGNALS, PROFILE_BATTLES, PROFILE_ACTIVITY } from '@/lib/mock-data'

const PROFILE = {
  username: 'CryptoSniper_X',
  displayName: 'Crypto Sniper',
  tier: 'sniper' as TierKey,
  accuracy: '78.4%',
  winRate: '71%',
  bio: 'SMC + Fibonacci confluences only. Precision entries, no noise. 📊',
  totalSignals: 234,
  wonSignals: 183,
  winStreak: 5,
  bestCall: '+38.2%',
  bestCallCoin: 'SOL/USDT',
  followers: 1243,
  following: 89,
  pumpEarned: '4,100',
  tribe: 'SMC Snipers',
  tribeTier: 'sniper' as TierKey,
  joinedDate: 'Jan 2025',
  battleRecord: { won: 12, lost: 5 },
  degenScore: 34,
  monthlyAccuracy: [65, 71, 68, 74, 76, 78, 80, 78],
  tierProgress: {
    currentTier: 'sniper' as TierKey,
    nextTier: 'whale' as TierKey,
    progress: 67,
    requirements: [
      { label: 'Accuracy ≥ 80%', current: '78.4%', met: false },
      { label: 'Total signals ≥ 300', current: '234', met: false },
      { label: 'Win streak ≥ 7', current: '5', met: false },
    ],
  },
}

const MOCK_FOLLOWERS = [
  { username: 'croakie', followers: 40513, tier: 'legend' as TierKey },
  { username: 'degenordie', followers: 13687, tier: 'whale' as TierKey },
  { username: 'bigdawg', followers: 8167, tier: 'sniper' as TierKey },
  { username: 'cryptoking', followers: 5546, tier: 'trader' as TierKey },
  { username: 'moonchaser', followers: 4333, tier: 'apprentice' as TierKey },
]

const TABS = ['Overview', 'Signals', 'Battles', 'Activity', 'Followers']

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug']

const TIER_ICONS: Record<TierKey, React.ReactNode> = {
  apprentice: <TrendingUp size={18} />,
  trader:     <TrendingUp size={18} />,
  sniper:     <Target size={18} />,
  whale:      <Coins size={18} />,
  legend:     <Crown size={18} />,
}

const ACTIVITY_STYLES: Record<string, { color: string; icon: React.ReactNode }> = {
  signal_won: { color: '#1FD978', icon: <TrendingUp size={14} /> },
  battle_won: { color: '#C084FC', icon: <Swords size={14} /> },
  tribe_join: { color: '#60A5FA', icon: <Shield size={14} /> },
  rank_up:    { color: '#FACC15', icon: <Crown size={14} /> },
  called_it:  { color: '#86EFAC', icon: <Target size={14} /> },
}

function dirColor(d: 'LONG' | 'SHORT') {
  return d === 'LONG' ? '#1FD978' : '#FF6467'
}

function DirectionBadge({ direction, size = 'sm' }: { direction: 'LONG' | 'SHORT'; size?: 'sm' | 'xs' }) {
  const color = dirColor(direction)
  const cls = size === 'xs' ? 'text-[8px] px-1 py-0.5' : 'text-[10px] px-1.5 py-0.5'
  return (
    <span
      className={`font-bold rounded ${cls}`}
      style={{ backgroundColor: `${color}20`, color, border: `1px solid ${color}40` }}
    >
      {direction}
    </span>
  )
}

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('Overview')

  const tierColor = TIERS[PROFILE.tier].color
  const tribeTierColor = TIERS[PROFILE.tribeTier].color
  const initials = PROFILE.displayName.split(' ').map(w => w[0]).join('').toUpperCase()
  const maxAcc = Math.max(...PROFILE.monthlyAccuracy)
  const degenColor = PROFILE.degenScore > 70 ? '#FF6467' : PROFILE.degenScore > 40 ? '#FACC15' : '#A1A1AA'
  const winRatePct = Math.round((PROFILE.battleRecord.won / (PROFILE.battleRecord.won + PROFILE.battleRecord.lost)) * 100)

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="max-w-[900px] mx-auto"
    >
      {/* ── SECTION A: Header card ── */}
      <div className="p-card rounded-[16px] overflow-hidden mb-4">
        {/* Banner */}
        <div
          className="h-24 relative"
          style={{
            background:
              'radial-gradient(ellipse 60% 120% at 15% 100%, rgba(31, 217, 120,0.18), transparent), radial-gradient(ellipse 50% 120% at 85% 0%, rgba(192, 132, 252,0.16), transparent), linear-gradient(135deg, #14151C, #212225)',
          }}
        >
          <div className="absolute top-3 right-3 bg-black/40 text-[10px] font-bold px-2 py-1 rounded-full">
            <span className="text-pumple-muted">Degen Score </span>
            <span style={{ color: degenColor }}>{PROFILE.degenScore}/100</span>
          </div>
        </div>

        {/* Content */}
        <div className="px-5 pb-5">
          {/* Avatar */}
          <div className="relative w-16 h-16 -mt-8">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center text-xl font-black"
              style={{ backgroundColor: `${tierColor}20`, border: `3px solid ${tierColor}`, color: tierColor }}
            >
              {initials}
            </div>
            <div
              className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-pumple-card border border-pumple-border flex items-center justify-center"
              style={{ color: tierColor }}
            >
              <span className="scale-[0.55]">{TIER_ICONS[PROFILE.tier]}</span>
            </div>
          </div>

          {/* Identity row */}
          <div className="flex items-start justify-between mt-2 gap-3">
            <div className="min-w-0">
              <div className="flex items-baseline gap-2 flex-wrap">
                <span className="font-display text-lg font-bold text-pumple-text">{PROFILE.displayName}</span>
                <span className="text-sm text-pumple-muted">@{PROFILE.username}</span>
              </div>
              <div className="flex gap-2 items-center mt-1">
                <TierBadge tier={PROFILE.tier} size="md" />
                <span className="bg-pumple-primary/15 text-pumple-primary border border-pumple-primary/30 text-[11px] font-bold px-2 py-0.5 rounded">
                  {PROFILE.accuracy} accuracy
                </span>
              </div>
              <p className="text-sm text-pumple-muted leading-relaxed mt-2 max-w-[480px]">{PROFILE.bio}</p>
              <p className="text-[11px] text-pumple-muted/60 mt-1">Joined {PROFILE.joinedDate}</p>
            </div>

            <div className="flex flex-col items-end gap-2 flex-shrink-0">
              <button className="btn-degen text-sm px-5 py-2">
                Follow
              </button>
              <button className="btn-ghost text-sm px-4 py-2">
                Share
              </button>
            </div>
          </div>

          {/* Stats bar */}
          <div className="flex gap-6 mt-4 pt-4 border-t border-pumple-border flex-wrap">
            {[
              { label: 'Signals', value: PROFILE.totalSignals.toString(), color: undefined },
              { label: 'Accuracy', value: PROFILE.accuracy, color: '#1FD978' },
              { label: 'Streak', value: `${PROFILE.winStreak} days`, color: PROFILE.winStreak >= 5 ? '#FACC15' : undefined },
              { label: 'Battles', value: `${PROFILE.battleRecord.won}W ${PROFILE.battleRecord.lost}L`, color: undefined },
              { label: 'Followers', value: PROFILE.followers.toLocaleString(), color: undefined },
              { label: '$PUMP', value: PROFILE.pumpEarned, color: '#86EFAC' },
            ].map(stat => (
              <div key={stat.label}>
                <p className="flex items-center gap-1 text-sm font-black tnum" style={{ color: stat.color ?? undefined }}>
                  {stat.label === '$PUMP' && <Zap size={12} fill="currentColor" />}
                  {stat.value}
                </p>
                <p className="text-[10px] text-pumple-muted uppercase tracking-wide">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── SECTION B: Tabs ── */}
      <div className="flex border-b border-pumple-border mb-4">
        {TABS.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2.5 text-sm cursor-pointer transition-colors ${
              activeTab === tab
                ? 'border-b-2 border-pumple-primary text-pumple-text font-bold -mb-px'
                : 'text-pumple-muted hover:text-pumple-text'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* ── SECTION C: Tab content ── */}

      {/* OVERVIEW */}
      {activeTab === 'Overview' && (
        <div className="flex gap-4">
          {/* Left column */}
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-bold text-pumple-text mb-3">Performance</h3>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-pumple-elevated rounded-[10px] p-3">
                <p className="text-xl font-black text-pumple-text">{PROFILE.totalSignals}</p>
                <p className="text-[10px] text-pumple-muted">Total signals</p>
              </div>
              <div className="bg-pumple-elevated rounded-[10px] p-3">
                <p className="text-xl font-black text-pumple-primary">{PROFILE.accuracy}</p>
                <p className="text-[10px] text-pumple-muted">Avg accuracy</p>
              </div>
              <div className="bg-pumple-elevated rounded-[10px] p-3">
                <p className="text-xl font-black text-pumple-primary">{PROFILE.bestCall}</p>
                <p className="text-[10px] text-pumple-muted">Best call · {PROFILE.bestCallCoin}</p>
              </div>
              <div className="bg-pumple-elevated rounded-[10px] p-3">
                <p className="text-xl font-black text-pumple-text">{PROFILE.battleRecord.won}W / {PROFILE.battleRecord.lost}L</p>
                <p className="text-[10px] text-pumple-muted">{winRatePct}% win rate</p>
              </div>
            </div>

            {/* Monthly accuracy sparkline */}
            <div className="bg-pumple-elevated rounded-[10px] p-3 mb-4">
              <p className="text-[11px] font-bold text-pumple-muted mb-2">Monthly accuracy</p>
              <div className="flex items-end gap-1 h-[60px]">
                {PROFILE.monthlyAccuracy.map((val, i) => {
                  const isCurrent = i === PROFILE.monthlyAccuracy.length - 1
                  return (
                    <div
                      key={i}
                      className={`flex-1 rounded-t-sm min-h-[4px] ${isCurrent ? 'bg-pumple-primary' : 'bg-pumple-primary/40'}`}
                      style={{ height: `${(val / maxAcc) * 100}%` }}
                    />
                  )
                })}
              </div>
              <div className="flex gap-1 mt-1">
                {MONTHS.map(m => (
                  <span key={m} className="flex-1 text-center text-[9px] text-pumple-muted">{m}</span>
                ))}
              </div>
            </div>

            {/* Tier progress */}
            <div className="bg-pumple-elevated rounded-[10px] p-3">
              <div className="flex justify-between items-center">
                <span className="text-[11px] font-bold text-pumple-text">Tier Progress</span>
                <div className="flex items-center gap-1.5">
                  <TierBadge tier={PROFILE.tierProgress.currentTier} size="sm" />
                  <span className="text-pumple-muted text-xs">→</span>
                  <TierBadge tier={PROFILE.tierProgress.nextTier} size="sm" />
                </div>
              </div>
              <div className="h-2 bg-pumple-dim rounded-full mt-2 mb-1 overflow-hidden">
                <div className="h-full bg-pumple-primary rounded-full transition-all" style={{ width: `${PROFILE.tierProgress.progress}%` }} />
              </div>
              <p className="text-[10px] text-pumple-muted mb-3">
                {PROFILE.tierProgress.progress}% to {TIERS[PROFILE.tierProgress.nextTier].label}
              </p>
              {PROFILE.tierProgress.requirements.map(req => (
                <div key={req.label} className="flex justify-between items-center py-1.5 border-b border-pumple-border last:border-0">
                  <div className="flex items-center gap-2">
                    <CheckCircle size={12} style={{ color: req.met ? '#1FD978' : '#313338' }} />
                    <span className="text-[11px] text-pumple-muted">{req.label}</span>
                  </div>
                  <span className="text-[11px] font-bold" style={{ color: req.met ? '#1FD978' : '#FAFAFA' }}>
                    {req.current}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right column */}
          <div className="w-[260px] flex-shrink-0 flex flex-col gap-4">
            {/* Tribe */}
            <div className="bg-pumple-elevated rounded-[10px] p-3">
              <p className="text-[11px] font-bold text-pumple-muted mb-2">Tribe</p>
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-[8px] flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${tribeTierColor}20`, border: `1px solid ${tribeTierColor}40`, color: tribeTierColor }}
                >
                  {TIER_ICONS[PROFILE.tribeTier]}
                </div>
                <div>
                  <p className="text-sm font-bold text-pumple-text">{PROFILE.tribe}</p>
                  <TierBadge tier={PROFILE.tribeTier} size="sm" />
                </div>
              </div>
              <Link href="/tribes" className="block text-[11px] text-pumple-primary mt-2 hover:underline">View tribe →</Link>
            </div>

            {/* Best call */}
            <div className="bg-pumple-elevated rounded-[10px] p-3">
              <p className="flex items-center gap-1.5 text-[11px] font-bold text-pumple-muted mb-2">
                <Trophy size={11} className="text-pumple-gold" />
                Best Call Ever
              </p>
              <div className="flex items-center gap-2">
                <span className="text-sm font-black text-pumple-text">{PROFILE.bestCallCoin}</span>
                <DirectionBadge direction="LONG" />
              </div>
              <p className="text-2xl font-black text-pumple-primary mt-1">{PROFILE.bestCall}</p>
            </div>

            {/* Recent signals */}
            <div className="bg-pumple-elevated rounded-[10px] p-3">
              <p className="text-[11px] font-bold text-pumple-muted mb-2">Recent Signals</p>
              <div className="flex flex-col">
                {PROFILE_SIGNALS.slice(0, 3).map(s => (
                  <div key={s.id} className="flex justify-between items-center py-1.5 border-b border-pumple-border last:border-0">
                    <div className="flex items-center gap-1.5">
                      <DirectionBadge direction={s.direction} size="xs" />
                      <span className="text-[11px] font-bold text-pumple-text">{s.coin}</span>
                    </div>
                    {s.status === 'won' ? (
                      <span className="text-[11px] font-bold text-pumple-primary">{s.result} ✓</span>
                    ) : s.status === 'lost' ? (
                      <span className="text-[11px] font-bold text-pumple-red">{s.result} ✗</span>
                    ) : (
                      <span className="flex items-center gap-1.5 text-[11px] text-pumple-gold">
                        <span className="live-dot live-dot--gold" aria-hidden />
                        Active
                      </span>
                    )}
                  </div>
                ))}
              </div>
              <Link href="/signals" className="block text-[11px] text-pumple-primary mt-2 hover:underline">View all signals →</Link>
            </div>
          </div>
        </div>
      )}

      {/* SIGNALS */}
      {activeTab === 'Signals' && (
        <div>
          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="bg-pumple-elevated rounded-[10px] p-3">
              <p className="text-xl font-black text-pumple-text">{PROFILE.totalSignals}</p>
              <p className="text-[9px] text-pumple-muted uppercase tracking-wide">Total calls</p>
            </div>
            <div className="bg-pumple-elevated rounded-[10px] p-3">
              <p className="text-xl font-black text-pumple-primary">{PROFILE.accuracy}</p>
              <p className="text-[9px] text-pumple-muted uppercase tracking-wide">Avg accuracy</p>
            </div>
            <div className="bg-pumple-elevated rounded-[10px] p-3">
              <p className="text-xl font-black text-pumple-primary">{PROFILE.bestCall}</p>
              <p className="text-[9px] text-pumple-muted uppercase tracking-wide">Best call</p>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            {PROFILE_SIGNALS.map(signal => {
              const rColor = RARITY_COLORS[signal.rarity as Rarity]
              return (
                <div key={signal.id} className="bg-pumple-card border border-pumple-border rounded-[10px] px-4 py-3 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 min-w-0">
                    <DirectionBadge direction={signal.direction} />
                    <span className="text-sm font-bold text-pumple-text">{signal.coin}</span>
                    <span
                      className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded"
                      style={{ backgroundColor: `${rColor}20`, color: rColor, border: `1px solid ${rColor}40` }}
                    >
                      {signal.rarity}
                    </span>
                    <span className="text-[11px] text-pumple-muted">· {signal.timeAgo}</span>
                  </div>

                  <span className="text-[11px] font-mono text-pumple-muted hidden md:block">Entry {signal.entry}</span>

                  <div className="flex items-center gap-3 flex-shrink-0">
                    {signal.status === 'won' ? (
                      <div className="text-right">
                        <p className="text-sm font-bold text-pumple-primary">{signal.result}</p>
                        <p className="text-[10px] text-pumple-muted">✓ Called it {signal.calledIt}</p>
                      </div>
                    ) : signal.status === 'lost' ? (
                      <div className="text-right">
                        <p className="text-sm font-bold text-pumple-red">{signal.result} ✗</p>
                      </div>
                    ) : (
                      <span className="flex items-center gap-1.5 text-[11px] text-pumple-gold">
                        <span className="live-dot live-dot--gold" aria-hidden />
                        Active
                      </span>
                    )}
                    <span className="hidden lg:flex items-center gap-1 text-[9px] text-pumple-muted/50">
                      <ShieldCheck size={10} />
                      Never edited
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* BATTLES */}
      {activeTab === 'Battles' && (
        <div>
          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="bg-pumple-elevated rounded-[10px] p-3">
              <p className="text-xl font-black text-pumple-primary">{PROFILE.battleRecord.won}</p>
              <p className="text-[9px] text-pumple-muted uppercase tracking-wide">Battles won</p>
            </div>
            <div className="bg-pumple-elevated rounded-[10px] p-3">
              <p className="text-xl font-black text-pumple-red">{PROFILE.battleRecord.lost}</p>
              <p className="text-[9px] text-pumple-muted uppercase tracking-wide">Battles lost</p>
            </div>
            <div className="bg-pumple-elevated rounded-[10px] p-3">
              <p className="text-xl font-black text-pumple-accent">{winRatePct}%</p>
              <p className="text-[9px] text-pumple-muted uppercase tracking-wide">Win rate</p>
            </div>
          </div>

          {PROFILE_BATTLES.map(battle => {
            const won = battle.result === 'won'
            const oppColor = TIERS[battle.opponentTier].color
            return (
              <div key={battle.id} className="bg-pumple-card border border-pumple-border rounded-[10px] px-4 py-3 mb-2 flex items-center gap-4">
                <span
                  className={`text-[11px] font-black px-2 py-0.5 rounded w-12 text-center ${won ? 'bg-pumple-primary/20 text-pumple-primary' : 'bg-pumple-red/20 text-pumple-red'}`}
                >
                  {won ? 'WIN' : 'LOSS'}
                </span>

                <div className="flex items-center gap-2 min-w-0">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-black flex-shrink-0"
                    style={{ backgroundColor: `${oppColor}20`, border: `2px solid ${oppColor}`, color: oppColor }}
                  >
                    {battle.opponent[0].toUpperCase()}
                  </div>
                  <Link href={`/profile/${battle.opponent}`} className="text-sm font-bold text-pumple-text hover:underline">vs @{battle.opponent}</Link>
                  <TierBadge tier={battle.opponentTier} size="sm" />
                </div>

                <span className="text-[11px] text-pumple-muted hidden md:block">{battle.coin} · {battle.duration}</span>

                <div className="flex items-center gap-3 ml-auto flex-shrink-0">
                  <span className="text-sm font-bold" style={{ color: won ? '#1FD978' : '#FF6467' }}>Me: {battle.myPnL}</span>
                  <span className="text-pumple-muted">·</span>
                  <span className="text-sm text-pumple-muted">Them: {battle.opponentPnL}</span>
                  <span className="text-[11px] text-pumple-muted hidden lg:block">{battle.timeAgo}</span>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* ACTIVITY */}
      {activeTab === 'Activity' && (
        <div>
          {PROFILE_ACTIVITY.map(item => {
            const style = ACTIVITY_STYLES[item.type] ?? ACTIVITY_STYLES.signal_won
            return (
              <div key={item.id} className="flex items-start gap-3 py-3 border-b border-pumple-border last:border-0">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${style.color}15`, color: style.color }}
                >
                  {style.icon}
                </div>
                <div>
                  <p className="text-sm text-pumple-text">{item.content}</p>
                  <p className="text-[11px] text-pumple-muted mt-0.5">{item.timeAgo}</p>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* FOLLOWERS */}
      {activeTab === 'Followers' && (
        <div className="flex flex-col gap-0">
          {MOCK_FOLLOWERS.map(f => {
            const fColor = TIERS[f.tier].color
            return (
              <div key={f.username} className="flex items-center justify-between py-3 border-b border-pumple-border last:border-0">
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-black flex-shrink-0"
                    style={{ backgroundColor: `${fColor}20`, border: `2px solid ${fColor}`, color: fColor }}
                  >
                    {f.username[0].toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <Link href={`/profile/${f.username}`} className="text-sm font-semibold text-pumple-text hover:underline">{f.username}</Link>
                      <TierBadge tier={f.tier} size="sm" />
                    </div>
                    <p className="text-[11px] text-pumple-muted">{f.followers.toLocaleString()} followers</p>
                  </div>
                </div>
                <button className="btn-degen text-sm px-5 py-2 flex-shrink-0">
                  Follow
                </button>
              </div>
            )
          })}
        </div>
      )}
    </motion.div>
  )
}
