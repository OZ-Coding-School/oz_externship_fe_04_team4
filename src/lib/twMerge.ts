import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const tM = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}
