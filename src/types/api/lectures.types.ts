// api/v1/admin/lectures

import type {
  DifficultyStatus,
  PlatformStatus,
  Status,
} from '@/types/api/common.types'

// 어드민 페이지 강의 목록 조회 API
export type LecturesResults = {
  id: number
  title: string
  instructor: string
  thumbnail_img_url: string
  platform: PlatformStatus
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

// api/v1/admin/lectures/{lecture_id}
// 강의 상세 조회 - 전체 강의 상세 맵
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
  difficulty: DifficultyStatus
  thumbnail_img_url: string
  average_rating: number
  platform: PlatformStatus
  url_link: string
  categories: LecturesDetailCategory[]
  created_at: string
  updated_at: string
}

// api/v1/admin/study-groups
// 스터디 그룹 목록 조회
export type StudyGroupListResults = {
  id: number
  name: string
  start_at: string
  end_at: string
  max_headcount: number
  current_headcount: number
  profile_img_url: string
  status: Status
  created_at: string
  updated_at: string
}
export type StudyGroupList = {
  count: number
  next: string | null
  previous: string | null
  results: StudyGroupListResults[]
}

// api/v1/admin/study-groups/{group_id}
// 스터디 그룹 상세 조회
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
  status: Status
  lectures: StudyGroupDetailLectures[]
  members: StudyGroupDetailMembers[]
  created_at: string
  updated_at: string
  uuid: string
}

// api/v1/admin/study-reviews
// 스터디 리뷰 목록 조회
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

// api/v1/admin/study-reviews/{review_id}
// 스터디 리뷰 상세보기
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
