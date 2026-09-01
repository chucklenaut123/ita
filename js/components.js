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
          <span class="logo-zh">${SITE_CONFIG.siteName.zh}</span>
          <span class="logo-en">${SITE_CONFIG.siteName.en}</span>
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
  return `
    <article class="card member-card reveal reveal-d${Math.min(index % 4 + 1, 4)}" data-department="${member.department}">
      <div class="member-left">
        <div class="card-image">
          <img src="${member.avatar}" alt="${member.name}" loading="lazy" />
        </div>
        <h3 class="card-title">${member.name}</h3>
        <span class="badge">${member.role}</span>
      </div>
      <div class="member-right">
        <p class="card-text">${member.intro}</p>
      </div>
    </article>
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
        <h3 class="card-title">${project.title}</h3>
        <span class="badge">${project.status}</span>
      </div>
      <div class="project-right">
        <p class="card-text">${project.summary}</p>
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
