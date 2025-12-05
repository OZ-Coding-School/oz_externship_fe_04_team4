export type ApplicationsStatus =
  | 'PENDING'
  | 'ACCEPTED'
  | 'REJECTED'
  | 'CANCELED'

export type TagsType = {
  id: number
  name: string
}

// api/v1/accounts/me
export type AccountsMe = {
  id: number
  email: string
  nickname: string
  name: string
  phone_number: string
  birthday: string
  gender: 'M' | 'F'
  role: 'user' | 'staff' | 'admin'
  profile_img_url: string
  created_at: string
}

// api/v1/admin/accounts
export type AccountListItem = {
  id: number
  email: string
  nickname: string
  name: string
  birthday: string
  status: 'active' | 'inactive' | 'withdrew'
  role: 'user' | 'staff' | 'admin'
  withdraw_at: string | null
  created_at: string
}

export type AccountsList = {
  count: number
  next: string | null
  previous: string | null
  results: AccountListItem[]
}

// api/v1/admin/accounts/{ account_id }
export type AccountsDetail = {
  id: number
  email: string
  nickname: string
  name: string
  gender: 'M' | 'F'
  phone_number: string
  birthday: string
  status: 'active' | 'inactive' | 'withdrew'
  role: 'user' | 'staff' | 'admin'
  profile_img_url: string
  created_at: string
}

// api/v1/admin/withdrawals
export type WithdrawalsListItem = {
  id: number
  email: string
  name: string
  role: 'user' | 'staff' | 'admin'
  birthday: string
  reason:
    | 'NO_LONGER_NEEDED'
    | 'LACK_OF_INTEREST'
    | 'TOO_DIFFICULT'
    | 'FOUND_BETTER_SERVICE'
    | 'PRIVACY_CONCERNS'
    | 'POOR_SERVICE_QUALITY'
    | 'TECHNICAL_ISSUES'
    | 'LACK_OF_CONTENT'
    | 'OTHER'

  withdrawn_at: string
}

export type WithdrawalsList = {
  count: number
  next: string | null
  previous: string | null
  results: WithdrawalsListItem[]
}

// api/v1/admin/withdrawals/{withdrawal_id}

export type WithdrawalsDetail = {
  id: number
  user: {
    id: number
    email: string
    nickname: string
    name: string
    gender: 'M' | 'F'
    role: 'user' | 'staff' | 'admin'
    status: 'active' | 'inactive' | 'withdrew'
    profile_img_url: string
    created_at: string
  }
  reason:
    | 'NO_LONGER_NEEDED'
    | 'LACK_OF_INTEREST'
    | 'TOO_DIFFICULT'
    | 'FOUND_BETTER_SERVICE'
    | 'PRIVACY_CONCERNS'
    | 'POOR_SERVICE_QUALITY'
    | 'TECHNICAL_ISSUES'
    | 'LACK_OF_CONTENT'
    | 'OTHER'
  reason_detail: string
  due_date: string
  withdrawn_at: string
}

export type SignupTrendsItems = {
  period: string
  count: number
}
export type SignupTrends = {
  interval: 'monthly' | 'yearly'
  from_date: string
  to_date: string
  total: number
  items: SignupTrendsItems[]
}

export type WithdrawalsTrendsItems = {
  period: string
  count: number
}
export type WithdrawalsTrends = {
  interval: 'monthly' | 'yearly'
  from_date: string
  to_date: string
  total: number
  items: WithdrawalsTrendsItems[]
}

