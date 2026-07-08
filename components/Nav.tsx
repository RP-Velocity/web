import BrandMark from "./BrandMark";
import s from "./interactive.module.css";

export default function Nav() {
  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "20px 6vw",
        background: "rgba(10,14,21,0.88)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid #1B2230",
      }}
    >
      <a href="#hero" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none" }}>
        <BrandMark width={38} height={29} />
        <span style={{ fontSize: 20, fontWeight: 700, color: "#F2F5FA" }}>RP Velocity</span>
      </a>
      <div style={{ display: "flex", alignItems: "center", gap: 36 }}>
        <div className="nav-links" style={{ display: "flex", alignItems: "center", gap: 36 }}>
          <a href="#megoldas" className={s.navLink}>
            Megoldás
          </a>
          <a href="#szolgaltatasok" className={s.navLink}>
            Szolgáltatások
          </a>
          <a href="#folyamat" className={s.navLink}>
            Folyamat
          </a>
          <a href="#rolunk" className={s.navLink}>
            Rólunk
          </a>
        </div>
        <a href="#kapcsolat" className={`${s.navCta} nav-cta`}>
          Beszéljünk
        </a>
      </div>
    </nav>
  );
}
