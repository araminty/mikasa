The electoral system is defined in Dendry runtime scenes (compiled into the playable build), not in `source/lib/*.js`.

- **`source/scenes/election_runtime.scene.dry`** — parties, interest groups, demographics, districts, populations (`DISTRICT_POPULATIONS`), vote tabulation, `Q.update_projections`, `Q.runScheduledElections`.
- **`source/scenes/electorate_runtime.scene.dry`** — `Q.electorateModifierCatalog`: stack-driven poll shifts when cards/events set stack qualities.

Party vote shares are computed from voter blocks, IG floors, and competitive softmax; story choices usually **do not** recalculate elections inline—they bump stack qualities and modifiers apply on the monthly tick.

Design notes: `source/lib/election-v2.md`. Population table UI: `source/scenes/election_simulation.scene.dry`.
