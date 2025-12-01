import { http, HttpResponse } from 'msw'

import { ADMIN_API_PREFIX, API_V1_PREFIX, BASE_URL } from '@/config/api'
import {
  mockAccountDetailMap,
  mockAccountsList,
  mockApplicationsDetail,
  mockApplicationsList,
  mockLecturesDetailMap,
  mockLecturesList,
  mockRecruitmentDetail,
  mockRecruitmentList,
  mockRecruitmentTags,
  mockSignupTrendsMonthly,
  mockSignupTrendsYearly,
  mockStudyGroupDetail,
  mockStudyGroupList,
  mockStudyReviewDetail,
  mockStudyReviewList,
  mockWithdrawalReasonsPercentage,
  mockWithdrawalReasonsStatsMonthlyMap,
  mockWithdrawalsDetailMap,
  mockWithdrawalsList,
  mockWithdrawalsTrendsMonthly,
  mockWithdrawalsTrendsYearly,
  type WithdrawalReason,
} from '@/mocks/data/accounts'
import type { RecruitmentTags } from '@/mocks/types/accounts'

/**
 * 공통 admin 인증 체크
 * - Authorization 헤더 없으면: 401
 * - Authorization !== 'Bearer token_value' 이면: 403
 */
const requireAdminAuth = (
  request: Request
): { status: 401 | 403; body: { error_detail: string } } | null => {
  const auth = request.headers.get('Authorization')

  if (!auth) {
    return {
      status: 401,
      body: {
        error_detail: '자격 인증 데이터가 제공되지 않았습니다.',
      },
    }
  }

  if (auth !== 'Bearer token_value') {
    return {
      status: 403,
      body: {
        error_detail: '권한이 없습니다.',
      },
    }
  }

  return null
}

const parsePagination = (request: Request) => {
  const url = new URL(request.url)
  const pageParam = url.searchParams.get('page')
  const pageSizeParam = url.searchParams.get('page_size')

  const page = pageParam ? Number(pageParam) || 1 : 1
  const pageSize = pageSizeParam ? Number(pageSizeParam) || 10 : 10

  return { page, pageSize }
}

const paginate = <T>(items: T[], page: number, pageSize: number) => {
  const total = items.length
  const start = (page - 1) * pageSize
  const end = start + pageSize

  return {
    total,
    pageItems: items.slice(start, end),
    hasNext: end < total,
    hasPrev: page > 1,
  }
}

/* -------------------------------------------------------------------------- */
/* 1. Accounts (회원)                                                         */
/* -------------------------------------------------------------------------- */

// GET /api/v1/admin/accounts - 회원 목록 조회
export const getAdminAccountsHandler = http.get(
  `${ADMIN_API_PREFIX}/accounts`,
  ({ request }) => {
    const authError = requireAdminAuth(request)
    if (authError) {
      return HttpResponse.json(authError.body, { status: authError.status })
    }

    const { page, pageSize } = parsePagination(request)
    const baseItems = mockAccountsList.results
    const { total, pageItems, hasNext, hasPrev } = paginate(
      baseItems,
      page,
      pageSize
    )

    const next = hasNext
      ? `${BASE_URL}${ADMIN_API_PREFIX}/accounts?page=${page + 1}&page_size=${pageSize}`
      : null
    const previous = hasPrev
      ? `${BASE_URL}${ADMIN_API_PREFIX}/accounts?page=${page - 1}&page_size=${pageSize}`
      : null

    return HttpResponse.json(
      {
        ...mockAccountsList,
        count: total,
        next,
        previous,
        results: pageItems,
      },
      { status: 200 }
    )
  }
)

// GET /api/v1/admin/accounts/{account_id} - 회원 상세 조회
export const getAdminAccountDetailHandler = http.get(
  `${ADMIN_API_PREFIX}/accounts/:account_id`,
  ({ request, params }) => {
    const authError = requireAdminAuth(request)
    if (authError) {
      return HttpResponse.json(authError.body, { status: authError.status })
    }

    const { account_id } = params as { account_id?: string }
    const id = Number(account_id)

    if (!account_id || Number.isNaN(id)) {
      return HttpResponse.json(
        { error_detail: '사용자 정보를 찾을 수 없습니다.' },
        { status: 404 }
      )
    }

    const detail = mockAccountDetailMap[id]

    if (!detail) {
      return HttpResponse.json(
        { error_detail: '사용자 정보를 찾을 수 없습니다.' },
        { status: 404 }
      )
    }

    return HttpResponse.json(detail, { status: 200 })
  }
)

