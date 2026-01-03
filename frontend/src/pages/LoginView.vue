<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { DEFAULT_ACCOUNTS } from '@/services/mockAuth'
import { login } from '@/services/authApi'
import { useAuth } from '@/composables/useAuth'

const { t } = useI18n()
const { setAuth } = useAuth()

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
    setAuth(result)
    successMessage.value = t('auth.login.messages.welcomeBack', {
      name: result.user?.displayName || t('auth.login.messages.defaultName'),
    })
    if (result.user?.role === 'creator') router.push('/home/creator')
    if (result.user?.role === 'manufacturer') router.push('/home/manufacturer')
    if (result.user?.role === 'buyer') router.push('/home/buyer')
    if (result.user?.role === 'admin') router.push('/admin')
  } catch (error) {
    errorMessage.value = (error as Error).message || t('auth.login.messages.loginFailed')
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
          <span>{{ t('auth.login.brand.pill1') }}</span>
          <span>{{ t('auth.login.brand.pill2') }}</span>
        </div>
        <h1 class="brand-title" v-html="t('auth.login.brand.title')"></h1>
        <p class="brand-subtitle">{{ t('auth.login.brand.subtitle') }}</p>
        <div class="badge-row">
          <span class="badge">{{ t('auth.login.brand.badges.badge1') }}</span>
          <span class="badge">{{ t('auth.login.brand.badges.badge2') }}</span>
          <span class="badge">{{ t('auth.login.brand.badges.badge3') }}</span>
          <span class="badge">{{ t('auth.login.brand.badges.badge4') }}</span>
        </div>
        <div class="story-card">
          <strong>{{ t('auth.login.brand.inspiration.title') }}</strong>
          <p>{{ t('auth.login.brand.inspiration.content') }}</p>
        </div>
      </aside>

      <main class="auth-form">
        <div>
          <h2 class="form-title">{{ t('auth.login.form.title') }}</h2>
          <p class="form-subtitle">{{ t('auth.login.form.subtitle') }}</p>
        </div>

        <div v-if="errorMessage" class="alert error">{{ errorMessage }}</div>
        <div v-if="successMessage" class="alert success">{{ successMessage }}</div>

        <form class="form-grid" @submit.prevent="handleSubmit">
          <div class="form-field">
            <label for="login-username">{{ t('auth.login.form.labels.username') }}</label>
            <input
              id="login-username"
              v-model="username"
              type="text"
              :placeholder="t('auth.login.form.placeholders.username')"
              autocomplete="username"
            />
          </div>
          <div class="form-field">
            <label for="login-password">{{ t('auth.login.form.labels.password') }}</label>
            <input
              id="login-password"
              v-model="password"
              type="password"
              :placeholder="t('auth.login.form.placeholders.password')"
              autocomplete="current-password"
            />
          </div>

          <div class="helper-row helper-row-stack">
            <span>{{ t('auth.login.form.quickLogin') }}</span>
            <div class="quick-links">
              <button type="button" class="inline-link" @click="fillAccount(0)">
                {{ t('auth.login.form.roles.creator') }}
              </button>
              <button type="button" class="inline-link" @click="fillAccount(1)">
                {{ t('auth.login.form.roles.manufacturer') }}
              </button>
              <button type="button" class="inline-link" @click="fillAccount(2)">
                {{ t('auth.login.form.roles.buyer') }}
              </button>
              <button type="button" class="inline-link" @click="fillAccount(3)">
                {{ t('auth.login.form.roles.admin') }}
              </button>
            </div>
          </div>

          <button class="primary-btn" type="submit">{{ t('auth.login.form.submitBtn') }}</button>
          <button class="secondary-btn" type="button" @click="goRegister">
            {{ t('auth.login.form.registerBtn') }}
          </button>
        </form>
      </main>
    </div>
  </div>
</template>
