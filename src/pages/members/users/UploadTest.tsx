import React from 'react'

import { useS3Upload } from '@/pages/members/users/hook/s3UploadService'

export const UploadTest = () => {
  const { mutate, isPending } = useS3Upload()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // 훅 실행! (URL 받기 -> S3 업로드가 한 번에 진행됨)
      mutate(file)
    }
  }
  //   console.log('현재 설정된 S3 API 주소:', SERVICE_URLS.S3_PERSIGNEDURL)
  //   console.log('현재 설정된 S3 API 주소:', SERVICE_URLS.ACCOUNTS.LIST)
  return (
    <div style={{ padding: '20px', border: '1px dashed #ccc' }}>
      <h3>S3 업로드 테스트</h3>
      <input type="file" onChange={handleFileChange} disabled={isPending} />

      {isPending && <p>업로드 중... (1. URL 생성 중 2. S3 전송 중)</p>}

      <div style={{ marginTop: '10px', fontSize: '12px', color: '#666' }}>
        * 파일을 선택하면 자동으로 Pre-signed URL을 받고 업로드까지 수행합니다.
      </div>
    </div>
  )
}
