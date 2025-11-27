export function formatperiodToMonth(period: string): string {
  const parts = period.split('-')
  if (parts.length !== 2) return period
  const month = parts[1]
  const monthNumber = Number(month)
  if (isNaN(monthNumber) || monthNumber < 1 || monthNumber > 12) {
    return period
  }
  return `${monthNumber}월`
}
