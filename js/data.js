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
    name: '张三',
    role: '会长',
    department: '主席团',
    avatar: SITE_CONFIG.images.memberAvatar,
    intro: '负责协会整体规划与对外联络，热爱人工智能教育普及。',
  },
  {
    id: 2,
    name: '李四',
    role: '副会长',
    department: '主席团',
    avatar: SITE_CONFIG.images.memberAvatar,
    intro: '统筹项目与活动执行，擅长团队协作与资源整合。',
  },
  {
    id: 3,
    name: '王五',
    role: '技术部部长',
    department: '技术部',
    avatar: SITE_CONFIG.images.memberAvatar,
    intro: '主导技术分享与项目指导，专注机器学习与深度学习。',
  },
  {
    id: 4,
    name: '赵六',
    role: '宣传部部长',
    department: '宣传部',
    avatar: SITE_CONFIG.images.memberAvatar,
    intro: '负责协会品牌设计与内容传播，热爱视觉表达。',
  },
  {
    id: 5,
    name: '陈七',
    role: '外联部部长',
    department: '外联部',
    avatar: SITE_CONFIG.images.memberAvatar,
    intro: '负责协会对外合作与资源对接，善于沟通与组织活动。',
  },
];

// 项目与活动数据
const PROJECTS_DATA = [
  {
    id: 1,
    title: 'AI 辅助物理实验分析',
    summary:
      '利用机器学习模型对物理实验数据进行分析与预测，探索 AI 与物理学科的交叉可能。',
    status: '进行中',
    type: '项目',
    cover: SITE_CONFIG.images.projectCover,
    leader: {
      name: '王五',
      avatar: SITE_CONFIG.images.memberAvatar,
    },
    detail:
      '项目成员将收集并整理经典物理实验数据，构建回归与分类模型，尝试用 AI 方法辅助实验结果分析与误差预测。',
  },
  {
    id: 2,
    title: '社团招新宣讲会',
    summary:
      '面向全校同学的协会介绍与经验分享活动，帮助大家了解智创协会的宗旨与项目。',
    status: '已完结',
    type: '活动',
    cover: SITE_CONFIG.images.projectCover,
    leader: {
      name: '张三',
      avatar: SITE_CONFIG.images.memberAvatar,
    },
    detail:
      '活动包含协会介绍、往届项目展示、成员经验分享与现场答疑，吸引了超过百名同学参与。',
  },
  {
    id: 3,
    title: '生物图像识别入门工作坊',
    summary:
      '面向新成员的工作坊，带领大家用 Python 与开源工具完成第一个图像识别小项目。',
    status: '进行中',
    type: '活动',
    cover: SITE_CONFIG.images.projectCover,
    leader: {
      name: '李四',
      avatar: SITE_CONFIG.images.memberAvatar,
    },
    detail:
      '工作坊分为三次课，内容涵盖环境配置、数据集准备、模型训练与结果可视化。',
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
