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
  close: `btn btn-filled`,
  cancel: `btn border-1 border-[#D1D5DB]`,
  delete: `btn btn-delete`,
  custom: `btn`,
}

export default function Button({
  variant = 'custom',
  className,
  children,
  ...props
}: ButtonProps) {
  const baseStyle = `
    box-border btn py-2 px-4 text-[16px]
  `
  const merged = twMerge(clsx(baseStyle, variantStyles[variant], className))

  return (
    <button className={merged} {...props}>
      {children}
    </button>
  )
}
