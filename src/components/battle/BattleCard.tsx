'use client'

import { useState, useEffect } from 'react'
import { Clock, Coins, Eye, Sword, Sparkles } from 'lucide-react'
import { TIERS, type Battle, type BattlePlayer } from '@/types'
import TierBadge from '@/components/ui/TierBadge'

const KEYFRAMES = `
@keyframes slideInLeft {
  from { transform: translateX(-40px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}
@keyframes slideInRight {
  from { transform: translateX(40px) scaleX(-1); opacity: 0; }
  to { transform: translateX(0) scaleX(-1); opacity: 1; }
}
@keyframes clash {
  0% { transform: scale(1); }
  50% { transform: scale(1.3); filter: brightness(2) drop-shadow(0 0 8px rgba(74,222,128,0.8)); }
  100% { transform: scale(1); }
}
@keyframes sparkle {
  0% { opacity: 0; transform: scale(0) rotate(0deg); }
  50% { opacity: 1; transform: scale(1.5) rotate(90deg); }
  100% { opacity: 0; transform: scale(0) rotate(180deg); }
}
`

function fmtPnl(n: number) {
  return `${n > 0 ? '+' : ''}${n.toFixed(1)}%`
}

function pnlColor(n: number) {
  return n >= 0 ? '#4ADE80' : '#F43F5E'
}

