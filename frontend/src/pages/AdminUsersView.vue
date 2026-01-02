<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { getUsers, type UserData } from '@/services/adminMock'

const { t } = useI18n()

const users = ref<UserData[]>(getUsers())
const searchQuery = ref('')
const filterRole = ref<string>('all')
const filterStatus = ref<string>('all')

const filteredUsers = computed(() => {
  return users.value.filter((user) => {
    const matchesSearch =
      user.username.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      user.displayName.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.value.toLowerCase())

    const matchesRole = filterRole.value === 'all' || user.role === filterRole.value
    const matchesStatus = filterStatus.value === 'all' || user.status === filterStatus.value

    return matchesSearch && matchesRole && matchesStatus
  })
})

// 使用计算属性从i18n获取标签
const roleLabels = computed(() => ({
  buyer: t('admin.users.roles.buyer'),
  creator: t('admin.users.roles.creator'),
  manufacturer: t('admin.users.roles.manufacturer'),
}))

const statusLabels = computed(() => ({
  active: t('admin.users.statuses.active'),
  banned: t('admin.users.statuses.banned'),
  pending: t('admin.users.statuses.pending'),
}))

function toggleUserStatus(user: UserData) {
  user.status = user.status === 'active' ? 'banned' : 'active'
}
</script>

