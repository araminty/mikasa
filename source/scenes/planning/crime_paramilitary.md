# Crime & paramilitary system

**Status:** design ready for implementation (Jun 2026). Replaces the display-only stub in `Q.syncDistrictDisplays()` and wires into `monthly_tick_phase1`.

**Roadmap:** [`roadmap.md`](../../roadmap.md) — District crime (planned).

---

## Overview

Crime and collateral damage from warfare flow through **paramilitary groups** — armed capacity tied to a patron (or to nobody). Each month, sum **law-enforcement strength** and **outlaw strength** per district, form a **dominance ratio** `R`, and apply **threshold bands** (no continuous curve). Narrative events (blind eye, raid heat, …) apply **sudden out-of-band shocks** rather than slowly rewriting background levels.

**Terminology:**

| Term | Meaning |
|------|---------|
| **QNM** | **Q**uality, **N**umbers, **M**orale — the three stats that multiply into faction strength |
| **LE** | Law-enforcement strength in a district (public order side) |
| **Outlaw mass** | Criminal strength (syndicates + punks) |
| **`R`** | `outlaw_mass / LE` — dominance ratio |
| **District crime** | Output label (1–10, [`crime.qdisplay.dry`](../../qdisplays/crime.qdisplay.dry)) derived from `R` bands |
| **Watch** | Background LE from district prosperity (flip side of punks) |

---

## QNM

Each paramilitary has **quality**, **numbers**, **morale**, and **loyalty**.

- **Strength** = `Q × N × M`
- **Loyalty** caps how high morale can rise (rebellion phase later; already matters for police vs militia).

**Starting posture:** city police — higher quality, **lower loyalty** (brittle, corruptible). Militias — lower quality, **more room to grow** via morale under sustained crime.

---

## Actors

| Paramilitary | Patron | Role |
|--------------|--------|------|
| Syndicate muscle | Families, Edges, Sharks | District footprint; `prosperity_*` feeds QNM strength and (separately) drone bribery |
| Corporate police | Soylent, Magrail, Brazos | Protect corp assets in home (and spill) districts |
| City police | City government | Baseline public order; reform/defund changes QNM and loyalty |
| Community militias | Democratic movement | Volunteer LE; lower starting quality, higher loyalty headroom |
| Punks (name TBD) | None | Background outlaw strength when big players are quiet |
| Watch | None (ambient) | Background LE from affluence / prosperity |

**Rank dynamics:** syndicates and corps **do not** grow or shrink from the **LE balance** (dominance vs police/militia does not recruit or bleed ranks). Syndicate `prosperity_*` and future asset investment may expand ranks; corps hire from institutional budgets. Law enforcement does not face an ever-moving criminal headcount — only punks (and narrative shocks) drift on ambient conditions.

**Exception:** syndicate **vs** syndicate war (open conflict) can cost **both** sides numbers and/or morale each month — the main way syndicate paramilitaries shrink outside narrative events.

---

## Building LE and outlaw mass

### Public LE (per district)

```
LE = city_police + militia + watch + parochialism_nudge [+ corp_police_buff]
```

| Component | Source |
|-----------|--------|
| City police, militia | QNM strength in district |
| **Watch** | Small bonus from population-weighted **district prosperity** |
| Parochialism nudge | Very small LE boost from `Q.parochialism` (less than watch) |
| Corp police buff | If leverage > reprisal: add `(3% × leverage) − (1% × reprisal)` of local corporate police strength (tune constants) |

### Outlaw mass (per district)

```
outlaw_mass = sum(syndicate QNM in district) + punks
```

Syndicate `prosperity_*` and district G footprint feed syndicate QNM as **slow institutional inputs** (not monthly growth from beating LE). Mirror home-district links in [`PROSPERITY_IG_HOME_DISTRICT_LINKS`](../cards/local_organizing/organize_phase_tick.scene.dry) (Families → Pitts + spill, Sharks → Deeps, etc.).

