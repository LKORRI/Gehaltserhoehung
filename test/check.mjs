// Prüft per vollständiger Suche (inkl. Extra-Gespräche), dass nur der Bank-Weg die Höchstpunktzahl erreicht.
const m = await import(new URL(process.argv[2] ? "file://" + process.argv[2] : "../cards.js", import.meta.url));
const { play, score, BANK_PATH, MAX_SCORE } = m;
let best = -1, bestPaths = [], hist = {}, total = 0;
function walk(ans) {
  const s = play(ans);
  if (s.over || s.done) {
    const sc = score(s); total++;
    hist[sc] = (hist[sc] || 0) + 1;
    if (sc > best) { best = sc; bestPaths = [ans.join("")]; } else if (sc === best) bestPaths.push(ans.join(""));
    return;
  }
  for (let k = 0; k < s.next.options.length; k++) walk([...ans, k]);
}
walk([]);
const bs = play(BANK_PATH);
console.log("bank path", BANK_PATH.join(""), "MAX_SCORE", MAX_SCORE, "budget", bs.budget, "team", bs.team);
console.log("brute best", best, "count", bestPaths.length, bestPaths.slice(0, 5));
console.log("top scores", Object.keys(hist).map(Number).sort((x, y) => y - x).slice(0, 8).map((s) => s + ":" + hist[s]).join(" "));
const fin = Object.entries(hist).filter(([s]) => +s >= 20).reduce((t, [, c]) => t + c, 0);
console.log("paths", total, "finishers share", (fin / total * 100).toFixed(1) + "%");
if (best !== MAX_SCORE || bestPaths.length !== 1) { console.error("FEHLER: Bank-Weg ist nicht der einzige Höchstwert"); process.exit(1); }
