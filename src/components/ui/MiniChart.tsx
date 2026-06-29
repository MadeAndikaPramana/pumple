'use client'

import { useEffect, useRef } from 'react'
import {
  createChart,
  ColorType,
  CrosshairMode,
  CandlestickSeries,
  LineStyle,
  type IChartApi,
  type ISeriesPrimitive,
  type IPrimitivePaneRenderer,
  type IPrimitivePaneView,
  type ISeriesApi,
  type SeriesType,
  type Time,
} from 'lightweight-charts'
import type { CanvasRenderingTarget2D } from 'fancy-canvas'

interface MiniChartProps {
  entry: number
  tp: number
  sl: number
  direction: 'LONG' | 'SHORT'
  timeframe: string
  height?: number
}

const TF_SECONDS: Record<string, number> = {
  '1H': 3600,
  '4H': 14400,
  '1D': 86400,
}

// ─── Zone Primitive ────────────────────────────────────────────────────────

interface ZoneParams {
  chart: IChartApi
  series: ISeriesApi<SeriesType, Time>
  entry: number
  tp: number
  sl: number
  direction: 'LONG' | 'SHORT'
  lastCandleTime: number
}

class ZoneRenderer implements IPrimitivePaneRenderer {
  constructor(private readonly params: ZoneParams) {}

  draw(target: CanvasRenderingTarget2D): void {
    target.useBitmapCoordinateSpace(scope => {
      const { context: ctx, bitmapSize, horizontalPixelRatio, verticalPixelRatio } = scope
      const { chart, series, entry, tp, sl, direction, lastCandleTime } = this.params

      const entryY = series.priceToCoordinate(entry)
      const tpY    = series.priceToCoordinate(tp)
      const slY    = series.priceToCoordinate(sl)

      if (entryY === null || tpY === null || slY === null) return

      const lastX = chart.timeScale().timeToCoordinate(lastCandleTime as Time)
      if (lastX === null) return
      const startX = lastX * horizontalPixelRatio

      const w  = bitmapSize.width
      const vr = verticalPixelRatio
      const hr = horizontalPixelRatio

      // TP zone (green) — from last candle rightward
      const tpTop    = Math.min(entryY, tpY) * vr
      const tpBottom = Math.max(entryY, tpY) * vr
      ctx.fillStyle = 'rgba(74, 222, 128, 0.08)'
      ctx.fillRect(startX, tpTop, w - startX, tpBottom - tpTop)

      // SL zone (red) — from last candle rightward
      const slTop    = Math.min(entryY, slY) * vr
      const slBottom = Math.max(entryY, slY) * vr
      ctx.fillStyle = 'rgba(244, 63, 94, 0.08)'
      ctx.fillRect(startX, slTop, w - startX, slBottom - slTop)

      // Percentage labels
      const tpPct = direction === 'LONG'
        ? ((tp - entry) / entry * 100).toFixed(2)
        : ((entry - tp) / entry * 100).toFixed(2)

      const slPct = direction === 'LONG'
        ? ((entry - sl) / entry * 100).toFixed(2)
        : ((sl - entry) / entry * 100).toFixed(2)

      const fontSize = 11 * hr
      ctx.font      = `bold ${fontSize}px Inter, system-ui`
      ctx.textAlign = 'left'

      const tpMidY = (tpTop + tpBottom) / 2
      ctx.fillStyle = 'rgba(74, 222, 128, 0.9)'
      ctx.fillText(`+${tpPct}%`, startX + 8 * hr, tpMidY + fontSize * 0.35)

      const slMidY = (slTop + slBottom) / 2
      ctx.fillStyle = 'rgba(244, 63, 94, 0.9)'
      ctx.fillText(`-${slPct}%`, startX + 8 * hr, slMidY + fontSize * 0.35)
    })
  }
}

class ZonePrimitivePaneView implements IPrimitivePaneView {
  constructor(private readonly _r: ZoneRenderer) {}
  zOrder() { return 'bottom' as const }
  renderer() { return this._r }
}

class ZonePrimitive implements ISeriesPrimitive<Time> {
  private readonly _view: ZonePrimitivePaneView

