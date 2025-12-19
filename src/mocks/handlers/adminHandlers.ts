import { http, HttpResponse } from 'msw'

import { ADMIN_API_URL, API_URL } from '@/config'
import {
  mockAccountDetailMap,
  mockAccountsList,
  mockAccountsMe,
  mockApplicationsDetailMap,
  mockApplicationsList,
  mockLecturesDetailMap,
  mockLecturesList,
  mockRecruitmentDetailMap,
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
} from '@/mocks/data/mocksData'
import { parseRequestBody } from '@/mocks/handlers/parseRequestBody'
import type { ReasonStatus, RoleStatus } from '@/types'
import type { GetRecruitmentTagsResponse } from '@/types/api/response'

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

// api/v1/accounts/me
// 내 정보 조회
export const getAccountsMeHandler = http.get(
  `${API_URL}/accounts/me`,
  ({ request }) => {
    const authorization = request.headers.get('Authorization')

    // Authorization 헤더 없으면 401
    if (!authorization || !authorization.startsWith('Bearer ')) {
      return HttpResponse.json(
        { error_detail: '자격 인증 데이터가 제공되지 않았습니다.' },
        { status: 401 }
      )
    }

    return HttpResponse.json(mockAccountsMe, { status: 200 })
  }
)

/* -------------------------------------------------------------------------- */
/* 1. Accounts (회원)                                                         */
/* -------------------------------------------------------------------------- */

