S["admin/rewards"] = {
  render() {
    return `${head("Rewards & economy", "Badges and buddy items kids can earn and buy with stars.")}
    <div class="g21"><div class="card" id="rBox"><p class="muted">Loading…</p></div>
    ${card("Add reward", `<label class="lbl">Name</label><input class="in" id="rName"><label class="lbl">Emoji</label><input class="in" id="rEmoji" value="⭐"><label class="lbl">Cost (stars)</label><input class="in" id="rCost" type="number" min="0" value="50"><label class="lbl">Type</label><select class="sel" id="rKind"><option>badge</option><option>buddy item</option><option>effect</option></select><div class="m16">${btn("➕ Add", "", 'id="rAdd"')}</div>`)}</div>`;
  },
  mount(root) {
    const box = $("#rBox", root);
    let items = [], pg = 1;
    const load = () => api("GET", pgq("/api/admin/rewards", pg)).then((r) => {
      items = r.items;
      box.innerHTML = table(["", "Name", "Type", "Cost", "Active", ""], items.map((x) => [`<span style="font-size:1.6rem">${esc(x.emoji)}</span>`, `<b>${esc(x.name)}</b>`, chip(x.kind), "⭐ " + x.cost, `<input type="checkbox" data-act="${x.id}" ${x.active ? "checked" : ""} aria-label="Active">`, btn("\u{1F5D1}️", "sm alt", `data-del="${x.id}" aria-label="Delete"`)]));
      box.insertAdjacentHTML("beforeend", pager(r));
      trNodes(box);
    }).catch((e) => {
      box.innerHTML = `<p class="muted">${esc(e.message)}</p>`;
    });
    root.addEventListener("change", (e) => {
      const a = e.target.closest("[data-act]");
      if (a) api("PATCH", "/api/admin/rewards/" + a.dataset.act, { active: a.checked }).then(() => toast("Saved")).catch((err) => toast("⚠️ " + err.message));
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
        api("DELETE", "/api/admin/rewards/" + d.dataset.del).then(load).catch((err) => toast("⚠️ " + err.message));
        return;
      }
      if (e.target.closest("#rAdd")) {
        const name = $("#rName", root).value.trim();
        if (!name) {
          toast("Add a name");
          return;
        }
        api("POST", "/api/admin/rewards", { name, emoji: $("#rEmoji", root).value || "⭐", cost: +$("#rCost", root).value || 0, kind: $("#rKind", root).value, active: true }).then(() => {
          $("#rName", root).value = "";
          load();
        }).catch((err) => toast("⚠️ " + err.message));
      }
    });
    load();
  }
};
