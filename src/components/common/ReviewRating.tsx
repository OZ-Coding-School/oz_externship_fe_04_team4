import clsx from 'clsx'
import { Star } from 'lucide-react'
import { twMerge } from 'tailwind-merge'

interface ReviewRatingProps {
  value: number
  wrapperClassName?: string
  className?: string
  size?: number
  activeColor?: string
  inactiveColor?: string
  gap?: number
  showNumber?: boolean
  numberClassName?: string
}

export default function ReviewRating({
  value,
  wrapperClassName,
  className,
  size = 20,
  activeColor = '#FACC15',
  inactiveColor = '#D1D5DB',
  gap = 4,
  showNumber = true,
  numberClassName,
}: ReviewRatingProps) {
  const rounded = Math.round(value)

  return (
    <div className={twMerge(clsx('flex flex-col gap-2', wrapperClassName))}>
      <div className={twMerge(clsx('flex items-center', className))}>
        <div className="flex" style={{ gap }}>
          {Array.from({ length: 5 }, (_, i) => {
            const starIndex = i + 1
            const filled = starIndex <= rounded

            return (
              <Star
                key={i}
                size={size}
                strokeWidth={2}
                color={filled ? activeColor : inactiveColor}
                fill={filled ? activeColor : 'none'}
              />
            )
          })}
        </div>

        {showNumber && (
          <span
            className={twMerge(
              clsx('ml-1 text-sm font-medium text-[#111827]', numberClassName)
            )}
          >
            {Math.floor(value)} / 5
          </span>
        )}
      </div>
    </div>
  )
}
