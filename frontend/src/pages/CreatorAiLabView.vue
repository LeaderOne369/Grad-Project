<script setup lang="ts">
const projects = [
  {
    title: '星火骑士 · 霓虹燃域',
    desc: '文生图 + 围巾迁移，已生成 4 个版本。',
    status: 'Gemini 已完成',
  },
  {
    title: '霜月物语 · 冰川旅人',
    desc: '图生图 + 徽章套装，等待二次调整。',
    status: '等待优化',
  },
  {
    title: '夜航便利店 · 24h 霓虹',
    desc: '跨载体套装：挂件 / 帽子 / 手机壳',
    status: '推荐中',
  },
]

const pipeline = [
  { label: '文生图', value: '6 组' },
  { label: '图生图', value: '4 组' },
  { label: '跨载体', value: '3 组' },
]
</script>

<template>
  <div class="detail-page detail-page--ai">
    <header class="detail-hero">
      <div>
        <p class="hero-tag">Gemini Ready</p>
        <h1>AI 灵感实验室</h1>
        <p class="hero-subtitle">用 Gemini 生成主题稿、风格迁移与跨载体套装。</p>
      </div>
      <div class="detail-hero-card">
        <span>今日活跃任务</span>
        <strong>3</strong>
        <p>自动汇总你的文生图与迁移进度。</p>
        <button class="primary-btn">启动新任务</button>
      </div>
    </header>

    <section class="detail-grid">
      <div class="detail-panel">
        <h2>流程概览</h2>
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
