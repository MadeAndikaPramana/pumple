'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Clock, Coins, Eye, Swords, Target } from 'lucide-react'
import { TIERS, type TierKey } from '@/types'
import TierBadge from '@/components/ui/TierBadge'
import StatCard from '@/components/ui/StatCard'
import { BATTLES } from '@/lib/mock-data'

const ARENA_STATS = [
  { label: 'Active battles', value: '34',          icon: Swords, color: '#4ADE80' },
  { label: 'Total staked',   value: '12,400 PUMP', icon: Coins,  color: '#FBBF24' },
  { label: 'Your win rate',  value: '68%',         icon: Target, color: '#A78BFA' },
  { label: 'Watching now',   value: '2,090',       icon: Eye,    color: '#38BDF8' },
]

const FILTERS = [
  { id: 'all',    label: 'All Battles' },
  { id: 'hot',    label: '🔥 Hot' },
  { id: 'new',    label: '🆕 New' },
  { id: 'ending', label: '⏰ Ending Soon' },
  { id: 'stake',  label: '👑 High Stake' },
]

function directionColor(pred: 'LONG' | 'SHORT') {
  return pred === 'LONG' ? '#4ADE80' : '#F43F5E'
}

function TierAvatar({ tier }: { tier: TierKey }) {
  const color = TIERS[tier].color
  return (
    <div
      className="w-8 h-8 rounded-full mx-auto mb-1 flex items-center justify-center text-[10px] font-black"
      style={{ backgroundColor: `${color}20`, border: `2px solid ${color}60`, color }}
    >
      {TIERS[tier].label[0]}
    </div>
  )
}

export default function BattlesPage() {
  const [filter, setFilter] = useState('all')

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* Stats row */}
      <div className="grid grid-cols-4 gap-2 mb-3">
        {ARENA_STATS.map(stat => (
          <StatCard
            key={stat.label}
            label={stat.label}
            value={stat.value}
            icon={stat.icon}
            color={stat.color}
          />
        ))}
      </div>

      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <h1 className="text-sm font-bold text-pumple-text">Trading Arena</h1>
        <button className="flex items-center gap-1.5 bg-pumple-primary text-black text-[11px] font-bold rounded-[6px] px-3 py-1.5 hover:bg-pumple-primary/90 transition-colors">
          <Plus size={12} />
          Create Battle
        </button>
      </div>

      {/* Filter pills */}
      <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
        {FILTERS.map(f => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`text-[11px] font-semibold px-3 py-1.5 rounded-full whitespace-nowrap cursor-pointer flex-shrink-0 transition-colors ${
              filter === f.id
                ? 'bg-pumple-primary text-black'
                : 'bg-pumple-elevated text-pumple-muted border border-pumple-border hover:text-pumple-text'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Battle grid */}
      <div className="grid grid-cols-2 gap-3">
        {BATTLES.map(battle => {
          const color1 = directionColor(battle.user1.prediction)
          const color2 = directionColor(battle.user2.prediction)

          return (
            <div
              key={battle.id}
              className="bg-pumple-card border border-pumple-border rounded-[10px] p-3.5"
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-3">
                <span className="text-[16px] font-black text-pumple-text">{battle.coin}</span>
                <span
                  className="flex items-center gap-1 text-[11px] font-semibold"
                  style={{ color: '#FBBF24' }}
                >
                  <Clock size={11} />
                  {battle.timeLeft}
                </span>
              </div>

              {/* Fighter row */}
              <div className="flex gap-2 items-stretch mb-3">
                {/* User 1 */}
                <div
                  className="flex-1 rounded-[8px] p-2.5 text-center"
                  style={{
                    backgroundColor: `${color1}10`,
                    border: `1px solid ${color1}30`,
                  }}
                >
                  <TierAvatar tier={battle.user1.tier} />
                  <p className="text-[11px] font-bold text-pumple-text mb-1">{battle.user1.name}</p>
                  <div className="flex items-center justify-center gap-1 mb-0.5">
                    <span style={{ color: color1 }} className="font-black text-sm">
                      {battle.user1.prediction === 'LONG' ? '▲' : '▼'}
                    </span>
                    <span className="text-[11px] font-bold" style={{ color: color1 }}>
                      {battle.user1.prediction}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 justify-center">
                    <TierBadge tier={battle.user1.tier} size="sm" />
                  </div>
                  <p className="text-pumple-muted text-[10px] mt-1">{battle.user1.target}</p>
                </div>

                {/* VS */}
                <div
                  className="px-2 flex items-center self-center rounded-[5px]"
                  style={{ backgroundColor: '#2A2D3E' }}
                >
                  <span className="text-pumple-muted font-black text-xs">VS</span>
                </div>

                {/* User 2 */}
                <div
                  className="flex-1 rounded-[8px] p-2.5 text-center"
                  style={{
                    backgroundColor: `${color2}10`,
                    border: `1px solid ${color2}30`,
                  }}
                >
                  <TierAvatar tier={battle.user2.tier} />
                  <p className="text-[11px] font-bold text-pumple-text mb-1">{battle.user2.name}</p>
                  <div className="flex items-center justify-center gap-1 mb-0.5">
                    <span style={{ color: color2 }} className="font-black text-sm">
                      {battle.user2.prediction === 'LONG' ? '▲' : '▼'}
                    </span>
                    <span className="text-[11px] font-bold" style={{ color: color2 }}>
                      {battle.user2.prediction}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 justify-center">
                    <TierBadge tier={battle.user2.tier} size="sm" />
                  </div>
                  <p className="text-pumple-muted text-[10px] mt-1">{battle.user2.target}</p>
                </div>
              </div>

              {/* Footer */}
              <div
                className="flex justify-between items-center pt-2.5"
                style={{ borderTop: '1px solid #1E2235' }}
              >
                <span className="flex items-center gap-1 text-[11px] font-semibold text-pumple-gold">
                  <Coins size={11} />
                  {battle.stake}
                </span>
                <span className="flex items-center gap-1 text-[11px] text-pumple-muted">
                  <Eye size={11} />
                  {battle.watchers.toLocaleString()} watching
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </motion.div>
  )
}
