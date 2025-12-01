import { useState } from 'react'

import { Table, type SortConfig } from '@/components/common/table'
import {
  RecruitmentColumns,
  RecruitmentListData,
} from '@/features/recruitment/columns'
import RecruitmentModal from '@/features/recruitment/ui/modal'
import RecruitmentFilter from '@/features/recruitment/ui/RecruitmentFilter'

export default function RecruitmentPage() {
  // const { keyword } = useRecruitmentSearchStore()
  // const { status } = ueeRecruitmentStatusStore()

  const [_, setQueryParams] = useState({
    page: 1,
    page_size: 10,
    keyword: '',
    selectedTags: '',
    sort: '',
  })

  // useEffect(() => {
  //   setQueryParams((prev) => {
  //     return { ...prev, keyword, selectedTags, status, page: 1 }
  //   })
  // }, [keyword, status, selectedTags])

  // =================== Table =========================
  const [currentPage, setCurrentPage] = useState(1)
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null)

  // 페이지네이션 테스트 용 데이터 슬라이스(실제론 API에서 results에 10개씩만 들어있음)
  const startIndex = (currentPage - 1) * 10
  const endIndex = startIndex + 10
  const currentPageData = RecruitmentListData.slice(startIndex, endIndex)
  const exampleResponse = {
    count: RecruitmentListData.length,
    next: currentPage < 10 ? `...?page=${currentPage + 1}` : null,
    previous: currentPage > 1 ? `...?page=${currentPage - 1}` : null,
    results: currentPageData,
  }
  const handleSort = (
    sortValue: string,
    direction: 'asc' | 'desc',
    key: string
  ) => {
    if (sortValue === '') {
      // 정렬 해제
      setSortConfig(null)
      setQueryParams((prev) => ({ ...prev, sort: '', page: 1 }))
    } else {
      setSortConfig({ key, value: sortValue, direction })
      setQueryParams((prev) => ({
        ...prev,
        sort: sortValue,
        page: 1,
      }))
    }
    setCurrentPage(1)
  }

  return (
    <>
      <RecruitmentModal />

      <div className="mb-6 space-y-4 rounded-lg bg-white p-6">
        <div className="flex items-center">
          <RecruitmentFilter />
        </div>
      </div>

      <Table
        columns={RecruitmentColumns()}
        sortConfig={sortConfig}
        onSort={handleSort}
        currentPage={currentPage}
        response={exampleResponse}
        onPageChange={setCurrentPage}
      />
    </>
  )
}