// PATCH /api/v1/admin/accounts/{account_id} - 회원 정보 수정
export const patchAdminAccountHandler = http.patch(
  `${ADMIN_API_PREFIX}/accounts/:account_id`,
  async ({ request, params }) => {
    const authError = requireAdminAuth(request)
    if (authError) {
      return HttpResponse.json(authError.body, { status: authError.status })
    }

    const { account_id } = params as { account_id?: string }
    const id = Number(account_id)

    if (!account_id || Number.isNaN(id)) {
      return HttpResponse.json(
        { error_detail: '사용자 정보를 찾을 수 없습니다.' },
        { status: 404 }
      )
    }

    const current = mockAccountDetailMap[id]

    if (!current) {
      return HttpResponse.json(
        { error_detail: '사용자 정보를 찾을 수 없습니다.' },
        { status: 404 }
      )
    }

    const body = (await request.json()) as Record<string, unknown>

    const updated = {
      ...current,
      ...body,
    }

    // 메모리 상의 더미 데이터도 함께 갱신
    mockAccountDetailMap[id] = updated

    return HttpResponse.json(updated, { status: 200 })
  }
)

// DELETE /api/v1/admin/accounts/{account_id} - 회원 삭제
export const deleteAdminAccountHandler = http.delete(
  `${ADMIN_API_PREFIX}/accounts/:account_id`,
  ({ request, params }) => {
    const authError = requireAdminAuth(request)
    if (authError) {
      return HttpResponse.json(authError.body, { status: authError.status })
    }

    const { account_id } = params as { account_id?: string }
    const id = Number(account_id)

    if (!account_id || Number.isNaN(id)) {
      return HttpResponse.json(
        { error_detail: '사용자 정보를 찾을 수 없습니다.' },
        { status: 404 }
      )
    }

    return HttpResponse.json(
      { detail: `유저 데이터가 삭제되었습니다. - pk: ${id}` },
      { status: 200 }
    )
  }
)

// PATCH /api/v1/admin/accounts/{account_id}/role - 회원 권한 변경
export const patchAdminAccountRoleHandler = http.patch(
  `${ADMIN_API_PREFIX}/accounts/:account_id/role`,
  async ({ request }) => {
    const authError = requireAdminAuth(request)
    if (authError) {
      return HttpResponse.json(authError.body, { status: authError.status })
    }

    const body = (await request.json()) as { role?: string }

    return HttpResponse.json(
      {
        detail: '권한이 변경되었습니다.',
        role: body.role,
      },
      { status: 200 }
    )
  }
)

// POST /api/v1/admin/accounts/{account_id}/activate - 탈퇴 회원 복구
export const postAdminAccountActivateHandler = http.post(
  `${ADMIN_API_PREFIX}/accounts/:account_id/activate`,
  ({ request, params }) => {
    const authError = requireAdminAuth(request)
    if (authError) {
      return HttpResponse.json(authError.body, { status: authError.status })
    }

    const { account_id } = params as { account_id?: string }
    const id = Number(account_id)

    if (!account_id || Number.isNaN(id)) {
      return HttpResponse.json(
        { error_detail: '사용자 정보를 찾을 수 없습니다.' },
        { status: 404 }
      )
    }

    return HttpResponse.json(
      { detail: `해당 계정이 활성화 되었습니다. - pk: ${id}` },
      { status: 200 }
    )
  }
)

