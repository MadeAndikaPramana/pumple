'use client'

import { useEffect, useRef } from 'react'

interface TradingViewChartProps {
  symbol: string // e.g. "BTCUSDT"
  interval: string // e.g. "240" for 4H, "60" for 1H, "D" for 1D, "W" for 1W
  height?: number // default 500
}

export const INTERVAL_MAP: Record<string, string> = {
  '15m': '15',
  '1H': '60',
  '4H': '240',
  '1D': 'D',
  '1W': 'W',
}

export default function TradingViewChart({ symbol, interval, height = 500 }: TradingViewChartProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    container.innerHTML = ''

    const widgetDiv = document.createElement('div')
    widgetDiv.className = 'tradingview-widget-container__widget'
    widgetDiv.style.height = '100%'
    widgetDiv.style.width = '100%'
    container.appendChild(widgetDiv)

    const script = document.createElement('script')
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js'
    script.type = 'text/javascript'
    script.async = true
    script.innerHTML = JSON.stringify({
      autosize: true,
      symbol: `BINANCE:${symbol}`,
      interval: interval,
      timezone: 'Etc/UTC',
      theme: 'dark',
      style: '1',
      locale: 'en',
      backgroundColor: '#181B24',
      gridColor: '#1E2235',
      hide_top_toolbar: false,
      hide_legend: false,
      save_image: false,
      calendar: false,
      hide_volume: false,
      support_host: 'https://www.tradingview.com',
    })

    container.appendChild(script)

    return () => {
      container.innerHTML = ''
    }
  }, [symbol, interval, height])

  return (
    <div
      ref={containerRef}
      style={{ height, width: '100%' }}
      className="rounded-[10px] overflow-hidden"
    />
  )
}
