S["admin/settings"] = {
  render() {
    return `${head("Settings", "Platform options and child safety rules.")}
    <div id="sBox"><p class="muted">Loading…</p></div>`;
  },
  mount(root) {
    const box = $("#sBox", root);
    let items = [];
    const label = (k) => k.replace(/_/g, " ").replace(/^./, (c) => c.toUpperCase());
    const draw = () => {
      const groups = {};
      items.forEach((x) => {
        (groups[x.group || "general"] = groups[x.group || "general"] || []).push(x);
      });
      box.innerHTML = Object.entries(groups).map(([g, list]) => card(label(g), list.map((x) => typeof x.value === "boolean" ? `<div class="setting"><div>${label(x.key)}</div><label class="sw"><input type="checkbox" data-s="${x.id}" ${x.value ? "checked" : ""}><i></i></label></div>` : `<div class="li"><div class="grow">${label(x.key)}</div><input class="in" style="max-width:260px" data-s="${x.id}" ${typeof x.value === "number" ? 'type="number"' : ""} value="${esc(x.value)}"></div>`).join(""))).join("<div class=\"m16\"></div>");
      trNodes(box);
    };
    root.addEventListener("change", (e) => {
      const i = e.target.closest("[data-s]");
      if (!i) return;
      const x = items.find((y) => y.id === +i.dataset.s);
      const value = i.type === "checkbox" ? i.checked : typeof x.value === "number" ? +i.value : i.value;
      api("PATCH", "/api/admin/settings/" + x.id, { value }).then(() => {
        x.value = value;
        toast("Saved");
      }).catch((err) => toast("⚠️ " + err.message));
    });
    api("GET", "/api/admin/settings").then((r) => {
      items = r.items;
      draw();
    }).catch((e) => {
      box.innerHTML = `<p class="muted">${esc(e.message)}</p>`;
    });
  }
};
