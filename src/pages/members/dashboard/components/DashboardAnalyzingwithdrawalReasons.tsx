import { useState } from 'react'

import { SERVICE_URLS } from '@/config'
import AnalyzingDistributionOfReasonsForWithdrawalGraph from '@/pages/members/dashboard/graphs/AnalyzingDistributionOfReasonsForWithdrawalGraph'
import AnalyzingTrendsBarGraph from '@/pages/members/dashboard/graphs/AnalyzingTrendsBarGraph'

const REASON_LIST = [
  'NO_LONGER_NEEDED',
  'LACK_OF_INTEREST',
  'TOO_DIFFICULT',
  'FOUND_BETTER_SERVICE',
  'PRIVACY_CONCERNS',
  'POOR_SERVICE_QUALITY',
  'TECHNICAL_ISSUES',
  'LACK_OF_CONTENT',
  'OTHER',
] as const

type ReasonType = (typeof REASON_LIST)[number]

const REASON_LABELS: Record<ReasonType, string> = {
  NO_LONGER_NEEDED: '더 이상 필요하지 않음',
  LACK_OF_INTEREST: '흥미 감소',
  TOO_DIFFICULT: '사용이 너무 어려움',
  FOUND_BETTER_SERVICE: '더 좋은 서비스 발견',
  PRIVACY_CONCERNS: '개인정보 우려',
  POOR_SERVICE_QUALITY: '서비스 품질 불만',
  TECHNICAL_ISSUES: '기술적 문제',
  LACK_OF_CONTENT: '콘텐츠 부족',
  OTHER: '기타',
}

const isReasonType = (value: string): value is ReasonType => {
  return REASON_LIST.includes(value as ReasonType)
}

export function DashboardAnalyzingwithdrawalReasons() {
  const [reason, setReason] = useState<ReasonType>('OTHER')
  return (
    <div>
      <div className="flex h-auto w-full max-w-[1120px] flex-col rounded-xl bg-white p-6 shadow">
        <AnalyzingDistributionOfReasonsForWithdrawalGraph
          apiUrl={SERVICE_URLS.ANALYTICS.WITHDRAWAL_REASONS_PERCENTAGE}
          title="탈퇴 사유 비율 분석"
          height={360} // 원하는 높이
          isAnimationActive
        />
      </div>
      <div className="h-1vh relative flex w-full max-w-[1120px] flex-1 flex-col rounded-xl bg-white p-6 shadow">
        <div className="absolute top-5 right-6 flex justify-end">
          <select
            value={reason}
            className="mt-1 block w-60 rounded-lg border border-[#D1D5DB] bg-[#EFEFEF] px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            onChange={(e) => {
              const selectedReason = e.currentTarget.value
              if (isReasonType(selectedReason)) {
                setReason(selectedReason)
              }
            }}
          >
            {REASON_LIST.map((reasonValue) => (
              <option key={reasonValue} value={reasonValue}>
                {REASON_LABELS[reasonValue]}
              </option>
            ))}
          </select>
        </div>
        <AnalyzingTrendsBarGraph
          apiUrl={`${SERVICE_URLS.ANALYTICS.WITHDRAWAL_REASONS_STATS_MONTHLY}?reason=${reason}`}
          title="탈퇴 사유별 월별 추세"
          barColor="#FACC15"
          height={320}
        />
      </div>
    </div>
  )
}
