<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import i18n from '../i18n'

const { t } = useI18n()

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
  return saved ? JSON.parse(saved) : { ...defaultSettings }
}

// 设置状态
const settings = ref(loadSettings())

// 临时设置状态（用于弹窗中修改）
const tempSettings = ref({ ...settings.value })

const route = useRoute()
const showSettings = ref(false)
const showAbout = ref(false)

const role = computed(() => {
  const path = route.path
  if (
    path.startsWith('/home/creator') ||
    path.startsWith('/creator') ||
    path.startsWith('/ai-studio')
  ) {
    return 'creator'
  }
  if (path.startsWith('/home/manufacturer') || path.startsWith('/manufacturer')) {
    return 'manufacturer'
  }
  if (path.startsWith('/home/buyer') || path.startsWith('/buyer')) {
    return 'buyer'
  }
  return 'guest'
})

const isGuestPage = computed(() => {
  return route.path === '/login' || route.path === '/register'
})

const showNav = computed(() => true)

const navItems = computed(() => {
  switch (role.value) {
    case 'creator':
      return [
        { label: '设计者主页', to: '/home/creator' },
        { label: 'AI 设计室', to: '/ai-studio' },
        { label: '灵感实验室', to: '/creator/ai-lab' },
        { label: '作品池', to: '/creator/works' },
        { label: '趋势榜', to: '/creator/trends' },
      ]
    case 'manufacturer':
      return [
        { label: '制造商主页', to: '/home/manufacturer' },
        { label: '订单看板', to: '/manufacturer/orders' },
        { label: '工艺模板', to: '/manufacturer/templates' },
      ]
    case 'buyer':
      return [
        { label: '推荐首页', to: '/home/buyer' },
        { label: '开启定制', to: '/buyer/customize/upload' },
        { label: '我的订单', to: '/buyer/orders' },
      ]
    default:
      return []
  }
})

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

const toggleSettings = () => {
  showSettings.value = !showSettings.value
}

const closeSettings = () => {
  showSettings.value = false
}

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
  // 重置为默认设置
  tempSettings.value = { ...defaultSettings }
  // 这里可以添加提示消息
  console.log('设置已重置为默认值')
}

const toggleAbout = () => {
  showAbout.value = !showAbout.value
}

const closeAbout = () => {
  showAbout.value = false
}
</script>