### Dominance ratio

```
R = outlaw_mass / LE     (if LE <= 0, treat as collapsing)
```

Same ratio pattern reused for sub-matchups (corp assets, per-syndicate coercion) with their own thresholds where needed.

---

## Threshold bands

Default bands on **`R`** for public order. Dead zones between bands reduce monthly oscillation. Optional **hysteresis** (different cutoffs up vs down) if playtests show flip-flopping.

### LE morale drift (police + militia)

Compare **local** `R` with a **small citywide** spillover on the same bands. Threshold bases in `crime_paramilitary_runtime`: secure `0.10`, embattled `0.40`, overwhelmed `0.60`, each **+ 0.05 × `Q.police_pay`**.

| Band | Monthly band drift (police) | Militia |
|------|----------------------------|---------|
| Secure | **+0.02** | ×1.5 |
| Embattled | 0 | 0 |
| Overwhelmed | **−0.02** | ×1.5 |
| Collapsing | **−0.04** + civil-order-collapse flag | ×1.5 |

Additionally each month morale **reverts 5%** toward its stored base; when `Q.police_pay` rises, base bumps **+0.05 × pay increase**. Apply `clampMoraleByLoyalty` after drift. Low militia morale → [`militia_degrade.scene.dry`](../cards/city_affairs/militia_degrade.scene.dry). [`security.scene.dry`](../cards/city_affairs/security.scene.dry) changes police QNM and loyalty.

### Punks

Morale/numbers drift **with** lawlessness (`R`), not from institutional budget.

### District crime level (output)

**Immediate** component each month: `5 × R`. **Long-term** component drifts by crime band (floor 0): low **−0.05**, moderate **0**, high/severe **+0.05**. **Combined** = immediate + long-term (+ modifiers); scales Democrat voter-block penalty (`demSupportPenalty`). Tier 1–4 from combined thresholds 2.5 / 5 / 7.5.

| R | Crime band |
|---|------------|
| < 0.25 | Low |
| 0.25 – 0.50 | Moderate |
| 0.50 – 0.75 | High |
| ≥ 0.75 | Severe |

Plus `<district>_crime_modifier` stacks and minus `crime_relief_*` from [`community_outreach.scene.dry`](../cards/local_organizing/community_outreach.scene.dry).

### City spillover

Each district's **effective crime** ≈ **80% local + 20% city aggregate** (local control dominates).

**City crime** = population-weighted average of district crime → `Q.crime_level`. Feeds tourism/longshore in [`organize_phase_tick.scene.dry`](../cards/local_organizing/organize_phase_tick.scene.dry), [`PROSPERITY_PITTS_CRIME`](../cards/local_organizing/organize_phase_tick.scene.dry), and citywide attitudes.

### Other matchups (same ratio idea)

| Matchup | Effect |
|---------|--------|
| Corp police vs local outlaw mass | Affluence delta by band (before scaling): protected **+0.01**, stressed **−0.01**, breached **−0.03**, lost **−0.05**; × corp asset share in district |
| Each syndicate vs LE (+ enemy syndicate if at war) | Affluence delta: suppressed **−0.01**, contested **0**, dominating **+0.05**, rampant **+0.08**; × `(assetShare × 0.65 + 0.05)`. On **gains only**, sheltered strata (rich/drone/coop/deeper) lose 5%, vulnerable (first/second/third_wave/alien) lose 15% |
| Syndicate at war | Enemy strength added to LE **for that syndicate's coercion matchup only** (not general crime) |

---

## Open conflict

When two paramilitaries are in **open conflict** (syndicate vs syndicate; corp vs corp while `cable_break_peace = 0`; syndicate vs corp):

- Arithmetic **mean** of their QNM strengths → severity of violence, collateral damage, mutual attrition.
- **Syndicate wars:** both sides lose numbers and/or morale proportional to intensity.
- Corp wars: attrition TBD (morale/numbers and/or infra).
- Collateral may tie to [`corp_conflict.scene.dry`](../background/corp_conflict.scene.dry) infra damage.

