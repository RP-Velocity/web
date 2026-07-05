import Reveal from "./Reveal";

const steps = [
  {
    n: "01",
    title: "Felmérés",
    body: "Ingyenes átvilágítás: hol veszít a cég időt és pénzt, és mi hozná a legnagyobb hatást.",
  },
  {
    n: "02",
    title: "Tervezés",
    body: "Letisztult megoldási terv fix hatókörrel, ütemezéssel és előre definiált sikermutatókkal.",
  },
  {
    n: "03",
    title: "Bevezetés",
    body: "Gyors, zökkenőmentes indulás a meglévő eszközeikhez illesztve - betanítással együtt.",
  },
  {
    n: "04",
    title: "Skálázás",
    body: "Mérjük az eredményeket, finomhangolunk, és a bevált rendszert újabb területekre visszük.",
  },
];

export default function Process() {
  return (
    <section
      id="folyamat"
      style={{ padding: "120px 6vw", background: "#0D1421", borderTop: "1px solid #1B2230", borderBottom: "1px solid #1B2230" }}
    >
      <Reveal style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 56 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <span style={{ fontFamily: "var(--font-mono-stack)", fontSize: 14, color: "#4D7FFF", letterSpacing: "0.22em" }}>
              FOLYAMAT
            </span>
            <h2 style={{ margin: 0, fontSize: 44, fontWeight: 700, letterSpacing: "-0.01em" }}>Hogyan dolgozunk</h2>
            <p style={{ margin: 0, fontSize: 20, color: "#8B93A3", maxWidth: 700, lineHeight: 1.6 }}>
              A „komplex&quot; nálunk kiszámíthatót jelent: négy átlátható lépés, minden szakasz végén
              kézzelfogható eredménnyel.
            </p>
          </div>
          <div className="grid-4" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 28 }}>
            {steps.map((step) => (
              <div key={step.n} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <span style={{ fontFamily: "var(--font-mono-stack)", fontSize: 30, color: "#4D7FFF" }}>{step.n}</span>
                  <div style={{ flex: 1, height: 1, background: "#2A3B5E" }} />
                </div>
                <span style={{ fontSize: 22, fontWeight: 600 }}>{step.title}</span>
                <span style={{ fontSize: 16, color: "#8B93A3", lineHeight: 1.6 }}>{step.body}</span>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
