# EU Cookie Consent — Design

**Date:** 2026-07-05
**Status:** Approved (pending spec review)

## Goal

Add a GDPR-compliant cookie consent mechanism to the RP Velocity landing page.
Users can accept all, reject all, or granularly choose categories. The choice is
persisted client-side and can be changed later. All UI copy is in Hungarian to
match the site (`<html lang="hu">`), on the existing dark theme.

## Context

- Single-page Next.js 16 (App Router) marketing site. Server components by
  default; `components/Reveal.tsx` is the only `"use client"` component and is the
  established pattern for browser-API components.
- **The site currently loads no analytics or marketing/tracking scripts.** This
  consent UI is therefore ahead of any scripts to gate; the design provides a
  clean hook so scripts can be gated later without reworking the banner.
- Styling convention: inline `style={{}}` for static appearance, CSS Module
  (`interactive.module.css`, imported as `s`) for `:hover`/pseudo/media states.
  Colors come from CSS custom properties in `app/globals.css`.
- Footer already has an "Adatvédelem" (privacy) link.

## Decisions (from brainstorming)

| Decision | Choice |
| --- | --- |
| Consent model | Granular categories: Szükséges (necessary, always on) + Analitika + Marketing |
| Scripts to gate now | None — build a clean hook for later |
| Storage | `localStorage` (client-only, no server, no per-request cookie) |
| Layout | Bottom banner with inline-expanding settings |
| Reopen/withdraw | Yes — a "Cookie beállítások" link in the footer reopens the banner |

## Architecture (Approach A — single self-contained client component)

Zero new dependencies. One component owns the banner and all storage logic; a
tiny footer link reopens it; a small lib module holds pure helpers + the future
script-gating hook.

### Files

**New**

- `lib/consent.ts` — types, constants, and pure helpers. No React.
- `components/CookieConsent.tsx` (`"use client"`) — the bottom banner + settings.
- `components/CookieSettingsLink.tsx` (`"use client"`) — footer reopen link.

**Edited**

- `app/layout.tsx` — render `<CookieConsent />` after `{children}` so it appears
  on every route.
- `components/Footer.tsx` — add `<CookieSettingsLink />` alongside existing links.
- `components/interactive.module.css` — hover states for the consent buttons and
  toggle switches.

### `lib/consent.ts`

```ts
export type ConsentCategory = "necessary" | "analytics" | "marketing";

export type Consent = {
  necessary: true;        // always granted
  analytics: boolean;
  marketing: boolean;
  version: number;        // bump to re-prompt everyone
  ts: number;             // epoch ms of the decision
};

export const CONSENT_VERSION = 1;
export const STORAGE_KEY = "rpv-cookie-consent";
export const CONSENT_EVENT = "rpv:consent-change";      // dispatched on save
export const OPEN_SETTINGS_EVENT = "rpv:open-cookie-settings"; // footer -> banner

export function readConsent(): Consent | null;   // null if absent, malformed, or stale version
export function writeConsent(c: Consent): void;   // persist + dispatch CONSENT_EVENT
export function hasConsent(cat: ConsentCategory): boolean; // future script-gating hook
```

- `readConsent()` returns `null` when nothing is stored, JSON is malformed, or
  `version !== CONSENT_VERSION` (treated as no decision → re-prompt).
- `writeConsent()` writes JSON and dispatches a `CONSENT_EVENT` `CustomEvent` on
  `window` carrying the new consent as `detail`, so future gated scripts can
  react immediately without a reload.
- All functions are `typeof window` guarded so they are safe if ever called
  during SSR.

**Stored shape** (localStorage key `rpv-cookie-consent`):

```json
{ "necessary": true, "analytics": false, "marketing": false, "version": 1, "ts": 1751673600000 }
```

### `components/CookieConsent.tsx`

- `"use client"`. State: `open` (banner visible), `showSettings` (toggles
  expanded), and draft toggle state `{ analytics, marketing }`.
- On mount (`useEffect`): if `readConsent()` is `null`, open the banner.
  Renders `null` before mount and when closed → **no SSR/hydration mismatch and
  no flash** (fixed overlay, so no layout shift).
- Subscribes to `OPEN_SETTINGS_EVENT`; on receipt, pre-fills draft toggles from
  the last saved consent (or defaults false), opens the banner, and expands
  settings.
- Actions:
  - **Összes elfogadása** → `writeConsent({ analytics: true, marketing: true, ... })`, close.
  - **Összes elutasítása** → `writeConsent({ analytics: false, marketing: false, ... })`, close.
  - **Beállítások** → toggle `showSettings` (expands the three category rows inline).
  - **Kiválasztottak mentése** (shown when expanded) → `writeConsent` with the
    draft toggles, close.
- Category rows: **Szükséges** (checkbox checked + `disabled`, with explanatory
  text that it is required), **Analitika**, **Marketing** (interactive toggles).
- Layout: `position: fixed; left/right/bottom: 0`, panel background
  (`--bg-panel`), top border (`--border-strong`), `z-index` above the sticky nav.
  On narrow screens the buttons wrap (flex-wrap), consistent with the site's
  existing responsive approach.

### `components/CookieSettingsLink.tsx`

- `"use client"`. A `<button>` styled as the footer links (reuses
  `s.footerLink`) reading "Cookie beállítások". On click dispatches
  `OPEN_SETTINGS_EVENT` on `window`. Kept separate so `Footer.tsx` stays a
  server component except for this one interactive island.

## Data flow

```
First visit ──► readConsent() = null ──► banner opens
   user picks ──► writeConsent() ──► localStorage + CONSENT_EVENT dispatched
                                        └► (future) gated scripts read hasConsent()

Footer "Cookie beállítások" click ──► OPEN_SETTINGS_EVENT ──► banner reopens
   (pre-filled from last saved consent) ──► user changes ──► writeConsent()
```

## Accessibility

- Banner is **non-modal**: `role="region"`, `aria-label="Cookie hozzájárulás"`.
  It does not trap focus or dim the page (marketing content stays usable).
- Real `<button>` elements; category toggles are labeled `<input type="checkbox">`
  (visually styled as switches) with associated `<label>`s.
- Visible `:focus-visible` outline on interactive elements.
- Escape is not required (non-blocking), but the banner is fully keyboard
  operable via tab order.

## Styling

- Static appearance: inline styles using CSS vars (`--bg-panel`,
  `--border-strong`, `--blue`, `--blue-hover`, `--text-body`, `--text-secondary`).
- `:hover`/`:focus-visible`/switch states: new rules in
  `interactive.module.css` (e.g. `.consentAccept`, `.consentReject`,
  `.consentGhost`, `.consentSwitch`).
- No new color literals; reuse existing palette.

## Out of scope (YAGNI)

- React context / provider (nothing consumes consent yet).
- Actual analytics/marketing script integration (no scripts exist; the
  `hasConsent()` hook + `CONSENT_EVENT` are the seam for adding them later).
- Server-side reading of consent (localStorage chosen deliberately).
- A separate full privacy-policy page (the existing "Adatvédelem" link is
  unchanged).

## Verification

No test runner exists in this project. Verify with:

- `npm run build` — type-check + production build succeeds.
- `npm run lint` — eslint flat config passes.
- Manual: first load shows banner; Accept/Reject/Save each persist and dismiss;
  reload keeps the banner dismissed; footer link reopens with saved toggles;
  `localStorage.rpv-cookie-consent` holds the expected JSON.
