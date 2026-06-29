'use client'

import { motion } from 'framer-motion'
import SignalCard from '@/components/ui/SignalCard'
import { SIGNALS } from '@/lib/mock-data'

export default function SignalsPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex justify-between items-center mb-3">
        <h1 className="text-sm font-bold text-pumple-text">Signal Feed</h1>
        <div className="flex items-center gap-1.5">
          <button className="text-[11px] font-bold px-2.5 py-1 rounded-md bg-pumple-primary text-black">
            All
          </button>
          <button className="text-[11px] text-pumple-muted px-2.5 py-1 rounded-md bg-pumple-elevated border border-pumple-border hover:text-pumple-text transition-colors">
            Legendary+
          </button>
          <button className="text-[11px] text-pumple-muted px-2.5 py-1 rounded-md bg-pumple-elevated border border-pumple-border hover:text-pumple-text transition-colors">
            Following
          </button>
        </div>
      </div>

      {SIGNALS.map(signal => (
        <SignalCard key={signal.id} signal={signal} />
      ))}
    </motion.div>
  )
}
