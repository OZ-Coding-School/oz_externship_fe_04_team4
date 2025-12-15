import clsx from 'clsx'
import type { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'
type ErrorMessageProps = {
  children?: ReactNode
  className?: string
}

export function ErrorMessage({
  children = '데이터를 불러오는 중 오류가 발생했습니다.',
  className = '',
}: ErrorMessageProps) {
  return (
    <div
      className={twMerge(
        clsx(
          'flex flex-col items-center justify-center gap-3 rounded-xl py-4',
          className
        )
      )}
      role="alert"
    >
      <p className="text-sm font-medium text-red-500">{children}</p>
    </div>
  )
}
