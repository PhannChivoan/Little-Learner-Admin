S["admin/system"] = {
  render() {
    return `${head("Platform health", "Live status of the Little Learner backend.", btn("\u{1F504} Refresh", "alt", 'id="yRef"'))}
    <div id="yBox"><p class="muted">Loading…</p></div>`;
  },
  mount(root) {
    const box = $("#yBox", root);
    const fmt = (s) => `${Math.floor(s / 3600)}h ${Math.floor(s % 3600 / 60)}m ${s % 60}s`;
    const load = () => api("GET", "/api/admin/system").then((r) => {
      box.innerHTML = `<div class="g4">${stat("✅", "Online", "Backend status", "", "#d8f5e4")}${stat("⏱️", fmt(r.uptimeSeconds), "Uptime", "", "#efeaff")}${stat("\u{1F40D}", r.python, "Python", "", "#fff0c2")}${stat("\u{1F4BE}", (r.databaseBytes / 1024).toFixed(0) + " KB", "Database size", "", "#ffe9cc")}</div>
      <div class="m16">${card("Records", table(["Table", "Rows"], Object.entries(r.tables).map(([k, v]) => [k, v])))}</div>
      <p class="small muted m8">${esc(r.platform)} \xB7 ${esc(r.time)}</p>`;
      trNodes(box);
    }).catch((e) => {
      box.innerHTML = `<p class="muted">${esc(e.message)}</p>`;
    });
    $("#yRef", root).addEventListener("click", load);
    load();
  }
};
