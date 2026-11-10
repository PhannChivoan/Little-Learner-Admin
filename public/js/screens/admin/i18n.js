S["admin/i18n"] = {
  render() {
    return `${head("Localization", "English and Khmer text used across the platform.")}
    <div class="g21"><div class="card" id="iBox"><p class="muted">Loading…</p></div>
    ${card("Add text", `<label class="lbl">Key</label><input class="in" id="iKey" placeholder="welcome_title"><label class="lbl">English</label><input class="in" id="iEn"><label class="lbl">ខ្មែរ</label><input class="in" id="iKm" lang="km"><div class="m16">${btn("➕ Add", "", 'id="iAdd"')}</div>`)}</div>`;
  },
  mount(root) {
    const box = $("#iBox", root);
    let pg = 1;
    const load = () => Promise.all([api("GET", "/api/admin/i18n"), api("GET", pgq("/api/admin/i18n", pg))]).then(([all, r]) => {
      const done = all.items.filter((x) => x.en && x.km).length;
      box.innerHTML = `<p class="small muted" style="padding:0 0 8px">${done} of ${all.items.length} translated</p>` + (r.items.length ? table(["Key", "English", "ខ្មែរ", "Status", ""], r.items.map((x) => [`<code>${esc(x.key)}</code>`, `<input class="in" data-f="en" data-id="${x.id}" value="${esc(x.en || "")}">`, `<input class="in" data-f="km" data-id="${x.id}" lang="km" value="${esc(x.km || "")}">`, chip(x.en && x.km ? "done" : "missing", x.en && x.km ? "#2fbf63" : "#f5a300"), btn("\u{1F5D1}️", "sm alt", `data-del="${x.id}" aria-label="Delete"`)])) : '<p class="muted">No texts yet.</p>');
      box.insertAdjacentHTML("beforeend", pager(r));
    }).catch((e) => {
      box.innerHTML = `<p class="muted">${esc(e.message)}</p>`;
    });
    root.addEventListener("change", (e) => {
      const i = e.target.closest("[data-f]");
      if (!i) return;
      const body = { [i.dataset.f]: i.value };
      api("PATCH", "/api/admin/i18n/" + i.dataset.id, body).then(() => toast("Saved")).catch((err) => toast("⚠️ " + err.message));
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
        api("DELETE", "/api/admin/i18n/" + d.dataset.del).then(load).catch((err) => toast("⚠️ " + err.message));
        return;
      }
      if (e.target.closest("#iAdd")) {
        const key = $("#iKey", root).value.trim();
        if (!key) {
          toast("Add a key");
          return;
        }
        api("POST", "/api/admin/i18n", { key, en: $("#iEn", root).value, km: $("#iKm", root).value, status: "done" }).then(() => {
          ["#iKey", "#iEn", "#iKm"].forEach((s) => {
            $(s, root).value = "";
          });
          load();
        }).catch((err) => toast("⚠️ " + err.message));
      }
    });
    load();
  }
};
