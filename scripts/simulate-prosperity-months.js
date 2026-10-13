#!/usr/bin/env node
/**
 * Run monthly_tick_phase1 for N months in Node (prosperity mesh, housing, assets).
 *
 *   node scripts/simulate-prosperity-months.js
 *   node scripts/simulate-prosperity-months.js --months 6
 *   node scripts/simulate-prosperity-months.js --months 12 --verbose
 *   node scripts/simulate-prosperity-months.js --json
 *   node scripts/simulate-prosperity-months.js --full   # entire monthly_tick_phase1 (needs economy globals)
 *
 * Loads election + electorate + organizing tick + economic_assets from scene on-arrival JS.
 */

const fs = require('fs')
const path = require('path')
const { loadGameRuntimes, loadSceneOnArrival } = require('./extract-scene-js.js')

const args = process.argv.slice(2)
const help = args.includes('--help') || args.includes('-h')
const jsonOut = args.includes('--json')
const verbose = args.includes('--verbose')
const fullTick = args.includes('--full')
const quiet = args.includes('--quiet')

const monthsIdx = args.indexOf('--months')
const months = monthsIdx >= 0 ? Math.max(1, parseInt(args[monthsIdx + 1], 10) || 3) : 3

const csvIdx = args.indexOf('--csv')
let csvOutPath = null
if (csvIdx >= 0) {
    const next = args[csvIdx + 1]
    if (next && !next.startsWith('--')) {
        csvOutPath = path.resolve(next)
    } else {
        csvOutPath = path.join(__dirname, '..', 'out', 'prosperity-simulation.csv')
    }
}

if (help) {
    console.log(`Usage: node scripts/simulate-prosperity-months.js [options]

  --months N   Months to tick (default 3)
  --verbose    Print each block prosperity every month
  --json       JSON array of monthly snapshots
  --csv [file] Write block prosperity matrix CSV (default: out/prosperity-simulation.csv)
  --quiet      Suppress console report (useful with --csv)
  --full       Run Q.monthly_tick_phase1 (organize + economy + prosperity)
`)
    process.exit(0)
}

const SCENES = path.join(__dirname, '..', 'source', 'scenes')

function initQ() {
    const Q = loadGameRuntimes({
        refreshProjections: true,
        commitSeats: true,
    })
    Q.month = Q.month ?? 1
    Q.year = Q.year ?? 2300
    Q.phase = Q.phase ?? 1
    Q.crime_level = Q.crime_level ?? 1.1
    Q.trade_level = Q.trade_level ?? 1.12

    loadSceneOnArrival(
        path.join(SCENES, 'cards/local_organizing/organize_phase_tick.scene.dry'),
        { Q },
    )
    loadSceneOnArrival(
        path.join(SCENES, 'economic_assets_runtime.scene.dry'),
        { Q },
    )
    if (typeof Q.initEconomicAssets === 'function') {
        Q.initEconomicAssets()
    }
    if (typeof Q.monthly_tick_phase1 !== 'function') {
        throw new Error('simulate-prosperity-months: Q.monthly_tick_phase1 missing')
    }
    return Q
}

/** Dendry-style implicit globals used by corp_purchase / longshore (Node CLI only). */
function seedEconomyGlobals(Q) {
    global.corp_capital = Q.corp_capital
    global.corp_spend = 0
    global.drone_spend = 0
}

function runProsperityMonth(Q) {
    if (fullTick) {
        seedEconomyGlobals(Q)
        Q.monthly_tick_phase1()
        return
    }
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
    if (typeof Q.syncProsperityDisplays === 'function') {
        Q.syncProsperityDisplays()
    }
}

function snapshot(Q) {
    const state = Q.electionV2
    const blocks = (state && state.blocks) ? state.blocks : []
    const byBlock = []
    for (let i = 0; i < blocks.length; i++) {
        const b = blocks[i]
        if (b.population <= 0) { continue }
        byBlock.push({
            id: b.id,
            district: b.district.id,
            stratum: b.demographic.id,
            pop: b.population,
            prosperity: Math.round((b.prosperity ?? 6) * 10000) / 10000,
        })
    }
    return {
        month: Q.month,
        year: Q.year,
        trade_level: Q.trade_level,
        crime_level: Q.crime_level,
        ig: {
            Soylent: Q.prosperity_soylent,
            Magrail: Q.prosperity_magrail,
            Brazos: Q.prosperity_brazos,
            Families: Q.prosperity_families,
            Edges: Q.prosperity_edges,
            Sharks: Q.prosperity_sharks,
        },
        strata: {
            rich: Q.prosperity_rich,
            first: Q.prosperity_first,
            second: Q.prosperity_second,
            coop: Q.prosperity_coop,
            drone: Q.prosperity_drone,
            alien: Q.prosperity_alien,
            deeper: Q.prosperity_deeper,
            third_wave: Q.prosperity_third_wave,
        },
        blocks: byBlock,
        economic_sites: (Q.economicAssets || []).length,
    }
}

