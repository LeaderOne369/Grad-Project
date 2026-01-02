// 社区功能 Mock 数据服务

export type UserRole = 'creator' | 'manufacturer' | 'buyer'

export interface Author {
  id: string
  name: string
  avatar: string
  role: UserRole
  badge?: string
}

export interface Post {
  id: string
  title: string
  content: string
  summary: string
  coverImage?: string
  category: string
  tags: string[]
  author: Author
  viewCount: number
  likeCount: number
  commentCount: number
  collectCount: number
  isLiked: boolean
  isCollected: boolean
  createdAt: string
  updatedAt: string
}

export interface Comment {
  id: string
  postId: string
  content: string
  author: Author
  likeCount: number
  isLiked: boolean
  parentId?: string
  replyTo?: Author
  replies?: Comment[]
  createdAt: string
}

// 分类定义
export const categories = [
  { id: 'all', name: '全部', icon: '🌐' },
  { id: 'design', name: '设计分享', icon: '🎨' },
  { id: 'tutorial', name: '教程攻略', icon: '📚' },
  { id: 'showcase', name: '作品展示', icon: '✨' },
  { id: 'question', name: '问答求助', icon: '❓' },
  { id: 'trading', name: '交易交流', icon: '💰' },
  { id: 'chat', name: '闲聊水区', icon: '💬' },
]

// Mock 作者数据
const mockAuthors: Author[] = [
  { id: 'u1', name: '洛璃', avatar: '', role: 'creator', badge: '优质创作者' },
  { id: 'u2', name: '青槿', avatar: '', role: 'creator', badge: '人气设计师' },
  { id: 'u3', name: '云深工坊', avatar: '', role: 'manufacturer', badge: '认证厂商' },
  { id: 'u4', name: '星月坊', avatar: '', role: 'manufacturer' },
  { id: 'u5', name: '追光者', avatar: '', role: 'buyer', badge: '活跃买家' },
  { id: 'u6', name: '晚栀', avatar: '', role: 'creator' },
  { id: 'u7', name: '千弦', avatar: '', role: 'creator', badge: '新锐设计师' },
  { id: 'u8', name: '祈曜', avatar: '', role: 'buyer' },
]

