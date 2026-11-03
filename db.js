// Kleine Datenschicht: Firebase Realtime Database oder lokaler Testmodus.
import { firebaseConfig } from "./config.js";

const FB_VERSION = "10.12.2";

export async function connect() {
  const forceLocal = new URLSearchParams(location.search).has("local");
  if (firebaseConfig && !forceLocal) return connectFirebase();
  return connectLocal();
}

async function connectFirebase() {
  const appMod = await import(`https://www.gstatic.com/firebasejs/${FB_VERSION}/firebase-app.js`);
  const dbMod = await import(`https://www.gstatic.com/firebasejs/${FB_VERSION}/firebase-database.js`);
  const app = appMod.initializeApp(firebaseConfig);
  const db = dbMod.getDatabase(app);
  let offset = 0;
  dbMod.onValue(dbMod.ref(db, ".info/serverTimeOffset"), (s) => { offset = s.val() || 0; });
  return {
    mode: "firebase",
    now: () => Date.now() + offset,
    async get(path) { return (await dbMod.get(dbMod.ref(db, path))).val(); },
    set: (path, v) => dbMod.set(dbMod.ref(db, path), v),
    update: (path, v) => dbMod.update(dbMod.ref(db, path), v),
    remove: (path) => dbMod.remove(dbMod.ref(db, path)),
    onValue(path, cb) { return dbMod.onValue(dbMod.ref(db, path), (s) => cb(s.val())); },
  };
}

function connectLocal() {
  const KEY = "lohnspiel-local-db";
  const chan = "BroadcastChannel" in window ? new BroadcastChannel(KEY) : null;
  const listeners = new Set();
  const read = () => { try { return JSON.parse(localStorage.getItem(KEY) || "{}"); } catch { return {}; } };
  let tree = read();
  const parts = (p) => p.split("/").filter(Boolean);
  const getAt = (t, p) => parts(p).reduce((o, k) => (o == null ? undefined : o[k]), t);
  const setAt = (t, p, v) => {
    const ks = parts(p); let o = t;
    for (let i = 0; i < ks.length - 1; i++) { if (typeof o[ks[i]] !== "object" || o[ks[i]] === null) o[ks[i]] = {}; o = o[ks[i]]; }
    if (v === null || v === undefined) delete o[ks[ks.length - 1]]; else o[ks[ks.length - 1]] = v;
  };
  const fire = () => listeners.forEach((l) => l());
  const commit = () => {
    try { localStorage.setItem(KEY, JSON.stringify(tree)); } catch {}
    chan && chan.postMessage(tree);
    fire();
  };
  chan && (chan.onmessage = (e) => { tree = e.data; fire(); });
  window.addEventListener("storage", (e) => { if (e.key === KEY) { tree = read(); fire(); } });
  const clone = (v) => (v === undefined ? null : JSON.parse(JSON.stringify(v)));
  return {
    mode: "local",
    now: () => Date.now(),
    async get(path) { return clone(getAt(tree, path)); },
    async set(path, v) { setAt(tree, path, clone(v)); commit(); },
    async update(path, obj) { for (const k in obj) setAt(tree, path + "/" + k, clone(obj[k])); commit(); },
    async remove(path) { setAt(tree, path, null); commit(); },
    onValue(path, cb) {
      let last;
      const l = () => { const v = JSON.stringify(getAt(tree, path) ?? null); if (v !== last) { last = v; cb(JSON.parse(v)); } };
      listeners.add(l); l();
      return () => listeners.delete(l);
    },
  };
}
