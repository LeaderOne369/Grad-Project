<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useAuth } from '@/composables/useAuth'
import {
  getPosts,
  getHotPosts,
  getHotTags,
  categories,
  getRoleDisplay,
  type Post,
} from '@/services/communityMock'

const { t } = useI18n()
const { userRole } = useAuth()

const route = useRoute()

// 状态
const posts = ref<Post[]>([])
const hotPosts = ref<Post[]>([])
const hotTags = ref<{ name: string; count: number }[]>([])
const activeCategory = ref('all')
const searchKeyword = ref('')
const sortBy = ref<'latest' | 'hot' | 'mostLiked'>('latest')
const isLoading = ref(false)

// 当前角色
const currentRole = computed(() => {
  return userRole.value || 'buyer'
})

// 角色主题色
const roleTheme = computed(() => {
  const themes = {
    creator: { primary: '#7b4fe3', bg: 'rgba(246, 241, 255, 0.9)', light: 'rgba(123, 79, 227, 0.1)' },
    manufacturer: { primary: '#2c6a7b', bg: 'rgba(237, 245, 247, 0.95)', light: 'rgba(44, 106, 123, 0.1)' },
    buyer: { primary: '#d75c35', bg: 'rgba(255, 242, 233, 0.9)', light: 'rgba(215, 92, 53, 0.1)' },
  }
  return themes[currentRole.value] || themes.buyer
})

// 加载数据
function loadPosts() {
  isLoading.value = true
  setTimeout(() => {
    posts.value = getPosts({
      category: activeCategory.value,
      keyword: searchKeyword.value,
      sortBy: sortBy.value,
    })
    isLoading.value = false
  }, 300)
}

// 切换分类
function selectCategory(categoryId: string) {
  activeCategory.value = categoryId
  loadPosts()
}

// 搜索
function handleSearch() {
  loadPosts()
}

// 切换排序
function changeSort(sort: 'latest' | 'hot' | 'mostLiked') {
  sortBy.value = sort
  loadPosts()
}

// 格式化数字
function formatNumber(num: number): string {
  if (num >= 10000) return (num / 10000).toFixed(1) + 'w'
  if (num >= 1000) return (num / 1000).toFixed(1) + 'k'
  return num.toString()
}

// 获取分类名称
function getCategoryName(categoryId: string): string {
  const cat = categories.find((c) => c.id === categoryId)
  return cat ? cat.name : categoryId
}

onMounted(() => {
  loadPosts()
  hotPosts.value = getHotPosts()
  hotTags.value = getHotTags()
})
</script>

