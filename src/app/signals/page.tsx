'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import SignalCard from '@/components/ui/SignalCard'
import AddSignalModal from '@/components/ui/AddSignalModal'
import { SIGNALS } from '@/lib/mock-data'

const COLS_CLASS: Record<number, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-4',
}

export default function SignalsPage() {
  const [modalOpen, setModalOpen] = useState(false)
  const [cols, setCols] = useState(2)

  const colsClass = COLS_CLASS[cols]
  const chartHeight = cols >= 3 ? 180 : cols === 2 ? 240 : 320

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
          <select
            value={cols}
            onChange={e => setCols(Number(e.target.value))}
            className="bg-pumple-elevated border border-pumple-border rounded-md px-2 py-1 text-[11px] text-pumple-muted outline-none cursor-pointer"
          >
            <option value={1}>1 per row</option>
            <option value={2}>2 per row</option>
            <option value={3}>3 per row</option>
            <option value={4}>4 per row</option>
          </select>
          <button
            onClick={() => setModalOpen(true)}
            className="flex items-center gap-1.5 text-[11px] font-bold px-3 py-1.5 rounded-md bg-pumple-primary text-black hover:bg-pumple-primary/90 transition-colors"
          >
            <Plus size={12} />
            Post Signal
          </button>
        </div>
      </div>

      <div className={`grid ${colsClass} gap-3`}>
        {SIGNALS.map(signal => (
          <SignalCard key={signal.id} signal={signal} chartHeight={chartHeight} />
        ))}
      </div>

      <AddSignalModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </motion.div>
  )
}
