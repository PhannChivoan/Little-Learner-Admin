S["admin/games"] = {
  render() {
    return `${head("Games", "Every game on the platform lives here. Feature, publish, hide, edit or delete them.")}
    <div class="row gap12 wrap"><label class="search grow" style="min-width:240px">\u{1F50D}<input id="gQ" placeholder="Search title or author" aria-label="Search games"></label><div class="chips pickgroup" id="gS">${[["", "All"], ["published", "Published"], ["draft", "Drafts"], ["hidden", "Hidden"]].map((c, i) => `<button class="fchip ${i ? "" : "on"}" data-pick data-st="${c[0]}">${c[1]}</button>`).join("")}</div>${btn("\u2795 New game", "", 'data-go="studio/templates"')}</div>
    <div class="card m16" id="gBox"><p class="muted">Loading…</p></div>`;
  },
  mount(root) {
    const box = $("#gBox", root);
    let all = [], info = {}, pg = 1, st = "";
    const draw = () => {
      const list = all;
      const sel = (v, o, a) => `<select class="sel" data-g="${a}" style="width:auto">${o.map((x) => `<option ${x === v ? "selected" : ""}>${x}</option>`).join("")}</select>`;
      box.innerHTML = list.length ? table(["Game", "Author", "Plays", "Status", "Visibility", "Featured", ""], list.map((g) => [`<b translate="no">${esc(g.emoji)} ${esc(g.title)}</b><div class="muted small">${esc(g.kind)} · ${g.questionCount} questions</div>`, esc(g.author), g.plays, `<span data-id="${g.id}">${sel(g.status, ["published", "draft", "hidden"], "status")}</span>`, `<span data-id="${g.id}">${sel(g.visibility, ["public", "link", "private"], "visibility")}</span>`, `<label><input type="checkbox" data-g="featured" data-id="${g.id}" ${g.featured ? "checked" : ""}> ⭐</label>`, `<div class="row gap6">${btn("Edit in Studio", "sm alt", `data-edit="${g.id}"`)}${btn("Delete", "sm", `data-del="${g.id}"`)}</div>`])) : '<p class="muted" style="padding:14px">No games match.</p>';
      box.insertAdjacentHTML("beforeend", pager(info));
      trNodes(box);
    };
    const load = () => {
      const q = $("#gQ", root).value.trim();
      return api("GET", pgq("/api/admin/games?q=" + encodeURIComponent(q) + "&status=" + st, pg)).then((r) => {
        all = r.games;
        info = r;
        draw();
      }).catch((e) => {
        box.innerHTML = `<p class="muted" style="padding:14px">${esc(e.message)}</p>`;
      });
    };
    let tm;
    $("#gQ", root).addEventListener("input", () => {
      clearTimeout(tm);
      tm = setTimeout(() => {
        pg = 1;
        load();
      }, 300);
    });
    $("#gS", root).addEventListener("click", (e) => {
      const c = e.target.closest("[data-st]");
      if (!c) return;
      st = c.dataset.st;
      pg = 1;
      load();
    });
    root.addEventListener("change", (e) => {
      const c = e.target.closest("[data-g]");
      if (!c) return;
      const id = c.dataset.id || c.parentElement.dataset.id;
      api("PATCH", "/api/admin/games/" + id, { [c.dataset.g]: c.type === "checkbox" ? c.checked : c.value }).then(() => {
        toast("Saved");
      }).catch((err) => {
        toast("\u26A0\uFE0F " + err.message);
        load();
      });
    });
    root.addEventListener("click", (e) => {
      const pb = e.target.closest("[data-pg]");
      if (pb) {
        pg = +pb.dataset.pg;
        load();
        return;
      }
      const ed = e.target.closest("[data-edit]"), de = e.target.closest("[data-del]");
      if (ed) {
        const go = () => navigate("studio/editor");
        if (typeof loadGame === "function") loadGame(ed.dataset.edit).then(go).catch((err) => toast("⚠️ " + err.message));
        else {
          try {
            sessionStorage.setItem("ca_ed_id", ed.dataset.edit);
          } catch (x) {
          }
          go();
        }
      } else if (de && confirm("Delete this game and its results?")) {
        api("DELETE", "/api/studio/games/" + de.dataset.del).then(() => {
          toast("Deleted");
          load();
        }).catch((err) => toast("⚠️ " + err.message));
      }
    });
    load();
  }
};
