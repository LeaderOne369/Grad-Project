<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { type UserRole } from '@/services/mockAuth'
import { register } from '@/services/authApi'

const router = useRouter()
const username = ref('')
const password = ref('')
const confirmPassword = ref('')
const displayName = ref('')
const role = ref<UserRole>('buyer')
const errorMessage = ref('')
const successMessage = ref('')

const handleSubmit = async () => {
  errorMessage.value = ''
  successMessage.value = ''

  if (password.value !== confirmPassword.value) {
    errorMessage.value = '两次输入的密码不一致。'
    return
  }

  try {
    await register({
      username: username.value,
      password: password.value,
      displayName: displayName.value,
      role: role.value,
    })
    successMessage.value = '注册成功！请使用新账号登录。'
  } catch (error) {
    errorMessage.value = (error as Error).message || '注册失败，请重试。'
  }
}

const goLogin = () => {
  router.push('/login')
}
</script>

<template>
  <div class="auth-page">
    <div class="auth-shell">
      <aside class="auth-aside">
        <div class="brand-pill">
          <span>GOZU</span>
          <span>COMMUNITY</span>
        </div>
        <h1 class="brand-title">
          立刻加入<br />
          <span>二次元共创</span>
        </h1>
        <p class="brand-subtitle">
          一站式完成 IP 授权、AI 生成、跨载体迁移与个性化推荐。你的作品将在这里被更多人看见。
        </p>
        <div class="badge-row">
          <span class="badge">设计收益</span>
          <span class="badge">制造协作</span>
          <span class="badge">个性化推荐</span>
        </div>
        <div class="story-card">
          <strong>加入后可获得</strong>
          <p>设计资产库、AI 创作席位、专属作品页与推荐流量。</p>
        </div>
      </aside>

      <main class="auth-form">
        <div>
          <h2 class="form-title">创建账号</h2>
          <p class="form-subtitle">请选择身份并完善个人信息。</p>
        </div>

        <div v-if="errorMessage" class="alert error">{{ errorMessage }}</div>
        <div v-if="successMessage" class="alert success">{{ successMessage }}</div>

        <form class="form-grid" @submit.prevent="handleSubmit">
          <div class="form-field">
            <label>身份角色</label>
            <div class="role-options">
              <label class="role-option" :class="{ active: role === 'creator' }">
                <input v-model="role" type="radio" value="creator" />
                <strong>设计者</strong>
                <span>发布作品与 AI 设计</span>
              </label>
              <label class="role-option" :class="{ active: role === 'manufacturer' }">
                <input v-model="role" type="radio" value="manufacturer" />
                <strong>制造商</strong>
                <span>承接订单与生产</span>
              </label>
              <label class="role-option" :class="{ active: role === 'buyer' }">
                <input v-model="role" type="radio" value="buyer" />
                <strong>购买者</strong>
                <span>收藏与定制谷子</span>
              </label>
            </div>
          </div>

          <div class="form-field">
            <label for="register-display-name">昵称</label>
            <input
              id="register-display-name"
              v-model="displayName"
              type="text"
              placeholder="给自己取一个名字"
            />
          </div>

          <div class="form-field">
            <label for="register-username">用户名</label>
            <input
              id="register-username"
              v-model="username"
              type="text"
              placeholder="用于登录平台"
              autocomplete="username"
            />
          </div>

          <div class="form-field">
            <label for="register-password">密码</label>
            <input
              id="register-password"
              v-model="password"
              type="password"
              placeholder="至少 6 位字符"
              autocomplete="new-password"
            />
          </div>

          <div class="form-field">
            <label for="register-password-confirm">确认密码</label>
            <input
              id="register-password-confirm"
              v-model="confirmPassword"
              type="password"
              placeholder="再次输入密码"
              autocomplete="new-password"
            />
          </div>

          <button class="primary-btn" type="submit">完成注册</button>
          <button class="secondary-btn" type="button" @click="goLogin">返回登录</button>
        </form>

        <p class="form-subtitle">
          已有账号？
          <button class="inline-link" type="button" @click="goLogin">立即登录</button>
        </p>
      </main>
    </div>
  </div>
</template>
