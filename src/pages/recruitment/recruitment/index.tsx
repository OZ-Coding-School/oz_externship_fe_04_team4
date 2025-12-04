import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

import { Table, type SortConfig } from '@/components/common/table'
import {
  getAdminRecruitments,
  type GetAdminRecruitmentsParams,
} from '@/features/recruitment/api/getAdminRecruitments'
import { RecruitmentColumns } from '@/features/recruitment/columns'
import RecruitmentDetailModal from '@/features/recruitment/ui/detailModal'
import RecruitmentFilter from '@/features/recruitment/ui/RecruitmentFilter'
import RecruitmentTagFilterModal from '@/features/recruitment/ui/tagFilterModal'
import type { RecruitmentListResults } from '@/mocks/types/accounts'
import { useDetailModalStore } from '@/store/recruitment/useRecruitmentModalStore'
import { useRecruitmentSearchStore } from '@/store/recruitment/useRecruitmentSearchStore'
import { ueeRecruitmentStatusStore } from '@/store/recruitment/useRecruitmentStatusStore'
import { useRecruitmentTagListStore } from '@/store/recruitment/useRecruitmentTagsStore'

const PAGE_SIZE = 10

export default function RecruitmentPage() {
  const { openDetailModal } = useDetailModalStore()

  // 1) 테이블용 상태
  const [currentPage, setCurrentPage] = useState(1)
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null)

  // 2) 필터 상태 (zustand)
  const { keyword } = useRecruitmentSearchStore()
  const { status } = ueeRecruitmentStatusStore()
  const { selectedTagsResult } = useRecruitmentTagListStore()

  const queryParams: GetAdminRecruitmentsParams = {
    page: currentPage,
    page_size: PAGE_SIZE,
    keyword,
    status,
    tags: selectedTagsResult,
    sort: sortConfig?.value,
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

      <RecruitmentFilter />

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
