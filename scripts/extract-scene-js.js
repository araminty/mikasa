#!/usr/bin/env node
/**
 * Extract JavaScript from Dendry runtime scenes for Node tests.
 * Authoritative logic lives in source/scenes (scene.dry) — not in source/lib.
 *
 * Runtime blocks live between marker comments in silent setup scenes:
 *   // MIKASA_ELECTION_RUNTIME_BEGIN … // MIKASA_ELECTION_RUNTIME_END
 *
 * Usage:
 *   node scripts/extract-scene-js.js election_runtime
 *   node scripts/extract-scene-js.js --list
 */

const fs = require('fs')
const path = require('path')

const ROOT = path.join(__dirname, '..')
const SCENES = path.join(ROOT, 'source', 'scenes')

/** blockName → scene file (relative to source/scenes) */
const RUNTIME_SCENES = {
    ELECTION_RUNTIME: 'election_runtime.scene.dry',
    ELECTORATE_RUNTIME: 'electorate_runtime.scene.dry',
    ECONOMIC_ASSETS_RUNTIME: 'economic_assets_runtime.scene.dry',
    ORGANIZING_RUNTIME: 'cards/organizing/organize_phase_tick.scene.dry',
}

function runtimeMarkers(blockName) {
    return {
        begin: `// MIKASA_${blockName}_BEGIN`,
        end: `// MIKASA_${blockName}_END`,
    }
}

function extractRuntimeBlock(text, blockName) {
    const { begin, end } = runtimeMarkers(blockName)
    const i = text.indexOf(begin)
    const j = text.indexOf(end)
    if (i < 0 || j < 0 || j <= i) {
        throw new Error(
            `extract-scene-js: missing ${begin} / ${end} markers`,
        )
    }
    return text.slice(i + begin.length, j).trim()
}

function extractRuntimeBlockFromFile(scenePath, blockName) {
    const text = fs.readFileSync(scenePath, 'utf8')
    return extractRuntimeBlock(text, blockName)
}

function resolveRuntimeScene(blockName) {
    const rel = RUNTIME_SCENES[blockName]
    if (!rel) {
        throw new Error(`extract-scene-js: unknown runtime block ${blockName}`)
    }
    return path.join(SCENES, rel)
}

function loadRuntimeBlock(blockName, options = {}) {
    const scenePath = resolveRuntimeScene(blockName)
    const js = extractRuntimeBlockFromFile(scenePath, blockName)
    const Q = options.Q || global.Q || {}
    global.Q = Q
    // eslint-disable-next-line no-eval
    eval(js)
    return Q
}

/** Load election + electorate (and optional extras) in bootstrap order. */
function loadGameRuntimes(options = {}) {
    const blocks = options.blocks || [
        'ELECTION_RUNTIME',
        'ELECTORATE_RUNTIME',
    ]
    let Q = options.Q || {}
    global.Q = Q
    for (const blockName of blocks) {
        loadRuntimeBlock(blockName, { Q })
        Q = global.Q
    }
    if (options.refreshProjections && typeof Q.update_projections === 'function') {
        Q.update_projections(options.projectionOpts || { allDistricts: true })
    }
    if (options.commitSeats && typeof Q.assignSeatsFromInitialPolling === 'function') {
        Q.assignSeatsFromInitialPolling()
    }
    return Q
}

/** Legacy: first on-arrival block (prefer extractRuntimeBlock). */
const ON_ARRIVAL_RE = /on-arrival:\s*\{!\s*([\s\S]*?)\s*!\}/

function extractOnArrivalJs(scenePath) {
    const text = fs.readFileSync(scenePath, 'utf8')
    const match = text.match(ON_ARRIVAL_RE)
    if (!match) {
        throw new Error(`extract-scene-js: no on-arrival block in ${scenePath}`)
    }
    return match[1].trim()
}

function loadSceneOnArrival(scenePath, options = {}) {
    const js = extractOnArrivalJs(scenePath)
    const Q = options.Q || {}
    global.Q = Q
    // eslint-disable-next-line no-eval
    eval(js)
    return Q
}

if (require.main === module) {
    if (process.argv.includes('--list')) {
        for (const [name, rel] of Object.entries(RUNTIME_SCENES)) {
            console.log(`${name}\t${rel}`)
        }
        process.exit(0)
    }
    const arg = process.argv[2]
    if (!arg) {
        console.error(
            'Usage: node scripts/extract-scene-js.js <BLOCK_NAME|--list>',
        )
        process.exit(1)
    }
    if (arg === 'game') {
        loadGameRuntimes({
            refreshProjections: true,
            commitSeats: true,
        })
        process.exit(0)
    }
    process.stdout.write(extractRuntimeBlockFromFile(resolveRuntimeScene(arg), arg))
}

module.exports = {
    RUNTIME_SCENES,
    runtimeMarkers,
    extractRuntimeBlock,
    extractRuntimeBlockFromFile,
    loadRuntimeBlock,
    loadGameRuntimes,
    extractOnArrivalJs,
    loadSceneOnArrival,
    ON_ARRIVAL_RE,
}
