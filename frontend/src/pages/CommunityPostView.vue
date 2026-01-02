<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import {
  getPostById,
  getCommentsByPostId,
  addComment,
  togglePostLike,
  togglePostCollect,
  toggleCommentLike,
  getHotPosts,
  getRoleDisplay,
  categories,
  type Post,
  type Comment,
  type Author,
} from '@/services/communityMock'

const { t } = useI18n()

const route = useRoute()
const router = useRouter()

// 数据
const post = ref<Post | null>(null)
const comments = ref<Comment[]>([])
const hotPosts = ref<Post[]>([])
const isLoading = ref(true)

// 评论相关
const newComment = ref('')
const replyingTo = ref<{ commentId: string; author: Author } | null>(null)

// 当前角色
const currentRole = computed(() => {
  const path = route.path
  if (path.includes('/creator') || path.includes('/ai-studio')) return 'creator'
  if (path.includes('/manufacturer')) return 'manufacturer'
  if (path.includes('/buyer')) return 'buyer'
  return 'buyer'
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
function loadData() {
  const postId = route.params.id as string
  post.value = getPostById(postId)
  if (post.value) {
    comments.value = getCommentsByPostId(postId)
  }
  hotPosts.value = getHotPosts()
  isLoading.value = false
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

// 点赞帖子
function handleLikePost() {
  if (!post.value) return
  togglePostLike(post.value.id)
  post.value.isLiked = !post.value.isLiked
  post.value.likeCount += post.value.isLiked ? 1 : -1
}

// 收藏帖子
function handleCollectPost() {
  if (!post.value) return
  togglePostCollect(post.value.id)
  post.value.isCollected = !post.value.isCollected
  post.value.collectCount += post.value.isCollected ? 1 : -1
}

// 点赞评论
function handleLikeComment(comment: Comment) {
  toggleCommentLike(comment.id)
  comment.isLiked = !comment.isLiked
  comment.likeCount += comment.isLiked ? 1 : -1
}

// 开始回复
function startReply(commentId: string, author: Author) {
  replyingTo.value = { commentId, author }
  // 滚动到输入框
  setTimeout(() => {
    const textarea = document.querySelector('.comment-input textarea') as HTMLTextAreaElement
    textarea?.focus()
  }, 100)
}

// 取消回复
function cancelReply() {
  replyingTo.value = null
}

// 提交评论
function submitComment() {
  if (!post.value || !newComment.value.trim()) return

  const comment = addComment({
    postId: post.value.id,
    content: newComment.value.trim(),
    parentId: replyingTo.value?.commentId,
    replyTo: replyingTo.value?.author,
  })

  // 如果是回复，添加到对应评论的 replies
  if (replyingTo.value) {
    const parentComment = comments.value.find((c) => c.id === replyingTo.value?.commentId)
    if (parentComment) {
      if (!parentComment.replies) parentComment.replies = []
      parentComment.replies.push(comment)
    }
  } else {
    comments.value.unshift(comment)
  }

  post.value.commentCount++
  newComment.value = ''
  replyingTo.value = null
}

// 返回
function goBack() {
  router.push('/community')
}

onMounted(() => {
  loadData()
})
</script>

<template>
  <div class="post-page" :style="{ '--theme-primary': roleTheme.primary, '--theme-bg': roleTheme.bg, '--theme-light': roleTheme.light }">
    <!-- Loading -->
    <div v-if="isLoading" class="loading-state">
      <div class="loading-spinner"></div>
      <p>加载中...</p>
    </div>

    <!-- Not Found -->
    <div v-else-if="!post" class="not-found">
      <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
      <h2>帖子不存在</h2>
      <p>该帖子可能已被删除或链接无效</p>
      <button class="btn-back" @click="goBack">返回社区</button>
    </div>

    <!-- Post Content -->
    <div v-else class="post-container">
      <!-- Header -->
      <header class="post-header">
        <button class="back-btn" @click="goBack">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          {{ t('community.post.back') }}
        </button>
      </header>

      <div class="post-layout">
        <!-- Main Content -->
        <main class="post-main">
          <!-- Post Article -->
          <article class="post-article">
            <div class="article-header">
              <span class="article-category">{{ getCategoryName(post.category) }}</span>
              <h1 class="article-title">{{ post.title }}</h1>
              <div class="article-meta">
                <div class="author-info">
                  <div class="author-avatar" :style="{ background: getRoleDisplay(post.author.role).color }">
                    {{ post.author.name[0] }}
                  </div>
                  <div class="author-detail">
                    <div class="author-name">
                      {{ post.author.name }}
                      <span class="author-badge" v-if="post.author.badge">{{ post.author.badge }}</span>
                    </div>
                    <div class="author-meta-line">
                      <span class="author-role" :style="{ color: getRoleDisplay(post.author.role).color }">
                        {{ getRoleDisplay(post.author.role).label }}
                      </span>
                      <span class="meta-divider">·</span>
                      <span class="post-time">{{ post.createdAt }}</span>
                      <span class="meta-divider">·</span>
                      <span class="view-count">{{ formatNumber(post.viewCount) }} 阅读</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="article-content" v-html="post.content"></div>

            <div class="article-tags" v-if="post.tags.length > 0">
              <span v-for="tag in post.tags" :key="tag" class="tag-item">#{{ tag }}</span>
            </div>

            <div class="article-actions">
              <button :class="['action-btn', { active: post.isLiked }]" @click="handleLikePost">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" :fill="post.isLiked ? 'currentColor' : 'none'" stroke="currentColor" stroke-width="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
                <span>{{ post.isLiked ? '已点赞' : '点赞' }}</span>
                <strong>{{ formatNumber(post.likeCount) }}</strong>
              </button>
              <button :class="['action-btn', { active: post.isCollected }]" @click="handleCollectPost">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" :fill="post.isCollected ? 'currentColor' : 'none'" stroke="currentColor" stroke-width="2">
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                </svg>
                <span>{{ post.isCollected ? '已收藏' : '收藏' }}</span>
                <strong>{{ formatNumber(post.collectCount) }}</strong>
              </button>
              <button class="action-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="18" cy="5" r="3" />
                  <circle cx="6" cy="12" r="3" />
                  <circle cx="18" cy="19" r="3" />
                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                  <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                </svg>
                <span>分享</span>
              </button>
            </div>
          </article>

          <!-- Comments Section -->
          <section class="comments-section">
            <div class="comments-header">
              <h2>{{ t('community.post.comments', { count: post?.commentCount || 0 }) }}</h2>
            </div>

            <!-- Comment Input -->
            <div class="comment-input">
              <div v-if="replyingTo" class="reply-hint">
                {{ t('community.post.replyTo') }} <strong>@{{ replyingTo.author.name }}</strong>
                <button class="cancel-reply" @click="cancelReply">{{ t('community.create.cancel') }}</button>
              </div>
              <textarea
                v-model="newComment"
                :placeholder="replyingTo ? t('community.post.replyToPlaceholder', { author: replyingTo.author.name }) : t('community.post.replyPlaceholder')"
                rows="3"
              ></textarea>
              <div class="input-actions">
                <span class="char-count">{{ newComment.length }}/500</span>
                <button class="submit-btn" :disabled="!newComment.trim()" @click="submitComment">
                  {{ t('community.post.submitComment') }}
                </button>
              </div>
            </div>

            <!-- Comments List -->
            <div class="comments-list">
              <div v-if="comments.length === 0" class="no-comments">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                <p>{{ t('community.post.noComments') }}</p>
              </div>

              <div v-for="comment in comments" :key="comment.id" class="comment-item">
                <div class="comment-avatar" :style="{ background: getRoleDisplay(comment.author.role).color }">
                  {{ comment.author.name[0] }}
                </div>
                <div class="comment-body">
                  <div class="comment-header">
                    <span class="comment-author">
                      {{ comment.author.name }}
                      <span class="comment-role" :style="{ background: getRoleDisplay(comment.author.role).color + '20', color: getRoleDisplay(comment.author.role).color }">
                        {{ getRoleDisplay(comment.author.role).label }}
                      </span>
                    </span>
                    <span class="comment-time">{{ comment.createdAt }}</span>
                  </div>
                  <p class="comment-content">{{ comment.content }}</p>
                  <div class="comment-actions">
                    <button :class="['like-btn', { active: comment.isLiked }]" @click="handleLikeComment(comment)">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" :fill="comment.isLiked ? 'currentColor' : 'none'" stroke="currentColor" stroke-width="2">
                        <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
                      </svg>
                      {{ comment.likeCount || '' }}
                    </button>
                    <button class="reply-btn" @click="startReply(comment.id, comment.author)">
                      回复
                    </button>
                  </div>

                  <!-- Replies -->
                  <div v-if="comment.replies && comment.replies.length > 0" class="replies-list">
                    <div v-for="reply in comment.replies" :key="reply.id" class="reply-item">
                      <div class="reply-avatar" :style="{ background: getRoleDisplay(reply.author.role).color }">
                        {{ reply.author.name[0] }}
                      </div>
                      <div class="reply-body">
                        <div class="reply-header">
                          <span class="reply-author">{{ reply.author.name }}</span>
                          <span class="reply-to" v-if="reply.replyTo">
                            回复 <strong>@{{ reply.replyTo.name }}</strong>
                          </span>
                          <span class="reply-time">{{ reply.createdAt }}</span>
                        </div>
                        <p class="reply-content">{{ reply.content }}</p>
                        <div class="reply-actions">
                          <button :class="['like-btn', { active: reply.isLiked }]" @click="handleLikeComment(reply)">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" :fill="reply.isLiked ? 'currentColor' : 'none'" stroke="currentColor" stroke-width="2">
                              <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
                            </svg>
                            {{ reply.likeCount || '' }}
                          </button>
                          <button class="reply-btn" @click="startReply(comment.id, reply.author)">
                            回复
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        <!-- Sidebar -->
        <aside class="post-sidebar">
          <!-- Author Card -->
          <div class="author-card">
            <div class="author-card-avatar" :style="{ background: getRoleDisplay(post.author.role).color }">
              {{ post.author.name[0] }}
            </div>
            <h3>{{ post.author.name }}</h3>
            <p class="author-card-role" :style="{ color: getRoleDisplay(post.author.role).color }">
              {{ getRoleDisplay(post.author.role).label }}
            </p>
            <span v-if="post.author.badge" class="author-card-badge">{{ post.author.badge }}</span>
            <button class="follow-btn">+ 关注</button>
          </div>

          <!-- Hot Posts -->
          <div class="sidebar-section">
            <h3>🔥 热门推荐</h3>
            <div class="hot-posts">
              <RouterLink
                v-for="(hotPost, index) in hotPosts.filter(p => p.id !== post?.id).slice(0, 5)"
                :key="hotPost.id"
                :to="`/community/post/${hotPost.id}`"
                class="hot-post-item"
              >
                <span class="hot-rank" :class="{ top: index < 3 }">{{ index + 1 }}</span>
                <div class="hot-post-info">
                  <h4>{{ hotPost.title }}</h4>
                  <span class="hot-post-stats">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                    {{ formatNumber(hotPost.likeCount) }}
                  </span>
                </div>
              </RouterLink>
            </div>
          </div>
        </aside>
      </div>
    </div>
  </div>
</template>

<style scoped>
.post-page {
  min-height: 100vh;
  padding: 0 0 60px;
  background: radial-gradient(circle at top left, #fdf7ef 0%, #f7f2ea 35%, #ece2d7 100%);
}

/* Loading & Not Found */
.loading-state,
.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  text-align: center;
  padding: 40px;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid var(--theme-light);
  border-top-color: var(--theme-primary);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.not-found svg {
  color: #ccc;
  margin-bottom: 20px;
}

.not-found h2 {
  margin: 0 0 8px;
  font-size: 24px;
  color: var(--ink);
}

.not-found p {
  margin: 0 0 24px;
  color: var(--ink-soft);
}

.btn-back {
  padding: 12px 24px;
  background: var(--theme-primary);
  color: #fff;
  border: none;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
}

/* Header */
.post-header {
  padding: 20px 7vw;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  background: var(--theme-bg);
}

.back-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 10px;
  font-size: 14px;
  font-weight: 500;
  color: var(--ink-soft);
  cursor: pointer;
  transition: all 0.2s ease;
}

.back-btn:hover {
  background: #fff;
  color: var(--ink);
}

/* Layout */
.post-container {
  max-width: 1400px;
  margin: 0 auto;
}

.post-layout {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 32px;
  padding: 32px 7vw;
}

/* Article */
.post-article {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 40px;
  border: 1px solid rgba(255, 255, 255, 0.6);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
}

.article-header {
  margin-bottom: 32px;
  padding-bottom: 24px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
}

.article-category {
  display: inline-block;
  padding: 6px 14px;
  background: var(--theme-light);
  color: var(--theme-primary);
  font-size: 12px;
  font-weight: 600;
  border-radius: 8px;
  margin-bottom: 16px;
}

.article-title {
  margin: 0 0 20px;
  font-size: 28px;
  font-weight: 700;
  color: var(--ink);
  line-height: 1.4;
}

.article-meta .author-info {
  display: flex;
  align-items: center;
  gap: 14px;
}

.author-avatar {
  width: 48px;
  height: 48px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 700;
  color: #fff;
}

.author-detail {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.author-name {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 15px;
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

.author-meta-line {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
}

.author-role {
  font-weight: 500;
}

.meta-divider {
  color: #ccc;
}

.post-time,
.view-count {
  color: var(--ink-soft);
}

/* Article Content */
.article-content {
  font-size: 16px;
  line-height: 1.9;
  color: var(--ink);
}

.article-content :deep(h2) {
  font-size: 22px;
  font-weight: 700;
  margin: 32px 0 16px;
  color: var(--ink);
}

.article-content :deep(h3) {
  font-size: 18px;
  font-weight: 600;
  margin: 24px 0 12px;
  color: var(--ink);
}

.article-content :deep(p) {
  margin: 0 0 16px;
}

.article-content :deep(ul),
.article-content :deep(ol) {
  margin: 0 0 16px;
  padding-left: 24px;
}

.article-content :deep(li) {
  margin-bottom: 8px;
}

.article-content :deep(blockquote) {
  margin: 24px 0;
  padding: 16px 20px;
  background: var(--theme-light);
  border-left: 4px solid var(--theme-primary);
  border-radius: 0 8px 8px 0;
}

/* Tags */
.article-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 32px;
  padding-top: 24px;
  border-top: 1px solid rgba(0, 0, 0, 0.06);
}

.tag-item {
  padding: 8px 14px;
  background: var(--theme-light);
  color: var(--theme-primary);
  font-size: 13px;
  font-weight: 500;
  border-radius: 8px;
}

/* Actions */
.article-actions {
  display: flex;
  gap: 16px;
  margin-top: 32px;
  padding-top: 24px;
  border-top: 1px solid rgba(0, 0, 0, 0.06);
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  background: rgba(0, 0, 0, 0.03);
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 12px;
  font-size: 14px;
  font-weight: 500;
  color: var(--ink-soft);
  cursor: pointer;
  transition: all 0.2s ease;
}

.action-btn:hover {
  background: var(--theme-light);
  border-color: var(--theme-primary);
  color: var(--theme-primary);
}

.action-btn.active {
  background: var(--theme-primary);
  border-color: var(--theme-primary);
  color: #fff;
}

.action-btn strong {
  font-weight: 600;
}

/* Comments Section */
.comments-section {
  margin-top: 32px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 32px;
  border: 1px solid rgba(255, 255, 255, 0.6);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
}

.comments-header h2 {
  margin: 0 0 24px;
  font-size: 18px;
  font-weight: 700;
  color: var(--ink);
}

/* Comment Input */
.comment-input {
  margin-bottom: 32px;
}

.reply-hint {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
  padding: 8px 12px;
  background: var(--theme-light);
  border-radius: 8px;
  font-size: 13px;
  color: var(--ink-soft);
}

.reply-hint strong {
  color: var(--theme-primary);
}

.cancel-reply {
  margin-left: auto;
  padding: 4px 10px;
  background: none;
  border: none;
  color: var(--theme-primary);
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
}

.comment-input textarea {
  width: 100%;
  padding: 16px;
  background: rgba(0, 0, 0, 0.02);
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 12px;
  font-size: 14px;
  font-family: inherit;
  resize: vertical;
  min-height: 100px;
  transition: all 0.2s ease;
}

.comment-input textarea:focus {
  outline: none;
  border-color: var(--theme-primary);
  background: #fff;
}

.input-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
}

.char-count {
  font-size: 12px;
  color: #999;
}

.submit-btn {
  padding: 10px 20px;
  background: var(--theme-primary);
  color: #fff;
  border: none;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.submit-btn:hover:not(:disabled) {
  opacity: 0.9;
}

.submit-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Comments List */
.no-comments {
  text-align: center;
  padding: 40px;
  color: var(--ink-soft);
}

.no-comments svg {
  color: #ddd;
  margin-bottom: 12px;
}

.comment-item {
  display: flex;
  gap: 14px;
  padding: 20px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
}

.comment-item:last-child {
  border-bottom: none;
}

.comment-avatar {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 700;
  color: #fff;
  flex-shrink: 0;
}

.comment-body {
  flex: 1;
  min-width: 0;
}

.comment-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
}

.comment-author {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 600;
  color: var(--ink);
}

.comment-role {
  padding: 2px 8px;
  font-size: 10px;
  font-weight: 500;
  border-radius: 4px;
}

.comment-time {
  font-size: 12px;
  color: #999;
}

.comment-content {
  margin: 0 0 10px;
  font-size: 14px;
  color: var(--ink);
  line-height: 1.6;
}

.comment-actions {
  display: flex;
  gap: 16px;
}

.like-btn,
.reply-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  background: none;
  border: none;
  font-size: 12px;
  color: var(--ink-soft);
  cursor: pointer;
  transition: all 0.2s ease;
}

.like-btn:hover,
.reply-btn:hover {
  color: var(--theme-primary);
}

.like-btn.active {
  color: var(--theme-primary);
}

/* Replies */
.replies-list {
  margin-top: 16px;
  padding-left: 16px;
  border-left: 2px solid rgba(0, 0, 0, 0.06);
}

.reply-item {
  display: flex;
  gap: 10px;
  padding: 12px 0;
}

.reply-avatar {
  width: 28px;
  height: 28px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 700;
  color: #fff;
  flex-shrink: 0;
}

.reply-body {
  flex: 1;
}

.reply-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
  font-size: 13px;
}

.reply-author {
  font-weight: 600;
  color: var(--ink);
}

.reply-to {
  color: var(--ink-soft);
}

.reply-to strong {
  color: var(--theme-primary);
}

.reply-time {
  color: #999;
  font-size: 11px;
}

.reply-content {
  margin: 0 0 6px;
  font-size: 13px;
  color: var(--ink);
  line-height: 1.5;
}

.reply-actions {
  display: flex;
  gap: 12px;
}

/* Sidebar */
.post-sidebar {
  position: sticky;
  top: 100px;
  height: fit-content;
}

/* Author Card */
.author-card {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 16px;
  padding: 24px;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.6);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
  margin-bottom: 20px;
}

