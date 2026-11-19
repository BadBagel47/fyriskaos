# Fyriskaos – stilbibel för 3D-grafiken (D-043)

Gäller från 2026-11-18 (ägarens beslut). Ersätter den tidigare 2D-stilbibeln (`docs/style-bible.md`, kvar som historik). Testsida: https://badbagel47.github.io/fyriskaos/stiltest.html

## Beslut

- **Stil:** top-down, tecknad, hus som lutar lite utåt från kameran.
- **Teknik:** Three.js (WebGL) med enkel low-poly 3D. Perspektivkamera rakt ovanifrån, så att höga saker lutar utåt från skärmens mitt.
- **Tecknat:** toon-skuggning (två eller tre ljussteg), konturlinjer, begränsad palett.
- **Modeller:** byggs med kod eller är CC0 (t.ex. Kenney, Quaternius). Källa och licens för varje modell står i `CREDITS.md`. Stiltestet är byggt helt med kod (Kenney och Quaternius gick inte att nå från arbetsmiljön 2026-11-18).

## Kamera

| Värde | Testsidan | Spelet (förslag) |
| --- | --- | --- |
| Höjd över gatan | 70 m | 70 m |
| Synligt på skärmens kortsida | 36 m | 26 m till fots, upp till 36 m i bil |
| Riktning | rakt ner, norr uppåt | samma |

Hur mycket ett hus lutar: förskjutningen av taket är husets höjd delat med kamerans höjd, gånger avståndet från skärmens mitt. Ett 17 m högt hus 15 m från mitten lutar alltså ungefär 3,6 m. Fasaderna syns på den sida som vetter mot mitten.

## Ljus och skuggor

- **Sol** från sydväst, som i Uppsala, ungefär 55° över horisonten. Skuggor faller mot nordost, alltså bort från gatans södra fasader och in mot gårdarna.
- **Himmelsljus** (blått ovanifrån, varmt från marken) bestämmer hur ljusa skuggorna är. Skuggor ska vara tydliga men aldrig svarta; färgerna ska gå att se i skugga.
- **Toon-steg:** variant A tre steg, B två mjuka, C två hårda (se `src/stiltest/variants.js`).
- **Skuggor bara från solen** och bara nära kameran: skuggområdet är det som syns plus 10 m och följer kameran i hela meter, så att skuggorna inte darrar.
- **Dimma vid kanten:** längst ut i bilden (främst i stående läge) bleknar marken mot bakgrundsfärgen.

## Konturer

Inverterat skal: varje sak ritas en gång till, lite större och inifrån, i konturfärgen. Det ger en jämn kontur runt varje form (även fönster och möbler) för ett extra anrop per mesh.

| Variant | Tjocklek | Färg |
| --- | --- | --- |
| A – Klassisk tecknad | 0,075 m (ungefär 1,5 px på en telefon) | mörkbrun |
| B – Mjuk pastell | 0,05 m | gråbrun |
| C – Kraftig serie | 0,12 m | nästan svart |

Marken har ingen kontur.

## Palett

Begränsad: sex fasadfärger, tre takfärger, fasta färger för mark, metall och trä, sex bilfärger, fyra cykelfärger. Fasaderna följer Uppsala: ockra, gult, laxrött, vitputs, sandsten och blekgrönt. Taken är tegelröda eller i grå plåt. Varje variant har sin egen version av samma palett (`src/stiltest/variants.js`).

## Storlekar (meter)

| Sak | Mått |
| --- | --- |
| Person | 1,8 hög, ritas 1,8 gånger större (cirka 3,2) med axlar i tröjans färg, så att den syns på telefonen |
| Cykel | 1,8 lång, hjul 0,66 |
| Bil | 4,2 × 1,8, 1,5 hög |
| Hus (Luthagen) | 4–5 våningar à 3,2 m plus 1 m sockel, tak 4–5 m, djup 12 m, bredd 13–16 m |
| Gata | två körfält à 3,25, parkering 2,2, cykelbanor 1,8, trottoarer 3 |
| Träd | 6–7 högt, krona 4–5 bred |
| Gatlykta | 5,2 hög, armen 1,3 ut över cykelbanan |

## Detaljnivå per stadsdel

