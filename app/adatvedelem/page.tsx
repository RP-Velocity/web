import type { Metadata } from "next";
import Link from "next/link";
import BrandMark from "@/components/BrandMark";
import PrivacyPolicyDocument from "@/components/PrivacyPolicyDocument";
import s from "@/components/interactive.module.css";

export const metadata: Metadata = {
  title: "Adatvédelmi tájékoztató - RP Velocity",
  description: "Az RP Velocity weboldal adatvédelmi tájékoztatója.",
};

export default function PrivacyPage() {
  return (
    <div
      className="page-root privacy-page"
      style={{ background: "var(--bg-page)", color: "var(--text-primary)", minHeight: "100vh" }}
    >
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 20,
          padding: "20px 6vw",
          borderBottom: "1px solid var(--border)",
          background: "rgba(10,14,21,0.95)",
        }}
      >
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none" }}>
          <BrandMark width={38} height={29} />
          <span style={{ fontSize: 20, fontWeight: 700, color: "var(--text-primary)" }}>RP Velocity</span>
        </Link>
        <Link href="/" className={s.btnSecondary} style={{ fontSize: 14, padding: "10px 18px", textDecoration: "none" }}>
          Vissza a főoldalra
        </Link>
      </header>

      <main style={{ padding: "64px 6vw 96px" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <PrivacyPolicyDocument />
        </div>
      </main>
    </div>
  );
}
