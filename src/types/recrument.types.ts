import type { TagType } from '@/types/api'

export type statusType = 'all' | 'false' | 'true'
export type sortType = 'latest' | 'oldest'

export type GetAdminRecruitmentsParams = {
  page: number
  page_size: number
  search?: string
  status?: statusType
  tags?: TagType[]
  sort?: sortType
}

export type GetAdminApplicationParams = {
  search: string
  page: number
  page_size: number
  status: string
  sort: sortType
}
