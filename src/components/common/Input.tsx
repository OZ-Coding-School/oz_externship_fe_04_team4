import clsx from 'clsx'
import type { InputHTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

interface inputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  editable?: boolean
  error?: string
  wrapperClassName?: string
  labelClassName?: string
  inputClassName?: string
}
export default function Input({
  label,
  editable,
  error,
  className,
  wrapperClassName,
  labelClassName,
  inputClassName,
  id,
  ...props
}: inputProps) {
  const mergedInputClass = twMerge(
    clsx(
      `bg-[#F9FAFB] text-sm font-regular px-2 w-2xs h-9 rounded-lg transition focus:outline-none focus:ring-2 focus:ring-blue-400`,
      !editable && ``,
      error &&
        `
        border-red-500 focus:ring-red-400
      `,
      className,
      inputClassName
    )
  )
  return (
    <div className={twMerge(clsx('flex flex-col gap-2', wrapperClassName))}>
      {label && (
        <label
          htmlFor={id}
          className={twMerge(
            clsx('text-sm font-medium text-[#374151]', labelClassName)
          )}
        >
          {label}
        </label>
      )}
      <input
        id={id}
        {...props}
        readOnly={!editable}
        className={twMerge(
          clsx(
            'text-sm font-medium text-[#374151]',
            mergedInputClass,
            inputClassName
          )
        )}
        value={props.value ?? ''}
      />
      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  )
}
