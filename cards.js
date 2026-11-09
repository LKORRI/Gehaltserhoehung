// „Gehaltserhöhung – Überlebst du die Gehaltsverhandlungen?“
// 8 Gespräche, gleiche Reihenfolge für alle. Manche falschen Antworten lösen ein Extra-Gespräch aus (next).
// Jede Option: cost (€ pro Monat, vom Budget), team (Teamzufriedenheit), bank: true = so entscheidet die echte Raiffeisenbank laut Interview.
// Der Weg der echten Bank ergibt den einzigen Höchstwert (Prüfung: node test/check.mjs).

export const TITLE = "Gehaltserhöhung";
export const SUBTITLE = "Überlebst du die Gehaltsverhandlungen?";
export const START_BUDGET = 1200;
export const START_TEAM = 20;
export const FINISH_BONUS = 20; // Bonus fürs Durchkommen, damit jeder Durchläufer vor jedem Rausgeflogenen liegt
export const PLAY_SECONDS = 300;
export const REACTION_MS = 4000;

export const CARDS = [
  {
    id: "sandra", name: "Sandra", role: "Top-Kundenberaterin", salary: 3200, market: 3600, stars: 5,
    request: "Die Konkurrenz bietet mir 3.700 €. Was ist euer Angebot, dass ich nicht gehe?",
    options: [
      { label: "„Reisende soll man nicht aufhalten.“", cost: 0, team: -25, reaction: "Sandra geht. 40 Kunden gehen mit ihr. 🫠" },
      { label: "+200 € fix, Richtung Marktwert", cost: 200, team: 5, bank: true, reaction: "Sandra bleibt. Fair genug 🙂" },
      { label: "+500 €, du bist unsere Beste!", cost: 500, team: -5, next: "peter", reaction: "Sandra jubelt. In der Kaffeeküche wird getuschelt … 👀" },
    ],
    criterion: "Markt statt Leistung", source: "Fragen 10 und 12",
    quote: "Wir haben keine klassische leistungsorientierte Entlohnung […] Den Arbeitsmarkt kann man natürlich nicht ignorieren.",
  },
  {
    id: "martin", name: "Martin", role: "Privatkundenbetreuer", salary: 3000, market: 3000, stars: 4,
    request: "Ich hab nebenbei meinen Master gemacht und trotzdem hier performed. 300 € mehr wären super!",
    options: [
      { label: "Klar, 300 € mehr!", cost: 300, team: -5, next: "zert", reaction: "Martin feiert. Am nächsten Tag liegen drei Zertifikate auf deinem Tisch … 📚" },
      { label: "Nicht automatisch. Aber bewirb dich auf mehr Verantwortung.", cost: 0, team: 5, bank: true, reaction: "Martin bewirbt sich intern 💡" },
      { label: "Master? Hier zählt Erfahrung.", cost: 0, team: -10, reaction: "Martin stellt sein LinkedIn auf „Open to Work“ 😔" },
    ],
    criterion: "Qualifikation", source: "Frage 9",
    quote: "Trotzdem bedeutet ein zusätzlicher Abschluss nicht automatisch eine Gehaltserhöhung.",
  },
  {
    id: "thomas", name: "Thomas", role: "Zahlungsverkehr", salary: 2800, market: 2900, stars: 3,
    request: "Wir haben Zwillinge bekommen! Ich brauch mehr Geld, bitte.",
    options: [
      { label: "Glückwunsch! +250 €", cost: 250, team: -5, next: "brigitte", reaction: "Thomas strahlt. Brigitte aus der Buchhaltung hat's gehört … 🍼" },
      { label: "Privat ist privat.", cost: 0, team: -15, reaction: "Später erfährt Thomas, dass ihm die Kinderzulage zugestanden wäre. Der Betriebsrat ruft an 📞" },
      { label: "Dir steht die Kinderzulage laut KV zu. Und: Elternteilzeit?", cost: 0, team: 10, bank: true, reaction: "Thomas wusste nichts von der Kinderzulage 🤯" },
    ],
    criterion: "Sozial", source: "Fragen 14 und 15",
    quote: "Beim Gehalt selbst versuchen wir grundsätzlich, die Tätigkeit und nicht die private Lebenssituation zu bewerten.",
  },
  {
    id: "anna", name: "Anna", role: "Neue Teamleiterin", salary: 3500, market: 4000, stars: 4,
    request: "Ich leite jetzt 6 Leute. Das muss entlohnt werden!!",
    options: [
      { label: "Fixe Führungszulage", cost: 300, team: 10, bank: true, reaction: "Anna legt motiviert los 💪" },
      { label: "Bonus, wenn dein Team mehr verkauft", cost: 150, team: -10, reaction: "Anna macht ihrem Team Verkaufsdruck 📈😬" },
      { label: "Führung ist eine Ehre.", cost: 0, team: -25, reaction: "Anna fragt sich, warum sie sich das antut 🙄" },
    ],
    criterion: "Anforderung", source: "Frage 6",
    quote: "Daraus können sich dann auch entsprechende fixe Zulagen ergeben.",
  },
  {
    id: "klaus", name: "Klaus", role: "Bewerber, Risikomanagement", salary: null, ask: 3900, market: 3700, stars: null,
    request: "Ich hab drei Angebote. Unter 3.900 € komm ich nicht. Und mein Hund kommt mit ins Büro.",
    options: [
      { label: "Alles, inklusive Hund", cost: 400, team: -5, next: "gerhard", reaction: "Klaus und Wuffi fangen Montag an. Gerhard schaut grimmig … 🐶" },
      { label: "Absage", cost: 0, team: -25, reaction: "Stelle bleibt leer. Das Team macht Überstunden 😩" },
      { label: "3.700 €: marktüblich und intern erklärbar", cost: 200, team: 0, bank: true, reaction: "Klaus nimmt an. Wuffi bleibt zuhause 🤝" },
    ],
    criterion: "Markt", source: "Fragen 12 und 13",
    quote: "Wenn bestimmte Qualifikationen knapp sind, können wir nicht so tun, als gäbe es diese Situation nicht.",
  },
  {
    id: "nicole", name: "Nicole", role: "Firmenkundenbetreuerin", salary: 3600, market: 3800, stars: 4, compare: "Kollege Markus, gleicher Job: 3.800 €",
    request: "Markus macht denselben Job wie ich und kriegt 200 € mehr. Zufall, dass er ein Mann ist?",
    options: [
      { label: "Er hat halt besser verhandelt.", cost: 0, team: -20, reaction: "Nicole ruft die Gleichbehandlungsanwaltschaft an ⚖️😡" },
      { label: "Kein sachlicher Grund: auf 3.800 € angleichen", cost: 200, team: 15, bank: true, reaction: "Nicole ist zufrieden ✅" },
      { label: "Dann kürzen wir halt Markus.", cost: 0, team: -25, reaction: "Jetzt sind beide sauer. Markus kündigt 💀" },
    ],
    criterion: "Gleichbehandlung", source: "Frage 16",
    quote: "Wenn zwei Menschen unterschiedlich verdienen, sollte es dafür nachvollziehbare sachliche Gründe geben. […] Und natürlich darf das Geschlecht dabei überhaupt keine Rolle spielen.",
  },
  {
    id: "vertrieb", name: "Vertriebsteam", role: "Alle Kundenberater", salary: null, market: null, stars: null, group: true,
    request: "Die Konkurrenz zahlt Provision! Wir wollen das auch!",
    options: [
      { label: "Okay, Provision pro Abschluss", cost: 300, team: -5, reaction: "Oma Hilde hat jetzt drei Bausparverträge 👵📈" },
      { label: "Verkaufswettbewerb: Gewinner kriegt ein E-Bike!", cost: 100, team: -10, reaction: "Ellbogen-Duell im Schalterraum 🥊" },
      { label: "Nein. Fixgehalt, keine falschen Anreize.", cost: 0, team: -5, bank: true, reaction: "Murren im Team. Aber die Kunden werden ehrlich beraten 🤝" },
    ],
    criterion: "Leistung", source: "Fragen 10 und 18",
    quote: "Wir haben uns dazu entschlossen, keine variable Entlohnung im Gehalt einzubinden, damit Mitarbeiter wegen kurzfristiger persönlicher Ziele keine falschen Anreize bekommen.",
  },
  {
    id: "florian", name: "Florian", role: "Neffe vom Aufsichtsrat", salary: 2900, market: 2900, stars: 2,
    request: "Onkel Herbert meint, ich hab 300 € mehr verdient. Er lässt grüßen.",
    options: [
      { label: "Grüße zurück! +300 €", cost: 300, team: -20, reaction: "Das ganze Haus weiß es in 10 Minuten 🙄" },
      { label: "+100 €, damit Ruhe ist", cost: 100, team: -10, reaction: "Florian ist beleidigt, das Team auch 😒" },
      { label: "Nein, dafür gibt es keinen sachlichen Grund.", cost: 0, extra: 150, extraLabel: "Onkel Herbert kürzt", team: 10, bank: true, reaction: "Onkel Herbert kürzt dir 150 € Budget. Das Team feiert dich trotzdem, weil du fair bleibst 👏" },
    ],
    criterion: "Erklärbarkeit", source: "Frage 20",
    quote: "Wenn ich eine Gehaltsentscheidung sachlich erklären kann und vergleichbare Situationen auch vergleichbar behandle, dann sind wir aus meiner Sicht schon sehr nahe dran.",
  },
];

