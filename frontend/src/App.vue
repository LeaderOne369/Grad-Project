<script setup lang="ts">
import { RouterView } from 'vue-router'
import RoleNav from '@/components/RoleNav.vue'
</script>

<template>
  <div class="app-shell">
    <RoleNav />
    <RouterView />
    <footer class="site-footer">
      <div class="site-footer__inner">
        <p>Copyright © 2026 徐力行. All rights reserved.</p>
        <p>合肥工业大学软件学院毕业设计项目</p>
      </div>
    </footer>
  </div>
</template>
