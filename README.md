# Fyriskaos

Ett satiriskt top-down-actionspel i ett genererat Uppsala, för 1–2 spelare på mobilen.

**Spela:** https://badbagel47.github.io/fyriskaos/

Just nu finns en prototyp: gå, cykla och köra bil i en teststad i 3D i kvällssol, för att prova styrningen och grafiken.

- Design: [docs/design.md](docs/design.md)
- Läget just nu och nästa steg: [docs/HANDOFF.md](docs/HANDOFF.md)

## Köra lokalt

```
npm start
```

Öppna sedan http://localhost:8080. Efter ändringar i `src/` byggs spelet med `npm install` och `npm run build`. Testerna körs med `npm test` (körmodellen i Node, sedan sidan i Chromium med Playwright).

## Licenser

- [Three.js](https://threejs.org) (MIT), kopia i `vendor/three`.
- [PixiJS](https://pixijs.com) (MIT), kopia i `vendor/pixi` (galleriet).
- Modeller från Quaternius och Kenney (CC0), kartdata © OpenStreetMap contributors (ODbL). Se [CREDITS.md](CREDITS.md).
