'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { MessageSquare, Repeat2, Heart, Target } from 'lucide-react'
import { TIERS, type TierKey } from '@/types'
import TierBadge from '@/components/ui/TierBadge'
import { FEED_POSTS } from '@/lib/mock-data'

const POST_TYPE_STYLES: Record<string, { color: string; bg: string }> = {
  Analysis: { color: '#38BDF8', bg: '#38BDF815' },
  Signal:   { color: '#4ADE80', bg: '#4ADE8015' },
  News:     { color: '#FBBF24', bg: '#FBBF2415' },
  Degen:    { color: '#F43F5E', bg: '#F43F5E15' },
  Gm:       { color: '#A78BFA', bg: '#A78BFA15' },
}

const TABS = ['For You', 'Following', 'Trending', 'Signals Only']
const COIN_TAGS = ['$BTC', '$ETH', '$SOL']

export default function FeedPage() {
  const [activeTab, setActiveTab] = useState('For You')
  const [composeText, setComposeText] = useState('')
  const [selectedCoins, setSelectedCoins] = useState<string[]>([])

  const toggleCoin = (coin: string) =>
    setSelectedCoins(prev =>
      prev.includes(coin) ? prev.filter(c => c !== coin) : [...prev, coin]
    )

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="max-w-[680px]"
    >
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
                  <span className="text-sm font-semibold text-pumple-text">{post.user}</span>
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
    </motion.div>
  )
}
