import { useState } from 'react'

import { StudyGroupStatusBadge } from '@/components/common/badge/StudyGroupStatusBadge'
import { FilterBar } from '@/components/common/filter'
import {
  Table,
  type Column,
  type PaginationResponse,
} from '@/components/common/table'
import { SERVICE_URLS } from '@/config/serviceUrls'
import { useFetchQuery } from '@/hooks/useFetchQuery'
import { LectureDetailModal } from '@/pages/study/courses/LectureDetailModal'
import { formatDateTime } from '@/utils'

export interface StudyGroup {
  id: number
  name: string
  start_at: string
  end_at: string
  max_headcount: number
  current_headcount: number
  profile_img_url: string
  status: string
  created_at: string
  updated_at: string
}
export default function StudyGroupManagementPage() {
  const [filters, setFilters] = useState<{
    search: string
    page: number
    status: string
  }>({
    search: '',
    page: 1,
    status: '',
  })
  const [selectedStudyGroupId, setSelectedStudyGroupId] = useState<
    number | null
  >(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { data, isLoading, error, refetch } = useFetchQuery<
    PaginationResponse<StudyGroup>
  >({
    queryKey: ['studyGroups', filters],
    url: SERVICE_URLS.STUDY_GROUPS.LIST,
    params: {
      page: filters.page,
      page_size: 10,
      search: filters.search,
      status: filters.status,
    },
  })

  const columns: Column<StudyGroup>[] = [
    {
      key: 'profile_img_url',
      header: '대표 이미지',
      width: '100px',
      render: (value: string) => (
        <img
          src={value || 'Loading . . . '}
          alt="스터디 그룹"
          className="h-12 w-16 rounded object-cover"
        />
      ),
    },
    {
      key: 'name',
      header: '그룹명',
      width: '300px',
    },
    {
      key: 'headcount',
      header: '인원 현황',
      width: '150px',
      render: (_, row) => `${row.current_headcount} / ${row.max_headcount}명`,
    },
    {
      key: 'duration',
      header: '스터디 기간',
      width: '150px',
      render: (_, row) => `${row.start_at} / ${row.end_at}명`,
    },
    {
      key: 'status',
      header: '상태',
      width: '100px',
      render: (value) => <StudyGroupStatusBadge status={value} />,
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
  const handleRowClick = (studyGroup: StudyGroup) => {
    setSelectedStudyGroupId(studyGroup.id)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedStudyGroupId(0)
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
        filters={[
          {
            label: '상태',
            options: [
              { label: '대기중', value: 'PENDING' },
              { label: '진행중', value: 'ONGOING' },
              { label: '종료됨', value: 'ENDED' },
            ],
            value: filters.status,
            onChange: (value) =>
              setFilters((prev) => ({ ...prev, status: value, page: 1 })),
          },
        ]}
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
        lectureId={selectedStudyGroupId}
      />
    </div>
  )
}
