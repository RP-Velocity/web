import Reveal from "./Reveal";
import s from "./interactive.module.css";

const services = [
  {
    title: "Egyedi AI-eszközök",
    body: "Dokumentumfeldolgozás, ügyfélkommunikáció, riportolás - AI-asszisztensek, amelyek az Ön cégének nyelvén dolgoznak.",
  },
  {
    title: "Folyamatautomatizálás",
    body: "Az ismétlődő, manuális lépések kiváltása - a rendeléskezeléstől a számlázásig, hibalehetőségek nélkül.",
  },
  {
    title: "Egyedi szoftverfejlesztés",
    body: "Belső eszközök és ügyfélportálok, amelyek pontosan azt tudják, amire a működésének szüksége van.",
  },
  {
    title: "Adatalapú döntéstámogatás",
    body: "Az elszórt adatokból egyetlen, valós idejű kép - dashboardok, amelyekből tényleg dönteni lehet.",
  },
];

export default function Services() {
  return (
    <section id="szolgaltatasok" style={{ padding: "120px 6vw" }}>
      <Reveal style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 56 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <span style={{ fontFamily: "var(--font-mono-stack)", fontSize: 14, color: "#4D7FFF", letterSpacing: "0.22em" }}>
              SZOLGÁLTATÁSOK
            </span>
            <h2 style={{ margin: 0, fontSize: 44, fontWeight: 700, letterSpacing: "-0.01em" }}>Mit kínálunk</h2>
          </div>
          <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28 }}>
            {services.map((svc) => (
              <div
                key={svc.title}
                className={s.card}
                style={{
                  background: "#0D1421",
                  border: "1px solid #1B2230",
                  padding: 40,
                  display: "flex",
                  flexDirection: "column",
                  gap: 14,
                }}
              >
                <svg width="34" height="26" viewBox="0 0 94 72">
                  <polygon points="48,0 70,0 94,36 70,72 48,72 72,36" fill="#4D7FFF" />
                </svg>
                <span style={{ fontSize: 24, fontWeight: 600 }}>{svc.title}</span>
                <span style={{ fontSize: 17, color: "#8B93A3", lineHeight: 1.6 }}>{svc.body}</span>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
