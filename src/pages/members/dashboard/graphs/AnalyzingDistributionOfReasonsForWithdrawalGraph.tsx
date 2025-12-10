import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'

import type { Payload } from 'recharts/types/component/DefaultTooltipContent'

import { useFetchQuery } from '@/hooks/useFetchQuery'
import type {
  CustomLegendItem,
  CustomLegendProps,
  PieApiResponse,
  PieChartProps,
} from '@/pages/members/dashboard/graphs/types'

const COLORS = [
  '#6366F1',
  '#FACC15',
  '#EF4444',
  '#10B981',
  '#3B82F6',
  '#F97316',
  '#8B5CF6',
  '#14B8A6',
  '#A3E635',
]

export const CustomLegend = ({ items, colors }: CustomLegendProps) => {
  return (
    <ul className="mr-30 flex w-[256px] flex-col gap-2.5">
      {items?.map((item, index) => (
        <li key={index} className="flex items-center justify-between gap-3">
          <span className="flex items-center gap-3">
            <span
              className="flex h-4 w-4 rounded-[50%]"
              style={{ backgroundColor: colors[index % colors.length] }}
            />
            <span className="text-sm text-[#374151]">{item.label}</span>
          </span>
          <span className="text-sm text-[#374151]">{item.count}명</span>
        </li>
      ))}
    </ul>
  )
}

export default function AnalyzingDistributionOfReasonsForWithdrawalGraph({
  isAnimationActive = true,
  apiUrl,
  title,
  height = 320,
}: PieChartProps) {
  function isLegendItemPayload(payload: unknown): payload is CustomLegendItem {
    if (typeof payload !== 'object' || payload === null) return false

    const p = payload as Record<string, unknown>

    return (
      typeof p.label === 'string' &&
      typeof p.value === 'number' &&
      typeof p.count === 'number'
    )
  }

  const {
    data: rawData,
    isLoading,
    error,
  } = useFetchQuery<PieApiResponse>({
    queryKey: ['withdrawal-reasons', apiUrl],
    url: apiUrl,
  })

  const mappedData: CustomLegendItem[] = rawData?.items
    ? rawData.items.map((item) => ({
        label: item.reason_label,
        value: item.percentage,
        count: item.count,
      }))
    : []

  const pieData = mappedData.map((item) => ({
    name: item.label,
    value: item.value,
  }))

  if (isLoading) {
    return (
      <div
        className="flex w-full items-center justify-center"
        style={{ height }}
      >
        <p className="text-sm text-gray-500">로딩중...</p>
      </div>
    )
  }
  if (error) {
    return (
      <div
        className="flex w-full items-center justify-center"
        style={{ height }}
      >
        <p className="text-sm text-red-500">
          데이터를 불러오는 중 오류가 발생했습니다.
        </p>
      </div>
    )
  }
  if (!mappedData.length) {
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
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="label"
              cx="50%"
              cy="50%"
              innerRadius="50%"
              outerRadius="80%"
              fill="#82ca9d"
              label={({ value }) => `${value}%`}
              isAnimationActive={isAnimationActive}
              paddingAngle={4}
            >
              {pieData.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Legend
              align="right"
              layout="vertical"
              verticalAlign="middle"
              iconType="circle"
              content={() => (
                <CustomLegend items={mappedData} colors={COLORS} />
              )}
            />
            <Tooltip
              formatter={(
                value: number,
                _name: string,
                props: Payload<number, string>
              ) => {
                return [`${value}%`, props.payload?.label ?? '']
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
