'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { ArrowLeft, Shield, Target, MessageSquare, ThumbsUp, CheckCircle, ArrowRight } from 'lucide-react'
import { SIGNALS, SIGNAL_REPLIES, CALLED_IT_USERS } from '@/lib/mock-data'
import { RARITY_COLORS, TIERS } from '@/types'
import TierBadge from '@/components/ui/TierBadge'

const TradingViewChart = dynamic(() => import('@/components/ui/TradingViewChart'), { ssr: false })

const TIMEFRAMES = ['15m', '1H', '4H', '1D', '1W']

const INTERVAL_MAP: Record<string, string> = {
  '15m': '15',
  '1H': '60',
  '4H': '240',
  '1D': 'D',
  '1W': 'W',
}

function parsePrice(str: string): number {
  return parseFloat(str.replace(/[$,]/g, ''))
}

export default function SignalDetailPage() {
  const params = useParams()
  const signal = SIGNALS.find(s => s.id === Number(params.id))

  // Hook must run unconditionally (before any early return).
  const [activeTf, setActiveTf] = useState(signal?.timeframe ?? '4H')

  if (!signal) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-pumple-muted">Signal not found</p>
      </div>
    )
  }

  const rarityColor = RARITY_COLORS[signal.rarity]
  const directionColor = signal.direction === 'LONG' ? '#4ADE80' : '#F43F5E'
  const tierColor = TIERS[signal.tier].color
  const entryNum = parsePrice(signal.entry)
  const tpNum = parsePrice(signal.tp)
  const slNum = parsePrice(signal.sl)

  const rrRatio = signal.direction === 'LONG'
    ? ((tpNum - entryNum) / (entryNum - slNum)).toFixed(2)
    : ((entryNum - tpNum) / (slNum - entryNum)).toFixed(2)

  const relatedSignals = SIGNALS.filter(s => s.id !== signal.id)

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* Back link */}
      <Link
        href="/signals"
        className="flex items-center gap-1.5 text-xs text-pumple-muted hover:text-pumple-text mb-4 transition-colors w-fit"
      >
        <ArrowLeft size={13} />
        Back to signals
      </Link>

      <div className="max-w-[720px]">

        {/* 1. Header card */}
        <div
          className="bg-pumple-card rounded-[12px] p-4"
          style={{ border: `1px solid ${rarityColor}40` }}
        >
          <div className="flex justify-between items-center flex-wrap gap-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span
                className="text-[11px] font-bold px-2 py-0.5 rounded-[4px]"
                style={{ backgroundColor: `${directionColor}20`, color: directionColor, border: `1px solid ${directionColor}40` }}
              >
                {signal.direction}
              </span>
              <span className="text-lg font-bold text-pumple-text">{signal.coin}</span>
              <span className="text-[10px] text-pumple-muted bg-pumple-elevated px-1.5 py-0.5 rounded-full">
                {signal.timeframe}
              </span>
              <span className="text-[10px] font-bold text-pumple-accent bg-pumple-accent/10 border border-pumple-accent/30 px-1.5 py-0.5 rounded">
                R/R 1:{rrRatio}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span
                className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded-[3px]"
                style={{ backgroundColor: `${rarityColor}20`, color: rarityColor, border: `1px solid ${rarityColor}40` }}
              >
                {signal.rarity}
              </span>
              <span className="text-pumple-muted text-[11px]">{signal.timeAgo}</span>
            </div>
          </div>
        </div>

        {/* 2. Status tracker */}
        <div className="bg-pumple-elevated rounded-[10px] p-3 my-3 flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse flex-shrink-0" />
          <span className="font-bold text-sm text-pumple-text">Active</span>
          <span className="text-pumple-muted text-xs">· Posted {signal.timeAgo}</span>

          {/* Live indicator — TradingView streams live data natively */}
          <span className="flex items-center gap-1 ml-auto">
            <span className="w-1.5 h-1.5 rounded-full bg-pumple-primary animate-pulse" />
            <span className="text-[10px] font-bold text-pumple-primary tracking-wide">LIVE</span>
          </span>
        </div>

        {/* 3. Hero chart */}
        <div className="mb-2">
          {/* Timeframe toggle */}
          <div className="flex gap-1 mb-2">
            {TIMEFRAMES.map(tf => (
              <button
                key={tf}
                onClick={() => setActiveTf(tf)}
                className={`text-[10px] font-bold px-2 py-1 rounded-[5px] transition-colors ${
                  activeTf === tf
                    ? 'bg-pumple-primary text-black'
                    : 'bg-pumple-elevated text-pumple-muted border border-pumple-border hover:text-pumple-text'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>
          <TradingViewChart
            symbol={signal.coin.replace('/', '')}
            interval={INTERVAL_MAP[activeTf] ?? '240'}
            height={500}
          />
        </div>

        {/* 4. Description + tags */}
        <div className="my-3">
          <p className="text-sm text-pumple-text leading-relaxed">{signal.description}</p>
          <div className="flex gap-2 flex-wrap mt-2">
            {signal.tags.map(tag => (
              <span key={tag} className="text-[11px] text-pumple-primary/70 font-semibold">#{tag}</span>
            ))}
          </div>
        </div>

        {/* 5. Verification trail */}
        <div className="bg-pumple-elevated rounded-[10px] p-3 my-3 flex items-center gap-2">
          <Shield size={13} className="text-pumple-muted flex-shrink-0" />
          <span className="text-xs text-pumple-muted">Posted {signal.timeAgo}, never edited</span>
        </div>

        {/* 6. Poster card */}
        <div className="bg-pumple-card border border-pumple-border rounded-[12px] p-4 my-3">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold flex-shrink-0"
                style={{ backgroundColor: `${tierColor}20`, border: `2px solid ${tierColor}60`, color: tierColor }}
              >
                {signal.user[0].toUpperCase()}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="font-bold text-pumple-text text-sm">{signal.user}</span>
                  <TierBadge tier={signal.tier} />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-pumple-primary">{signal.accuracy}</span>
                  <Link
                    href={`/profile/${signal.user}`}
                    className="text-xs text-pumple-muted hover:text-pumple-text transition-colors"
                  >
                    View profile →
                  </Link>
                </div>
              </div>
            </div>
            <button
              className="text-[11px] font-bold px-4 py-2 rounded-full border transition-colors hover:border-pumple-primary hover:text-pumple-primary flex-shrink-0"
              style={{ borderColor: '#1E2235', color: '#64748B' }}
            >
              Follow
            </button>
          </div>
        </div>

        {/* 7. Engagement bar */}
        <div className="flex items-center gap-3 my-3 flex-wrap">
          <button className="flex items-center gap-2 text-sm text-pumple-muted bg-pumple-elevated border border-pumple-border rounded-[8px] px-4 py-2 hover:text-pumple-text transition-colors">
            <ThumbsUp size={14} />
            {signal.likes}
          </button>
          <button className="flex items-center gap-2 text-sm text-pumple-muted bg-pumple-elevated border border-pumple-border rounded-[8px] px-4 py-2 hover:text-pumple-text transition-colors">
            <CheckCircle size={14} />
            Called it {signal.calledIt}
          </button>
          <button className="flex items-center gap-2 text-sm text-pumple-muted bg-pumple-elevated border border-pumple-border rounded-[8px] px-4 py-2 hover:text-pumple-text transition-colors">
            <MessageSquare size={14} />
            {SIGNAL_REPLIES.length} replies
          </button>
        </div>

        {/* 8. Called It list */}
        <div className="bg-pumple-card border border-pumple-border rounded-[12px] p-4 my-3">
          <div className="flex items-center gap-2 mb-3">
            <Target size={14} className="text-pumple-primary" />
            <span className="text-sm font-bold text-pumple-text">{signal.calledIt} traders called it</span>
          </div>
          <div className="flex gap-4 flex-wrap">
            {CALLED_IT_USERS.map(u => {
              const uColor = TIERS[u.tier].color
              return (
                <div key={u.user} className="flex flex-col items-center gap-1">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold"
                    style={{ backgroundColor: `${uColor}20`, border: `2px solid ${uColor}60`, color: uColor }}
                  >
                    {u.user[0].toUpperCase()}
                  </div>
                  <span className="text-[11px] text-pumple-text">{u.user}</span>
                  <span className="text-[10px] text-pumple-primary">{u.accuracy}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* 9. Discussion thread */}
        <div className="bg-pumple-card border border-pumple-border rounded-[12px] p-4 my-3">
          <p className="text-sm font-bold text-pumple-text mb-3">Discussion</p>

          {/* Reply input */}
          <div className="flex gap-3 mb-4">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
              style={{ backgroundColor: '#A78BFA20', border: '2px solid #A78BFA60', color: '#A78BFA' }}
            >
              Y
            </div>
            <div className="flex-1 flex gap-2 items-end">
              <textarea
                placeholder="Add to the discussion..."
                className="flex-1 bg-pumple-elevated border border-pumple-border rounded-[8px] px-3 py-2 text-sm text-pumple-text placeholder:text-pumple-muted/50 outline-none focus:border-pumple-primary/50 resize-none transition-colors"
                rows={2}
              />
              <button className="bg-pumple-primary text-black text-xs font-bold px-3 py-2 rounded-[8px] hover:bg-pumple-primary/90 transition-colors whitespace-nowrap">
                Post
              </button>
            </div>
          </div>

          {/* Replies */}
          <div className="flex flex-col gap-4">
            {SIGNAL_REPLIES.map(reply => {
              const rColor = TIERS[reply.tier].color
              return (
                <div key={reply.id} className="flex gap-3">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                    style={{ backgroundColor: `${rColor}20`, border: `2px solid ${rColor}60`, color: rColor }}
                  >
                    {reply.user[0].toUpperCase()}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap mb-0.5">
                      <span className="text-xs font-semibold text-pumple-text">{reply.user}</span>
                      <TierBadge tier={reply.tier} />
                      <span className="text-pumple-primary text-[10px]">{reply.accuracy}</span>
                      <span className="text-pumple-muted text-[10px]">· {reply.timeAgo}</span>
                    </div>
                    <p className="text-xs text-pumple-text/80 leading-relaxed">{reply.content}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* 10. Related signals */}
        <div className="bg-pumple-card border border-pumple-border rounded-[12px] p-4 my-3">
          <p className="text-sm font-bold text-pumple-text mb-3">Related signals</p>
          <div className="flex flex-col gap-2">
            {relatedSignals.map(s => {
              const sRarityColor = RARITY_COLORS[s.rarity]
              const sDirColor = s.direction === 'LONG' ? '#4ADE80' : '#F43F5E'
              return (
                <Link
                  key={s.id}
                  href={`/signals/${s.id}`}
                  className="flex items-center justify-between p-3 rounded-[8px] hover:bg-pumple-elevated transition-colors"
                  style={{ border: `1px solid ${sRarityColor}20` }}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="text-[10px] font-bold px-1.5 py-0.5 rounded-[3px]"
                      style={{ backgroundColor: `${sDirColor}20`, color: sDirColor, border: `1px solid ${sDirColor}40` }}
                    >
                      {s.direction}
                    </span>
                    <span className="text-sm font-bold text-pumple-text">{s.coin}</span>
                    <span className="text-[10px] text-pumple-muted">{s.timeframe}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold" style={{ color: sRarityColor }}>{s.confidence}%</span>
                    <ArrowRight size={12} className="text-pumple-muted" />
                  </div>
                </Link>
              )
            })}
          </div>
        </div>

      </div>
    </motion.div>
  )
}
