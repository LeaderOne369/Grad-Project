<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="notfound-page">
    <div class="notfound-hero">
      <div class="notfound-card">
        <p class="notfound-label">404 / Page Missing</p>
        <h1>你闯入了未标记的次元裂缝</h1>
        <p class="notfound-subtitle">
          这里没有 IP、没有载体、没有订单。我们已记录这段坐标，请返回主航道。
        </p>
        <div class="notfound-actions">
          <RouterLink class="primary-btn" to="/home/buyer">返回推荐首页</RouterLink>
          <RouterLink class="secondary-btn" to="/login">返回登录</RouterLink>
        </div>
      </div>
      <div class="notfound-art">
        <div class="orbit">
          <div class="planet"></div>
          <div class="satellite"></div>
        </div>
        <div class="signal">
          <span>GOZU</span>
          <strong>404</strong>
          <p>Signal lost</p>
        </div>
      </div>
    </div>
  </div>
</template>
