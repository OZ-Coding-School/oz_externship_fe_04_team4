import axios from 'axios'
import { useEffect, useState } from 'react'
import {
  Bar,
  CartesianGrid,
  BarChart as ReBarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import type {
  ApiItem,
  ApiResponse,
  BarChartProps,
} from '@/pages/members/dashboard/graphs/types'
import { formatperiodToMonth } from '@/utils/formatperiodToMonth'

export default function AnalyzingWithdrawalsTrendsGraph({
  apiUrl,
  title,
  barColor = '#6366f1',
  height = 320,
}: BarChartProps) {
  const [data, setData] = useState<ApiItem[]>([])
  const [_rawData, setRawData] = useState<ApiResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    setErrorMessage(null)

    axios
      .get<ApiResponse>(apiUrl, {
        headers: {
          Authorization: 'Bearer token_value',
        },
      })
      .then((res) => {
        const mapped = Array.isArray(res?.data?.items)
          ? res.data.items.map((item) => ({
              label: formatperiodToMonth(item.period),
              value: item.count,
            }))
          : []

        setRawData(res.data)
        setData(mapped)

        console.log('탈퇴 데이터 raw:', res.data)
        console.log('탈퇴 데이터 mapped:', mapped)
      })
      .catch((error) => {
        console.error(error)
        setErrorMessage('데이터를 불러오는 중 오류가 발생했습니다.')
      })
      .finally(() => {
        setLoading(false)
      })
  }, [apiUrl])

  if (loading) {
    return (
      <div
        className="flex w-full items-center justify-center"
        style={{ height }}
      >
        <p className="text-sm text-gray-500">로딩중...</p>
      </div>
    )
  }

  if (errorMessage) {
    return (
      <div
        className="flex w-full items-center justify-center"
        style={{ height }}
      >
        <p className="text-sm text-red-500">{errorMessage}</p>
      </div>
    )
  }

  if (!data.length) {
    return (
      <div
        className="flex w-full items-center justify-center"
        style={{ height }}
      >
        <p className="text-sm text-gray-400">표시할 데이터가 없습니다.</p>
      </div>
    )
  }

  return (
    <div className="border-box mx-auto flex w-full flex-col">
      {title && (
        <h2 className="mb-7 text-lg font-semibold text-gray-800">{title}</h2>
      )}

      <div style={{ width: '100%', height }}>
        <ResponsiveContainer width="100%" height="100%">
          <ReBarChart
            data={data}
            margin={{ top: 10, right: 20, left: 0, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="label"
              interval={0}
              minTickGap={0}
              tick={{ fontSize: 12, fill: '#6B7280' }}
            />
            <YAxis
              tick={{ fontSize: 12, fill: '#6B7280' }}
              domain={[0, (dataMax: number) => Math.ceil(dataMax) + 30]}
            />
            <Tooltip />
            <Bar
              dataKey="value"
              name={title ?? '값'}
              fill={barColor}
              radius={[4, 4, 0, 0]}
            />
          </ReBarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
