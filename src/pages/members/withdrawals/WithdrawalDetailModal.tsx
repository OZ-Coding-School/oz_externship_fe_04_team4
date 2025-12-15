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
  withdrawalId,
}: WithDrawDetailModalProps) {
  const {
    data: user,
    isLoading,
    error,
  } = useFetchQuery<WithDrawDetailInfo>({
    queryKey: ['withdrawal-detail', withdrawalId],
    url: SERVICE_URLS.WITHDRAWALS.DETAIL(withdrawalId || 0),
    enabled: !!withdrawalId && isOpen,
    staleTime: 60 * 1000,
    gcTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  })

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
    due_date: '',
    withdrawn_at: '',
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
      withdrawn_at: user.withdrawn_at
        ? dayjs(user.withdrawn_at).locale('ko').format('YYYY. M. D. A h:mm:ss')
        : '',
      due_date: user.due_date
        ? dayjs(user.due_date).locale('ko').format('YYYY. M. D. A h:mm:ss')
        : '',
    })
  }, [user])

  if (isLoading) return <Loading label="회원 정보를 로딩 중입니다..." />
  if (!isOpen || !withdrawalId) return null
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
      footer={
        <WithdrawalDetailFooter
          onClose={onClose}
          status={form.status}
          withdrawalId={withdrawalId}
        />
      }
    >
      {user && <WithdrawalDetailForm form={form} />}
    </Modal>
  )
}
