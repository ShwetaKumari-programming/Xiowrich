const configuredApiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'https://xiowrich.vercel.app'

export const API_BASE_URL = configuredApiBaseUrl.replace(/\/+$/, '')
