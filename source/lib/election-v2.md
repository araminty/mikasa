# Mikasa election model (v2)

How council seats are simulated, projected, and committed in play.

## Source of truth (important)

**Edit `source/scenes/**/*.scene.dry`, not `source/lib/*.js`, for anything that affects the playable game.**

| What | Authoritative file |
|------|-------------------|
| Election engine, `DISTRICT_POPULATIONS`, `DISTRICT_ELECTION_MONTH`, `Q.update_projections`, `Q.runScheduledElections` | `source/scenes/election_runtime.scene.dry` |
| Electorate stack → poll modifiers | `source/scenes/electorate_runtime.scene.dry` |
| Month tick / prosperity connections | `source/scenes/cards/organizing/organize_phase_tick.scene.dry` |
| Housing stock, tax, economic holdings report | `source/scenes/economic_assets_runtime.scene.dry` |
| Election-night UI | `source/scenes/events/scheduled_elections.scene.dry`, `status.scene.dry` |

Dev-only mirrors (keep in sync **after** you change the scene, if you use CLI sims):

- `source/lib/election-v2.js` — legacy parallel implementation; prefer `npm run simulate-election:v2 -- --from-scene` to test compiled scene JS.
- `source/lib/election-world-data.js` — copy of `DISTRICT_POPULATIONS` / `IG_MEMBERSHIP_BY_STRATUM` from `election_runtime.scene.dry` for `require()` in Node without Dendrynexus.

Display of election-night results: compute in scene JS, show with `[+ quality +]` in `.dry` prose (see `scheduled_elections.scene.dry`, `election_simulation.scene.dry`).

---

## Overview

Five parties (keys **D, I, C, G, H**): Dems, Independent, Corp, Gang, Hate.

Three chambers:

| Chamber | Seats | Held on `Q` as | Notes |
|--------|------:|----------------|--------|
| Executive | 150 | `Exec_C`, `Exec_D`, … | Full re-election in **December** (`EXEC_ELECTION_MONTH = 12`) |
| Guild (×3) | 35 each | `Gold_C`, `White_C`, `Blue_C`, … | **Gold / White / Blue** delegations; ¼ seat turnover **every month**, silent (no event card) |
| District councils (×7) | 15 each | `Docks_C`, `Aurora_D`, … | One district per calendar month; see `DISTRICT_ELECTION_MONTH` in `election_runtime.scene.dry` |

**Projections** use the `Proj_` prefix (e.g. `Proj_Docks_C`). **Committed** seats omit `Proj_`. Status → Politics calls `Q.update_projections()` and reads both.

### Vote model (short)

1. **Voter blocks** = demographic stratum × district (population weights from `DISTRICT_POPULATIONS`).
2. **Interest groups** assign a fixed “floor” of ballots (corps, syndicates, guild blocs).
3. **Competitive softmax** on the remaining electorate (turnout varies by district/stratum).
4. **`assign_percentages`** turns vote totals into integer seats (largest remainder).

Electorate shifts from story cards: stacks on `Q` → `Q.electorateModifierCatalog` in **`electorate_runtime.scene.dry`** (applied inside election tabulation).

---

## File map

| File | Role |
|------|------|
| `source/scenes/election_runtime.scene.dry` | **Playable** election engine |
| `source/scenes/electorate_runtime.scene.dry` | **Playable** modifier catalog |
| `source/scenes/post_event.scene.dry` | After each month: projections + scheduled elections |
| `source/scenes/events/scheduled_elections.scene.dry` | Event card when `elections_this_month = 1` |
| `source/scenes/status.scene.dry` | Poll / seat UI |
| `source/scenes/election_simulation.scene.dry` | Debug special scene (population table) |
| `source/scenes/economic_assets_runtime.scene.dry` | Homes inventory, housing tax, Jacobs holdings report |
| `source/scenes/cards/organizing/organize_phase_tick.scene.dry` | Monthly prosperity connections + tick orchestration |
| `source/lib/election-v2.js` | Node CLI only — not compiled into the game |
| `source/lib/election-world-data.js` | Node copy of district populations — not compiled into the game |

---

## Monthly flow

```
advance month
  → post_event (on-arrival)
       Q.update_projections()      // Proj_* + poll displays; no seat commit
       Q.runScheduledElections()   // commit seats + maybe fire election event
  → #event queue (scheduled_elections if elections_this_month = 1)
  → main
```

### `Q.update_projections(opts)`

Runs tabulation with **`commitSeats: false`**. Refreshes projections and status polls only.

### `Q.runScheduledElections(opts)`

Runs after projections. Once per month/year unless `opts.force` or `Q.elections_allow_same_month_repeat`.

1. Tabulate current month (`allDistricts: false` for district chamber when appropriate).
2. **Guild:** `rotateGuildSeatsQuarter` on Gold / White / Blue (silent).
3. **Executive:** if `month === 12`, commit `Exec_*`.
4. **Districts:** for each district whose election month matches, commit `District_*` and `publishDistrictElectionReport`.
5. If any executive or district election ran: `elections_this_month = 1`; else clear.

---

## District election calendar

Defined in **`DISTRICT_ELECTION_MONTH`** inside **`election_runtime.scene.dry`** (if you maintain `election-world-data.js`, update it to match):

| District | Month |
|----------|------:|
| Vats | 2 |
| Aurora | 4 |
| Pitts | 5 |
| Docks | 6 |
| Limelight | 6 |
| Deeps | 8 |
| Railyard | 11 |

Executive: month **12**.

---

## Changing the model

1. Edit **`election_runtime.scene.dry`** (search `MIKASA_ELECTION_RUNTIME_BEGIN`).
2. If you changed `DISTRICT_POPULATIONS` or `IG_MEMBERSHIP_BY_STRATUM`, mirror the same numbers into **`election-world-data.js`** for CLI tools.
3. `npm run lint:dendry` then `npm run make-html`.
4. Optional CLI: `npm run simulate-election:v2 -- --from-scene` (elections), `npm run simulate-prosperity` (prosperity + housing tick)

### New district election month

Update `DISTRICT_ELECTION_MONTH` in **`election_runtime.scene.dry`**, mirror to `election-world-data.js` / `election-v2.js` only if you still use the standalone CLI module, and add a conditional table block in `scheduled_elections.scene.dry`.

---

## Credits

- In-game scheduling and Mikasa-specific chambers: Mikasa project.
- Results UI pattern: **origin0**, `election_1928.scene.dry` (*dynamic_social_democracy*).
