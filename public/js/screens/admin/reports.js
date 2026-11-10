S["admin/reports"] = {
  render() {
    return `${head("Reports", "Plays and learning results from the platform.", btn("\u{1F504} Refresh", "alt", 'id="rpRef"'))}
    <div id="rpBox"><p class="muted">Loading…</p></div>`;
  },
  mount(root) {
    const box = $("#rpBox", root);
    const load = () => Promise.all([api("GET", "/api/admin/reports/summary"), api("GET", "/api/admin/dashboard")]).then(([r, d]) => {
      box.innerHTML = `<div class="g4">${stat("\u{1F3AF}", r.accuracy + "%", "Overall accuracy", "", "#d8f5e4")}${stat("▶️", d.stats.plays.toLocaleString(), "Total plays", "", "#efeaff")}${stat("\u{1F3C6}", d.stats.results, "Saved results", "", "#fff0c2")}${stat("\u{1F3AE}", d.stats.published, "Published games", "", "#ffe9cc")}</div>
      <div class="g2 m16">${card("Plays by subject", r.bySubject.length ? table(["Subject", "Games", "Plays"], r.bySubject.map((x) => [esc(x.subject), x.games, x.plays.toLocaleString()])) : '<p class="muted">No data yet.</p>')}
      ${card("Last days", r.daily.length ? table(["Day", "Results", "Average score"], r.daily.map((x) => [x.day, x.plays, Math.round(x.avgScore)])) : '<p class="muted">No results yet.</p>')}</div>`;
      trNodes(box);
    }).catch((e) => {
      box.innerHTML = `<p class="muted">${esc(e.message)}</p>`;
    });
    $("#rpRef", root).addEventListener("click", load);
    load();
  }
};
