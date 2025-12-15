import clsx from 'clsx'
import type { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'
type EmptyProps = {
  children?: ReactNode
  className?: string
}

export function Empty({
  children = '표시할 데이터가 없습니다.',
  className = '',
}: EmptyProps) {
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
      <p className="text-shadow-primary-dark-gray text-sm font-medium">
        {children}
      </p>
    </div>
  )
}
