import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/pages/LoginView.vue'
import RegisterView from '@/pages/RegisterView.vue'
import CreatorHomeView from '@/pages/CreatorHomeView.vue'
import CreatorAiLabView from '@/pages/CreatorAiLabView.vue'
import CreatorWorksView from '@/pages/CreatorWorksView.vue'
import CreatorTrendsView from '@/pages/CreatorTrendsView.vue'
import ManufacturerHomeView from '@/pages/ManufacturerHomeView.vue'
import ManufacturerOrdersView from '@/pages/ManufacturerOrdersView.vue'
import ManufacturerTemplatesView from '@/pages/ManufacturerTemplatesView.vue'
import BuyerHomeView from '@/pages/BuyerHomeView.vue'
import CreatorAiStudioView from '@/pages/CreatorAiStudioView.vue'
import BuyerOrdersView from '@/pages/BuyerOrdersView.vue'
import BuyerCustomizeUploadView from '@/pages/BuyerCustomizeUploadView.vue'
import BuyerCustomizeDesignView from '@/pages/BuyerCustomizeDesignView.vue'
import BuyerCustomizePreviewView from '@/pages/BuyerCustomizePreviewView.vue'
import BuyerCustomizeThankYouView from '@/pages/BuyerCustomizeThankYouView.vue'
import NotFoundView from '@/pages/NotFoundView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', name: 'login', component: LoginView },
    { path: '/register', name: 'register', component: RegisterView },
    { path: '/home/creator', name: 'home-creator', component: CreatorHomeView },
    { path: '/ai-studio', name: 'ai-studio', component: CreatorAiStudioView },
    { path: '/creator/ai-lab', name: 'creator-ai-lab', component: CreatorAiLabView },
    { path: '/creator/works', name: 'creator-works', component: CreatorWorksView },
    { path: '/creator/trends', name: 'creator-trends', component: CreatorTrendsView },
    {
      path: '/home/manufacturer',
      name: 'home-manufacturer',
      component: ManufacturerHomeView,
    },
    {
      path: '/manufacturer/orders',
      name: 'manufacturer-orders',
      component: ManufacturerOrdersView,
    },
    {
      path: '/manufacturer/templates',
      name: 'manufacturer-templates',
      component: ManufacturerTemplatesView,
    },
    { path: '/home/buyer', name: 'home-buyer', component: BuyerHomeView },
    { path: '/buyer/orders', name: 'buyer-orders', component: BuyerOrdersView },
    {
      path: '/buyer/customize/upload',
      name: 'buyer-customize-upload',
      component: BuyerCustomizeUploadView,
    },
    {
      path: '/buyer/customize/design',
      name: 'buyer-customize-design',
      component: BuyerCustomizeDesignView,
    },
    {
      path: '/buyer/customize/preview',
      name: 'buyer-customize-preview',
      component: BuyerCustomizePreviewView,
    },
    {
      path: '/buyer/customize/thank-you',
      name: 'buyer-customize-thank-you',
      component: BuyerCustomizeThankYouView,
    },
    { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFoundView },
  ],
})

export default router
