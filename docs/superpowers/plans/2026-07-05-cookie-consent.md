# EU Cookie Consent Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a GDPR-compliant, granular cookie consent banner (Hungarian, dark theme) that persists the user's choice in localStorage and can be reopened from the footer.

**Architecture:** One self-contained `"use client"` banner component owns the UI and all storage logic; a pure `lib/consent.ts` module holds the storage helpers plus a `hasConsent()` hook + `CONSENT_EVENT` seam for gating future scripts; a tiny footer link component reopens the banner via a `CustomEvent`. No new dependencies.

**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript 5 (strict), inline styles + `interactive.module.css` (CSS Module), CSS custom properties from `app/globals.css`.

## Global Constraints

- All user-facing copy in **Hungarian** (site is `<html lang="hu">`).
- **Server components by default.** Only add `"use client"` where browser APIs/hooks are required (pattern: `components/Reveal.tsx`).
- **No new dependencies.** No CSS framework, no component library, no state library.
- **Styling two-tier split:** static appearance → inline `style={{}}`; `:hover`/`:focus`/pseudo → `components/interactive.module.css` (imported as `s`). Colors from CSS vars in `globals.css` (`--bg-panel`, `--border-strong`, `--blue`, `--blue-hover`, `--text-primary`, `--text-body`, `--text-secondary`, `--bg-void`).
- **Path alias:** `@/*` → repo root.
- **No test runner exists.** Verify every task with `npm run build` and `npm run lint`, plus the manual browser check stated in the task. TypeScript is `strict: true`, `noEmit`.
- **Next.js is a newer major than training data.** Before editing framework files, skim `node_modules/next/dist/docs/01-app/03-api-reference/01-directives/use-client.md`.

---

## File Structure

- **Create** `lib/consent.ts` — types, constants, pure storage helpers, `hasConsent()` gating hook. No React.
- **Create** `components/CookieConsent.tsx` (`"use client"`) — the bottom banner + inline settings + toggles.
- **Create** `components/CookieSettingsLink.tsx` (`"use client"`) — footer "Cookie beállítások" reopen link.
- **Modify** `components/interactive.module.css` — hover/focus states for consent buttons and the switch inputs.
- **Modify** `components/Footer.tsx` — render `<CookieSettingsLink />` in the links row.
- **Modify** `app/layout.tsx` — render `<CookieConsent />` after `{children}`.

---

## Task 1: Consent storage module (`lib/consent.ts`)

**Files:**
- Create: `lib/consent.ts`

**Interfaces:**
- Consumes: nothing (pure module, browser `localStorage` + `CustomEvent`).
- Produces:
  - `type ConsentCategory = "necessary" | "analytics" | "marketing"`
  - `type Consent = { necessary: true; analytics: boolean; marketing: boolean; version: number; ts: number }`
  - `const CONSENT_VERSION = 1`
  - `const STORAGE_KEY = "rpv-cookie-consent"`
  - `const CONSENT_EVENT = "rpv:consent-change"`
  - `const OPEN_SETTINGS_EVENT = "rpv:open-cookie-settings"`
  - `function readConsent(): Consent | null`
  - `function writeConsent(consent: Consent): void`
  - `function hasConsent(category: ConsentCategory): boolean`

- [ ] **Step 1: Create `lib/consent.ts` with the full module**

```ts
export type ConsentCategory = "necessary" | "analytics" | "marketing";

export type Consent = {
  necessary: true; // always granted
  analytics: boolean;
  marketing: boolean;
  version: number; // bump to re-prompt everyone after a policy change
  ts: number; // epoch ms of the decision
};

export const CONSENT_VERSION = 1;
export const STORAGE_KEY = "rpv-cookie-consent";
export const CONSENT_EVENT = "rpv:consent-change";
export const OPEN_SETTINGS_EVENT = "rpv:open-cookie-settings";

/**
 * Returns the stored consent, or null when nothing is stored, the JSON is
 * malformed, or the stored version is stale (treated as "no decision" so the
 * banner re-prompts).
 */
export function readConsent(): Consent | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<Consent>;
    if (
      parsed === null ||
      typeof parsed !== "object" ||
      parsed.version !== CONSENT_VERSION ||
      typeof parsed.analytics !== "boolean" ||
      typeof parsed.marketing !== "boolean"
    ) {
      return null;
    }
    return {
      necessary: true,
      analytics: parsed.analytics,
      marketing: parsed.marketing,
      version: CONSENT_VERSION,
      ts: typeof parsed.ts === "number" ? parsed.ts : 0,
    };
  } catch {
    return null;
  }
}

/**
 * Persists consent to localStorage and notifies listeners (the seam for
 * gating future analytics/marketing scripts without a page reload).
 */
export function writeConsent(consent: Consent): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
  } catch {
    // storage may be unavailable (private mode / quota exceeded); ignore
  }
  window.dispatchEvent(new CustomEvent<Consent>(CONSENT_EVENT, { detail: consent }));
}

/**
 * Future script-gating hook. `necessary` is always granted; other categories
 * require an explicit stored grant.
 */
export function hasConsent(category: ConsentCategory): boolean {
  if (category === "necessary") return true;
  const consent = readConsent();
  return consent ? consent[category] : false;
}
```

