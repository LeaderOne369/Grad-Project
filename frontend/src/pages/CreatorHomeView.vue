<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { onMounted, ref } from 'vue'

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

const highlights = [
  {
    title: 'AI 灵感实验室',
    description: '用 Gemini 生成主题稿、风格迁移与跨载体套装。',
    tag: 'Gemini Ready',
  },
  {
    title: '我的作品池',
    description: '管理设计版本、授权状态与收益分成。',
    tag: '12 个项目',
  },
  {
    title: '推荐趋势榜',
    description: '把握热门 IP 与风格走势，调整上新节奏。',
    tag: '上升中',
  },
]

const focusCards = [
  {
    label: '今日任务',
    title: '设计「星火骑士」围巾 + 徽章联动套装',
    detail: '建议风格：霓虹赛博 / 深蓝金属',
  },
  {
    label: 'AI 工作流',
    title: '图案迁移：手机壳 → 毛绒挂件',
    detail: '分辨率 2K / 安全区自动调整',
  },
  {
    label: '收益概览',
    title: '本周预估收益 ¥3,420',
    detail: '转化率 +12%，收藏 +230',
  },
]

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
        <p class="hero-tag">设计者工作台</p>
        <h1>把 IP 世界重塑成系列谷子</h1>
        <p class="hero-subtitle">
          你的灵感从这里开始：Gemini 生成、跨载体适配、作品推荐与收益追踪全部连在一起。
        </p>
      </div>
      <div class="hero-actions">
        <RouterLink class="primary-btn" to="/ai-studio">进入 AI 设计室</RouterLink>
        <button class="secondary-btn">发布新设计</button>
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
        <h2>推荐灵感矩阵</h2>
        <p>基于风格向量与 IP 热度的实时建议，帮助你提前布局下一波爆款。</p>
        <div class="panel-stats">
          <div>
            <strong>86%</strong>
            <span>风格匹配</span>
          </div>
          <div>
            <strong>24</strong>
            <span>热度 IP</span>
          </div>
          <div>
            <strong>5</strong>
            <span>可迁移载体</span>
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
          <h3>最近草稿</h3>
          <RouterLink class="inline-link" to="/ai-studio">进入设计室</RouterLink>
        </div>
        <div v-if="drafts.length" class="list-grid">
          <div v-for="draft in drafts" :key="draft.id" class="list-card">
            <h4>{{ draft.title }}</h4>
            <p>更新于 {{ draft.updatedAt }}</p>
          </div>
        </div>
        <p v-else class="empty-state">暂无草稿，去 AI 设计室开始创作吧。</p>
      </div>
      <div class="list-panel">
        <div class="list-header">
          <h3>AI 生成记录</h3>
          <button class="inline-link">查看全部</button>
        </div>
        <div v-if="results.length" class="list-grid">
          <div v-for="item in results" :key="item.id" class="list-card">
            <h4>{{ item.title }}</h4>
            <p>{{ item.status }} · {{ item.createdAt }}</p>
          </div>
        </div>
        <p v-else class="empty-state">尚未生成作品，建议先完成一次文生图。</p>
      </div>
    </section>
  </div>
</template>