// Extra-Gespräche: kommen nur nach bestimmten Antworten. Hier gibt es nur Schadensbegrenzung.
export const EXTRAS = {
  peter: {
    id: "peter", name: "Peter", role: "Kundenberater, gleicher Job wie Sandra", extra: true, market: null,
    request: "Sandra kriegt 500 € mehr als ich. Für DENSELBEN Job. Erklär mir das.",
    options: [
      { label: "Du kriegst auch 500 €.", cost: 500, team: 0, reaction: "Peter ist besänftigt. Dein Budget nicht 💸" },
      { label: "Sie ist halt besser.", cost: 0, team: -15, reaction: "Peter erzählt es allen in der Kaffeeküche ☕😤" },
      { label: "Kein Kommentar.", cost: 0, team: -20, reaction: "Jetzt glaubt jeder, du verheimlichst was 🤫" },
    ],
  },
  zert: {
    id: "zert", name: "Drei Kollegen", role: "mit frischen Zertifikaten", extra: true, market: null,
    request: "„Excel für Fortgeschrittene“, 2 Stunden online. Also auch 300 € mehr?",
    options: [
      { label: "Okay, allen 300 €.", cost: 900, team: 10, reaction: "Morgen kommen zehn weitere Zertifikate 📚📚📚" },
      { label: "Nur Martin, Pech gehabt.", cost: 0, team: -15, reaction: "„Warum der und wir nicht?“ 😤" },
      { label: "Martin kriegt's doch nicht.", cost: 0, extra: -300, extraLabel: "Martins Erhöhung zurück", team: -20, reaction: "Du nimmst Martins Erhöhung zurück. Jetzt ist er sauer 😡" },
    ],
  },
  brigitte: {
    id: "brigitte", name: "Brigitte", role: "Buchhaltung, 3 Kinder", extra: true, market: null,
    request: "Ich hab drei Kinder großgezogen und nie einen Cent extra bekommen!",
    options: [
      { label: "Du kriegst auch 250 €.", cost: 250, team: -5, reaction: "Jetzt fragen alle Eltern im Haus nach 👨‍👩‍👧‍👦" },
      { label: "Damals war das anders.", cost: 0, team: -15, reaction: "Brigitte schreibt dem Betriebsrat ✉️" },
      { label: "Thomas war ein Sonderfall.", cost: 0, team: -10, reaction: "Brigitte glaubt dir kein Wort 🙄" },
    ],
  },
  gerhard: {
    id: "gerhard", name: "Gerhard, 61", role: "Risikomanagement, seit 1994", extra: true, market: null,
    request: "30 Jahre bin ich hier. Und der Neue mit dem Hund verdient mehr als ich?!",
    options: [
      { label: "Du kriegst auch 3.900 €.", cost: 300, team: 0, reaction: "Gerhard ist versöhnt. Dein Budget weint 💸" },
      { label: "Der Markt ist halt so.", cost: 0, team: -15, reaction: "Gerhard macht ab jetzt Dienst nach Vorschrift 😑" },
      { label: "Ich kürze Klaus wieder.", cost: 0, extra: -400, extraLabel: "Klaus geht, Gehalt gespart", team: -20, reaction: "Klaus kündigt. Wuffi auch 🐕💨" },
    ],
  },
};

