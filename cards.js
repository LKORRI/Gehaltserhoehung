// „Gehaltserhöhung – Überlebst du die Gehaltsverhandlungen?“
// 8 Gespräche, gleiche Reihenfolge für alle.
// Jede Option: cost (€ pro Monat, vom Budget), team (Teamfrieden), bank: true = so entscheidet die echte Raiffeisenbank laut Interview.
// Der Weg der echten Bank ergibt den einzigen Höchstwert (Prüfung: node test/check.mjs).

export const TITLE = "Gehaltserhöhung";
export const SUBTITLE = "Überlebst du die Gehaltsverhandlungen?";
export const START_BUDGET = 1200;
export const START_TEAM = 20;
export const FINISH_BONUS = 20; // Bonus fürs Durchkommen, damit jeder Durchläufer vor jedem Rausgeflogenen liegt
export const PLAY_SECONDS = 240;
export const REACTION_MS = 1600;

export const CARDS = [
  {
    id: "sandra", name: "Sandra", role: "Kundenberaterin", salary: 3200, market: 3600, stars: 5,
    request: "Die Konkurrenz zahlt mehr. 400 € drauf, oder ich geh!",
    options: [
      { label: "Nein, tschüss", cost: 0, team: -20, reaction: "Sandra kündigt. Ihre Kunden gehen mit 😤" },
      { label: "200 € fix, Richtung Marktwert", cost: 200, team: 5, bank: true, reaction: "Sandra bleibt. Fair genug 🙂" },
      { label: "400 € Leistungsprämie", cost: 400, team: -5, reaction: "Sandra jubelt, die Kollegen tuscheln 👀" },
    ],
    criterion: "Markt statt Leistung", source: "Fragen 10 und 12",
    quote: "Wir haben keine klassische leistungsorientierte Entlohnung […] Den Arbeitsmarkt kann man natürlich nicht ignorieren.",
  },
  {
    id: "martin", name: "Martin", role: "Privatkundenbetreuer", salary: 3000, market: 3000, stars: 3,
    request: "Ich hab meinen Master fertig! 300 € mehr?",
    options: [
      { label: "Ja, 300 €", cost: 300, team: -5, reaction: "Martin feiert 🎉 … drei Kollegen fangen auch ein Studium an 📚" },
      { label: "Nicht automatisch, reden wir über mehr Verantwortung", cost: 0, team: 5, bank: true, reaction: "Martin bewirbt sich intern für mehr Verantwortung 💡" },
      { label: "Nein, brauchst du nicht", cost: 0, team: -10, reaction: "Martin ist gekränkt 😔" },
    ],
    criterion: "Qualifikation", source: "Frage 9",
    quote: "Trotzdem bedeutet ein zusätzlicher Abschluss nicht automatisch eine Gehaltserhöhung.",
  },
  {
    id: "thomas", name: "Thomas", role: "Zahlungsverkehr", salary: 2800, market: 2900, stars: 3,
    request: "Wir haben ein Baby bekommen! Krieg ich mehr Gehalt?",
    options: [
      { label: "Ja, 250 €", cost: 250, team: -5, reaction: "Thomas strahlt 🍼 … die Kolleginnen mit Kindern fragen, warum sie nie was bekommen haben" },
      { label: "Nein, Privates zählt nicht", cost: 0, team: -10, reaction: "Thomas nickt traurig 😔" },
      { label: "Kinderzulage laut KV + Teilzeit anbieten", cost: 0, team: 10, bank: true, reaction: "Thomas wusste nicht, dass ihm 185,71 € Kinderzulage zustehen 🤯" },
    ],
    criterion: "Sozial", source: "Fragen 14 und 15",
    quote: "Beim Gehalt selbst versuchen wir grundsätzlich, die Tätigkeit und nicht die private Lebenssituation zu bewerten.",
  },
  {
    id: "anna", name: "Anna", role: "Neue Teamleiterin", salary: 3500, market: 4000, stars: 4,
    request: "Ich leite jetzt sechs Leute. Das muss man am Gehalt sehen!",
    options: [
      { label: "Fixe Zulage: 300 €", cost: 300, team: 10, bank: true, reaction: "Anna legt motiviert los 💪" },
      { label: "Bonus, wenn ihr Team mehr verkauft", cost: 150, team: -10, reaction: "Anna macht ihrem Team Verkaufsdruck 📈😬" },
      { label: "Nichts, Ehre reicht", cost: 0, team: -25, reaction: "Anna fragt sich, warum sie sich das antut 🙄" },
    ],
    criterion: "Anforderung", source: "Frage 6",
    quote: "Daraus können sich dann auch entsprechende fixe Zulagen ergeben.",
  },
  {
    id: "kevin", name: "Kevin", role: "Bewerber, Risikomanagement", salary: null, ask: 3900, market: 3700, stars: null,
    request: "Ich hab drei Angebote. Unter 3.900 € komm ich nicht.",
    options: [
      { label: "Alles zahlen", cost: 400, team: -10, reaction: "Kevin verdient jetzt mehr als Kollegen mit 20 Jahren Erfahrung 😬" },
      { label: "Absagen", cost: 0, team: -25, reaction: "Stelle bleibt leer. Das Team macht Überstunden 😩" },
      { label: "Marktübliches Angebot, intern erklärbar", cost: 200, team: 0, bank: true, reaction: "Kevin nimmt an 🤝" },
    ],
    criterion: "Markt", source: "Fragen 12 und 13",
    quote: "Wenn bestimmte Qualifikationen knapp sind, können wir nicht so tun, als gäbe es diese Situation nicht.",
  },
  {
    id: "julia", name: "Julia", role: "Firmenkundenbetreuerin", salary: 3600, market: 3800, stars: 4, compare: "Kollege Markus, gleicher Job: 3.800 €",
    request: "Markus macht dasselbe wie ich. Warum kriegt er 200 € mehr?",
    options: [
      { label: "Er hat besser verhandelt", cost: 0, team: -20, reaction: "Julia ruft die Gleichbehandlungsanwaltschaft an ⚖️😡" },
      { label: "Auf 3.800 € angleichen", cost: 200, team: 15, bank: true, reaction: "Julia ist zufrieden ✅" },
      { label: "Verhandle nächstes Mal besser", cost: 0, team: -15, reaction: "Julia sucht nach neuen Jobs 👀" },
    ],
    criterion: "Gleichbehandlung", source: "Frage 16",
    quote: "Wenn zwei Menschen unterschiedlich verdienen, sollte es dafür nachvollziehbare sachliche Gründe geben. […] Und natürlich darf das Geschlecht dabei überhaupt keine Rolle spielen.",
  },
  {
    id: "vertrieb", name: "Vertriebsteam", role: "Alle Kundenberater", salary: null, market: null, stars: null, group: true,
    request: "Andere Banken zahlen Provision. Wir wollen das auch!",
    options: [
      { label: "Ja, Provision pro Abschluss", cost: 300, team: -10, reaction: "Plötzlich bekommt jede Oma einen Bausparvertrag 😬📈" },
      { label: "Verkaufswettbewerb mit Preis", cost: 100, team: -10, reaction: "Die Stimmung kippt ins Ellbogen-Duell 🥊" },
      { label: "Nein, fixes Gehalt, keine falschen Anreize", cost: 0, team: 5, bank: true, reaction: "Murren, aber die Kunden werden ehrlich beraten 🤝" },
    ],
    criterion: "Leistung", source: "Fragen 10 und 18",
    quote: "Wir haben uns dazu entschlossen, keine variable Entlohnung im Gehalt einzubinden, damit Mitarbeiter wegen kurzfristiger persönlicher Ziele keine falschen Anreize bekommen.",
  },
  {
    id: "max", name: "Max", role: "Neffe vom Aufsichtsrat", salary: 2900, market: 2900, stars: 2,
    request: "Mein Onkel meint, ich hab 300 € mehr verdient.",
    options: [
      { label: "Na gut, 300 €", cost: 300, team: -20, reaction: "Das ganze Haus weiß es in einer Stunde 🙄" },
      { label: "Kompromiss: 100 €", cost: 100, team: -10, reaction: "Max ist beleidigt, das Team auch 😒" },
      { label: "Nein, kein sachlicher Grund", cost: 0, team: 10, bank: true, reaction: "Das Team ist beeindruckt 👏" },
    ],
    criterion: "Erklärbarkeit", source: "Frage 20",
    quote: "Wenn ich eine Gehaltsentscheidung sachlich erklären kann und vergleichbare Situationen auch vergleichbar behandle, dann sind wir aus meiner Sicht schon sehr nahe dran.",
  },
];

export function play(answers) {
  // answers: Array von Options-Indizes
  let budget = START_BUDGET, team = START_TEAM, month = 0, over = null, matches = 0;
  const history = [];
  for (let i = 0; i < CARDS.length; i++) {
    const a = answers[i];
    if (a == null) break;
    const o = CARDS[i].options[a];
    budget -= o.cost; team += o.team; month = i + 1;
    if (o.bank) matches++;
    history.push({ i, opt: a, o });
    if (budget < 0) { over = "budget"; break; }
    if (team < 0) { over = "team"; break; }
  }
  const done = month === CARDS.length && !over;
  return { budget, team, month, over, done, matches, history };
}

export function score(s) {
  if (s.over) return s.month; // rausgeflogen: nur die geschafften Gespräche (max. 7)
  if (!s.done) return 0;
  return FINISH_BONUS + Math.round(s.team + s.budget / 10);
}

export const BANK_PATH = CARDS.map((c) => c.options.findIndex((o) => o.bank));
export const MAX_SCORE = score(play(BANK_PATH));

export const euro = (n) => (n < 0 ? "−" : "") + String(Math.abs(Math.round(n))).replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " €";
