import { ChevronDown } from 'lucide-react'
import type { Dispatch, SetStateAction } from 'react'

import Input from '@/components/common/Input'
import { GENDER_LABEL } from '@/config/gender'
import type { userUpdateSchema } from '@/pages/members/users/schema/userUpdateSchema'
import { UserDetailChangeRole } from '@/pages/members/users/UserDetailChangeRole'
import type { UserFormType } from '@/pages/types/users'

type UserDetailRightProps = {
  isEditMode: boolean
  setForm: Dispatch<SetStateAction<UserFormType>>
  form: UserFormType
  validateField: <T extends keyof typeof userUpdateSchema.shape>(
    field: T,
    value: unknown
  ) => void
  errors: Record<string, string>
  setRole: Dispatch<SetStateAction<string>>
  isRoleModalOpen: boolean
  setIsRoleModalOpen: Dispatch<SetStateAction<boolean>>
  setIsEditMode: Dispatch<SetStateAction<boolean>>
  userId: number
  role: string
}
export function UserDetailRight({
  isEditMode,
  setForm,
  form,
  validateField,
  errors,
  setRole,
  isRoleModalOpen,
  setIsRoleModalOpen,
  setIsEditMode,
  userId,
  role,
}: UserDetailRightProps) {
  return (
    <div className="flex flex-col gap-6">
      <Input label="이메일" name="email" value={form.email} />
      {isEditMode ? (
        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-[#374151]">성별</span>
          <div className="relative">
            <select
              className="h-9 w-full appearance-none rounded-lg bg-[#F9FAFB] px-3 text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
              value={form.gender}
              onChange={(e) => {
                setForm((prev) => ({
                  ...prev,
                  gender: e.target.value,
                }))
                validateField('gender', e.target.value)
              }}
            >
              <option value="M">남성</option>
              <option value="F">여성</option>
            </select>
            <span className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-gray-400">
              <ChevronDown size={12} />
            </span>
          </div>
          {errors.gender && (
            <span className="text-sm text-red-500">{errors.gender}</span>
          )}
        </label>
      ) : (
        <Input
          label="성별"
          name="gender"
          value={GENDER_LABEL[form.gender as 'M' | 'F']}
          editable={false}
        />
      )}
      {errors.gender && (
        <span className="text-sm text-red-500">{errors.gender}</span>
      )}
      <Input label="생년월일" name="birthday" value={form.birthday} />
      <Input
        label="권한"
        name="role"
        className="cursor-default"
        value={form.role}
      />

      <UserDetailChangeRole
        setRole={setRole}
        isRoleModalOpen={isRoleModalOpen}
        setIsRoleModalOpen={setIsRoleModalOpen}
        setIsEditMode={setIsEditMode}
        userId={Number(userId)}
        role={role}
      />
      <Input
        label="회원가입 일시"
        name="created_at"
        value={form.joinDateTime}
      />
    </div>
  )
}
