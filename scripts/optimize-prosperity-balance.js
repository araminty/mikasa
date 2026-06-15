#!/usr/bin/env node
/**
 * Iteratively tune prosperity linkage coefficients (and optionally starter asset
 * counts) so a 6-month economic tick keeps population-weighted block prosperity
 * near its post-seed baseline, while penalizing large linkage values.
 *
 *   node scripts/optimize-prosperity-balance.js
 *   node scripts/optimize-prosperity-balance.js --show-decays
 *   node scripts/optimize-prosperity-balance.js --iterations 30
 *   node scripts/optimize-prosperity-balance.js --tune-assets --iterations 50
 *   node scripts/optimize-prosperity-balance.js --method spsa --iterations 100
 *   node scripts/optimize-prosperity-balance.js --no-heuristic --no-progress
 *
 * Links-only mode (default) caches the seeded world and replays link-only trials.
 * Link coefficients are clamped to [0, maxLink]. Heuristic signs skip bad directions.
 *
 * Loads the same scene runtimes as simulate-prosperity-months.js (authoritative .dry sources).
 */

const fs = require('fs')
const path = require('path')
const { loadGameRuntimes, loadSceneOnArrival } = require('./extract-scene-js.js')

const ROOT = path.join(__dirname, '..')
const SCENES = path.join(ROOT, 'source', 'scenes')
const ORGANIZE_TICK = path.join(SCENES, 'cards/local_organizing/organize_phase_tick.scene.dry')
const ECONOMIC_RUNTIME = path.join(SCENES, 'economic_assets_runtime.scene.dry')

const N_ASSETS = 11

/** Mirror STARTER_ECONOMIC_ASSET_BATCHES in economic_assets_runtime.scene.dry */
const DEFAULT_ASSET_BATCHES = [
    { key: 'brazos_vats', ownerType: 'ig', owner: 'Brazos', district: 'Limelight', count: 25 },
    { key: 'magrail_railyard', ownerType: 'ig', owner: 'Magrail', district: 'Railyard', count: 27 },
    { key: 'soylent_vats', ownerType: 'ig', owner: 'Soylent', district: 'Vats', count: 28 },
    { key: 'families_pitts', ownerType: 'ig', owner: 'Families', district: 'Pitts', count: 9 },
    { key: 'edges_railyard', ownerType: 'ig', owner: 'Edges', district: 'Railyard', count: 7 },
    { key: 'sharks_deeps', ownerType: 'ig', owner: 'Sharks', district: 'Deeps', count: 7 },
    { key: 'coop_aurora', ownerType: 'stratum', owner: 'coop', district: 'Aurora', count: 20 },
    { key: 'rich_docks', ownerType: 'stratum', owner: 'rich', district: 'Docks', count: 6 },
    { key: 'first_aurora', ownerType: 'stratum', owner: 'first', district: 'Aurora', count: 5 },
    { key: 'second_aurora', ownerType: 'stratum', owner: 'second', district: 'Aurora', count: 3 },
    { key: 'alien_aurora', ownerType: 'stratum', owner: 'alien', district: 'Aurora', count: 1 },
]

/** Mirror PROSPERITY_INTRA_DISTRICT_DEFAULT in organize_phase_tick.scene.dry */
const DEFAULT_INTRA_MESH = {
    rich: {
        rich: 0, first: 0.0102, second: 0.0115, coop: 0.0104, drone: 0, alien: 0, deeper: 0, third_wave: 0,
    },
    first: {
        rich: 0, first: 0, second: 0.012, coop: 0.011, drone: 0.0031, alien: 0, deeper: 0, third_wave: 0,
    },
    second: {
        rich: 0, first: 0.0117, second: 0, coop: 0.0112, drone: 0.0032, alien: 0, deeper: 0, third_wave: 0,
    },
    coop: {
        rich: 0, first: 0.0007, second: 0.011, coop: 0, drone: 0.0033, alien: 0, deeper: 0, third_wave: 0,
    },
    drone: {
        rich: 0, first: 0.01, second: 0.0104, coop: 0.0108, drone: 0, alien: 0, deeper: 0, third_wave: 0,
    },
    alien: {
        rich: 0, first: 0, second: 0, coop: 0, drone: 0, alien: 0, deeper: 0.0104, third_wave: 0,
    },
    deeper: {
        rich: 0, first: 0, second: 0, coop: 0, drone: 0, alien: 0.00795, deeper: 0, third_wave: 0,
    },
    third_wave: {
        rich: 0, first: 0.0101, second: 0.0106, coop: 0.0104, drone: 0, alien: 0, deeper: 0, third_wave: 0,
    },
}

