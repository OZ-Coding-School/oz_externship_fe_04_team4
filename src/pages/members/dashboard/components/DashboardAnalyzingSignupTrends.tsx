import AnalyzingSignupTrendsGraph from '@/pages/members/dashboard/graphs/AnalyzingSignupTrendsGraph'

export function DashboardAnalyzingSignupTrends() {
  return (
    <div className="h-1vh flex w-full max-w-[1120px] flex-1 flex-col rounded-xl bg-white p-6 shadow">
      <AnalyzingSignupTrendsGraph
        apiUrl="/api/v1/admin/analytics/signup/trends"
        title="회원가입 추세"
        barColor="#FACC15"
        height={320}
      />
    </div>
  )
}
