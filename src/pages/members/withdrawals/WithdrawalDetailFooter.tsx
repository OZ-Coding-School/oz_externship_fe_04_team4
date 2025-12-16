import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'

import { handleApiError } from '@/api/handleApiError'
import Button from '@/components/common/Button'
import Modal from '@/components/common/Modal'
import { SERVICE_URLS } from '@/config/serviceUrls'
import { useMutateQuery } from '@/hooks/useMutateQuery'
import { USER_API_ERROR_MESSAGE } from '@/pages/members/users/api/userErrorMessageMap'
interface WithdrawalDetailFooterProps {
  status?: string
  onClose: () => void
  withdrawalId: number
}
export function WithdrawalDetailFooter({
  withdrawalId,
  onClose,
}: WithdrawalDetailFooterProps) {
  const queryClient = useQueryClient()
  const [isRecoveryModalOpen, setIsRecoveryModalOpen] = useState(false)
  const RestoreUserMutation = useMutateQuery<string, number>({
    url: SERVICE_URLS.ACCOUNTS.ACTIVATE(withdrawalId!),
    method: 'post',
    onSuccess: () => {
      alert('회원 복구가 완료되었습니다.')
      onClose()
      queryClient.invalidateQueries({ queryKey: ['users-list'], exact: false })
    },
    onError: (error) => handleApiError(error, USER_API_ERROR_MESSAGE.recovery),
  })
  const handleUserRecovery = () => {
    setIsRecoveryModalOpen(true)
  }
  const handleUserRecoveryDone = () => {
    RestoreUserMutation.mutate(withdrawalId)
  }
  return (
    <div className="flex w-full items-center justify-end">
      <div className="flex justify-end gap-3">
        <Button
          className="border-primary-light-gray text-primary-dark-gray border bg-white"
          onClick={onClose}
          type="button"
        >
          닫기
        </Button>
        <Button
          variant="custom"
          type="button"
          className="bg-primary-green text-white"
          onClick={handleUserRecovery}
        >
          회원 복구하기
        </Button>
        <Modal
          isOpen={isRecoveryModalOpen}
          onClose={onClose}
          title="회원 탈퇴 상세 정보"
          className="z-50 w-md"
          titleClassName="border-b-0"
          contentClassName="overflow-y-auto pt-0 h-20"
          footerClassName="p-0 border-t-0 pb-6 pr-6"
          footer={
            <div className="flex w-full justify-end">
              <Button
                variant="cancel"
                type="button"
                onClick={() => {
                  setIsRecoveryModalOpen(false)
                }}
              >
                취소
              </Button>
              <Button
                variant="custom"
                type="button"
                className="btn bg-primary-green ml-3 text-white"
                onClick={handleUserRecoveryDone}
              >
                복구
              </Button>
            </div>
          }
        >
          <p>
            해당 유저의 탈퇴요청은 삭제되며 해당 유저는 즉시 이용가능
            <span className="block">한 상태로 복구됩니다.</span>
          </p>
        </Modal>
      </div>
    </div>
  )
}
