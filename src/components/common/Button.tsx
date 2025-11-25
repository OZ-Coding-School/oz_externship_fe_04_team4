import clsx from 'clsx'
import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

type ButtonVariant = 'close' | 'cancel' | 'delete' | 'custom'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  children: ReactNode
  className?: string
}

const variantStyles: Record<ButtonVariant, string> = {
  close: `btn-filled`,
  cancel: `border-1 border-[#D1D5DB]`,
  delete: `btn-delete`,
  custom: ``,
}

export default function Button({
  variant = 'custom',
  className,
  type = 'button',
  children,
  ...props
}: ButtonProps) {
  const baseStyle = `
    box-border btn py-2 px-4 text-[16px] cursor-pointer
  `
  const merged = twMerge(clsx(baseStyle, variantStyles[variant], className))

  return (
    <button type={type} className={merged} {...props}>
      {children}
    </button>
  )
}
