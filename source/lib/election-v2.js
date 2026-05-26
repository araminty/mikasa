/**
 * DEV / CLI ONLY — not compiled into the playable game.
 *
 * Parallel election v2 implementation for Node. Authoritative logic:
 *   source/scenes/election_runtime.scene.dry (MIKASA_ELECTION_RUNTIME_* block)
 *
 * Prefer: npm run simulate-election:v2 -- --from-scene
 * (extract-scene-js loads the scene, not this file, when --from-scene is set)
 *
 * - VoterBlock = demographic × district (no IG on the block)
 * - Interest groups allocate IG-determined ballots (the "floor")
 * - Competitive softmax on the remaining population (variable turnout)
 *
 * Run: node scripts/simulate-election.js --v2
 */

const {
    DISTRICT_POPULATIONS,
    IG_MEMBERSHIP_BY_STRATUM,
    stratumVector: worldStratumVector,
} = require('./election-world-data.js')

const PARTY_KEYS = ['D', 'I', 'C', 'G', 'H']
const PARTY_LABELS = {
    D: 'Dems',
    I: 'Ind',
    C: 'Corp',
    G: 'Gang',
    H: 'Hate',
}

const STRATUM_IDS = ['rich', 'first', 'second', 'coop', 'drone', 'alien', 'deeper', 'third_wave']

const STRATUM_DISPLAY = {
    rich: 'Rich',
    first: 'First',
    second: 'Second',
    coop: 'Clans',
    drone: 'Corp Drone',
    alien: 'Otherworlder',
    deeper: 'Deepers',
    third_wave: '3rd Wave',
}

const DISTRICT_IDS = [
    'Docks', 'Aurora', 'Vats', 'Railyard', 'Pitts', 'Limelight', 'Deeps',
]

const DISTRICT_DISPLAY = {
    Docks: 'District 1 (The Docks)',
    Aurora: 'District 2 (Aurora District)',
    Vats: 'District 3 (The Vats)',
    Railyard: 'District 4 (The Railyard)',
    Pitts: 'District 5 (The Pitts)',
    Limelight: 'District 6 (The Limelight)',
    Deeps: 'District 7 (The Deeps)',
}

/** Home-district multiplier for IG membership share in that district. */
const DISTRICT_IG_BOOST = {
    Soylent: { Vats: 1.4, Railyard: 1.25, Docks: 1.1 },
    Magrail: { Railyard: 1.35, Docks: 1.3, Aurora: 1.1 },
    Brazos: { Limelight: 1.4, Vats: 1.15, Pitts: 1.1 },
    Families: { Pitts: 1.5, Aurora: 1.2, Docks: 1.15 },
    Edges: { Aurora: 1.35, Railyard: 1.2, Limelight: 1.15 },
    Sharks: { Pitts: 1.6, Limelight: 1.2, Deeps: 1.1 },
}

const EXEC_SEATS = 150
const GUILD_SEATS = 35
const DISTRICT_SEATS = 15
const VOTE_SCALE = 10000

const DISTRICT_ELECTION_MONTH = {
    Docks: 6,
    Aurora: 4,
    Vats: 2,
    Railyard: 11,
    Pitts: 5,
    Limelight: 6,
    Deeps: 8,
}

/** Starting prosperity for every voter block in the district (6 = Mikasa average). */
const MIKASA_BLOCK_PROSPERITY_BASE = 6
const DISTRICT_STARTING_PROSPERITY = {
    Docks: 8,
    Aurora: 7,
    Pitts: 4,
}

// --- utilities ----------------------------------------------------------------

const sum = (nums) => nums.reduce((a, b) => a + b, 0)

const zeroPartyVotes = () => ({ D: 0, I: 0, C: 0, G: 0, H: 0 })

function assign_percentages(rawByParty, nSeats) {
    const raw = PARTY_KEYS.map((k) => rawByParty[k] || 0)
    const total = sum(raw)
    if (total === 0 || nSeats === 0) {
        return Object.fromEntries(PARTY_KEYS.map((k) => [k, 0]))
    }
    const votesPerSeat = total / nSeats
    const remainders = raw.map((v) => v % votesPerSeat)
    const whole = raw.map((v, i) => (v - remainders[i]) / votesPerSeat)
    let unassigned = nSeats - sum(whole.map(Math.floor))
    const rem = remainders.slice()
    for (let i = 0; i < unassigned; i++) {
        const idx = rem.reduce((best, x, j, arr) => (x > arr[best] ? j : best), 0)
        whole[idx] += 1
        rem[idx] = 0
    }
    return Object.fromEntries(PARTY_KEYS.map((k, i) => [k, Math.round(whole[i])]))
}

function softmax(scores, temperature = 1) {
    const keys = PARTY_KEYS
    const exps = keys.map((k) => Math.exp((scores[k] || 0) / temperature))
    const total = sum(exps) || 1
    return Object.fromEntries(keys.map((k, i) => [k, exps[i] / total]))
}

// --- VoterBlock: demographic × district only ----------------------------------

