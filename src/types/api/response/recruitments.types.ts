import type {
  ApplicationsStatus,
  GenderStatus,
  TagType,
} from '@/types/common.types'

// api/v1/recruitment-tags
// 태그 목록 조회
export type GetRecruitmentTagsResponse = {
  count: number
  next: null | string
  previous: null | string
  results: TagType[]
}

// api/v1/admin/recruitments
// 스터디 모집 공고 목록 조회
export type RecruitmentListResults = {
  id: number
  title: string
  close_at: string
  is_closed: boolean
  views_count: number
  bookmark_count: number
  tags: TagType[]
  created_at: string
  updated_at: string
}

export type GetRecruitmentListResponse = {
  count: number
  next: null | string
  previous: null | string
  results: RecruitmentListResults[]
}

// api/v1/admin/recruitments/{recruitment_id}
// 스터디 모집 공고 상세 조회
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
export type GetRecruitmentDetailResponse = {
  id: number
  uuid: string
  title: string
  content: string
  expected_headcount: number
  estimated_fee: number
  close_at: string
  is_closed: boolean
  views_count: number
  bookmark_count: number
  created_at: string
  updated_at: string
  lectures: RecruitmentDetailLectures[]
  tags: TagType[]
  files: RecruitmentDetailFiles[]
  applications: RecruitmentDetailApplications[]
}

// api/v1/admin/applications
// 모집공고 지원 내역 목록 조회
export type ApplicationRecruitment = {
  id: number
  uuid?: string
  title: string
}
export type ApplicationApplicant = {
  id: number
  nickname: string
  email: string
}
export type ApplicationsListResults = {
  id: number
  uuid?: string
  recruitment: ApplicationRecruitment
  applicant: ApplicationApplicant
  status: ApplicationsStatus
  created_at: string
  updated_at: string
}
export type GetApplicationsListResponse = {
  count: number
  next: string | null
  previous: string | null
  results: ApplicationsListResults[]
}

// api/v1/admin/applications/{application_id}
// 지원 내역 상세 조회
export type ApplicationsDetailLectures = {
  id: number
  title: string
  instructor: string
}

export type GetApplicationsDetailResponse = {
  id: number
  uuid?: string
  self_introduction: string
  motivation: string
  objective: string
  available_time: string
  has_study_experience: boolean
  status: ApplicationsStatus
  study_experience: string
  recruitment: {
    id: number
    title: string
    expected_headcount: number
    close_at: string
    lectures: ApplicationsDetailLectures[]
    tags: TagType[]
  }
  applicant: {
    id: number
    nickname: string
    email: string
    gender: GenderStatus
    profile_img_url: string
  }
  created_at: string
  updated_at: string
}
