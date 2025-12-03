export const STATUS = {
  active: 'active',
  inactive: 'inactive',
  withdrew: 'withdrew',
} as const

export const STATUS_LABEL = {
  active: '활성',
  inactive: '비활성',
  withdrew: '탈퇴요청',
} as const

export type StatusType = (typeof STATUS)[keyof typeof STATUS]
