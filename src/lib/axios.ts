import axios from 'axios'

import { ADMIN_API_PREFIX } from '@/config/api'

export const axiosInstance = axios.create({
  baseURL: ADMIN_API_PREFIX,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// 추후 로그인 토큰관련 인터셉터 추가 axiosInstance.interceptors ...
