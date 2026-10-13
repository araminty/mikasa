#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const file = path.join(__dirname, '../source/scenes/major/cable_break_negotiations.scene.dry')
let text = fs.readFileSync(file, 'utf8')

text = text.replace(
  'on-arrival: {!\n// --- reprisal knobs',
  'on-arrival: {!\nQ.cableNegEnsureApi = function() {\n// --- reprisal knobs'
)

text = text.replace(
  /\/\/ --- bootstrap \(sketch: wire vote tally \+ budget costs in a later pass\) ---\nif \(Q\.cable_neg_ready != 1\) \{[\s\S]*?Q\.cable_neg_infra_cap = 0\n\}\nfunction cableNegReprisalAdd/,
  `Q.cableNegLeverageBoost = CABLE_NEG_LEVERAGE_BOOST
if (Q._cable_neg_api) return
Q._cable_neg_api = 1
Q.cableNegReprisalAdd = function`
)

text = text.replace(/^function (cableNeg\w+)\(/gm, 'Q.$1 = function(')

const syncMarker = 'Q.cableNegSyncCorpStances = function()'
const syncIdx = text.indexOf(syncMarker)
const apiStart = text.indexOf('Q.cableNegReprisalAdd = function')
let apiBlock = text.slice(apiStart, syncIdx)
apiBlock = apiBlock.replace(/\bQ\.(cableNeg\w+)/g, '___Q___$1')
apiBlock = apiBlock.replace(/\bcableNeg(\w+)\(/g, 'Q.cableNeg$1(')
apiBlock = apiBlock.replace(/___Q___(cableNeg\w+)/g, 'Q.$1')
text = text.slice(0, apiStart) + apiBlock + text.slice(syncIdx)

text = text.replace(
  /(Q\.cableNegSyncCorpStances = function\(\) \{[\s\S]*?stanceFor\('brazos'\)\n\})\nif \(typeof Q\.syncIgAttitudes/,
  `$1
}
Q.cableNegEnsureApi()
if (Q.cable_neg_ready != 1) {
    Q.cable_neg_ready = 1
    Q.cable_neg_leverage_boost = Q.cableNegLeverageBoost
    Q.soylent_leverage = (Number(Q.soylent_leverage) || 0) + Q.cable_neg_leverage_boost
    Q.magrail_leverage = (Number(Q.magrail_leverage) || 0) + Q.cable_neg_leverage_boost
    Q.brazos_leverage = (Number(Q.brazos_leverage) || 0) + Q.cable_neg_leverage_boost

    Q.cable_neg_prior_leverage = (
        (Number(Q.soylent_leverage) || 0) > Q.cable_neg_leverage_boost
        || (Number(Q.magrail_leverage) || 0) > Q.cable_neg_leverage_boost
        || (Number(Q.brazos_leverage) || 0) > Q.cable_neg_leverage_boost
    ) ? 1 : 0

    Q.cable_neg_police_vats = 0
    Q.cable_neg_police_railyard = 0
    Q.cable_neg_police_docks = 0
    Q.cable_neg_police_limelight = 0
    Q.cable_neg_police_pay = 0
    Q.cable_neg_corp_tax = 0
    Q.cable_neg_corp_tax_fund = 0
    Q.cable_neg_brazos_tax_exempt = 0
    Q.cable_neg_civil_rights = 0
    Q.cable_neg_trials = 0
    Q.cable_neg_judge_review = 0
    Q.cable_neg_disband = 0
    Q.cable_neg_education_enroll = 0
    Q.cable_neg_education_pay = 0
    Q.cable_neg_land_tax = 0
    Q.cable_neg_infra_cap = 0
}
if (typeof Q.syncIgAttitudes`
)

const rootEnd = text.indexOf('!}\n\nThe tether rupture')
const head = text.slice(0, rootEnd + 3)
let tail = text.slice(rootEnd + 3)
tail = tail.replace(/\bcableNeg(\w+)\(/g, 'Q.cableNeg$1(')
tail = tail.replace(
  '@terms_menu\ntitle: Terms on the table\nsubtitle: Pick demands, then finalize when ready\non-arrival: {!\nQ.cableNegSyncCorpStances()',
  '@terms_menu\ntitle: Terms on the table\nsubtitle: Pick demands, then finalize when ready\non-arrival: {!\nQ.cableNegEnsureApi()\nQ.cableNegSyncCorpStances()'
)
tail = tail.replace(/on-arrival: \{!\n(?!Q\.cableNegEnsureApi)/g, 'on-arrival: {!\nQ.cableNegEnsureApi()\n')
tail = tail.replace(/Q\.cableNegEnsureApi\(\)\nQ\.cableNegEnsureApi\(\)\n/g, 'Q.cableNegEnsureApi()\n')
text = head + tail

fs.writeFileSync(file, text)
console.log('done')
