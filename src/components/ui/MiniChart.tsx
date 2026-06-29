'use client'

import { useEffect, useRef } from 'react'
import {
  createChart,
  ColorType,
  CrosshairMode,
  CandlestickSeries,
  LineStyle,
} from 'lightweight-charts'

interface MiniChartProps {
  entry: number
  tp: number
  sl: number
  direction: 'LONG' | 'SHORT'
  timeframe: string
}

const TF_SECONDS: Record<string, number> = {
  '1H': 3600,
  '4H': 14400,
  '1D': 86400,
}

export default function MiniChart({ entry, tp, sl, timeframe }: MiniChartProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const interval = TF_SECONDS[timeframe] ?? 3600
    const now = Math.floor(Date.now() / 1000)
    const NUM = 30

    // Generate mock OHLCV candles
    let prevClose = entry * 0.985
    const candles = Array.from({ length: NUM }, (_, i) => {
      const time = (now - (NUM - i) * interval) as unknown as import('lightweight-charts').UTCTimestamp
      let close: number

      if (i >= NUM - 3) {
        // Last 3 candles trend toward entry
        const progress = (i - (NUM - 3)) / 3
        close = prevClose + (entry - prevClose) * (progress * 0.5 + 0.3)
      } else {
        close = prevClose * (1 + (Math.random() - 0.5) * 0.03)
      }

      const open = prevClose
      const high = Math.max(open, close) * (1 + Math.random() * 0.008)
      const low = Math.min(open, close) * (1 - Math.random() * 0.008)
      prevClose = close
      return { time, open, high, low, close }
    })

    const chart = createChart(container, {
      width: container.clientWidth,
      height: 130,
      layout: {
        background: { type: ColorType.Solid, color: '#181B24' },
        textColor: 'transparent',
      },
      grid: {
        vertLines: { color: '#1E2235' },
        horzLines: { color: '#1E2235' },
      },
      rightPriceScale: { visible: false },
      leftPriceScale: { visible: false },
      timeScale: { visible: false },
      crosshair: { mode: CrosshairMode.Hidden },
      handleScroll: false,
      handleScale: false,
    })

    const series = chart.addSeries(CandlestickSeries, {
      upColor: '#4ADE80',
      downColor: '#F43F5E',
      borderUpColor: '#4ADE80',
      borderDownColor: '#F43F5E',
      wickUpColor: '#4ADE80',
      wickDownColor: '#F43F5E',
    })

    series.setData(candles)

    series.createPriceLine({
      price: entry,
      color: '#F1F5F9',
      lineWidth: 1,
      lineStyle: LineStyle.Dashed,
      axisLabelVisible: false,
    })
    series.createPriceLine({
      price: tp,
      color: '#4ADE80',
      lineWidth: 1,
      lineStyle: LineStyle.Dashed,
      axisLabelVisible: false,
    })
    series.createPriceLine({
      price: sl,
      color: '#F43F5E',
      lineWidth: 1,
      lineStyle: LineStyle.Dashed,
      axisLabelVisible: false,
    })

    chart.timeScale().fitContent()

    const ro = new ResizeObserver(obs => {
      if (obs[0]) chart.applyOptions({ width: obs[0].contentRect.width })
    })
    ro.observe(container)

    return () => {
      ro.disconnect()
      chart.remove()
    }
  }, [entry, tp, sl, timeframe])

  return (
    <div className="relative mb-2" style={{ borderRadius: '8px', overflow: 'hidden', backgroundColor: '#181B24' }}>
      <div ref={containerRef} className="w-full" />
      {/* Price level labels */}
      <div className="absolute top-2 right-2 flex flex-col gap-1 pointer-events-none">
        <div className="flex items-center gap-1">
          <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#4ADE80' }} />
          <span className="text-[9px] font-bold" style={{ color: '#4ADE80' }}>TP</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-pumple-text" />
          <span className="text-[9px] font-bold text-pumple-text">Entry</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#F43F5E' }} />
          <span className="text-[9px] font-bold" style={{ color: '#F43F5E' }}>SL</span>
        </div>
      </div>
    </div>
  )
}
