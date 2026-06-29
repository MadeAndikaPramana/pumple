import { Bell, Zap } from 'lucide-react'

const TICKERS = [
  { symbol: 'BTC', price: '$67,420', change: '+2.4%', up: true },
  { symbol: 'ETH', price: '$3,240',  change: '-0.8%', up: false },
  { symbol: 'SOL', price: '$178.50', change: '+5.1%', up: true },
]

export default function TopBar() {
  return (
    <div
      className="flex items-center px-4 gap-3 flex-shrink-0"
      style={{
        height: '44px',
        backgroundColor: '#111318',
        borderBottom: '1px solid #1E2235',
      }}
    >
      {/* Price Tickers */}
      <div className="flex items-center gap-3 flex-1">
        {TICKERS.map((ticker, i) => (
          <div key={ticker.symbol} className="flex items-center gap-3">
            {i > 0 && (
              <div className="w-px h-3" style={{ backgroundColor: '#1E2235' }} />
            )}
            <div className="flex items-center gap-1.5">
              <span className="text-pumple-muted text-[11px] font-semibold">{ticker.symbol}</span>
              <span className="font-mono text-xs font-bold text-pumple-text">{ticker.price}</span>
              <span
                className="font-mono text-[10px] font-bold"
                style={{ color: ticker.up ? '#4ADE80' : '#F43F5E' }}
              >
                {ticker.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Right side */}
      <div className="flex items-center gap-2">
        <span
          className="text-[11px] font-bold rounded-full px-2.5 py-0.5"
          style={{
            backgroundColor: '#4ADE8015',
            border: '1px solid #4ADE8040',
            color: '#4ADE80',
          }}
        >
          71% bullish
        </span>
        <span
          className="flex items-center gap-1 text-[11px] font-bold rounded-md px-2 py-0.5"
          style={{
            backgroundColor: '#A3E63520',
            color: '#A3E635',
          }}
        >
          <Zap size={10} />
          2,840
        </span>
        <button
          className="w-7 h-7 flex items-center justify-center rounded-md text-pumple-muted hover:text-pumple-text transition-colors"
          style={{ backgroundColor: '#181B24' }}
        >
          <Bell size={13} />
        </button>
      </div>
    </div>
  )
}
