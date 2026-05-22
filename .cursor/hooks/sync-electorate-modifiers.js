#!/usr/bin/env node
/**
 * Cursor hook: run electorate catalog sync when a scene .dry file was edited.
 * Reads hook JSON from stdin (afterFileEdit, afterTabFileEdit, postToolUse).
 */
const { spawnSync } = require('child_process')
const path = require('path')

const ROOT = path.join(__dirname, '..', '..')
const SYNC = path.join(ROOT, 'scripts', 'sync-electorate-modifiers.js')
const SCENE_DRY = /source\/scenes\/.*\.dry$/i

function loadStdin() {
    try {
        const raw = require('fs').readFileSync(0, 'utf8')
        if (!raw.trim()) { return {} }
        return JSON.parse(raw)
    } catch {
        return {}
    }
}

function collectPaths(payload) {
    const out = []
    const push = (p) => {
        if (typeof p === 'string' && p) { out.push(p) }
    }
    push(payload.file_path)
    push(payload.path)
    const ti = payload.tool_input || payload.toolInput || {}
    push(ti.path)
    push(ti.file_path)
    if (Array.isArray(payload.edits)) {
        for (const e of payload.edits) {
            push(e.path)
            push(e.file_path)
        }
    }
    if (Array.isArray(payload.file_paths)) {
        for (const p of payload.file_paths) { push(p) }
    }
    return out
}

function touchesSceneDry(paths) {
    return paths.some((p) => SCENE_DRY.test(p.replace(/\\/g, '/')))
}

function main() {
    const payload = loadStdin()
    const paths = collectPaths(payload)
    if (paths.length > 0 && !touchesSceneDry(paths)) {
        process.exit(0)
    }
    const r = spawnSync(process.execPath, [SYNC], {
        cwd: ROOT,
        stdio: 'inherit',
    })
    process.exit(r.status === null ? 0 : r.status)
}

main()
