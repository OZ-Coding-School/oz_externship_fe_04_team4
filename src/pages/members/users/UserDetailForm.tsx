import React from 'react'

import { UserDetailLeft } from '@/pages/members/users/UserDetailLeft'
import { UserDetailProfile } from '@/pages/members/users/UserDetailProfile'
import { UserDetailRight } from '@/pages/members/users/UserDetailRight'
import type { UserDetailFormProps } from '@/pages/types/users'

function UserDetailFormComponent({
  isEditMode,
  form,
  setForm,
  errors,
  validateField,
  setRole,
  isRoleModalOpen,
  setIsRoleModalOpen,
  setIsEditMode,
  userId,
  role,
  profileImg,
  user,
  handleImgChange,
}: UserDetailFormProps) {
  return (
    <div>
      <UserDetailProfile
        isEditMode={isEditMode}
        profileImg={profileImg}
        handleImgChange={handleImgChange}
        user={user}
        errors={errors}
      />
      <div className="flex justify-between pt-6">
        <UserDetailLeft
          isEditMode={isEditMode}
          form={form}
          setForm={setForm}
          errors={errors}
          validateField={validateField}
        />
        <UserDetailRight
          isEditMode={isEditMode}
          form={form}
          setForm={setForm}
          errors={errors}
          validateField={validateField}
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
