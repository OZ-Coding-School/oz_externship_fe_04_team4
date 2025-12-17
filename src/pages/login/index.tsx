import { useEffect, useState, type FormEvent } from 'react'

import { useLocation, useNavigate } from 'react-router'

import { ROUTE_PATHS } from '@/app/router/routePaths'
import Button from '@/components/common/Button'
import { useLoginMutation } from '@/hooks/model'
import { useAuthRole } from '@/hooks/useAuthRole'
import { useAuthStore } from '@/store/authStore'

type LocationState = {
  from?: string
}

const INPUT_STYLE =
  'h-12 w-[328px] rounded-sm border border-[#BDBDBD] bg-white mb-3 placeholder-[#BDBDBD] py-3.5 px-4 outline-0'

export default function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const from =
    (location.state as LocationState)?.from || `${ROUTE_PATHS.MEMBERS.USERS}`
  const clearAuth = useAuthStore((s) => s.clearAuth)
  const { role } = useAuthRole()
  const [didLogin, setDidLogin] = useState(false)
  const { mutate, isPending, error } = useLoginMutation({
    onSuccess: () => {
      setDidLogin(true)
    },
  })

  useEffect(() => {
    if (!didLogin) return
    if (!role) return

    if (role === 'admin' || role === 'staff') {
      navigate(from, { replace: true })
      return
    }

    if (role === 'user') {
      clearAuth()
      setDidLogin(false)
      alert('관리자 페이지는 admin 및 staff 계정만 접근 가능합니다.')
    }
  }, [didLogin, role, navigate, from, clearAuth])

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const email = formData.get('email')
    const password = formData.get('password')

    if (typeof email !== 'string' || typeof password !== 'string') return

    mutate({ email, password })
  }

  return (
    <div className="flex items-center justify-between">
      <div className="flex h-full w-6/10 items-center justify-center">
        <div className="flex flex-col items-center">
          <img src="/logo.png" alt="logo" />
          <div className="cursor-default py-4 text-3xl font-bold text-[#111827]">
            관리자 로그인
          </div>
          <div className="cursor-default py-6">
            <span className="text-[#F6A818]">admin 계정</span>을 통해 로그인을
            진행해주세요.
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col">
            <input
              name="email"
              type="email"
              required
              placeholder="아이디 (example@gmail.com)"
              className={INPUT_STYLE}
            />
            <input
              name="password"
              type="password"
              required
              placeholder="비밀번호 (6~15자의 영문 대소문자, 숫자, 특수문자 포함"
              className={INPUT_STYLE}
            />
            {error && (
              <p className="mb-3 text-sm text-red-500">{error.message}</p>
            )}
            <Button
              type="submit"
              disabled={isPending}
              className="h-[52px] w-[328px] bg-[#F6A818] text-white hover:bg-amber-400 hover:font-bold"
            >
              {isPending ? '로그인 중...' : '로그인'}
            </Button>
          </form>
        </div>
      </div>
      <div className="h-dvh w-4/10 bg-[#F6A818] opacity-10" />
    </div>
  )
}
