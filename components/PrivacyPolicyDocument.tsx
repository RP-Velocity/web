import {
  PRIVACY_LAST_UPDATED,
  privacySections,
} from "@/lib/privacy-policy";

export default function PrivacyPolicyDocument() {
  return (
    <article
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 40,
        color: "var(--text-body)",
        lineHeight: 1.65,
        fontSize: 16,
      }}
    >
      <header style={{ display: "flex", flexDirection: "column", gap: 14, paddingBottom: 8, borderBottom: "1px solid var(--border)" }}>
        <span
          style={{
            fontFamily: "var(--font-mono-stack)",
            fontSize: 13,
            color: "var(--blue)",
            letterSpacing: "0.22em",
          }}
        >
          ADATVÉDELEM
        </span>
        <h1
          style={{
            margin: 0,
            fontSize: "clamp(32px, 5vw, 44px)",
            fontWeight: 700,
            color: "var(--text-primary)",
            letterSpacing: "-0.01em",
            lineHeight: 1.15,
          }}
        >
          Adatvédelmi tájékoztató
        </h1>
        <p style={{ margin: 0, fontFamily: "var(--font-mono-stack)", fontSize: 13, color: "var(--text-tertiary)" }}>
          Hatályos: {PRIVACY_LAST_UPDATED}
        </p>
      </header>

      {privacySections.map((section) => (
        <section key={section.title} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <h2
            style={{
              margin: 0,
              fontSize: 22,
              fontWeight: 600,
              color: "var(--text-primary)",
              letterSpacing: "-0.01em",
            }}
          >
            {section.title}
          </h2>
          {section.paragraphs.map((paragraph) => (
            <p key={paragraph} style={{ margin: 0, color: "var(--text-secondary)" }}>
              {paragraph}
            </p>
          ))}
          {section.bullets && (
            <ul style={{ margin: 0, paddingLeft: 22, display: "flex", flexDirection: "column", gap: 10 }}>
              {section.bullets.map((item) => (
                <li key={item} style={{ color: "var(--text-secondary)" }}>
                  {item}
                </li>
              ))}
            </ul>
          )}
        </section>
      ))}

      <footer
        style={{
          marginTop: 8,
          paddingTop: 24,
          borderTop: "1px solid var(--border)",
          fontFamily: "var(--font-mono-stack)",
          fontSize: 13,
          color: "var(--text-tertiary)",
        }}
      >
        RP Velocity · hello@rpvelocity.hu · {PRIVACY_LAST_UPDATED}
      </footer>
    </article>
  );
}
