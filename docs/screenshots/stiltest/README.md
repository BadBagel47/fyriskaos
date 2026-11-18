# Stiltest (D-043) – skärmdumpar och mätningar

Tagna 2026-11-18 i en molnwebbläsare (Chromium) i mobilstorlek, 2× upplösning, kvalitet Hög, stillastående kamera, efter den oberoende granskningens rättningar. Granskaren rekommenderade variant A. Testsidan: https://badbagel47.github.io/fyriskaos/stiltest.html

## A – Klassisk tecknad

![A liggande](klassisk-liggande.jpg)
![A stående](klassisk-staende.jpg)

## B – Mjuk pastell

![B liggande](pastell-liggande.jpg)
![B stående](pastell-staende.jpg)

## C – Kraftig serie

![C liggande](serie-liggande.jpg)
![C stående](serie-staende.jpg)

## Prestanda (ungefärligt test i molnet)

Molnwebbläsaren har inget grafikkort och ritar 3D i processorn, så bilder per sekund där (10–20) säger inget om en telefon. Det som går att mäta är hur mycket processortid varje bild tar i spelets egen kod och hur snabbt sidan startar. Strypning: processorn 4 respektive 6 gånger långsammare, nätet 1,6 Mbit/s med 150 ms fördröjning.

| Strypning | Kvalitet | Start till första bild | Processortid per bild (median / 9 av 10 under) | Anrop | Trianglar |
| --- | --- | --- | --- | --- | --- |
| ingen | Låg | 0,6 s | 0,4 / 0,8 ms | 21 | 41 000 |
| ingen | Hög | 1,7 s | 0,9 / 3,7 ms | 31 | 61 000 |
| 4× + långsamt nät | Låg | 4,3 s | 2,1 / 4,1 ms | 21 | 41 000 |
| 4× + långsamt nät | Medel | 5,1 s | 3,8 / 8,3 ms | 31 | 61 000 |
| 6× + långsamt nät | Hög | 6,1 s | 7,3 / 12,8 ms | 31 | 61 000 |
| 6× + långsamt nät | Auto (valde Låg) | 5,5 s | 3,9 / 9,3 ms | 21 | 41 000 |

- Hela sidan är ett paket på cirka 145 kB komprimerat; inga modellfiler laddas.
- 60 bilder per sekund ger 16,7 ms per bild. Processortiden ligger under det även med 6× strypning; hur grafikkortet i en riktig telefon klarar det får ägarens test visa (fps-mätaren på testsidan).
- Auto-läget gick ner till Låg i molnet, som det ska när bilderna per sekund är låga.
