<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { clearCustomizeState } from '@/services/buyerCustomize'

const orderId = `GOZU-${Math.random().toString(36).slice(2, 8).toUpperCase()}`

clearCustomizeState()
</script>

<template>
  <div class="buyer-flow buyer-flow--thankyou">
    <header class="flow-hero">
      <div>
        <p class="hero-tag">完成订单 · Step 4</p>
        <h1>感谢你的定制订单</h1>
        <p class="hero-subtitle">你的谷子已经进入生产队列，我们将尽快发货。</p>
      </div>
      <div class="flow-steps">
        <div class="step-item done">1 选择素材</div>
        <div class="step-item done">2 设计定制</div>
        <div class="step-item done">3 预览确认</div>
        <div class="step-item active">4 完成订单</div>
      </div>
    </header>

    <section class="thankyou-grid">
      <div class="flow-panel">
        <div class="success-card">
          <div class="success-icon">✓</div>
          <h2>订单已创建</h2>
          <p>订单编号：{{ orderId }}</p>
        </div>
        <div class="timeline">
          <div class="timeline-item">
            <span>订单确认</span>
            <p>系统已接单</p>
          </div>
          <div class="timeline-item">
            <span>生产准备</span>
            <p>预计 24h 内进入生产</p>
          </div>
          <div class="timeline-item">
            <span>物流发出</span>
            <p>发货后可在“我的订单”查看</p>
          </div>
        </div>
      </div>
      <div class="flow-panel">
        <h2>下一步推荐</h2>
        <div class="detail-list">
          <div class="detail-card">
            <span>推荐</span>
            <h4>收藏你的专属设计</h4>
            <p>未来可一键迁移到帽子、徽章与手机壳。</p>
          </div>
          <div class="detail-card">
            <span>福利</span>
            <h4>加入 IP 主题活动</h4>
            <p>参与设计挑战可获得优惠券。</p>
          </div>
        </div>
        <div class="flow-actions">
          <RouterLink class="primary-btn" to="/buyer/orders">查看我的订单</RouterLink>
          <RouterLink class="secondary-btn" to="/home/buyer">返回首页</RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>
