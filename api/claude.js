export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { goal, area, levelId, levelName, levelObjective, principles } = req.body;

  if (!goal || !area) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 1000,
        messages: [
          {
            role: "user",
            content: `Eres un coach de prosperidad bíblica. El usuario está en Nivel ${levelId} (${levelName}: ${levelObjective}) y tiene esta meta: "${goal}" en el área de ${area}.

Basado en estos principios bíblicos: ${principles}

Genera exactamente 8 preguntas de check-in diario específicas para esta meta. Las preguntas deben:
- Ser respondibles con Sí/No
- Estar conectadas directamente a la meta específica
- Reflejar hábitos concretos y medibles del día a día
- Estar ancladas implícitamente en principios bíblicos

Responde SOLO con un array JSON de 8 strings. Sin explicaciones, sin markdown, sin texto adicional. Solo el array JSON puro.`,
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Anthropic API error:", errorData);
      return res.status(500).json({ error: "AI service error" });
    }

    const data = await response.json();
    const text = data.content?.[0]?.text || "[]";
    const clean = text.replace(/```json|```/g, "").trim();

    let questions;
    try {
      questions = JSON.parse(clean);
    } catch {
      questions = [
        "¿Dediqué tiempo concreto a esta meta hoy?",
        "¿Tomé al menos una acción medible hacia esta meta?",
        "¿Oré específicamente por esta meta hoy?",
        "¿Apliqué disciplina financiera relacionada con esta meta?",
        "¿Evité decisiones que alejan esta meta?",
        "¿Busqué consejo o aprendí algo nuevo sobre esta meta?",
        "¿Fui honesto en mis decisiones relacionadas con esta meta?",
        "¿Invertí en relaciones que apoyan esta meta?",
      ];
    }

    return res.status(200).json({ questions });
  } catch (error) {
    console.error("Server error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}