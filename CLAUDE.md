# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

All commands run from `ilknur-gurcan/` (the Astro project root):

| Command | Action |
| :-- | :-- |
| `npm install` | Install dependencies |
| `npm run dev` | Start dev server at `localhost:4321` |
| `npm run build` | Build production site to `./dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run astro check` | Type-check `.astro` files |

There is no test suite and no lint script configured.

## Architecture

This is an Astro site (Astro 6, `.astro` components, TypeScript strict mode) for a painter's portfolio/e-commerce showcase ("Sardunya Atölyesi" / İlknur Gürcan), styled with Tailwind CSS v4 (via `@tailwindcss/vite`, no `tailwind.config.js` — theme tokens like `ink`, `cream`, `gold`, `warm`, `muted`, `soft` are custom colors defined in `src/styles/global.css`). All content and UI copy is in Turkish.

- `src/data/eserler.ts` — the single source of truth for artwork data. Defines the `Eser` (artwork) type/`Kategori`/`Durum` unions and a hardcoded `eserler` array (slug, title, category, year, technique, dimensions, price, sold status, image path). Also exports `formatFiyat()` for Turkish Lira currency formatting. There is no CMS or database; new artworks are added by editing this array directly.
- `src/layouts/Layout.astro` — the shared page shell (`<html>`, meta/OG tags, Nav + Footer, `<slot />`). All pages should wrap content in this layout, passing `title`/`description`/`image` props.
- `src/components/` — `Nav.astro`, `Footer.astro`, `EserKart.astro` (artwork card, takes an `Eser` prop).
- `src/pages/` — file-based routing. Currently only `index.astro` exists. The homepage already links to `/eserler`, `/hakkinda`, `/sergiler`, and `/iletisim` routes that don't exist yet — these are expected future pages (gallery listing, about, exhibitions, contact).
- Client-side interactivity (e.g. the category filter buttons on the homepage) is implemented with plain inline `<script>` tags querying `data-*` attributes rather than a JS framework.
- Static assets (images, favicon) live in `public/images/`.