<template>
  <div class="community-page" :style="{ '--theme-primary': roleTheme.primary, '--theme-bg': roleTheme.bg, '--theme-light': roleTheme.light }">
    <!-- Hero Section -->
    <header class="community-hero">
      <div class="hero-content">
        <div class="hero-badge">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
          GOZU 社区
        </div>
        <h1>{{ t('community.subtitle') }}</h1>
        <p class="hero-subtitle">
          {{ t('community.description') }}
        </p>
        <div class="hero-stats">
          <div class="stat-item">
            <strong>{{ formatNumber(posts.length * 127) }}</strong>
            <span>{{ t('community.stats.users') }}</span>
          </div>
          <div class="stat-item">
            <strong>{{ formatNumber(posts.length * 43) }}</strong>
            <span>{{ t('community.stats.posts') }}</span>
          </div>
          <div class="stat-item">
            <strong>{{ formatNumber(posts.length * 892) }}</strong>
            <span>{{ t('community.stats.interactions') }}</span>
          </div>
        </div>
      </div>
      <div class="hero-actions">
        <RouterLink to="/community/create" class="btn-create">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          {{ t('community.createPost') }}
        </RouterLink>
      </div>
    </header>

    <!-- Main Content -->
    <div class="community-layout">
      <!-- Left Sidebar - Categories -->
      <aside class="community-sidebar">
        <div class="sidebar-section">
          <h3>{{ t('community.categories.title') }}</h3>
          <nav class="category-nav">
            <button
              v-for="cat in categories"
              :key="cat.id"
              :class="['category-item', { active: activeCategory === cat.id }]"
              @click="selectCategory(cat.id)"
            >
              <span class="category-icon">{{ cat.icon }}</span>
              <span class="category-name">{{ cat.name }}</span>
            </button>
          </nav>
        </div>

        <div class="sidebar-section">
          <h3>{{ t('community.hot.tags') }}</h3>
          <div class="tag-cloud">
            <button
              v-for="tag in hotTags"
              :key="tag.name"
              class="tag-item"
              @click="searchKeyword = tag.name; handleSearch()"
            >
              #{{ tag.name }}
              <span class="tag-count">{{ tag.count }}</span>
            </button>
          </div>
        </div>
      </aside>

      <!-- Main Feed -->
      <main class="community-main">
        <!-- Search & Sort Bar -->
        <div class="feed-toolbar">
          <div class="search-box">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              v-model="searchKeyword"
              type="text"
              :placeholder="t('community.search.placeholder')"
              @keyup.enter="handleSearch"
            />
            <button v-if="searchKeyword" class="clear-btn" @click="searchKeyword = ''; handleSearch()">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
          <div class="sort-tabs">
            <button :class="['sort-tab', { active: sortBy === 'latest' }]" @click="changeSort('latest')">
              {{ t('community.sort.latest') }}
            </button>
            <button :class="['sort-tab', { active: sortBy === 'hot' }]" @click="changeSort('hot')">
              {{ t('community.sort.hot') }}
            </button>
            <button :class="['sort-tab', { active: sortBy === 'mostLiked' }]" @click="changeSort('mostLiked')">
              {{ t('community.sort.mostLiked') }}
            </button>
          </div>
        </div>

        <!-- Post List -->
        <div class="post-list" :class="{ loading: isLoading }">
          <article v-for="post in posts" :key="post.id" class="post-card">
            <RouterLink :to="`/community/post/${post.id}`" class="post-link">
              <div class="post-header">
                <div class="author-info">
                  <div class="author-avatar" :style="{ background: getRoleDisplay(post.author.role).color }">
                    {{ post.author.name[0] }}
                  </div>
                  <div class="author-meta">
                    <div class="author-name">
                      {{ post.author.name }}
                      <span class="author-badge" v-if="post.author.badge">{{ post.author.badge }}</span>
                    </div>
                    <div class="author-role" :style="{ color: getRoleDisplay(post.author.role).color }">
                      {{ getRoleDisplay(post.author.role).label }}
                    </div>
                  </div>
                </div>
                <div class="post-time">{{ post.createdAt }}</div>
              </div>

              <div class="post-body">
                <span class="post-category">{{ getCategoryName(post.category) }}</span>
                <h2 class="post-title">{{ post.title }}</h2>
                <p class="post-summary">{{ post.summary }}</p>
                <div class="post-tags">
                  <span v-for="tag in post.tags.slice(0, 3)" :key="tag" class="post-tag">
                    #{{ tag }}
                  </span>
                </div>
              </div>

              <div class="post-footer">
                <div class="post-stats">
                  <span class="stat">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                    {{ formatNumber(post.viewCount) }}
                  </span>
                  <span class="stat" :class="{ active: post.isLiked }">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" :fill="post.isLiked ? 'currentColor' : 'none'" stroke="currentColor" stroke-width="2">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                    {{ formatNumber(post.likeCount) }}
                  </span>
                  <span class="stat">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                    {{ formatNumber(post.commentCount) }}
                  </span>
                  <span class="stat" :class="{ active: post.isCollected }">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" :fill="post.isCollected ? 'currentColor' : 'none'" stroke="currentColor" stroke-width="2">
                      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                    </svg>
                    {{ formatNumber(post.collectCount) }}
                  </span>
                </div>
              </div>
            </RouterLink>
          </article>

          <!-- Empty State -->
          <div v-if="posts.length === 0 && !isLoading" class="empty-state">
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="12" y1="18" x2="12" y2="12" />
              <line x1="9" y1="15" x2="15" y2="15" />
            </svg>
            <h3>{{ t('community.empty.noPosts') }}</h3>
            <p>{{ t('community.empty.noPostsDesc') }}</p>
            <RouterLink to="/community/create" class="btn-create-empty">{{ t('community.empty.createFirst') }}</RouterLink>
          </div>
        </div>
      </main>

      <!-- Right Sidebar - Hot Posts -->
      <aside class="community-sidebar community-sidebar--right">
        <div class="sidebar-section">
          <h3>🔥 {{ t('community.hot.posts') }}</h3>
          <div class="hot-posts">
            <RouterLink
              v-for="(post, index) in hotPosts"
              :key="post.id"
              :to="`/community/post/${post.id}`"
              class="hot-post-item"
            >
              <span class="hot-rank" :class="{ top: index < 3 }">{{ index + 1 }}</span>
              <div class="hot-post-info">
                <h4>{{ post.title }}</h4>
                <span class="hot-post-stats">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                  {{ formatNumber(post.likeCount) }}
                </span>
              </div>
            </RouterLink>
          </div>
        </div>

        <div class="sidebar-section sidebar-section--promo">
          <div class="promo-card">
            <div class="promo-icon">✨</div>
            <h4>{{ t('community.promo.title') }}</h4>
            <p>{{ t('community.promo.desc') }}</p>
            <button class="promo-btn">{{ t('community.promo.button') }}</button>
          </div>
        </div>
      </aside>
    </div>
  </div>
