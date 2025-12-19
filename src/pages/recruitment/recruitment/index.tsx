import { useState } from 'react'

import { Table, type SortConfig } from '@/components/common/table'
import { QUERY_KEY } from '@/config/queyrKey'
import { SERVICE_URLS } from '@/config/serviceUrls'
import RecruitmentColumns from '@/features/recruitment/columns'
import RecruitmentDetailModal from '@/features/recruitment/ui/DetailModal'
import RecruitmentFilter from '@/features/recruitment/ui/RecruitmentFilter'
import RecruitmentTagFilterModal from '@/features/recruitment/ui/TagFilterModal'
import { useFetchQuery } from '@/hooks/useFetchQuery'
import {
  useRecruitmentDetailModalStore,
  useRecruitmentTagListStore,
} from '@/store/recruitment'
import type { IsClosedType, SortType } from '@/types'
import type { GetAdminRecruitmentsQuery } from '@/types/api/query'
import type {
  GetRecruitmentListResponse,
  RecruitmentListResults,
} from '@/types/api/response'

const PAGE_SIZE = 10

export default function RecruitmentPage() {
  const { openDetailModal } = useRecruitmentDetailModalStore()

  // 1) 테이블용 상태
  const [currentPage, setCurrentPage] = useState(1)
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null)
  const [isClosedFilter, setIsClosedFilter] = useState<IsClosedType>('all')
  const { selectedTagsResult } = useRecruitmentTagListStore()

  const mapStatusFilterToBoolean = (
    filter: IsClosedType
  ): boolean | undefined => {
    if (filter === 'true') return true
    if (filter === 'false') return false
  }

  const [queryParams, setQueryParams] = useState<GetAdminRecruitmentsQuery>({
    page: currentPage,
    page_size: PAGE_SIZE,
  })
  const apiQueryParams: GetAdminRecruitmentsQuery = {
    ...queryParams,
    tags: selectedTagsResult.map((tag) => tag.name).join(','),
    is_closed: mapStatusFilterToBoolean(isClosedFilter),
    sort: sortConfig?.value as SortType,
  }

  // 3) Table에 넘길 response 생성
  const { data, isLoading, error, refetch } =
    useFetchQuery<GetRecruitmentListResponse>({
      queryKey: [QUERY_KEY.RECRUMENTS.LIST, apiQueryParams],
      url: SERVICE_URLS.RECRUITMENTS.LIST,
      params: apiQueryParams,
    })

  // 4) 정렬 핸들러 (Table 헤더에서 호출)
  const handleSort = (
    sortValue: string,
    direction: 'asc' | 'desc',
    key: string
  ) => {
    if (sortValue === '') {
      // 정렬 해제
      setSortConfig(null)
    } else {
      // 어떤 컬럼을 어떤 방향으로 정렬 중인지 저장
      setSortConfig({ key, value: sortValue, direction })
    }
    // 정렬 바뀌면 항상 1페이지로
    setCurrentPage(1)
  }
  return (
    <>
      <RecruitmentTagFilterModal />
      <RecruitmentDetailModal />

      <RecruitmentFilter
        setQueryParams={setQueryParams}
        isClosedFilter={isClosedFilter}
        setIsClosedFilter={setIsClosedFilter}
      />

      <Table
        columns={RecruitmentColumns}
        sortConfig={sortConfig}
        onSort={handleSort}
        currentPage={currentPage}
        response={data ?? { count: 0, results: [], next: null, previous: null }}
        onPageChange={setCurrentPage}
        pageSize={PAGE_SIZE}
        isLoading={isLoading}
        error={error instanceof Error ? error : undefined}
        onRetry={refetch}
        onRowClick={(row: RecruitmentListResults) => openDetailModal(row.id)}
      />
    </>
  )
}
