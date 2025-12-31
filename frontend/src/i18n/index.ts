import { createI18n } from 'vue-i18n'
import zh from './locales/zh'
import en from './locales/en'

// 从 localStorage 获取保存的语言设置
const getSavedLocale = (): string => {
  const saved = localStorage.getItem('gozu-settings')
  if (saved) {
    const settings = JSON.parse(saved)
    return settings.language || 'zh'
  }
  return 'zh'
}

const i18n = createI18n({
  legacy: false, // 使用 Composition API 模式
  locale: getSavedLocale(),
  fallbackLocale: 'zh',
  messages: {
    zh,
    en,
  },
})

export default i18n

