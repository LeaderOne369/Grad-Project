<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { RouterLink, RouterView, useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import i18n from '@/i18n'
import SettingsModal from './SettingsModal.vue'
import AboutModal from './AboutModal.vue'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()

// 弹窗状态
const showAbout = ref(false)
const showSettings = ref(false)

// 设置语言的辅助函数
const setLocale = (lang: string) => {
  ;(i18n.global.locale as unknown as { value: string }).value = lang
}

// 默认设置
const defaultSettings = {
  language: 'zh',
  pushNotifications: true,
  emailNotifications: false,
}

// 从localStorage加载设置
const loadSettings = () => {
  const saved = localStorage.getItem('gozu-settings')
  return saved ? { ...defaultSettings, ...JSON.parse(saved) } : { ...defaultSettings }
}

// 设置状态
const settings = ref(loadSettings())

// 临时设置状态（用于弹窗中修改）
const tempSettings = ref({ ...settings.value })

const navItems = computed(() => [
  { path: '/admin', icon: 'dashboard', label: t('admin.sidebar.nav.dashboard') },
  { path: '/admin/users', icon: 'users', label: t('admin.sidebar.nav.users') },
  { path: '/admin/orders', icon: 'orders', label: t('admin.sidebar.nav.orders') },
  { path: '/admin/review', icon: 'review', label: t('admin.sidebar.nav.review') },
  { path: '/admin/analytics', icon: 'analytics', label: t('admin.sidebar.nav.analytics') },
  { path: '/admin/settings', icon: 'settings', label: t('admin.sidebar.nav.settings') },
])

const currentPath = computed(() => route.path)

// 弹窗控制函数
const toggleAbout = () => {
  showAbout.value = !showAbout.value
}

const toggleSettings = () => {
  showSettings.value = !showSettings.value
}

const closeAbout = () => {
  showAbout.value = false
}

const closeSettings = () => {
  showSettings.value = false
}

// 设置保存和重置函数
const saveSettings = () => {
  // 保存临时设置到正式设置
  settings.value = { ...tempSettings.value }
  // 保存到localStorage
  localStorage.setItem('gozu-settings', JSON.stringify(settings.value))
  // 同步 i18n 语言设置
  setLocale(settings.value.language)
  console.log('设置已保存:', settings.value)
  closeSettings()
}

const resetSettings = () => {
  tempSettings.value = { ...defaultSettings }
  console.log('设置已重置为默认值')
}

// 监听设置弹窗显示状态，同步临时设置
watch(showSettings, (newValue) => {
  if (newValue) {
    // 打开弹窗时，同步当前设置到临时设置
    tempSettings.value = { ...settings.value }
  } else {
    // 关闭弹窗时，重置临时设置和语言（以防用户修改后取消）
    tempSettings.value = { ...settings.value }
    setLocale(settings.value.language)
  }
})

// 监听临时语言设置变化，实时预览语言切换效果
watch(
  () => tempSettings.value.language,
  (newLang) => {
    setLocale(newLang)
  },
)

// 处理设置保存
const handleSettingsSave = (newSettings: typeof settings.value) => {
  settings.value = { ...newSettings }
  // 保存到localStorage
  localStorage.setItem('gozu-settings', JSON.stringify(settings.value))
  // 同步 i18n 语言设置
  setLocale(settings.value.language)
  console.log('设置已保存:', settings.value)
}

// 处理设置重置
const handleSettingsReset = () => {
  settings.value = { ...defaultSettings }
  localStorage.setItem('gozu-settings', JSON.stringify(settings.value))
  setLocale(settings.value.language)
  console.log('设置已重置为默认值')
}

function logout() {
  localStorage.removeItem('gozu_token')
  router.push('/login')
}
</script>

<template>
  <div class="admin-layout">
    <aside class="admin-sidebar">
      <div class="sidebar-header">
        <img src="/images/logo.png" alt="GOZU" class="sidebar-logo" />
        <div class="sidebar-brand">
          <span class="brand-name">GOZU</span>
          <span class="brand-role">{{ t('admin.sidebar.brand.role') }}</span>
        </div>
      </div>

      <nav class="sidebar-nav">
        <RouterLink
          v-for="item in navItems"
          :key="item.path"
          :to="item.path"
          :class="['nav-item', { active: currentPath === item.path }]"
        >
          <svg
            v-if="item.icon === 'dashboard'"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <rect x="3" y="3" width="7" height="7" />
            <rect x="14" y="3" width="7" height="7" />
            <rect x="14" y="14" width="7" height="7" />
            <rect x="3" y="14" width="7" height="7" />
          </svg>
          <svg
            v-else-if="item.icon === 'users'"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
          <svg
            v-else-if="item.icon === 'orders'"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
            <line x1="8" y1="21" x2="16" y2="21" />
            <line x1="12" y1="17" x2="12" y2="21" />
          </svg>
          <svg
            v-else-if="item.icon === 'review'"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
          <svg
            v-else-if="item.icon === 'analytics'"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <line x1="18" y1="20" x2="18" y2="10" />
            <line x1="12" y1="20" x2="12" y2="4" />
            <line x1="6" y1="20" x2="6" y2="14" />
          </svg>
          <svg
            v-else-if="item.icon === 'settings'"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <circle cx="12" cy="12" r="3" />
            <path
              d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"
            />
          </svg>
          <span>{{ item.label }}</span>
        </RouterLink>
      </nav>

      <div class="sidebar-footer">
        <div class="admin-profile">
          <div class="profile-avatar">管</div>
          <div class="profile-info">
            <span class="profile-name">{{ t('admin.sidebar.profile.name') }}</span>
            <span class="profile-role">{{ t('admin.sidebar.profile.role') }}</span>
          </div>
        </div>

        <div class="sidebar-actions">
          <button
            class="action-btn action-btn--about"
            @click="toggleAbout"
            :title="t('admin.sidebar.about')"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
            {{ t('admin.sidebar.about') }}
          </button>

          <button
            class="action-btn action-btn--settings"
            @click="toggleSettings"
            :title="t('admin.sidebar.settings')"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <circle cx="12" cy="12" r="3" />
              <path
                d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"
              />
            </svg>
            {{ t('admin.sidebar.settings') }}
          </button>
        </div>

        <button class="logout-btn" @click="logout">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          {{ t('admin.sidebar.logout') }}
        </button>
      </div>
    </aside>

    <main class="admin-main">
      <RouterView />
    </main>

    <!-- 设置弹窗 -->
    <SettingsModal
      v-model="showSettings"
      :settings="settings"
      @save="handleSettingsSave"
      @reset="handleSettingsReset"
    />

    <!-- 关于弹窗 -->
    <AboutModal v-model="showAbout" />
  </div>
</template>

<style scoped>
.admin-layout {
  display: flex;
  min-height: 100vh;
}

.admin-sidebar {
  width: 260px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-right: 1px solid rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 100;
}

.sidebar-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 24px 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
}

