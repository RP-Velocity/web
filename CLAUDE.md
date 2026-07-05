@AGENTS.md

# RP Velocity — Landing Page

Single-page marketing site for **RP Velocity**, an AI- and software-consultancy that
converts manual, fragmented workflows into transparent, measurably faster systems.
All copy is in **Hungarian** (`<html lang="hu">`). Dark theme throughout.

## Stack

- **Next.js 16.2.10** (App Router) — this is a newer major than most training data. Before writing framework code, read the relevant guide under `node_modules/next/dist/docs/` (see AGENTS.md).
- **React 19.2.4**, **TypeScript 5** (`strict: true`, `noEmit`).
- No CSS framework, no component library, no test runner, no state management.

## Commands

```bash
npm run dev     # next dev (http://localhost:3000)
npm run build   # next build
npm run start   # next start (serve production build)
npm run lint    # eslint (flat config)
```

## Structure

- `app/layout.tsx` — root layout: metadata, fonts, `<html lang="hu">`. Loads **Space Grotesk** (`--font-sans`) and **JetBrains Mono** (`--font-mono`) via `next/font/google`.
- `app/page.tsx` — the whole page. Composes section components from `components/` in visual order (Nav → Hero → TrustBar → Problem → Solution → Services → Process → Results → About → Testimonials → Faq → Cta → Footer). To reorder/add/remove a section, edit this file.
- `app/globals.css` — CSS custom properties (color palette, font stacks), global resets, and `@keyframes` animations.
- `components/*.tsx` — one file per page section, plus `BrandMark.tsx` (logo SVG) and `Reveal.tsx` (scroll-reveal wrapper).
- `components/interactive.module.css` — CSS Module for hover/interactive states (nav links, buttons, cards).
- `public/` — static assets (currently empty).

## Conventions

- **Path alias:** `@/*` → repo root (e.g. `import Hero from "@/components/Hero"`).
- **Server components by default.** Only `components/Reveal.tsx` is `"use client"` (uses `IntersectionObserver` for scroll-triggered fade-in). Keep new components server-side unless they need browser APIs/hooks.
- **Styling is a deliberate two-tier split:**
  - Static layout/appearance → **inline `style={{}}`** objects on elements.
  - Anything needing `:hover`, pseudo-elements, or media queries → **`interactive.module.css`** (imported as `s`, referenced via `s.className`), since inline styles can't express those.
- **Colors** come from the CSS variables in `globals.css` (`--bg-page`, `--blue`, `--text-secondary`, …). Some components also hardcode the same hex values inline (e.g. `#0A0E15`) — prefer the variables for new code.
- **Section anchors** use Hungarian ids (`#megoldas`, `#szolgaltatasok`, `#folyamat`, `#rolunk`, `#kapcsolat`) that the Nav links target. Keep ids and nav hrefs in sync.

## Notes

- No tests exist; there is no test command. Verify changes with `npm run build` and `npm run lint`.
- `README.md` is the default create-next-app boilerplate and is not project documentation.
