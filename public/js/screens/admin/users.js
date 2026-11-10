S["admin/users"] = {
  render() {
    return `${head("Users & roles", "Create accounts, change roles and suspend or remove users.", btn("➕ Add user", "", 'id="uAdd"'))}
    <div class="row gap12 wrap"><label class="search grow" style="min-width:240px">\u{1F50D}<input id="uQ" placeholder="Search name or email" aria-label="Search users"></label><div class="chips pickgroup" id="uRole">${[["", "All"], ["kid", "Kids"], ["parent", "Parents"], ["teacher", "Teachers"], ["creator", "Creators"], ["admin", "Staff"]].map((c, i) => `<button class="fchip ${i ? "" : "on"}" data-pick data-role="${c[0]}">${c[1]}</button>`).join("")}</div></div>
    <div class="card m16" id="uBox"><p class="muted">Loading…</p></div>`;
  },
  mount(root) {
    const box = $("#uBox", root);
    let role = "";
    let list = [], info = {}, pg = 1;
    const draw = () => {
      box.innerHTML = list.length ? table(["User", "Role", "Email", "Status", ""], list.map((u) => [`<div class="row gap8">${av(u.emoji, "#efeaff", "sm")}<b translate="no">${esc(u.name)}</b></div>`, chip(u.role.replace("_", " "), u.role.includes("admin") ? "#ff5fa2" : "#7c5cff"), esc(u.email), chip(u.status, u.status === "active" ? "#2fbf63" : "#ff5d73"), `<button class="btn sm alt" data-user="${u.id}">Manage</button>`])) : '<p class="muted" style="padding:14px">No users found.</p>';
      box.insertAdjacentHTML("beforeend", pager(info));
      trNodes(box);
    };
    const load = () => {
      const q = $("#uQ", root).value.trim();
      api("GET", "/api/admin/users?role=" + role + "&q=" + encodeURIComponent(q) + "&page=" + pg + "&per=10").then((r) => {
        list = r.users;
        info = r;
        draw();
      }).catch((e) => {
        box.innerHTML = `<p class="muted" style="padding:14px">${esc(e.message)}</p>`;
      });
    };
    const form = (u) => `<label class="lbl">Name</label><input class="in" id="fName" value="${esc(u ? u.name : "")}"><label class="lbl">Email</label><input class="in" id="fEmail" type="email" value="${esc(u ? u.email : "")}" ${u ? "disabled" : ""}><label class="lbl">${u ? "New password (optional)" : "Password"}</label><input class="in" id="fPass" type="password" placeholder="6+ characters"><label class="lbl">Role</label><select class="sel" id="fRole">${["kid", "parent", "teacher", "creator", "admin", "super_admin"].map((r) => `<option value="${r}" ${u && u.role === r ? "selected" : ""}>${r.replace("_", " ")}</option>`).join("")}</select>${u ? `<label class="lbl">Status</label><select class="sel" id="fStatus"><option value="active" ${u.status === "active" ? "selected" : ""}>Active</option><option value="suspended" ${u.status === "suspended" ? "selected" : ""}>Suspended</option></select>` : ""}`;
    root.addEventListener("click", (e) => {
      const pb = e.target.closest("[data-pg]");
      if (pb) {
        pg = +pb.dataset.pg;
        load();
        return;
      }
      if (e.target.closest("#uAdd")) {
        openModal(`<h3>➕ Add user</h3>${form(null)}<div class="row gap8 m16">${btn("Create", "", 'id="fSave"')}${btn("Cancel", "alt", "data-close")}</div>`);
        $("#fSave").addEventListener("click", () => {
          api("POST", "/api/admin/users", { name: $("#fName").value, email: $("#fEmail").value, password: $("#fPass").value, role: $("#fRole").value }).then(() => {
            closeModal();
            toast("User created");
            load();
          }).catch((err) => toast("⚠️ " + err.message));
        });
        return;
      }
      const b = e.target.closest("[data-user]");
      if (b) {
        const u = list.find((x) => x.id === +b.dataset.user);
        openModal(`<div class="row gap12">${av(u.emoji, "#efeaff", "lg")}<div><h3 translate="no">${esc(u.name)}</h3><div class="small muted">Joined ${u.created.slice(0, 10)}</div></div></div>${form(u)}<div class="row gap8 m16 wrap">${btn("Save", "", 'id="fSave"')}${btn("\u{1F5D1}️ Delete", "alt", 'id="fDel"')}${btn("Cancel", "alt", "data-close")}</div>`);
        $("#fSave").addEventListener("click", () => {
          const body = { name: $("#fName").value, role: $("#fRole").value, status: $("#fStatus").value };
          if ($("#fPass").value) body.password = $("#fPass").value;
          api("PUT", "/api/admin/users/" + u.id, body).then(() => {
            closeModal();
            toast("Saved");
            load();
          }).catch((err) => toast("⚠️ " + err.message));
        });
        $("#fDel").addEventListener("click", () => {
          if (!confirm("Delete this user?")) return;
          api("DELETE", "/api/admin/users/" + u.id).then(() => {
            closeModal();
            toast("User deleted");
            load();
          }).catch((err) => toast("⚠️ " + err.message));
        });
        return;
      }
      const r = e.target.closest("[data-role]");
      if (r) {
        role = r.dataset.role;
        pg = 1;
        load();
      }
    });
    let t;
    $("#uQ", root).addEventListener("input", () => {
      clearTimeout(t);
      t = setTimeout(() => {
        pg = 1;
        load();
      }, 300);
    });
    load();
  }
};
