S["studio/editor"] = {
  render() {
    const hd = (extra) => `<div class="row sp gap8 wrap edtop" style="margin-bottom:10px">
      <div class="row gap12 wrap"><input class="in" id="edTitle" translate="no" value="${esc(titleOf(ED.cl))}" style="width:260px;font-weight:700" aria-label="Game title"><span class="chip" style="--c:#2fbf63" id="edSaved">Checking…</span>${`<span class="small muted">Edit game in:</span><div class="chips pickgroup" id="edCl" role="group" aria-label="Content language" translate="no"><button class="fchip ${ED.cl === "en" ? "on" : ""}" data-pick data-cl="en">English</button><button class="fchip ${ED.cl === "km" ? "on" : ""}" data-pick data-cl="km">ខ្មែរ</button></div>`}</div>
      <div class="row gap8 wrap">${extra}</div></div>`;
    const styles = `<style>.scene{position:relative;width:100%;aspect-ratio:16/10;container-type:size;border-radius:16px;border:3px solid #fff;overflow:hidden;background:rgba(255,255,255,.35);touch-action:none}.scene .so{position:absolute;display:flex;align-items:center;justify-content:center;font-size:calc(var(--fs)*1cqw);line-height:1;text-align:center;font-weight:700;color:#2b2233;cursor:grab;user-select:none;box-sizing:border-box}.scene .so .oi{pointer-events:none;display:flex;align-items:center;justify-content:center;width:100%;height:100%;overflow:hidden}.scene .so img{width:100%;height:100%;object-fit:contain}.scene .so-shape{border-radius:50%}.scene .so-button{border-radius:14px}.scene .so-zone{border:3px dashed rgba(255,255,255,.95);border-radius:16px;opacity:.9}.scene .so.sel{outline:3px solid #7c5cff;outline-offset:2px;z-index:5}.scene .so.role-correct{box-shadow:0 0 0 3px #2fbf63}.scene .so.role-wrong{box-shadow:0 0 0 3px #ff5d73}.scene .so.role-drag{box-shadow:0 0 0 3px #3d8bff}.scene .so.role-target{box-shadow:0 0 0 3px #ff8a2b}.scene .rz{position:absolute;right:-8px;bottom:-8px;width:16px;height:16px;border-radius:5px;background:#7c5cff;border:2px solid #fff;cursor:nwse-resize}.bgsw{width:28px;height:28px;border-radius:8px;border:2px solid #fff;box-shadow:0 0 0 1px #ccc;cursor:pointer}.edtop .btn{padding:7px 14px;font-size:.88rem;min-height:0;border-width:2px}.edtop .fchip{padding:6px 12px;font-size:.85rem}.edtop .in{padding:7px 12px;font-size:.95rem;width:220px!important}.edtop .chip{font-size:.75rem}.ed{display:grid;grid-template-columns:240px minmax(0,1fr) 330px;gap:14px;align-items:start}@media(max-width:1180px){.ed{grid-template-columns:210px minmax(0,1fr)}.ed .rp{grid-column:1/-1}}@media(max-width:760px){.ed{grid-template-columns:1fr}}
      .qi{display:flex;gap:10px;align-items:center;padding:8px;border-radius:16px;border:2px solid transparent;width:100%;text-align:left}.qi:hover{background:#faf8ff}.qi.on{border-color:var(--acc);background:var(--acc-soft)}.qi .n{width:26px;height:26px;border-radius:50%;background:var(--acc);color:#fff;display:grid;place-items:center;font-size:.8rem;font-weight:700;flex:none}.qi .tx{font-size:.85rem;line-height:1.2;overflow:hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical}.qi .ty{margin-left:auto;font-size:1.1rem}
      .dev{margin:auto;border-radius:28px;overflow:hidden;box-shadow:0 14px 30px rgba(51,40,74,.22);border:8px solid #2b2233;transition:width .35s}.dev.d-phone{width:min(100%,340px)}.dev.d-tablet{width:min(100%,560px)}.dev.d-desktop{width:100%;border-width:6px;border-radius:16px}.rp .tab{padding:8px 9px;font-size:.88rem}
      .stg{padding:18px 14px;text-align:center;min-height:460px;display:flex;flex-direction:column;gap:12px;justify-content:center}.stg [contenteditable]{outline:0;border-radius:10px;padding:2px 6px}.stg [contenteditable]:focus{background:rgba(255,255,255,.25);box-shadow:0 0 0 3px #fff}
      .ans .ck{width:22px;height:22px;border-radius:50%;background:rgba(255,255,255,.4);display:grid;place-items:center;font-size:.8rem;flex:none}.ans.cor .ck{background:#fff;color:#2fbf63}
      .qtools{display:grid;grid-template-columns:1fr 1fr;gap:6px}.qtools button{display:flex;flex-direction:column;align-items:center;gap:2px;padding:8px 4px;border-radius:14px;background:#fff;border:2px solid #eee;font-size:.78rem;font-weight:700}.qtools button:hover{border-color:var(--acc);background:var(--acc-soft)}.qtools button span{font-size:1.4rem}
      .lst{display:flex;flex-direction:column;gap:8px;text-align:left}.lst .r{display:flex;gap:8px;align-items:center}.lst .r b{width:26px;height:26px;border-radius:50%;background:#fff;color:#2b2233;display:grid;place-items:center;flex:none}.lst input{flex:1;min-width:0;border:0;border-radius:12px;padding:9px 12px;font:inherit;background:rgba(255,255,255,.95);color:#2b2233}.lst .x{background:rgba(0,0,0,.25);color:#fff;border-radius:10px;width:30px;height:30px}
      .gmem{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}.mock{background:rgba(255,255,255,.9);color:#8a8199;border-radius:14px;padding:12px;font-weight:700}.lessontx{width:100%;border:0;border-radius:14px;padding:12px;font:inherit;background:rgba(255,255,255,.95);color:#2b2233;resize:vertical}.gsw{display:flex;flex-direction:column;gap:4px}</style>`;
    return hd(`<div class="chips pickgroup" id="edDev">${[["phone", "\u{1F4F1} Phone"], ["tablet", "\u{1F4DF} Tablet"], ["desktop", "\u{1F5A5}️ Desktop"]].map((d) => `<button class="fchip ${d[0] === ED.device ? "on" : ""}" data-pick data-dev="${d[0]}">${d[1]}</button>`).join("")}</div>${btn("▶ Preview", "alt", 'id="edPrev"')}${btn("\u{1F5D1}️ Delete game", "alt", 'id="edKill"')}${btn("\u{1F4BE} Save", "alt", 'id="edSave"')}${btn("\u{1F680} Publish", "", 'data-go="studio/publish"')}`) + `<div class="ed">${styles}
      <section class="card tight"><div class="ch" style="margin:4px 6px 8px"><h3>Questions</h3><span class="chip" id="edCount"></span></div><div class="tiny muted" id="edLangStat" translate="no" style="margin:0 8px 8px"></div><div id="edList" class="col gap6"></div>
        <h4 style="margin:14px 6px 6px">Add a question</h4><div class="qtools" id="edTools">${QTYPES.map((t) => `<button data-add="${t[0]}" title="${t[3]}"><span>${t[1]}</span>${t[2]}</button>`).join("")}</div></section>
      <section><div class="dev d-${ED.device}" id="edDevBox"><div class="stage skin-${ED.skin} stg" id="edStage"></div></div><p class="tiny muted center m8" style="text-align:center">Click the question or an answer to edit it right on the canvas.</p></section>
      <section class="rp card tight" id="edRight"></section></div>`;
  },
  mount(root) {
    const cur = () => ED.qs[ED.sel];
    const L = $("#edList", root), St = $("#edStage", root), R = $("#edRight", root);
    const ico = (q) => qType(q.type)[1];
    const drawList = () => {
      L.innerHTML = ED.qs.map((q, i) => `<button class="qi ${i === ED.sel ? "on" : ""}" data-i="${i}"><span class="n">${i + 1}</span><span class="tx" translate="no" lang="${qText(q) ? ED.cl : ED.cl === "km" ? "en" : "km"}">${esc(qShow(q)) || "<i>Empty</i>"}</span><span class="ty">${ico(q)}</span></button>`).join("");
      $("#edCount", root).textContent = ED.qs.length + " total";
      stat();
    };
    const stat = () => {
      const n = ED.qs.length;
      $("#edLangStat", root).textContent = "EN " + ED.qs.filter((q) => qReady(q, "en")).length + "/" + n + "  \xB7  ខ្មែរ " + ED.qs.filter((q) => qReady(q, "km")).length + "/" + n;
    };
    const listRows = (field, q, ph, numbered = true) => (q[field] || []).map((v, i) => `<div class="r">${numbered ? `<b>${i + 1}</b>` : ""}<input value="${esc(v)}" data-f="${field}" data-i="${i}" placeholder="${ph}" translate="no"><button class="x" data-rm="${field}" data-i="${i}" aria-label="Remove">✕</button></div>`).join("");
    const selObj = () => {
      const q = cur();
      return q && q.type === "canvas" ? (q.objs || []).find((o) => o.id === ED.selObj) : null;
    };
    const bgCss = (bg) => {
      if (!bg) return "";
      if (/^https?:\/\//.test(bg)) return `background:url('${bg.replace(/'/g, "")}') center/cover`;
      return `background:${bg.replace(/[;<>"]/g, "")}`;
    };
    const objStyle = (o) => {
      const col = o.color && (o.kind === "text" || o.kind === "emoji") ? `color:${o.color};` : "";
      const fill = o.kind === "shape" || o.kind === "zone" || o.kind === "button" ? `background:${o.color || "#7c5cff"};color:#fff;` : "";
      return `left:${o.x}%;top:${o.y}%;width:${o.w}%;height:${o.h}%;--fs:${o.fs};${col}${fill}`;
    };
    const objInner = (o) => o.kind === "image" ? (o.text ? `<img src="${esc(o.text)}" alt="" draggable="false">` : "\u{1F5BC}️") : esc(o.text);
    const objHtmlEd = (o) => `<div class="so so-${o.kind} role-${o.role} ${o.id === ED.selObj ? "sel" : ""}" data-oid="${o.id}" style="${objStyle(o)}"><span class="oi">${objInner(o)}</span>${o.id === ED.selObj ? '<i class="rz" data-rz="1"></i>' : ""}</div>`;
    const sceneHtml = (q) => `<div class="scene" id="scene" style="${bgCss(q.bg)}">${q.objs.map(objHtmlEd).join("")}</div><div class="tiny">Drag items to move them. Drag the corner square to resize.</div>`;
    const BGS = ["linear-gradient(180deg,#bfe9ff,#d8f5c8)", "linear-gradient(180deg,#fff2bf,#ffd9a8)", "linear-gradient(180deg,#e6f7ff,#f4ffe6)", "linear-gradient(160deg,#ffc1dc,#ff8fbd)", "linear-gradient(180deg,#6b5bdf,#241a5c)", "linear-gradient(180deg,#9be0ff,#0a67c9)", "#ffffff", "#2b2233"];
    const canvasPane = (q) => {
      const o = selObj();
      const types = `<select class="sel" id="edTypeSel" aria-label="Question type">${QTYPES.map((t) => `<option value="${t[0]}" ${t[0] === q.type ? "selected" : ""}>${t[1]} ${t[2]}</option>`).join("")}</select>`;
      const zones = q.objs.filter((x) => x.role === "target");
      const roles = q.mode === "drag" ? [["decor", "Decoration"], ["drag", "Draggable item"], ["target", "Drop target"]] : [["decor", "Decoration"], ["correct", "Correct (kids must tap)"], ["wrong", "Wrong (do not tap)"]];
      const props = o ? `<h4 style="margin:14px 0 6px">Selected: ${esc(o.kind)}</h4>
        ${o.kind === "image" ? `<label class="lbl">Image link</label><input class="in" data-op="text" value="${esc(o.text)}" placeholder="https://…"><label class="btn sm alt m8" style="cursor:pointer">⬆️ Upload image<input type="file" id="edObjUp" accept="image/*" hidden></label>` : o.kind === "shape" ? "" : `<label class="lbl">${o.kind === "emoji" ? "Emoji" : "Text"}</label><input class="in" data-op="text" value="${esc(o.text)}">`}
        <div class="g2" style="gap:8px"><div><label class="lbl">Colour</label><input type="color" class="in" data-op="color" value="${/^#[0-9a-f]{6}$/i.test(o.color) ? o.color : "#7c5cff"}" style="padding:2px;height:38px"></div><div><label class="lbl">Size</label><input type="range" data-op="fs" min="1" max="30" step="0.5" value="${o.fs}"></div><div><label class="lbl">Width %</label><input class="in" type="number" data-op="w" min="2" max="100" value="${Math.round(o.w)}"></div><div><label class="lbl">Height %</label><input class="in" type="number" data-op="h" min="2" max="100" value="${Math.round(o.h)}"></div></div>
        <label class="lbl">What does it do?</label><select class="sel" data-op="role">${roles.map((r) => `<option value="${r[0]}" ${r[0] === o.role ? "selected" : ""}>${r[1]}</option>`).join("")}${roles.some((r) => r[0] === o.role) ? "" : `<option value="${o.role}" selected>${o.role}</option>`}</select>
        ${o.role === "drag" ? `<label class="lbl">Goes to which target?</label><select class="sel" data-op="target"><option value="">Choose a target</option>${zones.map((z) => `<option value="${z.id}" ${z.id === o.target ? "selected" : ""}>${esc(z.text || "Target")} (${z.id.slice(-3)})</option>`).join("")}</select>` : ""}
        <div class="row gap8 wrap m16">${btn("⧉ Copy", "sm alt", 'data-objdup="1"')}${btn("⬆ To front", "sm alt", 'data-objfront="1"')}${btn("\u{1F5D1}️ Delete", "sm bad", 'data-objdel="1"')}</div>` : '<p class="tiny muted m16">Click an item on the canvas to change its text, colour, size and what it does.</p>';
      return `<label class="lbl">Question type</label>${types}
        <label class="lbl">How do kids play it?</label><select class="sel" data-qs="mode"><option value="tap" ${q.mode !== "drag" ? "selected" : ""}>Tap the right things</option><option value="drag" ${q.mode === "drag" ? "selected" : ""}>Drag items to targets</option></select>
        <label class="lbl">Time limit: <b id="edTl">${q.t}</b> s</label><input type="range" id="edT" min="5" max="120" step="5" value="${q.t}" aria-label="Time limit">
        <label class="lbl">Points</label><select class="sel" id="edP"><option value="500">Standard (500)</option><option value="1000">Double (1000)</option><option value="0">No points</option></select>
        <label class="lbl">Background</label><input class="in" data-qs="bg" value="${esc(q.bg)}" placeholder="colour, gradient or image link"><div class="row gap6 wrap m8">${BGS.map((b) => `<button class="bgsw" data-bgset="${esc(b)}" style="background:${b}" aria-label="Background"></button>`).join("")}<label class="btn sm alt" style="cursor:pointer">⬆️ Image<input type="file" id="edBgUp" accept="image/*" hidden></label></div>
        <h4 style="margin:14px 0 6px">Add to the scene</h4><div class="row gap6 wrap">${[["text", "\u{1F524} Text"], ["emoji", "\u{1F600} Emoji"], ["image", "\u{1F5BC}️ Image"], ["button", "\u{1F518} Button"], ["shape", "\u{1F7E3} Shape"], ["zone", "\u{1F3AF} Drop zone"]].map((k) => `<button class="btn sm alt" data-addobj="${k[0]}">${k[1]}</button>`).join("")}</div>
        ${props}
        ${songRow(q)}
        <div class="row gap8 wrap m16">${btn("⧉ Duplicate scene", "sm alt", 'id="edDup"')}${btn("⬆", "sm alt", 'id="edUp" aria-label="Move up"')}${btn("⬇", "sm alt", 'id="edDn" aria-label="Move down"')}${btn("\u{1F5D1}️ Delete scene", "sm bad", 'id="edDel"')}</div>`;
    };
    const selectObj = (id) => {
      ED.selObj = id;
      $$(".so", root).forEach((el) => {
        const on = el.dataset.oid === id;
        el.classList.toggle("sel", on);
        const rz = $(".rz", el);
        if (on && !rz) el.insertAdjacentHTML("beforeend", '<i class="rz" data-rz="1"></i>');
        if (!on && rz) rz.remove();
      });
      drawProps();
    };
    const refreshObj = (o) => {
      const el = $(`.so[data-oid="${o.id}"]`, root);
      if (!el) return;
      el.setAttribute("style", objStyle(o));
      el.className = `so so-${o.kind} role-${o.role} ${o.id === ED.selObj ? "sel" : ""}`;
      const oi = $(".oi", el);
      if (oi) oi.innerHTML = objInner(o);
    };
    root.addEventListener("pointerdown", (e) => {
      const el = e.target.closest(".so");
      const sc = $("#scene", root);
      if (!el || !sc || !sc.contains(el)) return;
      const q = cur();
      const o = q.objs.find((x) => x.id === el.dataset.oid);
      if (!o) return;
      e.preventDefault();
      if (ED.selObj !== o.id) selectObj(o.id);
      const rect = sc.getBoundingClientRect();
      const resize = !!e.target.closest(".rz");
      const sx = e.clientX, sy = e.clientY, ox = o.x, oy = o.y, ow = o.w, oh = o.h;
      el.setPointerCapture(e.pointerId);
      const move = (ev) => {
        const dx = (ev.clientX - sx) / rect.width * 100, dy = (ev.clientY - sy) / rect.height * 100;
        if (resize) {
          o.w = Math.max(3, Math.min(100, ow + dx));
          o.h = Math.max(3, Math.min(100, oh + dy));
        } else {
          o.x = Math.round((ox + dx) * 10) / 10;
          o.y = Math.round((oy + dy) * 10) / 10;
        }
        el.style.left = o.x + "%";
        el.style.top = o.y + "%";
        el.style.width = o.w + "%";
        el.style.height = o.h + "%";
      };
      const up = () => {
        el.removeEventListener("pointermove", move);
        el.removeEventListener("pointerup", up);
        drawProps();
      };
      el.addEventListener("pointermove", move);
      el.addEventListener("pointerup", up);
    });
    root.addEventListener("click", (e) => {
      const q = cur();
      if (!q || q.type !== "canvas") return;
      const add = e.target.closest("[data-addobj]");
      if (add) {
        const o = newObj(add.dataset.addobj, q.mode === "drag" && add.dataset.addobj === "zone" ? {} : add.dataset.addobj === "zone" ? { role: "decor" } : {});
        o.x = 20 + (q.objs.length * 7) % 50;
        o.y = 15 + (q.objs.length * 9) % 50;
        q.objs.push(o);
        ED.selObj = o.id;
        drawStage();
        drawProps();
        return;
      }
      const sel = selObj();
      if (e.target.closest("[data-objdel]") && sel) {
        q.objs.splice(q.objs.indexOf(sel), 1);
        ED.selObj = "";
        drawStage();
        drawProps();
        return;
      }
      if (e.target.closest("[data-objdup]") && sel) {
        const c = { ...sel, id: newObj("text").id, x: sel.x + 4, y: sel.y + 4 };
        q.objs.push(c);
        ED.selObj = c.id;
        drawStage();
        drawProps();
        return;
      }
      if (e.target.closest("[data-objfront]") && sel) {
        q.objs.push(q.objs.splice(q.objs.indexOf(sel), 1)[0]);
        drawStage();
        return;
      }
      const bg = e.target.closest("[data-bgset]");
      if (bg) {
        q.bg = bg.dataset.bgset;
        drawStage();
        drawProps();
        return;
      }
      if (!e.target.closest(".so") && e.target.closest("#scene")) {
        ED.selObj = "";
        drawStage();
        drawProps();
      }
    });
    const onKey = (e) => {
      if (!root.isConnected) {
        document.removeEventListener("keydown", onKey);
        return;
      }
      if (e.key !== "Delete" && e.key !== "Backspace") return;
      const tag = e.target.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || e.target.isContentEditable) return;
      const q = cur(), o = selObj();
      if (!q || !o) return;
      e.preventDefault();
      q.objs.splice(q.objs.indexOf(o), 1);
      ED.selObj = "";
      drawStage();
      drawProps();
    };
    document.addEventListener("keydown", onKey);
    const objProp = (t, final) => {
      const o = selObj();
      if (!o) return;
      const k = t.dataset.op;
      o[k] = ["fs", "w", "h"].includes(k) ? Number(t.value) : t.value;
      if (k === "role" && o.role !== "drag") o.target = "";
      refreshObj(o);
      if (final) drawProps();
    };
    root.addEventListener("input", (e) => {
      const q = cur();
      if (e.target.dataset.op) objProp(e.target, false);
      if (e.target.dataset.qs === "bg" && q) {
        q.bg = e.target.value;
        const sc = $("#scene", root);
        if (sc) sc.setAttribute("style", bgCss(q.bg));
      }
    });
    root.addEventListener("change", (e) => {
      const q = cur(), t = e.target;
      if (t.dataset.op && ["role", "target"].includes(t.dataset.op)) objProp(t, true);
      if (t.dataset.qs === "mode" && q) {
        q.mode = t.value;
        q.objs.forEach((o) => {
          if (q.mode === "drag" && (o.role === "correct" || o.role === "wrong")) o.role = "decor";
          if (q.mode === "tap" && (o.role === "drag" || o.role === "target")) o.role = "decor";
        });
        drawStage();
        drawProps();
      }
      if (t.dataset.qm && q) {
        q.music = t.value;
        toast("Saved for this stage");
      }
      if (t.id === "edQSongUp" && t.files[0]) {
        const fd = new FormData();
        fd.append("file", t.files[0]);
        toast("Uploading\u2026");
        uploadWith(t, () => api("POST", "/api/assets/upload", fd)).then((r) => {
          q.music = assetUrl(r.item.url);
          drawProps();
          toast(r.duplicate ? "\u2139\uFE0F Already in your library: " + r.item.name : "Song added to this stage");
        }).catch((err) => toast("\u26A0\uFE0F " + err.message));
      }
      if (t.id === "edPicUpMain" && t.files[0]) {
        const fd = new FormData();
        fd.append("file", t.files[0]);
        toast("Uploading…");
        uploadWith(t, () => api("POST", "/api/assets/upload", fd)).then((r) => {
          q.img = assetUrl(r.item.url);
          all();
          toast(r.duplicate ? "\u2139\uFE0F Already in your library: " + r.item.name : "Image added");
        }).catch((err) => toast("⚠️ " + err.message));
      }
      if ((t.id === "edObjUp" || t.id === "edBgUp") && t.files[0]) {
        const fd = new FormData();
        fd.append("file", t.files[0]);
        uploadWith(t, () => api("POST", "/api/assets/upload", fd)).then((r) => {
          const url = assetUrl(r.item.url);
          if (t.id === "edBgUp") q.bg = url;
          else {
            const o = selObj();
            if (o) o.text = url;
          }
          drawStage();
          drawProps();
          toast(r.duplicate ? "\u2139\uFE0F Already in your library: " + r.item.name : "Uploaded");
        }).catch((err) => toast("⚠️ " + err.message));
      }
    });
    const EMOJI_SET = ["🐶","🐱","🐭","🐰","🦊","🐻","🐼","🐨","🐯","🦁","🐮","🐷","🐸","🐵","🐔","🐧","🐦","🐥","🦆","🦉","🦇","🐌","🦋","🐝","🐞","🐢","🐍","🐙","🦀","🐬","🐳","🦈","🐘","🦒","🦓","🦕","🦖","🍎","🍌","🍇","🍓","🍊","🍉","🍍","🥭","🥕","🥦","🌽","🍞","🧀","🍪","🎂","🚗","🚌","🚒","✈️","🚀","🚲","⛵","🏠","🏫","🌳","🌺","🌈","☀️","🌙","⭐","☁️","🌧️","⛄","🔥","💧","📚","✏️","🎨","🎵","⚽","🏀","🎲","🧩","🔔","🔑","🎁","👑","❤️","💡","✅","❌","❓","🔢","🔤"];
    const isUrl = (v) => /^https?:\/\//.test(v || "");
    const picHtml = (v, h) => isUrl(v) ? `<img src="${esc(v)}" alt="" style="max-height:${h}px;max-width:100%;border-radius:14px;object-fit:contain">` : esc(v) || "\u{1F5BC}\uFE0F";
    const openPicker = (mode) => {
      const grid = EMOJI_SET.map((x) => `<button class="card tight center" ${mode === "text" ? "data-ins" : "data-img"}="${x}" style="font-size:1.7rem;display:flex;align-items:center;justify-content:center;width:100%;aspect-ratio:1;padding:0;line-height:1">${x}</button>`).join("");
      openModal(`<h3>${mode === "text" ? "Add an emoji to the question" : "Choose a picture"}</h3>
        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(50px,1fr));gap:6px;margin-top:12px;max-height:260px;overflow:auto">${grid}</div>
        ${mode === "text" ? "" : `<h4 style="margin:14px 0 6px">Or use a photo</h4>
        <div class="row gap8 wrap"><label class="btn sm alt" style="cursor:pointer">\u2B06\uFE0F Upload an image<input type="file" id="edPicUp" accept="image/*" hidden></label><input class="in" id="edPicUrl" placeholder="Paste an image link" style="flex:1;min-width:180px">${btn("Use link", "sm", 'id="edPicUse"')}</div>
        <div id="edPicLib" class="row gap8 wrap m8"></div>`}`);
      const m = $("#mdl");
      m.onclick = (e) => {
        const q = cur();
        const im = e.target.closest("[data-img]"), ins = e.target.closest("[data-ins]");
        if (im) {
          q.img = im.dataset.img;
          closeModal();
          all();
        } else if (ins) {
          setQ(q, qText(q) + (qText(q) ? " " : "") + ins.dataset.ins);
          closeModal();
          all();
        } else if (e.target.closest("#edPicUse")) {
          const u = $("#edPicUrl").value.trim();
          if (isUrl(u)) {
            q.img = u;
            closeModal();
            all();
          } else toast("Paste a link that starts with https://");
        }
      };
      m.onchange = (e) => {
        const t = e.target;
        if (t.id !== "edPicUp" || !t.files[0]) return;
        const fd = new FormData();
        fd.append("file", t.files[0]);
        uploadWith(t, () => api("POST", "/api/assets/upload", fd)).then((r) => {
          cur().img = assetUrl(r.item.url);
          closeModal();
          all();
          toast(r.duplicate ? "\u2139\uFE0F Already in your library: " + r.item.name : "Picture added");
        }).catch((err) => toast("\u26A0\uFE0F " + err.message));
      };
      if (mode !== "text") api("GET", "/api/admin/assets?kind=image").then((r) => {
        const box = $("#edPicLib");
        if (box) box.innerHTML = r.items.slice(0, 12).map((x) => `<button class="card tight" data-img="${esc(assetUrl(x.url))}" style="padding:4px"><img src="${esc(assetUrl(x.url))}" alt="${esc(x.name)}" style="width:56px;height:56px;object-fit:cover;border-radius:10px"></button>`).join("");
      }).catch(() => {});
    };
    const songRow = (q) => `<label class="lbl">Song for this stage</label><select class="sel" id="edQSong" data-qm="1"><option value="">Use the game's music</option><option value="happy" ${q.music === "happy" ? "selected" : ""}>\u{1F3B5} Happy</option><option value="calm" ${q.music === "calm" ? "selected" : ""}>\u{1F3B5} Calm lullaby</option><option value="party" ${q.music === "party" ? "selected" : ""}>\u{1F3B5} Party</option><option value="adventure" ${q.music === "adventure" ? "selected" : ""}>\u{1F3B5} Adventure</option><option value="magic" ${q.music === "magic" ? "selected" : ""}>\u{1F3B5} Magic sparkle</option><option value="groove" ${q.music === "groove" ? "selected" : ""}>\u{1F3B5} Chill groove</option><option value="none" ${q.music === "none" ? "selected" : ""}>\u{1F507} No music here</option></select><label class="btn sm alt m8" style="cursor:pointer">\u2B06\uFE0F Upload a song<input type="file" id="edQSongUp" accept="audio/*" hidden></label>`;
    const body = (q) => {
      const t = q.type;
      if (t === "quiz") return `<div class="ans4">${q.a.map((a, i) => `<div class="ans a${i} ${i === q.c ? "cor" : ""}" data-c="${i}"><span class="ck">${i === q.c ? "✔" : ""}</span><span contenteditable="true" translate="no" lang="${ED.cl}" data-ph="Answer" data-a="${i}">${esc(aText(q, i))}</span></div>`).join("")}</div>`;
      if (t === "truefalse") return `<div class="ans4">${[0, 1].map((i) => `<div class="ans a${i} ${i === q.c ? "cor" : ""}" data-c="${i}"><span class="ck">${i === q.c ? "✔" : ""}</span><span>${esc(aText(q, i) || q.a[i])}</span></div>`).join("")}</div><div class="tiny">Tap the correct one.</div>`;
      if (t === "type") return `<div class="mock">Kids type their answer here…</div><div class="tiny">Accepted answers (any of these is correct)</div><div class="lst">${listRows("acc", q, "Accepted answer", false)}</div>${btn("➕ Add another accepted answer", "sm alt", 'data-addrow="acc"')}`;
      if (t === "order") return `<div class="tiny">Write the items in the CORRECT order. Kids will see them shuffled.</div><div class="lst">${listRows("items", q, "Item")}</div>${q.items.length < 6 ? btn("➕ Add item", "sm alt", 'data-addrow="items"') : ""}`;
      if (t === "canvas") return sceneHtml(q);
      if (t === "lesson") return `<div class="tiny">Write the lesson text kids will read (${ED.cl === "km" ? "Khmer" : "English"}).</div><textarea class="lessontx" data-lesson="1" rows="6" placeholder="For example: A noun is a naming word. Cat, dog and tree are nouns." translate="no">${esc(ED.cl === "km" ? q.textk : q.text)}</textarea>`;
      if (t === "slider") return `<div class="mock">\u{1F39A}️ ${q.min} ────●──── ${q.max}</div><div class="tiny">Correct answer: <b>${q.ans}</b>${q.tol ? " (\xB1" + q.tol + " is OK)" : ""}. Set the range in the right panel.</div>`;
      if (t === "match") return `<div class="tiny">Each row is a pair. Kids connect the left to the right.</div><div class="lst">${q.pairs.map((p, i) => `<div class="r"><b>${i + 1}</b><input value="${esc(p[0])}" data-pair="0" data-i="${i}" placeholder="Left" translate="no"><input value="${esc(p[1])}" data-pair="1" data-i="${i}" placeholder="Right" translate="no"><button class="x" data-rm="pairs" data-i="${i}" aria-label="Remove">✕</button></div>`).join("")}</div>${q.pairs.length < 6 ? btn("➕ Add pair", "sm alt", 'data-addrow="pairs"') : ""}`;
      return `<div class="tiny">Each card here becomes a pair of cards. Use emoji or short words.</div><div class="gmem">${q.cards.map((c, i) => `<div class="r" style="display:flex;gap:4px"><input value="${esc(c)}" data-f="cards" data-i="${i}" translate="no" style="text-align:center;font-size:1.3rem;width:100%;border:0;border-radius:12px;padding:8px;background:rgba(255,255,255,.95)"><button class="x" data-rm="cards" data-i="${i}" aria-label="Remove">✕</button></div>`).join("")}</div>${q.cards.length < 8 ? btn("➕ Add card", "sm alt", 'data-addrow="cards"') : ""}`;
    };
    const drawStage = () => {
      const q = cur();
      if (!q) {
        St.innerHTML = "<p>Add a question to begin</p>";
        return;
      }
      St.className = `stage skin-${ED.skin} stg`;
      St.innerHTML = `<div class="row sp"><span class="pill" style="background:#fff">${ico(q)} ${qType(q.type)[2]}</span><span class="pill" style="background:#fff">⏱ ${q.t}s \xB7 ${q.p ? "⭐ " + q.p : "No points"}</span></div>
        <h2 contenteditable="true" id="stQ" translate="no" lang="${ED.cl}" data-ph="Type the question" style="font-size:1.4rem;text-shadow:0 2px 0 rgba(0,0,0,.2)">${esc(qText(q))}</h2>${q.type === "memory" || q.type === "canvas" ? "" : `<div style="font-size:2.6rem;letter-spacing:6px;cursor:pointer" data-imgpick title="Change picture">${isUrl(q.img) ? picHtml(q.img, 120) : esc(q.img) || "\u{1F5BC}️"}</div>`}${body(q)}`;
    };
    const stepper = (label, n, v) => `<div><label class="lbl">${label}</label><input class="in" type="number" step="any" data-n="${n}" value="${v}"></div>`;
    const drawProps = () => {
      const q = cur();
      if (!q) return;
      const quizAns = q.type === "quiz" ? `<label class="lbl">Answers <span class="tiny">(choose the correct one)</span></label><div class="col gap6">${q.a.map((a, i) => `<div class="row gap8"><input type="radio" name="cor" ${i === q.c ? "checked" : ""} data-r="${i}" aria-label="Correct answer ${i + 1}" style="accent-color:var(--acc)"><input class="in" value="${esc(aText(q, i))}" lang="${ED.cl}" translate="no" data-ai="${i}" aria-label="Answer ${i + 1}"></div>`).join("")}</div><div class="row gap8 m8">${q.a.length < 4 ? btn("➕ Answer", "sm alt", 'data-ansadd="1"') : ""}${q.a.length > 2 ? btn("➖ Answer", "sm alt", 'data-ansdel="1"') : ""}</div>` : "";
      const slide = q.type === "slider" ? `<div class="g2" style="gap:8px">${stepper("Lowest", "min", q.min)}${stepper("Highest", "max", q.max)}${stepper("Step", "step", q.step)}${stepper("Correct answer", "ans", q.ans)}${stepper("Allowed error \xB1", "tol", q.tol)}</div>` : "";
      const types = `<select class="sel" id="edTypeSel" aria-label="Question type">${QTYPES.map((t) => `<option value="${t[0]}" ${t[0] === q.type ? "selected" : ""}>${t[1]} ${t[2]}</option>`).join("")}</select>`;
      const pane0Std = `<label class="lbl">Question type</label>${types}
        <label class="lbl">Time limit: <b id="edTl">${q.t}</b> s</label><input type="range" id="edT" min="5" max="120" step="5" value="${q.t}" aria-label="Time limit">
        <label class="lbl">Points</label><select class="sel" id="edP"><option value="500">Standard (500)</option><option value="1000">Double (1000)</option><option value="0">No points</option></select>
        ${q.type === "memory" ? "" : `<label class="lbl">Picture (emoji, photo or text)</label><div class="row gap8"><input class="in" id="edImgTxt" value="${esc(q.img)}" style="flex:1" aria-label="Picture"></div><div class="row gap8 m8"><label class="btn sm" style="cursor:pointer">⬆️ Upload image<input type="file" id="edPicUpMain" accept="image/*" hidden></label><button class="btn sm alt" id="edImg">\u{1F600} Emoji &amp; library</button></div><div class="row gap8 m8"><button class="btn sm alt" id="edEmojiText">\u{1F600} Add emoji to the question</button>${isUrl(q.img) ? '<button class="btn sm alt" id="edImgClear">Remove photo</button>' : ""}</div>`}
        ${quizAns}${slide}
        ${songRow(q)}
        <div class="row gap8 wrap m16">${btn("⧉ Duplicate", "sm alt", 'id="edDup"')}${btn("⬆", "sm alt", 'id="edUp" aria-label="Move up"')}${btn("⬇", "sm alt", 'id="edDn" aria-label="Move down"')}${btn("\u{1F5D1}️ Delete", "sm bad", 'id="edDel"')}</div>`;
      const pane0 = q.type === "canvas" ? canvasPane(q) : pane0Std;
      const sw2 = (k, t, sub) => `<label class="setting" style="cursor:pointer"><div>${t}<small>${sub}</small></div><input type="checkbox" data-set="${k}" ${ED.settings[k] ? "checked" : ""} style="accent-color:var(--acc);width:20px;height:20px"></label>`;
      const opt = (v, cur, t) => `<option value="${v}" ${v === cur ? "selected" : ""}>${t}</option>`;
      const pane1 = `<div id="edMusicBox">${sw2("shuffle", "Shuffle questions", "Random order every time")}${sw2("shuffleAnswers", "Shuffle answers", "Quiz answers move around")}${sw2("speedBonus", "Speed bonus", "Faster answers earn more")}${sw2("race", "Race track", "Kids race a rocket as they answer")}${sw2("dark", "White text", "Turn off for bright backgrounds")}</div>
        <label class="lbl">Questions per play <span class="tiny">(0 = all)</span></label><input class="in" type="number" min="0" max="100" data-sn="limit" value="${ED.settings.limit}">
        <label class="lbl">Answer style</label><select class="sel" data-ss="layout">${opt("grid", ED.settings.layout, "Big buttons")}${opt("balloon", ED.settings.layout, "Balloons")}${opt("scene", ED.settings.layout, "Hidden in a scene")}</select>
        <label class="lbl">Hint for kids</label><input class="in" data-ss="hint" value="${esc(ED.settings.hint)}" placeholder="Pick the right answer!">
        <label class="lbl">Music</label><select class="sel" data-ss="track">${opt("happy", ED.settings.track, "\u{1F3B5} Happy")}${opt("calm", ED.settings.track, "\u{1F3B5} Calm lullaby")}${opt("party", ED.settings.track, "\u{1F3B5} Party")}${opt("adventure", ED.settings.track, "\u{1F3B5} Adventure")}${opt("magic", ED.settings.track, "\u{1F3B5} Magic sparkle")}${opt("groove", ED.settings.track, "\u{1F3B5} Chill groove")}${opt("none", ED.settings.track, "\u{1F507} No music")}</select>
        <label class="lbl">Your own song <span class="tiny">(from the asset library)</span></label><select class="sel" id="edSong" data-ss="musicUrl"><option value="">None (use the music above)</option></select><label class="btn sm alt m8" style="cursor:pointer">\u2B06\uFE0F Upload a song<input type="file" id="edSongUp" accept="audio/*" hidden></label>
        <label class="lbl">Game emoji</label><input class="in" id="edEmoji" value="${esc(ED.emoji)}"><label class="lbl">Subject</label><input class="in" id="edSubject" value="${esc(ED.subject)}"><label class="lbl">Age</label><input class="in" id="edAge" value="${esc(ED.age)}">`;
      const pane2 = `<div class="g2 pickgroup" id="edSkins" style="gap:8px">${SKINS.map((s) => `<button class="card tight center col ${s[0] === ED.skin ? "on" : ""}" data-pick data-skin="${s[0]}" style="align-items:center;border-width:3px"><span style="font-size:1.8rem">${s[2]}</span><b class="small">${s[1]}</b></button>`).join("")}</div>`;
      const keep = $(".tab.on", R);
      R.innerHTML = tabs("edp", ["Question", "Game", "Theme"], [pane0, pane1, pane2]);
      $("#edP", R).value = String(q.p);
      api("GET", "/api/admin/assets?kind=audio").then((r) => {
        const qs = $("#edQSong", R);
        if (qs) {
          const cq = cur();
          qs.insertAdjacentHTML("beforeend", r.items.map((x) => {
            const u = assetUrl(x.url);
            return `<option value="${esc(u)}" ${u === cq.music ? "selected" : ""}>\u{1F4C0} ${esc(x.name)}</option>`;
          }).join(""));
          if (cq.music && cq.music.startsWith("http") && !r.items.some((x) => assetUrl(x.url) === cq.music)) qs.insertAdjacentHTML("beforeend", `<option value="${esc(cq.music)}" selected>Current song</option>`);
        }
        const sel = $("#edSong", R);
        if (!sel) return;
        sel.innerHTML = '<option value="">None (use the music above)</option>' + r.items.map((x) => {
          const u = assetUrl(x.url);
          return `<option value="${esc(u)}" ${u === ED.settings.musicUrl ? "selected" : ""}>${esc(x.name)}</option>`;
        }).join("");
        if (ED.settings.musicUrl && !r.items.some((x) => assetUrl(x.url) === ED.settings.musicUrl)) sel.insertAdjacentHTML("beforeend", `<option value="${esc(ED.settings.musicUrl)}" selected>Current song</option>`);
      }).catch(() => {});
      if (keep && keep.dataset.t && keep.dataset.t !== "0") {
        const b = $(`.tab[data-t="${keep.dataset.t}"]`, R);
        if (b) b.click();
      }
    };
    const all = () => {
      drawList();
      drawStage();
      drawProps();
    };
    all();
    root.addEventListener("click", (e) => {
      const q = cur();
      const cl = e.target.closest("[data-cl]");
      if (cl) {
        ED.cl = cl.dataset.cl;
        $("#edTitle", root).value = titleOf(ED.cl);
        all();
        return;
      }
      const qi = e.target.closest(".qi");
      if (qi) {
        ED.sel = +qi.dataset.i;
        all();
        return;
      }
      const ad = e.target.closest("[data-add]");
      if (ad) {
        const nq = blankQ(ad.dataset.add);
        ED.qs.splice(ED.sel + 1, 0, nq);
        ED.sel++;
        all();
        toast(qType(ad.dataset.add)[2] + " added");
        return;
      }
      if (e.target.closest("#edDel")) {
        if (ED.qs.length > 1) {
          ED.qs.splice(ED.sel, 1);
          ED.sel = Math.max(0, ED.sel - 1);
          all();
          toast("Question deleted");
        } else toast("A game needs at least one question");
        return;
      }
      if (e.target.closest("#edDup")) {
        ED.qs.splice(ED.sel + 1, 0, JSON.parse(JSON.stringify(q)));
        ED.sel++;
        all();
        return;
      }
      const mv = e.target.closest("#edUp, #edDn");
      if (mv) {
        const j = ED.sel + (mv.id === "edUp" ? -1 : 1);
        if (j >= 0 && j < ED.qs.length) {
          [ED.qs[ED.sel], ED.qs[j]] = [ED.qs[j], ED.qs[ED.sel]];
          ED.sel = j;
          all();
        }
        return;
      }
      const ar = e.target.closest("[data-addrow]");
      if (ar) {
        const f = ar.dataset.addrow;
        q[f].push(f === "pairs" ? ["", ""] : f === "cards" ? "⭐" : "");
        drawStage();
        return;
      }
      const rm = e.target.closest("[data-rm]");
      if (rm) {
        const f = rm.dataset.rm;
        if (q[f].length > 1) q[f].splice(+rm.dataset.i, 1);
        drawStage();
        return;
      }
      if (e.target.closest("[data-ansadd]") && q.a.length < 4) {
        q.a.push("");
        (q.ak = q.ak || []).push("");
        all();
        return;
      }
      if (e.target.closest("[data-ansdel]") && q.a.length > 2) {
        q.a.pop();
        if (q.ak) q.ak.pop();
        if (q.c >= q.a.length) q.c = 0;
        all();
        return;
      }
      const ans = e.target.closest(".ans[data-c]");
      if (ans && !e.target.closest("[contenteditable]")) {
        q.c = +ans.dataset.c;
        drawStage();
        drawProps();
        return;
      }
      const dv = e.target.closest("[data-dev]");
      if (dv) {
        ED.device = dv.dataset.dev;
        $("#edDevBox", root).className = "dev d-" + ED.device;
        return;
      }
      const sk = e.target.closest("[data-skin]");
      if (sk) {
        ED.skin = sk.dataset.skin;
        drawStage();
        return;
      }
      if (e.target.closest("#edImg") || e.target.closest("[data-imgpick]")) {
        openPicker("pic");
        return;
      }
      if (e.target.closest("#edImgClear")) {
        q.img = "";
        all();
        return;
      }
      if (e.target.closest("#edEmojiText")) {
        openPicker("text");
        return;
      }
      const im = e.target.closest("[data-img]");
      if (im) {
        q.img = im.dataset.img;
        closeModal();
        drawStage();
        drawProps();
        return;
      }
      if (e.target.closest("#edKill")) {
        if (!confirm("Delete this game for good?")) return;
        const done = () => {
          newGame("Untitled game");
          navigate("studio/templates");
        };
        if (!ED.id) return done();
        api("DELETE", "/api/studio/games/" + ED.id).then(() => {
          toast("Game deleted");
          done();
        }).catch((err) => toast("⚠️ " + err.message));
        return;
      }
      if (e.target.closest("#edPrev")) {
        const t = q.type;
        const inner = t === "canvas" ? sceneHtml(q) : t === "lesson" ? `<p style="background:#fff;color:#2b2233;border-radius:14px;padding:10px">${esc(ED.cl === "km" ? q.textk : q.text)}</p>` : t === "quiz" || t === "truefalse" ? `<div class="ans4" translate="no">${q.a.map((a, i) => `<div class="ans a${i}" style="min-height:44px;font-size:.9rem">${esc(aText(q, i) || a)}</div>`).join("")}</div>` : t === "type" ? '<div class="mock">Kids type the answer</div>' : t === "order" ? `<div class="row gap6 wrap" style="justify-content:center">${[...q.items].reverse().map((x) => `<span class="pill" style="background:#fff;color:#2b2233">${esc(x)}</span>`).join("")}</div>` : t === "slider" ? `<div class="mock">${q.min} ─●─ ${q.max}</div>` : t === "match" ? `<div class="g2">${q.pairs.map((p) => `<span class="pill" style="background:#fff;color:#2b2233">${esc(p[0])} ↔ ${esc(p[1])}</span>`).join("")}</div>` : `<div style="font-size:2rem">${q.cards.map(() => "\u{1F0CF}").join("")}</div>`;
        openModal(`<h3>▶ Preview</h3><div class="phone m16"><div class="scr stage skin-${ED.skin}" style="text-align:center;color:#fff;justify-content:center"><h3 translate="no">${esc(qShow(q))}</h3><div style="font-size:2.4rem">${esc(q.img)}</div>${inner}</div></div><p class="tiny muted">Publish the game to play the real thing on the platform.</p>`);
      }
    });
    root.addEventListener("input", (e) => {
      const t = e.target, q = cur();
      if (t.id === "edTitle") {
        if (ED.cl === "km") ED.titleK = t.value;
        else ED.title = t.value;
        return;
      }
      if (t.id === "stQ") {
        setQ(q, t.textContent);
        const tx = $(`.qi[data-i="${ED.sel}"] .tx`, root);
        if (tx) tx.textContent = qShow(q);
        stat();
        return;
      }
      if (t.dataset.a !== void 0) {
        setA(q, +t.dataset.a, t.textContent);
        stat();
        const pi = $(`[data-ai="${t.dataset.a}"]`, root);
        if (pi) pi.value = t.textContent;
        return;
      }
      if (t.dataset.ai !== void 0) {
        setA(q, +t.dataset.ai, t.value);
        stat();
        const sp = $(`[data-a="${t.dataset.ai}"]`, root);
        if (sp) sp.textContent = t.value;
        return;
      }
      if (t.dataset.lesson) {
        if (ED.cl === "km") q.textk = t.value;
        else q.text = t.value;
        stat();
        return;
      }
      if (t.dataset.ss) {
        ED.settings[t.dataset.ss] = t.value;
        return;
      }
      if (t.dataset.sn) {
        ED.settings[t.dataset.sn] = Math.max(0, Number(t.value) || 0);
        return;
      }
      if (t.dataset.f) {
        q[t.dataset.f][+t.dataset.i] = t.value;
        stat();
        return;
      }
      if (t.dataset.pair !== void 0) {
        q.pairs[+t.dataset.i][+t.dataset.pair] = t.value;
        stat();
        return;
      }
      if (t.dataset.n) {
        q[t.dataset.n] = Number(t.value);
        return;
      }
      if (t.id === "edImgTxt") {
        q.img = t.value;
        return;
      }
      if (t.id === "edEmoji") ED.emoji = t.value;
      if (t.id === "edSubject") ED.subject = t.value;
      if (t.id === "edAge") ED.age = t.value;
      if (t.id === "edT") {
        q.t = +t.value;
        $("#edTl", root).textContent = q.t;
        const pl = $("#edStage .pill:last-child", root);
        if (pl) pl.textContent = "⏱ " + q.t + "s \xB7 " + (q.p ? "⭐ " + q.p : "No points");
      }
    });
    root.addEventListener("change", (e) => {
      const t = e.target, q = cur();
      if (t.id === "edP") {
        q.p = +t.value;
        drawStage();
      }
      if (t.id === "edTypeSel") {
        const n = blankQ(t.value);
        n.q = q.q;
        n.qk = q.qk;
        n.t = q.t;
        n.p = q.p;
        if (n.type !== "memory" && q.img) n.img = q.img;
        ED.qs[ED.sel] = n;
        all();
      }
      if (t.dataset.r !== void 0) {
        q.c = +t.dataset.r;
        drawStage();
      }
      if (t.dataset.set) ED.settings[t.dataset.set] = t.checked;
      if (t.dataset.ss) ED.settings[t.dataset.ss] = t.value;
      if (t.dataset.sn) ED.settings[t.dataset.sn] = Math.max(0, Number(t.value) || 0);
      if (t.id === "edSongUp" && t.files[0]) {
        const fd = new FormData();
        fd.append("file", t.files[0]);
        uploadWith(t, () => api("POST", "/api/assets/upload", fd)).then((r) => {
          ED.settings.musicUrl = assetUrl(r.item.url);
          toast(r.duplicate ? "\u2139\uFE0F Already in your library: " + r.item.name : "Song uploaded");
          drawProps();
        }).catch((err) => toast("\u26A0\uFE0F " + err.message));
      }
      if (t.dataset.n) {
        drawStage();
      }
    });
    if (ED.last == null && ED.id) ED.last = JSON.stringify(edPayload());
    let busy = false;
    const mark = () => {
      const s = $("#edSaved", root);
      if (!s || busy) return;
      const dirty = JSON.stringify(edPayload()) !== ED.last;
      s.textContent = !ED.id ? "Not saved yet" : dirty ? "● Unsaved changes" : "✓ Saved";
      s.style.setProperty("--c", dirty || !ED.id ? "#f5a300" : "#2fbf63");
    };
    const save = async () => {
      const s = $("#edSaved", root);
      if (busy) return;
      busy = true;
      s.textContent = "Saving…";
      try {
        await saveGame();
        toast("Saved as a draft");
      } catch (e) {
        toast("⚠️ " + e.message);
        if (e.status === 401) {
          signOut();
          navigate("login");
        }
      }
      busy = false;
      mark();
    };
    root.addEventListener("click", (e) => {
      if (e.target.closest("#edSave")) save();
    });
    every(mark, 700);
    mark();
  }
};
