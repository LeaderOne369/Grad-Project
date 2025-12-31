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
