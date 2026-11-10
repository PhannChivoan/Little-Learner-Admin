"use client";

const CORE = ["lang-km","i18n","lib","api","app"];
const SHARED = ["studio"];

type Win = Window & { __caCore?: Promise<void>; __caNav?: (to: string) => void; S?: Record<string, unknown> };

function addScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const el = document.createElement("script");
    el.src = src;
    el.onload = () => resolve();
    el.onerror = () => reject(new Error(src));
    document.body.appendChild(el);
  });
}

export function loadCore(): Promise<void> {
  const w = window as Win;
  if (!w.__caCore) {
    w.__caCore = CORE.reduce<Promise<void>>((p, n) => p.then(() => addScript("/js/" + n + ".js")), Promise.resolve());
  }
  return w.__caCore;
}

const loaded = new Set<string>();

async function loadOnce(src: string) {
  if (loaded.has(src)) return;
  loaded.add(src);
  await addScript(src);
}

export async function showScreen(id: string) {
  await loadCore();
  if (id) {
    const area = id.split("/")[0];
    if (SHARED.includes(area)) await loadOnce("/js/screens/" + area + "/_shared.js");
    await loadOnce("/js/screens/" + id + ".js");
    await (window as unknown as { EDREADY?: Promise<unknown> }).EDREADY;
  }
  (window as unknown as { route: () => void }).route();
}

export function setNavigator(fn: (to: string) => void) {
  (window as Win).__caNav = fn;
}
