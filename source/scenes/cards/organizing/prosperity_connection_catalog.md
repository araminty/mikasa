# Prosperity connection catalog

Implemented in `source/scenes/cards/organizing/organize_phase_tick.scene.dry` (search `MIKASA_ORGANIZE_PHASE_TICK` / `PROSPERITY_*`). Monthly tick applies **legacy** `Q.prosperityConnectionCatalog` (decay only), then district mesh, IG home links, Docks trade, Pitts crime. Housing and destroyed-home prosperity: `source/scenes/economic_assets_runtime.scene.dry`.

CLI tune check: `npm run simulate-prosperity` (`scripts/simulate-prosperity-months.js`).

Transfer scale (all structural links): `coeff × signal × 2·sourcePop / (sourcePop + targetPop)`.

- **Block → block:** `sourcePop` = source block population.
- **IG → block:** `sourcePop` = `PROSPERITY_IG_EFFECTIVE_POP[ig]`.
- **Quality → block:** `sourcePop` = total district population.

Missing matrix entry or `0` coefficient = wired but no transfer.

## 1. Within-district mesh (`PROSPERITY_INTRA_DISTRICT_DEFAULT`)

Same sparse matrix in every district. Only nonzero pairs listed; all other directed pairs = 0.

| From → To | rich | first | second | coop | drone | alien | deeper | 3rd |
|-----------|------|-------|--------|------|-------|-------|--------|-----|
| rich | — | 0.0005 | 0.0015 | 0.0004 | 0 | 0 | 0 | 0 |
| first | 0.0003 | — | 0.002 | 0.001 | 0.0004 | 0 | 0 | 0 |
| second | 0.0004 | 0.002 | — | 0.0012 | 0.0005 | 0 | 0 | 0 |
| coop | 0.0003 | 0.001 | 0.001 | — | 0.0006 | 0 | 0 | 0 |
| drone | 0 | 0.0003 | 0.0004 | 0.0008 | — | 0 | 0 | 0 |
| alien | 0 | 0 | 0 | 0 | 0 | — | 0.0004 | 0 |
| deeper | 0 | 0 | 0 | 0 | 0 | 0.0004 | — | 0 |
| third_wave | 0 | 0.0004 | 0.0006 | 0.0004 | 0 | 0 | 0 | — |

Signal = source block prosperity (level). Override per district via `Q.prosperityIntraDistrictMesh[districtId]`.

## 2. IG home district (`PROSPERITY_IG_HOME_DISTRICT_LINKS`)

| IG | District | Highlights (0 = explicit no spill) |
|----|----------|-------------------------------------|
| Soylent | Vats | drone 0.009; coop/second 0.002–0.0015; alien 0 |
| Magrail | Railyard | drone 0.008; coop 0.0035 |
| Brazos | Limelight | drone 0.008; first 0.004 |
| Families | Pitts | second 0.004; rich/drone 0 |
| Edges | Railyard | second 0.003; drone 0.0025 |
| Sharks | Deeps | deeper 0.005; alien 0.003; drone 0 |

Signal = IG `prosperity_*` (level). All eight strata listed per row where blocks exist.

## 3. Docks trade (`PROSPERITY_DOCKS_TRADE`)

- `trade_level` excess → **every** Docks block.
- Base coeff **0.01** × strata multiplier: rich 1.2, first/second 1, coop 0.9, drone 0.8, alien/deeper 0.7, third_wave 0.8.

## 4. Pitts crime (`PROSPERITY_PITTS_CRIME`)

- `crime_level` excess → **first, second, third_wave, coop, deeper, alien** only (not rich, not drone).
- Base coeff **−0.012** (strata entry `1` = full weight).

## Legacy catalog

Stratum/IG self-decay rows unchanged. Removed citywide corp→stratum, syndicate→district, and old uniform trade/crime district rows (replaced above).

## Tuning hooks on `Q`

- `prosperityIntraDistrictMesh` / `prosperityIntraDistrictMeshDefault`
- `prosperityIgHomeDistrictLinks`
- `prosperityDocksTrade` / `prosperityPittsCrime`
- `prosperityIgEffectivePop`
