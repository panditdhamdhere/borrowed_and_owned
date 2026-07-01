# Borrowed & Owned 🦀

[![CI](https://github.com/panditdhamdhere/borrowed_and_owned/actions/workflows/ci.yml/badge.svg)](https://github.com/panditdhamdhere/borrowed_and_owned/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

**Repository:** [github.com/panditdhamdhere/borrowed_and_owned](https://github.com/panditdhamdhere/borrowed_and_owned)  
**Live site:** [borrowed-and-owned.vercel.app](https://borrowed-and-owned.vercel.app)

An open source, community-curated collection of Rust learning resources — books, videos, courses, repos, blogs, and more.

## Features

- **Search & filters** — fuzzy search, category, level, free-only, sort options
- **Learning paths** — curated roadmaps (`/paths`)
- **Category & tag pages** — `/category/book`, `/tags/async`
- **Resource detail pages** — `/resource/the-rust-book` with related resources
- **Starter kits** — day-one setup guides (`/starter-kits`)
- **Changelog** — recently added resources (`/changelog`)
- **GitHub stars** — shown on repo resource pages
- **Dark / light theme**
- **Submit via GitHub** — issue template + PR workflow

## Getting started

```bash
git clone https://github.com/panditdhamdhere/borrowed_and_owned.git
cd borrowed_and_owned
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Adding a resource

Edit [`src/content/resources.json`](https://github.com/panditdhamdhere/borrowed_and_owned/blob/main/src/content/resources.json) or [open a GitHub issue](https://github.com/panditdhamdhere/borrowed_and_owned/issues/new?template=resource.yml). See [CONTRIBUTING.md](./CONTRIBUTING.md).

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run lint` | Run ESLint |
| `npm run validate` | Validate JSON content schema |
| `npm start` | Serve production build |

## Deploy

Connect the repo to [Vercel](https://vercel.com) — zero config for Next.js.

## License

[MIT](./LICENSE)