// POST /api/v1/admin/accounts/{account_id}/deactivate - 회원 비활성화
export const postAdminAccountDeactivateHandler = http.post(
  `${ADMIN_API_PREFIX}/accounts/:account_id/deactivate`,
  ({ request, params }) => {
    const authError = requireAdminAuth(request)
    if (authError) {
      return HttpResponse.json(authError.body, { status: authError.status })
    }

    const { account_id } = params as { account_id?: string }
    const id = Number(account_id)

    if (!account_id || Number.isNaN(id)) {
      return HttpResponse.json(
        { error_detail: '사용자 정보를 찾을 수 없습니다.' },
        { status: 404 }
      )
    }

    return HttpResponse.json(
      { detail: `해당 계정이 비활성화 되었습니다. - pk: ${id}` },
      { status: 200 }
    )
  }
)

/* -------------------------------------------------------------------------- */
/* 2. Withdrawals (탈퇴 내역)                                                 */
/* -------------------------------------------------------------------------- */

// GET /api/v1/admin/withdrawals - 탈퇴 내역 목록
export const getAdminWithdrawalsHandler = http.get(
  `${ADMIN_API_PREFIX}/withdrawals`,
  ({ request }) => {
    const authError = requireAdminAuth(request)
    if (authError) {
      return HttpResponse.json(authError.body, { status: authError.status })
    }

    const { page, pageSize } = parsePagination(request)
    const baseItems = mockWithdrawalsList.results
    const { total, pageItems, hasNext, hasPrev } = paginate(
      baseItems,
      page,
      pageSize
    )

    const next = hasNext
      ? `${BASE_URL}${ADMIN_API_PREFIX}/withdrawals?page=${page + 1}&page_size=${pageSize}`
      : null
    const previous = hasPrev
      ? `${BASE_URL}${ADMIN_API_PREFIX}/withdrawals?page=${page - 1}&page_size=${pageSize}`
      : null

    return HttpResponse.json(
      {
        ...mockWithdrawalsList,
        count: total,
        next,
        previous,
        results: pageItems,
      },
      { status: 200 }
    )
  }
)

// GET /api/v1/admin/withdrawals/{withdrawal_id} - 탈퇴 내역 상세
export const getAdminWithdrawalDetailHandler = http.get(
  `${ADMIN_API_PREFIX}/withdrawals/:withdrawal_id`,
  ({ request, params }) => {
    const authError = requireAdminAuth(request)
    if (authError) {
      return HttpResponse.json(authError.body, { status: authError.status })
    }

    const { withdrawal_id } = params as { withdrawal_id?: string }
    const id = Number(withdrawal_id)

    // 1) 파라미터 자체가 잘못된 경우
    if (!withdrawal_id || Number.isNaN(id)) {
      return HttpResponse.json(
        { error_detail: '회원탈퇴 정보를 찾을 수 없습니다.' },
        { status: 404 }
      )
    }

    // 2) 더미 데이터 맵에서 해당 id 찾기
    const detail = mockWithdrawalsDetailMap[id]

    if (!detail) {
      return HttpResponse.json(
        { error_detail: '회원탈퇴 정보를 찾을 수 없습니다.' },
        { status: 404 }
      )
    }

    // 3) 정상 응답
    return HttpResponse.json(detail, { status: 200 })
  }
)

/* -------------------------------------------------------------------------- */
/* 3. Analytics (가입/탈퇴 분석)                                              */
/* -------------------------------------------------------------------------- */

// GET /api/v1/admin/analytics/signup/trends - 회원가입 추세 분석
export const getAdminSignupTrendsHandler = http.get(
  `${ADMIN_API_PREFIX}/analytics/signup/trends`,
  ({ request }) => {
    const authError = requireAdminAuth(request)
    if (authError) {
      return HttpResponse.json(authError.body, { status: authError.status })
    }
    const url = new URL(request.url)
    const raw = url.searchParams.get('interval')

    let interval: 'monthly' | 'yearly' = 'monthly'
    if (raw === 'yearly') interval = 'yearly'

    return HttpResponse.json(
      interval === 'yearly' ? mockSignupTrendsYearly : mockSignupTrendsMonthly,
      { status: 200 }
    )
  }
)

