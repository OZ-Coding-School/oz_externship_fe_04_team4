import type { Dispatch, SetStateAction } from 'react'

import Button from '@/components/common/Button'
import Modal from '@/components/common/Modal'

export interface UserDetailMemberDeleteProps {
  setIsDeleteModalOpen: Dispatch<SetStateAction<boolean>>
  isDeleteModalOpen: boolean
  handleUserDelete: () => void
}
export function UserDetailMemberDelete({
  setIsDeleteModalOpen,
  isDeleteModalOpen,
  handleUserDelete,
}: UserDetailMemberDeleteProps) {
  return (
    <Modal
      className="w-110"
      titleClassName="pb-0 border-b-0"
      title="회원 삭제 확인"
      isOpen={isDeleteModalOpen}
      onClose={() => setIsDeleteModalOpen(false)}
      footerClassName="border-t-0 pt-0"
      footer={
        <div className="flex w-full flex-row justify-end gap-3">
          <Button variant="cancel" onClick={() => setIsDeleteModalOpen(false)}>
            취소
          </Button>
          <Button variant="delete" onClick={handleUserDelete}>
            삭제
          </Button>
        </div>
      }
    >
      <div className="text-base text-[#4B5563]">
        삭제 시 해당 유저와 관련된 모든 데이터가 즉시 삭제되며 되돌릴 수
        없습니다.
      </div>
    </Modal>
  )
}
