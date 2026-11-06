// „Gehaltserhöhung – 12 Monate als Chef“
// 12 Karten = 12 Monate, gleiche Reihenfolge für alle.
// Jede Option: cost (€ pro Monat, vom Budget), team (Teamfrieden), bank: true = so entscheidet die echte Raiffeisenbank laut Interview.
// Der Weg der echten Bank ergibt den maximalen Punktestand (wird in test/check.mjs geprüft).

export const TITLE = "Gehaltserhöhung";
export const SUBTITLE = "Überlebst du ein Jahr als Chef?";
export const START_BUDGET = 1500;
export const START_TEAM = 30;
export const YEAR_BONUS = 20; // Bonus fürs geschaffte Jahr, damit jeder Durchläufer vor jedem Rausgeflogenen liegt
export const PLAY_SECONDS = 240;
export const MONTHS = ["Jänner", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];

export const CARDS = [
  {
    id: "sandra", name: "Sandra", role: "Kundenberaterin", salary: 3200, market: 3600, stars: 5,
    request: "Die Konkurrenz bietet mir mehr. 400 € drauf, oder ich bin weg.",
    options: [
      { label: "Nein, tschüss", cost: 0, team: -20, reaction: "Sandra kündigt. Ihre Kunden gehen mit 😤" },
      { label: "200 € fix, damit sie näher am Marktwert ist", cost: 200, team: 5, bank: true, reaction: "Sandra bleibt. Fair genug 🙂" },
      { label: "400 € als Leistungsprämie", cost: 400, team: -5, reaction: "Sandra jubelt, die Kollegen tuscheln 👀" },
    ],
    criterion: "Markt statt Leistung", source: "Fragen 10 und 12",
    quote: "Wir haben keine klassische leistungsorientierte Entlohnung […] Den Arbeitsmarkt kann man natürlich nicht ignorieren.",
  },
  {
    id: "martin", name: "Martin", role: "Privatkundenbetreuer", salary: 3000, market: 3000, stars: 3,
    request: "Ich hab berufsbegleitend meinen Master fertig! Krieg ich 300 € mehr?",
    options: [
      { label: "Ja, 300 € mehr", cost: 300, team: -5, reaction: "Martin feiert 🎉 … und drei Kollegen fangen auch ein Studium an 📚" },
      { label: "Nicht automatisch. Reden wir über mehr Verantwortung", cost: 0, team: 5, bank: true, reaction: "Martin bewirbt sich intern für eine neue Aufgabe 💡" },
      { label: "Nein, brauchst du für deinen Job nicht", cost: 0, team: -10, reaction: "Martin ist gekränkt 😔" },
    ],
    criterion: "Qualifikation", source: "Frage 9",
    quote: "Trotzdem bedeutet ein zusätzlicher Abschluss nicht automatisch eine Gehaltserhöhung.",
  },
  {
    id: "thomas", name: "Thomas", role: "Zahlungsverkehr", salary: 2800, market: 2900, stars: 3,
    request: "Wir haben ein Baby bekommen. Kann ich mehr Gehalt bekommen?",
    options: [
      { label: "Ja, 250 € mehr", cost: 250, team: -5, reaction: "Thomas ist glücklich 🍼 … Brigitte fragt, warum sie nie was bekommen hat" },
      { label: "Nein, Privates zählt beim Gehalt nicht", cost: 0, team: -10, reaction: "Thomas nickt traurig 😔" },
      { label: "Auf die Kinderzulage laut KV hinweisen und Teilzeit anbieten", cost: 0, team: 10, bank: true, reaction: "Thomas wusste nicht, dass ihm 185,71 € zustehen 🤯🙏" },
    ],
    criterion: "Sozial", source: "Fragen 14 und 15",
    quote: "Beim Gehalt selbst versuchen wir grundsätzlich, die Tätigkeit und nicht die private Lebenssituation zu bewerten.",
  },
  {
    id: "anna", name: "Anna", role: "Neue Teamleiterin Kredit", salary: 3500, market: 4000, stars: 4,
    request: "Ich leite jetzt sechs Leute. Das sollte man am Gehalt sehen.",
    options: [
      { label: "Fixe Funktionszulage: 300 €", cost: 300, team: 10, bank: true, reaction: "Anna legt motiviert los 💪" },
      { label: "Bonus, wenn ihr Team mehr verkauft", cost: 150, team: -10, reaction: "Anna macht ihrem Team Verkaufsdruck 📈😬" },
      { label: "Nichts, die Beförderung ist Ehre genug", cost: 0, team: -25, reaction: "Anna fragt sich, warum sie sich das antut 🙄" },
    ],
    criterion: "Anforderung", source: "Frage 6",
    quote: "Daraus können sich dann auch entsprechende fixe Zulagen ergeben.",
  },
  {
    id: "kevin", name: "Kevin", role: "Bewerber Risikomanagement", salary: null, ask: 3900, market: 3700, stars: null,
    request: "Ich hab drei Angebote. Unter 3.900 € komme ich nicht.",
    options: [
      { label: "Alles zahlen, wir brauchen ihn", cost: 400, team: -10, reaction: "Kevin fängt an … und verdient mehr als Leute mit 20 Jahren Erfahrung 😬" },
      { label: "Absagen, zu teuer", cost: 0, team: -25, reaction: "Die Stelle bleibt leer. Das Team macht Überstunden 😩" },
      { label: "Marktübliches Angebot, das intern erklärbar bleibt", cost: 200, team: 0, bank: true, reaction: "Kevin nimmt an 🤝" },
    ],
    criterion: "Markt", source: "Fragen 12 und 13",
    quote: "Wenn bestimmte Qualifikationen knapp sind, können wir nicht so tun, als gäbe es diese Situation nicht.",
  },
  {
    id: "brigitteKevin", name: "Brigitte", role: "Kreditsachbearbeiterin, 25 Jahre im Haus", salary: 3400, market: 3400, stars: 4,
    request: "25 Jahre bin ich hier, und der Neue verdient fast gleich viel wie ich?!",
    options: [
      { label: "Ignorieren, Gehälter sind vertraulich", cost: 0, team: -15, reaction: "Brigitte macht Dienst nach Vorschrift 😑" },
      { label: "Gespräch und prüfen, ob eine Anpassung fair ist: 100 €", cost: 100, team: 10, bank: true, reaction: "Brigitte fühlt sich gesehen 🙂" },
      { label: "Sofort 300 € mehr", cost: 300, team: 5, reaction: "Brigitte backt fürs ganze Team 🍰" },
    ],
    criterion: "Pay Inversion", source: "Fragen 12 und 17",
    quote: "Gleichzeitig müssen wir darauf achten, dass unsere bestehenden Mitarbeiter mit ihrer Erfahrung und Verantwortung nicht aus dem Blick geraten.",
  },
  {
    id: "julia", name: "Julia", role: "Firmenkundenbetreuerin", salary: 3600, market: 3800, stars: 4, compare: "Markus, gleicher Job: 3.800 €",
    request: "Markus macht genau dasselbe wie ich. Warum verdient er 200 € mehr?",
    options: [
      { label: "Er hat halt besser verhandelt", cost: 0, team: -20, reaction: "Julia ruft die Gleichbehandlungsanwaltschaft an ⚖️😡" },
      { label: "Auf 3.800 € angleichen", cost: 200, team: 15, bank: true, reaction: "Julia ist zufrieden ✅" },
      { label: "Verhandle nächstes Jahr besser", cost: 0, team: -15, reaction: "Julia sucht nach neuen Jobs 👀" },
    ],
    criterion: "Gleichbehandlung", source: "Frage 16",
    quote: "Wenn zwei Menschen unterschiedlich verdienen, sollte es dafür nachvollziehbare sachliche Gründe geben. […] Und natürlich darf das Geschlecht dabei überhaupt keine Rolle spielen.",
  },
  {
    id: "joerg", name: "Jörg", role: "Kundenberater, Sandras Kollege", salary: 3300, market: 3400, stars: 3,
    request: "Ich hab gehört, Sandra hat mehr bekommen. Ich will auch 200 €!",
    options: [
      { label: "Okay, 200 € für dich auch", cost: 200, team: 0, reaction: "Jörg grinst. Am nächsten Tag stehen drei weitere vor der Tür 🚪🚪🚪" },
      { label: "Gespräch: den Unterschied sachlich erklären", cost: 0, team: 5, bank: true, reaction: "Jörg versteht's … halbwegs 🤷" },
      { label: "Geht dich nichts an", cost: 0, team: -15, reaction: "Jörg erzählt es allen 😠" },
    ],
    criterion: "Relative Gerechtigkeit", source: "Frage 17",
    quote: "Wenn sich Mitarbeiter ungerecht behandelt fühlen, wird man im bilateralen Gespräch versuchen, dies auszuräumen.",
  },
  {
    id: "vertrieb", name: "Vertriebsteam", role: "Alle Kundenberater gemeinsam", salary: null, market: null, stars: null, group: true,
    request: "Andere Banken haben Provisionen. Wir wollen das auch!",
    options: [
      { label: "Ja, Provision für jeden Abschluss", cost: 300, team: -10, reaction: "Plötzlich bekommt jede Oma einen Bausparvertrag 😬📈" },
      { label: "Monatlicher Verkaufswettbewerb mit Preis", cost: 100, team: -10, reaction: "Die Stimmung kippt ins Ellbogen-Duell 🥊" },
      { label: "Nein. Fixes Gehalt, damit niemand falsche Anreize hat", cost: 0, team: 5, bank: true, reaction: "Murren, aber die Kunden werden ehrlich beraten 🤝" },
    ],
    criterion: "Leistung", source: "Fragen 10 und 18",
    quote: "Wir haben uns dazu entschlossen, keine variable Entlohnung im Gehalt einzubinden, damit Mitarbeiter wegen kurzfristiger persönlicher Ziele keine falschen Anreize bekommen.",
  },
  {
    id: "lukas", name: "Lukas", role: "Wertpapierberater", salary: 3400, market: 3500, stars: 4,
    request: "Ich möchte auf 30 Stunden reduzieren, wegen meiner Mama, die Pflege braucht.",
    options: [
      { label: "Ja, Gehalt anteilig angepasst", cost: 0, team: 10, bank: true, reaction: "Lukas ist erleichtert 💛" },
      { label: "Nein, wir brauchen dich Vollzeit", cost: 0, team: -15, reaction: "Lukas kündigt nach drei Monaten 😢" },
      { label: "Ja, und volles Gehalt bleibt", cost: 400, team: -5, reaction: "Lukas freut sich. Die Vollzeit-Kollegen weniger 🤨" },
    ],
    criterion: "Sozial", source: "Frage 14",
    quote: "Allerdings legen wir schon großen Wert darauf, dass Lebensumstände berücksichtigt werden, sei es z. B. Umstellung auf Teilzeit natürlich mit einer dementsprechenden Gehaltsanpassung.",
  },
  {
    id: "max", name: "Max", role: "Neffe vom Aufsichtsratsvorsitzenden", salary: 2900, market: 2900, stars: 2,
    request: "Mein Onkel meint, ich hätte eine Gehaltserhöhung verdient. 300 €?",
    options: [
      { label: "Na gut, 300 €", cost: 300, team: -20, reaction: "Das ganze Haus weiß es in einer Stunde 🙄" },
      { label: "Kleiner Kompromiss: 100 €", cost: 100, team: -10, reaction: "Max ist beleidigt, das Team auch 😒" },
      { label: "Nein, dafür gibt's keinen sachlichen Grund", cost: 0, team: 10, bank: true, reaction: "Das Team ist beeindruckt 👏" },
    ],
    criterion: "Erklärbarkeit", source: "Frage 20",
    quote: "Wenn ich eine Gehaltsentscheidung sachlich erklären kann und vergleichbare Situationen auch vergleichbar behandle, dann sind wir aus meiner Sicht schon sehr nahe dran.",
  },
  {
    id: "ferien", name: "Aufsichtsrat", role: "Sparvorschlag zum Jahresende", salary: null, market: null, stars: null, group: true,
    request: "Wir könnten die Ferienwohnung für Mitarbeiter verkaufen. Bringt 300 € pro Monat ins Budget.",
    options: [
      { label: "Verkaufen, Geld ist Geld", cost: -300, team: -40, reaction: "Das Team ist fassungslos 😱🏖️" },
      { label: "Behalten. Sie ist uns wichtig für die Leute", cost: 0, team: 5, bank: true, reaction: "Das Team plant schon den Sommer ☀️" },
      { label: "Behalten, aber Mitarbeiter zahlen mehr", cost: -100, team: -15, reaction: "Die Buchungen brechen ein 📉" },
    ],
    criterion: "Sozialleistungen", source: "Frage 15",
    quote: "Jedoch bieten wir unseren Mitarbeitern durch die Bereitstellung einer Ferienwohnung die Möglichkeit, relativ günstig Urlaube verbringen zu können.",
  },
];

export function play(answers) {
  // answers: Array von Options-Indizes (oder null für unbeantwortet)
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
  if (s.over) return s.month; // rausgeflogen: nur die geschafften Monate (max. 11)
  if (!s.done) return 0;
  return YEAR_BONUS + Math.round(s.team + s.budget / 10);
}

export const BANK_PATH = CARDS.map((c) => c.options.findIndex((o) => o.bank));
export const MAX_SCORE = score(play(BANK_PATH));

export const euro = (n) => (n < 0 ? "−" : "") + String(Math.abs(Math.round(n))).replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " €";
