# 智创协会（InTech Association）官网设计规划

## 一、Summary

为零代码基础起点，构建一个基于 **纯 HTML/CSS/JS** 的多页面静态官网，部署在 **Cloudflare Pages** 上。网站以暗色为主、简约舒适，包含：首页新闻滚动栏、核心成员、项目与活动、教程与文档四大入口模块。所有图片默认使用 `WIP.jpg`，并通过 `config.js` 集中管理，方便后续手动替换。

---

## 二、Current State Analysis

- 工作目录目前仅包含一张占位图 `WIP.jpg`，没有任何项目代码、配置文件或目录结构。
- 已通过图片获取社团关键信息：
  - **我们的初衷**：AI 与各学科的融合趋势，帮助学生掌握 AI 基础知识、跨学科学习，培养创新与实践能力，并为已有基础的学生提供交流平台。
  - **宗旨**：知识共享，共同进步；构建开放、包容的学习团队。
  - **精神**：自我驱动、追求卓越；实践导向、注重应用。
- 用户已确认：纯 HTML/CSS/JS、仓库内静态数据、多页面网站。

---

## 三、Proposed Changes

### 3.1 目录结构

```
OfficialWebsite/
├── index.html                 # 首页
├── members.html               # 社团核心成员
├── projects.html              # 项目与活动
├── docs.html                  # 教程与文档
├── about.html                 # 关于我们（初衷 / 宗旨 / 精神）
├── css/
│   ├── base.css               # 变量、重置、全局样式
│   ├── components.css         # 导航、页脚、卡片、按钮等通用组件
│   └── pages.css              # 各页面特有样式
├── js/
│   ├── config.js              # 图片/文本配置中心
│   ├── data.js                # 成员、项目、新闻、文档静态数据
│   ├── components.js          # 导航、页脚、卡片渲染函数
│   └── main.js                # 页面级交互（轮播、过滤等）
├── assets/
│   └── images/
│       └── WIP.jpg            # 占位图（后续替换为真实图片）
└── documents/                 # 可下载/预览的公开文档
    └── example-tutorial.pdf
```

### 3.2 文件与修改说明

#### 1) `index.html`（首页）
- **What**：官网入口页。
- **Why**：首页承担最重要的第一印象，需要最醒目地展示新闻、并引导到各模块。
- **How**：
  - 顶部固定暗色导航栏，包含 Logo、首页、核心成员、项目与活动、教程与文档、关于我们。
  - Hero 区域展示协会名称“智创协会 / InTech Association”和一句简短口号。
  - 紧接着是**全宽大滚动新闻栏**：横向自动轮播，每条新闻展示封面图、标题、摘要、标签（新项目 / 新文创 / 新通知）。
  - 新闻卡片可点击，进入 `index.html` 内预留的**新闻详情锚点/弹层**（先实现为静态详情区，点击后替换内容），也可单独做 `news-detail.html?id=xxx`。
  - 下方设置三个醒目的入口区：核心成员、项目与活动、教程与文档，使用大图卡片或图标卡片，点击进入对应页面。
  - 页脚：版权信息、社交媒体占位链接。

#### 2) `members.html`（社团核心成员）
- **What**：展示核心成员列表。
- **Why**：用户明确要求“容易被发现的位置”和卡片展示。
- **How**：
  - 从 `data.js` 读取成员数组，渲染为响应式网格卡片。
  - 每张卡片包含：头像（`WIP.jpg`）、姓名、职位/角色、简短介绍。
  - 支持按届别/部门分类筛选（预留交互）。

#### 3) `projects.html`（项目与活动）
- **What**：展示社团项目和活动。
- **Why**：突出社团的实践成果。
- **How**：
  - 每个项目/活动一张卡片，包含项目封面图、标题、简介、项目负责人信息（头像+姓名）。
  - 项目卡片点击后弹出/跳转详情页，展示完整描述、时间线、参与成员、相关链接。
  - 支持按“进行中 / 已完结 / 活动”分类标签筛选。

#### 4) `docs.html`（教程与文档）
- **What**：教程与文档入口。
- **Why**：公开分享与不公开文档需要不同呈现方式。
- **How**：
  - 公开文档按“系列”组织，每个系列一个折叠/展开面板：
    - 系列标题、简介。
    - 系列内文档列表：标题、下载按钮、在线预览按钮（PDF 用浏览器内置预览，Markdown 用简易渲染）。
  - 不公开文档以卡片形式呈现，仅显示标题和大纲（不可预览/下载）。
  - 数据来自 `data.js` 中的 `docSeries` 和 `privateDocs`。

#### 5) `about.html`（关于我们）
- **What**：展示社团初衷、宗旨与精神。
- **Why**：图片中已提供这部分内容，作为官网必不可少的信息页。
- **How**：
  - 三个区块分别呈现“我们的初衷”“我们的宗旨”“我们的精神”。
  - 使用简洁的卡片或分栏布局，避免信息过载。

