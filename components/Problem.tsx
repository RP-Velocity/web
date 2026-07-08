import Reveal from "./Reveal";

const points = [
  "Túl sok manuális folyamat - a csapat ideje adminisztrációra megy el, nem értékteremtésre.",
  "Elszórt adatok - táblázatok, e-mailek és rendszerek között elvész a valós kép a cégről.",
  "Skálázhatatlan működés - Ami tíz ügyfélnél még működött, az húsznál már szétesik.",
];

export default function Problem() {
  return (
    <section style={{ padding: "120px 6vw" }}>
      <Reveal
        style={{
          maxWidth: 1280,
          margin: "0 auto",
        }}
      >
        <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 80 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <span style={{ fontFamily: "var(--font-mono-stack)", fontSize: 14, color: "#4D7FFF", letterSpacing: "0.22em" }}>
              A PROBLÉMA
            </span>
            <h2 style={{ margin: 0, fontSize: 44, fontWeight: 700, lineHeight: 1.15, letterSpacing: "-0.01em" }}>
              A növekedés túl gyakran a káoszon bukik el
            </h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {points.map((point, i) => (
              <div
                key={point}
                style={{
                  display: "flex",
                  gap: 20,
                  alignItems: "baseline",
                  padding: "26px 0",
                  borderBottom: i < points.length - 1 ? "1px solid #1B2230" : undefined,
                }}
              >
                <svg width="16" height="24" viewBox="0 0 46 72" style={{ flexShrink: 0, alignSelf: "center" }}>
                  <polygon points="0,0 22,0 46,36 22,72 0,72 24,36" fill="#4D7FFF" />
                </svg>
                <span style={{ fontSize: 20, color: "#C7CDD8", lineHeight: 1.55 }}>{point}</span>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
