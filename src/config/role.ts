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

export const ROLE_STYLE = {
  user: 'bg-[#F3F4F6] text-[#1F2937]',
  staff: 'bg-[#DBEAFE] text-[#1E40AF]',
  admin: 'bg-[#F3E8FF] text-[#6B21A8]',
} as const
