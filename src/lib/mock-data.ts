import type { Signal, LeaderboardEntry, Battle, Tribe } from '@/types'

export const SIGNALS: Signal[] = [
  {
    id: 1,
    coin: 'BTC/USDT',
    direction: 'LONG',
    confidence: 87,
    timeframe: '4H',
    rarity: 'legendary',
    tags: ['SMC', 'Order Block', 'BOS', 'Liquidity'],
    user: 'LegendTrader',
    tier: 'legend',
    accuracy: '89.3%',
    timeAgo: '12m ago',
    entry: '$67,240',
    tp: '$69,800',
    sl: '$66,400',
    likes: 284,
    calledIt: 147,
  },
  {
    id: 2,
    coin: 'ETH/USDT',
    direction: 'SHORT',
    confidence: 73,
    timeframe: '1H',
    rarity: 'epic',
    tags: ['Resistance', 'Bearish Div', 'FVG'],
    user: 'CryptoSniper_X',
    tier: 'sniper',
    accuracy: '78.4%',
    timeAgo: '34m ago',
    entry: '$3,248',
    tp: '$3,050',
    sl: '$3,340',
    likes: 96,
    calledIt: 58,
  },
  {
    id: 3,
    coin: 'SOL/USDT',
    direction: 'LONG',
    confidence: 91,
    timeframe: '1D',
    rarity: 'mythic',
    tags: ['Breakout', 'Volume', 'Accumulation', 'Whale Inflow'],
    user: 'WhaleMaster',
    tier: 'whale',
    accuracy: '82.1%',
    timeAgo: '1h ago',
    entry: '$176.40',
    tp: '$195.00',
    sl: '$168.50',
    likes: 412,
    calledIt: 239,
  },
]

export const LEADERBOARD: LeaderboardEntry[] = [
  { rank: 1, user: 'LegendTrader',   tier: 'legend',     accuracy: '89.3%', calls: 247, streak: 18, pump: '+89,420' },
  { rank: 2, user: 'WhaleMaster',    tier: 'whale',      accuracy: '82.1%', calls: 189, streak: 12, pump: '+64,230' },
  { rank: 3, user: 'CryptoSniper_X', tier: 'sniper',     accuracy: '78.4%', calls: 312, streak: 7,  pump: '+45,110' },
  { rank: 4, user: 'BlockchainBull', tier: 'trader',     accuracy: '74.8%', calls: 98,  streak: 4,  pump: '+28,750' },
  { rank: 5, user: 'DeFiDegen',      tier: 'apprentice', accuracy: '71.2%', calls: 156, streak: 3,  pump: '+19,380' },
  { rank: 6, user: 'AltcoinHunter',  tier: 'sniper',     accuracy: '68.9%', calls: 203, streak: 2,  pump: '+12,640' },
  { rank: 7, user: 'MoonShotMike',   tier: 'trader',     accuracy: '65.4%', calls: 87,  streak: 1,  pump: '+8,920'  },
]

export const BATTLES: Battle[] = [
  {
    id: 1,
    coin: 'BTC/USDT',
    user1: { name: 'LegendTrader',   tier: 'legend', prediction: 'LONG',  target: '$72,000' },
    user2: { name: 'WhaleMaster',    tier: 'whale',  prediction: 'SHORT', target: '$64,000' },
    timeLeft: '2h 34m',
    stake: '50 PUMP',
    watchers: 847,
  },
  {
    id: 2,
    coin: 'ETH/USDT',
    user1: { name: 'CryptoSniper_X', tier: 'sniper', prediction: 'LONG',  target: '$3,500' },
    user2: { name: 'BlockchainBull', tier: 'trader', prediction: 'SHORT', target: '$3,100' },
    timeLeft: '45m',
    stake: '100 PUMP',
    watchers: 1243,
  },
]

export const TRIBES: Tribe[] = [
  {
    name: 'SMC Snipers',
    members: 89,
    accuracy: '78.4%',
    tier: 'sniper',
    description: 'Smart money concepts traders focused on order blocks, BOS, and FVG setups.',
    isPrivate: false,
  },
  {
    name: 'Whale Watch',
    members: 24,
    accuracy: '82.1%',
    tier: 'whale',
    description: 'Tracking on-chain whale wallet movements and institutional flows.',
    isPrivate: true,
  },
  {
    name: 'Degen Arena',
    members: 312,
    accuracy: '61.3%',
    tier: 'apprentice',
    description: 'High risk, high reward plays. Not for the faint of heart. WAGMI.',
    isPrivate: false,
  },
  {
    name: 'Legend Circle',
    members: 12,
    accuracy: '88.7%',
    tier: 'legend',
    description: 'Invite-only elite circle. Consistent top performers only.',
    isPrivate: true,
  },
]

export const AI_MESSAGES = [
  {
    role: 'assistant' as const,
    content: `Analyzing BTC/USDT on the 4H timeframe...\n\nI've identified a strong SMC setup:\n\n• **Order Block**: $66,800–$67,200 zone acting as support\n• **BOS**: Break of structure confirmed at $67,850\n• **FVG**: Fair value gap between $67,400–$67,600\n\nMy confidence level is 87% LONG. The liquidity sweep at $66,640 has been completed and we're seeing institutional accumulation patterns.`,
  },
  {
    role: 'user' as const,
    content: "What's the key risk to watch?",
  },
  {
    role: 'assistant' as const,
    content: `Key risks to monitor:\n\n• **Stop Hunt Zone**: Bears may push to $66,400 to grab liquidity before the move\n• **Macro Risk**: FOMC meeting in 18 hours could cause volatility\n• **Invalidation**: Close below $66,200 on 4H would invalidate the bullish setup\n\nRecommended: Wait for a retest of the $67,200 OB before entry for a better risk-to-reward ratio.`,
  },
]
