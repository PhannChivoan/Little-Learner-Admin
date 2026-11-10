S["admin/announce"] = {
  render() {
    return `${head("Announcements", "Tell teachers, parents and kids what is new.")}
    <div class="g21"><div class="card" id="aBox"><p class="muted">Loading…</p></div>
    ${card("New announcement", `<label class="lbl">Title</label><input class="in" id="aTitle"><label class="lbl">Message</label><textarea class="ta" id="aBody"></textarea><label class="lbl">Audience</label><select class="sel" id="aAud"><option value="all">Everyone</option><option value="teachers">Teachers</option><option value="parents">Parents</option><option value="kids">Kids</option></select><div class="m16">${btn("\u{1F4E3} Send", "", 'id="aSend"')}</div>`)}</div>`;
  },
  mount(root) {
    const box = $("#aBox", root);
    let pg = 1;
    const load = () => api("GET", pgq("/api/admin/announcements?order=desc", pg)).then((r) => {
      box.innerHTML = r.items.length ? r.items.map((a) => `<div class="li"><div class="grow"><b>${esc(a.title)}</b><div class="small muted">${esc(a.body)}</div></div>${chip(a.audience)}${chip(a.status, a.status === "sent" ? "#2fbf63" : "#f5a300")}${btn("\u{1F5D1}️", "sm alt", `data-del="${a.id}" aria-label="Delete"`)}</div>`).join("") : '<p class="muted">No announcements yet.</p>';
      box.insertAdjacentHTML("beforeend", pager(r));
      trNodes(box);
    }).catch((e) => {
      box.innerHTML = `<p class="muted">${esc(e.message)}</p>`;
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
        api("DELETE", "/api/admin/announcements/" + d.dataset.del).then(load).catch((err) => toast("⚠️ " + err.message));
        return;
      }
      if (e.target.closest("#aSend")) {
        const title = $("#aTitle", root).value.trim();
        if (!title) {
          toast("Add a title");
          return;
        }
        api("POST", "/api/admin/announcements", { title, body: $("#aBody", root).value, audience: $("#aAud", root).value, status: "sent", channel: "In-app" }).then(() => {
          $("#aTitle", root).value = "";
          $("#aBody", root).value = "";
          toast("Announcement sent");
          pg = 1;
          load();
        }).catch((err) => toast("⚠️ " + err.message));
      }
    });
    load();
  }
};
