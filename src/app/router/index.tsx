import Layout from '@/pages'
import MemberManagement from '@/pages/members'
import MembersDashboardPage from '@/pages/members/dashboard'
import UserManagementPage from '@/pages/members/users'
import WithdrawalManagementPage from '@/pages/members/withdrawals'
import { Route, Routes } from 'react-router'

export default function AppRouter() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<MemberManagement />}>
          <Route path="/dashboard" element={<MembersDashboardPage />} />
          <Route path="/users" element={<UserManagementPage />} />
          <Route path="/withdrawals" element={<WithdrawalManagementPage />} />
        </Route>
      </Routes>
    </Layout>
  )
}
