<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { updateCustomizeState } from '@/services/buyerCustomize'

const router = useRouter()

const ips = [
  {
    name: '星火骑士',
    desc: '机甲史诗 · 霓虹能量',
    tag: '热度上升',
  },
  {
    name: '霜月物语',
    desc: '冰川幻想 · 轻柔色调',
    tag: '适合围巾',
  },
  {
    name: '夜航便利店',
    desc: '都市霓虹 · 复古海报',
    tag: '徽章套装',
  },
]

const selectedIp = ref('')
const prompt = ref('')
const imageDataUrl = ref('')
const error = ref('')

const canProceed = computed(() => {
  return Boolean(selectedIp.value && (prompt.value.trim() || imageDataUrl.value))
})

const handleUpload = (event: Event) => {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) return
  if (!file.type.startsWith('image/')) {
    error.value = '请上传图片格式文件。'
    return
  }
  const reader = new FileReader()
  reader.onload = () => {
    if (typeof reader.result === 'string') {
      imageDataUrl.value = reader.result
      error.value = ''
    }
  }
  reader.readAsDataURL(file)
}

const goNext = () => {
  if (!canProceed.value) {
    error.value = '请先选择 IP，并填写灵感或上传图片。'
    return
  }
  updateCustomizeState({
    ip: selectedIp.value,
    prompt: prompt.value.trim(),
    imageDataUrl: imageDataUrl.value || undefined,
  })
  router.push('/buyer/customize/design')
}
</script>

<template>
  <div class="buyer-flow buyer-flow--upload">
    <header class="flow-hero">
      <div>
        <p class="hero-tag">购买者 · 开启定制之旅</p>
        <h1>先选择 IP，再把灵感交给 Gemini</h1>
        <p class="hero-subtitle">上传你的图案或描述风格，我们会生成跨载体的专属方案。</p>
      </div>
      <div class="flow-steps">
        <div class="step-item active">1 选择素材</div>
        <div class="step-item">2 设计定制</div>
        <div class="step-item">3 预览确认</div>
        <div class="step-item">4 完成订单</div>
      </div>
    </header>

    <section class="flow-grid">
      <div class="flow-panel">
        <h2>选择 IP 主题</h2>
        <div class="select-grid">
          <button
            v-for="item in ips"
            :key="item.name"
            class="select-card"
            :class="{ active: selectedIp === item.name }"
            @click="selectedIp = item.name">
            <span>{{ item.tag }}</span>
            <h3>{{ item.name }}</h3>
            <p>{{ item.desc }}</p>
          </button>
        </div>
      </div>

      <div class="flow-panel">
        <h2>上传图片或描述灵感</h2>
        <div class="input-stack">
          <label class="vertical-label">
            灵感描述
            <textarea v-model="prompt" placeholder="例如：希望是霓虹赛博风格，带有能量轨迹和机甲元素"></textarea>
          </label>
          <label>
            上传参考图
            <div class="upload-zone">
              <span>点击或拖拽上传 PNG/JPG</span>
              <input type="file" accept="image/*" @change="handleUpload" />
            </div>
          </label>
          <div v-if="imageDataUrl" class="preview-card">
            <img :src="imageDataUrl" alt="preview" />
            <div>
              <strong>已加载参考图</strong>
              <p>将根据该图生成跨载体方案。</p>
            </div>
          </div>
          <p v-if="error" class="alert error">{{ error }}</p>
        </div>
      </div>
    </section>

    <section class="flow-actions">
      <button class="primary-btn" :disabled="!canProceed" @click="goNext">进入设计定制</button>
      <p class="helper-text">下一步可选择载体、材质与 AI 迁移方案。</p>
    </section>
  </div>
</template>
