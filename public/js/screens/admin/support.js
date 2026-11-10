S["admin/support"] = {
  render() {
    return `${head("Support inbox", "Answer questions from parents and teachers.")}
    <div class="card" id="sBox"><p class="muted">Loading…</p></div>`;
  },
  mount(root) {
    const box = $("#sBox", root);
    let items = [], pg = 1;
    const load = () => api("GET", pgq("/api/admin/support", pg)).then((r) => {
      items = r.items;
      box.innerHTML = items.length ? table(["Subject", "From", "Priority", "Status", ""], items.map((t) => [`<b>${esc(t.subject)}</b>`, esc(t.from), chip(t.priority, t.priority === "high" ? "#ff5d73" : "#7c5cff"), chip(t.status, t.status === "open" ? "#f5a300" : "#2fbf63"), `<button class="btn sm alt" data-t="${t.id}">Open</button>`])) : '<p class="muted" style="padding:14px">Inbox is empty.</p>';
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
      const b = e.target.closest("[data-t]");
      if (!b) return;
      const t = items.find((x) => x.id === +b.dataset.t);
      openModal(`<h3>${esc(t.subject)}</h3><div class="small muted">${esc(t.from)}</div><div class="col gap8 m8">${(t.messages || []).map((m) => `<div class="card tight flat small"><b>${esc(m.by)}</b><br>${esc(m.text)}</div>`).join("")}</div><label class="lbl">Reply</label><textarea class="ta" id="sReply"></textarea><div class="row gap8 m16">${btn("Send reply", "", 'id="sSend"')}${btn(t.status === "open" ? "Close ticket" : "Reopen", "alt", 'id="sToggle"')}${btn("Cancel", "alt", "data-close")}</div>`);
      $("#sSend").addEventListener("click", () => {
        const text = $("#sReply").value.trim();
        if (!text) return;
        api("PATCH", "/api/admin/support/" + t.id, { messages: (t.messages || []).concat([{ by: "Support", text }]) }).then(() => {
          closeModal();
          toast("Reply sent");
          load();
        }).catch((err) => toast("⚠️ " + err.message));
      });
      $("#sToggle").addEventListener("click", () => {
        api("PATCH", "/api/admin/support/" + t.id, { status: t.status === "open" ? "closed" : "open" }).then(() => {
          closeModal();
          load();
        }).catch((err) => toast("⚠️ " + err.message));
      });
    });
    load();
  }
};
