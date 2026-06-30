'use client'
import { useEffect, useRef, useState } from 'react'

export interface Candle {
  time: number // unix seconds
  open: number
  high: number
  low: number
  close: number
}

const INTERVAL_MAP: Record<string, string> = {
  '15m': '15m',
  '1H': '1h',
  '4H': '4h',
  '1D': '1d',
  '1W': '1w',
}

export function useLiveKlines(pair: string, timeframe: string, limit = 50) {
  const [candles, setCandles] = useState<Candle[]>([])
  const [isLive, setIsLive] = useState(false)
  const [error, setError] = useState(false)
  const wsRef = useRef<WebSocket | null>(null)

  useEffect(() => {
    let cancelled = false
    setIsLive(false)
    setError(false)

    const symbol = pair.replace('/', '').toUpperCase()
    const binanceSymbol = symbol.toLowerCase()
    const interval = INTERVAL_MAP[timeframe] || '4h'

    // 1. Fetch historical candles via REST
    fetch(`https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${interval}&limit=${limit}`)
      .then(res => {
        if (!res.ok) throw new Error('REST fetch failed')
        return res.json()
      })
      .then((data: any[]) => {
        if (cancelled) return
        const parsed: Candle[] = data.map(d => ({
          time: Math.floor(d[0] / 1000),
          open: parseFloat(d[1]),
          high: parseFloat(d[2]),
          low: parseFloat(d[3]),
          close: parseFloat(d[4]),
        }))
        setCandles(parsed)

        // 2. Open WebSocket for live updates
        try {
          const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${binanceSymbol}@kline_${interval}`)
          wsRef.current = ws

          ws.onopen = () => {
            if (!cancelled) setIsLive(true)
          }

          ws.onmessage = (event) => {
            if (cancelled) return
            try {
              const msg = JSON.parse(event.data)
              const k = msg.k
              if (!k) return
              const newCandle: Candle = {
                time: Math.floor(k.t / 1000),
                open: parseFloat(k.o),
                high: parseFloat(k.h),
                low: parseFloat(k.l),
                close: parseFloat(k.c),
              }
              setCandles(prev => {
                const last = prev[prev.length - 1]
                if (last && last.time === newCandle.time) {
                  return [...prev.slice(0, -1), newCandle]
                }
                return [...prev, newCandle].slice(-limit)
              })
            } catch {
              // ignore malformed messages
            }
          }

          ws.onerror = () => {
            if (!cancelled) {
              setIsLive(false)
              setError(true)
            }
          }

          ws.onclose = () => {
            if (!cancelled) setIsLive(false)
          }
        } catch {
          if (!cancelled) setError(true)
        }
      })
      .catch(() => {
        if (!cancelled) setError(true)
      })

    return () => {
      cancelled = true
      wsRef.current?.close()
      wsRef.current = null
    }
  }, [pair, timeframe, limit])

  return { candles, isLive, error }
}
