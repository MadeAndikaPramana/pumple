'use client'

import { Trophy, Users, Layers, Ticket } from 'lucide-react'
import type { TournamentBracket } from '@/types'

const STATUS_STYLES: Record<TournamentBracket['status'], { label: string; color: string; pulse: boolean }> = {
  registering: { label: 'Registering', color: '#38BDF8', pulse: false },
  active:      { label: 'Active',      color: '#4ADE80', pulse: true  },
  completed:   { label: 'Completed',   color: '#64748B', pulse: false },
}

export default function TournamentCard({ tournament }: { tournament: TournamentBracket }) {
  const status = STATUS_STYLES[tournament.status]
  const regPct = Math.round((tournament.totalPlayers / tournament.maxPlayers) * 100)
  const rounds = Array.from(new Set(tournament.matches.map(m => m.round))).sort((a, b) => a - b)

  return (
    <div className="bg-pumple-card border border-pumple-border rounded-[16px] p-5 mb-4">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2 min-w-0">
          <Trophy size={18} className="text-pumple-gold flex-shrink-0" />
          <span className="text-base font-black text-pumple-text truncate">{tournament.name}</span>
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
          <p className="text-lg font-black text-pumple-accent">{tournament.prizePool}</p>
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
          <div className="h-2 bg-pumple-dim rounded-full overflow-hidden">
            <div className="h-full bg-pumple-primary transition-all duration-500" style={{ width: `${regPct}%` }} />
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
        <button className="bg-pumple-primary text-black text-[11px] font-bold px-4 py-1.5 rounded-md hover:bg-pumple-primary/90 transition-colors">
          {tournament.status === 'registering' ? 'Join Tournament' : 'View Bracket'}
        </button>
      </div>
    </div>
  )
}