  constructor(params: ZoneParams) {
    this._view = new ZonePrimitivePaneView(new ZoneRenderer(params))
  }

  paneViews(): readonly IPrimitivePaneView[] {
    return [this._view]
  }
}

// ─── Component ─────────────────────────────────────────────────────────────

export default function MiniChart({ entry, tp, sl, direction, timeframe, height = 320 }: MiniChartProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const chartHeight = container.clientHeight || 320
    const interval = TF_SECONDS[timeframe] ?? 3600
    const now      = Math.floor(Date.now() / 1000)
    const NUM      = 30

    let prevClose = entry * 0.985
    const candles = Array.from({ length: NUM }, (_, i) => {
      const time = (now - (NUM - i) * interval) as unknown as Time

      let close: number
      if (i >= NUM - 3) {
        const progress = (i - (NUM - 3)) / 3
        close = prevClose + (entry - prevClose) * (progress * 0.5 + 0.3)
      } else {
        close = prevClose * (1 + (Math.random() - 0.5) * 0.03)
      }

      const open = prevClose
      const high = Math.max(open, close) * (1 + Math.random() * 0.008)
      const low  = Math.min(open, close) * (1 - Math.random() * 0.008)
      prevClose  = close
      return { time, open, high, low, close }
    })

    const chart = createChart(container, {
      width:  container.clientWidth,
      height: chartHeight,
      layout: {
        background:  { type: ColorType.Solid, color: '#181B24' },
        textColor:   '#64748B',
        fontSize:    10,
      },
      grid: {
        vertLines: { color: '#1E2235' },
        horzLines: { color: '#1E2235' },
      },
      handleScroll: true,
      handleScale:  true,
      kineticScroll: { mouse: true, touch: true },
      crosshair: {
        mode: CrosshairMode.Normal,
        vertLine: { color: '#64748B40', width: 1, style: LineStyle.Dashed },
        horzLine: { color: '#64748B40', width: 1, style: LineStyle.Dashed },
      },
      timeScale: {
        visible:        true,
        borderColor:    '#1E2235',
        timeVisible:    false,
        secondsVisible: false,
      },
      rightPriceScale: {
        visible:      true,
        borderColor:  '#1E2235',
        scaleMargins: { top: 0.15, bottom: 0.15 },
        textColor:    '#64748B',
      },
    })

    const series = chart.addSeries(CandlestickSeries, {
      upColor:        '#4ADE80',
      downColor:      '#F43F5E',
      borderUpColor:  '#4ADE80',
      borderDownColor:'#F43F5E',
      wickUpColor:    '#4ADE80',
      wickDownColor:  '#F43F5E',
    })

    series.setData(candles)

    series.createPriceLine({ price: entry, color: '#F1F5F9', lineWidth: 1, lineStyle: LineStyle.Dashed, axisLabelVisible: true, title: '' })
    series.createPriceLine({ price: tp,    color: '#4ADE80', lineWidth: 1, lineStyle: LineStyle.Dashed, axisLabelVisible: true, title: '' })
    series.createPriceLine({ price: sl,    color: '#F43F5E', lineWidth: 1, lineStyle: LineStyle.Dashed, axisLabelVisible: true, title: '' })

    const lastCandle = candles[candles.length - 1]
    series.attachPrimitive(new ZonePrimitive({
      chart,
      series,
      entry,
      tp,
      sl,
      direction,
      lastCandleTime: lastCandle.time as unknown as number,
    }))

    chart.timeScale().fitContent()

    const ro = new ResizeObserver(obs => {
      if (obs[0]) chart.applyOptions({ width: obs[0].contentRect.width, height: obs[0].contentRect.height })
    })
    ro.observe(container)

    return () => {
      ro.disconnect()
      chart.remove()
    }
  }, [entry, tp, sl, direction, timeframe, height])

  return (
    <div className="relative mb-2" style={{ borderRadius: '8px', overflow: 'hidden', backgroundColor: '#181B24', height: '100%' }}>
      <div ref={containerRef} style={{ height: '100%', minHeight: '240px', width: '100%' }} />
    </div>
  )
}
