import { defineConfig } from 'vite';
import astroConfig from './astro.config.mjs';

const base = `${(astroConfig.base ?? '/').replace(/\/$/, '')}/`;

export default defineConfig({
  base,
  appType: 'mpa',
  preview: { host: '0.0.0.0', port: 4322, strictPort: true },
  plugins: [
    {
      name: 'research-world-preview-entry',
      configurePreviewServer(server) {
        // Vite 会将根路径跳转到 base；这里补全没有末尾斜杠的入口。
        server.middlewares.use((request, response, next) => {
          const url = request.url ?? '';
          const pathname = url.split('?')[0];
          if (base !== '/' && pathname === base.slice(0, -1)) {
            response.writeHead(302, {
              Location: base + url.slice(pathname.length),
            });
            response.end();
            return;
          }
          next();
        });
      },
    },
  ],
});
