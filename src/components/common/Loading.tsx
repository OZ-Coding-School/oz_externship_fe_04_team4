import clsx from 'clsx'
import { LoaderCircle } from 'lucide-react'
import { twMerge } from 'tailwind-merge'

type LoadingProps = {
  size?: number
  speed?: number
  label?: string
  className?: string
}

export function Loading({
  size = 48,
  speed = 1,
  label = '로딩 중...',
  className = '',
}: LoadingProps) {
  const id = 'loader-gradient'

  return (
    <div
      className={twMerge(
        clsx(
          `flex flex-col items-center justify-center gap-3 rounded-xl py-4`,
          className
        )
      )}
      role="status"
      aria-live="polite"
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        style={{ animation: `spin ${speed}s linear infinite` }}
      >
        <defs>
          <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#34d399" />
            <stop offset="50%" stopColor="#22c55e" />
            <stop offset="100%" stopColor="#a3e635" />
          </linearGradient>

          <mask id="loader-mask">
            <LoaderCircle size={24} stroke="white" strokeWidth={2.5} />
          </mask>
        </defs>

        <rect
          width="24"
          height="24"
          fill={`url(#${id})`}
          mask="url(#loader-mask)"
        />
      </svg>

      {label && (
        <span className="text-primary-dark-gray text-sm font-medium">
          {label}
        </span>
      )}
    </div>
  )
}
