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
import type { Candle } from '@/lib/use-live-klines'

interface MiniChartProps {
  entry: number
  tp: number
  sl: number
  direction: 'LONG' | 'SHORT'
  timeframe: string
  height?: number
  liveCandles?: Candle[]
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

type CandleDatum = { time: Time; open: number; high: number; low: number; close: number }

export default function MiniChart({ entry, tp, sl, direction, timeframe, height = 280, liveCandles }: MiniChartProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const chartRef = useRef<IChartApi | null>(null)
  const seriesRef = useRef<ISeriesApi<SeriesType, Time> | null>(null)
  const zoneParamsRef = useRef<ZoneParams | null>(null)
  const didFitRef = useRef(false)

  // Create the chart once per [entry, tp, sl, direction, timeframe, height].
  // liveCandles is intentionally NOT a dependency — live updates are handled by
  // the separate effect below so zoom/pan state survives every tick.
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    didFitRef.current = false

    const interval = TF_SECONDS[timeframe] ?? 3600
    const now      = Math.floor(Date.now() / 1000)
    const NUM      = 30

    let candles: CandleDatum[]

    if (liveCandles && liveCandles.length > 0) {
      candles = liveCandles.map(c => ({
        time: c.time as unknown as Time,
        open: c.open,
        high: c.high,
        low:  c.low,
        close: c.close,
      }))
    } else {
      let prevClose = entry * 0.985
      candles = Array.from({ length: NUM }, (_, i) => {
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
    }

    const chart = createChart(container, {
      width:  container.clientWidth,
      height,
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

    chartRef.current  = chart
    seriesRef.current = series

    series.setData(candles)

    series.createPriceLine({ price: entry, color: '#F1F5F9', lineWidth: 1, lineStyle: LineStyle.Dashed, axisLabelVisible: true, title: '' })
    series.createPriceLine({ price: tp,    color: '#4ADE80', lineWidth: 1, lineStyle: LineStyle.Dashed, axisLabelVisible: true, title: '' })
    series.createPriceLine({ price: sl,    color: '#F43F5E', lineWidth: 1, lineStyle: LineStyle.Dashed, axisLabelVisible: true, title: '' })

    const lastCandle = candles[candles.length - 1]
    const zoneParams: ZoneParams = {
      chart,
      series,
      entry,
      tp,
      sl,
      direction,
      lastCandleTime: lastCandle.time as unknown as number,
    }
    zoneParamsRef.current = zoneParams
    series.attachPrimitive(new ZonePrimitive(zoneParams))

    chart.timeScale().fitContent()

    const ro = new ResizeObserver(obs => {
      if (obs[0]) chart.applyOptions({ width: obs[0].contentRect.width })
    })
    ro.observe(container)

    return () => {
      ro.disconnect()
      chart.remove()
      chartRef.current  = null
      seriesRef.current = null
      zoneParamsRef.current = null
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entry, tp, sl, direction, timeframe, height])

  // Live data updates — push new candles into the existing series without
  // recreating the chart, so zoom/pan stays put. Keep the ZonePrimitive's
  // lastCandleTime in sync so the TP/SL zones anchor to the latest candle.
  useEffect(() => {
    if (!liveCandles || liveCandles.length === 0) return
    const series = seriesRef.current
    if (!series) return

    series.setData(liveCandles.map(c => ({
      time: c.time as unknown as Time,
      open: c.open,
      high: c.high,
      low:  c.low,
      close: c.close,
    })))

    if (zoneParamsRef.current) {
      zoneParamsRef.current.lastCandleTime = liveCandles[liveCandles.length - 1].time
    }

    // Refit once on the first real-data load so the (different) live range is
    // framed correctly; afterwards leave the user's zoom/pan untouched.
    if (!didFitRef.current && chartRef.current) {
      chartRef.current.timeScale().fitContent()
      didFitRef.current = true
    }
  }, [liveCandles])

  return (
    <div className="relative" style={{ borderRadius: '8px', overflow: 'hidden', backgroundColor: '#181B24' }}>
      <div ref={containerRef} style={{ height: `${height}px`, width: '100%' }} />
    </div>
  )
}