- [ ] **Step 2: Type-check and lint**

Run: `npm run build && npm run lint`
Expected: build succeeds, lint passes. (The module is not yet imported anywhere; unused exports are fine — ESLint/TS do not flag unused exports.)

- [ ] **Step 3: Commit**

```bash
git add lib/consent.ts
git commit -m "feat: add cookie consent storage module"
```

---

## Task 2: Consent banner component (`components/CookieConsent.tsx` + CSS)

**Files:**
- Modify: `components/interactive.module.css` (append new rules)
- Create: `components/CookieConsent.tsx`

**Interfaces:**
- Consumes from Task 1: `CONSENT_VERSION`, `OPEN_SETTINGS_EVENT`, `readConsent`, `writeConsent`, `type Consent`.
- Produces: default export `CookieConsent` (a React component taking no props). Listens on `window` for `OPEN_SETTINGS_EVENT`.

- [ ] **Step 1: Append consent styles to `components/interactive.module.css`**

Add these rules to the end of the file (do not modify existing rules):

```css
.consentPrimary {
  font-weight: 600;
  color: var(--bg-void);
  background: var(--blue);
  border: none;
  cursor: pointer;
  transition: background 0.2s ease;
}
.consentPrimary:hover {
  background: var(--blue-hover);
}

.consentGhost {
  color: var(--text-primary);
  background: transparent;
  border: 1px solid var(--border-strong);
  cursor: pointer;
  transition: border-color 0.2s ease;
}
.consentGhost:hover {
  border-color: var(--blue);
}

.consentSwitch {
  accent-color: var(--blue);
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  cursor: pointer;
}
.consentSwitch:disabled {
  cursor: not-allowed;
  opacity: 0.55;
}
```

- [ ] **Step 2: Create `components/CookieConsent.tsx`**

