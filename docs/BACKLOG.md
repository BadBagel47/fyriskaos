# Fyriskaos – backlog

ID: en löpande serie, B- bugg, F- funktion, D- planering/design. Prioritet: Hög, Medel, Låg.

## Öppet

| ID | Prio | Status | Beskrivning |
| --- | --- | --- | --- |
| F-002 | Hög | Öppen | Prototyp 1: gå, cykla och köra bil på mobilen (liggande läge) i en enkel grå testkarta. Joystick, smart knapp, broms. Ska även gå på dator. |
| D-007 | Hög | Öppen | Publicering: hur spelet når ut (förslag GitHub Pages från `main`). |
| D-003 | Medel | Öppen | Stilbibel: färgpalett, ljus och skuggor, linjetjocklek, perspektiv, storlekar, vad varje stadsdel innehåller. |
| F-004 | Medel | Öppen | Grafikgalleri: cykel, bil, ett hus och en gata på egna testsidor, godkänns innan de används. |
| F-005 | Medel | Öppen | Första riktiga området: centrum kring Fyrisån och Slottsbacken från OpenStreetMap, med vårdcentral, polis och ett första uppdrag. |
| D-009 | Medel | Öppen | Lagar och licenser: OpenStreetMap (ODbL, credits), parodier på Swish och Blocket (varumärken), villkor för ElevenLabs-röster, GDPR när två spelare går via network-kit, lagring i webbläsaren om rundor ska sparas (LEK 9 kap. 28 §). |
| F-006 | Låg | Öppen | Två spelare via network-kit, när solo fungerar. |
| D-008 | Låg | Öppen | Öppna frågor i designen: slutligt namn, spara en runda till en annan kväll, dag och natt från start, vilka stadsdelar i första versionen. |

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
  - Fråga C1: Vilka stadsdelar i första versionen? Rekommendation: bara centrum kring ån och Slottsbacken.
- **D** – standardmodell, medelnivå – Lagar och licenser
  - D-009 – Gå igenom punkterna och föreslå åtgärder (credits, omdöpta parodier, integritetstext).
- **E** – starkaste modellen, hög nivå – Två spelare – väntar på att solo fungerar
  - F-006 – Koppla in network-kit för co-op.

## Klart

| ID | Klart | Beskrivning |
| --- | --- | --- |
| D-001 | 2026-11-17 | Designdokumentet (`docs/design.md`). |
| D-002 | 2026-11-17 | Repot uppsatt enligt agentreglerna: AGENTS.md, överlämning och backlog. |
