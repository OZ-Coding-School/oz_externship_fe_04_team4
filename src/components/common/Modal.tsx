import clsx from 'clsx'
import { X } from 'lucide-react'
import type { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: ReactNode
  children: ReactNode
  footer?: ReactNode
  className?: string
  footerClassName?: string
  titleClassName?: string
  contentClassName?: string
  topCloseButton?: boolean
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  footer,
  className,
  titleClassName,
  contentClassName,
  footerClassName,
  topCloseButton,
}: ModalProps) {
  if (!isOpen) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-modal="true"
        className={twMerge(
          clsx(
            `animate-fadeIn relative z-60 w-full max-w-2xl overflow-hidden rounded-lg bg-white shadow-xl`,
            className
          )
        )}
      >
        {title && (
          <div
            className={twMerge(
              clsx(
                `relative border-b border-[#E5E7EB] p-6 text-lg font-semibold`,
                titleClassName
              )
            )}
          >
            {title}
          </div>
        )}
        {topCloseButton && (
          <button
            className="absolute top-6.5 right-6 cursor-pointer"
            aria-label="닫기"
          >
            <X onClick={onClose} size={24} />
          </button>
        )}
        <div
          className={twMerge(
            clsx(`p-6 text-sm text-[#374151]`, contentClassName)
          )}
        >
          {children}
        </div>
        {footer && (
          <div
            className={twMerge(
              clsx(`flex gap-3 border-t border-[#E5E7EB] p-6`, footerClassName)
            )}
          >
            {footer}
          </div>
        )}
      </div>
    </div>
  )
}