.sidebar-logo {
  width: 40px;
  height: 40px;
  border-radius: 10px;
}

.sidebar-brand {
  display: flex;
  flex-direction: column;
}

.brand-name {
  font-size: 18px;
  font-weight: 700;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.brand-role {
  font-size: 11px;
  color: #888;
  letter-spacing: 0.5px;
}

.sidebar-nav {
  flex: 1;
  padding: 16px 12px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  overflow-y: auto;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 12px;
  color: #666;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;
}

.nav-item:hover {
  background: rgba(102, 126, 234, 0.08);
  color: #667eea;
}

.nav-item.active {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
  box-shadow: 0 4px 16px rgba(102, 126, 234, 0.3);
}

.nav-item svg {
  flex-shrink: 0;
}

.sidebar-footer {
  padding: 16px;
  border-top: 1px solid rgba(0, 0, 0, 0.06);
}

.admin-profile {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: rgba(102, 126, 234, 0.08);
  border-radius: 12px;
  margin-bottom: 12px;
}

.profile-avatar {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  border-radius: 10px;
}

.profile-info {
  display: flex;
  flex-direction: column;
}

.profile-name {
  font-size: 13px;
  font-weight: 600;
  color: #333;
}

.profile-role {
  font-size: 11px;
  color: #888;
}

.logout-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px;
  background: rgba(245, 87, 108, 0.1);
  border: none;
  border-radius: 10px;
  color: #dc3545;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.logout-btn:hover {
  background: rgba(245, 87, 108, 0.2);
}

.admin-main {
  flex: 1;
  margin-left: 260px;
  min-height: 100vh;
}

/* 侧边栏操作按钮 */
.sidebar-actions {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  background: rgba(102, 126, 234, 0.1);
  border: none;
  border-radius: 10px;
  color: #667eea;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  flex: 1;
}

.action-btn:hover {
  background: rgba(102, 126, 234, 0.2);
}

.action-btn svg {
  flex-shrink: 0;
}
</style>
