import type { LucideIcon } from 'lucide-react'

interface StatCardProps {
  label: string
  value: string
  icon: LucideIcon
  color: string
}

export default function StatCard({ label, value, icon: Icon, color }: StatCardProps) {
  return (
    <div className="p-card p-card-hover p-3 relative overflow-hidden">
      {/* Corner glow tint */}
      <div
        className="absolute -top-6 -right-6 w-16 h-16 rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle, ${color}22, transparent 70%)` }}
      />
      <div className="flex justify-between items-center gap-2">
        <div className="min-w-0">
          <p className="text-pumple-muted text-[10px] font-semibold uppercase tracking-wider mb-1 truncate">{label}</p>
          <p className="font-display text-lg font-bold tnum leading-none" style={{ color }}>{value}</p>
        </div>
        <div
          className="w-9 h-9 rounded-[10px] flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: `${color}18`, border: `1px solid ${color}30` }}
        >
          <Icon size={16} style={{ color }} />
        </div>
      </div>
    </div>
  )
}