// GET /api/v1/admin/accounts - 회원 목록 조회
export const getAdminAccountsHandler = http.get(
  `${ADMIN_API_URL}/accounts`,
  ({ request }) => {
    const authError = requireAdminAuth(request)
    if (authError) {
      return HttpResponse.json(authError.body, { status: authError.status })
    }

    const { page, pageSize } = parsePagination(request)
    const url = new URL(request.url)
    const search = url.searchParams.get('search') || ''
    const status = url.searchParams.get('status') || ''
    const role = url.searchParams.get('role') || ''

    let filteredItems = [...mockAccountsList.results]

    if (search) {
      const keyword = search.toLowerCase()
      filteredItems = filteredItems.filter(
        (item) =>
          item.name.toLowerCase().includes(keyword) ||
          item.nickname.toLowerCase().includes(keyword) ||
          item.email.toLowerCase().includes(keyword) ||
          String(item.id).includes(keyword)
      )
    }

    if (status) {
      filteredItems = filteredItems.filter((item) => item.status === status)
    }

    if (role) {
      filteredItems = filteredItems.filter((item) => item.role === role)
    }

    const { total, pageItems, hasNext, hasPrev } = paginate(
      filteredItems,
      page,
      pageSize
    )

    const next = hasNext
      ? `${ADMIN_API_URL}/accounts?page=${page + 1}&page_size=${pageSize}`
      : null
    const previous = hasPrev
      ? `${ADMIN_API_URL}/accounts?page=${page - 1}&page_size=${pageSize}`
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

// GET /api/v1/admin/accounts/check-nickname - 닉네임 중복 검사
export const checkNicknameHandler = http.get(
  `${ADMIN_API_URL}/accounts/check-nickname`,
  ({ request }) => {
    const authError = requireAdminAuth(request)
    if (authError) {
      return HttpResponse.json(authError.body, { status: authError.status })
    }

    const url = new URL(request.url)
    const nickname = url.searchParams.get('nickname')

    if (!nickname) {
      return HttpResponse.json(
        { detail: '닉네임은 필수 입력입니다.' },
        { status: 400 }
      )
    }

    //  mock DB에서 실제 닉네임 목록 추출
    const allNicknames = mockAccountsList.results.map((user) => user.nickname)

    // 중복 검사
    if (allNicknames.includes(nickname)) {
      return HttpResponse.json(
        { detail: '이미 사용 중인 닉네임입니다.' },
        { status: 409 }
      )
    }

    return HttpResponse.json(
      { detail: '사용 가능한 닉네임입니다.' },
      { status: 200 }
    )
  }
)

// GET /api/v1/admin/accounts/{account_id} - 회원 상세 조회
export const getAdminAccountDetailHandler = http.get(
  `${ADMIN_API_URL}/accounts/:account_id`,
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
  `${ADMIN_API_URL}/accounts/:account_id`,
  async ({ request, params }) => {
    const body = await parseRequestBody(request)
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

    const updated = {
      ...current,
      ...body,
    }

    // 메모리 상의 더미 데이터도 함께 갱신
    mockAccountDetailMap[id] = updated

    return HttpResponse.json(updated, { status: 200 })
  }
)
// POST /api/v1/admin/accounts/{account_id} - 회원 정보 수정 (JSON)
export const postAdminAccountHandler = http.post(
  `${ADMIN_API_URL}/accounts/:account_id`,
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

    const formData = await request.formData()
    const body = Object.fromEntries(formData.entries())

    const updated = {
      ...current,
      ...body,
    }

    // 메모리 mock 업데이트
    mockAccountDetailMap[id] = updated

    return HttpResponse.json(updated, { status: 200 })
  }
)

// DELETE /api/v1/admin/accounts/{account_id} - 회원 삭제
export const deleteAdminAccountHandler = http.delete(
  `${ADMIN_API_URL}/accounts/:account_id`,
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
  `${ADMIN_API_URL}/accounts/:account_id/role`,
  async ({ request, params }) => {
    const authError = requireAdminAuth(request)
    if (authError) {
      return HttpResponse.json(authError.body, { status: authError.status })
    }

    const { account_id } = params as { account_id?: string }
    const id = Number(account_id)

    // 1) 파라미터 검증
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

    const body = (await request.json()) as { role?: RoleStatus }

    if (!body.role) {
      return HttpResponse.json(
        { error_detail: '변경할 권한 정보가 없습니다.' },
        { status: 400 }
      )
    }

    // 2) 메모리 mock 업데이트
    const updated = {
      ...current,
      role: body.role,
    }

    mockAccountDetailMap[id] = updated

    // 3) 응답은 기존 스펙 유지 (detail + role)
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
  `${ADMIN_API_URL}/accounts/:account_id/activate`,
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
  `${ADMIN_API_URL}/accounts/:account_id/deactivate`,
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
  `${ADMIN_API_URL}/withdrawals`,
  ({ request }) => {
    const authError = requireAdminAuth(request)
    if (authError) {
      return HttpResponse.json(authError.body, { status: authError.status })
    }

    const { page, pageSize } = parsePagination(request)
    const url = new URL(request.url)
    const sort = url.searchParams.get('sort') || null

    const filteredItems = [...mockWithdrawalsList.results]

    // 정렬 적용
    if (sort) {
      switch (sort) {
        case 'id_asc':
          filteredItems.sort((a, b) => a.id - b.id)
          break

        case 'id_desc':
          filteredItems.sort((a, b) => b.id - a.id)
          break
        case 'name_asc':
          filteredItems.sort((a, b) => a.name.localeCompare(b.name))
          break

        case 'name_desc':
          filteredItems.sort((a, b) => b.name.localeCompare(a.name))
          break

        case 'withdrawn_asc':
          filteredItems.sort(
            (a, b) =>
              new Date(a.withdrawn_at).getTime() -
              new Date(b.withdrawn_at).getTime()
          )
          break

        case 'withdrawn_desc':
          filteredItems.sort(
            (a, b) =>
              new Date(b.withdrawn_at).getTime() -
              new Date(a.withdrawn_at).getTime()
          )
          break
      }
    }

    const { total, pageItems, hasNext, hasPrev } = paginate(
      filteredItems,
      page,
      pageSize
    )

    const next = hasNext
      ? `${ADMIN_API_URL}/withdrawals?page=${page + 1}&page_size=${pageSize}`
      : null
    const previous = hasPrev
      ? `${ADMIN_API_URL}/withdrawals?page=${page - 1}&page_size=${pageSize}`
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
  `${ADMIN_API_URL}/withdrawals/:withdrawal_id`,
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
  `${ADMIN_API_URL}/analytics/signup/trends`,
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
  `${ADMIN_API_URL}/analytics/withdrawals/trends`,
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
  `${ADMIN_API_URL}/analytics/withdrawal-reasons/percentage`,
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
  `${ADMIN_API_URL}/analytics/withdrawal-reasons/stats/monthly`,
  ({ request }) => {
    const authError = requireAdminAuth(request)
    if (authError) {
      return HttpResponse.json(authError.body, { status: authError.status })
    }

    const url = new URL(request.url)
    const raw = url.searchParams.get('reason')

    // reason 변수 선언 + 기본값
    let reason: ReasonStatus = 'OTHER'

    // valid reasons 목록 (map 기반)
    const validReasons: ReasonStatus[] = Object.keys(
      mockWithdrawalReasonsStatsMonthlyMap
    ) as ReasonStatus[]

    // raw가 유효한 reason이면 교체
    if (raw && validReasons.includes(raw as ReasonStatus)) {
      reason = raw as ReasonStatus
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
  `${ADMIN_API_URL}/lectures`,
  ({ request }) => {
    const authError = requireAdminAuth(request)
    if (authError) {
      return HttpResponse.json(authError.body, { status: authError.status })
    }

    const { page, pageSize } = parsePagination(request)
    const url = new URL(request.url)
    const search = url.searchParams.get('search')
    let filteredItems = [...mockLecturesList.results]
    if (search) {
      filteredItems = filteredItems.filter(
        (item) =>
          item.instructor.toLowerCase().includes(search.toLowerCase()) ||
          item.title.toLowerCase().includes(search.toLowerCase())
      )
    }
    const { total, pageItems, hasNext, hasPrev } = paginate(
      filteredItems,
      page,
      pageSize
    )

    const next = hasNext
      ? `${ADMIN_API_URL}/lectures?page=${page + 1}&page_size=${pageSize}`
      : null
    const previous = hasPrev
      ? `${ADMIN_API_URL}/lectures?page=${page - 1}&page_size=${pageSize}`
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
  `${ADMIN_API_URL}/lectures/:lecture_id`,
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
  `${ADMIN_API_URL}/study-groups`,
  ({ request }) => {
    const authError = requireAdminAuth(request)
    if (authError) {
      return HttpResponse.json(authError.body, { status: authError.status })
    }

    const { page, pageSize } = parsePagination(request)
    const url = new URL(request.url)
    const search = url.searchParams.get('search') || ''
    const status = url.searchParams.get('status') || ''
    const sort = url.searchParams.get('sort') || ''
    let filteredItems = [...mockStudyGroupList.results]

    if (search) {
      filteredItems = filteredItems.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      )
    }

    if (status) {
      filteredItems = filteredItems.filter((item) => item.status === status)
    }

    if (sort) {
      filteredItems.sort((a, b) => {
        switch (sort) {
          case 'latest':
            return (
              new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime()
            )
          case 'oldest':
            return (
              new Date(a.created_at).getTime() -
              new Date(b.created_at).getTime()
            )
          case 'name_asc':
            return a.name.localeCompare(b.name)
          case 'name_desc':
            return b.name.localeCompare(a.name)
          default:
            return 0
        }
      })
    }
    const { total, pageItems, hasNext, hasPrev } = paginate(
      filteredItems,
      page,
      pageSize
    )

    const next = hasNext
      ? `${ADMIN_API_URL}/study-groups?page=${page + 1}&page_size=${pageSize}`
      : null
    const previous = hasPrev
      ? `${ADMIN_API_URL}/study-groups?page=${page - 1}&page_size=${pageSize}`
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
  `${ADMIN_API_URL}/study-groups/:group_id`,
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
  `${ADMIN_API_URL}/study-reviews`,
  ({ request }) => {
    const authError = requireAdminAuth(request)
    if (authError) {
      return HttpResponse.json(authError.body, { status: authError.status })
    }

    const { page, pageSize } = parsePagination(request)
    const url = new URL(request.url)
    const search = url.searchParams.get('search')
    let filteredItems = [...mockStudyReviewList.results]
    if (search) {
      filteredItems = filteredItems.filter(
        (item) =>
          item.author.nickname.toLowerCase().includes(search.toLowerCase()) ||
          item.author.email.toLowerCase().includes(search.toLowerCase())
      )
    }
    const { total, pageItems, hasNext, hasPrev } = paginate(
      filteredItems,
      page,
      pageSize
    )

    const next = hasNext
      ? `${ADMIN_API_URL}/study-reviews?page=${page + 1}&page_size=${pageSize}`
      : null
    const previous = hasPrev
      ? `${ADMIN_API_URL}/study-reviews?page=${page - 1}&page_size=${pageSize}`
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
  `${ADMIN_API_URL}/study-reviews/:review_id`,
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
  `${API_URL}/recruitment-tags`,
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

    const baseUrl = `${API_URL}/recruitment-tags`
    const buildUrl = (p: number) =>
      `${baseUrl}?page=${p}&page_size=${pageSize}${
        search ? `&search=${encodeURIComponent(search)}` : ''
      }`

    const responseBody: GetRecruitmentTagsResponse = {
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
  `${ADMIN_API_URL}/recruitments`,
  ({ request }) => {
    const authError = requireAdminAuth(request)
    if (authError) {
      return HttpResponse.json(authError.body, { status: authError.status })
    }

    const url = new URL(request.url)
    const { page, pageSize } = parsePagination(request)

    // --- query params 파싱 ---
    const searchParam = url.searchParams.get('search') ?? ''
    const sortParam = url.searchParams.get('sort')
    const isClosedParam = url.searchParams.get('is_closed')

    // tags: ?tags=tag1&tags=tag2 or ?tags=tag1,tag2 둘 다 대응
    const rawTags = url.searchParams.getAll('tags')
    const tagFilters = rawTags
      .flatMap((value) => value.split(','))
      .map((value) => value.trim())
      .filter((value) => value.length > 0)
      .map((value) => value.toLowerCase())

    const search = searchParam.trim().toLowerCase()

    let isClosedFilter: boolean | null = null
    if (isClosedParam === 'true') isClosedFilter = true
    if (isClosedParam === 'false') isClosedFilter = false

    type SortType = 'latest' | 'oldest' | 'most_views' | 'most_bookmarks'
    const sort = (
      ['latest', 'oldest', 'most_views', 'most_bookmarks'] as SortType[]
    ).includes(sortParam as SortType)
      ? (sortParam as SortType)
      : undefined

    // --- 기본 데이터 ---
    const baseItems = mockRecruitmentList.results

    // --- 필터링 ---
    let filtered = [...baseItems]

    // search: title 부분 일치
    if (search) {
      filtered = filtered.filter((item) =>
        item.title.toLowerCase().includes(search)
      )
    }

    // tags: 요청된 태그 중 하나라도 포함하면 통과 (OR 조건)
    if (tagFilters.length > 0) {
      filtered = filtered.filter((item) => {
        const tagNames = item.tags.map((tag) => tag.name.toLowerCase())
        return tagFilters.some((t) => tagNames.includes(t))
      })
    }

    // is_closed: true/false 명시된 경우에만 필터
    if (isClosedFilter !== null) {
      filtered = filtered.filter((item) => item.is_closed === isClosedFilter)
    }

    // --- 정렬 ---
    if (sort) {
      filtered = [...filtered] // 정렬 전 얕은 복사
      switch (sort) {
        case 'latest':
          // created_at 내림차순 (최신순)
          filtered.sort((a, b) => b.created_at.localeCompare(a.created_at))
          break
        case 'oldest':
          // created_at 오름차순 (오래된순)
          filtered.sort((a, b) => a.created_at.localeCompare(b.created_at))
          break
        case 'most_views':
          filtered.sort((a, b) => b.views_count - a.views_count)
          break
        case 'most_bookmarks':
          filtered.sort((a, b) => b.bookmark_count - a.bookmark_count)
          break
      }
    }

    // --- 페이지네이션 ---
    const { total, pageItems, hasNext, hasPrev } = paginate(
      filtered,
      page,
      pageSize
    )

    // next / previous URL 생성 (기존 쿼리 유지 + page/page_size만 교체)
    const baseUrl = `${ADMIN_API_URL}/recruitments`
    const buildUrl = (targetPage: number) => {
      const params = new URLSearchParams(url.searchParams)
      params.set('page', String(targetPage))
      params.set('page_size', String(pageSize))
      return `${baseUrl}?${params.toString()}`
    }

    const next = hasNext ? buildUrl(page + 1) : null
    const previous = hasPrev ? buildUrl(page - 1) : null

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
  `${ADMIN_API_URL}/recruitments/:recruitment_id`,
  ({ request, params }) => {
    const authError = requireAdminAuth(request)
    if (authError) {
      return HttpResponse.json(authError.body, { status: authError.status })
    }

    const { recruitment_id } = params as { recruitment_id?: string }
    const id = Number(recruitment_id)

    // 1) 파라미터가 없거나 숫자로 변환 불가한 경우
    if (!recruitment_id || Number.isNaN(id)) {
      return HttpResponse.json(
        { error_detail: '해당 공고를 찾을 수 없습니다.' },
        { status: 404 }
      )
    }

    // 2) 더미 상세 맵에서 해당 id 조회
    const detail = mockRecruitmentDetailMap[id]

    if (!detail) {
      return HttpResponse.json(
        { error_detail: '해당 공고를 찾을 수 없습니다.' },
        { status: 404 }
      )
    }

    // 3) 정상 응답
    return HttpResponse.json(detail, { status: 200 })
  }
)

// DELETE /api/v1/admin/recruitments/{recruitment_id} - 모집 공고 삭제
export const deleteAdminRecruitmentHandler = http.delete(
  `${ADMIN_API_URL}/recruitments/:recruitment_id`,
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
  `${ADMIN_API_URL}/applications`,
  ({ request }) => {
    const authError = requireAdminAuth(request)
    if (authError) {
      return HttpResponse.json(authError.body, { status: authError.status })
    }

    const { page, pageSize } = parsePagination(request)
    const url = new URL(request.url)
    const search = url.searchParams.get('search')
    const status = url.searchParams.get('status')
    const sort = url.searchParams.get('sort')
    let filteredItems = [...mockApplicationsList.results]
    if (search) {
      filteredItems = filteredItems.filter(
        (item) =>
          item.applicant.nickname
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          item.recruitment.title.toLowerCase().includes(search.toLowerCase()) ||
          item.applicant.email.toLowerCase().includes(search.toLowerCase())
      )
    }
    if (status) {
      filteredItems = filteredItems.filter((item) => item.status === status)
    }
    if (sort) {
      filteredItems.sort((a, b) => {
        const dateA = new Date(a.created_at).getTime()
        const dateB = new Date(b.created_at).getTime()

        if (sort === 'latest') {
          return dateB - dateA
        } else if (sort === 'oldest') {
          return dateA - dateB
        }
        return 0
      })
    }

    const { total, pageItems, hasNext, hasPrev } = paginate(
      filteredItems,
      page,
      pageSize
    )

    const next = hasNext
      ? `${ADMIN_API_URL}/applications?page=${page + 1}&page_size=${pageSize}`
      : null
    const previous = hasPrev
      ? `${ADMIN_API_URL}/applications?page=${page - 1}&page_size=${pageSize}`
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
  `${ADMIN_API_URL}/applications/:application_id`,
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
      id !== mockApplicationsDetailMap[Number(application_id)].id
    ) {
      return HttpResponse.json(
        { error_detail: '해당 지원내역을 찾을 수 없습니다.' },
        { status: 404 }
      )
    }

    return HttpResponse.json(
      mockApplicationsDetailMap[Number(application_id)],
      { status: 200 }
    )
  }
)

export const catchAllAdminHandler = http.all(
  `${ADMIN_API_URL}/*`,
  ({ request }) => {
    return HttpResponse.json(
      {
        error_detail: `Handler not found for ${request.method} ${request.url}`,
      },
      { status: 404 }
    )
  }
)

/* -------------------------------------------------------------------------- */
/* 전체 admin 핸들러 모음                                                    */
/* -------------------------------------------------------------------------- */

export const adminHandlers = [
  // accounts
  checkNicknameHandler,
  getAccountsMeHandler,
  getAdminAccountsHandler,
  getAdminAccountDetailHandler,
  patchAdminAccountHandler,
  deleteAdminAccountHandler,
  postAdminAccountHandler,
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
  catchAllAdminHandler,
]
