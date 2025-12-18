import { useState } from 'react'

import type { userUpdateSchema } from '@/pages/members/users/schema/userUpdateSchema'

const MAX_FILE_SIZE = 10 * 1024 * 1024
type ValidateField = <T extends keyof typeof userUpdateSchema.shape>(
  field: T,
  value: unknown
) => void

export function useUserProfileImage(validateField: ValidateField) {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState('')
  const [error, setError] = useState('')

  const handleImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > MAX_FILE_SIZE) {
      setError('프로필 사진은 10MB 이하만 업로드 가능합니다.')
      e.target.value = ''
      return
    }

    setError('')
    setFile(file)
    setPreview(URL.createObjectURL(file))
    validateField('profile_img', file)
  }

  const resetImage = () => {
    setFile(null)
    setPreview('')
    setError('')
  }

  return {
    file,
    preview,
    error,
    handleImgChange,
    resetImage,
  }
}
