import type { Dispatch, SetStateAction } from 'react'

import type { Interval } from '@/pages/types/users'

export interface DashboardAnalyzingSelectProps {
  interval: Interval
  setInterval: Dispatch<SetStateAction<Interval>>
}
export function DashboardAnalyzingSelect({
  interval,
  setInterval,
}: DashboardAnalyzingSelectProps) {
  return (
    <select
      value={interval}
      className="mt-1 block w-23 rounded-lg border border-[#D1D5DB] bg-[#EFEFEF] px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      onChange={(e) => {
        const v = e.currentTarget.value
        if (v === 'monthly' || v === 'yearly') {
          setInterval(v)
        }
      }}
    >
      <option value="monthly">월별</option>
      <option value="yearly">년별</option>
    </select>
  )
}
