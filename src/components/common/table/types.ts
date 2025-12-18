import type { ReactNode } from 'react'

export interface Column<T> {
  key: string
  header: string
  width?: string
  align?: 'left' | 'center' | 'right'
  // value = T[keyof T]여야 하지만 column.key의 정확한 타입 추론이 어려움
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render?: (value: any, row: T) => ReactNode
  sortable?: { asc: string; desc: string }
}
export interface SortConfig {
  key: string
  value: string // 실제 쿼리스트링에 사용되는 값
  direction: 'asc' | 'desc'
}
export interface PaginationResponse<T> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}
