import React from 'react'

import Input from '@/components/common/Input'
import type {
  WithDrawDetailInfoUser,
  WithDrawwDetailFormType,
} from '@/pages/types/withdraw'

interface WithdrawlDetailFormProps {
  user: WithDrawDetailInfoUser
  form: WithDrawwDetailFormType
  setForm: React.Dispatch<React.SetStateAction<WithDrawwDetailFormType>>
  //handleFormChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}
function WithdrawalDetailFormComponent({
  user,
  form,
}: WithdrawlDetailFormProps) {
  console.log('form:', form)
  console.log('📌 API 응답 user:', user)
  return (
    <div>
      <div className="flex items-center justify-start gap-4">
        <div className="relative px-2 pb-6 text-center">
          <label htmlFor="file-input">
            <img
              src={form.profile_img_url}
              alt="회원 프로필 사진"
              className="border-b-primary-light-gray h-20 w-20 rounded-full border object-cover"
            />
          </label>
        </div>
        <div className="-mt-6 flex flex-col">
          <span className="text-xl font-semibold">{form.name}</span>
          <span className="text-base">{form.email}</span>
        </div>
      </div>
      <div className="flex justify-between pt-6">
        <div className="flex flex-col gap-6">
          <Input
            label="회원ID"
            name="id"
            value={String(form.id)}
            editable={false}
          />
          <Input label="이름" name="name" value={form.name} editable={false} />
          <Input
            label="닉네임"
            name="nickname"
            value={form.nickname}
            editable={false}
          />
          <Input
            label="상태"
            name="status"
            value={form.status}
            editable={false}
          />
        </div>
        <div className="flex flex-col gap-6">
          <Input
            label="이메일"
            name="email"
            value={form.email}
            editable={false}
          />
          <Input
            label="성별"
            value={form.gender}
            editable={false}
            name="gender"
          />
          <Input
            label="권한"
            name="role"
            className="cursor-default"
            value={form.role}
            editable={false}
          />
          <Input
            label="회원가입 일시"
            name="created_at"
            value={form.created_at}
            editable={false}
          />
        </div>
      </div>
    </div>
  )
}
export const WithdrawalDetailForm = React.memo(WithdrawalDetailFormComponent)
