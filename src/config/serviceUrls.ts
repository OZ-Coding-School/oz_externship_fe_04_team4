import { ADMIN_API_URL, API_URL } from '@/config/api'

export const SERVICE_URLS = {
  // 회원 관리
  ACCOUNTS: {
    LOGIN: `${API_URL}/accounts/login`,
    ME: `${API_URL}/accounts/me`,
    LIST: `${ADMIN_API_URL}/accounts`,
    DETAIL: (accountId: number) => `${ADMIN_API_URL}/accounts/${accountId}`,
    UPDATE: (accountId: number) => `${ADMIN_API_URL}/accounts/${accountId}`,
    DELETE: (accountId: number) => `${ADMIN_API_URL}/accounts/${accountId}`,
    CHANGE_ROLE: (accountId: number) =>
      `${ADMIN_API_URL}/accounts/${accountId}/role`,
    ACTIVATE: (accountId: number) =>
      `${ADMIN_API_URL}/accounts/${accountId}/activate`,
    DEACTIVATE: (accountId: number) =>
      `${ADMIN_API_URL}/accounts/${accountId}/deactivate`,
    CHECK_NICKNAME: `${ADMIN_API_URL}/accounts/check-nickname`,
  },

  // 탈퇴 관리
  WITHDRAWALS: {
    LIST: `${ADMIN_API_URL}/withdrawals`,
    DETAIL: (withdrawalId: number) =>
      `${ADMIN_API_URL}/withdrawals/${withdrawalId}`,
  },

  // 분석
  ANALYTICS: {
    SIGNUP_TRENDS: `${ADMIN_API_URL}/analytics/signup/trends`,
    WITHDRAWAL_REASONS_PERCENTAGE: `${ADMIN_API_URL}/analytics/withdrawal-reasons/percentage`,
    WITHDRAWAL_REASONS_STATS_MONTHLY: `${ADMIN_API_URL}/analytics/withdrawal-reasons/stats/monthly`,
  },

  // 강의 관리
  LECTURES: {
    LIST: `${ADMIN_API_URL}/lectures`,
    DETAIL: (lectureId: number) => `${ADMIN_API_URL}/lectures/${lectureId}`,
  },

  // 스터디 그룹 관리
  STUDY_GROUPS: {
    LIST: `${ADMIN_API_URL}/study-groups`,
    DETAIL: (groupId: number) => `${ADMIN_API_URL}/study-groups/${groupId}`,
  },

  // 스터디 리뷰 관리
  STUDY_REVIEWS: {
    LIST: `${ADMIN_API_URL}/study-reviews`,
    DETAIL: (reviewId: number) => `${ADMIN_API_URL}/study-reviews/${reviewId}`,
  },

  // 스터디 구인 공고 관리
  RECRUITMENTS: {
    LIST: `${ADMIN_API_URL}/recruitments`,
    DETAIL: (recruitmentId: number) =>
      `${ADMIN_API_URL}/recruitments/${recruitmentId}`,
    DELETE: (recruitmentId: number) =>
      `${ADMIN_API_URL}/recruitments/${recruitmentId}`,
  },

  TAGS: {
    LIST: `${API_URL}/recruitment-tags`,
  },

  // 지원 내역 관리
  APPLICATIONS: {
    LIST: `${ADMIN_API_URL}/applications`,
    DETAIL: (applicationId: number) =>
      `${ADMIN_API_URL}/applications/${applicationId}`,
  },
} as const
