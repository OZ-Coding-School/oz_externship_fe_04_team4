import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react'
import type { ReactNode } from 'react'

import { Pagination } from '@/components/common/table/Pagination'
import { TableDataNone } from '@/components/common/table/TableDataNone'
import { TableError } from '@/components/common/table/TableError'
import type {
  Column,
  PaginationResponse,
  SortConfig,
} from '@/components/common/table/types'

interface TableProps<T> {
  columns: Column<T>[]
  response: PaginationResponse<T>
  currentPage: number
  onPageChange: (newPage: number) => void
  pageSize?: number
  isLoading?: boolean
  error?: Error | string
  onRetry?: () => void
  sortConfig?: SortConfig | null
  onSort?: (sortValue: string, direction: 'asc' | 'desc', key: string) => void
}
/**
 * Table 컴포넌트
 * @description 페이징 기능이 포함된 공통 테이블 컴포넌트 입니다.
 * @howto
 * 1. 사용하려는 화면의 컬럼 정의 > (API 참고해서 직접 작성)
 *   columns={ [ { key: 'id', header: '회원 ID', width: '100px' },...]}
 * 컬럼 정의 시 render 옵션으로 커스텀 컬럼 추가(example 참조)
 * 2. 조회 응답 그대로 넘기기(response={count, next, previous, results})
 * 3. 담당자는 currentPage 상태 관리 필요(useState...)
 * 4. onPageChange 핸들러 넘기기(setCurrentPage)
 * 5. 정렬 기능 사용 시 sortConfig, onSort 핸들러 넘기기(선택)
 * @param columns 테이블 컬럼 정의
 * @param response API 응답 객체(전부)
 * @param currentPage 현재 페이지
 * @param onPageChange 페이지 변경 핸들러
 * @param pageSize 10고정
 * @param isLoading 로딩 상태
 * @param error 에러 상태
 * @param onRetry 재시도 핸들러
 * @returns 페이징테이블
 */
export function Table<T>({
  columns,
  response,
  currentPage = 1,
  onPageChange,
  pageSize = 10,
  isLoading,
  error,
  sortConfig,
  onSort,
  onRetry,
}: TableProps<T>) {
  const totalPages = Math.ceil(response.count / pageSize)
  const getSortIcon = (columnKey: string) => {
    if (!sortConfig || sortConfig.key !== columnKey) {
      return <ArrowUpDown className="ml-1 inline h-4 w-4 text-gray-400" />
    }
    if (sortConfig.direction === 'asc') {
      return <ArrowUp className="ml-1 inline h-4 w-4 text-blue-600" />
    }
    return <ArrowDown className="ml-1 inline h-4 w-4 text-blue-600" />
  }
  return (
    <div className="flex flex-col gap-4">
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="w-full border-collapse bg-white text-left text-sm">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column, index) => (
                <th
                  key={index}
                  className={`border-b border-gray-200 px-4 py-3 font-semibold text-gray-700 ${
                    column.sortable
                      ? 'cursor-pointer select-none hover:bg-gray-100'
                      : ''
                  }`}
                  style={{ width: column.width }}
                  onClick={() => {
                    if (column.sortable) {
                      // 현재 정렬 상태 확인
                      const currentDirection =
                        sortConfig?.key === column.key
                          ? sortConfig.direction
                          : null

                      // 순환: null → asc → desc → null
                      let newDirection: 'asc' | 'desc' | null
                      if (!currentDirection) newDirection = 'asc'
                      else if (currentDirection === 'asc') newDirection = 'desc'
                      else newDirection = null

                      if (newDirection) {
                        const sortValue = column.sortable[newDirection]
                        onSort?.(sortValue, newDirection, column.key)
                      } else {
                        onSort?.('', 'asc', '') // 정렬 해제
                      }
                    }
                  }}
                >
                  <div className="flex items-center">
                    {column.header}
                    {column.sortable && getSortIcon(column.key)}
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {error ? (
              <TableError
                error={error}
                colSpan={columns.length}
                onRetry={onRetry}
              />
            ) : isLoading ? (
              Array.from({ length: 10 }).map((_, rowIndex) => (
                <tr key={`skeleton-${rowIndex}`}>
                  {columns.map((_, colIndex) => (
                    <td key={colIndex} className="px-4 py-3">
                      <div className="h-4 animate-pulse rounded bg-gray-200" />
                    </td>
                  ))}
                </tr>
              ))
            ) : response.results.length === 0 ? (
              <TableDataNone length={columns.length} />
            ) : (
              response.results.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className="cursor-pointer transition-colors hover:bg-gray-50"
                >
                  {columns.map((column, colIndex) => (
                    <td key={colIndex} className="px-4 py-3 text-gray-600">
                      {column.render
                        ? column.render(row[column.key as keyof T], row)
                        : (row[column.key as keyof T] as ReactNode)}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  )
}