class VoterBlock {
    constructor(demographic, district, population) {
        this.demographic = demographic
        this.district = district
        this.population = population
        /** Local economic prosperity (1.0 = baseline). */
        this.prosperity = district.startingProsperity ?? MIKASA_BLOCK_PROSPERITY_BASE
        /** Competitive party scores (events modify these). */
        this.competitiveScores = { D: 0, I: 0, C: 0, G: 0, H: 0 }
        /** Fringe=low steepness, mainstream=high. */
        this.competitiveSteepness = { D: 1, I: 1, C: 1, G: 1, H: 1 }
        demographic.blocks.push(this)
        district.blocks.push(this)
    }

    get id() {
        return `${this.district.id}_${this.demographic.id}`
    }
}

class Demographic {
    constructor(id, config) {
        this.id = id
        this.blocks = []
        this.competitiveScores = Object.assign(
            { D: 0, I: 0, C: 0, G: 0, H: 0 },
            config.competitiveScores || {}
        )
        this.competitiveSteepness = Object.assign(
            { D: 1, I: 1, C: 1, G: 1, H: 1 },
            config.competitiveSteepness || {}
        )
        /** Max share of this stratum claimed by all IGs combined (rest = competitive). */
        this.igClaimCap = config.igClaimCap ?? 0.5
        this.executiveWeight = config.executiveWeight ?? 1
        this.voteRule = config.voteRule || null
    }
}

class District {
    constructor(id, populations, config) {
        this.id = id
        this.blocks = []
        this.populations = populations
        this.competitiveScores = Object.assign(
            { D: 0, I: 0, C: 0, G: 0, H: 0 },
            config.competitiveScores || {}
        )
        this.competitiveTurnoutBonus = config.competitiveTurnoutBonus ?? 0
        this.lowTurnoutGangBonus = config.lowTurnoutGangBonus ?? 0
        this.electionMonth = config.electionMonth ?? 1
        this.startingProsperity =
            config.startingProsperity
            ?? DISTRICT_STARTING_PROSPERITY[id]
            ?? MIKASA_BLOCK_PROSPERITY_BASE
    }
}

/**
 * Interest group: claims a fraction of each stratum and votes with a fixed party mix.
 * @param {object} config
 * @param {'corporate'|'syndicate'|'guild'} config.kind
 * @param {object} config.membershipByStratum - per-stratum id → share (preferred)
 * @param {number[]} config.membership - legacy column-order array
 * @param {object} config.partyShares - D,I,C,G,H summing ~1
 */
class InterestGroup {
    constructor(id, config) {
        this.id = id
        this.kind = config.kind
        this.membership = membershipFromConfig(config)
        this.partyShares = normalizeShares(config.partyShares || { C: 1 })
        this.turnout = config.turnout ?? 0.9
        this.guildSeatKey = config.guildSeatKey || null
    }

    /** Effective membership in a block (national share × district home boost, capped). */
    effectiveMembership(block) {
        const idx = STRATUM_IDS.indexOf(block.demographic.id)
        const base = this.membership[idx] || 0
        const boost = (DISTRICT_IG_BOOST[this.id] || {})[block.district.id] || 1
        return base * boost
    }
}

function normalizeShares(shares) {
    const total = sum(PARTY_KEYS.map((k) => shares[k] || 0)) || 1
    return Object.fromEntries(PARTY_KEYS.map((k) => [k, (shares[k] || 0) / total]))
}

function membershipFromConfig(config) {
    if (config.membershipByStratum) {
        return worldStratumVector(config.membershipByStratum, STRATUM_IDS)
    }
    if (config.membership) {
        return config.membership
    }
    return STRATUM_IDS.map(() => 0)
}

// --- chamber config -----------------------------------------------------------

const CHAMBERS = {
    executive: {
        seats: EXEC_SEATS,
        prefix: 'Exec',
        elects: 'global',
        igKinds: ['corporate', 'syndicate', 'guild'],
        igTurnoutMult: 1,
        competitiveTurnout: 0.35,
        useExecutiveWeight: true,
    },
    guild: {
        seats: GUILD_SEATS,
        elects: 'perGuild',
        igKinds: ['guild'],
        igTurnoutMult: 1.1,
        competitiveTurnout: 0.05,
        useExecutiveWeight: false,
    },
    district: {
        seats: DISTRICT_SEATS,
        elects: 'perDistrict',
        igKinds: ['corporate', 'syndicate'],
        igTurnoutMult: 0.85,
        competitiveTurnout: 0.4,
        useExecutiveWeight: false,
    },
}

// --- world bootstrap ----------------------------------------------------------

