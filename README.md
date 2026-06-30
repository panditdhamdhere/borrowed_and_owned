# Borrowed & Owned

An open source, community-curated collection of Rust learning resources — books, videos, courses, repos, blogs, and more.

**Live site:** deploy to Vercel (or any static host) after pushing to GitHub.

## Why this exists

Awesome lists on GitHub are great, but hard to browse. This project gives the Rust community a searchable, filterable site where anyone can contribute via pull request.

## Stack

- [Next.js 16](https://nextjs.org) (App Router, React 19)
- TypeScript + Tailwind CSS
- Content stored as JSON — no database needed

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Adding a resource

Edit `src/content/resources.json` and add an entry:

```json
{
  "id": "unique-slug",
  "title": "Resource Title",
  "description": "One or two sentences about why it's useful.",
  "url": "https://example.com",
  "category": "book",
  "level": "beginner",
  "tags": ["free", "official"],
  "free": true,
  "author": "Optional Author"
}
```

**Categories:** `book`, `video`, `course`, `repo`, `blog`, `podcast`, `cheatsheet`, `tool`

**Levels:** `beginner`, `intermediate`, `advanced` (optional)

Then open a pull request. See [CONTRIBUTING.md](./CONTRIBUTING.md) for details.

## Deploy

Push to GitHub and connect the repo to [Vercel](https://vercel.com) — zero config for Next.js.

```bash
npm run build
npm start
```

## License

MIT — resources link to their original authors and licenses.
