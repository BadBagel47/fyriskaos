# Fyriskaos – överlämning

Läs det här först, sedan `AGENTS.md` (hänvisning till agentreglerna) och `docs/BACKLOG.md`.

## Agentregler och inventering

- **Agentregler:** v1.11 (2026-11-17), https://raw.githubusercontent.com/BadBagel47/agent-rules/main/AGENTS.md . Repot har följt reglerna sedan 2026-11-17.
- Inventory: 2026-11-17
  - Repot innehöll bara designdokumentet (`docs/design.md`, D-001) på `main`. Inga andra grenar, pull requests, issues eller äldre dokumentation.
  - Repot är publikt.
  - Känslig information: ingen. Hemligheter (t.ex. ElevenLabs-nyckel) får bara ligga som GitHub Secrets.
  - Lagar och licenser: se D-009 i backloggen.
- **Publicering:** inte uppsatt än. Förslag: GitHub Pages från `main` (D-007, fråga A1 i körförslaget).
- **Projektspråk:** svenska för allt spelaren ser och för README. Kod, kodkommentarer och commits på engelska.
- **Miljö (2026-11-17, molnsession hos Claude Code):** push fungerar; npm-registret nås. OpenStreetMap (overpass-api.de, tile.openstreetmap.org) blockeras av sessionens nätverksregler, så kartdata kan inte hämtas härifrån än (behövs för F-005). Chromium med Playwright finns för skärmdumpar.

## Beslut

- **Designdokument (2026-11-17, D-001):** ägarens design från Claude-chatten gäller, se `docs/design.md`.
- **Startinstruktioner (2026-11-17, issue #1):** ägarens instruktioner för första sessionen; innehållet finns här och i backloggen.
- **Språk (2026-11-17):** allt som syns i spelet är på svenska. Kod, kommentarer och commits på engelska. Chatten på svenska. Designdokumentet översätts inte.
- **Nätverk (2026-11-17):** två spelare bygger på `BadBagel47/network-kit` (se dess `docs/INTEGRATION.md`), men först när solo fungerar. En spelare är värd och kör simuleringen. Spelets behov är rapporterade i network-kit issue #1. Behov och frågor om network-kit tas till network-kit-agenten.
- **Grafik (2026-11-17):** arbetssättet för grafik i designdokumentet gäller från start; agenten tittar på sitt resultat med skärmdumpar innan den säger att den är klar. Skrivet som projektregel i `AGENTS.md`.
- **Första körningen (2026-11-17):** prototyp 1 (gå, cykla, köra bil i en grå testkarta), plus publicering så att ägaren kan prova på telefonen efter varje körning. Ingen kod förrän ägaren säger kör.

## Väntande anpassning

- **1.1** Gör satirens gränser (aldrig riktiga politiker, partier, boende eller personal; inga lån från GTA) till projektregel i `AGENTS.md`. Rekommendation: ja, så att varje agent följer dem utan att läsa hela designdokumentet.

## Nuläge (2026-11-17)

- Bara design finns. Ingen kod, ingen publicering.
- **Nästa:** körförslaget i `docs/BACKLOG.md` (först prototyp 1, styrningen på mobil).
- **Senaste:** repot uppsatt enligt agentreglerna, backlog och körförslag (2026-11-17) · designdokumentet (2026-11-17).

## Engångsåtgärder

- Väntar: tillåt overpass-api.de i molnmiljöns nätverk, så att agenten kan hämta Uppsalas karta från OpenStreetMap (behövs för F-005).

## Dokumentkarta

- `docs/design.md` – designdokumentet (D-001).
- Issue #1 – ägarens startinstruktioner (stängd när innehållet flyttats hit).
- network-kit issue #1 – Fyriskaos behov av network-kit.