| Stadsdel | Hus | Gatan | Grönt och detaljer |
| --- | --- | --- | --- |
| Luthagen (stiltestet) | Putsade stenhus 4–5 våningar, sadel- och mansardtak, takkupor, skorstenar, burspråk, portar med trappsteg, balkonger mot gården | Parkering längs ena sidan, cykelbanor, övergångsställe, pollare | Lindar i gatan, park­remsa med bänkar, gårdar med gräs och grus |
| Studentkvarter med nationer | Stora nationshus, gult och vitt, gavlar | Breda trottoarer, många cykelställ | Gårdar med långbord, affischer |
| Gamla stan kring domkyrkan | Äldre låga hus i tegel och puts, branta tak | Smala gator, kullersten | Kyrkogårdsmurar, stora träd |
| Slottsbacken | Slottet (rosa puts), få hus | Grusgångar | Gräsbacke, kanoner, klocka |
| Sjukhusområde | Stora platta tak, helikopterplatta | Parkeringar, ambulansintag | Vårdcentral, buskar |
| Industri | Plåthallar, lastkajer | Grus, staket | Containrar, pallar, lådor |
| Jordbruk och slätt | Röda lador | Grusvägar | Åkrar i rader, hagar, traktorer |

## Steg 2: Sommarkväll+ (D-044)

Ägaren 2026-11-18: tecknad low-poly är inget krav längre; målet är detaljnivån i referensbilderna och Sommarkväll+-ljus. Läget Sommarkväll+ i stiltestet:

- **Kamera:** 72 m upp, 30 m på kortsidan, rakt ner; i stående läge vrids bilden så att gatan går uppåt.
- **Ljus:** sol från västsydväst cirka 20° över horisonten, varm (orange-gul), blått himmelsljus som fyller skuggorna, tonmappning (ACES), varm färgkorrigering och mörka kanter som ett lager ovanpå.
- **Ytor:** genererade bilder som läggs efter världens koordinater (inga egna uv-koordinater), mörkning nertill på väggar, fläckar, lagningar, däckspår, slitna markeringar, brunnslock och gallerbrunnar som bilder på marken.
- **Träd och bilar:** genererade bilder sedda rakt ovanifrån, utklippta, lagda i sin höjd så att de kastar rätt skugga; två lager per trädkrona; bilarna tonas i olika färger.
- **Gatan:** sex sorters parkerade bilar, häckar, staket, blomlådor, cykelställ, lådor, pall, tunna, bänkar, papperskorgar, pollare och skyltar.

## Steg 3: lutad kamera (D-045)

- **Kamera:** fast vinkel 33° från lodrätt, från söder, 56 m från gatan, 34 m synligt på kortsidan (stående läge något närmare). Rakt ovanifrån finns kvar bakom en knapp. Husraden närmast kameran ritas inte i den lutade vyn men kastar sin skugga.
- **Stil:** påkostat mobilspel, inte fotorealism (målbilder `docs/screenshots/stiltest/malbild-3.jpg` och `-4.jpg`).
- **Detaljnivå:** alla föremål byggs som riktiga små modeller med delar (se `src/stiltest/props3.js`); inga klossar eller platta rutor.
- **Bilder:** WebP; små förhandsbilder laddas först, fullstora efteråt.
- **Granskning:** fasta kriterier i `docs/screenshots/stiltest/kriterier.md`.

## Steg 4: prestanda, träd, hus och ljus (D-047)

- **Träd:** stam och 5–6 grenar med två lövklungor var, plus en topp. Klungornas ljusnormaler böjs mot riktningen från kronans mitt, så att kronan skuggas som en mjuk form; lövbildens riktning tas från ytans riktiga normal (`mapNormal`). Ljus topp, mörkare undersida och insida. Två former per sort, ritade med instancing, olika storlek (0,75–1,25).
- **Hus:** burspråk är kantiga (tre sidor) eller raka lådor, med plåttak och en list per våning; upplägget skiljer mellan husen. Varje hus har en fönstertyp (tvåluftsfönster, parfönster, rundbåge, högt fönster) och ett överstycke (fronton, list, slutsten eller inget). Översta våningen har lägre fönster. Ungefär vart tionde fönster är tänt. Butiker har breda skyltfönster och randiga markiser.
- **Lyktor:** klassisk lykta med tak, guldring, sexkantigt glas och en kula på toppen; taket är mindre än glaset så att ljuset syns uppifrån.
- **Ljus:** sol 0xffa848, styrka 8,2, från sydväst och lågt; himmelsljus 0xb4b0c0 och mark 0x7a5434, styrka 0,85; skuggor med mjukare kant.
- **Budget:** cirka 240 000 trianglar och 88 anrop på Hög.

## Spelet i 3D (F-042, D-048)

