import type { ReactNode } from 'react'

interface DetailSectionProps {
  title: string
  children: ReactNode
  className?: string
}

/**
 * 상세 정보 섹션 (제목 + 내용)
 */
export function DetailSection({
  title,
  children,
  className = '',
}: DetailSectionProps) {
  return (
    <div className={className}>
      <h3 className="mb-3 text-base font-semibold text-gray-700">{title}</h3>
      <div className="space-y-4">{children}</div>
    </div>
  )
}
