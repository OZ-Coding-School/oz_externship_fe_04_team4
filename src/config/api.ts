export const BASE_URL = import.meta.env.VITE_API_BASE_URL

export const API_V1_PREFIX = '/api/v1'

export const ADMIN_TEXT = '/admin'

export const ADMIN_API_PREFIX = `${API_V1_PREFIX}${ADMIN_TEXT}`

export const API_URL = `${BASE_URL}${API_V1_PREFIX}`

export const ADMIN_API_URL = `${BASE_URL}${API_V1_PREFIX}${ADMIN_TEXT}`
