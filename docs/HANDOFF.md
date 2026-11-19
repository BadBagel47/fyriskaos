# Fyriskaos – överlämning

Läs det här först, sedan `AGENTS.md` (hänvisning till agentreglerna) och `docs/BACKLOG.md`.

## Agentregler och inventering

- **Agentregler:** v1.14 (2026-11-18), https://raw.githubusercontent.com/BadBagel47/agent-rules/main/AGENTS.md . Repot har följt reglerna sedan 2026-11-17 (v1.11). v1.13–v1.14: oavslutad kod går till en arbetsgren, aldrig main; trasig sajt återställs med en revert-commit; webbprojekt läser också WEB.md (webbgrunder, kräver ägarens klartecken); gamla helt sammanslagna arbetsgrenar tas bort vid sessionsstart; installation och anpassning flyttade till SETUP.md.
- **Väntande anpassning (Pending adaptation):**
  - Punkt 1.1 – Webbgrunder enligt WEB.md: ingen blå markering vid tryck på mobilen, fokusram bara för tangentbord, egen tryckt-stil på knappar (spelet har inga rullgardinsmenyer). Rekommendation: ja. Väntar på ägarens svar.
- Inventory: 2026-11-17
  - Repot innehöll bara designdokumentet (`docs/design.md`, D-001) på `main`. Inga andra grenar, pull requests, issues eller äldre dokumentation.
  - Repot är publikt.
  - Känslig information: ingen. Hemligheter (t.ex. ElevenLabs-nyckel) får bara ligga som GitHub Secrets.
  - Lagar och licenser: se D-009 i backloggen.
- **Publicering:** GitHub Pages från `main` via `.github/workflows/pages.yml`: varje push till `main` kör testet (`npm test`, Playwright i Chromium) och publicerar bara om det går igenom. Adress: https://badbagel47.github.io/fyriskaos/ . Live sedan 2026-11-17 (ägaren slog på Pages; arbetsflödet kan inte göra det själv). Arbetsflödet kan också startas för hand.
- **Projektspråk:** svenska för allt spelaren ser och för README. Kod, kodkommentarer och commits på engelska.
- **Miljö (2026-11-17, molnsession hos Claude Code):** push fungerar; npm-registret nås. OpenStreetMap (overpass-api.de, tile.openstreetmap.org) blockeras av sessionens nätverksregler, så kartdata kan inte hämtas härifrån än (behövs för F-005). Chromium med Playwright finns för skärmdumpar.

## Beslut