function buildInterestGroups() {
    return [
        // Corporate shareholder blocs (→ Corp)
        new InterestGroup('Soylent', {
            kind: 'corporate',
            membershipByStratum: IG_MEMBERSHIP_BY_STRATUM.Soylent,
            partyShares: { C: 0.92, I: 0.05, D: 0.02, G: 0, H: 0.01 },
            turnout: 0.95,
        }),
        new InterestGroup('Magrail', {
            kind: 'corporate',
            membershipByStratum: IG_MEMBERSHIP_BY_STRATUM.Magrail,
            partyShares: { C: 0.9, I: 0.06, D: 0.03, G: 0, H: 0.01 },
            turnout: 0.93,
        }),
        new InterestGroup('Brazos', {
            kind: 'corporate',
            membershipByStratum: IG_MEMBERSHIP_BY_STRATUM.Brazos,
            partyShares: { C: 0.88, I: 0.07, D: 0.03, G: 0.01, H: 0.01 },
            turnout: 0.92,
        }),

        // Criminal syndicate blocs (→ Gang)
        new InterestGroup('Families', {
            kind: 'syndicate',
            membershipByStratum: IG_MEMBERSHIP_BY_STRATUM.Families,
            partyShares: { G: 0.85, H: 0.05, D: 0.05, C: 0.03, I: 0.02 },
            turnout: 0.88,
        }),
        new InterestGroup('Edges', {
            kind: 'syndicate',
            membershipByStratum: IG_MEMBERSHIP_BY_STRATUM.Edges,
            partyShares: { G: 0.82, H: 0.04, D: 0.06, C: 0.05, I: 0.03 },
            turnout: 0.86,
        }),
        new InterestGroup('Sharks', {
            kind: 'syndicate',
            membershipByStratum: IG_MEMBERSHIP_BY_STRATUM.Sharks,
            partyShares: { G: 0.88, H: 0.06, D: 0.03, C: 0.02, I: 0.01 },
            turnout: 0.9,
        }),

        // Guild blocs (guild chamber; also add executive floor)
        new InterestGroup('Executive', {
            kind: 'guild',
            membershipByStratum: IG_MEMBERSHIP_BY_STRATUM.Executive,
            partyShares: { C: 0.75, I: 0.1, D: 0.05, G: 0.05, H: 0.05 },
            turnout: 0.98,
            guildSeatKey: null,
        }),
        new InterestGroup('Gold', {
            kind: 'guild',
            membershipByStratum: IG_MEMBERSHIP_BY_STRATUM.Gold,
            partyShares: { C: 0.7, I: 0.15, D: 0.05, G: 0.05, H: 0.05 },
            turnout: 0.96,
            guildSeatKey: 'Gold',
        }),
        new InterestGroup('White', {
            kind: 'guild',
            membershipByStratum: IG_MEMBERSHIP_BY_STRATUM.White,
            partyShares: { D: 0.35, I: 0.2, C: 0.2, G: 0.1, H: 0.15 },
            turnout: 0.94,
            guildSeatKey: 'White',
        }),
        new InterestGroup('Blue', {
            kind: 'guild',
            membershipByStratum: IG_MEMBERSHIP_BY_STRATUM.Blue,
            partyShares: { D: 0.45, I: 0.15, C: 0.15, G: 0.15, H: 0.1 },
            turnout: 0.92,
            guildSeatKey: 'Blue',
        }),
    ]
}

function buildDemographics() {
    return STRATUM_IDS.map((id) => {
        const configs = {
            rich: {
                igClaimCap: 0.88,
                executiveWeight: 3,
                competitiveScores: { D: -1, C: 1, I: 0.5, G: -0.5, H: 0 },
                competitiveSteepness: { D: 0.4, C: 1.2, G: 0.5, H: 0.5 },
            },
            first: {
                igClaimCap: 0.45,
                executiveWeight: 1.2,
                competitiveScores: { D: 0.5, C: -0.5, G: 0, H: -0.5 },
            },
            second: {
                igClaimCap: 0.38,
                competitiveScores: { D: 0.8, C: -0.8, G: 0.2, H: 0 },
            },
            coop: {
                igClaimCap: 0.35,
                competitiveScores: { D: 1, C: -1.5, G: -0.5, H: -0.5 },
            },
            drone: {
                igClaimCap: 0.8,
                executiveWeight: 0.6,
                voteRule: 'corp_or_abstain',
                competitiveScores: { D: 0.2, C: 1.5, G: 0.3, H: 0 },
                competitiveSteepness: { D: 0.3, C: 1 },
            },
            alien: {
                igClaimCap: 0.25,
                competitiveScores: { D: 1.2, H: -1, G: -0.5, C: -0.5 },
            },
            deeper: {
                igClaimCap: 0.3,
                executiveWeight: 0.8,
                competitiveScores: { D: 1.5, I: 1, C: -1, G: -0.5, H: -0.5 },
            },
            third_wave: {
                igClaimCap: 0.15,
                executiveWeight: 0.5,
                competitiveScores: { D: 1.1, C: -0.6, G: 0.15, H: -0.4, I: 0.2 },
            },
        }
        return new Demographic(id, configs[id] || {})
    })
}

