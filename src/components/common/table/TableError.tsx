import { AlertCircle } from 'lucide-react'

interface TableErrorProps {
  error: Error | string
  colSpan: number
  onRetry?: () => void
}

export function TableError({ error, colSpan, onRetry }: TableErrorProps) {
  const errorMessage =
    typeof error === 'string'
      ? error
      : error?.message || '알 수 없는 오류가 발생했습니다'

  return (
    <tr>
      <td colSpan={colSpan} className="px-4 py-12 text-center">
        <div className="flex flex-col items-center gap-3">
          <AlertCircle className="h-12 w-12 text-red-500" />
          <div className="space-y-1">
            <p className="font-semibold text-gray-900">
              데이터를 불러올 수 없습니다
            </p>
            <p className="text-sm text-gray-500">{errorMessage}</p>
          </div>
          {onRetry && (
            <button
              onClick={onRetry}
              className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
            >
              다시 시도
            </button>
          )}
        </div>
      </td>
    </tr>
  )
}
