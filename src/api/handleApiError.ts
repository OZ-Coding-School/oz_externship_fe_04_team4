import type { AxiosError } from 'axios'

type ErrorMessageMap = Record<number, string>

export function handleApiError(
  error: unknown,
  errorMessageMap: ErrorMessageMap,
  fallbackMessage = '처리 중 오류가 발생했습니다.'
) {
  const err = error as AxiosError<unknown>
  const status = err.response?.status

  if (!status) {
    return '네트워크 오류가 발생했습니다.'
  }

  return errorMessageMap[status] ?? fallbackMessage
}
