import { Route, Routes } from 'react-router'

import { ProtectedRoute } from '@/app/routes/ProtectedRoute'
import Layout from '@/pages/layout'
import Login from '@/pages/login'
import AdminDashboardPage from '@/pages/members/dashboard'
import AdminUserManagementPage from '@/pages/members/users'
import AdminWithdrawalManagementPage from '@/pages/members/withdrawals'
import RecruitmentPostManagementPage from '@/pages/recruitment/applications'
import RecruitmentPage from '@/pages/recruitment/recruitment'
import LectureManagementPage from '@/pages/study/courses'
import StudyGroupManagementPage from '@/pages/study/groups'
import ReviewManagementPage from '@/pages/study/reviews'

export default function AppRouter() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="members/users"
          element={
            <ProtectedRoute>
              <AdminUserManagementPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="members/withdrawals"
          element={
            <ProtectedRoute>
              <AdminWithdrawalManagementPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="members/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboardPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/study/courses"
          element={
            <ProtectedRoute>
              <LectureManagementPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/study/groups"
          element={
            <ProtectedRoute>
              <StudyGroupManagementPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/study/reviews"
          element={
            <ProtectedRoute>
              <ReviewManagementPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/recruitment/posts"
          element={
            <ProtectedRoute>
              <RecruitmentPostManagementPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/recruitment/applications"
          element={
            <ProtectedRoute>
              <RecruitmentPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Layout>
  )
}
