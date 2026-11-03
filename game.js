// „Gehaltserhöhung – Überlebst du die Gehaltsverhandlungen?“
// Inhalte und Spiellogik. Alle Texte hier ändern.
//
// Jede Runde hat eine oder mehrere Varianten. Welche Variante ein Spieler bekommt,
// hängt von seinen früheren Entscheidungen ab (flags). Die erste passende Variante gewinnt.
// Option: cost = Kosten pro Monat (vom Budget), mood = Stimmung, set = Flags, quit = jemand kündigt.

export const TITLE = "Gehaltserhöhung";
export const SUBTITLE = "Überlebst du die Gehaltsverhandlungen?";
export const START_BUDGET = 1500;
export const START_MOOD = 70;
export const QUESTION_SECONDS = 30;
export const NO_ANSWER_MOOD = -10;

export const ROUNDS = [
  {
    variants: [{
      id: "sandra", emoji: "🚀", name: "Sandra", role: "Kundenberaterin",
      salary: 3200, market: 3600, stars: 5,
      request: "Die Konkurrenz hat mir ein Angebot gemacht. 400 € mehr, oder ich bin weg.",
      options: [
        { label: "0 €", cost: 0, mood: -10, quit: true, set: { sandraQuit: true }, reaction: "Sandra kündigt und geht zur Konkurrenz 😤" },
        { label: "200 €", cost: 200, mood: 0, set: { sandraPaid: true }, reaction: "Sandra bleibt. Begeistert ist sie nicht 😐" },
        { label: "400 €", cost: 400, mood: 5, set: { sandraPaid: true }, reaction: "Sandra strahlt 🤩 … und erzählt es in der Kaffeeküche ☕" },
      ],
      bank: 1, criterion: "Leistung vs. Markt",
      bankText: "Keine Leistungsprämie, aber eine fixe Anpassung, wenn jemand unter dem Marktwert liegt.",
      quote: "Wir haben keine klassische leistungsorientierte Entlohnung und keine laufenden variablen Prämien. […] Den Arbeitsmarkt kann man natürlich nicht ignorieren.",
      source: "Interview, Fragen 10 und 12",
    }],
  },
  {
    variants: [{
      id: "martin", emoji: "🎓", name: "Martin", role: "Privatkundenbetreuer",
      salary: 3000, market: 3000, stars: 3,
      request: "Ich hab berufsbegleitend meinen Master fertig! Krieg ich 300 € mehr?",
      options: [
        { label: "0 €, aber wir reden über neue Aufgaben", cost: 0, mood: -5, reaction: "Martin ist kurz enttäuscht und bewirbt sich dann intern für mehr Verantwortung 💡" },
        { label: "150 €", cost: 150, mood: 0, reaction: "Martin freut sich 🙂" },
        { label: "300 €", cost: 300, mood: 0, reaction: "Martin feiert 🎉 … und drei Kollegen melden sich sofort zum Studium an 📚" },
      ],
      bank: 0, criterion: "Qualifikation",
      bankText: "Ein Abschluss bringt nicht automatisch mehr Gehalt. Entscheidend ist, ob daraus mehr Verantwortung entsteht.",
      quote: "Trotzdem bedeutet ein zusätzlicher Abschluss nicht automatisch eine Gehaltserhöhung.",
      source: "Interview, Frage 9",
    }],
  },
  {
    variants: [
      {
        id: "joerg", when: (f) => f.sandraPaid, emoji: "👀", name: "Jörg", role: "Kundenberater, Sandras Kollege",
        salary: 3300, market: 3400, stars: 3,
        request: "Ich hab gehört, Sandra hat mehr bekommen. Gleicher Job! Ich will auch 200 €.",
        options: [
          { label: "0 €, ohne Erklärung", cost: 0, mood: -15, reaction: "Jörg ist grantig und erzählt es allen 😠" },
          { label: "Gespräch: Unterschied sachlich erklären", cost: 0, mood: -5, reaction: "Jörg versteht's … halbwegs 🤷" },
          { label: "200 €", cost: 200, mood: 0, reaction: "Jörg ist zufrieden 😌" },
        ],
        bank: 1, criterion: "Relative Gerechtigkeit",
        bankText: "Unterschiede müssen sachlich erklärbar sein. Wer sich ungerecht behandelt fühlt, bekommt ein Gespräch.",
        quote: "Wenn sich Mitarbeiter ungerecht behandelt fühlen, wird man im bilateralen Gespräch versuchen, dies auszuräumen.",
        source: "Interview, Frage 17",
      },
      {
        id: "kevin", emoji: "🧑‍💼", name: "Kevin", role: "Bewerber als Ersatz für Sandra",
        salary: null, ask: 3700, market: 3600, stars: null,
        request: "Ich hab drei Angebote. Unter 3.700 € komme ich nicht.",
        options: [
          { label: "3.700 € zahlen", cost: 500, mood: 0, set: { kevinHired: true }, reaction: "Kevin fängt an 💼 … und verdient mehr als manche, die seit 20 Jahren da sind" },
          { label: "3.400 € anbieten", cost: 0, mood: -15, reaction: "Kevin sagt ab. Das Team macht Überstunden 😩" },
          { label: "Nicht nachbesetzen", cost: 0, mood: -20, reaction: "Das Team übernimmt Sandras Kunden 😫" },
        ],
        bank: 0, criterion: "Markt",
        bankText: "Den Marktwert muss man zahlen, aber mit Augenmaß, damit es intern erklärbar bleibt.",
        quote: "Wenn bestimmte Qualifikationen knapp sind, können wir nicht so tun, als gäbe es diese Situation nicht.",
        source: "Interview, Frage 13",
      },
    ],
  },
  {
    variants: [{
      id: "thomas", emoji: "👶", name: "Thomas", role: "Zahlungsverkehr",
      salary: 2800, market: 2900, stars: 3,
      request: "Wir haben ein Baby bekommen, das Geld wird knapp. Kann ich mehr bekommen?",
      options: [
        { label: "0 €. Gehalt bewertet den Job, nicht das Privatleben", cost: 0, mood: -5, reaction: "Thomas nickt traurig 😔", note: "Die Kinderzulage von 185,71 € bekommt er trotzdem. Die ist laut KV Pflicht." },
        { label: "Auf die Kinderzulage hinweisen und Teilzeit anbieten", cost: 0, mood: 5, reaction: "Thomas wusste gar nicht, dass ihm 185,71 € im Monat zustehen 🤯🙏", note: "Die Kinderzulage ist im Raiffeisen-KV ein Anspruch (§ 10b), kein Geschenk der Bank." },
        { label: "250 €", cost: 250, mood: 0, set: { babyPaid: true }, reaction: "Thomas ist überglücklich 🍼 … die Nachricht verbreitet sich" },
      ],
      bank: 1, criterion: "Sozial",
      bankText: "Das Gehalt bewertet die Tätigkeit. Dazu kommen Kinderzulage laut KV, Teilzeit und die Ferienwohnung der Bank.",
      quote: "Beim Gehalt selbst versuchen wir grundsätzlich, die Tätigkeit und nicht die private Lebenssituation zu bewerten.",
      source: "Interview, Fragen 14 und 15",
    }],
  },
  {
    variants: [{
      id: "anna", emoji: "👩‍💼", name: "Anna", role: "Neue Teamleiterin Kredit",
      salary: 3500, market: 4000, stars: 4,
      request: "Ich leite jetzt sechs Leute und trage viel mehr Verantwortung. Das sollte man am Gehalt sehen.",
      options: [
        { label: "Fixe Zulage: 300 €", cost: 300, mood: 5, reaction: "Anna legt motiviert los 💪" },
        { label: "Bonus, wenn das Team gut verkauft", cost: 150, mood: -10, reaction: "Anna setzt ihr Team unter Verkaufsdruck 📈😬" },
        { label: "0 €, die Beförderung ist Anerkennung genug", cost: 0, mood: -10, reaction: "Anna fragt sich, warum sie sich das antut 🙄" },
      ],
      bank: 0, criterion: "Anforderung",
      bankText: "Funktion und Verantwortung werden mit fixen Zulagen abgegolten, nicht mit Boni.",
      quote: "Daraus können sich dann auch entsprechende fixe Zulagen ergeben.",
      source: "Interview, Frage 6",
    }],
  },
  {
    variants: [
      {
        id: "brigitteBaby", when: (f) => f.babyPaid, emoji: "👵", name: "Brigitte", role: "Kreditsachbearbeiterin, 25 Jahre im Haus",
        salary: 3400, market: 3400, stars: 4,
        request: "Ich hab zwei Kinder großgezogen und nie einen Cent extra bekommen!",
        options: brigitteOptions(),
        bank: 1, criterion: "Sozial",
        bankText: "Persönliche Lebensumstände sollen nicht dazu führen, dass vergleichbare Arbeit unterschiedlich bezahlt wird.",
        quote: "Persönliche Lebensumstände sollten also nicht dazu führen, dass vergleichbare Arbeit unterschiedlich bewertet wird.",
        source: "Interview, Frage 14",
      },
      {
        id: "brigitteKevin", when: (f) => f.kevinHired, emoji: "😤", name: "Brigitte", role: "Kreditsachbearbeiterin, 25 Jahre im Haus",
        salary: 3400, market: 3400, stars: 4,
        request: "25 Jahre bin ich hier, und der Neue verdient mehr als ich?!",
        options: brigitteOptions(),
        bank: 1, criterion: "Markt vs. Erfahrung",
        bankText: "Pay Inversion mit Augenmaß: Bestehende Mitarbeiter dürfen nicht aus dem Blick geraten.",
        quote: "Gleichzeitig müssen wir darauf achten, dass unsere bestehenden Mitarbeiter mit ihrer Erfahrung und Verantwortung nicht aus dem Blick geraten.",
        source: "Interview, Frage 12",
      },
      {
        id: "julia", emoji: "⚖️", name: "Julia", role: "Firmenkundenbetreuerin",
        salary: 3600, market: 3800, stars: 4, compare: "Kollege Markus, gleicher Job: 3.800 €",
        request: "Markus macht genau dasselbe wie ich. Warum verdient er 200 € mehr?",
        options: [
          { label: "„Er hat besser verhandelt.“", cost: 0, mood: -15, reaction: "Julia ruft die Gleichbehandlungsanwaltschaft an 😡⚖️" },
          { label: "Auf 3.800 € angleichen", cost: 200, mood: 5, reaction: "Julia ist zufrieden ✅" },
          { label: "„Verhandle nächstes Jahr halt besser.“", cost: 0, mood: -10, reaction: "Julia schaut sich nach anderen Jobs um 👀" },
        ],
        bank: 1, criterion: "Anforderung · Gleichbehandlung",
        bankText: "Unterschiede nur aus sachlichen Gründen. Das Geschlecht darf keine Rolle spielen.",
        quote: "Wenn zwei Menschen unterschiedlich verdienen, sollte es dafür nachvollziehbare sachliche Gründe geben. […] Und natürlich darf das Geschlecht dabei überhaupt keine Rolle spielen.",
        source: "Interview, Frage 16",
      },
    ],
  },
];

