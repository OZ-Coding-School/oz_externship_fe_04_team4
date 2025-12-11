import { ChevronDown } from 'lucide-react'

import type { FilterOption } from '@/components/common/filter/types'
import { tM } from '@/lib/twMerge'

interface FilterSelectProps {
  className?: string
  label?: string
  labelClassName?: string
  selectClassName?: string
  options: FilterOption[]
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function FilterSelect({
  className,
  label,
  labelClassName,
  selectClassName,
  options,
  value,
  onChange,
  placeholder = '전체',
}: FilterSelectProps) {
  return (
    <div className={tM('flex flex-col gap-1', className)}>
      {label && (
        <label
          className={tM('text-xs font-medium text-gray-700', labelClassName)}
        >
          {label}
        </label>
      )}
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={tM(
            'w-full appearance-none rounded-lg border border-gray-300 bg-white py-2 pr-10 pl-4 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none',
            selectClassName
          )}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
      </div>
    </div>
  )
}
