import type { AxiosError } from 'axios'
import type { Dispatch, ReactNode, SetStateAction } from 'react'

import type { RoleType } from '@/config/role'
import type { userUpdateSchema } from '@/pages/members/users/schema/userUpdateSchema'

export interface UserApiRawItem {
  id: number
  email: string
  nickname: string
  name: string
  birthday: string
  status: string
  role: string
  withdraw_at: string
  created_at: string
}

export interface UserDetailModalProps {
  isOpen: boolean
  onClose: () => void
  withdrawalId: number | null
  footer?: ReactNode
}

export interface UserDetailUser {
  id: number | string
  birthday: string
  created_at: string
  email: string
  gender: string
  name: string
  nickname: string
  phone_number: string
  profile_img_url: string
  role: string
  status: string
}

export interface UserFormType {
  id: number | string
  name: string
  nickname: string
  phone: string
  status: string
  email: string
  gender: string
  birthday: string
  role: string
  joinDateTime: string
}

export interface UserDetailFormProps {
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
  role: string
  handleFormChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  nicknameRes: { detail: string } | null
  isNicknameLoading: boolean
  isNicknameError: boolean
  nicknameError: AxiosError | unknown
  errors: Record<string, string>
  validateField: <T extends keyof typeof userUpdateSchema.shape>(
    field: T,
    value: unknown
  ) => void
  handlePhoneBlur: () => void
  handlePhoneChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  setIsEditMode: Dispatch<SetStateAction<boolean>>
}

export interface UserDetailFooterProps {
  setIsRoleModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  isEditMode: boolean
  isDeleteModalOpen: boolean
  handleFormEditOk: () => void
  setIsDeleteModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  handleUserDelete: () => void
  setIsEditMode: React.Dispatch<React.SetStateAction<boolean>>
  isAdmin: boolean | null
}

export interface UserDetailMemberDeleteProps {
  setIsDeleteModalOpen: Dispatch<SetStateAction<boolean>>
  isDeleteModalOpen: boolean
  handleUserDelete: () => void
}

export type Interval = 'monthly' | 'yearly'

export interface WithdrawalsApiRawItem {
  id: number
  email: string
  name: string
  role: RoleType
  birthday: string
  reason: string
  withdrawn_at: string
}
