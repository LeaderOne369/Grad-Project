// Admin Dashboard Mock Data Service

export interface DashboardStats {
  totalUsers: number
  totalOrders: number
  totalRevenue: number
  aiCalls: number
  pendingReviews: number
  activeDesigns: number
}

export interface UserData {
  id: string
  username: string
  displayName: string
  role: 'buyer' | 'creator' | 'manufacturer'
  email: string
  status: 'active' | 'banned' | 'pending'
  createdAt: string
  lastLogin: string
  ordersCount: number
  totalSpent: number
}

export interface OrderData {
  id: string
  userId: string
  userName: string
  productName: string
  carrierType: string
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  amount: number
  createdAt: string
  updatedAt: string
}

export interface ReviewItem {
  id: string
  type: 'design' | 'ai_generated' | 'comment'
  title: string
  creator: string
  content: string
  imageUrl?: string
  status: 'pending' | 'approved' | 'rejected'
  riskLevel: 'low' | 'medium' | 'high'
  submittedAt: string
}

export interface UserDistribution {
  province: string
  city: string
  count: number
  lng: number
  lat: number
}

export interface TrendData {
  date: string
  users: number
  orders: number
  revenue: number
  aiCalls: number
}

export interface CategoryData {
  name: string
  value: number
}

// Mock data generators
export function getDashboardStats(): DashboardStats {
  return {
    totalUsers: 12847,
    totalOrders: 5623,
    totalRevenue: 892450,
    aiCalls: 34521,
    pendingReviews: 23,
    activeDesigns: 1847,
  }
}

export function getUsers(): UserData[] {
  return [
    {
      id: '1',
      username: 'sakura_design',
      displayName: '樱花设计师',
      role: 'creator',
      email: 'sakura@example.com',
      status: 'active',
      createdAt: '2024-01-15',
      lastLogin: '2024-12-28',
      ordersCount: 156,
      totalSpent: 0,
    },
    {
      id: '2',
      username: 'otaku_buyer',
      displayName: '动漫收藏家',
      role: 'buyer',
      email: 'otaku@example.com',
      status: 'active',
      createdAt: '2024-02-20',
      lastLogin: '2024-12-27',
      ordersCount: 42,
      totalSpent: 8960,
    },
    {
      id: '3',
      username: 'craft_master',
      displayName: '匠心制造',
      role: 'manufacturer',
      email: 'craft@example.com',
      status: 'active',
      createdAt: '2024-01-08',
      lastLogin: '2024-12-28',
      ordersCount: 0,
      totalSpent: 0,
    },
    {
      id: '4',
      username: 'anime_lover',
      displayName: '二次元少女',
      role: 'buyer',
      email: 'anime@example.com',
      status: 'pending',
      createdAt: '2024-12-25',
      lastLogin: '2024-12-25',
      ordersCount: 0,
      totalSpent: 0,
    },
    {
      id: '5',
      username: 'pixel_artist',
      displayName: '像素艺术家',
      role: 'creator',
      email: 'pixel@example.com',
      status: 'banned',
      createdAt: '2024-03-10',
      lastLogin: '2024-11-15',
      ordersCount: 23,
      totalSpent: 0,
    },
    {
      id: '6',
      username: 'mecha_fan',
      displayName: '机甲迷',
      role: 'buyer',
      email: 'mecha@example.com',
      status: 'active',
      createdAt: '2024-04-05',
      lastLogin: '2024-12-26',
      ordersCount: 18,
      totalSpent: 4230,
    },
    {
      id: '7',
      username: 'cosplay_queen',
      displayName: 'Cosplay女王',
      role: 'creator',
      email: 'cosplay@example.com',
      status: 'active',
      createdAt: '2024-05-12',
      lastLogin: '2024-12-28',
      ordersCount: 89,
      totalSpent: 0,
    },
    {
      id: '8',
      username: 'figure_collector',
      displayName: '手办收藏家',
      role: 'buyer',
      email: 'figure@example.com',
      status: 'active',
      createdAt: '2024-06-18',
      lastLogin: '2024-12-27',
      ordersCount: 67,
      totalSpent: 15680,
    },
  ]
}

export function getOrders(): OrderData[] {
  return [
    {
      id: 'ORD-2024-001',
      userId: '2',
      userName: '动漫收藏家',
      productName: '星火骑士 · 霓虹围巾',
      carrierType: '围巾',
      status: 'delivered',
      amount: 299,
      createdAt: '2024-12-20',
      updatedAt: '2024-12-25',
    },
    {
      id: 'ORD-2024-002',
      userId: '6',
      userName: '机甲迷',
      productName: '高达系列 · 亚克力立牌',
      carrierType: '立牌',
      status: 'shipped',
      amount: 89,
      createdAt: '2024-12-22',
      updatedAt: '2024-12-26',
    },
    {
      id: 'ORD-2024-003',
      userId: '8',
      userName: '手办收藏家',
      productName: '初音未来 · 限定徽章套装',
      carrierType: '徽章',
      status: 'processing',
      amount: 168,
      createdAt: '2024-12-25',
      updatedAt: '2024-12-26',
    },
    {
      id: 'ORD-2024-004',
      userId: '2',
      userName: '动漫收藏家',
      productName: '鬼灭之刃 · 定制手机壳',
      carrierType: '手机壳',
      status: 'pending',
      amount: 129,
      createdAt: '2024-12-27',
      updatedAt: '2024-12-27',
    },
    {
      id: 'ORD-2024-005',
      userId: '6',
      userName: '机甲迷',
      productName: 'EVA · 赛博风帽子',
      carrierType: '帽子',
      status: 'pending',
      amount: 199,
      createdAt: '2024-12-28',
      updatedAt: '2024-12-28',
    },
    {
      id: 'ORD-2024-006',
      userId: '8',
      userName: '手办收藏家',
      productName: '原神 · 角色挂件',
      carrierType: '挂件',
      status: 'cancelled',
      amount: 59,
      createdAt: '2024-12-15',
      updatedAt: '2024-12-16',
    },
  ]
}

