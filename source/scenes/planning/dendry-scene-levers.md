# Dendry scene levers — `on-arrival` / choice actions

**Status:** Jun 2026. Reference for authors editing `.scene.dry` cards and events.

Playable logic lives in `source/scenes/**/*.scene.dry`. Runtime APIs are defined in silent `*_runtime.scene.dry` scenes (compiled into `out/html/core.js`). Do not edit `source/lib/*.js` for in-game behavior.

---

## Syntax (two forms)

**Semicolon assignments** — Dendry creates missing qualities as `0` before `+=`:

```dry
on-arrival: police_reform += 1; dundalk_reform += 1
on-arrival: parochialism -= 3; parochial_radicalism -= 0.05
on-arrival: militia_auxiliary = 1
on-arrival: coop_bump = 0.05
```

**JavaScript block** — call `Q` APIs, branching, `typeof` guards:

```dry
on-arrival: {!
Q.spendOrganizingAction();
if (typeof Q.bumpDistrictProsperity === 'function') {
    Q.bumpDistrictProsperity('Pitts', 0.07);
}
if (typeof Q.syncIgAttitudes === 'function') { Q.syncIgAttitudes(); }
!}
```

**Conditions** use `=` not `=>`: `choose-if: police_reform > 4 and militia_auxiliary = 0`

**Party letters** in modifiers and displays: **C** corp, **G** gang, **D** dem, **H** hate, **I** ind.

---

## How levers reach the simulation

| Layer | What you set in a scene | When it bites |
|-------|-------------------------|---------------|
| **Q quality / flag** | `foo += 1` | Immediately on choice; may gate `view-if` / `choose-if` |
| **Electorate stack** | `stackId += 1` + matching row in `electorate_runtime` | Next `Q.update_projections()` (month advance, many card exits) |
| **Derived stack** | e.g. `parochialism`, `prosperity_families` | Auto-synced inside `Q.applyElectorateModifiers()` |
| **Voter-block prosperity** | `<stratum>_bump`, `Q.bumpDistrictProsperity`, `Q.bumpBlockProsperity` | `Q.applyStratumProsperityBumps()` / monthly tick |
| **IG prosperity** | `prosperity_soylent` etc. | Monthly `applyProsperityConnections()` + syndicate drone bribery sync |
| **Attitude** | `soylent_leverage += 1`, `soylent_reprisal += 2` | After change: `Q.syncIgAttitudes()` |
| **Paramilitary ledger** | `Q.bumpDistrictMilitiaMorale`, `Q.bumpDistrictPunkStrength` | Immediate; monthly tick reads `Q.districtParamilitary` |
| **Budget / assets** | `budget += 2`, `Q.queueBudgetExpense`, `Q.addAsset` | `Q.tabulateBudget()` on month tick |
| **Organizing actions** | `Q.spendOrganizingAction()` | Same month; respects `month_actions_remaining` |

Projections and polls refresh when the player advances the month (`advance` → `post_event` → `Q.monthly_tick_phase1()` → `Q.update_projections()`).

---

## Direct Q stats (semicolon-friendly)

### Calendar & phases

| Quality | Role |
|---------|------|
| `month`, `year`, `time` | Calendar (`advance` bumps month) |
| `phase` | Act gate: `>= 1` organizing cards; `> 1` City Affairs ([`main.scene.dry`](../main.scene.dry)). Set to `1` in [`organize_phase_start`](../cards/local_organizing/organize_phase_start.scene.dry); `2` on cable ceasefire deal. |
| `started` | New game vs menu |

### Action economy

| Quality | Role |
|---------|------|
| `month_actions_remaining` | Spend via `Q.spendOrganizingAction()` (do not decrement by hand) |
| `month_actions_limit`, `month_actions_used` | Synced by `Q.syncActionEconomyDisplay()` |
| `action_reserve` | Banks unused actions (cap 4); surge can exceed |
| `action_surge_active` | Phase-start uncapped month (set by runtime, not cards) |
| `contracting_visits_remaining` | Contracting card draws (synced from `phase`) |

### IG leverage & reprisal → attitude

Corps: `soylent_leverage`, `soylent_reprisal`, `magrail_*`, `brazos_*`  
Syndicates: `families_*`, `edges_*`, `sharks_*`

After changing leverage/reprisal, call `Q.syncIgAttitudes()` so `attitude_soylent` etc. update (see `attitude.qdisplay.dry`).

