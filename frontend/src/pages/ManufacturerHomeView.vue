<script setup lang="ts">
import { RouterLink } from 'vue-router'
const orders = [
  {
    title: '「霜月物语」亚克力立牌',
    detail: 'UV 印刷 / 1200 件 / 进入质检',
  },
  {
    title: '「星火骑士」围巾联名',
    detail: '织造工艺 / 320 件 / 等待出库',
  },
  {
    title: '「暗潮便利店」徽章套装',
    detail: '烫金工艺 / 650 件 / 生产中',
  },
]

const pipelines = [
  {
    label: '待生产',
    value: '18 单',
  },
  {
    label: '生产中',
    value: '42 单',
  },
  {
    label: '待发货',
    value: '7 单',
  },
]
</script>

<template>
  <div class="home-page home-page--manufacturer">
    <header class="home-hero">
      <div>
        <p class="hero-tag">制造商控制台</p>
        <h1>让创意高效落地到实体生产</h1>
        <p class="hero-subtitle">
          统一管理工艺模板、物料规格与订单流转，确保每一件谷子按 IP 标准交付。
        </p>
      </div>
      <div class="hero-actions">
        <RouterLink class="primary-btn" to="/manufacturer/orders">进入订单看板</RouterLink>
        <RouterLink class="secondary-btn" to="/manufacturer/templates">维护工艺模板</RouterLink>
      </div>
    </header>

    <section class="home-grid">
      <div class="info-card">
        <div class="info-card-tag">工艺库</div>
        <h3>38 套工艺模板</h3>
        <p>覆盖刺绣、UV、热转印与镀膜工艺，随订单自动匹配。</p>
      </div>
      <div class="info-card">
        <div class="info-card-tag">效率</div>
        <h3>平均交付 3.2 天</h3>
        <p>生产节拍稳定，上周准时交付率 98.6%。</p>
      </div>
      <div class="info-card">
        <div class="info-card-tag">质量</div>
        <h3>抽检合格率 99.2%</h3>
        <p>关键工序实时反馈，减少返工风险。</p>
      </div>
    </section>

    <section class="home-split">
      <div class="feature-panel">
        <h2>生产流水概览</h2>
        <p>订单状态与库存联动，为设计者与平台提供可视化进度。</p>
        <div class="panel-stats">
          <div v-for="item in pipelines" :key="item.label">
            <strong>{{ item.value }}</strong>
            <span>{{ item.label }}</span>
          </div>
        </div>
      </div>
      <div class="stacked-cards">
        <div v-for="order in orders" :key="order.title" class="stack-card">
          <span>最新订单</span>
          <h4>{{ order.title }}</h4>
          <p>{{ order.detail }}</p>
        </div>
      </div>
    </section>
  </div>
</template>
