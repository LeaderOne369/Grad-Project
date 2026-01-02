<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { getReviewItems, type ReviewItem } from '@/services/adminMock'

const { t } = useI18n()

// 辅助函数
const getTypeLabel = (type: string) => typeLabels.value[type] || type
const getRiskLabel = (risk: string) => riskLabels.value[risk] || risk

const reviews = ref<ReviewItem[]>(getReviewItems())
const filterType = ref<string>('all')
const filterRisk = ref<string>('all')

const filteredReviews = computed(() => {
  return reviews.value.filter((item) => {
    const matchesType = filterType.value === 'all' || item.type === filterType.value
    const matchesRisk = filterRisk.value === 'all' || item.riskLevel === filterRisk.value
    return matchesType && matchesRisk
  })
})

const pendingCount = computed(() => reviews.value.filter((r) => r.status === 'pending').length)
const highRiskCount = computed(() => reviews.value.filter((r) => r.riskLevel === 'high').length)

function approveItem(item: ReviewItem) {
  item.status = 'approved'
}

function rejectItem(item: ReviewItem) {
  item.status = 'rejected'
}

const typeLabels = computed<Record<string, string>>(() => ({
  design: t('admin.review.types.design'),
  ai_generated: t('admin.review.types.ai_generated'),
  comment: t('admin.review.types.comment'),
}))

const riskLabels = computed<Record<string, string>>(() => ({
  low: t('admin.review.riskLevels.low'),
  medium: t('admin.review.riskLevels.medium'),
  high: t('admin.review.riskLevels.high'),
}))
</script>

<template>
  <div class="admin-review">
    <header class="page-header">
      <div>
        <h1>{{ t('admin.review.hero.title') }}</h1>
        <p>{{ t('admin.review.hero.subtitle') }}</p>
      </div>
      <div class="header-stats">
        <div class="mini-stat mini-stat--warning">
          <span class="mini-stat__value">{{ pendingCount }}</span>
          <span class="mini-stat__label">{{ t('admin.review.stats.pending') }}</span>
        </div>
        <div class="mini-stat mini-stat--danger">
          <span class="mini-stat__value">{{ highRiskCount }}</span>
          <span class="mini-stat__label">高风险</span>
        </div>
      </div>
    </header>

    <div class="filters-bar">
      <div class="filter-group">
        <span class="filter-label">内容类型</span>
        <div class="filter-buttons">
          <button
            v-for="type in ['all', 'design', 'ai_generated', 'comment']"
            :key="type"
            :class="['filter-btn', { active: filterType === type }]"
            @click="filterType = type"
          >
            {{ type === 'all' ? t('admin.orders.filters.all') : getTypeLabel(type) }}
          </button>
        </div>
      </div>

      <div class="filter-group">
        <span class="filter-label">风险等级</span>
        <div class="filter-buttons">
          <button
            v-for="risk in ['all', 'low', 'medium', 'high']"
            :key="risk"
            :class="['filter-btn', `filter-btn--${risk}`, { active: filterRisk === risk }]"
            @click="filterRisk = risk"
          >
            {{ risk === 'all' ? t('admin.orders.filters.all') : getRiskLabel(risk) }}
          </button>
        </div>
      </div>
    </div>

    <div class="review-grid">
      <div v-for="item in filteredReviews" :key="item.id" class="review-card">
        <div class="review-card__header">
          <span :class="['type-badge', `type-badge--${item.type}`]">
            {{ getTypeLabel(item.type) }}
          </span>
          <span :class="['risk-badge', `risk-badge--${item.riskLevel}`]">
            {{ getRiskLabel(item.riskLevel) }}
          </span>
        </div>

        <div class="review-card__preview">
          <div v-if="item.imageUrl" class="preview-image">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
          </div>
          <div v-else class="preview-text">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </div>
        </div>

        <div class="review-card__content">
          <h4>{{ item.title }}</h4>
          <p class="creator">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            {{ item.creator }}
          </p>
          <p class="description">{{ item.content }}</p>
          <p class="time">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            {{ item.submittedAt }}
          </p>
        </div>

        <div v-if="item.status === 'pending'" class="review-card__actions">
          <button class="btn-approve" @click="approveItem(item)">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            {{ t('admin.review.actions.approve') }}
          </button>
          <button class="btn-reject" @click="rejectItem(item)">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
            {{ t('admin.review.actions.reject') }}
          </button>
        </div>

        <div v-else class="review-card__status">
          <span :class="['status-result', `status-result--${item.status}`]">
            {{ item.status === 'approved' ? t('admin.review.status.approved') : t('admin.review.status.rejected') }}
          </span>
        </div>
      </div>
    </div>

    <div v-if="filteredReviews.length === 0" class="empty-state">
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <polyline points="20 6 9 17 4 12" />
      </svg>
      <p>{{ t('admin.review.empty.noPending') }}</p>
    </div>
  </div>