Cable negotiations use reprisal helpers (`Q.cableNegReprisalAdd` / `Sub`) — prefer those inside cable neg scenes.

### IG prosperity (0–20, clamped in economy tick)

| Quality | IG |
|---------|-----|
| `prosperity_soylent`, `prosperity_magrail`, `prosperity_brazos` | Big 3 corps |
| `prosperity_families`, `prosperity_edges`, `prosperity_sharks` | Syndicates |

Feeds home-district prosperity links, syndicate drone bribery (`Q.syncSyndicateDroneWealthStacks`), and future syndicate QNM. Display averages: `prosperity_rich`, `prosperity_drone`, … (synced from blocks, not set directly in scenes).

### City mood / xenophobia

| Quality | Role |
|---------|------|
| `parochialism` | 0–100; above 41 drives `xenophobia_derived` stack automatically |
| `parochial_radicalism` | How much xenophobia H gain Dems can claw back |
| `third_wave_on_society` | Refugee-pressure flag (e.g. Titan event) |

### Police, militia, cable payroll

| Quality | Role |
|---------|------|
| `police_reform` | Security card track; gates militia oversight |
| `police_defund`, `police_investigated` | Security card |
| `police_pay` | Poverty multiple; morale thresholds (`Q.ensurePolicePay()`) |
| `community_defense_level` | Community self-defense organizing (`activist_training`; bumps militia numbers) |
| `volunteer_patrol_level` | Volunteer patrol districts (`security` @organize_militias) |
| `militia_auxiliary` | Police oversee militia (ends degrade chain) |
| `militia_degrade_timer`, `militia_degrade_ready`, `militia_degrade_district` | Countdown state (usually set by tick, not by hand) |

### Organizing tactics (monthly `organize_tick`)

| Quality | Role |
|---------|------|
| `non_violence` | Low → `protest_bad` rises faster; high → `protest_good` |
| `sabotage` | Sabotage track (reprisal interactions with cable promises) |
| `protest_good`, `protest_bad` | Accumulators; threshold effects TBD |

### Media, education, municipal AI stacks

Examples used in cards (each needs `ElectorateModifier` rows in `electorate_runtime.scene.dry`):

- `anti_corp_media`, `self_sufficiency_media`, `kiss_ass_media`
- `vocational_track`, `contract_outside`
- `ai_open_maintenance`, `ai_contract_audit`, `ai_corp_admin`
- `magic_control`, `magic_assimilate`, `magic_school`
- `coop_markets`, `coop_mother`, `coop_investment`

### Community cohesion & crime relief

From `community_outreach.scene.dry` — cohesion is narrative; `crime_relief_*` stacks are wired for future crime tick:

- `crime_relief_first_wave`, `crime_relief_second_wave`, `crime_relief_isolated`, `crime_relief_drones`, `crime_relief_otherworld`
- `first_wave_cohesion`, `second_wave_cohesion`, `isolated_cohesion`, `drones_cohesion`, `otherworld_cohesion`
- `community_*_resolved` — one-shot unlock flags

### Contract patronage flags

Set to `1` on award (`contracting.scene.dry`). Drive electorate rows and `Q.contract_patronage_count`:

`contract_big3_docks`, `contract_big3_vats`, `contract_big3_railyard`, `contract_big3_limelight`, `contract_wealthy_docks`, `contract_wealthy_aurora`, `contract_coop_aurora`, `contract_coop_pitts`, `contract_coop_deeps`, `contract_coop_docks`, `contract_outside`, `fair_contract_uses`

### Cable break / ceasefire (sample)

Many `cable_neg_*` negotiation flags; persisted promises `cable_neg_promise_*`; block flags `cable_promise_block_protest_*`, `cable_promise_block_sabotage_*`. Breaking truces: `Q.cableNegBreakPromise('protest'|'sabotage')`.

Deal outcomes: `cable_break_peace`, `civil_rights_unlock`, `corp_police_city_jurisdiction`, `corp_security_tax`, `Q.police_pay` via `Q.policePayFromCableNegLevel`.

### Drone bribery (December event)

- `drone_syndicate_bribe_boost` — stack + optional `Q.applySyndicateDroneMembershipBribe()`
- `drone_corp_bribe_slip` — stack

### Event / story flags (examples)

