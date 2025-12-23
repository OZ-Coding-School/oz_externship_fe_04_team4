import { StudyGroupStatusBadge } from '@/components/common/badge/StudyGroupStatusBadge'
import { FilterBar } from '@/components/common/filter'
import {
  Table,
  type Column,
  type PaginationResponse,
} from '@/components/common/table'
import { SERVICE_URLS } from '@/config'
import { useModal, useTableFilters } from '@/hooks'
import { useFetchQuery } from '@/hooks/useFetchQuery'
import { StudyGroupDetailModal } from '@/pages/study/groups/StudyGroupDetailModal'
import type { StudyGroupListResults } from '@/types/api/response'
import { formatDateTime } from '@/utils'

export type StudyGroup = StudyGroupListResults
const COLUMNS: Column<StudyGroup>[] = [
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
    sortable: {
      asc: 'name_asc',
      desc: 'name_desc',
    },
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
    sortable: {
      asc: 'oldest',
      desc: 'latest',
    },
  },
  {
    key: 'updated_at',
    header: '수정일시',
    width: '150px',
    render: (value: string) => formatDateTime(value),
  },
]
export default function StudyGroupManagementPage() {
  const {
    filters,
    sortConfig,
    updateSearch,
    updateFilter,
    updatePage,
    handleSort,
  } = useTableFilters({
    initialFilters: {
      search: '',
      page: 1,
      status: '',
      sort: '',
    },
  })

  const modal = useModal<number>('study-group-detail')

  const { data, isLoading, error, refetch } = useFetchQuery<
    PaginationResponse<StudyGroup>
  >({
    queryKey: ['study-groups', filters],
    url: SERVICE_URLS.STUDY_GROUPS.LIST,
    params: {
      page: filters.page,
      page_size: 10,
      search: filters.search,
      status: filters.status,
      sort: filters.sort,
    },
  })

  const handleRowClick = (studyGroup: StudyGroup) => {
    modal.open(studyGroup.id)
  }
  return (
    <>
      <div className="mb-6 space-y-4 rounded-lg bg-white p-6 shadow-xs">
        <FilterBar
          searchConfig={{
            label: '검색',
            placeholder: '그룹명 검색 ...',
            value: filters.search,
            onChange: updateSearch,
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
              onChange: (value) => updateFilter('status', value),
            },
          ]}
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
        sortConfig={sortConfig}
        onSort={handleSort}
      />
      <StudyGroupDetailModal
        isOpen={modal.isOpen}
        onClose={modal.close}
        studyGroupId={modal.value ?? null}
      />
    </>
  )
}
