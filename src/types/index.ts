export type TierKey = 'apprentice' | 'trader' | 'sniper' | 'whale' | 'legend'

export const TIERS: Record<TierKey, { label: string; color: string }> = {
  apprentice: { label: 'Apprentice', color: '#94A3B8' },
  trader:     { label: 'Trader',     color: '#38BDF8' },
  sniper:     { label: 'Sniper',     color: '#A78BFA' },
  whale:      { label: 'Whale',      color: '#FBBF24' },
  legend:     { label: 'Legend',     color: '#4ADE80' },
}

export type Rarity = 'common' | 'rare' | 'epic' | 'legendary' | 'mythic'

export const RARITY_COLORS: Record<Rarity, string> = {
  common:    '#94A3B8',
  rare:      '#38BDF8',
  epic:      '#A78BFA',
  legendary: '#FBBF24',
  mythic:    '#4ADE80',
}

export interface Signal {
  id: number
  coin: string
  direction: 'LONG' | 'SHORT'
  confidence: number
  timeframe: string
  rarity: Rarity
  tags: string[]
  user: string
  tier: TierKey
  accuracy: string
  timeAgo: string
  entry: string
  tp: string
  sl: string
  likes: number
  calledIt: number
  description: string
  images?: string[]
}

export interface LeaderboardEntry {
  rank: number
  user: string
  tier: TierKey
  accuracy: string
  calls: number
  streak: number
  pump: string
}

export interface Battle {
  id: number
  coin: string
  user1: { name: string; tier: TierKey; prediction: 'LONG' | 'SHORT'; target: string }
  user2: { name: string; tier: TierKey; prediction: 'LONG' | 'SHORT'; target: string }
  timeLeft: string
  stake: string
  watchers: number
}

export interface Tribe {
  name: string
  members: number
  accuracy: string
  tier: TierKey
  description: string
  isPrivate: boolean
}
