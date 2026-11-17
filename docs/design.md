# Fyriskaos – designdokument

Exporterat 2026-11-17 från designdokumentet i Claude-chatten där idén togs fram. Från och med nu är den här filen huvudversionen.

## Översikt

Fyriskaos (arbetsnamn) är ett satiriskt top-down actionspel i ett genererat, förenklat Uppsala, för 1–2 spelare på mobil.

- **Plattform:** webbläsare, mobil först (pekskärm, liggande läge). Ska även gå att spela på dator.
- **Språk:** allt i spelet på svenska.
- **Ton:** satirisk och humoristisk. Mer action än smygande.
- **Eget koncept:** inspirerat av top-down-stadsspel, men inget namn, ingen logga, inget typsnitt och inga detaljer lånas från GTA.
- **Designregler:** lätt att komma igång, inga RPG-uppgraderingar, och en runda ska gå att spela klart på en kväll.

## Spelomgången

Varje runda är en ny stad, och målet är att vinna Valborg: din nation ska styra staden när forsränningen startar. Efter forsränningen kommer finalen: ni försvarar Slottsbacken mot alla grupper samtidigt (kung på täppan), och den som håller backen kröns till Slottsbackens kungar.

- **Längd:** cirka 1–2 timmar per runda.
- **Seed:** allt utgår från ett startnummer, så att båda spelarna får exakt samma stad.
- **Död:** man återuppstår på en vårdcentral mot en kostnad, och stjärnorna nollställs. Vårdcentralerna finns utspridda så att man snabbt kan mötas igen.
- **Satirdetalj:** man får en kölapp med texten ”Beräknad väntetid: 4 sek”.
- **Räddning i co-op:** den som dör ligger först nere i några sekunder och kan räddas av kompisen.
- **Pengar:** går bara till vård och vapen.

## Staden

Kartan bygger på Uppsalas riktiga form från OpenStreetMap, förenklad. Skelettet är fast medan detaljerna genereras varje runda.

| Del | Fast eller genererad |
| --- | --- |
| Fyrisån, slottet, domkyrkan, centralen | Fast |
| Stora vägar och stadsdelarnas lägen | Fast |
| Kvarter och hus | Genereras |
| Vägarbeten och avstängda gator | Genereras |
| Gängens områden | Genereras |
| NPC:er, parkerade fordon och uppdrag | Genereras |

- **Stadsdelar (förslag):** studentkvarter med nationer, gamla stan kring domkyrkan, slottsbacken, sjukhusområde, industri och ett jordbruksområde med slätt.
- **Storlek:** centrum plus några stadsdelar runt om. Det ska ta några minuter att köra tvärs över.
- **Krav:** ”© OpenStreetMap contributors” ska stå i spelets credits.

## Zonhändelser

En del av stan förvandlas en kort stund och återgår sedan. Resten av staden påverkas inte. Uppdrag kan skicka er till zonen för att göra något där.

| Händelse | Vad som händer |
| --- | --- |
| Oväntat snöoväder (”klimatet gör konstiga saker”) | Snö och halka, snöplogar, pulkaåkning på Slottsbacken |
| Fyrisån svämmar över | Gator blir kanaler, båtar och badringar blir fordon |
| Spontan studentfest | En park fylls av folk och musik och blir svår att köra igenom |
| Grävkaos | Ett kvarter blir byggarbetsplats |
| Dinosaurieutbrott | En rymd robotdinosaurie från ett reklamjippo trampar runt, kan fångas eller köras |
| Tropisk afton | Kvällsfest i växthuset i Botaniska trädgården, läge för Näckroskuppen |

## Fordon

Cyklar och elsparkcyklar är stadens vanligaste fordon. Specialfordon dyker bara upp via efterlysningen, på platser där de är logiska eller i uppdrag, aldrig slumpvis parkerade.

| Fordon | Var och när | Känsla |
| --- | --- | --- |
| Cykel | Överallt, många att sno | Snabb i parker och längs ån, man ramlar av vid krock |
| Elsparkcykel | Uthyrning med Swish-parodi | Snabb start, välter på trottoarkanter |
| Bil | På gatorna | Standardfordonet för uppdrag |
| EPA-traktor | Utkanter och villaområden | Långsam, rolig |
| Stadsbuss | Busslinjerna | Tung, kan blockera vägar |
| Traktor | Jordbruksområdet | Långsam, tål mycket |
| Helikopter | Sjukhustaket, nyhetsstationen, uppdrag | Snabbaste vägen över stan |
| Polishelikopter | Höga stjärnor | Jagar dig, kan stjälas |
| Pansarvagn | Maxstjärnor (Hemvärnet) eller uppdrag | Nästan oförstörbar |
| Halvfärdig spårvagn | Uppdrag kopplat till spårvägsbygget | Går bara där det finns räls |
| Sopbil och snöplog | Vanlig trafik, snöplog vid snö | Tunga, bra för att tränga sig fram |

## NPC:er, gäng och polis

Staden ska kännas levande, men bara nära spelarna. Resten av staden ”sover” så att spelet går snabbt på mobil.