function buildDistricts() {
    const configs = {
        Docks: { electionMonth: DISTRICT_ELECTION_MONTH.Docks, competitiveScores: { C: 0.3, G: 0.2 } },
        Aurora: { electionMonth: DISTRICT_ELECTION_MONTH.Aurora, competitiveScores: { D: 0.2, I: 0.2 } },
        Vats: { electionMonth: DISTRICT_ELECTION_MONTH.Vats, competitiveScores: { C: 0.8, D: -0.3 } },
        Railyard: { electionMonth: DISTRICT_ELECTION_MONTH.Railyard, competitiveScores: { C: 0.6, G: 0.1 } },
        Pitts: {
            electionMonth: DISTRICT_ELECTION_MONTH.Pitts,
            competitiveScores: { G: 0.5, D: 0.2 },
            competitiveTurnoutBonus: -0.15,
            lowTurnoutGangBonus: 1.2,
        },
        Limelight: { electionMonth: DISTRICT_ELECTION_MONTH.Limelight, competitiveScores: { C: 0.4, G: 0.3 } },
        Deeps: { electionMonth: DISTRICT_ELECTION_MONTH.Deeps, competitiveScores: { D: 0.6, I: 0.4, H: -0.3 } },
    }
    return DISTRICT_IDS.map((id) => new District(
        id,
        worldStratumVector(DISTRICT_POPULATIONS[id], STRATUM_IDS),
        configs[id] || {}
    ))
}

function buildVoterBlocks(demographics, districts) {
    const blocks = []
    for (const district of districts) {
        for (let s = 0; s < STRATUM_IDS.length; s++) {
            const pop = district.populations[s]
            if (pop > 0) {
                blocks.push(new VoterBlock(demographics[s], district, pop))
            }
        }
    }
    return blocks
}

// --- tabulation ---------------------------------------------------------------

function blockCompetitiveScores(block, state) {
    const scores = zeroPartyVotes()
    for (const k of PARTY_KEYS) {
        scores[k] =
            (block.demographic.competitiveScores[k] || 0)
            + (block.district.competitiveScores[k] || 0)
            + (block.competitiveScores[k] || 0)
            + (state.global.competitiveScores[k] || 0)
    }
    return scores
}

function blockSteepness(block) {
    const out = {}
    for (const k of PARTY_KEYS) {
        out[k] =
            (block.demographic.competitiveSteepness[k] || 1)
            * (block.competitiveSteepness[k] || 1)
    }
    return out
}

/** Sum of IG membership shares for this block, capped by demographic igClaimCap. */
function claimedFraction(block, interestGroups, chamber) {
    const igs = interestGroups.filter((ig) => chamber.igKinds.includes(ig.kind))
    let raw = sum(igs.map((ig) => ig.effectiveMembership(block)))
    return Math.min(raw, block.demographic.igClaimCap)
}

/**
 * Per–interest-group IG ballots from one VoterBlock (before party split).
 * @returns {{ contributions: Array, votes: object }}
 */
function igContributionsForBlock(block, interestGroups, chamber, state) {
    const votes = zeroPartyVotes()
    const contributions = []
    const igs = interestGroups.filter((ig) => chamber.igKinds.includes(ig.kind))
    const pop = block.population * VOTE_SCALE
    const cap = block.demographic.igClaimCap
    const rawShares = igs.map((ig) => ig.effectiveMembership(block))
    const rawTotal = sum(rawShares) || 1
    const scale = rawTotal > cap ? cap / rawTotal : 1
    const turnoutMult =
        chamber.igTurnoutMult * (state.global.igTurnoutMult || 1)

    for (let i = 0; i < igs.length; i++) {
        const ig = igs[i]
        const rawShare = rawShares[i]
        const scaledShare = rawShare * scale
        const ballots = pop * scaledShare * ig.turnout * turnoutMult
        const igVotes = zeroPartyVotes()
        for (const k of PARTY_KEYS) {
            igVotes[k] = ballots * ig.partyShares[k]
            votes[k] += igVotes[k]
        }
        if (ballots <= 0 && rawShare <= 0) { continue }
        contributions.push({
            igId: ig.id,
            igKind: ig.kind,
            blockId: block.id,
            district: block.district.id,
            demographic: block.demographic.id,
            demographicLabel: STRATUM_DISPLAY[block.demographic.id] || block.demographic.id,
            population: block.population,
            rawMembership: rawShare,
            scaledMembership: scaledShare,
            ballots,
            votes: igVotes,
        })
    }
    return { contributions, votes }
}

function allocateIgVotes(block, interestGroups, chamber, state) {
    return igContributionsForBlock(block, interestGroups, chamber, state).votes
}

/**
 * Aggregate IG-determined ballots by interest group and source VoterBlock.
 * @param {object} state
 * @param {string} chamberId
 * @param {{ minBallots?: number }} options
 */
