import s from "./interactive.module.css";

function ChevronRow({ colors, delay }: { colors: [string, string, string]; delay: number }) {
  return (
    <div style={{ animation: `chevDrift 4.5s ease-in-out ${delay}s infinite` }}>
      <svg width="260" height="92" viewBox="0 0 94 33">
        <polygon points="0,0 10,0 21,16.5 10,33 0,33 11,16.5" fill={colors[0]} />
        <polygon points="11,0 21,0 32,16.5 21,33 11,33 22,16.5" fill={colors[1]} />
        <polygon points="22,0 32,0 43,16.5 32,33 22,33 33,16.5" fill={colors[2]} />
      </svg>
    </div>
  );
}

export default function Hero() {
  return (
    <header
      id="hero"
      style={{
        position: "relative",
        minHeight: "88vh",
        display: "flex",
        alignItems: "center",
        padding: "80px 6vw",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(#1B2230 1px, transparent 1px), linear-gradient(90deg, #1B2230 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          opacity: 0.3,
          animation: "gridPulse 7s ease-in-out infinite",
        }}
      />
      <div
        className="grid-2"
        style={{
          position: "relative",
          display: "grid",
          gridTemplateColumns: "1.2fr 0.8fr",
          gap: 60,
          alignItems: "center",
          width: "100%",
          maxWidth: 1280,
          margin: "0 auto",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 28, maxWidth: 680 }}>
          <span
            className="hero-eyebrow"
            style={{
              fontFamily: "var(--font-mono-stack)",
              fontSize: 14,
              color: "#4D7FFF",
              letterSpacing: "0.22em",
              animation: "heroIn 0.7s ease 0.05s backwards",
            }}
          >
            AI · SZOFTVER · FOLYAMATOPTIMALIZÁLÁS
          </span>
          <h1
            style={{
              margin: 0,
              fontSize: "clamp(44px, 4.6vw, 72px)",
              fontWeight: 700,
              lineHeight: 1.08,
              letterSpacing: "-0.02em",
              textWrap: "pretty",
              animation: "heroIn 0.7s ease 0.15s backwards",
            }}
          >
            A cégében rejlő potenciál egy letisztult rendszerre vár
          </h1>
          <p
            style={{
              margin: 0,
              fontSize: 20,
              color: "#8B93A3",
              lineHeight: 1.6,
              maxWidth: 560,
              animation: "heroIn 0.7s ease 0.3s backwards",
            }}
          >
            Személyre szabott AI- és szoftveres eszközökkel alakítjuk át a manuális, széttartó folyamatokat
            átlátható, mérhetően gyorsabb működéssé.
          </p>
          <div className="hero-actions" style={{ display: "flex", gap: 16, animation: "heroIn 0.7s ease 0.45s backwards" }}>
            <a href="#kapcsolat" className={s.btnPrimary} style={{ fontSize: 17, padding: "16px 34px" }}>
              Kérjen ingyenes felmérést
            </a>
            <a href="#folyamat" className={s.btnSecondary} style={{ fontSize: 17, padding: "16px 34px" }}>
              Hogyan dolgozunk
            </a>
          </div>
        </div>
        <div className="hero-graphic" style={{ display: "flex", justifyContent: "center", animation: "heroIn 0.9s ease 0.4s backwards" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <ChevronRow colors={["#2A3B5E", "#3A62C4", "#4D7FFF"]} delay={0} />
            <div style={{ marginLeft: 60 }}>
              <ChevronRow colors={["#1B2230", "#2A3B5E", "#3A62C4"]} delay={0.6} />
            </div>
            <ChevronRow colors={["#2A3B5E", "#4D7FFF", "#F2F5FA"]} delay={1.2} />
          </div>
        </div>
      </div>
    </header>
  );
}