</template>

<style scoped>
.community-page {
  min-height: 100vh;
  padding: 0 0 60px;
  background: radial-gradient(circle at top left, #fdf7ef 0%, #f7f2ea 35%, #ece2d7 100%);
}

/* Hero Section */
.community-hero {
  padding: 48px 7vw 40px;
  background: var(--theme-bg);
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 40px;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  background: var(--theme-light);
  color: var(--theme-primary);
  font-size: 13px;
  font-weight: 600;
  border-radius: 20px;
  margin-bottom: 16px;
}

.hero-content h1 {
  margin: 0 0 12px;
  font-size: 36px;
  font-weight: 800;
  color: var(--ink);
  letter-spacing: -0.02em;
}

.hero-subtitle {
  margin: 0 0 24px;
  font-size: 15px;
  color: var(--ink-soft);
  line-height: 1.7;
}

.hero-stats {
  display: flex;
  gap: 32px;
}

.stat-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.stat-item strong {
  font-size: 24px;
  font-weight: 700;
  color: var(--theme-primary);
}

.stat-item span {
  font-size: 12px;
  color: var(--ink-soft);
}

.hero-actions {
  flex-shrink: 0;
}

.btn-create {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 28px;
  background: var(--theme-primary);
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  border-radius: 12px;
  text-decoration: none;
  transition: all 0.25s ease;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.btn-create:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
}

/* Layout */
.community-layout {
  display: grid;
  grid-template-columns: 220px 1fr 280px;
  gap: 24px;
  padding: 32px 7vw;
  max-width: 1600px;
  margin: 0 auto;
}

/* Sidebar */
.community-sidebar {
  position: sticky;
  top: 100px;
  height: fit-content;
}

.sidebar-section {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 20px;
  border: 1px solid rgba(255, 255, 255, 0.6);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
}

.sidebar-section h3 {
  margin: 0 0 16px;
  font-size: 14px;
  font-weight: 700;
  color: var(--ink);
}

/* Categories */
.category-nav {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.category-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  background: transparent;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 500;
  color: var(--ink-soft);
  text-align: left;
  transition: all 0.2s ease;
}

.category-item:hover {
  background: var(--theme-light);
  color: var(--theme-primary);
}

.category-item.active {
  background: var(--theme-primary);
  color: #fff;
}

.category-icon {
  font-size: 16px;
}

/* Tags */
.tag-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag-item {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 6px 10px;
  background: var(--theme-light);
  border: none;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 500;
  color: var(--theme-primary);
  cursor: pointer;
  transition: all 0.2s ease;
}

.tag-item:hover {
  background: var(--theme-primary);
  color: #fff;
}

.tag-count {
  font-size: 10px;
  opacity: 0.7;
}

/* Feed Toolbar */
.feed-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  margin-bottom: 24px;
}

.search-box {
  flex: 1;
  max-width: 400px;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 12px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  transition: all 0.2s ease;
}

.search-box:focus-within {
  border-color: var(--theme-primary);
  box-shadow: 0 0 0 3px var(--theme-light);
}

.search-box svg {
  color: var(--ink-soft);
  flex-shrink: 0;
}

.search-box input {
  flex: 1;
  border: none;
  background: none;
  font-size: 14px;
  color: var(--ink);
  outline: none;
}

.search-box input::placeholder {
  color: #999;
}

.clear-btn {
  padding: 4px;
  background: none;
  border: none;
  color: var(--ink-soft);
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.2s;
}

.clear-btn:hover {
  background: rgba(0, 0, 0, 0.05);
}

.sort-tabs {
  display: flex;
  gap: 4px;
  padding: 4px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
}

.sort-tab {
  padding: 8px 16px;
  background: none;
  border: none;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  color: var(--ink-soft);
  cursor: pointer;
  transition: all 0.2s ease;
}

.sort-tab:hover {
  color: var(--theme-primary);
}

.sort-tab.active {
  background: var(--theme-primary);
  color: #fff;
}

/* Post List */
.post-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  transition: opacity 0.3s ease;
}