function buildIgBlockTabulation(state, chamberId = 'executive', options = {}) {
    const chamber = CHAMBERS[chamberId]
    const minBallots = options.minBallots ?? 1
    const byIg = {}

    for (const ig of state.interestGroups) {
        if (!chamber.igKinds.includes(ig.kind)) { continue }
        byIg[ig.id] = {
            igId: ig.id,
            igKind: ig.kind,
            partyShares: Object.assign({}, ig.partyShares),
            totalBallots: 0,
            totalVotes: zeroPartyVotes(),
            blocks: [],
            zeroBlocks: [],
        }
    }

    const includeZeroBlocks = options.includeZeroBlocks === true
    const igById = Object.fromEntries(
        state.interestGroups.map((ig) => [ig.id, ig])
    )

    for (const block of state.blocks) {
        const { contributions } = igContributionsForBlock(
            block, state.interestGroups, chamber, state
        )
        const contributedIg = new Set()
        for (const row of contributions) {
            if (row.ballots < minBallots) { continue }
            contributedIg.add(row.igId)
            const bucket = byIg[row.igId]
            if (!bucket) { continue }
            bucket.blocks.push(row)
            bucket.totalBallots += row.ballots
            for (const k of PARTY_KEYS) {
                bucket.totalVotes[k] += row.votes[k]
            }
        }
        if (includeZeroBlocks) {
            for (const igId of Object.keys(byIg)) {
                if (contributedIg.has(igId)) { continue }
                const ig = igById[igId]
                byIg[igId].zeroBlocks.push({
                    blockId: block.id,
                    district: block.district.id,
                    demographic: block.demographic.id,
                    demographicLabel:
                        STRATUM_DISPLAY[block.demographic.id] || block.demographic.id,
                    population: block.population,
                    rawMembership: ig ? ig.effectiveMembership(block) : 0,
                })
            }
        }
    }

    const blockSort = (a, b) =>
        a.district.localeCompare(b.district)
        || a.demographic.localeCompare(b.demographic)

    for (const igId of Object.keys(byIg)) {
        byIg[igId].blocks.sort((a, b) => b.ballots - a.ballots)
        if (includeZeroBlocks) {
            byIg[igId].zeroBlocks.sort(blockSort)
        }
    }

    return { chamberId, chamberLabel: chamberId, byIg }
}

function competitiveTurnout(block, chamber, state) {
    let t = chamber.competitiveTurnout * (state.global.competitiveTurnout || 1)
    t += block.district.competitiveTurnoutBonus || 0
    t += state.global.competitiveTurnoutBonus || 0
    if (t < 0.05) { t = 0.05 }
    if (t > 1) { t = 1 }
    return t
}

function allocateCompetitiveVotes(block, interestGroups, chamber, state) {
    const votes = zeroPartyVotes()
    const claimed = claimedFraction(block, interestGroups, chamber)
    const competitivePop = block.population * (1 - claimed) * VOTE_SCALE
    if (competitivePop <= 0) { return votes }

    let turnout = competitiveTurnout(block, chamber, state)
  // Low turnout helps gangs in syndicate turf (Pitts)
    if (block.district.lowTurnoutGangBonus && turnout < 0.45) {
        state._gangLowTurnoutBoost = block.district.lowTurnoutGangBonus
    }

    const scores = blockCompetitiveScores(block, state)
    const steep = blockSteepness(block)
    const weighted = {}
    for (const k of PARTY_KEYS) {
        let s = (scores[k] || 0) * (steep[k] || 1)
        if (k === 'G' && state._gangLowTurnoutBoost) {
            s += state._gangLowTurnoutBoost
        }
        weighted[k] = s
    }
    state._gangLowTurnoutBoost = 0

    const shares = softmax(weighted, state.global.softmaxTemperature || 1)
    const ballots = competitivePop * turnout
    for (const k of PARTY_KEYS) {
        votes[k] += ballots * shares[k]
    }
    return votes
}

function corpOrAbstainPartyVotes(votes) {
    const out = zeroPartyVotes()
    out.C = votes.C || 0
    return out
}

function sumPartyVoteObjects(a, b) {
    const out = zeroPartyVotes()
    for (const k of PARTY_KEYS) {
        out[k] = (a[k] || 0) + (b[k] || 0)
    }
    return out
}

function applyDroneCorpOrAbstainRule(block, result, state, chamber) {
    if (block.demographic.voteRule !== 'corp_or_abstain') { return result }
    result.ig = corpOrAbstainPartyVotes(result.ig)
    result.comp = corpOrAbstainPartyVotes(result.comp)
    result.total = sumPartyVoteObjects(result.ig, result.comp)
    return result
}

const BLOCK_VOTE_RULES = [
    applyDroneCorpOrAbstainRule,
]

function applyBlockVoteRules(block, result, state, chamber) {
    for (let r = 0; r < BLOCK_VOTE_RULES.length; r++) {
        result = BLOCK_VOTE_RULES[r](block, result, state, chamber) || result
    }
    return result
}

