import type { AxiosError } from 'axios'
import { ChevronDown } from 'lucide-react'

import Input from '@/components/common/Input'
import { STATUS_LABEL } from '@/config/status'
import type { userUpdateSchema } from '@/pages/members/users/schema/userUpdateSchema'
import type { UserFormType } from '@/pages/types/users'
import { formatPhoneNumber } from '@/utils/formatPhoneNumber'
type UserDetailLeftProps = {
  isEditMode: boolean
  form: UserFormType

  handleFormChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handlePhoneChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handlePhoneBlur: () => void

  nicknameRes: { detail: string } | null
  isNicknameLoading: boolean
  isNicknameError: boolean
  nicknameError: unknown

  errors: Record<string, string>
  validateField: <T extends keyof typeof userUpdateSchema.shape>(
    field: T,
    value: unknown
  ) => void

  setForm: React.Dispatch<React.SetStateAction<UserFormType>>
}
export function UserDetailLeft({
  handlePhoneBlur,
  handlePhoneChange,
  handleFormChange,
  nicknameRes,
  isNicknameLoading,
  isNicknameError,
  nicknameError,
  isEditMode,
  form,
  validateField,
  errors,
  setForm,
}: UserDetailLeftProps) {
  return (
    <div className="flex flex-col gap-6">
      <Input label="회원ID" name="id" value={form.id} />
      <Input
        label="이름"
        name="name"
        value={form.name}
        editable={isEditMode}
        onChange={handleFormChange}
        onBlur={() => validateField('name', form.name)}
      />
      {errors.name && (
        <span className="text-sm text-red-500">{errors.name}</span>
      )}
      <Input
        label="닉네임"
        name="nickname"
        value={form.nickname}
        editable={isEditMode}
        onChange={handleFormChange}
        onBlur={() => validateField('nickname', form.nickname)}
      />
      {isEditMode && errors.nickname && (
        <span className="text-sm text-red-500">{errors.nickname}</span>
      )}
      {isEditMode && form.nickname.trim().length > 0 && (
        <>
          {isNicknameLoading && (
            <span className="text-gray-500">닉네임 검사 중...</span>
          )}

          {isNicknameError &&
            (() => {
              const status = (nicknameError as AxiosError)?.response?.status

              if (status === 400) {
                return (
                  <span className="text-red-500">
                    닉네임은 필수 입력입니다.
                  </span>
                )
              }
              if (status === 409) {
                return (
                  <span className="text-red-500">
                    이미 사용 중인 닉네임입니다.
                  </span>
                )
              }
              return <span className="text-red-500">오류가 발생했습니다.</span>
            })()}

          {nicknameRes && (
            <span className="text-green-600">{nicknameRes.detail}</span>
          )}
        </>
      )}
      <Input
        label="연락처"
        name="phone"
        value={formatPhoneNumber(form.phone)}
        editable={isEditMode}
        onChange={handlePhoneChange}
        onBlur={handlePhoneBlur}
      />
      {errors.phone_number && (
        <span className="text-sm text-red-500">{errors.phone_number}</span>
      )}
      {isEditMode ? (
        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-[#374151]">상태</span>
          <div className="relative">
            <select
              className={`h-9 w-full appearance-none rounded-lg bg-[#F9FAFB] px-3 text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none`}
              value={form.status}
              onChange={(e) => {
                const eng = e.target.value
                setForm((prev) => ({
                  ...prev,
                  status: eng,
                }))
                validateField('status', eng)
              }}
            >
              <option value="active">활성</option>
              <option value="inactive">비활성</option>
              <option value="withdraw">탈퇴</option>
            </select>
            <span className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-gray-400">
              <ChevronDown size={12} />
            </span>
          </div>
        </label>
      ) : (
        <Input
          label="상태"
          name="status"
          onChange={handleFormChange}
          value={STATUS_LABEL[form.status as keyof typeof STATUS_LABEL]}
          editable={false}
        />
      )}
    </div>
  )
}
