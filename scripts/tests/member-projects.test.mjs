import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import vm from 'node:vm';

function setup(elements = new Map(), hash = '') {
  const listeners = {};
  const context = vm.createContext({
    URLSearchParams,
    document: { addEventListener() {}, getElementById: (id) => elements.get(id) },
    window: { location: { hash, search: '?id=1' }, addEventListener: (name, fn) => { listeners[name] = fn; } },
  });
  for (const file of ['config', 'data', 'components', 'main']) {
    vm.runInContext(readFileSync(new URL(`../../js/${file}.js`, import.meta.url), 'utf8'), context);
  }
  return { run: (code) => vm.runInContext(code, context), context, listeners };
}

test('members and project leaders link in both directions using IDs', () => {
  const { run } = setup();
  assert.equal(run('PROJECTS_DATA.every(p => MEMBERS_DATA.some(m => m.id === p.leaderId))'), true);
  assert.match(run('renderMemberCard(MEMBERS_DATA[0])'), /href="projects.html\?id=1"/);
  assert.match(run('renderProjectCard(PROJECTS_DATA[0])'), /href="members.html#member-1"/);
  run('MEMBERS_DATA[0].name = "Updated name"');
  assert.match(run('renderProjectLeader(PROJECTS_DATA[0])'), /Updated name/);
  assert.match(run('renderMemberCard(MEMBERS_DATA[0])'), /href="projects.html\?id=1"/);
});

test('native disclosure includes contact and only active projects for its member', () => {
  const { run } = setup();
  const html = run('renderMemberCard(MEMBERS_DATA[0])');
  assert.match(html, /<details id="member-1"/);
  assert.match(html, /<summary class="member-summary">/);
  assert.match(html, /Shabby2237/);
  assert.match(run('renderMemberCard(MEMBERS_DATA[1])'), /暂无正在负责/);
  run('PROJECTS_DATA[0].status = "已完结"');
  assert.doesNotMatch(run('renderMemberCard(MEMBERS_DATA[0])'), /href="projects.html/);
  assert.match(run('renderProjectLeader({ leaderId: 999 })'), /负责人信息待补充/);
});

test('member anchor opens, focuses and scrolls on arrival and hash change', () => {
  let focused = false;
  let scrolled = false;
  const card = { open: false, matches: () => true, classList: { add() {} },
    querySelector: () => ({ focus: () => { focused = true; } }),
    scrollIntoView: () => { scrolled = true; } };
  const { run, context, listeners } = setup(new Map([['member-1', card]]), '#member-1');
  run('initMembersPage()');
  assert.equal(card.open && focused && scrolled, true);
  card.open = false;
  context.window.location.hash = '#member-999';
  assert.doesNotThrow(() => listeners.hashchange());
  assert.equal(card.open, false);
  context.window.location.hash = '#member-1';
  listeners.hashchange();
  assert.equal(card.open, true);
});

test('project detail renders the linked leader and hides the list', () => {
  const section = { style: {} };
  const detail = { style: {} };
  const grid = { closest: () => section };
  const { run } = setup(new Map([['projects-grid', grid], ['project-detail', detail]]));
  run('initProjectsPage()');
  assert.match(detail.innerHTML, /href="members.html#member-1"/);
  assert.match(detail.innerHTML, /社团官网维护/);
  assert.equal(detail.style.display, 'block');
  assert.equal(section.style.display, 'none');
});
