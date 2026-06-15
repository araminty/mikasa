Making elections matter under corporate oligarchy: secure leverage without a majority, buy control with **マ**, lock it as **ツマ**.

## マ and ツマ

| Term | Reading | Meaning |
|------|---------|---------|
| **マ** | *ma* | Political room with an IG: `leverage − reprisal`. Bastardized katakana (from 間). |
| **ツマ** | *tsuma* | Room already **committed** — toleration, government support, etc. (from 詰). |
| *(free マ)* | — | `マ − ツマ`. Affordability and grey-out checks use this. |

Per IG. Leverage is not spent; deals add **ツマ** (drop government → **ツマ** clears). Reforms raise reprisal → shrink **マ** (may make existing **ツマ** unaffordable). Attitude labels are cosmetic — grey out on free **マ**, not `wary` / `contempt`.

Player-facing: **マ**, **ツマ** (draft as `_ma` / `_tsuma` in prose — auto-expanded on save). Code: `*_ma`, `*_tsuma`, or `*_committed`.

## Districts

1. **Aurora** — Dem-held from start (**partly reformed**: judiciary, modest worker protections baked in). Hold it; push more reforms from day one (reprisal per reform **lower than corp districts**). Losing Aurora: later.
2. **Deeps** — win Deepers' trust; later.
3. **Pitts / Docks** — volatile seat math; still mostly about (4). **Docks** failure ≠ unstable — **corp flunky** (same class as city executive).
4. **Corp districts + city** — deny anyone a clean majority; trade toleration for leverage.

Home corps lean on drone votes. Mass drone abstention shifts power to 1st/2nd/3rd waves and coops.

## Toleration and control

**Toleration:** Home corp loses outright majority → player may prop leadership for leverage while keeping them in power. **Dem seats count** toward that bloc (e.g. 6C + 4D = 10). Losing home government is a major corp blow.

**Control** (district or city, no outright majority): pay free **マ** to corps/syndicates; cost scales with their seat share; payment adds **ツマ**. Unaffordable **ツマ** → lose government (renegotiate or collapse).

**City:** Free year of control after tether snap (reprisal may exceed leverage — corps placate off-station interests). After grace: need free **マ** or immediate renegotiation, else **corp flunky** (pre-tether figure). Toleration works like districts.

**Unstable:** Player can't govern and no corp can rule even with player toleration → bribery chaos (bad for home corp, good for syndicates). Enough collapses → gangs may become the main threat. **Exception: Docks** — flunky, not unstable.

**Coalition check:** On each district vote; district menu can refresh sooner. Enumerate possible coalitions; grey out if free **マ** is insufficient. Voluntary renegotiation: clear **ツマ** to free **マ** (toleration swap); trigger TBD.

**Leverage loop:** Toleration is the easiest leverage source. Control somewhere usually means tolerate elsewhere. Higher vote share → more toleration leverage, lower support costs.

**H:** Never in player coalitions (refuse minority role, plan violent seizure). Keep their seats down.

**Scope:** toleration, control, unstable only. Corps and gangs usually hate each other enough to deal — unless more afraid of the player → endgame war.

## Reforms

Need government control. Passing usually raises reprisal; post-reform free **マ** must still sustain control or the reform doesn't pass.

| Kind | Effect | Reprisal notes |
|------|--------|----------------|
| Pro-worker | Money from corp → workers (home district + Docks); weakens target corp | Other corps unless at war with target |
| Anti-crime | Weakens syndicates | Corps skip reprisal if control doesn't depend on gangs |
| Pro-democratic | Electorate shift (e.g. free drones); big reprisal all around | Dual-path + maintenance rules below |
| Minor (judiciary, etc.) | No reprisal spike | Government also boosts police/militia effectiveness |

Survive pro-democratic reprisal to next election → much less deal-dependent.

Aurora toleration (if ever): desperation — hostile corp/syndicate control does fast damage.

## Pro-democratic dual path

Before vote, two distinct majority coalitions must exist (player uses one to pass):

- Non-D members **disjoint** between paths (D may appear in both). **H** excluded. **Home-district IGs** excluded (all homes in multi-home districts, e.g. Pitts).
- Pre-vote: two coalitions with free **マ**, each a majority of non-home IGs (no corp/syndicate in either path; no **H** required — a pure D+I path can count if it alone reaches majority). Paying adds **ツマ**.
- Post-vote: at least one coalition with enough free **マ** after the reprisal spike (preview paths need not still work; may require concessions elsewhere).
- Home corp/syndicate may still **prop government** post-reform (high leverage) without having voted for the reform. Vote coalition ≠ maintenance coalition.

## Witness protection (anti-crime, TBD)

Track: **`witness_protection_level`** (0 = none). Aurora-first.

| Level bump | How | Reprisal |
|------------|-----|----------|
| 0 → 1 | Aurora council — pilot program | Small, **gangs** |
| +1 | Aurora council — grow capacity | More gang reprisal |
| +1 | Geopolitical — joint network with other **cycler waystations** (TBD) | **None** (secret) |
| per district | Districts **join** (unlock level ≥ 2) | Low; strong anti-crime hooks TBD |

**District join** at level ≥ 2. **Blind-eye payoff** — level gates whether station manager survives broken promise ([`cable_syndicate_blind_eye.scene.dry`](source/scenes/events/cable_syndicate_blind_eye.scene.dry)); replaces `police_reform` / `police_investigated` for Marcus Hale (likely level ≥ 2).

State: `witness_protection_level`; optional `witness_protection_join_*` per district.

## Achievements (add later)

| Title | Icon | Unlock |
|-------|------|--------|
| Got 'em by the short hairs. | clothespin | Post–pro-democratic reform: **corporation** supports government in home district. |
| An offer they can't refuse. | cottonball | Same, **syndicate**. |

## Implementation

Draft API (not wired to boot/tick): `source/scenes/political_power_runtime.scene.dry` — `Q.ppCheckDistrictControl`, `Q.ppCheckExecutiveControl`, `Q.ppFindProDemocraticDualPaths`, `Q.ppCheckPostReformMaintenance`, etc.
