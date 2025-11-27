import { useState } from 'react'

import AnalyzingSignupTrendsGraph from '@/pages/members/dashboard/graphs/AnalyzingSignupTrendsGraph'

type Interval = 'monthly' | 'yearly'

export function DashboardAnalyzingSignupTrends() {
  const [interval, setInterval] = useState<Interval>('monthly')

  return (
    <div className="h-1vh relative flex w-full max-w-[1120px] flex-1 flex-col rounded-xl bg-white p-6 shadow">
      <div className="absolute top-5 right-6 flex justify-end">
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
      </div>
      <AnalyzingSignupTrendsGraph
        apiUrl={`/api/v1/admin/analytics/signup/trends?interval=${interval}`}
        title="회원가입 추세"
        barColor="#FACC15"
        height={320}
      />
    </div>
  )
}
