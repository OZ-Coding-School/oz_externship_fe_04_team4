import type { ReactNode } from 'react'

interface DetailBoxProps {
  label: string
  children: ReactNode
  className?: string
}

/**
 * 회색 배경 박스가 있는 상세 정보 항목
 */
export function DetailBox({ label, children, className = '' }: DetailBoxProps) {
  return (
    <div className={className}>
      <p className="mb-1 text-sm text-gray-500">{label}</p>
      <div className="rounded-lg bg-gray-100 p-3">{children}</div>
    </div>
  )
}
