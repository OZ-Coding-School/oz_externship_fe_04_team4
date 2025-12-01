import { useState } from 'react'

import { FilterBar } from '@/components/common/filter'
import { PlatformBadge } from '@/components/common/PlatformBadge'
import {
  Table,
  type Column,
  type PaginationResponse,
} from '@/components/common/table'
import { SERVICE_URLS } from '@/config/serviceUrls'
import { useFetchQuery } from '@/hooks/useFetchQuery'
import { LectureDetailModal } from '@/pages/study/courses/LectureDetailModal'
import { formatDateTime } from '@/utils'

export interface Lecture {
  id: number
  uuid: string
  title: string
  instructor: string
  platform: string
  thumbnail_img_url?: string
  url_link?: string
  description?: string
  difficulty?: string
  total_class_time?: number
  original_price?: number
  discounted_price?: number
  average_rating?: number
  categories?: { id: number; name: string }[]
  created_at: string
  updated_at: string
}
export default function LectureManagementPage() {
  const [filters, setFilters] = useState<{ search: string; page: number }>({
    search: '',
    page: 1,
  })
  const [selectedLecture, setSelectedLecture] = useState<number | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
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
      render: (value) => <PlatformBadge platform={value} />,
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
  const handleRowClick = (lecture: Lecture) => {
    setSelectedLecture(lecture.id)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedLecture(0)
  }
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
        onRowClick={handleRowClick}
      />
      <LectureDetailModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        lectureId={selectedLecture}
      />
    </div>
  )
}