- **Kamera:** samma lutning som stiltestet (33° från lodrätt) men lång brännvidd (24°), så husen lutar lite vid kanterna (B-050). Visar 24 m på höjden till fots, 26 m plus fart på cykel och 28 m plus fart i bil.
- **Skymning:** allt på kamerasidan om spelaren klipps bort ovanför siktlinjen från spelaren till kameran. Snittet ses rakt från kanten, så husen ser hela ut. Träd och lyktor i vägen blir glest genomskinliga i stället. Skuggorna ritas utan snitt.
- **Hus:** byggs från kartans tomter. Fasader mot söder, öster och väster får fönster (norrsidan syns aldrig från kameran), utom väggar närmare än 3 m från grannhuset. Fönster och fasaddetaljer är instansade lådor med färg per låda.
- **Modeller:** träd, cyklar och spelaren är CC0-modeller från Quaternius (se `CREDITS.md`). Lövens färg är något mörkare och grönare än i originalbilderna, så att de inte blir gula i kvällssolen. Spelaren har orange tröja.
- **Kväll (F-039):** solen blir svagare och rödare, himlen blå, lyktornas sken och de tända fönstren starkare, och spelarens fordon får strålkastare och bakljus.

## Centrum (F-005, D-057)

- **Karta:** OpenStreetMap, förenklad. Gatunätet vrids så att gatorna går rakt i bild; kameran pekar därför inte mot norr. Marken i rutor om 1 m; vägar, trottoarer, cykelbanor och gångar ritas som släta band längs mittlinjerna.
- **Hus:** hus i en del får sadeltak eller mansardtak; stora delar av sammansatta kvarter får sadeltak, små delar platta tak (mörk papp eller plåt) med ventiler och takfönster. Södra väggen får alltid fönster (den syns när ett hus framför klipps bort). Butiker där kartan har affärer, kaféer eller restauranger: skyltfönster, markiser och blomlådor.
- **Sikt:** hus på kamerasidan om spelaren klipps ner till bottenvåningen; under husen syns ett mörkt golv.
- **Gata:** röda cykelbanor vid gatukanten på större gator, kantsten, mittlinjer och övergångsställen vid korsningar, gatuskyltar, P-skyltar vid parkering, häckar och räcken där gräs möter trottoar.
- **Landmärken:** Domkyrkan i rött tegel med två västtorn och kopparspiror, Slottet i laxrött med runda torn och kupoler på en stenterrass, Gunillaklockan som ett rosa klocktorn med kopparhuv. Egna skyltar: Vårdcentral (vit hjärtsymbol på grönt, inget rött kors), Polis, Mackbaren, Punschbergs nation.
- **Folk och markering:** fotgängare är CC0-figurer med olika tröjfärger; spelaren är 25 % större, har en pulserande orange ring och en orange markering över huvudet; pilen mot målet är orange.

## Prestanda (mobil från start)

- **Mål:** 60 bilder per sekund på en vanlig mellanklass-Android, aldrig under 30.
- **Få anrop:** allt som står still i ett kvarter slås ihop till en enda mesh med färg per hörn. Upprepade saker (träd, lyktor, bänkar, papperskorgar, cykelställ, pollare) ritas med instancing. Stiltestet: 21–31 anrop och 41 000–61 000 trianglar.
- **Upplösning:** pixel ratio högst 2.
- **Kvalitetslägen:** Låg (pixel ratio 1, inga skuggor), Medel (1,5, skuggor 1024), Hög (2, skuggor 2048). Auto går ner ett steg om det blir under 50 bilder per sekund i en sekund, och upp igen efter 8 sekunder på 59 eller mer om det inte gått ner de senaste 20 sekunderna.
- **Snabb start:** inga modellfiler att ladda; hela stiltestet (Three.js och egen kod) är ett komprimerat paket på cirka 145 kB.
- **Mätt i molnet** 2026-11-18 och 2026-11-19 (steg 4: 4–7 ms per bild med 4× strypning, efter laddningen), se `docs/screenshots/stiltest/README.md`.

## Arbetssätt

1. Ny grafik görs först på stiltestsidan och godkänns av ägaren.
2. Agenten tar skärmdumpar i mobilstorlek, stående och liggande, jämför med den här stilbibeln och rättar innan den säger att den är klar.
3. En separat granskare bedömer skärmdumparna mot stilbibeln. Första granskningen (2026-11-18) rekommenderade variant A; dess fynd rättades: större personer, cyklisten på norra cykelbanan bort från träden, synligare lyktor, plåttak på burspråken, tydligt brott på mansardtaken, inget streck över övergångsstället, ljusare mörk bil, mindre knappar och en text som fälls ihop.
4. Skärmdumparna läggs i `docs/screenshots/` så att ägaren kan se dem på GitHub i mobilen.
