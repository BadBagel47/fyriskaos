# Fyriskaos – överlämning

Läs det här först, sedan `AGENTS.md` (hänvisning till agentreglerna) och `docs/BACKLOG.md`.

## Agentregler och inventering

- **Agentregler:** v1.12 (2026-11-17), https://raw.githubusercontent.com/BadBagel47/agent-rules/main/AGENTS.md . Repot har följt reglerna sedan 2026-11-17 (v1.11). v1.12: körförslaget börjar med vad ordningen bygger på, visar beroenden ("bygger på A") och sparar frågor utan etiketter; Pågår-märken anger gren eller session.
- Inventory: 2026-11-17
  - Repot innehöll bara designdokumentet (`docs/design.md`, D-001) på `main`. Inga andra grenar, pull requests, issues eller äldre dokumentation.
  - Repot är publikt.
  - Känslig information: ingen. Hemligheter (t.ex. ElevenLabs-nyckel) får bara ligga som GitHub Secrets.
  - Lagar och licenser: se D-009 i backloggen.
- **Publicering:** GitHub Pages från `main` via `.github/workflows/pages.yml`: varje push till `main` kör testet (`npm test`, Playwright i Chromium) och publicerar bara om det går igenom. Adress: https://badbagel47.github.io/fyriskaos/ . Live sedan 2026-11-17 (ägaren slog på Pages; arbetsflödet kan inte göra det själv). Arbetsflödet kan också startas för hand.
- **Projektspråk:** svenska för allt spelaren ser och för README. Kod, kodkommentarer och commits på engelska.
- **Miljö (2026-11-17, molnsession hos Claude Code):** push fungerar; npm-registret nås. OpenStreetMap (overpass-api.de, tile.openstreetmap.org) blockeras av sessionens nätverksregler, så kartdata kan inte hämtas härifrån än (behövs för F-005). Chromium med Playwright finns för skärmdumpar.

## Beslut