One-shot or persistent gates: `dundalk_reform`, `dundalk_stakeholder`, `dundalk_vigil`, `dundalk_nationalist`, `ballroom_refugee_housing`, `aurora_pyramid_housing_event`, `pitts_mines_subsidized`, `orc_marriage_*`, `jovian_refugee_prepare`, `guild_rebel_electronics_event`, advisor toggles `stacy_toggle`, `jacobs_on`, etc.

### Budget

| Quality / API | Role |
|---------------|------|
| `budget` | Simple numeric lever (e.g. MSS Dundalk `budget += 2`) |
| `Q.queueBudgetExpense(amount, sourceId, label)` | One-shot spend on next `Q.tabulateBudget()` |

### Economy display indices (mostly read by UI / future systems)

`trade_level`, `stock_soylent`, `stock_magrail`, `stock_brazos`, `cloud_9_street_price`, `edges_cyber_insurance_premium`, `ocular_index` — set in `organize_phase_tick` init or events; `trade_level` ticks monthly.

---

## Electorate modifier stacks

**Pattern:**

1. In the scene: `on-arrival: my_stack += 1`
2. In `electorate_runtime.scene.dry`: add `new ElectorateModifier('row_id', 'my_stack', scope, target, party, delta)`
3. Effect applies on next projection: **delta × stack value** to competitive scores (stratum, district, or global)

**Scopes:** `stratum` (target: `rich`, `drone`, `coop`, `first`, `second`, `third_wave`, `deeper`, `alien`), `district` (`Docks`, `Aurora`, `Vats`, `Railyard`, `Pitts`, `Limelight`, `Deeps`), `global` (target `''`).

**Derived stacks (do not bump in scenes unless you mean to override):**

- `xenophobia_derived`, `xenophobia_clawed_back` — from `parochialism` / `parochial_radicalism`
- `drone_syndicate_wealth_bribe` — from combined syndicate `prosperity_*`
- `militia_auxiliary`, `community_defense_level`, `volunteer_patrol_level` — catalog rows exist for future crime hooks

Full catalog: `MIKASA_ELECTORATE_RUNTIME_*` in [`electorate_runtime.scene.dry`](../electorate_runtime.scene.dry).

---

## Prosperity levers

### Stratum bump (all blocks of one class, same month)

```dry
on-arrival: coop_bump = 0.05
on-arrival: {! Q.applyStratumProsperityBumps() !}
```

Keys: `rich_bump`, `first_bump`, `second_bump`, `coop_bump`, `drone_bump`, `alien_bump`, `deeper_bump`, `third_wave_bump`.  
If you skip `applyStratumProsperityBumps()` in the scene, the monthly tick applies bumps at phase-1 start.

### District prosperity (all strata in one district)

```dry
on-arrival: {! Q.bumpDistrictProsperity('Pitts', 0.07) !}
```

District ids: `Docks`, `Aurora`, `Vats`, `Railyard`, `Pitts`, `Limelight`, `Deeps`.

### Block prosperity (one district × stratum)

```dry
on-arrival: {! Q.bumpBlockProsperity('Docks', 'first', -0.05) !}
```

Stratum ids: `rich`, `first`, `second`, `coop`, `drone`, `alien`, `deeper`, `third_wave`. Block id at runtime is `<District>_<stratum>` (e.g. `Docks_first`).

### IG prosperity

```dry
on-arrival: prosperity_families += 1
```

Clamped 0–20 in connection tick; also bleeds to home districts per `PROSPERITY_IG_HOME_DISTRICT_LINKS` in `organize_phase_tick.scene.dry`.

### Prosperity connection stacks

Some catalog rows use a `stackId` quality as a multiplier (same `+= 1` pattern). See `Q.prosperityConnectionCatalog` in `organize_phase_tick.scene.dry`.

---

## Paramilitary / crime (partial)

**Implemented helpers** ([`crime_paramilitary_runtime.scene.dry`](../crime_paramilitary_runtime.scene.dry)):

```dry
on-arrival: {!
Q.bumpDistrictMilitiaMorale('Aurora', -0.1)
Q.bumpDistrictPunkStrength('Aurora', 1.25)
Q.police_pay = Q.policePayFromCableNegLevel(2)
!}
```

