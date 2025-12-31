<script setup lang="ts">
import { RouterLink } from 'vue-router'

const heroTags = ['风格推荐', '内容推荐', '主题推荐']

const designerPicks = [
  {
    title: '星火骑士 · 霓虹围巾套装',
    creator: '设计者：洛璃',
    carrier: '围巾 / 徽章',
    price: '¥169',
    match: '匹配度 93%',
  },
  {
    title: '霜月物语 · 冰蓝立牌联动',
    creator: '设计者：青槿',
    carrier: '亚克力立牌 / 挂件',
    price: '¥128',
    match: '匹配度 89%',
  },
  {
    title: '夜航便利店 · 复古海报帽',
    creator: '设计者：千弦',
    carrier: '帽子 / 手机壳',
    price: '¥156',
    match: '匹配度 90%',
  },
  {
    title: '星幕巡游 · 轻奢套装',
    creator: '设计者：晚栀',
    carrier: '围巾 / 托特包',
    price: '¥198',
    match: '匹配度 88%',
  },
  {
    title: '银湾物语 · 机甲挂件套装',
    creator: '设计者：祈曜',
    carrier: '挂件 / 徽章',
    price: '¥142',
    match: '匹配度 91%',
  },
  {
    title: '晨雾书店 · 清冷手机壳',
    creator: '设计者：清泠',
    carrier: '手机壳 / 立牌',
    price: '¥149',
    match: '匹配度 87%',
  },
]

const spotlight = [
  {
    label: '趋势 IP',
    title: '星火骑士正在升温',
    detail: '连动配饰收藏率提升 22%。',
  },
  {
    label: '设计者精选',
    title: '复古赛博风格强势回归',
    detail: '推荐尝试徽章 + 手机壳套装。',
  },
  {
    label: '个性化',
    title: '你的收藏偏好已更新',
    detail: '更偏爱清冷蓝与金属质感。',
  },
]

const quickLinks = [
  {
    title: '开启定制之旅',
    desc: '上传或描述灵感，Gemini 生成跨载体方案。',
    to: '/buyer/customize/upload',
  },
  {
    title: '查看我的订单',
    desc: '追踪物流与订单进度。',
    to: '/buyer/orders',
  },
]
</script>

<template>
  <div class="buyer-page">
    <header class="buyer-hero">
      <div>
        <p class="hero-tag">购买者 · 推荐主场</p>
        <h1>把设计者的灵感带回你的日常</h1>
        <p class="hero-subtitle">
          基于 IP 与风格偏好，为你精选设计者作品，并提供可迁移到多载体的定制方案。
        </p>
        <div class="hero-tags">
          <span v-for="tag in heroTags" :key="tag">{{ tag }}</span>
        </div>
      </div>
      <div class="hero-cards">
        <div v-for="link in quickLinks" :key="link.title" class="hero-card">
          <h3>{{ link.title }}</h3>
          <p>{{ link.desc }}</p>
          <RouterLink class="inline-link" :to="link.to">立即进入 →</RouterLink>
        </div>
      </div>
    </header>

    <section class="buyer-reco-layout">
      <div class="buyer-reco">
        <div class="reco-header">
          <h2>为你推荐的设计者作品</h2>
          <button class="inline-link">刷新推荐</button>
        </div>
        <div class="reco-grid reco-grid--six">
          <article v-for="item in designerPicks" :key="item.title" class="reco-card">
            <div class="reco-thumb">
              <span>{{ item.match }}</span>
            </div>
            <div class="reco-body">
              <h3>{{ item.title }}</h3>
              <p>{{ item.creator }}</p>
              <div class="reco-meta">
                <span>{{ item.carrier }}</span>
                <strong>{{ item.price }}</strong>
              </div>
            </div>
          </article>
        </div>
      </div>

      <aside class="buyer-spotlight">
        <div class="spotlight-card" v-for="item in spotlight" :key="item.title">
          <span>{{ item.label }}</span>
          <h3>{{ item.title }}</h3>
          <p>{{ item.detail }}</p>
        </div>
      </aside>
    </section>
  </div>
</template>
