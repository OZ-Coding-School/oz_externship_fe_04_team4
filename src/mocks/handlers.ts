import { http, HttpResponse } from 'msw'

type LoginRequestBody = { email: string; password: string }

export const handlers = [
  // GET 요청 모킹
  http.get('/api/users', () => {
    return HttpResponse.json([
      { id: 1, name: '김철수', email: 'kim@example.com' },
      { id: 2, name: '이영희', email: 'lee@example.com' },
    ])
  }),

  // POST 요청 모킹
  http.post('/api/login', async ({ request }) => {
    const { email, password } = (await request.json()) as LoginRequestBody

    if (email === 'test@example.com' && password === 'password') {
      return HttpResponse.json({
        success: true,
        token: 'mock-jwt-token',
        user: { id: 1, name: '테스트 유저' },
      })
    }

    return HttpResponse.json(
      { success: false, message: '로그인 실패' },
      { status: 401 }
    )
  }),

  // 에러 응답 모킹
  http.get('/api/error', () => {
    return HttpResponse.json(
      { message: '서버 에러가 발생했습니다' },
      { status: 500 }
    )
  }),
]
