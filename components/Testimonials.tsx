import Reveal from "./Reveal";

const quotes = [
  {
    text: "„Két hét alatt láttuk az első eredményt. Ami eddig napokig tartott, azt most a rendszer elvégzi helyettünk.”",
    attribution: "ÜGYVEZETŐ · KERESKEDELMI PARTNER - MINTA IDÉZET",
  },
  {
    text: "„Nem technológiát adtak el, hanem megértették, hogyan működik a cégünk - és arra építettek rendszert.”",
    attribution: "OPERÁCIÓS VEZETŐ · SZOLGÁLTATÓ PARTNER - MINTA IDÉZET",
  },
];

export default function Testimonials() {
  return (
    <section style={{ padding: "120px 6vw" }}>
      <Reveal style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 56 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <span style={{ fontFamily: "var(--font-mono-stack)", fontSize: 14, color: "#4D7FFF", letterSpacing: "0.22em" }}>
              VÉLEMÉNYEK
            </span>
            <h2 style={{ margin: 0, fontSize: 44, fontWeight: 700, letterSpacing: "-0.01em" }}>
              Amit a partnereink mondanak
            </h2>
          </div>
          <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28 }}>
            {quotes.map((q) => (
              <div
                key={q.attribution}
                style={{ borderLeft: "3px solid #4D7FFF", padding: "8px 0 8px 40px", display: "flex", flexDirection: "column", gap: 20 }}
              >
                <span style={{ fontSize: 23, lineHeight: 1.55, color: "#C7CDD8" }}>{q.text}</span>
                <span style={{ fontFamily: "var(--font-mono-stack)", fontSize: 14, color: "#566072", letterSpacing: "0.1em" }}>
                  {q.attribution}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
