// Einfache Blob-Charaktere als SVG. Gesicht ändert sich je nach Stimmung.
const C = { yellow: "#f3d55b", pink: "#f2a9c9", blue: "#a9c2f0", olive: "#a7b46a", peach: "#f5b98c", lilac: "#c9b4ec" };

function polar(n, amp, phase = 0, R = 46, cx = 60, cy = 62, harm = null) {
  const pts = [];
  const steps = 120;
  for (let i = 0; i < steps; i++) {
    const t = (i / steps) * Math.PI * 2;
    let r = R + amp * Math.cos(n * t + phase);
    if (harm) r += harm[0] * Math.cos(harm[1] * t + harm[2]);
    pts.push([cx + r * Math.cos(t), cy + r * Math.sin(t)]);
  }
  return "M" + pts.map((p) => p.map((x) => x.toFixed(1)).join(",")).join("L") + "Z";
}

const SHAPES = {
  flower: () => `<path d="${polar(7, 6, 0, 44)}"/>`,
  star: () => `<path d="${polar(5, 9, -Math.PI / 2, 42)}"/>`,
  blob: () => `<path d="${polar(3, 4, 0.6, 45, 60, 62, [3, 2, 1.2])}"/>`,
  squircle: () => `<rect x="14" y="16" width="92" height="92" rx="36"/>`,
  pill: () => `<rect x="22" y="10" width="76" height="102" rx="38"/>`,
  cloud: () => `<path d="M30 92c-14 0-22-10-20-22 2-11 12-17 21-15 1-15 13-27 29-27 15 0 26 10 28 24 12-1 22 8 22 20s-9 20-21 20z"/>`,
};

const PEOPLE = {
  sandra: { shape: "flower", color: C.pink, acc: "spark" },
  martin: { shape: "squircle", color: C.blue, acc: "cap" },
  joerg: { shape: "blob", color: C.yellow, acc: "bigeyes" },
  kevin: { shape: "pill", color: C.olive, acc: "shades" },
  thomas: { shape: "cloud", color: C.lilac, acc: "baby" },
  anna: { shape: "star", color: C.yellow, acc: "tie" },
  brigitteBaby: { shape: "blob", color: C.peach, acc: "glasses" },
  brigitteKevin: { shape: "blob", color: C.peach, acc: "glasses" },
  julia: { shape: "squircle", color: C.olive, acc: "earrings" },
};

function face(mood, acc) {
  const big = acc === "bigeyes";
  const er = big ? 8 : 5;
  const eyes = acc === "shades"
    ? `<rect x="36" y="50" width="20" height="11" rx="5" fill="#151515"/><rect x="64" y="50" width="20" height="11" rx="5" fill="#151515"/><path d="M56 54h8" stroke="#151515" stroke-width="3"/>`
    : `<circle cx="48" cy="57" r="${er}" fill="#151515"/><circle cx="72" cy="57" r="${er}" fill="#151515"/><circle cx="${48 + er / 3}" cy="${57 - er / 3}" r="${er / 3}" fill="#fff"/><circle cx="${72 + er / 3}" cy="${57 - er / 3}" r="${er / 3}" fill="#fff"/>`;
  const mouths = {
    neutral: `<path d="M53 76h14" stroke="#151515" stroke-width="3.5" stroke-linecap="round" fill="none"/>`,
    happy: `<path d="M48 72q12 14 24 0" stroke="#151515" stroke-width="3.5" stroke-linecap="round" fill="none"/>`,
    sad: `<path d="M50 80q10-9 20 0" stroke="#151515" stroke-width="3.5" stroke-linecap="round" fill="none"/>`,
    angry: `<path d="M50 80q10-9 20 0" stroke="#151515" stroke-width="3.5" stroke-linecap="round" fill="none"/><path d="M40 45l14 5M80 45l-14 5" stroke="#151515" stroke-width="3.5" stroke-linecap="round"/>`,
  };
  const cheeks = mood === "happy" ? `<ellipse cx="38" cy="70" rx="6" ry="4" fill="#e5483b" opacity=".25"/><ellipse cx="82" cy="70" rx="6" ry="4" fill="#e5483b" opacity=".25"/>` : "";
  return eyes + cheeks + (mouths[mood] || mouths.neutral);
}

