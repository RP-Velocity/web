import BrandMark from "./BrandMark";
import Reveal from "./Reveal";
import s from "./interactive.module.css";

export default function Cta() {
  return (
    <section id="kapcsolat" style={{ padding: "140px 6vw" }}>
      <Reveal
        style={{
          maxWidth: 900,
          margin: "0 auto",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 32, textAlign: "center" }}>
          <BrandMark width={94} height={72} />
          <h2 style={{ margin: 0, fontSize: 52, fontWeight: 700, lineHeight: 1.15, letterSpacing: "-0.01em", textWrap: "pretty" }}>
            Nézzük meg együtt, hol lassul a cége
          </h2>
          <p style={{ margin: 0, fontSize: 20, color: "#8B93A3", lineHeight: 1.6, maxWidth: 620 }}>
            Egy 30 perces, kötelezettségmentes beszélgetésben megmutatjuk, mely folyamatokban van a legnagyobb
            kiaknázatlan potenciál.
          </p>
          <a href="mailto:hello@rpvelocity.hu" className={s.btnPrimary} style={{ fontSize: 19, padding: "20px 48px" }}>
            Kérjen ingyenes felmérést
          </a>
          <span style={{ fontFamily: "var(--font-mono-stack)", fontSize: 14, color: "#566072", letterSpacing: "0.1em" }}>
            VÁLASZ 24 ÓRÁN BELÜL
          </span>
        </div>
      </Reveal>
    </section>
  );
}
