import { axiosInstance } from '@/lib'

export async function checkNicknameAPI(nickname: string) {
  const response = await axiosInstance.get('/accounts/check-nickname', {
    params: { nickname },
  })
  return response.data
}
