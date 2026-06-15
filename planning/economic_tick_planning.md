# Economy monthly tick (notes)

Design scratchpad for prosperity, housing, and political coupling. **Playable logic** lives in scene `.dry` files, not here.

| Topic | Authoritative file |
|--------|-------------------|
| Block / IG prosperity connections | `source/scenes/cards/organizing/organize_phase_tick.scene.dry` |
| Housing stock, tax, Jacobs report | `source/scenes/economic_assets_runtime.scene.dry` |
| Connection coefficients (doc) | `prosperity_connection_catalog.md` (this folder) |
| Prosperity card bumps | `prosperity_note.md` (this folder) |

CLI: `npm run simulate-prosperity` (`scripts/simulate-prosperity-months.js`, extracts `MIKASA_*` blocks from scenes).

---

## Homes (current design)

No housing-shortfall prosperity penalty. Destroyed homes still reduce prosperity. Homes are lent with the same rules as before; lent homes count toward the build cap.

Homes above `floor(required + lent)` are **unoccupied** slack: tracked in `Q.economicHousingInventory` (`total` + `unoccupied`, not listed in the asset registry). Monthly build adds `(prosperity / 10) × block population` per owner bucket, capped at `ceil((required + lent) × 1.1)`. Corp drone housing only in IG home districts (`purgeCorpDroneHomesOutsideHomeDistricts`).

Tax: each **listed** operational home in Docks / Pitts / Aurora → `0.1 × district multiplier × owner prosperity` per month (`HOUSING_TAX_*` in `economic_assets_runtime.scene.dry`). Aurora multiplier 0.5 → 0.05 budget/home at prosperity 1; Docks and Pitts 0.1 → 0.01; other districts 0 for now.

---

## Implemented (`economic_assets_runtime.scene.dry`)

- `processMonthlyHousing()` — borrow (`redistributeBlockHousingSurplus`), destroyed-home prosperity, fractional build/reconcile, tax → `Q.budget`.
- No shortfall penalty; removed `topUpStratumHomes*` / `applyHousingShortfallProsperity`.
- Build: `roundHousing((prosperity/10) × pop)` per owner bucket/month; cap `ceil((required+lent)×1.1)`; excess listed economic stock → unoccupied in inventory.
- Inventory: `total` and `unoccupied` per bucket key; **`roundAllHousingInventory()`** each month (three decimal places).
- Corp drone housing: home district only; pop = district drone total.
- Jacobs report (`jacobs.scene.dry` → `formatEconomicAssetsReport*`): fractional listed homes × owner prosperity (public = 1), slack % = unoccupied / (listed + unoccupied).
- Initial slack (`seedInitialHousingSlack`): `roundHousing(listed × 2 × prosperity × 0.01)` per owner bucket.
- Monthly tick: housing runs after `applyProsperityConnections` in `organize_phase_tick.scene.dry`.

---

## Not implemented (ideas)

- Full corp/coop/drone cash economy, trade phases, export/import loops (see git history of this file for older bullet lists).
- Prosperity as primary political driver beyond connections + housing destroy/tax.
- Martian Stock Exchange / syndicate street-price displays for corp prosperity.
