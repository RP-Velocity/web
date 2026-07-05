import Reveal from "./Reveal";

const stats = [
  { value: "−38%", label: "átlagos átfutásiidő-csökkenés a bevezetett folyamatokban" },
  { value: "12+", label: "automatizált kulcsfolyamat tervezés alatt és élesben" },
  { value: "Hetek", label: "nem hónapok - az első mérhető eredményig" },
];

export default function TrustBar() {
  return (
    <section style={{ borderTop: "1px solid #1B2230", borderBottom: "1px solid #1B2230", background: "#0D1421" }}>
      <Reveal
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "44px 6vw",
        }}
      >
        <div className="grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 40 }}>
          {stats.map((stat, i) => (
            <div
              key={stat.value}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 6,
                alignItems: "center",
                textAlign: "center",
                borderLeft: i === 1 ? "1px solid #1B2230" : undefined,
                borderRight: i === 1 ? "1px solid #1B2230" : undefined,
              }}
            >
              <span style={{ fontFamily: "var(--font-mono-stack)", fontSize: 40, fontWeight: 500, color: "#4D7FFF" }}>
                {stat.value}
              </span>
              <span style={{ fontSize: 16, color: "#8B93A3" }}>{stat.label}</span>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
