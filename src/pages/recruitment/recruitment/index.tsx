import { useState } from 'react'

import { Table, type SortConfig } from '@/components/common/table'
import {
  RecruitmentColumns,
  RecruitmentListData,
} from '@/features/recruitment/columns'
import RecruitmentModal from '@/features/recruitment/ui/modal'
import RecruitmentFilter from '@/features/recruitment/ui/RecruitmentFilter'
import { useRecruitmentSearchStore } from '@/store/recruitment/useRecruitmentSearchStore'
import { ueeRecruitmentStatusStore } from '@/store/recruitment/useRecruitmentStatusStore'
import { useRecruitmentTagsStore } from '@/store/recruitment/useRecruitmentTagsStore'

type BuildTableResponseParams = {
  page: number
  pageSize: number

  keyword?: string
  status?: 'all' | 'false' | 'true'
  selectedTags?: string[]
  sortConfig?: SortConfig | null
}

// RecruitmentListData 한 줄(row) 타입
type RecruitmentRow = (typeof RecruitmentListData)[number]
type RecruitmentRowKey = keyof RecruitmentRow

function buildRecruitmentTableResponse({
  page,
  pageSize,
  keyword,
  status,
  selectedTags,
  sortConfig,
}: BuildTableResponseParams) {
  // 1) 원본 리스트 복사
  let filtered = [...RecruitmentListData]

  // 2) 검색어 필터 (공고 제목 기준)
  const trimmedKeyword = (keyword ?? '').trim().toLowerCase()

  if (trimmedKeyword) {
    filtered = filtered.filter((item) =>
      item.title.toLowerCase().includes(trimmedKeyword)
    )
  }

  // 3) 상태 필터: 'all' | 'false' | 'true'  →  '모집중' | '마감'
  const statusValue = status ?? 'all'

  if (statusValue !== 'all') {
    const targetLabel = statusValue === 'true' ? '마감' : '모집중'
    filtered = filtered.filter((item) => item.is_closed === targetLabel)
  }

  // 4) 태그 필터: selectedTags를 태그 name 배열로 가정
  const tagsValue = selectedTags ?? []

  if (tagsValue.length > 0) {
    const lowerSelected = tagsValue.map((tag) => tag.toLowerCase())

    filtered = filtered.filter((item) => {
      const tagNames = item.tags.map((tag) => tag.name.toLowerCase())
      // OR 조건: 선택한 태그 중 하나라도 포함되면 통과
      return lowerSelected.some((selected) => tagNames.includes(selected))
    })
  }

  // 5) 정렬 적용
  let sorted = [...filtered]

  if (sortConfig) {
    const { key, direction } = sortConfig

    sorted.sort((a: RecruitmentRow, b: RecruitmentRow) => {
      const sortKey = key as RecruitmentRowKey
      const aVal = a[sortKey]
      const bVal = b[sortKey]

      // 숫자 정렬 (조회수, 북마크 등)
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return direction === 'asc' ? aVal - bVal : bVal - aVal
      }

      // 문자열 정렬 (날짜 문자열 포함)
      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return direction === 'asc'
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal)
      }

      return 0
    })
  } else {
    sorted = filtered
  }

  // 6) 페이지네이션 (필터 + 정렬이 끝난 리스트 기준)
  const totalCount = sorted.length
  const totalPages = Math.ceil(totalCount / pageSize)

  const startIndex = (page - 1) * pageSize
  const endIndex = startIndex + pageSize
  const results = sorted.slice(startIndex, endIndex)

  return {
    count: totalCount,
    next: page < totalPages ? `...?page=${page + 1}` : null,
    previous: page > 1 ? `...?page=${page - 1}` : null,
    results,
  }
}

export default function RecruitmentPage() {
  const PAGE_SIZE = 10

  // 1) 테이블용 상태
  const [currentPage, setCurrentPage] = useState(1)
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null)

  // 2) 필터 상태 (zustand)
  const { keyword } = useRecruitmentSearchStore()
  const { status } = ueeRecruitmentStatusStore()
  const { selectedTags } = useRecruitmentTagsStore()

  // 3) Table에 넘길 response 생성
  const tableResponse = buildRecruitmentTableResponse({
    page: currentPage,
    pageSize: PAGE_SIZE,
    keyword,
    status,
    selectedTags,
    sortConfig,
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
        response={tableResponse}
        onPageChange={setCurrentPage}
        pageSize={PAGE_SIZE}
      />
    </>
  )
}
