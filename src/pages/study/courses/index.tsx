import { PlatformBadge } from '@/components/common/badge'
import { FilterBar } from '@/components/common/filter'
import {
  Table,
  type Column,
  type PaginationResponse,
} from '@/components/common/table'
import { SERVICE_URLS } from '@/config/serviceUrls'
import { useModal, useTableFilters } from '@/hooks'
import { useFetchQuery } from '@/hooks/useFetchQuery'
import { LectureDetailModal } from '@/pages/study/courses/LectureDetailModal'
import type { LecturesResults } from '@/types/api/response'
import { formatDateTime } from '@/utils'

export type Lecture = LecturesResults
const COLUMNS: Column<Lecture>[] = [
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
export default function LectureManagementPage() {
  const { filters, updateSearch, updatePage } = useTableFilters({
    initialFilters: {
      search: '',
      page: 1,
    },
  })

  const modal = useModal<number>('lecture-detail')

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

  const handleRowClick = (lecture: Lecture) => {
    modal.open(lecture.id)
  }
  return (
    <>
      <div className="mb-8 space-y-6 rounded-lg bg-white p-6 shadow-sm">
        <FilterBar
          searchConfig={{
            label: '검색',
            placeholder: '강의명, 강사명 검색...',
            value: filters.search,
            onChange: updateSearch,
          }}
        />
      </div>
      <Table
        columns={COLUMNS}
        response={data || { count: 0, results: [], next: null, previous: null }}
        currentPage={filters.page}
        onPageChange={updatePage}
        isLoading={isLoading}
        error={error?.message}
        onRetry={refetch}
        onRowClick={handleRowClick}
      />
      <LectureDetailModal
        isOpen={modal.isOpen}
        onClose={modal.close}
        lectureId={modal.value ?? null}
      />
    </>
  )
}
