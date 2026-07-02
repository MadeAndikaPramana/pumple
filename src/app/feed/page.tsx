'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { MessageSquare, Repeat2, Heart, Target, TrendingUp, TrendingDown } from 'lucide-react'
import { TIERS, type TierKey } from '@/types'
import TierBadge from '@/components/ui/TierBadge'
import { FEED_POSTS, LEADERBOARD, BATTLES } from '@/lib/mock-data'

const POST_TYPE_STYLES: Record<string, { color: string; bg: string }> = {
  Analysis: { color: '#38BDF8', bg: '#38BDF815' },
  Signal:   { color: '#4ADE80', bg: '#4ADE8015' },
  News:     { color: '#FBBF24', bg: '#FBBF2415' },
  Degen:    { color: '#F43F5E', bg: '#F43F5E15' },
  Gm:       { color: '#A78BFA', bg: '#A78BFA15' },
}

const TABS = ['For You', 'Following', 'Trending', 'Signals Only']
const COIN_TAGS = ['$BTC', '$ETH', '$SOL']
const COINS = ['All', '$BTC', '$ETH', '$SOL', '$AVAX', '$BNB']

const TRENDING_COINS = [
  { coin: '$BTC',  mentions: '2.4k posts', change: '+2.4%', up: true  },
  { coin: '$SOL',  mentions: '1.8k posts', change: '+5.1%', up: true  },
  { coin: '$ETH',  mentions: '1.2k posts', change: '-0.8%', up: false },
  { coin: '$AVAX', mentions: '890 posts',  change: '+3.2%', up: true  },
]

