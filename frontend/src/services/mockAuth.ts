export type UserRole = 'buyer' | 'creator' | 'manufacturer'

export type MockUser = {
  id: string
  username: string
  password: string
  displayName: string
  role: UserRole
  createdAt: string
}

const STORAGE_KEY = 'gozu_users'

export const DEFAULT_ACCOUNTS: Array<{
  username: string
  password: string
  displayName: string
  role: UserRole
}> = [
  {
    username: 'admin1',
    password: '123456',
    displayName: '星图设计者',
    role: 'creator',
  },
  {
    username: 'admin2',
    password: '123456',
    displayName: '匠造制造商',
    role: 'manufacturer',
  },
  {
    username: 'admin3',
    password: '漫游购买者',
    role: 'buyer',
  },
]

export function loadUsers(): MockUser[] {
  if (typeof localStorage === 'undefined') return []
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) return []
  try {
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed
  } catch {
    return []
  }
}

export function saveUsers(users: MockUser[]) {
  if (typeof localStorage === 'undefined') return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users))
}

export function registerUser(payload: {
  username: string
  password: string
  displayName: string
  role: UserRole
}): { ok: boolean; error?: string } {
  const { username, password, displayName, role } = payload
  const normalized = username.trim().toLowerCase()

  if (!normalized || !password || !displayName) {
    return { ok: false, error: '请完整填写所有字段。' }
  }

  if (DEFAULT_ACCOUNTS.some((account) => account.username === normalized)) {
    return { ok: false, error: '该用户名已被占用，请更换。' }
  }

  const users = loadUsers()
  const exists = users.some((user) => user.username === normalized)
  if (exists) {
    return { ok: false, error: '该用户名已被占用，请更换。' }
  }

  users.push({
    id: crypto.randomUUID(),
    username: normalized,
    password,
    displayName: displayName.trim(),
    role,
    createdAt: new Date().toISOString(),
  })

  saveUsers(users)
  return { ok: true }
}

export function authenticate(payload: {
  username: string
  password: string
}): { ok: boolean; error?: string; user?: MockUser } {
  const { username, password } = payload
  const normalized = username.trim().toLowerCase()

  const defaultAccount = DEFAULT_ACCOUNTS.find(
    (account) => account.username === normalized && account.password === password
  )
  if (defaultAccount) {
    return {
      ok: true,
      user: {
        id: defaultAccount.username,
        username: defaultAccount.username,
        password: defaultAccount.password,
        displayName: defaultAccount.displayName,
        role: defaultAccount.role,
        createdAt: '2024-01-01T00:00:00.000Z',
      },
    }
  }

  const users = loadUsers()
  const matched = users.find(
    (user) => user.username === normalized && user.password === password
  )

  if (!matched) {
    return { ok: false, error: '账号或密码错误，请重试。' }
  }

  return { ok: true, user: matched }
}