export type WithdrawalReasonsPercentageItems = {
  reason:
    | 'NO_LONGER_NEEDED'
    | 'LACK_OF_INTEREST'
    | 'TOO_DIFFICULT'
    | 'FOUND_BETTER_SERVICE'
    | 'PRIVACY_CONCERNS'
    | 'POOR_SERVICE_QUALITY'
    | 'TECHNICAL_ISSUES'
    | 'LACK_OF_CONTENT'
    | 'OTHER'
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

export type WithdrawalReasonsStatsMonthlyItem = {
  period: string
  count: number
}
export type WithdrawalReasonsStatsMonthly = {
  reason:
    | 'NO_LONGER_NEEDED'
    | 'LACK_OF_INTEREST'
    | 'TOO_DIFFICULT'
    | 'FOUND_BETTER_SERVICE'
    | 'PRIVACY_CONCERNS'
    | 'POOR_SERVICE_QUALITY'
    | 'TECHNICAL_ISSUES'
    | 'LACK_OF_CONTENT'
    | 'OTHER'

  reason_label: string
  from_date: string
  to_date: string
  total: number
  items: WithdrawalReasonsStatsMonthlyItem[]
}

export type LecturesResults = {
  id: number
  title: string
  instructor: string
  thumbnail_img_url: string
  platform: 'INFLEARN' | 'UDEMY'
  url_link: string
  created_at: string
  updated_at: string
}
export type LectureList = {
  count: number
  next: string | null
  previous: string | null
  results: LecturesResults[]
}

export type LecturesDetailCategory = {
  id: number
  name: string
}
export type LecturesDetail = {
  id: number
  title: string
  instructor: string
  total_class_time: number
  original_price: number
  discounted_price: number
  difficulty: 'EASY' | 'NORMAL' | 'HARD'
  thumbnail_img_url: string
  average_rating: number
  platform: 'INFLEARN' | 'UDEMY'
  url_link: string
  categories: LecturesDetailCategory[]
  created_at: string
  updated_at: string
}

export type StudyGroupListResults = {
  id: number
  name: string
  start_at: string
  end_at: string
  max_headcount: number
  current_headcount: number
  profile_img_url: string
  status: 'PENDING' | 'ONGOING' | 'ENDED'
  created_at: string
  updated_at: string
}
export type StudyGroupList = {
  count: number
  next: string | null
  previous: string | null
  results: StudyGroupListResults[]
}

export type StudyGroupDetailLectures = {
  id: number
  title: string
  instructor: string
  profile_img_url: string
  url_link: string
}
export type StudyGroupDetailMembers = {
  id: number
  nickname: string
  is_leader: boolean
}

export type StudyGroupDetail = {
  id: number
  name: string
  start_at: string
  end_at: string
  max_headcount: number
  current_headcount: number
  profile_img_url: string
  status: 'PENDING' | 'ONGOING' | 'ENDED'
  lectures: StudyGroupDetailLectures[]
  members: StudyGroupDetailMembers[]
  created_at: string
  updated_at: string
  uuid: string
}

export type StudyReviewListResults = {
  id: number
  study_group: {
    id: number
    name: string
  }
  author: {
    id: number
    nickname: string
    email: string
  }
  star_rating: number
  content: string
  created_at: string
  updated_at: string
}
export type StudyReviewList = {
  count: number
  next: string | null
  previous: string | null
  results: StudyReviewListResults[]
}

export type StudyReviewDetail = {
  id: number
  study_group: {
    id: number
    name: string
    start_at: string
    end_at: string
    introduction: string
  }
  author: {
    id: number
    nickname: string
    email: string
  }
  star_rating: number
  content: string
  created_at: string
  updated_at: string
}

// api/v1/admin/recruitments
export type RecruitmentList = {
  count: number
  next: null | string
  previous: null | string
  results: RecruitmentListResults[]
}

export type RecruitmentListResults = {
  id: number
  title: string
  tags: TagsType[]
  close_at: string
  is_closed: boolean
  views_count: number
  bookmark_count: number
  created_at: string
  updated_at: string
}
// api/v1/recruitment-tags
export type RecruitmentTags = {
  count: number
  next: null | string
  previous: null | string
  results: TagsType[]
}

// api/v1/admin/applications
export type ApplicationsList = {
  count: number
  next: string | null
  previous: string | null
  results: ApplicationsListResults[]
}
export type ApplicationsListResults = {
  id: number
  recruitment: {
    id: number
    title: string
  }
  applicant: {
    id: number
    nickname: string
    email: string
  }
  status: ApplicationsStatus
  created_at: string
  updated_at: string
}

// api/v1/admin/recruitments/{recruitment_id}
export type RecruitmentDetail = {
  id: number
  uuid: string
  title: string
  content: string
  thumbnail_img_url: string
  expected_headcount: number
  expected_payment_amount: number
  close_at: string
  is_closed: boolean
  views_count: number
  bookmark_count: number
  created_at: string
  updated_at: string
  lectures: RecruitmentDetailLectures[]
  tags: TagsType[]
  files: RecruitmentDetailFiles[]
  applications: RecruitmentDetailApplications[]
}
export type RecruitmentDetailFiles = {
  id: number
  file_name: string
  file_url: string
}
export type RecruitmentDetailLectures = {
  id: number
  title: string
  instructor: string
  thumbnail_img_url: string
  url_link: string
}
export type RecruitmentDetailApplications = {
  id: number
  applicant: {
    id: number
    nickname: string
    email: string
  }
  status: ApplicationsStatus
  created_at: string
}

export type ApplicationsDetailLectures = {
  id: number
  title: string
  instructor: string
}
export type ApplicationsDetail = {
  id: number
  self_introduction: string
  motivation: string
  objective: string
  available_time: string
  has_study_experience: boolean
  study_experience: string
  status: ApplicationsStatus
  recruitment: {
    id: number
    title: string
    expected_headcount: number
    close_at: string
    lectures: ApplicationsDetailLectures[]
    tags: TagsType[]
  }
  applicant: {
    id: number
    nickname: string
    email: string
    gender: 'M' | 'F'
    profile_img_url: string
  }
  created_at: string
  updated_at: string
}
