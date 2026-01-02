<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { usePageTitle } from '@/composables/usePageTitle'
import RoleNav from '@/components/RoleNav.vue'

const { t } = useI18n()

// 使用页面标题组合式函数
usePageTitle()
</script>

<template>
  <div class="app-shell">
    <RoleNav />
    <RouterView />
    <footer class="site-footer">
      <div class="site-footer__inner">
        <p>{{ t('footer.copyright') }}</p>
        <p>{{ t('footer.university') }}</p>
      </div>
    </footer>
  </div>
</template>
