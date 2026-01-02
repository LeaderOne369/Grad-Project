<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import * as echarts from 'echarts'
import * as THREE from 'three'
import {
  getDashboardStats,
  getTrendData,
  getCategoryData,
  getAiUsageData,
  getReviewItems,
  type DashboardStats,
} from '@/services/adminMock'

const { t } = useI18n()

// 获取类型显示文本
const getTypeText = (type: string) => {
  const typeMap: Record<string, string> = {
    'design': t('admin.dashboard.reviews.types.design'),
    'ai_generated': t('admin.dashboard.reviews.types.ai_generated'),
    'comment': t('admin.dashboard.reviews.types.comment'),
  }
  return typeMap[type] || type
}

// 获取风险等级文本
const getRiskLevelText = (riskLevel: string) => {
  const riskMap: Record<string, string> = {
    'low': t('admin.dashboard.reviews.riskLevels.low'),
    'medium': t('admin.dashboard.reviews.riskLevels.medium'),
    'high': t('admin.dashboard.reviews.riskLevels.high'),
  }
  return riskMap[riskLevel] || riskLevel
}

const stats = ref<DashboardStats>(getDashboardStats())
const pendingReviews = ref(getReviewItems().filter((r) => r.status === 'pending'))

// ECharts instances
let trendChart: echarts.ECharts | null = null
let categoryChart: echarts.ECharts | null = null
let roleChart: echarts.ECharts | null = null

// Three.js
let threeContainer: HTMLElement | null = null
let scene: THREE.Scene | null = null
let camera: THREE.PerspectiveCamera | null = null
let renderer: THREE.WebGLRenderer | null = null
let particles: THREE.Points | null = null
let animationId: number | null = null

const trendChartRef = ref<HTMLElement | null>(null)
const categoryChartRef = ref<HTMLElement | null>(null)
const roleChartRef = ref<HTMLElement | null>(null)
const threeRef = ref<HTMLElement | null>(null)

function initTrendChart() {
  if (!trendChartRef.value) return
  trendChart = echarts.init(trendChartRef.value)

  const data = getTrendData()
  const option: echarts.EChartsOption = {
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderColor: 'rgba(0, 0, 0, 0.1)',
      textStyle: { color: '#333' },
    },
    legend: {
      data: [t('admin.dashboard.chartLabels.newUsers'), t('admin.dashboard.chartLabels.orders'), t('admin.dashboard.chartLabels.aiCalls')],
      bottom: 0,
      textStyle: { color: '#666' },
    },
    grid: { left: '3%', right: '4%', bottom: '15%', top: '10%', containLabel: true },
    xAxis: {
      type: 'category',
      data: data.map((d) => d.date.slice(5)),
      axisLine: { lineStyle: { color: '#e0e0e0' } },
      axisLabel: { color: '#666' },
    },
    yAxis: {
      type: 'value',
      axisLine: { show: false },
      splitLine: { lineStyle: { color: '#f0f0f0' } },
      axisLabel: { color: '#666' },
    },
    series: [
      {
        name: t('admin.dashboard.chartLabels.newUsers'),
        type: 'line',
        smooth: true,
        data: data.map((d) => d.users),
        lineStyle: { color: '#667eea' },
        itemStyle: { color: '#667eea' },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(102, 126, 234, 0.3)' },
            { offset: 1, color: 'rgba(102, 126, 234, 0.05)' },
          ]),
        },
      },
      {
        name: t('admin.dashboard.chartLabels.orders'),
        type: 'line',
        smooth: true,
        data: data.map((d) => d.orders),
        lineStyle: { color: '#f093fb' },
        itemStyle: { color: '#f093fb' },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(240, 147, 251, 0.3)' },
            { offset: 1, color: 'rgba(240, 147, 251, 0.05)' },
          ]),
        },
      },
      {
        name: t('admin.dashboard.chartLabels.aiCalls'),
        type: 'bar',
        data: data.map((d) => d.aiCalls),
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#4facfe' },
            { offset: 1, color: '#00f2fe' },
          ]),
          borderRadius: [4, 4, 0, 0],
        },
        barWidth: '40%',
      },
    ],
  }
  trendChart.setOption(option)
}

