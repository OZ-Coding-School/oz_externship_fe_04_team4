import type { ApplicationsStatus, SortType, StatusType, TagType } from '@/types'

export type GetRecruitmentTagsQuery = {
  page?: number
  pageSize?: number
  search?: string
}

export type GetAdminRecruitmentsQuery = {
  page: number
  page_size: number
  search?: string
  status?: StatusType
  tags?: TagType[]
  sort?: SortType
}

export type GetAdminApplicationQuery = {
  page: number
  page_size: number
  search?: string
  status?: ApplicationsStatus
  sort?: SortType
}
