S["admin/templates"] = {
  render() {
    return `${head("Game templates", "Turn templates on or off and see how many games use each one.")}
    <div class="g21"><div class="card" id="tBox"><p class="muted">Loading…</p></div>
    ${card("Add template", `<label class="lbl">Name</label><input class="in" id="tName"><label class="lbl">Emoji</label><input class="in" id="tEmoji" value="\u{1F9E9}"><label class="lbl">Description</label><input class="in" id="tDesc"><label class="lbl">Copy questions from a game</label><select class="sel" id="tFrom"><option value="">Blank quiz</option></select><label class="lbl">Tag</label><select class="sel" id="tTag"><option>Live-ready</option><option>Solo</option><option>Young kids</option></select><div class="m16">${btn("➕ Add", "", 'id="tAdd"')}</div>`)}</div>`;
  },
  mount(root) {
    const box = $("#tBox", root);
    let pg = 1;
    const load = () => Promise.all([api("GET", pgq("/api/admin/templates", pg)), api("GET", "/api/admin/games")]).then(([t, g]) => {
      $("#tFrom", root).innerHTML = '<option value="">Blank quiz</option>' + g.games.filter((x) => !x.builtin).map((x) => `<option value="${x.id}">${esc(x.emoji)} ${esc(x.title)}</option>`).join("");
      const used = {};
      g.games.forEach((x) => {
        used[x.kind.toLowerCase()] = (used[x.kind.toLowerCase()] || 0) + 1;
      });
      box.innerHTML = table(["Template", "Description", "Tag", "Games", "Enabled", ""], t.items.map((x) => [`<div class="row gap8"><span class="av sm" style="background:${x.color || "#fff5d6"}">${esc(x.emoji)}</span><b>${esc(x.name)}</b></div>`, esc(x.desc), chip(x.tag), used[x.name.toLowerCase()] || 0, `<input type="checkbox" data-en="${x.id}" ${x.enabled ? "checked" : ""} aria-label="Enabled">`, btn("\u{1F5D1}️", "sm alt", `data-del="${x.id}" aria-label="Delete"`)]));
      box.insertAdjacentHTML("beforeend", pager(t));
      trNodes(box);
    }).catch((e) => {
      box.innerHTML = `<p class="muted">${esc(e.message)}</p>`;
    });
    root.addEventListener("change", (e) => {
      const c = e.target.closest("[data-en]");
      if (c) api("PATCH", "/api/admin/templates/" + c.dataset.en, { enabled: c.checked }).then(() => toast("Saved")).catch((err) => toast("⚠️ " + err.message));
    });
    root.addEventListener("click", (e) => {
      const pb = e.target.closest("[data-pg]");
      if (pb) {
        pg = +pb.dataset.pg;
        load();
        return;
      }
      const d = e.target.closest("[data-del]");
      if (d) {
        api("DELETE", "/api/admin/templates/" + d.dataset.del).then(load).catch((err) => toast("⚠️ " + err.message));
        return;
      }
      if (e.target.closest("#tAdd")) {
        const name = $("#tName", root).value.trim();
        if (!name) {
          toast("Add a name");
          return;
        }
        const from = $("#tFrom", root).value;
        const src = from ? api("GET", "/api/studio/games/" + from).then((r) => r.game) : Promise.resolve(null);
        src.then((game) => api("POST", "/api/admin/templates", { name, emoji: $("#tEmoji", root).value, desc: $("#tDesc", root).value, tag: $("#tTag", root).value, color: "#ffd9a8", enabled: true, type: "quiz", skin: game ? game.skin : "jungle", subject: game ? game.subject : "General", age: game ? game.age : "4–7", questions: game ? game.questions : [] })).then(() => {
          $("#tName", root).value = "";
          load();
        }).catch((err) => toast("⚠️ " + err.message));
      }
    });
    load();
  }
};