<template>
  <div class="role-nav-wrapper">
    <nav v-if="showNav" :class="['role-nav', `role-nav--${role}`]">
      <div class="role-nav__inner">
        <RouterLink class="role-nav__brand" to="/">
          <img src="/images/logo.png" alt="GOZU Logo" class="role-nav__logo" />
          GOZU
        </RouterLink>
        <div class="role-nav__links">
          <RouterLink v-for="item in navItems" :key="item.to" :to="item.to" class="role-nav__link">
            {{ item.label }}
          </RouterLink>
        </div>
        <div class="role-nav__actions">
          <div v-if="!isGuestPage" class="role-nav__meta">
            <span v-if="role === 'creator'">设计者模式</span>
            <span v-else-if="role === 'manufacturer'">制造商模式</span>
            <span v-else-if="role === 'buyer'">购买者模式</span>
          </div>
          <button class="settings-btn" @click="toggleAbout" :aria-label="t('common.about')">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
          </button>
          <button class="settings-btn" @click="toggleSettings" :aria-label="t('common.settings')">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="12" cy="12" r="3" />
              <path
                d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"
              />
            </svg>
          </button>
        </div>
      </div>
    </nav>

    <!-- Settings Modal Overlay -->
    <Teleport to="body">
      <Transition name="settings-fade">
        <div v-if="showSettings" class="settings-overlay" @click="closeSettings">
          <Transition name="settings-scale">
            <div v-if="showSettings" class="settings-modal" @click.stop>
              <div class="settings-modal__header">
                <h2>{{ t('settings.title') }}</h2>
                <button
                  class="settings-modal__close"
                  @click="closeSettings"
                  :aria-label="t('common.close')"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
              <div class="settings-modal__body">
                <div class="settings-section">
                  <h3>{{ t('settings.appearance') }}</h3>
                  <div class="settings-item">
                    <div class="settings-item__info">
                      <span class="settings-item__label">{{ t('settings.language') }}</span>
                      <span class="settings-item__desc">{{ t('settings.languageDesc') }}</span>
                    </div>
                    <select class="settings-select" v-model="tempSettings.language">
                      <option value="zh">{{ t('settings.chinese') }}</option>
                      <option value="en">{{ t('settings.english') }}</option>
                    </select>
                  </div>
                </div>
                <div class="settings-section">
                  <h3>{{ t('settings.notifications') }}</h3>
                  <div class="settings-item">
                    <div class="settings-item__info">
                      <span class="settings-item__label">{{
                        t('settings.pushNotifications')
                      }}</span>
                      <span class="settings-item__desc">{{
                        t('settings.pushNotificationsDesc')
                      }}</span>
                    </div>
                    <label class="toggle-switch">
                      <input type="checkbox" v-model="tempSettings.pushNotifications" />
                      <span class="toggle-slider"></span>
                    </label>
                  </div>
                  <div class="settings-item">
                    <div class="settings-item__info">
                      <span class="settings-item__label">{{
                        t('settings.emailNotifications')
                      }}</span>
                      <span class="settings-item__desc">{{
                        t('settings.emailNotificationsDesc')
                      }}</span>
                    </div>
                    <label class="toggle-switch">
                      <input type="checkbox" v-model="tempSettings.emailNotifications" />
                      <span class="toggle-slider"></span>
                    </label>
                  </div>
                </div>
              </div>
              <div class="settings-modal__actions">
                <button class="settings-btn--secondary" @click="resetSettings">
                  {{ t('settings.resetDefault') }}
                </button>
                <button class="settings-btn--primary" @click="saveSettings">
                  {{ t('settings.confirm') }}
                </button>
              </div>
            </div>
          </Transition>
        </div>
      </Transition>
    </Teleport>

    <Teleport to="body">
      <Transition name="settings-fade">
        <div v-if="showAbout" class="settings-overlay" @click="closeAbout">
          <Transition name="settings-scale">
            <div v-if="showAbout" class="about-modal" @click.stop>
              <div class="about-modal__header">
                <img src="/images/logo.png" alt="GOZU Logo" class="about-modal__logo" />
                <div class="about-modal__title-section">
                  <h1>GOZU</h1>
                  <p class="about-modal__tagline">{{ t('about.tagline') }}</p>
                </div>
              </div>
              <div class="about-modal__body">
                <div class="about-card">
                  <div class="about-card__icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="M12 2L2 7l10 5 10-5-10-5z" />
                      <path d="M2 17l10 5 10-5" />
                      <path d="M2 12l10 5 10-5" />
                    </svg>
                  </div>
                  <div class="about-card__content">
                    <h3>{{ t('about.projectIntro') }}</h3>
                    <p>{{ t('about.projectIntroDesc') }}</p>
                  </div>
                </div>
                <div class="about-card">
                  <div class="about-card__icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </div>
                  <div class="about-card__content">
                    <h3>{{ t('about.developer') }}</h3>
                    <p>{{ t('about.developerName') }}</p>
                    <p class="about-card__sub">{{ t('about.developerSchool') }}</p>
                  </div>
                </div>
                <div class="about-card">
                  <div class="about-card__icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                  </div>
                  <div class="about-card__content">
                    <h3>{{ t('about.projectInfo') }}</h3>
                    <p>{{ t('about.projectInfoDesc') }}</p>
                    <p class="about-card__sub">{{ t('about.projectInfoSub') }}</p>
                  </div>
                </div>
                <div class="about-card">
                  <div class="about-card__icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path
                        d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"
                      />
                    </svg>
                  </div>
                  <div class="about-card__content">
                    <h3>{{ t('about.copyright') }}</h3>
                    <p>{{ t('about.copyrightNotice') }}</p>
                    <p class="about-card__sub">{{ t('about.copyrightDesc') }}</p>
                  </div>
                </div>
              </div>
              <div class="about-modal__footer">
                <div class="about-tech">
                  <span>Vue 3</span>
                  <span>TypeScript</span>
                  <span>FastAPI</span>
                  <span>Gemini AI</span>
                </div>
              </div>
              <button
                class="about-modal__close"
                @click="closeAbout"
                :aria-label="t('common.close')"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          </Transition>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>
