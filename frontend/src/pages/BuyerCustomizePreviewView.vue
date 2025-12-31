<script setup lang="ts">
import { useRouter } from 'vue-router'
import { getCustomizeState, updateCustomizeState } from '@/services/buyerCustomize'

const router = useRouter()
const state = getCustomizeState()

const goNext = () => {
  updateCustomizeState({
    price: state.price || 169,
  })
  router.push('/buyer/customize/thank-you')
}
</script>

<template>
  <div class="buyer-flow buyer-flow--preview">
    <header class="flow-hero">
      <div>
        <p class="hero-tag">预览确认 · Step 3</p>
        <h1>确认你的定制方案</h1>
        <p class="hero-subtitle">展示价格与配置细节，确认后进入订单完成。</p>
      </div>
      <div class="flow-steps">
        <div class="step-item done">1 选择素材</div>
        <div class="step-item done">2 设计定制</div>
        <div class="step-item active">3 预览确认</div>
        <div class="step-item">4 完成订单</div>
      </div>
    </header>

    <section class="preview-grid">
      <div class="flow-panel">
        <h2>产品预览</h2>
        <div class="preview-frame preview-frame--large">
          <div class="preview-badge">{{ state.ip || 'IP' }}</div>
          <div class="preview-art">
            <span>AI Pattern</span>
            <p>{{ state.carrier || '载体' }}</p>
          </div>
        </div>
        <div class="meta-list">
          <div>
            <strong>载体</strong>
            <span>{{ state.carrier || '未选择' }}</span>
          </div>
          <div>
            <strong>材质</strong>
            <span>{{ state.material || '柔软织物' }}</span>
          </div>
          <div>
            <strong>表面</strong>
            <span>{{ state.finish || '细腻光泽' }}</span>
          </div>
          <div>
            <strong>风格</strong>
            <span>{{ state.styleTags?.join(' / ') || '未选择' }}</span>
          </div>
        </div>
      </div>
      <div class="flow-panel">
        <h2>订单明细</h2>
        <div class="price-box">
          <div class="price-row">
            <span>基础价格</span>
            <strong>¥129</strong>
          </div>
          <div class="price-row">
            <span>载体加价</span>
            <strong>¥29</strong>
          </div>
          <div class="price-row">
            <span>表面处理</span>
            <strong>¥12</strong>
          </div>
          <div class="price-total">
            <span>总计</span>
            <strong>¥{{ state.price || 170 }}</strong>
          </div>
        </div>
        <button class="primary-btn" @click="goNext">确认并提交</button>
        <p class="helper-text">支付后可在“我的订单”追踪物流。</p>
      </div>
    </section>
  </div>
</template>
