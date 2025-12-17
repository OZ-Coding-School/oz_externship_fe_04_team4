export type RoleStatus = 'user' | 'staff' | 'admin'

export type AccountStatus = 'active' | 'inactive'
export type ReasonStatus =
  | 'NO_LONGER_NEEDED'
  | 'LACK_OF_INTEREST'
  | 'TOO_DIFFICULT'
  | 'FOUND_BETTER_SERVICE'
  | 'PRIVACY_CONCERNS'
  | 'POOR_SERVICE_QUALITY'
  | 'TECHNICAL_ISSUES'
  | 'LACK_OF_CONTENT'
  | 'OTHER'

export type IntervalStatus = 'monthly' | 'yearly'

export type PlatformStatus = 'INFLEARN' | 'UDEMY'

export type DifficultyStatus = 'EASY' | 'NORMAL' | 'HARD'

export type Status = 'PENDING' | 'ONGOING' | 'ENDED'

export type ApplicationsStatus =
  | 'PENDING'
  | 'ACCEPTED'
  | 'REJECTED'
  | 'CANCELED'

export type GenderStatus = 'M' | 'F'

export type TagType = {
  id: number
  name: string
}

export type SortType = 'latest' | 'oldest'

export type IsClosedType = 'all' | 'false' | 'true'