```tsx
"use client";

import { useCallback, useEffect, useState } from "react";
import s from "./interactive.module.css";
import {
  CONSENT_VERSION,
  OPEN_SETTINGS_EVENT,
  readConsent,
  writeConsent,
  type Consent,
} from "@/lib/consent";

type Draft = { analytics: boolean; marketing: boolean };

export default function CookieConsent() {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [draft, setDraft] = useState<Draft>({ analytics: false, marketing: false });

  // Decide visibility only after mount so server and first client render match
  // (renders null on the server → no hydration mismatch, no flash).
  useEffect(() => {
    setMounted(true);
    if (readConsent() === null) setOpen(true);
  }, []);

  // Footer "Cookie beállítások" link reopens the banner, pre-filled.
  useEffect(() => {
    function onOpenSettings() {
      const saved = readConsent();
      setDraft({
        analytics: saved?.analytics ?? false,
        marketing: saved?.marketing ?? false,
      });
      setShowSettings(true);
      setOpen(true);
    }
    window.addEventListener(OPEN_SETTINGS_EVENT, onOpenSettings);
    return () => window.removeEventListener(OPEN_SETTINGS_EVENT, onOpenSettings);
  }, []);

  const persist = useCallback((analytics: boolean, marketing: boolean) => {
    const consent: Consent = {
      necessary: true,
      analytics,
      marketing,
      version: CONSENT_VERSION,
      ts: Date.now(),
    };
    writeConsent(consent);
    setOpen(false);
    setShowSettings(false);
  }, []);

  if (!mounted || !open) return null;

  return (
    <div
      role="region"
      aria-label="Cookie hozzájárulás"
      style={{
        position: "fixed",
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 100,
        background: "var(--bg-panel)",
        borderTop: "1px solid var(--border-strong)",
        padding: "20px 6vw",
        boxShadow: "0 -8px 32px rgba(0,0,0,0.45)",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 24,
            flexWrap: "wrap",
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: 14,
              lineHeight: 1.6,
              color: "var(--text-body)",
              maxWidth: 640,
            }}
          >
            Sütiket használunk az oldal működéséhez, valamint — hozzájárulásod
            esetén — analitikai és marketing célokra. Részletek az{" "}
            <a href="#hero" style={{ color: "var(--blue)", textDecoration: "underline" }}>
              Adatvédelmi tájékoztatóban
            </a>
            .
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <button
              type="button"
              className={s.consentGhost}
              style={{ fontSize: 14, padding: "10px 18px" }}
              onClick={() => setShowSettings((v) => !v)}
              aria-expanded={showSettings}
            >
              Beállítások
            </button>
            <button
              type="button"
              className={s.consentGhost}
              style={{ fontSize: 14, padding: "10px 18px" }}
              onClick={() => persist(false, false)}
            >
              Összes elutasítása
            </button>
            <button
              type="button"
              className={s.consentPrimary}
              style={{ fontSize: 14, padding: "10px 18px" }}
              onClick={() => persist(true, true)}
            >
              Összes elfogadása
            </button>
          </div>
        </div>

        {showSettings && (
          <div
            style={{
              marginTop: 20,
              paddingTop: 20,
              borderTop: "1px solid var(--border)",
              display: "flex",
              flexDirection: "column",
              gap: 14,
            }}
          >
            <ConsentRow
              title="Szükséges"
              description="Az oldal alapvető működéséhez és a hozzájárulásod tárolásához. Mindig aktív."
              checked
              disabled
            />
            <ConsentRow
              title="Analitika"
              description="Anonim látogatottsági statisztikák a fejlesztéshez."
              checked={draft.analytics}
              onChange={(v) => setDraft((d) => ({ ...d, analytics: v }))}
            />
            <ConsentRow
              title="Marketing"
              description="Személyre szabott hirdetések és kampánymérés."
              checked={draft.marketing}
              onChange={(v) => setDraft((d) => ({ ...d, marketing: v }))}
            />
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <button
                type="button"
                className={s.consentPrimary}
                style={{ fontSize: 14, padding: "10px 18px" }}
                onClick={() => persist(draft.analytics, draft.marketing)}
              >
                Kiválasztottak mentése
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ConsentRow({
  title,
  description,
  checked,
  disabled,
  onChange,
}: {
  title: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onChange?: (value: boolean) => void;
}) {
  return (
    <label
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 14,
        cursor: disabled ? "not-allowed" : "pointer",
      }}
    >
      <input
        type="checkbox"
        className={s.consentSwitch}
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.checked)}
        style={{ marginTop: 3 }}
      />
      <span>
        <span style={{ display: "block", fontSize: 15, fontWeight: 600, color: "var(--text-primary)" }}>
          {title}
        </span>
        <span style={{ display: "block", fontSize: 13, color: "var(--text-secondary)", marginTop: 2 }}>
          {description}
        </span>
      </span>
    </label>
  );
}
```

- [ ] **Step 3: Type-check and lint**

Run: `npm run build && npm run lint`
Expected: build succeeds, lint passes. Component still not rendered anywhere yet — that is wired in Task 3.

- [ ] **Step 4: Commit**

```bash
git add components/CookieConsent.tsx components/interactive.module.css
git commit -m "feat: add cookie consent banner component"
```

---

## Task 3: Wire up banner + footer reopen link

**Files:**
- Create: `components/CookieSettingsLink.tsx`
- Modify: `components/Footer.tsx` (add import + render the link)
- Modify: `app/layout.tsx` (add import + render `<CookieConsent />`)

**Interfaces:**
- Consumes from Task 1: `OPEN_SETTINGS_EVENT`. From Task 2: `CookieConsent` default export.
- Produces: default export `CookieSettingsLink`; the banner is now live site-wide.

- [ ] **Step 1: Skim the Next.js `use client` reference**

Read: `node_modules/next/dist/docs/01-app/03-api-reference/01-directives/use-client.md`
Confirm a `"use client"` component can be rendered directly inside a server `layout.tsx` and inside a server component (`Footer.tsx`). Expected: yes — a server component may render client components as children/leaves.

