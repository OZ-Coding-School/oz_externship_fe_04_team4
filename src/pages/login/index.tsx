// login 페이지

import { useState, type FormEvent } from 'react'

import { useNavigate } from 'react-router'

import { useLoginMutation } from '@/api/auth/useLoginMutation'
import Button from '@/components/common/Button'

const INPUT_STYLE =
  'h-12 w-[328px] rounded-sm border border-[#BDBDBD] bg-white mb-3 placeholder-[#BDBDBD] py-3.5 px-4 outline-0'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()
  const { mutate, isPending, error } = useLoginMutation()

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    mutate(
      { email, password },
      {
        onSuccess: () => {
          navigate('/members/users')
        },
      }
    )
  }

  return (
    <div className="flex">
      <div className="flex h-full w-[840px] items-center justify-center">
        <div className="flex flex-col items-center">
          <img src="/logo.png" alt="logo" />
          <div className="py-4 text-3xl font-bold text-[#111827]">
            관리자 로그인
          </div>
          <div className="py-6">
            <span className="text-[#F6A818]">admin 계정</span>을 통해 로그인을
            진행해주세요.
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col">
            <input
              type="email"
              required
              placeholder="아이디 (example@gmail.com)"
              className={INPUT_STYLE}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              required
              placeholder="비밀번호 (6~15자의 영문 대소문자, 숫자, 특수문자 포함"
              className={INPUT_STYLE}
              onChange={(e) => setPassword(e.target.value)}
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
      <div className="h-dvh w-[600px] bg-[#F6A818] opacity-10" />
    </div>
  )
}
