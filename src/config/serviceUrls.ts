export const SERVICE_URLS = {
  // 회원 관리
  ACCOUNTS: {
    LIST: '/accounts',
    DETAIL: (accountId: number) => `/accounts/${accountId}`,
    UPDATE: (accountId: number) => `/accounts/${accountId}`,
    DELETE: (accountId: number) => `/accounts/${accountId}`,
    CHANGE_ROLE: (accountId: number) => `/accounts/${accountId}/role`,
    ACTIVATE: (accountId: number) => `/accounts/${accountId}/activate`,
    DEACTIVATE: (accountId: number) => `/accounts/${accountId}/deactivate`,
  },

  // 탈퇴 관리
  WITHDRAWALS: {
    LIST: '/withdrawals',
    DETAIL: (withdrawalId: number) => `/withdrawals/${withdrawalId}`,
  },

  // 분석
  ANALYTICS: {
    SIGNUP_TRENDS: '/analytics/signup/trends',
    WITHDRAWAL_REASONS_PERCENTAGE: '/analytics/withdrawal-reasons/percentage',
    WITHDRAWAL_REASONS_STATS_MONTHLY:
      '/analytics/withdrawal-reasons/stats/monthly',
  },

  // 강의 관리
  LECTURES: {
    LIST: '/lectures',
    DETAIL: (lectureId: number) => `/lectures/${lectureId}`,
  },

  // 스터디 그룹 관리
  STUDY_GROUPS: {
    LIST: '/study-groups',
    DETAIL: (groupId: number) => `/study-groups/${groupId}`,
  },

  // 스터디 리뷰 관리
  STUDY_REVIEWS: {
    LIST: '/study-reviews',
    DETAIL: (reviewId: number) => `/study-reviews/${reviewId}`,
  },

  // 스터디 구인 공고 관리
  RECRUITMENTS: {
    LIST: '/recruitments',
    DETAIL: (recruitmentId: number) => `/recruitments/${recruitmentId}`,
    DELETE: (recruitmentId: number) => `/recruitments/${recruitmentId}`,
  },

  // 지원 내역 관리
  APPLICATIONS: {
    LIST: '/applications',
    DETAIL: (applicationId: number) => `/applications/${applicationId}`,
  },
} as const
