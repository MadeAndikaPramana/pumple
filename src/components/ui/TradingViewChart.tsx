'use client'

interface TradingViewChartProps {
  symbol: string
  interval: string
  height?: number
}

export default function TradingViewChart({ symbol, interval, height = 500 }: TradingViewChartProps) {
  const src = `https://s3.tradingview.com/widgetembed/?frameElementId=tradingview_pumple&symbol=BINANCE%3A${symbol}&interval=${interval}&hidesidetoolbar=0&hidetoptoolbar=0&symboledit=1&saveimage=0&toolbarbg=181B24&studies=[]&theme=dark&style=1&timezone=Etc%2FUTC&studies_overrides={}&overrides={}&enabled_features=[]&disabled_features=[]&locale=en&utm_source=pumple-beta.vercel.app&utm_medium=widget&utm_campaign=chart`

  return (
    <div style={{ height, width: '100%' }} className="rounded-[10px] overflow-hidden border border-pumple-border">
      <iframe
        src={src}
        style={{ width: '100%', height: '100%', border: 'none' }}
        allowFullScreen
        title={`${symbol} TradingView Chart`}
      />
    </div>
  )
}
