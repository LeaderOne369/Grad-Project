<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import * as echarts from 'echarts'
import AMapLoader from '@amap/amap-jsapi-loader'
import { getUserDistribution, getTrendData, getRoleDistribution } from '@/services/adminMock'

const { t } = useI18n()

const mapRef = ref<HTMLElement | null>(null)
const conversionChartRef = ref<HTMLElement | null>(null)
const roleChartRef = ref<HTMLElement | null>(null)

let map: any = null
let conversionChart: echarts.ECharts | null = null
let roleChart: echarts.ECharts | null = null

const userDistribution = getUserDistribution()
const totalUsers = userDistribution.reduce((sum, item) => sum + item.count, 0)

async function initMap() {
  if (!mapRef.value) return

  try {
    const AMap = await AMapLoader.load({
      key: '你的高德地图API Key', // Demo mode - replace with actual key
      version: '2.0',
      plugins: ['AMap.Scale', 'AMap.ToolBar'],
    })

    map = new AMap.Map(mapRef.value, {
      zoom: 4.5,
      center: [104.114129, 37.550339],
      mapStyle: 'amap://styles/light',
    })

    // Add markers for user distribution
    userDistribution.forEach((item) => {
      const size = Math.min(Math.max(item.count / 100, 10), 50)

      const marker = new AMap.CircleMarker({
        center: [item.lng, item.lat],
        radius: size,
        fillColor: '#667eea',
        fillOpacity: 0.6,
        strokeColor: '#764ba2',
        strokeWeight: 2,
        strokeOpacity: 0.8,
      })

      marker.on('mouseover', () => {
        const info = new AMap.InfoWindow({
          content: `
            <div style="padding: 8px 12px; font-size: 13px;">
              <strong>${item.city}</strong><br/>
              <span style="color: #666;">用户数: ${item.count.toLocaleString()}</span>
            </div>
          `,
          offset: new AMap.Pixel(0, -size),
        })
        info.open(map, [item.lng, item.lat])
      })

      map.add(marker)
    })
  } catch (error) {
    console.error('Map initialization failed:', error)
    // Fallback: show static distribution list
  }
}

function initConversionChart() {
  if (!conversionChartRef.value) return
  conversionChart = echarts.init(conversionChartRef.value)

  const data = getTrendData().slice(-14)

  const option: echarts.EChartsOption = {
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    legend: {
      data: ['浏览量', '加购数', '下单数'],
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
        name: '浏览量',
        type: 'line',
        smooth: true,
        data: data.map((d) => d.users * 10 + Math.floor(Math.random() * 500)),
        lineStyle: { color: '#667eea' },
        itemStyle: { color: '#667eea' },
      },
      {
        name: '加购数',
        type: 'line',
        smooth: true,
        data: data.map((d) => Math.floor(d.users * 2.5 + Math.random() * 100)),
        lineStyle: { color: '#f093fb' },
        itemStyle: { color: '#f093fb' },
      },
      {
        name: '下单数',
        type: 'line',
        smooth: true,
        data: data.map((d) => d.orders),
        lineStyle: { color: '#43e97b' },
        itemStyle: { color: '#43e97b' },
      },
    ],
  }

  conversionChart.setOption(option)
}

function initRoleChart() {
  if (!roleChartRef.value) return
  roleChart = echarts.init(roleChartRef.value)

  const data = getRoleDistribution()

  const option: echarts.EChartsOption = {
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
    },
    legend: {
      orient: 'vertical',
      right: '5%',
      top: 'center',
      textStyle: { color: '#666' },
    },
    series: [
      {
        type: 'pie',
        radius: ['50%', '75%'],
        center: ['35%', '50%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 8,
          borderColor: '#fff',
          borderWidth: 3,
        },
        label: { show: false },
        data: data.map((d, i) => ({
          ...d,
          itemStyle: {
            color: ['#667eea', '#f093fb', '#4facfe'][i],
          },
        })),
      },
    ],
  }

  roleChart.setOption(option)
}

function handleResize() {
  conversionChart?.resize()
  roleChart?.resize()
}

onMounted(() => {
  initMap()
  initConversionChart()
  initRoleChart()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  conversionChart?.dispose()
  roleChart?.dispose()
  map?.destroy()
})
</script>