function tabulateBlock(block, interestGroups, chamber, state) {
    const ig = allocateIgVotes(block, interestGroups, chamber, state)
    const comp = allocateCompetitiveVotes(block, interestGroups, chamber, state)
    let result = {
        ig,
        comp,
        total: sumPartyVoteObjects(ig, comp),
    }
    result = applyBlockVoteRules(block, result, state, chamber)
    const weight = chamber.useExecutiveWeight ? block.demographic.executiveWeight : 1
    if (weight !== 1) {
        for (const k of PARTY_KEYS) {
            result.total[k] *= weight
        }
    }
    return result
}

class ElectionEngineV2 {
    constructor(state) {
        this.state = state
    }

    runChamber(chamberId, options = {}) {
        const chamber = CHAMBERS[chamberId]
        const { interestGroups, blocks, districts } = this.state
        const totals = zeroPartyVotes()
        const byDistrict = {}
        const byGuild = { Gold: zeroPartyVotes(), White: zeroPartyVotes(), Blue: zeroPartyVotes() }

        const activeBlocks =
            options.districtId
                ? blocks.filter((b) => b.district.id === options.districtId)
                : blocks

        for (const block of activeBlocks) {
            const { ig, comp, total } = tabulateBlock(
                block, interestGroups, chamber, this.state
            )
            for (const k of PARTY_KEYS) {
                totals[k] += total[k]
            }
            if (chamber.elects === 'perDistrict') {
                const d = block.district.id
                if (!byDistrict[d]) { byDistrict[d] = zeroPartyVotes() }
                for (const k of PARTY_KEYS) {
                    byDistrict[d][k] += total[k]
                }
            }
            if (chamber.elects === 'perGuild') {
                for (const igroup of interestGroups) {
                    if (igroup.kind !== 'guild' || !igroup.guildSeatKey) { continue }
                    const mem = igroup.effectiveMembership(block) * block.population * VOTE_SCALE
                    for (const k of PARTY_KEYS) {
                        byGuild[igroup.guildSeatKey][k] += mem * igroup.partyShares[k]
                    }
                }
            }
        }

        if (chamber.elects === 'global') {
            return { votes: totals, seats: assign_percentages(totals, chamber.seats) }
        }
        if (chamber.elects === 'perDistrict') {
            const seats = {}
            for (const d of Object.keys(byDistrict)) {
                seats[d] = assign_percentages(byDistrict[d], chamber.seats)
            }
            return { byDistrict, seats }
        }
        if (chamber.elects === 'perGuild') {
            const seats = {}
            for (const g of ['Gold', 'White', 'Blue']) {
                seats[g] = assign_percentages(byGuild[g], chamber.seats)
            }
            return { byGuild, seats }
        }
        return { votes: totals }
    }

    runAll(options = {}) {
        const month = options.month ?? 1
        const results = {
            executive: this.runChamber('executive'),
            guild: this.runChamber('guild'),
            districts: {},
        }
        for (const district of this.state.districts) {
            if (district.electionMonth === month || options.allDistricts) {
                results.districts[district.id] = this.runChamber('district', {
                    districtId: district.id,
                })
            }
        }
        return results
    }

    writeToQ(Q, results) {
        const ex = results.executive.seats
        for (const k of PARTY_KEYS) {
            Q['Exec_' + k] = ex[k]
        }
        for (const g of ['Gold', 'White', 'Blue']) {
            const seats = results.guild.seats[g]
            for (const k of PARTY_KEYS) {
                Q[g + '_' + k] = seats[k]
            }
        }
        for (const d of DISTRICT_IDS) {
            const run = results.districts[d]
            if (!run) { continue }
            const seats = run.seats[d]
            for (const k of PARTY_KEYS) {
                Q[d + '_' + k] = seats[k]
            }
        }
    }
}

// --- global event modifiers (mutate state.global) -----------------------------

const DEFAULT_GLOBAL = {
    competitiveTurnout: 1,
    igTurnoutMult: 1,
    competitiveTurnoutBonus: 0,
    competitiveScores: zeroPartyVotes(),
    softmaxTemperature: 1,
}

/** Example scenarios for CLI tuning. */
const SCENARIOS = {
    baseline: () => ({}),
    democratic_awakening: () => ({
        competitiveTurnout: 1.85,
        competitiveScores: { D: 1.5, H: -0.3 },
        competitiveTurnoutBonus: 0.1,
    }),
    corp_vote_buying: () => ({
        igTurnoutMult: 1.15,
    }),
    pitts_low_turnout: () => ({
        competitiveTurnout: 0.55,
    }),
}

function applyScenario(state, name) {
    const fn = SCENARIOS[name]
    if (!fn) { return }
    Object.assign(state.global, DEFAULT_GLOBAL, fn())
    state.scenario = name
}

// --- init & reporting ---------------------------------------------------------

function qified_pops(Q, state) {
    for (const block of state.blocks) {
        Q[`${block.district.id}_${block.demographic.id}_pop`] = block.population
    }
}

function qified_block_prosperity(Q, state) {
    for (const block of state.blocks) {
        Q[`${block.district.id}_${block.demographic.id}_prosperity`] = block.prosperity
    }
    syncStratumProsperityAverages(Q, state)
}

