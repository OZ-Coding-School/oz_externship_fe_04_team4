import { useQueryClient } from '@tanstack/react-query'
import dayjs from 'dayjs'
import 'dayjs/locale/ko'
import { useEffect, useRef, useState } from 'react'

import type { ZodError } from 'zod'

import { handleApiError } from '@/api/handleApiError'
import { ErrorMessage } from '@/components/common/ErrorMessage'
import { Loading } from '@/components/common/Loading'
import Modal from '@/components/common/Modal'
import { ROLE_LABEL } from '@/config/role'
import { SERVICE_URLS } from '@/config/serviceUrls'
import { useAuthRole } from '@/hooks/useAuthRole'
import { useCheckNickname } from '@/hooks/useCheckNickname'
import { useFetchQuery } from '@/hooks/useFetchQuery'
import { useMutateQuery } from '@/hooks/useMutateQuery'
import { USER_API_ERROR_MESSAGE } from '@/pages/members/users/api/userErrorMessageMap'
import { userUpdateSchema } from '@/pages/members/users/schema/userUpdateSchema'
import { UserDetailFooter } from '@/pages/members/users/UserDetailFooter'
import { UserDetailForm } from '@/pages/members/users/UserDetailForm'
import type {
  UserDetailModalProps,
  UserDetailUser,
  UserFormType,
} from '@/pages/types/users'
export function UserDetailModal({
  isOpen,
  onClose,
  userId,
}: UserDetailModalProps) {
  const queryClient = useQueryClient()
  const {
    data: user,
    isLoading,
    error,
    refetch,
  } = useFetchQuery<UserDetailUser>({
    queryKey: ['user-detail', userId],
    url: SERVICE_URLS.ACCOUNTS.DETAIL(userId || 0),
    enabled: !!userId && isOpen,
  })
  const fileInput = useRef<HTMLInputElement | null>(null)

  const [isEditMode, setIsEditMode] = useState(false)
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [profileImg, setProfileImg] = useState<string>('')
  const [file, setFile] = useState<File | null>(null)
  const [originalNickname, setOriginalNickname] = useState('')
  const [role, setRole] = useState('')
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
      phone: user.phone_number ? user.phone_number.replace(/\D/g, '') : '',
      status: user.status,
      email: user.email,
      gender: user.gender,
      birthday: user.birthday,
      role: ROLE_LABEL[user.role as keyof typeof ROLE_LABEL] ?? '',
      joinDateTime: user.created_at
        ? dayjs(user.created_at).locale('ko').format('YYYY. M. D. A h:mm:ss')
        : '',
    })
  }, [user])

  useEffect(() => {
    if (user) {
      setOriginalNickname(user.nickname)
    }
  }, [user])
  const nicknameChanged = form.nickname !== originalNickname
  const hasNickname = form.nickname.trim().length > 0

  // Zod 검증을 먼저 확인
  const nicknameRegex = /^[A-Za-z가-힣0-9]{1,10}$/
  const isNicknameValid = nicknameRegex.test(form.nickname)

  let nicknameToCheck = ''

  // 닉네임이 변경되고, 유효한 형식일 때만 중복 검사 실행
  if (isEditMode && hasNickname && nicknameChanged && isNicknameValid) {
    nicknameToCheck = form.nickname
  }
  useEffect(() => {
    if (!isOpen) {
      setIsEditMode(false)
      setProfileImg('')
      setFile(null)
    }
    if (!isRoleModalOpen) {
      setRole('')
    } else if (isRoleModalOpen && user) {
      setRole(user.role)
    }
    if (!isDeleteModalOpen) {
      setIsDeleteModalOpen(false)
    }
  }, [isOpen, isRoleModalOpen, isDeleteModalOpen, user])

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (name === 'phone') {
      const onlyNumbers = value.replace(/\D/g, '')
      setForm((prev) => ({
        ...prev,
        phone: onlyNumbers,
      }))
      return
    }

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const onlyNumbers = e.target.value.replace(/\D/g, '')

    setForm((prev) => ({ ...prev, phone: onlyNumbers }))
  }

  const handlePhoneBlur = () => {
    const raw = form.phone.replace(/\D/g, '')

    validateField('phone_number', raw)

    setForm((prev) => ({
      ...prev,
      phone: raw, // form 내부 값은 raw 숫자 유지!
    }))
  }

  const validateField = <T extends keyof typeof userUpdateSchema.shape>(
    field: T,
    value: unknown
  ) => {
    const fieldSchema = userUpdateSchema.shape[field]
    if (!fieldSchema) return

    const result = fieldSchema.safeParse(value)

    setErrors((prev) => ({
      ...prev,
      [field]: result.success ? '' : result.error.issues[0].message,
    }))
  }
  const MAX_FILE_SIZE = 10 * 1024 * 1024
  const handleImgChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > MAX_FILE_SIZE) {
      setErrors((prev) => ({
        ...prev,
        profile_img: '프로필 사진은 10MB 이하만 업로드 가능합니다.',
      }))
      e.target.value = ''
      return
    }
    setErrors((prev) => ({
      ...prev,
      profile_img: '',
    }))
    setFile(file)

    const previewUrl = URL.createObjectURL(file)
    setProfileImg(previewUrl)
    validateField('profile_img', file)
  }

  const handleUserDelete = () => {
    deleteUserMutation.mutate({})
    setIsDeleteModalOpen(false)
  }

  const deleteUserMutation = useMutateQuery({
    url: SERVICE_URLS.ACCOUNTS.DELETE(userId!),
    method: 'delete',
    onSuccess: () => {
      alert('회원 삭제가 완료되었습니다.')
      setIsEditMode(false)
      onClose()
      queryClient.invalidateQueries({ queryKey: ['users-list'], exact: false })
    },
    onError: (error) => handleApiError(error, USER_API_ERROR_MESSAGE.delete),
  })

  const updateUserMutation = useMutateQuery({
    url: SERVICE_URLS.ACCOUNTS.DETAIL(userId!),
    method: 'patchForm',
    onSuccess: () => {
      alert('회원 정보가 수정되었습니다.')
      setIsEditMode(false)
      setFile(null)
      refetch()
      queryClient.invalidateQueries({ queryKey: ['users-list'], exact: false })
    },
    onError: (error) => handleApiError(error, USER_API_ERROR_MESSAGE.edit),
  })
  const handleFormEditOk = () => {
    if (!isEditMode) return

    // 닉네임 변경 시 중복 검사 확인
    if (nicknameChanged) {
      if (isNicknameLoading) {
        alert('닉네임 중복 검사 중입니다. 잠시 후 다시 시도해주세요.')
        return
      }

      if (isNicknameError) {
        alert('닉네임을 사용할 수 없습니다. 다른 닉네임을 입력해주세요.')
        return
      }
    }

    const normalizeRole = (role: string) => {
      if (ROLE_LABEL[role as keyof typeof ROLE_LABEL]) return role

      const key = Object.keys(ROLE_LABEL).find(
        (k) => ROLE_LABEL[k as keyof typeof ROLE_LABEL] === role
      )
      return key
    }

    const parsed = userUpdateSchema.safeParse({
      name: form.name,
      gender: form.gender,
      nickname: form.nickname,
      phone_number: form.phone,
      status: form.status,
      profile_img: file ?? undefined,
    })

    if (!parsed.success) {
      const zodError = parsed.error as ZodError
      const messages = zodError.issues.map((issue) => issue.message)
      alert(messages.join('\n'))
      return
    }
    updateUserMutation.mutate({
      ...parsed.data,
      role: normalizeRole(form.role),
    })
  }
  const {
    data: nicknameRes,
    isLoading: isNicknameLoading,
    isError: isNicknameError,
    error: nicknameError,
  } = useCheckNickname(nicknameToCheck)
  const { isAdmin } = useAuthRole()

  if (isLoading) return <Loading label="회원 정보를 로딩 중입니다..." />
  if (!isOpen || !userId) return null
  if (error) return <ErrorMessage>에러가 났습니다.</ErrorMessage>

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="회원 상세 정보"
      className="z-50"
      contentClassName="h-130 overflow-y-auto"
      topCloseButton
      footerClassName="bg-[#F9FAFB]"
      footer={
        <UserDetailFooter
          setIsRoleModalOpen={setIsRoleModalOpen}
          isEditMode={isEditMode}
          handleFormEditOk={handleFormEditOk}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          handleUserDelete={handleUserDelete}
          isDeleteModalOpen={isDeleteModalOpen}
          isAdmin={isAdmin}
          setIsEditMode={setIsEditMode}
        />
      }
    >
      {user && (
        <UserDetailForm
          profileImg={profileImg}
          isEditMode={isEditMode}
          user={user}
          form={form}
          role={role}
          setForm={setForm}
          fileInput={fileInput}
          setRole={setRole}
          isRoleModalOpen={isRoleModalOpen}
          setIsRoleModalOpen={setIsRoleModalOpen}
          handleFormChange={handleFormChange}
          handlePhoneBlur={handlePhoneBlur}
          handleImgChange={handleImgChange}
          nicknameRes={nicknameRes}
          isNicknameLoading={isNicknameLoading}
          isNicknameError={isNicknameError}
          nicknameError={nicknameError}
          errors={errors}
          validateField={validateField}
          handlePhoneChange={handlePhoneChange}
          setIsEditMode={setIsEditMode}
          userId={userId}
        />
      )}
    </Modal>
  )
}
