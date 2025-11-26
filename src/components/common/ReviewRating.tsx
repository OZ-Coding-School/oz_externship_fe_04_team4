import clsx from 'clsx'
import { Star } from 'lucide-react'
import RatingImport from 'react-rating'
import { twMerge } from 'tailwind-merge'

type RatingComponentProps = {
  initialRating?: number
  fractions?: number
  emptySymbol?: React.ReactNode
  fullSymbol?: React.ReactNode
  className?: string
  readonly?: boolean
}

interface ReviewRatingProps {
  value: number
  wrapperClassName?: string
  className?: string
  size?: number
  activeColor?: string
  inactiveColor?: string
  inactiveFill?: string
  gap?: number
  showNumber?: boolean
  numberClassName?: string
}

const Rating = RatingImport as unknown as React.FC<RatingComponentProps>

export default function ReviewRating({
  value,
  wrapperClassName,
  className,
  size = 20,
  activeColor = '#FACC15',
  inactiveColor = '#D1D5DB',
  inactiveFill = '#fff',
  gap = 4,
  showNumber = true,
  numberClassName,
}: ReviewRatingProps) {
  return (
    <div className={twMerge(clsx('flex flex-col gap-2', wrapperClassName))}>
      <div className={twMerge(clsx(`flex items-center`, className))}>
        <Rating
          className="flex items-center leading-1"
          initialRating={value}
          readonly
          fractions={1}
          emptySymbol={
            <Star
              strokeWidth={2}
              size={size}
              color={inactiveColor}
              fill={inactiveFill}
              style={{ marginRight: gap }}
            />
          }
          fullSymbol={
            <Star
              strokeWidth={2}
              size={size}
              color={activeColor}
              fill={activeColor}
              style={{ marginRight: gap }}
            />
          }
        />
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
