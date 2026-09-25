/**
 * 通用组件渲染函数
 * 负责将 config 与 data 中的内容渲染为 HTML。
 */

/**
 * 渲染导航栏
 * @param {string} activeId 当前活动页面 id
 */
function renderNavbar(activeId) {
  const navItems = SITE_CONFIG.nav
    .map(
      (item) => `
      <a
        href="${item.href}"
        class="nav-link ${item.id === activeId ? 'active' : ''}"
      >${item.label}</a>
    `
    )
    .join('');

  return `
    <header class="navbar">
      <div class="container navbar-inner">
        <a href="index.html" class="logo">
          <img src="assets/images/gear-icon.png" alt="" class="logo-icon" />
          <div class="logo-text">
            <span class="logo-zh">${SITE_CONFIG.siteName.zh}</span>
            <span class="logo-en">${SITE_CONFIG.siteName.en}</span>
          </div>
        </a>
        <button class="nav-toggle" aria-label="切换导航" aria-expanded="false">
          <span></span>
          <span></span>
          <span></span>
        </button>
        <nav class="nav-menu">${navItems}</nav>
      </div>
    </header>
  `;
}

/**
 * 渲染页脚
 */
function renderFooter() {
  return `
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-brand">
            <strong>${SITE_CONFIG.siteName.zh}</strong>
            <span>${SITE_CONFIG.siteName.en}</span>
          </div>
          <p class="footer-slogan">${SITE_CONFIG.slogan}</p>
          <p class="footer-copy">&copy; ${new Date().getFullYear()} ${SITE_CONFIG.siteName.zh}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  `;
}

/**
 * 渲染成员卡片
 * @param {object} member 成员数据
 */
function renderMemberCard(member, index = 0) {
  const projects = PROJECTS_DATA.filter((project) => project.leaderId === member.id && project.status === '进行中');
  return `
    <details id="member-${member.id}" class="card member-card reveal reveal-d${Math.min(index % 4 + 1, 4)}" data-department="${member.department}">
      <summary class="member-summary">
      <div class="member-left">
        <div class="card-image">
          <img src="${member.avatar}" alt="${member.name}" loading="lazy" />
        </div>
        <h3 class="card-title">${member.name}</h3>
        <span class="badge">${member.role}</span>
      </div>
      <div class="member-right">
        <p class="card-text">${member.intro}</p>
        <span class="member-toggle"><span class="when-closed">查看负责项目与联系方式</span><span class="when-open">收起详细信息</span><span class="member-toggle-icon" aria-hidden="true">＋</span></span>
      </div>
      </summary>
      <div class="member-expanded">
        <section class="member-projects" aria-labelledby="member-projects-${member.id}">
          <h4 id="member-projects-${member.id}">正在负责 <span class="badge">${projects.length}</span></h4>
          ${projects.length ? `<ul class="member-project-links">${projects.map((project) => `
            <li><a href="projects.html?id=${project.id}"><span>${project.title}</span><span class="member-project-meta">${project.status} <span aria-hidden="true">↗</span></span></a></li>
          `).join('')}</ul>` : '<p class="member-empty">暂无正在负责的项目或活动。</p>'}
        </section>
        ${member.wechat ? `
          <div class="member-contact" role="group" aria-label="联系方式">
            <p class="member-contact-title">联系方式</p>
            <dl class="member-contact-details">
              <dt>微信号</dt>
              <dd>${member.wechat}</dd>
            </dl>
          </div>
        ` : ''}
      </div>
    </details>
  `;
}

/** 负责人信息统一取自核心成员数据，保持双向关联。 */
function renderProjectLeader(project) {
  const member = MEMBERS_DATA.find((item) => item.id === project.leaderId);
  if (!member) return '<p class="member-empty">负责人信息待补充。</p>';
  return `
    <a class="project-leader-card" href="members.html#member-${member.id}" aria-label="查看负责人 ${member.name} 的详细信息">
      <img src="${member.avatar}" alt="" class="leader-avatar" loading="lazy" />
      <span class="leader-info"><span class="leader-label">负责人 · ${member.role}</span><strong>${member.name}</strong></span>
      <span class="leader-arrow" aria-hidden="true">↗</span>
    </a>
  `;
}

