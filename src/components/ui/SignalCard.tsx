import dynamic from 'next/dynamic'
import { ThumbsUp, CheckCircle } from 'lucide-react'
import { RARITY_COLORS, type Signal } from '@/types'
import TierBadge from './TierBadge'

const MiniChart = dynamic(() => import('./MiniChart'), { ssr: false })

interface SignalCardProps {
  signal: Signal
}

function parsePrice(str: string): number {
  return parseFloat(str.replace(/[$,]/g, ''))
}

export default function SignalCard({ signal }: SignalCardProps) {
  const rarityColor = RARITY_COLORS[signal.rarity]
  const directionColor = signal.direction === 'LONG' ? '#4ADE80' : '#F43F5E'
  const entryNum = parsePrice(signal.entry)
  const tpNum = parsePrice(signal.tp)
  const slNum = parsePrice(signal.sl)

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

      {/* Row 1: Direction + coin + rarity */}
      <div className="flex justify-between items-center mb-2.5 mt-1">
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
          <span className="text-[15px] font-bold text-pumple-text">{signal.coin}</span>
          <span className="text-[10px] text-pumple-muted bg-pumple-elevated px-1.5 py-0.5 rounded-full">
            {signal.timeframe}
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
      <div className="mb-2.5">
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

      {/* Mini chart */}
      <MiniChart
        entry={entryNum}
        tp={tpNum}
        sl={slNum}
        direction={signal.direction}
        timeframe={signal.timeframe}
      />

      {/* Row 3: Entry / TP / SL */}
      <div className="grid grid-cols-3 gap-1.5 mb-2.5">
        <div className="bg-pumple-elevated rounded-md p-1.5 text-center">
          <p className="text-pumple-muted text-[9px] mb-0.5">Entry</p>
          <p className="font-mono text-[11px] font-bold text-pumple-blue">{signal.entry}</p>
        </div>
        <div className="bg-pumple-elevated rounded-md p-1.5 text-center">
          <p className="text-pumple-muted text-[9px] mb-0.5">Take Profit</p>
          <p className="font-mono text-[11px] font-bold text-pumple-primary">{signal.tp}</p>
        </div>
        <div className="bg-pumple-elevated rounded-md p-1.5 text-center">
          <p className="text-pumple-muted text-[9px] mb-0.5">Stop Loss</p>
          <p className="font-mono text-[11px] font-bold text-pumple-red">{signal.sl}</p>
        </div>
      </div>

      {/* Row 4: Tags */}
      <div className="flex flex-wrap gap-1 mb-2.5">
        {signal.tags.map(tag => (
          <span
            key={tag}
            className="text-[10px] text-pumple-muted bg-pumple-elevated border border-pumple-border px-1.5 py-0.5 rounded-full"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* Row 5: Footer */}
      <div className="flex justify-between items-center pt-2 border-t border-pumple-border">
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
        </div>
      </div>
    </div>
  )
}