function initCategoryChart() {
  if (!categoryChartRef.value) return
  categoryChart = echarts.init(categoryChartRef.value)

  const data = getCategoryData()
  const option: echarts.EChartsOption = {
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    series: [
      {
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2,
        },
        label: {
          show: true,
          formatter: '{b}: {c}',
          color: '#666',
        },
        data: data.map((d, i) => ({
          ...d,
          itemStyle: {
            color: [
              '#667eea',
              '#f093fb',
              '#4facfe',
              '#43e97b',
              '#fa709a',
              '#fee140',
              '#a8edea',
              '#d299c2',
            ][i],
          },
        })),
      },
    ],
  }
  categoryChart.setOption(option)
}

function initRoleChart() {
  if (!roleChartRef.value) return
  roleChart = echarts.init(roleChartRef.value)

  const aiData = getAiUsageData()

  const option: echarts.EChartsOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
    },
    grid: { left: '3%', right: '4%', bottom: '10%', top: '10%', containLabel: true },
    xAxis: {
      type: 'category',
      data: aiData.map((d) => d.type),
      axisLine: { lineStyle: { color: '#e0e0e0' } },
      axisLabel: { color: '#666' },
    },
    yAxis: {
      type: 'value',
      axisLine: { show: false },
      splitLine: { lineStyle: { color: '#f0f0f0' } },
      axisLabel: { color: '#666' },
    },
    series: [
      {
        type: 'bar',
        data: aiData.map((d, i) => {
          const colors1 = ['#667eea', '#f093fb', '#4facfe', '#43e97b'] as const
          const colors2 = ['#764ba2', '#f5576c', '#00f2fe', '#38f9d7'] as const
          return {
            value: d.count,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: colors1[i % colors1.length] as string },
                { offset: 1, color: colors2[i % colors2.length] as string },
              ]),
              borderRadius: [8, 8, 0, 0],
            },
          }
        }),
        barWidth: '50%',
      },
    ],
  }
  roleChart.setOption(option)
}

