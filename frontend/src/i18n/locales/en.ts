export default {
  settings: {
    title: 'Settings',
    appearance: 'Appearance',
    language: 'Language',
    languageDesc: 'Select display language',
    notifications: 'Notifications',
    pushNotifications: 'Push Notifications',
    pushNotificationsDesc: 'Receive order and system messages',
    emailNotifications: 'Email Notifications',
    emailNotificationsDesc: 'Receive important updates via email',
    resetDefault: 'Reset Default',
    confirm: 'Confirm',
    chinese: '简体中文',
    english: 'English',
  },
  about: {
    tagline: 'Anime Creative Platform',
    projectIntro: 'Project Introduction',
    projectIntroDesc:
      'GOZU is an anime IP customization platform that connects designers, manufacturers and buyers. Through Gemini AI technology, it achieves intelligent pattern generation, style migration and cross-carrier adaptation.',
    developer: 'Developer',
    developerName: 'Lixing Xu',
    developerSchool: 'School of Software Engineering, Hefei University of Technology',
    projectInfo: 'Project Information',
    projectInfoDesc: '2025-2026 Academic Year Graduation Project',
    projectInfoSub: 'Version 1.0.0 • Built with Vue 3 + FastAPI + Gemini',
    copyright: 'Copyright Notice',
    copyrightNotice: 'Copyright © 2026 Lixing Xu. All rights reserved.',
    copyrightDesc:
      'This project is for academic and educational purposes only. The copyrights of anime materials involved in the project belong to the original authors. Commercial use without authorization is not permitted.',
  },
  common: {
    close: 'Close',
    about: 'About',
    settings: 'Settings',
  },
  creator: {
    // 主页
    home: {
      hero: {
        tag: 'Designer Workspace',
        title: 'Reshape IP Worlds into Series of Gu Zi',
        subtitle:
          'Your inspiration starts here: Gemini generation, cross-carrier adaptation, work recommendations and revenue tracking all connected.',
        btnPrimary: 'Enter AI Design Studio',
        btnSecondary: 'Publish New Design',
      },
      highlights: {
        aiLab: {
          title: 'AI Inspiration Lab',
          description:
            'Use Gemini to generate theme drafts, style migration and cross-carrier combinations.',
          tag: 'Gemini Ready',
        },
        works: {
          title: 'My Works Pool',
          description: 'Manage design versions, authorization status and revenue sharing.',
          tag: '12 Projects',
        },
        trends: {
          title: 'Recommended Trends List',
          description: 'Grasp popular IP and style trends, adjust new product rhythm.',
          tag: 'Rising',
        },
      },
      matrix: {
        title: 'Recommended Inspiration Matrix',
        subtitle:
          'Real-time suggestions based on style vectors and IP popularity to help you plan the next wave of hits in advance.',
        stats: {
          styleMatch: 'Style Match',
          hotIPs: 'Hot IPs',
          carriers: 'Migratable Carriers',
        },
      },
      focusCards: {
        task: {
          label: "Today's Task",
          title: 'Design "Stardust Knight" Scarf + Badge Combination Set',
          detail: 'Suggested Style: Neon Cyberpunk / Deep Blue Metal',
        },
        workflow: {
          label: 'AI Workflow',
          title: 'Pattern Migration: Phone Case → Plush Pendant',
          detail: 'Resolution 2K / Safety Area Auto-adjust',
        },
        revenue: {
          label: 'Revenue Overview',
          title: 'Estimated Revenue ¥3,420 This Week',
          detail: 'Conversion +12%, Collections +230',
        },
      },
      drafts: {
        title: 'Recent Drafts',
        empty: 'No drafts yet, start creating in AI Design Studio.',
        link: 'Enter Design Studio',
      },
      results: {
        title: 'AI Generation Records',
        empty: 'No works generated yet, try completing a text-to-image first.',
        viewAll: 'View All',
        updated: 'Updated on',
      },
    },
    // AI实验室
    aiLab: {
      hero: {
        tag: 'Gemini Ready',
        title: 'AI Inspiration Laboratory',
        subtitle:
          'Use Gemini to generate theme drafts, style migration and cross-carrier combinations.',
        cardTitle: "Today's Active Tasks",
        cardValue: '3',
        cardDesc: 'Automatically summarize your text-to-image and migration progress.',
        btn: 'Start New Task',
      },
      pipeline: {
        title: 'Process Overview',
        labels: ['Text-to-Image', 'Image-to-Image', 'Cross-Carrier'],
      },
      projects: {
        completed: 'Gemini Completed',
        waiting: 'Waiting for Optimization',
        recommended: 'Recommending',
      },
      projectsList: [
        {
          title: 'Stardust Knight · Neon Burning Domain',
          desc: 'Text-to-Image + Scarf Migration, 4 versions generated.',
        },
        {
          title: 'Frost Moon Tales · Glacier Traveler',
          desc: 'Image-to-Image + Badge Set, waiting for secondary adjustment.',
        },
        {
          title: 'Night Voyage Convenience Store · 24h Neon',
          desc: 'Cross-carrier set: Pendant / Hat / Phone Case',
        },
      ],
    },
    // 作品池
    works: {
      hero: {
        tag: '12 Projects',
        title: 'My Works Pool',
        subtitle: 'Manage design versions, authorization status and revenue sharing.',
        cardTitle: 'Works Overview',
        cardValue: '12',
        cardDesc: 'Creation progress and revenue at a glance.',
        btn: 'Add New Work',
      },
      stats: {
        title: 'Revenue & Authorization',
        labels: ['Monthly Revenue', 'Published Works', 'Authorized'],
      },
      worksList: [
        {
          title: 'Stardust Knight · Nebula Series',
          status: 'Published',
          income: '¥1,240',
        },
        {
          title: 'Frost Moon Tales · Glacier Traveler',
          status: 'Under Review',
          income: '¥860',
        },
        {
          title: 'Night Voyage Convenience Store · 24h Neon',
          status: 'Draft',
          income: '¥0',
        },
      ],
      status: {
        published: 'Published',
        reviewing: 'Under Review',
        draft: 'Draft',
      },
    },
    // 趋势榜
    trends: {
      hero: {
        tag: 'Rising',
        title: 'Recommended Trends List',
        subtitle: 'Grasp popular IP and style trends, adjust new product rhythm.',
        cardTitle: 'Recommendation Index',
        cardValue: '87',
        cardDesc: 'Style matching + popularity + content collaboration comprehensive scoring.',
        btn: 'Generate Topic Suggestions',
      },
      signals: {
        title: 'Trend Signals',
        stats: ['Popularity Index', 'New IPs', 'Migratable Carriers'],
        insight: {
          title: 'Key Observation',
          content:
            'Neon cyberpunk style shows significant conversion rate improvement on accessory carriers.',
        },
      },
      insightsTitle: 'Trend Insights',
      insightsLabel: 'Trend Hint',
      insights: [
        {
          title: 'IP Popularity List',
          desc: 'Stardust Knight, Night Voyage Convenience Store, Frost Moon Tales continue to rise.',
        },
        {
          title: 'Style Preferences',
          desc: 'Neon cyberpunk and Japanese fresh style share increased by 18%.',
        },
        {
          title: 'Carrier Trends',
          desc: 'Scarf and badge combination sets have the highest conversion rate.',
        },
      ],
    },
    // AI设计室
    aiStudio: {
      moodTags: ['Neon Cyberpunk', 'Japanese Fresh', 'Dark Steam', 'Retro Pixel', 'Dreamy Girl'],
      carriers: ['Scarf', 'Hat', 'Acrylic Stand', 'Badge', 'Pendant', 'Phone Case'],
      workflowSteps: [
        {
          title: 'Input Theme + IP',
          detail: 'Define character and worldview keywords, set color scheme and composition.',
        },
        {
          title: 'Gemini Generation & Migration',
          detail: 'Generate multiple style versions at once and adapt to multiple carriers.',
        },
        {
          title: 'Review & Publish',
          detail: 'Confirm copyright and safety areas, publish to recommendation pool.',
        },
      ],
      form: {
        labels: {
          theme: 'Theme',
          ipWorld: 'IP World',
          prompt: 'Generation Prompt',
          carriers: 'Target Carriers',
        },
        placeholders: {
          theme: 'e.g., Stardust Knight, Frost Moon Tales',
          ipWorld: 'e.g., Cyberpunk, Magical Girl',
          prompt: 'Describe the pattern style and elements you want...',
        },
        btnGenerate: 'Start Generation',
        btnSave: 'Save Draft',
      },
      tasks: {
        running: 'Generating',
        success: 'Generated',
        waiting: 'Waiting for Migration',
      },
      preview: {
        title: 'Generation Preview',
        noPreview: 'No preview generated yet',
      },
      drafts: {
        title: 'Draft List',
        empty: 'No drafts',
      },
    },
  },
  auth: {
    // 登录页面
    login: {
      brand: {
        pill1: 'GOZU',
        pill2: 'ANIME STUDIO',
        title: 'Let IP Souls Be<br /><span>Reborn</span> in Every Vessel',
        subtitle:
          'The Gu Zi Creative Hub connecting designers, manufacturers and buyers. Use Gemini to generate, migrate and restructure your anime universe.',
        badges: {
          badge1: 'IP Authorization Visualized',
          badge2: 'Style Recommendations',
          badge3: 'Cross-Carrier Adaptation',
          badge4: 'AI Generation Closed Loop',
        },
        inspiration: {
          title: "Today's Inspiration",
          content:
            'Migrate the "Stardust Knight" phone case pattern to scarves and hats, creating a series collaboration.',
        },
      },
      form: {
        title: 'Access the Platform',
        subtitle: 'Enter as a designer, manufacturer, or buyer to experience.',
        labels: {
          username: 'Username',
          password: 'Password',
        },
        placeholders: {
          username: 'Enter your username',
          password: 'Enter your password',
        },
        quickLogin: 'Quick Login:',
        roles: {
          creator: 'Designer',
          manufacturer: 'Manufacturer',
          buyer: 'Buyer',
          admin: 'Admin',
        },
        submitBtn: 'Enter the Gu Zi Star Chart',
        registerBtn: 'Create New Account',
      },
      messages: {
        welcomeBack: 'Welcome back, {name}!',
        defaultName: 'friend',
        loginFailed: 'Login failed, please try again.',
      },
    },
    // 注册页面
    register: {
      brand: {
        pill1: 'GOZU',
        pill2: 'COMMUNITY',
        title: 'Join the<br /><span>Otaku Co-Creation</span> Now',
        subtitle:
          'Complete IP authorization, AI generation, cross-carrier migration and personalized recommendations in one stop. Your work will be seen by more people here.',
        badges: {
          badge1: 'Design Revenue',
          badge2: 'Manufacturing Collaboration',
          badge3: 'Personalized Recommendations',
        },
        benefits: {
          title: 'Benefits After Joining',
          content:
            'Design asset library, AI creation seats, exclusive work pages and recommended traffic.',
        },
      },
      form: {
        title: 'Create Account',
        subtitle: 'Choose your role and complete your personal information.',
        labels: {
          role: 'Role Identity',
          displayName: 'Display Name',
          username: 'Username',
          password: 'Password',
          confirmPassword: 'Confirm Password',
        },
        placeholders: {
          displayName: 'Give yourself a name',
          username: 'For platform login',
          password: 'At least 6 characters',
          confirmPassword: 'Enter password again',
        },
        roles: {
          creator: {
            name: 'Designer',
            desc: 'Publish works and AI design',
          },
          manufacturer: {
            name: 'Manufacturer',
            desc: 'Accept orders and production',
          },
          buyer: {
            name: 'Buyer',
            desc: 'Collect and customize Gu Zi',
          },
        },
        submitBtn: 'Complete Registration',
        loginBtn: 'Back to Login',
      },
      messages: {
        passwordMismatch: 'The two passwords entered do not match.',
        registerSuccess: 'Registration successful! Please log in with your new account.',
        registerFailed: 'Registration failed, please try again.',
      },
    },
  },
}
