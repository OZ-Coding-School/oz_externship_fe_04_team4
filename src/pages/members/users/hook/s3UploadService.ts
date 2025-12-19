import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

import { axiosInstance } from '@/api/axios'
import { API_URL } from '@/config'

export interface PresignedUrlRequest {
  type: 'USER_PROFILE_IMAGE'
  content_type: string
  file_name: string
  file_ext: string
}

export interface PresignedUrlResponse {
  upload_url: string
  file_url: string
}

const getPresignedUrl = async (
  params: PresignedUrlRequest
): Promise<PresignedUrlResponse> => {
  const response = await axiosInstance.get(`${API_URL}/s3-presigned-url`, {
    params,
  })

  return response.data
}
const uploadFileToS3 = async (uploadUrl: string, file: File) => {
  await axios.put(uploadUrl, file, {
    headers: { 'Content-Type': file.type },
  })
}

export const useS3Upload = () => {
  return useMutation({
    mutationFn: async (file: File) => {
      //  URL 가져오기
      const response = await getPresignedUrl({
        type: 'USER_PROFILE_IMAGE',
        content_type: file.type,
        file_name: file.name,
        file_ext: file.name.split('.').pop() || '',
      })

      const { upload_url, file_url } = response

      //  S3 업로드
      await uploadFileToS3(upload_url, file)

      //  최종 URL 반환
      return file_url
    },
    onSuccess: (_fileUrl) => {
      alert(`업로드 완료!`)
    },
    onError: (_error) => {
      alert('업로드에 실패했습니다. 다시 시도해주세요.')
    },
  })
}
