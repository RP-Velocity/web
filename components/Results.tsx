import Reveal from "./Reveal";

const metrics = [
  { value: "−38%", label: "átfutási idő a rendelésfeldolgozásban" },
  { value: "0", label: "adminisztrációs hiba az automatizált ágon" },
  { value: "3 hét", label: "a felméréstől az éles indulásig" },
];

export default function Results() {
  return (
    <section style={{ padding: "120px 6vw" }}>
      <Reveal style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <span style={{ fontFamily: "var(--font-mono-stack)", fontSize: 14, color: "#4D7FFF", letterSpacing: "0.22em" }}>
              EREDMÉNYEK
            </span>
            <h2 style={{ margin: 0, fontSize: 44, fontWeight: 700, lineHeight: 1.15, letterSpacing: "-0.01em" }}>
              Mintaprojekt: rendelésfeldolgozás újragondolva
            </h2>
            <p style={{ margin: 0, fontSize: 19, color: "#8B93A3", lineHeight: 1.65 }}>
              Egy kereskedő cég rendelésfeldolgozását automatizáltuk: a beérkező megrendelések rögzítése,
              ellenőrzése és visszaigazolása kézi munkából egyetlen felügyelt folyamattá vált.
            </p>
            <p style={{ margin: 0, fontSize: 19, color: "#8B93A3", lineHeight: 1.65 }}>
              Az első referenciáink most készülnek - kérje el a részletes esettanulmányt a felmérés során.
            </p>
          </div>
          <div style={{ background: "#0D1421", border: "1px solid #1B2230", padding: 56, display: "flex", flexDirection: "column", gap: 36 }}>
            {metrics.map((m, i) => (
              <div
                key={m.value}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 6,
                  borderBottom: i < metrics.length - 1 ? "1px solid #1B2230" : undefined,
                  paddingBottom: i < metrics.length - 1 ? 28 : undefined,
                }}
              >
                <span style={{ fontFamily: "var(--font-mono-stack)", fontSize: 56, fontWeight: 500, color: "#4D7FFF", lineHeight: 1 }}>
                  {m.value}
                </span>
                <span style={{ fontSize: 17, color: "#8B93A3" }}>{m.label}</span>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
