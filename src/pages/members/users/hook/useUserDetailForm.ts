import dayjs from 'dayjs'
import { useEffect, useState } from 'react'

import { ROLE_LABEL } from '@/config/role'
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
      joinDateTime: dayjs(user.created_at)
        .locale('ko')
        .format('YYYY. M. D. A h:mm:ss'),
    })
  }, [user])
  const validateField = <T extends keyof typeof userUpdateSchema.shape>(
    field: T,
    value: unknown
  ) => {
    const result = userUpdateSchema.shape[field]?.safeParse(value)

    setErrors((prev) => ({
      ...prev,
      [field]: result?.success ? '' : result?.error.issues[0].message,
    }))
  }

  return {
    form,
    setForm,
    errors,
    validateField,
  }
}
