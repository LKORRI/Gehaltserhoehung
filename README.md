# Gehaltserhöhung – Überlebst du die Gehaltsverhandlungen?

Handy-Spiel für die Präsentation der Seminararbeit „Relative Lohngerechtigkeit in der Entlohnungspraxis der Raiffeisenbank Bruck-Carnuntum“ (PFO).

Das Publikum spielt die Geschäftsleitung einer Bank. Sechs Mitarbeitende kommen mit einer Bitte um mehr Geld. Jeder hat 1.500 € pro Monat für Gehaltserhöhungen: Wer das Budget überzieht, fliegt raus; wer die Stimmung ruiniert, verliert sein Team. Je nach Entscheidung klopft in späteren Runden jemand anderes an (z. B. Jörg, wenn Sandra mehr bekommen hat). Am Ende zeigt der Beamer die Rangliste und wie die echte Raiffeisenbank laut Interview entschieden hätte.

## Seiten

- `host.html` – Beamer: QR-Code, Runden, Auflösung, Rangliste, Entscheidungen der echten Bank. Leertaste / Pfeil rechts = weiter, Pfeil links = zurück.
- `index.html` – Handy-Ansicht (über den QR-Code).

## Inhalte ändern

Alle Personen, Beträge, Reaktionen und Zitate stehen in `game.js`. Figuren-Zuordnung in `avatars.js`.

## Technik

- Statische Seite auf GitHub Pages.
- Live-Verbindung über Firebase Realtime Database: Konfiguration in `config.js`, Regeln in `database.rules.json`.
- Ohne Firebase-Konfiguration oder mit `?local` läuft ein lokaler Testmodus (alle Tabs im selben Browser).

## Quellen & Lizenzen

- Illustrationen der Figuren: Designed by Freepik (freepik.com), `img/leute.svg`.
- QR-Code: [qrcode-generator](https://github.com/kazuhikoarase/qrcode-generator) von Kazuhiko Arase (MIT-Lizenz), `vendor/qrcode.js`.
- Kinderzulage: Kollektivvertrag Raiffeisenbanken 2026, § 10b III Abs 2.
- Zitate: Interview mit dem Geschäftsleiter der Raiffeisenbank Bruck-Carnuntum (2026).
