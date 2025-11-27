import AnalyzingWithdrawalsTrendsGraph from '@/pages/members/dashboard/graphs/AnalyzingWithdrawalsTrendsGraph'

export function DashboardAnalyzingWithdrawalsTrends() {
  return (
    <div className="h-1vh flex w-full max-w-[1120px] flex-1 flex-col rounded-xl bg-white p-6 shadow">
      <AnalyzingWithdrawalsTrendsGraph
        apiUrl="/api/v1/admin/analytics/withdrawals/trends"
        title="회원탈퇴 추세"
        barColor="#EF4444"
        height={320}
      />
    </div>
  )
}
