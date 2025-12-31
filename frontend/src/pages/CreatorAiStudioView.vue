<script setup lang="ts">
import { computed, ref } from 'vue'

type Draft = {
  id: string
  title: string
  theme: string
  ipWorld: string
  prompt: string
  tags: string[]
  carriers: string[]
  previewUrl?: string
  updatedAt: string
}

type AiResult = {
  id: string
  title: string
  status: '生成中' | '已生成' | '待迁移'
  createdAt: string
  carriers: string[]
}

type AiTask = {
  id: string
  title: string
  status: 'running' | 'success'
  progress: number
}

const moodTags = ['霓虹赛博', '日式清新', '暗黑蒸汽', '怀旧像素', '梦幻少女']
const carriers = ['围巾', '帽子', '亚克力立牌', '徽章', '挂件', '手机壳']

const workflowSteps = [
  {
    title: '输入主题 + IP',
    detail: '定义角色与世界观关键词，设定配色与构图。',
  },
  {
    title: 'Gemini 生成与迁移',
    detail: '一次生成多风格版本，并适配多个载体。',
  },
  {
    title: '审核与发布',
    detail: '确认版权与安全区，发布到推荐池。',
  },
]

const theme = ref('')
const ipWorld = ref('')
const prompt = ref('')
const selectedTags = ref<string[]>([])
const selectedCarriers = ref<string[]>([])
const previewUrl = ref<string | null>(null)
const statusMessage = ref('')

const RESULTS_KEY = 'creator_ai_results'
const DRAFTS_KEY = 'creator_ai_drafts'
const TASKS_KEY = 'creator_ai_tasks'

const loadList = <T,>(key: string): T[] => {
  if (typeof localStorage === 'undefined') return []
  const raw = localStorage.getItem(key)
  if (!raw) return []
  try {
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

const saveList = (key: string, list: unknown[]) => {
  if (typeof localStorage === 'undefined') return
  localStorage.setItem(key, JSON.stringify(list))
}

const results = ref<AiResult[]>(
  loadList<AiResult>(RESULTS_KEY).length
    ? loadList<AiResult>(RESULTS_KEY)
    : [
        {
          id: crypto.randomUUID(),
          title: '星火骑士 · 燃焰星云',
          status: '已生成',
          createdAt: '今天 09:40',
          carriers: ['围巾', '徽章'],
        },
      ]
)

const tasks = ref<AiTask[]>(loadList<AiTask>(TASKS_KEY))

const remainingQuota = computed(() => Math.max(0, 12 - results.value.length))

const toggleTag = (tag: string) => {
  if (selectedTags.value.includes(tag)) {
    selectedTags.value = selectedTags.value.filter((item) => item !== tag)
  } else {
    selectedTags.value.push(tag)
  }
}

const toggleCarrier = (carrier: string) => {
  if (selectedCarriers.value.includes(carrier)) {
    selectedCarriers.value = selectedCarriers.value.filter((item) => item !== carrier)
  } else {
    selectedCarriers.value.push(carrier)
  }
}

const handleUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file) return

  const reader = new FileReader()
  reader.onload = () => {
    if (typeof reader.result === 'string') {
      previewUrl.value = reader.result
    }
  }
  reader.readAsDataURL(file)
}

const saveDraft = () => {
  statusMessage.value = ''
  if (!theme.value || !ipWorld.value) {
    statusMessage.value = '请先填写主题关键词与 IP 世界观。'
    return
  }

  const draft: Draft = {
    id: crypto.randomUUID(),
    title: `${theme.value} · 草稿`,
    theme: theme.value,
    ipWorld: ipWorld.value,
    prompt: prompt.value,
    tags: selectedTags.value,
    carriers: selectedCarriers.value,
    previewUrl: previewUrl.value || undefined,
    updatedAt: new Date().toLocaleString(),
  }

  const stored = loadList<Draft>(DRAFTS_KEY)
  stored.unshift(draft)
  saveList(DRAFTS_KEY, stored.slice(0, 10))
  statusMessage.value = '草稿已保存，可在设计者主页继续。'
}

const triggerGemini = () => {
  statusMessage.value = ''
  if (!theme.value || !ipWorld.value || selectedCarriers.value.length === 0) {
    statusMessage.value = '请填写主题/IP，并至少选择一个载体。'
    return
  }

  const taskId = crypto.randomUUID()
  tasks.value.unshift({
    id: taskId,
    title: `Gemini 生成 · ${theme.value}`,
    status: 'running',
    progress: 12,
  })

  const result: AiResult = {
    id: crypto.randomUUID(),
    title: `${theme.value} · ${selectedTags.value[0] || '灵感版本'}`,
    status: '生成中',
    createdAt: new Date().toLocaleTimeString(),
    carriers: selectedCarriers.value,
  }
  results.value.unshift(result)
  saveList(RESULTS_KEY, results.value)
  saveList(TASKS_KEY, tasks.value)

  window.setTimeout(() => {
    tasks.value = tasks.value.map((task) =>
      task.id === taskId ? { ...task, status: 'success', progress: 100 } : task
    )
    results.value = results.value.map((item) =>
      item.id === result.id ? { ...item, status: '已生成' } : item
    )
    saveList(RESULTS_KEY, results.value)
    saveList(TASKS_KEY, tasks.value)
  }, 1200)
}
</script>

