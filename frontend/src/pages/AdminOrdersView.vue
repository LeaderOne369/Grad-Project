<script setup lang="ts">
import { ref, computed } from 'vue'
import { getOrders, type OrderData } from '@/services/adminMock'

const orders = ref<OrderData[]>(getOrders())
const searchQuery = ref('')
const filterStatus = ref<string>('all')

const filteredOrders = computed(() => {
  return orders.value.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      order.userName.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      order.productName.toLowerCase().includes(searchQuery.value.toLowerCase())

    const matchesStatus = filterStatus.value === 'all' || order.status === filterStatus.value

    return matchesSearch && matchesStatus
  })
})

const statusLabels: Record<string, string> = {
  pending: '待处理',
  processing: '生产中',
  shipped: '已发货',
  delivered: '已完成',
  cancelled: '已取消',
}

const statusColors: Record<string, string> = {
  pending: 'orange',
  processing: 'blue',
  shipped: 'purple',
  delivered: 'green',
  cancelled: 'red',
}

function updateOrderStatus(order: OrderData, newStatus: string) {
  order.status = newStatus as OrderData['status']
  order.updatedAt = new Date().toISOString().split('T')[0] as string
}

const totalRevenue = computed(() => {
  return orders.value
    .filter((o) => o.status !== 'cancelled')
    .reduce((sum, o) => sum + o.amount, 0)
})

const pendingCount = computed(() => orders.value.filter((o) => o.status === 'pending').length)
const processingCount = computed(() => orders.value.filter((o) => o.status === 'processing').length)
</script>

<template>
  <div class="admin-orders">
    <header class="page-header">
      <div>
        <h1>订单管理</h1>
        <p>追踪订单状态、处理售后与物流</p>
      </div>
      <div class="header-stats">
        <div class="mini-stat">
          <span class="mini-stat__value">¥{{ totalRevenue.toLocaleString() }}</span>
          <span class="mini-stat__label">总收入</span>
        </div>
        <div class="mini-stat mini-stat--warning">
          <span class="mini-stat__value">{{ pendingCount }}</span>
          <span class="mini-stat__label">待处理</span>
        </div>
        <div class="mini-stat mini-stat--info">
          <span class="mini-stat__value">{{ processingCount }}</span>
          <span class="mini-stat__label">生产中</span>
        </div>
      </div>
    </header>

    <div class="filters-bar">
      <div class="search-box">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input v-model="searchQuery" type="text" placeholder="搜索订单号、用户或商品..." />
      </div>

      <div class="filter-tabs">
        <button
          v-for="status in ['all', 'pending', 'processing', 'shipped', 'delivered', 'cancelled']"
          :key="status"
          :class="['filter-tab', { active: filterStatus === status }]"
          @click="filterStatus = status"
        >
          {{ status === 'all' ? '全部' : statusLabels[status] }}
        </button>
      </div>
    </div>

    <div class="orders-grid">
      <div v-for="order in filteredOrders" :key="order.id" class="order-card">
        <div class="order-card__header">
          <span class="order-id">{{ order.id }}</span>
          <span :class="['order-status', `order-status--${statusColors[order.status]}`]">
            {{ statusLabels[order.status] }}
          </span>
        </div>

        <div class="order-card__product">
          <div class="product-image">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
          </div>
          <div class="product-info">
            <strong>{{ order.productName }}</strong>
            <span>{{ order.carrierType }}</span>
          </div>
        </div>

        <div class="order-card__details">
          <div class="detail-row">
            <span class="detail-label">购买者</span>
            <span class="detail-value">{{ order.userName }}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">金额</span>
            <span class="detail-value detail-value--highlight">¥{{ order.amount }}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">创建时间</span>
            <span class="detail-value">{{ order.createdAt }}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">更新时间</span>
            <span class="detail-value">{{ order.updatedAt }}</span>
          </div>
        </div>

        <div class="order-card__actions">
          <select
            v-if="order.status !== 'delivered' && order.status !== 'cancelled'"
            class="status-select"
            :value="order.status"
            @change="updateOrderStatus(order, ($event.target as HTMLSelectElement).value)"
          >
            <option value="pending">待处理</option>
            <option value="processing">生产中</option>
            <option value="shipped">已发货</option>
            <option value="delivered">已完成</option>
            <option value="cancelled">已取消</option>
          </select>
          <button class="btn-detail">查看详情</button>
        </div>
      </div>
    </div>

    <div v-if="filteredOrders.length === 0" class="empty-state">
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
      <p>没有找到符合条件的订单</p>
    </div>
  </div>