function initThreeJS() {
  if (!threeRef.value) return
  threeContainer = threeRef.value

  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(
    75,
    threeContainer.clientWidth / threeContainer.clientHeight,
    0.1,
    1000,
  )
  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
  renderer.setSize(threeContainer.clientWidth, threeContainer.clientHeight)
  renderer.setClearColor(0x000000, 0)
  threeContainer.appendChild(renderer.domElement)

  // Create particles
  const geometry = new THREE.BufferGeometry()
  const particleCount = 500
  const positions = new Float32Array(particleCount * 3)
  const colors = new Float32Array(particleCount * 3)

  for (let i = 0; i < particleCount * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 20
    positions[i + 1] = (Math.random() - 0.5) * 20
    positions[i + 2] = (Math.random() - 0.5) * 20

    const color = new THREE.Color()
    color.setHSL(0.6 + Math.random() * 0.2, 0.8, 0.6)
    colors[i] = color.r
    colors[i + 1] = color.g
    colors[i + 2] = color.b
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

  const material = new THREE.PointsMaterial({
    size: 0.05,
    vertexColors: true,
    transparent: true,
    opacity: 0.8,
  })

  particles = new THREE.Points(geometry, material)
  scene.add(particles)

  camera.position.z = 5

  animate()
}

function animate() {
  if (!renderer || !scene || !camera || !particles) return

  animationId = requestAnimationFrame(animate)

  particles.rotation.x += 0.0005
  particles.rotation.y += 0.001

  renderer.render(scene, camera)
}

function handleResize() {
  trendChart?.resize()
  categoryChart?.resize()
  roleChart?.resize()

  if (threeContainer && renderer && camera) {
    camera.aspect = threeContainer.clientWidth / threeContainer.clientHeight
    camera.updateProjectionMatrix()
    renderer.setSize(threeContainer.clientWidth, threeContainer.clientHeight)
  }
}

onMounted(() => {
  initThreeJS()
  initTrendChart()
  initCategoryChart()
  initRoleChart()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  trendChart?.dispose()
  categoryChart?.dispose()
  roleChart?.dispose()

  if (animationId) cancelAnimationFrame(animationId)
  renderer?.dispose()
})

function formatNumber(num: number): string {
  if (num >= 10000) return (num / 10000).toFixed(1) + 'w'
  if (num >= 1000) return (num / 1000).toFixed(1) + 'k'
  return num.toString()
}
</script>

<template>
  <div class="admin-dashboard">
    <div ref="threeRef" class="three-bg"></div>

    <header class="admin-header">
      <div class="admin-header__content">
        <h1>{{ t('admin.dashboard.hero.title') }}</h1>
        <p>{{ t('admin.dashboard.hero.subtitle') }}</p>
      </div>
      <div class="admin-header__time">
        {{
          new Date().toLocaleDateString('zh-CN', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })
        }}
      </div>
    </header>

    <section class="stats-grid">
      <div class="stat-card stat-card--users">
        <div class="stat-card__icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        </div>
        <div class="stat-card__content">
          <span class="stat-card__label">{{ t('admin.dashboard.stats.totalUsers') }}</span>
          <strong class="stat-card__value">{{ formatNumber(stats.totalUsers) }}</strong>
          <span class="stat-card__trend stat-card__trend--up">+12.5%</span>
        </div>
      </div>

      <div class="stat-card stat-card--orders">
        <div class="stat-card__icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
            <line x1="8" y1="21" x2="16" y2="21" />
            <line x1="12" y1="17" x2="12" y2="21" />
          </svg>
        </div>
        <div class="stat-card__content">
          <span class="stat-card__label">{{ t('admin.dashboard.stats.totalOrders') }}</span>
          <strong class="stat-card__value">{{ formatNumber(stats.totalOrders) }}</strong>
          <span class="stat-card__trend stat-card__trend--up">+8.3%</span>
        </div>
      </div>

      <div class="stat-card stat-card--revenue">
        <div class="stat-card__icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <line x1="12" y1="1" x2="12" y2="23" />
            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
          </svg>
        </div>
        <div class="stat-card__content">
          <span class="stat-card__label">{{ t('admin.dashboard.stats.totalRevenue') }}</span>
          <strong class="stat-card__value">¥{{ formatNumber(stats.totalRevenue) }}</strong>
          <span class="stat-card__trend stat-card__trend--up">+23.1%</span>
        </div>
      </div>

      <div class="stat-card stat-card--ai">
        <div class="stat-card__icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <polygon points="12 2 2 7 12 12 22 7 12 2" />
            <polyline points="2 17 12 22 22 17" />
            <polyline points="2 12 12 17 22 12" />
          </svg>
        </div>
        <div class="stat-card__content">
          <span class="stat-card__label">{{ t('admin.dashboard.stats.aiCalls') }}</span>
          <strong class="stat-card__value">{{ formatNumber(stats.aiCalls) }}</strong>
          <span class="stat-card__trend stat-card__trend--up">+45.2%</span>
        </div>
      </div>
    </section>

    <section class="charts-grid">
      <div class="chart-card chart-card--large">
        <h3>{{ t('admin.dashboard.charts.trend') }}</h3>
        <div ref="trendChartRef" class="chart-container"></div>
      </div>

      <div class="chart-card">
        <h3>{{ t('admin.dashboard.charts.category') }}</h3>
        <div ref="categoryChartRef" class="chart-container"></div>
      </div>

      <div class="chart-card">
        <h3>{{ t('admin.dashboard.charts.aiUsage') }}</h3>
        <div ref="roleChartRef" class="chart-container"></div>
      </div>
    </section>

    <section class="review-section">
      <div class="review-header">
        <h3>{{ t('admin.dashboard.reviews.title') }}</h3>
        <span class="review-badge">{{ pendingReviews.length }}</span>
      </div>
      <div class="review-list">
        <div v-for="item in pendingReviews" :key="item.id" class="review-item">
          <div class="review-item__type" :class="`review-item__type--${item.type}`">
            {{ getTypeText(item.type) }}
          </div>
          <div class="review-item__content">
            <strong>{{ item.title }}</strong>
            <p>{{ item.creator }} · {{ item.submittedAt }}</p>
          </div>
          <div class="review-item__risk" :class="`review-item__risk--${item.riskLevel}`">
            {{ getRiskLevelText(item.riskLevel) }}
          </div>
          <div class="review-item__actions">
            <button class="btn-approve">{{ t('admin.dashboard.reviews.actions.approve') }}</button>
            <button class="btn-reject">{{ t('admin.dashboard.reviews.actions.reject') }}</button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.admin-dashboard {
  min-height: 100vh;
  padding: 24px;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e8ec 100%);
  position: relative;
  overflow: hidden;
}

