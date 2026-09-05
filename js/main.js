/**
 * 页面级交互逻辑
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initFooter();
  initMobileMenu();
  initNavbarScroll();

  const page = document.body.dataset.page;
  if (page === 'index') initHomePage();
  if (page === 'members') initMembersPage();
  if (page === 'projects') initProjectsPage();
  if (page === 'docs') initDocsPage();
  if (page === 'news-detail') initNewsDetailPage();
  if (page === 'ylid-ai') initYlidAiPage();

  initScrollAnimations();
});

/**
 * 初始化导航栏
 */
function initNavbar() {
  const page = document.body.dataset.page || 'index';
  const nav = document.getElementById('navbar');
  if (nav) nav.innerHTML = renderNavbar(page);
}

/**
 * 初始化页脚
 */
function initFooter() {
  const footer = document.getElementById('footer');
  if (footer) footer.innerHTML = renderFooter();
}

/**
 * 移动端菜单切换
 */
function initMobileMenu() {
  document.addEventListener('click', (e) => {
    const toggle = e.target.closest('.nav-toggle');
    if (!toggle) return;

    const menu = document.querySelector('.nav-menu');
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    menu.classList.toggle('open');
  });
}

/**
 * 首页逻辑：打字机 + 轮播 + 入口卡片
 */
function initHomePage() {
  initTypewriter();

  const carouselContainer = document.getElementById('news-carousel');
  if (carouselContainer) {
    carouselContainer.innerHTML = renderNewsCarousel(NEWS_DATA);
    initCarousel();
  }
}

/**
 * 打字机效果
 */
function initTypewriter() {
  const description = document.querySelector('.typewriter-desc');
  if (!description) return;

  const speed = 24;

  async function typeElement(el, delay = 0) {
    const text = el.dataset.typeText || '';
    el.textContent = '';
    await new Promise((r) => setTimeout(r, delay));
    el.classList.add('typing');

    for (let i = 0; i < text.length; i++) {
      el.textContent += text[i];
      await new Promise((r) => setTimeout(r, speed));
    }

    el.classList.remove('typing');
    el.classList.add('typed');
  }

  async function run() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      description.textContent = description.dataset.typeText || '';
      document.querySelector('.hero-actions')?.classList.add('visible');
      return;
    }

    // 品牌信息立即呈现，只让介绍语承担轻量的动态效果。
    await typeElement(description, 280);

    // 说明完成后再显示按钮，保持行动顺序清晰。
    const actions = document.querySelector('.hero-actions');
    if (actions) {
      actions.classList.add('visible');
    }
  }

  run();
}

/**
 * 轮播交互
 */
function initCarousel() {
  const track = document.querySelector('.carousel-track');
  const dots = document.querySelectorAll('.carousel-dot');
  const prevBtn = document.querySelector('.carousel-prev');
  const nextBtn = document.querySelector('.carousel-next');
  if (!track) return;

  const total = dots.length;
  let current = 0;
  let timer = null;

  function show(index) {
    track.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === index));
    current = index;
  }

  function next() {
    show((current + 1) % total);
  }

  function prev() {
    show((current - 1 + total) % total);
  }

  function startAuto() {
    stopAuto();
    timer = setInterval(next, 5000);
  }

  function stopAuto() {
    if (timer) clearInterval(timer);
  }

  nextBtn.addEventListener('click', () => {
    next();
    startAuto();
  });

  prevBtn.addEventListener('click', () => {
    prev();
    startAuto();
  });

  dots.forEach((dot) => {
    dot.addEventListener('click', () => {
      show(parseInt(dot.dataset.index, 10));
      startAuto();
    });
  });

  const carousel = document.querySelector('.carousel');
  carousel.addEventListener('mouseenter', stopAuto);
  carousel.addEventListener('mouseleave', startAuto);

  show(0);
  startAuto();
}

/**
 * 成员页面逻辑
 */
function initMembersPage() {
  const container = document.getElementById('members-grid');
  if (container) {
    container.innerHTML = MEMBERS_DATA.map((m, i) => renderMemberCard(m, i)).join('');
  }
}

/**
 * 项目页面逻辑
 */
