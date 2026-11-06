# Gehaltserhöhung – Überlebst du die Gehaltsverhandlungen?

Handy-Spiel für die Präsentation der Seminararbeit „Relative Lohngerechtigkeit in der Entlohnungspraxis der Raiffeisenbank Bruck-Carnuntum“ (PFO).

Jeder spielt für sich am Handy die Geschäftsleitung einer Bank: 8 Gespräche, je 3 Antworten (die Kosten stehen auf dem Button, die Wirkung aufs Team nicht). Manche falschen Antworten lösen ein Extra-Gespräch aus (Jörg, Zertifikats-Welle, Brigitte, Gerhard), weil sich Gehälter rumsprechen. Nach jeder Antwort zeigt eine Sprechblase (4 Sek., Antippen = weiter) die Reaktion und die Auswirkung. Zwei Anzeigen: Budget (Start 1.200 €) und Teamzufriedenheit (Start 20). Fällt eine unter 0, ist das Spiel vorbei. Punkte = 20 (durchgehalten) + Teamzufriedenheit + Restbudget ÷ 10. Den Höchstwert von 105 Punkten erreicht nur, wer genau so entscheidet wie die echte Raiffeisenbank laut Interview (geprüft mit `node test/check.mjs`). Der Höchstwert wird im Spiel bewusst nicht angezeigt. Man kann während der Spielzeit beliebig oft spielen, der beste Versuch zählt.

Der Beamer zeigt Countdown, Live-Rangliste und Ticker, danach Siegertreppchen und „So hätte die Raiffeisenbank entschieden“.

## Seiten

- `host.html` – Beamer: Start → Spielzeit (Standard 4 Minuten, ändern mit `?sek=300`) → Siegertreppchen → Auflösung. Leertaste / Pfeil rechts = weiter, Pfeil links = zurück.
- `index.html` – Handy-Ansicht (über den QR-Code).

## Inhalte ändern

Alle Karten, Beträge, Reaktionen und Zitate stehen in `cards.js`. Nach Änderungen prüfen, dass der Bank-Weg weiterhin der einzige Höchstwert ist. Figuren-Zuordnung in `avatars.js`.

## Technik

- Statische Seite auf GitHub Pages.
- Live-Verbindung über Firebase Realtime Database: Konfiguration in `config.js`, Regeln in `database.rules.json`.
- Ohne Firebase-Konfiguration oder mit `?local` läuft ein lokaler Testmodus (alle Tabs im selben Browser).

## Quellen & Lizenzen

- Illustrationen der Figuren: Designed by Freepik (freepik.com), `img/leute.svg`.
- QR-Code: [qrcode-generator](https://github.com/kazuhikoarase/qrcode-generator) von Kazuhiko Arase (MIT-Lizenz), `vendor/qrcode.js`.
- Kinderzulage: Kollektivvertrag Raiffeisenbanken 2026, § 10b III Abs 2.
- Zitate: Interview mit dem Geschäftsleiter der Raiffeisenbank Bruck-Carnuntum (2026).
