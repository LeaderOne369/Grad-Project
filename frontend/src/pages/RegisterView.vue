<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { type UserRole } from '@/services/mockAuth'
import { register } from '@/services/authApi'

const { t } = useI18n()

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
    errorMessage.value = t('auth.register.messages.passwordMismatch')
    return
  }

  try {
    await register({
      username: username.value,
      password: password.value,
      displayName: displayName.value,
      role: role.value,
    })
    successMessage.value = t('auth.register.messages.registerSuccess')
  } catch (error) {
    errorMessage.value = (error as Error).message || t('auth.register.messages.registerFailed')
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
          <span>{{ t('auth.register.brand.pill1') }}</span>
          <span>{{ t('auth.register.brand.pill2') }}</span>
        </div>
        <h1 class="brand-title" v-html="t('auth.register.brand.title')"></h1>
        <p class="brand-subtitle">{{ t('auth.register.brand.subtitle') }}</p>
        <div class="badge-row">
          <span class="badge">{{ t('auth.register.brand.badges.badge1') }}</span>
          <span class="badge">{{ t('auth.register.brand.badges.badge2') }}</span>
          <span class="badge">{{ t('auth.register.brand.badges.badge3') }}</span>
        </div>
        <div class="story-card">
          <strong>{{ t('auth.register.brand.benefits.title') }}</strong>
          <p>{{ t('auth.register.brand.benefits.content') }}</p>
        </div>
      </aside>

      <main class="auth-form">
        <div>
          <h2 class="form-title">{{ t('auth.register.form.title') }}</h2>
          <p class="form-subtitle">{{ t('auth.register.form.subtitle') }}</p>
        </div>

        <div v-if="errorMessage" class="alert error">{{ errorMessage }}</div>
        <div v-if="successMessage" class="alert success">{{ successMessage }}</div>

        <form class="form-grid" @submit.prevent="handleSubmit">
          <div class="form-field">
            <label>{{ t('auth.register.form.labels.role') }}</label>
            <div class="role-options">
              <label class="role-option" :class="{ active: role === 'creator' }">
                <input v-model="role" type="radio" value="creator" />
                <strong>{{ t('auth.register.form.roles.creator.name') }}</strong>
                <span>{{ t('auth.register.form.roles.creator.desc') }}</span>
              </label>
              <label class="role-option" :class="{ active: role === 'manufacturer' }">
                <input v-model="role" type="radio" value="manufacturer" />
                <strong>{{ t('auth.register.form.roles.manufacturer.name') }}</strong>
                <span>{{ t('auth.register.form.roles.manufacturer.desc') }}</span>
              </label>
              <label class="role-option" :class="{ active: role === 'buyer' }">
                <input v-model="role" type="radio" value="buyer" />
                <strong>{{ t('auth.register.form.roles.buyer.name') }}</strong>
                <span>{{ t('auth.register.form.roles.buyer.desc') }}</span>
              </label>
            </div>
          </div>

          <div class="form-field">
            <label for="register-display-name">{{ t('auth.register.form.labels.displayName') }}</label>
            <input
              id="register-display-name"
              v-model="displayName"
              type="text"
              :placeholder="t('auth.register.form.placeholders.displayName')"
            />
          </div>

          <div class="form-field">
            <label for="register-username">{{ t('auth.register.form.labels.username') }}</label>
            <input
              id="register-username"
              v-model="username"
              type="text"
              :placeholder="t('auth.register.form.placeholders.username')"
              autocomplete="username"
            />
          </div>

          <div class="form-field">
            <label for="register-password">{{ t('auth.register.form.labels.password') }}</label>
            <input
              id="register-password"
              v-model="password"
              type="password"
              :placeholder="t('auth.register.form.placeholders.password')"
              autocomplete="new-password"
            />
          </div>

          <div class="form-field">
            <label for="register-password-confirm">{{ t('auth.register.form.labels.confirmPassword') }}</label>
            <input
              id="register-password-confirm"
              v-model="confirmPassword"
              type="password"
              :placeholder="t('auth.register.form.placeholders.confirmPassword')"
              autocomplete="new-password"
            />
          </div>

          <button class="primary-btn" type="submit">{{ t('auth.register.form.submitBtn') }}</button>
          <button class="secondary-btn" type="button" @click="goLogin">{{ t('auth.register.form.loginBtn') }}</button>
        </form>
      </main>
    </div>
  </div>
</template>
