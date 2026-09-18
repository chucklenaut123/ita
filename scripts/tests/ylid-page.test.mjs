import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import vm from 'node:vm';

import { fetchReleaseManifest } from '../../js/ylid-updates.mjs';

const config = readFileSync(new URL('../../js/config.js', import.meta.url), 'utf8');
const main = readFileSync(new URL('../../js/main.js', import.meta.url), 'utf8');

function page(fetchImpl) {
  const elements = new Map();
  for (const id of ['status', 'version', 'date', 'notes', 'download']) {
    elements.set(`ylid-${id === 'status' ? 'release-status' : id === 'date' ? 'release-date' : id === 'notes' ? 'release-notes' : id}`, {
      textContent: '',
      attributes: { 'aria-disabled': 'true' },
      classList: { add() {} },
      setAttribute(name, value) { this.attributes[name] = value; },
      removeAttribute(name) { delete this.attributes[name]; },
    });
  }
  const context = vm.createContext({
    document: {
      addEventListener() {},
      getElementById: (id) => elements.get(id),
    },
    window: {
      YLID_UPDATES: {
        fetchReleaseManifest: (options) => fetchReleaseManifest({ ...options, fetchImpl }),
      },
    },
  });
  vm.runInContext(`${config}\n${main}`, context);
  return { elements, load: () => vm.runInContext('initYlidAiPage()', context) };
}

test('download page uses the current client endpoint and published version', async () => {
  const calls = [];
  const installer = 'https://ylidai-updates.pages.dev/updates/YLIDAI_0.1.5_x64-setup.exe';
  const { elements, load } = page(async (url) => {
    calls.push(url);
    return {
      ok: true,
      json: async () => ({
        version: '0.1.5',
        notes: 'Published release',
        pub_date: '2026-09-11T14:40:57.011Z',
        platforms: { 'windows-x86_64': { signature: 'signature', url: installer } },
      }),
    };
  });
  await load();
  assert.deepEqual(calls, ['https://ylidai-updates.pages.dev/updates/latest.json']);
  assert.equal(elements.get('ylid-version').textContent, 'v0.1.5');
  assert.equal(elements.get('ylid-release-notes').textContent, 'Published release');
  assert.match(elements.get('ylid-release-date').textContent, /2026/);
  assert.equal(elements.get('ylid-download').href, installer);
  assert.equal(elements.get('ylid-download').attributes['aria-disabled'], undefined);
  assert.equal(elements.get('ylid-release-status').textContent, '稳定版已准备就绪');
});

test('download page shows an error and disables downloads when the source fails', async () => {
  const { elements, load } = page(async () => { throw new Error('Network unavailable'); });
  await load();
  assert.equal(elements.get('ylid-download').attributes['aria-disabled'], 'true');
  assert.equal(elements.get('ylid-download').href, undefined);
  assert.equal(elements.get('ylid-version').textContent, '—');
  assert.match(elements.get('ylid-release-status').textContent, /暂时无法/);
});
