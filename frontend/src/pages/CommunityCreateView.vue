<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, shallowRef } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import type { IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/editor'
import '@wangeditor/editor/dist/css/style.css'
import { createPost, categories } from '@/services/communityMock'

const { t } = useI18n()

const router = useRouter()
const route = useRoute()

// 表单数据
const title = ref('')
const summary = ref('')
const category = ref('design')
const tagsInput = ref('')
const tags = ref<string[]>([])

// 编辑器实例
const editorRef = shallowRef<IDomEditor>()
const editorHtml = ref('<p></p>')

// 当前角色
const currentRole = computed(() => {
  const path = route.path
  if (path.includes('/creator') || path.includes('/ai-studio')) return 'creator'
  if (path.includes('/manufacturer')) return 'manufacturer'
  if (path.includes('/buyer')) return 'buyer'
  return 'buyer'
})

// 暂时移除postingTips，使用硬编码数组

// 角色主题色
const roleTheme = computed(() => {
  const themes = {
    creator: { primary: '#7b4fe3', bg: 'rgba(246, 241, 255, 0.9)', light: 'rgba(123, 79, 227, 0.1)' },
    manufacturer: { primary: '#2c6a7b', bg: 'rgba(237, 245, 247, 0.95)', light: 'rgba(44, 106, 123, 0.1)' },
    buyer: { primary: '#d75c35', bg: 'rgba(255, 242, 233, 0.9)', light: 'rgba(215, 92, 53, 0.1)' },
  }
  return themes[currentRole.value] || themes.buyer
})

// 过滤掉"全部"分类
const availableCategories = computed(() => categories.filter((c) => c.id !== 'all'))

// 工具栏配置
const toolbarConfig: Partial<IToolbarConfig> = {
  excludeKeys: [
    'group-video',
    'fullScreen',
    'insertTable',
  ],
}

// 编辑器配置
const editorConfig: Partial<IEditorConfig> = {
  placeholder: '在这里输入帖子内容...',
  MENU_CONF: {},
}

// 编辑器创建
function handleCreated(editor: IDomEditor) {
  editorRef.value = editor
}

// 添加标签
function addTag() {
  const tag = tagsInput.value.trim()
  if (tag && !tags.value.includes(tag) && tags.value.length < 5) {
    tags.value.push(tag)
    tagsInput.value = ''
  }
}

// 删除标签
function removeTag(index: number) {
  tags.value.splice(index, 1)
}

// 标签输入框按键处理
function handleTagKeydown(e: KeyboardEvent) {
  if (e.key === 'Enter' || e.key === ',') {
    e.preventDefault()
    addTag()
  }
}

// 表单验证
const isValid = computed(() => {
  return (
    title.value.trim().length >= 5 &&
    summary.value.trim().length >= 10 &&
    editorHtml.value.replace(/<[^>]+>/g, '').trim().length > 0 &&
    category.value
  )
})

// 发布帖子
function handleSubmit() {
  if (!isValid.value) return

  const post = createPost({
    title: title.value.trim(),
    content: editorHtml.value,
    summary: summary.value.trim(),
    category: category.value,
    tags: tags.value,
  })

  // 跳转到帖子详情页
  router.push(`/community/post/${post.id}`)
}

// 取消
function handleCancel() {
  if (
    title.value ||
    summary.value ||
    editorHtml.value !== '<p></p>' ||
    tags.value.length > 0
  ) {
    if (confirm('确定要放弃编辑吗？')) {
      router.push('/community')
    }
  } else {
    router.push('/community')
  }
}

// 组件卸载时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor) {
    editor.destroy()
  }
})
</script>