- [ ] **Step 2: Create `components/CookieSettingsLink.tsx`**

```tsx
"use client";

import s from "./interactive.module.css";
import { OPEN_SETTINGS_EVENT } from "@/lib/consent";

export default function CookieSettingsLink() {
  return (
    <button
      type="button"
      className={s.footerLink}
      style={{
        fontFamily: "var(--font-mono-stack)",
        fontSize: 14,
        background: "transparent",
        border: "none",
        padding: 0,
        cursor: "pointer",
      }}
      onClick={() => window.dispatchEvent(new Event(OPEN_SETTINGS_EVENT))}
    >
      Cookie beállítások
    </button>
  );
}
```

- [ ] **Step 3: Render the link in `components/Footer.tsx`**

Add the import after the existing `import s` line (top of file):

```tsx
import CookieSettingsLink from "./CookieSettingsLink";
```

Then, inside the links `<div style={{ display: "flex", alignItems: "center", gap: 32 }}>`, add `<CookieSettingsLink />` immediately before the existing "Adatvédelem" anchor so the row reads: email · LinkedIn · Cookie beállítások · Adatvédelem. The anchor block to insert before is:

```tsx
          <a href="#hero" className={s.footerLink} style={{ fontFamily: "var(--font-mono-stack)", fontSize: 14 }}>
            Adatvédelem
          </a>
```

Insert directly above it:

```tsx
          <CookieSettingsLink />
```

- [ ] **Step 4: Render the banner in `app/layout.tsx`**

Add the import below `import "./globals.css";`:

```tsx
import CookieConsent from "@/components/CookieConsent";
```

Change the body to render the banner after `{children}`:

```tsx
      <body>
        {children}
        <CookieConsent />
      </body>
```

- [ ] **Step 5: Type-check and lint**

Run: `npm run build && npm run lint`
Expected: build succeeds, lint passes.

- [ ] **Step 6: Manual browser verification**

Run: `npm run dev`, open http://localhost:3000, and confirm:
1. First load (or after `localStorage.removeItem('rpv-cookie-consent')` + reload) shows the bottom banner.
2. **Összes elfogadása** → banner closes; `localStorage.rpv-cookie-consent` = `{"necessary":true,"analytics":true,"marketing":true,"version":1,"ts":...}`.
3. Reload → banner does **not** reappear.
4. Footer **Cookie beállítások** → banner reopens with settings expanded and toggles pre-filled from the saved choice.
5. Untick both, **Kiválasztottak mentése** → stored value has `analytics:false, marketing:false`; **Szükséges** toggle stays checked and disabled.
6. **Összes elutasítása** on a fresh state → stored value has analytics/marketing `false`, banner closes.
7. Narrow the window (< 860px) → buttons wrap, banner stays readable.

- [ ] **Step 7: Commit**

```bash
git add components/CookieSettingsLink.tsx components/Footer.tsx app/layout.tsx
git commit -m "feat: wire up cookie consent banner and footer reopen link"
```

---

## Self-Review

**1. Spec coverage:**
- Granular categories (Szükséges/Analitika/Marketing) → Task 2 `ConsentRow`s. ✓
- Necessary always on → Task 2 (`checked disabled`). ✓
- localStorage storage + shape/version → Task 1. ✓
- Clean gating hook for future scripts → Task 1 `hasConsent()` + `CONSENT_EVENT`. ✓
- Bottom banner + inline-expanding settings → Task 2. ✓
- Accept all / Reject all / Save selection → Task 2 buttons. ✓
- Footer reopen link, pre-filled → Task 3 + Task 2 `OPEN_SETTINGS_EVENT` listener. ✓
- Accessibility (`role="region"`, labeled checkboxes, real buttons) → Task 2. ✓
- No flash / no hydration mismatch (render null until mounted) → Task 2. ✓
- Styling two-tier split, CSS vars, no new deps → all tasks. ✓
- Hungarian copy → all UI strings. ✓

**2. Placeholder scan:** No TBD/TODO; every code step shows complete code. ✓

**3. Type consistency:** `Consent`, `CONSENT_VERSION`, `OPEN_SETTINGS_EVENT`, `readConsent`, `writeConsent`, `hasConsent` names/signatures match between Task 1 (definition) and Tasks 2–3 (consumption). ✓

Note: `Date.now()` is used only in browser component code (Task 2), which is fine — the workflow-script restriction on `Date.now()` does not apply to app code.