</template>

<style scoped>
.admin-orders {
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

.header-stats {
  display: flex;
  gap: 20px;
}

.mini-stat {
  text-align: center;
  padding: 12px 20px;
  background: rgba(67, 233, 123, 0.1);
  border-radius: 12px;
}

.mini-stat--warning {
  background: rgba(254, 225, 64, 0.15);
}

.mini-stat--info {
  background: rgba(79, 172, 254, 0.1);
}

.mini-stat__value {
  display: block;
  font-size: 20px;
  font-weight: 700;
  color: #333;
}

.mini-stat__label {
  font-size: 12px;
  color: #888;
}

.filters-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
  padding: 16px 20px;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.6);
}

.search-box {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
  max-width: 360px;
  padding: 12px 16px;
  background: rgba(0, 0, 0, 0.03);
  border-radius: 12px;
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.search-box svg {
  color: #888;
}

.search-box input {
  flex: 1;
  border: none;
  background: transparent;
  font-size: 14px;
  color: #333;
  outline: none;
}

.filter-tabs {
  display: flex;
  gap: 8px;
}

.filter-tab {
  padding: 8px 16px;
  background: transparent;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 8px;
  font-size: 13px;
  color: #666;
  cursor: pointer;
  transition: all 0.2s ease;
}

.filter-tab:hover {
  background: rgba(102, 126, 234, 0.05);
}

.filter-tab.active {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
  border-color: transparent;
}

.orders-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 20px;
}

.order-card {
  padding: 20px;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.6);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
}

.order-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.1);
}

.order-card__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.order-id {
  font-size: 13px;
  font-weight: 600;
  color: #888;
}

.order-status {
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
}

.order-status--orange {
  background: rgba(254, 225, 64, 0.2);
  color: #b8860b;
}

.order-status--blue {
  background: rgba(79, 172, 254, 0.15);
  color: #4facfe;
}

.order-status--purple {
  background: rgba(102, 126, 234, 0.15);
  color: #667eea;
}

.order-status--green {
  background: rgba(67, 233, 123, 0.15);
  color: #2d9c5a;
}

.order-status--red {
  background: rgba(245, 87, 108, 0.15);
  color: #dc3545;
}

.order-card__product {
  display: flex;
  gap: 12px;
  padding: 12px;
  background: rgba(0, 0, 0, 0.02);
  border-radius: 12px;
  margin-bottom: 16px;
}

.product-image {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
  border-radius: 10px;
}

.product-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.product-info strong {
  font-size: 14px;
  color: #333;
}

.product-info span {
  font-size: 12px;
  color: #888;
}

.order-card__details {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  margin-bottom: 16px;
}

.detail-row {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.detail-label {
  font-size: 11px;
  color: #aaa;
}

.detail-value {
  font-size: 13px;
  color: #666;
}

.detail-value--highlight {
  font-weight: 600;
  color: #333;
}

.order-card__actions {
  display: flex;
  gap: 10px;
}

.status-select {
  flex: 1;
  padding: 10px 12px;
  background: rgba(0, 0, 0, 0.03);
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 10px;
  font-size: 13px;
  color: #333;
  cursor: pointer;
  outline: none;
}

.btn-detail {
  padding: 10px 16px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
  border: none;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-detail:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(102, 126, 234, 0.4);
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  color: #aaa;
}

.empty-state svg {
  margin-bottom: 16px;
}

.empty-state p {
  margin: 0;
  font-size: 14px;
}
</style>