// GET /api/v1/admin/analytics/withdrawals/trends - 회원탈퇴 추세 분석
export const getAdminWithdrawalsTrendsHandler = http.get(
  `${ADMIN_API_PREFIX}/analytics/withdrawals/trends`,
  ({ request }) => {
    const authError = requireAdminAuth(request)
    if (authError) {
      return HttpResponse.json(authError.body, { status: authError.status })
    }

    const url = new URL(request.url)
    const raw = url.searchParams.get('interval')

    let interval: 'monthly' | 'yearly' = 'monthly'
    if (raw === 'yearly') interval = 'yearly'

    return HttpResponse.json(
      interval === 'yearly'
        ? mockWithdrawalsTrendsYearly
        : mockWithdrawalsTrendsMonthly,
      { status: 200 }
    )
  }
)

// GET /api/v1/admin/analytics/withdrawal-reasons/percentage
export const getAdminWithdrawalReasonsPercentageHandler = http.get(
  `${ADMIN_API_PREFIX}/analytics/withdrawal-reasons/percentage`,
  ({ request }) => {
    const authError = requireAdminAuth(request)
    if (authError) {
      return HttpResponse.json(authError.body, { status: authError.status })
    }

    return HttpResponse.json(mockWithdrawalReasonsPercentage, { status: 200 })
  }
)

// GET /api/v1/admin/analytics/withdrawal-reasons/stats/monthly
export const getAdminWithdrawalReasonsStatsMonthlyHandler = http.get(
  `${ADMIN_API_PREFIX}/analytics/withdrawal-reasons/stats/monthly`,
  ({ request }) => {
    const authError = requireAdminAuth(request)
    if (authError) {
      return HttpResponse.json(authError.body, { status: authError.status })
    }

    const url = new URL(request.url)
    const raw = url.searchParams.get('reason')

    // reason 변수 선언 + 기본값
    let reason: WithdrawalReason = 'OTHER'

    // valid reasons 목록 (map 기반)
    const validReasons: WithdrawalReason[] = Object.keys(
      mockWithdrawalReasonsStatsMonthlyMap
    ) as WithdrawalReason[]

    // raw가 유효한 reason이면 교체
    if (raw && validReasons.includes(raw as WithdrawalReason)) {
      reason = raw as WithdrawalReason
    }

    // 타입 안전하게 매핑
    const data = mockWithdrawalReasonsStatsMonthlyMap[reason]

    return HttpResponse.json(data, { status: 200 })
  }
)

/* -------------------------------------------------------------------------- */
/* 4. Lectures (강의)                                                         */
/* -------------------------------------------------------------------------- */

// GET /api/v1/admin/lectures - 강의 목록
export const getAdminLecturesHandler = http.get(
  `${ADMIN_API_PREFIX}/lectures`,
  ({ request }) => {
    const authError = requireAdminAuth(request)
    if (authError) {
      return HttpResponse.json(authError.body, { status: authError.status })
    }

    const { page, pageSize } = parsePagination(request)
    const baseItems = mockLecturesList.results
    const { total, pageItems, hasNext, hasPrev } = paginate(
      baseItems,
      page,
      pageSize
    )

    const next = hasNext
      ? `${BASE_URL}${ADMIN_API_PREFIX}/lectures?page=${page + 1}&page_size=${pageSize}`
      : null
    const previous = hasPrev
      ? `${BASE_URL}${ADMIN_API_PREFIX}/lectures?page=${page - 1}&page_size=${pageSize}`
      : null

    return HttpResponse.json(
      {
        ...mockLecturesList,
        count: total,
        next,
        previous,
        results: pageItems,
      },
      { status: 200 }
    )
  }
)

// GET /api/v1/admin/lectures/{lecture_id} - 강의 상세
export const getAdminLectureDetailHandler = http.get(
  `${ADMIN_API_PREFIX}/lectures/:lecture_id`,
  ({ request, params }) => {
    const authError = requireAdminAuth(request)
    if (authError) {
      return HttpResponse.json(authError.body, { status: authError.status })
    }

    const { lecture_id } = params as { lecture_id?: string }
    const id = Number(lecture_id)

    // 1) 파라미터가 없거나 숫자로 변환 불가한 경우
    if (!lecture_id || Number.isNaN(id)) {
      return HttpResponse.json(
        { error_detail: '강의 정보를 찾을 수 없습니다.' },
        { status: 404 }
      )
    }

    // 2) 더미 상세 맵에서 해당 id 조회
    const detail = mockLecturesDetailMap[id]

    if (!detail) {
      return HttpResponse.json(
        { error_detail: '강의 정보를 찾을 수 없습니다.' },
        { status: 404 }
      )
    }

    // 3) 정상 응답
    return HttpResponse.json(detail, { status: 200 })
  }
)

