import { useQueryClient } from '@tanstack/react-query'
import dayjs from 'dayjs'
import 'dayjs/locale/ko'
import { useEffect, useRef, useState } from 'react'

import Modal from '@/components/common/Modal'
import { ROLE_LABEL } from '@/config/role'
import { SERVICE_URLS } from '@/config/serviceUrls'
import { STATUS_LABEL } from '@/config/status'
import { useAuthRole } from '@/hooks/useAuthRole'
import { useFetchQuery } from '@/hooks/useFetchQuery'
import { useMutateQuery } from '@/hooks/useMutateQuery'
import { UserDetailFooter } from '@/pages/members/users/UserDetailFooter'
import { UserDetailForm } from '@/pages/members/users/UserDetailForm'
import type { UserFormType } from '@/pages/types/users'
import type {
  WithDrawDetailInfo,
  WithDrawDetailModalProps,
} from '@/pages/types/withdraw'
import { formatPhoneNumber } from '@/utils/formatPhoneNumber'
export function WithdrawalDetailModal({
  isOpen,
  onClose,
  userId,
}: WithDrawDetailModalProps) {
  const {
    data: user,
    isLoading,
    error,
    refetch,
  } = useFetchQuery<WithDrawDetailInfo>({
    queryKey: ['withdrawal-detail', userId],
    url: SERVICE_URLS.WITHDRAWALS.DETAIL(userId || 0),
    enabled: !!userId && isOpen,
  })
  const queryClient = useQueryClient()
  const [isEditMode, setIsEditMode] = useState(false)
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [profileImg, setProfileImg] = useState<string>('')
  const [file, setFile] = useState<File | null>(null)
  const fileInput = useRef<HTMLInputElement | null>(null)
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

  useEffect(() => {
    if (!user) return
    setForm({
      id: user.id,
      name: user.name,
      nickname: user.nickname,
      phone: user.phone_number ? formatPhoneNumber(user.phone_number) : '',
      status: STATUS_LABEL[user.status as keyof typeof STATUS_LABEL] ?? '',
      email: user.email,
      gender: user.gender,
      birthday: user.birthday,
      role: ROLE_LABEL[user.role as keyof typeof ROLE_LABEL] ?? '',
      //joinDateTime: user.created_at ? formatDataTimeForUserDetail(user.created_at) : '',
      joinDateTime: user.created_at
        ? dayjs(user.created_at).locale('ko').format('YYYY. M. D. A h:mm:ss')
        : '',
    })
  }, [user])

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

  const handlePhoneBlur = () => {
    setForm((prev) => ({
      ...prev,
      phone: formatPhoneNumber(prev.phone),
    }))
  }

  const handleImgChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0]
    if (!file) return

    setFile(file)

    const previewUrl = URL.createObjectURL(file)
    setProfileImg(previewUrl)
  }

  const handleUserDelete = () => {
    deleteUserMutation.mutate({})
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
  })

  const updateUserMutation = useMutateQuery({
    url: SERVICE_URLS.ACCOUNTS.DETAIL(userId!),
    method: 'postForm',
    onSuccess: () => {
      alert('회원 정보가 수정되었습니다.')
      setIsEditMode(false)
      setFile(null)
      refetch()
      queryClient.invalidateQueries({ queryKey: ['users-list'], exact: false })
    },
  })
  const handleFormEditOk = () => {
    const statusMap: Record<string, string> = {
      활성: 'active',
      비활성: 'inactive',
      탈퇴: 'withdraw',
    }
    const normalizeRole = (role: string) => {
      if (ROLE_LABEL[role as keyof typeof ROLE_LABEL]) return role

      const key = Object.keys(ROLE_LABEL).find(
        (k) => ROLE_LABEL[k as keyof typeof ROLE_LABEL] === role
      )
      return key
    }
    updateUserMutation.mutate({
      name: form.name,
      nickname: form.nickname,
      phone_number: form.phone,
      gender: form.gender,
      status: statusMap[form.status],
      role: normalizeRole(form.role),
      profile_img: file ?? undefined,
    })
  }

  const { isAdmin } = useAuthRole()

  if (!isOpen || !userId) return null
  if (isLoading) return <div>회원 정보를 로딩 중입니다...</div>
  if (error) return <div>에러가 났습니다</div>

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
          setIsEditMode={setIsEditMode}
          isDeleteModalOpen={isDeleteModalOpen}
          isAdmin={isAdmin}
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
        />
      )}
    </Modal>
  )
}
