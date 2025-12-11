import type { TagType } from '@/types/api'

export type statusType = 'all' | 'false' | 'true'

export type GetAdminRecruitmentsParams = {
  page: number
  page_size: number
  search?: string
  status?: 'all' | 'true' | 'false' | string
  tags?: TagType[]
  sort?: string
}

export type GetAdminApplicationParams = {
  search: string
  page: number
  page_size: number
  status: string
  sort: string
}