.three-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
  opacity: 0.6;
}

.admin-header {
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 32px;
  padding: 32px;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
}

.admin-header__content h1 {
  margin: 0 0 8px;
  font-size: 32px;
  font-weight: 700;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.admin-header__content p {
  margin: 0;
  color: #666;
  font-size: 14px;
}

.admin-header__time {
  color: #888;
  font-size: 14px;
}

.stats-grid {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 32px;
}

.stat-card {
  display: flex;
  gap: 16px;
  padding: 24px;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.6);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.1);
}

.stat-card__icon {
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  color: #fff;
}

.stat-card--users .stat-card__icon {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.stat-card--orders .stat-card__icon {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}

.stat-card--revenue .stat-card__icon {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
}

.stat-card--ai .stat-card__icon {
  background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
}

.stat-card__content {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.stat-card__label {
  font-size: 13px;
  color: #888;
}

.stat-card__value {
  font-size: 28px;
  font-weight: 700;
  color: #333;
}

.stat-card__trend {
  font-size: 12px;
  font-weight: 600;
}

.stat-card__trend--up {
  color: #43e97b;
}

.stat-card__trend--down {
  color: #f5576c;
}

.charts-grid {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 20px;
  margin-bottom: 32px;
}

.chart-card {
  padding: 24px;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.6);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
}

.chart-card h3 {
  margin: 0 0 16px;
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

.chart-container {
  height: 280px;
}

.review-section {
  position: relative;
  z-index: 1;
  padding: 24px;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.6);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
}

.review-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
}

.review-header h3 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

.review-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 24px;
  height: 24px;
  padding: 0 8px;
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: #fff;
  font-size: 12px;
  font-weight: 600;
  border-radius: 12px;
}

.review-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.review-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 12px;
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.review-item__type {
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 600;
  color: #fff;
}

.review-item__type--design {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.review-item__type--ai_generated {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
}

.review-item__type--comment {
  background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
}

.review-item__content {
  flex: 1;
}

.review-item__content strong {
  display: block;
  font-size: 14px;
  color: #333;
  margin-bottom: 4px;
}

.review-item__content p {
  margin: 0;
  font-size: 12px;
  color: #888;
}

.review-item__risk {
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
}

.review-item__risk--low {
  background: rgba(67, 233, 123, 0.15);
  color: #2d9c5a;
}

.review-item__risk--medium {
  background: rgba(254, 225, 64, 0.2);
  color: #b8860b;
}

.review-item__risk--high {
  background: rgba(245, 87, 108, 0.15);
  color: #dc3545;
}

.review-item__actions {
  display: flex;
  gap: 8px;
}

.btn-approve,
.btn-reject {
  padding: 8px 16px;
  border: none;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-approve {
  background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
  color: #fff;
}

.btn-approve:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(67, 233, 123, 0.4);
}

.btn-reject {
  background: rgba(245, 87, 108, 0.1);
  color: #dc3545;
}

.btn-reject:hover {
  background: rgba(245, 87, 108, 0.2);
}

@media (max-width: 1200px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .charts-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }

  .admin-header {
    flex-direction: column;
    gap: 16px;
  }
}
</style>
