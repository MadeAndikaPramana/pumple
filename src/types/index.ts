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

export type BattleMode = 'classic_1v1' | 'tournament' | 'mock' | 'tribe_war'
export type BattleStatus = 'open' | 'active' | 'completed' | 'cancelled'
export type PositionDirection = 'LONG' | 'SHORT'
export type PositionStatus = 'active' | 'won' | 'lost' | 'expired'

export interface BattlePosition {
  id: number
  coin: string
  direction: PositionDirection
  entry: number
  tp: number
  sl: number
  timeframe: string
  pnlPercent: number
  status: PositionStatus
  openedAt: string
}

export interface BattlePlayer {
  username: string
  tier: TierKey
  accuracy: string
  virtualBalance: number
  currentPnL: number
  positions: BattlePosition[]
  isReady: boolean
}

export interface Battle {
  id: number
  mode: BattleMode
  status: BattleStatus
  coin?: string
  player1: BattlePlayer
  player2?: BattlePlayer
  duration: string
  timeLeft?: string
  stake?: string
  watchers: number
  startedAt?: string
  winner?: string
  isOpen?: boolean
}

export interface TournamentBracket {
  id: number
  name: string
  status: 'registering' | 'active' | 'completed'
  totalPlayers: number
  maxPlayers: 8 | 16
  currentRound: number
  totalRounds: number
  prizePool: string
  entryFee: string
  matches: TournamentMatch[]
}

export interface TournamentMatch {
  id: number
  round: number
  player1: string
  player2: string
  winner?: string
  status: 'pending' | 'active' | 'completed'
}

export interface TribeWar {
  id: number
  tribe1: { name: string; tier: TierKey; members: number; totalPnL: number; positions: number }
  tribe2: { name: string; tier: TierKey; members: number; totalPnL: number; positions: number }
  status: BattleStatus
  timeLeft: string
  prizePool: string
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
