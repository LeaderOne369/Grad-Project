<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const projects = computed(() => [
  {
    title: t('creator.aiLab.projectsList[0].title'),
    desc: t('creator.aiLab.projectsList[0].desc'),
    status: t('creator.aiLab.projects.completed'),
  },
  {
    title: t('creator.aiLab.projectsList[1].title'),
    desc: t('creator.aiLab.projectsList[1].desc'),
    status: t('creator.aiLab.projects.waiting'),
  },
  {
    title: t('creator.aiLab.projectsList[2].title'),
    desc: t('creator.aiLab.projectsList[2].desc'),
    status: t('creator.aiLab.projects.recommended'),
  },
])

const pipeline = computed(() => [
  { label: t('creator.aiLab.pipeline.labels[0]'), value: '6 组' },
  { label: t('creator.aiLab.pipeline.labels[1]'), value: '4 组' },
  { label: t('creator.aiLab.pipeline.labels[2]'), value: '3 组' },
])
</script>

<template>
  <div class="detail-page detail-page--ai">
    <header class="detail-hero">
      <div>
        <p class="hero-tag">{{ t('creator.aiLab.hero.tag') }}</p>
        <h1>{{ t('creator.aiLab.hero.title') }}</h1>
        <p class="hero-subtitle">{{ t('creator.aiLab.hero.subtitle') }}</p>
      </div>
      <div class="detail-hero-card">
        <span>{{ t('creator.aiLab.hero.cardTitle') }}</span>
        <strong>{{ t('creator.aiLab.hero.cardValue') }}</strong>
        <p>{{ t('creator.aiLab.hero.cardDesc') }}</p>
        <button class="primary-btn">{{ t('creator.aiLab.hero.btn') }}</button>
      </div>
    </header>

    <section class="detail-grid">
      <div class="detail-panel">
        <h2>{{ t('creator.aiLab.pipeline.title') }}</h2>
        <div class="panel-stats">
          <div v-for="item in pipeline" :key="item.label">
            <strong>{{ item.value }}</strong>
            <span>{{ item.label }}</span>
          </div>
        </div>
        <div class="hint-card">
          <strong>推荐动作</strong>
          <p>将“星火骑士”手机壳图案迁移到围巾与帽子，生成联动系列。</p>
        </div>
      </div>
      <div class="detail-panel detail-panel--dark">
        <h2>AI 生成队列</h2>
        <div class="detail-list">
          <div v-for="item in projects" :key="item.title" class="detail-card">
            <span>{{ item.status }}</span>
            <h4>{{ item.title }}</h4>
            <p>{{ item.desc }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