/** Mirror PROSPERITY_IG_HOME_DISTRICT_LINKS */
const DEFAULT_IG_HOME_LINKS = [
    {
        ig: 'Soylent',
        district: 'Vats',
        toStrata: {
            rich: 0.0109, first: 0.0049, second: 0.0115, coop: 0.012, drone: 0.0057, alien: 0, deeper: 0.0026, third_wave: 0,
        },
    },
    {
        ig: 'Magrail',
        district: 'Railyard',
        toStrata: {
            rich: 0, first: 0.0052, second: 0.00965, coop: 0.0135, drone: 0.0058, alien: 0, deeper: 0.00155, third_wave: 0,
        },
    },
    {
        ig: 'Brazos',
        district: 'Limelight',
        toStrata: {
            rich: 0.0112, first: 0.0071, second: 0.0115, coop: 0.012, drone: 0.006, alien: 0, deeper: 0.0026, third_wave: 0,
        },
    },
    {
        ig: 'Families',
        district: 'Pitts',
        toStrata: {
            rich: 0, first: 0.01015, second: 0.014, coop: 0.012, drone: 0, alien: 0, deeper: 0.00095, third_wave: 0,
        },
    },
    {
        ig: 'Edges',
        district: 'Railyard',
        toStrata: {
            rich: 0, first: 0.0012, second: 0.01055, coop: 0.0115, drone: 0, alien: 0, deeper: 0.0012, third_wave: 0,
        },
    },
    {
        ig: 'Sharks',
        district: 'Deeps',
        toStrata: {
            rich: 0.0106, first: 0.011, second: 0.011, coop: 0.0108, drone: 0, alien: 0.0011, deeper: 0.015, third_wave: 0,
        },
    },
]

/** Self-feedback decay rows in Q.prosperityConnectionCatalog (affluence / prosperity bleed). */
const AFFLUENCE_DECAY_ROWS = [
    { id: 'decay_rich', scope: 'stratum', target: 'rich', coefficient: -0.05 },
    { id: 'decay_first', scope: 'stratum', target: 'first', coefficient: -0.05 },
    { id: 'decay_second', scope: 'stratum', target: 'second', coefficient: -0.105 },
    { id: 'decay_coop', scope: 'stratum', target: 'coop', coefficient: -0.25 },
    { id: 'decay_drone', scope: 'stratum', target: 'drone', coefficient: -0.02 },
    { id: 'decay_alien', scope: 'stratum', target: 'alien', coefficient: -0.02 },
    { id: 'decay_deeper', scope: 'stratum', target: 'deeper', coefficient: -0.02 },
    { id: 'decay_third_wave', scope: 'stratum', target: 'third_wave', coefficient: -0.05 },
    { id: 'decay_soylent', scope: 'ig', target: 'Soylent', coefficient: -0.30 },
    { id: 'decay_magrail', scope: 'ig', target: 'Magrail', coefficient: -0.30 },
    { id: 'decay_brazos', scope: 'ig', target: 'Brazos', coefficient: -0.30 },
    { id: 'decay_families', scope: 'ig', target: 'Families', coefficient: -0.02 },
    { id: 'decay_edges', scope: 'ig', target: 'Edges', coefficient: -0.02 },
    { id: 'decay_sharks', scope: 'ig', target: 'Sharks', coefficient: -0.02 },
]

const STRATA = [
    'rich', 'first', 'second', 'coop', 'drone', 'alien', 'deeper', 'third_wave',
]

const IG_PROSPERITY_KEYS = [
    'soylent', 'magrail', 'brazos', 'families', 'edges', 'sharks',
]

function parseArgs(argv) {
    const opts = {
        months: 6,
        iterations: 200,
        residualMult: 10,
        linkWeight: 1,
        verbose: false,
        progress: true,
        showDecays: false,
        jsonOut: null,
        help: false,
        linksOnly: true,
        heuristicSign: true,
        asymmetric: true,
        method: 'coordinate',
        assetStep: 1,
        linkStep: 0.00005,
        minAsset: 0,
        maxAsset: 60,
        minLink: 0,
        maxLink: 0.02,
        spsaA0: 0.002,
        spsaC0: 0.0002,
        spsaAlpha: 0.602,
        spsaGamma: 0.101,
    }
    for (let i = 0; i < argv.length; i++) {
        const a = argv[i]
        if (a === '--help' || a === '-h') { opts.help = true }
        else if (a === '--verbose') { opts.verbose = true }
        else if (a === '--no-progress') { opts.progress = false }
        else if (a === '--show-decays') { opts.showDecays = true }
        else if (a === '--links-only') { opts.linksOnly = true }
        else if (a === '--tune-assets') { opts.linksOnly = false }
        else if (a === '--no-heuristic') { opts.heuristicSign = false }
        else if (a === '--both-directions') { opts.asymmetric = false }
        else if (a === '--method') {
            const m = String(argv[++i] || 'coordinate').toLowerCase()
            opts.method = (m === 'spsa') ? 'spsa' : 'coordinate'
        }
        else if (a === '--months') { opts.months = Math.max(1, parseInt(argv[++i], 10) || 6) }
        else if (a === '--iterations') { opts.iterations = Math.max(1, parseInt(argv[++i], 10) || 200) }
        else if (a === '--residual-mult') { opts.residualMult = parseFloat(argv[++i]) || 10 }
        else if (a === '--link-weight') { opts.linkWeight = parseFloat(argv[++i]) || 1 }
        else if (a === '--json-out') {
            const next = argv[i + 1]
            opts.jsonOut = (next && !next.startsWith('--'))
                ? path.resolve(next)
                : path.join(ROOT, 'out', 'prosperity-optim-result.json')
            if (opts.jsonOut === path.resolve(next)) { i++ }
        }
    }
    if (opts.verbose) { opts.progress = false }
    if (opts.method === 'spsa' && !opts.linksOnly) {
        console.warn('optimize-prosperity: SPSA requires --links-only; enabling links-only.')
        opts.linksOnly = true
    }
    return opts
}

