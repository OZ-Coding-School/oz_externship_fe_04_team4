import axios from 'axios'

import { ADMIN_API_PREFIX } from '@/config/api'
import { useAuthStore } from '@/store/authStore'

export const axiosInstance = axios.create({
  baseURL: ADMIN_API_PREFIX,
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
