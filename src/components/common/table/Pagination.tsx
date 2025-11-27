import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (newPage: number) => void
}
/**
 * Pagination 컴포넌트
 * @description 페이지네이션 컴포넌트 입니다
 * @howto Table 컴포넌트와 함께 사용. 직접사용할 경우 해당 파라미터 참조
 * @returns 페이지네이션
 */
const ELLIPSIS = '...'
const VISIBLE_PAGES = 10
export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const getPageNumbers = () => {
    if (totalPages <= VISIBLE_PAGES) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    const pageSize = Math.floor(VISIBLE_PAGES / 2)

    if (currentPage <= pageSize) {
      return [
        ...Array.from({ length: VISIBLE_PAGES }, (_, i) => i + 1),
        ELLIPSIS,
        totalPages,
      ]
    }

    if (currentPage >= totalPages - pageSize) {
      return [
        1,
        ELLIPSIS,
        ...Array.from(
          { length: VISIBLE_PAGES },
          (_, i) => totalPages - (VISIBLE_PAGES - 1) + i
        ),
      ]
    }

    return [
      1,
      ELLIPSIS,
      ...Array.from(
        { length: VISIBLE_PAGES },
        (_, i) => currentPage - pageSize + i
      ),
      ELLIPSIS,
      totalPages,
    ]
  }
  const handlePreviousChange = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1)
    }
  }
  const handleNextChange = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1)
    }
  }
  return (
    <div className="flex items-center justify-center gap-1">
      <button
        className="flex h-8 w-8 items-center justify-center rounded border border-gray-300 bg-white text-gray-600 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
        disabled={currentPage === 1}
        onClick={() => onPageChange(1)}
      >
        <ChevronsLeft className="h-4 w-4" />
      </button>
      <button
        className="flex h-8 w-8 items-center justify-center rounded border border-gray-300 bg-white text-gray-600 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
        disabled={currentPage === 1}
        onClick={handlePreviousChange}
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      {getPageNumbers().map((page, index) => {
        if (page === ELLIPSIS) {
          return (
            <span
              key={`ellipsis-${index}`}
              className="flex h-8 w-8 items-center justify-center text-gray-600"
            >
              {ELLIPSIS}
            </span>
          )
        }

        return (
          <button
            key={page}
            className={`flex h-8 w-8 items-center justify-center rounded border transition-colors ${
              currentPage === page
                ? 'border-blue-500 bg-blue-500 text-white'
                : 'border-gray-300 bg-white text-gray-600 hover:bg-gray-50'
            }`}
            onClick={() => onPageChange(page as number)}
          >
            {page}
          </button>
        )
      })}

      <button
        className="flex h-8 w-8 items-center justify-center rounded border border-gray-300 bg-white text-gray-600 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
        disabled={currentPage === totalPages}
        onClick={handleNextChange}
      >
        <ChevronRight className="h-4 w-4" />
      </button>
      <button
        className="flex h-8 w-8 items-center justify-center rounded border border-gray-300 bg-white text-gray-600 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(totalPages)}
      >
        <ChevronsRight className="h-4 w-4" />
      </button>
    </div>
  )
}
