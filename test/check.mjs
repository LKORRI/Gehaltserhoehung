const m = await import(new URL("../cards.js", import.meta.url));
const { CARDS, play, score, BANK_PATH, MAX_SCORE } = m;
let best = -1, bestPaths = [], hist = {};
const n = CARDS.length, a = new Array(n).fill(0);
const total = 3 ** n;
for (let k = 0; k < total; k++) {
  let x = k; for (let i = 0; i < n; i++) { a[i] = x % 3; x = Math.floor(x / 3); }
  const s = score(play(a));
  hist[s] = (hist[s] || 0) + 1;
  if (s > best) { best = s; bestPaths = [a.join("")]; } else if (s === best) bestPaths.push(a.join(""));
}
console.log("bank path", BANK_PATH.join(""), "MAX_SCORE", MAX_SCORE, "state", JSON.stringify(play(BANK_PATH), (k,v)=>k==="history"?undefined:v));
console.log("brute best", best, "count", bestPaths.length, bestPaths.slice(0,5));
const sorted = Object.keys(hist).map(Number).sort((x,y)=>y-x);
console.log("top scores", sorted.slice(0,8).map(s=>s+":"+hist[s]).join(" "));
const fin = Object.entries(hist).filter(([s])=>+s>12).reduce((t,[,c])=>t+c,0);
console.log("finishers share", (fin/total*100).toFixed(1)+"%");
