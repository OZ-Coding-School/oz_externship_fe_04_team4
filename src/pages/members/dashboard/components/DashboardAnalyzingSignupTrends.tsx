import { useState } from 'react'

import { SERVICE_URLS } from '@/config'
import { DashboardAnalyzingSelect } from '@/pages/members/dashboard/components/DashboardAnalyzingSelect'
import AnalyzingTrendsBarGraph from '@/pages/members/dashboard/graphs/AnalyzingTrendsBarGraph'
import type { Interval } from '@/pages/types/users'

export function DashboardAnalyzingSignupTrends() {
  const [interval, setInterval] = useState<Interval>('monthly')
  return (
    <div className="h-1vh relative flex w-full max-w-[1120px] flex-1 flex-col rounded-xl bg-white p-6 shadow">
      <div className="absolute top-5 right-6 flex justify-end">
        <DashboardAnalyzingSelect
          interval={interval}
          setInterval={setInterval}
        />
      </div>
      <AnalyzingTrendsBarGraph
        apiUrl={`${SERVICE_URLS.ANALYTICS.SIGNUP_TRENDS}?interval=${interval}`}
        title="회원가입 추세"
        barColor="#FACC15"
        height={320}
      />
    </div>
  )
}
