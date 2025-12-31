<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'
import * as echarts from 'echarts'

type OrderRow = {
  id: string
  ip: string
  sku: string
  qty: number
  status: string
  line: string
  eta: string
  updated: string
}

const orders = ref<OrderRow[]>([
  {
    id: 'MO-240923-001',
    ip: '星火骑士',
    sku: '围巾 / 霓虹赛博',
    qty: 320,
    status: '生产中',
    line: '织造-2线',
    eta: '09-28',
    updated: '10:24',
  },
  {
    id: 'MO-240923-002',
    ip: '霜月物语',
    sku: '亚克力立牌 / 冰晶白',
    qty: 1200,
    status: '质检',
    line: 'UV-1线',
    eta: '09-26',
    updated: '09:58',
  },
  {
    id: 'MO-240923-003',
    ip: '夜航便利店',
    sku: '徽章套装 / 24h霓虹',
    qty: 650,
    status: '待出库',
    line: '冲压-3线',
    eta: '09-25',
    updated: '09:35',
  },
  {
    id: 'MO-240923-004',
    ip: '星幕巡游',
    sku: '挂件 / 软胶',
    qty: 480,
    status: '待生产',
    line: '软胶-1线',
    eta: '09-30',
    updated: '09:11',
  },
])

const kpis = [
  { label: '在制订单', value: '42 单' },
  { label: '今日出库', value: '1,320 件' },
  { label: '准时率', value: '98.6%' },
  { label: '返工率', value: '0.8%' },
]

const volumeRef = ref<HTMLDivElement | null>(null)
const statusRef = ref<HTMLDivElement | null>(null)
const categoryRef = ref<HTMLDivElement | null>(null)
const leadTimeRef = ref<HTMLDivElement | null>(null)

let volumeChart: echarts.ECharts | null = null
let statusChart: echarts.ECharts | null = null
let categoryChart: echarts.ECharts | null = null
let leadTimeChart: echarts.ECharts | null = null

const initCharts = () => {
  if (volumeRef.value) {
    volumeChart = echarts.init(volumeRef.value)
    volumeChart.setOption({
      tooltip: { trigger: 'axis' },
      grid: { left: 30, right: 20, top: 30, bottom: 30 },
      xAxis: {
        type: 'category',
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      },
      yAxis: { type: 'value' },
      series: [
        {
          name: '订单量',
          type: 'line',
          smooth: true,
          data: [12, 18, 20, 16, 24, 28, 22],
          areaStyle: { opacity: 0.15 },
          lineStyle: { color: '#2c6a7b' },
          itemStyle: { color: '#2c6a7b' },
        },
      ],
    })
  }

  if (statusRef.value) {
    statusChart = echarts.init(statusRef.value)
    statusChart.setOption({
      tooltip: { trigger: 'item' },
      series: [
        {
          type: 'pie',
          radius: ['50%', '75%'],
          data: [
            { value: 18, name: '待生产' },
            { value: 42, name: '生产中' },
            { value: 9, name: '质检' },
            { value: 7, name: '待出库' },
          ],
          label: { color: '#2d2a32' },
        },
      ],
    })
  }

  if (categoryRef.value) {
    categoryChart = echarts.init(categoryRef.value)
    categoryChart.setOption({
      tooltip: { trigger: 'axis' },
      grid: { left: 40, right: 20, top: 30, bottom: 30 },
      xAxis: { type: 'value' },
      yAxis: {
        type: 'category',
        data: ['围巾', '徽章', '亚克力立牌', '挂件', '帽子'],
      },
      series: [
        {
          type: 'bar',
          data: [1200, 980, 860, 640, 520],
          itemStyle: { color: '#2c6a7b' },
        },
      ],
    })
  }

  if (leadTimeRef.value) {
    leadTimeChart = echarts.init(leadTimeRef.value)
    leadTimeChart.setOption({
      tooltip: { trigger: 'axis' },
      grid: { left: 40, right: 20, top: 30, bottom: 30 },
      xAxis: {
        type: 'category',
        data: ['织造', 'UV 印刷', '冲压', '软胶', '刺绣'],
      },
      yAxis: { type: 'value' },
      series: [
        {
          type: 'bar',
          data: [3.2, 2.6, 1.8, 2.1, 3.6],
          itemStyle: { color: '#1b8b8c' },
        },
      ],
    })
  }
}

const resizeCharts = () => {
  volumeChart?.resize()
  statusChart?.resize()
  categoryChart?.resize()
  leadTimeChart?.resize()
}

onMounted(() => {
  initCharts()
  window.addEventListener('resize', resizeCharts)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', resizeCharts)
  volumeChart?.dispose()
  statusChart?.dispose()
  categoryChart?.dispose()
  leadTimeChart?.dispose()
})
</script>

<template>
  <div class="orders-page">
    <header class="orders-hero">
      <div>
        <p class="hero-tag">制造商 · 订单看板</p>
        <h1>生产、质检与出库实时监控</h1>
        <p class="hero-subtitle">集中管理订单节奏、产线负载与准时交付指标。</p>
      </div>
      <div class="orders-kpis">
        <div v-for="item in kpis" :key="item.label" class="kpi-card">
          <span>{{ item.label }}</span>
          <strong>{{ item.value }}</strong>
        </div>
      </div>
    </header>

    <section class="orders-grid">
      <div class="chart-card">
        <h3>本周订单量</h3>
        <div ref="volumeRef" class="chart-body"></div>
      </div>
      <div class="chart-card">
        <h3>订单状态分布</h3>
        <div ref="statusRef" class="chart-body"></div>
      </div>
      <div class="chart-card">
        <h3>载体产量排行</h3>
        <div ref="categoryRef" class="chart-body"></div>
      </div>
      <div class="chart-card">
        <h3>工艺平均工时 (天)</h3>
        <div ref="leadTimeRef" class="chart-body"></div>
      </div>
    </section>

    <section class="orders-table">
      <div class="table-header">
        <h3>最新订单追踪</h3>
        <button class="inline-link">导出报表</button>
      </div>
      <div class="table-grid">
        <div class="table-row table-row--head">
          <span>订单号</span>
          <span>IP/项目</span>
          <span>SKU</span>
          <span>数量</span>
          <span>状态</span>
          <span>产线</span>
          <span>预计出库</span>
          <span>更新</span>
        </div>
        <div v-for="row in orders" :key="row.id" class="table-row">
          <span>{{ row.id }}</span>
          <span>{{ row.ip }}</span>
          <span>{{ row.sku }}</span>
          <span>{{ row.qty }}</span>
          <span class="status-pill">{{ row.status }}</span>
          <span>{{ row.line }}</span>
          <span>{{ row.eta }}</span>
          <span>{{ row.updated }}</span>
        </div>
      </div>
    </section>
  </div>
</template>
