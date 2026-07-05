import Reveal from "./Reveal";

const founders = [
  {
    name: "Póra Szilárd",
    role: "TÁRSALAPÍTÓ · TECHNOLÓGIA",
    bio: "AI- és szoftverfejlesztési háttér - ő felel azért, hogy a rendszer ne csak szép legyen, hanem működjön is.",
  },
  {
    name: "Rátz Levente",
    role: "TÁRSALAPÍTÓ · FOLYAMATOK",
    bio: "Folyamatoptimalizálási és üzleti háttér - ő fordítja le a céges valóságot pontos, bevezethető tervekre.",
  },
];

export default function About() {
  return (
    <section
      id="rolunk"
      style={{ padding: "120px 6vw", background: "#0D1421", borderTop: "1px solid #1B2230", borderBottom: "1px solid #1B2230" }}
    >
      <Reveal style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 56 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 18, maxWidth: 760 }}>
            <span style={{ fontFamily: "var(--font-mono-stack)", fontSize: 14, color: "#4D7FFF", letterSpacing: "0.22em" }}>
              RÓLUNK
            </span>
            <h2 style={{ margin: 0, fontSize: 44, fontWeight: 700, letterSpacing: "-0.01em" }}>
              Ketten, akik rendet tesznek a komplexitásban
            </h2>
            <p style={{ margin: 0, fontSize: 20, color: "#8B93A3", lineHeight: 1.6 }}>
              Azért alapítottuk az RP Velocityt, mert túl sok jó céget láttunk lassulni olyan problémákon,
              amelyeket ma már modern eszközökkel hetek alatt meg lehet oldani.
            </p>
          </div>
          <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28 }}>
            {founders.map((f) => (
              <div
                key={f.name}
                style={{ background: "#0A0E15", border: "1px solid #1B2230", padding: 40, display: "flex", gap: 32, alignItems: "center" }}
              >
                <div
                  style={{
                    width: 140,
                    height: 140,
                    flexShrink: 0,
                    background: "repeating-linear-gradient(45deg, #1B2230 0, #1B2230 8px, #0D1421 8px, #0D1421 16px)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span style={{ fontFamily: "var(--font-mono-stack)", fontSize: 13, color: "#566072" }}>portré</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <span style={{ fontSize: 24, fontWeight: 600 }}>{f.name}</span>
                  <span style={{ fontFamily: "var(--font-mono-stack)", fontSize: 14, color: "#4D7FFF", letterSpacing: "0.1em" }}>
                    {f.role}
                  </span>
                  <span style={{ fontSize: 16, color: "#8B93A3", lineHeight: 1.6 }}>{f.bio}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