</template>

<style scoped>
.admin-review {
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
  gap: 16px;
}

.mini-stat {
  text-align: center;
  padding: 12px 20px;
  border-radius: 12px;
}

.mini-stat--warning {
  background: rgba(254, 225, 64, 0.15);
}

.mini-stat--danger {
  background: rgba(245, 87, 108, 0.12);
}

.mini-stat__value {
  display: block;
  font-size: 24px;
  font-weight: 700;
  color: #333;
}

.mini-stat__label {
  font-size: 12px;
  color: #888;
}

.filters-bar {
  display: flex;
  gap: 32px;
  margin-bottom: 24px;
  padding: 20px 24px;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.6);
}

.filter-group {
  display: flex;
  align-items: center;
  gap: 12px;
}

.filter-label {
  font-size: 13px;
  font-weight: 600;
  color: #666;
}

.filter-buttons {
  display: flex;
  gap: 8px;
}

.filter-btn {
  padding: 8px 14px;
  background: transparent;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 8px;
  font-size: 13px;
  color: #666;
  cursor: pointer;
  transition: all 0.2s ease;
}

.filter-btn:hover {
  background: rgba(102, 126, 234, 0.05);
}

.filter-btn.active {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
  border-color: transparent;
}

.filter-btn--low.active {
  background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
}

.filter-btn--medium.active {
  background: linear-gradient(135deg, #fee140 0%, #fa709a 100%);
}

.filter-btn--high.active {
  background: linear-gradient(135deg, #f5576c 0%, #f093fb 100%);
}

.review-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 20px;
}

.review-card {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.6);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
  overflow: hidden;
  transition: all 0.3s ease;
}

.review-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.1);
}

.review-card__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.type-badge {
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  color: #fff;
}

.type-badge--design {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.type-badge--ai_generated {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
}

.type-badge--comment {
  background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
}

.risk-badge {
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
}

.risk-badge--low {
  background: rgba(67, 233, 123, 0.15);
  color: #2d9c5a;
}

.risk-badge--medium {
  background: rgba(254, 225, 64, 0.2);
  color: #b8860b;
}

.risk-badge--high {
  background: rgba(245, 87, 108, 0.15);
  color: #dc3545;
}

.review-card__preview {
  height: 160px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f5f7fa 0%, #e8eef3 100%);
}

.preview-image,
.preview-text {
  color: #aaa;
}

.review-card__content {
  padding: 16px 20px;
}

.review-card__content h4 {
  margin: 0 0 8px;
  font-size: 15px;
  font-weight: 600;
  color: #333;
}

.creator {
  display: flex;
  align-items: center;
  gap: 6px;
  margin: 0 0 8px;
  font-size: 13px;
  color: #888;
}

.description {
  margin: 0 0 8px;
  font-size: 13px;
  color: #666;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.time {
  display: flex;
  align-items: center;
  gap: 6px;
  margin: 0;
  font-size: 12px;
  color: #aaa;
}

.review-card__actions {
  display: flex;
  gap: 10px;
  padding: 16px 20px;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
}

.btn-approve,
.btn-reject {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 12px 16px;
  border: none;
  border-radius: 10px;
  font-size: 13px;
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
  box-shadow: 0 4px 16px rgba(67, 233, 123, 0.4);
}

.btn-reject {
  background: rgba(245, 87, 108, 0.1);
  color: #dc3545;
}

.btn-reject:hover {
  background: rgba(245, 87, 108, 0.2);
}

.review-card__status {
  padding: 16px 20px;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
  text-align: center;
}

.status-result {
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
}

.status-result--approved {
  background: rgba(67, 233, 123, 0.15);
  color: #2d9c5a;
}

.status-result--rejected {
  background: rgba(245, 87, 108, 0.15);
  color: #dc3545;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;
  color: #43e97b;
}

.empty-state p {
  margin: 16px 0 0;
  font-size: 14px;
  color: #888;
}
</style>

