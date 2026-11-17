# Fyriskaos – stilbibel (D-003)

Låst 2026-11-17 på **Sommarkväll+** (ägarens val). Galleriet: https://badbagel47.github.io/fyriskaos/gallery/ . Spelet använder `PLUS_STYLE` i `src/art/styles.js`.

Ritkoden finns i `src/art/` (`styles.js` för varianterna, `draw.js` för själva ritandet). Varianterna skiljer sig bara i siffror och färger, så den valda kan flyttas in i spelet utan att ritas om.

## Perspektiv och ljus

- **Rakt uppifrån**, med höga saker som lutar bort från mitten av skärmen: lutning 0,009 per meter höjd och meter från kameran (samma som spelet). Väggar syns på den sida av huset som vetter mot kameran.
- **Solen står i nordväst.** Skuggor faller snett nedåt höger (sydost, 45°) på marken, alltid i världens riktning, även när en bil eller cykel är vriden. Skuggans längd följer höjden: samma längd per meter för hus, träd och stolpar.
- **Ljusa och mörka sidor:** norr- och västsidor är något ljusare, söder- och östsidor något mörkare. Takfall åt nordväst är ljusare än takfall åt sydost.
- **Stolpar** (lyktor, skyltar) kastar en smal streckskugga, inte en fläck.

## Storlekar (meter)

| Sak | Mått |
| --- | --- |
| Fotgängare | cirka 0,4 × 0,7 (axlar) |
| Cykel | 1,8 lång |
| Småbil / bil / sportbil | 3,6 × 1,7 / 4,4 × 1,9 / 4,5 × 1,95 |
| Gata | 12 (två körfält à 6, generöst för att det ska gå att köra fort) |
| Trottoar | 3 (plattor 1 × 1, förskjutna) |
| Cykelbana | cirka 1,6, rödaktig, med målad cykelsymbol |
| Våningshöjd | 3 |
| Hus | 8–20 höga; fönster cirka var tredje meter |

## Färger

- **Fasader (Uppsala):** ockra, ljusgult, laxrött, vitputs, rött tegel, blekgrönt.
- **Tak:** tegelrött, ärggrönt (som domkyrkans spiror), skiffergrått, mörkt tegel. Platta tak är grå med grus, ventiler och fläktboxar.
- **Spelaren:** orange tröja i full färg i alla varianter och en ljus ring runt sig, så att man alltid hittar sig själv. Människor får tunnare kontur än hus och fordon, så att de inte blir svarta klumpar.
- Varje variant justerar mättnaden (se nedan) men behåller samma grundfärger.

## Vad varje stadsdel ska innehålla (förslag, från designen)

| Stadsdel | Innehåll |
| --- | --- |
| Studentkvarter med nationer | Stora gula och vita nationshus med sadeltak, gårdar med långbord, cykelställ fulla av cyklar, affischer |
| Gamla stan kring domkyrkan | Smala gator, kullersten, tegel och puts, äldre hus med branta tak, kyrkogårdsmurar |
| Slottsbacken | Gräsbacke, slottet i rosa puts, kanoner, grusgångar, klocka |
| Sjukhusområde | Stora platta tak med helikopterplatta, parkeringar, ambulansintag, vårdcentral |
| Industri | Plåthallar, containrar, lastkajer, staket, grus |
| Jordbruk och slätt | Åkrar i rader, röda lador, traktorer, grusvägar, hagar |

## Detaljchecklista per kvarter

Varje kvarter ska ha minst:

- [ ] tre sorters gatumöbler (till exempel bänk, papperskorg, lyktstolpe, cykelställ, skylt)
- [ ] sprickor eller lagningar i asfalten
- [ ] cykelställ med cyklar
- [ ] minst en skylt
- [ ] takdetaljer (skorsten, ventiler, fläktbox eller takfönster)
- [ ] dörr och fönster på väggar som syns
- [ ] brunnar eller gallerbrunnar vid trottoarkanten
- [ ] något grönt (träd, gräsplätt eller rabatt)

## Varianterna

| | Variant 1 – Sommarkväll | Variant 2 – Serietidning | Variant 3 – Nordiskt mjuk |
| --- | --- | --- | --- |
| Kontur | tunn, mörkbrun, delvis genomskinlig | kraftig, svart | ingen |
| Skugga | en mjuk, lila-grå | en hård, mörk | flera svaga lager, breda |
| Mättnad | något dämpad | starkare | dämpad |
| Känsla | ljus vårkväll | tecknad serie, tydligast på liten skärm | lugn, mer verklighetsnära |

## Förslag Sommarkväll+ (D-038)

Variant 1 med mer detalj, inspirerat av ägarens referensbilder. Vald av ägaren 2026-11-17 och används i spelet från v0.3.0.

- **Textur:** kornig asfalt med svaga hjulspår och oljefläckar, trottoarplattor som skiljer sig lite i ton, kantsten i meterlängder med fogar, gräs med strån och blommor, grusgångar.
- **Grönska:** träd, häckar och buskar byggda av många lövklungor; klungor mot solen (nordväst) är ljusare, kronans kant är ojämn.
- **Kontur:** lite kraftigare på folk och fordon än på hus.
- **Kvällsljus:** scenen mörkas med blått, ljuskällor läggs på med additiv blandning: gatlyktor, upplysta fönster, strålkastare, bakljus, cykellampa, skylt.
- **Explosion i tre steg:** blixt med tryckvåg, eldklot med mörk rökkant, gnistor och skräp, sedan brinnande vrak med rök som driver åt sydost och en sotfläck.
- **I spelet:** marktexturer ritas en gång per kartbit och sparas som bild, så att de inte kostar något medan man spelar.

## Arbetssätt (från designdokumentet)

1. Ny grafik görs först på en testsida i galleriet och godkänns av ägaren innan den används i världen.
2. Agenten tar skärmdumpar, jämför med den här stilbibeln och checklistan och rättar innan den säger att den är klar.
3. 2–3 varianter sida vid sida innan en ny stadsdel eller ett nytt fordon byggs.
4. En separat granskare bedömer skärmdumparna mot stilbibeln och checklistan. Första granskningen (2026-11-17) ledde till rättade skuggor, skorstenar med höjd, lyktor som lutar, oregelbundna sprickor, tydligare cykelsymbol, blomlådor och tunnare kontur på människor.
5. Referensbilder: inga egna foton än (ägarens beslut 2026-11-17); läggs till när de finns. Ägaren har visat tre bilder från andra spel som inspiration (D-038): mer detalj och textur, ljuseffekter och snygga explosioner. Bilderna ligger inte i repot (upphovsrätt); bara vad som inspirerar beskrivs här.
