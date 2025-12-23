import { useState } from 'react'

import { SERVICE_URLS } from '@/config'
import { DashboardAnalyzingSelect } from '@/pages/members/dashboard/components/DashboardAnalyzingSelect'
import AnalyzingTrendsBarGraph from '@/pages/members/dashboard/graphs/AnalyzingTrendsBarGraph'
import type { Interval } from '@/pages/types/users'

export function DashboardAnalyzingWithdrawalsTrends() {
  const [interval, setInterval] = useState<Interval>('monthly')
  return (
    <div className="h-1vh w-fullflex-1 relative flex flex-col rounded-xl bg-white p-6 shadow">
      <div className="absolute top-5 right-6 flex justify-end">
        <DashboardAnalyzingSelect
          interval={interval}
          setInterval={setInterval}
        />
      </div>
      <AnalyzingTrendsBarGraph
        apiUrl={`${SERVICE_URLS.ANALYTICS.WITHDRAWALS}/trends?interval=${interval}`}
        title="회원탈퇴 추세"
        barColor="#EF4444"
        height={320}
      />
    </div>
  )
}
