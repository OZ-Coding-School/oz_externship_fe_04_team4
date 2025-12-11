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
  withdrawalId,
}: WithDrawDetailModalProps) {
  const {
    data: user,
    isLoading,
    error,
    // refetch,
  } = useFetchQuery<WithDrawDetailInfo>({
    queryKey: ['withdrawal-detail', withdrawalId],
    url: SERVICE_URLS.WITHDRAWALS.DETAIL(withdrawalId || 0),
    enabled: !!withdrawalId && isOpen,
    staleTime: 60 * 1000,
    gcTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  })

  console.log('📌 API 응답:', user)

  // const queryClient = useQueryClient()
  const [form, setForm] = useState<WithDrawwDetailFormType>({
    id: withdrawalId ?? 0,
    email: '',
    nickname: '',
    name: '',
    gender: '',
    role: '',
    created_at: '',
    status: '',
    profile_img_url: '',
    reason: '',
    reason_detail: '',
  })

  useEffect(() => {
    if (!user) return
    const member = user.user
    setForm({
      id: member.id,
      email: member.email,
      nickname: member.nickname,
      name: member.name,
      gender: member.gender,
      role: ROLE_LABEL[member.role as keyof typeof ROLE_LABEL] ?? '',
      created_at: member.created_at
        ? dayjs(member.created_at).locale('ko').format('YYYY. M. D. A h:mm:ss')
        : '',
      status: STATUS_LABEL[member.status as keyof typeof STATUS_LABEL] ?? '',
      profile_img_url: member.profile_img_url,
      reason: user.reason,
      reason_detail: user.reason_detail,
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

  if (!isOpen || !withdrawalId) return null
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
          form={form}
          // handleFormChange={handleFormChange}
        />
      )}
    </Modal>
  )
}
