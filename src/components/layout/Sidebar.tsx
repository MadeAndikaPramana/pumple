'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Zap,
  LayoutDashboard,
  Radio,
  Bot,
  Trophy,
  Swords,
  Shield,
  Target,
} from 'lucide-react'
import TierBadge from '@/components/ui/TierBadge'

const NAV_ITEMS = [
  { href: '/dashboard',   label: 'Hub',      icon: LayoutDashboard },
  { href: '/signals',     label: 'Signals',  icon: Radio },
  { href: '/ai',          label: 'AI Analyst', icon: Bot },
  { href: '/leaderboard', label: 'Rankings', icon: Trophy },
  { href: '/battles',     label: 'Arena',    icon: Swords },
  { href: '/tribes',      label: 'Tribes',   icon: Shield },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <div
      className="flex flex-col h-full"
      style={{
        width: '150px',
        minWidth: '150px',
        backgroundColor: '#111318',
        borderRight: '1px solid #1E2235',
      }}
    >
      {/* Header */}
      <div className="p-3" style={{ borderBottom: '1px solid #1E2235' }}>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-pumple-primary/20 border border-pumple-primary/40 flex items-center justify-center">
            <Zap size={12} className="text-pumple-primary" />
          </div>
          <div>
            <p className="text-sm font-black text-pumple-text leading-none">PUMPLE</p>
            <p className="text-[8px] text-pumple-primary tracking-widest leading-none mt-0.5">TRADING HUB</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-2 flex flex-col gap-0.5">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-2.5 px-2.5 py-2 rounded-md text-xs transition-colors ${
                isActive
                  ? 'bg-pumple-primary/10 text-pumple-primary font-bold'
                  : 'text-pumple-muted hover:bg-pumple-elevated hover:text-pumple-text'
              }`}
            >
              <Icon size={14} />
              {label}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-3" style={{ borderTop: '1px solid #1E2235' }}>
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: '#A78BFA20', border: '1px solid #A78BFA60' }}
          >
            <Target size={14} style={{ color: '#A78BFA' }} />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-bold text-pumple-text leading-none mb-1">You</p>
            <TierBadge tier="sniper" size="sm" />
          </div>
        </div>
      </div>
    </div>
  )
}
