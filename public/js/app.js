"use strict";
const DOC_TITLE = "Critter Academy \u2013 Web Admin";
const AUTH = { user: null };
try {
  const u = sessionStorage.getItem("ca_admin");
  if (u) AUTH.user = JSON.parse(u);
} catch (e) {
}
function signIn(u) {
  AUTH.user = u;
  try {
    sessionStorage.setItem("ca_admin", JSON.stringify(u));
  } catch (e) {
  }
}
function signOut() {
  AUTH.user = null;
  try {
    sessionStorage.removeItem("ca_admin");
  } catch (e) {
  }
}
const APPS = [
  { id: "admin", label: "Admin", icon: "\u2699\uFE0F", c: "#4b5a7a", title: "Web admin", nav: [
    ["--", "Overview"],
    ["dashboard", "Dashboard", "\u{1F4CA}"],
    ["--", "People"],
    ["users", "Users & roles", "\u{1F465}"],
    ["moderation", "Moderation", "\u{1F6E1}\uFE0F"],
    ["support", "Support inbox", "\u{1F4AC}"],
    ["--", "Content & rewards"],
    ["games", "Games", "\u{1F3AE}"],
    ["templates", "Templates", "\u{1F9E9}"],
    ["rewards", "Rewards & economy", "\u{1FA99}"],
    ["announce", "Announcements", "\u{1F4E3}"],
    ["--", "Business"],
    ["billing", "Billing", "\u{1F4B3}"],
    ["reports", "Reports", "\u{1F4D1}"],
    ["--", "Platform"],
    ["i18n", "Localization", "\u{1F310}"],
    ["settings", "Settings & roles", "\u{1F510}"],
    ["system", "Platform health", "\u{1F5A5}\uFE0F"]
  ] },
  { id: "studio", label: "Studio", icon: "\u{1F6E0}\uFE0F", c: "#ff8a2b", title: "Game creator", nav: [
    ["--", "Build a game"],
    ["templates", "Templates", "\u{1F9E9}"],
    ["editor", "Game editor", "\u270F\uFE0F"],
    ["assets", "Asset library", "\u{1F5BC}\uFE0F"],
    ["themes", "Themes & skins", "\u{1F3A8}"],
    ["ai", "AI assistant", "\u2728"],
    ["--", "Share"],
    ["publish", "Publish & share", "\u{1F680}"]
  ] }
];
const firstScreen = (a) => a.nav.find((n) => n[0] !== "--")[0];
function renderHeader(app) {
  const u = AUTH.user;
  $("#top").style.setProperty("--acc", app.id === "admin" ? "#7c5cff" : app.c);
  $("#top").innerHTML = `<button class="logo" data-go="admin/dashboard" aria-label="Dashboard"><span>\u{1F43E}</span><span class="t">Critter <b>Academy</b></span><span class="badge">Admin</span></button>
    <nav class="apps" aria-label="Areas">${APPS.map((a) => `<button class="app ${a.id === app.id ? "on" : ""}" style="--c:${a.id === 'admin' ? '#7c5cff' : a.c}" data-go="${a.id}/${firstScreen(a)}"><span>${a.icon}</span>${a.label}</button>`).join("")}</nav>
    <div class="tools">${langSwitch()}<button class="ib" data-toast="\u{1F514} 3 new notifications" aria-label="Notifications">\u{1F514}<i class="nd"></i></button>
      <span class="who hide-s"><span class="av sm" style="background:#ffc9a0">${u.emoji}</span><span><b>${u.name}</b><small>${u.role}</small></span></span>
      <button class="btn sm alt" id="signOut" aria-label="Sign out">Sign out</button></div>`;
}
function route() {
  clearTM();
  const h = location.pathname.replace(/^\/+|\/+$/g, "");
  const login = $("#loginPage"), top = $("#top"), shell = $("#shell");
  if (!AUTH.user) {
    if (h !== "login") {
      navigate("login");
      return;
    }
    top.hidden = true;
    shell.hidden = true;
    login.hidden = false;
    renderLogin(login);
    trNodes(login);
    langAttr();
    window.scrollTo(0, 0);
    return;
  }
  if (h === "login" || !h) {
    navigate("admin/dashboard");
    return;
  }
  login.hidden = true;
  top.hidden = false;
  shell.hidden = false;
  const [a, s] = h.split("/");
  const app = APPS.find((x) => x.id === a) || APPS[0];
  const sid = app.nav.some((n) => n[0] === s) ? s : firstScreen(app);
  const scr = S[app.id + "/" + sid];
  document.documentElement.style.setProperty("--acc", app.c);
  renderHeader(app);
  $("#side").innerHTML = `<h4>${app.title}</h4>` + app.nav.map(([id, l, i]) => id === "--" ? `<h5>${l}</h5>` : `<button class="nv ${id === sid ? "on" : ""}" data-go="${app.id}/${id}"><span class="ic">${i}</span>${l}</button>`).join("");
  const v = $("#view");
  const root = document.createElement("div");
  root.innerHTML = scr ? scr.render() : `<p>Missing screen ${app.id}/${sid}</p>`;
  v.innerHTML = "";
  v.appendChild(root);
  v.classList.remove("in");
  void v.offsetWidth;
  v.classList.add("in");
  if (scr && scr.mount) scr.mount(root);
  trNodes(top);
  trNodes($("#side"));
  trNodes(root);
  langAttr();
  window.scrollTo(0, 0);
}
function renderLogin(box) {
  box.innerHTML = `<div class="signin">
    <section class="lg-art" aria-hidden="true"><div class="lg-logo"><span>\u{1F43E}</span> Critter <b>Academy</b></div>
      <h1>Web Admin</h1><p>Manage users, create games in the Studio, keep the platform safe and healthy.</p>
      <div class="lg-zoo"><span>\u{1F43B}</span><span>\u{1F430}</span><span>\u{1F98A}</span><span>\u{1F43C}</span><span>\u{1F438}</span></div></section>
    <section class="lg-form"><div class="lg-top">${langSwitch()}</div>
      <form class="lg-card card" id="lgForm" novalidate>
        <h2>Welcome back \u{1F44B}</h2><p class="muted">Sign in to the admin area. Only staff accounts can enter.</p>
        <label class="lbl" for="lgEmail">Email</label><input class="in" id="lgEmail" type="email" autocomplete="username" value="admin@critter.academy" placeholder="name@critter.academy" required>
        <label class="lbl" for="lgPass">Password</label>
        <div class="row gap8"><input class="in grow" id="lgPass" type="password" autocomplete="current-password" placeholder="Your password" value="admin123" required><button type="button" class="btn sm alt" id="lgShow" aria-pressed="false">Show</button></div>
        <div class="row sp m8"><label class="row gap8 small"><input type="checkbox" id="lgRem" checked style="accent-color:var(--acc)"> Keep me signed in</label><button type="button" class="linkbtn" id="lgForgot">Forgot password?</button></div>
        <p class="lg-err" id="lgErr" role="alert" hidden></p>
        <button class="btn lg" id="lgGo" type="submit" style="width:100%;margin-top:14px">Sign in</button>
      </form>
      <p class="tiny muted center" style="text-align:center;margin-top:14px">Connected to the Little Learner backend</p></section></div>`;
  const em = $("#lgEmail", box), pw = $("#lgPass", box), err = $("#lgErr", box), go = $("#lgGo", box);
  const fail = (m) => {
    err.textContent = m;
    err.hidden = false;
    trNodes(err);
  };
  $("#lgShow", box).addEventListener("click", (e) => {
    const show = pw.type === "password";
    pw.type = show ? "text" : "password";
    e.currentTarget.textContent = tr(show ? "Hide" : "Show");
    e.currentTarget.setAttribute("aria-pressed", String(show));
  });
  $("#lgForgot", box).addEventListener("click", () => openModal(`<h3>\u{1F511} Reset your password</h3><p class="muted m8">Enter your staff email. We will send a reset link.</p><label class="lbl">Email</label><input class="in" placeholder="name@critter.academy" aria-label="Email"><div class="m16"><button class="btn" data-toast="\u{1F4E7} Reset link sent (demo)" data-close>Send link</button></div>`));
  $("#lgForm", box).addEventListener("submit", (e) => {
    e.preventDefault();
    err.hidden = true;
    if (!em.value.trim() || !pw.value) {
      fail("Please enter your email and password.");
      return;
    }
    go.disabled = true;
    go.textContent = tr("Signing in\u2026");
    api("POST", "/api/auth/login", { email: em.value.trim(), password: pw.value }).then((r) => {
      if (!["creator", "teacher", "admin", "super_admin"].includes(r.user.role)) {
        go.disabled = false;
        go.textContent = tr("Sign in");
        fail("This account cannot use the admin area.");
        return;
      }
      TOKEN.set(r.token, $("#lgRem", box).checked);
      signIn({ id: r.user.id, name: r.user.name, role: r.user.role, emoji: r.user.emoji, email: r.user.email });
      navigate("admin/dashboard");
    }).catch((err) => {
      go.disabled = false;
      go.textContent = tr("Sign in");
      fail(err.message);
    });
  });
  em.focus();
}
document.addEventListener("click", (e) => {
  if (e.target.closest("#signOut")) {
    signOut();
    TOKEN.clear();
    closeModal();
    navigate("login");
  }
});
