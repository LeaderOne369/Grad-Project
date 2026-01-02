<template>
  <Teleport to="body">
    <Transition name="settings-fade">
      <div v-if="modelValue" class="settings-overlay" @click="$emit('update:modelValue', false)">
        <Transition name="settings-scale">
          <div v-if="modelValue" class="settings-modal" @click.stop>
            <div class="settings-modal__header">
              <h2>{{ t('settings.title') }}</h2>
              <button
                class="settings-modal__close"
                @click="$emit('update:modelValue', false)"
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
                    <span class="settings-item__label">{{ t('settings.pushNotifications') }}</span>
                    <span class="settings-item__desc">{{ t('settings.pushNotificationsDesc') }}</span>
                  </div>
                  <label class="toggle-switch">
                    <input v-model="tempSettings.pushNotifications" type="checkbox" />
                    <span class="toggle-slider"></span>
                  </label>
                </div>
                <div class="settings-item">
                  <div class="settings-item__info">
                    <span class="settings-item__label">{{ t('settings.emailNotifications') }}</span>
                    <span class="settings-item__desc">{{ t('settings.emailNotificationsDesc') }}</span>
                  </div>
                  <label class="toggle-switch">
                    <input v-model="tempSettings.emailNotifications" type="checkbox" />
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
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import i18n from '@/i18n'

const { t } = useI18n()

// Props
interface Props {
  modelValue: boolean
  settings: {
    language: string
    pushNotifications: boolean
    emailNotifications: boolean
  }
}

const props = defineProps<Props>()

// Emits
const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  'save': [settings: Props['settings']]
  'reset': []
}>()

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

// 临时设置状态（用于弹窗中修改）
const tempSettings = ref({ ...props.settings })

// 监听语言设置变化，实时预览语言切换效果
watch(
  () => tempSettings.value.language,
  (newLang) => {
    setLocale(newLang)
  }
)

// 监听弹窗显示状态，同步临时设置
watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue) {
      // 打开弹窗时，同步当前设置到临时设置
      tempSettings.value = { ...props.settings }
    } else {
      // 关闭弹窗时，重置语言设置
      setLocale(props.settings.language)
    }
  }
)

// 保存设置
const saveSettings = () => {
  emit('save', { ...tempSettings.value })
  emit('update:modelValue', false)
}

// 重置设置
const resetSettings = () => {
  tempSettings.value = { ...defaultSettings }
  emit('reset')
}
</script>

<style>
/* 使用全局样式 */
</style>
