'use client'
import { useEffect, useRef } from 'react'

declare global {
  interface Window {
    TradingView: any
  }
}

interface TradingViewChartProps {
  symbol: string
  interval: string
  height?: number
}

export default function TradingViewChart({ symbol, interval, height = 500 }: TradingViewChartProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const containerId = `tv_${symbol}_${interval}`.replace(/[^a-zA-Z0-9_]/g, '_')

  useEffect(() => {
    if (!containerRef.current) return

    const initWidget = () => {
      if (!window.TradingView || !containerRef.current) return
      containerRef.current.innerHTML = `<div id="${containerId}"></div>`
      new window.TradingView.widget({
        container_id: containerId,
        width: '100%',
        height: height,
        symbol: `BINANCE:${symbol}`,
        interval: interval,
        timezone: 'Etc/UTC',
        theme: 'dark',
        style: '1',
        locale: 'en',
        toolbar_bg: '#181B24',
        backgroundColor: '#181B24',
        gridColor: '#1E2235',
        enable_publishing: false,
        hide_top_toolbar: false,
        hide_legend: false,
        save_image: false,
        withdateranges: true,
      })
    }

    // Load tv.js once, reuse if already loaded
    if (window.TradingView) {
      initWidget()
      return
    }

    const script = document.createElement('script')
    script.src = 'https://s3.tradingview.com/tv.js'
    script.async = true
    script.onload = initWidget
    document.head.appendChild(script)

    return () => {
      if (containerRef.current) containerRef.current.innerHTML = ''
    }
  }, [symbol, interval, height, containerId])

  return (
    <div
      ref={containerRef}
      style={{ height, width: '100%' }}
      className="rounded-[10px] overflow-hidden border border-pumple-border"
    />
  )
}
