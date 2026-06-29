'use client'

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

export default function TribesPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <h1 className="text-sm font-bold text-pumple-text">Tribes</h1>
        <button className="flex items-center gap-1.5 bg-pumple-primary text-black text-[11px] font-bold rounded-[6px] px-3 py-1.5 hover:bg-pumple-primary/90 transition-colors">
          <Plus size={12} />
          Create Tribe
        </button>
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
    </motion.div>
  )
}