function buildLinkParamSpec() {
    const spec = []
    for (let fi = 0; fi < STRATA.length; fi++) {
        const from = STRATA[fi]
        const row = DEFAULT_INTRA_MESH[from] || {}
        for (let ti = 0; ti < STRATA.length; ti++) {
            const to = STRATA[ti]
            if (from === to) { continue }
            const base = Number(row[to]) || 0
            if (base === 0) { continue }
            spec.push({
                kind: 'intra',
                from,
                to,
                base,
                key: `intra:${from}->${to}`,
            })
        }
    }
    for (let li = 0; li < DEFAULT_IG_HOME_LINKS.length; li++) {
        const link = DEFAULT_IG_HOME_LINKS[li]
        const strata = link.toStrata || {}
        for (const sid in strata) {
            if (!Object.prototype.hasOwnProperty.call(strata, sid)) { continue }
            const base = Number(strata[sid]) || 0
            if (base === 0) { continue }
            spec.push({
                kind: 'ig_home',
                ig: link.ig,
                district: link.district,
                stratum: sid,
                base,
                key: `ig:${link.ig}:${sid}`,
            })
        }
    }
    return spec
}

const LINK_PARAM_SPEC = buildLinkParamSpec()

function deepCloneMesh(mesh) {
    const out = {}
    for (const from in mesh) {
        if (!Object.prototype.hasOwnProperty.call(mesh, from)) { continue }
        out[from] = Object.assign({}, mesh[from])
    }
    return out
}

function deepCloneIgLinks(links) {
    return links.map(function(link) {
        return {
            ig: link.ig,
            district: link.district,
            toStrata: Object.assign({}, link.toStrata),
        }
    })
}

function baselineLinkVector() {
    return LINK_PARAM_SPEC.map(function(spec) { return spec.base })
}

function baselineVector() {
    const vec = DEFAULT_ASSET_BATCHES.map(function(b) { return b.count })
    for (let i = 0; i < LINK_PARAM_SPEC.length; i++) {
        vec.push(LINK_PARAM_SPEC[i].base)
    }
    return vec
}

function baselineVectorForOpts(opts) {
    return opts.linksOnly ? baselineLinkVector() : baselineVector()
}

function linkIndexFromParam(i, opts) {
    return opts.linksOnly ? i : i - N_ASSETS
}

function isLinkParam(i, opts) {
    return opts.linksOnly || i >= N_ASSETS
}

function vectorToPlan(vec, opts) {
    const assetCounts = opts.linksOnly
        ? DEFAULT_ASSET_BATCHES.map(function(b) { return b.count })
        : []
    if (!opts.linksOnly) {
        for (let i = 0; i < DEFAULT_ASSET_BATCHES.length; i++) {
            const n = Math.round(vec[i])
            assetCounts.push(Math.max(opts.minAsset, Math.min(opts.maxAsset, n)))
        }
    }
    const linkStart = opts.linksOnly ? 0 : N_ASSETS
    const linkCoeffs = []
    for (let j = 0; j < LINK_PARAM_SPEC.length; j++) {
        const v = vec[linkStart + j]
        linkCoeffs.push(Math.max(opts.minLink, Math.min(opts.maxLink, v)))
    }
    return { assetCounts, linkCoeffs }
}

function applyMeshFromCoeffs(baseMesh, linkCoeffs) {
    const mesh = deepCloneMesh(baseMesh)
    for (let i = 0; i < LINK_PARAM_SPEC.length; i++) {
        const spec = LINK_PARAM_SPEC[i]
        if (spec.kind !== 'intra') { continue }
        if (!mesh[spec.from]) { mesh[spec.from] = {} }
        mesh[spec.from][spec.to] = linkCoeffs[i]
    }
    return mesh
}

