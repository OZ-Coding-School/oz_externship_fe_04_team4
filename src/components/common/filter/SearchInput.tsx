import clsx from 'clsx'
import { Search } from 'lucide-react'

import { useDeferredValue, useEffect, useRef, useState } from 'react'

import { twMerge } from 'tailwind-merge'

import type { SearchConfig } from '@/components/common/filter/types'

export function SearchInput({
  className,
  label = '검색',
  labelClassName,
  searchClassName,
  inputClassName,
  placeholder,
  value,
  onChange,
}: SearchConfig) {
  const [localValue, setLocalValue] = useState(value)
  const debounceValue = useDeferredValue(localValue)
  const onChangeRef = useRef(onChange)

  useEffect(() => {
    onChangeRef.current = onChange
  }, [onChange])

  useEffect(() => {
    setLocalValue(value)
  }, [value])

  useEffect(() => {
    onChangeRef.current(debounceValue)
  }, [debounceValue])

  return (
    <div className={twMerge(clsx('flex flex-col gap-1', className))}>
      {label && (
        <label
          className={twMerge(
            clsx('text-xs font-medium text-gray-700', labelClassName)
          )}
        >
          {label}
        </label>
      )}
      <div
        className={twMerge(
          clsx('relative rounded-lg bg-white', searchClassName)
        )}
      >
        <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder={placeholder}
          value={localValue}
          onChange={(e) => setLocalValue(e.target.value)}
          className={twMerge(
            clsx(
              'w-full rounded-lg border border-gray-300 py-2 pr-4 pl-10 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none',
              inputClassName
            )
          )}
        />
      </div>
    </div>
  )
}
