/**
 * DEV / CLI ONLY — not compiled into the playable game.
 *
 * District populations and IG membership by stratum id (not column index).
 * Authoritative copy lives in source/scenes/election_runtime.scene.dry (DISTRICT_POPULATIONS).
 * If you change populations or IG membership, edit the .scene.dry first, then mirror here for
 * scripts that require() this module (election-v2.js standalone sim).
 */

const STRATUM_ORDER = [
    'rich', 'first', 'second', 'coop', 'drone', 'alien', 'deeper', 'third_wave',
]

/** Population in 10,000s per district × stratum. */
const DISTRICT_POPULATIONS = {
    Docks: {
        rich: 17, first: 42, second: 30, coop: 3, drone: 11, alien: 1, deeper: 1,
        third_wave: 1,
    },
    Aurora: {
        rich: 0, first: 58, second: 57, coop: 61, drone: 2, alien: 9, deeper: 3,
    },
    Vats: {
        rich: 1, first: 8, second: 11, coop: 11, drone: 48, alien: 0, deeper: 1,
    },
    Railyard: {
        rich: 0, first: 12, second: 10, coop: 12, drone: 52, alien: 0, deeper: 1,
    },
    Pitts: {
        rich: 0, first: 28, second: 71, coop: 15, drone: 2, alien: 0, deeper: 1,
    },
    Limelight: {
        rich: 1, first: 19, second: 22, coop: 11, drone: 55, alien: 0, deeper: 1,
    },
    Deeps: {
        rich: 1, first: 24, second: 17, coop: 3, drone: 1, alien: 1, deeper: 166,
    },
}

/** National IG membership share per stratum (fraction of that stratum in the IG). */
const IG_MEMBERSHIP_BY_STRATUM = {
    Soylent: {
        rich: 0.08, first: 0.02, second: 0.01, drone: 0.22,
    },
    Magrail: {
        rich: 0.06, first: 0.02, second: 0.01, drone: 0.18,
    },
    Brazos: {
        rich: 0.07, first: 0.02, second: 0.02, drone: 0.15,
    },
    Families: {
        rich: 0.02, first: 0.04, second: 0.08, coop: 0.01, drone: 0.01,
    },
    Edges: {
        rich: 0.01, first: 0.05, second: 0.07, coop: 0.01, drone: 0.01,
    },
    Sharks: {
        rich: 0.01, first: 0.03, second: 0.1, drone: 0.01,
    },
    Executive: {
        rich: 0.35, first: 0.01, drone: 0.02,
    },
    Gold: {
        rich: 0.15, first: 0.01,
    },
    White: {
        first: 0.12, second: 0.04, coop: 0.01,
    },
    Blue: {
        first: 0.05, second: 0.1, coop: 0.02, drone: 0.08,
    },
}

function stratumVector(byStratum, stratumIds) {
    const ids = stratumIds || STRATUM_ORDER
    return ids.map((id) => Number(byStratum[id]) || 0)
}

function validateStratumRecord(byStratum, label, stratumIds) {
    const ids = stratumIds || STRATUM_ORDER
    if (!byStratum || typeof byStratum !== 'object') {
        throw new Error(`election-world-data: ${label} must be an object`)
    }
    for (const key of Object.keys(byStratum)) {
        if (!ids.includes(key)) {
            throw new Error(
                `election-world-data: unknown stratum "${key}" in ${label} `
                + `(expected one of: ${ids.join(', ')})`
            )
        }
        const n = byStratum[key]
        if (typeof n !== 'number' || Number.isNaN(n)) {
            throw new Error(`election-world-data: ${label}.${key} must be a number`)
        }
    }
}

function validateWorldData(stratumIds) {
    const ids = stratumIds || STRATUM_ORDER
    for (const districtId of Object.keys(DISTRICT_POPULATIONS)) {
        validateStratumRecord(
            DISTRICT_POPULATIONS[districtId],
            `DISTRICT_POPULATIONS.${districtId}`,
            ids
        )
    }
    for (const igId of Object.keys(IG_MEMBERSHIP_BY_STRATUM)) {
        validateStratumRecord(
            IG_MEMBERSHIP_BY_STRATUM[igId],
            `IG_MEMBERSHIP_BY_STRATUM.${igId}`,
            ids
        )
    }
}

validateWorldData()

module.exports = {
    STRATUM_ORDER,
    DISTRICT_POPULATIONS,
    IG_MEMBERSHIP_BY_STRATUM,
    stratumVector,
    validateStratumRecord,
    validateWorldData,
}
