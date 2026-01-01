<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const trends = computed(() => [
  {
    title: t('creator.trends.insights[0].title'),
    desc: t('creator.trends.insights[0].desc'),
  },
  {
    title: t('creator.trends.insights[1].title'),
    desc: t('creator.trends.insights[1].desc'),
  },
  {
    title: t('creator.trends.insights[2].title'),
    desc: t('creator.trends.insights[2].desc'),
  },
])

const signals = computed(() => [
  { label: t('creator.trends.signals.stats[0]'), value: '87' },
  { label: t('creator.trends.signals.stats[1]'), value: '14' },
  { label: t('creator.trends.signals.stats[2]'), value: '6' },
])
</script>

<template>
  <div class="detail-page detail-page--trends">
    <header class="detail-hero">
      <div>
        <p class="hero-tag">{{ t('creator.trends.hero.tag') }}</p>
        <h1>{{ t('creator.trends.hero.title') }}</h1>
        <p class="hero-subtitle">{{ t('creator.trends.hero.subtitle') }}</p>
      </div>
      <div class="detail-hero-card">
        <span>{{ t('creator.trends.hero.cardTitle') }}</span>
        <strong>{{ t('creator.trends.hero.cardValue') }}</strong>
        <p>{{ t('creator.trends.hero.cardDesc') }}</p>
        <button class="primary-btn">{{ t('creator.trends.hero.btn') }}</button>
      </div>
    </header>

    <section class="detail-grid">
      <div class="detail-panel detail-panel--dark">
        <h2>{{ t('creator.trends.signals.title') }}</h2>
        <div class="panel-stats">
          <div v-for="item in signals" :key="item.label">
            <strong>{{ item.value }}</strong>
            <span>{{ item.label }}</span>
          </div>
        </div>
        <div class="hint-card hint-card--dark">
          <strong>{{ t('creator.trends.signals.insight.title') }}</strong>
          <p>{{ t('creator.trends.signals.insight.content') }}</p>
        </div>
      </div>
      <div class="detail-panel">
        <h2>{{ t('creator.trends.insightsTitle') }}</h2>
        <div class="detail-list">
          <div v-for="item in trends" :key="item.title" class="detail-card">
            <span>{{ t('creator.trends.insightsLabel') }}</span>
            <h4>{{ item.title }}</h4>
            <p>{{ item.desc }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
