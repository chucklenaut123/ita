/**
 * 静态数据文件
 * 所有需要展示的内容（新闻、成员、项目、文档）均在此维护。
 * 修改后刷新页面即可生效。
 */

// 新闻数据
const NEWS_DATA = [
  {
    id: 1,
    title: 'YLIDAI正在进行内部测试',
    summary: '我们开发的AI学习辅助工具“YLIDAI”正在进行内部测试，现在仍可加入我们的测试团队，如果有兴趣请联系项目贡献者-在“核心成员”中找到“Chucklenaut”或“x-x”即可获得贡献者联系方式。',
    content:
      '我们开发的AI学习辅助工具“YLIDAI”正在进行内部测试，现在仍可加入我们的测试团队，如果有兴趣请联系项目贡献者-在<a href="members.html">“核心成员”</a>中找到“Chucklenaut”或“x-x”即可获得贡献者联系方式。',
    tag: '内部测试',
    date: '2026-10-20',
    image: SITE_CONFIG.images.news[0],
    imageClass: 'news-icon',
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
  {
    id: 3,
    name: 'x-x',
    role: '重要贡献人',
    department: '贡献者',
    avatar: 'assets/images/Mac贡献者头像.jpg',
    intro: '独立游戏创作者，YLIDAI Mac版本主要贡献人',
    wechat: 'caca233333',
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

// 教学资料 PDF。新增讲义时，在对应系列添加标题和文件路径。
const DOC_SERIES_DATA = [
  {
    id: 'course-guide',
    title: '学习地图与公共附录',
    summary: '先了解课程路线，学习过程中可随时查阅术语表。',
    docs: [
      {
        id: 'course-map',
        title: '学习地图',
        file: 'assets/教学资料/PDF/00_课程说明与公共附录/学习地图.pdf',
      },
      {
        id: 'c1-terms',
        title: 'C1 中英文术语速查表',
        file: 'assets/教学资料/PDF/00_课程说明与公共附录/C1_中英文术语速查表.pdf',
      },
    ],
  },
  {
    id: 'ml-neural-networks',
    title: '机器学习与神经网络入门',
    summary: '从 AI 基础和模型训练，逐步学习神经网络、大语言模型与 Transformer。',
    docs: [
      {
        id: 'a1',
        title: 'A1 AI、ML、DL 与伦理',
        file: 'assets/教学资料/PDF/A_机器学习与神经网络入门/A1_AI_ML_DL与伦理.pdf',
      },
      {
        id: 'a2',
        title: 'A2 数学基础、线性回归与梯度下降',
        file: 'assets/教学资料/PDF/A_机器学习与神经网络入门/A2_数学基础_线性回归与梯度下降.pdf',
      },
      {
        id: 'a3',
        title: 'A3 模型训练流程与数据集',
        file: 'assets/教学资料/PDF/A_机器学习与神经网络入门/A3_模型训练流程与数据集.pdf',
      },
      {
        id: 'a4-matrix',
        title: 'A4 神经网络：从神经元到矩阵运算',
        file: 'assets/教学资料/PDF/A_机器学习与神经网络入门/A4_神经网络_从神经元到矩阵运算.pdf',
      },
      {
        id: 'a4-activation',
        title: 'A4 神经网络：激活函数与 SGD',
        file: 'assets/教学资料/PDF/A_机器学习与神经网络入门/A4_神经网络_激活函数与SGD.pdf',
      },
      {
        id: 'a5',
        title: 'A5 从下一个词元理解大语言模型',
        file: 'assets/教学资料/PDF/A_机器学习与神经网络入门/A5_从下一个词元理解大语言模型.pdf',
      },
      {
        id: 'a6',
        title: 'A6 自注意力如何让文字互相提供线索',
        file: 'assets/教学资料/PDF/A_机器学习与神经网络入门/A6_自注意力如何让文字互相提供线索.pdf',
      },
      {
        id: 'a7',
        title: 'A7 从自注意力到 Transformer',
        file: 'assets/教学资料/PDF/A_机器学习与神经网络入门/A7_从自注意力到Transformer.pdf',
      },
    ],
  },
  {
    id: 'ai-programming',
    title: 'AI 编程入门',
    summary: '了解 AI 编程的使用边界、API 基础，以及 Agent 的工作原理与实践。',
    docs: [
      {
        id: 'b1',
        title: 'B1 AI 编程基础、边界与 API',
        file: 'assets/教学资料/PDF/B_AI编程入门/B1_AI编程基础_边界与API.pdf',
      },
      {
        id: 'b2',
        title: 'B2 Agent 原理与 TraeWork 实践',
        file: 'assets/教学资料/PDF/B_AI编程入门/B2_Agent原理与TraeWork实践.pdf',
      },
    ],
  },
];
