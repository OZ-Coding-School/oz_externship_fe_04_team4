import type { ApplicationsStatus, SortType } from '@/types'

export type GetRecruitmentTagsQuery = {
  page?: number
  page_size?: number
  search?: string
}

export type GetAdminRecruitmentsQuery = {
  page: number
  page_size: number
  search?: string
  is_closed?: boolean
  tags?: string
  sort?: SortType
}

export type GetAdminApplicationQuery = {
  page: number
  page_size: number
  search?: string
  status?: ApplicationsStatus
  sort?: SortType
}
