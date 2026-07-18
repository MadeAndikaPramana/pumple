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
  Flame,
} from 'lucide-react'
import TierBadge from '@/components/ui/TierBadge'

const NAV_ITEMS = [
  { href: '/dashboard',   label: 'Hub',        icon: LayoutDashboard },
  { href: '/feed',        label: 'Feed',       icon: MessagesSquare },
  { href: '/signals',     label: 'Signals',    icon: Radio, live: true },
  { href: '/ai',          label: 'AI Analyst', icon: Bot },
  { href: '/leaderboard', label: 'Rankings',   icon: Trophy },
  { href: '/battles',     label: 'Arena',      icon: Swords },
  { href: '/tribes',      label: 'Tribes',     icon: Shield },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <div
      className="flex flex-col h-full bg-pumple-card border-r border-pumple-border"
      style={{ width: '190px', minWidth: '190px' }}
    >
      {/* Brand */}
      <Link href="/dashboard" className="block p-3 border-b border-pumple-border group">
        <div className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-[9px] bg-pumple-primary flex items-center justify-center flex-shrink-0 transition-transform duration-200 group-hover:scale-105"
          >
            <Zap size={16} className="text-black" fill="currentColor" />
          </div>
          <div>
            <p className="font-display text-[15px] font-bold text-pumple-text leading-none">
              PUMPLE
            </p>
            <p className="text-[8px] font-bold text-pumple-primary tracking-[0.22em] leading-none mt-1">
              TRADING HUB
            </p>
          </div>
        </div>
      </Link>

      {/* Nav */}
      <nav className="p-2 flex flex-col gap-1">
        {NAV_ITEMS.map(({ href, label, icon: Icon, live }) => {
          const isActive = pathname === href || (href !== '/dashboard' && pathname.startsWith(`${href}/`))
          return (
            <Link
              key={href}
              href={href}
              className={`relative flex items-center gap-2.5 px-3 py-2.5 rounded-[10px] text-[13px] transition-colors duration-150 ${
                isActive
                  ? 'bg-pumple-elevated text-pumple-text font-semibold'
                  : 'text-pumple-muted font-medium hover:bg-pumple-elevated/60 hover:text-pumple-text'
              }`}
            >
              {isActive && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-4 rounded-full bg-pumple-primary" />
              )}
              <Icon size={17} />
              {label}
              {live && <span className="live-dot ml-auto" aria-hidden />}
            </Link>
          )
        })}
      </nav>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Quick stats */}
      <div className="px-2 mb-2">
        <div className="text-[9px] font-bold text-pumple-muted/60 tracking-[0.18em] px-2 mb-1.5 uppercase">
          Quick stats
        </div>
        <div className="p-card p-2.5 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-[10px] text-pumple-muted">
              <Target size={10} className="text-pumple-purple" />
              Accuracy
            </span>
            <span className="text-xs font-black tnum text-pumple-primary">78.4%</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-[10px] text-pumple-muted">
              <Flame size={10} className="text-pumple-gold" />
              Streak
            </span>
            <span className="text-xs font-black tnum text-pumple-gold">5 days</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-[10px] text-pumple-muted">
              <Zap size={10} className="text-pumple-accent" />
              $PUMP
            </span>
            <span className="text-xs font-black tnum text-pumple-accent">2,840</span>
          </div>
        </div>
      </div>

      {/* Footer — you */}
      <div className="p-3 border-t border-pumple-border">
        <Link href="/profile/CryptoSniper_X" className="flex items-center gap-2 group">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-pumple-purple/15 border border-pumple-purple/50 transition-shadow group-hover:shadow-[0_0_12px_rgba(192, 132, 252,0.35)]"
          >
            <Target size={14} className="text-pumple-purple" />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-bold text-pumple-text leading-none mb-1 group-hover:text-pumple-primary transition-colors">You</p>
            <TierBadge tier="sniper" size="sm" />
          </div>
        </Link>
      </div>
    </div>
  )
}
