import BrandMark from "./BrandMark";
import s from "./interactive.module.css";

export default function Footer() {
  return (
    <footer style={{ borderTop: "1px solid #1B2230", padding: "48px 6vw", background: "#07090D" }}>
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 24,
          flexWrap: "wrap",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <BrandMark width={30} height={23} />
          <span style={{ fontSize: 17, fontWeight: 700, color: "#F2F5FA" }}>RP Velocity</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
          <a href="mailto:hello@rpvelocity.hu" className={s.footerLink} style={{ fontFamily: "var(--font-mono-stack)", fontSize: 14 }}>
            hello@rpvelocity.hu
          </a>
          <a href="#hero" className={s.footerLink} style={{ fontFamily: "var(--font-mono-stack)", fontSize: 14 }}>
            LinkedIn
          </a>
          <a href="#hero" className={s.footerLink} style={{ fontFamily: "var(--font-mono-stack)", fontSize: 14 }}>
            Adatvédelem
          </a>
        </div>
        <span style={{ fontFamily: "var(--font-mono-stack)", fontSize: 13, color: "#566072" }}>© 2026 RP Velocity</span>
      </div>
    </footer>
  );
}
