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

export interface PieApiRawItem {
  reason: string
  reason_label: string
  count: number
  percentage: number
}

export interface PieApiResponse {
  from_date: string
  to_date: string
  total: number
  items: PieApiRawItem[]
}

export interface PieApiItem {
  label: string
  value: number
  count: number
}

export interface PieApiLegend {
  reason_label: string
  legend_num: number
}

export interface PieChartProps {
  apiUrl: string
  title?: string
  fill?: string
  height?: number
  isAnimationActive?: boolean
}

export interface CustomLegendItem {
  label: string
  value: number // percentage
  count: number
}

export interface CustomLegendProps {
  items: CustomLegendItem[]
  colors: string[]
}

export interface LegendItemPayload {
  payload: {
    label: string
    value: number
    count: number
  }
}
