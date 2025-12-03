export const ROLE = {
  USER: 'user',
  STAFF: 'staff',
  ADMIN: 'admin',
} as const

export const ROLE_LABEL = {
  admin: '관리자',
  staff: '스태프',
  user: '일반회원',
} as const

export type RoleType = (typeof ROLE)[keyof typeof ROLE]