function PlayerSide({ player, align }: { player: BattlePlayer; align: 'left' | 'right' }) {
  const tierColor = TIERS[player.tier].color
  const positive = player.currentPnL >= 0
  const fill = Math.max(5, Math.min(95, 50 + player.currentPnL / 2))
  const activePositions = player.positions.filter(p => p.status === 'active')
  const isRight = align === 'right'

  return (
    <div className="flex-1 min-w-0">
      {/* Identity */}
      <div className={`flex items-center gap-2 ${isRight ? 'flex-row-reverse' : ''}`}>
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0"
          style={{ backgroundColor: `${tierColor}20`, border: `2px solid ${tierColor}`, color: tierColor }}
        >
          {player.username.slice(0, 1).toUpperCase()}
        </div>
        <div className={`min-w-0 ${isRight ? 'text-right' : ''}`}>
          <p className="text-xs font-bold text-pumple-text truncate">{player.username}</p>
          <TierBadge tier={player.tier} size="sm" />
        </div>
      </div>

      {/* Health bar */}
      <div className="mt-2">
        <div className={`flex items-center justify-between mb-1 ${isRight ? 'flex-row-reverse' : ''}`}>
          <span className="text-[9px] font-bold text-pumple-muted">P&amp;L</span>
          <span className="text-xs font-bold" style={{ color: pnlColor(player.currentPnL) }}>
            {fmtPnl(player.currentPnL)}
          </span>
        </div>
        <div className="h-2 bg-pumple-dim rounded-full overflow-hidden w-full">
          <div
            className="h-full rounded-full transition-all duration-1000"
            style={{
              width: `${fill}%`,
              marginLeft: isRight ? 'auto' : 0,
              background: positive
                ? 'linear-gradient(90deg, #4ADE8070, #4ADE80)'
                : 'linear-gradient(90deg, #F43F5E70, #F43F5E)',
              boxShadow: positive ? '0 0 8px rgba(74,222,128,0.4)' : '0 0 8px rgba(244,63,94,0.4)',
            }}
          />
        </div>
      </div>

      {/* Active positions */}
      {activePositions.length > 0 && (
        <div className={`mt-2 flex flex-col gap-1 ${isRight ? 'items-end' : 'items-start'}`}>
          {activePositions.map(pos => {
            const dirColor = pos.direction === 'LONG' ? '#4ADE80' : '#F43F5E'
            return (
              <div key={pos.id} className="bg-pumple-elevated rounded-md px-2 py-1 text-[10px] flex items-center gap-1.5">
                <span
                  className="text-[8px] font-bold px-1 py-0.5 rounded"
                  style={{ backgroundColor: `${dirColor}20`, color: dirColor }}
                >
                  {pos.direction}
                </span>
                <span className="font-mono font-bold text-pumple-text">{pos.coin}</span>
                <span className="font-bold" style={{ color: pnlColor(pos.pnlPercent) }}>{fmtPnl(pos.pnlPercent)}</span>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default function BattleCard({ battle }: { battle: Battle }) {
  const [phase, setPhase] = useState<'idle' | 'enter' | 'clash'>('idle')

  useEffect(() => {
    setPhase('enter')
    const t = setTimeout(() => setPhase('clash'), 400)
    return () => clearTimeout(t)
  }, [])

  const isMock = battle.mode === 'mock'
  const isOpen = battle.status === 'open' || !battle.player2

  return (
    <div className="bg-pumple-card border border-pumple-border rounded-[16px] overflow-hidden relative p-card-hover">
      <style>{KEYFRAMES}</style>

      {/* Mock badge */}
      {isMock && (
        <div className="absolute top-2 left-2 z-10 bg-pumple-dim text-pumple-muted text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
          MOCK
        </div>
      )}

      {/* Clashing swords animation header */}
      <div className="h-[60px] bg-gradient-to-r from-[#0A0B0F] via-[#1A1D27] to-[#0A0B0F] relative overflow-hidden flex items-center justify-center">
        <div
          className="flex items-center justify-center"
          style={phase === 'clash' ? { animationName: 'clash', animationDuration: '0.4s', animationFillMode: 'forwards' } : undefined}
        >
          {/* Left sword — Lucide's sword glyph is already diagonal, so no extra rotation */}
          <div
            className="text-pumple-text"
            style={{ animationName: 'slideInLeft', animationDuration: '0.4s', animationFillMode: 'forwards', marginRight: '-13px' }}
          >
            <Sword size={22} />
          </div>
          {/* Sparkle */}
          <div
            className="text-pumple-primary relative z-10"
            style={{ animationName: 'sparkle', animationDuration: '0.3s', animationDelay: '0.4s', animationFillMode: 'forwards', opacity: 0 }}
          >
            <Sparkles size={16} />
          </div>
          {/* Right sword — mirrored to cross the left one */}
          <div
            className="text-pumple-text"
            style={{ transform: 'scaleX(-1)', animationName: 'slideInRight', animationDuration: '0.4s', animationFillMode: 'forwards', marginLeft: '-13px' }}
          >
            <Sword size={22} />
          </div>
        </div>

        {/* Time remaining badge */}
        {(battle.timeLeft || battle.duration) && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 bg-pumple-elevated text-pumple-gold text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
            <Clock size={10} />
            {battle.timeLeft ?? battle.duration}
          </div>
        )}
      </div>

      {/* Main battle area */}
      <div className="p-4">
        <div className="flex items-start gap-3">
          <PlayerSide player={battle.player1} align="left" />

          {/* VS divider */}
          <div className="flex flex-col items-center gap-1 px-2 self-center">
            <div className="h-8 w-px bg-gradient-to-b from-transparent to-pumple-primary/40" />
            <span className="font-display text-[10px] font-bold text-pumple-primary bg-pumple-primary/10 border border-pumple-primary/30 px-1.5 py-0.5 rounded">
              VS
            </span>
            <div className="h-8 w-px bg-gradient-to-t from-transparent to-pumple-primary/40" />
          </div>

          {isOpen ? (
            /* Waiting for opponent */
            <div className="flex-1 flex flex-col items-center justify-center text-center gap-2">
              <div className="w-10 h-10 rounded-full border-2 border-dashed border-pumple-border flex items-center justify-center text-pumple-muted text-sm font-black">
                ?
              </div>
              <p className="text-[10px] text-pumple-muted">Waiting for opponent...</p>
              <button className="btn-degen text-[11px] px-3 py-1">
                Join Battle
              </button>
            </div>
          ) : (
            <PlayerSide player={battle.player2!} align="right" />
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-pumple-border pt-3 mt-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {battle.stake && (
              <span className="flex items-center gap-1 text-[11px] font-bold text-pumple-gold">
                <Coins size={11} />
                {battle.stake}
              </span>
            )}
            {battle.stake && <span className="text-pumple-muted text-[11px]">·</span>}
            <span className="flex items-center gap-1 text-[11px] text-pumple-muted">
              <Eye size={11} />
              {battle.watchers.toLocaleString()}
            </span>
          </div>
          <button className="btn-ghost text-[11px] px-3 py-1">
            <Eye size={11} />
            Watch
          </button>
        </div>
      </div>
    </div>
  )
}
