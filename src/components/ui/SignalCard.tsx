'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { ThumbsUp, CheckCircle, ArrowRight, TrendingUp, TrendingDown } from 'lucide-react'
import { RARITY_COLORS, type Signal } from '@/types'
import TierBadge from './TierBadge'

const MiniChart = dynamic(() => import('./MiniChart'), { ssr: false })

// Feed cards show a fixed-height sparkline; the full candlestick lives on the
// signal detail page. Kept small so the card reads as a dense row of data.
const SPARK_HEIGHT = 96

interface SignalCardProps {
  signal: Signal
}

function parsePrice(str: string): number {
  return parseFloat(str.replace(/[$,]/g, ''))
}

export default function SignalCard({ signal }: SignalCardProps) {
  const rarityColor = RARITY_COLORS[signal.rarity]
  const isLong = signal.direction === 'LONG'
  const directionColor = isLong ? '#1FD978' : '#FF6467'
  const isTopRarity = signal.rarity === 'legendary' || signal.rarity === 'mythic'
  const entryNum = parsePrice(signal.entry)
  const tpNum = parsePrice(signal.tp)
  const slNum = parsePrice(signal.sl)

  const rrRatio = isLong
    ? ((tpNum - entryNum) / (entryNum - slNum)).toFixed(2)
    : ((entryNum - tpNum) / (slNum - entryNum)).toFixed(2)

  const hasImages = signal.images && signal.images.length > 0
  const totalSlides = hasImages ? signal.images!.length + 1 : 1
  const [slideIndex, setSlideIndex] = useState(0)

  useEffect(() => {
    if (!hasImages) return
    const timer = setInterval(() => {
      setSlideIndex(prev => (prev + 1) % totalSlides)
    }, 3000)
    return () => clearInterval(timer)
  }, [hasImages, totalSlides])

  return (
    <div
      className="bg-pumple-card rounded-[14px] p-3 relative overflow-hidden p-card-hover"
      style={{
        border: `1px solid ${rarityColor}${isTopRarity ? '50' : '30'}`,
        boxShadow: isTopRarity ? `0 0 22px ${rarityColor}14` : undefined,
      }}
    >
      {/* Top accent stripe */}
      <div
        className="absolute top-0 left-0 right-0 h-[2.5px]"
        style={{ background: `linear-gradient(90deg, transparent, ${rarityColor}, transparent)` }}
      />

      {/* Row 1: Direction + coin + timeframe + R/R | rarity + time */}
      <div className="flex justify-between items-center mb-2 mt-1">
        <div className="flex items-center gap-2 min-w-0">
          <span
            className="flex items-center gap-1 text-[11px] font-black px-2 py-0.5 rounded-md flex-shrink-0"
            style={{
              backgroundColor: `${directionColor}1c`,
              color: directionColor,
              border: `1px solid ${directionColor}45`,
            }}
          >
            {isLong ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
            {signal.direction}
          </span>
          <Link
            href={`/signals/${signal.id}`}
            className="font-display text-[15px] font-bold text-pumple-text hover:text-pumple-primary transition-colors cursor-pointer truncate"
          >
            {signal.coin}
          </Link>
          <span className="text-[10px] font-bold text-pumple-muted bg-pumple-elevated px-1.5 py-0.5 rounded-full flex-shrink-0">
            {signal.timeframe}
          </span>
          <span className="text-[10px] font-bold tnum text-pumple-accent bg-pumple-accent/10 border border-pumple-accent/30 px-1.5 py-0.5 rounded flex-shrink-0">
            R/R 1:{rrRatio}
          </span>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <span
            className="text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded"
            style={{
              backgroundColor: `${rarityColor}20`,
              color: rarityColor,
              border: `1px solid ${rarityColor}40`,
              textShadow: isTopRarity ? `0 0 10px ${rarityColor}90` : undefined,
            }}
          >
            {signal.rarity}
          </span>
          <span className="text-pumple-muted text-[11px]">{signal.timeAgo}</span>
        </div>
      </div>

      {/* Row 2: Confidence bar */}
      <div className="mb-2">
        <div className="flex justify-between items-center mb-1">
          <span className="text-pumple-muted text-[11px]">Confidence</span>
          <span className="text-xs font-black tnum" style={{ color: rarityColor }}>{signal.confidence}%</span>
        </div>
        <div className="bar-track">
          <div
            className="bar-fill"
            style={{
              width: `${signal.confidence}%`,
              background: `linear-gradient(90deg, ${rarityColor}80, ${rarityColor})`,
            }}
          />
        </div>
      </div>

      {/* Sparkline / image carousel — compact; full chart lives on the detail page */}
      <Link
        href={`/signals/${signal.id}`}
        className="block my-2 relative rounded-[8px] overflow-hidden"
        style={{ height: `${SPARK_HEIGHT}px` }}
        aria-label={`Open ${signal.coin} chart`}
      >
        {slideIndex === 0 ? (
          <MiniChart
            entry={entryNum}
            tp={tpNum}
            sl={slNum}
            direction={signal.direction}
            timeframe={signal.timeframe}
            height={SPARK_HEIGHT}
            variant="spark"
          />
        ) : (
          <img
            src={signal.images![slideIndex - 1]}
            className="w-full object-cover transition-opacity duration-300"
            style={{ height: `${SPARK_HEIGHT}px` }}
            alt=""
          />
        )}
      </Link>

      {/* Compact price levels strip */}
      <div className="flex items-center gap-3 text-[10px] tnum mt-1.5">
        <span className="text-pumple-muted">Entry <span className="font-mono font-semibold text-pumple-text">{signal.entry}</span></span>
        <span className="text-pumple-muted">TP <span className="font-mono font-semibold text-pumple-primary">{signal.tp}</span></span>
        <span className="text-pumple-muted">SL <span className="font-mono font-semibold text-pumple-red">{signal.sl}</span></span>
      </div>

      {/* Slide dots — only when images exist */}
      {hasImages && (
        <div className="flex justify-center gap-1 mt-1.5">
          {Array.from({ length: totalSlides }).map((_, i) => (
            <button
              key={i}
              onClick={() => setSlideIndex(i)}
              aria-label={`Slide ${i + 1}`}
              className={`w-1.5 h-1.5 rounded-full cursor-pointer transition-colors ${i === slideIndex ? 'bg-pumple-primary' : 'bg-pumple-dim'}`}
            />
          ))}
        </div>
      )}

      {/* Tags */}
      <div className="mt-2">
        <div className="flex gap-1.5 flex-wrap">
          {signal.tags.map(tag => (
            <span
              key={tag}
              className="text-[10px] font-semibold text-pumple-primary/80 bg-pumple-primary/8 border border-pumple-primary/15 px-1.5 py-0.5 rounded-md"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center mt-2.5 pt-2.5 border-t border-pumple-border">
        <div className="flex items-center gap-1.5 min-w-0">
          <TierBadge tier={signal.tier} />
          <Link href={`/profile/${signal.user}`} className="text-[11px] font-semibold text-pumple-text hover:text-pumple-primary transition-colors truncate">
            @{signal.user}
          </Link>
          <span className="text-[11px] font-bold tnum text-pumple-primary flex-shrink-0">{signal.accuracy}</span>
        </div>
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <button className="btn-ghost text-[11px] px-2 py-1 rounded-md">
            <ThumbsUp size={10} />
            <span className="tnum">{signal.likes}</span>
          </button>
          <button className="btn-ghost text-[11px] px-2 py-1 rounded-md">
            <CheckCircle size={10} />
            Called it <span className="tnum">{signal.calledIt}</span>
          </button>
          <Link
            href={`/signals/${signal.id}`}
            aria-label="Open signal"
            className="flex items-center justify-center w-6 h-6 rounded-md text-pumple-muted hover:text-pumple-primary hover:bg-pumple-primary/10 transition-colors"
          >
            <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </div>
  )
}
