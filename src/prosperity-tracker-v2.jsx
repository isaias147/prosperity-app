import { useState, useEffect } from "react";

// ── CONSTANTS ─────────────────────────────────────────────────────────────────

const STATIC_VERSES = [
  { ref: "Josué 1:8", text: "Nunca se apartará de tu boca este libro de la ley; antes bien, de día y de noche meditarás en él... entonces harás prosperar tu camino." },
  { ref: "Proverbios 3:9-10", text: "Honra al Señor con tus bienes y con las primicias de todos tus frutos; y serán llenos tus graneros con abundancia." },
  { ref: "Malaquías 3:10", text: "Probadme ahora en esto, dice el Señor de los ejércitos, si no os abriré las ventanas de los cielos y vaciaré sobre vosotros bendición hasta que sobreabunde." },
  { ref: "Deuteronomio 8:18", text: "Acuérdate del Señor tu Dios, porque él te da el poder para hacer las riquezas, a fin de confirmar su pacto." },
  { ref: "3 Juan 1:2", text: "Amado, deseo que seas prosperado en todo así como prospera tu alma, y que tengas buena salud." },
  { ref: "Proverbios 10:4", text: "La mano negligente empobrece, pero la mano de los diligentes enriquece." },
  { ref: "Filipenses 4:19", text: "Mi Dios, pues, suplirá todo lo que os falta conforme a sus riquezas en gloria en Cristo Jesús." },
  { ref: "Proverbios 13:11", text: "Las riquezas de vanidad disminuyen, pero el que recoge con mano laboriosa las aumenta." },
  { ref: "Génesis 39:3", text: "Y vio su amo que el Señor estaba con él, y que todo lo que él hacía, el Señor lo hacía prosperar en su mano." },
  { ref: "Salmos 1:3", text: "Será como árbol plantado junto a corrientes de aguas, que da su fruto en su tiempo... y todo lo que hace prosperará." },
  { ref: "Proverbios 21:5", text: "Los pensamientos del diligente ciertamente son ventajosos, pero todo el que se apresura, ciertamente llega a la pobreza." },
  { ref: "Lucas 16:10", text: "El que es fiel en lo muy poco, también en lo más es fiel; y el que en lo muy poco es injusto, también en lo más es injusto." },
  { ref: "Isaías 48:17", text: "Yo soy el Señor Dios tuyo, que te enseña provechosamente, que te encamina por el camino que debes seguir." },
  { ref: "Proverbios 22:29", text: "¿Has visto hombre solícito en su trabajo? Delante de los reyes estará; no estará delante de los de baja condición." },
  { ref: "Salmos 112:1-3", text: "Bienaventurado el hombre que teme al Señor... sus descendientes serán poderosos en la tierra... bienes y riquezas hay en su casa." },
  { ref: "Proverbios 8:21", text: "Para hacer que los que me aman tengan su heredad, y que yo llene sus tesoros." },
  { ref: "Deuteronomio 28:12", text: "Te abrirá el Señor su buen tesoro, el cielo, para enviar la lluvia a tu tierra en su tiempo, y para bendecir toda obra de tus manos." },
  { ref: "Proverbios 11:25", text: "El alma generosa será prosperada; y el que saciare, él también será saciado." },
  { ref: "2 Crónicas 26:5", text: "Y en estos días en que buscó al Señor, él le prosperó." },
  { ref: "Romanos 8:32", text: "El que no escatimó ni a su propio Hijo, ¿cómo no nos dará también con él todas las cosas?" },
  { ref: "Proverbios 16:3", text: "Encomienda al Señor tus obras, y tus pensamientos serán afirmados." },
  { ref: "Mateo 6:33", text: "Buscad primeramente el reino de Dios y su justicia, y todas estas cosas os serán añadidas." },
  { ref: "Proverbios 6:6-8", text: "Ve a la hormiga, oh perezoso, mira sus caminos y sé sabio; la cual en el verano hace su provisión y recoge en el tiempo de la siega su mantenimiento." },
  { ref: "Salmos 37:4", text: "Deléitate asimismo en el Señor, y él te concederá las peticiones de tu corazón." },
  { ref: "Proverbios 4:7", text: "Sabiduría ante todo; adquiere sabiduría; y sobre todas tus posesiones adquiere inteligencia." },
  { ref: "Isaías 1:19", text: "Si quisiereis y oyereis, comeréis el bien de la tierra." },
  { ref: "Jeremías 29:11", text: "Porque yo sé los pensamientos que tengo acerca de vosotros, pensamientos de paz y no de mal, para daros el fin que esperáis." },
  { ref: "Proverbios 24:3-4", text: "Con sabiduría se edifica la casa, y con prudencia se afirma; y con ciencia se llenan las cámaras de todo bien preciado y agradable." },
  { ref: "Eclesiastés 9:10", text: "Todo lo que te viniere a la mano para hacer, hazlo según tus fuerzas." },
  { ref: "Proverbios 27:23", text: "Sé diligente en conocer el estado de tus ovejas, y mira con cuidado por tus rebaños." },
  { ref: "Colosenses 3:23", text: "Y todo lo que hagáis, hacedlo de corazón, como para el Señor y no para los hombres." },
];

