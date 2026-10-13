#!/usr/bin/env node
/**
 * Before compile: replace Q.build_time_label in root.scene.dry with the current time.
 * Committed default is zeros; each build overwrites that line (or the previous stamp).
 * Also writes out/html/build-stamp.txt for curl / mikasa bash helper.
 */

const fs = require('fs')
const path = require('path')

const ROOT = path.join(__dirname, '..')
const ROOT_SCENE = path.join(ROOT, 'source', 'scenes', 'root.scene.dry')
const OUT_HTML = path.join(ROOT, 'out', 'html')
const STAMP_LINE_RE = /^Q\.build_time_label = '[^']*';$/m

function formatBuildLabel(d) {
    const pad = (n) => String(n).padStart(2, '0')
    return (
        `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} `
        + `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())} local`
    )
}

function embedBuildStamp() {
    const label = formatBuildLabel(new Date())
    const line = `Q.build_time_label = '${label.replace(/'/g, "\\'")}';`
    let text = fs.readFileSync(ROOT_SCENE, 'utf8')
    if (!STAMP_LINE_RE.test(text)) {
        console.error(
            'write-build-stamp: missing Q.build_time_label line in root.scene.dry'
        )
        process.exit(1)
    }
    text = text.replace(STAMP_LINE_RE, line)
    fs.writeFileSync(ROOT_SCENE, text, 'utf8')
    console.log('embedded build stamp in', path.relative(ROOT, ROOT_SCENE), '→', label)
    return label
}

function writeStampFile() {
    const label = formatBuildLabel(new Date())
    if (!fs.existsSync(OUT_HTML)) {
        console.warn('write-build-stamp: out/html/ missing, skipped build-stamp.txt')
        return
    }
    const stampPath = path.join(OUT_HTML, 'build-stamp.txt')
    fs.writeFileSync(stampPath, label + '\n', 'utf8')
    console.log('wrote', path.relative(ROOT, stampPath), '→', label)
}

if (require.main === module) {
    embedBuildStamp()
    writeStampFile()
}

module.exports = { embedBuildStamp, writeStampFile, formatBuildLabel, STAMP_LINE_RE }
