/**
 * 站点全局配置文件
 * 所有图片路径、站点名称、联系方式均集中在此维护。
 * 后续替换图片时，只需修改本文件中的路径，或保持路径不变直接覆盖同名图片。
 */

const SITE_CONFIG = {
  // 站点名称
  siteName: {
    zh: '智创协会',
    en: 'InTech Association',
  },
  slogan: '知识共享，共同进步',
  description:
    '智创协会致力于帮助学生在人工智能领域建立认知、培养创新与实践能力，打造开放包容的学习团队。',

  // 图片配置
  images: {
    hero: 'assets/images/WIP.jpg',
    news: [
      'assets/images/WIP.jpg',
      'assets/images/WIP.jpg',
      'assets/images/WIP.jpg',
    ],
    memberAvatar: 'assets/images/WIP.jpg',
    projectCover: 'assets/images/WIP.jpg',
    docCover: 'assets/images/WIP.jpg',
    about: 'assets/images/WIP.jpg',
  },

  // 社交与联系方式（按需填写）
  socials: {
    github: '',
    email: '',
    wechat: '',
    bilibili: '',
  },

  // 导航配置
  nav: [
    { label: '首页', href: 'index.html', id: 'index' },
    { label: '核心成员', href: 'members.html', id: 'members' },
    { label: '项目与活动', href: 'projects.html', id: 'projects' },
    { label: '教程与文档', href: 'docs.html', id: 'docs' },
    { label: '关于我们', href: 'about.html', id: 'about' },
  ],
};