const PRINCIPLES = [
  {
    area: "Espiritual", color: "#C9A84C", icon: "✦",
    items: [
      { id: "diezmo", name: "Diezmo", promise: "Malaquías 3:10", practice: "¿Honré a Dios con mis finanzas hoy?" },
      { id: "oracion", name: "Oración", promise: "Filipenses 4:6-7", practice: "¿Oré y presenté mis metas a Dios hoy?" },
      { id: "palabra", name: "Palabra", promise: "Josué 1:8", practice: "¿Leí y medité en la Palabra hoy?" },
    ]
  },
  {
    area: "Financiero", color: "#7EB8A4", icon: "◈",
    items: [
      { id: "administracion", name: "Administración", promise: "Lucas 16:10", practice: "¿Administré bien cada recurso que Dios me dio hoy?" },
      { id: "ahorro", name: "Ahorro", promise: "Proverbios 21:20", practice: "¿Aparté algo para ahorro o inversión hoy?" },
      { id: "deudas", name: "Deudas", promise: "Romanos 13:8", practice: "¿Evité deudas innecesarias y trabajé en reducir las actuales?" },
    ]
  },
  {
    area: "Carácter", color: "#A78BCA", icon: "◆",
    items: [
      { id: "diligencia", name: "Diligencia", promise: "Proverbios 10:4", practice: "¿Trabajé con excelencia y sin pereza hoy?" },
      { id: "honestidad", name: "Honestidad", promise: "Proverbios 11:1", practice: "¿Fui completamente honesto en todas mis interacciones hoy?" },
      { id: "disciplina", name: "Disciplina", promise: "3 Juan 1:2", practice: "¿Me discipliné en hábitos que hacen prosperar mi alma hoy?" },
    ]
  },
  {
    area: "Relacional", color: "#E07B7B", icon: "◉",
    items: [
      { id: "comunidad", name: "Comunidad", promise: "Proverbios 27:17", practice: "¿Me conecté con personas que me edifican hoy?" },
      { id: "mentores", name: "Consejo Sabio", promise: "Proverbios 15:22", practice: "¿Busqué o apliqué consejo de alguien más sabio hoy?" },
      { id: "red", name: "Red", promise: "Eclesiastés 4:9", practice: "¿Invertí en relaciones estratégicas que multiplican mi propósito?" },
    ]
  }
];

const LEVELS = [
  { id: 1, name: "Salida", color: "#7EB8A4", objective: "Estabilidad financiera", description: "Deudas activas, ingresos irregulares, comenzando la disciplina" },
  { id: 2, name: "Crecimiento", color: "#C9A84C", objective: "Abundancia sostenible", description: "Deudas reducidas, ahorro activo, ingresos crecientes" },
  { id: 3, name: "Consolidación", color: "#A78BCA", objective: "Riqueza generacional", description: "Abundancia estable, negocios establecidos, construyendo herencia" },
  { id: 4, name: "Mayordomía", color: "#E07B7B", objective: "Impacto del Reino", description: "Próspero con responsabilidad social bíblica activa" },
];

const ONBOARDING_Q = [
  { id: "deudas", q: "¿Cuál es tu situación actual de deudas?", opts: ["Tengo deudas significativas", "Estoy reduciendo deudas", "Sin deudas o mínimas"], scores: [0, 1, 2] },
  { id: "ahorro", q: "¿Ahorras regularmente?", opts: ["No tengo ahorro", "Ahorro ocasional", "Ahorro activo y constante"], scores: [0, 1, 2] },
  { id: "ingresos", q: "¿Cómo son tus ingresos?", opts: ["Irregulares o insuficientes", "Estables", "Estables y crecientes"], scores: [0, 1, 2] },
  { id: "diezmo_ob", q: "¿Diezmas actualmente?", opts: ["No diezmo", "Ocasionalmente", "Sí, consistentemente"], scores: [0, 1, 2] },
  { id: "comunidad_ob", q: "¿Tienes comunidad de fe activa?", opts: ["No tengo", "Ocasional", "Activa y comprometida"], scores: [0, 1, 2] },
  { id: "mentores_ob", q: "¿Tienes mentores o accountability?", opts: ["No tengo", "Informal", "Mentoría activa"], scores: [0, 1, 2] },
  { id: "version", q: "¿Cuál versión de la Biblia prefieres?", opts: ["RVR 1960", "NVI", "LBLA", "DHH"], isVersion: true },
];

const VERSION_MAP = { 0: "es-RVR1960", 1: "es-NVI", 2: "es-LBLA", 3: "es-DHH" };

// ── HELPERS ──────────────────────────────────────────────────────────────────

const ALL_IDS = PRINCIPLES.flatMap(p => p.items.map(i => i.id));
const todayKey = () => new Date().toISOString().split("T")[0];
const fmt = (d) => new Date(d + "T12:00:00").toLocaleDateString("es-ES", { weekday: "long", day: "numeric", month: "long" });
const fmtShort = (d) => new Date(d + "T12:00:00").toLocaleDateString("es-ES", { day: "numeric", month: "short" });
const getLast7 = () => Array.from({ length: 7 }, (_, i) => { const d = new Date(); d.setDate(d.getDate() - (6 - i)); return d.toISOString().split("T")[0]; });
const getDayVerse = () => { const diff = Math.floor((new Date() - new Date("2024-01-01")) / 86400000); return STATIC_VERSES[diff % STATIC_VERSES.length]; };
const scoreToLevel = (score) => { if (score >= 9) return 3; if (score >= 5) return 2; return 1; };

// ── BIBLE API FETCH ───────────────────────────────────────────────────────────
// Uses /api/bible Vercel function which proxies to bible.helloao.org
// Falls back to static verse if API unavailable
const fetchDailyVerse = async (bibleVersion) => {
  const refs = ["Joshua/1/8", "Malachi/3/10", "Proverbs/3/9", "Proverbs/10/4", "Luke/16/10"];
  const diff = Math.floor((new Date() - new Date("2024-01-01")) / 86400000);
  const ref = refs[diff % refs.length];
  try {
    const res = await fetch(`/api/bible?ref=${ref}&version=${bibleVersion || "es-RVR1960"}`);
    if (!res.ok) throw new Error();
    return await res.json();
  } catch {
    return getDayVerse();
  }
};

