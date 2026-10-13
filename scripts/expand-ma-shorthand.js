#!/usr/bin/env node
/**
 * Expand author shorthand in prose:
 *   _ma    → マ
 *   _tsuma → ツマ
 *
 * Skips code: markdown fences/backticks; Dendry {! !} blocks; identifier suffixes (sharks_ma).
 *
 * Usage:
 *   node scripts/expand-ma-shorthand.js
 *   node scripts/expand-ma-shorthand.js planning/political_power.md
 */

const fs = require('fs')
const path = require('path')

const ROOT = path.join(__dirname, '..')
const DEFAULT_GLOBS = [
    path.join(ROOT, 'planning'),
    path.join(ROOT, 'source', 'scenes'),
]

const RE_TSUMA = /(?<![\w*])_tsuma(?![\w])/g
const RE_MA = /(?<![\w*])_ma(?![\w])/g

function expandProse(text) {
    return text
        .replace(RE_TSUMA, 'ツマ')
        .replace(RE_MA, 'マ')
}

/** Split markdown into prose vs `inline` vs ```fence``` segments. */
function expandMarkdown(content) {
    const parts = content.split(/(```[\s\S]*?```|`[^`\n]+`)/g)
    return parts.map((part, i) => (i % 2 === 0 ? expandProse(part) : part)).join('')
}

/** Expand .dry / plain text outside Dendry {! !} blocks. */
function expandDry(content) {
    let out = ''
    let i = 0
    while (i < content.length) {
        const start = content.indexOf('{!', i)
        if (start === -1) {
            out += expandProse(content.slice(i))
            break
        }
        out += expandProse(content.slice(i, start))
        const end = content.indexOf('!}', start + 2)
        if (end === -1) {
            out += content.slice(start)
            break
        }
        out += content.slice(start, end + 2)
        i = end + 2
    }
    return out
}

function expandFile(filePath) {
    const ext = path.extname(filePath)
    const base = path.basename(filePath)
    if (base.endsWith('.scene.dry')) {
        return expandDry(fs.readFileSync(filePath, 'utf8'))
    }
    if (ext === '.md' || ext === '.dry') {
        return expandMarkdown(fs.readFileSync(filePath, 'utf8'))
    }
    return null
}

function collectFiles(argPaths) {
    const files = []
    const roots = argPaths.length ? argPaths.map((p) => path.resolve(p)) : DEFAULT_GLOBS

    function walk(dir) {
        if (!fs.existsSync(dir)) return
        const stat = fs.statSync(dir)
        if (stat.isFile()) {
            if (dir.endsWith('.md') || dir.endsWith('.scene.dry') || dir.endsWith('.dry')) {
                files.push(dir)
            }
            return
        }
        for (const name of fs.readdirSync(dir)) {
            walk(path.join(dir, name))
        }
    }

    for (const root of roots) {
        walk(root)
    }
    return files
}

function processFile(filePath, { checkOnly = false } = {}) {
    const next = expandFile(filePath)
    if (next == null) return false
    const prev = fs.readFileSync(filePath, 'utf8')
    if (prev === next) return false
    if (!checkOnly) {
        fs.writeFileSync(filePath, next, 'utf8')
    }
    return true
}

function main() {
    const args = process.argv.slice(2)
    const checkOnly = args.includes('--check')
    const paths = args.filter((a) => !a.startsWith('--'))
    const files = collectFiles(paths)
    let changed = 0
    for (const file of files) {
        if (processFile(file, { checkOnly })) {
            changed++
            const rel = path.relative(ROOT, file)
            console.log(checkOnly ? `would expand: ${rel}` : `expanded: ${rel}`)
        }
    }
    if (checkOnly && changed > 0) {
        process.exit(1)
    }
}

if (require.main === module) {
    main()
}

module.exports = { expandProse, expandMarkdown, expandDry, expandFile, processFile }
