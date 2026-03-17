const FALLBACK = [
  { ref: "Josué 1:8", text: "Nunca se apartará de tu boca este libro de la ley... medita en él de día y de noche... entonces harás prosperar tu camino." },
  { ref: "Proverbios 10:4", text: "La mano negligente empobrece, pero la mano de los diligentes enriquece." },
  { ref: "Malaquías 3:10", text: "Probadme ahora en esto, dice el Señor de los ejércitos, si no os abriré las ventanas de los cielos." },
  { ref: "3 Juan 1:2", text: "Amado, deseo que seas prosperado en todo así como prospera tu alma, y que tengas buena salud." },
  { ref: "Lucas 16:10", text: "El que es fiel en lo muy poco, también en lo más es fiel." },
];

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { ref, version } = req.query;
  const bibleVersion = version || "es-RVR1960";
  const diff = Math.floor((new Date() - new Date("2024-01-01")) / 86400000);

  if (!ref) {
    return res.status(200).json(FALLBACK[diff % FALLBACK.length]);
  }

  const [book, chapter, verse] = ref.split("/");

  try {
    const url = `https://bible.helloao.org/api/${bibleVersion}/${book}/${chapter}.json`;
    const response = await fetch(url, {
      headers: { "User-Agent": "prosperity-app/1.0" },
    });

    if (!response.ok) throw new Error(`Bible API returned ${response.status}`);

    const data = await response.json();
    const verseData = data.verses?.find(v => v.number === parseInt(verse));

    if (!verseData) throw new Error("Verse not found");

    return res.status(200).json({
      ref: `${book} ${chapter}:${verse}`,
      text: verseData.text,
    });
  } catch (error) {
    console.error("Bible API error:", error.message);
    return res.status(200).json(FALLBACK[diff % FALLBACK.length]);
  }
}