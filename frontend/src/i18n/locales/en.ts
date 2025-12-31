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
