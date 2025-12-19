import { http, HttpResponse } from 'msw'

import { API_URL } from '@/config'

import { adminHandlers } from './adminHandlers'

// (선택) 로그인 전용 핸들러 예시
type LoginRequestBody = { email: string; password: string }

const loginHandler = http.post(
  `${API_URL}/accounts/login`,
  async ({ request }) => {
    const body = (await request.json()) as LoginRequestBody

    if (body.email === 'admin@example.com' && body.password === 'admin') {
      // ⚠️ 중요: access_token은 나머지 admin API와 맞추기 (Bearer token_value)
      return HttpResponse.json(
        {
          access_token: 'token_value',
          refresh_token: 'dummy_refresh_token',
        },
        { status: 200 }
      )
    }

    return HttpResponse.json(
      { error_detail: '이메일 또는 비밀번호가 올바르지 않습니다.' },
      { status: 401 }
    )
  }
)

// ✅ MSW에 넘겨줄 최종 handlers 배열
export const handlers = [loginHandler, ...adminHandlers]