/**
 * 渲染项目/活动卡片
 * @param {object} project 项目数据
 */
function renderProjectCard(project) {
  return `
    <article class="card project-card reveal" data-id="${project.id}" data-status="${project.status}" data-type="${project.type}">
      <div class="project-left">
        <h3 class="card-title"><a class="project-title-link" href="projects.html?id=${project.id}">${project.title}</a></h3>
        <span class="badge">${project.status}</span>
      </div>
      <div class="project-right">
        <p class="card-text">${project.summary}</p>
        <a class="project-detail-link" href="projects.html?id=${project.id}">查看项目详情 <span aria-hidden="true">↗</span></a>
        ${renderProjectLeader(project)}
      </div>
    </article>
  `;
}

/**
 * 渲染新闻轮播
 * @param {Array} news 新闻数组
 */
function renderNewsCarousel(news) {
  const slides = news
    .map(
      (item, index) => `
      <div class="carousel-slide ${index === 0 ? 'active' : ''}" data-index="${index}">
        <a href="news-detail.html?id=${item.id}" class="carousel-link">
          <div class="carousel-image">
            <img src="${item.image}" alt="${item.title}" />
          </div>
          <div class="carousel-content">
            <span class="carousel-tag">${item.tag}</span>
            <h2 class="carousel-title">${item.title}</h2>
            <p class="carousel-summary">${item.summary}</p>
            <span class="carousel-date">${item.date}</span>
          </div>
        </a>
      </div>
    `
    )
    .join('');

  const dots = news
    .map(
      (_, index) => `
      <button class="carousel-dot ${index === 0 ? 'active' : ''}" data-index="${index}" aria-label="切换到第 ${index + 1} 条新闻"></button>
    `
    )
    .join('');

  return `
    <section class="news-section">
      <div class="container">
        <h2 class="section-title">最新动态</h2>
        <div class="carousel">
          <div class="carousel-track">${slides}</div>
          <button class="carousel-btn carousel-prev" aria-label="上一条">&#10094;</button>
          <button class="carousel-btn carousel-next" aria-label="下一条">&#10095;</button>
          <div class="carousel-dots">${dots}</div>
        </div>
      </div>
    </section>
  `;
}

/**
 * 渲染文档系列（公开文档）
 * @param {Array} seriesList 系列数组
 */
function renderDocSeries(seriesList) {
  return seriesList
    .map(
      (series) => `
      <div class="series-card">
        <button class="series-header" aria-expanded="false">
          <span class="series-title">${series.title}</span>
          <span class="series-toggle">+</span>
        </button>
        <div class="series-body">
          <p class="series-summary">${series.summary}</p>
          <ul class="doc-list">
            ${series.docs
              .map(
                (doc) => `
              <li class="doc-item">
                <span class="doc-title">${doc.title}</span>
                <div class="doc-actions">
                  <a href="${doc.file}" target="_blank" class="btn btn-sm btn-outline">在线预览</a>
                  <a href="${doc.file}" download class="btn btn-sm">下载</a>
                </div>
              </li>
            `
              )
              .join('')}
          </ul>
        </div>
      </div>
    `
    )
    .join('');
}

/**
 * 渲染不公开文档卡片
 * @param {Array} docs 不公开文档数组
 */
function renderPrivateDocs(docs) {
  return docs
    .map(
      (doc) => `
      <article class="card private-doc-card">
        <div class="card-body">
          <h3 class="card-title">${doc.title}</h3>
          <ul class="outline-list">
            ${doc.outline.map((item) => `<li>${item}</li>`).join('')}
          </ul>
          <span class="private-note">内部资料，暂不公开</span>
        </div>
      </article>
    `
    )
    .join('');
}
