'use client'

import { Trophy, Users, Layers, Ticket } from 'lucide-react'
import type { TournamentBracket } from '@/types'

const STATUS_STYLES: Record<TournamentBracket['status'], { label: string; color: string; pulse: boolean }> = {
  registering: { label: 'Registering', color: '#60A5FA', pulse: false },
  active:      { label: 'Active',      color: '#1FD978', pulse: true  },
  completed:   { label: 'Completed',   color: '#A1A1AA', pulse: false },
}

export default function TournamentCard({ tournament }: { tournament: TournamentBracket }) {
  const status = STATUS_STYLES[tournament.status]
  const regPct = Math.round((tournament.totalPlayers / tournament.maxPlayers) * 100)
  const rounds = Array.from(new Set(tournament.matches.map(m => m.round))).sort((a, b) => a - b)

  return (
    <div className="p-card p-card-hover rounded-[16px] p-5 mb-4">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2 min-w-0">
          <Trophy size={18} className="text-pumple-gold flex-shrink-0" style={{ filter: 'drop-shadow(0 0 6px rgba(250, 204, 21,0.5))' }} />
          <span className="font-display text-base font-bold text-pumple-text truncate">{tournament.name}</span>
          <span
            className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded-full flex-shrink-0"
            style={{ backgroundColor: `${status.color}20`, color: status.color, border: `1px solid ${status.color}40` }}
          >
            {status.pulse && <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: status.color }} />}
            {status.label}
          </span>
        </div>
        <div className="text-right flex-shrink-0">
          <p className="text-[9px] font-bold text-pumple-muted tracking-widest">PRIZE POOL</p>
          <p className="font-display text-lg font-bold tnum text-pumple-accent">{tournament.prizePool}</p>
        </div>
      </div>

      {/* Info row */}
      <div className="flex gap-6 my-3 text-xs text-pumple-muted">
        <span className="flex items-center gap-1.5">
          <Users size={12} />
          {tournament.totalPlayers}/{tournament.maxPlayers} players
        </span>
        <span className="flex items-center gap-1.5">
          <Layers size={12} />
          Round {tournament.currentRound} of {tournament.totalRounds}
        </span>
        <span className="flex items-center gap-1.5">
          <Ticket size={12} />
          {tournament.entryFee}
        </span>
      </div>

      {/* Registration progress */}
      {tournament.status === 'registering' && (
        <div className="mb-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] text-pumple-muted">Registration</span>
            <span className="text-[10px] font-bold text-pumple-text">{tournament.totalPlayers}/{tournament.maxPlayers}</span>
          </div>
          <div className="bar-track !h-2">
            <div
              className="bar-fill transition-all duration-500"
              style={{ width: `${regPct}%`, background: 'linear-gradient(90deg, #1FD97880, #1FD978)' }}
            />
          </div>
        </div>
      )}

      {/* Bracket preview */}
      {tournament.status === 'active' && tournament.matches.length > 0 && (
        <div className="mb-3 bg-pumple-elevated rounded-[10px] p-3">
          {rounds.map(round => (
            <div key={round} className="mb-2 last:mb-0">
              <p className="text-[9px] font-bold text-pumple-muted tracking-widest mb-1">ROUND {round}</p>
              {tournament.matches.filter(m => m.round === round).map(match => (
                <div
                  key={match.id}
                  className="flex justify-between items-center py-1 border-b border-pumple-border last:border-0"
                >
                  <div className="flex items-center gap-2 text-[11px]">
                    <span className={match.winner === match.player1 ? 'font-black text-pumple-text' : 'text-pumple-muted'}>
                      {match.player1}
                    </span>
                    <span className="text-pumple-muted text-[10px]">vs</span>
                    <span className={match.winner === match.player2 ? 'font-black text-pumple-text' : 'text-pumple-muted'}>
                      {match.player2}
                    </span>
                  </div>
                  {match.status === 'completed' ? (
                    <span className="text-[9px] font-bold text-pumple-primary uppercase">{match.winner} won</span>
                  ) : match.status === 'active' ? (
                    <span className="text-[9px] font-bold text-pumple-gold uppercase">Live</span>
                  ) : (
                    <span className="text-[9px] text-pumple-muted uppercase">Pending</span>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="flex justify-end">
        <button className="btn-degen text-[11px] px-4 py-1.5">
          {tournament.status === 'registering' ? 'Join Tournament' : 'View Bracket'}
        </button>
      </div>
    </div>
  )
}