| API | Effect |
|-----|--------|
| `Q.bumpDistrictMilitiaMorale(district, delta)` | District militia QNM morale (loyalty cap) |
| `Q.bumpDistrictMilitiaNumbers(district, delta)` | District militia numbers |
| `Q.bumpAllDistrictMilitiaNumbers(delta)` | All-district militia numbers |
| `Q.bumpCommunityDefenseOrganizing()` | `activist_training` (+ level, +0.12 numbers) |
| `Q.bumpVolunteerPatrolDistricts()` | `security` patrol (+ level, +0.08 numbers) |
| `Q.bumpDistrictPunkStrength(district, mult)` | District punk `numbers` × mult |
| `Q.ensurePolicePay()` | Normalize invalid `Q.police_pay` to 2 |
| `Q.militiaDegradeMonthlyTick()` | Countdown (called from monthly tick, not cards) |

**Not wired from scenes yet:** writing `<district>_crime`, `Q.crime_level`, long-term crime drift, raid flags. District crime **display** is still a prosperity/poll proxy via `Q.syncDistrictDisplays()` until the paramilitary tick replaces it ([`crime_paramilitary.md`](crime_paramilitary.md)).

---

## Economic assets & housing

```dry
on-arrival: {!
Q.addAsset({ id: 'pitts_coop_contract_workshop', name: '...', district: 'Pitts',
  ownerType: 'stratum', owner: 'coop', kind: 'workshop', major: false })
Q.addHome({ ... })
Q.queueBudgetExpense(3, 'contract_award', 'Municipal contract award')
!}
```

`Q.addAsset` / `Q.addHome` / `Q.ensureEconomicAssets` — [`economic_assets_runtime.scene.dry`](../economic_assets_runtime.scene.dry). Housing processes on `Q.processMonthlyHousing()` each month.

---

## Organizing action pattern

Most organizing subchoices:

```dry
choose-if: month_actions_remaining > 0
on-arrival: {! Q.spendOrganizingAction(); my_stack += 1; !}
```

Card shell often calls `Q.syncActionEconomyDisplay()` on open.

---

## Read-only / computed (do not assign in scenes)

| Output | Source |
|--------|--------|
| `Proj_<District>_<C\|G\|D\|H\|I>`, `<District>_poll_*` | `Q.update_projections()` |
| `Docks_C`, seat counts | Election tabulation |
| `prosperity_rich`, … stratum averages | `Q.qified_block_prosperity()` |
| `<district>_prosperity`, `<district>_crime` display | `Q.syncDistrictDisplays(districtId)` — crime is **proxy** today |
| `attitude_soylent`, … | `Q.syncIgAttitudes()` from leverage/reprisal |
| `overall_tourism`, `overall_longshore` | `economy_tick()` from `trade_level` and `crime_level` |
| `xenophobia_derived` | `Q.syncParochialismXenophobiaStacks()` |

---

## Runtime API index

| Runtime scene | Key `Q` exports for scenes |
|---------------|----------------------------|
| `organize_phase_tick` | `spendOrganizingAction`, `bumpDistrictProsperity`, `bumpBlockProsperity`, `applyStratumProsperityBumps`, `syncIgAttitudes`, `syncActionEconomyDisplay`, `syncContractingAllowance` |
| `electorate_runtime` | (stacks only via qualities); `applyElectorateModifiers` is internal to projections |
| `election_runtime` | `update_projections`, `syncDistrictDisplays`, `runScheduledElections` |
| `attitude_runtime` | `syncIgAttitudes`, `attitude` |
| `economic_assets_runtime` | `addAsset`, `addHome`, `queueBudgetExpense`, `updateJacobsAssetsReport` |
| `crime_paramilitary_runtime` | `bumpDistrictMilitiaMorale`, `bumpDistrictPunkStrength`, `policePayFromCableNegLevel`, `ensurePolicePay`, `updateStacyParamilitaryReport`, `renderStacyParamilitaryReport` |
| `cable_break_negotiations` | `cableNegBreakPromise`, reprisal helpers (large local API) |

Bootstrap order: [`setup_functions.scene.dry`](../setup_functions.scene.dry) loads missing runtimes before `main`.

---

## Checklist for a new choice effect

1. Pick lever type: flag, stack, prosperity, leverage, or `Q` API.
2. If stack: add `ElectorateModifier` row(s) before relying on `foo += 1`.
3. If attitude-sensitive: end with `Q.syncIgAttitudes()`.
4. If prosperity same month: call `applyStratumProsperityBumps()` or `bumpDistrictProsperity` in the same `on-arrival`.
5. If spend is an organizing action: `Q.spendOrganizingAction()` + `choose-if: month_actions_remaining > 0`.
6. Run `npm run lint:dendry` and `npm run make-html` before shipping.
