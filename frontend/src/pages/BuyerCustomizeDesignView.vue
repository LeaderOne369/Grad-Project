<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { getCustomizeState, updateCustomizeState } from '@/services/buyerCustomize'

const router = useRouter()
const state = getCustomizeState()

const carriers = ['围巾', '帽子', '徽章', '挂件', '手机壳', '亚克力立牌']
const styles = ['霓虹赛博', '日式清新', '轻奢金属', '复古海报', '梦幻少女']

const selectedCarrier = ref(state.carrier || '围巾')
const selectedStyles = ref<string[]>(state.styleTags || [])
const material = ref(state.material || '柔软织物')
const finish = ref(state.finish || '细腻光泽')

const totalPrice = computed(() => {
  const base = 129
  const carrierExtra = selectedCarrier.value === '手机壳' ? 29 : 0
  const finishExtra = finish.value === '磨砂纹理' ? 12 : 0
  return base + carrierExtra + finishExtra
})

const toggleStyle = (style: string) => {
  if (selectedStyles.value.includes(style)) {
    selectedStyles.value = selectedStyles.value.filter((item) => item !== style)
  } else {
    selectedStyles.value.push(style)
  }
}

const goNext = () => {
  updateCustomizeState({
    carrier: selectedCarrier.value,
    styleTags: selectedStyles.value,
    material: material.value,
    finish: finish.value,
    price: totalPrice.value,
  })
  router.push('/buyer/customize/preview')
}
</script>

<template>
  <div class="buyer-flow buyer-flow--design">
    <header class="flow-hero">
      <div>
        <p class="hero-tag">设计定制 · Step 2</p>
        <h1>选择载体与风格，生成专属套装</h1>
        <p class="hero-subtitle">Gemini 会根据你的 IP 与参考素材生成可迁移版本。</p>
      </div>
      <div class="flow-steps">
        <div class="step-item done">1 选择素材</div>
        <div class="step-item active">2 设计定制</div>
        <div class="step-item">3 预览确认</div>
        <div class="step-item">4 完成订单</div>
      </div>
    </header>

    <section class="design-grid">
      <div class="flow-panel">
        <h2>选择载体</h2>
        <div class="chip-row">
          <button
            v-for="carrier in carriers"
            :key="carrier"
            class="chip chip--outline"
            :class="{ 'chip--active': selectedCarrier === carrier }"
            @click="selectedCarrier = carrier"
            type="button">
            {{ carrier }}
          </button>
        </div>

        <h2 class="section-gap">风格偏好</h2>
        <div class="chip-row">
          <button
            v-for="style in styles"
            :key="style"
            class="chip"
            :class="{ 'chip--active': selectedStyles.includes(style) }"
            @click="toggleStyle(style)"
            type="button">
            {{ style }}
          </button>
        </div>

        <div class="select-pair">
          <label>
            材质
            <select v-model="material">
              <option>柔软织物</option>
              <option>亚克力高透</option>
              <option>软胶防刮</option>
              <option>金属烫印</option>
            </select>
          </label>
          <label>
            表面处理
            <select v-model="finish">
              <option>细腻光泽</option>
              <option>磨砂纹理</option>
              <option>珠光覆膜</option>
            </select>
          </label>
        </div>
      </div>

      <div class="flow-panel preview-panel">
        <h2>AI 生成预览</h2>
        <div class="preview-frame">
          <div class="preview-badge">{{ state.ip || 'IP' }}</div>
          <div class="preview-art">
            <span>AI Pattern</span>
            <p>{{ selectedCarrier }}</p>
          </div>
        </div>
        <div class="summary-card">
          <div>
            <span>推荐组合</span>
            <strong>{{ selectedCarrier }} × {{ material }}</strong>
            <p>{{ selectedStyles.length ? selectedStyles.join(' / ') : '未选择风格' }}</p>
          </div>
          <div class="price-tag">¥{{ totalPrice }}</div>
        </div>
        <button class="primary-btn" @click="goNext">继续预览</button>
      </div>
    </section>
  </div>
</template>
