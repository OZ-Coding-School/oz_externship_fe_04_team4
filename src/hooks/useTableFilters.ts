import { useState, type Dispatch, type SetStateAction } from 'react'

import type { SortConfig } from '@/components/common/table'

export interface TableFilters {
  search?: string
  page: number
  sort?: string
  [key: string]: string | number | undefined
}

export interface TableFilterOptions<T extends TableFilters> {
  initialFilters: T
}

export interface TableFiltersProps<T extends TableFilters> {
  filters: T
  sortConfig: SortConfig | null
  setFilters: Dispatch<SetStateAction<T>>
  updateFilter: (key: string, value: string | number | undefined) => void
  updateSearch: (value: string) => void
  updatePage: (page: number) => void
  handleSort: (
    sortValue: string,
    direction: 'asc' | 'desc',
    key: string
  ) => void
  resetFilters: () => void
}

/**
 * 테이블 필터링 및 정렬 상태를 관리하는 커스텀 훅
 *
 * @example
 * const { filters, sortConfig, updateSearch, updatePage, handleSort } = useTableFilters({
 *   initialFilters: { search: '', page: 1, status: '' }
 * })
 */
export function useTableFilters<T extends TableFilters>({
  initialFilters,
}: TableFilterOptions<T>): TableFiltersProps<T> {
  const [filters, setFilters] = useState<T>(initialFilters)
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null)

  // 특정 필터 값 업데이트
  const updateFilter = (key: string, value: string | number | undefined) => {
    setFilters((prev) => ({ ...prev, [key]: value, page: 1 }))
  }

  // 검색어 업데이트
  const updateSearch = (value: string) => {
    setFilters((prev) => ({ ...prev, search: value, page: 1 }) as T)
  }

  // 페이지 업데이트
  const updatePage = (page: number) => {
    setFilters((prev) => ({ ...prev, page }))
  }

  // 정렬 핸들러
  const handleSort = (
    sortValue: string,
    direction: 'asc' | 'desc',
    key: string
  ) => {
    if (sortValue === '') {
      setSortConfig(null)
      setFilters((prev) => ({ ...prev, sort: '', page: 1 }) as T)
    } else {
      setSortConfig({ key, value: sortValue, direction })
      setFilters((prev) => ({ ...prev, sort: sortValue, page: 1 }) as T)
    }
  }

  // 필터 초기화
  const resetFilters = () => {
    setFilters(initialFilters)
    setSortConfig(null)
  }

  return {
    filters,
    sortConfig,
    setFilters,
    updateFilter,
    updateSearch,
    updatePage,
    handleSort,
    resetFilters,
  }
}
