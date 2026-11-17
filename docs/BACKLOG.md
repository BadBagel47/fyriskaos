# Fyriskaos – backlog

Övriga designdelar finns kvar i `docs/design.md`; varje F/D här pekar på sitt avsnitt där.

ID: en löpande serie, B- bugg, F- funktion, D- planering/design. Prioritet: Hög, Medel, Låg.

## Öppet

| ID | Prio | Status | Beskrivning |
| --- | --- | --- | --- |
| F-002 | Hög | Pågår 2026-11-17 | Prototyp 1: gå, cykla och köra bil på mobilen (liggande läge) i en enkel grå testkarta. Joystick, smart knapp, broms. Ska även gå på dator. |
| D-007 | Hög | Pågår 2026-11-17 | Publicering: hur spelet når ut (förslag GitHub Pages från `main`). |
| D-003 | Medel | Öppen | Stilbibel: färgpalett, ljus och skuggor, linjetjocklek, perspektiv, storlekar, vad varje stadsdel innehåller. |
| F-004 | Medel | Öppen | Grafikgalleri: cykel, bil, ett hus och en gata på egna testsidor, godkänns innan de används. |
| F-005 | Medel | Öppen | Första riktiga området: centrum kring Fyrisån och Slottsbacken från OpenStreetMap, med vårdcentral, polis och ett första uppdrag. |
| D-009 | Medel | Öppen | Lagar och licenser: OpenStreetMap (ODbL, credits), parodier på Swish och Blocket (varumärken), villkor för ElevenLabs-röster, GDPR när två spelare går via network-kit, lagring i webbläsaren om rundor ska sparas (LEK 9 kap. 28 §). |
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
| F-028 | Medel | Öppen | Credits med "© OpenStreetMap contributors". |
| F-018 | Låg | Öppen | Uppsala-uppdrag: forsränning med sabotage, punschreceptet, nattmackor före sittningens slut, cykeljakter, traktorkaos, stjäla spårvagnen. |
| F-019 | Låg | Öppen | Platser med egna uppdrag: Slottsbacken (pulkajakt, kungakronan, klockan), Evolutionsmuseet (Benkuppen, Skelettfrakten), Botaniska trädgården (Näckroskuppen, Lagerträdsrånet). |
| F-021 | Låg | Öppen | Zonhändelser: snöoväder, översvämning, spontan studentfest, grävkaos, dinosaurieutbrott, tropisk afton. |
| F-024 | Låg | Öppen | Radio i fordon: satiriska kanaler med genererade jinglar, röster eventuellt från ElevenLabs. |
| F-025 | Låg | Öppen | Satirlistan: aktuella snackisar i en egen lista som är lätt att uppdatera; kontrollera deras status innan de byggs in. |
| F-026 | Låg | Öppen | Co-op-start av uppdrag: en begär, båda godkänner, kompisen teleporteras ("hämtad av färdtjänst"), inte mitt i en polisjakt. |
| F-027 | Låg | Öppen | Återanslutning: den som tappar nätet kommer tillbaka mitt i rundan. |
| F-006 | Låg | Öppen | Två spelare via network-kit, när solo fungerar. |
| D-008 | Låg | Öppen | Öppna frågor i designen: slutligt namn, spara en runda till en annan kväll, dag och natt från start, vilka stadsdelar i första versionen. |

## Parkerat

| ID | Status | Beskrivning |
| --- | --- | --- |
| F-029 | Parkerad | Versus-läge. |
| F-030 | Parkerad | Ljuddämpare och smygande. |
| F-031 | Parkerad | Fler städer, till exempel Stockholm. |
| F-032 | Parkerad | Köpa gömställe eller garage. |

## Körförslag

- **A** – starkaste modellen, hög nivå – Prototyp 1 och publicering
  - F-002 – Bygg styrningen (gå, cykel, bil) i en grå testkarta, så att den kan provas på mobilen.
  - D-007 – Sätt upp publicering så att varje version går att öppna med en länk.
  - Fråga A1: Hur ska spelet publiceras? Rekommendation: GitHub Pages från `main` (gratis, repot är publikt).
  - Fråga A2: Grafikmotor? Rekommendation: PixiJS (WebGL, klarar många figurer på mobil, fri licens), utan byggsteg.
- **B** – starkaste modellen, hög nivå – Stilbibel och galleri
  - D-003 – Ta fram stilbibeln med 2–3 varianter att välja mellan.
  - F-004 – Gör cykel, bil, hus och gata på testsidor för godkännande.
  - Fråga B1: Egna foton från Uppsala som referens? Rekommendation: börja utan, lägg till foton när de finns.
- **C** – starkaste modellen, hög nivå – Första riktiga området – väntar på B och på att kartdata går att hämta
  - F-005 – Bygg centrum kring Fyrisån och Slottsbacken med vårdcentral, polis och ett första uppdrag.
  - F-011 – Vårdcentralen och att återuppstå där.
  - F-023 – Pilen som visar vägen till uppdraget.
  - F-028 – Credits till OpenStreetMap.
  - Fråga C1: Vilka stadsdelar i första versionen? Rekommendation: bara centrum kring ån och Slottsbacken.
- **D** – standardmodell, medelnivå – Lagar och licenser
  - D-009 – Gå igenom punkterna och föreslå åtgärder (credits, omdöpta parodier, integritetstext).
- **E** – starkaste modellen, hög nivå – Två spelare – väntar på att solo fungerar
  - F-006 – Koppla in network-kit för co-op.
  - F-026 – Gemensam start av uppdrag med teleport.
  - F-027 – Återanslutning mitt i rundan.

## Klart

| ID | Klart | Beskrivning |
| --- | --- | --- |
| D-001 | 2026-11-17 | Designdokumentet (`docs/design.md`). |
| D-002 | 2026-11-17 | Repot uppsatt enligt agentreglerna och issue #1: AGENTS.md, överlämning och backlog med designens innehåll. |
