import { ChevronLeft, ChevronRight } from 'lucide-react'

interface PaginationProps {
  currentPage: number
  totalPages: number
}

export function Pagination({ currentPage, totalPages }: PaginationProps) {
  const getPageNumbers = () => {
    const pages: (number | string)[] = []
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      if (currentPage <= 3) {
        // 처음 부분
        pages.push(1, 2, 3, '...', totalPages)
      } else if (currentPage >= totalPages - 2) {
        // 마지막 부분
        pages.push(1, '...', totalPages - 2, totalPages - 1, totalPages)
      } else {
        // 중간부분
        pages.push(
          1,
          '...',
          currentPage - 1,
          currentPage,
          currentPage + 1,
          '...',
          totalPages
        )
      }
    }
    return pages
  }
  return (
    <div className="flex items-center justify-center gap-1">
      <button
        className="flex h-8 w-8 items-center justify-center rounded border border-gray-300 bg-white text-gray-600 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
        disabled={currentPage === 1}
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
          >
            {page}
          </button>
        )
      })}

      <button
        className="flex h-8 w-8 items-center justify-center rounded border border-gray-300 bg-white text-gray-600 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
        disabled={currentPage === totalPages}
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  )
}
