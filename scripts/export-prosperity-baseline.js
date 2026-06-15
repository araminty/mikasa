#!/usr/bin/env node
/**
 * Snapshot current prosperity linkage defaults (from optimize-prosperity-balance mirrors).
 *
 *   node scripts/export-prosperity-baseline.js
 *   node scripts/export-prosperity-balance.js --out out/prosperity-balance-baseline.json
 */

const fs = require('fs')
const path = require('path')
const {
    DEFAULT_INTRA_MESH,
    DEFAULT_IG_HOME_LINKS,
    DEFAULT_ASSET_BATCHES,
    LINK_PARAM_SPEC,
} = require('./optimize-prosperity-balance.js')

const ROOT = path.join(__dirname, '..')

function parseOut(argv) {
    const idx = argv.indexOf('--out')
    if (idx >= 0 && argv[idx + 1] && !argv[idx + 1].startsWith('--')) {
        return path.resolve(argv[idx + 1])
    }
    return path.join(ROOT, 'out', 'prosperity-balance-baseline.json')
}

function main() {
    const outPath = parseOut(process.argv.slice(2))
    const payload = {
        exportedAt: new Date().toISOString(),
        note: 'Baseline before prosperity optimizer run; mirrors organize_phase_tick + asset batches.',
        intraMesh: DEFAULT_INTRA_MESH,
        igHomeLinks: DEFAULT_IG_HOME_LINKS,
        assetBatches: DEFAULT_ASSET_BATCHES,
        linkParamSpec: LINK_PARAM_SPEC,
    }
    const dir = path.dirname(outPath)
    if (!fs.existsSync(dir)) { fs.mkdirSync(dir, { recursive: true }) }
    fs.writeFileSync(outPath, JSON.stringify(payload, null, 2) + '\n', 'utf8')
    console.log('Wrote', outPath)
}

if (require.main === module) {
    main()
}

module.exports = { main }
