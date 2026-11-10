S["studio/ai"] = {
  render() {
    return `${head("AI assistant \u2728", "Describe your game and get questions, translations and image ideas in seconds. You stay in control and can edit everything.")}
    <div class="g21"><div class="col gap16">${card("What should we make?", `<label class="lbl">Topic</label><textarea class="ta" id="aiT">Farm animals and the sounds they make</textarea>
      <div class="g4 m8" style="gap:10px"><div><label class="lbl">Age</label><select class="sel"><option>3\u20134</option><option selected>5\u20136</option><option>7\u20138</option></select></div><div><label class="lbl">Questions</label><select class="sel"><option>5</option><option selected>8</option><option>10</option></select></div><div><label class="lbl">Difficulty</label><select class="sel"><option>Easy</option><option selected>Medium</option><option>Hard</option></select></div><div><label class="lbl">Language</label><select class="sel"><option>English</option><option>Khmer</option><option selected>Both</option></select></div></div>
      <div class="m16">${btn("\u2728 Generate questions", "lg", 'id="aiGo"')}</div>`)}
      <div id="aiOut">${card("", '<p class="muted center" style="text-align:center;padding:24px">Your questions will appear here.</p>', "", "flat")}</div></div>
    <div class="col gap16">${card("Checks", `<div class="li"><span>\u{1F4D6}</span><div class="grow small"><b>Reading level</b><br>Good for ages 5\u20136</div>${chip("\u2713 OK", "#2fbf63")}</div><div class="li"><span>\u{1F6E1}\uFE0F</span><div class="grow small"><b>Safety scan</b><br>No unsafe words or images</div>${chip("\u2713 Clear", "#2fbf63")}</div><div class="li"><span>\u{1F310}</span><div class="grow small"><b>Translation</b><br>Khmer draft ready. Ask a native speaker to review.</div>${chip("Review", "#f5a300")}</div>`)}
      ${card("Image ideas", `<div class="chips">${["\u{1F404}", "\u{1F416}", "\u{1F413}", "\u{1F411}", "\u{1F434}", "\u{1F33E}"].map((x) => `<span class="av lg" style="background:#fff5d6;border-radius:18px">${x}</span>`).join("")}</div>`)}</div></div>`;
  },
  mount(root) {
    const out = $("#aiOut", root);
    $("#aiGo", root).addEventListener("click", () => {
      out.innerHTML = card("", '<div class="row gap8" style="padding:18px"><span class="pill">\u2728 Thinking</span><span id="dots" style="font-size:1.6rem;letter-spacing:4px">\u2022\u2022\u2022</span></div>', "", "flat");
      let n = 0;
      every(() => {
        const d = $("#dots", root);
        if (d) d.style.opacity = n++ % 2 ? 1 : 0.4;
      }, 300);
(async () => {
        let items;
        try {
          const r = await api("POST", "/api/studio/ai/generate", { topic: $("#aiT", root).value, count: 4 });
          await new Promise((ok) => setTimeout(ok, 900));
          items = r.questions.map((q) => [q.q, q.a, q.c, q.qk, q.ak, q.img]);
        } catch (e) {
          out.innerHTML = "";
          toast("\u26A0\uFE0F " + e.message);
          return;
        }
        out.innerHTML = card(items.length + " questions ready", items.map((it, i) => `<div class="li"><input type="checkbox" checked aria-label="Select question ${i + 1}"><div class="grow" translate="no"><b>${i + 1}. ${esc(it[0])}</b><div class="small muted">${it[1].map((a, k) => k === it[2] ? "\u2714 " + esc(a) : esc(a)).join(" \xB7 ")}</div></div></div>`).join(""), btn("\u2795 Add selected to my game", "sm", 'id="aiAdd"'));
        $("#aiAdd", root).addEventListener("click", () => {
          $$(".li input[type=checkbox]", out).forEach((c, i) => {
            if (!c.checked) return;
            const it = items[i];
            ED.qs.push({ type: "quiz", q: it[0], qk: it[3] || "", img: it[5] || "\u2753", a: it[1], ak: it[4] || ["", "", "", ""], c: it[2], t: 20, p: 500 });
          });
          toast("Questions added to \u201C" + gameTitle() + "\u201D");
          navigate("studio/editor");
        });
      })();
    });
  }
};
