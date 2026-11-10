S["studio/publish"] = {
  render() {
    const chk = [["Title added", 1], ["At least 5 questions", ED.qs.length >= 5], ["Khmer and English text on every question", ED.qs.every((q) => qReady(q, "en") && qReady(q, "km"))], ["Cover image", 1], ["Age range and language", 1], ["Safety scan passed", 1]];
    return `${head("Publish & share", "Check your game, choose who can play and share it with a link.", btn("\u{1F680} Publish game", "lg", 'id="pubGo"'))}
    <div class="g2"><div class="col gap16">${card("Checklist", chk.map((c) => `<div class="li"><span class="av sm" style="background:${c[1] ? "#d8f5e4" : "#fff0c2"}">${c[1] ? "\u2713" : "!"}</span><span class="grow">${c[0]}</span>${c[1] ? "" : chip("Add more", "#f5a300")}</div>`).join(""))}
      ${card("Who can play?", `<div class="col gap8 pickgroup">${[["\u{1F512}", "Private", "Only you"], ["\u{1F517}", "Link only", "Anyone with the link"], ["\u{1F30D}", "Public", "Listed in the community library"]].map((v, i) => `<button class="card tight row gap12 tilebtn ${i === 1 ? "on" : ""}" data-pick style="border-width:3px"><span style="font-size:1.6rem">${v[0]}</span><div><b>${v[1]}</b><div class="small muted">${v[2]}</div></div></button>`).join("")}</div>`)}
      ${card("Import & export", `<div class="chips"><label class="fchip" style="cursor:pointer">\u{1F4E5} Import CSV<input type="file" id="pubCsv" accept=".csv" hidden></label><button class="fchip" id="pubExp">\u{1F4E4} Export JSON</button></div><p class="small muted m8">CSV columns: question, answer1, answer2, answer3, answer4, correct (1-4)</p>`)}</div>
    <div class="col gap16">${card("Version history", '<div id="pubVers"><p class="muted">Publish your game to start a history.</p></div>')}</div></div>`;
  },
  mount(root) {
    const vers = $("#pubVers", root);
    $("#pubCsv", root).addEventListener("change", (e) => {
      const f = e.target.files[0];
      if (!f) return;
      const fd = new FormData();
      fd.append("file", f);
      fd.append("title", f.name.replace(/\.csv$/i, ""));
      api("POST", "/api/studio/import", fd).then((r) => loadGame(r.game.id)).then(() => {
        toast("Imported");
        navigate("studio/editor");
      }).catch((err) => toast("\u26A0\uFE0F " + err.message));
    });
    $("#pubExp", root).addEventListener("click", async () => {
      try {
        if (!ED.id) await saveGame();
        const data = await api("GET", "/api/studio/games/" + ED.id + "/export");
        const url = URL.createObjectURL(new Blob([JSON.stringify(data, null, 2)], { type: "application/json" }));
        const link = document.createElement("a");
        link.href = url;
        link.download = (data.slug || "game") + ".json";
        link.click();
        URL.revokeObjectURL(url);
      } catch (err) {
        toast("\u26A0\uFE0F " + err.message);
      }
    });
    if (ED.id) api("GET", "/api/studio/games/" + ED.id + "/versions").then((r) => {
      if (!r.versions.length) return;
      vers.innerHTML = `<div class="tl">${r.versions.map((v) => `<div class="li"><div class="grow"><b>v${v.version} \xB7 ${v.created.slice(0, 16).replace("T", " ")}</b><div class="small muted">${esc(v.note)}</div></div>${btn("Restore", "sm alt", `data-restore="${v.id}"`)}</div>`).join("")}</div>`;
    }).catch(() => {
    });
    root.addEventListener("click", (e) => {
      const b = e.target.closest("[data-restore]");
      if (!b) return;
      api("POST", "/api/studio/games/" + ED.id + "/restore/" + b.dataset.restore).then(() => loadGame(ED.id)).then(() => {
        toast("Version restored");
        navigate("studio/editor");
      }).catch((err) => toast("\u26A0\uFE0F " + err.message));
    });
    $("#pubGo", root).addEventListener("click", async () => {
      const group = $(".pickgroup", root);
      const idx = group ? [...group.children].findIndex((x) => x.classList.contains("on")) : -1;
      const visibility = ["private", "link", "public"][idx < 0 ? 2 : idx];
      let game;
      try {
        await saveGame();
        game = (await api("POST", "/api/studio/games/" + ED.id + "/publish", { visibility })).game;
      } catch (e) {
        toast("\u26A0\uFE0F " + e.message);
        return;
      }
      const link = PLATFORM_URL + "/play/game?slug=" + game.slug;
      openModal(`<div class="center col" style="align-items:center;text-align:center"><div style="font-size:4rem;animation:pulse 1s infinite">\u{1F389}</div><h2>\u201C${gameTitle()}\u201D is live!</h2><p class="muted">Share this link or QR code with your class.</p><div style="width:160px;margin:14px auto">${qr(21, 11)}</div><div class="row gap8"><input class="in" readonly value="${link}"><button class="btn" data-copy="${link}">Copy</button></div><div class="row gap8 m16">${btn("\u{1F517} Copy link", "alt", 'data-copy="${link}"')}${btn("\u270F\uFE0F Keep editing", "alt", 'data-go="studio/editor"')}</div></div>`);
    });
  }
};