- **Fotgängare och trafik:** folk på trottoarerna, bilar som följer filerna och trafikljus.
- **Gäng:** påhittade grupper, se avsnittet Grupper och deras aktiviteter. Varje gäng har en boss och några löjtnanter.
- **Relationer:** gängens syn på er ändras av vad ni gör. Dödar ni ett gängs folk blir de sura.
- **Polis:** efterlysning i stjärnor som trappas upp, från polisbilar till polishelikopter och till sist Hemvärnet med pansarvagn.

## Grupper och deras aktiviteter

Alla grupper är påhittade och kopplas inte till någon som faktiskt bor eller jobbar på platserna. De syns ute i stan med egna aktiviteter som ni kan delta i, sabotera eller råna, och aktiviteterna kan bli början på uppdrag.

| Grupp | Tillhåll | Aktiviteter ute i stan |
| --- | --- | --- |
| Vasagardet | Slottsbacken | Utklädda historienördar i rustning som tror att det är 1549. Övar slag, skjuter med gamla kanoner, tar folk ”tillfånga” |
| Linnélärjungarna | Botaniska trädgården | Fanatiska botaniker i khaki som vaktar växterna och jagar bort folk från gräset |
| Fornnördarna | Högarna i Gamla Uppsala | Vikingafantaster som håller blot och kastar yxor |
| Nationerna | Studentkvarteren | Sittningar utomhus, punschleveranser, nattliga busstreck mot varandra |
| Cykelstöldsligan | Kring stationen | Klipper lås, spelarna kan stjäla deras byte |
| Bönderna | Jordbruksområdet | Traktorkonvojer som blockerar vägar och protesterar mot något obegripligt |

Slottet är i verkligheten landshövdingens bostad, så ingen grupp ska kunna läsas som en pik mot den.

## Uppdrag

Ett uppdrag byggs av 1–4 steg plus en twist. Spelet fyller i mallen med riktiga platser från staden. Uppdragen klättrar uppåt i gängen tills ni når bossen, och finalen är Valborgs forsränning följd av striden om Slottsbacken.

| Byggsten | Exempel |
| --- | --- |
| Steg | Åk till, hämta, leverera, stjäl fordon, jaga ikapp, skydda, överlev X sekunder, förstör, fotografera, fly |
| Hinder | Tidsgräns, polis, vaktande gäng, fordon som inte får skadas, bro som stängs |
| Twist | Kunden ljuger och det är en fälla, bomb i bilen (håll farten), målet hoppar i en båt på ån |
| Co-op-roll | En kör och en skjuter, eller en distraherar polisen medan den andra tar bytet |
| Hur det kommer in | SMS, Swish-förfrågningar, annonser på en Blocket-parodi |

**Uppsala-uppdrag:**

- Forsränning på ån med sabotage.
- Stjäla en rivalnations hemliga punschrecept.
- Leverera nattmackor innan sittningen är slut.
- Cykeljakter genom parker och längs ån.
- Traktorkaos på slätten.
- Stjäla den halvfärdiga spårvagnen.

## Platser med egna uppdrag

Några riktiga platser får egna uppdrag. Satiren riktar sig mot situationerna och de påhittade grupperna, aldrig mot museet, trädgården eller personalen.

| Plats | Uppdrag |
| --- | --- |
| Slottsbacken | Finalen (kung på täppan), pulkajakt nerför backen vid snö, stöld av en kungakrona, klockan på backen ringer in finalen |
| Evolutionsmuseet (f.d. Zoologiska museet, dinosaurier) | Benkuppen: en nation vill ha ett dinosaurieben till sin sittning. Skelettfrakten: eskortera ett skelett på flak, varje krock tappar ett ben |
| Botaniska trädgården | Näckroskuppen: stjäl jättenäckrosens blomma under Tropisk afton. Lagerträdsrånet: flytta ett 300 år gammalt lagerträd i kruka utan att det välter, med Linnélärjungarna efter er |

## Två spelare

Spelet stöder solo och co-op för två. Var och en har sin egen kamera och kan åka vart den vill. Versus är skippat tills vidare.

**När ett uppdrag startas:**

1. En spelare begär start av ett uppdrag.
2. Båda måste godkänna.
3. Är kompisen på ett annat ställe teleporteras hen till den som begärde starten, till exempel ”hämtad av färdtjänst”.
4. Man kan inte begära start mitt i en polisjakt, så att teleporten inte blir ett sätt att fly.

**Nätverk:**

- Bygger på network-kit (delade rumsservern på Cloudflare).
- Den ena spelaren är värd och kör hela simuleringen. Den andra får uppdateringar om det som finns nära sig.
- Solo är samma sak, fast utan spelare två.
- Tappar kompisen nätet ska hen kunna ansluta igen mitt i rundan.

## Styrning på mobil

Styrningen ska vara så enkel att man kan börja spela direkt, i liggande läge.