/* -------------------------------------------------------------------------- */
/* 5. Study Groups & Reviews                                                  */
/* -------------------------------------------------------------------------- */

// GET /api/v1/admin/study-groups - 스터디 그룹 목록
export const getAdminStudyGroupsHandler = http.get(
  `${ADMIN_API_PREFIX}/study-groups`,
  ({ request }) => {
    const authError = requireAdminAuth(request)
    if (authError) {
      return HttpResponse.json(authError.body, { status: authError.status })
    }

    const { page, pageSize } = parsePagination(request)
    const baseItems = mockStudyGroupList.results
    const { total, pageItems, hasNext, hasPrev } = paginate(
      baseItems,
      page,
      pageSize
    )

    const next = hasNext
      ? `${BASE_URL}${ADMIN_API_PREFIX}/study-groups?page=${page + 1}&page_size=${pageSize}`
      : null
    const previous = hasPrev
      ? `${BASE_URL}${ADMIN_API_PREFIX}/study-groups?page=${page - 1}&page_size=${pageSize}`
      : null

    return HttpResponse.json(
      {
        ...mockStudyGroupList,
        count: total,
        next,
        previous,
        results: pageItems,
      },
      { status: 200 }
    )
  }
)

// GET /api/v1/admin/study-groups/{group_id} - 스터디 그룹 상세
export const getAdminStudyGroupDetailHandler = http.get(
  `${ADMIN_API_PREFIX}/study-groups/:group_id`,
  ({ request, params }) => {
    const authError = requireAdminAuth(request)
    if (authError) {
      return HttpResponse.json(authError.body, { status: authError.status })
    }

    const { group_id } = params as { group_id?: string }
    const id = Number(group_id)

    if (!group_id || Number.isNaN(id) || id !== mockStudyGroupDetail.id) {
      return HttpResponse.json(
        { error_detail: '스터디 그룹을 찾을 수 없습니다.' },
        { status: 404 }
      )
    }

    return HttpResponse.json(mockStudyGroupDetail, { status: 200 })
  }
)

// GET /api/v1/admin/study-reviews - 스터디 리뷰 목록
export const getAdminStudyReviewsHandler = http.get(
  `${ADMIN_API_PREFIX}/study-reviews`,
  ({ request }) => {
    const authError = requireAdminAuth(request)
    if (authError) {
      return HttpResponse.json(authError.body, { status: authError.status })
    }

    const { page, pageSize } = parsePagination(request)
    const baseItems = mockStudyReviewList.results
    const { total, pageItems, hasNext, hasPrev } = paginate(
      baseItems,
      page,
      pageSize
    )

    const next = hasNext
      ? `${BASE_URL}${ADMIN_API_PREFIX}/study-reviews?page=${page + 1}&page_size=${pageSize}`
      : null
    const previous = hasPrev
      ? `${BASE_URL}${ADMIN_API_PREFIX}/study-reviews?page=${page - 1}&page_size=${pageSize}`
      : null

    return HttpResponse.json(
      {
        ...mockStudyReviewList,
        count: total,
        next,
        previous,
        results: pageItems,
      },
      { status: 200 }
    )
  }
)

// GET /api/v1/admin/study-reviews/{review_id} - 스터디 리뷰 상세
export const getAdminStudyReviewDetailHandler = http.get(
  `${ADMIN_API_PREFIX}/study-reviews/:review_id`,
  ({ request, params }) => {
    const authError = requireAdminAuth(request)
    if (authError) {
      return HttpResponse.json(authError.body, { status: authError.status })
    }

    const { review_id } = params as { review_id?: string }
    const id = Number(review_id)

    if (!review_id || Number.isNaN(id) || id !== mockStudyReviewDetail.id) {
      return HttpResponse.json(
        { error_detail: '스터디 리뷰를 찾을 수 없습니다.' },
        { status: 404 }
      )
    }

    return HttpResponse.json(mockStudyReviewDetail, { status: 200 })
  }
)