// Mock 帖子数据
const mockPosts: Post[] = [
  {
    id: 'p1',
    title: '【教程】如何用 AI 快速生成动漫风格周边设计',
    content: `<h2>前言</h2><p>作为一名设计师，我一直在探索如何利用 AI 工具提升设计效率。今天分享一下我使用 GOZU 平台 AI 设计室的心得体会。</p><h2>准备工作</h2><p>首先，你需要准备好以下素材：</p><ul><li>清晰的原始图片或概念草图</li><li>明确的风格参考</li><li>载体类型偏好</li></ul><h2>操作步骤</h2><p>进入 AI 设计室后，按照以下流程操作...</p>`,
    summary: '分享如何利用 AI 设计室快速生成高质量的动漫周边设计，包含详细步骤和技巧。',
    coverImage: '',
    category: 'tutorial',
    tags: ['AI设计', '教程', '新手必看'],
    author: mockAuthors[0]!,
    viewCount: 2847,
    likeCount: 328,
    commentCount: 56,
    collectCount: 189,
    isLiked: false,
    isCollected: false,
    createdAt: '2026-01-01 14:30',
    updatedAt: '2026-01-01 14:30',
  },
  {
    id: 'p2',
    title: '星火骑士系列围巾设计过程分享',
    content: `<p>这次和大家分享一下我创作星火骑士系列围巾的完整过程。从最初的灵感来源到最终成品，希望能给大家一些启发。</p><h3>灵感来源</h3><p>灵感来自于一个雨夜，霓虹灯光在雨水中倒映的画面...</p>`,
    summary: '详细记录星火骑士系列围巾从灵感到成品的创作历程，附带设计稿和实物对比。',
    coverImage: '',
    category: 'showcase',
    tags: ['设计分享', '围巾', '星火骑士'],
    author: mockAuthors[1]!,
    viewCount: 1923,
    likeCount: 456,
    commentCount: 78,
    collectCount: 234,
    isLiked: true,
    isCollected: true,
    createdAt: '2025-12-30 09:15',
    updatedAt: '2025-12-30 09:15',
  },
  {
    id: 'p3',
    title: '【厂商分享】亚克力制品生产工艺科普',
    content: `<h2>关于亚克力</h2><p>亚克力（PMMA）是一种透明度极高的塑料材料，常用于制作各类周边产品。</p><h2>生产流程</h2><p>1. 设计确认<br/>2. 开模制作<br/>3. 注塑成型<br/>4. 后期处理...</p>`,
    summary: '从厂商角度科普亚克力制品的生产流程和注意事项，帮助设计师更好地理解工艺限制。',
    coverImage: '',
    category: 'tutorial',
    tags: ['工艺科普', '亚克力', '厂商视角'],
    author: mockAuthors[2]!,
    viewCount: 1456,
    likeCount: 234,
    commentCount: 45,
    collectCount: 178,
    isLiked: false,
    isCollected: true,
    createdAt: '2025-12-28 16:45',
    updatedAt: '2025-12-28 16:45',
  },
  {
    id: 'p4',
    title: '求推荐！想做一套机甲风格的手机壳',
    content: `<p>最近迷上了机甲风格，想定制一套手机壳。有没有大佬推荐一下设计师或者工艺模板？</p><p>预算大概 150 左右，iPhone 15 Pro Max 的。</p><p>最好是那种金属质感的，带一点赛博朋克元素！</p>`,
    summary: '寻求机甲风格手机壳定制推荐，预算 150 元左右。',
    coverImage: '',
    category: 'question',
    tags: ['求推荐', '手机壳', '机甲风'],
    author: mockAuthors[4]!,
    viewCount: 567,
    likeCount: 23,
    commentCount: 34,
    collectCount: 12,
    isLiked: false,
    isCollected: false,
    createdAt: '2025-12-27 20:30',
    updatedAt: '2025-12-27 20:30',
  },
  {
    id: 'p5',
    title: '晨雾书店系列立牌设计稿公开',
    content: `<p>经过两周的打磨，晨雾书店系列的立牌设计终于完成了！</p><p>这次的主题是「清冷文学少女」，整体采用了蓝灰色调，希望能传达出那种静谧的氛围。</p>`,
    summary: '公开晨雾书店系列亚克力立牌的完整设计稿，欢迎交流讨论。',
    coverImage: '',
    category: 'showcase',
    tags: ['立牌', '设计稿', '晨雾书店'],
    author: mockAuthors[5]!,
    viewCount: 2134,
    likeCount: 567,
    commentCount: 89,
    collectCount: 345,
    isLiked: true,
    isCollected: false,
    createdAt: '2025-12-26 11:20',
    updatedAt: '2025-12-26 11:20',
  },
  {
    id: 'p6',
    title: '新人报道！刚入坑的小白求指点',
    content: `<p>大家好！我是刚开始学习周边设计的新人，目前只会一点点 PS。</p><p>想请教一下各位前辈：</p><ol><li>新手应该从哪种载体开始练手？</li><li>有没有推荐的学习资源？</li><li>AI 辅助设计好用吗？</li></ol><p>感谢大家！🙏</p>`,
    summary: '新手设计师求助，想了解入门建议和学习资源推荐。',
    coverImage: '',
    category: 'question',
    tags: ['新人', '求助', '学习'],
    author: mockAuthors[7]!,
    viewCount: 432,
    likeCount: 45,
    commentCount: 67,
    collectCount: 23,
    isLiked: false,
    isCollected: false,
    createdAt: '2025-12-25 15:00',
    updatedAt: '2025-12-25 15:00',
  },
  {
    id: 'p7',
    title: '【合作邀请】星月坊新年联名企划招募设计师',
    content: `<h2>企划说明</h2><p>星月坊计划在春节期间推出「新春瑞兽」主题联名系列，现招募 3-5 位设计师参与合作。</p><h2>合作内容</h2><ul><li>主题：新春瑞兽（龙、凤、麒麟等）</li><li>载体：围巾、红包、挂件套装</li><li>分成：销售额的 15%-20%</li></ul><p>有意向的设计师请私信联系～</p>`,
    summary: '星月坊新年联名企划招募设计师，主题为新春瑞兽系列。',
    coverImage: '',
    category: 'trading',
    tags: ['合作', '招募', '联名'],
    author: mockAuthors[3]!,
    viewCount: 1876,
    likeCount: 123,
    commentCount: 45,
    collectCount: 89,
    isLiked: false,
    isCollected: false,
    createdAt: '2025-12-24 10:00',
    updatedAt: '2025-12-24 10:00',
  },
  {
    id: 'p8',
    title: '复古赛博风配色方案分享（附色板）',
    content: `<p>整理了一套复古赛博风格的配色方案，分享给大家～</p><h3>主色调</h3><p>深邃蓝 #0a1628 / 霓虹粉 #ff2d95 / 电子青 #00fff0</p><h3>辅助色</h3><p>暗紫 #2d1b4e / 金属灰 #4a5568 / 橙黄 #f6ad55</p>`,
    summary: '分享一套完整的复古赛博风配色方案，包含主色调和辅助色。',
    coverImage: '',
    category: 'design',
    tags: ['配色', '赛博朋克', '资源分享'],
    author: mockAuthors[6]!,
    viewCount: 3456,
    likeCount: 678,
    commentCount: 92,
    collectCount: 567,
    isLiked: true,
    isCollected: true,
    createdAt: '2025-12-23 18:30',
    updatedAt: '2025-12-23 18:30',
  },
]

