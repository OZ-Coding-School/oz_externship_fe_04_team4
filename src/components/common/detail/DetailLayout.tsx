import type { ReactNode } from 'react'

interface DetailLayoutProps {
  children: ReactNode
}

interface ColumnProps {
  children: ReactNode
  className?: string
}

/**
 * 상세 정보 레이아웃 (좌우 2단 구조)
 */
export function DetailLayout({ children }: DetailLayoutProps) {
  return <div className="flex gap-8">{children}</div>
}

/**
 * 왼쪽 컬럼 (기본 너비: flex-1)
 */
export function LeftColumn({ children, className = '' }: ColumnProps) {
  return <div className={`flex-1 ${className}`}>{children}</div>
}

/**
 * 오른쪽 컬럼 (기본 너비: flex-1)
 */
export function RightColumn({ children, className = '' }: ColumnProps) {
  return <div className={`flex-1 ${className}`}>{children}</div>
}
