<script setup lang="ts">
const templateGroups = [
  {
    name: '纺织/织造',
    items: [
      {
        title: '围巾 · 细腻斜纹织造',
        spec: '纱支 80D / 260g / 双面印花',
        capacity: '日均 420 件',
        status: '启用中',
      },
      {
        title: '帽子 · 复合棉刺绣',
        spec: '棉/涤 65/35 / 10色刺绣',
        capacity: '日均 260 件',
        status: '启用中',
      },
    ],
  },
  {
    name: '硬质/亚克力',
    items: [
      {
        title: '亚克力立牌 · UV 双面',
        spec: '6mm 透明 / UV 双面 / 折射膜',
        capacity: '日均 800 件',
        status: '待校准',
      },
      {
        title: '挂件 · 软胶注塑',
        spec: '软胶 55A / 4 色注塑',
        capacity: '日均 520 件',
        status: '启用中',
      },
    ],
  },
]

const qaChecklist = [
  '版面安全区与裁切线校验',
  '色彩偏差校准 ≤ 3%',
  '材质批次与耐久性抽检',
  '包装与防刮膜入库检查',
]

const updateQueue = [
  {
    title: '霓虹赛博联名版式',
    detail: '需要补充金属烫印层参数',
    eta: '预计今日 18:00 前完成',
  },
  {
    title: '霜月物语围巾工艺',
    detail: '新增 2 种织造纹理建议',
    eta: '预计明日 11:00 前完成',
  },
]
</script>

<template>
  <div class="template-page">
    <header class="template-hero">
      <div>
        <p class="hero-tag">制造商 · 工艺模板库</p>
        <h1>维护工艺模板与载体规范</h1>
        <p class="hero-subtitle">
          管理每一种载体的材料、工艺、产能与质检标准，保障 IP 标准化生产。
        </p>
      </div>
      <div class="template-actions">
        <button class="primary-btn">新建工艺模板</button>
        <button class="secondary-btn">导入规范</button>
      </div>
    </header>

    <section class="template-grid">
      <div class="template-panel">
        <h2>模板分组</h2>
        <div class="group-list">
          <div v-for="group in templateGroups" :key="group.name" class="group-card">
            <h3>{{ group.name }}</h3>
            <div class="group-items">
              <div v-for="item in group.items" :key="item.title" class="template-card">
                <div>
                  <h4>{{ item.title }}</h4>
                  <p>{{ item.spec }}</p>
                </div>
                <div class="template-meta">
                  <span>{{ item.capacity }}</span>
                  <span class="status-chip">{{ item.status }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="template-panel template-panel--dark">
        <h2>质检与规范</h2>
        <div class="qa-list">
          <div v-for="item in qaChecklist" :key="item" class="qa-item">
            <span>✓</span>
            <p>{{ item }}</p>
          </div>
        </div>
        <div class="template-metric">
          <div>
            <span>模板合规率</span>
            <strong>96.4%</strong>
          </div>
          <div>
            <span>待更新模板</span>
            <strong>4</strong>
          </div>
        </div>
      </div>
    </section>

    <section class="template-queue">
      <div class="queue-header">
        <h3>待更新清单</h3>
        <button class="inline-link">查看全部</button>
      </div>
      <div class="queue-grid">
        <div v-for="item in updateQueue" :key="item.title" class="queue-card">
          <h4>{{ item.title }}</h4>
          <p>{{ item.detail }}</p>
          <span>{{ item.eta }}</span>
        </div>
      </div>
    </section>
  </div>
</template>
