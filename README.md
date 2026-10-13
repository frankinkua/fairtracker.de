# FairTracker (fairtracker.de)

Category: commerce-deals

## Concept
FairTracker ist ein webbasiertes Tool, mit dem Verbraucher die Fairness und Nachhaltigkeit eines geplanten Einkaufs überprüfen können. Über eine interaktive Checkliste werden Kriterien wie faire Löhne, nachhaltige Materialien, Reparierbarkeit, Transport und Verpackung bewertet. Ein animiertes Score-Dial zeigt den Fairness-Score sofort an. Zusätzlich erklärt die Seite die wichtigsten Kriterien und die bedeutendsten Siegel in Deutschland/EU (Fairtrade, GOTS, Blauer Engel, EU Ecolabel).

## Technische Architektur
FairTracker ist eine rein statische Webseite, die vollständig auf Vanilla-Webtechnologien basiert.
- **Kein Build-Step:** Kein NPM, keine Frameworks wie React oder Vue.
- **Keine externen Abhängigkeiten:** Keine externen CDNs, keine extern geladenen Web-Fonts (nur System-Schriften), keine Analytics-Tools, keine Cookies.
- **Offline-fähig & lokal:** Die gesamte Logik (Fairness-Berechnung, SVG-Animation) läuft lokal im Browser (`script.js`), es finden keine Server-Calls statt.
- **Hosting:** Die Seite wird direkt über GitHub Pages aus dem Hauptverzeichnis (`main` Branch) ausgeliefert.

## Dateistruktur
- `index.html`: Die Hauptseite mit interaktivem Fairness-Check und Informationen zu Siegeln.
- `style.css`: Beinhaltet das gesamte Styling, inklusive Farbschema (sage green, cream, charcoal), Dark-Mode (`prefers-color-scheme: dark`) und Responsive-Design-Regeln.
- `script.js`: Die Logik zur Berechnung des Scores und zur Animation des SVG-Dials.
- `impressum.html` & `datenschutz.html`: Rechtliche Seiten.
- `404.html`: Eine angepasste Fehlerseite.
- `favicon.svg`: Das Icon der Webseite im SVG-Format.
- `robots.txt` & `sitemap.xml`: SEO-Basisdateien für Suchmaschinen, verweisen auf `https://fairtracker.de/`.
- `CNAME`: Beinhaltet die Domain `fairtracker.de` für GitHub Pages.

## Design
Die Seite nutzt ein ruhiges und vertrauenswürdiges Farbschema, abgerundete Formen und System-Fonts, um einen professionellen und barrierefreien (WCAG AA) Eindruck zu vermitteln. Die Seite respektiert auch `prefers-reduced-motion` für eine reduzierte Animationsdarstellung.

Repo: https://github.com/frankinkua/fairtracker.de
