import { ChevronLeft, ChevronRight } from 'lucide-react'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (newPage: number) => void
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const getPageNumbers = () => {
    const pages: (number | string)[] = []
    const visiblePages = 5
    if (totalPages <= visiblePages + 5) {
      // 10페이지까지는 모두 표시
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      const startPage = Math.max(2, currentPage - 1)
      const endPage = Math.min(totalPages - 1, currentPage + 1)
      pages.push(1)
      if (startPage > 2) {
        pages.push('...')
      }
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i)
      }
      if (endPage < totalPages - 1) {
        pages.push('...')
      }
      pages.push(totalPages)
    }

    return pages
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
        onClick={handlePreviousChange}
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      {getPageNumbers().map((page, index) => {
        if (page === '...') {
          return (
            <span
              key={`ellipsis-${index}`}
              className="flex h-8 w-8 items-center justify-center text-gray-600"
            >
              ...
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
    </div>
  )
}
