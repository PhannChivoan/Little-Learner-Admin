const QTYPES = [
  ["quiz", "❓", "Quiz", "Pick the right answer"],
  ["truefalse", "✅", "True / False", "Is it right or wrong?"],
  ["type", "⌨️", "Type answer", "Kids type the answer"],
  ["order", "\u{1F522}", "Put in order", "Tap items in the right order"],
  ["slider", "\u{1F39A}️", "Slider", "Slide to the right number"],
  ["match", "\u{1F517}", "Match pairs", "Connect left and right"],
  ["memory", "\u{1F0CF}", "Memory cards", "Flip cards to find pairs"],
  ["lesson", "\u{1F4D6}", "Lesson card", "Teach something, no question"],
  ["canvas", "\u{1F3A8}", "Custom scene", "Drag and drop anything"]
];
let OBJ_N = 0;
const newObj = (kind, extra = {}) => {
  const base = { id: "o" + Date.now().toString(36) + (OBJ_N++).toString(36), kind, text: "", x: 35, y: 35, w: 18, h: 24, fs: 6, color: "", role: "decor", target: "" };
  if (kind === "text") Object.assign(base, { text: "Type here", w: 34, h: 14, fs: 5 });
  if (kind === "emoji") Object.assign(base, { text: "\u{1F43B}", fs: 11 });
  if (kind === "button") Object.assign(base, { text: "Button", w: 24, h: 14, fs: 4, color: "#7c5cff" });
  if (kind === "shape") Object.assign(base, { text: "", w: 16, h: 22, color: "#ff5fa2" });
  if (kind === "zone") Object.assign(base, { text: "Drop here", w: 28, h: 30, fs: 3.2, color: "#7cc7ff", role: "target" });
  if (kind === "image") Object.assign(base, { text: "", w: 24, h: 30 });
  Object.assign(base, extra);
  return base;
};
const qType = (t) => QTYPES.find((x) => x[0] === t) || QTYPES[0];
const DEFAULT_SETTINGS = { shuffle: false, speedBonus: true, music: true, shuffleAnswers: true, track: "happy", musicUrl: "", layout: "grid", race: false, limit: 0, dark: true, hint: "" };
const blankQ = (type = "quiz") => {
  const q = { type, q: "", qk: "", img: "❓", a: ["", "", "", ""], ak: ["", "", "", ""], c: 0, t: 20, p: 500 };
  if (type === "truefalse") {
    q.a = ["True", "False"];
    q.ak = ["ពិត", "មិនពិត"];
    q.t = 15;
  }
  if (type === "type") {
    q.a = [];
    q.ak = [];
    q.acc = [""];
  }
  if (type === "order") {
    q.a = [];
    q.ak = [];
    q.items = ["", "", ""];
    q.t = 30;
  }
  if (type === "slider") {
    q.a = [];
    q.ak = [];
    Object.assign(q, { min: 0, max: 10, step: 1, ans: 5, tol: 0 });
  }
  if (type === "match") {
    q.a = [];
    q.ak = [];
    q.pairs = [["", ""], ["", ""], ["", ""]];
    q.t = 35;
  }
  if (type === "memory") {
    q.a = [];
    q.ak = [];
    q.cards = ["\u{1F436}", "\u{1F431}", "\u{1F430}"];
    q.t = 45;
    q.img = "";
  }
  if (type === "canvas") {
    q.a = [];
    q.ak = [];
    q.q = "Tap all the animals!";
    q.mode = "tap";
    q.bg = "linear-gradient(180deg,#bfe9ff,#d8f5c8)";
    q.img = "";
    q.t = 30;
    q.objs = [newObj("emoji", { text: "\u{1F436}", x: 10, y: 20, role: "correct" }), newObj("emoji", { text: "\u{1F431}", x: 42, y: 12, role: "correct" }), newObj("emoji", { text: "\u{1F697}", x: 72, y: 25, role: "wrong" })];
  }
  if (type === "lesson") {
    q.a = [];
    q.ak = [];
    q.text = "";
    q.textk = "";
    q.t = 15;
    q.p = 0;
    q.img = "\u{1F4D6}";
  }
  return q;
};
const normQ = (q) => {
  const b = blankQ(q.type || "quiz");
  const o = { ...b, ...q };
  o.ak = q.ak && q.ak.length ? q.ak : b.ak;
  return o;
};
const ED = {
  title: "Untitled game",
  titleK: "",
  emoji: "\u{1F3AE}",
  subject: "General",
  age: "4–7",
  cl: "en",
  sel: 0,
  skin: "jungle",
  device: "phone",
  settings: { ...DEFAULT_SETTINGS },
  qs: [blankQ("quiz")]
};
const titleOf = (l) => (l === "km" ? ED.titleK : ED.title) || "";
const gameTitle = () => I18N.lang === "km" && ED.titleK || ED.title;
const qText = (q) => (ED.cl === "km" ? q.qk : q.q) || "";
const qShow = (q) => qText(q) || (ED.cl === "km" ? q.q : q.qk) || "";
const aText = (q, i) => (ED.cl === "km" ? (q.ak || [])[i] : q.a[i]) || "";
const setQ = (q, v) => {
  if (ED.cl === "km") q.qk = v;
  else q.q = v;
};
const setA = (q, i, v) => {
  if (ED.cl === "km") {
    q.ak = q.ak || ["", "", "", ""];
    q.ak[i] = v;
  } else q.a[i] = v;
};
const qReady = (q, l) => {
  const t = q.type || "quiz";
  const text = l === "km" ? !!q.qk : !!q.q;
  if (t === "quiz" || t === "truefalse") return l === "km" ? text && (q.ak || []).filter(Boolean).length >= q.a.length : text && q.a.every(Boolean);
  if (t === "lesson") return l === "km" ? !!q.textk : !!q.text;
  if (t === "canvas") return l === "km" ? !!q.qk : !!q.q && (q.objs || []).length > 0;
  if (l === "km") return text;
  if (t === "type") return text && (q.acc || []).some(Boolean);
  if (t === "order") return text && (q.items || []).filter(Boolean).length >= 2;
  if (t === "match") return text && (q.pairs || []).filter((p) => p[0] && p[1]).length >= 2;
  if (t === "memory") return (q.cards || []).filter(Boolean).length >= 2;
  return text;
};
const SKINS = [["jungle", "Jungle", "\u{1F334}"], ["ocean", "Ocean", "\u{1F420}"], ["space", "Space", "\u{1F680}"], ["candy", "Candy", "\u{1F36D}"], ["farm", "Farm", "\u{1F69C}"], ["desert", "Desert", "\u{1F42A}"], ["sunny", "Sunny", "\u{1F31E}"], ["grape", "Grape", "\u{1F347}"], ["mint", "Mint", "\u{1F33F}"], ["coral", "Coral", "\u{1F980}"], ["lime", "Lime", "\u{1F34B}"], ["deepsea", "Deep sea", "\u{1F433}"], ["sky", "Sky", "☁️"], ["gold", "Gold", "⭐"], ["meadow", "Meadow", "\u{1F98B}"]];
ED.id = (() => {
  try {
    return +sessionStorage.getItem("ca_ed_id") || null;
  } catch (e) {
    return null;
  }
})();
ED.last = null;
ED.slug = "";
const edPayload = () => ({ title: ED.title, titleK: ED.titleK, emoji: ED.emoji, subject: ED.subject, age: ED.age, skin: ED.skin, device: ED.device, settings: ED.settings, questions: ED.qs });
const edRemember = () => {
  try {
    if (ED.id) sessionStorage.setItem("ca_ed_id", String(ED.id));
    else sessionStorage.removeItem("ca_ed_id");
  } catch (e) {
  }
};
async function saveGame() {
  const body = edPayload();
  const snap = JSON.stringify(body);
  let r;
  if (!ED.id) r = await api("POST", "/api/studio/games", body);
  else r = await api("PUT", "/api/studio/games/" + ED.id, body);
  ED.id = r.game.id;
  ED.slug = r.game.slug;
  ED.last = snap;
  edRemember();
  return r.game;
}
async function loadGame(id) {
  const r = await api("GET", "/api/studio/games/" + id);
  const g = r.game;
  ED.id = g.id;
  ED.slug = g.slug;
  ED.title = g.title;
  ED.titleK = g.titleK || "";
  ED.emoji = g.emoji || "\u{1F3AE}";
  ED.subject = g.subject || "General";
  ED.age = g.age || "4–7";
  ED.skin = g.skin;
  ED.device = g.device;
  ED.settings = { ...DEFAULT_SETTINGS, ...(g.config && g.config.settings || {}) };
  ED.qs = g.questions.length ? g.questions.map(normQ) : [blankQ("quiz")];
  ED.sel = 0;
  ED.cl = "en";
  ED.last = JSON.stringify(edPayload());
  edRemember();
}
function newGame(title, tpl) {
  ED.id = null;
  ED.slug = "";
  ED.title = title;
  ED.titleK = "";
  ED.emoji = tpl && tpl.emoji || "\u{1F3AE}";
  ED.subject = tpl && tpl.subject || "General";
  ED.age = tpl && tpl.age || "4–7";
  ED.skin = tpl && tpl.skin || "jungle";
  ED.settings = { ...DEFAULT_SETTINGS, ...(tpl && tpl.settings || {}) };
  ED.cl = "en";
  ED.sel = 0;
  ED.qs = tpl && tpl.questions && tpl.questions.length ? JSON.parse(JSON.stringify(tpl.questions)).map(normQ) : [blankQ("quiz")];
  ED.last = null;
  edRemember();
}
if (!ED.id) newGame("Untitled game");
window.EDREADY = ED.id ? loadGame(ED.id).catch(() => {
  ED.id = null;
  edRemember();
}) : Promise.resolve();
