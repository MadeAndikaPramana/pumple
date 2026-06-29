'use client'

import { motion } from 'framer-motion'
import { Radio, Target, Swords, Flame } from 'lucide-react'
import StatCard from '@/components/ui/StatCard'
import SignalCard from '@/components/ui/SignalCard'
import { SIGNALS } from '@/lib/mock-data'

const STATS = [
  { label: 'Signals today',   value: '247',      icon: Radio,   color: '#4ADE80' },
  { label: 'Your accuracy',   value: '78.4%',    icon: Target,  color: '#A78BFA' },
  { label: 'Active battles',  value: '34',       icon: Swords,  color: '#FBBF24' },
  { label: 'Win streak',      value: '5 days',   icon: Flame,   color: '#A3E635' },
]

export default function DashboardPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* Stats grid */}
      <div className="grid grid-cols-4 gap-2.5 mb-3.5">
        {STATS.map(stat => (
          <StatCard
            key={stat.label}
            label={stat.label}
            value={stat.value}
            icon={stat.icon}
            color={stat.color}
          />
        ))}
      </div>

      {/* Section header */}
      <div className="flex justify-between items-center mb-2.5">
        <h2 className="text-sm font-bold text-pumple-text">Live signal feed</h2>
        <div className="flex items-center gap-1.5">
          <button className="text-[11px] font-bold px-2.5 py-1 rounded-md bg-pumple-primary text-black">
            All
          </button>
          <button className="text-[11px] text-pumple-muted px-2.5 py-1 rounded-md bg-pumple-elevated border border-pumple-border hover:text-pumple-text transition-colors">
            Long
          </button>
          <button className="text-[11px] text-pumple-muted px-2.5 py-1 rounded-md bg-pumple-elevated border border-pumple-border hover:text-pumple-text transition-colors">
            Short
          </button>
        </div>
      </div>

      {/* Signal feed */}
      <div className="grid grid-cols-2 gap-3">
        {SIGNALS.map(signal => (
          <SignalCard key={signal.id} signal={signal} />
        ))}
      </div>
    </motion.div>
  )
}