- **Till fots:** en joystick, siktet låser automatiskt på närmaste fiende och en skjutknapp.
- **I fordon:** dra joysticken åt det håll du vill åka, så svänger fordonet dit och gasar själv. Det finns en bromsknapp.
- **Smart knapp:** byter funktion efter läge, till exempel ”kliv in”, ”kliv ur” eller ”plocka upp”.
- **Vägvisning:** en stor pil visar vägen till nästa mål.

## Satir och aktuella händelser

Satiren skojar om situationer, aldrig om riktiga politiker eller partier, och tar inte ställning för eller emot. Händelserna ligger i en egen lista som är lätt att uppdatera när snackisarna byts ut.

| Snackis | I spelet |
| --- | --- |
| [Spårvägsbygget](https://www.svt.se/nyheter/lokalt/uppsala/nu-borjar-sparvagsbygget-333-trad-ska-tas-bort-i-uppsala) (planeras klart 2029) | Uppgrävda gator som flyttar sig varje runda, omvägar, en halvfärdig spårvagn att stjäla |
| [Omledd busstrafik](https://via.tt.se/pressmeddelande/4007691/uls-hosttidtabell-infors-pa-mandag?lang=sv) | Bussar som tar konstiga omvägar |
| [Tak för elsparkcyklar](https://www.svt.se/nyheter/lokalt/uppsala/sa-manga-elsparkcyklar-kan-bli-kvar-i-uppsala) | ”Kommunen konfiskerar halva sparkcykelflottan”, färre att sno |
| Valborg och forsränningen | Rundans final |
| Nationerna | Gäng i krig med varandra |
| Cykelstölder | Cykelstöldsligan, och spelarna snor själva |

Status på snackisarna kontrolleras igen innan de byggs in, eftersom de kan ha ändrats.

## Grafik och ljud

Grafiken är top-down i tecknad stil, med hus som lutar lite utåt från kameran för en känsla av 3D.

- **Radio i fordon:** satiriska kanaler med genererade jinglar. Röster kan göras med ElevenLabs.
- **Dag, natt och väder:** snö och halka kommer som zonhändelse i en del av stan i taget (se Zonhändelser).

### Arbetssätt för detaljrik grafik

Grafik och världar blir platta när en agent gör allt i ett svep utan att titta på resultatet. Därför gäller de här reglerna:

1. **Stilbibel först:** färgpalett, ljus och skuggor, linjetjocklek, perspektiv, storleksförhållanden och vad varje stadsdel får innehålla. Med referensbilder, gärna egna foton från Uppsala.
2. **Agenten tittar på sitt resultat:** den tar skärmdumpar, jämför med stilbibeln och rättar innan den säger att den är klar.
3. **En sak i taget i ett galleri:** varje föremål görs på en egen testsida och godkänns innan det används i världen.
4. **Krav på detaljrikedom:** en checklista per kvarter, till exempel minst tre sorters gatumöbler, sprickor i asfalten, cykelställ, skyltar och takdetaljer. Husens riktiga former från OpenStreetMap ger rimliga planlösningar.
5. **Varianter att välja mellan:** 2–3 varianter sida vid sida innan en ny stadsdel eller ett nytt fordon byggs.
6. **Oberoende granskare:** en separat agent bedömer skärmdumparna mot stilbibeln och checklistan.

## Plan för de första stegen

1. Designdokumentet i repot (det här).
2. Prototyp 1: styrningen. Gå, cykla och köra bil på mobilen i en enkel grå testkarta.
3. Stilbibel och grafikgalleri: de första sakerna (cykel, bil, ett hus, en gata) godkänns på testsidor.
4. Första riktiga området: centrum kring Fyrisån och Slottsbacken från den riktiga kartan, med vårdcentral, polis och ett första uppdrag.
5. Två spelare via network-kit, när solo fungerar.

## Parkerat och öppna frågor

**Parkerat till senare:**

- Versus-läge.
- Ljuddämpare och smygande.
- Fler städer, till exempel Stockholm. Idéer för en Stockholm-profil: öar, broar och skärgård; gäng som Bostadsrättsmaffian, Elsparkcykelkartellen och Skärgårdsadeln; mål att bjudas in till Galamiddagen (en påhittad Nobelfest); uppdrag som båtjakter, kapa en sightseeingbåt, sabotera ett årsmöte i en bostadsrättsförening och stjäla tavlor från ett museum.
- Köpa gömställe eller garage.

**Öppna frågor:**

- [ ] Slutligt namn på spelet. Ägaren lutar åt Fyriskaos. Andra förslag: Slottsbackens kungar (gillat, används redan som titeln man kröns till), Ånfall, Punschkriget, Valborgskaos, Nationskriget, Cykelkriget, Kaos på Fyris och Tillgrepp: Uppsala. Undvik ”Grand Theft” och bokstäverna GTA. Kontrollera att namnet inte redan används av ett annat spel eller företag.
- [ ] Ska en pågående runda kunna sparas och fortsättas en annan kväll?
- [ ] Ska dag och natt finnas från start eller läggas till senare?
- [ ] Vilka stadsdelar ska vara med i första versionen?
