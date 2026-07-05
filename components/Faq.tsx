import Reveal from "./Reveal";

const faqs = [
  {
    q: "Mennyibe kerül egy projekt?",
    a: "A felmérés ingyenes, utána fix áras ajánlatot adunk - nincs óradíjas bizonytalanság. A hatókört úgy szabjuk, hogy a befektetés a mért megtakarításból belátható időn belül megtérüljön.",
  },
  {
    q: "Mennyi idő alatt lesz kész?",
    a: "Az első működő eredményt jellemzően 2–4 héten belül szállítjuk. Nagyobb rendszereknél szakaszosan vezetünk be, hogy már az első hetekben legyen kézzelfogható haszon.",
  },
  {
    q: "Biztonságban vannak az adataink?",
    a: "Igen. Az adatok az Ön kontrollja alatt maradnak, a megoldásokat GDPR-kompatibilisen, titoktartás mellett építjük, és igény szerint teljesen zárt, saját környezetben üzemeltethetők.",
  },
  {
    q: "Kis cégnek is megéri?",
    a: "Gyakran nekik éri meg a legjobban: ahol néhány ember visz mindent, ott egy-egy automatizált folyamat aránylag a legtöbb időt szabadítja fel. A hatókört a cég méretéhez igazítjuk.",
  },
];

export default function Faq() {
  return (
    <section style={{ padding: "120px 6vw", background: "#0D1421", borderTop: "1px solid #1B2230", borderBottom: "1px solid #1B2230" }}>
      <Reveal style={{ maxWidth: 900, margin: "0 auto" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 56 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <span style={{ fontFamily: "var(--font-mono-stack)", fontSize: 14, color: "#4D7FFF", letterSpacing: "0.22em" }}>
              GYIK
            </span>
            <h2 style={{ margin: 0, fontSize: 44, fontWeight: 700, letterSpacing: "-0.01em" }}>Gyakori kérdések</h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {faqs.map((item, i) => (
              <details key={item.q} style={{ borderBottom: i < faqs.length - 1 ? "1px solid #1B2230" : undefined }}>
                <summary
                  style={{
                    fontSize: 21,
                    fontWeight: 600,
                    color: "#F2F5FA",
                    padding: "28px 0",
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 20,
                  }}
                >
                  <span>{item.q}</span>
                  <span style={{ fontFamily: "var(--font-mono-stack)", color: "#4D7FFF", fontSize: 24 }}>+</span>
                </summary>
                <p style={{ margin: 0, padding: "0 0 28px", fontSize: 17, color: "#8B93A3", lineHeight: 1.65, maxWidth: 760 }}>
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