/** Citywide population-weighted mean prosperity per stratum → Q.prosperity_<id>. */
function syncStratumProsperityAverages(Q, state) {
    for (const sid of STRATUM_IDS) {
        let popSum = 0
        let weighted = 0
        for (const block of state.blocks) {
            if (block.demographic.id !== sid) { continue }
            const pop = block.population
            if (pop <= 0) { continue }
            popSum += pop
            weighted += pop * (block.prosperity ?? MIKASA_BLOCK_PROSPERITY_BASE)
        }
        const avg = popSum > 0 ? weighted / popSum : MIKASA_BLOCK_PROSPERITY_BASE
        Q[`prosperity_${sid}`] = Math.round(avg * 100) / 100
    }
}

function initElectionV2(Q, options = {}) {
    Q = Q || {}
    const demographics = buildDemographics()
    const districts = buildDistricts()
    const interestGroups = buildInterestGroups()
    const blocks = buildVoterBlocks(demographics, districts)

    const state = {
        demographics,
        districts,
        interestGroups,
        blocks,
        global: Object.assign({}, DEFAULT_GLOBAL),
        scenario: 'baseline',
    }

    applyScenario(state, options.scenario || 'baseline')

    const engine = new ElectionEngineV2(state)
    const results = engine.runAll({
        month: options.month ?? 1,
        allDistricts: options.allDistricts ?? true,
    })
    engine.writeToQ(Q, results)

    qified_pops(Q, state)
    qified_block_prosperity(Q, state)

    const igTabOpts = Object.assign({}, options.igTabulation || {}, {
        includeZeroBlocks: options.includeZeroBlocks === true,
    })
    state._igTabOpts = igTabOpts
    state.igTabulation = {
        executive: buildIgBlockTabulation(state, 'executive', igTabOpts),
        district: buildIgBlockTabulation(state, 'district', igTabOpts),
    }

    Q.electionV2 = state
    Q.electionEngine = engine
    Q.electionResults = results
    Q.update_projections = (opts) => {
        const r = engine.runAll({
            month: (opts && opts.month) ?? Q.month ?? 1,
            allDistricts: opts && opts.allDistricts,
        })
        engine.writeToQ(Q, r)
        Q.electionResults = r
        qified_pops(Q, state)
        qified_block_prosperity(Q, state)
        const igTabOpts = state._igTabOpts || {}
        state.igTabulation = {
            executive: buildIgBlockTabulation(state, 'executive', igTabOpts),
            district: buildIgBlockTabulation(state, 'district', igTabOpts),
        }
        return r
    }

    Q.stratum_labels = STRATUM_IDS.slice()
    Q.regions = districts
    Q.stratums = demographics
    Q.interests = interestGroups
    Q.voter_blocks = blocks

    return { Q, state, engine, results }
}

function fmtBallots(n) {
    if (n >= 1e9) { return (n / 1e9).toFixed(2) + 'B' }
    if (n >= 1e6) { return (n / 1e6).toFixed(2) + 'M' }
    if (n >= 1e3) { return (n / 1e3).toFixed(1) + 'K' }
    return String(Math.round(n))
}

function fmtPct(x) {
    return (x * 100).toFixed(1) + '%'
}

/**
 * Text table: which VoterBlocks supply each interest group's IG-determined ballots.
 */
function formatIgBlockTabulation(tabulation, options = {}) {
    if (!tabulation || !tabulation.byIg) { return '' }
    const maxRows =
        options.maxRowsPerIg === Infinity || options.maxRowsPerIg === 'all'
            ? Infinity
            : (options.maxRowsPerIg ?? 12)
    const igFilter = options.igFilter || null
    const lines = []
    lines.push('')
    lines.push(`=== IG vote sources (${tabulation.chamberId} chamber) ===`)
    lines.push(
        'IG-determined ballots per VoterBlock (demographic × district). '
        + 'mem% = effective membership share in that cell after cap scaling.'
    )
    lines.push('')

    const igIds = Object.keys(tabulation.byIg).sort((a, b) => {
        return tabulation.byIg[b].totalBallots - tabulation.byIg[a].totalBallots
    })

    const showZeroBlocks =
        options.includeZeroBlocks === true
        && (maxRows === Infinity || options.listZeroBlocks === true)

    for (const igId of igIds) {
        if (igFilter && igId !== igFilter) { continue }
        const bucket = tabulation.byIg[igId]
        const hasZeros = showZeroBlocks && bucket.zeroBlocks && bucket.zeroBlocks.length > 0
        if (bucket.totalBallots <= 0 && !hasZeros) { continue }

        const shareStr = PARTY_KEYS.map((k) => k + ':' + fmtPct(bucket.partyShares[k] || 0)).join(' ')
        lines.push(`${igId} (${bucket.igKind}) — ${fmtBallots(bucket.totalBallots)} IG ballots  [split ${shareStr}]`)
        lines.push(
            '  ' + padCols(['VoterBlock', 'pop', 'mem%', 'ballots', ...PARTY_KEYS], [28, 5, 6, 8, 5, 5, 5, 5, 5])
        )

        const rows =
            maxRows === Infinity ? bucket.blocks : bucket.blocks.slice(0, maxRows)
        for (const row of rows) {
            const label = `${row.district} × ${row.demographicLabel}`
            const partyCols = PARTY_KEYS.map((k) => fmtBallots(row.votes[k] || 0))
            lines.push(
                '  ' + padCols(
                    [label, String(row.population), fmtPct(row.scaledMembership), fmtBallots(row.ballots), ...partyCols],
                    [28, 5, 6, 8, 5, 5, 5, 5, 5]
                )
            )
        }
        const omitted = bucket.blocks.length - rows.length
        if (omitted > 0) {
            lines.push(`  … ${omitted} more block(s) with smaller contributions`)
        }
        if (hasZeros) {
            lines.push(`  No IG ballots (${bucket.zeroBlocks.length} VoterBlocks):`)
            for (const row of bucket.zeroBlocks) {
                const label = `${row.district} × ${row.demographicLabel}`
                lines.push(
                    '    '
                    + padCols(
                        [label, 'pop ' + row.population, 'raw mem ' + fmtPct(row.rawMembership)],
                        [28, 10, 14]
                    )
                )
            }
        }
        lines.push('')
    }
    return lines.join('\n')
}

