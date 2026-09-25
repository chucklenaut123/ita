/**
 * 静态数据文件
 * 所有需要展示的内容（新闻、成员、项目、文档）均在此维护。
 * 修改后刷新页面即可生效。
 */

// 新闻数据
const NEWS_DATA = [
  {
    id: 1,
    title: '新 AI 项目正式启动',
    summary: '协会首个跨学科人工智能实践项目正式立项，欢迎有兴趣的同学加入。',
    content:
      '本项目旨在探索人工智能在物理、化学、生物等学科中的交叉应用。项目周期为一学期，成员将分组完成从文献调研、模型设计到实验验证的完整流程。欢迎具备编程基础或对 AI 应用感兴趣的同学报名参加。',
    tag: '新项目',
    date: '2026-08-25',
    image: SITE_CONFIG.images.news[0],
  },
  {
    id: 2,
    title: '协会文创周边上线',
    summary: '智创协会首批主题文创周边正式发布，展示协会文化与精神。',
    content:
      '首批文创包括协会主题贴纸、徽章与帆布包，设计理念围绕“知识共享，共同进步”。成员可通过参与活动或积分兑换获取。',
    tag: '新文创',
    date: '2026-08-20',
    image: SITE_CONFIG.images.news[1],
  },
  {
    id: 3,
    title: '秋季纳新通知',
    summary: '智创协会 2026 秋季纳新即将开始，请关注后续报名通道。',
    content:
      '纳新面向全校对人工智能、跨学科学习、项目实践感兴趣的同学。报名通道将于开学第二周开启，届时可填写在线报名表并参加面试。',
    tag: '新通知',
    date: '2026-08-15',
    image: SITE_CONFIG.images.news[2],
  },
];

// 核心成员数据
const MEMBERS_DATA = [
  {
    id: 1,
    name: 'ChuckleNaut',
    role: '荣誉社长',
    department: '主席团',
    avatar: 'assets/images/荣誉社长头像.jpg',
    intro: '社团创建人，第一任社长，YLIDAI项目发起者与Windows版本主要贡献者，现就读于波士顿大学',
    wechat: 'Shabby2237',
  },
  {
    id: 2,
    name: '该角色未解锁',
    role: '荣誉副社长',
    department: '主席团',
    avatar: 'assets/images/荣誉副社长头像.jpg',
    intro: '第一任副社长，现就读于罗格斯大学',
    wechat: 'xxy202008',
  },
];

// 项目与活动数据
const PROJECTS_DATA = [
  {
    id: 1,
    title: '社团官网维护',
    summary:
      '我想要有人能够和我们一起更新和维护这个官网。任务包括更新官网新闻和项目介绍等。不需要你自己会编程，但是你可能需要掌握用AI工具编程，我推荐DeepSeek Harness、TraeWork和Codex。如果你有兴趣的话请联系我吧。——ChuckleNaut',
    status: '进行中',
    type: '活动',
    cover: 'assets/images/官网维护图片.jpg',
    leaderId: 1,
    detail:
      '我想要有人能够和我们一起更新和维护这个官网。任务包括更新官网新闻和项目介绍等。不需要你自己会编程，但是你可能需要掌握用AI工具编程，我推荐DeepSeek Harness、TraeWork和Codex。如果你有兴趣的话请联系我吧。——ChuckleNaut',
  },
];

// 公开文档系列
const DOC_SERIES_DATA = [
  {
    id: 'python-basics',
    title: 'Python 基础系列',
    summary: '面向零基础同学的 Python 入门教程，包含语法、数据结构与常用库。',
    docs: [
      {
        id: 'py-01',
        title: 'Python 环境搭建与基础语法',
        file: 'documents/example-tutorial.md',
        type: 'markdown',
      },
      {
        id: 'py-02',
        title: '常用数据结构速查',
        file: 'documents/example-tutorial.md',
        type: 'markdown',
      },
    ],
  },
  {
    id: 'ml-intro',
    title: '机器学习入门系列',
    summary: '介绍机器学习的基本概念、经典算法与实践流程。',
    docs: [
      {
        id: 'ml-01',
        title: '机器学习概述',
        file: 'documents/example-tutorial.md',
        type: 'markdown',
      },
      {
        id: 'ml-02',
        title: '线性回归与逻辑回归',
        file: 'documents/example-tutorial.md',
        type: 'markdown',
      },
    ],
  },
];

// 不公开文档（仅展示标题与大纲）
const PRIVATE_DOCS_DATA = [
  {
    id: 'internal-01',
    title: '协会内部培训大纲',
    outline: ['新成员培训流程', '部门职责说明', '考核标准'],
  },
  {
    id: 'internal-02',
    title: '项目管理规范',
    outline: ['立项流程', '进度跟踪', '结项汇报', '资料归档'],
  },
];
