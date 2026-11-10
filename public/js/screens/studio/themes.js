S["studio/themes"] = {
  render() {
    const th = [["jungle", "Jungle", "\u{1F334}", "Calm greens, bird sounds"], ["ocean", "Ocean", "\u{1F420}", "Bubbly blues, wave music"], ["space", "Space", "\u{1F680}", "Dark sky, twinkling stars"], ["candy", "Candy", "\u{1F36D}", "Sweet pinks, pop sounds"], ["farm", "Farm", "\u{1F69C}", "Sunny fields, animal noises"], ["desert", "Desert", "\u{1F42A}", "Warm sand, gentle drums"]];
    return `${head("Themes & skins", "Change the whole look of a game with one click. Colors, background, fonts and sounds.", btn("\u2795 New theme", "", 'data-toast="Custom theme created"'))}
    <div class="g3">${th.map((t) => `<article class="gc"><div class="stage skin-${t[0]}" style="height:140px;display:grid;place-items:center;position:relative;overflow:hidden"><span style="font-size:3.4rem;animation:fl 3s ease-in-out infinite">${t[2]}</span><div class="row gap6" style="position:absolute;bottom:10px"><span class="ans a0" style="min-height:0;padding:4px 14px;font-size:.8rem">A</span><span class="ans a1" style="min-height:0;padding:4px 14px;font-size:.8rem">B</span><span class="ans a2" style="min-height:0;padding:4px 14px;font-size:.8rem">C</span></div></div>
      <div class="bd"><div class="row sp"><h4>${t[1]}</h4>${chip("Free", "#2fbf63")}</div><p>${t[3]}</p><div class="m8">${btn("Apply to my game", "sm", `data-theme="${t[0]}"`)}</div></div></article>`).join("")}</div>
    <h2 class="sec">Make your own</h2>
    <div class="g2">${card("Colors & fonts", `<div class="row gap16 wrap"><div><label class="lbl">Sky top</label><input type="color" id="c1" value="#a8e0ff"></div><div><label class="lbl">Sky bottom</label><input type="color" id="c2" value="#3d8bff"></div><div><label class="lbl">Answer color</label><input type="color" id="c3" value="#ff5d73"></div></div>
      <label class="lbl">Font</label><select class="sel"><option>Fredoka (round, friendly)</option><option>Nunito</option><option>Noto Sans Khmer</option></select>${setting("Animated background", "Clouds, stars or bubbles", true)}${setting("Sound pack", "Pops, dings and cheers", true)}`)}
      ${card("Live preview", `<div id="tp" class="stage skin-ocean" style="border-radius:20px;padding:20px;text-align:center;background:linear-gradient(160deg,#a8e0ff,#3d8bff)"><h3 style="text-shadow:0 2px 0 rgba(0,0,0,.2)">Which animal says \u201Cmeow\u201D?</h3><div class="ans4 m16"><div class="ans" id="tpa" style="background:#ff5d73">\u{1F431} Cat</div><div class="ans a1">\u{1F436} Dog</div><div class="ans a2">\u{1F42E} Cow</div><div class="ans a3">\u{1F438} Frog</div></div></div>`)}</div>`;
  },
  mount(root) {
    root.addEventListener("click", (e) => {
      const b = e.target.closest("[data-theme]");
      if (!b) return;
      if (ED.builtin) {
        toast("Built-in games keep their own look");
        return;
      }
      ED.skin = b.dataset.theme;
      toast("Theme applied to “" + ED.title + "”");
    });
    const up = () => {
      $("#tp", root).style.background = `linear-gradient(160deg,${$("#c1", root).value},${$("#c2", root).value})`;
      $("#tpa", root).style.background = $("#c3", root).value;
    };
    ["c1", "c2", "c3"].forEach((i) => $("#" + i, root).addEventListener("input", up));
  }
};
