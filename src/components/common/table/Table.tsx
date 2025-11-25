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
            {response.results.map((row, rowIndex) => (
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
            ))}
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
