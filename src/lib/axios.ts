import axios, { AxiosError } from 'axios'

import { ADMIN_API_URL } from '@/config/api'
import { useAuthStore } from '@/store/authStore'

export const axiosInstance = axios.create({
  baseURL: ADMIN_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

axiosInstance.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().accessToken
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
axiosInstance.interceptors.response.use(
  (response) => {
    if (response.status !== 200 && !response.data) {
      return Promise.reject(new AxiosError('서버 응답이 올바르지 않습니다'))
    }
    // Table 컴포넌트의 데이터 형식 추가 ... response.results << API 명세서 컨벤션에 맞춤
    if (response.data && 'count' in response.data) {
      if (!('results' in response.data)) {
        return Promise.reject(
          new AxiosError('[Axios] Pagination 응답값에 results 값이 없습니다.')
        )
      }
    }

    return response
  },
  (error) => {
    return Promise.reject(error)
  }
)
