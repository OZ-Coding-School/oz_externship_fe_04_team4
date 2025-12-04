export const formatPrice = (
  value: number | string | null | undefined
): string => {
  if (value === null || value === undefined) return ''

  const numeric =
    typeof value === 'string' ? Number(value.replace(/,/g, '')) : value

  if (Number.isNaN(numeric)) return ''

  return numeric.toLocaleString('ko-KR')
}
