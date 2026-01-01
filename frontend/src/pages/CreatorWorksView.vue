<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const works = computed(() => [
  {
    title: t('creator.works.worksList[0].title'),
    status: t('creator.works.status.published'),
    income: t('creator.works.worksList[0].income'),
    versions: 6,
  },
  {
    title: t('creator.works.worksList[1].title'),
    status: t('creator.works.status.reviewing'),
    income: t('creator.works.worksList[1].income'),
    versions: 4,
  },
  {
    title: t('creator.works.worksList[2].title'),
    status: t('creator.works.status.draft'),
    income: t('creator.works.worksList[2].income'),
    versions: 2,
  },
])

const stats = computed(() => [
  { label: t('creator.works.stats.labels[0]'), value: '¥3,420' },
  { label: t('creator.works.stats.labels[1]'), value: '12' },
  { label: t('creator.works.stats.labels[2]'), value: '9' },
])
</script>

<template>
  <div class="detail-page detail-page--works">
    <header class="detail-hero">
      <div>
        <p class="hero-tag">{{ t('creator.works.hero.tag') }}</p>
        <h1>{{ t('creator.works.hero.title') }}</h1>
        <p class="hero-subtitle">{{ t('creator.works.hero.subtitle') }}</p>
      </div>
      <div class="detail-hero-card">
        <span>{{ t('creator.works.hero.cardTitle') }}</span>
        <strong>{{ t('creator.works.hero.cardValue') }}</strong>
        <p>{{ t('creator.works.hero.cardDesc') }}</p>
        <button class="primary-btn">{{ t('creator.works.hero.btn') }}</button>
      </div>
    </header>

    <section class="detail-grid">
      <div class="detail-panel">
        <h2>{{ t('creator.works.stats.title') }}</h2>
        <div class="panel-stats">
          <div v-for="item in stats" :key="item.label">
            <strong>{{ item.value }}</strong>
            <span>{{ item.label }}</span>
          </div>
        </div>
        <div class="hint-card">
          <strong>授权提醒</strong>
          <p>有 2 个作品待补充授权文件，建议优先提交以提高推荐权重。</p>
        </div>
      </div>
      <div class="detail-panel detail-panel--light">
        <h2>项目清单</h2>
        <div class="detail-list detail-list--table">
          <div v-for="item in works" :key="item.title" class="detail-row">
            <div>
              <h4>{{ item.title }}</h4>
              <p>{{ item.status }} · 版本 {{ item.versions }}</p>
            </div>
            <strong>{{ item.income }}</strong>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
