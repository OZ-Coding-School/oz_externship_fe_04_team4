import { useQueryClient } from '@tanstack/react-query'
import type { Dispatch, SetStateAction } from 'react'

import { handleApiError } from '@/api/handleApiError'
import Button from '@/components/common/Button'
import Modal from '@/components/common/Modal'
import { SERVICE_URLS } from '@/config/serviceUrls'
import { useMutateQuery } from '@/hooks/useMutateQuery'
import { USER_API_ERROR_MESSAGE } from '@/pages/members/users/api/userErrorMessageMap'
type UserDetailChangeRoleProps = {
  setRole: Dispatch<SetStateAction<string>>
  isRoleModalOpen: boolean
  setIsRoleModalOpen: Dispatch<SetStateAction<boolean>>
  setIsEditMode: Dispatch<SetStateAction<boolean>>
  userId: number
  role: string
}
export function UserDetailChangeRole({
  setRole,
  isRoleModalOpen,
  setIsRoleModalOpen,
  setIsEditMode,
  userId,
  role,
}: UserDetailChangeRoleProps) {
  const queryClient = useQueryClient()
  const updateUserRoleMutation = useMutateQuery({
    url: SERVICE_URLS.ACCOUNTS.CHANGE_ROLE(userId!),
    method: 'patch',
    onSuccess: () => {
      alert('권한이 변경 되었습니다.')
      queryClient.setQueryData(['user-detail', userId], (prev: unknown) => {
        if (!prev) return prev
        return { ...prev, role }
      })

      queryClient.invalidateQueries({
        queryKey: ['users-list'],
        exact: false,
      })

      setIsEditMode(false)
      setIsRoleModalOpen(false)
    },
    onError: (error) =>
      handleApiError(error, USER_API_ERROR_MESSAGE.changeRole),
  })
  const handleChangedUserRole = () => {
    updateUserRoleMutation.mutate({ role })
  }

  return (
    <Modal
      isOpen={isRoleModalOpen}
      onClose={() => setIsRoleModalOpen(false)}
      title="권한 변경"
      className="z-60"
      titleClassName="border-b-0"
      footerClassName="border-t-0"
      footer={
        <div className="flex w-full items-center justify-end gap-2">
          <Button
            className="bg-primary-blue text-white"
            onClick={handleChangedUserRole}
          >
            저장
          </Button>
          <Button variant="cancel" onClick={() => setIsRoleModalOpen(false)}>
            취소
          </Button>
        </div>
      }
    >
      <div className="flex flex-col gap-3">
        <label
          htmlFor="admin"
          className="flex h-full w-full rounded-lg text-base text-black"
        >
          <input
            type="radio"
            id="admin"
            name="role-choice"
            className="peer sr-only"
            value="admin"
            onChange={(e) => setRole(e.target.value)}
          />
          <span className="flex h-full w-full rounded-lg border border-[#E5E7EB] bg-white px-4 py-3 peer-checked:border peer-checked:border-[#BFDBFE] peer-checked:bg-[#EFF6FF] peer-checked:text-base peer-checked:text-[#2563EB]">
            관리자
          </span>
        </label>
        <label
          htmlFor="staff"
          className="flex h-full w-full rounded-lg text-base text-black"
        >
          <input
            type="radio"
            id="staff"
            value="staff"
            name="role-choice"
            className="peer sr-only"
            onChange={(e) => setRole(e.target.value)}
          />
          <span className="flex h-full w-full rounded-lg border border-[#E5E7EB] bg-white px-4 py-3 peer-checked:border peer-checked:border-[#BFDBFE] peer-checked:bg-[#EFF6FF] peer-checked:text-base peer-checked:text-[#2563EB]">
            스태프
          </span>
        </label>
        <label
          htmlFor="user"
          className="flex h-full w-full rounded-lg text-base text-black"
        >
          <input
            type="radio"
            id="user"
            name="role-choice"
            className="peer sr-only"
            value="user"
            onChange={(e) => setRole(e.target.value)}
          />
          <span className="flex h-full w-full rounded-lg border border-[#E5E7EB] bg-white px-4 py-3 peer-checked:border peer-checked:border-[#BFDBFE] peer-checked:bg-[#EFF6FF] peer-checked:text-base peer-checked:text-[#2563EB]">
            일반회원
          </span>
        </label>
      </div>
    </Modal>
  )
}
