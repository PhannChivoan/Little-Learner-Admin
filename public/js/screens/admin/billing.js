S["admin/billing"] = {
  render() {
    return `${head("Billing", "Invoices for schools and classrooms.")}
    <div id="bStats"></div>
    <div class="g21 m16"><div class="card" id="bBox"><p class="muted">Loading…</p></div>
    ${card("New invoice", `<label class="lbl">School or customer</label><input class="in" id="bSchool"><label class="lbl">Plan</label><select class="sel" id="bPlan"><option>Classroom</option><option>School</option></select><label class="lbl">Seats</label><input class="in" id="bSeats" type="number" min="1" value="30"><label class="lbl">Amount (USD)</label><input class="in" id="bAmt" type="number" min="0" value="45"><div class="m16">${btn("➕ Create", "", 'id="bAdd"')}</div>`)}</div>`;
  },
  mount(root) {
    const box = $("#bBox", root);
    let pg = 1;
    const load = () => Promise.all([api("GET", "/api/admin/billing"), api("GET", pgq("/api/admin/billing", pg))]).then(([all, r]) => {
      const paid = all.items.filter((x) => x.status === "paid").reduce((a, x) => a + (+x.amount || 0), 0);
      const due = all.items.filter((x) => x.status !== "paid").reduce((a, x) => a + (+x.amount || 0), 0);
      $("#bStats", root).innerHTML = `<div class="g4">${stat("\u{1F4B5}", "$" + paid.toLocaleString(), "Paid", "", "#d8f5e4")}${stat("⏳", "$" + due.toLocaleString(), "Outstanding", "", "#ffe0e5")}${stat("\u{1F9FE}", all.items.length, "Invoices", "", "#efeaff")}</div>`;
      box.innerHTML = r.items.length ? table(["Invoice", "Customer", "Plan", "Seats", "Amount", "Status", ""], r.items.map((x) => [esc(x.invoice), `<b>${esc(x.school)}</b>`, esc(x.plan), x.seats, "$" + x.amount, chip(x.status, x.status === "paid" ? "#2fbf63" : "#ff5d73"), x.status === "paid" ? "" : btn("Mark paid", "sm alt", `data-paid="${x.id}"`)])) : '<p class="muted" style="padding:14px">No invoices yet.</p>';
      box.insertAdjacentHTML("beforeend", pager(r));
      trNodes(root);
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
      const p = e.target.closest("[data-paid]");
      if (p) {
        api("PATCH", "/api/admin/billing/" + p.dataset.paid, { status: "paid" }).then(load).catch((err) => toast("⚠️ " + err.message));
        return;
      }
      if (e.target.closest("#bAdd")) {
        const school = $("#bSchool", root).value.trim();
        if (!school) {
          toast("Add a customer name");
          return;
        }
        api("GET", "/api/admin/billing").then((r) => api("POST", "/api/admin/billing", { school, plan: $("#bPlan", root).value, seats: +$("#bSeats", root).value, amount: +$("#bAmt", root).value, status: "due", invoice: "INV-" + (1001 + r.items.length) })).then(() => {
          $("#bSchool", root).value = "";
          load();
        }).catch((err) => toast("⚠️ " + err.message));
      }
    });
    load();
  }
};
