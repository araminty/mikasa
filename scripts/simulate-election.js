#!/usr/bin/env node
/**
 * Run the Mikasa election model without Dendrynexus.
 *
 * Usage:
 *   node scripts/simulate-election.js              # v1 (legacy voter-block model)
 *   node scripts/simulate-election.js --v2       # v2 (IG floor + competitive)
 *   node scripts/simulate-election.js --v2 --scenario democratic_awakening
 *   node scripts/simulate-election.js --json
 */

const path = require('path')

const args = process.argv.slice(2)
const jsonOut = args.includes('--json')
const useV2 = args.includes('--v2')
const igOnly = args.includes('--ig-tabulation')
const noIgTab = args.includes('--no-ig-tabulation')
const igDistrict = args.includes('--ig-tabulation-district')
const igFull = args.includes('--ig-tabulation-full')
const help = args.includes('--help') || args.includes('-h')

const igFilterIdx = args.indexOf('--ig')
const igFilter = igFilterIdx >= 0 ? args[igFilterIdx + 1] : null

const scenarioIdx = args.indexOf('--scenario')
const scenario = scenarioIdx >= 0 ? args[scenarioIdx + 1] : 'baseline'

if (help) {
    console.log(`Usage: node scripts/simulate-election.js [options]

  (default)     v1 model (source/lib/election-model.js)
  --v2          v2 model: demo×district blocks, corp/syndicate IGs + competitive vote
  --scenario S  v2 only: ${Object.keys(require(path.join(__dirname, '../source/lib/election-v2.js')).SCENARIOS).join(', ')}
  --json        JSON output
  --ig-tabulation           v2: only IG→VoterBlock source tables (executive chamber)
  --ig-tabulation-full      v2: all VoterBlocks per IG + list of zero-contribution blocks
  --ig-tabulation-district  v2: also show district-chamber IG sources in full report
  --no-ig-tabulation        v2: omit IG source tables from default report
  --ig ID                 v2: only one interest group (e.g. --ig Soylent)
`)
    process.exit(0)
}

if (useV2) {
    const v2 = require(path.join(__dirname, '../source/lib/election-v2.js'))
    const { Q } = v2.initElectionV2({}, {
        scenario,
        allDistricts: true,
        includeZeroBlocks: igFull,
    })
    const reportOpts = {
        includeIgTabulation: !noIgTab,
        includeDistrictIgTabulation: igDistrict,
        includeZeroBlocks: igFull,
        igFilter: igFilter,
        maxRowsPerIg: igFull ? Infinity : 15,
    }
    if (jsonOut) {
        console.log(JSON.stringify(v2.electionSnapshotV2(Q), null, 2))
    } else if (igOnly) {
        const tab = Q.electionV2.igTabulation.executive
        console.log(v2.formatIgBlockTabulation(tab, reportOpts))
        if (igDistrict) {
            console.log(v2.formatIgBlockTabulation(Q.electionV2.igTabulation.district, reportOpts))
        }
    } else {
        console.log(v2.formatElectionReportV2(Q, null, reportOpts))
    }
} else {
    const v1 = require(path.join(__dirname, '../source/lib/election-model.js'))
    const { Q } = v1.initElectionModel()
    Q.electorate.assign_seats()
    Q.qified_pops()
    if (jsonOut) {
        console.log(JSON.stringify(v1.electionSnapshot(Q), null, 2))
    } else {
        console.log(v1.formatElectionReport(Q))
    }
}