function applyIgLinksFromCoeffs(baseLinks, linkCoeffs) {
    const links = deepCloneIgLinks(baseLinks)
    for (let i = 0; i < LINK_PARAM_SPEC.length; i++) {
        const spec = LINK_PARAM_SPEC[i]
        if (spec.kind !== 'ig_home') { continue }
        for (let li = 0; li < links.length; li++) {
            if (links[li].ig !== spec.ig) { continue }
            links[li].toStrata[spec.stratum] = linkCoeffs[i]
            break
        }
    }
    return links
}

function applyLinksToQ(Q, linkCoeffs) {
    Q.prosperityIntraDistrictMeshDefault = applyMeshFromCoeffs(
        DEFAULT_INTRA_MESH,
        linkCoeffs,
    )
    Q.prosperityIgHomeDistrictLinks = applyIgLinksFromCoeffs(
        DEFAULT_IG_HOME_LINKS,
        linkCoeffs,
    )
}

function initBaseQ() {
    const Q = loadGameRuntimes({
        refreshProjections: true,
        commitSeats: true,
    })
    Q.month = Q.month ?? 1
    Q.year = Q.year ?? 2300
    Q.phase = Q.phase ?? 1
    Q.crime_level = Q.crime_level ?? 1.1
    Q.trade_level = Q.trade_level ?? 1.12

    loadSceneOnArrival(ORGANIZE_TICK, { Q })
    loadSceneOnArrival(ECONOMIC_RUNTIME, { Q })
    return Q
}

function stripStarterAssets(Q) {
    Q.economicAssets = (Q.economicAssets || []).filter(function(entry) {
        return !String(entry.id || '').startsWith('starter_asset_')
    })
    Q.economicAssetsStarterSeeded = 0
}

function seedStarterAssets(Q, assetCounts) {
    stripStarterAssets(Q)
    if (typeof Q.addAsset !== 'function') {
        throw new Error('optimize-prosperity-balance: Q.addAsset missing — load economic_assets_runtime')
    }
    for (let bi = 0; bi < DEFAULT_ASSET_BATCHES.length; bi++) {
        const batch = DEFAULT_ASSET_BATCHES[bi]
        const count = assetCounts[bi]
        for (let i = 0; i < count; i++) {
            const id = 'starter_asset_' + batch.owner + '_' + batch.district + '_' + i
            let name = batch.owner + ' site ' + (i + 1)
            if (typeof Q.pickOwnerDisplayName === 'function') {
                name = Q.pickOwnerDisplayName({
                    ownerType: batch.ownerType,
                    owner: batch.owner,
                    district: batch.district,
                    id: id,
                })
            }
            Q.addAsset({
                id: id,
                name: name,
                district: batch.district,
                ownerType: batch.ownerType,
                owner: batch.owner,
            })
        }
    }
    Q.economicAssetsStarterSeeded = 1
}

function captureBlockProsperity(Q) {
    const state = Q.electionV2
    const map = new Map()
    if (!state || !state.blocks) { return map }
    for (let i = 0; i < state.blocks.length; i++) {
        const b = state.blocks[i]
        if (b.population <= 0) { continue }
        map.set(b.id, b.prosperity ?? 6)
    }
    return map
}

function snapshotSimState(Q) {
    const state = Q.electionV2
    const blocks = []
    if (state && state.blocks) {
        for (let i = 0; i < state.blocks.length; i++) {
            const b = state.blocks[i]
            blocks.push({ id: b.id, prosperity: b.prosperity ?? 6 })
        }
    }
    const ig = {}
    for (let k = 0; k < IG_PROSPERITY_KEYS.length; k++) {
        const name = IG_PROSPERITY_KEYS[k]
        ig[name] = Q['prosperity_' + name]
    }
    return {
        blocks: blocks,
        ig: ig,
        housing: JSON.parse(JSON.stringify(Q.economicHousingInventory || [])),
        assets: JSON.parse(JSON.stringify(Q.economicAssets || [])),
        month: Q.month,
        year: Q.year,
    }
}

function restoreSimState(Q, snap) {
    const state = Q.electionV2
    const byId = new Map()
    for (let i = 0; i < snap.blocks.length; i++) {
        byId.set(snap.blocks[i].id, snap.blocks[i].prosperity)
    }
    if (state && state.blocks) {
        for (let i = 0; i < state.blocks.length; i++) {
            const block = state.blocks[i]
            if (byId.has(block.id)) {
                block.prosperity = byId.get(block.id)
            }
        }
    }
    for (const name in snap.ig) {
        if (Object.prototype.hasOwnProperty.call(snap.ig, name)) {
            Q['prosperity_' + name] = snap.ig[name]
        }
    }
    Q.economicHousingInventory = JSON.parse(JSON.stringify(snap.housing))
    Q.economicAssets = JSON.parse(JSON.stringify(snap.assets))
    Q.month = snap.month
    Q.year = snap.year
}

