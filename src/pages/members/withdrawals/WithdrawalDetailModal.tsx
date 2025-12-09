import dayjs from 'dayjs'
import 'dayjs/locale/ko'
import { useEffect, useState } from 'react'

import Modal from '@/components/common/Modal'
import { ROLE_LABEL } from '@/config/role'
import { SERVICE_URLS } from '@/config/serviceUrls'
import { STATUS_LABEL } from '@/config/status'
import { useFetchQuery } from '@/hooks/useFetchQuery'
import { WithdrawalDetailFooter } from '@/pages/members/withdrawals/WithdrawalDetailFooter'
import { WithdrawalDetailForm } from '@/pages/members/withdrawals/WithdrawalDetailForm'
import type {
  WithDrawDetailInfo,
  WithDrawDetailModalProps,
  WithDrawwDetailFormType,
} from '@/pages/types/withdraw'
export function WithdrawalDetailModal({
  isOpen,
  onClose,
  userId,
}: WithDrawDetailModalProps) {
  const {
    data: user,
    isLoading,
    error,
    // refetch,
  } = useFetchQuery<WithDrawDetailInfo>({
    queryKey: ['withdrawal-detail', userId],
    url: SERVICE_URLS.WITHDRAWALS.DETAIL(userId || 0),
    enabled: !!userId && isOpen,
    staleTime: 60 * 1000,
    gcTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  })

  console.log('📌 API 응답:', user)

  // const queryClient = useQueryClient()
  const [form, setForm] = useState<WithDrawwDetailFormType>({
    id: userId ?? 0,
    email: '',
    nickname: '',
    name: '',
    gender: '',
    role: '',
    created_at: '',
    status: '',
    profile_img_url: '',
  })

  useEffect(() => {
    if (!user) return
    const u = user.user
    setForm({
      id: u.id,
      email: u.email,
      nickname: u.nickname,
      name: u.name,
      gender: u.gender,
      role: ROLE_LABEL[u.role as keyof typeof ROLE_LABEL] ?? '',
      created_at: u.created_at
        ? dayjs(u.created_at).locale('ko').format('YYYY. M. D. A h:mm:ss')
        : '',
      status: STATUS_LABEL[u.status as keyof typeof STATUS_LABEL] ?? '',
      profile_img_url: u.profile_img_url,
    })
  }, [user])

  // useEffect(() => {

  //   if (!isDeleteModalOpen) {
  //     setIsDeleteModalOpen(false)
  //   }
  // }, [isOpen, isDeleteModalOpen, user])

  // const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target

  //   setForm((prev) => ({
  //     ...prev,
  //     [name]: value,
  //   }))
  // }

  // const handleUserDelete = () => {
  //   deleteUserMutation.mutate({})
  // }

  // const deleteUserMutation = useMutateQuery({
  //   url: SERVICE_URLS.ACCOUNTS.DELETE(userId!),
  //   method: 'delete',
  //   onSuccess: () => {
  //     alert('회원 삭제가 완료되었습니다.')

  //     onClose()
  //     queryClient.invalidateQueries({ queryKey: ['users-list'], exact: false })
  //   },
  // })

  // const updateUserMutation = useMutateQuery({
  //   url: SERVICE_URLS.WITHDRAWALS.DETAIL(userId!),
  //   method: 'postForm',
  //   onSuccess: () => {
  //     alert('회원 정보가 수정되었습니다.')
  //     refetch()
  //     queryClient.invalidateQueries({ queryKey: ['users-list'], exact: false })
  //   },
  // })

  // const { isAdmin } = useAuthRole()

  if (!isOpen || !userId) return null
  if (isLoading) return <div>회원 정보를 로딩 중입니다...</div>
  if (error) return <div>에러가 났습니다</div>

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="회원 탈퇴 상세 정보"
      className="z-50"
      contentClassName="h-130 overflow-y-auto"
      topCloseButton
      footerClassName="bg-[#F9FAFB]"
      footer={<WithdrawalDetailFooter />}
    >
      {user && (
        <WithdrawalDetailForm
          user={user}
          setForm={setForm}
          form={form}
          // handleFormChange={handleFormChange}
        />
      )}
    </Modal>
  )
}
