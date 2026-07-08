"use client";

import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import s from "./interactive.module.css";
import {
  CONSENT_EVENT,
  CONSENT_VERSION,
  OPEN_SETTINGS_EVENT,
  readConsent,
  writeConsent,
  type Consent,
} from "@/lib/consent";
import { PRIVACY_PDF_PATH } from "@/lib/privacy-policy";

type Draft = { analytics: boolean; marketing: boolean };

// External store: whether the user has already made a consent decision.
// Reading localStorage this way (rather than setState-in-effect) avoids a
// hydration mismatch — the server snapshot renders nothing, then the client
// snapshot takes over after hydration with no flash.
function subscribeDecision(callback: () => void) {
  window.addEventListener(CONSENT_EVENT, callback);
  return () => window.removeEventListener(CONSENT_EVENT, callback);
}
function getHasDecision() {
  return readConsent() !== null;
}
function getServerHasDecision() {
  return true; // on the server assume "decided" so the banner renders nothing
}

export default function CookieConsent() {
  const pathname = usePathname();
  const hasDecision = useSyncExternalStore(
    subscribeDecision,
    getHasDecision,
    getServerHasDecision,
  );
  const [forceOpen, setForceOpen] = useState(false); // reopened via footer link
  const [showSettings, setShowSettings] = useState(false);
  const [draft, setDraft] = useState<Draft>({ analytics: false, marketing: false });

  const open = forceOpen || !hasDecision;

  // Footer "Cookie beállítások" link reopens the banner, pre-filled.
  useEffect(() => {
    function onOpenSettings() {
      const saved = readConsent();
      setDraft({
        analytics: saved?.analytics ?? false,
        marketing: saved?.marketing ?? false,
      });
      setShowSettings(true);
      setForceOpen(true);
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
    writeConsent(consent); // dispatches CONSENT_EVENT → hasDecision becomes true
    setForceOpen(false);
    setShowSettings(false);
  }, []);

  if (pathname === "/adatvedelem" || !open) return null;

  return (
    <div
      className="cookie-consent"
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
            <a
              href={PRIVACY_PDF_PATH}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--blue)", textDecoration: "underline" }}
            >
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
