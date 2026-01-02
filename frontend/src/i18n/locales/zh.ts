export default {
  settings: {
    title: '设置',
    appearance: '外观',
    language: '语言',
    languageDesc: '选择界面显示语言',
    notifications: '通知',
    pushNotifications: '推送通知',
    pushNotificationsDesc: '接收订单和系统消息',
    emailNotifications: '邮件通知',
    emailNotificationsDesc: '通过邮件接收重要更新',
    resetDefault: '恢复默认',
    confirm: '确认',
    chinese: '简体中文',
    english: 'English',
  },
  about: {
    tagline: '动漫创意平台',
    projectIntro: '项目简介',
    projectIntroDesc:
      'GOZU 是一个连接设计者、制造商与购买者的动漫 IP 定制平台。通过 Gemini AI 技术，实现图案的智能生成、风格迁移与跨载体适配。',
    developer: '开发者',
    developerName: '徐力行',
    developerSchool: '合肥工业大学软件学院',
    projectInfo: '项目信息',
    projectInfoDesc: '2025-2026 学年毕业设计项目',
    projectInfoSub: '版本 1.0.0 • 构建于 Vue 3 + FastAPI + Gemini',
    copyright: '版权声明',
    copyrightNotice: 'Copyright © 2026 徐力行. All rights reserved.',
    copyrightDesc:
      '本项目仅供学术教育用途。项目中涉及的动漫素材版权归原作者所有。未经授权，不得用于商业用途。',
  },
  common: {
    close: '关闭',
    about: '关于',
    settings: '设置',
  },
  nav: {
    creator: {
      home: '设计者主页',
      aiStudio: 'AI 设计室',
      aiLab: '灵感实验室',
      works: '作品池',
      trends: '趋势榜',
      community: '社区',
    },
    manufacturer: {
      home: '制造商主页',
      orders: '订单看板',
      templates: '工艺模板',
      community: '社区',
    },
    buyer: {
      home: '推荐首页',
      customize: '开启定制',
      orders: '我的订单',
      community: '社区',
    },
    roles: {
      creator: '设计者模式',
      manufacturer: '制造商模式',
      buyer: '购买者模式',
    },
  },
  footer: {
    copyright: 'Copyright © 2026 徐力行. All rights reserved.',
    university: '合肥工业大学软件学院毕业设计项目',
  },
  app: {
    title: 'GOZU - 动漫创意平台',
  },
  creator: {
    // 主页
    home: {
      hero: {
        tag: '设计者工作台',
        title: '把 IP 世界重塑成系列谷子',
        subtitle: '你的灵感从这里开始：Gemini 生成、跨载体适配、作品推荐与收益追踪全部连在一起。',
        btnPrimary: '进入 AI 设计室',
        btnSecondary: '发布新设计',
      },
      highlights: {
        aiLab: {
          title: 'AI 灵感实验室',
          description: '用 Gemini 生成主题稿、风格迁移与跨载体套装。',
          tag: 'Gemini Ready',
        },
        works: {
          title: '我的作品池',
          description: '管理设计版本、授权状态与收益分成。',
          tag: '12 个项目',
        },
        trends: {
          title: '推荐趋势榜',
          description: '把握热门 IP 与风格走势，调整上新节奏。',
          tag: '上升中',
        },
      },
      matrix: {
        title: '推荐灵感矩阵',
        subtitle: '基于风格向量与 IP 热度的实时建议，帮助你提前布局下一波爆款。',
        stats: {
          styleMatch: '风格匹配',
          hotIPs: '热度 IP',
          carriers: '可迁移载体',
        },
      },
      focusCards: {
        task: {
          label: '今日任务',
          title: '设计「星火骑士」围巾 + 徽章联动套装',
          detail: '建议风格：霓虹赛博 / 深蓝金属',
        },
        workflow: {
          label: 'AI 工作流',
          title: '图案迁移：手机壳 → 毛绒挂件',
          detail: '分辨率 2K / 安全区自动调整',
        },
        revenue: {
          label: '收益概览',
          title: '本周预估收益 ¥3,420',
          detail: '转化率 +12%，收藏 +230',
        },
      },
      drafts: {
        title: '最近草稿',
        empty: '暂无草稿，去 AI 设计室开始创作吧。',
        link: '进入设计室',
      },
      results: {
        title: 'AI 生成记录',
        empty: '尚未生成作品，建议先完成一次文生图。',
        viewAll: '查看全部',
        updated: '更新于',
      },
    },
    // AI实验室
    aiLab: {
      hero: {
        tag: 'Gemini Ready',
        title: 'AI 灵感实验室',
        subtitle: '用 Gemini 生成主题稿、风格迁移与跨载体套装。',
        cardTitle: '今日活跃任务',
        cardValue: '3',
        cardDesc: '自动汇总你的文生图与迁移进度。',
        btn: '启动新任务',
      },
      pipeline: {
        title: '流程概览',
        labels: ['文生图', '图生图', '跨载体'],
      },
      projects: {
        completed: 'Gemini 已完成',
        waiting: '等待优化',
        recommended: '推荐中',
      },
      projectsList: [
        {
          title: '星火骑士 · 霓虹燃域',
          desc: '文生图 + 围巾迁移，已生成 4 个版本。',
        },
        {
          title: '霜月物语 · 冰川旅人',
          desc: '图生图 + 徽章套装，等待二次调整。',
        },
        {
          title: '夜航便利店 · 24h 霓虹',
          desc: '跨载体套装：挂件 / 帽子 / 手机壳',
        },
      ],
    },
    // 作品池
    works: {
      hero: {
        tag: '12 个项目',
        title: '我的作品池',
        subtitle: '管理设计版本、授权状态与收益分成。',
        cardTitle: '作品总览',
        cardValue: '12',
        cardDesc: '创作进度与收益一目了然。',
        btn: '新增作品',
      },
      stats: {
        title: '收益与授权',
        labels: ['本月收益', '发布作品', '授权通过'],
      },
      worksList: [
        {
          title: '星火骑士 · 星云系列',
          status: '已发布',
          income: '¥1,240',
        },
        {
          title: '霜月物语 · 冰川旅人',
          status: '审核中',
          income: '¥860',
        },
        {
          title: '夜航便利店 · 24h 霓虹',
          status: '草稿',
          income: '¥0',
        },
      ],
      status: {
        published: '已发布',
        reviewing: '审核中',
        draft: '草稿',
      },
    },
    // 趋势榜
    trends: {
      hero: {
        tag: '上升中',
        title: '推荐趋势榜',
        subtitle: '把握热门 IP 与风格走势，调整上新节奏。',
        cardTitle: '推荐指数',
        cardValue: '87',
        cardDesc: '风格匹配 + 热度 + 内容联动综合评分。',
        btn: '生成选题建议',
      },
      signals: {
        title: '趋势信号',
        stats: ['热度指数', '新增 IP', '可迁移载体'],
        insight: {
          title: '重点观察',
          content: '霓虹赛博风格在配饰类载体上转化率提升明显。',
        },
      },
      insightsTitle: '趋势洞察',
      insightsLabel: '趋势提示',
      insights: [
        {
          title: 'IP 热度榜',
          desc: '星火骑士、夜航便利店、霜月物语持续上升。',
        },
        {
          title: '风格偏好',
          desc: '霓虹赛博与日式清新占比增长 18%。',
        },
        {
          title: '载体走势',
          desc: '围巾与徽章的联动套装转化率最高。',
        },
      ],
    },
    // AI设计室
    aiStudio: {
      moodTags: ['霓虹赛博', '日式清新', '暗黑蒸汽', '怀旧像素', '梦幻少女'],
      carriers: ['围巾', '帽子', '亚克力立牌', '徽章', '挂件', '手机壳'],
      workflowSteps: [
        {
          title: '输入主题 + IP',
          detail: '定义角色与世界观关键词，设定配色与构图。',
        },
        {
          title: 'Gemini 生成与迁移',
          detail: '一次生成多风格版本，并适配多个载体。',
        },
        {
          title: '审核与发布',
          detail: '确认版权与安全区，发布到推荐池。',
        },
      ],
      form: {
        labels: {
          theme: '主题',
          ipWorld: 'IP 世界',
          prompt: '生成提示',
          carriers: '目标载体',
        },
        placeholders: {
          theme: '例如：星火骑士、霜月物语',
          ipWorld: '例如：赛博朋克、魔法少女',
          prompt: '描述你想要的图案风格和元素...',
        },
        btnGenerate: '开始生成',
        btnSave: '保存草稿',
      },
      tasks: {
        running: '生成中',
        success: '已生成',
        waiting: '待迁移',
      },
      preview: {
        title: '生成预览',
        noPreview: '尚未生成预览',
      },
      drafts: {
        title: '草稿列表',
        empty: '暂无草稿',
      },
    },
  },
  community: {
    title: 'GOZU 社区',
    subtitle: '创意汇聚，灵感无限',
    description: '设计者、制造商、购买者共同交流的平台。分享设计心得、探讨工艺技术、发现创意灵感。',
    stats: {
      users: '活跃用户',
      posts: '精彩帖子',
      interactions: '互动交流',
    },
    createPost: '发布帖子',
    search: {
      placeholder: '搜索帖子、标签、作者...',
    },
    sort: {
      latest: '最新',
      hot: '热门',
      mostLiked: '最多点赞',
    },
    categories: {
      title: '帖子分类',
      all: '全部',
      design: '设计分享',
      tutorial: '教程攻略',
      showcase: '作品展示',
      question: '问答求助',
      trading: '交易交流',
      chat: '闲聊水区',
    },
    actions: {
      like: '点赞',
      liked: '已点赞',
      collect: '收藏',
      collected: '已收藏',
      comment: '评论',
      share: '分享',
      follow: '关注',
      following: '已关注',
    },
    create: {
      title: '发布新帖子',
      back: '返回社区',
      cancel: '取消',
      publish: '发布',
      form: {
        title: {
          label: '帖子标题',
          placeholder: '起一个吸引人的标题（至少5个字）',
        },
        summary: {
          label: '内容摘要',
          placeholder: '简要描述帖子内容，会显示在列表页（至少10个字）',
        },
        content: {
          label: '帖子正文',
        },
        category: {
          label: '选择分类',
        },
        tags: {
          label: '添加标签',
          placeholder: '输入标签后按回车添加',
          add: '添加',
          hint: '最多5个',
        },
      },
      tips: {
        title: '发帖小贴士',
        items: [
          '标题要简洁明了，突出主题',
          '摘要用于列表展示，概括核心内容',
          '添加合适的标签增加曝光',
          '图文并茂更容易获得互动',
        ],
      },
    },
    post: {
      back: '返回社区',
      author: '作者',
      time: '发布于',
      views: '阅读',
      comments: '评论 ({count})',
      reply: '回复',
      replyTo: '回复',
      replyPlaceholder: '发表你的看法...',
      replyToPlaceholder: '回复 @{author}...',
      submitComment: '发表评论',
      noComments: '暂无评论，快来发表第一条评论吧！',
    },
    empty: {
      noPosts: '暂无相关帖子',
      noPostsDesc: '换个分类或关键词试试，或者成为第一个发帖的人！',
      createFirst: '发布第一篇帖子',
      loading: '加载中...',
      notFound: '帖子不存在',
      notFoundDesc: '该帖子可能已被删除或链接无效',
      backHome: '返回社区',
    },
    hot: {
      posts: '热门推荐',
      tags: '热门标签',
    },
    promo: {
      title: '成为优质创作者',
      desc: '发布原创内容，获得更多曝光机会和专属徽章',
      button: '了解更多',
    },
  },
  auth: {
    // 登录页面
    login: {
      brand: {
        pill1: 'GOZU',
        pill2: 'ANIME STUDIO',
        title: '让 IP 灵魂在<br /><span>每个载体</span>重生',
        subtitle:
          '连接设计者、制造商与购买者的谷子创意基地。用 Gemini 生成、迁移与重组你的动漫世界。',
        badges: {
          badge1: 'IP 授权可视',
          badge2: '风格推荐',
          badge3: '跨载体适配',
          badge4: 'AI 生成闭环',
        },
        inspiration: {
          title: '今日灵感',
          content: '把"星火骑士"手机壳图案迁移到围巾与帽子，生成系列联动。',
        },
      },
      form: {
        title: '登录平台',
        subtitle: '以设计师、制造商或购买者身份进入体验。',
        labels: {
          username: '用户名',
          password: '密码',
        },
        placeholders: {
          username: '请输入用户名',
          password: '请输入密码',
        },
        quickLogin: '快速登录：',
        roles: {
          creator: '设计者',
          manufacturer: '制造商',
          buyer: '购买者',
          admin: '管理员',
        },
        submitBtn: '进入谷子星图',
        registerBtn: '创建新账号',
      },
      messages: {
        welcomeBack: '欢迎回来，{name}！',
        defaultName: '伙伴',
        loginFailed: '登录失败，请重试。',
      },
    },
    // 注册页面
    register: {
      brand: {
        pill1: 'GOZU',
        pill2: 'COMMUNITY',
        title: '立刻加入<br /><span>二次元共创</span>',
        subtitle:
          '一站式完成 IP 授权、AI 生成、跨载体迁移与个性化推荐。你的作品将在这里被更多人看见。',
        badges: {
          badge1: '设计收益',
          badge2: '制造协作',
          badge3: '个性化推荐',
        },
        benefits: {
          title: '加入后可获得',
          content: '设计资产库、AI 创作席位、专属作品页与推荐流量。',
        },
      },
      form: {
        title: '创建账号',
        subtitle: '请选择身份并完善个人信息。',
        labels: {
          role: '身份角色',
          displayName: '昵称',
          username: '用户名',
          password: '密码',
          confirmPassword: '确认密码',
        },
        placeholders: {
          displayName: '给自己取一个名字',
          username: '用于登录平台',
          password: '至少 6 位字符',
          confirmPassword: '再次输入密码',
        },
        roles: {
          creator: {
            name: '设计者',
            desc: '发布作品与 AI 设计',
          },
          manufacturer: {
            name: '制造商',
            desc: '承接订单与生产',
          },
          buyer: {
            name: '购买者',
            desc: '收藏与定制谷子',
          },
        },
        submitBtn: '完成注册',
        loginBtn: '返回登录',
      },
      messages: {
        passwordMismatch: '两次输入的密码不一致。',
        registerSuccess: '注册成功！请使用新账号登录。',
        registerFailed: '注册失败，请重试。',
      },
    },
  },
}
