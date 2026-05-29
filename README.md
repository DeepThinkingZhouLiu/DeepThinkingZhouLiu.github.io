# DeepThinkingZhouLiu.github.io

Personal homepage for Zhou Liu, built as a GitHub Pages user site.

## Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS v4

## Local Development

This project expects Node `22.22.2` locally.

```bash
cd projs/01-code-apps/DeepThinkingZhouLiu.github.io
export PATH=/cloud/cloud-ssd1/workspace/liuzhou/.local/node-v22.22.2-linux-x64/bin:$PATH
npm install
npm run dev
```

## Build

```bash
export PATH=/cloud/cloud-ssd1/workspace/liuzhou/.local/node-v22.22.2-linux-x64/bin:$PATH
npm run build
npm run lint
```

## Deploy to GitHub Pages

For a user site, the repository name must be:

- `DeepThinkingZhouLiu.github.io`

This project already includes a GitHub Actions workflow at:

- [.github/workflows/deploy.yml](./.github/workflows/deploy.yml)

After pushing to `main`:

1. Open repository `Settings`
2. Go to `Pages`
3. Set `Source` to `GitHub Actions`
4. Push to `main` again if GitHub asks for a fresh deployment

The expected production URL is:

- `https://deepthinkingzhouliu.github.io/`

## Content Source

The page content is adapted from:

- `tmp/main.pdf`

The downloadable CV exposed by the site is:

- [public/main.pdf](./public/main.pdf)
