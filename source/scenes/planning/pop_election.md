# Pop election migration (feature/pop-election)

Paradox-style **pops** replace **VoterBlock** (demographic × district) as the unit of electorate simulation on this branch. `main` keeps voter blocks until the pop backend is complete.

Object design scratch pad: [`pop_objects_sketch.md`](pop_objects_sketch.md).

## Backend switch

| `Q.election_backend` | Backend | Boot scene |
|----------------------|---------|------------|
| `0` (default) | Voter blocks | `election_runtime.scene.dry` |
| `1` | Pops (WIP) | `pop_election_runtime.scene.dry` |

Set on new game in `root.scene.dry` (`election_backend = 0`). Dev override: `@dev_election_backend_pops` on the start menu (bootstrap will not finish until `Q.electionPops.ready = 1`).

Shared helpers live in `election_config_runtime.scene.dry`:

- `Q.getElectionState()` — `Q.electionV2` or `Q.electionPops`
- `Q.getElectionUnits()` — blocks or pops array
- `Q.electionBackendIsPops()` / `Q.electionBackendIsVoterBlocks()`

## Voter-block touchpoints (migrate to facade or pops)

| File | Uses |
|------|------|
| `setup_functions.scene.dry` | boot routing, readiness |
| `election_runtime.scene.dry` | full v2 engine (frozen on branch until pops parity) |
| `organize_phase_tick.scene.dry` | `Q.electionV2`, block prosperity bumps |
| `electorate_runtime.scene.dry` | `Q.electionV2` for modifier targets |
| `economic_assets_runtime.scene.dry` | `Q.electionV2.blocks` for housing per block |
| `game_over.scene.dry` | `Q.electionV2` snapshot |

New pop code should read units via `Q.getElectionUnits()` where possible. Legacy code can stay on `Q.electionV2` until each subsystem is ported.

## Pop model (v0)

Each `Pop` has: `districtId`, `stratumId`, `size`, `partySupport`, `prosperity`, `igMembership`, `turnoutMult`.

Tabulation must still write the same flat `Q` seat keys (`Vats_C`, `Proj_*`, `Exec_*`, …) so district scenes, status, and political power need no rewrites.

## Done criteria for flipping default backend

1. `buildPopsFromWorldData()` (or equivalent) replaces `buildVoterBlocks`
2. Pop tabulation matches v2 seat outputs on baseline save (CLI regression)
3. `organize_phase_tick` prosperity + `economic_assets` housing work on pops
4. `Q.electionPops.ready = 1`
5. Election sim + main game boot on backend `1`

## CLI

Node mirrors stay in `source/lib/` for dev only. When pops land, add extraction from `MIKASA_POP_ELECTION_RUNTIME_BEGIN` parallel to `--from-scene` for election v2.


-----------------

gonna be real, too depressed to process what the AI wrote above here right now.

Right now there are stuff referenced by joining strings and using indexes and junk.  Let's make it all beautiful objects.

Pops: the population would be put into pops.  These would have:
-size, most pops will be exactly 10k people but some will be smaller to handle the leftovers
-a single culture (e.g. first wave)
-an labor tier (some firms require higher tier labor, i.e. skilled engineers vs manual labor)
-a district
-a name for the "neighborhood" where they live, each pop gets it's own
-employment (see firms below)
-savings
-expected cost of basket
-history of basket purchase costs
-market supplied by (see below)
-prepayments for stockpiles (see markets)

Firms: these will be the basic unit of where labor gets used in the economy.  They will cover not only businesses but also government offices, cooperatives, dockyard facilities, etc.  Some firms will consume goods.  These purchases will be handled before pops get their baskets filled.  If the goods a firm needs dont already exist in stockpiles, a firm can buy part of the months output from another firm that is supplied in order to allow for recovery from disruption even if there are partly-circular chains (i.e. tool works needs metal from mines which need tools).  Firms will also have a fallback production which they can do even if unsupplied (they scrounge stuff up somewhere).  When a firm uses fallback production the usage will be recorded so that they can replace the scrounged up stuff when it's available.  The first month of fallback production is at 50% output while subsequent months are at 10%.

Markets: these exist to aggregate the demand of pops and firms so that we can do fancy supply-demand calculations and comparisons without iterating through every pop and firm.  The markets aren't firms themselves and have no employment, they are just means of getting everything added up.  The markets will take in goods, figure out prices and output Baskets.  The combined savings and employment of all the pops in a market will be used to determine what it's going to buy.  Markets will generally try to save up stockpiles of stuff that pops consume.  When they do this the money for the purchase gets subtracted from the pops and it gets recorded how much the market owes each pop.

Baskets: Pops will only get the goods they need by buying a basket from their local market every month.  They always buy exactly one (although a basket might be empty).  How full a basket is determines how much labor a pop will output.  If they get an empty basket they will be too busy trying to scrounge up stuff to keep themselves alive.  Pops wont store up goods between months, the market serves as a collective storage for all the pops.

For now let's just not connect any of this to mikasa stuff.  Let's do pure javascript just to see if we can smoothly handle many pops and firms.


currency is in "new Yen" (which is the Deeps is called Ni-En and elsewhere is called nuyen).  Pops and firms dont go negative.

the initial demand is created from the pop's starting savings.

The goods in the market get silently collected and converted into baskets so that we dont need to handle pop purchases.  All we look at is the costs of the baskets and if they are not full, how much labor the pop loses, in terms of percentage of their full labor.

Scrounging by firms and pops just comes out of the ether.  Pops never 'repay' the scrounged goods, firms repay them when they have a new supplier.

I'm thinking one market per district but maybe that should be revisited.

Market stockpiles are "owned" by the pops in the market, it's just never calculated which pops own what goods.  Instead the pops just have prepayments in addition to their savings.  So basically the savings of the pops get converted into prepayments when stockpiles acumulate.  When markets need to eat into their stockpiles, they reduce the prepayments of their pops for the fraction of the baskets coming from prepayments and the savings of the pops wont get deducted for that share of the purchases.

In a sense the markets belong to the pops, they just represent the collective purchasing of the pops in the market.