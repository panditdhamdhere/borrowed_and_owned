# Contributing

Thanks for helping the Rust community learn! All contributions happen through GitHub pull requests on [borrowed_and_owned](https://github.com/panditdhamdhere/borrowed_and_owned).

## Adding a resource

1. [Fork the repo](https://github.com/panditdhamdhere/borrowed_and_owned/fork)
2. Add an entry to [`src/content/resources.json`](https://github.com/panditdhamdhere/borrowed_and_owned/blob/main/src/content/resources.json)
3. [Open a pull request](https://github.com/panditdhamdhere/borrowed_and_owned/compare)

Or [suggest a resource via GitHub issue](https://github.com/panditdhamdhere/borrowed_and_owned/issues/new?template=resource.yml) — no code required.

### Required fields

| Field | Description |
|-------|-------------|
| `id` | Unique slug, kebab-case (e.g. `the-rust-book`) |
| `title` | Display name |
| `description` | 1–2 sentences, no marketing fluff |
| `url` | Direct link to the resource |
| `category` | One of: `book`, `video`, `course`, `repo`, `blog`, `podcast`, `cheatsheet`, `tool`, `community`, `newsletter`, `conference` |

### Optional fields

| Field | Description |
|-------|-------------|
| `level` | `beginner`, `intermediate`, or `advanced` |
| `tags` | Array of short labels (e.g. `["free", "async"]`) |
| `free` | `true` if no payment required |
| `author` | Creator or organization |
| `addedAt` | Date added in `YYYY-MM-DD` format (for changelog) |

### Example

```json
{
  "id": "async-rust",
  "title": "Asynchronous Programming in Rust",
  "description": "Deep dive into async/await, executors, and the futures ecosystem.",
  "url": "https://rust-lang.github.io/async-book/",
  "category": "book",
  "level": "intermediate",
  "tags": ["async", "free", "official"],
  "free": true,
  "author": "Rust Async Working Group"
}
```

## Guidelines

- Prefer official or widely trusted sources
- No affiliate links or paid promotions
- One resource per PR when possible — easier to review
- Check that the link works before submitting
- Avoid duplicates — search existing entries first

## Development

```bash
git clone https://github.com/panditdhamdhere/borrowed_and_owned.git
cd borrowed_and_owned
npm install
npm run dev
npm run lint
npm run build
npm run validate
```

## Questions?

[Open an issue](https://github.com/panditdhamdhere/borrowed_and_owned/issues) — we're happy to help.