// ── AI CHECKLIST VIA BACKEND ──────────────────────────────────────────────────
const generateChecklist = async (goal, area, userLevel) => {
  const principlesList = PRINCIPLES.find(p => p.area === area)?.items.map(i => `${i.name} (${i.promise})`).join(", ");
  const level = LEVELS.find(l => l.id === userLevel);
  try {
    const res = await fetch("/api/claude", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        goal,
        area,
        levelId: level?.id,
        levelName: level?.name,
        levelObjective: level?.objective,
        principles: principlesList,
      }),
    });
    if (!res.ok) throw new Error();
    const data = await res.json();
    return data.questions;
  } catch {
    // Fallback questions if API unavailable
    return [
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
};

// ── COMPONENT ─────────────────────────────────────────────────────────────────

export default function App() {
  // Onboarding
  const [onboarded, setOnboarded] = useState(false);
  const [obStep, setObStep] = useState(0);
  const [obAnswers, setObAnswers] = useState({});

  // Core state
  const [tab, setTab] = useState("checkin");
  const [checkins, setCheckins] = useState({});
  const [goals, setGoals] = useState([]);
  const [userLevel, setUserLevel] = useState(1);
  const [bibleVersion, setBibleVersion] = useState("es-RVR1960");
  const [expanded, setExpanded] = useState(null);
  const [streak, setStreak] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [verseOpen, setVerseOpen] = useState(true);
  const [verse, setVerse] = useState(getDayVerse());

  // Goal creation + AI
  const [showForm, setShowForm] = useState(false);
  const [newGoal, setNewGoal] = useState({ title: "", area: "Espiritual" });
  const [aiQuestions, setAiQuestions] = useState([]);
  const [selectedQ, setSelectedQ] = useState([]);
  const [aiLoading, setAiLoading] = useState(false);
  const [goalStep, setGoalStep] = useState("form"); // "form" | "select"

  // Load persisted data
  useEffect(() => {
    (async () => {
      try { const c = await window.storage.get("checkins"); if (c) setCheckins(JSON.parse(c.value)); } catch {}
      try { const g = await window.storage.get("goals"); if (g) setGoals(JSON.parse(g.value)); } catch {}
      try { const o = await window.storage.get("onboarded"); if (o) setOnboarded(JSON.parse(o.value)); } catch {}
      try { const l = await window.storage.get("userLevel"); if (l) setUserLevel(JSON.parse(l.value)); } catch {}
      try { const v = await window.storage.get("bibleVersion"); if (v) setBibleVersion(v.value); } catch {}
      setLoaded(true);
    })();
  }, []);

  // Streak + persist checkins
  useEffect(() => {
    if (!loaded) return;
    window.storage.set("checkins", JSON.stringify(checkins)).catch(() => {});
    let s = 0, d = new Date();
    while (true) {
      const k = d.toISOString().split("T")[0];
      const day = checkins[k];
      if (!day || ALL_IDS.filter(id => day[id] !== undefined).length < ALL_IDS.length * 0.5) break;
      s++; d.setDate(d.getDate() - 1);
    }
    setStreak(s);
  }, [checkins, loaded]);

  useEffect(() => { if (loaded) window.storage.set("goals", JSON.stringify(goals)).catch(() => {}); }, [goals, loaded]);

  // Fetch dynamic Bible verse on load
  useEffect(() => {
    if (loaded && bibleVersion) {
      fetchDailyVerse(bibleVersion).then(v => { if (v) setVerse(v); });
    }
  }, [loaded, bibleVersion]);

  // Computed
  const td = checkins[todayKey()] || {};
  const doneToday = ALL_IDS.filter(id => td[id]?.done === true).length;
  const pctToday = Math.round((doneToday / ALL_IDS.length) * 100);
  const totalDays = Object.keys(checkins).length;
  const totalDone = Object.values(checkins).reduce((a, d) => a + ALL_IDS.filter(id => d[id]?.done === true).length, 0);
  const avgPct = totalDays > 0 ? Math.round((totalDone / (totalDays * ALL_IDS.length)) * 100) : 0;
  const last7 = getLast7();
  const weekData = last7.map(date => { const day = checkins[date] || {}; return { date, pct: Math.round((ALL_IDS.filter(id => day[id]?.done === true).length / ALL_IDS.length) * 100) }; });
  const areaStats = PRINCIPLES.map(area => {
    const ids = area.items.map(i => i.id);
    let tot = 0, sum = 0;
    last7.forEach(date => { const day = checkins[date] || {}; ids.forEach(id => { if (day[id]?.done !== undefined) { tot++; if (day[id]?.done) sum++; } }); });
    return { ...area, pct: tot > 0 ? Math.round((sum / tot) * 100) : 0 };
  });
  const certReady = streak >= 21 && avgPct >= 70 && userLevel < 4;
  const currentLevel = LEVELS.find(l => l.id === userLevel) || LEVELS[0];
  const nextLevel = LEVELS.find(l => l.id === userLevel + 1);

  // Handlers
  const setCheck = (id, val) => setCheckins(p => ({ ...p, [todayKey()]: { ...p[todayKey()], [id]: { ...p[todayKey()]?.[id], done: val } } }));
  const setRef = (id, text) => setCheckins(p => ({ ...p, [todayKey()]: { ...p[todayKey()], [id]: { ...p[todayKey()]?.[id], reflection: text } } }));
  const areaColor = (a) => PRINCIPLES.find(p => p.area === a)?.color || "#C9A84C";
  const toggleDone = (gid) => setGoals(p => p.map(g => g.id === gid ? { ...g, done: !g.done } : g));
  const toggleGoalQ = (gid, qi) => setGoals(p => p.map(g => g.id !== gid ? g : {
    ...g, questionChecks: { ...(g.questionChecks || {}), [todayKey()]: { ...(g.questionChecks?.[todayKey()] || {}), [qi]: !(g.questionChecks?.[todayKey()]?.[qi]) } }
  }));

  const inp = { width: "100%", background: "#0D0C0A", border: "1px solid #2A2820", borderRadius: 6, padding: "10px 12px", color: "#E8E0D0", fontSize: 13, fontFamily: "Georgia, serif", outline: "none", boxSizing: "border-box" };

  // ── ONBOARDING ─────────────────────────────────────────────────────────────

  const finishOnboarding = (answers) => {
    const score = ONBOARDING_Q.filter(q => !q.isVersion).reduce((sum, q) => sum + (q.scores[answers[q.id]] || 0), 0);
    const level = scoreToLevel(score);
    const ver = VERSION_MAP[answers["version"]] || "es-RVR1960";
    setUserLevel(level); setBibleVersion(ver); setOnboarded(true);
    window.storage.set("onboarded", JSON.stringify(true)).catch(() => {});
    window.storage.set("userLevel", JSON.stringify(level)).catch(() => {});
    window.storage.set("bibleVersion", ver).catch(() => {});
  };

  if (!onboarded && loaded) {
    const q = ONBOARDING_Q[obStep];
    const isLast = obStep === ONBOARDING_Q.length - 1;
    return (
      <div style={{ minHeight: "100vh", background: "#0D0C0A", color: "#E8E0D0", fontFamily: "Georgia, 'Times New Roman', serif", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
        <div style={{ maxWidth: 420, width: "100%" }}>
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <div style={{ fontSize: 9, letterSpacing: "0.3em", color: "#C9A84C", textTransform: "uppercase", marginBottom: 6 }}>Prospera en Todo</div>
            <div style={{ fontSize: 13, color: "#4A4438", fontStyle: "italic" }}>Configura tu perfil inicial</div>
          </div>
          <div style={{ display: "flex", gap: 4, marginBottom: 32 }}>
            {ONBOARDING_Q.map((_, i) => (
              <div key={i} style={{ flex: 1, height: 3, borderRadius: 2, background: i <= obStep ? "#C9A84C" : "#1A1810", transition: "background 0.3s" }} />
            ))}
          </div>
          <div style={{ fontSize: 9, color: "#3A3020", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 10 }}>{obStep + 1} de {ONBOARDING_Q.length}</div>
          <div style={{ fontSize: 17, color: "#F0E8D8", marginBottom: 24, lineHeight: 1.55 }}>{q.q}</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
            {q.opts.map((opt, i) => {
              const sel = obAnswers[q.id] === i;
              return (
                <button key={i} onClick={() => {
                  const next = { ...obAnswers, [q.id]: i };
                  setObAnswers(next);
                  if (isLast) setTimeout(() => finishOnboarding(next), 200);
                  else setTimeout(() => setObStep(s => s + 1), 200);
                }} style={{ padding: "13px 16px", background: sel ? "#C9A84C12" : "#111008", border: `1px solid ${sel ? "#C9A84C" : "#252010"}`, borderRadius: 8, color: sel ? "#C9A84C" : "#8A8070", fontSize: 13, cursor: "pointer", textAlign: "left", transition: "all 0.2s", fontFamily: "Georgia, serif" }}>
                  {opt}
                </button>
              );
            })}
          </div>
          {obStep > 0 && (
            <button onClick={() => setObStep(s => s - 1)} style={{ background: "none", border: "none", color: "#3A3020", cursor: "pointer", fontSize: 11, marginTop: 20, padding: 0 }}>← Anterior</button>
          )}
        </div>
      </div>
    );
  }

  // ── GOAL AI FLOW ──────────────────────────────────────────────────────────

  const handleGenerateAI = async () => {
    if (!newGoal.title.trim()) return;
    setAiLoading(true);
    setGoalStep("select");
    const questions = await generateChecklist(newGoal.title, newGoal.area, userLevel);
    setAiQuestions(questions);
    setSelectedQ(questions.map((_, i) => i));
    setAiLoading(false);
  };

  const saveGoal = () => {
    if (!newGoal.title.trim() || selectedQ.length === 0) return;
    setGoals(p => [...p, { id: Date.now().toString(), title: newGoal.title, area: newGoal.area, questions: selectedQ.map(i => aiQuestions[i]), questionChecks: {}, createdAt: todayKey(), done: false }]);
    setNewGoal({ title: "", area: "Espiritual" });
    setAiQuestions([]); setSelectedQ([]); setGoalStep("form"); setShowForm(false);
  };

  // ── MAIN RENDER ──────────────────────────────────────────────────────────

  return (
    <div style={{ minHeight: "100vh", background: "#0D0C0A", color: "#E8E0D0", fontFamily: "Georgia, 'Times New Roman', serif", paddingBottom: 80 }}>
      <div style={{ position: "fixed", inset: 0, backgroundImage: "radial-gradient(ellipse at 15% 15%, rgba(201,168,76,0.05) 0%, transparent 55%), radial-gradient(ellipse at 85% 85%, rgba(126,184,164,0.04) 0%, transparent 55%)", pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "relative", zIndex: 1, maxWidth: 660, margin: "0 auto", padding: "0 16px" }}>

        {/* HEADER */}
        <div style={{ textAlign: "center", padding: "30px 0 18px" }}>
          <div style={{ fontSize: 10, letterSpacing: "0.3em", color: "#C9A84C", textTransform: "uppercase", marginBottom: 5 }}>Agenda de Prosperidad</div>
          <h1 style={{ margin: 0, fontSize: 24, fontWeight: "normal", color: "#F0E8D8", letterSpacing: "0.03em" }}>Prospera en Todo</h1>
          <div style={{ fontSize: 11, color: "#6A6255", marginTop: 4, fontStyle: "italic" }}>{fmt(todayKey())}</div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, marginTop: 10, padding: "4px 12px", background: currentLevel.color + "15", border: `1px solid ${currentLevel.color}30`, borderRadius: 20 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: currentLevel.color }} />
            <span style={{ fontSize: 10, color: currentLevel.color, letterSpacing: "0.15em", textTransform: "uppercase" }}>Nivel {userLevel} · {currentLevel.name}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: 18, marginTop: 16 }}>
            {[{ v: streak, l: "Racha" }, { v: `${pctToday}%`, l: "Hoy" }, { v: `${avgPct}%`, l: "Promedio" }, { v: totalDays, l: "Días" }].map(({ v, l }) => (
              <div key={l} style={{ textAlign: "center" }}>
                <div style={{ fontSize: 20, color: "#C9A84C", fontWeight: "bold" }}>{v}</div>
                <div style={{ fontSize: 9, color: "#4A4438", textTransform: "uppercase", letterSpacing: "0.1em" }}>{l}</div>
              </div>
            ))}
          </div>
          <div style={{ height: 2, background: "#1A1810", borderRadius: 2, marginTop: 14, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${pctToday}%`, background: "linear-gradient(90deg,#C9A84C,#E8CC7A)", borderRadius: 2, transition: "width 0.5s" }} />
          </div>
        </div>

        {/* CERTIFICATION NOTIFICATION */}
        {certReady && (
          <div style={{ background: "linear-gradient(135deg,#1A1408,#110D06)", border: "1px solid #C9A84C50", borderRadius: 10, padding: "14px 18px", marginBottom: 18, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
            <div>
              <div style={{ fontSize: 10, color: "#C9A84C", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 3 }}>✦ La IA ha detectado preparación</div>
              <div style={{ fontSize: 12, color: "#7A6A40" }}>Llevas {streak} días · {avgPct}% promedio. ¿Listo para Nivel {userLevel + 1}?</div>
            </div>
            <button onClick={() => alert(`Proceso de certificación para Nivel ${userLevel + 1} — ${nextLevel?.name}.\nEsta función estará activa en la próxima actualización.`)} style={{ background: "#C9A84C20", border: "1px solid #C9A84C40", borderRadius: 6, padding: "7px 13px", color: "#C9A84C", fontSize: 11, cursor: "pointer", whiteSpace: "nowrap" }}>Certificarme →</button>
          </div>
        )}

        {/* VERSE */}
        {verseOpen ? (
          <div style={{ background: "linear-gradient(135deg,#191408,#110D06)", border: "1px solid #C9A84C28", borderRadius: 10, padding: "16px 18px", marginBottom: 22 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <span style={{ fontSize: 9, letterSpacing: "0.25em", color: "#C9A84C", textTransform: "uppercase" }}>✦ Versículo del Día</span>
              <button onClick={() => setVerseOpen(false)} style={{ background: "none", border: "none", color: "#3A3020", cursor: "pointer", fontSize: 15, lineHeight: 1, padding: 0 }}>×</button>
            </div>
            <div style={{ fontSize: 13, color: "#D4C08A", fontStyle: "italic", lineHeight: 1.75, marginBottom: 8 }}>"{verse.text}"</div>
            <div style={{ fontSize: 11, color: "#6A5A30", letterSpacing: "0.08em" }}>— {verse.ref}</div>
          </div>
        ) : (
          <button onClick={() => setVerseOpen(true)} style={{ width: "100%", padding: "9px", background: "none", border: "1px solid #1A1810", borderRadius: 8, color: "#3A3020", fontSize: 10, cursor: "pointer", marginBottom: 18, letterSpacing: "0.2em", textTransform: "uppercase" }}>✦ Ver versículo del día</button>
        )}

        {/* TABS */}
        <div style={{ display: "flex", borderBottom: "1px solid #181610", marginBottom: 26 }}>
          {[{ k: "checkin", l: "Check-in" }, { k: "progreso", l: "Progreso" }, { k: "metas", l: "Metas" }, { k: "historial", l: "Historial" }].map(({ k, l }) => (
            <button key={k} onClick={() => setTab(k)} style={{ flex: 1, padding: "10px 0", background: "none", border: "none", borderBottom: tab === k ? "2px solid #C9A84C" : "2px solid transparent", color: tab === k ? "#C9A84C" : "#4A4438", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", cursor: "pointer", marginBottom: -1, transition: "color 0.2s" }}>{l}</button>
          ))}
        </div>

        {/* CHECK-IN */}
        {tab === "checkin" && PRINCIPLES.map(area => (
          <div key={area.area} style={{ marginBottom: 26 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 13 }}>
              <span style={{ fontSize: 15, color: area.color }}>{area.icon}</span>
              <span style={{ fontSize: 10, letterSpacing: "0.22em", color: area.color, textTransform: "uppercase" }}>{area.area}</span>
            </div>
            {area.items.map(item => {
              const e = td[item.id] || {};
              const isExp = expanded === item.id;
              return (
                <div key={item.id} style={{ background: "#111008", border: `1px solid ${e.done === true ? area.color + "40" : "#181610"}`, borderRadius: 8, marginBottom: 9, overflow: "hidden", transition: "border-color 0.3s" }}>
                  <div style={{ padding: "13px 15px" }}>
                    <div style={{ fontSize: 10, color: area.color, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 2 }}>{item.name}</div>
                    <div style={{ fontSize: 13, color: "#8A7A60", marginBottom: 10, lineHeight: 1.5 }}>{item.practice}</div>
                    <div style={{ display: "flex", gap: 7 }}>
                      <button onClick={() => { setCheck(item.id, true); setExpanded(item.id); }} style={{ flex: 1, padding: "7px", border: `1px solid ${e.done === true ? area.color : "#252010"}`, background: e.done === true ? area.color + "18" : "transparent", color: e.done === true ? area.color : "#3A3020", borderRadius: 6, cursor: "pointer", fontSize: 12, transition: "all 0.2s" }}>✓ Sí</button>
                      <button onClick={() => { setCheck(item.id, false); setExpanded(item.id); }} style={{ flex: 1, padding: "7px", border: `1px solid ${e.done === false ? "#E07B7B" : "#252010"}`, background: e.done === false ? "#E07B7B18" : "transparent", color: e.done === false ? "#E07B7B" : "#3A3020", borderRadius: 6, cursor: "pointer", fontSize: 12, transition: "all 0.2s" }}>✗ No</button>
                      <button onClick={() => setExpanded(isExp ? null : item.id)} style={{ padding: "7px 13px", border: "1px solid #252010", background: isExp ? "#1A1810" : "transparent", color: "#4A4030", borderRadius: 6, cursor: "pointer", fontSize: 12 }}>✎</button>
                    </div>
                  </div>
                  {isExp && (
                    <div style={{ borderTop: "1px solid #181610", padding: "11px 15px" }}>
                      <div style={{ fontSize: 9, color: "#3A3020", marginBottom: 5, letterSpacing: "0.14em", textTransform: "uppercase" }}>Reflexión del día</div>
                      <textarea value={e.reflection || ""} onChange={ev => setRef(item.id, ev.target.value)} placeholder="¿Qué aprendiste hoy? ¿Qué mejorarás mañana?" style={{ ...inp, resize: "vertical", minHeight: 64, lineHeight: 1.6 }} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}

        {/* PROGRESO */}
        {tab === "progreso" && (
          <div>
            <div style={{ background: "#111008", border: "1px solid #181610", borderRadius: 10, padding: 18, marginBottom: 18 }}>
              <div style={{ fontSize: 9, color: "#C9A84C", letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: 16 }}>✦ Últimos 7 días</div>
              <div style={{ display: "flex", gap: 5, alignItems: "flex-end", height: 90 }}>
                {weekData.map(({ date, pct: p }) => {
                  const isT = date === todayKey();
                  const bc = p >= 80 ? (isT ? "linear-gradient(180deg,#E8CC7A,#C9A84C)" : "#C9A84C") : p >= 50 ? "#7EB8A4" : p > 0 ? "#2A2818" : "#181610";
                  return (
                    <div key={date} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                      <div style={{ fontSize: 9, color: "#4A4030" }}>{p > 0 ? `${p}%` : ""}</div>
                      <div style={{ width: "100%", flex: 1, display: "flex", alignItems: "flex-end" }}>
                        <div style={{ width: "100%", height: `${Math.max(p, p > 0 ? 5 : 0)}%`, minHeight: p > 0 ? 4 : 0, background: bc, borderRadius: "3px 3px 0 0", transition: "height 0.4s", border: isT ? "1px solid #C9A84C40" : "none" }} />
                      </div>
                      <div style={{ fontSize: 8, color: isT ? "#C9A84C" : "#2A2818", textAlign: "center", lineHeight: 1.3 }}>
                        {fmtShort(date).split(" ")[0]}<br />{fmtShort(date).split(" ")[1]}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div style={{ background: "#111008", border: "1px solid #181610", borderRadius: 10, padding: 18, marginBottom: 18 }}>
              <div style={{ fontSize: 9, color: "#C9A84C", letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: 16 }}>◈ Por Área — 7 días</div>
              {areaStats.map(({ area, color, icon, pct: p }) => (
                <div key={area} style={{ marginBottom: 14 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                    <span style={{ fontSize: 12, color: "#8A8070" }}>{icon} {area}</span>
                    <span style={{ fontSize: 12, color }}>{p}%</span>
                  </div>
                  <div style={{ height: 5, background: "#181610", borderRadius: 3, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${p}%`, background: color, borderRadius: 3, transition: "width 0.5s" }} />
                  </div>
                </div>
              ))}
            </div>

            <div style={{ background: "#111008", border: "1px solid #181610", borderRadius: 10, padding: 18, marginBottom: 18 }}>
              <div style={{ fontSize: 9, color: "#C9A84C", letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: 16 }}>◆ Estadísticas Globales</div>
              {[["Días registrados", totalDays], ["Principios cumplidos en total", totalDone], ["Promedio diario", `${avgPct}%`], ["Racha actual", `${streak} días`], ["Metas activas", goals.filter(g => !g.done).length], ["Metas logradas", goals.filter(g => g.done).length]].map(([l, v]) => (
                <div key={l} style={{ display: "flex", justifyContent: "space-between", padding: "9px 0", borderBottom: "1px solid #161408" }}>
                  <span style={{ fontSize: 13, color: "#6A6050" }}>{l}</span>
                  <span style={{ fontSize: 13, color: "#C9A84C", fontWeight: "bold" }}>{v}</span>
                </div>
              ))}
            </div>

            <div style={{ background: "linear-gradient(135deg,#191408,#110D06)", border: `1px solid ${currentLevel.color}25`, borderRadius: 10, padding: 20 }}>
              <div style={{ fontSize: 9, color: currentLevel.color, letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: 10 }}>✦ Tu Nivel Actual</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 6 }}>
                <div style={{ fontSize: 28, color: currentLevel.color, fontWeight: "bold" }}>Nivel {userLevel}</div>
                <div style={{ fontSize: 16, color: "#D4C898" }}>{currentLevel.name}</div>
              </div>
              <div style={{ fontSize: 13, color: "#8A7A50", fontStyle: "italic", marginBottom: 4 }}>{currentLevel.objective}</div>
              <div style={{ fontSize: 11, color: "#4A3A20", marginBottom: nextLevel ? 14 : 0 }}>{currentLevel.description}</div>
              {nextLevel && (
                <div style={{ borderTop: "1px solid #1A1810", paddingTop: 12 }}>
                  <div style={{ fontSize: 10, color: "#3A3020", letterSpacing: "0.15em", textTransform: "uppercase" }}>Próximo — Nivel {nextLevel.id}: {nextLevel.name}</div>
                  <div style={{ fontSize: 11, color: "#4A4030", marginTop: 4 }}>{nextLevel.objective}</div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* METAS */}
        {tab === "metas" && (
          <div>
            <button onClick={() => { setShowForm(!showForm); setGoalStep("form"); setAiQuestions([]); setSelectedQ([]); }} style={{ width: "100%", padding: "12px", background: "none", border: "1px dashed #C9A84C35", borderRadius: 8, color: "#C9A84C", fontSize: 12, cursor: "pointer", marginBottom: 20, letterSpacing: "0.1em" }}>
              {showForm ? "✕ Cancelar" : "+ Nueva Meta"}
            </button>

            {showForm && (
              <div style={{ background: "#111008", border: "1px solid #1E1C18", borderRadius: 8, padding: 18, marginBottom: 22 }}>
                {goalStep === "form" && (
                  <>
                    <div style={{ fontSize: 9, color: "#C9A84C", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 12 }}>Definir Meta</div>
                    <input value={newGoal.title} onChange={e => setNewGoal(p => ({ ...p, title: e.target.value }))} placeholder="¿Cuál es tu meta?" style={{ ...inp, marginBottom: 9 }} />
                    <select value={newGoal.area} onChange={e => setNewGoal(p => ({ ...p, area: e.target.value }))} style={{ ...inp, marginBottom: 14, cursor: "pointer" }}>
                      {PRINCIPLES.map(p => <option key={p.area} value={p.area}>{p.area}</option>)}
                    </select>
                    <button onClick={handleGenerateAI} disabled={!newGoal.title.trim()} style={{ width: "100%", padding: "11px", background: newGoal.title.trim() ? "#C9A84C12" : "transparent", border: `1px solid ${newGoal.title.trim() ? "#C9A84C" : "#252010"}`, borderRadius: 6, color: newGoal.title.trim() ? "#C9A84C" : "#3A3020", fontSize: 13, cursor: newGoal.title.trim() ? "pointer" : "not-allowed", letterSpacing: "0.1em" }}>
                      ✦ Generar preguntas con IA
                    </button>
                  </>
                )}

                {goalStep === "select" && (
                  <>
                    <div style={{ fontSize: 9, color: "#C9A84C", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 3 }}>{newGoal.title}</div>
                    <div style={{ fontSize: 11, color: "#4A4030", marginBottom: 14 }}>
                      {aiLoading ? "La IA está generando tus preguntas..." : `Selecciona las que quieres en tu check-in diario (${selectedQ.length} seleccionadas)`}
                    </div>
                    {aiLoading ? (
                      <div style={{ textAlign: "center", padding: "28px 0", color: "#5A4A28" }}>
                        <div style={{ fontSize: 22, marginBottom: 8 }}>✦</div>
                        <div style={{ fontSize: 12 }}>Consultando con IA...</div>
                      </div>
                    ) : (
                      <>
                        {aiQuestions.map((q, i) => {
                          const sel = selectedQ.includes(i);
                          return (
                            <div key={i} onClick={() => setSelectedQ(prev => sel ? prev.filter(x => x !== i) : [...prev, i])} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "10px 0", borderBottom: "1px solid #161408", cursor: "pointer" }}>
                              <div style={{ width: 16, height: 16, borderRadius: 4, border: `1px solid ${sel ? "#C9A84C" : "#252010"}`, background: sel ? "#C9A84C20" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                                {sel && <span style={{ fontSize: 9, color: "#C9A84C" }}>✓</span>}
                              </div>
                              <span style={{ fontSize: 12, color: sel ? "#C0A870" : "#5A5040", lineHeight: 1.5 }}>{q}</span>
                            </div>
                          );
                        })}
                        <div style={{ display: "flex", gap: 9, marginTop: 14 }}>
                          <button onClick={() => setGoalStep("form")} style={{ flex: 1, padding: "10px", background: "none", border: "1px solid #252010", borderRadius: 6, color: "#4A4030", fontSize: 12, cursor: "pointer" }}>← Editar</button>
                          <button onClick={saveGoal} disabled={selectedQ.length === 0} style={{ flex: 2, padding: "10px", background: selectedQ.length > 0 ? "#C9A84C15" : "transparent", border: `1px solid ${selectedQ.length > 0 ? "#C9A84C" : "#252010"}`, borderRadius: 6, color: selectedQ.length > 0 ? "#C9A84C" : "#3A3020", fontSize: 12, cursor: selectedQ.length > 0 ? "pointer" : "not-allowed" }}>
                            Guardar con {selectedQ.length} preguntas
                          </button>
                        </div>
                      </>
                    )}
                  </>
                )}
              </div>
            )}

            {goals.length === 0 && !showForm && (
              <div style={{ textAlign: "center", padding: "36px 0", color: "#252010" }}>
                <div style={{ fontSize: 26, marginBottom: 8 }}>◈</div>
                <div style={{ fontSize: 12 }}>Aún no tienes metas definidas</div>
              </div>
            )}

            {goals.map(goal => {
              const c = areaColor(goal.area);
              const todayChecks = goal.questionChecks?.[todayKey()] || {};
              const checkedCount = Object.values(todayChecks).filter(Boolean).length;
              const total = goal.questions?.length || 0;
              const pct = total > 0 ? Math.round((checkedCount / total) * 100) : 0;
              return (
                <div key={goal.id} style={{ background: "#111008", border: `1px solid ${goal.done ? c + "55" : "#181610"}`, borderRadius: 8, marginBottom: 13, overflow: "hidden", opacity: goal.done ? 0.55 : 1 }}>
                  <div style={{ padding: "15px" }}>
                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 10 }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", gap: 7, alignItems: "center", marginBottom: 4 }}>
                          <span style={{ fontSize: 9, padding: "2px 7px", borderRadius: 9, background: c + "18", color: c }}>{goal.area}</span>
                          <span style={{ fontSize: 9, color: "#3A3020" }}>{fmt(goal.createdAt)}</span>
                        </div>
                        <div style={{ fontSize: 14, color: goal.done ? "#3A3020" : "#E0D8C8", textDecoration: goal.done ? "line-through" : "none", marginBottom: 9 }}>{goal.title}</div>
                      </div>
                      <button onClick={() => toggleDone(goal.id)} style={{ background: goal.done ? c + "20" : "none", border: `1px solid ${goal.done ? c : "#252010"}`, borderRadius: 6, padding: "5px 9px", color: goal.done ? c : "#3A3020", cursor: "pointer", fontSize: 11, whiteSpace: "nowrap" }}>{goal.done ? "✓ Logrado" : "Completar"}</button>
                    </div>
                    {goal.questions?.length > 0 && !goal.done && (
                      <>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                          <span style={{ fontSize: 10, color: "#3A3020" }}>Hoy</span>
                          <span style={{ fontSize: 10, color: c }}>{checkedCount}/{total}</span>
                        </div>
                        <div style={{ height: 3, background: "#181610", borderRadius: 2, marginBottom: 10, overflow: "hidden" }}>
                          <div style={{ height: "100%", width: `${pct}%`, background: c, borderRadius: 2, transition: "width 0.4s" }} />
                        </div>
                        {goal.questions.map((q, i) => {
                          const checked = todayChecks[i];
                          return (
                            <div key={i} onClick={() => toggleGoalQ(goal.id, i)} style={{ display: "flex", alignItems: "flex-start", gap: 9, padding: "5px 0", cursor: "pointer" }}>
                              <div style={{ width: 14, height: 14, borderRadius: 3, border: `1px solid ${checked ? c : "#252010"}`, background: checked ? c + "20" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                                {checked && <span style={{ fontSize: 8, color: c }}>✓</span>}
                              </div>
                              <span style={{ fontSize: 12, color: checked ? "#3A3020" : "#7A6A50", textDecoration: checked ? "line-through" : "none", lineHeight: 1.5 }}>{q}</span>
                            </div>
                          );
                        })}
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* HISTORIAL */}
        {tab === "historial" && (
          <div>
            {Object.keys(checkins).sort((a, b) => b.localeCompare(a)).slice(0, 60).map(date => {
              const day = checkins[date];
              const done = ALL_IDS.filter(id => day[id]?.done === true).length;
              const p = Math.round((done / ALL_IDS.length) * 100);
              const isT = date === todayKey();
              return (
                <div key={date} style={{ background: "#111008", border: "1px solid #181610", borderRadius: 8, padding: "13px 15px", marginBottom: 9 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 7 }}>
                    <div>
                      <span style={{ fontSize: 13, color: "#D0C8B8" }}>{fmt(date)}</span>
                      {isT && <span style={{ fontSize: 9, marginLeft: 8, color: "#C9A84C", letterSpacing: "0.12em" }}>HOY</span>}
                    </div>
                    <span style={{ fontSize: 16, color: p >= 80 ? "#C9A84C" : p >= 50 ? "#7EB8A4" : "#2A2818" }}>{p >= 80 ? "✦" : p >= 50 ? "◈" : "○"}</span>
                  </div>
                  <div style={{ height: 2, background: "#181610", borderRadius: 2, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${p}%`, background: p >= 80 ? "linear-gradient(90deg,#C9A84C,#E8CC7A)" : p >= 50 ? "#7EB8A4" : "#252010", borderRadius: 2 }} />
                  </div>
                  <div style={{ fontSize: 11, color: "#3A3020", marginTop: 5 }}>{done} de {ALL_IDS.length} principios · {p}%</div>
                </div>
              );
            })}
            {Object.keys(checkins).length === 0 && (
              <div style={{ textAlign: "center", padding: "36px 0", color: "#1E1C10" }}>
                <div style={{ fontSize: 12 }}>Comienza tu check-in para ver el historial aquí</div>
              </div>
            )}
          </div>
        )}
      </div>

      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: "linear-gradient(transparent,#0D0C0A 55%)", padding: "14px 16px 10px", textAlign: "center", zIndex: 10, pointerEvents: "none" }}>
        <div style={{ fontSize: 9, color: "#1E1C10", fontStyle: "italic", letterSpacing: "0.06em" }}>"Así como prospera tu alma" · 3 Juan 1:2</div>
      </div>
    </div>
  );
}