import type { LucideIcon } from 'lucide-react'

interface StatCardProps {
  label: string
  value: string
  icon: LucideIcon
  color: string
}

export default function StatCard({ label, value, icon: Icon, color }: StatCardProps) {
  return (
    <div className="bg-pumple-card border border-pumple-border rounded-[8px] p-3">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-pumple-muted text-[11px] mb-1.5">{label}</p>
          <p className="text-[19px] font-black" style={{ color }}>{value}</p>
        </div>
        <Icon
          size={28}
          style={{ color, opacity: 0.35 }}
        />
      </div>
    </div>
  )
}
