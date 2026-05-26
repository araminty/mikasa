# Mikasa Democracy: A Future History

**Game logic:** edit `source/scenes/**/*.scene.dry` and `source/qdisplays/*.qdisplay.dry` only. Do not change in-game behavior via `source/lib/*.js` (those files are dev/CLI mirrors). See `.cursor/rules/game-source-only.mdc`.

## Docs (design notes; code is in `.scene.dry`)

| Doc | Topic |
|-----|--------|
| [source/election_system.md](source/election_system.md) | Election runtime entry point |
| [source/lib/election-v2.md](source/lib/election-v2.md) | Chambers, monthly flow, CLI |
| [source/scenes/cards/organizing/prosperity_connection_catalog.md](source/scenes/cards/organizing/prosperity_connection_catalog.md) | Prosperity mesh / IG / trade / crime |
| [source/scenes/cards/organizing/economic_tick_planning.md](source/scenes/cards/organizing/economic_tick_planning.md) | Housing, tax, tick notes |

Card art: `out/html/img/` (240×300 WebP); reference as `img/name.webp` in scenes. See `.cursor/rules/source-directory.mdc`.