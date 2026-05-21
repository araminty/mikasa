#!/usr/bin/env node
/**
 * Lint Mikasa .dry scene files for Dendrynexus authoring rules.
 *
 * Usage:
 *   node scripts/lint-dendry.js
 *   node scripts/lint-dendry.js path/to/file.scene.dry
 */

const fs = require('fs')
const path = require('path')

const ROOT = path.join(__dirname, '..')
const SOURCE_DIR = path.join(ROOT, 'source')

const GATE_LINE = /^\s*(choose-if|chose-if|available-if|view-if|view_if)\s*:/i
const GO_TO_LINE = /^\s*go-to\s*:/i
const PROSE_IF = /\[\?\s*if\b/i

/** Strip trailing comment for condition checks. */
function conditionPart(line) {
    const hash = line.indexOf('#')
    return hash === -1 ? line : line.slice(0, hash)
}

function isJsLine(line, inJsBlock) {
    if (inJsBlock) return true
    if (/\{!/.test(line) && !/\!}/.test(line)) return true
    if (/\{!.*\!}/.test(line)) return true
    return false
}

function updateJsBlockState(line, inJsBlock) {
    if (!inJsBlock && line.includes('{!')) {
        inJsBlock = true
    }
    if (inJsBlock && line.includes('!}')) {
        inJsBlock = false
    }
    return inJsBlock
}

function lintFile(filePath) {
    const text = fs.readFileSync(filePath, 'utf8')
    const lines = text.split(/\r?\n/)
    const issues = []
    let inJsBlock = false

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i]
        const lineNum = i + 1
        inJsBlock = updateJsBlockState(line, inJsBlock)

        if (GATE_LINE.test(line)) {
            const cond = conditionPart(line).trimEnd()
            if (cond.endsWith(';')) {
                issues.push({
                    line: lineNum,
                    rule: 'gate-no-semicolon',
                    message: 'choose-if / available-if / view-if must not end with a semicolon',
                })
            }
            if (/\=>/.test(conditionPart(line))) {
                issues.push({
                    line: lineNum,
                    rule: 'no-fat-arrow',
                    message: 'Use = for comparisons in Dendry conditions, not =>',
                })
            }
            continue
        }

        if (inJsBlock) continue

        if (GO_TO_LINE.test(line) && /\=>/.test(conditionPart(line))) {
            issues.push({
                line: lineNum,
                rule: 'no-fat-arrow',
                message: 'go-to conditions use =, not =>',
            })
        }

        if (PROSE_IF.test(line) && /\=>/.test(conditionPart(line))) {
            issues.push({
                line: lineNum,
                rule: 'no-fat-arrow',
                message: 'Prose [? if … ?] uses = for comparisons, not =>',
            })
        }
    }

    return issues
}

function collectDryFiles(dir, out = []) {
    if (!fs.existsSync(dir)) return out
    for (const name of fs.readdirSync(dir)) {
        const full = path.join(dir, name)
        const st = fs.statSync(full)
        if (st.isDirectory()) {
            collectDryFiles(full, out)
        } else if (name.endsWith('.dry')) {
            out.push(full)
        }
    }
    return out
}

function main() {
    const args = process.argv.slice(2).filter((a) => !a.startsWith('-'))
    const files = args.length
        ? args.map((p) => path.resolve(ROOT, p))
        : collectDryFiles(SOURCE_DIR)

    if (files.length === 0) {
        console.error('No .dry files found')
        process.exit(1)
    }

    let total = 0
    for (const file of files.sort()) {
        const issues = lintFile(file)
        if (issues.length === 0) continue
        const rel = path.relative(ROOT, file)
        for (const issue of issues) {
            console.log(`${rel}:${issue.line}: ${issue.message} [${issue.rule}]`)
            total++
        }
    }

    if (total === 0) {
        console.log(`lint-dendry: ${files.length} file(s), no issues`)
        process.exit(0)
    }

    console.error(`lint-dendry: ${total} issue(s)`)
    process.exit(1)
}

main()
