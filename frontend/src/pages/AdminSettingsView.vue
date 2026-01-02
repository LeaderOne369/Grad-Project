<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const settings = ref({
  // Recommendation settings
  recommendationEnabled: true,
  styleWeightFactor: 0.4,
  contentWeightFactor: 0.35,
  personalWeightFactor: 0.25,

  // AI settings
  aiEnabled: true,
  aiDailyLimit: 100,
  aiQueueTimeout: 60,

  // Review settings
  autoReviewLowRisk: true,
  requireManualHighRisk: true,

  // System settings
  maintenanceMode: false,
  debugMode: false,
})

function saveSettings() {
  console.log('Settings saved:', settings.value)
}

function resetSettings() {
  settings.value = {
    recommendationEnabled: true,
    styleWeightFactor: 0.4,
    contentWeightFactor: 0.35,
    personalWeightFactor: 0.25,
    aiEnabled: true,
    aiDailyLimit: 100,
    aiQueueTimeout: 60,
    autoReviewLowRisk: true,
    requireManualHighRisk: true,
    maintenanceMode: false,
    debugMode: false,
  }
}
</script>

<template>
  <div class="admin-settings">
    <header class="page-header">
      <div>
        <h1>{{ t('admin.settings.hero.title') }}</h1>
        <p>{{ t('admin.settings.hero.subtitle') }}</p>
      </div>
      <div class="header-actions">
        <button class="btn-secondary" @click="resetSettings">{{ t('admin.settings.actions.reset') }}</button>
        <button class="btn-primary" @click="saveSettings">{{ t('admin.settings.actions.save') }}</button>
      </div>
    </header>

    <div class="settings-grid">
      <section class="settings-section">
        <div class="section-header">
          <div class="section-icon section-icon--purple">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </svg>
          </div>
          <div>
            <h2>{{ t('admin.settings.recommendation.title') }}</h2>
            <p>{{ t('admin.settings.recommendation.subtitle') }}</p>
          </div>
        </div>

        <div class="settings-list">
          <div class="setting-item">
            <div class="setting-info">
              <strong>{{ t('admin.settings.recommendation.enable') }}</strong>
              <span>{{ t('admin.settings.recommendation.enableDesc') }}</span>
            </div>
            <label class="toggle-switch">
              <input v-model="settings.recommendationEnabled" type="checkbox" />
              <span class="toggle-slider"></span>
            </label>
          </div>

          <div class="setting-item">
            <div class="setting-info">
              <strong>{{ t('admin.settings.recommendation.styleWeight') }}</strong>
              <span>{{ t('admin.settings.recommendation.styleWeightDesc') }}</span>
            </div>
            <div class="slider-input">
              <input v-model.number="settings.styleWeightFactor" type="range" min="0" max="1" step="0.05" />
              <span class="slider-value">{{ (settings.styleWeightFactor * 100).toFixed(0) }}%</span>
            </div>
          </div>

          <div class="setting-item">
            <div class="setting-info">
              <strong>{{ t('admin.settings.recommendation.contentWeight') }}</strong>
              <span>{{ t('admin.settings.recommendation.contentWeightDesc') }}</span>
            </div>
            <div class="slider-input">
              <input v-model.number="settings.contentWeightFactor" type="range" min="0" max="1" step="0.05" />
              <span class="slider-value">{{ (settings.contentWeightFactor * 100).toFixed(0) }}%</span>
            </div>
          </div>

          <div class="setting-item">
            <div class="setting-info">
              <strong>{{ t('admin.settings.recommendation.personalWeight') }}</strong>
              <span>{{ t('admin.settings.recommendation.personalWeightDesc') }}</span>
            </div>
            <div class="slider-input">
              <input v-model.number="settings.personalWeightFactor" type="range" min="0" max="1" step="0.05" />
              <span class="slider-value">{{ (settings.personalWeightFactor * 100).toFixed(0) }}%</span>
            </div>
          </div>
        </div>
      </section>

      <section class="settings-section">
        <div class="section-header">
          <div class="section-icon section-icon--blue">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polygon points="12 2 2 7 12 12 22 7 12 2" />
              <polyline points="2 17 12 22 22 17" />
              <polyline points="2 12 12 17 22 12" />
            </svg>
          </div>
          <div>
            <h2>{{ t('admin.settings.ai.title') }}</h2>
            <p>{{ t('admin.settings.ai.subtitle') }}</p>
          </div>
        </div>

        <div class="settings-list">
          <div class="setting-item">
            <div class="setting-info">
              <strong>{{ t('admin.settings.ai.enable') }}</strong>
              <span>{{ t('admin.settings.ai.enableDesc') }}</span>
            </div>
            <label class="toggle-switch">
              <input v-model="settings.aiEnabled" type="checkbox" />
              <span class="toggle-slider"></span>
            </label>
          </div>

          <div class="setting-item">
            <div class="setting-info">
              <strong>{{ t('admin.settings.ai.dailyLimit') }}</strong>
              <span>{{ t('admin.settings.ai.dailyLimitDesc') }}</span>
            </div>
            <div class="number-input">
              <button @click="settings.aiDailyLimit = Math.max(0, settings.aiDailyLimit - 10)">-</button>
              <input v-model.number="settings.aiDailyLimit" type="number" />
              <button @click="settings.aiDailyLimit += 10">+</button>
            </div>
          </div>

          <div class="setting-item">
            <div class="setting-info">
              <strong>{{ t('admin.settings.ai.queueTimeout') }}</strong>
              <span>{{ t('admin.settings.ai.queueTimeoutDesc') }}</span>
            </div>
            <div class="number-input">
              <button @click="settings.aiQueueTimeout = Math.max(10, settings.aiQueueTimeout - 10)">-</button>
              <input v-model.number="settings.aiQueueTimeout" type="number" />
              <button @click="settings.aiQueueTimeout += 10">+</button>
            </div>
          </div>
        </div>
      </section>

      <section class="settings-section">
        <div class="section-header">
          <div class="section-icon section-icon--green">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </div>
          <div>
            <h2>{{ t('admin.settings.review.title') }}</h2>
            <p>{{ t('admin.settings.review.subtitle') }}</p>
          </div>
        </div>

        <div class="settings-list">
          <div class="setting-item">
            <div class="setting-info">
              <strong>{{ t('admin.settings.review.autoLowRisk') }}</strong>
              <span>{{ t('admin.settings.review.autoLowRiskDesc') }}</span>
            </div>
            <label class="toggle-switch">
              <input v-model="settings.autoReviewLowRisk" type="checkbox" />
              <span class="toggle-slider"></span>
            </label>
          </div>

          <div class="setting-item">
            <div class="setting-info">
              <strong>{{ t('admin.settings.review.manualHighRisk') }}</strong>
              <span>{{ t('admin.settings.review.manualHighRiskDesc') }}</span>
            </div>
            <label class="toggle-switch">
              <input v-model="settings.requireManualHighRisk" type="checkbox" />
              <span class="toggle-slider"></span>
            </label>
          </div>
        </div>
      </section>

      <section class="settings-section">
        <div class="section-header">
          <div class="section-icon section-icon--orange">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <line x1="3" y1="9" x2="21" y2="9" />
              <line x1="9" y1="21" x2="9" y2="9" />
            </svg>
          </div>
          <div>
            <h2>{{ t('admin.settings.system.title') }}</h2>
            <p>{{ t('admin.settings.system.subtitle') }}</p>
          </div>
        </div>

        <div class="settings-list">
          <div class="setting-item">
            <div class="setting-info">
              <strong>{{ t('admin.settings.system.maintenanceMode') }}</strong>
              <span>{{ t('admin.settings.system.maintenanceModeDesc') }}</span>
            </div>
            <label class="toggle-switch toggle-switch--warning">
              <input v-model="settings.maintenanceMode" type="checkbox" />
              <span class="toggle-slider"></span>
            </label>
          </div>

          <div class="setting-item">
            <div class="setting-info">
              <strong>{{ t('admin.settings.system.debugMode') }}</strong>
              <span>{{ t('admin.settings.system.debugModeDesc') }}</span>
            </div>
            <label class="toggle-switch">
              <input v-model="settings.debugMode" type="checkbox" />
              <span class="toggle-slider"></span>
            </label>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.admin-settings {
  padding: 24px;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e8ec 100%);
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding: 24px;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.6);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
}

