# Credits

## Programvara

| Vad | Licens | Var |
| --- | --- | --- |
| [Three.js](https://threejs.org) 0.187.0 | MIT | `vendor/three/` (spelet, stiltestet och galleriets 3D-test); som utvecklingsverktyg också för att göra om modeller (`tools/convert_models.mjs`) |
| [PixiJS](https://pixijs.com) 8.23.0 | MIT | `vendor/pixi/` (galleriet) |
| [esbuild](https://esbuild.github.io) | MIT | bygger spelets och stiltestets paket, finns inte i det som publiceras |
| [gdown](https://github.com/wkentaro/gdown) | MIT | hämtar Quaternius paket från Google Drive i arbetsflödet `fetch-assets.yml`, finns inte i det som publiceras |

## Modeller och grafik

| Modell | Källa | Licens |
| --- | --- | --- |
| Träd i spelet: Tree_1, 3, 5, 7, 9 och Birch_2, 6 med bark- och lövbilder (*Stylized Tree*) samt CommonTree_1, 3 (*Ultimate Nature*) | [Quaternius](https://quaternius.com), hämtade 2026-11-19 (`assets/cc0/quaternius/`), omgjorda till `models/trees.bin` och `models/tex/` | CC0 1.0 |
| Cyklar: Bicycle och SquareFrameBicycle (*Public Transport*), omgjorda till `models/bikes.bin` men inte använda just nu (spelet använder den egna stadscykeln, B-056) | [Quaternius](https://quaternius.com) | CC0 1.0 |
| Spelaren och fotgängarna (*Background Posed Humans*: stående och sittande pose och frisyrer) i `models/people.bin`; gången (svängande armar och ben) är egen kod i `src/game3d/walk.js` | [Quaternius](https://quaternius.com) | CC0 1.0 |
| Hämtade men inte använda än: fler träd, buskar, personer, bilar (Quaternius); *Nature Kit*, *Car Kit*, *Mini Characters*, *City Kit (Suburban)* | [Quaternius](https://quaternius.com), [Kenney](https://kenney.nl), i `assets/cc0/` med paketens licensfiler | CC0 1.0 |
| Hus, tak, takkupor, fönster, portar, burspråk, Domkyrkan, Slottet, Gunillaklockan, skyltar, gatlyktor, bänkar, papperskorgar, cykelställ, häckar, bilar, polisbilar, cyklar, gator och trottoarer | egen kod (`src/game3d/`, `src/stiltest/`) | samma som repot |
| Galleriets testbilder (asfalt, plattor, gräs, tak, träd, bil) | genererade med ElevenLabs bildgenerator, se `docs/legal.md` punkt 11 | enligt ElevenLabs villkor |
| Texturer för mark, puts, tak och lövverk (`stiltest/tex/`) och målbilderna | genererade med ElevenLabs bildgenerator (Seedream 5.5) 2026-11-18 | enligt ElevenLabs villkor |

CC0 kräver inget omnämnande, men källan står här ändå.

## Kartdata

Kartdata för centrala Uppsala och Luthagen från [OpenStreetMap](https://www.openstreetmap.org/copyright): © OpenStreetMap contributors, under Open Database License (ODbL) 1.0. Hämtad 2026-11-19 via en Overpass-spegel (`data/osm/`, se licensfilen där). Spelkartan över centrum (`data/map/centrum.json`) är byggd från den med `tools/build_map.mjs` och delas under samma licens. Krediten står i spelet under *Inställningar*, *Credits*.
