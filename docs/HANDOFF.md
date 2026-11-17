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
- **Nätverk (2026-11-17, enligt designen):** två spelare bygger på `BadBagel47/network-kit`; en spelare är värd och kör simuleringen.

## Väntande anpassning

- **1.1** Gör "Arbetssätt för detaljrik grafik" (stilbibel först, agenten tittar på sina skärmdumpar, galleri, checklistor, varianter, oberoende granskare) och satirens gränser (aldrig riktiga politiker, partier eller personal; inga lån från GTA) till projektregler i `AGENTS.md`. Rekommendation: ja, så att varje agent följer dem utan att läsa hela designdokumentet.

## Nuläge (2026-11-17)

- Bara design finns. Ingen kod, ingen publicering.
- **Nästa:** körförslaget i `docs/BACKLOG.md` (först prototyp 1, styrningen på mobil).
- **Senaste:** repot uppsatt enligt agentreglerna, backlog och körförslag (2026-11-17) · designdokumentet (2026-11-17).

## Engångsåtgärder

- Väntar: tillåt overpass-api.de i molnmiljöns nätverk, så att agenten kan hämta Uppsalas karta från OpenStreetMap (behövs för F-005).

## Dokumentkarta

- `docs/design.md` – designdokumentet (D-001).
