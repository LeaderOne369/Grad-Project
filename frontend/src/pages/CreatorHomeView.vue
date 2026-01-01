<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { computed, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

type Draft = {
  id: string
  title: string
  updatedAt: string
}

type AiResult = {
  id: string
  title: string
  status: string
  createdAt: string
}

const highlights = computed(() => [
  {
    title: t('creator.home.highlights.aiLab.title'),
    description: t('creator.home.highlights.aiLab.description'),
    tag: t('creator.home.highlights.aiLab.tag'),
  },
  {
    title: t('creator.home.highlights.works.title'),
    description: t('creator.home.highlights.works.description'),
    tag: t('creator.home.highlights.works.tag'),
  },
  {
    title: t('creator.home.highlights.trends.title'),
    description: t('creator.home.highlights.trends.description'),
    tag: t('creator.home.highlights.trends.tag'),
  },
])

const focusCards = computed(() => [
  {
    label: t('creator.home.focusCards.task.label'),
    title: t('creator.home.focusCards.task.title'),
    detail: t('creator.home.focusCards.task.detail'),
  },
  {
    label: t('creator.home.focusCards.workflow.label'),
    title: t('creator.home.focusCards.workflow.title'),
    detail: t('creator.home.focusCards.workflow.detail'),
  },
  {
    label: t('creator.home.focusCards.revenue.label'),
    title: t('creator.home.focusCards.revenue.title'),
    detail: t('creator.home.focusCards.revenue.detail'),
  },
])

const drafts = ref<Draft[]>([])
const results = ref<AiResult[]>([])

const DRAFTS_KEY = 'creator_ai_drafts'
const RESULTS_KEY = 'creator_ai_results'

const loadList = <T,>(key: string): T[] => {
  if (typeof localStorage === 'undefined') return []
  const raw = localStorage.getItem(key)
  if (!raw) return []
  try {
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

onMounted(() => {
  drafts.value = loadList<Draft>(DRAFTS_KEY).slice(0, 3)
  results.value = loadList<AiResult>(RESULTS_KEY).slice(0, 3)
})
</script>

<template>
  <div class="home-page home-page--creator">
    <header class="home-hero">
      <div>
        <p class="hero-tag">{{ t('creator.home.hero.tag') }}</p>
        <h1>{{ t('creator.home.hero.title') }}</h1>
        <p class="hero-subtitle">{{ t('creator.home.hero.subtitle') }}</p>
      </div>
      <div class="hero-actions">
        <RouterLink class="primary-btn" to="/ai-studio">{{ t('creator.home.hero.btnPrimary') }}</RouterLink>
        <button class="secondary-btn">{{ t('creator.home.hero.btnSecondary') }}</button>
      </div>
    </header>

    <section class="home-grid">
      <RouterLink class="info-card info-card--link" to="/creator/ai-lab">
        <div class="info-card-tag">{{ highlights[0].tag }}</div>
        <h3>{{ highlights[0].title }}</h3>
        <p>{{ highlights[0].description }}</p>
      </RouterLink>
      <RouterLink class="info-card info-card--link" to="/creator/works">
        <div class="info-card-tag">{{ highlights[1].tag }}</div>
        <h3>{{ highlights[1].title }}</h3>
        <p>{{ highlights[1].description }}</p>
      </RouterLink>
      <RouterLink class="info-card info-card--link" to="/creator/trends">
        <div class="info-card-tag">{{ highlights[2].tag }}</div>
        <h3>{{ highlights[2].title }}</h3>
        <p>{{ highlights[2].description }}</p>
      </RouterLink>
    </section>

    <section class="home-split">
      <div class="feature-panel">
        <h2>{{ t('creator.home.matrix.title') }}</h2>
        <p>{{ t('creator.home.matrix.subtitle') }}</p>
        <div class="panel-stats">
          <div>
            <strong>86%</strong>
            <span>{{ t('creator.home.matrix.stats.styleMatch') }}</span>
          </div>
          <div>
            <strong>24</strong>
            <span>{{ t('creator.home.matrix.stats.hotIPs') }}</span>
          </div>
          <div>
            <strong>5</strong>
            <span>{{ t('creator.home.matrix.stats.carriers') }}</span>
          </div>
        </div>
      </div>
      <div class="stacked-cards">
        <div v-for="card in focusCards" :key="card.title" class="stack-card">
          <span>{{ card.label }}</span>
          <h4>{{ card.title }}</h4>
          <p>{{ card.detail }}</p>
        </div>
      </div>
    </section>

    <section class="home-split">
      <div class="list-panel">
        <div class="list-header">
          <h3>{{ t('creator.home.drafts.title') }}</h3>
          <RouterLink class="inline-link" to="/ai-studio">{{ t('creator.home.drafts.link') }}</RouterLink>
        </div>
        <div v-if="drafts.length" class="list-grid">
          <div v-for="draft in drafts" :key="draft.id" class="list-card">
            <h4>{{ draft.title }}</h4>
            <p>{{ t('creator.home.results.updated') }} {{ draft.updatedAt }}</p>
          </div>
        </div>
        <p v-else class="empty-state">{{ t('creator.home.drafts.empty') }}</p>
      </div>
      <div class="list-panel">
        <div class="list-header">
          <h3>{{ t('creator.home.results.title') }}</h3>
          <button class="inline-link">{{ t('creator.home.results.viewAll') }}</button>
        </div>
        <div v-if="results.length" class="list-grid">
          <div v-for="item in results" :key="item.id" class="list-card">
            <h4>{{ item.title }}</h4>
            <p>{{ item.status }} · {{ item.createdAt }}</p>
          </div>
        </div>
        <p v-else class="empty-state">{{ t('creator.home.results.empty') }}</p>
      </div>
    </section>
  </div>
</template>
