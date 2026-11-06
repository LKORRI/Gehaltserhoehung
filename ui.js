import { euro } from "./cards.js";
import { avatar } from "./avatars.js";
export { avatar };

export const LETTERS = ["A", "B", "C", "D"];

export const esc = (s) =>
  String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

export function stars(n) {
  if (n == null) return `<span class="stars unknown">❓ unbekannt</span>`;
  return `<span class="stars">${"★".repeat(n)}<span class="off">${"★".repeat(5 - n)}</span></span>`;
}

// Gehalt vs. Marktwert + Leistung in einer kompakten Zeile
export function payLine(v) {
  const pay = v.salary ?? v.ask;
  const diff = pay - v.market;
  const tag = Math.abs(diff) < 1 ? `<span class="tag ok">= Markt ✅</span>`
    : diff < 0 ? `<span class="tag low">${euro(-diff)} unter Markt 🔻</span>`
    : `<span class="tag high">${euro(diff)} über Markt 🔺</span>`;
  return `<div class="fact1"><span>${v.salary == null ? "will" : "verdient"} <b>${euro(pay)}</b></span>${tag}${v.stars != null ? `<span class="lbl">Leistung ${stars(v.stars)}</span>` : ""}</div>`
    + (v.compare ? `<div class="fact1 cmp">${esc(v.compare)}</div>` : "");
}

export function card(v, { i, total } = {}) {
  const head = v.extra ? `<div class="counter warn">⚠️ Extra-Gespräch · Das hat sich rumgesprochen …</div>` : total ? `<div class="counter">Gespräch ${i + 1}/${total}</div>` : "";
  return `
    ${head}
    <div class="person">
      <div class="avatar">${avatar(v.id)}</div>
      <div><h2>${esc(v.name)}</h2><div class="role">${esc(v.role)}</div></div>
    </div>
    ${v.market == null ? "" : payLine(v)}
    <div class="request">„${esc(v.request)}“</div>`;
}

export function delta(cost, mood) {
  const parts = [];
  if (cost > 0) parts.push(`<span class="d bad">💰 Budget −${euro(cost)}</span>`);
  if (cost < 0) parts.push(`<span class="d good">💰 Budget +${euro(-cost)}</span>`);
  if (mood > 0) parts.push(`<span class="d good">😁 Team +${mood}</span>`);
  if (mood < 0) parts.push(`<span class="d bad">😁 Team −${-mood}</span>`);
  if (!parts.length) parts.push(`<span class="d">keine Auswirkung</span>`);
  return parts.join("");
}

export function randomId(n = 10) {
  const a = "abcdefghijkmnpqrstuvwxyz23456789";
  return Array.from(crypto.getRandomValues(new Uint8Array(n)), (x) => a[x % a.length]).join("");
}

export const store = {
  get(k) { try { return localStorage.getItem(k); } catch { return null; } },
  set(k, v) { try { localStorage.setItem(k, v); } catch {} },
};

export const session = {
  get(k) { try { return sessionStorage.getItem(k); } catch { return null; } },
  set(k, v) { try { sessionStorage.setItem(k, v); } catch {} },
};

// Firebase liefert Objekte mit Zahlen-Schlüsseln manchmal als Array
export function mineFrom(all, pid) {
  const out = {};
  if (!all) return out;
  for (const [r, byP] of Object.entries(all)) if (byP && byP[pid]) out[r] = byP[pid];
  return out;
}
