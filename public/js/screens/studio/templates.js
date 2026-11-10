S["studio/templates"] = {
  render() {
    return `${head("Choose a template", "Every template is a ready-made game with real questions. Pick one, change anything, and publish.", `<label class="search" style="min-width:230px">\u{1F50D}<input id="tQ" placeholder="Search templates" aria-label="Search templates"></label>${btn("\u{1F4E5} Import from CSV", "alt", 'data-go="studio/publish"')}`)}
    <div class="card row gap16 wrap" style="align-items:center;background:linear-gradient(135deg,#ffe3a3,#ffc9de);border:0;margin-bottom:14px"><span style="font-size:3rem">🎨</span><div class="grow"><h2 style="margin:0">Build your own game</h2><p class="muted" style="margin:4px 0 0">Start from an empty scene. Drag and drop text, emoji, pictures, buttons and drop zones anywhere. Add your own music in the Game tab.</p></div><div class="row gap8 wrap">${btn("🎨 Create a custom game", "lg", 'data-custom="canvas"')}${btn("❓ Blank quiz", "alt", 'data-custom="quiz"')}</div></div>
    <div class="chips pickgroup" id="tTags"></div>
    <div class="g4 m16" id="tGrid"><p class="muted">Loading…</p></div>
    <h2 class="sec">Your games</h2><div id="myGames" class="g3"><p class="muted">Loading…</p></div>`;
  },
  mount(root) {
    let tpls = [], tag = "All";
    const grid = $("#tGrid", root);
    let tpg = 1, tinfo = {}, mpg = 1;
    const draw = () => {
      grid.innerHTML = tpls.length ? tpls.map((t) => {
        const kinds = [...new Set(t.questions.map((x) => x.type))].map((k) => qType(k)[1]).join(" ");
        return `<article class="gc"><div class="th" style="background:${t.color}"><span class="em">${esc(t.emoji)}</span></div><div class="bd"><div class="row sp"><h4>${esc(t.name)}</h4>${chip(esc(t.tag), t.tag === "Live-ready" ? "#ff5fa2" : t.tag === "Young kids" ? "#2fbf63" : "#7c5cff")}</div><p>${esc(t.desc)}</p><div class="tiny muted">${t.questions.length} questions \xB7 ${kinds}</div><div class="m8">${btn("Use template", "sm", `data-use="${t.id}"`)}</div></div></article>`;
      }).join("") : '<p class="muted">No templates match.</p>';
      grid.insertAdjacentHTML("beforeend", `<div style="grid-column:1/-1">${pager(tinfo, "pgt")}</div>`);
      trNodes(grid);
    };
    const loadT = () => {
      const q = $("#tQ", root).value.trim();
      return api("GET", pgq("/api/admin/templates?enabled=true" + (tag === "All" ? "" : "&tag=" + encodeURIComponent(tag)) + "&q=" + encodeURIComponent(q), tpg)).then((r) => {
        tinfo = r;
        tpls = r.items.map((t) => ({ ...t, questions: t.questions || [] }));
        draw();
      }).catch((e) => {
        grid.innerHTML = `<p class="muted">${esc(e.message)}</p>`;
      });
    };
    api("GET", "/api/admin/templates?enabled=true").then((r) => {
      const tags = ["All"].concat([...new Set(r.items.map((t) => t.tag))]);
      $("#tTags", root).innerHTML = tags.map((c, i) => `<button class="fchip ${i ? "" : "on"}" data-pick data-tag="${esc(c)}">${esc(c)}</button>`).join("");
    });
    loadT();
    let tm;
    $("#tQ", root).addEventListener("input", () => {
      clearTimeout(tm);
      tm = setTimeout(() => {
        tpg = 1;
        loadT();
      }, 300);
    });
    root.addEventListener("click", (e) => {
      const pt = e.target.closest("[data-pgt]"), pm = e.target.closest("[data-pgm]");
      if (pt) {
        tpg = +pt.dataset.pgt;
        loadT();
        return;
      }
      if (pm) {
        mpg = +pm.dataset.pgm;
        loadG();
        return;
      }
      const cu = e.target.closest("[data-custom]");
      if (cu) {
        const kind = cu.dataset.custom;
        newGame(kind === "canvas" ? "My custom game" : "My quiz", { emoji: kind === "canvas" ? "🎨" : "❓", skin: "jungle", questions: [blankQ(kind)] });
        navigate("studio/editor");
        return;
      }
      const tg = e.target.closest("[data-tag]");
      if (tg) {
        tag = tg.dataset.tag;
        tpg = 1;
        loadT();
        return;
      }
      const u = e.target.closest("[data-use]");
      if (u) {
        const t = tpls.find((x) => String(x.id) === u.dataset.use);
        newGame(t.name, t);
        navigate("studio/editor");
        return;
      }
      const o = e.target.closest("[data-open]");
      if (o) loadGame(o.dataset.open).then(() => navigate("studio/editor")).catch((err) => toast("⚠️ " + err.message));
      const d = e.target.closest("[data-del]");
      if (d && confirm("Delete this game?")) api("DELETE", "/api/studio/games/" + d.dataset.del).then(() => {
        if (ED.id === +d.dataset.del) newGame("Untitled game");
        loadG();
      }).catch((err) => toast("⚠️ " + err.message));
    });
    const box = $("#myGames", root);
    const loadG = () => api("GET", pgq("/api/studio/games", mpg)).then((r) => {
      box.innerHTML = r.games.length ? r.games.map((g) => `<div class="card tight row gap12"><span class="av lg" style="background:linear-gradient(135deg,${g.gradient});border-radius:18px">${g.emoji}</span><div class="grow"><b translate="no">${esc(g.title)}</b><div class="small muted">${g.questionCount} questions \xB7 ${g.status}</div></div>${btn("Edit", "sm alt", `data-open="${g.id}"`)}${btn("\u{1F5D1}️", "sm alt", `data-del="${g.id}" aria-label="Delete"`)}</div>`).join("") : '<p class="muted">No games yet. Pick a template to start.</p>';
      box.insertAdjacentHTML("beforeend", `<div style="grid-column:1/-1">${pager(r, "pgm")}</div>`);
      trNodes(box);
    }).catch((err) => {
      box.innerHTML = `<p class="muted">${esc(err.message)}</p>`;
    });
    loadG();
  }
};
