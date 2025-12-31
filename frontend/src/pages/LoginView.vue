<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { DEFAULT_ACCOUNTS } from '@/services/mockAuth'
import { login, storeToken } from '@/services/authApi'

const router = useRouter()
const username = ref('')
const password = ref('')
const errorMessage = ref('')
const successMessage = ref('')

const fillAccount = (accountIndex: number) => {
  const account = DEFAULT_ACCOUNTS[accountIndex]
  if (!account) return
  username.value = account.username
  password.value = account.password
}

const handleSubmit = async () => {
  errorMessage.value = ''
  successMessage.value = ''

  try {
    const result = await login({
      username: username.value,
      password: password.value,
    })
    storeToken(result.access_token)
    successMessage.value = `欢迎回来，${result.user?.displayName || '伙伴'}！`
    if (result.user?.role === 'creator') router.push('/home/creator')
    if (result.user?.role === 'manufacturer') router.push('/home/manufacturer')
    if (result.user?.role === 'buyer') router.push('/home/buyer')
  } catch (error) {
    errorMessage.value = (error as Error).message || '登录失败，请重试。'
  }
}

const goRegister = () => {
  router.push('/register')
}
</script>

<template>
  <div class="auth-page">
    <div class="auth-shell">
      <aside class="auth-aside">
        <div class="brand-pill">
          <span>GOZU</span>
          <span>ANIME STUDIO</span>
        </div>
        <h1 class="brand-title">
          让 IP 灵魂在<br />
          <span>每个载体</span>重生
        </h1>
        <p class="brand-subtitle">
          连接设计者、制造商与购买者的谷子创意基地。用 Gemini 生成、迁移与重组你的动漫世界。
        </p>
        <div class="badge-row">
          <span class="badge">IP 授权可视</span>
          <span class="badge">风格推荐</span>
          <span class="badge">跨载体适配</span>
          <span class="badge">AI 生成闭环</span>
        </div>
        <div class="story-card">
          <strong>今日灵感</strong>
          <p>把“星火骑士”手机壳图案迁移到围巾与帽子，生成系列联动。</p>
        </div>
      </aside>

      <main class="auth-form">
        <div>
          <h2 class="form-title">登录平台</h2>
          <p class="form-subtitle">以设计师、制造商或购买者身份进入体验。</p>
        </div>

        <div v-if="errorMessage" class="alert error">{{ errorMessage }}</div>
        <div v-if="successMessage" class="alert success">{{ successMessage }}</div>

        <form class="form-grid" @submit.prevent="handleSubmit">
          <div class="form-field">
            <label for="login-username">用户名</label>
            <input
              id="login-username"
              v-model="username"
              type="text"
              placeholder="请输入用户名"
              autocomplete="username"
            />
          </div>
          <div class="form-field">
            <label for="login-password">密码</label>
            <input
              id="login-password"
              v-model="password"
              type="password"
              placeholder="请输入密码"
              autocomplete="current-password"
            />
          </div>

          <div class="helper-row helper-row-stack">
            <span>快速登录：</span>
            <div class="quick-links">
              <button type="button" class="inline-link" @click="fillAccount(0)">
                设计者 admin1
              </button>
              <button type="button" class="inline-link" @click="fillAccount(1)">
                制造商 admin2
              </button>
              <button type="button" class="inline-link" @click="fillAccount(2)">
                购买者 admin3
              </button>
            </div>
          </div>

          <button class="primary-btn" type="submit">进入谷子星图</button>
          <button class="secondary-btn" type="button" @click="goRegister">创建新账号</button>
        </form>

        <p class="form-subtitle">
          还没有账号？
          <button class="inline-link" type="button" @click="goRegister">立即注册</button>
        </p>
      </main>
    </div>
  </div>
</template>
