import { ref, computed, watch, readonly } from 'vue'
import type { AuthUser, LoginResponse } from '@/services/authApi'

const AUTH_TOKEN_KEY = 'auth_token'
const USER_KEY = 'auth_user'

// 响应式状态
const token = ref<string | null>(null)
const user = ref<AuthUser | null>(null)
const isLoading = ref(false)

// 计算属性
const isAuthenticated = computed(() => !!token.value && !!user.value)
const currentUser = computed(() => user.value)
const userRole = computed(() => user.value?.role || null)

// 初始化函数
const initializeAuth = () => {
  const storedToken = localStorage.getItem(AUTH_TOKEN_KEY)
  const storedUser = localStorage.getItem(USER_KEY)

  if (storedToken && storedUser) {
    try {
      token.value = storedToken
      user.value = JSON.parse(storedUser)
    } catch (error) {
      // 如果解析失败，清除存储的数据
      clearAuth()
    }
  }
}

// 设置认证信息
const setAuth = (loginResponse: LoginResponse) => {
  token.value = loginResponse.access_token
  user.value = loginResponse.user

  // 存储到 localStorage
  localStorage.setItem(AUTH_TOKEN_KEY, loginResponse.access_token)
  localStorage.setItem(USER_KEY, JSON.stringify(loginResponse.user))
}

// 清除认证信息
const clearAuth = () => {
  token.value = null
  user.value = null

  localStorage.removeItem(AUTH_TOKEN_KEY)
  localStorage.removeItem(USER_KEY)
}

// 获取认证头
const getAuthHeaders = () => {
  if (!token.value) return {}
  return {
    'Authorization': `Bearer ${token.value}`
  }
}

// 监听 token 变化，确保一致性
watch(token, (newToken) => {
  if (newToken) {
    localStorage.setItem(AUTH_TOKEN_KEY, newToken)
  } else {
    localStorage.removeItem(AUTH_TOKEN_KEY)
  }
})

watch(user, (newUser) => {
  if (newUser) {
    localStorage.setItem(USER_KEY, JSON.stringify(newUser))
  } else {
    localStorage.removeItem(USER_KEY)
  }
}, { deep: true })

// 初始化
initializeAuth()

export const useAuth = () => {
  return {
    // 状态
    token: readonly(token),
    user: readonly(user),
    isLoading,
    isAuthenticated,
    currentUser,
    userRole,

    // 方法
    setAuth,
    clearAuth,
    getAuthHeaders,
    initializeAuth,
  }
}
