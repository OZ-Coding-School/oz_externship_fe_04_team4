import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

import { Table, type SortConfig } from '@/components/common/table'
import { getAdminRecruitments } from '@/features/recruitment/api'
import RecruitmentColumns from '@/features/recruitment/columns'
import RecruitmentDetailModal from '@/features/recruitment/ui/detailModal'
import RecruitmentFilter from '@/features/recruitment/ui/RecruitmentFilter'
import RecruitmentTagFilterModal from '@/features/recruitment/ui/tagFilterModal'
import {
  useRecruitmentDetailModalStore,
  useRecruitmentTagListStore,
} from '@/store/recruitment'
import type { GetAdminRecruitmentsParams, sortType, statusType } from '@/types'
import type { RecruitmentListResults } from '@/types/api'

const PAGE_SIZE = 10

export default function RecruitmentPage() {
  const { openDetailModal } = useRecruitmentDetailModalStore()

  // 1) 테이블용 상태
  const [currentPage, setCurrentPage] = useState(1)
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null)

  const [keyword, setKeyword] = useState('')
  const [status, setStatus] = useState<statusType>('all')
  const { selectedTagsResult } = useRecruitmentTagListStore()

  const queryParams: GetAdminRecruitmentsParams = {
    page: currentPage,
    page_size: 10,
    search: keyword,
    status,
    tags: selectedTagsResult,
    sort: sortConfig?.value as sortType,
  }

  // 3) Table에 넘길 response 생성
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['adminRecruitments', queryParams],
    queryFn: () => getAdminRecruitments(queryParams),
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
        setKeyword={setKeyword}
        status={status}
        setStatus={setStatus}
      />

      <Table
        columns={RecruitmentColumns}
        sortConfig={sortConfig}
        onSort={handleSort}
        currentPage={currentPage}
        response={
          data ?? {
            count: 0,
            next: null,
            previous: null,
            results: [],
          }
        }
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
