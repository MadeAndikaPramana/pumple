'use client'

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import type { BattleMode } from '@/types'
import { TRIBES } from '@/lib/mock-data'

interface CreateBattleModalProps {
  isOpen: boolean
  onClose: () => void
}

const MODES: { id: BattleMode; icon: string; name: string; desc: string }[] = [
  { id: 'classic_1v1', icon: '⚔️', name: 'Classic 1v1', desc: 'Head-to-head, 24H max' },
  { id: 'tournament',  icon: '🏆', name: 'Tournament',  desc: '8-16 player bracket' },
  { id: 'mock',        icon: '🎭', name: 'Mock',        desc: 'Practice, no stake' },
  { id: 'tribe_war',   icon: '🛡️', name: 'Tribe War',   desc: 'Tribe vs Tribe' },
]

const QUICK_COINS = ['$BTC', '$ETH', '$SOL', '$AVAX', '$BNB']

const RULES = [
  'One direction at a time — no switching until position closes',
  'No hedging — cannot hold opposing directions simultaneously',
  'One active position per coin — resolve before opening new',
  'Entries must be declared before candle close',
  'PnL scored as % gain from virtual $10,000 balance',
]

function DurationGroup({ options, value, onChange }: { options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex gap-1.5">
      {options.map(opt => (
        <button
          key={opt}
          onClick={() => onChange(opt)}
          className="text-[11px] font-bold px-3 py-1.5 rounded-[6px] transition-colors"
          style={value === opt
            ? { backgroundColor: '#4ADE8020', color: '#4ADE80', border: '1px solid #4ADE8040' }
            : { backgroundColor: '#181B24', color: '#64748B', border: '1px solid #1E2235' }
          }
        >
          {opt}
        </button>
      ))}
    </div>
  )
}

