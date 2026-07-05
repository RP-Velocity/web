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
