# Borrowed & Owned 🦀

[![CI](https://github.com/panditdhamdhere/borrowed-and-owned/actions/workflows/ci.yml/badge.svg)](https://github.com/panditdhamdhere/borrowed-and-owned/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

An open source, community-curated collection of Rust learning resources — books, videos, courses, repos, blogs, and more.

## Why this exists

Awesome lists on GitHub are great, but hard to browse. This project gives the Rust community a searchable, filterable site where anyone can contribute via pull request.

## Stack

- [Next.js 16](https://nextjs.org) (App Router, React 19)
- TypeScript + Tailwind CSS
- Content stored as JSON — no database needed

## Getting started

```bash
git clone https://github.com/panditdhamdhere/borrowed-and-owned.git
cd borrowed-and-owned
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Adding a resource

Edit `src/content/resources.json` and add an entry. See [CONTRIBUTING.md](./CONTRIBUTING.md) for the full schema and guidelines.

**Categories:** `book`, `video`, `course`, `repo`, `blog`, `podcast`, `cheatsheet`, `tool`

**Levels:** `beginner`, `intermediate`, `advanced` (optional)

## Push to GitHub

If you're setting up your own fork:

```bash
# create repo on GitHub first, then:
git remote add origin https://github.com/YOUR_USERNAME/borrowed-and-owned.git
git push -u origin main
```

Update `src/lib/site.ts` (or set `NEXT_PUBLIC_GITHUB_REPO`) with your repo URL.

## Deploy

Connect the repo to [Vercel](https://vercel.com) — zero config for Next.js. Every push to `main` deploys automatically.

```bash
npm run build
npm start
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run lint` | Run ESLint |
| `npm start` | Serve production build |

## License

[MIT](./LICENSE) — linked resources belong to their original authors.