#### 6) `css/base.css`
- **What**：全局设计令牌。
- **Why**：统一暗色主题和间距字体。
- **How**：
  - 定义 CSS 变量：
    - `--bg-primary: #0f172a`（深蓝黑背景）
    - `--bg-secondary: #1e293b`（卡片背景）
    - `--text-primary: #f8fafc`（主文字）
    - `--text-secondary: #94a3b8`（次级文字）
    - `--accent: #38bdf8`（强调色，科技蓝）
    - `--accent-hover: #0ea5e9`
  - 全局重置、字体（系统字体栈 + 思源黑体/Noto Sans SC 备选）、平滑滚动。

#### 7) `css/components.css`
- **What**：可复用组件样式。
- **Why**：保持各页面视觉一致。
- **How**：
  - 导航栏、页脚、按钮、卡片、徽章、轮播容器、系列折叠面板等。

#### 8) `css/pages.css`
- **What**：各页面特有微调。
- **Why**：在统一组件基础上做页面级布局差异。

#### 9) `js/config.js`
- **What**：图片与常量配置中心。
- **Why**：用户要求“写一个 config 文件，方便手动改每张图片”。
- **How**：
  - 暴露一个全局对象 `SITE_CONFIG`，例如：
    ```js
    const SITE_CONFIG = {
      siteName: { zh: '智创协会', en: 'InTech Association' },
      images: {
        hero: 'assets/images/WIP.jpg',
        news: ['assets/images/WIP.jpg', 'assets/images/WIP.jpg'],
        memberAvatar: 'assets/images/WIP.jpg',
        projectCover: 'assets/images/WIP.jpg',
        docCover: 'assets/images/WIP.jpg',
      },
      socials: {
        github: '',
        email: '',
      }
    };
    ```
  - 所有页面渲染图片时均从此文件读取路径。

#### 10) `js/data.js`
- **What**：静态数据文件。
- **Why**：内容在仓库内维护，无需后端。
- **How**：
  - `news`：新闻列表（id、标题、摘要、内容、标签、图片、日期）。
  - `members`：成员列表（姓名、职位、介绍、头像）。
  - `projects`：项目/活动列表（标题、简介、负责人、封面、状态、详情）。
  - `docSeries`：公开文档系列（系列名、简介、文档数组）。
  - `privateDocs`：不公开文档列表（标题、大纲）。

#### 11) `js/components.js`
- **What**：通用渲染函数。
- **Why**：避免重复 HTML，保持代码整洁。
- **How**：
  - `renderNavbar()`、`renderFooter()`
  - `renderMemberCard(member)`、`renderProjectCard(project)`
  - `renderNewsCarousel(news)`、`renderDocSeries(series)`

#### 12) `js/main.js`
- **What**：页面级交互逻辑。
- **Why**：实现轮播、筛选、折叠、新闻详情切换等。
- **How**：
  - 首页新闻轮播：自动播放 + 左右箭头 + 指示点。
  - 成员/项目分类筛选按钮。
  - 文档系列展开/收起。
  - 移动端菜单切换。

### 3.3 部署与仓库

- **GitHub 仓库**：新建仓库（建议命名为 `intech-website` 或 `智创协会官网`），将上述文件提交。
- **Cloudflare Pages**：
  - 连接 GitHub 仓库。
  - 构建设置：
    - Framework preset: **None**
    - Build command: 空（纯静态站点）
    - Build output directory: `/`（根目录）
  - 部署后，每次推送到主分支自动重新构建。

---

## 四、Assumptions & Decisions

1. **技术栈**：用户已选择纯 HTML/CSS/JS + 静态数据 + 多页面，不引入框架和构建工具。
2. **内容维护**：成员、项目、新闻、文档均通过 `js/data.js` 维护；图片路径通过 `js/config.js` 维护。
3. **图片策略**：所有图片默认使用 `assets/images/WIP.jpg`；后续替换时只需修改 `config.js` 中的路径或覆盖同名图片。
4. **公开文档预览**：PDF 直接通过 `<a target="_blank">` 让浏览器打开；Markdown 通过简易 JS 渲染为 HTML。不公开文档仅展示标题和大纲，无下载链接。
5. **新闻详情**：先做成本地静态详情展示（如 `news-detail.html?id=1` 读取 `data.js` 渲染），预留扩展为外部 CMS 的接口结构。
6. **响应式**：默认适配桌面和移动端，导航在移动端折叠为汉堡菜单。
7. **关于我们**：用户图片已提供初衷/宗旨/精神内容，作为独立页面 `about.html` 呈现，保证首页不过载。

---

## 五、Verification Steps

1. 在本地用任意静态服务器（如 VS Code Live Server、Python `http.server`）打开 `index.html`。
2. 检查首页新闻轮播是否正常自动播放，点击新闻卡片是否跳转到详情。
3. 检查导航栏的三个入口是否能正确跳转到 `members.html`、`projects.html`、`docs.html`。
4. 在 `members.html`、`projects.html`、`docs.html` 检查卡片是否正确渲染，图片是否均为 `WIP.jpg`。
5. 修改 `js/config.js` 中的某张图片路径，刷新页面确认图片已变更。
6. 将代码推送到 GitHub，连接 Cloudflare Pages，确认能成功构建并访问线上地址。
