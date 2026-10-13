#!/usr/bin/env node
/**
 * Apply optimizer output to organize_phase_tick.scene.dry (and sync script mirrors).
 *
 *   node scripts/apply-prosperity-optim.js out/prosperity-optim-result.json
 */

const fs = require('fs')
const path = require('path')
const {
    DEFAULT_INTRA_MESH,
    DEFAULT_IG_HOME_LINKS,
    LINK_PARAM_SPEC,
} = require('./optimize-prosperity-balance.js')

const ROOT = path.join(__dirname, '..')
const ORGANIZE_TICK = path.join(
    ROOT,
    'source/scenes/cards/local_organizing/organize_phase_tick.scene.dry',
)
const OPTIM_SCRIPT = path.join(ROOT, 'scripts/optimize-prosperity-balance.js')

const STRATA_LIST = [
    'rich', 'first', 'second', 'coop', 'drone', 'alien', 'deeper', 'third_wave',
]

function roundLink(v) {
    return Math.round(Number(v) * 1e6) / 1e6
}

function meshFromLinkCoeffs(linkCoeffs) {
    const mesh = JSON.parse(JSON.stringify(DEFAULT_INTRA_MESH))
    for (let i = 0; i < LINK_PARAM_SPEC.length; i++) {
        const spec = LINK_PARAM_SPEC[i]
        if (spec.kind !== 'intra') { continue }
        if (!mesh[spec.from]) { mesh[spec.from] = {} }
        mesh[spec.from][spec.to] = roundLink(linkCoeffs[i])
    }
    return mesh
}

function igLinksFromLinkCoeffs(linkCoeffs) {
    const links = JSON.parse(JSON.stringify(DEFAULT_IG_HOME_LINKS))
    for (let i = 0; i < LINK_PARAM_SPEC.length; i++) {
        const spec = LINK_PARAM_SPEC[i]
        if (spec.kind !== 'ig_home') { continue }
        for (let li = 0; li < links.length; li++) {
            if (links[li].ig !== spec.ig) { continue }
            links[li].toStrata[spec.stratum] = roundLink(linkCoeffs[i])
            break
        }
    }
    return links
}

function formatMeshRow(from, row) {
    const parts = STRATA_LIST.map(function(sid) {
        const v = row[sid] != null ? row[sid] : 0
        return sid + ': ' + v
    })
    return '        ' + parts.join(', ') + ','
}

function formatMeshBlock(mesh) {
    const lines = ['var PROSPERITY_INTRA_DISTRICT_DEFAULT = {']
    for (let fi = 0; fi < STRATA_LIST.length; fi++) {
        const from = STRATA_LIST[fi]
        const row = mesh[from] || {}
        lines.push('    ' + from + ': {')
        lines.push(formatMeshRow(from, row))
        lines.push('    },')
    }
    lines.push('}')
    return lines.join('\n')
}

function formatIgLinksBlock(links) {
    const lines = ['var PROSPERITY_IG_HOME_DISTRICT_LINKS = [']
    for (let i = 0; i < links.length; i++) {
        const row = links[i]
        lines.push('    {')
        lines.push("        ig: '" + row.ig + "',")
        lines.push("        district: '" + row.district + "',")
        lines.push('        toStrata: {')
        const parts = STRATA_LIST.map(function(sid) {
            const v = row.toStrata[sid] != null ? row.toStrata[sid] : 0
            return sid + ': ' + v
        })
        lines.push('            ' + parts.join(', ') + ',')
        lines.push('        },')
        lines.push('    },')
    }
    lines.push(']')
    return lines.join('\n')
}

function detectEol(text) {
    return text.indexOf('\r\n') >= 0 ? '\r\n' : '\n'
}

function toEol(str, eol) {
    return str.replace(/\r\n/g, '\n').split('\n').join(eol)
}

function indexOfFlexible(haystack, needle, fromIndex) {
    const flexible = needle.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/\n/g, '\\r?\\n')
    const re = new RegExp(flexible)
    const slice = haystack.slice(fromIndex)
    const m = re.exec(slice)
    if (!m) {
        return -1
    }
    return fromIndex + m.index
}

