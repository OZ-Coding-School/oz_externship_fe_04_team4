import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

import { axiosInstance } from '@/api/axios'
import { API_URL } from '@/config/api'

// --- 1. 타입 정의 ---
export interface PresignedUrlRequest {
  type: 'USER_PROFILE_IMAGE'
  content_type: string
  file_name: string
  file_ext: string
}

export interface PresignedUrlResponse {
  upload_url: string // S3에 파일을 업로드할 때 쓸 URL (PUT용)
  file_url: string // 업로드 완료 후 이미지 태그 등에 쓸 URL (조회용)
}

// --- 2. API 함수들 ---

/**
 * 단계 1: 서버로부터 Pre-signed URL 받아오기 (GET)
 */
const getPresignedUrl = async (
  params: PresignedUrlRequest
): Promise<PresignedUrlResponse> => {
  const response = await axiosInstance.get(`${API_URL}/s3-presigned-url`, {
    params,
  })
  // 만약 서버 응답이 { data: { upload_url: ... } } 식의 구조라면
  // return response.data.data; 로 접근해야 할 수도 있습니다.

  console.log('서버에서 온 데이터:', `${API_URL}/s3-presigned-url`) // 여기서 구조를 눈으로 확인하세요!
  console.log('서버에서 온 데이터:', response.data) // 여기서 구조를 눈으로 확인하세요!
  return response.data
}
const uploadFileToS3 = async (uploadUrl: string, file: File) => {
  // 🔥 S3 업로드는 '순수 axios'를 사용해야 합니다. (BaseURL 영향 방지)
  await axios.put(uploadUrl, file, {
    headers: { 'Content-Type': file.type },
  })
}

export const useS3Upload = () => {
  return useMutation({
    mutationFn: async (file: File) => {
      // 1. URL 가져오기
      const response = await getPresignedUrl({
        type: 'USER_PROFILE_IMAGE',
        content_type: file.type,
        file_name: file.name,
        file_ext: file.name.split('.').pop() || '',
      })

      // 2. S3 업로드 (서버 응답 필드명이 다를 수 있으니 확인 필수!)
      const upload_url = response.upload_url
      const file_url = response.file_url

      await uploadFileToS3(upload_url, file)
      return file_url
    },
    onSuccess: (fileUrl) => {
      alert('업로드 완료!')
    },
  })
}
