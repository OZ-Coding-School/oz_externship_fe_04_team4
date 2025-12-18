import { ADMIN_TEXT } from '@/config/api'

export const SERVICE_URLS = {
  // 회원 관리
  ACCOUNTS: {
    LOGIN: `/accounts/login`,
    ME: `/accounts/me`,
    LIST: `${ADMIN_TEXT}/account`,
    DETAIL: (accountId: number) => `${ADMIN_TEXT}/account/${accountId}`,
    UPDATE: (accountId: number) => `${ADMIN_TEXT}/account/${accountId}`,
    DELETE: (accountId: number) => `${ADMIN_TEXT}/account/${accountId}`,
    CHANGE_ROLE: (accountId: number) =>
      `${ADMIN_TEXT}/account/${accountId}/role`,
    ACTIVATE: (accountId: number) =>
      `${ADMIN_TEXT}/account/${accountId}/activate`,
    DEACTIVATE: (accountId: number) =>
      `${ADMIN_TEXT}/account/${accountId}/deactivate`,
    CHECK_NICKNAME: `/accounts/check-nickname`,
  },

  // 탈퇴 관리
  WITHDRAWALS: {
    LIST: `${ADMIN_TEXT}/withdrawals`,
    DETAIL: (withdrawalId: number) =>
      `${ADMIN_TEXT}/withdrawals/${withdrawalId}`,
  },

  // 분석
  ANALYTICS: {
    SIGNUP_TRENDS: `${ADMIN_TEXT}/analytics/signup/trends`,
    WITHDRAWALS: `${ADMIN_TEXT}/analytics/withdrawals`,
    WITHDRAWAL_REASONS_PERCENTAGE: `${ADMIN_TEXT}/analytics/withdrawal-reasons/percentage`,
    WITHDRAWAL_REASONS_STATS_MONTHLY: `${ADMIN_TEXT}/analytics/withdrawal-reasons/stats/monthly`,
  },

  // 강의 관리
  LECTURES: {
    LIST: `${ADMIN_TEXT}/lectures`,
    DETAIL: (lectureId: number) => `${ADMIN_TEXT}/lectures/${lectureId}`,
  },

  // 스터디 그룹 관리
  STUDY_GROUPS: {
    LIST: `${ADMIN_TEXT}/study-groups`,
    DETAIL: (groupId: number) => `${ADMIN_TEXT}/study-groups/${groupId}`,
  },

  // 스터디 리뷰 관리
  STUDY_REVIEWS: {
    LIST: `${ADMIN_TEXT}/study-reviews`,
    DETAIL: (reviewId: number) => `${ADMIN_TEXT}/study-reviews/${reviewId}`,
  },

  // 스터디 구인 공고 관리
  RECRUITMENTS: {
    LIST: `${ADMIN_TEXT}/recruitments`,
    DETAIL: (recruitmentId: number) =>
      `${ADMIN_TEXT}/recruitments/${recruitmentId}`,
    DELETE: (recruitmentId: number) =>
      `${ADMIN_TEXT}/recruitments/${recruitmentId}`,
  },

  TAGS: {
    LIST: '/recruitment-tags',
  },

  // 지원 내역 관리
  APPLICATIONS: {
    LIST: `${ADMIN_TEXT}/applications`,
    DETAIL: (applicationId: number) =>
      `${ADMIN_TEXT}/applications/${applicationId}`,
  },
} as const
