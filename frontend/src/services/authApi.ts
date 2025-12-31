export type AuthUser = {
  id: number
  username: string
  displayName: string
  role: 'buyer' | 'creator' | 'manufacturer'
}

export type LoginResponse = {
  access_token: string
  token_type: string
  user: AuthUser
}

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

export const login = async (payload: {
  username: string
  password: string
}): Promise<LoginResponse> => {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!res.ok) {
    const data = await res.json().catch(() => null)
    throw new Error(data?.detail || '登录失败')
  }
  return res.json()
}

export const register = async (payload: {
  username: string
  password: string
  displayName: string
  role: string
}) => {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!res.ok) {
    const data = await res.json().catch(() => null)
    throw new Error(data?.detail || '注册失败')
  }
  return res.json()
}

export const storeToken = (token: string) => {
  localStorage.setItem('auth_token', token)
}
