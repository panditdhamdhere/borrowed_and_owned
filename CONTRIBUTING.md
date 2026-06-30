# Contributing

Thanks for helping the Rust community learn! All contributions happen through GitHub pull requests.

## Adding a resource

1. Fork the repo
2. Add an entry to `src/content/resources.json`
3. Open a PR with a short description of why the resource is valuable

### Required fields

| Field | Description |
|-------|-------------|
| `id` | Unique slug, kebab-case (e.g. `the-rust-book`) |
| `title` | Display name |
| `description` | 1–2 sentences, no marketing fluff |
| `url` | Direct link to the resource |
| `category` | One of: `book`, `video`, `course`, `repo`, `blog`, `podcast`, `cheatsheet`, `tool` |

### Optional fields

| Field | Description |
|-------|-------------|
| `level` | `beginner`, `intermediate`, or `advanced` |
| `tags` | Array of short labels (e.g. `["free", "async"]`) |
| `free` | `true` if no payment required |
| `author` | Creator or organization |

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
npm install
npm run dev
npm run lint
npm run build
```

## Questions?

Open an issue — we're happy to help.
