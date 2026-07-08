import Reveal from "./Reveal";

const pillars = [
  {
    n: "01",
    title: "Személyre szabott AI",
    body: "Nem dobozos termék: az Ön folyamataira, adataira és csapatára hangolt eszközök.",
  },
  {
    n: "02",
    title: "Folyamatoptimalizálás",
    body: "A bonyolultból egyszerűt csinálunk: átlátható, könnyen bevezethető rendszereket.",
  },
  {
    n: "03",
    title: "Mérhető növekedés",
    body: "Minden projekt számokban kimutatható eredménnyel zárul - heteken belül, nem félév múlva.",
  },
];

export default function Solution() {
  return (
    <section
      id="megoldas"
      style={{ padding: "120px 6vw", background: "#0D1421", borderTop: "1px solid #1B2230", borderBottom: "1px solid #1B2230" }}
    >
      <Reveal style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 64 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 18, maxWidth: 820 }}>
            <span style={{ fontFamily: "var(--font-mono-stack)", fontSize: 14, color: "#4D7FFF", letterSpacing: "0.22em" }}>
              A MEGOLDÁS
            </span>
            <h2 style={{ margin: 0, fontSize: 44, fontWeight: 700, lineHeight: 1.15, letterSpacing: "-0.01em" }}>
              Komplex kihívások, letisztult rendszerek. Maximális hatás.
            </h2>
            <p style={{ margin: 0, fontSize: 20, color: "#8B93A3", lineHeight: 1.6 }}>
              Újragondoljuk a vállalkozások működését: a legkomplexebb folyamatoptimalizálási kihívásokra is
              könnyen bevezethető megoldásokat szállítunk - kompromisszumok nélkül.
            </p>
          </div>
          <div className="grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 32 }}>
            {pillars.map((p) => (
              <div key={p.n} style={{ display: "flex", flexDirection: "column", gap: 16, borderTop: "3px solid #4D7FFF", paddingTop: 28 }}>
                <span style={{ fontFamily: "var(--font-mono-stack)", fontSize: 14, color: "#566072" }}>{p.n}</span>
                <span style={{ fontSize: 24, fontWeight: 600 }}>{p.title}</span>
                <span style={{ fontSize: 17, color: "#8B93A3", lineHeight: 1.6 }}>{p.body}</span>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
