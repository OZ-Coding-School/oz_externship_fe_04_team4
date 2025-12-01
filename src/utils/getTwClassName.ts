import clsx, { type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const twClassName = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}
