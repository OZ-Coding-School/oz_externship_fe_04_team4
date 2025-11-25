import { Pagination } from '@/components/common/table/Pagination'
import type { ReactNode } from 'react'

interface Column<T> {
  key: keyof T | string
  header: string
  width?: string
  render?: (value: any, row: T) => ReactNode
}
interface PaginationResponse<T> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}
interface TableProps<T> {
  columns: Column<T>[]
  response: PaginationResponse<T>
  currentPage: number
  onPageChange: (newPage: number) => void
  pageSize?: number
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
 * @param columns 테이블 컬럼 정의
 * @param response API 응답 객체(전부)
 * @param currentPage 현재 페이지
 * @param onPageChange 페이지 변경 핸들러
 * @param pageSize 10고정
 * @returns 페이징테이블
 */
export function Table<T>({
  columns,
  response,
  currentPage = 1,
  onPageChange,
  pageSize = 10,
}: TableProps<T>) {
  const totalPages = Math.ceil(response.count / pageSize)
  return (
    <div className="flex flex-col gap-4">
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="w-full border-collapse bg-white text-left text-sm">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column, index) => (
                <th
                  key={index}
                  className="border-b border-gray-200 px-4 py-3 font-semibold text-gray-700"
                  style={{ width: column.width }}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {response.results.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-8 text-center text-gray-500"
                >
                  데이터가 없습니다
                </td>
              </tr>
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
