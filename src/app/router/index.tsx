import { Route, Routes } from 'react-router'

import Layout from '@/app/layout'
import { ProtectedRoute } from '@/app/router/ProtectedRoute'
import { ROUTE_PATHS } from '@/app/router/routePaths'
import Login from '@/pages/login'
import AdminDashboardPage from '@/pages/members/dashboard'
import AdminUserManagementPage from '@/pages/members/users'
import AdminWithdrawalManagementPage from '@/pages/members/withdrawals'
import ApplicationManagementPage from '@/pages/recruitment/applications'
import RecruitmentPage from '@/pages/recruitment/recruitment'
import StudyGroupManagementPage from '@/pages/study/groups'
import LectureManagementPage from '@/pages/study/lectures'
import ReviewManagementPage from '@/pages/study/reviews'

export default function AppRouter() {
  return (
    <Layout>
      <Routes>
        <Route path={ROUTE_PATHS.LOGIN} element={<Login />} />

        <Route element={<ProtectedRoute />}>
          <Route
            path={ROUTE_PATHS.MEMBERS.USERS}
            element={<AdminUserManagementPage />}
          />
          <Route
            path={ROUTE_PATHS.MEMBERS.WITHDRAWALS}
            element={<AdminWithdrawalManagementPage />}
          />
          <Route
            path={ROUTE_PATHS.MEMBERS.DASHBOARD}
            element={<AdminDashboardPage />}
          />

          <Route
            path={ROUTE_PATHS.STUDY.COURSES}
            element={<LectureManagementPage />}
          />
          <Route
            path={ROUTE_PATHS.STUDY.GROUPS}
            element={<StudyGroupManagementPage />}
          />
          <Route
            path={ROUTE_PATHS.STUDY.REVIEWS}
            element={<ReviewManagementPage />}
          />

          <Route
            path={ROUTE_PATHS.RECRUITMENT.LIST}
            element={<RecruitmentPage />}
          />
          <Route
            path={ROUTE_PATHS.RECRUITMENT.APPLICATIONS}
            element={<ApplicationManagementPage />}
          />
        </Route>
      </Routes>
    </Layout>
  )
}