<template>
  <div class="studio-page">
    <header class="studio-hero">
      <div>
        <p class="hero-tag">AI 设计室 · Creator</p>
        <h1>把 IP 灵感变成可落地的系列谷子</h1>
        <p class="hero-subtitle">
          在前端阶段就完成 Gemini 的生成与迁移闭环，确保每个设计都有可编辑的安全区与载体适配。
        </p>
      </div>
      <div class="studio-hero-card">
        <span>今日生成配额</span>
        <strong>{{ remainingQuota }} / 12</strong>
        <p>剩余配额可用于文生图与图案迁移。</p>
        <button class="primary-btn" @click="triggerGemini">立即生成</button>
      </div>
    </header>

    <section class="studio-grid">
      <div class="studio-panel">
        <h2>输入创作指令</h2>
        <div class="studio-form">
          <label>
            主题关键词
            <input v-model="theme" type="text" placeholder="例如：星火骑士 · 能量风暴" />
          </label>
          <label>
            IP 与世界观
            <input v-model="ipWorld" type="text" placeholder="输入 IP 名称或世界观设定" />
          </label>
          <label>
            设计叙述
            <textarea v-model="prompt" rows="3" placeholder="描述关键角色、情绪、构图重点与工艺限制"></textarea>
          </label>
          <label>
            风格偏好
            <div class="chip-row">
              <button
                v-for="tag in moodTags"
                :key="tag"
                class="chip"
                :class="{ 'chip--active': selectedTags.includes(tag) }"
                @click="toggleTag(tag)"
                type="button">
                {{ tag }}
              </button>
            </div>
          </label>
          <label>
            载体适配
            <div class="chip-row">
              <button
                v-for="carrier in carriers"
                :key="carrier"
                class="chip chip--outline"
                :class="{ 'chip--active': selectedCarriers.includes(carrier) }"
                @click="toggleCarrier(carrier)"
                type="button">
                {{ carrier }}
              </button>
            </div>
          </label>
          <label>
            参考图上传
            <div class="upload-zone">
              <span>拖拽图案或点击上传，支持 PNG/JPG</span>
              <input class="upload-input" type="file" accept="image/*" @change="handleUpload" />
            </div>
          </label>
          <div v-if="previewUrl" class="preview-card">
            <img :src="previewUrl" alt="preview" />
            <div>
              <h4>参考图已载入</h4>
              <p>Gemini 将以此图案进行风格迁移与载体适配。</p>
            </div>
          </div>
          <p v-if="statusMessage" class="alert success">{{ statusMessage }}</p>
          <div class="studio-actions">
            <button class="primary-btn" type="button" @click="triggerGemini">
              启动 Gemini 生成
            </button>
            <button class="secondary-btn" type="button" @click="saveDraft">保存为草稿</button>
          </div>
        </div>
      </div>

      <div class="studio-panel studio-panel--dark">
        <h2>AI 工作流</h2>
        <div class="workflow-list">
          <div v-for="step in workflowSteps" :key="step.title" class="workflow-card">
            <strong>{{ step.title }}</strong>
            <p>{{ step.detail }}</p>
          </div>
        </div>
        <div class="metrics">
          <div>
            <span>实时任务</span>
            <strong>{{ tasks.length }}</strong>
          </div>
          <div>
            <span>迁移成功率</span>
            <strong>92%</strong>
          </div>
          <div>
            <span>推荐采用率</span>
            <strong>68%</strong>
          </div>
        </div>
        <div class="task-list" v-if="tasks.length">
          <div v-for="task in tasks" :key="task.id" class="task-card">
            <div>
              <strong>{{ task.title }}</strong>
              <span>{{ task.status === 'success' ? '完成' : '生成中' }}</span>
            </div>
            <div class="task-bar">
              <div class="task-bar-fill" :style="{ width: task.progress + '%' }"></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="studio-list">
      <div class="list-header">
        <h3>灵感池与历史记录</h3>
        <button class="inline-link">查看全部</button>
      </div>
      <div class="list-grid">
        <div v-for="item in results" :key="item.id" class="list-card">
          <span class="list-status">{{ item.status }}</span>
          <h4>{{ item.title }}</h4>
          <p>载体：{{ item.carriers.join(' / ') }}</p>
        </div>
      </div>
    </section>
  </div>
</template>