### Destructive raid progress (war pairs)

While faction **A** and **B** are tagged **at war**, each side keeps its own **raid progress** tracker (0–∞%, building toward strikes on the other). **Peace** resets both trackers to **0**.

#### Monthly progress gain (each side)

```
mean = (strength_A + strength_B) / 2
side_bonus = (strength_side / mean - 1) × bonus_rate    // 0 if side is smaller
raw_gain_side = mean × (1 + side_bonus)
gain_side = raw_gain_side / (LE / crime)               // citywide LE/crime; tune if district-local fits better
```

| War type | `bonus_rate` (larger side) | Progress multiplier |
|----------|----------------------------|---------------------|
| Default (syndicate–syndicate, corp–corp, …) | **5%** | ×1 |
| **Syndicate vs corporation** | **25%** on the larger side (usually the corp) | **×1.6** on both sides' gains |

`LE` and `crime` here are **general** public-order values (citywide `LE` sum or mean and `Q.crime_level` — pick one consistent definition at implementation). Higher order (large `LE / crime`) **slows** raid buildup.

Check thresholds **after** applying monthly gain (and after any same-month attrition).

#### Raid triggers (attacker → target)

Use [`Q.economicAssets`](../economic_assets_runtime.scene.dry) housing/asset counts **owned by the target faction**. District order for ties = [`DISTRICT_IDS`](../election_runtime.scene.dry) index (**Docks = 1** … **Deeps = 7**).

| Progress | Condition | Target district | Effect |
|----------|-----------|-----------------|--------|
| **≥ 50%** | Target has **any housing** | District where target has the **most** housing | Housing destroyed (raid); ties → **lower** district number |
| **≥ 100%** | Target has **any assets** | District where target has the **fewest** assets | Asset destroyed (raid); ties → **higher** district number; then **progress −= 100** |

- Housing and asset raids can both fire as progress climbs (e.g. housing at 50%, asset at 100% in one buildup).
- If the relevant condition fails (no housing at 50%, no assets at 100%), that threshold does nothing until the target holds stock.
- Hook destruction through existing economic-asset APIs (`destroy` / housing bucket helpers in [`economic_assets_runtime.scene.dry`](../economic_assets_runtime.scene.dry)).

#### Monthly raid report (UI)

At end of paramilitary tick, build `Q.monthly_raid_report`:

- **Empty string** if nothing was destroyed this month.
- Otherwise one line per raid: **`X blew up Y in Z`** (attacker label, housing/asset label, district name).

Display at the **top of [`main.scene.dry`](../main.scene.dry)** via `[+ monthly_raid_report +]` (or raw HTML block). Clear or regenerate each month in `monthly_tick_phase1`.

---

## Political and prosperity effects

**Per-district crime** (stratum-weighted exposure):

- Background drain on voter-block prosperity — cooperatives and drones more secured; waves more vulnerable.
- Electorate modifier on **D** from crime — **nonlinear:** at low `parochialism`, modest crime can slightly help democrats; runaway crime is a large liability.

**City crime** drives both:

- `parochialism` **up** (population rallies together).
- `parochial_radicalism` **up** (same stress makes extremism more appealing).

**Syndicate coercion:** per-syndicate `R` vs LE → district voter shift toward G; not rank growth.

### Drone vote buying (separate system)

**Not** derived from `R`. Combined syndicate affluence (`prosperity_families` + `edges` + `sharks`) → citywide drone stratum shift toward G / away from effective C.

- **Implemented:** `Q.syncSyndicateDroneWealthStacks` + catalog rows in [`electorate_runtime.scene.dry`](../electorate_runtime.scene.dry).
- **FUTURE:** per-syndicate prosperity → separate puppet-party modifiers.
- Event spike: [`drone_vote_buying.dry`](../background/drone_vote_buying.dry) (`drone_syndicate_bribe_boost`) stacks on top.