function runProsperityMonth(Q) {
    if (typeof Q.applyStratumProsperityBumps === 'function') {
        Q.applyStratumProsperityBumps()
    }
    if (typeof Q.applyEconomicAssetProsperity === 'function') {
        Q.applyEconomicAssetProsperity()
    }
    if (typeof Q.applyProsperityConnections === 'function') {
        Q.applyProsperityConnections()
    }
    if (typeof Q.processMonthlyHousing === 'function') {
        Q.processMonthlyHousing()
    }
}

function prepareQ(plan) {
    const Q = initBaseQ()
    if (typeof Q.initEconomicAssets === 'function') {
        Q.initEconomicAssets()
    }
    seedStarterAssets(Q, plan.assetCounts)
    applyLinksToQ(Q, plan.linkCoeffs)

    if (typeof Q.applyEconomicAssetProsperity === 'function') {
        Q.applyEconomicAssetProsperity()
    }
    if (typeof Q.qified_block_prosperity === 'function') {
        Q.qified_block_prosperity()
    }
    return Q
}

function buildEvalCache(plan, opts) {
    const Q = prepareQ(plan)
    const initial = captureBlockProsperity(Q)
    return {
        opts: opts,
        Q: Q,
        snap: snapshotSimState(Q),
        initial: initial,
        assetCountsKey: plan.assetCounts.join(','),
    }
}

function runSimulation(Q, initial, plan, opts) {
    for (let m = 0; m < opts.months; m++) {
        runProsperityMonth(Q)
    }
    const loss = computeLoss(Q, initial, plan, opts)
    return loss
}

function evaluateCached(cache, plan, opts) {
    restoreSimState(cache.Q, cache.snap)
    applyLinksToQ(cache.Q, plan.linkCoeffs)
    const loss = runSimulation(cache.Q, cache.initial, plan, opts)
    return { loss: loss, plan: plan, initial: cache.initial, Q: cache.Q }
}

function computeLoss(Q, initialProsperity, plan, opts) {
    const state = Q.electionV2
    let popSum = 0
    let weightedSq = 0

    for (let i = 0; i < state.blocks.length; i++) {
        const block = state.blocks[i]
        if (block.population <= 0) { continue }
        const init = initialProsperity.get(block.id)
        if (init == null) { continue }
        const final = block.prosperity ?? 6
        const err = final - init
        weightedSq += block.population * err * err
        popSum += block.population
    }

    const residualLoss = opts.residualMult * (popSum > 0 ? weightedSq / popSum : 0)

    let linkPenalty = 0
    for (let c = 0; c < plan.linkCoeffs.length; c++) {
        linkPenalty += Math.abs(plan.linkCoeffs[c])
    }

    return {
        total: residualLoss + opts.linkWeight * linkPenalty,
        residualLoss: residualLoss,
        linkPenalty: linkPenalty,
        popSum: popSum,
    }
}

function evaluateVector(vec, opts, cache) {
    const plan = vectorToPlan(vec, opts)
    if (cache) {
        if (cache.assetCountsKey !== plan.assetCounts.join(',')) {
            cache = buildEvalCache(plan, opts)
        }
        return evaluateCached(cache, plan, opts)
    }
    const Q = prepareQ(plan)
    const initial = captureBlockProsperity(Q)
    const loss = runSimulation(Q, initial, plan, opts)
    return { loss: loss, plan: plan, initial: initial, Q: Q }
}

function targetBlocksForLinkSpec(spec, state) {
    const out = []
    if (!state || !state.blocks) { return out }
    for (let i = 0; i < state.blocks.length; i++) {
        const block = state.blocks[i]
        if (block.population <= 0) { continue }
        if (spec.kind === 'intra') {
            if (block.demographic && block.demographic.id === spec.to) {
                out.push(block)
            }
        } else if (spec.kind === 'ig_home') {
            if (block.district && block.district.id === spec.district
                && block.demographic && block.demographic.id === spec.stratum) {
                out.push(block)
            }
        }
    }
    return out
}

function computeLinkHeuristicSigns(Q, initialProsperity, vec, opts) {
    const signs = new Array(LINK_PARAM_SPEC.length)
    const state = Q.electionV2
    const errThreshold = 0.02

    for (let li = 0; li < LINK_PARAM_SPEC.length; li++) {
        const spec = LINK_PARAM_SPEC[li]
        const vi = opts.linksOnly ? li : li + N_ASSETS
        const coeff = Number(vec[vi]) || 0
        const targets = targetBlocksForLinkSpec(spec, state)
        let popSum = 0
        let weightedErr = 0

        for (let ti = 0; ti < targets.length; ti++) {
            const block = targets[ti]
            const init = initialProsperity.get(block.id)
            if (init == null) { continue }
            const err = (block.prosperity ?? 6) - init
            weightedErr += block.population * err
            popSum += block.population
        }

        const avgErr = popSum > 0 ? weightedErr / popSum : 0
        if (avgErr < -errThreshold) {
            signs[li] = 1
        } else if (avgErr > errThreshold) {
            signs[li] = -1
        } else if (coeff > 0) {
            signs[li] = -1
        } else {
            signs[li] = 1
        }
    }
    return signs
}