.post-list.loading {
  opacity: 0.5;
  pointer-events: none;
}

.post-card {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.6);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
  transition: all 0.3s ease;
  overflow: hidden;
}

.post-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.08);
}

.post-link {
  display: block;
  padding: 24px;
  text-decoration: none;
  color: inherit;
}

.post-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
}

.author-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.author-avatar {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 700;
  color: #fff;
}

.author-meta {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.author-name {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 600;
  color: var(--ink);
}

.author-badge {
  padding: 2px 8px;
  background: linear-gradient(135deg, #ffd700, #ffaa00);
  color: #5a4000;
  font-size: 10px;
  font-weight: 600;
  border-radius: 4px;
}

.author-role {
  font-size: 12px;
  font-weight: 500;
}

.post-time {
  font-size: 12px;
  color: #999;
}

.post-body {
  margin-bottom: 16px;
}

.post-category {
  display: inline-block;
  padding: 4px 10px;
  background: var(--theme-light);
  color: var(--theme-primary);
  font-size: 11px;
  font-weight: 600;
  border-radius: 6px;
  margin-bottom: 10px;
}

.post-title {
  margin: 0 0 10px;
  font-size: 18px;
  font-weight: 700;
  color: var(--ink);
  line-height: 1.4;
}

.post-summary {
  margin: 0 0 12px;
  font-size: 14px;
  color: var(--ink-soft);
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.post-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.post-tag {
  font-size: 12px;
  color: var(--theme-primary);
  font-weight: 500;
}

.post-footer {
  padding-top: 16px;
  border-top: 1px solid rgba(0, 0, 0, 0.06);
}

.post-stats {
  display: flex;
  gap: 20px;
}

.stat {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: var(--ink-soft);
}

.stat.active {
  color: var(--theme-primary);
}

/* Hot Posts */
.hot-posts {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.hot-post-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px;
  background: rgba(0, 0, 0, 0.02);
  border-radius: 10px;
  text-decoration: none;
  transition: all 0.2s ease;
}

.hot-post-item:hover {
  background: var(--theme-light);
}

.hot-rank {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.08);
  border-radius: 6px;
  font-size: 12px;
  font-weight: 700;
  color: var(--ink-soft);
  flex-shrink: 0;
}

.hot-rank.top {
  background: linear-gradient(135deg, var(--theme-primary), #ff6b6b);
  color: #fff;
}

.hot-post-info {
  flex: 1;
  min-width: 0;
}

.hot-post-info h4 {
  margin: 0 0 6px;
  font-size: 13px;
  font-weight: 600;
  color: var(--ink);
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.hot-post-stats {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  color: #ff6b6b;
}

/* Promo Card */
.promo-card {
  text-align: center;
  padding: 8px;
}

.promo-icon {
  font-size: 32px;
  margin-bottom: 12px;
}

.promo-card h4 {
  margin: 0 0 8px;
  font-size: 15px;
  font-weight: 700;
  color: var(--ink);
}

.promo-card p {
  margin: 0 0 16px;
  font-size: 12px;
  color: var(--ink-soft);
  line-height: 1.5;
}

.promo-btn {
  padding: 10px 20px;
  background: var(--theme-primary);
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.promo-btn:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 60px 20px;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 16px;
}

.empty-state svg {
  color: #ccc;
  margin-bottom: 20px;
}

.empty-state h3 {
  margin: 0 0 8px;
  font-size: 18px;
  font-weight: 700;
  color: var(--ink);
}

.empty-state p {
  margin: 0 0 24px;
  font-size: 14px;
  color: var(--ink-soft);
}

.btn-create-empty {
  display: inline-flex;
  padding: 12px 24px;
  background: var(--theme-primary);
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  border-radius: 10px;
  text-decoration: none;
  transition: all 0.2s ease;
}

.btn-create-empty:hover {
  opacity: 0.9;
}

/* Responsive */
@media (max-width: 1200px) {
  .community-layout {
    grid-template-columns: 200px 1fr;
  }

  .community-sidebar--right {
    display: none;
  }
}

@media (max-width: 900px) {
  .community-layout {
    grid-template-columns: 1fr;
  }

  .community-sidebar {
    display: none;
  }

  .community-hero {
    flex-direction: column;
    padding: 32px 5vw;
  }

  .hero-stats {
    gap: 24px;
  }

  .feed-toolbar {
    flex-direction: column;
    align-items: stretch;
  }

  .search-box {
    max-width: none;
  }

  .sort-tabs {
    justify-content: center;
  }
}
</style>

