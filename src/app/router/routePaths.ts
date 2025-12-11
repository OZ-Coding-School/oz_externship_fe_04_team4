export const ROUTE_PATHS = {
  LOGIN: '/',

  MEMBERS: {
    USERS: '/members/users',
    WITHDRAWALS: '/members/withdrawals',
    DASHBOARD: '/members/dashboard',
  },

  STUDY: {
    COURSES: '/study/courses',
    GROUPS: '/study/groups',
    REVIEWS: '/study/reviews',
  },

  RECRUITMENT: {
    LIST: '/recruitment/recruitment',
    APPLICATIONS: '/recruitment/applications',
  },
} as const
