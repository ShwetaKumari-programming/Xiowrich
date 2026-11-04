const configuredApiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'https://xiowrich.vercel.app'

export const API_BASE_URL = configuredApiBaseUrl.replace(/\/+$/, '')

export function resolveApiAsset(assetPath) {
  if (!assetPath || /^(data:|https?:\/\/)/i.test(assetPath)) return assetPath
  return `${API_BASE_URL}/${assetPath.replace(/^\/+/, '')}`
}