function padCols(cells, widths) {
    return cells.map((c, i) => String(c).padEnd(widths[i] || 8)).join(' ')
}

/** Class × district population grid with space-aligned columns. */
function formatPopulationTable(Q, districtIds, stratumIds) {
    const headers = ['Class'].concat(districtIds)
    const rows = stratumIds.map((s) => {
        const label = STRATUM_DISPLAY[s] || s
        const cells = districtIds.map((d) => String(Q[`${d}_${s}_pop`] ?? ''))
        return [label].concat(cells)
    })
    const widths = headers.map((h, col) => {
        let w = h.length
        for (const row of rows) {
            w = Math.max(w, row[col].length)
        }
        return w + 1
    })
    return [padCols(headers, widths)].concat(rows.map((row) => padCols(row, widths)))
}

function formatElectionReportV2(Q, results, options = {}) {
    results = results || Q.electionResults
    const lines = []
    lines.push(`Election v2${Q.electionV2.scenario ? ' [' + Q.electionV2.scenario + ']' : ''}`)
    lines.push('')
    lines.push('Executive Committee:')
    lines.push('  ' + PARTY_KEYS.map((k) => `${k}: ${Q['Exec_' + k]}`).join('  '))
    lines.push('')
    lines.push('Guilds:')
    for (const g of ['Gold', 'White', 'Blue']) {
        lines.push(`  ${g}: ${PARTY_KEYS.map((k) => `${k}:${Q[g + '_' + k]}`).join(' ')}`)
    }
    lines.push('')
    lines.push('Populations (in 10,000s):')
    lines.push(...formatPopulationTable(Q, DISTRICT_IDS, STRATUM_IDS))
    lines.push('')
    lines.push('Districts:')
    for (const d of DISTRICT_IDS) {
        if (!results.districts[d]) { continue }
        lines.push(DISTRICT_DISPLAY[d] || d)
        lines.push('  ' + PARTY_KEYS.map((k) => `${k}: ${Q[d + '_' + k]}`).join('  '))
        lines.push('')
    }
    if (options.includeIgTabulation !== false && Q.electionV2.igTabulation) {
        lines.push(formatIgBlockTabulation(Q.electionV2.igTabulation.executive, options))
        if (options.includeDistrictIgTabulation) {
            lines.push(formatIgBlockTabulation(Q.electionV2.igTabulation.district, options))
        }
    }
    return lines.join('\n')
}

function electionSnapshotV2(Q, results) {
    results = results || Q.electionResults
    const snap = {
        scenario: Q.electionV2.scenario,
        executive: Object.fromEntries(PARTY_KEYS.map((k) => [k, Q['Exec_' + k]])),
        guilds: {},
        districts: {},
        global: Q.electionV2.global,
    }
    for (const g of ['Gold', 'White', 'Blue']) {
        snap.guilds[g] = Object.fromEntries(PARTY_KEYS.map((k) => [k, Q[g + '_' + k]]))
    }
    for (const d of DISTRICT_IDS) {
        snap.districts[d] = Object.fromEntries(
            PARTY_KEYS.map((k) => [k, Q[d + '_' + k]])
        )
    }
    if (Q.electionV2.igTabulation) {
        snap.igTabulation = Q.electionV2.igTabulation
    }
    return snap
}

module.exports = {
    initElectionV2,
    applyScenario,
    formatElectionReportV2,
    formatIgBlockTabulation,
    buildIgBlockTabulation,
    electionSnapshotV2,
    SCENARIOS,
    PARTY_KEYS,
    STRATUM_IDS,
    DISTRICT_IDS,
    InterestGroup,
    VoterBlock,
    CHAMBERS,
}
