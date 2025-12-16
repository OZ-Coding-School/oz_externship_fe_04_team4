import axios from 'axios'

type ErrorMessageMap = Record<number, string>

export function handleApiError(
  error: unknown,
  errorMessageMap: ErrorMessageMap,
  fallbackMessage = '처리 중 오류가 발생했습니다.'
): string {
  // Axios 에러가 아닌 경우
  if (!axios.isAxiosError(error)) {
    return '네트워크 오류가 발생했습니다.'
  }

  const status = error.response?.status

  if (!status) {
    return '네트워크 오류가 발생했습니다.'
  }

  return errorMessageMap[status] ?? fallbackMessage
}