export default function CreateBattleModal({ isOpen, onClose }: CreateBattleModalProps) {
  const [mode, setMode] = useState<BattleMode>('classic_1v1')
  const [coin, setCoin] = useState('$BTC')
  const [duration, setDuration] = useState('24H')
  const [stake, setStake] = useState('')
  const [isPublic, setIsPublic] = useState(true)
  const [maxPlayers, setMaxPlayers] = useState<8 | 16>(8)
  const [matchDuration, setMatchDuration] = useState('4H')
  const [entryFee, setEntryFee] = useState('')
  const [tournamentName, setTournamentName] = useState('')
  const [challengeTribe, setChallengeTribe] = useState('')
  const [warDuration, setWarDuration] = useState('1W')
  const [minParticipants, setMinParticipants] = useState(3)

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    if (isOpen) document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [isOpen, onClose])

  if (!isOpen) return null

  const isClassicOrMock = mode === 'classic_1v1' || mode === 'mock'

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div
        className="w-full overflow-y-auto"
        style={{ maxWidth: '520px', maxHeight: '90vh', backgroundColor: '#111318', border: '1px solid #1E2235', borderRadius: '16px' }}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4" style={{ borderBottom: '1px solid #1E2235' }}>
          <span className="text-sm font-black text-pumple-text">Create a battle</span>
          <button
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center rounded-md text-pumple-muted hover:text-pumple-text hover:bg-pumple-elevated transition-colors"
          >
            <X size={14} />
          </button>
        </div>

        <div className="p-4">
          {/* Mode selector */}
          <div className="grid grid-cols-2 gap-2 mb-4">
            {MODES.map(m => {
              const active = mode === m.id
              return (
                <button
                  key={m.id}
                  onClick={() => setMode(m.id)}
                  className={`rounded-[10px] p-3 cursor-pointer text-center transition-colors ${
                    active
                      ? 'border border-pumple-primary bg-pumple-primary/10'
                      : 'border border-pumple-border bg-pumple-elevated hover:border-pumple-dim'
                  }`}
                >
                  <div className="text-2xl mb-1">{m.icon}</div>
                  <p className="text-sm font-bold text-pumple-text">{m.name}</p>
                  <p className="text-[10px] text-pumple-muted">{m.desc}</p>
                </button>
              )
            })}
          </div>

          {/* Settings — Classic 1v1 / Mock */}
          {isClassicOrMock && (
            <div className="flex flex-col gap-4">
              <div>
                <p className="text-[11px] text-pumple-muted mb-1.5">Coin</p>
                <div className="flex gap-1.5 flex-wrap">
                  {QUICK_COINS.map(c => (
                    <button
                      key={c}
                      onClick={() => setCoin(c)}
                      className="text-[11px] font-semibold px-2.5 py-1 rounded-[5px] transition-colors"
                      style={coin === c
                        ? { backgroundColor: '#4ADE8020', color: '#4ADE80', border: '1px solid #4ADE8040' }
                        : { backgroundColor: '#181B24', color: '#64748B', border: '1px solid #1E2235' }
                      }
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-[11px] text-pumple-muted mb-1.5">Duration</p>
                <DurationGroup options={['1H', '4H', '24H', '1W']} value={duration} onChange={setDuration} />
              </div>

              {mode !== 'mock' && (
                <div>
                  <p className="text-[11px] text-pumple-muted mb-1.5">Stake</p>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={stake}
                      onChange={e => setStake(e.target.value)}
                      placeholder="0"
                      className="flex-1 bg-pumple-elevated border border-pumple-border rounded-[8px] px-3 py-2 text-sm text-pumple-text placeholder:text-pumple-muted/50 outline-none focus:border-pumple-primary/50 transition-colors"
                    />
                    <span className="text-xs font-bold text-pumple-gold">$PUMP</span>
                  </div>
                  <p className="text-[10px] text-pumple-muted mt-1">0 = free entry</p>
                </div>
              )}

              <div>
                <p className="text-[11px] text-pumple-muted mb-1.5">Visibility</p>
                <div className="flex gap-1.5">
                  {[{ v: true, label: 'Public' }, { v: false, label: 'Private' }].map(opt => (
                    <button
                      key={opt.label}
                      onClick={() => setIsPublic(opt.v)}
                      className="text-[11px] font-bold px-3 py-1.5 rounded-[6px] transition-colors"
                      style={isPublic === opt.v
                        ? { backgroundColor: '#4ADE8020', color: '#4ADE80', border: '1px solid #4ADE8040' }
                        : { backgroundColor: '#181B24', color: '#64748B', border: '1px solid #1E2235' }
                      }
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
                <p className="text-[10px] text-pumple-muted mt-1">
                  {isPublic ? 'Anyone can join this battle' : 'Requires an invite link to join'}
                </p>
              </div>
            </div>
          )}

          {/* Settings — Tournament */}
          {mode === 'tournament' && (
            <div className="flex flex-col gap-4">
              <div>
                <p className="text-[11px] text-pumple-muted mb-1.5">Max players</p>
                <div className="flex gap-1.5">
                  {([8, 16] as const).map(n => (
                    <button
                      key={n}
                      onClick={() => setMaxPlayers(n)}
                      className="text-[11px] font-bold px-3 py-1.5 rounded-[6px] transition-colors"
                      style={maxPlayers === n
                        ? { backgroundColor: '#4ADE8020', color: '#4ADE80', border: '1px solid #4ADE8040' }
                        : { backgroundColor: '#181B24', color: '#64748B', border: '1px solid #1E2235' }
                      }
                    >
                      {n} players
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-[11px] text-pumple-muted mb-1.5">Duration per match</p>
                <DurationGroup options={['1H', '4H', '24H']} value={matchDuration} onChange={setMatchDuration} />
              </div>

              <div>
                <p className="text-[11px] text-pumple-muted mb-1.5">Entry fee</p>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={entryFee}
                    onChange={e => setEntryFee(e.target.value)}
                    placeholder="0"
                    className="flex-1 bg-pumple-elevated border border-pumple-border rounded-[8px] px-3 py-2 text-sm text-pumple-text placeholder:text-pumple-muted/50 outline-none focus:border-pumple-primary/50 transition-colors"
                  />
                  <span className="text-xs font-bold text-pumple-gold">$PUMP</span>
                </div>
              </div>

              <div>
                <p className="text-[11px] text-pumple-muted mb-1.5">Tournament name</p>
                <input
                  type="text"
                  value={tournamentName}
                  onChange={e => setTournamentName(e.target.value)}
                  placeholder="Weekly Sniper Cup"
                  className="w-full bg-pumple-elevated border border-pumple-border rounded-[8px] px-3 py-2 text-sm text-pumple-text placeholder:text-pumple-muted/50 outline-none focus:border-pumple-primary/50 transition-colors"
                />
              </div>
            </div>
          )}

          {/* Settings — Tribe War */}
          {mode === 'tribe_war' && (
            <div className="flex flex-col gap-4">
              <div>
                <p className="text-[11px] text-pumple-muted mb-1.5">Your tribe</p>
                <div className="bg-pumple-elevated border border-pumple-border rounded-[8px] px-3 py-2 text-sm text-pumple-text">
                  SMC Snipers
                </div>
              </div>

              <div>
                <p className="text-[11px] text-pumple-muted mb-1.5">Challenge</p>
                <select
                  value={challengeTribe}
                  onChange={e => setChallengeTribe(e.target.value)}
                  className="w-full bg-pumple-elevated border border-pumple-border rounded-[8px] px-3 py-2 text-sm text-pumple-text outline-none focus:border-pumple-primary/50 transition-colors cursor-pointer"
                >
                  <option value="">Select a tribe...</option>
                  {TRIBES.map(t => (
                    <option key={t.name} value={t.name}>{t.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <p className="text-[11px] text-pumple-muted mb-1.5">Duration</p>
                <DurationGroup options={['3D', '1W', '2W']} value={warDuration} onChange={setWarDuration} />
              </div>

              <div>
                <p className="text-[11px] text-pumple-muted mb-1.5">Min participants per tribe</p>
                <div className="flex gap-1.5">
                  {[3, 5, 10].map(n => (
                    <button
                      key={n}
                      onClick={() => setMinParticipants(n)}
                      className="text-[11px] font-bold px-3 py-1.5 rounded-[6px] transition-colors"
                      style={minParticipants === n
                        ? { backgroundColor: '#4ADE8020', color: '#4ADE80', border: '1px solid #4ADE8040' }
                        : { backgroundColor: '#181B24', color: '#64748B', border: '1px solid #1E2235' }
                      }
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Ruleset reminder */}
          <div className="bg-pumple-elevated rounded-[8px] p-3 mt-3" style={{ borderLeft: '2px solid #4ADE80' }}>
            <p className="text-[11px] font-bold text-pumple-primary mb-1">Battle Rules</p>
            <ul className="text-[11px] text-pumple-muted leading-relaxed list-disc list-inside space-y-0.5">
              {RULES.map(rule => (
                <li key={rule}>{rule}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-2 p-4" style={{ borderTop: '1px solid #1E2235' }}>
          <button
            onClick={onClose}
            className="text-[11px] font-bold px-4 py-2 rounded-[8px] text-pumple-muted"
            style={{ border: '1px solid #1E2235', backgroundColor: '#181B24' }}
          >
            Cancel
          </button>
          <button className="bg-pumple-primary text-black font-bold px-6 py-2 rounded-[8px] text-sm hover:bg-pumple-primary/90 transition-colors">
            Create Battle
          </button>
        </div>
      </div>
    </div>
  )
}
