S["admin/dashboard"] = {
  render() {
    return `${head("Dashboard", "Live numbers from the Little Learner backend.", btn("\u{1F504} Refresh", "alt", 'id="dRef"'))}
    <div id="dBox"><p class="muted">Loading…</p></div>`;
  },
  mount(root) {
    const box = $("#dBox", root);
    const load = () => api("GET", "/api/admin/dashboard").then((r) => {
      const s = r.stats;
      box.innerHTML = `<div class="g4">${stat("\u{1F465}", s.users, "Users", "", "#efeaff")}${stat("\u{1F3AE}", s.published, "Published games", "", "#ffe9cc")}${stat("▶️", s.plays.toLocaleString(), "Total plays", "", "#d8f5e4")}${stat("\u{1F4AC}", s.openTickets, "Open tickets", "", "#ffd9e6")}</div>
      <div class="g4 m16">${stat("✏️", s.drafts, "Drafts", "", "#fff0c2")}${stat("\u{1F6E1}️", s.pendingModeration, "Waiting for review", "", "#ffe0e5")}${stat("\u{1F4FA}", s.liveSessions, "Live sessions", "", "#dcd3ff")}${stat("\u{1F3C6}", s.results, "Game results", "", "#c9f2a8")}</div>
      <div class="g2 m16">${card("Top games", table(["Game", "Plays", "Rating"], r.topGames.map((g) => [`${g.emoji} <b translate="no">${esc(g.title)}</b>`, g.plays.toLocaleString(), "⭐ " + g.rating])))}
      ${card("Recent results", r.recentResults.length ? table(["Player", "Game", "Score"], r.recentResults.map((x) => [esc(x.player), esc(x.title), x.score])) : '<p class="muted">No results yet.</p>')}</div>
      ${card("Users by role", `<div class="chips">${Object.entries(r.roles).map(([k, v]) => chip(k.replace("_", " ") + ": " + v)).join("")}</div>`, "", "m16")}`;
      trNodes(box);
    }).catch((e) => {
      box.innerHTML = `<p class="muted">${esc(e.message)}</p>`;
    });
    $("#dRef", root).addEventListener("click", load);
    load();
  }
};
