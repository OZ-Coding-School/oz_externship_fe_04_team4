import { useEffect, useState } from 'react'

export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debounceValue, setDebounceValue] = useState<T>(value)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceValue(value)
    }, delay)
    return () => clearTimeout(timer)
  }, [value, delay])
  return debounceValue
}
