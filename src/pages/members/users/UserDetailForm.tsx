import type { AxiosError } from 'axios'
import { ChevronDown } from 'lucide-react'

import React from 'react'

import Input from '@/components/common/Input'
import { GENDER_LABEL } from '@/config/gender'
import { STATUS_LABEL } from '@/config/status'
import { UserDetailChangeRole } from '@/pages/members/users/UserDetailChangeRole'
import type { UserDetailFormProps } from '@/pages/types/users'
import { formatPhoneNumber } from '@/utils/formatPhoneNumber'

function UserDetailFormComponent({
  profileImg,
  isEditMode,
  user,
  form,
  setForm,
  fileInput,
  setRole,
  isRoleModalOpen,
  setIsRoleModalOpen,
  setIsEditMode,
  handlePhoneBlur,
  handlePhoneChange,
  handleFormChange,
  handleImgChange,
  nicknameRes,
  isNicknameLoading,
  isNicknameError,
  nicknameError,
  errors,
  validateField,
  userId,
  role,
}: UserDetailFormProps) {
  return (
    <div>
      <div className="flex items-center justify-start gap-4">
        <div className="relative px-2 pb-6 text-center">
          <label htmlFor="file-input">
            <img
              src={profileImg || user.profile_img_url}
              alt="회원 프로필 사진"
              className="h-20 w-20 rounded-full object-cover"
              onError={(e) => {
                e.currentTarget.src = 'https://placehold.co/80'
              }}
            />
          </label>
          {isEditMode && (
            <>
              <button
                className="absolute right-0 bottom-0 left-0 z-60 cursor-pointer text-base leading-none font-medium whitespace-nowrap text-[#2563EB]"
                onClick={() => fileInput.current?.click()}
              >
                프로필 사진 변경
              </button>
              <input
                ref={fileInput}
                type="file"
                accept="image/png, image/gif, image/jpeg"
                id="file-input"
                onChange={handleImgChange}
                className="hidden"
              />
            </>
          )}
        </div>
        <div className="-mt-6 flex flex-col">
          <span className="text-xl font-semibold">{user.role}</span>
          <span className="text-base">{user.email}</span>
        </div>
      </div>
      {isEditMode && errors.profile_img && (
        <span className="text-sm text-red-500">{errors.profile_img}</span>
      )}
      <div className="flex justify-between pt-6">
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
                  return (
                    <span className="text-red-500">오류가 발생했습니다.</span>
                  )
                })()}

              {nicknameRes && (
                <span className="text-green-600">{nicknameRes.detail}</span>
              )}
            </>
          )}
          <Input
            label="연락처"
            name="phone"
            value={
              isEditMode
                ? formatPhoneNumber(form.phone)
                : formatPhoneNumber(form.phone)
            }
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
      </div>
    </div>
  )
}
export const UserDetailForm = React.memo(UserDetailFormComponent)
