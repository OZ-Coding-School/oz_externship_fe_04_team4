export interface ApiRawItem {
  period: string
  count: number
}

export interface ApiResponse {
  interval: string
  from_date: string
  to_date: string
  total: number
  items: ApiRawItem[]
}

export interface ApiItem {
  label: string
  value: number
}

export interface BarChartProps {
  apiUrl: string
  title?: string
  barColor?: string
  height?: number
}
