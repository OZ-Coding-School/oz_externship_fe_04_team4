import dayjs from 'dayjs'
import { useEffect, useState } from 'react'

import { ROLE_LABEL } from '@/config'
import { userUpdateSchema } from '@/pages/members/users/schema/userUpdateSchema'
import type { UserDetailUser, UserFormType } from '@/pages/types/users'

export function useUserDetailForm(user?: UserDetailUser, userId?: number) {
  const [form, setForm] = useState<UserFormType>({
    id: userId ?? 0,
    name: '',
    nickname: '',
    phone: '',
    status: '',
    email: '',
    gender: '',
    birthday: '',
    role: '',
    joinDateTime: '',
    profile_img_url: undefined,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  useEffect(() => {
    if (!user) return

    setForm({
      id: user.id,
      name: user.name,
      nickname: user.nickname,
      phone: user.phone_number?.replace(/\D/g, '') ?? '',
      status: user.status,
      email: user.email,
      gender: user.gender,
      birthday: user.birthday,
      role: ROLE_LABEL[user.role as keyof typeof ROLE_LABEL],
      profile_img_url: user.profile_img_url ?? undefined,
      joinDateTime: dayjs(user.created_at)
        .locale('ko')
        .format('YYYY. M. D. A h:mm:ss'),
    })
  }, [user])
  const validateField = <T extends keyof typeof userUpdateSchema.shape>(
    field: T,
    value: unknown
  ) => {
    // 공통: 빈 값이면 에러 제거
    if (typeof value === 'string' && value.trim() === '') {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[field]
        return next
      })
      return
    }

    // 전화번호 전용 검증
    if (field === 'phone_number') {
      const v = String(value)

      if (v.length !== 11) {
        setErrors((prev) => ({
          ...prev,
          phone_number: '전화번호는 숫자 11자리여야 합니다.',
        }))
      } else {
        setErrors((prev) => {
          const next = { ...prev }
          delete next.phone_number
          return next
        })
      }
      return
    }

    // 그 외 필드는 Zod로
    const schema = userUpdateSchema.shape[field]
    if (!schema) return

    const result = schema.safeParse(value)

    if (!result.success) {
      setErrors((prev) => ({
        ...prev,
        [field]: result.error.issues[0].message,
      }))
    } else {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[field]
        return next
      })
    }
  }

  return {
    form,
    setForm,
    errors,
    validateField,
  }
}
