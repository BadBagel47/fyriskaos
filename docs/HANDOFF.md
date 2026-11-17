# Fyriskaos – överlämning

Läs det här först, sedan `AGENTS.md` (hänvisning till agentreglerna) och `docs/BACKLOG.md`.

## Agentregler och inventering

- **Agentregler:** v1.11 (2026-11-17), https://raw.githubusercontent.com/BadBagel47/agent-rules/main/AGENTS.md . Repot har följt reglerna sedan 2026-11-17.
- Inventory: 2026-11-17
  - Repot innehöll bara designdokumentet (`docs/design.md`, D-001) på `main`. Inga andra grenar, pull requests, issues eller äldre dokumentation.
  - Repot är publikt.
  - Känslig information: ingen. Hemligheter (t.ex. ElevenLabs-nyckel) får bara ligga som GitHub Secrets.
  - Lagar och licenser: se D-009 i backloggen.
- **Publicering:** GitHub Pages från `main` via `.github/workflows/pages.yml`: varje push till `main` kör testet (`npm test`, Playwright i Chromium) och publicerar bara om det går igenom. Adress: https://badbagel47.github.io/fyriskaos/ . Inte live än: Pages måste slås på en gång av ägaren (2026-11-17 kunde arbetsflödet inte göra det själv: "Resource not accessible by integration").
- **Projektspråk:** svenska för allt spelaren ser och för README. Kod, kodkommentarer och commits på engelska.
- **Miljö (2026-11-17, molnsession hos Claude Code):** push fungerar; npm-registret nås. OpenStreetMap (overpass-api.de, tile.openstreetmap.org) blockeras av sessionens nätverksregler, så kartdata kan inte hämtas härifrån än (behövs för F-005). Chromium med Playwright finns för skärmdumpar.

## Beslut

- **Designdokument (2026-11-17, D-001):** ägarens design från Claude-chatten gäller, se `docs/design.md`.
- **Startinstruktioner (2026-11-17, issue #1):** ägarens instruktioner för första sessionen; innehållet finns här och i backloggen.
- **Språk (2026-11-17):** allt som syns i spelet är på svenska. Kod, kommentarer och commits på engelska. Chatten på svenska. Designdokumentet översätts inte.
- **Nätverk (2026-11-17):** två spelare bygger på `BadBagel47/network-kit` (se dess `docs/INTEGRATION.md`), men först när solo fungerar. En spelare är värd och kör simuleringen. Spelets behov är rapporterade i network-kit issue #1. Behov och frågor om network-kit tas till network-kit-agenten.
- **Grafik (2026-11-17):** arbetssättet för grafik i designdokumentet gäller från start; agenten tittar på sitt resultat med skärmdumpar innan den säger att den är klar. Skrivet som projektregel i `AGENTS.md`.
- **Satirens gränser (2026-11-17, punkt 1.1):** projektregel i `AGENTS.md`.
- **Publicering och motor (2026-11-17, fråga A1 och A2):** GitHub Pages från `main`; PixiJS utan byggsteg.
- **Första körningen (2026-11-17):** prototyp 1 (gå, cykla, köra bil i en grå testkarta), plus publicering så att ägaren kan prova på telefonen efter varje körning. Ingen kod förrän ägaren säger kör.

## Nuläge (2026-11-17)

- **v0.1.0, prototyp 1 (F-002):** en grå teststad (rutnät, å med tre broar, park) där man kan gå, ta en cykel och köra bil. Styrning: flytande joystick på vänstra halvan, en smart knapp (Ta cykeln, Kliv in, Kliv ur, Kliv av) och en bromsknapp. Fordonet svänger mot joystickens riktning och gasar själv; dra bakåt när du står still för att backa. Man ramlar av cykeln vid krock. På dator: piltangenter/WASD, E och mellanslag.
- **Teknik:** PixiJS 8 (kopia i `vendor/pixi`), inga byggsteg. Simuleringen (`src/sim.js`) är skild från ritningen och går i fasta steg, så att den senare kan köras hos värden i co-op. Kartan genereras från ett startnummer (`src/map.js`).
- **Testat:** testet i `tests/smoke.cjs` startar sidan i en mobilvy och provar joystick, cykel, bil, broms, kliva ur och tipset om liggande läge. Skärmdumparna är granskade av agenten.
- **Inte verifierat:** inte publicerat än (D-007 väntar på ägaren); ägaren har inte provat på sin telefon.
- **Nästa:** ägaren provar styrningen; sedan körförslaget i `docs/BACKLOG.md`.
- **Senaste:** prototyp 1 och publicering (2026-11-17) · repot uppsatt enligt agentreglerna (2026-11-17) · designdokumentet (2026-11-17).

## Engångsåtgärder

- Väntar: slå på GitHub Pages (Settings → Pages → Source: GitHub Actions), sedan köra arbetsflödet igen. Behövs för D-007.
- Väntar: tillåt overpass-api.de i molnmiljöns nätverk, så att agenten kan hämta Uppsalas karta från OpenStreetMap (behövs för F-005).

## Dokumentkarta

- `README.md` – kort om spelet och hur det körs lokalt.
- `docs/design.md` – designdokumentet (D-001).
- Issue #1 – ägarens startinstruktioner (stängd när innehållet flyttats hit).
- network-kit issue #1 – Fyriskaos behov av network-kit.
