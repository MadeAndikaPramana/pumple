'use client'

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import TierBadge from './TierBadge'

interface AddSignalModalProps {
  isOpen: boolean
  onClose: () => void
}

const TIMEFRAMES = ['15m', '1H', '4H', '1D', '1W']
const QUICK_COINS = ['$BTC', '$ETH', '$SOL', '$AVAX', '$BNB']
const SIGNAL_TYPES = ['SMC', 'Fibonacci', 'Orderflow', 'Whale', 'Confluence', 'Custom']
const SUGGESTED_TAGS = ['#SMC', '#BOS', '#FVG', '#OrderBlock', '#Fibonacci', '#Confluence', '#WhaleAlert', '#Liquidity']

function parseNum(s: string): number { return parseFloat(s.replace(/[^0-9.]/g, '')) || 0 }

export default function AddSignalModal({ isOpen, onClose }: AddSignalModalProps) {
  const [direction, setDirection] = useState<'LONG' | 'SHORT'>('LONG')
  const [coin, setCoin] = useState('')
  const [timeframe, setTimeframe] = useState('4H')
  const [entryPrice, setEntryPrice] = useState('')
  const [takeProfit, setTakeProfit] = useState('')
  const [stopLoss, setStopLoss] = useState('')
  const [confidence, setConfidence] = useState(75)
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [description, setDescription] = useState('')
  const [tags, setTags] = useState('')

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    if (isOpen) document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [isOpen, onClose])

  if (!isOpen) return null

  const entry = parseNum(entryPrice)
  const tp    = parseNum(takeProfit)
  const sl    = parseNum(stopLoss)

  const rrRatio = entry > 0 && tp > 0 && sl > 0 && Math.abs(entry - sl) > 0
    ? (direction === 'LONG'
        ? ((tp - entry) / (entry - sl))
        : ((entry - tp) / (sl - entry))
      ).toFixed(2)
    : '—'

  const tpPct = entry > 0 && tp > 0
    ? (direction === 'LONG'
        ? ((tp - entry) / entry * 100).toFixed(2)
        : ((entry - tp) / entry * 100).toFixed(2))
    : null

  const slPct = entry > 0 && sl > 0
    ? (direction === 'LONG'
        ? ((entry - sl) / entry * 100).toFixed(2)
        : ((sl - entry) / entry * 100).toFixed(2))
    : null

  const confidenceColor = confidence >= 80 ? '#4ADE80' : confidence >= 65 ? '#FBBF24' : '#F43F5E'

  const toggleType = (t: string) =>
    setSelectedTypes(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t])

  const appendTag = (tag: string) =>
    setTags(prev => prev.includes(tag) ? prev : prev ? `${prev} ${tag}` : tag)

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div
        className="w-full overflow-y-auto"
        style={{
          maxWidth: '600px',
          maxHeight: '90vh',
          backgroundColor: '#111318',
          border: '1px solid #1E2235',
          borderRadius: '16px',
        }}
      >
        {/* Header */}
        <div
          className="flex justify-between items-center p-4"
          style={{ borderBottom: '1px solid #1E2235' }}
        >
          <span className="text-sm font-bold text-pumple-text">Post a signal</span>
          <button
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center rounded-md text-pumple-muted hover:text-pumple-text hover:bg-pumple-elevated transition-colors"
          >
            <X size={14} />
          </button>
        </div>

        {/* Body */}
        <div className="p-4 flex flex-col gap-4">

          {/* Section 1: Direction + Pair + Timeframe */}
          <div className="flex gap-3">
            {/* Direction toggle */}
            <div className="flex flex-col gap-1">
              <span className="text-[11px] text-pumple-muted">Direction</span>
              <div className="flex gap-1">
                {(['LONG', 'SHORT'] as const).map(d => (
                  <button
                    key={d}
                    onClick={() => setDirection(d)}
                    className="text-[11px] font-bold px-3 py-1.5 rounded-[6px] transition-colors"
                    style={direction === d
                      ? d === 'LONG'
                        ? { backgroundColor: '#4ADE8020', color: '#4ADE80', border: '1px solid #4ADE8050' }
                        : { backgroundColor: '#F43F5E20', color: '#F43F5E', border: '1px solid #F43F5E50' }
                      : { backgroundColor: '#181B24', color: '#64748B', border: '1px solid #1E2235' }
                    }
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            {/* Coin */}
            <div className="flex-1 flex flex-col gap-1">
              <span className="text-[11px] text-pumple-muted">Pair</span>
              <input
                type="text"
                value={coin}
                onChange={e => setCoin(e.target.value)}
                placeholder="BTC/USDT"
                className="bg-pumple-elevated border border-pumple-border rounded-[8px] px-3 py-2 text-sm text-pumple-text placeholder:text-pumple-muted/50 outline-none focus:border-pumple-primary/50 transition-colors"
              />
              <div className="flex gap-1 flex-wrap">
                {QUICK_COINS.map(c => (
                  <button
                    key={c}
                    onClick={() => setCoin(c.replace('$', '') + '/USDT')}
                    className="text-[10px] font-semibold px-1.5 py-0.5 rounded-[4px] transition-colors"
                    style={{ backgroundColor: '#181B24', color: '#64748B', border: '1px solid #1E2235' }}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Timeframe */}
            <div className="flex flex-col gap-1">
              <span className="text-[11px] text-pumple-muted">Timeframe</span>
              <div className="flex flex-col gap-1">
                {TIMEFRAMES.map(tf => (
                  <button
                    key={tf}
                    onClick={() => setTimeframe(tf)}
                    className="text-[11px] font-bold px-2.5 py-1 rounded-[5px] transition-colors"
                    style={timeframe === tf
                      ? { backgroundColor: '#4ADE8020', color: '#4ADE80', border: '1px solid #4ADE8040' }
                      : { backgroundColor: '#181B24', color: '#64748B', border: '1px solid #1E2235' }
                    }
                  >
                    {tf}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Section 2: Price Levels */}
          <div>
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: 'Entry Price', value: entryPrice, set: setEntryPrice, color: '#F1F5F9' },
                { label: 'Take Profit', value: takeProfit, set: setTakeProfit, color: '#4ADE80' },
                { label: 'Stop Loss',   value: stopLoss,   set: setStopLoss,   color: '#F43F5E' },
              ].map(({ label, value, set, color }) => (
                <div key={label}>
                  <p className="text-[11px] text-pumple-muted mb-1">{label}</p>
                  <input
                    type="text"
                    value={value}
                    onChange={e => set(e.target.value)}
                    placeholder="0.00"
                    className="w-full bg-pumple-elevated border border-pumple-border rounded-[8px] px-3 py-2 text-sm font-mono outline-none focus:border-pumple-primary/50 transition-colors"
                    style={{ color }}
                  />
                </div>
              ))}
            </div>
            {/* Live stats */}
            <div className="flex gap-4 mt-2">
              <span className="text-[12px] font-bold text-pumple-accent">R/R 1:{rrRatio}</span>
              {tpPct && <span className="text-[12px] font-bold text-pumple-primary">+{tpPct}%</span>}
              {slPct && <span className="text-[12px] font-bold text-pumple-red">-{slPct}%</span>}
            </div>
          </div>

          {/* Section 3: Confidence */}
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between">
              <span className="text-[11px] text-pumple-muted">AI Confidence</span>
              <span className="text-[11px] font-bold" style={{ color: confidenceColor }}>{confidence}%</span>
            </div>
            <input
              type="range"
              min={50}
              max={99}
              step={1}
              value={confidence}
              onChange={e => setConfidence(Number(e.target.value))}
              className="w-full accent-pumple-primary"
              style={{ accentColor: confidenceColor }}
            />
          </div>

          {/* Section 4: Signal Type */}
          <div>
            <p className="text-[11px] text-pumple-muted mb-1.5">Signal type</p>
            <div className="flex gap-2 flex-wrap">
              {SIGNAL_TYPES.map(t => (
                <button
                  key={t}
                  onClick={() => toggleType(t)}
                  className="text-[11px] font-bold px-2.5 py-1 rounded-[5px] transition-colors"
                  style={selectedTypes.includes(t)
                    ? { backgroundColor: '#4ADE8020', color: '#4ADE80', border: '1px solid #4ADE80' }
                    : { backgroundColor: '#181B24', color: '#64748B', border: '1px solid #1E2235' }
                  }
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Section 5: Description */}
          <div className="flex flex-col gap-1">
            <span className="text-[11px] text-pumple-muted">Analysis</span>
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Describe your analysis, key levels, and reasoning..."
              className="w-full bg-pumple-elevated border border-pumple-border rounded-[8px] p-3 text-sm resize-none outline-none focus:border-pumple-primary/50 transition-colors text-pumple-text placeholder:text-pumple-muted/50"
              style={{ height: '100px' }}
            />
          </div>

          {/* Section 6: Tags */}
          <div className="flex flex-col gap-1.5">
            <span className="text-[11px] text-pumple-muted">Tags</span>
            <input
              type="text"
              value={tags}
              onChange={e => setTags(e.target.value)}
              placeholder="#SMC #BOS #FVG..."
              className="bg-pumple-elevated border border-pumple-border rounded-[8px] px-3 py-2 text-sm text-pumple-text placeholder:text-pumple-muted/50 outline-none focus:border-pumple-primary/50 transition-colors"
            />
            <div className="flex gap-1.5 flex-wrap">
              {SUGGESTED_TAGS.map(tag => (
                <button
                  key={tag}
                  onClick={() => appendTag(tag)}
                  className="text-[10px] font-semibold text-pumple-muted hover:text-pumple-primary transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          className="flex justify-between items-center p-4"
          style={{ borderTop: '1px solid #1E2235' }}
        >
          <div className="flex items-center gap-2">
            <TierBadge tier="sniper" size="sm" />
            <span className="text-[11px] text-pumple-muted">Posting as @CryptoSniper_X</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="text-[11px] font-bold px-3 py-2 rounded-[8px] transition-colors text-pumple-muted"
              style={{ border: '1px solid #1E2235', backgroundColor: '#181B24' }}
            >
              Cancel
            </button>
            <button
              className="bg-pumple-primary text-black font-bold px-6 py-2 rounded-[8px] text-sm hover:bg-pumple-primary/90 transition-colors"
            >
              Post Signal
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