/* -------------------------------------------------------------------------- */
/* 6. Recruitments (모집 공고)                                                */
/* -------------------------------------------------------------------------- */

// GET /api/v1/recruitment-tags - 태그 목록 조회
export const getRecruitmentTagsHandler = http.get(
  `${BASE_URL}${API_V1_PREFIX}/recruitment-tags`,
  ({ request }) => {
    const url = new URL(request.url)

    const pageParam = url.searchParams.get('page')
    const pageSizeParam = url.searchParams.get('page_size')
    const searchParam = url.searchParams.get('search')

    const page =
      !pageParam || Number.isNaN(Number(pageParam)) ? 1 : Number(pageParam)
    const pageSize =
      !pageSizeParam || Number.isNaN(Number(pageSizeParam))
        ? 10
        : Number(pageSizeParam)
    const search = searchParam?.trim().toLowerCase() ?? ''

    const allTags = mockRecruitmentTags.results

    // search: name 부분 일치
    const filteredTags = search
      ? allTags.filter((tag) =>
          tag.name.toLowerCase().includes(search.toLowerCase())
        )
      : allTags

    const start = (page - 1) * pageSize
    const end = start + pageSize
    const paginatedTags = filteredTags.slice(start, end)

    const baseUrl = `${BASE_URL}${API_V1_PREFIX}/recruitment-tags`
    const buildUrl = (p: number) =>
      `${baseUrl}?page=${p}&page_size=${pageSize}${
        search ? `&search=${encodeURIComponent(search)}` : ''
      }`

    const responseBody: RecruitmentTags = {
      count: filteredTags.length,
      next: end < filteredTags.length ? buildUrl(page + 1) : null,
      previous: page > 1 ? buildUrl(page - 1) : null,
      results: paginatedTags,
    }

    return HttpResponse.json(responseBody)
  }
)

// GET /api/v1/admin/recruitments - 모집 공고 목록
export const getAdminRecruitmentsHandler = http.get(
  `${ADMIN_API_PREFIX}/recruitments`,
  ({ request }) => {
    const authError = requireAdminAuth(request)
    if (authError) {
      return HttpResponse.json(authError.body, { status: authError.status })
    }

    const { page, pageSize } = parsePagination(request)
    const baseItems = mockRecruitmentList.results
    const { total, pageItems, hasNext, hasPrev } = paginate(
      baseItems,
      page,
      pageSize
    )

    const next = hasNext
      ? `${BASE_URL}${ADMIN_API_PREFIX}/recruitments?page=${page + 1}&page_size=${pageSize}`
      : null
    const previous = hasPrev
      ? `${BASE_URL}${ADMIN_API_PREFIX}/recruitments?page=${page - 1}&page_size=${pageSize}`
      : null

    return HttpResponse.json(
      {
        ...mockRecruitmentList,
        count: total,
        next,
        previous,
        results: pageItems,
      },
      { status: 200 }
    )
  }
)

// GET /api/v1/admin/recruitments/{recruitment_id} - 모집 공고 상세
export const getAdminRecruitmentDetailHandler = http.get(
  `${ADMIN_API_PREFIX}/recruitments/:recruitment_id`,
  ({ request, params }) => {
    const authError = requireAdminAuth(request)
    if (authError) {
      return HttpResponse.json(authError.body, { status: authError.status })
    }

    const { recruitment_id } = params as { recruitment_id?: string }
    const id = Number(recruitment_id)

    if (
      !recruitment_id ||
      Number.isNaN(id) ||
      id !== mockRecruitmentDetail.id
    ) {
      return HttpResponse.json(
        { error_detail: '해당 공고를 찾을 수 없습니다.' },
        { status: 404 }
      )
    }

    return HttpResponse.json(mockRecruitmentDetail, { status: 200 })
  }
)

