import Login from '@/pages'
import Layout from '@/pages/layout'
import AdminMemberManagementPage from '@/pages/members'
import AdminDashboardPage from '@/pages/members/dashboard'
import AdminUserManagementPage from '@/pages/members/users'
import AdminWithdrawalManagementPage from '@/pages/members/withdrawals'
import StudyRecruitmentManagementPage from '@/pages/recruitment'
import ApplicationManagementPage from '@/pages/recruitment/applications'
import RecruitmentPostManagementPage from '@/pages/recruitment/posts'
import StudyManagementPage from '@/pages/study'
import LectureManagementPage from '@/pages/study/courses'
import StudyGroupManagementPage from '@/pages/study/groups'
import ReviewManagementPage from '@/pages/study/reviews'
import { Route, Routes } from 'react-router'

export default function AppRouter() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/members" element={<AdminMemberManagementPage />} />
        <Route path="members/users" element={<AdminUserManagementPage />} />
        <Route
          path="members/withdrawals"
          element={<AdminWithdrawalManagementPage />}
        />
        <Route path="members/dashboard" element={<AdminDashboardPage />} />

        <Route path="/study" element={<StudyManagementPage />} />
        <Route path="/study/courses" element={<LectureManagementPage />} />
        <Route path="/study/groups" element={<StudyGroupManagementPage />} />
        <Route path="/study/reviews" element={<ReviewManagementPage />} />

        <Route
          path="/recruitment"
          element={<StudyRecruitmentManagementPage />}
        />
        <Route
          path="/recruitment/posts"
          element={<RecruitmentPostManagementPage />}
        />
        <Route
          path="/recruitment/applications"
          element={<ApplicationManagementPage />}
        />
      </Routes>
    </Layout>
  )
}
