import type { ReactNode } from 'react'

interface DetailItemProps {
  label: string
  children: ReactNode
  className?: string
}

/**
 * 상세 정보 항목 컴포넌트
 * 라벨과 값을 표시하는 기본 단위
 */
export function DetailItem({
  label,
  children,
  className = '',
}: DetailItemProps) {
  return (
    <div className={className}>
      <p className="mb-1 text-sm text-gray-500">{label}</p>
      <div className="text-base">{children}</div>
    </div>
  )
}