// Mock 评论数据
const mockComments: Comment[] = [
  {
    id: 'c1',
    postId: 'p1',
    content: '写得太详细了！正好在学 AI 设计，收藏了～',
    author: mockAuthors[4]!,
    likeCount: 23,
    isLiked: false,
    createdAt: '2026-01-01 15:20',
    replies: [
      {
        id: 'c1-1',
        postId: 'p1',
        content: '谢谢支持！有问题随时问～',
        author: mockAuthors[0]!,
        likeCount: 12,
        isLiked: false,
        parentId: 'c1',
        replyTo: mockAuthors[4]!,
        createdAt: '2026-01-01 15:45',
      },
    ],
  },
  {
    id: 'c2',
    postId: 'p1',
    content: '请问第三步的参数设置有推荐值吗？我试了几次效果都不太理想',
    author: mockAuthors[7]!,
    likeCount: 8,
    isLiked: false,
    createdAt: '2026-01-01 16:00',
    replies: [
      {
        id: 'c2-1',
        postId: 'p1',
        content: '建议把创意度调到 0.7 左右，太高容易跑偏',
        author: mockAuthors[0]!,
        likeCount: 15,
        isLiked: true,
        parentId: 'c2',
        replyTo: mockAuthors[7]!,
        createdAt: '2026-01-01 16:30',
      },
      {
        id: 'c2-2',
        postId: 'p1',
        content: '我也遇到过这个问题，后来发现是提示词写得太模糊了',
        author: mockAuthors[1]!,
        likeCount: 6,
        isLiked: false,
        parentId: 'c2',
        replyTo: mockAuthors[7]!,
        createdAt: '2026-01-01 17:00',
      },
    ],
  },
  {
    id: 'c3',
    postId: 'p1',
    content: '作为厂商补充一下，生成的设计稿最好预留 3mm 出血位',
    author: mockAuthors[2]!,
    likeCount: 45,
    isLiked: true,
    createdAt: '2026-01-01 18:20',
  },
  {
    id: 'c4',
    postId: 'p2',
    content: '这个配色绝了！有计划出其他载体吗？',
    author: mockAuthors[4]!,
    likeCount: 34,
    isLiked: false,
    createdAt: '2025-12-30 10:00',
  },
  {
    id: 'c5',
    postId: 'p2',
    content: '围巾的印花工艺是数码印还是丝网印？',
    author: mockAuthors[3]!,
    likeCount: 12,
    isLiked: false,
    createdAt: '2025-12-30 11:30',
  },
]

