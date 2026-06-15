#!/usr/bin/env node
/**
 * Copy CATALOG + picker helpers from source/lib/economic-asset-name-catalog.js
 * into economic_assets_runtime.scene.dry (economic-name-catalog block).
 * Run after editing the lib file: node scripts/sync-economic-name-catalog-to-scene.js
 */
'use strict'

const fs = require('fs')
const path = require('path')

const scenePath = path.join(__dirname, '../source/scenes/economic_assets_runtime.scene.dry')
const libPath = path.join(__dirname, '../source/lib/economic-asset-name-catalog.js')

const libSrc = fs.readFileSync(libPath, 'utf8')
const catalogBegin = libSrc.indexOf('const CATALOG = {')
const catalogEnd = libSrc.indexOf('/** @type {Record<string, number>} */')
if (catalogBegin < 0 || catalogEnd < 0) {
    console.error('Could not find CATALOG in lib file')
    process.exit(1)
}
const catalogBlock = libSrc.slice(catalogBegin, catalogEnd).trim()

const pickerBegin = libSrc.indexOf('function catalogKind(isHome)')
const pickerEnd = libSrc.indexOf('/**\n * Pick a display name')
if (pickerBegin < 0 || pickerEnd < 0) {
    console.error('Could not find picker helpers in lib file')
    process.exit(1)
}
const pickerBlock = libSrc.slice(pickerBegin, pickerEnd).trim()

function indentPicker(src) {
    return src
        .split('\n')
        .map(function(line) {
            if (!line.trim()) { return '' }
            return '    ' + line
        })
        .join('\n')
}

const sceneBlock = `// BEGIN economic-name-catalog (authoritative; source/lib/economic-asset-name-catalog.js is dev reference only)
function installEconomicNameCatalog(q) {
    ${catalogBlock}

    /** @type {Record<string, number>} */
    const FIRST_WAVE_WEIGHTS = {
        japanese: 50,
        french: 13,
        german: 13,
        italian: 12,
        english: 12,
    }

${indentPicker(pickerBlock)}

    function pickOwnerDisplayName(opts) {
        opts = opts || {}
        var owner = String(opts.owner || '')
        var isHome = !!opts.isHome
        var seed = opts.id || (owner + '_' + (opts.district || '') + '_' + (isHome ? 'home' : 'asset'))

        if (opts.ownerType === 'ig') {
            if (owner === 'Soylent') { return pickSoylent(seed, isHome) }
            if (owner === 'Magrail') { return pickMagrail(seed, isHome) }
            if (owner === 'Brazos') { return pickBrazos(seed, isHome) }
            return pick(owner.toLowerCase(), seed) || owner + ' Facility'
        }

        if (owner === 'first') { return pickFirstWave(seed, isHome) }
        if (owner === 'second') { return pickSecondWave(seed, isHome) }
        if (owner === 'third_wave') { return pickThirdWave(seed, isHome) }
        if (owner === 'rich') { return pickRich(seed, isHome) }
        if (owner === 'deeper') { return pickDeeper(seed, isHome) }
        if (owner === 'coop') { return pickCoop(seed, isHome) }

        return pickThirdWave(seed, isHome)
    }

    q.pickOwnerDisplayName = pickOwnerDisplayName
}
// END economic-name-catalog`

const scene = fs.readFileSync(scenePath, 'utf8')
const re = /\/\/ BEGIN economic-name-catalog[\s\S]*?\/\/ END economic-name-catalog/
if (!re.test(scene)) {
    console.error('Could not find economic-name-catalog block in scene')
    process.exit(1)
}
fs.writeFileSync(scenePath, scene.replace(re, sceneBlock))
console.log('Updated', scenePath)
