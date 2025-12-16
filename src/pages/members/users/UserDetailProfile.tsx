import type { UserDetailUser } from '@/pages/types/users'

type UserDetailProfile = {
  isEditMode: boolean
  profileImg: string
  fileInput: React.RefObject<HTMLInputElement | null>
  handleImgChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  user: UserDetailUser
  errors: Record<string, string>
}
export function UserDetailProfile({
  isEditMode,
  profileImg,
  fileInput,
  handleImgChange,
  user,
  errors,
}: UserDetailProfile) {
  return (
    <>
      <div className="flex items-center justify-start gap-4">
        <div className="relative px-2 pb-6 text-center">
          <label htmlFor="file-input">
            <img
              src={profileImg || user.profile_img_url}
              alt="회원 프로필 사진"
              className="h-20 w-20 rounded-full object-cover"
              onError={(e) => {
                e.currentTarget.src = 'https://placehold.co/80'
              }}
            />
          </label>
          {isEditMode && (
            <>
              <button
                className="absolute right-0 bottom-0 left-0 z-60 cursor-pointer text-base leading-none font-medium whitespace-nowrap text-[#2563EB]"
                onClick={() => fileInput.current?.click()}
              >
                프로필 사진 변경
              </button>
              <input
                ref={fileInput}
                type="file"
                accept="image/png, image/gif, image/jpeg"
                id="file-input"
                onChange={handleImgChange}
                className="hidden"
              />
            </>
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
