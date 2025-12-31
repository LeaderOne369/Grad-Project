<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

const route = useRoute()

const role = computed(() => {
  const path = route.path
  if (path.startsWith('/home/creator') || path.startsWith('/creator') || path.startsWith('/ai-studio')) {
    return 'creator'
  }
  if (path.startsWith('/home/manufacturer') || path.startsWith('/manufacturer')) {
    return 'manufacturer'
  }
  if (path.startsWith('/home/buyer') || path.startsWith('/buyer')) {
    return 'buyer'
  }
  return 'guest'
})

const showNav = computed(() => !['/login', '/register'].includes(route.path))

const navItems = computed(() => {
  switch (role.value) {
    case 'creator':
      return [
        { label: '设计者主页', to: '/home/creator' },
        { label: 'AI 设计室', to: '/ai-studio' },
        { label: '灵感实验室', to: '/creator/ai-lab' },
        { label: '作品池', to: '/creator/works' },
        { label: '趋势榜', to: '/creator/trends' },
      ]
    case 'manufacturer':
      return [
        { label: '制造商主页', to: '/home/manufacturer' },
        { label: '订单看板', to: '/manufacturer/orders' },
        { label: '工艺模板', to: '/manufacturer/templates' },
      ]
    case 'buyer':
      return [
        { label: '推荐首页', to: '/home/buyer' },
        { label: '开启定制', to: '/buyer/customize/upload' },
        { label: '我的订单', to: '/buyer/orders' },
      ]
    default:
      return []
  }
})
</script>

<template>
  <nav v-if="showNav" :class="['role-nav', `role-nav--${role}`]">
    <div class="role-nav__inner">
      <RouterLink class="role-nav__brand" to="/">GOZU</RouterLink>
      <div class="role-nav__links">
        <RouterLink v-for="item in navItems" :key="item.to" :to="item.to" class="role-nav__link">
          {{ item.label }}
        </RouterLink>
      </div>
      <div class="role-nav__meta">
        <span v-if="role === 'creator'">设计者模式</span>
        <span v-else-if="role === 'manufacturer'">制造商模式</span>
        <span v-else-if="role === 'buyer'">购买者模式</span>
      </div>
    </div>
  </nav>
</template>
