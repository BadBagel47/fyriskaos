# Fyriskaos – backlog

Övriga designdelar finns kvar i `docs/design.md`; varje F/D här pekar på sitt avsnitt där.

ID: en löpande serie, B- bugg, F- funktion, D- planering/design. Prioritet: Hög, Medel, Låg.

## Öppet

| ID | Prio | Status | Beskrivning |
| --- | --- | --- | --- |
| F-005 | Medel | Öppen | Första riktiga området: centrum kring Fyrisån och Slottsbacken från OpenStreetMap, med vårdcentral, polis och ett första uppdrag. |
| F-010 | Medel | Öppen | Seed: hela staden utgår från ett startnummer, så att båda spelarna får exakt samma stad. |
| F-011 | Medel | Öppen | Död och vårdcentraler: återuppstå på en vårdcentral mot en kostnad, stjärnorna nollställs, kölapp med "Beräknad väntetid: 4 sek". I co-op ligger man först nere några sekunder och kan räddas. |
| F-012 | Medel | Öppen | Strid och pengar: siktet låser på närmaste fiende, skjutknapp; pengar går bara till vård och vapen. |
| F-013 | Medel | Öppen | Stadens generering: fast skelett från OpenStreetMap (ån, slottet, domkyrkan, centralen, stora vägar, stadsdelar) och genererade kvarter, vägarbeten, gängområden, NPC:er, fordon och uppdrag. |
| F-014 | Medel | Öppen | Levande stad nära spelarna: fotgängare, trafik i filer, trafikljus; resten av staden sover. |
| F-015 | Medel | Öppen | Polis och efterlysning i stjärnor: polisbilar, polishelikopter, till sist Hemvärnet med pansarvagn. |
| F-016 | Medel | Öppen | Grupperna: Vasagardet, Linnélärjungarna, Fornnördarna, Nationerna, Cykelstöldsligan och Bönderna, med tillhåll, boss och löjtnanter, aktiviteter i stan och relationer som ändras av vad spelarna gör. |
| F-017 | Medel | Öppen | Uppdragsgenerator: 1–4 steg, hinder och twist, co-op-roller; kommer via SMS, Swish-parodi och Blocket-parodi; klättrar uppåt i gängen till bossen. |
| F-020 | Medel | Öppen | Fordonen enligt designen (elsparkcykel, EPA-traktor, buss, traktor, helikoptrar, pansarvagn, halvfärdig spårvagn, sopbil, snöplog). Specialfordon bara via efterlysning, logiska platser eller uppdrag. Cykel och bil kommer i F-002. |
| F-022 | Medel | Öppen | Valborgsfinalen: forsränningen och sedan kung på täppan på Slottsbacken mot alla grupper; den som håller backen kröns till Slottsbackens kungar. |
| F-023 | Medel | Öppen | Vägvisning: en stor pil mot nästa mål. |
| F-028 | Medel | Öppen | Credits och licenser i spelet: "© OpenStreetMap contributors" med länk, PixiJS (MIT), senare röster. Bearbetade kartfiler läggs i en egen mapp med ODbL-licens (se `docs/legal.md`). |
| F-018 | Låg | Öppen | Uppsala-uppdrag: forsränning med sabotage, punschreceptet, nattmackor före sittningens slut, cykeljakter, traktorkaos, stjäla spårvagnen. |
| F-019 | Låg | Öppen | Platser med egna uppdrag: Slottsbacken (pulkajakt, kungakronan, klockan), Evolutionsmuseet (Benkuppen, Skelettfrakten), Botaniska trädgården (Näckroskuppen, Lagerträdsrånet). |
| F-021 | Låg | Öppen | Zonhändelser: snöoväder, översvämning, spontan studentfest, grävkaos, dinosaurieutbrott, tropisk afton. |
| F-024 | Låg | Öppen | Radio i fordon: satiriska kanaler med genererade jinglar, röster eventuellt från ElevenLabs. |
| F-025 | Låg | Öppen | Satirlistan: aktuella snackisar i en egen lista som är lätt att uppdatera; kontrollera deras status innan de byggs in. |
| F-026 | Låg | Öppen | Co-op-start av uppdrag: en begär, båda godkänner, kompisen teleporteras ("hämtad av färdtjänst"), inte mitt i en polisjakt. |
| F-027 | Låg | Öppen | Återanslutning: den som tappar nätet kommer tillbaka mitt i rundan. |
| D-041 | Hög | Pågår 2026-11-18 (session ccr-319e3a0a-gey2ih) | Detaljerna når inte upp till inspirationsbilderna (ägaren 2026-11-18: "Detaljerna kändes inte riktigt som i inspirationsbilderna"). Orsak: bilderna får sin detalj från målade eller fotografiska texturer och 3D-ljus, spelet ritar med enkla former (cirklar och rektanglar). Testa på en gatubit i galleriet, sida vid sida med nuvarande stil: (a) målade texturer och sprites, (b) brus och ljus i grafikkortet (shader med skuggor och ytstruktur), (c) en 3D-variant med riktigt ljus. Ägaren väljer innan något byggs om i spelet. |
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
- **A** – starkaste modellen, hög nivå – Detalj som i inspirationsbilderna
  - D-041 – Samma gatubit gjord på tre sätt (genererade bilder för träd, bilar och ytor; grafikkortsljus med ytstruktur och långa skuggor; 3D) bredvid nuvarande stil i galleriet, så att ägaren kan välja väg. Träd och bilar som bild 1, miljö och detaljtyper som bild 3.
- **B** – starkaste modellen, hög nivå – Första riktiga området – väntar på att kartdata går att hämta
  - F-005 – Bygg centrum kring Fyrisån och Slottsbacken med vårdcentral, polis och ett första uppdrag.
  - F-011 – Vårdcentralen och att återuppstå där.
  - F-023 – Pilen som visar vägen till uppdraget.
  - F-028 – Credits och licenser.
  - Fråga: Vilka stadsdelar i första versionen? Rekommendation: bara centrum kring ån och Slottsbacken.
- **C** – starkaste modellen, hög nivå – Två spelare – bygger på B
  - F-006 – Koppla in network-kit för co-op.
  - F-026 – Gemensam start av uppdrag med teleport.
  - F-027 – Återanslutning mitt i rundan.
  - F-035 – Integritetstext innan man går med i ett rum.

## Klart

| ID | Klart | Beskrivning |
| --- | --- | --- |
| D-001 | 2026-11-17 | Designdokumentet (`docs/design.md`). |
| F-033 | 2026-11-17 | Tre biltyper: småbil (cirka 70 km/h, svängig), vanlig bil (cirka 90 km/h) och sportbil (cirka 120 km/h, snabb från start, sällsynt). Namn och fart visas i hörnet (v0.2.0). |
| F-034 | 2026-11-17 | Handbromssväng: håll bromsen och dra åt sidan i fart, så sladdar bilen runt med däckspår och behåller farten (v0.2.0). |
| F-002 | 2026-11-17 | Prototyp 1: gå, cykla och köra bil i en grå teststad, med joystick, smart knapp och broms (v0.1.0). |
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
