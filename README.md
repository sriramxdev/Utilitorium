# Utilitorium

> A focused workbench for small tools that do one job cleanly.

Utilitorium is a decoupled Astro showcase hub for automation scripts, media
pipelines, AI note utilities, and deterministic parsers. The interface uses a
light/dark token system, responsive glassmorphic cards, and a local visit
counter that ranks the most visited tools.

## Highlights

- Astro 7 with TypeScript and Tailwind CSS 4
- Responsive layout with light and dark themes
- Persistent theme selection through `localStorage`
- Data-driven navigation, category sections, footer content, and tool cards
- Seeded visit counts combined with browser-local visits
- Live visit counts shown on every card
- Featured tools ranked by actual visit count
- Google Fonts: Rajdhani and JetBrains Mono

## Getting started

### Requirements

- Node.js `>=22.22.0`
- pnpm

### Install and run

```bash
pnpm install
pnpm dev
```

Open [http://localhost:4321](http://localhost:4321) to view the portal.

### Production build

```bash
pnpm build
pnpm preview
```

## Project structure

```text
.
├── public/
│   ├── favicon.svg
│   └── icons/tools/
├── src/
│   ├── components/
│   │   ├── categories/       # Category-specific Astro entry points
│   │   ├── CategorySection.astro
│   │   ├── Featured.astro
│   │   ├── Footer.astro
│   │   ├── Hero.astro
│   │   ├── Navbar.astro
│   │   ├── ThemeToggle.astro
│   │   └── ToolCard.astro
│   ├── data/
│   │   ├── categories/       # Category metadata
│   │   ├── tools/            # Cards belonging to each category
│   │   ├── categories.json   # Navbar category registry
│   │   ├── footer.json
│   │   ├── home.json
│   │   └── visits.json       # Seed visit counts
│   ├── layouts/
│   ├── pages/
│   ├── styles/
│   └── utils/
├── astro.config.mjs
├── package.json
├── pnpm-lock.yaml
├── tailwind.config.mjs
└── tsconfig.json
```

## Adding a tool

Add one object to the relevant JSON file under
[`src/data/tools/`](./src/data/tools/):

```json
{
  "id": "my-tool",
  "name": "My Tool",
  "description": "A short explanation of what the tool does.",
  "category": "parsers",
  "icon": "/icons/tools/my-tool.svg",
  "tags": ["JSON", "Python"],
  "url": "https://github.com/sriramxdev/Utilitorium"
}
```

The card, tags, icon, category placement, and visit counter are then rendered
from that data. Add the corresponding seed count to
[`src/data/visits.json`](./src/data/visits.json) when the tool should begin with
an established ranking.

## Adding a category

Each category has two coordinated files:

1. Metadata in [`src/data/categories/`](./src/data/categories/)
2. A category Astro entry point in [`src/components/categories/`](./src/components/categories/)

Add the category’s `{ "id", "name" }` entry to
[`src/data/categories.json`](./src/data/categories.json) so it appears in the
navbar. The category entry point imports its metadata and tool JSON, then passes
both to the shared `CategorySection` component.

## Visit tracking

Seed counts are static and stored in [`src/data/visits.json`](./src/data/visits.json).
Additional visits are stored only in the visitor’s browser under the
`utilitorium-visits` `localStorage` key. No analytics service or visitor data is
sent anywhere.

## License

See [`LICENSE`](./LICENSE).
