<script setup lang="ts">
const trends = [
  {
    title: 'IP 热度榜',
    desc: '星火骑士、夜航便利店、霜月物语持续上升。',
  },
  {
    title: '风格偏好',
    desc: '霓虹赛博与日式清新占比增长 18%。',
  },
  {
    title: '载体走势',
    desc: '围巾与徽章的联动套装转化率最高。',
  },
]

const signals = [
  { label: '热度指数', value: '87' },
  { label: '新增 IP', value: '14' },
  { label: '可迁移载体', value: '6' },
]
</script>

<template>
  <div class="detail-page detail-page--trends">
    <header class="detail-hero">
      <div>
        <p class="hero-tag">上升中</p>
        <h1>推荐趋势榜</h1>
        <p class="hero-subtitle">把握热门 IP 与风格走势，调整上新节奏。</p>
      </div>
      <div class="detail-hero-card">
        <span>推荐指数</span>
        <strong>87</strong>
        <p>风格匹配 + 热度 + 内容联动综合评分。</p>
        <button class="primary-btn">生成选题建议</button>
      </div>
    </header>

    <section class="detail-grid">
      <div class="detail-panel detail-panel--dark">
        <h2>趋势信号</h2>
        <div class="panel-stats">
          <div v-for="item in signals" :key="item.label">
            <strong>{{ item.value }}</strong>
            <span>{{ item.label }}</span>
          </div>
        </div>
        <div class="hint-card hint-card--dark">
          <strong>重点观察</strong>
          <p>霓虹赛博风格在配饰类载体上转化率提升明显。</p>
        </div>
      </div>
      <div class="detail-panel">
        <h2>趋势洞察</h2>
        <div class="detail-list">
          <div v-for="item in trends" :key="item.title" class="detail-card">
            <span>趋势提示</span>
            <h4>{{ item.title }}</h4>
            <p>{{ item.desc }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