function stepSizeForIndex(index, opts) {
    return isLinkParam(index, opts) ? opts.linkStep : opts.assetStep
}

function clampTrialValue(value, index, opts) {
    if (isLinkParam(index, opts)) {
        return Math.max(opts.minLink, Math.min(opts.maxLink, value))
    }
    return Math.max(opts.minAsset, Math.min(opts.maxAsset, Math.round(value)))
}

function directionsForIndex(i, vec, opts, heuristicSigns) {
    if (!isLinkParam(i, opts)) {
        return opts.asymmetric ? [1, -1] : [1, -1]
    }
    const li = linkIndexFromParam(i, opts)
    let preferred = null
    if (opts.heuristicSign && heuristicSigns) {
        preferred = heuristicSigns[li]
    }
    const coeff = Number(vec[i]) || 0
    if (preferred === 1) {
        return coeff >= opts.maxLink - 1e-12 ? [] : [1]
    }
    if (preferred === -1) {
        return coeff <= opts.minLink + 1e-12 ? [] : [-1]
    }
    return opts.asymmetric ? [1, -1] : [1, -1]
}

function tryTrial(vec, i, dir, step, opts, cache, best) {
    const trial = vec.slice()
    trial[i] = clampTrialValue(trial[i] + dir * step, i, opts)
    if (Math.abs(trial[i] - vec[i]) < 1e-15) {
        return { improved: false, vec: vec, best: best }
    }
    const result = evaluateVector(trial, opts, cache)
    if (result.loss.total < best.loss.total) {
        return { improved: true, vec: trial, best: result }
    }
    return { improved: false, vec: vec, best: best }
}

function optimizeCoordinate(vec, opts, cache) {
    let best = evaluateVector(vec, opts, cache)
    let stepScale = 1
    let heuristicSigns = null

    if (opts.verbose) {
        console.log('Baseline loss:', best.loss.total.toFixed(6),
            `(residual=${best.loss.residualLoss.toFixed(6)}, link=${best.loss.linkPenalty.toFixed(6)})`)
    }

    for (let iter = 0; iter < opts.iterations; iter++) {
        if (opts.heuristicSign && opts.linksOnly) {
            heuristicSigns = computeLinkHeuristicSigns(best.Q, best.initial, vec, opts)
        }

        let improved = false
        const order = vec.map(function(_, idx) { return idx })
        shuffleInPlace(order)

        for (let oi = 0; oi < order.length; oi++) {
            const i = order[oi]
            const step = stepSizeForIndex(i, opts) * stepScale
            const dirs = directionsForIndex(i, vec, opts, heuristicSigns)

            for (let di = 0; di < dirs.length; di++) {
                const attempt = tryTrial(vec, i, dirs[di], step, opts, cache, best)
                if (attempt.improved) {
                    best = attempt.best
                    vec = attempt.vec
                    improved = true
                    if (opts.verbose) {
                        console.log(
                            `iter ${iter + 1} idx ${i} dir ${dirs[di]} -> loss ${best.loss.total.toFixed(6)}`,
                        )
                    }
                    if (opts.asymmetric && dirs.length > 1) { break }
                }
            }
        }

        if (!improved) {
            stepScale *= 0.5
            if (stepScale < 1e-6) { break }
        }

        renderProgress(iter, opts.iterations, {
            bestLoss: best.loss.total,
            stepScale: stepScale,
        }, opts)
    }

    clearProgress(opts)
    return { vec: vec, best: best, stepScale: stepScale }
}

function optimizeSpsa(vec, opts, cache) {
    let best = evaluateVector(vec, opts, cache)
    let stepScale = 1

    if (opts.verbose) {
        console.log('SPSA baseline loss:', best.loss.total.toFixed(6))
    }

    for (let k = 0; k < opts.iterations; k++) {
        const ak = opts.spsaA0 * stepScale / Math.pow(k + 1, opts.spsaAlpha)
        const ck = opts.spsaC0 / Math.pow(k + 1, opts.spsaGamma)
        const delta = vec.map(function() {
            return Math.random() < 0.5 ? 1 : -1
        })

        const plus = vec.slice()
        const minus = vec.slice()
        for (let i = 0; i < vec.length; i++) {
            plus[i] = clampTrialValue(vec[i] + ck * delta[i], i, opts)
            minus[i] = clampTrialValue(vec[i] - ck * delta[i], i, opts)
        }

        const lossPlus = evaluateVector(plus, opts, cache).loss.total
        const lossMinus = evaluateVector(minus, opts, cache).loss.total
        const scale = (lossPlus - lossMinus) / (2 * ck)

        for (let i = 0; i < vec.length; i++) {
            vec[i] = clampTrialValue(vec[i] - ak * scale * delta[i], i, opts)
        }

        const trial = evaluateVector(vec, opts, cache)
        if (trial.loss.total < best.loss.total) {
            best = trial
            if (opts.verbose) {
                console.log(`spsa ${k + 1} -> loss ${best.loss.total.toFixed(6)}`)
            }
        } else if (k > 0 && k % 10 === 0) {
            stepScale *= 0.5
            if (stepScale < 1e-4) { stepScale = 1e-4 }
        }

        renderProgress(k, opts.iterations, {
            bestLoss: best.loss.total,
            stepScale: stepScale,
        }, opts)
    }

    clearProgress(opts)
    return { vec: vec, best: best, stepScale: stepScale }
}