function replaceBlock(source, startMarker, endMarker, newBlock) {
    const start = source.indexOf(startMarker)
    if (start < 0) {
        throw new Error('Missing marker: ' + startMarker)
    }
    const end = indexOfFlexible(source, endMarker, start + startMarker.length)
    if (end < 0) {
        throw new Error('Missing end marker after: ' + startMarker)
    }
    const eol = detectEol(source)
    return source.slice(0, start) + toEol(newBlock, eol) + source.slice(end)
}

function formatConstMesh(mesh) {
    const lines = ['const DEFAULT_INTRA_MESH = {']
    for (let fi = 0; fi < STRATA_LIST.length; fi++) {
        const from = STRATA_LIST[fi]
        const row = mesh[from] || {}
        lines.push('    ' + from + ': {')
        lines.push(formatMeshRow(from, row))
        lines.push('    },')
    }
    lines.push('}')
    return lines.join('\n')
}

function formatConstIgLinks(links) {
    const lines = ['const DEFAULT_IG_HOME_LINKS = [']
    for (let i = 0; i < links.length; i++) {
        const row = links[i]
        lines.push('    {')
        lines.push("        ig: '" + row.ig + "',")
        lines.push("        district: '" + row.district + "',")
        lines.push('        toStrata: {')
        const parts = STRATA_LIST.map(function(sid) {
            const v = row.toStrata[sid] != null ? row.toStrata[sid] : 0
            return sid + ': ' + v
        })
        lines.push('            ' + parts.join(', ') + ',')
        lines.push('        },')
        lines.push('    },')
    }
    lines.push(']')
    return lines.join('\n')
}

function syncOptimScriptMirrors(mesh, igLinks) {
    let text = fs.readFileSync(OPTIM_SCRIPT, 'utf8')
    text = replaceBlock(
        text,
        'const DEFAULT_INTRA_MESH = {',
        '\n\n/** Mirror PROSPERITY_IG_HOME_DISTRICT_LINKS */',
        formatConstMesh(mesh),
    )
    text = replaceBlock(
        text,
        'const DEFAULT_IG_HOME_LINKS = [',
        '\n\n/** Self-feedback decay rows',
        formatConstIgLinks(igLinks),
    )
    fs.writeFileSync(OPTIM_SCRIPT, text, 'utf8')
}

function applyToScene(mesh, igLinks) {
    let text = fs.readFileSync(ORGANIZE_TICK, 'utf8')
    text = replaceBlock(
        text,
        'var PROSPERITY_INTRA_DISTRICT_DEFAULT = {',
        '\n\n/**\n * IG prosperity → each stratum block in that IG\'s home district only.',
        formatMeshBlock(mesh) + '\n',
    )
    text = replaceBlock(
        text,
        'var PROSPERITY_IG_HOME_DISTRICT_LINKS = [',
        '\n\n/** All strata wired in Docks trade spill',
        formatIgLinksBlock(igLinks) + '\n',
    )
    fs.writeFileSync(ORGANIZE_TICK, text, 'utf8')
}

function main() {
    const jsonPath = path.resolve(process.argv[2] || path.join(ROOT, 'out', 'prosperity-optim-result.json'))
    if (!fs.existsSync(jsonPath)) {
        console.error('Missing optim result:', jsonPath)
        process.exit(1)
    }
    const payload = JSON.parse(fs.readFileSync(jsonPath, 'utf8'))
    const linkCoeffs = payload.report && payload.report.links
        ? payload.report.links.map(function(row) { return row.optimized })
        : null
    if (!linkCoeffs || linkCoeffs.length !== LINK_PARAM_SPEC.length) {
        console.error('Invalid optim JSON: expected report.links with', LINK_PARAM_SPEC.length, 'entries')
        process.exit(1)
    }

    const mesh = meshFromLinkCoeffs(linkCoeffs)
    const igLinks = igLinksFromLinkCoeffs(linkCoeffs)

    applyToScene(mesh, igLinks)
    syncOptimScriptMirrors(mesh, igLinks)

    console.log('Applied', linkCoeffs.length, 'linkage coeffs to:')
    console.log(' ', ORGANIZE_TICK)
    console.log(' ', OPTIM_SCRIPT)
    console.log('Best loss from JSON:', payload.report.loss.total)
}

if (require.main === module) {
    main()
}

module.exports = {
    meshFromLinkCoeffs,
    igLinksFromLinkCoeffs,
    applyToScene,
}
