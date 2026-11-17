# Agent instructions

Follow the shared agent rules at
https://raw.githubusercontent.com/BadBagel47/agent-rules/main/AGENTS.md
(repo `BadBagel47/agent-rules`; fetch it via GitHub if the link cannot be read).
Read them at the start of every session.

- Current state, decisions and next steps: [docs/HANDOFF.md](docs/HANDOFF.md).
- Backlog (features, bugs, design, proposed runs): [docs/BACKLOG.md](docs/BACKLOG.md).
- Game design: [docs/design.md](docs/design.md) (D-001).

## Project rules (fyriskaos)

Owner decisions behind these rules are recorded under *Beslut* in `docs/HANDOFF.md`.

- Everything visible in the game is in Swedish. Code, comments and commits in English. Never translate `docs/design.md`.
- `docs/design.md` applies until the owner decides otherwise.
- Graphics follow the working method in `docs/design.md` (*Arbetssätt för detaljrik grafik*): style bible first, one thing at a time in a gallery with test pages, a detail checklist per block, 2–3 variants to choose from, and an independent reviewer. Always look at your own result with screenshots and compare with the style bible before saying you are done.
- Satire targets situations and the invented groups, never real politicians, parties, residents, museum or garden staff, and takes no political side. Nothing is borrowed from GTA (no name, logo, font or details). The castle is the county governor's residence, so no group may read as a jab at it.
- Two-player mode uses `BadBagel47/network-kit`, only once solo works. Needs and questions about network-kit go to the network-kit agent, not into network-kit's repository.

