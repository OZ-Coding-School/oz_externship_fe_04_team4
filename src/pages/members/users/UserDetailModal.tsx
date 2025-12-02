import type { ReactNode } from 'react'

import Button from '@/components/common/Button'
import Input from '@/components/common/Input'
import Modal from '@/components/common/Modal'
import { SERVICE_URLS } from '@/config/serviceUrls'
import { useFetchQuery } from '@/hooks/useFetchQuery'
interface UserDetailModalProps {
  isOpen: boolean
  onClose: () => void
  userId: number | null
  footer?: ReactNode
}

interface UserDetailUser {
  birthday: string
  created_at: string
  email: string
  gender: string
  id: number
  name: string
  nickname: string
  phone_number: string
  profile_img_url: string
  role: string
  status: string
}

export function UserDetailModal({
  isOpen,
  onClose,
  userId,
}: UserDetailModalProps) {
  const {
    data: user,
    isLoading,
    error,
  } = useFetchQuery<UserDetailUser>({
    queryKey: ['users', userId],
    url: SERVICE_URLS.ACCOUNTS.DETAIL(userId || 0),
    enabled: !!userId && isOpen,
  })

  console.log('회원정보 data', user)

  if (!isOpen || !userId) return null
  if (isLoading) return <div>회원 정보를 로딩 중입니다...</div>
  if (error) return <div>에러가 났습니다</div>
  {
    return (
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title="회원 상세 정보"
        contentClassName="h-130 overflow-y-auto"
        topCloseButton
        footerClassName="bg-[#F9FAFB]"
        footer={
          <div className="flex w-full items-center justify-between">
            <Button variant="custom" className="bg-primary-green text-white">
              권한 변경하기
            </Button>
            <div className="flex justify-end gap-3">
              <Button variant="custom" className="bg-primary-blue text-white">
                수정하기
              </Button>
              <Button variant="delete">삭제하기</Button>
            </div>
          </div>
        }
      >
        {user && (
          <div>
            <div className="flex items-center justify-start gap-4">
              <div>
                <img
                  src="https://placehold.co/80"
                  title={user.profile_img_url}
                  className="overflow-hidden rounded-full"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-semibold">{user.role}</span>
                <span className="text-base">{user.email}</span>
              </div>
            </div>
            <div className="flex justify-between pt-6">
              <div className="flex flex-col gap-6">
                <Input label="회원ID" value={user.id} />
                <Input label="이름" value={user.name} />
                <Input label="닉네임" value={user.nickname} />
                <Input label="연락처" value={user.phone_number} />
                <Input label="상태" value={user.status} />
              </div>
              <div className="flex flex-col gap-6">
                <Input label="이메일" value={user.email} />
                <Input label="성별" value={user.gender} />
                <Input label="생년월일" value={user.birthday} />
                <Input label="권한" value={user.role} />
                <Input label="회원가입 일시" value={user.created_at} />
              </div>
            </div>
          </div>
        )}
      </Modal>
    )
  }
}
