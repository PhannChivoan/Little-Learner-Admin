S["studio/assets"] = {
  render() {
    return `${head("Asset library", "Images and sounds you can use in your games.", `<label class="btn" style="cursor:pointer">⬆️ Upload<input type="file" id="asUp" accept="image/*,audio/*" hidden></label>`)}
    <div class="chips pickgroup" id="asF">${[["", "All"], ["image", "Images"], ["audio", "Sounds"]].map((c, i) => `<button class="fchip ${i ? "" : "on"}" data-pick data-k="${c[0]}">${c[1]}</button>`).join("")}</div>
    <div id="asBox" class="m16"><p class="muted">Loading…</p></div>`;
  },
  mount(root) {
    const box = $("#asBox", root);
    let kind = "", pg = 1;
    const load = () => api("GET", pgq("/api/admin/assets" + (kind ? "?kind=" + kind : ""), pg)).then((r) => {
      box.innerHTML = r.items.length ? `<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(130px,1fr));gap:12px">${r.items.map((x) => `<div class="card tight center col" style="align-items:center">${x.kind === "image" && x.url ? `<img src="${assetUrl(x.url)}" alt="" style="width:80px;height:80px;object-fit:cover;border-radius:14px">` : x.kind === "audio" && x.url ? `<audio controls src="${assetUrl(x.url)}" style="width:110px"></audio>` : `<span style="font-size:2.4rem">${esc(x.emoji)}</span>`}<b class="small" translate="no">${esc(x.name)}</b><button class="btn sm alt" data-del="${x.id}">Delete</button></div>`).join("")}</div>` : '<p class="muted">No assets yet. Upload an image or a sound.</p>';
      box.insertAdjacentHTML("beforeend", pager(r));
      trNodes(box);
    }).catch((e) => {
      box.innerHTML = `<p class="muted">${esc(e.message)}</p>`;
    });
    $("#asUp", root).addEventListener("change", (e) => {
      const f = e.target.files[0];
      if (!f) return;
      const fd = new FormData();
      fd.append("file", f);
      uploadWith(e.target, () => api("POST", "/api/assets/upload", fd)).then((r) => {
        toast(r.duplicate ? "\u2139\uFE0F Already in your library: " + r.item.name : "Uploaded");
        load();
      }).catch((err) => toast("⚠️ " + err.message));
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
        api("DELETE", "/api/admin/assets/" + d.dataset.del).then(load).catch((err) => toast("⚠️ " + err.message));
        return;
      }
      const k = e.target.closest("[data-k]");
      if (k) {
        kind = k.dataset.k;
        pg = 1;
        load();
      }
    });
    load();
  }
};