function optimize(opts) {
    let vec = baselineVectorForOpts(opts)
    let cache = null
    if (opts.linksOnly) {
        cache = buildEvalCache(vectorToPlan(vec, opts), opts)
    }
    if (opts.method === 'spsa') {
        return optimizeSpsa(vec, opts, cache)
    }
    return optimizeCoordinate(vec, opts, cache)
}

function shuffleInPlace(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        const tmp = arr[i]
        arr[i] = arr[j]
        arr[j] = tmp
    }
}

function formatPlanReport(plan, loss) {
    const assets = DEFAULT_ASSET_BATCHES.map(function(batch, i) {
        return {
            key: batch.key,
            owner: batch.owner,
            district: batch.district,
            baseline: batch.count,
            optimized: plan.assetCounts[i],
        }
    })

    const links = LINK_PARAM_SPEC.map(function(spec, i) {
        return {
            key: spec.key,
            baseline: spec.base,
            optimized: roundLink(plan.linkCoeffs[i]),
        }
    })

    return {
        loss: {
            total: loss.total,
            residualLoss: loss.residualLoss,
            linkPenalty: loss.linkPenalty,
        },
        assets: assets,
        linksChanged: links.filter(function(row) {
            return Math.abs(row.optimized - row.baseline) > 1e-9
        }),
        links: links,
    }
}

function roundLink(v) {
    return Math.round(v * 1e6) / 1e6
}

function printDecayTable() {
    const baseline = 6
    const example = 10
    console.log('')
    console.log('Affluence / prosperity self-decay rows (organize_phase_tick Q.prosperityConnectionCatalog)')
    console.log('basis=level, self_feedback=true → monthly Δ ≈ coefficient × prosperity')
    console.log('')
    console.log(
        pad('ID', 18)
        + pad('Scope', 10)
        + pad('Target', 12)
        + pad('Coeff', 10)
        + pad('Δ @6', 10)
        + pad('Δ @10', 10),
    )
    console.log('-'.repeat(70))
    for (let i = 0; i < AFFLUENCE_DECAY_ROWS.length; i++) {
        const row = AFFLUENCE_DECAY_ROWS[i]
        const d6 = row.coefficient * baseline
        const d10 = row.coefficient * example
        console.log(
            pad(row.id, 18)
            + pad(row.scope, 10)
            + pad(row.target, 12)
            + pad(String(row.coefficient), 10)
            + pad(d6.toFixed(3), 10)
            + pad(d10.toFixed(3), 10),
        )
    }
    console.log('')
    console.log('Notes:')
    console.log('  • Stratum rows bleed each stratum block from its own prosperity (all districts).')
    console.log('  • IG rows bleed Q.prosperity_* for corps/syndicates (Soylent/Magrail/Brazos decay faster).')
    console.log('  • These decays are NOT tuned by optimize-prosperity-balance.js (fixed catalog).')
    console.log('  • Intra-district mesh + IG→home-district links are tuned (assets optional via --tune-assets).')
    console.log('')
}

function pad(s, width) {
    const str = String(s)
    return str.length >= width ? str : str + ' '.repeat(width - str.length)
}

function formatProgressBar(fraction, width) {
    width = width || 32
    const clamped = Math.max(0, Math.min(1, fraction))
    const filled = Math.round(clamped * width)
    return '[' + '='.repeat(filled) + '-'.repeat(width - filled) + ']'
}

function renderProgress(iter, total, info, opts) {
    if (!opts.progress) { return }
    const done = iter + 1
    const fraction = total > 0 ? done / total : 1
    const pct = (fraction * 100).toFixed(1)
    const bar = formatProgressBar(fraction)
    const line = (
        bar
        + ' ' + pct + '%'
        + '  iter ' + done + '/' + total
        + '  best ' + info.bestLoss.toFixed(4)
        + '  step ' + info.stepScale.toExponential(1)
    )
    if (process.stderr.isTTY) {
        process.stderr.write('\r' + line.padEnd(88))
    } else if (done === 1 || done === total || done % Math.max(1, Math.floor(total / 20)) === 0) {
        process.stderr.write(line + '\n')
    }
}

