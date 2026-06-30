'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Shield, Target, Coins, Crown, TrendingUp, Lock, Users } from 'lucide-react'
import { TIERS, type TierKey } from '@/types'
import TierBadge from '@/components/ui/TierBadge'
import { TRIBES } from '@/lib/mock-data'

const TIER_ICONS: Record<TierKey, React.ReactNode> = {
  apprentice: <TrendingUp size={18} />,
  trader:     <TrendingUp size={18} />,
  sniper:     <Target size={18} />,
  whale:      <Coins size={18} />,
  legend:     <Crown size={18} />,
}

const FILTERS = [
  { id: 'all',    label: 'All Tribes' },
  { id: 'active', label: '🔥 Most Active' },
  { id: 'new',    label: '🆕 New' },
  { id: 'top',    label: '👑 Top Accuracy' },
]

export default function TribesPage() {
  const [filter, setFilter] = useState('all')
  const topTribes = [...TRIBES].sort((a, b) => parseFloat(b.accuracy) - parseFloat(a.accuracy))

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="flex gap-4"
    >
      {/* Main column */}
      <div className="flex-1 min-w-0">
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <h1 className="text-sm font-bold text-pumple-text">Tribes</h1>
        <button className="flex items-center gap-1.5 bg-pumple-primary text-black text-[11px] font-bold rounded-[6px] px-3 py-1.5 hover:bg-pumple-primary/90 transition-colors">
          <Plus size={12} />
          Create Tribe
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

      {/* Tribe grid */}
      <div className="grid grid-cols-2 gap-3">
        {TRIBES.map(tribe => {
          const tierColor = TIERS[tribe.tier].color

          return (
            <div
              key={tribe.name}
              className="bg-pumple-card rounded-[10px] p-3.5 relative overflow-hidden"
              style={{ border: `1px solid ${tierColor}40` }}
            >
              {/* Top stripe */}
              <div
                className="absolute top-0 left-0 right-0 h-[2px]"
                style={{ backgroundColor: tierColor }}
              />

              {/* Header */}
              <div className="flex justify-between items-start mb-2.5 mt-1">
                <div className="flex items-center gap-2">
                  <div
                    className="w-[38px] h-[38px] rounded-[9px] flex items-center justify-center flex-shrink-0"
                    style={{
                      backgroundColor: `${tierColor}20`,
                      border: `1px solid ${tierColor}50`,
                    }}
                  >
                    <span style={{ color: tierColor }}>{TIER_ICONS[tribe.tier]}</span>
                  </div>
                  <div>
                    <p className="text-[13px] font-black text-pumple-text leading-tight">{tribe.name}</p>
                    <TierBadge tier={tribe.tier} size="sm" />
                  </div>
                </div>
                {tribe.isPrivate && (
                  <span
                    className="flex items-center gap-0.5 text-[9px] font-bold px-1.5 py-0.5 rounded-[3px]"
                    style={{
                      backgroundColor: '#FBBF2420',
                      color: '#FBBF24',
                      border: '1px solid #FBBF2440',
                    }}
                  >
                    <Lock size={8} />
                    PRIVATE
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-[11px] text-pumple-muted leading-[1.4] my-2.5">
                {tribe.description}
              </p>

              {/* Footer */}
              <div className="flex justify-between items-end">
                <div className="flex gap-3">
                  <div>
                    <p className="text-pumple-muted text-[9px] uppercase font-bold mb-0.5">Members</p>
                    <div className="flex items-center gap-1">
                      <Users size={10} className="text-pumple-muted" />
                      <p className="text-[13px] font-bold text-pumple-text">{tribe.members}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-pumple-muted text-[9px] uppercase font-bold mb-0.5">Accuracy</p>
                    <p className="text-[13px] font-bold text-pumple-primary">{tribe.accuracy}</p>
                  </div>
                </div>
                <button
                  className="text-[11px] font-bold rounded-[6px] px-3 py-1.5 transition-colors"
                  style={
                    tribe.isPrivate
                      ? {
                          backgroundColor: '#FBBF2420',
                          color: '#FBBF24',
                          border: '1px solid #FBBF2440',
                        }
                      : {
                          backgroundColor: '#4ADE8020',
                          color: '#4ADE80',
                          border: '1px solid #4ADE8040',
                        }
                  }
                >
                  {tribe.isPrivate ? 'Request' : 'Join'}
                </button>
              </div>
            </div>
          )
        })}
      </div>
      </div>

      {/* Right sidebar — Top Tribes */}
      <div className="w-[300px] flex-shrink-0 hidden lg:flex flex-col gap-4 sticky top-4 self-start">
        <div className="bg-pumple-card border border-pumple-border rounded-[12px] p-4">
          <p className="text-sm font-bold text-pumple-text mb-3">Top tribes</p>
          {topTribes.map((tribe, i) => {
            const tierColor = TIERS[tribe.tier].color
            return (
              <div
                key={tribe.name}
                className="flex items-center justify-between py-2"
                style={{ borderBottom: i < topTribes.length - 1 ? '1px solid #1E2235' : 'none' }}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-xs font-bold text-pumple-muted w-4 flex-shrink-0">{i + 1}</span>
                  <div
                    className="w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${tierColor}20`, border: `1px solid ${tierColor}50`, color: tierColor }}
                  >
                    {TIER_ICONS[tribe.tier]}
                  </div>
                  <span className="text-xs font-semibold text-pumple-text truncate">{tribe.name}</span>
                </div>
                <span className="text-xs font-bold text-pumple-primary flex-shrink-0">{tribe.accuracy}</span>
              </div>
            )
          })}
        </div>
      </div>
    </motion.div>
  )
}