function printSnapshot(snap, label) {
    console.log(`\n=== ${label} (month ${snap.month}, trade ${snap.trade_level?.toFixed?.(4)}) ===`)
    console.log(
        'IG prosperity:',
        Object.entries(snap.ig)
            .map(([k, v]) => `${k}=${Number(v).toFixed(3)}`)
            .join('  '),
    )
    console.log(
        'Stratum avg:',
        Object.entries(snap.strata)
            .filter(([, v]) => v != null)
            .map(([k, v]) => `${k}=${Number(v).toFixed(3)}`)
            .join('  '),
    )
    if (verbose) {
        for (let i = 0; i < snap.blocks.length; i++) {
            const b = snap.blocks[i]
            console.log(
                `  ${b.district}/${b.stratum} pop=${b.pop} prosperity=${b.prosperity}`,
            )
        }
    } else {
        const extremes = snap.blocks.slice().sort((a, b) => b.prosperity - a.prosperity)
        const hi = extremes.slice(0, 3)
        const lo = extremes.slice(-3).reverse()
        console.log('  highest:', hi.map((b) => `${b.district}/${b.stratum} ${b.prosperity}`).join(', '))
        console.log('  lowest: ', lo.map((b) => `${b.district}/${b.stratum} ${b.prosperity}`).join(', '))
    }
    console.log(`  registered economic sites: ${snap.economic_sites}`)
}

function csvCell(value) {
    if (value == null || value === '') { return '' }
    const s = String(value)
    if (/[",\n\r]/.test(s)) {
        return '"' + s.replace(/"/g, '""') + '"'
    }
    return s
}

function monthColumnLabel(snap, index) {
    if (index === 0) { return 'start' }
    const y = snap.year ?? 2300
    const m = snap.month ?? 1
    return y + '-M' + String(m).padStart(2, '0')
}

/** Blocks as rows; one column per snapshot (start, then after each monthly tick). */
function buildProsperityCsv(history) {
    const blockMeta = new Map()
    const columnLabels = history.map((snap, i) => monthColumnLabel(snap, i))

    for (let hi = 0; hi < history.length; hi++) {
        const snap = history[hi]
        for (let bi = 0; bi < snap.blocks.length; bi++) {
            const b = snap.blocks[bi]
            if (!blockMeta.has(b.id)) {
                blockMeta.set(b.id, {
                    id: b.id,
                    district: b.district,
                    stratum: b.stratum,
                    pop: b.pop,
                })
            }
        }
    }

    const rowOrder = Array.from(blockMeta.values()).sort(function(a, b) {
        if (a.district !== b.district) {
            return a.district < b.district ? -1 : 1
        }
        if (a.stratum !== b.stratum) {
            return a.stratum < b.stratum ? -1 : 1
        }
        return a.id < b.id ? -1 : (a.id > b.id ? 1 : 0)
    })

    const lines = []
    lines.push(
        ['block_id', 'district', 'stratum', 'pop'].concat(columnLabels)
            .map(csvCell)
            .join(','),
    )

    for (let ri = 0; ri < rowOrder.length; ri++) {
        const meta = rowOrder[ri]
        const pros = history.map(function(snap) {
            for (let i = 0; i < snap.blocks.length; i++) {
                if (snap.blocks[i].id === meta.id) {
                    return snap.blocks[i].prosperity
                }
            }
            return ''
        })
        lines.push(
            [meta.id, meta.district, meta.stratum, meta.pop].concat(pros)
                .map(csvCell)
                .join(','),
        )
    }

    return lines.join('\n') + '\n'
}

function writeProsperityCsv(history, outPath) {
    const dir = path.dirname(outPath)
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true })
    }
    fs.writeFileSync(outPath, buildProsperityCsv(history), 'utf8')
}

const Q = initQ()
const history = [snapshot(Q)]
if (!quiet) {
    printSnapshot(history[0], 'Start')
}

for (let m = 0; m < months; m++) {
    runProsperityMonth(Q)
    Q.month = (Q.month ?? 1) + 1
    if (Q.month > 12) {
        Q.month = 1
        Q.year = (Q.year ?? 2300) + 1
    }
    history.push(snapshot(Q))
    if (!quiet) {
        printSnapshot(history[history.length - 1], `After tick ${m + 1}`)
    }
}

if (csvOutPath) {
    writeProsperityCsv(history, csvOutPath)
    console.log('Wrote ' + history.length + ' month columns × ' + history[0].blocks.length + ' blocks → ' + csvOutPath)
}

if (jsonOut) {
    console.log(JSON.stringify(history, null, 2))
}
