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

export const STATUS_STYLE = {
  active: 'bg-[#DCFCE7] text-[#166534]',
  inactive: 'bg-[#F3F4F6] text-[#374151]',
  withdrew: 'bg-[#FEE2E2] text-[#B91C1C]',
} as const
