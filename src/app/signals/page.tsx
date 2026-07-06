'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Radio } from 'lucide-react'
import SignalCard from '@/components/ui/SignalCard'
import AddSignalModal from '@/components/ui/AddSignalModal'
import { SIGNALS } from '@/lib/mock-data'

const COLS_CLASS: Record<number, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-4',
}

const FILTERS = ['All', 'Legendary+', 'Following']

export default function SignalsPage() {
  const [modalOpen, setModalOpen] = useState(false)
  const [cols, setCols] = useState(2)
  const [filter, setFilter] = useState('All')

  const colsClass = COLS_CLASS[cols]
  const chartHeight = cols >= 3 ? 180 : cols === 2 ? 240 : 320

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex justify-between items-center mb-3">
        <h1 className="flex items-center gap-2 font-display text-base font-bold text-pumple-text">
          <Radio size={16} className="text-pumple-primary" />
          Signal Feed
          <span className="live-dot ml-1" aria-hidden />
        </h1>
        <div className="flex items-center gap-1.5">
          {FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`pill text-[11px] px-2.5 py-1 ${filter === f ? 'pill--active' : ''}`}
            >
              {f}
            </button>
          ))}
          <select
            value={cols}
            onChange={e => setCols(Number(e.target.value))}
            className="bg-pumple-elevated border border-pumple-border rounded-md px-2 py-1 text-[11px] text-pumple-muted outline-none cursor-pointer hover:text-pumple-text transition-colors"
          >
            <option value={1}>1 per row</option>
            <option value={2}>2 per row</option>
            <option value={3}>3 per row</option>
            <option value={4}>4 per row</option>
          </select>
          <button
            onClick={() => setModalOpen(true)}
            className="btn-degen text-[11px] px-3.5 py-1.5"
          >
            <Plus size={12} strokeWidth={3} />
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
