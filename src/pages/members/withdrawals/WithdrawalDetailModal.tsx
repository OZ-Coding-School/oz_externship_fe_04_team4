import dayjs from 'dayjs'
import 'dayjs/locale/ko'
import { useEffect, useState } from 'react'

import { ErrorMessage } from '@/components/common/ErrorMessage'
import { Loading } from '@/components/common/Loading'
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

  if (isLoading) return <Loading label="회원 정보를 로딩 중입니다..." />
  if (!isOpen || !userId) return null
  if (error) return <ErrorMessage />

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
        <WithdrawalDetailForm user={user} setForm={setForm} form={form} />
      )}
    </Modal>
  )
}
