/**
 * Dev mirror of attitude() in attitude_runtime.scene.dry — not compiled into the game.
 */
'use strict'

function attitude(leverage, reprisal) {
    var L = Number(leverage)
    var R = Number(reprisal)
    if (isNaN(L)) { L = 0 }
    if (isNaN(R)) { R = 0 }
    if (L + R < 3) { return 'contempt' }
    if (L > R) {
        if (L > 18) { return 'captive' }
        if (L + R > 18) { return 'tolerating' }
        return 'transactional'
    }
    if (R > 18) { return 'furious' }
    if (L + R > 18) { return 'hostile' }
    return 'wary'
}

module.exports = { attitude }
