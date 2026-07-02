'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Zap,
  LayoutDashboard,
  MessagesSquare,
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
  { href: '/feed',        label: 'Feed',     icon: MessagesSquare },
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
        width: '175px',
        minWidth: '175px',
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
      <nav className="p-2 flex flex-col gap-0.5">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-2.5 px-3 py-3 rounded-md text-[13px] transition-colors ${
                isActive
                  ? 'bg-pumple-primary/10 text-pumple-primary font-bold'
                  : 'text-pumple-muted font-medium hover:bg-pumple-elevated hover:text-pumple-text'
              }`}
            >
              <Icon size={18} />
              {label}
            </Link>
          )
        })}
      </nav>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Quick stats */}
      <div className="px-2 mb-2">
        <div className="text-[9px] font-bold text-pumple-muted/50 tracking-widest px-2 mb-1 uppercase">Quick Stats</div>
        <div className="bg-pumple-elevated rounded-[8px] p-2.5">
          <div className="text-[10px] text-pumple-muted mb-1">Your accuracy</div>
          <div className="text-sm font-black text-pumple-primary">78.4%</div>
          <div className="text-[10px] text-pumple-muted mt-1.5 mb-1">Win streak</div>
          <div className="text-sm font-black text-pumple-gold">5 days 🔥</div>
          <div className="text-[10px] text-pumple-muted mt-1.5 mb-1">$PUMP balance</div>
          <div className="text-sm font-black text-pumple-accent">⚡ 2,840</div>
        </div>
      </div>

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
