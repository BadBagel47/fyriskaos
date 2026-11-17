# Fyriskaos

Ett satiriskt top-down-actionspel i ett genererat Uppsala, för 1–2 spelare på mobilen.

**Spela:** https://badbagel47.github.io/fyriskaos/

Just nu finns prototyp 1: gå, cykla och köra bil i en grå teststad, för att prova styrningen.

- Design: [docs/design.md](docs/design.md)
- Läget just nu och nästa steg: [docs/HANDOFF.md](docs/HANDOFF.md)

## Köra lokalt

```
npm start
```

Öppna sedan http://localhost:8080. Testerna körs med `npm install` och `npm test` (körmodellen i Node, sedan sidan i Chromium med Playwright).

## Licenser

- [PixiJS](https://pixijs.com) (MIT), kopia i `vendor/pixi`.
