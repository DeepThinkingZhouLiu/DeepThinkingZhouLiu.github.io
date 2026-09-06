import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { preview } from 'vite';
import config from '../preview.config.ts';

test('预览入口自动跳转，静态资源与不存在的路径保持原有行为', async (t) => {
  const root = await mkdtemp(join(tmpdir(), 'research-world-preview-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  await mkdir(join(root, 'dist', '_astro'), { recursive: true });
  await writeFile(
    join(root, 'dist', 'index.html'),
    '<title>Research Room</title>',
  );
  await writeFile(
    join(root, 'dist', '_astro', 'scene.js'),
    'export const ready = true;',
  );
  const server = await preview({
    ...config,
    configFile: false,
    root,
    logLevel: 'silent',
    preview: { ...config.preview, host: '127.0.0.1', port: 0 },
  });
  t.after(
    () =>
      new Promise<void>((resolve, reject) => {
        server.httpServer.close((error) => (error ? reject(error) : resolve()));
      if ('closeAllConnections' in server.httpServer) {
        server.httpServer.closeAllConnections();
      }
      }),
  );
  const address = server.httpServer.address();
  assert.ok(address && typeof address !== 'string');
  const origin = `http://127.0.0.1:${address.port}`;

  for (const entry of ['/', '/index.html', '/world']) {
    const response = await fetch(`${origin}${entry}?from=preview`, {
      redirect: 'manual',
    });
    assert.equal(response.status, 302, entry);
    assert.equal(
      response.headers.get('location'),
      '/world/?from=preview',
      entry,
    );
  }
  for (const entry of ['/', '/world', '/world/']) {
    const response = await fetch(origin + entry);
    assert.equal(response.status, 200, entry);
    assert.equal(new URL(response.url).pathname, '/world/', entry);
    assert.match(await response.text(), /Research Room/);
  }
  const script = await fetch(`${origin}/world/_astro/scene.js`);
  assert.equal(script.status, 200);
  assert.match(script.headers.get('content-type') ?? '', /javascript/);
  assert.match(await script.text(), /ready = true/);
  assert.equal((await fetch(`${origin}/world/not-a-page/`)).status, 404);
});
