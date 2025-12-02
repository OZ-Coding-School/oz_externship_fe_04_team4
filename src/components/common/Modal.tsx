import clsx from 'clsx'
import { X } from 'lucide-react'
import { useEffect, useRef, type ReactNode } from 'react'
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
  zIndex?: number
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
  zIndex = 50,
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY

      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollY}px`
      document.body.style.left = '0'
      document.body.style.right = '0'
      document.body.style.overflow = 'hidden'
      document.body.style.width = '100%'

      const prevActiveElement = document.activeElement as HTMLElement

      requestAnimationFrame(() => {
        modalRef.current?.focus()
      })
      return () => {
        document.body.style.position = ''
        document.body.style.top = ''
        document.body.style.left = ''
        document.body.style.right = ''
        document.body.style.overflow = ''
        document.body.style.width = ''

        window.scrollTo(0, scrollY)

        prevActiveElement?.focus()
      }
    }
  }, [isOpen])

  const handlekeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.stopPropagation()
      onClose()
    }
  }
  const handleContentClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
  }
  if (!isOpen) return null
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={onClose}
      style={{ zIndex }}
    >
      <div
        className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm"
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-modal="true"
        ref={modalRef}
        tabIndex={-1}
        onKeyDown={handlekeyDown}
        onClick={handleContentClick}
        style={{ zIndex: zIndex + 1 }}
        className={twMerge(
          clsx(
            `animate-fadeIn relative z-60 w-full max-w-2xl overflow-hidden rounded-lg bg-white shadow-xl focus:outline-none`,
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
