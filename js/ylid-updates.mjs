const WINDOWS_TARGET = 'windows-x86_64';

function validateManifest(manifest) {
  const platform = manifest?.platforms?.[WINDOWS_TARGET];
  if (
    typeof manifest?.version !== 'string' ||
    typeof manifest?.notes !== 'string' ||
    typeof platform?.signature !== 'string' ||
    !platform.signature.trim() ||
    typeof platform?.url !== 'string'
  ) {
    throw new Error('Invalid release manifest');
  }

  const updateUrl = new URL(platform.url);
  if (updateUrl.protocol !== 'https:') {
    throw new Error('Release installer must use HTTPS');
  }
  if (manifest.pub_date && Number.isNaN(new Date(manifest.pub_date).getTime())) {
    throw new Error('Invalid publication date');
  }
  return manifest;
}

async function fetchOne(url, fetchImpl) {
  const response = await fetchImpl(url, { cache: 'no-store' });
  if (!response.ok) throw new Error(`Release manifest HTTP ${response.status}`);
  return validateManifest(await response.json());
}

export async function fetchReleaseManifest({ primaryUrl, backupUrl, fetchImpl = fetch }) {
  const candidates = [
    ['primary', primaryUrl],
    ['backup', backupUrl],
  ].filter(([, url]) => typeof url === 'string' && url.trim());
  let lastError = null;

  for (const [source, url] of candidates) {
    try {
      return { manifest: await fetchOne(url, fetchImpl), source };
    } catch (error) {
      lastError = error;
    }
  }
  throw new Error(`Unable to load a valid release manifest: ${lastError?.message ?? 'no endpoint configured'}`);
}

if (typeof window !== 'undefined') {
  window.YLID_UPDATES = { fetchReleaseManifest };
}
