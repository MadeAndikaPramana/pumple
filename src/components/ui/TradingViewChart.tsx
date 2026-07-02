'use client'
import { useEffect, useRef } from 'react'

interface TradingViewChartProps {
  symbol: string
  interval: string
  height?: number
}

export default function TradingViewChart({ symbol, interval, height = 500 }: TradingViewChartProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return
    const containerId = `tv_${Math.random().toString(36).slice(2)}`
    containerRef.current.innerHTML = `<div id="${containerId}" style="height:${height}px"></div>`

    const script = document.createElement('script')
    script.src = 'https://s3.tradingview.com/tv.js'
    script.async = true
    script.onload = () => {
      if (typeof (window as any).TradingView === 'undefined') return
      new (window as any).TradingView.widget({
        container_id: containerId,
        autosize: true,
        symbol: `BINANCE:${symbol}`,
        interval,
        timezone: 'Etc/UTC',
        theme: 'dark',
        style: '1',
        locale: 'en',
        toolbar_bg: '#181B24',
        backgroundColor: '#0A0B0F',
        gridColor: '#1E2235',
        enable_publishing: false,
        hide_top_toolbar: false,
        allow_symbol_change: true,
        save_image: false,
        withdateranges: true,
      })
    }
    containerRef.current.appendChild(script)

    return () => {
      if (containerRef.current) containerRef.current.innerHTML = ''
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