function clearProgress(opts) {
    if (opts.progress && process.stderr.isTTY) {
        process.stderr.write('\r' + ' '.repeat(88) + '\r')
    }
}

function printUsage() {
    console.log(`Usage: node scripts/optimize-prosperity-balance.js [options]

  --show-decays       Print affluence decay table and exit
  --links-only        Tune linkage coeffs only (default; uses cached replay)
  --tune-assets       Also tune starter asset batch counts (full reboot each eval)
  --method coordinate Coordinate descent (default)
  --method spsa       SPSA gradient-style search (links-only)
  --no-heuristic      Disable drift-based link direction hints
  --both-directions   Always try +/- (disable asymmetric single-direction tries)
  --months N          Simulation horizon per evaluation (default 6)
  --iterations N      Optimization iterations (default 200)
  --residual-mult X   Weight on population-weighted prosperity MSE (default 10)
  --link-weight X     Weight on L1 sum of linkage coefficients (default 1)
  --verbose           Log improving steps (disables progress bar)
  --no-progress       Disable iteration progress bar
  --json-out [file]   Write best plan JSON (default: out/prosperity-optim-result.json)

Link coefficients are clamped to [0, maxLink]. Loss:
  residualMult × Σ pop×(final−initial)² / Σ pop  +  linkWeight × Σ|linkage coeffs|
`)
}

function main() {
    const opts = parseArgs(process.argv.slice(2))
    if (opts.help) {
        printUsage()
        process.exit(0)
    }
    if (opts.showDecays) {
        printDecayTable()
        process.exit(0)
    }

    const mode = opts.linksOnly
        ? `${LINK_PARAM_SPEC.length} linkage coeffs (links-only, cached replay)`
        : `${N_ASSETS} asset batches + ${LINK_PARAM_SPEC.length} linkage coeffs`
    console.log(`Optimizing ${mode}`)
    console.log(
        `  method=${opts.method} · ${opts.months}-month sim · ${opts.iterations} iterations`
        + ` · residualMult=${opts.residualMult} · linkWeight=${opts.linkWeight}`,
    )
    if (opts.linksOnly) {
        console.log(
            `  heuristic=${opts.heuristicSign ? 'on' : 'off'}`
            + ` · asymmetric=${opts.asymmetric ? 'on' : 'off'}`
            + ` · link floor=${opts.minLink}`,
        )
    }

    const { vec, best, stepScale } = optimize(opts)
    const report = formatPlanReport(best.plan, best.loss)

    console.log('')
    console.log('Best loss:', report.loss.total.toFixed(6))
    console.log('  residual:', report.loss.residualLoss.toFixed(6))
    console.log('  linkage: ', report.loss.linkPenalty.toFixed(6), `(weighted ${(opts.linkWeight * report.loss.linkPenalty).toFixed(6)})`)
    console.log('')
    if (!opts.linksOnly) {
        console.log('Asset counts (baseline → optimized):')
        for (let i = 0; i < report.assets.length; i++) {
            const a = report.assets[i]
            if (a.optimized !== a.baseline) {
                console.log(`  ${a.key}: ${a.baseline} → ${a.optimized}  (${a.owner} @ ${a.district})`)
            }
        }
    }
    if (report.linksChanged.length > 0) {
        console.log('')
        console.log(`Linkage coeffs changed (${report.linksChanged.length}):`)
        for (let i = 0; i < Math.min(report.linksChanged.length, 20); i++) {
            const l = report.linksChanged[i]
            console.log(`  ${l.key}: ${l.baseline} → ${l.optimized}`)
        }
        if (report.linksChanged.length > 20) {
            console.log(`  … and ${report.linksChanged.length - 20} more (see JSON)`)
        }
    } else {
        console.log('Linkage coeffs unchanged from baseline.')
    }

    if (opts.jsonOut) {
        const payload = {
            options: opts,
            vector: vec,
            stepScale: stepScale,
            report: report,
        }
        const dir = path.dirname(opts.jsonOut)
        if (!fs.existsSync(dir)) { fs.mkdirSync(dir, { recursive: true }) }
        fs.writeFileSync(opts.jsonOut, JSON.stringify(payload, null, 2) + '\n', 'utf8')
        console.log('')
        console.log('Wrote', opts.jsonOut)
    }
}

if (require.main === module) {
    main()
}

module.exports = {
    AFFLUENCE_DECAY_ROWS,
    DEFAULT_ASSET_BATCHES,
    DEFAULT_INTRA_MESH,
    DEFAULT_IG_HOME_LINKS,
    LINK_PARAM_SPEC,
    baselineVector,
    baselineLinkVector,
    baselineVectorForOpts,
    evaluateVector,
    computeLoss,
    computeLinkHeuristicSigns,
    buildEvalCache,
    printDecayTable,
}
