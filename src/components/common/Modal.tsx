import * as Dialog from '@radix-ui/react-dialog'
import clsx from 'clsx'
import { X } from 'lucide-react'
import { type ReactNode, useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'

import { acquireModalLayer, releaseModalLayer } from '@/lib/modalLayer'

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
  zIndex,
}: ModalProps) {
  const [layer] = useState(() => acquireModalLayer())

  const baseZ = zIndex ?? 1000 + layer * 20

  useEffect(() => {
    return () => releaseModalLayer()
  }, [])

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        {/* Overlay */}
        <Dialog.Overlay
          className="animate-fadeIn fixed inset-0 bg-black/50 backdrop-blur-sm"
          style={{ zIndex: baseZ }}
        />

        {/* Content */}
        <Dialog.Content
          role="dialog"
          aria-modal="true"
          aria-describedby={undefined}
          style={{ zIndex: baseZ + 1 }}
          className={twMerge(
            clsx(
              `animate-fadeIn fixed top-1/2 left-1/2 w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-lg bg-white shadow-xl focus:outline-none`,
              className
            )
          )}
        >
          {/* Title */}
          {title && (
            <Dialog.Title
              className={twMerge(
                clsx(
                  `relative border-b border-[#E5E7EB] p-6 text-lg font-semibold`,
                  titleClassName
                )
              )}
            >
              {title}
            </Dialog.Title>
          )}

          {/* Top Close Button */}
          {topCloseButton && (
            <Dialog.Close
              className="absolute top-6.5 right-6 cursor-pointer outline-none focus:outline-none"
              aria-label="닫기"
            >
              <X size={24} />
            </Dialog.Close>
          )}

          {/* Content */}
          <div
            className={twMerge(
              clsx(`p-6 text-sm text-[#374151]`, contentClassName)
            )}
          >
            {children}
          </div>

          {/* Footer */}
          {footer && (
            <div
              className={twMerge(
                clsx(
                  `flex gap-3 border-t border-[#E5E7EB] p-6`,
                  footerClassName
                )
              )}
            >
              {footer}
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
