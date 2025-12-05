import dayjs from 'dayjs'
import 'dayjs/locale/ko'

dayjs.locale('ko')

/**
 * ISO 날짜/시간 문자열을 원하는 길이만큼 잘라주는 유틸
 * 예: '2025-11-20T00:00:05.875842+09:00' → size=16 → '2025-11-20 00:00'
 */
export function sliceDateTime(value?: string | null, size = 16): string {
  if (!value) return ''

  const normalized = value.replace('T', ' ')

  if (normalized.length <= size) return normalized

  return normalized.slice(0, size)
}

/**
 * 날짜/시간을 사용자 상세 형식으로 포맷
 * 예: '2025-11-20T14:30:45' → '2025. 11. 20. 오후 2:30:45'
 */
export function formatDateTimeForUserDetail(dateString: string): string {
  if (!dateString) return ''

  const date = dayjs(dateString)
  if (!date.isValid()) return ''

  const year = date.year()
  const month = date.month() + 1
  const day = date.date()

  // 12시간제 처리
  let hours = date.hour()
  const minutes = String(date.minute()).padStart(2, '0')
  const seconds = String(date.second()).padStart(2, '0')

  const isPM = hours >= 12
  const period = isPM ? '오후' : '오전'

  // 12시간제로 변환
  hours = hours % 12
  if (hours === 0) hours = 12

  return `${year}. ${month}. ${day}. ${period} ${hours}:${minutes}:${seconds}`
}

/**
 * 날짜/시간을 표준 형식으로 포맷
 * 예: '2025-11-20T14:30:45' → '2025-11-20 14:30:45'
 */
export function formatDateTime(dateString: string): string {
  const date = dayjs(dateString)
  if (!date.isValid()) return ''

  return date.format('YYYY-MM-DD HH:mm:ss')
}

/**
 * 기간 문자열을 월 형식으로 변환
 * 예: '2025-11' → '11월'
 */
export function formatPeriodToMonth(period: string): string {
  const parts = period.split('-')
  if (parts.length !== 2) return period

  const month = parts[1]
  const monthNumber = Number(month)

  if (isNaN(monthNumber) || monthNumber < 1 || monthNumber > 12) {
    return period
  }

  return `${monthNumber}월`
}
