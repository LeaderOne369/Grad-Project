<script setup lang="ts">
const works = [
  {
    title: '星火骑士 · 星云系列',
    status: '已发布',
    income: '¥1,240',
    versions: 6,
  },
  {
    title: '霜月物语 · 冰川旅人',
    status: '审核中',
    income: '¥860',
    versions: 4,
  },
  {
    title: '夜航便利店 · 24h 霓虹',
    status: '草稿',
    income: '¥0',
    versions: 2,
  },
]

const stats = [
  { label: '本月收益', value: '¥3,420' },
  { label: '发布作品', value: '12' },
  { label: '授权通过', value: '9' },
]
</script>

<template>
  <div class="detail-page detail-page--works">
    <header class="detail-hero">
      <div>
        <p class="hero-tag">12 个项目</p>
        <h1>我的作品池</h1>
        <p class="hero-subtitle">管理设计版本、授权状态与收益分成。</p>
      </div>
      <div class="detail-hero-card">
        <span>作品总览</span>
        <strong>12</strong>
        <p>创作进度与收益一目了然。</p>
        <button class="primary-btn">新增作品</button>
      </div>
    </header>

    <section class="detail-grid">
      <div class="detail-panel">
        <h2>收益与授权</h2>
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