// 本地存储键
const POSTS_KEY = 'community_posts'
const COMMENTS_KEY = 'community_comments'

// 默认作者（用于新创建的内容）
const defaultAuthor: Author = mockAuthors[0]!

// 初始化数据
function initData() {
  if (!localStorage.getItem(POSTS_KEY)) {
    localStorage.setItem(POSTS_KEY, JSON.stringify(mockPosts))
  }
  if (!localStorage.getItem(COMMENTS_KEY)) {
    localStorage.setItem(COMMENTS_KEY, JSON.stringify(mockComments))
  }
}

// 获取所有帖子
export function getPosts(options?: {
  category?: string
  keyword?: string
  sortBy?: 'latest' | 'hot' | 'mostLiked'
}): Post[] {
  initData()
  let posts: Post[] = JSON.parse(localStorage.getItem(POSTS_KEY) || '[]')

  // 分类筛选
  if (options?.category && options.category !== 'all') {
    posts = posts.filter((p) => p.category === options.category)
  }

  // 关键词搜索
  if (options?.keyword) {
    const kw = options.keyword.toLowerCase()
    posts = posts.filter(
      (p) =>
        p.title.toLowerCase().includes(kw) ||
        p.summary.toLowerCase().includes(kw) ||
        p.tags.some((t) => t.toLowerCase().includes(kw)),
    )
  }

  // 排序
  switch (options?.sortBy) {
    case 'hot':
      posts.sort((a, b) => b.viewCount + b.commentCount * 5 - (a.viewCount + a.commentCount * 5))
      break
    case 'mostLiked':
      posts.sort((a, b) => b.likeCount - a.likeCount)
      break
    case 'latest':
    default:
      posts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  }

  return posts
}

// 获取单个帖子
export function getPostById(id: string): Post | null {
  initData()
  const posts: Post[] = JSON.parse(localStorage.getItem(POSTS_KEY) || '[]')
  const post = posts.find((p) => p.id === id)
  if (post) {
    // 增加浏览量
    post.viewCount++
    localStorage.setItem(POSTS_KEY, JSON.stringify(posts))
  }
  return post || null
}

// 创建帖子
export function createPost(data: {
  title: string
  content: string
  summary: string
  category: string
  tags: string[]
  coverImage?: string
}): Post {
  initData()
  const posts: Post[] = JSON.parse(localStorage.getItem(POSTS_KEY) || '[]')

  const newPost: Post = {
    id: 'p' + Date.now(),
    ...data,
    author: defaultAuthor, // 默认当前用户
    viewCount: 0,
    likeCount: 0,
    commentCount: 0,
    collectCount: 0,
    isLiked: false,
    isCollected: false,
    createdAt: new Date().toLocaleString('zh-CN'),
    updatedAt: new Date().toLocaleString('zh-CN'),
  }

  posts.unshift(newPost)
  localStorage.setItem(POSTS_KEY, JSON.stringify(posts))
  return newPost
}

// 获取帖子评论
export function getCommentsByPostId(postId: string): Comment[] {
  initData()
  const comments: Comment[] = JSON.parse(localStorage.getItem(COMMENTS_KEY) || '[]')
  return comments.filter((c) => c.postId === postId && !c.parentId)
}