.author-card-avatar {
  width: 64px;
  height: 64px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: 700;
  color: #fff;
  margin: 0 auto 12px;
}

.author-card h3 {
  margin: 0 0 4px;
  font-size: 16px;
  font-weight: 700;
  color: var(--ink);
}

.author-card-role {
  margin: 0 0 8px;
  font-size: 13px;
  font-weight: 500;
}

.author-card-badge {
  display: inline-block;
  padding: 4px 10px;
  background: linear-gradient(135deg, #ffd700, #ffaa00);
  color: #5a4000;
  font-size: 11px;
  font-weight: 600;
  border-radius: 6px;
  margin-bottom: 16px;
}

.follow-btn {
  width: 100%;
  padding: 12px;
  background: var(--theme-primary);
  color: #fff;
  border: none;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.follow-btn:hover {
  opacity: 0.9;
}

/* Sidebar Section */
.sidebar-section {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 16px;
  padding: 20px;
  border: 1px solid rgba(255, 255, 255, 0.6);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
}

.sidebar-section h3 {
  margin: 0 0 16px;
  font-size: 14px;
  font-weight: 700;
  color: var(--ink);
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

/* Responsive */
@media (max-width: 1000px) {
  .post-layout {
    grid-template-columns: 1fr;
  }

  .post-sidebar {
    display: none;
  }
}

@media (max-width: 600px) {
  .post-article {
    padding: 24px;
  }

  .article-title {
    font-size: 22px;
  }

  .article-actions {
    flex-wrap: wrap;
  }
}
</style>