<template>
  <div class="admin-users">
    <header class="page-header">
      <div>
        <h1>{{ t('admin.users.hero.title') }}</h1>
        <p>{{ t('admin.users.hero.subtitle') }}</p>
      </div>
      <button class="btn-primary">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
        {{ t('admin.users.hero.addUser') }}
      </button>
    </header>

    <div class="filters-bar">
      <div class="search-box">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input v-model="searchQuery" type="text" :placeholder="t('admin.users.filters.searchPlaceholder')" />
      </div>

      <div class="filter-group">
        <select v-model="filterRole" class="filter-select">
          <option value="all">{{ t('admin.users.filters.allRoles') }}</option>
          <option value="buyer">{{ t('admin.users.roles.buyer') }}</option>
          <option value="creator">{{ t('admin.users.roles.creator') }}</option>
          <option value="manufacturer">{{ t('admin.users.roles.manufacturer') }}</option>
        </select>

        <select v-model="filterStatus" class="filter-select">
          <option value="all">{{ t('admin.users.filters.allStatuses') }}</option>
          <option value="active">{{ t('admin.users.statuses.active') }}</option>
          <option value="banned">{{ t('admin.users.statuses.banned') }}</option>
          <option value="pending">{{ t('admin.users.statuses.pending') }}</option>
        </select>
      </div>
    </div>

    <div class="users-table-wrapper">
      <table class="users-table">
        <thead>
          <tr>
            <th>{{ t('admin.users.table.headers.userInfo') }}</th>
            <th>{{ t('admin.users.table.headers.role') }}</th>
            <th>{{ t('admin.users.table.headers.status') }}</th>
            <th>{{ t('admin.users.table.headers.createdAt') }}</th>
            <th>{{ t('admin.users.table.headers.lastLogin') }}</th>
            <th>{{ t('admin.users.table.headers.orders') }}</th>
            <th>{{ t('admin.users.table.headers.actions') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in filteredUsers" :key="user.id">
            <td>
              <div class="user-info">
                <div class="user-avatar">{{ user.displayName[0] }}</div>
                <div class="user-details">
                  <strong>{{ user.displayName }}</strong>
                  <span>@{{ user.username }}</span>
                  <span class="user-email">{{ user.email }}</span>
                </div>
              </div>
            </td>
            <td>
              <span class="role-badge" :class="`role-badge--${user.role}`">
                {{ roleLabels[user.role] }}
              </span>
            </td>
            <td>
              <span class="status-badge" :class="`status-badge--${user.status}`">
                {{ statusLabels[user.status] }}
              </span>
            </td>
            <td>{{ user.createdAt }}</td>
            <td>{{ user.lastLogin }}</td>
            <td>
              <div class="order-stats">
                <span>{{ user.ordersCount }} {{ t('admin.users.orderUnit') }}</span>
                <span v-if="user.role === 'buyer'">¥{{ user.totalSpent.toLocaleString() }}</span>
              </div>
            </td>
            <td>
              <div class="action-buttons">
                <button class="action-btn action-btn--view" :title="t('admin.users.actions.view')">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </button>
                <button class="action-btn action-btn--edit" :title="t('admin.users.actions.edit')">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                </button>
                <button
                  class="action-btn"
                  :class="user.status === 'banned' ? 'action-btn--unlock' : 'action-btn--ban'"
                  :title="user.status === 'banned' ? t('admin.users.actions.unban') : t('admin.users.actions.ban')"
                  @click="toggleUserStatus(user)"
                >
                  <svg v-if="user.status === 'banned'" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 9.9-1" />
                  </svg>
                  <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="pagination">
      <span class="pagination-info">{{ t('admin.users.pagination.showing') }} {{ filteredUsers.length }} {{ t('admin.users.pagination.results') }}</span>
      <div class="pagination-buttons">
        <button class="pagination-btn" disabled>{{ t('admin.users.pagination.previous') }}</button>
        <button class="pagination-btn pagination-btn--active">1</button>
        <button class="pagination-btn">2</button>
        <button class="pagination-btn">3</button>
        <button class="pagination-btn">{{ t('admin.users.pagination.next') }}</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.admin-users {
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

.btn-primary {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
  border: none;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(102, 126, 234, 0.4);
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
  max-width: 400px;
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

.search-box input::placeholder {
  color: #aaa;
}

.filter-group {
  display: flex;
  gap: 12px;
}

.filter-select {
  padding: 10px 16px;
  background: rgba(0, 0, 0, 0.03);
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-radius: 10px;
  font-size: 14px;
  color: #333;
  cursor: pointer;
  outline: none;
}

.users-table-wrapper {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.6);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
  overflow: hidden;
  margin-bottom: 24px;
}

.users-table {
  width: 100%;
  border-collapse: collapse;
}

.users-table th {
  padding: 16px 20px;
  text-align: left;
  font-size: 13px;
  font-weight: 600;
  color: #888;
  background: rgba(0, 0, 0, 0.02);
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.users-table td {
  padding: 16px 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.03);
}

.users-table tr:last-child td {
  border-bottom: none;
}

.users-table tr:hover {
  background: rgba(102, 126, 234, 0.03);
}

.user-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.user-avatar {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
  font-weight: 600;
  border-radius: 12px;
}

.user-details {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.user-details strong {
  font-size: 14px;
  color: #333;
}

.user-details span {
  font-size: 12px;
  color: #888;
}

.user-email {
  color: #aaa !important;
}

.role-badge {
  display: inline-block;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
}

.role-badge--buyer {
  background: rgba(79, 172, 254, 0.15);
  color: #4facfe;
}

.role-badge--creator {
  background: rgba(102, 126, 234, 0.15);
  color: #667eea;
}

.role-badge--manufacturer {
  background: rgba(240, 147, 251, 0.15);
  color: #f093fb;
}

.status-badge {
  display: inline-block;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
}

.status-badge--active {
  background: rgba(67, 233, 123, 0.15);
  color: #2d9c5a;
}

.status-badge--banned {
  background: rgba(245, 87, 108, 0.15);
  color: #dc3545;
}

.status-badge--pending {
  background: rgba(254, 225, 64, 0.2);
  color: #b8860b;
}

.order-stats {
  display: flex;
  flex-direction: column;
  gap: 2px;
  font-size: 13px;
  color: #666;
}

.action-buttons {
  display: flex;
  gap: 8px;
}

.action-btn {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.action-btn--view {
  background: rgba(102, 126, 234, 0.1);
  color: #667eea;
}

.action-btn--view:hover {
  background: rgba(102, 126, 234, 0.2);
}

.action-btn--edit {
  background: rgba(79, 172, 254, 0.1);
  color: #4facfe;
}

.action-btn--edit:hover {
  background: rgba(79, 172, 254, 0.2);
}

.action-btn--ban {
  background: rgba(245, 87, 108, 0.1);
  color: #dc3545;
}

.action-btn--ban:hover {
  background: rgba(245, 87, 108, 0.2);
}

.action-btn--unlock {
  background: rgba(67, 233, 123, 0.1);
  color: #2d9c5a;
}

.action-btn--unlock:hover {
  background: rgba(67, 233, 123, 0.2);
}

.pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.6);
}

.pagination-info {
  font-size: 13px;
  color: #888;
}

.pagination-buttons {
  display: flex;
  gap: 8px;
}

.pagination-btn {
  padding: 8px 14px;
  background: rgba(0, 0, 0, 0.03);
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  font-size: 13px;
  color: #666;
  cursor: pointer;
  transition: all 0.2s ease;
}

.pagination-btn:hover:not(:disabled) {
  background: rgba(102, 126, 234, 0.1);
  color: #667eea;
}

.pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination-btn--active {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
  border-color: transparent;
}
</style>