.page-header h1 {
  margin: 0 0 4px;
  font-size: 24px;
  font-weight: 700;
  color: #333;
}

.page-header p {
  margin: 0;
  color: #666;
  font-size: 14px;
}

.header-actions {
  display: flex;
  gap: 12px;
}

.btn-primary,
.btn-secondary {
  padding: 12px 20px;
  border: none;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(102, 126, 234, 0.4);
}

.btn-secondary {
  background: rgba(0, 0, 0, 0.05);
  color: #666;
}

.btn-secondary:hover {
  background: rgba(0, 0, 0, 0.1);
}

.settings-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.settings-section {
  padding: 24px;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.6);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
}

.section-header {
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.section-icon {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 14px;
  color: #fff;
}

.section-icon--purple {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.section-icon--blue {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
}

.section-icon--green {
  background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
}

.section-icon--orange {
  background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
}

.section-header h2 {
  margin: 0 0 4px;
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

.section-header p {
  margin: 0;
  font-size: 13px;
  color: #888;
}

.settings-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.setting-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: rgba(0, 0, 0, 0.02);
  border-radius: 12px;
}

.setting-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.setting-info strong {
  font-size: 14px;
  color: #333;
}

.setting-info span {
  font-size: 12px;
  color: #888;
}

.toggle-switch {
  position: relative;
  width: 48px;
  height: 26px;
}

.toggle-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.toggle-slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #ccc;
  border-radius: 26px;
  transition: 0.3s;
}

.toggle-slider::before {
  position: absolute;
  content: '';
  height: 20px;
  width: 20px;
  left: 3px;
  bottom: 3px;
  background: #fff;
  border-radius: 50%;
  transition: 0.3s;
}

.toggle-switch input:checked + .toggle-slider {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.toggle-switch--warning input:checked + .toggle-slider {
  background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
}

.toggle-switch input:checked + .toggle-slider::before {
  transform: translateX(22px);
}

.slider-input {
  display: flex;
  align-items: center;
  gap: 12px;
}

.slider-input input[type='range'] {
  width: 120px;
  height: 6px;
  -webkit-appearance: none;
  background: #e0e0e0;
  border-radius: 3px;
  outline: none;
}

.slider-input input[type='range']::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 16px;
  height: 16px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50%;
  cursor: pointer;
}

.slider-value {
  min-width: 40px;
  text-align: right;
  font-size: 13px;
  font-weight: 600;
  color: #667eea;
}

.number-input {
  display: flex;
  align-items: center;
  gap: 0;
  background: rgba(0, 0, 0, 0.03);
  border-radius: 10px;
  overflow: hidden;
}

.number-input button {
  width: 32px;
  height: 32px;
  background: transparent;
  border: none;
  font-size: 16px;
  color: #666;
  cursor: pointer;
  transition: all 0.2s ease;
}

.number-input button:hover {
  background: rgba(102, 126, 234, 0.1);
  color: #667eea;
}

.number-input input {
  width: 60px;
  height: 32px;
  border: none;
  background: transparent;
  text-align: center;
  font-size: 14px;
  font-weight: 600;
  color: #333;
  outline: none;
}

.number-input input::-webkit-inner-spin-button,
.number-input input::-webkit-outer-spin-button {
  -webkit-appearance: none;
}

@media (max-width: 1024px) {
  .settings-grid {
    grid-template-columns: 1fr;
  }
}
</style>

