# Fyriskaos – backlog

Övriga designdelar finns kvar i `docs/design.md`; varje F/D här pekar på sitt avsnitt där.

ID: en löpande serie, B- bugg, F- funktion, D- planering/design. Prioritet: Hög, Medel, Låg.

## Öppet

| ID | Prio | Status | Beskrivning |
| --- | --- | --- | --- |
| B-058 | Hög | Pågår 2026-11-19 (session ccr-319e3a0a-gey2ih) | Fotgängarna går baklänges och spelarens figur ser ryckig ut. Rätta vridningen så att spelaren, fotgängarna och spelaren på cykeln tittar åt det håll de rör sig; byt posebytet mot en mjuk gånganimation vars takt följer farten (animerade CC0-figurer från Quaternius); fotgängarna svänger lugnt längs trottoarerna; ett automatiskt test kontrollerar att framsidan pekar åt rörelseriktningen. Gå igenom vridningen för cyklar, träd och andra modeller. |
| F-051 | Medel | Öppen | Snabbare start på långsamt mobilnät: i dag cirka 9 s med centrum och 4× strypt processor (mål under 6 s). Förslag: tätare modellfiler, bygga staden i bitar efter första bilden. |
| D-052 | Låg | Öppen | Fler CC0-modeller i spelet: fler bilar från Quaternius eller Kenney (finns i `assets/cc0/`) och buskar. |
| F-010 | Medel | Öppen | Seed: hela staden utgår från ett startnummer, så att båda spelarna får exakt samma stad. |
| F-012 | Medel | Öppen | Strid och pengar: siktet låser på närmaste fiende, skjutknapp; pengar går bara till vård och vapen. |
| F-013 | Medel | Öppen | Stadens generering: fast skelett från OpenStreetMap (ån, slottet, domkyrkan, centralen, stora vägar, stadsdelar) och genererade kvarter, vägarbeten, gängområden, NPC:er, fordon och uppdrag. |
| F-014 | Medel | Öppen | Levande stad nära spelarna: fotgängare, trafik i filer, trafikljus; resten av staden sover. |
| F-015 | Medel | Öppen | Polis och efterlysning i stjärnor: polisbilar, polishelikopter, till sist Hemvärnet med pansarvagn. |
| F-016 | Medel | Öppen | Grupperna: Vasagardet, Linnélärjungarna, Fornnördarna, Nationerna, Cykelstöldsligan och Bönderna, med tillhåll, boss och löjtnanter, aktiviteter i stan och relationer som ändras av vad spelarna gör. |
| F-017 | Medel | Öppen | Uppdragsgenerator: 1–4 steg, hinder och twist, co-op-roller; kommer via SMS, Swish-parodi och Blocket-parodi; klättrar uppåt i gängen till bossen. |
| F-020 | Medel | Öppen | Fordonen enligt designen (elsparkcykel, EPA-traktor, buss, traktor, helikoptrar, pansarvagn, halvfärdig spårvagn, sopbil, snöplog). Specialfordon bara via efterlysning, logiska platser eller uppdrag. Cykel och bil kommer i F-002. |
| F-022 | Medel | Öppen | Valborgsfinalen: forsränningen och sedan kung på täppan på Slottsbacken mot alla grupper; den som håller backen kröns till Slottsbackens kungar. |
| F-018 | Låg | Öppen | Uppsala-uppdrag: forsränning med sabotage, punschreceptet, nattmackor före sittningens slut, cykeljakter, traktorkaos, stjäla spårvagnen. |
| F-019 | Låg | Öppen | Platser med egna uppdrag: Slottsbacken (pulkajakt, kungakronan, klockan), Evolutionsmuseet (Benkuppen, Skelettfrakten), Botaniska trädgården (Näckroskuppen, Lagerträdsrånet). |
| F-021 | Låg | Öppen | Zonhändelser: snöoväder, översvämning, spontan studentfest, grävkaos, dinosaurieutbrott, tropisk afton. |
| F-024 | Låg | Öppen | Radio i fordon: satiriska kanaler med genererade jinglar, röster eventuellt från ElevenLabs. |
| F-025 | Låg | Öppen | Satirlistan: aktuella snackisar i en egen lista som är lätt att uppdatera; kontrollera deras status innan de byggs in. |
| F-026 | Låg | Öppen | Co-op-start av uppdrag: en begär, båda godkänner, kompisen teleporteras ("hämtad av färdtjänst"), inte mitt i en polisjakt. |
| F-027 | Låg | Öppen | Återanslutning: den som tappar nätet kommer tillbaka mitt i rundan. |
| F-035 | Låg | Öppen | Integritetstext innan man skapar eller går med i ett rum: vad som sparas, var och hur länge; nämn lagring av sparade rundor (`docs/legal.md` punkt 6–7). |
| F-006 | Låg | Öppen | Två spelare via network-kit, när solo fungerar. |
| D-008 | Låg | Öppen | Öppna frågor i designen: slutligt namn, spara en runda till en annan kväll, vilka stadsdelar i första versionen. (Dag och kväll: besvarat 2026-11-18, se Beslut.) |

