'use client'

import { useEffect, useRef, useState } from 'react'
import {
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import type { TrafficPoint } from '@/lib/admin-data'

const HEIGHT = 288

/**
 * recharts 2.15의 <ResponsiveContainer>는 React 19에서 컨테이너 크기를
 * 측정하지 못해 빈 div만 렌더링합니다. 폭을 직접 측정해 픽셀 값으로
 * 넘겨 우회합니다. recharts 3.x로 올릴 때 제거 가능.
 */
export function TrafficChart({ data }: { data: TrafficPoint[] }) {
  const ref = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new ResizeObserver(([entry]) => {
      setWidth(entry.contentRect.width)
    })
    observer.observe(el)
    setWidth(el.getBoundingClientRect().width)

    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className="w-full" style={{ height: HEIGHT }}>
      {width > 0 && (
        <AreaChart
          width={width}
          height={HEIGHT}
          data={data}
          margin={{ top: 8, right: 8, left: -12, bottom: 0 }}
        >
          <defs>
            <linearGradient id="fillViews" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.35} />
              <stop offset="95%" stopColor="var(--primary)" stopOpacity={0.02} />
            </linearGradient>
            <linearGradient id="fillClicks" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor="var(--foreground)"
                stopOpacity={0.2}
              />
              <stop
                offset="95%"
                stopColor="var(--foreground)"
                stopOpacity={0.02}
              />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis
            dataKey="date"
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }}
          />
          <Tooltip
            contentStyle={{
              borderRadius: '0.75rem',
              border: '1px solid var(--border)',
              backgroundColor: 'var(--card)',
              fontSize: 12,
            }}
          />
          <Area
            type="monotone"
            dataKey="views"
            name="조회수"
            stroke="var(--primary)"
            strokeWidth={2}
            fill="url(#fillViews)"
          />
          <Area
            type="monotone"
            dataKey="clicks"
            name="클릭수"
            stroke="var(--foreground)"
            strokeWidth={2}
            fill="url(#fillClicks)"
          />
        </AreaChart>
      )}
    </div>
  )
}