- **Första området (2026-11-19, F-005, fråga Q1):** första versionen av den riktiga kartan blir bara centrum kring Fyrisån och Slottsbacken, förenklat och spelbart från OpenStreetMap. Landmärken (Domkyrkan, Slottet och Slottsbacken, Gunillaklockan, Fyrisån med broarna) får egna modeller. Stiltestets detaljnivå byggs direkt i den nya generatorn; teststaden putsas inte. En enda trädstil i hela staden. Sikten går först: det får aldrig vara svårt att se vart man kör.
- **Testwebbläsare (2026-11-19, B-053):** projektets testwebbläsare är Chrome på Android (ägarens Pixel 10 Pro). Brave stöds inte: där slutar 3D-grafiken fungera efter några blinkningar, också i Three.js egna exempel och med Shields av, medan Chrome kör stiltestet i 60 fps på Medel. Ingen felsökningssida och inget Brave-specifikt arbete.
- **Designdokument (2026-11-17, D-001):** ägarens design från Claude-chatten gäller, se `docs/design.md`.
- **Startinstruktioner (2026-11-17, issue #1):** ägarens instruktioner för första sessionen; innehållet finns här och i backloggen.
- **Språk (2026-11-17):** allt som syns i spelet är på svenska. Kod, kommentarer och commits på engelska. Chatten på svenska. Designdokumentet översätts inte.
- **Nätverk (2026-11-17):** två spelare bygger på `BadBagel47/network-kit` (se dess `docs/INTEGRATION.md`), men först när solo fungerar. En spelare är värd och kör simuleringen. Spelets behov är rapporterade i network-kit issue #1. Behov och frågor om network-kit tas till network-kit-agenten.
- **Grafik (2026-11-17):** arbetssättet för grafik i designdokumentet gäller från start; agenten tittar på sitt resultat med skärmdumpar innan den säger att den är klar. Skrivet som projektregel i `AGENTS.md`.
- **Touchstyrning (2026-11-19, B-054):** på touch åker bil och cykel åt det håll man drar på skärmen, som till fots; den klassiska styrningen (upp = gas, sidled = sväng) finns kvar som val under Inställningar och gäller alltid för tangentbordet. Ersätter F-040 för touch.
- **Biltyper och handbroms (2026-11-17, fråga A1 och A2):** tre biltyper: småbil (svängig, långsam), vanlig bil (cirka 90 km/h) och sportbil (cirka 120 km/h, sällsynt). Handbromssväng utan ny knapp: håll bromsen och dra åt sidan i fart.
- **Grafiken i spelet (2026-11-19, F-042, D-048, F-049, B-050):** stilen från stiltestet förs in i spelet nu (Sommarkväll+ och lutad kamera), och modellerna byts längs vägen. Fria modeller och kartdata hämtas via ett GitHub Actions-arbetsflöde i stället för molnmiljöns nätverk. Fps-mätaren finns kvar bakom en inställning. Prestanda mäts också under bilkörning.
- **Grafik steg 4 (2026-11-19, D-047):** lutade kameran är ett klart lyft och kvar som förval. Prestanda först: under 17 ms per bild med 4× strypning. Träd får byggas om själv om CC0-modeller inte duger.
- **Grafik steg 3 (2026-11-18, D-045):** stort lyft i steg 2, särskilt bilar, träd, ytor och kvällsljus. Ny förvald kamera: lätt lutad med fast vinkel cirka 30–40° från lodrätt; rakt ovanifrån finns kvar bakom en knapp. Staden står still, styrningen ändras inte. Målbilder ska vara i stil med ett påkostat mobilspel, inte fotorealism. Start under 6 s i det långsamma testet. Fasta granskningskriterier.
- **Grafik steg 2 (2026-11-18, D-044):** stiltestet är en bra grund men ser ut som en tidig prototyp. Målet är detaljnivån i D-041: träd och bilar som referensbild 1 (täta lövverk, bilar med glans), miljön som bild 3 (lådor, staket, lampor som lyser upp marken, långa skuggor, kontrast). Ljuset ska vara Sommarkväll+, inte middagssol. Three.js och mobilbudgeten gäller; tecknad low-poly är inget krav längre.
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

## Nuläge (2026-11-19)

Bara de senaste posterna; äldre finns i git-historiken.

- **v0.6.1, gång och riktning (B-058):** CC0-figurerna tittar åt +z i källfilen; `tools/convert_models.mjs` vred dem åt −x, så alla gick baklänges. Nu vrids de åt +x (spelets framåt). Spelaren och fotgängarna är en stående figur var (spelaren också sittande på cykeln) där omvandlingen märker varje hörn som vänster/höger arm eller ben (`rigCodes`, i normalens fjärde byte; armarna följs längs ytan ned till händerna). `src/game3d/walk.js` svänger lemmarna i vertex-shadern (också skuggan) med fas och mängd per figur, takten efter farten. Fotgängarna (`src/play.js`) har en önskad riktning längs trottoaren och svänger mot den med högst 2,2 rad/s och saktar in i svängen. Quaternius animerade figurer (FBX) gick inte att hämta: Google Drive spärrade nedladdningen två gånger; den egna gången räcker tills vidare. Test: `tests/facing.cjs` mäter framsidan ur formen (tårna, cykelns styre) och jämför med hur figurerna rör sig; det slår fel med den gamla vridningen. Skärmdumpar: `docs/screenshots/gang/README.md`.
- **v0.6.0, centrala Uppsala (F-005, B-055, B-056, D-057, F-011, F-023, F-028):** spelet utspelar sig i centrum kring Fyrisån och Slottsbacken. `tools/build_map.mjs` gör om OpenStreetMap-datan (`data/osm/`) till `data/map/centrum.json`: gatunätet vridet 43° så att gatorna går rakt i bild, marken i rutor om 1 m (gata, cykelbana, trottoar, plattor, gång, gräs, vatten, bro, hus), hus som rektanglar per OSM-byggnad, vägarnas mittlinjer, broar, träd, lyktor, bänkar, papperskorgar, cykelställ, parkerade bilar och platser (vårdcentraler, polisstation, Mackbaren, Punschbergs nation, slottsgården). `src/citymap.js` läser kartan till simuleringens format. `src/game3d/city.js` bygger staden i bitar om 64 m runt kameran medan man rör sig (vägarna ritas som släta band längs mittlinjerna ovanpå rutmarken); `landmarks.js` har Domkyrkan, Slottet, Gunillaklockan och skyltarna. `src/play.js` har pengar, stjärnor (högst tre), hälsa, vårdcentral med kölapp, polisbilar som letar sig fram längs gatorna (avståndsfält över rutmarken) och griper den som stannar, fotgängare, och uppdraget Nattmackorna (hämta på Mackbaren, leverera till Punschbergs nation, twist: sittningen flyttade till Slottet, varje krock tappar en macka, tidsgräns). Sikten: hus på kamerasidan klipps ner till bottenvåningen. Prestanda och skärmdumpar: `docs/screenshots/centrum/README.md`. Teststaden (`src/map.js`) används bara av körmodellens test.
- **v0.5.1, touchstyrning efter skärmriktning (B-054):** på touch åker bil och cykel åt det håll man drar joysticken (`screenControls` i `src/sim.js`): fordonet svänger mot riktningen med sin vanliga svängradie, mer gas ju längre man drar. Drar man bakåt (mer än cirka 115° från färdriktningen) bromsar man först; nästan stilla backar bilen om man drar rakt bakåt (mer än 135°), annars vänder den; cykeln vänder alltid. Släpper man rullar fordonet ut. Bromsknapp och handbromssväng som förut. Tangentbordet styr som förut (F-040). Under *Inställningar*: "Styrning: åt hållet du drar" (förval) eller "Klassisk"; `?styrning=klassisk` i adressen startar med den klassiska. Testat i Node (bil och cykel) och i Chromium med simulerade touchhändelser.
- **B-053:** om webbläsaren tappar 3D-grafiken (WebGL-kontexten förloras) slutar spelet och stiltestet rita, fps-mätaren döljs och ett meddelande på svenska säger att 3D-grafiken slutade fungera och att det kan hjälpa att prova en annan webbläsare, t.ex. Chrome. Om WebGL inte går att starta alls visas ett motsvarande meddelande (`src/glcheck.js`). Testat i molnet med WEBGL_lose_context och med WebGL avstängt.
- **v0.5.0, spelet i 3D (F-042, D-048, F-049, B-050):** spelet ritas nu med Three.js i Sommarkväll+ med den lutade kameran (33° från lodrätt, lång brännvidd 24°, följer spelaren och zoomar ut i fart). Staden byggs från samma karta som simuleringen (`src/game3d/city.js`): mark i 64 m-bitar (asfalt, plattor, gräs, kantsten, å, broar, vägmålning), hus med burspråk, takkupor, skorstenar, portar, butiker och fönster som instansade lådor i 32 m-celler, lyktor, bänkar och papperskorgar. Allt på kamerasidan om spelaren klipps bort ovanför siktlinjen (`src/game3d/cut.js`); träd och lyktor i vägen blir genomskinliga. Fordon, spelaren och däckspår i `entities.js`; kväll (F-039) med svagare sol, lyktsken, tända fönster och billjus. Inställningar i spelet: grafik (auto, låg, medel, hög) och fps-mätare (av som förval). CC0-modeller från Quaternius: nio träd, två cyklar och spelaren i fyra poser med frisyr (`models/`, gjorda med `tools/convert_models.mjs` och `tools/model_textures.py`); spelet startar med kodbyggda former och byter när modellerna har laddats. Kenney-paketen och fler Quaternius-modeller ligger i `assets/cc0/` men används inte än. Prestanda med 4× strypt processor medan bilen kör i 90 km/h genom staden: cirka 10–11 ms per bild i median, 9 av 10 under cirka 17–18 ms; cirka 135 anrop och 170 000 trianglar. Start på långsamt nät (1,6 Mbit/s) med 4× strypning: cirka 8 s till första bild. Skärmdumpar och mätningar: `docs/screenshots/spel/README.md`. 2D-ritningen (`src/render.js`, `src/ground.js`) används inte längre av spelet men finns kvar för galleriet.
- **Hämtning via GitHub Actions (F-049):** arbetsflödet *Fetch free models and map data* (`.github/workflows/fetch-assets.yml`, `tools/fetch_assets.py`) startas för hand och committar till grenen det körs på. Quaternius hämtas från Google Drive med gdown (Drive spärrar tillfälligt vid många nedladdningar i rad; skriptet hoppar över filer som redan finns och kan ta ett paket i taget, t.ex. `quaternius:backgroundposedhumans`), Kenney via sidans signerade nedladdningslänk, kartdata för centrala Uppsala och Luthagen via Overpass-spegeln `overpass.kumi.systems` (`overpass-api.de` svarar 406 till GitHub). Kartdatan (`data/osm/uppsala-centrum.json`, cirka 15 700 objekt, ODbL) är hämtad men teststaden bygger inte på den än (F-005).
- **B-050:** burspråken i stiltestet var sneda vid bildkanten. Den lutade kameran står nu längre bort med smalare bildvinkel (80 m i stället för 56 m), så husen lutar mindre, och burspråkens sidofönster är smalare så att de ryms. Samma i spelet.
- **Grafik steg 4 (D-047):** stiltestet fick lättare prylar, träd med stam och grenar, kantiga burspråk, fönstertyper per hus, klassiska lyktor och gyllene kvällsljus; 4–7 ms per bild med 4× strypning; granskarnas slutpoäng 7, 5, 5, 6, 6 (mål 8). Se `docs/screenshots/stiltest/README.md`.
- **Grafik steg 3 (D-045) och tidigare:** lutad kamera som förval, fasta granskningskriterier (`docs/screenshots/stiltest/kriterier.md`), stiltestet https://badbagel47.github.io/fyriskaos/stiltest.html , galleriet https://badbagel47.github.io/fyriskaos/gallery/ .
- **Teknik:** Three.js 0.187 (`vendor/three`). Spelet paketeras med esbuild till `app/game.js` (`npm run build` efter ändringar i `src/`), stiltestet till `stiltest/app.js` (`npm run build:stiltest`). Simuleringen (`src/sim.js`) är skild från ritningen och går i fasta steg. Kartan genereras från ett startnummer (`src/map.js`).
- **Testat:** `npm test` (körmodellen och hela spelet i en mobilvy i Chromium: gå, cykel, bil, sportbil, handbroms, broms, kliva ur, liggande läge, galleriet, stiltestet, tappad 3D-grafik, WebGL som inte startar, touchstyrning efter skärmriktning, uppdraget, polisen och vårdcentralen; att spelaren, fotgängarna och cykeln tittar åt rörelseriktningen) går igenom. Prestanda mätt i molnet med strypt processor; molnet har inget grafikkort, så fps där säger inget om en telefon.
- **Publicerat:** https://badbagel47.github.io/fyriskaos/ . **Inte verifierat:** ägaren har inte provat 3D-versionen på sin telefon.
- **Nästa:** ägaren provar centrum i mobilen (fps-mätaren under *Inställningar*); sedan körförslaget i `docs/BACKLOG.md`.

## Engångsåtgärder

- Klart (2026-11-17): GitHub Pages påslaget med källan GitHub Actions.
- **Klart (2026-11-19): fria modeller och kartdata hämtas via GitHub Actions** (F-049), så molnmiljöns nätverk behöver inte öppnas för Google Drive eller Kenney. Arbetsflödet startas under Actions, *Fetch free models and map data*, *Run workflow* (eller av agenten).
- **Klart (2026-11-19): nätverket öppnat för fria bibliotek och kartdata** (ägaren godkände kortet). Nåbara: Poly Haven, ambientCG, Quaternius webbplats, OpenStreetMap-adresserna. Kenney och Poly Pizza svarar 403 till molnet (webbplatsernas egen spärr), Quaternius paket ligger på Google Drive (inte öppnat), Poly Havens träd är för tunga för mobil. Kartdata: `overpass-api.de` och `download.geofabrik.de` står i listan men bryter själva anslutningen från molnet (kontrollerat 2026-11-19); en annan spegel eller en kartfil som laddas upp behövs för F-005. Ursprunglig instruktion, för historik: Molnmiljön (som heter *Default*) har begränsat nätverk, och de här adresserna blockeras i dag. Gör så här en gång:
  1. Öppna sessionen i Claude-appen eller på https://claude.ai/code och tryck på miljöns namn *Default* i sessionens titelrad, sedan **Edit** (redigera).
  2. Under **Network access**, låt nivån vara **Limited** och låt rutan för pakethanterare (*Allow package managers*) vara ikryssad.
  3. Lägg till var och en av adresserna nedan under **Allowed domains** (en per rad):
     - Kartdata: `overpass-api.de`, `download.geofabrik.de`
     - ambientCG (fria texturer): `ambientcg.com`, `acg-download.struffelproductions.com`
     - Poly Haven (fria texturer och modeller): `polyhaven.com`, `api.polyhaven.com`, `dl.polyhaven.org`, `cdn.polyhaven.com`
     - Kenney (fria modeller): `kenney.nl`
     - Quaternius (fria modeller): `quaternius.com`, `poly.pizza`, `static.poly.pizza`
  4. Spara. Ändringen gäller alla framtida sessioner i miljön *Default*.
  - Steg med bilder: https://code.claude.com/docs/en/cloud-environments#network-access
  - Säkerhet: det är läsåtkomst till öppna webbplatser; inga nycklar behövs. Quaternius delar ibland ut paket via andra värdar (t.ex. Google Drive); de läggs till först om de behövs.
  - Alternativ: agenten kan föreslå samma ändring själv, då får ägaren ett godkännandekort i appen i stället.

## Dokumentkarta

- `README.md` – kort om spelet och hur det körs lokalt.
- `docs/design.md` – designdokumentet (D-001).
- `docs/style-bible.md` – den tidigare 2D-stilbibeln (D-003), historik.
- `docs/STYLE.md` – stilbibel för 3D-grafiken (D-043).
- `CREDITS.md` – programvara och modeller med källa och licens.
- `docs/screenshots/stiltest/` – stiltestets skärmdumpar och mätningar.
- `docs/screenshots/spel/` – spelets skärmdumpar och mätningar i 3D (F-042).
- `assets/cc0/` – hämtade CC0-paket (Quaternius, Kenney) med licensfiler och listor; `models/` – de omgjorda modellerna som spelet laddar; `data/osm/` – kartdata (ODbL).
- `tools/` – hämtning (`fetch_assets.py`), omgörning av modeller (`convert_models.mjs`, `model_textures.py`) och kartbyggaren (`build_map.mjs`).
- `data/map/centrum.json` – spelkartan över centrum (ODbL, byggd från `data/osm/`); `docs/screenshots/centrum/` – skärmdumpar och mätningar från centrum.
- `docs/legal.md` – lagar och licenser (D-009).
- `docs/names.md` – namn på parodier, nationer och ordningsmakt (D-036).
- Issue #1 – ägarens startinstruktioner (stängd när innehållet flyttats hit).
- network-kit issue #1 – Fyriskaos behov av network-kit (i repot `BadBagel47/network-kit`).
