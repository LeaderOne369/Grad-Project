import { watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'

export function usePageTitle() {
  const { t } = useI18n()
  const route = useRoute()

  const getPageTitle = (path: string): string => {
    // 基础标题
    const baseTitle = t('app.title')

    // 根据路由路径确定页面标题
    if (path === '/login') {
      return `${t('auth.login.form.title')} - ${baseTitle}`
    }
    if (path === '/register') {
      return `${t('auth.register.form.title')} - ${baseTitle}`
    }
    if (path.startsWith('/home/creator')) {
      return `${t('nav.creator.home')} - ${baseTitle}`
    }
    if (path.startsWith('/ai-studio')) {
      return `${t('nav.creator.aiStudio')} - ${baseTitle}`
    }
    if (path.startsWith('/creator/ai-lab')) {
      return `${t('nav.creator.aiLab')} - ${baseTitle}`
    }
    if (path.startsWith('/creator/works')) {
      return `${t('nav.creator.works')} - ${baseTitle}`
    }
    if (path.startsWith('/creator/trends')) {
      return `${t('nav.creator.trends')} - ${baseTitle}`
    }
    if (path.startsWith('/home/manufacturer')) {
      return `${t('nav.manufacturer.home')} - ${baseTitle}`
    }
    if (path.startsWith('/manufacturer/orders')) {
      return `${t('nav.manufacturer.orders')} - ${baseTitle}`
    }
    if (path.startsWith('/manufacturer/templates')) {
      return `${t('nav.manufacturer.templates')} - ${baseTitle}`
    }
    if (path.startsWith('/home/buyer')) {
      return `${t('nav.buyer.home')} - ${baseTitle}`
    }
    if (path.startsWith('/buyer/orders')) {
      return `${t('nav.buyer.orders')} - ${baseTitle}`
    }
    if (path.startsWith('/buyer/customize')) {
      return `${t('nav.buyer.customize')} - ${baseTitle}`
    }
    if (path.startsWith('/community')) {
      if (path === '/community') {
        return `社区 - ${baseTitle}`
      }
      if (path === '/community/create') {
        return `发布帖子 - 社区 - ${baseTitle}`
      }
      if (path.startsWith('/community/post/')) {
        return `帖子详情 - 社区 - ${baseTitle}`
      }
    }
    if (path.startsWith('/admin')) {
      return `管理后台 - ${baseTitle}`
    }

    return baseTitle
  }

  // 监听路由变化，动态更新标题
  watch(
    () => route.path,
    (newPath) => {
      document.title = getPageTitle(newPath)
    },
    { immediate: true }
  )

  // 监听语言变化，重新设置标题
  watch(
    () => t('app.title'),
    () => {
      document.title = getPageTitle(route.path)
    }
  )
}
