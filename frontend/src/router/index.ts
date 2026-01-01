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
import AdminLayout from '@/components/AdminLayout.vue'
import AdminDashboardView from '@/pages/AdminDashboardView.vue'
import AdminUsersView from '@/pages/AdminUsersView.vue'
import AdminOrdersView from '@/pages/AdminOrdersView.vue'
import AdminReviewView from '@/pages/AdminReviewView.vue'
import AdminAnalyticsView from '@/pages/AdminAnalyticsView.vue'
import AdminSettingsView from '@/pages/AdminSettingsView.vue'

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
    {
      path: '/admin',
      component: AdminLayout,
      children: [
        { path: '', name: 'admin-dashboard', component: AdminDashboardView },
        { path: 'users', name: 'admin-users', component: AdminUsersView },
        { path: 'orders', name: 'admin-orders', component: AdminOrdersView },
        { path: 'review', name: 'admin-review', component: AdminReviewView },
        { path: 'analytics', name: 'admin-analytics', component: AdminAnalyticsView },
        { path: 'settings', name: 'admin-settings', component: AdminSettingsView },
      ],
    },
    { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFoundView },
  ],
})

export default router