<template>
  <div class="admin-analytics">
    <header class="page-header">
      <div>
        <h1>{{ t('admin.analytics.hero.title') }}</h1>
        <p>{{ t('admin.analytics.hero.subtitle') }}</p>
      </div>
      <div class="header-actions">
        <select class="time-select">
          <option>{{ t('admin.analytics.timeRanges.last7days') }}</option>
          <option>最近14天</option>
          <option selected>{{ t('admin.analytics.timeRanges.last30days') }}</option>
          <option>{{ t('admin.analytics.timeRanges.last90days') }}</option>
        </select>
        <button class="btn-export">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          导出报告
        </button>
      </div>
    </header>

    <section class="analytics-grid">
      <div class="map-card">
        <div class="card-header">
          <h3>{{ t('admin.analytics.charts.userDistribution') }}</h3>
          <span class="total-badge">{{ totalUsers.toLocaleString() }} {{ t('admin.users.orderUnit') }}</span>
        </div>
        <div ref="mapRef" class="map-container">
          <div class="map-fallback">
            <div v-for="item in userDistribution.slice(0, 8)" :key="item.city" class="distribution-item">
              <span class="city-name">{{ item.city }}</span>
              <div class="distribution-bar">
                <div
                  class="distribution-fill"
                  :style="{ width: userDistribution[0] ? (item.count / userDistribution[0].count) * 100 + '%' : '0%' }"
                ></div>
              </div>
              <span class="city-count">{{ item.count.toLocaleString() }}</span>
            </div>
          </div>
        </div>
        <div class="map-legend">
          <div v-for="(item, index) in userDistribution.slice(0, 5)" :key="index" class="legend-item">
            <span class="legend-dot" :style="{ opacity: 1 - index * 0.15 }"></span>
            <span>{{ item.city }}</span>
            <span class="legend-value">{{ item.count.toLocaleString() }}</span>
          </div>
        </div>
      </div>

      <div class="chart-card">
        <h3>{{ t('admin.analytics.charts.conversionFunnel') }}</h3>
        <div ref="conversionChartRef" class="chart-container"></div>
      </div>

      <div class="chart-card chart-card--small">
        <h3>{{ t('admin.analytics.charts.roleDistribution') }}</h3>
        <div ref="roleChartRef" class="chart-container"></div>
      </div>

      <div class="insights-card">
        <h3>{{ t('admin.analytics.charts.insights') }}</h3>
        <div class="insights-list">
          <div class="insight-item insight-item--positive">
            <div class="insight-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                <polyline points="17 6 23 6 23 12" />
              </svg>
            </div>
            <div class="insight-content">
              <strong>{{ t('admin.analytics.insights.userGrowth') }}</strong>
              <p>{{ t('admin.analytics.insights.userGrowthDesc') }}</p>
            </div>
          </div>
          <div class="insight-item insight-item--warning">
            <div class="insight-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>
            <div class="insight-content">
              <strong>{{ t('admin.analytics.insights.conversionRate') }}</strong>
              <p>{{ t('admin.analytics.insights.conversionRateDesc') }}</p>
            </div>
          </div>
          <div class="insight-item insight-item--info">
            <div class="insight-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polygon points="12 2 2 7 12 12 22 7 12 2" />
                <polyline points="2 17 12 22 22 17" />
                <polyline points="2 12 12 17 22 12" />
              </svg>
            </div>
            <div class="insight-content">
              <strong>AI 功能受欢迎</strong>
              <p>文生图功能使用量占比 45%，用户满意度 4.8/5</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.admin-analytics {
  padding: 24px;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e8ec 100%);
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding: 24px;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.6);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
}

.page-header h1 {
  margin: 0 0 4px;
  font-size: 24px;
  font-weight: 700;
  color: #333;
}

.page-header p {
  margin: 0;
  color: #666;
  font-size: 14px;
}

.header-actions {
  display: flex;
  gap: 12px;
}

.time-select {
  padding: 10px 16px;
  background: rgba(0, 0, 0, 0.03);
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 10px;
  font-size: 14px;
  color: #333;
  cursor: pointer;
  outline: none;
}

.btn-export {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
  border: none;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-export:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(102, 126, 234, 0.4);
}

.analytics-grid {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  grid-template-rows: auto auto;
  gap: 20px;
}

.map-card {
  grid-row: span 2;
  padding: 24px;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.6);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.card-header h3 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

.total-badge {
  padding: 6px 12px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
  font-size: 12px;
  font-weight: 600;
  border-radius: 8px;
}

.map-container {
  height: 400px;
  background: linear-gradient(135deg, #e8f4f8 0%, #d8e8ef 100%);
  border-radius: 16px;
  overflow: hidden;
  margin-bottom: 16px;
}

.map-fallback {
  padding: 20px;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.distribution-item {
  display: flex;
  align-items: center;
  gap: 12px;
}

.city-name {
  width: 60px;
  font-size: 13px;
  color: #666;
}

.distribution-bar {
  flex: 1;
  height: 8px;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 4px;
  overflow: hidden;
}

.distribution-fill {
  height: 100%;
  background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
  border-radius: 4px;
  transition: width 0.5s ease;
}

.city-count {
  width: 60px;
  text-align: right;
  font-size: 13px;
  font-weight: 600;
  color: #333;
}

.map-legend {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: #666;
}

.legend-dot {
  width: 8px;
  height: 8px;
  background: #667eea;
  border-radius: 50%;
}

.legend-value {
  font-weight: 600;
  color: #333;
}

.chart-card {
  padding: 24px;
  background: rgba(255, 255, 255, 0.85);
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
  height: 220px;
}

.insights-card {
  grid-column: span 2;
  padding: 24px;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.6);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
}

.insights-card h3 {
  margin: 0 0 20px;
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

.insights-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.insight-item {
  display: flex;
  gap: 12px;
  padding: 16px;
  border-radius: 14px;
}

.insight-item--positive {
  background: rgba(67, 233, 123, 0.1);
}

.insight-item--positive .insight-icon {
  background: rgba(67, 233, 123, 0.2);
  color: #2d9c5a;
}

.insight-item--warning {
  background: rgba(254, 225, 64, 0.12);
}

.insight-item--warning .insight-icon {
  background: rgba(254, 225, 64, 0.25);
  color: #b8860b;
}

.insight-item--info {
  background: rgba(79, 172, 254, 0.1);
}

.insight-item--info .insight-icon {
  background: rgba(79, 172, 254, 0.2);
  color: #4facfe;
}

.insight-icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  flex-shrink: 0;
}

.insight-content {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.insight-content strong {
  font-size: 14px;
  color: #333;
}

.insight-content p {
  margin: 0;
  font-size: 13px;
  color: #666;
  line-height: 1.5;
}

@media (max-width: 1200px) {
  .analytics-grid {
    grid-template-columns: 1fr;
  }

  .map-card {
    grid-row: auto;
  }

  .insights-card {
    grid-column: auto;
  }

  .insights-list {
    grid-template-columns: 1fr;
  }
}
</style>

