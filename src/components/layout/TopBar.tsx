import { Bell, Zap, TrendingUp, TrendingDown, Radio, Swords, Trophy } from 'lucide-react'

type TickerItem =
  | { kind: 'price'; symbol: string; price: string; change: string; up: boolean }
  | { kind: 'signal'; user: string; direction: 'LONG' | 'SHORT'; coin: string; confidence: number }
  | { kind: 'battle'; user: string; result: string; up: boolean }
  | { kind: 'rank'; user: string; text: string }

const TICKER_ITEMS: TickerItem[] = [
  { kind: 'price',  symbol: 'BTC', price: '$67,420', change: '+2.4%', up: true },
  { kind: 'signal', user: 'LegendTrader', direction: 'LONG', coin: 'BTC/USDT', confidence: 87 },
  { kind: 'battle', user: 'WhaleMaster', result: 'won a battle +12.4%', up: true },
  { kind: 'price',  symbol: 'ETH', price: '$3,240', change: '-0.8%', up: false },
  { kind: 'signal', user: 'CryptoSniper_X', direction: 'SHORT', coin: 'ETH/USDT', confidence: 73 },
  { kind: 'rank',   user: 'AltcoinHunter', text: 'entered top 10' },
  { kind: 'price',  symbol: 'SOL', price: '$178.50', change: '+5.1%', up: true },
  { kind: 'signal', user: 'DegenKing', direction: 'LONG', coin: 'SOL/USDT', confidence: 91 },
  { kind: 'battle', user: 'BlockchainBull', result: 'staked 500 $PUMP', up: true },
]

function TickerChip({ item }: { item: TickerItem }) {
  if (item.kind === 'price') {
    return (
      <span className="flex items-center gap-1.5 text-[11px] flex-shrink-0">
        <span className="font-bold text-pumple-muted">{item.symbol}</span>
        <span className="font-mono tnum font-bold text-pumple-text">{item.price}</span>
        <span className={`flex items-center gap-0.5 font-mono tnum text-[10px] font-bold ${item.up ? 'text-pumple-primary' : 'text-pumple-red'}`}>
          {item.up ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
          {item.change}
        </span>
      </span>
    )
  }
  if (item.kind === 'signal') {
    const long = item.direction === 'LONG'
    return (
      <span className="flex items-center gap-1.5 text-[11px] flex-shrink-0">
        <Radio size={10} className={long ? 'text-pumple-primary' : 'text-pumple-red'} />
        <span className="font-semibold text-pumple-text">{item.user}</span>
        <span className={`font-black text-[10px] px-1 py-px rounded ${long ? 'text-pumple-primary bg-pumple-primary/15' : 'text-pumple-red bg-pumple-red/15'}`}>
          {item.direction}
        </span>
        <span className="font-mono font-bold text-pumple-text">{item.coin}</span>
        <span className="text-pumple-muted tnum">{item.confidence}%</span>
      </span>
    )
  }
  if (item.kind === 'battle') {
    return (
      <span className="flex items-center gap-1.5 text-[11px] flex-shrink-0">
        <Swords size={10} className="text-pumple-gold" />
        <span className="font-semibold text-pumple-text">{item.user}</span>
        <span className={`font-bold tnum ${item.up ? 'text-pumple-primary' : 'text-pumple-red'}`}>{item.result}</span>
      </span>
    )
  }
  return (
    <span className="flex items-center gap-1.5 text-[11px] flex-shrink-0">
      <Trophy size={10} className="text-pumple-gold" />
      <span className="font-semibold text-pumple-text">{item.user}</span>
      <span className="font-bold text-pumple-gold">{item.text}</span>
    </span>
  )
}

export default function TopBar() {
  return (
    <div className="flex items-center px-3 gap-3 flex-shrink-0 h-12 bg-pumple-card/90 border-b border-pumple-border backdrop-blur">
      {/* LIVE label */}
      <span className="flex items-center gap-1.5 flex-shrink-0 pr-3 border-r border-pumple-border">
        <span className="live-dot" aria-hidden />
        <span className="text-[10px] font-black text-pumple-primary tracking-[0.18em]">LIVE</span>
      </span>

      {/* Activity marquee — duplicated list for a seamless loop */}
      <div className="marquee-mask flex-1 min-w-0" aria-label="Live market activity">
        <div className="marquee-track items-center gap-8 pr-8">
          {[0, 1].map(copy => (
            <span key={copy} className="flex items-center gap-8" aria-hidden={copy === 1}>
              {TICKER_ITEMS.map((item, i) => (
                <TickerChip key={`${copy}-${i}`} item={item} />
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <span className="flex items-center gap-1.5 text-[11px] font-bold rounded-full px-2.5 py-1 text-pumple-primary bg-pumple-primary/10 border border-pumple-primary/30">
          <TrendingUp size={11} />
          71% bullish
        </span>
        <span className="flex items-center gap-1 text-[11px] font-black tnum rounded-lg px-2.5 py-1 bg-pumple-accent/15 text-pumple-accent border border-pumple-accent/25">
          <Zap size={11} fill="currentColor" />
          2,840
        </span>
        <button
          className="relative w-8 h-8 flex items-center justify-center rounded-lg bg-pumple-elevated border border-pumple-border text-pumple-muted hover:text-pumple-text hover:border-pumple-dim transition-colors cursor-pointer"
          aria-label="Notifications"
        >
          <Bell size={14} />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-pumple-red" />
        </button>
      </div>
    </div>
  )
}
