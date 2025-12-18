import type { UserDetailUser } from '@/pages/types/users'

type UserDetailProfile = {
  isEditMode: boolean
  profileImg: string
  handleImgChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  user: UserDetailUser
  errors: Record<string, string>
}
export function UserDetailProfile({
  isEditMode,
  profileImg,
  handleImgChange,
  user,
  errors,
}: UserDetailProfile) {
  const inputId = `profile-input-${user.id}`
  return (
    <>
      <div className="flex items-center justify-start gap-4">
        <div className="relative px-2 pb-6 text-center">
          <label
            htmlFor={inputId}
            className={`flex flex-col items-center gap-1 ${
              isEditMode ? 'cursor-pointer' : 'cursor-default'
            }`}
          >
            <img
              src={profileImg || user.profile_img_url}
              alt="회원 프로필 사진"
              className="h-20 w-20 rounded-full object-cover"
              onError={(e) => {
                e.currentTarget.src = 'https://placehold.co/80'
              }}
            />

            {isEditMode && (
              <span className="text-base font-medium text-[#2563EB]">
                프로필 사진 변경
              </span>
            )}
          </label>

          {isEditMode && (
            <input
              id={inputId}
              type="file"
              accept="image/*"
              onChange={handleImgChange}
              className="hidden"
            />
          )}
        </div>

        <div className="-mt-6 flex flex-col">
          <span className="text-xl font-semibold">{user.role}</span>
          <span className="text-base">{user.email}</span>
        </div>
      </div>

      {isEditMode && errors.profile_img && (
        <span className="text-sm text-red-500">{errors.profile_img}</span>
      )}
    </>
  )
}
