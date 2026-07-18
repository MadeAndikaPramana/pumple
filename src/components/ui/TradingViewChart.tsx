'use client'
import { useEffect, useRef } from 'react'

interface TradingViewChartProps {
  symbol: string
  interval: string
  height?: number
}

// tv.js must only be loaded once per page — re-appending it for every widget
// (or timeframe change) makes stale onload callbacks fire against containers
// React has already torn down, crashing inside TradingView with a null
// parentNode. Share one load promise across all instances instead.
let tvScriptPromise: Promise<void> | null = null

function loadTvScript(): Promise<void> {
  if ((window as any).TradingView) return Promise.resolve()
  if (!tvScriptPromise) {
    tvScriptPromise = new Promise(resolve => {
      const script = document.createElement('script')
      script.src = 'https://s3.tradingview.com/tv.js'
      script.async = true
      script.onload = () => resolve()
      document.head.appendChild(script)
    })
  }
  return tvScriptPromise
}

export default function TradingViewChart({ symbol, interval, height = 500 }: TradingViewChartProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let cancelled = false
    const containerId = `tv_${Math.random().toString(36).slice(2)}`
    container.innerHTML = `<div id="${containerId}" style="height:${height}px"></div>`

    loadTvScript().then(() => {
      if (cancelled) return
      if (typeof (window as any).TradingView === 'undefined') return
      if (!document.getElementById(containerId)) return
      new (window as any).TradingView.widget({
        container_id: containerId,
        autosize: true,
        symbol: `BINANCE:${symbol}`,
        interval,
        timezone: 'Etc/UTC',
        theme: 'dark',
        style: '1',
        locale: 'en',
        toolbar_bg: '#212225',
        backgroundColor: '#14151C',
        gridColor: '#272A2D',
        enable_publishing: false,
        hide_side_toolbar: true,
        hide_top_toolbar: true,
        allow_symbol_change: false,
        save_image: false,
        withdateranges: false,
      })
    })

    return () => {
      cancelled = true
      container.innerHTML = ''
    }
  }, [symbol, interval, height])

  return (
    <div
      ref={containerRef}
      style={{ height, width: '100%' }}
      className="rounded-[10px] overflow-hidden border border-pumple-border"
    />
  )
}
