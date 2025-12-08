import type { ReactNode } from 'react'

export interface filtersProps {
  search: string
  page: number
  status: string
  sort: string
}

export interface WithDrawDetailInfo {
  id: number | string
  email: string
  nickname: string
  name: string
  gender: string
  role: string
  status: string
  profile_img_url: string
  created_at: string
  birthday: string
  phone_number: string
}

export interface WithDrawDetailInfoUser {
  id: number | string
  email: string
  nickname: string
  name: string
  gender: string
  role: string
  status: string
  profile_img_url: string
  created_at: string
}

export interface WithDrawDetailInfo {
  id: number | string
  user: WithDrawDetailInfoUser
  reason: string
  reason_detail: string
  due_date: string
  withdrawn_at: string
}

export interface WithDrawDetailModalProps {
  isOpen: boolean
  onClose: () => void
  userId: number | null
  footer?: ReactNode
}