function brigitteOptions() {
  return [
    { label: "0 €", cost: 0, mood: -15, reaction: "Brigitte macht ab jetzt Dienst nach Vorschrift 😑" },
    { label: "Gespräch und prüfen, ob eine Anpassung fair ist: 100 €", cost: 100, mood: 0, reaction: "Brigitte fühlt sich ernst genommen 🙂" },
    { label: "300 €", cost: 300, mood: 5, reaction: "Brigitte ist versöhnt 😊 … und backt fürs ganze Team 🍰" },
  ];
}

// Welche Variante bekommt ein Spieler in Runde r?
export function variantFor(r, flags) {
  return ROUNDS[r].variants.find((v) => !v.when || v.when(flags)) || ROUNDS[r].variants[0];
}

// Spielt die Antworten eines Spielers bis vor Runde `upto` nach.
// answers: { [r]: { opt, v } }   closedRounds: Runden, deren Zeit schon vorbei ist
export function replay(answers, upto, closedRounds = upto) {
  let budget = START_BUDGET, mood = START_MOOD, quits = 0;
  const flags = {};
  const history = [];
  for (let r = 0; r < Math.min(upto, ROUNDS.length); r++) {
    const v = variantFor(r, flags);
    const a = answers && answers[r];
    if (a && a.opt != null && v.options[a.opt]) {
      const o = v.options[a.opt];
      budget -= o.cost; mood += o.mood;
      if (o.quit) quits++;
      Object.assign(flags, o.set || {});
      history.push({ r, v, o, opt: a.opt });
    } else if (r < closedRounds) {
      mood += NO_ANSWER_MOOD;
      history.push({ r, v, o: null, opt: null });
    }
    mood = Math.max(0, Math.min(100, mood));
  }
  return { budget, mood, quits, flags, history };
}

export function fired(s) { return s.budget < 0; }

export function score(s) {
  return Math.round(s.mood + s.budget / 10 - 20 * s.quits - (fired(s) ? 50 : 0));
}

export function verdict(s) {
  if (fired(s)) return { emoji: "📞", title: "Du bist raus!", text: "Der Aufsichtsrat hat angerufen. Du hast das Gehaltsbudget gesprengt." };
  if (s.mood >= 75) return { emoji: "🏆", title: "Chef*in des Jahres", text: "Budget gehalten und die Leute mögen dich. Respekt." };
  if (s.mood >= 55) return { emoji: "👍", title: "Solide Führungskraft", text: "Nicht alle sind glücklich, aber die Bank läuft." };
  if (s.mood >= 35) return { emoji: "😬", title: "Die Kaffeeküche lästert", text: "Die Kasse stimmt, aber die Stimmung ist im Keller." };
  return { emoji: "🚪", title: "Dein Team läuft davon", text: "Die Kasse stimmt, aber reihenweise Kündigungen liegen auf deinem Tisch." };
}

export const euro = (n) => (n < 0 ? "−" : "") + String(Math.abs(Math.round(n))).replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "\u00a0€";
