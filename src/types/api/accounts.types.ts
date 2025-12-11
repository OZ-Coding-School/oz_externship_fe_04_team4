// api/v1/admin/accounts

import type {
  AccountStatus,
  GenderStatus,
  IntervalStatus,
  ReasonStatus,
  RoleStatus,
} from '@/types/api/common.types'

// api/v1/accounts/me
// 내 정보 조회
export type AccountsMe = {
  id: number
  email: string
  nickname: string
  name: string
  birthday: string
  phone_number: string
  gender: GenderStatus
  role: RoleStatus
  profile_img_url: string
  created_at: string
}

// 유저 목록 조회
export type AccountListItem = {
  id: number
  email: string
  nickname: string
  name: string
  birthday: string
  status: AccountStatus
  role: RoleStatus
  withdraw_at: string | null
  created_at: string
}
export type AccountsList = {
  count: number
  next: string | null
  previous: string | null
  results: AccountListItem[]
}

// api/v1/admin/accounts/{account_id}
// 유저 정보 상세 조회
export type AccountsDetail = {
  id: number
  email: string
  nickname: string
  name: string
  gender: GenderStatus
  phone_number: string
  birthday: string
  status: AccountStatus
  role: RoleStatus
  profile_img_url: string
  created_at: string
}

// api/v1/admin/withdrawals
// 회원 탈퇴 내역 목록 조회
export type WithdrawalsListItem = {
  id: number
  email: string
  name: string
  role: RoleStatus
  birthday: string
  reason: ReasonStatus

  withdrawn_at: string
}
export type WithdrawalsList = {
  count: number
  next: string | null
  previous: string | null
  results: WithdrawalsListItem[]
}

// api/v1/admin/withdrawals/{withdrawal_id}
// 회원 탈퇴 내역 상세 조회
export type WithdrawalsDetail = {
  id: number
  user: {
    id: number
    email: string
    nickname: string
    name: string
    gender: GenderStatus
    role: RoleStatus
    status: AccountStatus
    profile_img_url: string
    created_at: string
  }
  reason: ReasonStatus
  reason_detail: string
  due_date: string
  withdrawn_at: string
}

// api/v1/admin/analytics/signup/trends
// 회원가입 추세 분석
export type SignupTrendsItems = {
  period: string
  count: number
}
export type SignupTrends = {
  interval: IntervalStatus
  from_date: string
  to_date: string
  total: number
  items: SignupTrendsItems[]
}

// api/v1/admin/analytics/withdrawals/trends
// 회원 탈퇴 추세 분석
export type WithdrawalsTrendsItems = {
  period: string
  count: number
}
export type WithdrawalsTrends = {
  interval: IntervalStatus
  from_date: string
  to_date: string
  total: number
  items: WithdrawalsTrendsItems[]
}

// api/v1/admin/analytics/withdrawal-reasons/percentage
// 전체 기간 회원 탈퇴 사유 분석
export type WithdrawalReasonsPercentageItems = {
  reason: ReasonStatus
  reason_label: string
  count: number
  percentage: number
}
export type WithdrawalReasonsPercentage = {
  from_date: string
  to_date: string
  total: number
  items: WithdrawalReasonsPercentageItems[]
}

// api/v1/admin/analytics/withdrawal-reasons/stats/monthly
// 어드민 페이지 월별 회원 탈퇴 사유 분석 API
export type WithdrawalReasonsStatsMonthlyItem = {
  period: string
  count: number
}
export type WithdrawalReasonsStatsMonthly = {
  reason: ReasonStatus

  reason_label: string
  from_date: string
  to_date: string
  total: number
  items: WithdrawalReasonsStatsMonthlyItem[]
}
