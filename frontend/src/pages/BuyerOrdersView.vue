<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, nextTick } from 'vue'
import L from 'leaflet'

const orders = [
  {
    id: 'BO-240923-011',
    title: '星火骑士 · 围巾联名套装',
    status: '运输中',
    eta: '09-26',
    carrier: '围巾 / 徽章',
    provider: '顺丰速运',
    progress: 68,
  },
  {
    id: 'BO-240920-007',
    title: '霜月物语 · 亚克力立牌',
    status: '已发货',
    eta: '09-25',
    carrier: '亚克力立牌',
    provider: '京东物流',
    progress: 85,
  },
  {
    id: 'BO-240915-004',
    title: '夜航便利店 · 霓虹帽子',
    status: '已签收',
    eta: '09-21',
    carrier: '帽子',
    provider: '圆通快递',
    progress: 100,
  },
]

const timeline = [
  {
    label: '订单确认',
    time: '09-20 11:32',
  },
  {
    label: '制造完成',
    time: '09-22 18:10',
  },
  {
    label: '已出库',
    time: '09-23 09:05',
  },
  {
    label: '运输中',
    time: '09-24 15:22',
  },
]

const mapRef = ref<HTMLDivElement | null>(null)
let map: L.Map | null = null

onMounted(async () => {
  if (!mapRef.value) return
  map = L.map(mapRef.value, { zoomControl: false }).setView([31.2304, 121.4737], 6)
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors',
  }).addTo(map)

  const route = [
    [31.8206, 117.2272],
    [31.2304, 121.4737],
  ] as [number, number][]

  L.polyline(route, { color: '#d75c35', weight: 3 }).addTo(map)
  L.circleMarker(route[0], { radius: 6, color: '#2d6e63' }).addTo(map)
  L.circleMarker(route[1], { radius: 6, color: '#2d6e63' }).addTo(map)

  await nextTick()
  map.invalidateSize()
})

onBeforeUnmount(() => {
  map?.remove()
})
</script>

<template>
  <div class="buyer-orders-page">
    <header class="orders-hero orders-hero--buyer">
      <div>
        <p class="hero-tag">购买者 · 我的订单</p>
        <h1>追踪你的谷子旅程</h1>
        <p class="hero-subtitle">查看当前订单状态、物流路线与预计送达时间。</p>
      </div>
      <div class="orders-kpis">
        <div class="kpi-card">
          <span>进行中订单</span>
          <strong>2</strong>
        </div>
        <div class="kpi-card">
          <span>已完成订单</span>
          <strong>18</strong>
        </div>
        <div class="kpi-card">
          <span>平均交付</span>
          <strong>3.4 天</strong>
        </div>
        <div class="kpi-card">
          <span>推荐匹配</span>
          <strong>92%</strong>
        </div>
      </div>
    </header>

    <section class="buyer-orders-grid">
      <div class="panel-card">
        <h3>物流路线</h3>
        <div ref="mapRef" class="map-canvas"></div>
      </div>
      <div class="panel-card">
        <h3>订单追踪</h3>
        <div class="timeline">
          <div v-for="item in timeline" :key="item.label" class="timeline-item">
            <span>{{ item.label }}</span>
            <p>{{ item.time }}</p>
          </div>
        </div>
        <div class="timeline-progress">
          <div class="timeline-fill" style="width: 70%"></div>
        </div>
      </div>
    </section>

    <section class="orders-table">
      <div class="table-header">
        <h3>我的订单列表</h3>
        <button class="inline-link">下载物流单</button>
      </div>
      <div class="table-grid">
        <div class="table-row table-row--head">
          <span>订单号</span>
          <span>商品</span>
          <span>载体</span>
          <span>物流</span>
          <span>状态</span>
          <span>预计送达</span>
          <span>进度</span>
        </div>
        <div v-for="row in orders" :key="row.id" class="table-row">
          <span>{{ row.id }}</span>
          <span>{{ row.title }}</span>
          <span>{{ row.carrier }}</span>
          <span>{{ row.provider }}</span>
          <span class="status-pill status-pill--buyer">{{ row.status }}</span>
          <span>{{ row.eta }}</span>
          <span>{{ row.progress }}%</span>
        </div>
      </div>
    </section>
  </div>
</template>