<template>
  <div class="create-page" :style="{ '--theme-primary': roleTheme.primary, '--theme-bg': roleTheme.bg, '--theme-light': roleTheme.light }">
    <div class="create-container">
      <!-- Header -->
      <header class="create-header">
        <button class="back-btn" @click="handleCancel">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          {{ t('community.create.back') }}
        </button>
        <h1>{{ t('community.create.title') }}</h1>
        <div class="header-actions">
          <button class="btn-secondary" @click="handleCancel">{{ t('community.create.cancel') }}</button>
          <button class="btn-primary" :disabled="!isValid" @click="handleSubmit">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
            {{ t('community.create.publish') }}
          </button>
        </div>
      </header>

      <!-- Main Form -->
      <div class="create-body">
        <div class="form-main">
          <!-- Title -->
          <div class="form-group">
            <label class="form-label">
              <span class="label-text">{{ t('community.create.form.title.label') }}</span>
              <span class="label-hint">{{ title.length }}/100</span>
            </label>
            <input
              v-model="title"
              type="text"
              class="form-input form-input--title"
              :placeholder="t('community.create.form.title.placeholder')"
              maxlength="100"
            />
          </div>

          <!-- Summary -->
          <div class="form-group">
            <label class="form-label">
              <span class="label-text">{{ t('community.create.form.summary.label') }}</span>
              <span class="label-hint">{{ summary.length }}/200</span>
            </label>
            <textarea
              v-model="summary"
              class="form-textarea"
              :placeholder="t('community.create.form.summary.placeholder')"
              maxlength="200"
              rows="3"
            ></textarea>
          </div>

          <!-- Editor -->
          <div class="form-group form-group--editor">
            <label class="form-label">
              <span class="label-text">{{ t('community.create.form.content.label') }}</span>
            </label>
            <div class="editor-wrapper">
              <Toolbar
                class="editor-toolbar"
                :editor="editorRef"
                :defaultConfig="toolbarConfig"
                mode="default"
              />
              <Editor
                class="editor-content"
                v-model="editorHtml"
                :defaultConfig="editorConfig"
                mode="default"
                @onCreated="handleCreated"
              />
            </div>
          </div>
        </div>

        <aside class="form-sidebar">
          <!-- Category -->
          <div class="form-group">
            <label class="form-label">
              <span class="label-text">{{ t('community.create.form.category.label') }}</span>
            </label>
            <div class="category-grid">
              <button
                v-for="cat in availableCategories"
                :key="cat.id"
                :class="['category-btn', { active: category === cat.id }]"
                @click="category = cat.id"
              >
                <span class="category-icon">{{ cat.icon }}</span>
                <span class="category-name">{{ cat.name }}</span>
              </button>
            </div>
          </div>

          <!-- Tags -->
          <div class="form-group">
            <label class="form-label">
              <span class="label-text">{{ t('community.create.form.tags.label') }}</span>
              <span class="label-hint">{{ t('community.create.form.tags.hint') }}</span>
            </label>
            <div class="tags-input-wrapper">
              <div class="tags-list" v-if="tags.length > 0">
                <span v-for="(tag, index) in tags" :key="tag" class="tag-item">
                  #{{ tag }}
                  <button class="tag-remove" @click="removeTag(index)">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </span>
              </div>
              <div class="tags-input" v-if="tags.length < 5">
                <input
                  v-model="tagsInput"
                  type="text"
                  :placeholder="t('community.create.form.tags.placeholder')"
                  @keydown="handleTagKeydown"
                />
                <button class="tag-add-btn" @click="addTag" :disabled="!tagsInput.trim()">
                  {{ t('community.create.form.tags.add') }}
                </button>
              </div>
            </div>
          </div>

          <!-- Tips -->
          <div class="tips-card">
            <h4>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="16" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12.01" y2="8" />
              </svg>
              {{ t('community.create.tips.title') }}
            </h4>
            <ul>
              <li v-for="tip in ['标题要简洁明了，突出主题', '摘要用于列表展示，概括核心内容', '添加合适的标签增加曝光', '图文并茂更容易获得互动']" :key="tip">{{ tip }}</li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  </div>
</template>

<style scoped>
.create-page {
  min-height: 100vh;
  padding: 0 0 60px;
  background: radial-gradient(circle at top left, #fdf7ef 0%, #f7f2ea 35%, #ece2d7 100%);
}

.create-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

/* Header */
.create-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  margin-bottom: 32px;
}

