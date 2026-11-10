S["admin/moderation"] = {
  render() {
    return `${head("Moderation", "Review reported games and comments to keep Critter Academy safe for children.")}
    <div class="chips pickgroup" id="mFilter">${[["", "All"], ["pending", "Pending"], ["resolved", "Resolved"], ["removed", "Removed"]].map((c, i) => `<button class="fchip ${i ? "" : "on"}" data-pick data-f="${c[0]}">${c[1]}</button>`).join("")}</div>
    <div class="card m16" id="mBox"><p class="muted">Loading…</p></div>`;
  },
  mount(root) {
    const box = $("#mBox", root);
    let f = "", pg = 1;
    const load = () => api("GET", pgq("/api/admin/moderation" + (f ? "?status=" + f : ""), pg)).then((r) => {
      box.innerHTML = r.items.length ? table(["Type", "Item", "Reason", "Reported by", "Status", ""], r.items.map((m) => [chip(m.kind), `<b translate="no">${esc(m.target)}</b>`, esc(m.reason), esc(m.reporter), chip(m.status, m.status === "pending" ? "#f5a300" : m.status === "removed" ? "#ff5d73" : "#2fbf63"), m.status === "pending" ? `<div class="row gap6">${btn("Keep", "sm alt", `data-mod="${m.id}" data-s="resolved"`)}${btn("Remove", "sm", `data-mod="${m.id}" data-s="removed"`)}</div>` : ""])) : '<p class="muted" style="padding:14px">Nothing to review.</p>';
      box.insertAdjacentHTML("beforeend", pager(r));
      trNodes(box);
    }).catch((e) => {
      box.innerHTML = `<p class="muted" style="padding:14px">${esc(e.message)}</p>`;
    });
    root.addEventListener("click", (e) => {
      const pb = e.target.closest("[data-pg]");
      if (pb) {
        pg = +pb.dataset.pg;
        load();
        return;
      }
      const b = e.target.closest("[data-mod]");
      if (b) {
        api("PATCH", "/api/admin/moderation/" + b.dataset.mod, { status: b.dataset.s }).then(() => {
          toast("Updated");
          load();
        }).catch((err) => toast("⚠️ " + err.message));
        return;
      }
      const t = e.target.closest("[data-f]");
      if (t) {
        f = t.dataset.f;
        pg = 1;
        load();
      }
    });
    load();
  }
};
