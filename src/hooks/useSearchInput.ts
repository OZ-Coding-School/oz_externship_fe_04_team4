import { useDeferredValue, useEffect, useState } from 'react'

export function useSearchInput(
  initialValue: string,
  onChange?: (value: string) => void
) {
  const [localValue, setLocalValue] = useState(initialValue)
  const deferredValue = useDeferredValue(localValue)

  useEffect(() => {
    if (onChange && deferredValue !== initialValue) {
      onChange(deferredValue)
    }
  }, [deferredValue, initialValue, onChange])

  useEffect(() => {
    setLocalValue(initialValue)
  }, [initialValue])

  return [localValue, setLocalValue] as const
}
