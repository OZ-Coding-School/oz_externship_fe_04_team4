// utils/formatDataTimeForUserDetail.ts

export function formatDataTimeForUserDetail(dateString: string): string {
  if (!dateString) return ''

  const date = new Date(dateString)
  if (isNaN(date.getTime())) return ''

  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  // 12시간제 처리
  let hours = date.getHours()
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')

  const isPM = hours >= 12
  const period = isPM ? '오후' : '오전'

  // 12시간제로 변환
  hours = hours % 12
  if (hours === 0) hours = 12

  return `${year}. ${month}. ${day}. ${period} ${hours}:${minutes}:${seconds}`
}
