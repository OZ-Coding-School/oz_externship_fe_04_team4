import { useState } from 'react'

import { DashboardAnalyzingSignupTrends } from '@/pages/members/dashboard/components/DashboardAnalyzingSignupTrends'
import { DashboardAnalyzingwithdrawalReasons } from '@/pages/members/dashboard/components/DashboardAnalyzingwithdrawalReasons'
import { DashboardAnalyzingWithdrawalsTrends } from '@/pages/members/dashboard/components/DashboardAnalyzingWithdrawalsTrends'
import Tabs from '@/pages/members/dashboard/components/Tabs'

export default function AdminDashboardPage() {
  const [active, setActive] = useState('signup')

  const tabItems = [
    { key: 'signup', label: '회원가입 추세' },
    { key: 'withdraw', label: '회원탈퇴 추세' },
    { key: 'reasons', label: '탈퇴 사유 분석' },
  ]

  const renderTabContent = () => {
    switch (active) {
      case 'signup':
        return <DashboardAnalyzingSignupTrends />
      case 'withdraw':
        return <DashboardAnalyzingWithdrawalsTrends />
      case 'reasons':
        return <DashboardAnalyzingwithdrawalReasons />
      default:
        return null
    }
  }
  return (
    <>
      <Tabs items={tabItems} activeKey={active} onChange={setActive} />
      <div className="mt-3 w-full flex-1 justify-start">
        {renderTabContent()}
      </div>
    </>
  )
}
