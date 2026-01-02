<template>
  <Teleport to="body">
    <Transition name="settings-fade">
      <div v-if="modelValue" class="settings-overlay" @click="$emit('update:modelValue', false)">
        <Transition name="settings-scale">
          <div v-if="modelValue" class="about-modal" @click.stop>
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
              <button
                class="about-modal__close"
                @click="$emit('update:modelValue', false)"
                :aria-label="t('common.close')"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

// Props
interface Props {
  modelValue: boolean
}

defineProps<Props>()

// Emits
defineEmits<{
  'update:modelValue': [value: boolean]
}>()
</script>

<style>
/* 使用全局样式 */
</style>
