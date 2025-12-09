import type { AxiosError } from 'axios'
import { ChevronDown } from 'lucide-react'

import React from 'react'

import Button from '@/components/common/Button'
import Input from '@/components/common/Input'
import Modal from '@/components/common/Modal'
import { ROLE_LABEL } from '@/config/role'
import { useCheckNickname } from '@/hooks/useCheckNickname'
import type { UserDetailUser, UserFormType } from '@/pages/types/users'

interface UserDetailFormProps {
  profileImg: string
  isEditMode: boolean
  user: UserDetailUser
  form: UserFormType
  setForm: React.Dispatch<React.SetStateAction<UserFormType>>
  fileInput: React.RefObject<HTMLInputElement | null>
  isRoleModalOpen: boolean
  setIsRoleModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  handleImgChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  setRole: React.Dispatch<React.SetStateAction<string>>
  handlePhoneBlur: () => void
  role: string
  handleFormChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}
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
  handlePhoneBlur,
  role,
  handleFormChange,
  handleImgChange,
}: UserDetailFormProps) {
  const {
    data: nicknameRes,
    isLoading: isNicknameLoading,
    isError: isNicknameError,
    error: nicknameError,
  } = useCheckNickname(isEditMode ? form.nickname : '')
  return (
    <div>
      <div className="flex items-center justify-start gap-4">
        <div className="relative px-2 pb-6 text-center">
          <label htmlFor="file-input">
            <img
              src={profileImg || user.profile_img_url}
              alt="회원 프로필 사진"
              className="h-20 w-20 rounded-full object-cover"
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
      <div className="flex justify-between pt-6">
        <div className="flex flex-col gap-6">
          <Input label="회원ID" name="id" value={form.id} />
          <Input
            label="이름"
            name="name"
            value={form.name}
            editable={isEditMode}
            onChange={handleFormChange}
          />
          <Input
            label="닉네임"
            name="nickname"
            value={form.nickname}
            editable={isEditMode}
            onChange={handleFormChange}
          />
          {isEditMode && form.nickname.trim().length > 0 && (
            <div className="mt-1 text-sm">
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
            </div>
          )}
          <Input
            label="연락처"
            name="phone"
            value={form.phone}
            editable={isEditMode}
            onChange={handleFormChange}
            onBlur={handlePhoneBlur}
          />
          {isEditMode ? (
            <label className="flex flex-col gap-2">
              <span className="text-sm font-medium text-[#374151]">상태</span>
              <div className="relative">
                <select
                  className={`h-9 w-full appearance-none rounded-lg bg-[#F9FAFB] px-3 text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none`}
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
              value={form.status}
              editable={false}
            />
          )}
        </div>
        <div className="flex flex-col gap-6">
          <Input label="이메일" name="email" value={form.email} />
          <Input label="성별" value={form.gender} />
          <Input label="생년월일" name="birthday" value={form.birthday} />
          <Input
            label="권한"
            name="role"
            className="cursor-default"
            value={form.role}
          />
          <Modal
            isOpen={isRoleModalOpen}
            onClose={() => setIsRoleModalOpen(false)}
            title="권한 변경"
            className="z-60"
            titleClassName="border-b-0"
            footerClassName="border-t-0"
            footer={
              <div className="flex w-full items-center justify-end gap-2">
                <Button
                  className="bg-primary-blue text-white"
                  onClick={() => {
                    setForm((prev) => ({
                      ...prev,
                      role: ROLE_LABEL[role as keyof typeof ROLE_LABEL],
                    }))
                    setIsRoleModalOpen(false)
                  }}
                >
                  저장
                </Button>
                <Button
                  variant="cancel"
                  onClick={() => setIsRoleModalOpen(false)}
                >
                  취소
                </Button>
              </div>
            }
          >
            <div className="flex flex-col gap-3">
              <label
                htmlFor="admin"
                className="flex h-full w-full rounded-lg text-base text-black"
              >
                <input
                  type="radio"
                  id="admin"
                  name="role-choice"
                  className="peer sr-only"
                  value="admin"
                  onChange={(e) => setRole(e.target.value)}
                />
                <span className="flex h-full w-full rounded-lg border border-[#E5E7EB] bg-white px-4 py-3 peer-checked:border peer-checked:border-[#BFDBFE] peer-checked:bg-[#EFF6FF] peer-checked:text-base peer-checked:text-[#2563EB]">
                  관리자
                </span>
              </label>
              <label
                htmlFor="staff"
                className="flex h-full w-full rounded-lg text-base text-black"
              >
                <input
                  type="radio"
                  id="staff"
                  value="staff"
                  name="role-choice"
                  className="peer sr-only"
                  onChange={(e) => setRole(e.target.value)}
                />
                <span className="flex h-full w-full rounded-lg border border-[#E5E7EB] bg-white px-4 py-3 peer-checked:border peer-checked:border-[#BFDBFE] peer-checked:bg-[#EFF6FF] peer-checked:text-base peer-checked:text-[#2563EB]">
                  스태프
                </span>
              </label>
              <label
                htmlFor="user"
                className="flex h-full w-full rounded-lg text-base text-black"
              >
                <input
                  type="radio"
                  id="user"
                  name="role-choice"
                  className="peer sr-only"
                  value="user"
                  onChange={(e) => setRole(e.target.value)}
                />
                <span className="flex h-full w-full rounded-lg border border-[#E5E7EB] bg-white px-4 py-3 peer-checked:border peer-checked:border-[#BFDBFE] peer-checked:bg-[#EFF6FF] peer-checked:text-base peer-checked:text-[#2563EB]">
                  일반회원
                </span>
              </label>
            </div>
          </Modal>
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