## Parkerat

| ID | Status | Beskrivning |
| --- | --- | --- |
| F-029 | Parkerad | Versus-läge. |
| F-030 | Parkerad | Ljuddämpare och smygande. |
| F-031 | Parkerad | Fler städer, till exempel Stockholm. |
| F-032 | Parkerad | Köpa gömställe eller garage. |

## Körförslag

Ögonblicksbild; varje agent bygger sitt eget förslag från backloggen.

- Prioriterat för: ägarens önskemål först, sedan designdokumentets plan.
- **A** – starkaste modellen, medel nivå – Snabbare start och fler modeller
  - F-051 – Starten under 6 s på långsamt mobilnät (i dag cirka 9 s med centrum).
  - D-052 – Fler bilar och buskar från CC0-paketen.
- **B** – starkaste modellen, hög nivå – Levande stad och fler uppdrag
  - F-014 – Trafik i filer och trafikljus.
  - F-017 – Uppdragsgenerator med 1–4 steg och twist, med riktiga platser.
- **C** – starkaste modellen, hög nivå – Två spelare
  - F-006, F-026, F-027, F-035 – co-op via network-kit, gemensam uppdragsstart, återanslutning, integritetstext.

## Klart

| ID | Klart | Beskrivning |
| --- | --- | --- |
| F-005 | 2026-11-19 | Första riktiga området (v0.6.0): centrala Uppsala kring Fyrisån och Slottsbacken från OpenStreetMap (`tools/build_map.mjs` → `data/map/centrum.json`), förenklat och spelbart, gatunätet vridet så att gatorna går rakt i bild. Landmärken som egna modeller: Domkyrkan, Slottet, Gunillaklockan; Fyrisån med broar och räcken. Polis (tre polisbilar som jagar längs gatorna när man är efterlyst, griper den som stannar) och ett första uppdrag (Nattmackorna, med twist). |
| B-055 | 2026-11-19 | Sikten: hus på kamerasidan om spelaren klipps ner till bottenvåningen, också i fart; träd och lyktor i vägen blir genomskinliga; kameran ser längre framåt i färdriktningen. |
| D-057 | 2026-11-19 | Stiltestets detaljnivå i den nya generatorn: röda cykelbanor, häckar och räcken, blomlådor och markiser vid butiker, cykelställ med cyklar, cirka 580 parkerade bilar, skyltar, fotgängare (CC0-personer med olika tröjor), stiltestets bilar för alla bilar, en trädstil. |
| B-056 | 2026-11-19 | Spelaren är större och har en pulserande ring och en markering över huvudet; cyklarna är stiltestets tydliga stadscykel i stället för de tunna CC0-cyklarna. |
| F-011 | 2026-11-19 | Vårdcentraler: hälsa som sjunker vid påkörning och krockar; vid döden vaknar man på närmaste vårdcentral mot 100 kr, stjärnorna nollställs, kölapp "Beräknad väntetid: 4 sek". |
| F-023 | 2026-11-19 | Vägvisning: en stor pil vid spelaren pekar mot målet, en ljuspelare vid målet och avståndet i uppdragsrutan. |
| F-028 | 2026-11-19 | Credits i spelet (Inställningar, Credits): "© OpenStreetMap contributors" med länk, modeller, Three.js, texturer. |
| B-054 | 2026-11-19 | Touchstyrning efter skärmriktning (ersätter F-040 för touch, v0.5.1): bil och cykel åker åt det håll man drar, svänger dit med naturlig radie, mer gas ju längre man drar; drar man bakåt bromsar man först, sedan backar bilen (rakt bakåt) eller vänder (snett bakåt; cykeln vänder alltid); släpper man rullar fordonet ut. Bromsknapp och handbromssväng som förut, tangentbordet oförändrat. Val under Inställningar: "Styrning: åt hållet du drar" (förval) eller "Klassisk" (`?styrning=klassisk` i adressen). Testat med simulerad touch: fyra riktningar, U-sväng, inbromsning och backning. |
| B-053 | 2026-11-19 | När 3D-grafiken förloras (webglcontextlost) eller inte går att starta slutar spelet och stiltestet rita och visar på svenska att man kan prova en annan webbläsare, t.ex. Chrome. Testat med WEBGL_lose_context. |
| F-042 | 2026-11-19 | Spelet ritas i 3D i Sommarkväll+ med den lutade kameran (v0.5.0): staden från kartan i bitar, bortklippning av det som skymmer spelaren, kväll, inställningar för grafik och fps-mätare. Med 4× strypning medan bilen kör: cirka 11 ms per bild i median. |
| D-048 | 2026-11-19 | CC0-modeller från Quaternius i spelet: nio olika träd (två sorters lövträd med lövbilder, björkar, lågpolyträd), två cyklar och spelaren i fyra poser. |
| F-049 | 2026-11-19 | Arbetsflöde som hämtar Quaternius (Google Drive), Kenney och OpenStreetMap-data för Uppsala via GitHub Actions; källor och licenser i CREDITS.md, OSM-krediten i spelets inställningar. |
| B-050 | 2026-11-19 | Raka burspråk i stiltestet: längre kameraavstånd med smalare bildvinkel och smalare sidofönster. |
| D-047 | 2026-11-19 | Grafik steg 4 i stiltestet: processortiden under 17 ms med 4× strypning (median 4–7 ms), träd med stam och grenar, hus med kantiga burspråk, fönstertyper per hus, klassiska lyktor, gröna häckar och mer gyllene kvällsljus. Granskarna gav till sist 7, 5, 5, 6 och 6 poäng; målet 8 nåddes inte. |
| D-046 | 2026-11-19 | Prestanda i stiltestet: ingår i D-047. |
| D-045 | 2026-11-19 | Grafik steg 3: lutad kamera som förval, detaljerade prylar, 3D-bilar och 3D-träd, fasta granskningskriterier. |
| D-044 | 2026-11-18 | Grafik steg 2: läget Sommarkväll+ i stiltestet, byggt mot en genererad målbild. |
| D-043 | 2026-11-18 | Grafik steg 1: stiltest med Three.js i tre varianter (`stiltest.html`), stilbibel `docs/STYLE.md`. |
| D-001 | 2026-11-17 | Designdokumentet (`docs/design.md`). |
| F-033 | 2026-11-17 | Tre biltyper: småbil (cirka 70 km/h, svängig), vanlig bil (cirka 90 km/h) och sportbil (cirka 120 km/h, snabb från start, sällsynt). Namn och fart visas i hörnet (v0.2.0). |
| F-034 | 2026-11-17 | Handbromssväng: håll bromsen och dra åt sidan i fart, så sladdar bilen runt med däckspår och behåller farten (v0.2.0). |
| F-002 | 2026-11-17 | Prototyp 1: gå, cykla och köra bil i en grå teststad, med joystick, smart knapp och broms (v0.1.0). |
| D-041 | 2026-11-18 | Detaljtest på fem sätt i galleriet; ägaren valde därefter en ny väg: low-poly 3D med Three.js i tecknad stil (D-043). |
| F-040 | 2026-11-18 | Styrning för bil och cykel: upp gasar framåt, ned bromsar och backar, åt sidan svänger; handbroms = broms plus sväng i fart (v0.4.0). |
| F-039 | 2026-11-18 | Dag och kväll: var tionde minut blir det kväll i fyra minuter, med gatlyktor, upplysta fönster, strålkastare, bakljus och cykellampa; solens skuggor bleknar (v0.4.0). `?kvall` i adressen startar på kvällen. |
| F-037 | 2026-11-17 | Spelet ritas i Sommarkväll+: texturerad mark i förbakade bitar, hus med fönster och tak, gatlyktor, bänkar och papperskorgar, träd av lövklungor, fordon och folk från galleriet (v0.3.0). |
| D-038 | 2026-11-17 | Stilförslaget Sommarkväll+ (detalj, kvällsljus, explosion, mynningsflamma); valt av ägaren. |
| F-004 | 2026-11-17 | Grafikgalleri med varianter, kvarstår som testsida: https://badbagel47.github.io/fyriskaos/gallery/ |
| D-003 | 2026-11-17 | Stilbibel, låst på Sommarkväll+ (`docs/style-bible.md`). |
| D-036 | 2026-11-17 | Påhittade namn: Swosh, Plocket, sex påhittade nationer, Bygdeförsvaret, Polis utan riktigt emblem (`docs/names.md`). |
| D-009 | 2026-11-17 | Lagar och licenser genomgångna: `docs/legal.md`. Åtgärder i F-028, F-035 och D-036. |
| D-007 | 2026-11-17 | Publicering: GitHub Pages från `main` efter att testet gått igenom. Live och kontrollerad. |
| D-002 | 2026-11-17 | Repot uppsatt enligt agentreglerna och issue #1: AGENTS.md, överlämning och backlog med designens innehåll. |
