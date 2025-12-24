import { z } from 'zod'

const nameRegex = /^[A-Za-z가-힣]{2,8}$/
const nicknameRegex = /^[A-Za-z가-힣0-9]{1,10}$/

export const userUpdateSchema = z.object({
  name: z
    .string()
    .regex(nameRegex, '이름은 2~8자의 한글 또는 영문만 가능합니다.'),

  gender: z.enum(['M', 'F'], {
    message: '성별은 남성 또는 여성을 선택해주세요.',
  }),

  nickname: z
    .string()
    .regex(nicknameRegex, '닉네임은 1~10자의 한글/영문/숫자만 가능합니다.'),

  phone_number: z
    .string()
    .regex(/^\d{11}$/, '전화번호는 숫자 11자리여야 합니다.'),
  status: z.enum(['active', 'inactive', 'withdraw']),

  profile_img_url: z.preprocess(
    (v) => (typeof v === 'string' && v.trim() === '' ? undefined : v),
    z.string().url('유효한 이미지 URL이 아닙니다.').optional()
  ),
})

export type UserUpdateSchema = z.infer<typeof userUpdateSchema>
