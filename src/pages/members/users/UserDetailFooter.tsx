import Button from '@/components/common/Button'
import { UserDetailMemberDelete } from '@/pages/members/users/UserDetailMemberDelete'

interface UserDetailFooterProps {
  setIsRoleModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  isEditMode: boolean
  isDeleteModalOpen: boolean
  handleFormEditOk: () => void
  setIsDeleteModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  handleUserDelete: () => void
  setIsEditMode: React.Dispatch<React.SetStateAction<boolean>>
  isAdmin: boolean | null
}
export function UserDetailFooter({
  setIsRoleModalOpen,
  isEditMode,
  handleFormEditOk,
  isDeleteModalOpen,
  setIsDeleteModalOpen,
  handleUserDelete,
  setIsEditMode,
  isAdmin,
}: UserDetailFooterProps) {
  return (
    <div className="flex w-full items-center justify-between">
      {isAdmin && (
        <Button
          variant="custom"
          className="bg-primary-green text-white"
          onClick={() => {
            setIsRoleModalOpen(true)
          }}
        >
          권한 변경하기
        </Button>
      )}
      <div className="flex justify-end gap-3">
        {isEditMode ? (
          <Button
            variant="custom"
            className="bg-primary-blue text-white"
            onClick={handleFormEditOk}
          >
            수정완료
          </Button>
        ) : (
          <Button
            variant="custom"
            className="bg-primary-blue text-white"
            onClick={() => setIsEditMode((prev) => !prev)}
          >
            수정하기
          </Button>
        )}
        {isAdmin && (
          <>
            <Button variant="delete" onClick={() => setIsDeleteModalOpen(true)}>
              삭제하기
            </Button>
            <UserDetailMemberDelete
              isDeleteModalOpen={isDeleteModalOpen}
              setIsDeleteModalOpen={setIsDeleteModalOpen}
              handleUserDelete={handleUserDelete}
            />
          </>
        )}
      </div>
    </div>
  )
}