// DELETE /api/v1/admin/recruitments/{recruitment_id} - 모집 공고 삭제
export const deleteAdminRecruitmentHandler = http.delete(
  `${ADMIN_API_PREFIX}/recruitments/:recruitment_id`,
  ({ request, params }) => {
    const authError = requireAdminAuth(request)
    if (authError) {
      return HttpResponse.json(authError.body, { status: authError.status })
    }

    const { recruitment_id } = params as { recruitment_id?: string }
    const id = Number(recruitment_id)

    if (!recruitment_id || Number.isNaN(id)) {
      return HttpResponse.json(
        { error_detail: '해당 공고를 찾을 수 없습니다.' },
        { status: 404 }
      )
    }

    return HttpResponse.json(
      { detail: '공고가 삭제되었습니다.' },
      { status: 200 }
    )
  }
)

/* -------------------------------------------------------------------------- */
/* 7. Applications (지원 내역)                                                */
/* -------------------------------------------------------------------------- */

// GET /api/v1/admin/applications - 지원 내역 목록
export const getAdminApplicationsHandler = http.get(
  `${ADMIN_API_PREFIX}/applications`,
  ({ request }) => {
    const authError = requireAdminAuth(request)
    if (authError) {
      return HttpResponse.json(authError.body, { status: authError.status })
    }

    const { page, pageSize } = parsePagination(request)
    const baseItems = mockApplicationsList.results
    const { total, pageItems, hasNext, hasPrev } = paginate(
      baseItems,
      page,
      pageSize
    )

    const next = hasNext
      ? `${BASE_URL}${ADMIN_API_PREFIX}/applications?page=${page + 1}&page_size=${pageSize}`
      : null
    const previous = hasPrev
      ? `${BASE_URL}${ADMIN_API_PREFIX}/applications?page=${page - 1}&page_size=${pageSize}`
      : null

    return HttpResponse.json(
      {
        ...mockApplicationsList,
        count: total,
        next,
        previous,
        results: pageItems,
      },
      { status: 200 }
    )
  }
)

// GET /api/v1/admin/applications/{application_id} - 지원 내역 상세
export const getAdminApplicationDetailHandler = http.get(
  `${ADMIN_API_PREFIX}/applications/:application_id`,
  ({ request, params }) => {
    const authError = requireAdminAuth(request)
    if (authError) {
      return HttpResponse.json(authError.body, { status: authError.status })
    }

    const { application_id } = params as { application_id?: string }
    const id = Number(application_id)

    if (
      !application_id ||
      Number.isNaN(id) ||
      id !== mockApplicationsDetail.id
    ) {
      return HttpResponse.json(
        { error_detail: '해당 지원내역을 찾을 수 없습니다.' },
        { status: 404 }
      )
    }

    return HttpResponse.json(mockApplicationsDetail, { status: 200 })
  }
)

/* -------------------------------------------------------------------------- */
/* 전체 admin 핸들러 모음                                                    */
/* -------------------------------------------------------------------------- */

export const adminHandlers = [
  // accounts
  getAdminAccountsHandler,
  getAdminAccountDetailHandler,
  patchAdminAccountHandler,
  deleteAdminAccountHandler,
  patchAdminAccountRoleHandler,
  postAdminAccountActivateHandler,
  postAdminAccountDeactivateHandler,

  // withdrawals & analytics
  getAdminWithdrawalsHandler,
  getAdminWithdrawalDetailHandler,
  getAdminSignupTrendsHandler,
  getAdminWithdrawalsTrendsHandler,
  getAdminWithdrawalReasonsPercentageHandler,
  getAdminWithdrawalReasonsStatsMonthlyHandler,

  // lectures
  getAdminLecturesHandler,
  getAdminLectureDetailHandler,

  // study-groups & reviews
  getAdminStudyGroupsHandler,
  getAdminStudyGroupDetailHandler,
  getAdminStudyReviewsHandler,
  getAdminStudyReviewDetailHandler,

  // recruitments
  getRecruitmentTagsHandler,
  getAdminRecruitmentsHandler,
  getAdminRecruitmentDetailHandler,
  deleteAdminRecruitmentHandler,

  // applications
  getAdminApplicationsHandler,
  getAdminApplicationDetailHandler,
]