- **Designdokument (2026-11-17, D-001):** ägarens design från Claude-chatten gäller, se `docs/design.md`.
- **Startinstruktioner (2026-11-17, issue #1):** ägarens instruktioner för första sessionen; innehållet finns här och i backloggen.
- **Språk (2026-11-17):** allt som syns i spelet är på svenska. Kod, kommentarer och commits på engelska. Chatten på svenska. Designdokumentet översätts inte.
- **Nätverk (2026-11-17):** två spelare bygger på `BadBagel47/network-kit` (se dess `docs/INTEGRATION.md`), men först när solo fungerar. En spelare är värd och kör simuleringen. Spelets behov är rapporterade i network-kit issue #1. Behov och frågor om network-kit tas till network-kit-agenten.
- **Grafik (2026-11-17):** arbetssättet för grafik i designdokumentet gäller från start; agenten tittar på sitt resultat med skärmdumpar innan den säger att den är klar. Skrivet som projektregel i `AGENTS.md`.
- **Biltyper och handbroms (2026-11-17, fråga A1 och A2):** tre biltyper: småbil (svängig, långsam), vanlig bil (cirka 90 km/h) och sportbil (cirka 120 km/h, sällsynt). Handbromssväng utan ny knapp: håll bromsen och dra åt sidan i fart.
- **Grafikteknik (2026-11-18, D-043):** top-down, tecknad, hus som lutar lite utåt från kameran. Three.js (WebGL) med enkel low-poly 3D, perspektivkamera rakt ovanifrån, toon-skuggning, konturlinjer, begränsad palett. All grafik byggs med kod eller CC0-modeller (t.ex. Kenney, Quaternius) med källa och licens i credits. Mobilkrav från start: mål 60 fps på mellanklass-Android, aldrig under 30. Ersätter vägvalet i D-041.
- **Detaljnivå (2026-11-18, D-041, Q7–Q8):** träd och bilar som i referensbild 1 (fotolika, täta lövverk, bilar med glans), miljöns känsla och typer av detaljer som i bild 3 (lådor, staket, lampor som lyser upp marken, långa skuggor, kontrast). Bild 2 är för detaljrik att efterlikna fullt ut. Ytorna, grönskan, ljuset och skuggorna ska alla förbättras. Bildgeneratorn i ElevenLabs-kopplingen får användas för test.
- **Styrning (2026-11-18, F-040):** för bil och cykel är joysticken upp = gas framåt, ned = broms och back, åt sidan = sväng. Till fots går man åt det håll man drar. Kameran vrider sig inte; staden står still.
- **Dag och kväll (2026-11-18, F-039, D-008):** dag och kväll från start, eftersom ljuset redan finns; mörk natt senare.
- **Stil (2026-11-17):** ägaren valde förslaget Sommarkväll+ (variant 1 med mer detalj, ljus och explosioner). Stilbibeln är låst på den.
- **Namn (2026-11-17, Q3–Q5, rekommendationerna godkända):** påhittade namn som anspelar på Swish och Blocket, med egna loggor; påhittade nationsnamn i stället för de riktiga; ett påhittat namn och emblem i stället för Hemvärnet; polisen heter POLIS men utan polisens riktiga emblem. Namnen i `docs/names.md` (D-036).
- **Stilval (2026-11-17):** ägaren gillar variant 1 – Sommarkväll bäst; den är grunden. Ägaren vill skicka bilder på stilar att inspireras av och få ett förslag som jämförs med variant 1 (D-038) innan stilen låses.
- **Referensbilder (2026-11-17, Q1):** stilbibeln börjar utan egna foton; ägarens foton från Uppsala läggs till när de finns.
- **Satirens gränser (2026-11-17, punkt 1.1):** projektregel i `AGENTS.md`.
- **Publicering och motor (2026-11-17, fråga A1 och A2):** GitHub Pages från `main`; PixiJS utan byggsteg.
- **Första körningen (2026-11-17):** prototyp 1 (gå, cykla, köra bil i en grå testkarta), plus publicering så att ägaren kan prova på telefonen efter varje körning. Ingen kod förrän ägaren säger kör.

## Nuläge (2026-11-18)

- **Detaljtest (D-041):** i galleriet finns samma gata på fem sätt, dag och kväll: nuvarande stil, A genererade bilder (`gallery/assets/`, gjorda med ElevenLabs bildgenerator, cirka 800 krediter), B ljus och skuggor i 2D (`gallery/detail-test.js`), C 3D med three.js (`gallery/three-scene.js`, `vendor/three`, bara i galleriet) och A + B. En oberoende granskare rankade A + B högst och avråder från 3D för telefoner. Väntar på ägarens val; nästa steg F-042.
- **v0.4.0 (F-040, F-039):** bil och cykel styrs med upp = framåt, ned = broms och back, sidled = sväng (`drive` i `src/sim.js`); till fots som förut. Dag och kväll följer spelklockan (`src/daylight.js`, tio minuter per varv); på kvällen läggs en blå slöja över staden och ljus ovanpå (gatlyktor, strålkastare, bakljus, cykellampa), fönstren lyser varmt och marken ritas om utan solskuggor. Lägg `?kvall` i adressen för att börja på kvällen.
- **v0.3.0 (F-037):** spelet ritas i Sommarkväll+. Marken (gator, plattor, gräs, vatten, skuggor, bänkar, papperskorgar) ritas en gång per 32 × 32 m och sparas som bild (`src/ground.js`); hus har lutande väggar med fönster och förbakade tak; gatlyktor och trädkronor lutar; fordon och folk använder galleriets ritkod. Lyktor, papperskorgar och bänkar är hinder. Kartan har fått husutseende, lyktor och möbler (`src/map.js`). Mätt i en simulerad långsam telefon: ritningen tar några millisekunder per bild, med en kort topp när en ny markbit ritas. Inte provat på ägarens telefon.
- **Stilförslag Sommarkväll+ (D-038):** överst i galleriet bredvid variant 1: gata på dagen och på kvällen med ljus, park med grönska, explosion i tre steg och mynningsflamma. Koden i `src/art/detail.js`, `light.js` och `fx.js`. Granskat av en oberoende granskare; de viktigaste fynden rättade. Väntar på ägarens val.
- **Namn (D-036):** `docs/names.md`.
- **Grafik (D-003, F-004):** stilbibeln (`docs/style-bible.md`) och ett galleri med tre stilvarianter av gata, fordon och folk samt hus: https://badbagel47.github.io/fyriskaos/gallery/ . Ritkoden ligger i `src/art/` och används ännu inte i spelet (F-037, efter ägarens val). En oberoende granskare bedömde bilderna; dess fynd är rättade och den rekommenderar variant 1.
- **Lagar och licenser (D-009):** genomgång i `docs/legal.md`; åtgärder i F-028, F-035 och D-036.
- **v0.2.0 (F-033, F-034):** tre biltyper med olika fart och känsla (värdena i `src/config.js`), och handbromssväng: bromsa och dra åt sidan i över cirka 20 km/h, så släpper bakhjulen, bilen svänger snabbare och en del av sladden blir fart framåt igen. Däckspår syns där bilar sladdar. En sportbil står på andra sidan gatan vid start.
- **v0.1.0, prototyp 1 (F-002):** en grå teststad (rutnät, å med tre broar, park) där man kan gå, ta en cykel och köra bil. Styrning: flytande joystick på vänstra halvan, en smart knapp (Ta cykeln, Kliv in, Kliv ur, Kliv av) och en bromsknapp. Fordonet svänger mot joystickens riktning och gasar själv; dra bakåt när du står still för att backa. Man ramlar av cykeln vid krock. På dator: piltangenter/WASD, E och mellanslag.
- **Teknik:** PixiJS 8 (kopia i `vendor/pixi`), inga byggsteg. Simuleringen (`src/sim.js`) är skild från ritningen och går i fasta steg, så att den senare kan köras hos värden i co-op. Kartan genereras från ett startnummer (`src/map.js`).
- **Testat:** `npm test` kör `tests/driving.mjs` (fart per biltyp, handbromssväng jämfört med vanlig sväng) och `tests/smoke.cjs` (sidan i en mobilvy: joystick, cykel, bil, sportbil, handbroms, broms, kliva ur, tipset om liggande läge). Skärmdumparna är granskade av agenten.
- **Publicerat:** https://badbagel47.github.io/fyriskaos/ , kontrollerat av agenten i en mobilvy. **Inte verifierat:** ägaren har inte provat på sin telefon.
- **Nästa:** ägaren provar styrningen; sedan körförslaget i `docs/BACKLOG.md`.
- **Senaste:** detaljtest på fem sätt (2026-11-18) · styrning upp = framåt och dag och kväll, v0.4.0 (2026-11-18) · Sommarkväll+ i spelet, v0.3.0 (2026-11-17) · stilförslag Sommarkväll+ och namn (2026-11-17) · stilbibel, galleri och lagar och licenser (2026-11-17) · biltyper och handbroms, v0.2.0 (2026-11-17) · prototyp 1 och publicering (2026-11-17) · repot uppsatt enligt agentreglerna (2026-11-17) · designdokumentet (2026-11-17).

## Engångsåtgärder

- Klart (2026-11-17): GitHub Pages påslaget med källan GitHub Actions.
- Väntar: tillåt overpass-api.de i molnmiljöns nätverk, så att agenten kan hämta Uppsalas karta från OpenStreetMap (behövs för F-005).

## Dokumentkarta

- `README.md` – kort om spelet och hur det körs lokalt.
- `docs/design.md` – designdokumentet (D-001).
- `docs/style-bible.md` – stilbibeln (D-003).
- `docs/legal.md` – lagar och licenser (D-009).
- `docs/names.md` – namn på parodier, nationer och ordningsmakt (D-036).
- Issue #1 – ägarens startinstruktioner (stängd när innehållet flyttats hit).
- network-kit issue #1 – Fyriskaos behov av network-kit (i repot `BadBagel47/network-kit`).
