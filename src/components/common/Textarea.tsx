import clsx from 'clsx'
import type { TextareaHTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  editable?: boolean
  error?: string
  wrapperClassName?: string
  labelClassName?: string
  textareaClassName?: string
}

export default function Textarea({
  label,
  editable,
  error,
  className,
  wrapperClassName,
  labelClassName,
  textareaClassName,
  id,
  ...props
}: TextareaProps) {
  const mergedTextareaClass = twMerge(
    clsx(
      `
      bg-[#F9FAFB] text-sm font-regular border-box p-4 rounded-lg overflow-y-auto resize-none
      transition focus:outline-none focus:ring-2 focus:ring-blue-400
      text-gray-700
      `,
      !editable && ``,
      error && `border-red-500 focus:ring-red-400`,
      className,
      textareaClassName
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

      <textarea
        id={id}
        {...props}
        readOnly={!editable}
        className={twMerge(
          clsx(
            'text-sm font-medium text-[#374151]',
            mergedTextareaClass,
            textareaClassName
          )
        )}
        value={props.value ?? ''}
      />

      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  )
}
