"use strict";
const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const rand = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a, pick = (a) => a[Math.floor(Math.random() * a.length)];
const shuffle = (a) => {
  a = [...a];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};
const TM = { t: [], i: [] };
const later = (f, ms) => {
  TM.t.push(setTimeout(f, ms));
};
const every = (f, ms) => {
  TM.i.push(setInterval(f, ms));
};
const clearTM = () => {
  TM.t.forEach(clearTimeout);
  TM.i.forEach(clearInterval);
  TM.t = [];
  TM.i = [];
};
const S = {};
const fmt = (n) => Number(n).toLocaleString("en-US");
function toast(m) {
  const t = $("#toast");
  t.textContent = m;
  t.classList.add("on");
  clearTimeout(toast._);
  toast._ = setTimeout(() => t.classList.remove("on"), 2200);
}
function openModal(h) {
  $("#mdl").innerHTML = h + '<button class="btn ghost sm mclose" data-close>Close \u2715</button>';
  $("#ovl").hidden = false;
}
function closeModal() {
  $("#ovl").hidden = true;
}
const chip = (t, c = "#7c5cff") => `<span class="chip" style="--c:${c}">${t}</span>`;
const bar = (p, c = "var(--acc)") => `<div class="bar"><i style="width:${p}%;background:${c}"></i></div>`;
const av = (e, bg = "#efeaff", cls = "") => `<span class="av ${cls}" style="background:${bg}">${e}</span>`;
const btn = (t, cls = "", attrs = "") => `<button class="btn ${cls}" ${attrs}>${t}</button>`;
const sw = (on = false) => `<label class="sw"><input type="checkbox" ${on ? "checked" : ""}><i></i></label>`;
const head = (t, s, a = "") => `<div class="ph"><div><h1>${t}</h1><p>${s}</p></div><div class="acts">${a}</div></div>`;
const card = (t, body, acts = "", cls = "") => `<section class="card ${cls}">${t ? `<div class="ch"><h3>${t}</h3>${acts}</div>` : ""}${body}</section>`;
const stat = (ic, val, label, delta, bg = "#efeaff") => `<div class="stat card"><span class="sic" style="background:${bg}">${ic}</span><div><b>${val}${delta ? `<em class="${delta[0] === "-" ? "dn" : "up"}">${delta[0] === "-" ? "\u25BC" : "\u25B2"} ${delta.replace("-", "")}</em>` : ""}</b><span class="l">${label}</span></div></div>`;
const table = (heads, rows) => `<div class="tbl-wrap"><table class="t"><thead><tr>${heads.map((h) => `<th>${h}</th>`).join("")}</tr></thead><tbody>${rows.map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
const tabs = (id, items, panes) => `<div class="tabgroup" data-tg="${id}"><div class="tabs">${items.map((t, i) => `<button class="tab ${i ? "" : "on"}" data-t="${i}">${t}</button>`).join("")}</div>${panes.map((p, i) => `<div class="pane" data-p="${i}" ${i ? "hidden" : ""}>${p}</div>`).join("")}</div>`;
const setting = (t, sub, on = false) => `<div class="setting"><div>${t}${sub ? `<small>${sub}</small>` : ""}</div>${sw(on)}</div>`;
const gcard = (g, extra = "", go = "") => `<article class="gc" ${go ? `data-go="${go}"` : ""}><div class="th" style="background:linear-gradient(135deg,${g.g})"><span class="em">${g.e}</span><span class="tg">${chip(g.tp, "#33284a")}</span></div><div class="bd"><h4>${g.t}</h4><p>by ${g.by}</p><div class="meta"><span>\u2B50 ${g.r}</span><span>\u25B6 ${g.pl}</span><span>\u{1F476} ${g.a}</span></div>${extra}</div></article>`;
const qr = (n = 21, seed = 7) => {
  let s = seed, cells = "";
  const rnd = () => (s = (s * 9301 + 49297) % 233280) / 233280;
  const finder = (x, y, ox, oy) => {
    const lx = x - ox, ly = y - oy;
    if (lx < -1 || ly < -1 || lx > 7 || ly > 7) return null;
    if (lx < 0 || ly < 0 || lx > 6 || ly > 6) return 0;
    return lx === 0 || lx === 6 || ly === 0 || ly === 6 || lx >= 2 && lx <= 4 && ly >= 2 && ly <= 4 ? 1 : 0;
  };
  for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
    const f = finder(x, y, 0, 0) ?? finder(x, y, n - 7, 0) ?? finder(x, y, 0, n - 7);
    const dark = f !== null && f !== void 0 ? f : rnd() > 0.52 ? 1 : 0;
    if (dark) cells += `<rect x="${x}" y="${y}" width="1" height="1"/>`;
  }
  return `<svg viewBox="-1 -1 ${n + 2} ${n + 2}" style="width:100%;height:auto;fill:#33284a;background:#fff;border-radius:10px" role="img" aria-label="QR code">${cells}</svg>`;
};
function lineChart(v, o = {}) {
  const w = 560, h = o.h || 170, p = 20, max = Math.max(...v) * 1.1, min = o.min ?? 0, c = o.c || "var(--acc)";
  const x = (i) => p + i * (w - 2 * p) / (v.length - 1), y = (n) => h - p - (n - min) / (max - min) * (h - 2 * p);
  const pts = v.map((n, i) => [x(i), y(n)]);
  const d = pts.map((q, i) => (i ? "L" : "M") + q[0].toFixed(1) + " " + q[1].toFixed(1)).join(" ");
  const grid = [0, 0.25, 0.5, 0.75, 1].map((t) => `<line x1="${p}" x2="${w - p}" y1="${(p + t * (h - 2 * p)).toFixed(1)}" y2="${(p + t * (h - 2 * p)).toFixed(1)}" style="stroke:var(--line)"/>`).join("");
  const dots = v.length <= 14 ? pts.map((q) => `<circle cx="${q[0].toFixed(1)}" cy="${q[1].toFixed(1)}" r="4" style="fill:#fff;stroke:${c};stroke-width:2.5"/>`).join("") : "";
  return `<svg class="chart" viewBox="0 0 ${w} ${h}" role="img" aria-label="${o.label || "Line chart"}">${grid}<path d="${d} L${x(v.length - 1)} ${h - p} L${x(0)} ${h - p}Z" style="fill:${c};opacity:.13"/><path d="${d}" style="fill:none;stroke:${c};stroke-width:3.5;stroke-linecap:round;stroke-linejoin:round"/>${dots}</svg>`;
}
function barChart(v, labels, o = {}) {
  const w = 560, h = o.h || 170, p = 22, max = Math.max(...v) * 1.15, bw = (w - 2 * p) / v.length, c = o.c || "var(--acc)";
  const bars = v.map((n, i) => {
    const bh = n / max * (h - 2 * p - 14);
    return `<rect x="${(p + i * bw + bw * 0.18).toFixed(1)}" y="${(h - p - bh).toFixed(1)}" width="${(bw * 0.64).toFixed(1)}" height="${bh.toFixed(1)}" rx="7" style="fill:${Array.isArray(c) ? c[i % c.length] : c}"/><text x="${(p + i * bw + bw / 2).toFixed(1)}" y="${h - 5}" text-anchor="middle" style="font-size:11px;fill:var(--ink2)">${labels[i] ?? ""}</text>`;
  }).join("");
  return `<svg class="chart" viewBox="0 0 ${w} ${h}" role="img" aria-label="${o.label || "Bar chart"}"><line x1="${p}" x2="${w - p}" y1="${h - p}" y2="${h - p}" style="stroke:var(--line);stroke-width:2"/>${bars}</svg>`;
}
function donut(parts) {
  const r = 52, C = 2 * Math.PI * r, tot = parts.reduce((a, b) => a + b.v, 0);
  let off = 0;
  const arcs = parts.map((p) => {
    const len = p.v / tot * C, s = `<circle r="${r}" cx="70" cy="70" fill="none" stroke="${p.c}" stroke-width="22" stroke-dasharray="${len.toFixed(1)} ${(C - len).toFixed(1)}" stroke-dashoffset="${(-off).toFixed(1)}" transform="rotate(-90 70 70)"/>`;
    off += len;
    return s;
  }).join("");
  return `<div class="row gap16 wrap"><svg viewBox="0 0 140 140" style="width:140px;height:140px" role="img" aria-label="Donut chart">${arcs}<text x="70" y="76" text-anchor="middle" style="font-size:20px;font-weight:700;fill:var(--ink)">${fmt(tot)}</text></svg><div class="legend col" style="gap:6px">${parts.map((p) => `<span><i style="background:${p.c}"></i>${p.l} \xB7 ${Math.round(p.v / tot * 100)}%</span>`).join("")}</div></div>`;
}
function radar(v, labels, c = "var(--acc)") {
  const cx = 130, cy = 120, R = 80, n = v.length, ang = (i) => -Math.PI / 2 + i * 2 * Math.PI / n;
  const pt = (i, k) => [cx + Math.cos(ang(i)) * R * k, cy + Math.sin(ang(i)) * R * k];
  const ring = (k) => `<polygon points="${v.map((_, i) => pt(i, k).map((z) => z.toFixed(1)).join(",")).join(" ")}" style="fill:none;stroke:var(--line)"/>`;
  const shape = v.map((q, i) => pt(i, q / 100).map((z) => z.toFixed(1)).join(",")).join(" ");
  const lab = labels.map((l, i) => {
    const [x, y] = pt(i, 1.2);
    return `<text x="${x.toFixed(1)}" y="${y.toFixed(1)}" text-anchor="middle" style="font-size:11px;fill:var(--ink2)">${l}</text>`;
  }).join("");
  return `<svg class="chart" viewBox="0 0 260 240" style="max-width:320px;margin:auto" role="img" aria-label="Skill radar">${[0.25, 0.5, 0.75, 1].map(ring).join("")}<polygon points="${shape}" style="fill:${c};fill-opacity:.25;stroke:${c};stroke-width:3"/>${lab}</svg>`;
}
const GAMES = [
  { t: "Count the Critters", e: "\u{1F430}", g: "#ffd9a8,#ffb36b", by: "Critter Team", pl: "12.4k", r: 4.8, s: "Math", a: "4\u20136", tp: "Counting" },
  { t: "ABC Safari", e: "\u{1F981}", g: "#dcd3ff,#a592f5", by: "Critter Team", pl: "9.8k", r: 4.9, s: "Letters", a: "4\u20137", tp: "Matching" },
  { t: "Animals of Cambodia", e: "\u{1F418}", g: "#bdf1e6,#62d2bd", by: "Teacher Sophea", pl: "7.1k", r: 4.7, s: "Science", a: "5\u20138", tp: "Quiz" },
  { t: "Balloon Colors", e: "\u{1F388}", g: "#ffc9de,#ff8fbd", by: "Critter Team", pl: "6.5k", r: 4.6, s: "Colors", a: "3\u20135", tp: "Balloon Pop" },
  { t: "Memory Farm", e: "\u{1F42E}", g: "#cdf3ae,#8ed35a", by: "Mr. Dara", pl: "5.2k", r: 4.8, s: "Memory", a: "4\u20137", tp: "Memory" },
  { t: "Ocean Quiz", e: "\u{1F433}", g: "#c7e8ff,#6db8ff", by: "Ms. Chenda", pl: "4.4k", r: 4.5, s: "Science", a: "6\u20139", tp: "Quiz" },
  { t: "Space Math Race", e: "\u{1F680}", g: "#d9d0ff,#8b7bff", by: "Mr. Rithy", pl: "3.9k", r: 4.7, s: "Math", a: "6\u20139", tp: "Race" },
  { t: "Shape Sorter", e: "\u{1F53A}", g: "#ffe3a3,#ffc24d", by: "Critter Team", pl: "3.1k", r: 4.4, s: "Shapes", a: "3\u20136", tp: "Sorting" },
  { t: "Khmer Letters", e: "\u1780", g: "#ffd0d0,#ff8f8f", by: "Teacher Sophea", pl: "2.8k", r: 4.9, s: "Language", a: "5\u20138", tp: "Tracing" },
  { t: "Dino Time", e: "\u{1F996}", g: "#d4f5c4,#7fd36b", by: "Ms. Bopha", pl: "2.2k", r: 4.6, s: "Science", a: "5\u20138", tp: "Hidden Object" }
];
const KIDS = [["Sokha", "\u{1F43B}", "#ffd9a8"], ["Dara", "\u{1F98A}", "#ffc9a0"], ["Neang", "\u{1F430}", "#ffd0e1"], ["Vannak", "\u{1F43C}", "#e4e4ee"], ["Chenda", "\u{1F431}", "#ffe3a3"], ["Rithy", "\u{1F438}", "#c9f2a8"], ["Bopha", "\u{1F984}", "#e6d6ff"], ["Sophea", "\u{1F42F}", "#ffd9a8"], ["Kosal", "\u{1F427}", "#c7e8ff"], ["Maly", "\u{1F428}", "#dcd3ff"], ["Piseth", "\u{1F435}", "#ffe0b8"], ["Srey Mom", "\u{1F437}", "#ffd0e1"]];
const kid = (i) => KIDS[i % KIDS.length];
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
document.addEventListener("click", (e) => {
  const lg = e.target.closest("[data-lang]");
  if (lg) {
    setLang(lg.dataset.lang);
    return;
  }
  const g = e.target.closest("[data-go]");
  if (g) {
    e.preventDefault();
    closeModal();
    const p = g.dataset.go;
    if (location.pathname === (p === "home/index" ? "/" : "/" + p)) route();
    else navigate(p);
    return;
  }
  const t = e.target.closest(".tab");
  if (t) {
    const grp = t.closest(".tabgroup");
    [...grp.querySelector(".tabs").children].forEach((x) => x.classList.toggle("on", x === t));
    [...grp.children].filter((x) => x.classList.contains("pane")).forEach((p) => {
      p.hidden = p.dataset.p !== t.dataset.t;
    });
    return;
  }
  if (e.target.closest("[data-close]") || e.target === $("#ovl")) {
    closeModal();
    return;
  }
  const c = e.target.closest("[data-copy]");
  if (c) {
    try {
      navigator.clipboard.writeText(c.dataset.copy);
    } catch (_) {
    }
    toast("Copied: " + c.dataset.copy);
    return;
  }
  const tt = e.target.closest("[data-toast]");
  if (tt) {
    toast(tt.dataset.toast);
    return;
  }
  const pk = e.target.closest("[data-pick]");
  if (pk) {
    const grp = pk.closest(".pickgroup");
    if (grp) $$("[data-pick]", grp).forEach((x) => x.classList.toggle("on", x === pk));
  }
});
function navigate(p) {
  if (window.__caNav) window.__caNav(p === "home/index" ? "/" : "/" + p);
}

const pgq = (u, pg) => u + (u.includes("?") ? "&" : "?") + "page=" + pg + "&per=10";
const pager = (r, key = "pg") => {
  if (!r || !r.pages || r.pages < 2) return r && r.total ? `<div class="pager"><span class="muted small">${r.total} total</span></div>` : "";
  const cur = r.page, last = r.pages, set = new Set([1, last, cur - 1, cur, cur + 1]);
  const nums = [...set].filter((n) => n >= 1 && n <= last).sort((a, b) => a - b);
  let out = "", prev = 0;
  nums.forEach((n) => {
    if (n - prev > 1) out += '<span class="gap">\u2026</span>';
    out += `<button class="pgb ${n === cur ? "on" : ""}" data-${key}="${n}" ${n === cur ? 'aria-current="page"' : ""}>${n}</button>`;
    prev = n;
  });
  return `<div class="pager"><button class="pgb" data-${key}="${cur - 1}" ${cur <= 1 ? "disabled" : ""}>\u2190 Prev</button>${out}<button class="pgb" data-${key}="${cur + 1}" ${cur >= last ? "disabled" : ""}>Next \u2192</button><span class="muted small">${r.total} total</span></div>`;
};

function uploadWith(input, task) {
  const label = input.closest("label");
  if (label && label.dataset.busy) return Promise.reject(new Error("Upload in progress"));
  const old = label && label.firstChild && label.firstChild.nodeType === 3 ? label.firstChild.nodeValue : "";
  if (label) {
    label.dataset.busy = "1";
    label.classList.add("busy");
    if (label.firstChild && label.firstChild.nodeType === 3) label.firstChild.nodeValue = "⏳ Uploading… ";
  }
  input.disabled = true;
  return Promise.resolve().then(task).finally(() => {
    input.disabled = false;
    try {
      input.value = "";
    } catch (x) {
    }
    if (label) {
      delete label.dataset.busy;
      label.classList.remove("busy");
      if (label.firstChild && label.firstChild.nodeType === 3) label.firstChild.nodeValue = old;
    }
  });
}