export function getReviewItems(): ReviewItem[] {
  return [
    {
      id: 'REV-001',
      type: 'design',
      title: '星火骑士 · 霓虹系列',
      creator: '樱花设计师',
      content: '原创设计作品，融合赛博朋克与日式美学',
      imageUrl: '/images/review-1.jpg',
      status: 'pending',
      riskLevel: 'low',
      submittedAt: '2024-12-27 14:30',
    },
    {
      id: 'REV-002',
      type: 'ai_generated',
      title: 'AI生成 · 机甲少女',
      creator: '像素艺术家',
      content: 'AI辅助生成的机甲风格角色设计',
      imageUrl: '/images/review-2.jpg',
      status: 'pending',
      riskLevel: 'medium',
      submittedAt: '2024-12-27 16:45',
    },
    {
      id: 'REV-003',
      type: 'design',
      title: '鬼灭风格 · 火焰图案',
      creator: 'Cosplay女王',
      content: '参考鬼灭之刃风格的原创火焰纹理设计',
      imageUrl: '/images/review-3.jpg',
      status: 'pending',
      riskLevel: 'high',
      submittedAt: '2024-12-28 09:15',
    },
    {
      id: 'REV-004',
      type: 'comment',
      title: '用户评论审核',
      creator: '匿名用户',
      content: '这个设计太棒了！我已经下单购买了三件...',
      status: 'approved',
      riskLevel: 'low',
      submittedAt: '2024-12-26 11:20',
    },
  ]
}

export function getUserDistribution(): UserDistribution[] {
  return [
    { province: '广东', city: '深圳', count: 2847, lng: 114.057868, lat: 22.543099 },
    { province: '广东', city: '广州', count: 2156, lng: 113.264434, lat: 23.129162 },
    { province: '上海', city: '上海', count: 1923, lng: 121.473701, lat: 31.230416 },
    { province: '北京', city: '北京', count: 1756, lng: 116.407526, lat: 39.90403 },
    { province: '浙江', city: '杭州', count: 1432, lng: 120.15507, lat: 30.274084 },
    { province: '江苏', city: '南京', count: 987, lng: 118.796877, lat: 32.060255 },
    { province: '四川', city: '成都', count: 876, lng: 104.066541, lat: 30.572269 },
    { province: '湖北', city: '武汉', count: 765, lng: 114.305392, lat: 30.593098 },
    { province: '安徽', city: '合肥', count: 654, lng: 117.227239, lat: 31.820586 },
    { province: '陕西', city: '西安', count: 543, lng: 108.940174, lat: 34.341568 },
    { province: '福建', city: '厦门', count: 432, lng: 118.089425, lat: 24.479833 },
    { province: '湖南', city: '长沙', count: 398, lng: 112.938814, lat: 28.228209 },
    { province: '重庆', city: '重庆', count: 367, lng: 106.551556, lat: 29.563009 },
    { province: '天津', city: '天津', count: 298, lng: 117.200983, lat: 39.084158 },
    { province: '辽宁', city: '沈阳', count: 256, lng: 123.431474, lat: 41.805698 },
  ]
}

export function getTrendData(): TrendData[] {
  const data: TrendData[] = []
  const baseDate = new Date('2024-12-01')

  for (let i = 0; i < 30; i++) {
    const date = new Date(baseDate)
    date.setDate(date.getDate() + i)

    data.push({
      date: date.toISOString().split('T')[0] ?? '',
      users: Math.floor(100 + Math.random() * 150 + i * 5),
      orders: Math.floor(50 + Math.random() * 80 + i * 2),
      revenue: Math.floor(5000 + Math.random() * 8000 + i * 500),
      aiCalls: Math.floor(200 + Math.random() * 300 + i * 10),
    })
  }

  return data
}

export function getCategoryData(): CategoryData[] {
  return [
    { name: '手机壳', value: 2345 },
    { name: '徽章', value: 1876 },
    { name: '围巾', value: 1234 },
    { name: '帽子', value: 987 },
    { name: '立牌', value: 876 },
    { name: '挂件', value: 654 },
    { name: '手办', value: 432 },
    { name: '其他', value: 219 },
  ]
}

export function getRoleDistribution(): CategoryData[] {
  return [
    { name: '购买者', value: 8956 },
    { name: '设计者', value: 2847 },
    { name: '制造商', value: 1044 },
  ]
}

export function getAiUsageData(): { type: string; count: number }[] {
  return [
    { type: '文生图', count: 15678 },
    { type: '图生图', count: 8934 },
    { type: '风格迁移', count: 6543 },
    { type: '跨载体适配', count: 3366 },
  ]
}

