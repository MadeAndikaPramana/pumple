'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { ThumbsUp, CheckCircle, ArrowRight } from 'lucide-react'
import { RARITY_COLORS, type Signal } from '@/types'
import TierBadge from './TierBadge'

const MiniChart = dynamic(() => import('./MiniChart'), { ssr: false })

interface SignalCardProps {
  signal: Signal
  chartHeight?: number
}

function parsePrice(str: string): number {
  return parseFloat(str.replace(/[$,]/g, ''))
}

export default function SignalCard({ signal, chartHeight = 240 }: SignalCardProps) {
  const rarityColor = RARITY_COLORS[signal.rarity]
  const directionColor = signal.direction === 'LONG' ? '#4ADE80' : '#F43F5E'
  const entryNum = parsePrice(signal.entry)
  const tpNum = parsePrice(signal.tp)
  const slNum = parsePrice(signal.sl)

  const rrRatio = signal.direction === 'LONG'
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
      className="bg-pumple-card rounded-[10px] p-3 relative overflow-hidden mb-3"
      style={{ border: `1px solid ${rarityColor}30` }}
    >
      {/* Top accent stripe */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{ backgroundColor: `${rarityColor}70` }}
      />

      {/* Row 1: Direction + coin + timeframe + R/R | rarity + time */}
      <div className="flex justify-between items-center mb-2 mt-1">
        <div className="flex items-center gap-2">
          <span
            className="text-[11px] font-bold px-2 py-0.5 rounded-[4px]"
            style={{
              backgroundColor: `${directionColor}20`,
              color: directionColor,
              border: `1px solid ${directionColor}40`,
            }}
          >
            {signal.direction}
          </span>
          <Link
            href={`/signals/${signal.id}`}
            className="text-[15px] font-bold text-pumple-text hover:underline cursor-pointer"
          >
            {signal.coin}
          </Link>
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
            style={{
              backgroundColor: `${rarityColor}20`,
              color: rarityColor,
              border: `1px solid ${rarityColor}40`,
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
          <span className="text-xs font-bold" style={{ color: rarityColor }}>{signal.confidence}%</span>
        </div>
        <div className="h-[3px] bg-pumple-dim rounded-full overflow-hidden">
          <div
            className="h-full rounded-full"
            style={{ width: `${signal.confidence}%`, backgroundColor: rarityColor }}
          />
        </div>
      </div>

      {/* Chart / image carousel */}
      <div className="my-2 relative" style={{ minHeight: `${chartHeight}px` }}>
        {slideIndex === 0 ? (
          <MiniChart
            entry={entryNum}
            tp={tpNum}
            sl={slNum}
            direction={signal.direction}
            timeframe={signal.timeframe}
            height={chartHeight}
          />
        ) : (
          <img
            src={signal.images![slideIndex - 1]}
            className="w-full rounded-[8px] object-cover transition-opacity duration-300"
            style={{ height: `${chartHeight}px` }}
            alt=""
          />
        )}
      </div>

      {/* Slide dots — only when images exist */}
      {hasImages && (
        <div className="flex justify-center gap-1 mt-1.5">
          {Array.from({ length: totalSlides }).map((_, i) => (
            <button
              key={i}
              onClick={() => setSlideIndex(i)}
              className={`w-1.5 h-1.5 rounded-full transition-colors ${i === slideIndex ? 'bg-pumple-primary' : 'bg-pumple-dim'}`}
            />
          ))}
        </div>
      )}

      {/* Tags */}
      <div className="mt-2">
        <div className="flex gap-1.5 flex-wrap">
          {signal.tags.map(tag => (
            <span key={tag} className="text-[10px] text-pumple-primary/70 font-semibold">#{tag}</span>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center mt-2 pt-2 border-t border-pumple-border">
        <div className="flex items-center gap-1.5">
          <TierBadge tier={signal.tier} />
          <span className="text-[11px] font-semibold text-pumple-text">@{signal.user}</span>
          <span className="text-[11px] text-pumple-primary">{signal.accuracy}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <button className="flex items-center gap-1 text-[11px] text-pumple-muted bg-pumple-elevated border border-pumple-border rounded-[5px] px-2 py-1 hover:text-pumple-text transition-colors">
            <ThumbsUp size={10} />
            {signal.likes}
          </button>
          <button className="flex items-center gap-1 text-[11px] text-pumple-muted bg-pumple-elevated border border-pumple-border rounded-[5px] px-2 py-1 hover:text-pumple-text transition-colors">
            <CheckCircle size={10} />
            Called it {signal.calledIt}
          </button>
          <Link
            href={`/signals/${signal.id}`}
            className="flex items-center gap-1 text-[10px] text-pumple-muted hover:text-pumple-primary transition-colors"
          >
            <ArrowRight size={12} />
          </Link>
        </div>
      </div>
    </div>
  )
}
