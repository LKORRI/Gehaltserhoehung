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

// Gehalt vs. Marktwert als Mini-Skala
export function payLine(v) {
  const pay = v.salary ?? v.ask;
  const diff = pay - v.market;
  const tag = Math.abs(diff) < 1 ? `<span class="tag ok">passt ✅</span>`
    : diff < 0 ? `<span class="tag low">${euro(-diff)} unter Markt 🔻</span>`
    : `<span class="tag high">${euro(diff)} über Markt 🔺</span>`;
  return `
    <div class="pay">
      <div class="payrow"><span>${v.salary == null ? "Verlangt" : "Verdient"}</span><b>${euro(pay)}</b></div>
      <div class="payrow"><span>Markt zahlt</span><b>${euro(v.market)}</b></div>
      ${v.compare ? `<div class="payrow cmp"><span>${esc(v.compare)}</span></div>` : ""}
      <div class="payrow">${tag}</div>
    </div>`;
}

export function card(v, { month, i, total, round } = {}) {
  const head = month ? `<div class="counter">${esc(month)} · ${i + 1}/${total}</div>` : round != null ? `<div class="counter">Runde ${round + 1} von ${total}</div>` : "";
  const facts = v.market == null ? "" : `<div class="facts">${payLine(v)}<div class="perf"><span>Leistung</span>${stars(v.stars)}</div></div>`;
  return `
    ${head}
    <div class="person">
      <div class="avatar">${avatar(v.id)}</div>
      <div><h2>${esc(v.name)}</h2><div class="role">${esc(v.role)}</div></div>
    </div>
    ${facts}
    <div class="request">„${esc(v.request)}“</div>`;
}

export function delta(cost, mood) {
  const parts = [];
  if (cost > 0) parts.push(`<span class="d bad">💰 −${euro(cost)}</span>`);
  if (cost < 0) parts.push(`<span class="d good">💰 +${euro(-cost)}</span>`);
  if (mood > 0) parts.push(`<span class="d good">😊 +${mood}</span>`);
  if (mood < 0) parts.push(`<span class="d bad">😊 ${mood}</span>`);
  if (!parts.length) parts.push(`<span class="d">± 0</span>`);
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