.back-btn {
  display: flex;
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

.create-header h1 {
  margin: 0;
  font-size: 24px;
  font-weight: 700;
  color: var(--ink);
}

.header-actions {
  display: flex;
  gap: 12px;
}

.btn-secondary {
  padding: 12px 24px;
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  color: var(--ink-soft);
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-secondary:hover {
  background: #fff;
  color: var(--ink);
}

.btn-primary {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background: var(--theme-primary);
  border: none;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  color: #fff;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-primary:hover:not(:disabled) {
  opacity: 0.9;
  transform: translateY(-1px);
}

.btn-primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Body Layout */
.create-body {
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 32px;
}

/* Form Groups */
.form-group {
  margin-bottom: 24px;
}

.form-group--editor {
  margin-bottom: 0;
}

.form-label {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.label-text {
  font-size: 14px;
  font-weight: 600;
  color: var(--ink);
}

.label-hint {
  font-size: 12px;
  color: #999;
}

.form-input {
  width: 100%;
  padding: 14px 16px;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  font-size: 14px;
  color: var(--ink);
  transition: all 0.2s ease;
}

.form-input:focus {
  outline: none;
  border-color: var(--theme-primary);
  box-shadow: 0 0 0 3px var(--theme-light);
}

.form-input--title {
  font-size: 18px;
  font-weight: 600;
}

.form-textarea {
  width: 100%;
  padding: 14px 16px;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  font-size: 14px;
  color: var(--ink);
  resize: vertical;
  min-height: 80px;
  font-family: inherit;
  transition: all 0.2s ease;
}

.form-textarea:focus {
  outline: none;
  border-color: var(--theme-primary);
  box-shadow: 0 0 0 3px var(--theme-light);
}

/* Editor */
.editor-wrapper {
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  overflow: hidden;
}

.editor-toolbar {
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
}

.editor-content {
  min-height: 400px;
  font-size: 15px;
  line-height: 1.8;
}

:deep(.w-e-text-container) {
  min-height: 400px;
}

:deep(.w-e-text-placeholder) {
  font-style: normal;
  color: #999;
}

/* Sidebar */
.form-sidebar {
  position: sticky;
  top: 100px;
  height: fit-content;
}

/* Category Grid */
.category-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
}

.category-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px;
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 10px;
  font-size: 13px;
  font-weight: 500;
  color: var(--ink-soft);
  cursor: pointer;
  transition: all 0.2s ease;
}

.category-btn:hover {
  background: var(--theme-light);
  border-color: var(--theme-primary);
  color: var(--theme-primary);
}

.category-btn.active {
  background: var(--theme-primary);
  border-color: var(--theme-primary);
  color: #fff;
}

.category-icon {
  font-size: 16px;
}

/* Tags */
.tags-input-wrapper {
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  padding: 12px;
}

.tags-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 12px;
}

.tag-item {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
  background: var(--theme-light);
  color: var(--theme-primary);
  font-size: 13px;
  font-weight: 500;
  border-radius: 6px;
}

.tag-remove {
  padding: 2px;
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.2s;
}

.tag-remove:hover {
  opacity: 1;
}

.tags-input {
  display: flex;
  gap: 8px;
}

.tags-input input {
  flex: 1;
  padding: 10px 12px;
  background: rgba(0, 0, 0, 0.03);
  border: none;
  border-radius: 8px;
  font-size: 13px;
  color: var(--ink);
}

.tags-input input:focus {
  outline: none;
  background: rgba(0, 0, 0, 0.05);
}

.tag-add-btn {
  padding: 10px 16px;
  background: var(--theme-primary);
  border: none;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  color: #fff;
  cursor: pointer;
  transition: all 0.2s ease;
}

.tag-add-btn:hover:not(:disabled) {
  opacity: 0.9;
}

.tag-add-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Tips Card */
.tips-card {
  padding: 20px;
  background: var(--theme-light);
  border-radius: 12px;
  margin-top: 24px;
}

.tips-card h4 {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0 0 12px;
  font-size: 14px;
  font-weight: 600;
  color: var(--theme-primary);
}

.tips-card ul {
  margin: 0;
  padding: 0 0 0 20px;
}

.tips-card li {
  font-size: 13px;
  color: var(--ink-soft);
  line-height: 1.8;
}

/* Responsive */
@media (max-width: 900px) {
  .create-body {
    grid-template-columns: 1fr;
  }

  .form-sidebar {
    position: static;
  }

  .create-header {
    flex-wrap: wrap;
    gap: 16px;
  }

  .create-header h1 {
    order: -1;
    width: 100%;
    text-align: center;
  }
}
</style>

