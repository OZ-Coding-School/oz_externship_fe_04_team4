import { useQueryClient } from '@tanstack/react-query'
import dayjs from 'dayjs'
import 'dayjs/locale/ko'
import { useEffect, useState } from 'react'

import { handleApiError } from '@/api/handleApiError'
import { ErrorMessage } from '@/components/common/ErrorMessage'
import { Loading } from '@/components/common/Loading'
import Modal from '@/components/common/Modal'
import { ROLE_LABEL } from '@/config/role'
import { SERVICE_URLS } from '@/config/serviceUrls'
import { useAuthRole } from '@/hooks/useAuthRole'
import { useFetchQuery } from '@/hooks/useFetchQuery'
import { useMutateQuery } from '@/hooks/useMutateQuery'
import { USER_API_ERROR_MESSAGE } from '@/pages/members/users/api/userErrorMessageMap'
import { useUserDetailForm } from '@/pages/members/users/hook/useUserDetailForm'
import { userUpdateSchema } from '@/pages/members/users/schema/userUpdateSchema'
import { UserDetailFooter } from '@/pages/members/users/UserDetailFooter'
import { UserDetailForm } from '@/pages/members/users/UserDetailForm'
import type { UserDetailModalProps, UserDetailUser } from '@/pages/types/users'
export function UserDetailModal({
  isOpen,
  onClose,
  userId,
}: UserDetailModalProps) {
  const queryClient = useQueryClient()

  const { data: user, isLoading } = useFetchQuery<UserDetailUser>({
    queryKey: ['user-detail', userId],
    url: SERVICE_URLS.ACCOUNTS.DETAIL(userId || 0),
    enabled: !!userId && isOpen,
  })
  const { form, setForm, errors, validateField } = useUserDetailForm()
  const [isEditMode, setIsEditMode] = useState(false)
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [profileImg, setProfileImg] = useState<string>('')
  const [file, setFile] = useState<File | null>(null)
  const [role, setRole] = useState('')

  useEffect(() => {
    if (!user) return

    setForm({
      id: user.id,
      name: user.name,
      nickname: user.nickname,
      phone: user.phone_number?.replace(/\D/g, '') ?? '',
      status: user.status,
      email: user.email,
      gender: user.gender,
      birthday: user.birthday,
      role: ROLE_LABEL[user.role as keyof typeof ROLE_LABEL] ?? '',
      joinDateTime: dayjs(user.created_at)
        .locale('ko')
        .format('YYYY. M. D. A h:mm:ss'),
    })
  }, [user, setForm])
  useEffect(() => {
    if (!user?.profile_img_url) {
      setProfileImg('')
      return
    }

    setProfileImg(`${user.profile_img_url}?t=${Date.now()}`)
  }, [user?.profile_img_url])
  const updateUserMutation = useMutateQuery({
    url: SERVICE_URLS.ACCOUNTS.DETAIL(userId!),
    method: 'patchForm',
    onSuccess: () => {
      alert('회원 정보가 수정되었습니다.')
      setIsEditMode(false)
      setFile(null)
      queryClient.invalidateQueries({
        queryKey: ['user-detail', userId],
      })
      queryClient.invalidateQueries({ queryKey: ['users-list'], exact: false })
    },
    onError: (error) => handleApiError(error, USER_API_ERROR_MESSAGE.edit),
  })

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

  const MAX_FILE_SIZE = 10 * 1024 * 1024

  const handleImgChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > MAX_FILE_SIZE) {
      alert('프로필 사진은 10MB 이하만 업로드 가능합니다.')
      e.target.value = ''
      return
    }
  }
  const handleUserDelete = () => {
    deleteUserMutation.mutate({})
    setIsDeleteModalOpen(false)
  }

  const handleFormEditOk = () => {
    if (!isEditMode) return

    const parsed = userUpdateSchema.safeParse({
      name: form.name,
      gender: form.gender,
      nickname: form.nickname,
      phone_number: form.phone,
      status: form.status,
      profile_img: file ?? undefined,
    })

    if (!parsed.success) {
      alert(parsed.error.issues.map((i) => i.message).join('\n'))
      return
    }

    updateUserMutation.mutate(parsed.data)
  }

  const { isAdmin } = useAuthRole()
  if (isLoading) return <Loading label="회원 정보를 로딩 중입니다..." />
  if (!isOpen) return null
  if (Object.keys(errors).length > 0) {
    return <ErrorMessage>에러가 났습니다.</ErrorMessage>
  }
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
          user={user}
          profileImg={profileImg}
          isEditMode={isEditMode}
          role={role}
          form={form}
          setForm={setForm}
          setRole={setRole}
          isRoleModalOpen={isRoleModalOpen}
          setIsRoleModalOpen={setIsRoleModalOpen}
          setIsEditMode={setIsEditMode}
          userId={Number(userId)}
          errors={errors}
          validateField={validateField}
          handleImgChange={handleImgChange}
        />
      )}
    </Modal>
  )
}