export default function FeedPage() {
  const [activeTab, setActiveTab] = useState('For You')
  const [composeText, setComposeText] = useState('')
  const [selectedCoins, setSelectedCoins] = useState<string[]>([])
  const [selectedCoin, setSelectedCoin] = useState('All')

  const toggleCoin = (coin: string) =>
    setSelectedCoins(prev =>
      prev.includes(coin) ? prev.filter(c => c !== coin) : [...prev, coin]
    )

  const whoToFollow = LEADERBOARD.slice(0, 3)
  const liveBattles = BATTLES.slice(0, 2)

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="flex gap-6"
    >
      {/* Left column — main feed */}
      <div className="flex-1 min-w-0">

        {/* Compose box */}
        <div className="bg-pumple-card border border-pumple-border rounded-[12px] p-4 mb-4">
          <div className="flex gap-3 mb-3">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: '#A78BFA20', border: '2px solid #A78BFA60' }}
            >
              <Target size={15} style={{ color: '#A78BFA' }} />
            </div>
            <textarea
              value={composeText}
              onChange={e => setComposeText(e.target.value)}
              placeholder="What's your analysis?"
              className="flex-1 bg-transparent border-none outline-none resize-none text-sm text-pumple-text placeholder:text-pumple-muted/50 min-h-[60px]"
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {COIN_TAGS.map(coin => (
                <button
                  key={coin}
                  onClick={() => toggleCoin(coin)}
                  className="text-[11px] font-semibold px-2 py-0.5 rounded-[4px] transition-colors"
                  style={
                    selectedCoins.includes(coin)
                      ? { backgroundColor: '#4ADE8020', color: '#4ADE80', border: '1px solid #4ADE8040' }
                      : { backgroundColor: '#181B24', color: '#64748B', border: '1px solid #1E2235' }
                  }
                >
                  {coin}
                </button>
              ))}
            </div>
            <button className="bg-pumple-primary text-black text-xs font-bold px-4 py-1.5 rounded-md hover:bg-pumple-primary/90 transition-colors">
              Post
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-pumple-border mb-4">
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2.5 text-sm transition-colors ${
                activeTab === tab
                  ? 'border-b-2 border-pumple-primary text-pumple-text font-bold -mb-px'
                  : 'text-pumple-muted hover:text-pumple-text'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Coin filter row */}
        <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
          {COINS.map(coin => (
            <button
              key={coin}
              onClick={() => setSelectedCoin(coin)}
              className={`text-[11px] font-semibold px-3 py-1.5 rounded-full whitespace-nowrap cursor-pointer flex-shrink-0 transition-colors ${
                selectedCoin === coin
                  ? 'bg-pumple-primary text-black'
                  : 'bg-pumple-elevated text-pumple-muted border border-pumple-border hover:text-pumple-text'
              }`}
            >
              {coin}
            </button>
          ))}
        </div>

        {/* Posts */}
        {FEED_POSTS.map(post => {
          const tierColor = TIERS[post.tier as TierKey].color
          const typeStyle = POST_TYPE_STYLES[post.type] ?? POST_TYPE_STYLES.Analysis
          const initials = post.user[0].toUpperCase()

          return (
            <div
              key={post.id}
              className="bg-pumple-card border border-pumple-border rounded-[12px] p-4 mb-3 hover:border-pumple-dim transition-colors"
            >
              {/* Header */}
              <div className="flex items-start gap-3">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold"
                  style={{
                    backgroundColor: `${tierColor}20`,
                    border: `2px solid ${tierColor}60`,
                    color: tierColor,
                  }}
                >
                  {initials}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <Link href={`/profile/${post.user}`} className="text-sm font-semibold text-pumple-text hover:underline">{post.user}</Link>
                    <TierBadge tier={post.tier as TierKey} size="sm" />
                    <span className="text-[11px] font-bold text-pumple-primary">{post.accuracy}</span>
                    <span className="text-pumple-muted text-[11px]">·</span>
                    <span className="text-pumple-muted text-[11px]">{post.timeAgo}</span>
                  </div>
                  <span
                    className="inline-block text-[10px] font-bold px-1.5 py-0 rounded mt-0.5"
                    style={{ backgroundColor: typeStyle.bg, color: typeStyle.color }}
                  >
                    {post.type}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="mt-2 ml-12 text-sm leading-relaxed text-pumple-text">
                {post.content}
                {post.coinTags.length > 0 && (
                  <span className="ml-1">
                    {post.coinTags.map(tag => (
                      <span
                        key={tag}
                        className="text-xs font-semibold mr-1"
                        style={{ color: '#4ADE8080' }}
                      >
                        {tag}
                      </span>
                    ))}
                  </span>
                )}
              </div>

              {/* Actions */}
              <div className="mt-3 ml-12 flex items-center gap-6">
                <button className="flex items-center gap-1.5 text-pumple-muted text-xs hover:text-pumple-blue transition-colors">
                  <MessageSquare size={13} />
                  {post.replies}
                </button>
                <button className="flex items-center gap-1.5 text-pumple-muted text-xs hover:text-pumple-primary transition-colors">
                  <Repeat2 size={13} />
                  {post.reposts}
                </button>
                <button className="flex items-center gap-1.5 text-pumple-muted text-xs hover:text-pumple-red transition-colors">
                  <Heart size={13} />
                  {post.likes}
                </button>
                <button className="flex items-center gap-1.5 text-pumple-muted text-xs font-semibold hover:text-pumple-accent transition-colors">
                  <Target size={13} />
                  {post.calledIt}
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {/* Right sidebar */}
      <div className="w-[320px] flex-shrink-0 hidden lg:flex flex-col gap-4 sticky top-4 self-start">

        {/* Trending coins */}
        <div className="bg-pumple-card border border-pumple-border rounded-[12px] p-4">
          <p className="text-sm font-bold text-pumple-text mb-3">Trending</p>
          {TRENDING_COINS.map((item, i) => (
            <div
              key={item.coin}
              className="flex justify-between items-center py-2"
              style={{ borderBottom: i < TRENDING_COINS.length - 1 ? '1px solid #1E2235' : 'none' }}
            >
              <div>
                <p className="text-sm font-bold text-pumple-primary">{item.coin}</p>
                <p className="text-[11px] text-pumple-muted">{item.mentions}</p>
              </div>
              <div className="flex items-center gap-1">
                {item.up
                  ? <TrendingUp size={12} style={{ color: '#4ADE80' }} />
                  : <TrendingDown size={12} style={{ color: '#F43F5E' }} />
                }
                <span
                  className="text-xs font-bold"
                  style={{ color: item.up ? '#4ADE80' : '#F43F5E' }}
                >
                  {item.change}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Who to follow */}
        <div className="bg-pumple-card border border-pumple-border rounded-[12px] p-4">
          <p className="text-sm font-bold text-pumple-text mb-3">Who to follow</p>
          {whoToFollow.map((entry, i) => {
            const tierColor = TIERS[entry.tier].color
            return (
              <div
                key={entry.user}
                className="flex items-center justify-between py-2"
                style={{ borderBottom: i < whoToFollow.length - 1 ? '1px solid #1E2235' : 'none' }}
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                    style={{ backgroundColor: `${tierColor}20`, border: `2px solid ${tierColor}60`, color: tierColor }}
                  >
                    {entry.user[0].toUpperCase()}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-pumple-text">{entry.user}</p>
                    <TierBadge tier={entry.tier} size="sm" />
                  </div>
                </div>
                <button className="text-[10px] font-bold border border-pumple-border rounded-full px-3 py-1 text-pumple-muted hover:border-pumple-primary hover:text-pumple-primary transition-colors">
                  Follow
                </button>
              </div>
            )
          })}
        </div>

        {/* Live battles */}
        <div className="bg-pumple-card border border-pumple-border rounded-[12px] p-4">
          <div className="flex justify-between items-center mb-3">
            <p className="text-sm font-bold text-pumple-text">Live battles</p>
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          </div>
          {liveBattles.map((battle, i) => (
            <div
              key={battle.id}
              className="py-2"
              style={{ borderBottom: i < liveBattles.length - 1 ? '1px solid #1E2235' : 'none' }}
            >
              <div className="flex items-center justify-between mb-0.5">
                <span className="text-[11px] font-bold text-pumple-text truncate max-w-[150px]">
                  {battle.player1.username} vs {battle.player2?.username ?? 'Open'}
                </span>
                <span className="text-[10px] text-pumple-muted flex-shrink-0">{battle.timeLeft ?? battle.duration} left</span>
              </div>
              <div className="flex items-center gap-2 text-[11px]">
                <span style={{ color: battle.player1.currentPnL >= 0 ? '#4ADE80' : '#F43F5E', fontSize: '10px', fontWeight: 700 }}>
                  {battle.player1.currentPnL >= 0 ? '+' : ''}{battle.player1.currentPnL}%
                </span>
                <span className="text-pumple-dim font-bold text-[9px]">VS</span>
                <span style={{ color: (battle.player2?.currentPnL ?? 0) >= 0 ? '#4ADE80' : '#F43F5E', fontSize: '10px', fontWeight: 700 }}>
                  {battle.player2 ? `${battle.player2.currentPnL >= 0 ? '+' : ''}${battle.player2.currentPnL}%` : '—'}
                </span>
              </div>
            </div>
          ))}
          <a href="/battles" className="block text-[11px] text-pumple-primary mt-2 hover:underline cursor-pointer">
            View all battles
          </a>
        </div>

      </div>
    </motion.div>
  )
}
