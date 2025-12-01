import clsx, { type ClassValue } from 'clsx'
import { useState } from 'react'

import { twMerge } from 'tailwind-merge'

import { FilterBar } from '@/components/common/filter'
import {
  Table,
  type Column,
  type PaginationResponse,
} from '@/components/common/table'
import { SERVICE_URLS } from '@/config/serviceUrls'
import { useFetchQuery } from '@/hooks/useFetchQuery'
import { formatDateTime } from '@/utils'

export interface Lecture {
  id: number
  uuid: string
  title: string
  instructor: string
  platform: string
  thumbnail_url?: string
  link?: string
  description?: string
  difficulty?: string
  duration?: string
  original_price?: number
  discounted_price?: number
  categories?: string[]
  created_at: string
  updated_at: string
}
const PLATFORM = {
  UDEMY: 'UDEMY',
  INFLEARN: 'INFLEARN',
} as const
export default function LectureManagementPage() {
  const [filters, setFilters] = useState<{ search: string; page: number }>({
    search: '',
    page: 1,
  })
  const { data, isLoading, error, refetch } = useFetchQuery<
    PaginationResponse<Lecture>
  >({
    queryKey: ['lectures', filters],
    url: SERVICE_URLS.LECTURES.LIST,
    params: {
      page: filters.page,
      page_size: 10,
      search: filters.search,
    },
  })
  const twClassName = (classes: ClassValue[]) => {
    return twMerge(clsx(classes))
  }
  const getPlatform = (platform: string) => {
    const baseClass = 'inline-block rounded px-2 py-1 text-xs'
    switch (platform) {
      case PLATFORM.UDEMY:
        return (
          <span
            className={twClassName([
              baseClass,
              'bg-purple-100 text-purple-700',
            ])}
          >
            {platform}
          </span>
        )
      case PLATFORM.INFLEARN:
        return (
          <span
            className={twClassName([baseClass, 'bg-green-100 text-green-700'])}
          >
            {platform}
          </span>
        )

      default:
        return (
          <span
            className={twClassName([baseClass, 'bg-gray-100 text-gray-700'])}
          >
            {platform}
          </span>
        )
    }
  }
  const columns: Column<Lecture>[] = [
    {
      key: 'id',
      header: 'ID',
      width: '60px',
    },
    {
      key: 'thumbnail_url',
      header: '썸네일',
      width: '100px',
      render: (value: string) => (
        <img
          src={value || 'Loading . . . '}
          alt="강의 썸네일"
          className="h-12 w-16 rounded object-cover"
        />
      ),
    },
    {
      key: 'title',
      header: '강의명',
      width: '350px',
    },
    {
      key: 'instructor',
      header: '강사명',
      width: '120px',
    },
    {
      key: 'platform',
      header: '플랫폼',
      width: '100px',
      render: (value) => getPlatform(value),
    },
    {
      key: 'created_at',
      header: '생성일시',
      width: '150px',
      render: (value: string) => formatDateTime(value),
    },
    {
      key: 'updated_at',
      header: '수정일시',
      width: '150px',
      render: (value: string) => formatDateTime(value),
    },
  ]

  return (
    <div className="space-y-6 rounded-lg bg-white p-6 shadow-sm">
      <FilterBar
        searchConfig={{
          label: '검색',
          placeholder: '강의명, 강사명 검색...',
          value: filters.search,
          onChange: (value) =>
            setFilters((prev) => ({ ...prev, search: value, page: 1 })),
        }}
      />

      <div className="border-t border-gray-200" />

      <Table
        columns={columns}
        response={data || { count: 0, results: [], next: null, previous: null }}
        currentPage={filters.page}
        onPageChange={(page) => setFilters((prev) => ({ ...prev, page }))}
        isLoading={isLoading}
        error={error?.message}
        onRetry={refetch}
      />
    </div>
  )
}
