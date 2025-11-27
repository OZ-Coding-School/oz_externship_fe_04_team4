import { useState } from 'react'

import AnalyzingWithdrawalsReasonsGraph from '@/pages/members/dashboard/graphs/AnalyzingWithdrawalsReasonsGraph'

export function DashboardAnalyzingwithdrawalReasons() {
  const [reason, setReason] = useState<
    | 'NO_LONGER_NEEDED'
    | 'LACK_OF_INTEREST'
    | 'TOO_DIFFICULT'
    | 'FOUND_BETTER_SERVICE'
    | 'PRIVACY_CONCERNS'
    | 'POOR_SERVICE_QUALITY'
    | 'TECHNICAL_ISSUES'
    | 'LACK_OF_CONTENT'
    | 'OTHER'
  >('OTHER')

  return (
    <div className="h-1vh relative flex w-full max-w-[1120px] flex-1 flex-col rounded-xl bg-white p-6 shadow">
      <div className="absolute top-5 right-6 flex justify-end">
        <select
          value={reason}
          className="mt-1 block w-23 rounded-lg border border-[#D1D5DB] bg-[#EFEFEF] px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          onChange={(e) => {
            const selectedReason = e.currentTarget.value
            if (
              selectedReason === 'NO_LONGER_NEEDED' ||
              selectedReason === 'LACK_OF_INTEREST' ||
              selectedReason === 'TOO_DIFFICULT' ||
              selectedReason === 'FOUND_BETTER_SERVICE' ||
              selectedReason === 'PRIVACY_CONCERNS' ||
              selectedReason === 'POOR_SERVICE_QUALITY' ||
              selectedReason === 'TECHNICAL_ISSUES' ||
              selectedReason === 'LACK_OF_CONTENT' ||
              selectedReason === 'OTHER'
            ) {
              setReason(selectedReason)
            }
          }}
        >
          <option value="NO_LONGER_NEEDED">더 이상 필요하지 않음</option>
          <option value="LACK_OF_INTEREST">흥미 감소</option>
          <option value="TOO_DIFFICULT">사용이 너무 어려움</option>
          <option value="FOUND_BETTER_SERVICE">더 좋은 서비스 발견</option>
          <option value="PRIVACY_CONCERNS">개인정보 우려</option>
          <option value="POOR_SERVICE_QUALITY">서비스 품질 불만</option>
          <option value="TECHNICAL_ISSUES">기술적 문제</option>
          <option value="LACK_OF_CONTENT">콘텐츠 부족</option>
          <option value="OTHER">기타</option>
        </select>
      </div>
      <AnalyzingWithdrawalsReasonsGraph
        apiUrl={`/api/v1/admin/analytics/withdrawal-reasons/stats/monthly?reason=${reason}`}
        title="탈퇴 사유별 월별 추세"
        barColor="#FACC15"
        height={320}
      />
    </div>
  )
}