// 添加评论
export function addComment(data: {
  postId: string
  content: string
  parentId?: string
  replyTo?: Author
}): Comment {
  initData()
  const comments: Comment[] = JSON.parse(localStorage.getItem(COMMENTS_KEY) || '[]')
  const posts: Post[] = JSON.parse(localStorage.getItem(POSTS_KEY) || '[]')

  const newComment: Comment = {
    id: 'c' + Date.now(),
    postId: data.postId,
    content: data.content,
    author: defaultAuthor, // 默认当前用户
    likeCount: 0,
    isLiked: false,
    parentId: data.parentId,
    replyTo: data.replyTo,
    createdAt: new Date().toLocaleString('zh-CN'),
  }

  // 如果是回复，添加到父评论的 replies 中
  if (data.parentId) {
    const parentComment = comments.find((c) => c.id === data.parentId)
    if (parentComment) {
      if (!parentComment.replies) parentComment.replies = []
      parentComment.replies.push(newComment)
    }
  } else {
    comments.unshift(newComment)
  }

  // 更新帖子评论数
  const post = posts.find((p) => p.id === data.postId)
  if (post) {
    post.commentCount++
    localStorage.setItem(POSTS_KEY, JSON.stringify(posts))
  }

  localStorage.setItem(COMMENTS_KEY, JSON.stringify(comments))
  return newComment
}

// 点赞帖子
export function togglePostLike(postId: string): boolean {
  initData()
  const posts: Post[] = JSON.parse(localStorage.getItem(POSTS_KEY) || '[]')
  const post = posts.find((p) => p.id === postId)

  if (post) {
    post.isLiked = !post.isLiked
    post.likeCount += post.isLiked ? 1 : -1
    localStorage.setItem(POSTS_KEY, JSON.stringify(posts))
    return post.isLiked
  }
  return false
}

// 收藏帖子
export function togglePostCollect(postId: string): boolean {
  initData()
  const posts: Post[] = JSON.parse(localStorage.getItem(POSTS_KEY) || '[]')
  const post = posts.find((p) => p.id === postId)

  if (post) {
    post.isCollected = !post.isCollected
    post.collectCount += post.isCollected ? 1 : -1
    localStorage.setItem(POSTS_KEY, JSON.stringify(posts))
    return post.isCollected
  }
  return false
}

// 点赞评论
export function toggleCommentLike(commentId: string): boolean {
  initData()
  const comments: Comment[] = JSON.parse(localStorage.getItem(COMMENTS_KEY) || '[]')

  function findAndToggle(list: Comment[]): boolean {
    for (const comment of list) {
      if (comment.id === commentId) {
        comment.isLiked = !comment.isLiked
        comment.likeCount += comment.isLiked ? 1 : -1
        return comment.isLiked
      }
      if (comment.replies) {
        const result = findAndToggle(comment.replies)
        if (result !== undefined) return result
      }
    }
    return false
  }

  const result = findAndToggle(comments)
  localStorage.setItem(COMMENTS_KEY, JSON.stringify(comments))
  return result
}

// 获取热门帖子
export function getHotPosts(limit = 5): Post[] {
  return getPosts({ sortBy: 'hot' }).slice(0, limit)
}

// 获取热门标签
export function getHotTags(): { name: string; count: number }[] {
  initData()
  const posts: Post[] = JSON.parse(localStorage.getItem(POSTS_KEY) || '[]')
  const tagMap = new Map<string, number>()

  posts.forEach((post) => {
    post.tags.forEach((tag) => {
      tagMap.set(tag, (tagMap.get(tag) || 0) + 1)
    })
  })

  return Array.from(tagMap.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10)
}

// 获取角色显示信息
export function getRoleDisplay(role: UserRole): { label: string; color: string } {
  const roleMap = {
    creator: { label: '设计者', color: '#7b4fe3' },
    manufacturer: { label: '制造商', color: '#2c6a7b' },
    buyer: { label: '购买者', color: '#d75c35' },
  }
  return roleMap[role]
}