function accessory(acc) {
  switch (acc) {
    case "cap": return `<path d="M30 26l30-12 30 12-30 12z" fill="#151515"/><path d="M42 31v9q18 8 36 0v-9" fill="#151515"/><path d="M88 27v14" stroke="#151515" stroke-width="2.5"/><circle cx="88" cy="43" r="3" fill="#e5483b"/>`;
    case "glasses": return `<circle cx="48" cy="57" r="10" fill="none" stroke="#151515" stroke-width="3"/><circle cx="72" cy="57" r="10" fill="none" stroke="#151515" stroke-width="3"/><path d="M58 57h4" stroke="#151515" stroke-width="3"/>`;
    case "tie": return `<path d="M60 92l-6 6 6 16 6-16z" fill="#151515"/>`;
    case "baby": return `<g transform="translate(86 78)"><circle r="14" fill="#f3d55b" stroke="#151515" stroke-width="2"/><circle cx="-4" cy="-2" r="2" fill="#151515"/><circle cx="4" cy="-2" r="2" fill="#151515"/><path d="M-3 5q3 3 6 0" stroke="#151515" stroke-width="2" fill="none"/></g>`;
    case "spark": return `<path d="M98 18l3 8 8 3-8 3-3 8-3-8-8-3 8-3z" fill="#e5483b"/>`;
    case "earrings": return `<circle cx="22" cy="74" r="4" fill="#f3d55b" stroke="#151515" stroke-width="2"/><circle cx="98" cy="74" r="4" fill="#f3d55b" stroke="#151515" stroke-width="2"/>`;
    default: return "";
  }
}

// Figuren aus img/leute.svg (Freepik, 3x3-Raster). Index = Position im Raster, zeilenweise.
const CELLS = [[102.6, 82.8], [248.9, 82.8], [395.2, 82.8], [102.6, 232.7], [248.9, 232.7], [395.2, 232.7], [102.6, 382.6], [248.9, 382.6], [395.2, 382.6]];
const CAST = { martin: 0, brigitteBaby: 2, brigitteKevin: 2, joerg: 3, sandra: 4, anna: 5, julia: 6, thomas: 7, kevin: 8 };
const BG = { martin: C.blue, brigitteBaby: C.olive, brigitteKevin: C.olive, joerg: C.yellow, sandra: C.pink, anna: C.blue, julia: C.yellow, thomas: C.lilac, kevin: C.olive };
const BOX = 150;
const BADGE = { happy: "😊", sad: "😔", angry: "😤", neutral: "" };

export function avatar(id, mood = null) {
  const i = CAST[id];
  if (i == null) return blobAvatar(id, mood || "neutral");
  const [cx, cy] = CELLS[i];
  const x = cx - BOX / 2, y = cy - BOX / 2;
  const style = `width:${(500 / BOX) * 100}%;left:${(-x / BOX) * 100}%;top:${(-y / BOX) * 100}%`;
  const badge = mood && BADGE[mood] ? `<span class="badge">${BADGE[mood]}</span>` : "";
  return `<span class="ava photo"><span class="crop" style="background:${BG[id]}"><img src="img/leute.svg" alt="" style="${style}"></span>${badge}</span>`;
}

function blobAvatar(id, mood) {
  const p = PEOPLE[id] || { shape: "blob", color: C.blue };
  return `<svg class="ava" viewBox="0 0 120 120" aria-hidden="true"><g fill="${p.color}">${SHAPES[p.shape]()}</g>${face(mood, p.acc)}${accessory(p.acc)}</svg>`;
}

export function moodOf(o) {
  if (!o) return "sad";
  if (o.quit || o.mood <= -15) return "angry";
  if (o.mood < 0) return "sad";
  if (o.mood > 0 || o.cost > 0) return "happy";
  return "neutral";
}
