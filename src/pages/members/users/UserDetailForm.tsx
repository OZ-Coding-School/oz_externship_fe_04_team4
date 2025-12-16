import React from 'react'

import { UserDetailLeft } from '@/pages/members/users/UserDetailLeft'
import { UserDetailProfile } from '@/pages/members/users/UserDetailProfile'
import { UserDetailRight } from '@/pages/members/users/UserDetailRight'
import type { UserDetailFormProps } from '@/pages/types/users'

function UserDetailFormComponent({
  isEditMode,
  form,
  setForm,
  setRole,
  isRoleModalOpen,
  setIsRoleModalOpen,
  setIsEditMode,
  errors,
  validateField,
  userId,
  role,
  handlePhoneBlur,
  handlePhoneChange,
  handleFormChange,
  nicknameRes,
  isNicknameLoading,
  isNicknameError,
  nicknameError,
  profileImg,
  user,
  handleImgChange,
  fileInput,
}: UserDetailFormProps) {
  return (
    <div>
      fileInput,
      <UserDetailProfile
        profileImg={profileImg}
        user={user}
        handleImgChange={handleImgChange}
        isEditMode={isEditMode}
        fileInput={fileInput}
        errors={errors}
      />
      <div className="flex justify-between pt-6">
        <UserDetailLeft
          handlePhoneBlur={handlePhoneBlur}
          handlePhoneChange={handlePhoneChange}
          handleFormChange={handleFormChange}
          nicknameRes={nicknameRes}
          isNicknameLoading={isNicknameLoading}
          isNicknameError={isNicknameError}
          nicknameError={nicknameError}
          isEditMode={isEditMode}
          form={form}
          validateField={validateField}
          errors={errors}
          setForm={setForm}
        />
        <UserDetailRight
          isEditMode={isEditMode}
          setForm={setForm}
          form={form}
          validateField={validateField}
          errors={errors}
          setRole={setRole}
          isRoleModalOpen={isRoleModalOpen}
          setIsRoleModalOpen={setIsRoleModalOpen}
          setIsEditMode={setIsEditMode}
          userId={Number(userId)}
          role={role}
        />
      </div>
    </div>
  )
}
export const UserDetailForm = React.memo(UserDetailFormComponent)
