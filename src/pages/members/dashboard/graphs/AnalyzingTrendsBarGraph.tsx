import {
  Bar,
  CartesianGrid,
  BarChart as ReBarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import { Empty } from '@/components/common/Empty'
import { ErrorMessage } from '@/components/common/ErrorMessage'
import { Loading } from '@/components/common/Loading'
import { useFetchQuery } from '@/hooks/useFetchQuery'
import type {
  ApiItem,
  ApiResponse,
  BarChartProps,
} from '@/pages/members/dashboard/graphs/types'
import { formatperiodToMonth } from '@/utils/formatperiodToMonth'

export default function AnalyzingTrendsBarGraph({
  apiUrl,
  title,
  barColor = '#6366f1',
  height = 320,
}: BarChartProps) {
  const {
    data: rawData,
    isLoading,
    error,
  } = useFetchQuery<ApiResponse>({
    queryKey: ['signup-trends', apiUrl],
    url: apiUrl,
  })

  const mappedData: ApiItem[] = rawData?.items
    ? rawData.items.map((item) => ({
        label: formatperiodToMonth(item.period),
        value: item.count,
      }))
    : []

  if (isLoading) return <Loading />
  if (error) return <ErrorMessage />
  if (!mappedData.length) return <Empty />

  return (
    <div className="border-box mx-auto flex w-full flex-col">
      {title && (
        <h2 className="mb-7 text-lg font-semibold text-gray-800">{title}</h2>
      )}

      <div style={{ width: '100%', height }}>
        <ResponsiveContainer width="100%" height="100%">
          <ReBarChart
            data={mappedData}
            margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
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
            <Tooltip cursor={{ fill: 'rgba(99, 102, 241, 0.1)' }} />
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
