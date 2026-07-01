'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Swords, Coins, Target, Eye } from 'lucide-react'
import StatCard from '@/components/ui/StatCard'
import BattleCard from '@/components/battle/BattleCard'
import TournamentCard from '@/components/battle/TournamentCard'
import TribeWarCard from '@/components/battle/TribeWarCard'
import CreateBattleModal from '@/components/battle/CreateBattleModal'
import { BATTLES, TOURNAMENTS, TRIBE_WARS } from '@/lib/mock-data'

type Mode = 'all' | 'classic_1v1' | 'tournament' | 'mock' | 'tribe_war'

const ARENA_STATS = [
  { label: 'Active battles', value: '34',          icon: Swords, color: '#4ADE80' },
  { label: 'Total staked',   value: '42,400 $PUMP', icon: Coins, color: '#FBBF24' },
  { label: 'Your win rate',  value: '68%',         icon: Target, color: '#A78BFA' },
  { label: 'Watching now',   value: '2,090',       icon: Eye,    color: '#38BDF8' },
]

const MODE_TABS: { id: Mode; label: string }[] = [
  { id: 'all',         label: 'All' },
  { id: 'classic_1v1', label: '⚔️ Classic 1v1' },
  { id: 'tournament',  label: '🏆 Tournament' },
  { id: 'mock',        label: '🎭 Mock' },
  { id: 'tribe_war',   label: '🛡️ Tribe War' },
]

export default function BattlesPage() {
  const [activeMode, setActiveMode] = useState<Mode>('all')
  const [showCreateModal, setShowCreateModal] = useState(false)

  const liveBattles = BATTLES.filter(b => (b.mode === 'classic_1v1' || b.mode === 'mock') && b.status === 'active')
  const openBattles = BATTLES.filter(b => b.status === 'open')
  const mockBattles = BATTLES.filter(b => b.mode === 'mock')

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-black text-pumple-text">Trading Arena</h1>
          <p className="text-sm text-pumple-muted mt-1">Compete. Prove your accuracy. Earn $PUMP.</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-1.5 bg-pumple-primary text-black font-bold text-[11px] rounded-[8px] px-4 py-2 hover:bg-pumple-primary/90 transition-colors flex-shrink-0"
        >
          + Create Battle
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-2 my-4">
        {ARENA_STATS.map(stat => (
          <StatCard key={stat.label} label={stat.label} value={stat.value} icon={stat.icon} color={stat.color} />
        ))}
      </div>

      {/* Mode tabs */}
      <div className="flex gap-0 border-b border-pumple-border mb-6">
        {MODE_TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveMode(tab.id)}
            className={`px-4 py-2.5 text-sm transition-colors ${
              activeMode === tab.id
                ? 'border-b-2 border-pumple-primary text-pumple-text font-bold -mb-px'
                : 'text-pumple-muted hover:text-pumple-text'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ALL / CLASSIC_1V1 */}
      {(activeMode === 'all' || activeMode === 'classic_1v1') && (
        <>
          <h2 className="text-sm font-bold text-pumple-text mb-3">Live Battles</h2>
          <div className="grid grid-cols-2 gap-4">
            {liveBattles.map(battle => (
              <BattleCard key={battle.id} battle={battle} />
            ))}
          </div>

          {openBattles.length > 0 && (
            <>
              <h2 className="text-sm font-bold text-pumple-text mb-3 mt-8">Open challenges</h2>
              <div className="grid grid-cols-2 gap-4">
                {openBattles.map(battle => (
                  <BattleCard key={battle.id} battle={battle} />
                ))}
              </div>
            </>
          )}
        </>
      )}

      {/* TOURNAMENT */}
      {activeMode === 'tournament' && (
        <>
          {TOURNAMENTS.map(t => (
            <TournamentCard key={t.id} tournament={t} />
          ))}
        </>
      )}

      {/* MOCK */}
      {activeMode === 'mock' && (
        <>
          <div className="bg-pumple-elevated rounded-[8px] p-2 mb-4">
            <p className="text-[11px] text-pumple-muted">Practice battles don&apos;t affect your ranking</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {mockBattles.map(battle => (
              <BattleCard key={battle.id} battle={battle} />
            ))}
          </div>
        </>
      )}

      {/* TRIBE WAR */}
      {activeMode === 'tribe_war' && (
        <>
          {TRIBE_WARS.map(w => (
            <TribeWarCard key={w.id} war={w} />
          ))}
        </>
      )}

      <CreateBattleModal isOpen={showCreateModal} onClose={() => setShowCreateModal(false)} />
    </motion.div>
  )
}
