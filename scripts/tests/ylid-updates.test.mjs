import assert from 'node:assert/strict';
import test from 'node:test';

import { fetchReleaseManifest } from '../../js/ylid-updates.mjs';

function manifest(url = 'https://intechassociation.org/ylid-ai/updates/YLIDAI_0.1.3_x64-setup.exe') {
  return {
    version: '0.1.3',
    notes: 'Release notes',
    pub_date: '2026-09-04T00:00:00.000Z',
    platforms: {
      'windows-x86_64': {
        signature: 'trusted-signature',
        url,
      },
    },
  };
}

function response({ ok = true, body = manifest(), status = 200 } = {}) {
  return {
    ok,
    status,
    json: async () => body,
  };
}

test('uses the primary manifest when it is valid', async () => {
  const calls = [];
  const result = await fetchReleaseManifest({
    primaryUrl: 'primary.json',
    backupUrl: 'backup.json',
    fetchImpl: async (url) => {
      calls.push(url);
      return response();
    },
  });

  assert.equal(result.source, 'primary');
  assert.deepEqual(calls, ['primary.json']);
});

test('uses the backup manifest after a primary HTTP failure', async () => {
  const calls = [];
  const result = await fetchReleaseManifest({
    primaryUrl: 'primary.json',
    backupUrl: 'backup.json',
    fetchImpl: async (url) => {
      calls.push(url);
      return url === 'primary.json' ? response({ ok: false, status: 404 }) : response();
    },
  });

  assert.equal(result.source, 'backup');
  assert.deepEqual(calls, ['primary.json', 'backup.json']);
});

test('uses the backup manifest after invalid primary data', async () => {
  const result = await fetchReleaseManifest({
    primaryUrl: 'primary.json',
    backupUrl: 'backup.json',
    fetchImpl: async (url) =>
      url === 'primary.json'
        ? response({ body: manifest('http://insecure.example/update.exe') })
        : response(),
  });

  assert.equal(result.source, 'backup');
});

test('fails when every configured manifest is unavailable', async () => {
  await assert.rejects(
    fetchReleaseManifest({
      primaryUrl: 'primary.json',
      backupUrl: 'backup.json',
      fetchImpl: async () => response({ ok: false, status: 404 }),
    }),
    /release manifest/i,
  );
});
