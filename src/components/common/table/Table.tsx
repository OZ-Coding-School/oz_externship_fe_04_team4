import { Pagination } from '@/components/common/table/Pagination'
import type { ReactNode } from 'react'

interface Column<T> {
  key: keyof T | string
  header: string
  width?: string
  render?: (value: any, row: T) => ReactNode
}
interface TableProps<T> {
  columns: Column<T>[]
  data: T[]
  currentPage: number
  totalPages: number
}

export function Table<T>({
  columns,
  data,
  currentPage = 1,
  totalPages = 1,
}: TableProps<T>) {
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
            {data.map((row, rowIndex) => (
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
      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </div>
  )
}
