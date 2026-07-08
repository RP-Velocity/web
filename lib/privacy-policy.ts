export const PRIVACY_PDF_PATH = "/adatvedelmi-tajekoztato.pdf";

export const PRIVACY_PAGE_PATH = "/adatvedelem";

export const PRIVACY_LAST_UPDATED = "2026. július 8.";

export type PrivacySection = {
  title: string;
  paragraphs: string[];
  bullets?: string[];
};

export const privacySections: PrivacySection[] = [
  {
    title: "1. Bevezetés",
    paragraphs: [
      "Jelen Adatvédelmi tájékoztató az RP Velocity (a továbbiakban: Adatkezelő) weboldalán (rpvelocity.hu) történő adatkezelésekre vonatkozik. Az Adatkezelő elkötelezett személyes adatai védelme iránt, és adatkezeléseit az Európai Unió Általános Adatvédelmi Rendelete (GDPR) és a vonatkozó magyar jogszabályok szerint végzi.",
      "Az Adatkezelő a weboldal üzemeltetője, amely AI- és szoftveres tanácsadási szolgáltatásokat mutat be. Kapcsolattartás: hello@rpvelocity.hu.",
    ],
  },
  {
    title: "2. Az adatkezelő adatai",
    paragraphs: [
      "Adatkezelő neve: RP Velocity",
      "E-mail: hello@rpvelocity.hu",
      "A weboldal üzemeltetői: Póra Szilárd és Rátz Levente (társalapítók).",
      "Az Adatkezelő nem jelölt ki külön adatvédelmi tisztviselőt (DPO), mivel adatkezelése nem teszi szükségessé a GDPR 37. cikk szerinti kötelezettséget.",
    ],
  },
  {
    title: "3. Kezelt adatok köre",
    paragraphs: ["A weboldal használata során az alábbi adatkategóriák kezelhetők:"],
    bullets: [
      "Technikai adatok: IP-cím, böngésző típusa, operációs rendszer, látogatás időpontja, megtekintett aloldalak (szervernaplók és – hozzájárulás esetén – analitikai eszközök útján).",
      "Sütibeállítások: az Ön cookie-hozzájárulási döntései (szükséges, analitika, marketing kategóriák), a böngésző helyi tárolójában (localStorage).",
      "Kapcsolatfelvételi adatok: az Ön által önként megadott e-mail cím, név és üzenet tartalma, ha e-mailben keres minket.",
    ],
  },
  {
    title: "4. Adatkezelés célja és jogalapja",
    paragraphs: ["Az egyes adatkezelések célja és jogalapja:"],
    bullets: [
      "Weboldal működtetése, biztonsága: technikai adatok kezelése a weboldal elérhetőségének biztosítása és visszaélések megelőzése érdekében (jogos érdek – GDPR 6. cikk (1) f)).",
      "Sütik és hozzájárulás kezelése: cookie-beállítások tárolása és tiszteletben tartása (jogos érdek / szükséges a hozzájárulás rögzítéséhez – GDPR 6. cikk (1) f) és (1) a)).",
      "Analitika: anonim látogatottsági statisztikák gyűjtése a weboldal fejlesztéséhez, kizárólag az Ön kifejezett hozzájárulása alapján (GDPR 6. cikk (1) a)).",
      "Marketing: személyre szabott tartalmak és kampánymérés, kizárólag az Ön kifejezett hozzájárulása alapján (GDPR 6. cikk (1) a)).",
      "Kapcsolattartás: megkeresések megválaszolása, szolgáltatási ajánlatok előkészítése (szerződéskötést megelőző lépések / jogos érdek – GDPR 6. cikk (1) b) / (1) f)).",
    ],
  },
  {
    title: "5. Sütik (cookie-k)",
    paragraphs: [
      "A weboldal sütiket és helyi tárolót használ. A sütik kis szövegfájlok, amelyeket a böngésző az Ön eszközén tárol. A weboldal betöltésekor egy süti-hozzájárulási sáv jelenik meg, amelyben elfogadhatja, elutasíthatja vagy kategóriánként testre szabhatja a sütiket.",
      "A sütik kategóriái:",
    ],
    bullets: [
      "Szükséges: az oldal alapvető működéséhez és a hozzájárulás rögzítéséhez elengedhetetlen; mindig aktív.",
      "Analitika: anonim látogatottsági adatok gyűjtése; csak hozzájárulással aktiválódik.",
      "Marketing: hirdetési és kampánymérési célú sütik; csak hozzájárulással aktiválódik.",
    ],
  },
  {
    title: "6. Adatmegőrzés",
    paragraphs: ["Az adatokat csak a szükséges ideig őrizzük:"],
    bullets: [
      "Cookie-hozzájárulás: a döntés visszavonásáig, legfeljebb 12 hónapig.",
      "Szervernaplók: általában 30–90 napig.",
      "Kapcsolatfelvételi e-mailek: az ügy lezárásától számított 3 évig, vagy hosszabb ideig, ha jogszabály kötelezi.",
      "Analitikai/marketing adatok: a vonatkozó szolgáltató adatmegőrzési szabályzata szerint, legfeljebb 26 hónapig.",
    ],
  },
  {
    title: "7. Adattovábbítás és adatfeldolgozók",
    paragraphs: [
      "Személyes adatait harmadik félnek csak jogalappal, szükséges mértékben adjuk át. Az adatok feldolgozásához megbízható szolgáltatókat (tárhelyszolgáltató, e-mail szolgáltató, esetleges analitikai eszközök) vehetünk igénybe, akikkel adatfeldolgozói szerződést kötünk.",
      "Az adatok az Európai Gazdasági Térségen (EGT) belül kerülnek feldolgozásra. EGT-n kívüli továbbítás esetén megfelelő garanciákat (pl. standard szerződéses záradékok) alkalmazunk.",
    ],
  },
  {
    title: "8. Az érintett jogai",
    paragraphs: ["Önt a GDPR alapján az alábbi jogok illetik meg:"],
    bullets: [
      "Hozzáférés: tájékoztatást kérhet arról, hogy kezelünk-e Önről adatot.",
      "Helyesbítés: kérheti a pontatlan adatok javítását.",
      "Törlés („elfeledtetéshez való jog”): kérheti adatai törlését, ha annak nincs további jogalapja.",
      "Adathordozhatóság: kérheti adatai strukturált, géppel olvasható formátumban való átadását.",
      "Tiltakozás: jogos érdeken alapuló adatkezelés ellen tiltakozhat.",
      "Hozzájárulás visszavonása: analitikai és marketing sütik esetén bármikor módosíthatja döntését a weboldal láblécében található „Cookie beállítások” linken keresztül.",
      "Panasz: panasszal élhet a Nemzeti Adatvédelmi és Információszabadság Hatóságnál (NAIH): www.naih.hu, 1530 Budapest, Pf. 5.",
    ],
  },
  {
    title: "9. Adatbiztonság",
    paragraphs: [
      "Az Adatkezelő megfelelő technikai és szervezési intézkedéseket alkalmaz az adatok védelme érdekében, beleértve a biztonságos kapcsolatot (HTTPS), a hozzáférés korlátozását és a szükséges szoftveres védelmeket.",
    ],
  },
  {
    title: "10. Kiskorúak",
    paragraphs: [
      "Weboldalunk nem irányul 16 év alatti személyekre. Tudatosan nem gyűjtünk kiskorúaktól személyes adatot. Ha tudomásunkra jut ilyen adatkezelés, azt haladéktalanul töröljük.",
    ],
  },
  {
    title: "11. A tájékoztató módosítása",
    paragraphs: [
      "Az Adatkezelő fenntartja a jogot jelen tájékoztató frissítésére. A módosításokat ezen az oldalon és a közzétett PDF-ben jelezzük. Lényeges változás esetén – szükség szerint – új hozzájárulást kérünk.",
    ],
  },
];