// echte Kosten einer Antwort (extra = Budget, das zusätzlich weg ist bzw. zurückkommt)
export const costOf = (o) => o.cost + (o.extra || 0);

// Spielt eine Antwortfolge durch. answers = Options-Indizes in der Reihenfolge der gespielten Karten.
export function play(answers) {
  let budget = START_BUDGET, team = START_TEAM, over = null, matches = 0, base = 0;
  const queue = [...CARDS];
  const history = [];
  let i = 0;
  for (; i < answers.length && i < queue.length; i++) {
    const c = queue[i], a = answers[i];
    const o = c.options[a];
    budget -= costOf(o); team += o.team;
    if (!c.extra) base++;
    if (o.bank) matches++;
    history.push({ id: c.id, opt: a, card: c, o });
    if (o.next) queue.splice(i + 1, 0, EXTRAS[o.next]);
    if (budget < 0) { over = "budget"; i++; break; }
    if (team < 0) { over = "team"; i++; break; }
  }
  const done = !over && i >= queue.length;
  const next = over || done ? null : queue[i];
  return { budget, team, month: history.length, base, over, done, matches, history, next };
}

export function score(s) {
  if (s.over) return s.base; // rausgeflogen: nur die geschafften Gespräche (max. 7)
  if (!s.done) return 0;
  return FINISH_BONUS + Math.round(s.team + s.budget / 10);
}

export const BANK_PATH = CARDS.map((c) => c.options.findIndex((o) => o.bank));
export const MAX_SCORE = score(play(BANK_PATH));

export const euro = (n) => (n < 0 ? "−" : "") + String(Math.abs(Math.round(n))).replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " €";