---

## Exceptional events (out of band)

Blind eye, raid heat, and similar beats **outside** the monthly band logic:

- One-month flags (e.g. LE discounted vs one syndicate).
- Instant QNM / attrition hits.
- Temporary `crime_modifier` spikes decaying over 1–3 months.

Cable promises ([`cable_break_negotiations.scene.dry`](../major/cable_break_negotiations.scene.dry)) are the primary source; disband-militia guts LE on finalize.

---

## Card / stack hooks

| Source | Hook |
|--------|------|
| [`security.scene.dry`](../cards/city_affairs/security.scene.dry) | Police QNM, loyalty, numbers; `crime_modifier` |
| [`militia_degrade.scene.dry`](../cards/city_affairs/militia_degrade.scene.dry) | Militia QNM; patrol flags → modifier |
| [`community_outreach.scene.dry`](../cards/local_organizing/community_outreach.scene.dry) | `crime_relief_*` stacks |
| Cable syndicate events | Shock flags + electorate stacks |
| Attitude runtime | Leverage/reprisal → corp police in LE sum |
| [`drone_vote_buying.dry`](../background/drone_vote_buying.dry) | Affluence bribery — outside paramilitary tick |

---

## Monthly tick order

1. Apply narrative shock flags/deltas (if any).
2. Prosperity → watch; parochialism nudge; punk floor.
3. Syndicate/corp QNM from `prosperity_*` (slow institutional update only).
4. Morale drift: police, militia (from `R` bands); punks.
5. Open-conflict pairs → collateral + attrition; raid progress gain + threshold checks; apply housing/asset destruction; set `Q.monthly_raid_report`.
6. `R` → per-district crime; blend ~20% city spillover.
7. Population-weighted city crime → tourism, longshore, parochialism, parochial_radicalism.
8. Crime → block prosperity drain (stratum weights).
9. Syndicate coercion from per-matchup `R` (not rank change).
10. Decay temporary event modifiers.

**Outside this tick:** drone wealth stacks sync on `Q.applyElectorateModifiers` each projection.

---

## Implementation

| Piece | Location |
|-------|----------|
| Runtime API | [`crime_paramilitary_runtime.scene.dry`](../crime_paramilitary_runtime.scene.dry) — `calc*` + `apply*` template pairs (`MIKASA_CRIME_PARAMILITARY_*`); monthly tick still hooks from `monthly_tick_phase1` |
| QNM defaults | [`paramilitary_qnm_catalog.md`](paramilitary_qnm_catalog.md) — per-district police/punks, militia formula, syndicate/corp home rows on `Q.paramilitaryQnm*` |
| District display | [`election_runtime.scene.dry`](../election_runtime.scene.dry) `syncDistrictDisplays()` reads ticked `<district>_crime`; retire `gPoll`/`hPoll` proxy |
| Labels | [`crime.qdisplay.dry`](../../qdisplays/crime.qdisplay.dry) |
| Corp war tick | Wire [`corp_conflict.scene.dry`](../background/corp_conflict.scene.dry) while `cable_break_peace = 0` |
| Raid report UI | Top of [`main.scene.dry`](../main.scene.dry) — `Q.monthly_raid_report` |

---

## Open tuning (implementation-time)

- Exact numeric cutoffs and hysteresis per band.
- Raid progress scale (whether `mean` needs a coefficient so 50%/100% land on sensible month counts).
- Citywide vs district `LE / crime` divisor for raid buildup.
- Whether crossing 50% housing resets or only fires once per war.
- Coercion → poll shift magnitudes per syndicate.
- Punks floor/ceiling; district specials (Deeps isolation, Docks patchwork).
- Whether syndicate `prosperity_*` feeds Q, N, or both.
- Corp-vs-corp attrition during cable war vs ceasefire.
- Rebellion-phase loyalty on all paramilitaries.
