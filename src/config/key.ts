export const QUERY_KEY = {
  ACCOUNTS: {
    ME: ['accounts', 'me'],

    ME_AUTH: (authVersion: number) => ['accounts', 'me', authVersion],
    CHECK_NICKNAME: ['check', 'nickname'],
  },
  RECRUMENTS: {
    LIST: ['recruitment', 'list'],
    DETAIL: ['recruitment', 'detail'],
    TAGS: ['recruitment', 'tags'],
  },
  APPLICATIONS: {
    LIST: ['application', 'list'],
    DETAIL: ['application', 'detail'],
  },
}

export const AUTH_PERSIST_KEY = 'admin-auth'
