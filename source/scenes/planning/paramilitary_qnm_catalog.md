# Paramilitary QNM default catalog

Implemented in `source/scenes/crime_paramilitary_runtime.scene.dry` (search `MIKASA_CRIME_PARAMILITARY_*` / `PARAMILITARY_QNM_*`). Live ledger: `Q.districtParamilitary[district].{police,militia,punks}`.

**Strength** = quality × numbers × morale. **Loyalty** caps morale (police, militia, syndicate, corp).

Tuning hooks on `Q` (same pattern as `Q.prosperityIntraDistrictMeshDefault`):

| `Q` key | Role |
|---------|------|
| `paramilitaryDistrictIds` | District list |
| `paramilitaryQnmPoliceDefault` | Per-district city police seed |
| `paramilitaryQnmPunksDefault` | Per-district punk seed |
| `paramilitaryQnmMilitiaDefault` | Per-district militia seed |
| `militiaOrganizingNumbersBump` | `activist_training` numbers bump (all districts) |
| `militiaPatrolNumbersBump` | `security` volunteer patrol bump (all districts) |
| `paramilitarySyndicateHomeDefault` | Syndicate home-district rows (future outlaw sum) |
| `paramilitaryCorpPoliceHomeDefault` | Corp police home rows (future LE / asset guard) |
| `paramilitaryWatchDefault` | Prosperity / parochialism coeffs for watch LE (future) |

---

## 1. City police (`PARAMILITARY_QNM_POLICE_DEFAULT`)

Per-district **city police** QNM when the ledger row is first created.

| District | Q | N | M | L | Notes |
|----------|---|---|---|---|-------|
| Docks | 0.65 | 0.90 | 0.50 | 0.45 | Patchwork / corrupt |
| Aurora | 0.75 | 1.10 | 0.58 | 0.52 | City government seat |
| Vats | 0.68 | 0.85 | 0.52 | 0.48 | Corp fief, thin city force |
| Railyard | 0.68 | 0.85 | 0.52 | 0.48 | |
| Pitts | 0.60 | 0.70 | 0.45 | 0.50 | Neglected syndicate turf |
| Limelight | 0.68 | 0.85 | 0.52 | 0.48 | |
| Deeps | 0.55 | 0.50 | 0.48 | 0.55 | Minimal city reach |

---

## 2. Punks (`PARAMILITARY_QNM_PUNKS_DEFAULT`)

Background outlaw strength (no loyalty). Drifts with lawlessness when monthly tick is wired.

| District | Q | N | M |
|----------|---|---|---|
| Docks | 0.28 | 0.32 | 0.40 |
| Aurora | 0.22 | 0.22 | 0.38 |
| Vats | 0.24 | 0.28 | 0.39 |
| Railyard | 0.24 | 0.28 | 0.39 |
| Pitts | 0.32 | 0.45 | 0.42 | Highest ambient crime |
| Limelight | 0.24 | 0.28 | 0.39 |
| Deeps | 0.30 | 0.38 | 0.41 |

---

## 3. Militia (`PARAMILITARY_QNM_MILITIA_DEFAULT`)

Per-district **community militia** QNM when the ledger row is first created.

| District | Q | N | M | L | Notes |
|----------|---|---|---|---|-------|
| Docks | 0.35 | 0.18 | 0.50 | 0.85 | Working-class organizing base |
| Aurora | 0.35 | 0.16 | 0.52 | 0.83 | City seat volunteers |
| Vats | 0.34 | 0.14 | 0.48 | 0.82 | Thin under corp fief |
| Railyard | 0.35 | 0.15 | 0.50 | 0.84 | |
| Pitts | 0.32 | 0.12 | 0.45 | 0.80 | Syndicate turf, weak start |
| Limelight | 0.34 | 0.14 | 0.49 | 0.83 | |
| Deeps | 0.33 | 0.11 | 0.47 | 0.86 | Minimal reach |

**Card bumps** (all districts, live ledger only):

| Card | Stat | Numbers Δ |
|------|------|-----------|
| `activist_training` @defense | `community_defense_level` (max 3) | +0.12 |
| `security` @organize_militias | `volunteer_patrol_level` | +0.08 |

No monthly resync from globals — numbers live on `Q.districtParamilitary[d].militia`.

---

## 4. Syndicate home muscle (`PARAMILITARY_SYNDICATE_HOME_DEFAULT`)

Institutional footprint only — **not** monthly rank growth from beating LE. Matches IG home districts in [`prosperity_connection_catalog.md`](../cards/local_organizing/prosperity_connection_catalog.md).

| IG | District | Q | N | M | L |
|----|----------|---|---|---|---|
| Families | Pitts | 0.42 | 0.38 | 0.52 | 0.72 |
| Edges | Railyard | 0.38 | 0.28 | 0.48 | 0.65 |
| Sharks | Deeps | 0.40 | 0.30 | 0.50 | 0.68 |

Not yet merged into `Q.districtParamilitary` or outlaw mass sum.

---

## 5. Corporate police home (`PARAMILITARY_CORP_POLICE_HOME_DEFAULT`)

Separate from city police row; used for corp asset guard / corp LE when wired.

| IG | District | Q | N | M | L |
|----|----------|---|---|---|---|
| Soylent | Vats | 0.78 | 1.20 | 0.58 | 0.62 |
| Magrail | Railyard | 0.76 | 1.15 | 0.56 | 0.60 |
| Brazos | Limelight | 0.77 | 1.18 | 0.57 | 0.61 |

---

## 6. Watch (`PARAMILITARY_WATCH_DEFAULT`)

Future public LE term: `prosperityCoeff × district prosperity + parochialismCoeff × Q.parochialism`.

| Key | Value |
|-----|-------|
| prosperityCoeff | 0.008 |
| parochialismCoeff | 0.0004 |

---

## Related docs

- [`crime_paramilitary.md`](crime_paramilitary.md) — dominance ratio, crime output, monthly tick order
- [`dendry-scene-levers.md`](dendry-scene-levers.md) — scene hooks for paramilitary bumps
