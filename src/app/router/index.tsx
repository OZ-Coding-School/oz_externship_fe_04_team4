import { Route, Routes } from 'react-router'

import Layout from '@/app/layout'
import { ProtectedRoute } from '@/app/router/ProtectedRoute'
import Login from '@/pages/login'
import AdminDashboardPage from '@/pages/members/dashboard'
import AdminUserManagementPage from '@/pages/members/users'
import AdminWithdrawalManagementPage from '@/pages/members/withdrawals'
import ApplicationManagementPage from '@/pages/recruitment/applications'
import RecruitmentPage from '@/pages/recruitment/recruitment'
import LectureManagementPage from '@/pages/study/courses'
import StudyGroupManagementPage from '@/pages/study/groups'
import ReviewManagementPage from '@/pages/study/reviews'

export default function AppRouter() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route element={<ProtectedRoute />}>
          <Route path="members/users" element={<AdminUserManagementPage />} />
          <Route
            path="members/withdrawals"
            element={<AdminWithdrawalManagementPage />}
          />
          <Route path="members/dashboard" element={<AdminDashboardPage />} />

          <Route path="/study/courses" element={<LectureManagementPage />} />
          <Route path="/study/groups" element={<StudyGroupManagementPage />} />
          <Route path="/study/reviews" element={<ReviewManagementPage />} />

          <Route
            path="/recruitment/recruitment"
            element={<RecruitmentPage />}
          />
          <Route
            path="/recruitment/applications"
            element={<ApplicationManagementPage />}
          />
        </Route>
      </Routes>
    </Layout>
  )
}