function initProjectsPage() {
  const container = document.getElementById('projects-grid');
  const detailSection = document.getElementById('project-detail');

  if (container) {
    container.innerHTML = PROJECTS_DATA.map(renderProjectCard).join('');
  }

  const params = new URLSearchParams(window.location.search);
  const projectId = params.get('id');
  if (projectId && detailSection) {
    const project = PROJECTS_DATA.find((p) => p.id === parseInt(projectId, 10));
    if (project) {
      detailSection.innerHTML = `
        <div class="container">
          <a href="projects.html" class="back-link">&larr; 返回项目列表</a>
          <article class="detail-card">
            <div class="detail-header">
              <img src="${project.cover}" alt="${project.title}" />
              <div>
                <h2>${project.title}</h2>
                <span class="badge">${project.status}</span>
                <span class="badge badge-outline">${project.type}</span>
              </div>
            </div>
            <p>${project.detail}</p>
            <div class="project-leader">
              <img src="${project.leader.avatar}" alt="${project.leader.name}" class="leader-avatar" />
              <span>项目负责人：${project.leader.name}</span>
            </div>
          </article>
        </div>
      `;
      detailSection.style.display = 'block';
      if (container) container.closest('section').style.display = 'none';
    }
  }

}

/**
 * 文档页面逻辑
 */
function initDocsPage() {
  const publicContainer = document.getElementById('public-docs');
  const privateContainer = document.getElementById('private-docs');

  if (publicContainer) {
    publicContainer.innerHTML = renderDocSeries(DOC_SERIES_DATA);
  }

  if (privateContainer) {
    privateContainer.innerHTML = renderPrivateDocs(PRIVATE_DOCS_DATA);
  }

  document.addEventListener('click', (e) => {
    const header = e.target.closest('.series-header');
    if (!header) return;

    const body = header.nextElementSibling;
    const expanded = header.getAttribute('aria-expanded') === 'true';
    header.setAttribute('aria-expanded', String(!expanded));
    body.classList.toggle('open');
    header.querySelector('.series-toggle').textContent = expanded ? '+' : '−';
  });
}

/**
 * 新闻详情页逻辑
 */
function initNewsDetailPage() {
  const container = document.getElementById('news-content');
  if (!container) return;

  const params = new URLSearchParams(window.location.search);
  const newsId = params.get('id');
  const news = NEWS_DATA.find((n) => n.id === parseInt(newsId, 10));

  if (!news) {
    container.innerHTML = '<p>未找到该新闻。</p>';
    return;
  }

  container.innerHTML = `
    <article class="detail-card">
      <div class="detail-header">
        <img src="${news.image}" alt="${news.title}" />
        <div>
          <span class="badge">${news.tag}</span>
          <span class="news-date">${news.date}</span>
          <h2>${news.title}</h2>
        </div>
      </div>
      <p>${news.content}</p>
      <a href="index.html" class="btn">返回首页</a>
    </article>
  `;
}

/**
 * Load the public YLID AI release manifest for the product download page.
 * The desktop client reads the same file, keeping the displayed version and
 * the auto-update target in sync.
 */
async function initYlidAiPage() {
  const status = document.getElementById('ylid-release-status');
  const version = document.getElementById('ylid-version');
  const date = document.getElementById('ylid-release-date');
  const notes = document.getElementById('ylid-release-notes');
  const download = document.getElementById('ylid-download');
  if (!status || !version || !date || !notes || !download) return;

  function unavailable(message) {
    status.textContent = message;
    status.classList.add('is-error');
    version.textContent = '—';
    date.textContent = '—';
    notes.textContent = '发布信息尚未就绪。';
    download.setAttribute('aria-disabled', 'true');
    download.removeAttribute('href');
  }

  try {
    const response = await fetch('ylid-ai/updates/latest.json', {
      cache: 'no-store',
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const manifest = await response.json();
    const platform = manifest?.platforms?.['windows-x86_64'];
    const updateUrl = platform?.url;
    if (
      typeof manifest?.version !== 'string' ||
      typeof manifest?.notes !== 'string' ||
      typeof updateUrl !== 'string' ||
      !updateUrl.startsWith('https://')
    ) {
      throw new Error('Invalid release manifest');
    }

    version.textContent = `v${manifest.version.replace(/^v/, '')}`;
    notes.textContent = manifest.notes || '本版本暂未提供更新说明。';
    const publishedAt = manifest.pub_date ? new Date(manifest.pub_date) : null;
    if (publishedAt && Number.isNaN(publishedAt.getTime())) {
      throw new Error('Invalid publication date');
    }
    date.textContent = publishedAt
      ? new Intl.DateTimeFormat('zh-CN', { dateStyle: 'long' }).format(publishedAt)
      : '刚刚发布';
    download.href = updateUrl;
    download.removeAttribute('aria-disabled');
    status.textContent = '稳定版已准备就绪';
  } catch {
    unavailable('暂时无法获取最新版本，请稍后重试。');
  }
}

/**
 * 滚动触发动画 — 使用 IntersectionObserver
 */
function initScrollAnimations() {
  const revealElements = document.querySelectorAll('.reveal');
  if (!revealElements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  revealElements.forEach((el) => observer.observe(el));
}

/**
 * 导航栏滚动效果
 */
function initNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  const onScroll = () => {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}
