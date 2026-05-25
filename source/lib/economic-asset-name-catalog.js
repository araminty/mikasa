/**
 * Display-name pools for economic assets & homes.
 *
 * All strings here are original to Mikasa (not copied from newspapers or articles).
 * Live newspaper scraping was intentionally skipped: paywalls, article copyright,
 * and byline privacy make that a poor fit for a shipped name list.
 *
 * Flavor follows library.scenes demographics + author notes:
 *   first  → Japanese-heavy + EU/US settler roots
 *   second → East African (Swahili-leaning) + South Asian
 *   brazos → Tejano/Texas + hollow corporate
 *   soylent → faux-friendly corporate ("Fauxmy")
 *   magrail → bland Eastern Bloc–style bureaucratic names; capitalist tone only where
 *             the old socialist/populist label mattered (Unity, People's, Collective, etc.)
 *   third_wave → weighted mix of all migrant pools
 *   coop → even mix of first_wave + second_wave
 *   rich → mix of megacorp naming styles
 *   deeper → childish / dismissive / mild insults (many languages); no sexual slang
 *
 * DEV / REFERENCE ONLY — not compiled into the game. Authoritative copy:
 *   source/scenes/economic_assets_runtime.scene.dry (economic-name-catalog block).
 * Edit the .scene.dry first; update this file only for Node tooling convenience.
 */

'use strict'

const CATALOG = {
    first_wave: {
        japanese: [
            'Hoshino Lane Workshop',
            'Nishikawa Commons',
            'Sakuragi Repair Annex',
            'Tanabe Gravity Works',
            'Misaki Row Atelier',
            'Kawaguchi Mutual Hall',
            'Amano Street Foundry',
            'Ishikura Cook Block',
            'Fujimori Tool Collective',
            'Yamashita Transit Loft',
            'Okada Maker Yard',
            'Morita Family Works',
        ],
        french: [
            'Rue Lafayette Atelier',
            'Belleville Maker House',
            'Quai du Nord Workshop',
            'Montmartre Annex',
            'Saint-Cloud Repair Hall',
        ],
        german: [
            'Weissmart Forge',
            'Hafenstraße Works',
            'Neuhausen Tool House',
            'Bergmann Lane Collective',
        ],
        italian: [
            'Via Roma Workshop',
            'Trastevere Repair Loft',
            'Porto Vecchio Maker Hall',
            'San Marco Mutual Yard',
        ],
        english: [
            'Cedar Wharf Studios',
            'North Harbor Works',
            'Pioneer Row Atelier',
            'Station Point Commons',
        ],
    },

    second_wave: {
        swahili: [
            'Umoja Tower',
            'Kilimani Cook Commons',
            'Mtoni Housing Block',
            'Harambee Maker Yard',
            'Bahari Street Workshop',
            'Kijito Repair Hall',
            'Safari Row Collective',
            'Maji Mazuri Commons',
            'Twende Lane Works',
            'Amani Block',
            'Jua Kali Foundry',
            'Mwangaza Housing Annex',
        ],
        south_asian: [
            'Anand Yard',
            'Shanti Row Megaplex',
            'Ganesh Industrial Annex',
            'Bengal Quarter Towers',
            'Chennai Cook Commons',
            'Delhi Gate Workshop',
            'Kerala Mutual Hall',
            'Lahore Street Works',
            'Mumbai Lane Repair Loft',
            'Sundarban Housing Block',
            'Tamil Square Atelier',
            'Vijayanagar Maker Collective',
        ],
    },

    brazos: {
        tejano: [
            'Alamo HouseDraft Pavilion',
            'Rio Grande Media Spur',
            'Tejano Norte Display Node',
            'Lone Star Compliance Yard',
            'Mission Trail Workshop',
            'Gulf Coast Signal Hall',
            'San Antonio Feed Tower',
            'El Paso Border Display Annex',
            'Corpus Christi Media Pier',
            'Big Bend Relay Cut',
            'Maverick Row Workshop',
            'Lone Star Grande Pavilion',
            'Chaparral Compliance Hall',
            'Brazos Bend Signal Yard',
            'Norteño Content Forge',
        ],
        corporate: [
            'Brazos TotalReach Center',
            'Zaibatsu Narrative Forge',
            'Limelight Output Annex',
            'Omniview Distribution Node',
            'Hyperstream Ad Works',
            'Brazos PixelRain Atrium',
            'TotalShare Experience Node',
            'AdNauseam Production Forge',
            'Limelight Feed Buffer',
            'StreamServe Content Vault',
            'AlwaysOn Display Cathedral',
            'ConsumerJoy Compliance Center',
            'BrandLoyalty Immersion Studio',
            'OptiClick Narrative Yard',
            'Brazos Synergy Pavilion',
            'InfiniteScroll Media Complex',
            'AttentionCapture Works',
            'SponsoredReality Annex',
            'ClickHarvest Distribution Hub',
            'Zaibatsu Optics Laboratory',
        ],
    },

    soylent: [
        'NutriSmile Hub',
        'Wellness Valley Annex',
        'Harmony Acres Processing',
        'Community Grin Facility',
        'FreshStart Silo Complex',
        'Togetherness Protein Yard',
        'BrightBowl Catering Vault',
        'Wholesome Reach Center',
        'CareCircle Nutrient Works',
        'Sunrise Assurance Plant',
        'Friendly Fields Annex',
        'VitalHarmony Commons',
        'KindBite Distribution Center',
        'WeCare Protein Annex',
        'TogetherToday Silo Complex',
        'SmileSync Nutrient Works',
        'Heartfelt Harvest Facility',
        'GentleGrain Assurance Plant',
        'NurtureNest Commons',
        'HappyPath Cultivation Vault',
        'OpenArms Meal Forge',
        'PureTrust Agrinutrient Hub',
        'BloomTogether Processing Yard',
        'ComfortCrate Refillery',
        'ThriveMate Catering Complex',
        'ShareJoy Nutrient Annex',
        'WelcomeHome Protein Center',
        'TrustBite Assurance Silo',
        'WarmHearth Meal Commons',
        'JoyfulYield Cultivation Block',
    ],

    magrail: [
        "Heavy Industry Company Housing Block A",
        "Freight Consolidation Point No. 4",
        "Municipal Rail Executives' Rest Block B",
        "Privatized Grain Transfer Elevator",
        "District Utility Relay Substation",
        "Corporate Unity Marshalling Hall",
        "Fiscal Year-End Brake Testing Facility",
        "Tether Approach Sorting Shed",
        "Block 7 Refrigerated Siding Complex",
        "Rolling Stock Personnel Wash Facility",
        "Junior Executive Maglev Training Annex",
        "Board of Directors Siding Office",
        "Cold Storage Transfer Depot",
        "Track Maintenance Contractor Equipment Shed",
        "Inter-District Freight Accounting Center",
        "Executive Wellness Retreat Near the Yards",
        "Agribusiness Produce Loading Ramp",
        "Manifest Verification Office",
        "Building 12 Gauge Conversion Workshop",
        "Night Shift Canteen and Locker Building",
        "Authorized Personnel Only Crossing Gate",
        "Hump Yard Operations Bunker",
        "Capitalist Competition Scoreboard Pavilion",
        "Rail Executives' Country Club Meeting Hall",
        "Temporary Housing for Surplus Contract Labor",
        "Intermodal Transfer Platform No. 2",
        "Corporate Security Freight Inspection Booth",
        "Mandatory Productivity Overtime Assembly Point",
        "Executive Committee Supply Distribution Shed",
        "Brake Van Repair Subsidiary No. 3",
    ],

    deeper: [
        // English — dismissive
        'Piss Off Valley',
        'Get Lost Ravine',
        'Buzz Off Commons',
        'Clear Out Cut',
        // English — childish / gross / mocking
        'Fart in Your Face Boulevard',
        'Stinky Sock Tunnel',
        'Yo Mamma Ravine',
        'Nyah Nyah Gorge',
        'Loser Town Block',
        'Nobody Asked You Commons',
        'We Were Here First Valley',
        'Eat My Dust Hollow',
        'Booger Lane Works',
        'Buttface Heights',
        // French / German / Italian
        'Dégage Gorge',
        'Hau Ab Works',
        'Dummkopf Hollow',
        'Levati Block',
        'Têtes de Linotte Cut',
        // Spanish / Portuguese / Dutch
        'Vete Ravine',
        'Largo Valley',
        'Sai Fora Gallery',
        'Rot Op Cut',
        'Tonto Valley',
        // Japanese / Swahili / Hindi (romanized)
        'Baka Baka Block',
        'Deteke Gorge',
        'Nenda Hollow',
        'Pumbavu Ravine',
        'Jao Jao Commons',
        // Polish / absurdist
        'Wypad Valley',
        'Stick Your Nose In It Tunnel',
        // More English childish
        'Stupidhead Basin',
        'Chewy Shoe Substation',
        'Dingus Valley',
        'Go Suck an Egg Ravine',
        'Talk to the Hand Commons',
        'Tourists Go Home Cut',
        'Mind Your Own Business Tunnel',
        'Not In My Tunnel Block',
        'Smell Ya Later Hollow',
        'Cry About It Ravine',
        // German
        'Schwachkopf Cut',
        'Depp Tunnel',
        'Vollpfosten Ravine',
        'Hohlkopf Works',
        'Trottel Commons',
        // French
        'Crétin Canyon',
        'Balourd Hollow',
        'Nigaud Valley',
        'Andouille Gorge',
        'Nuls des Tunnels Block',
        // Italian
        'Cretino Works',
        'Buffone Cut',
        'Stupido Block',
        'Fuori dai Piedi Ravine',
        'Testa di Rapa Hollow',
        // Spanish / Portuguese
        'Gil Valley',
        'Idiota Hollow',
        'Maleducado Cut',
        'Otário Ravine',
        'Babaca Block',
        'Zopenco Cut',
        // Dutch / Scandinavian
        'Oen Tunnel',
        'Idioot Cut',
        'Tåpe Block',
        'Fjutt Tunnel',
        // Polish / Czech-ish
        'Głupku Valley',
        'Wynocha Cut',
        'Debil Commons',
        // Japanese / Korean / Swahili / Hindi
        'Aho Aho Commons',
        'Baka Yaro Cut',
        'Babo Block',
        'Mjinga Hollow',
        'Buddhu Ravine',
        'Ullu ka Pattha Works',
        // Turkish / Greek / Russian (romanized)
        'Aptal Valley',
        'Ilithios Cut',
        'Durak Hollow',
        // Deeps lore
        '165-Degree Flip Housing',
        'Annex This Cut',
        'Wrong Way Gravity Plaza',
    ],
}

/** @type {Record<string, number>} */
const FIRST_WAVE_WEIGHTS = {
    japanese: 50,
    french: 13,
    german: 13,
    italian: 12,
    english: 12,
}

function hashSeed(seed) {
    var s = String(seed == null ? '' : seed)
    var h = 0
    for (var i = 0; i < s.length; i++) {
        h = ((h << 5) - h) + s.charCodeAt(i)
        h |= 0
    }
    return Math.abs(h)
}

function pick(pool, seed) {
    if (!pool || !pool.length) { return '' }
    var idx = hashSeed(seed) % pool.length
    return pool[idx]
}

function pickWeighted(buckets, seed) {
    var total = 0
    for (var i = 0; i < buckets.length; i++) {
        total += buckets[i].weight
    }
    if (total <= 0) { return pick(buckets[0] && buckets[0].pool, seed) }
    var roll = hashSeed(seed) % total
    for (var j = 0; j < buckets.length; j++) {
        roll -= buckets[j].weight
        if (roll < 0) {
            return pick(buckets[j].pool, seed + ':' + j)
        }
    }
    return pick(buckets[buckets.length - 1].pool, seed)
}

function pickFirstWave(seed) {
    var buckets = []
    for (var key in FIRST_WAVE_WEIGHTS) {
        if (!Object.prototype.hasOwnProperty.call(FIRST_WAVE_WEIGHTS, key)) { continue }
        buckets.push({
            weight: FIRST_WAVE_WEIGHTS[key],
            pool: CATALOG.first_wave[key],
        })
    }
    return pickWeighted(buckets, 'first:' + seed)
}

function pickSecondWave(seed) {
    return pickWeighted([
        { weight: 50, pool: CATALOG.second_wave.swahili },
        { weight: 50, pool: CATALOG.second_wave.south_asian },
    ], 'second:' + seed)
}

/** Cooperatives: even mix of first-wave and second-wave naming. */
function pickCoop(seed) {
    if (hashSeed('coop-branch:' + seed) % 2 === 0) {
        return pickFirstWave('coop:' + seed)
    }
    return pickSecondWave('coop:' + seed)
}

function pickBrazos(seed) {
    return pickWeighted([
        { weight: 45, pool: CATALOG.brazos.tejano },
        { weight: 55, pool: CATALOG.brazos.corporate },
    ], 'brazos:' + seed)
}

function pickSoylent(seed) {
    return pick(CATALOG.soylent, 'soylent:' + seed)
}

function pickMagrail(seed) {
    return pick(CATALOG.magrail, 'magrail:' + seed)
}

function pickDeeper(seed) {
    return pick(CATALOG.deeper, 'deeper:' + seed)
}

/** Third wave: migrant mix of first + second (+ smatter of corp utilitarian). */
function pickThirdWave(seed) {
    return pickWeighted([
        { weight: 28, pool: CATALOG.first_wave.japanese },
        { weight: 8, pool: CATALOG.first_wave.french },
        { weight: 8, pool: CATALOG.first_wave.german },
        { weight: 7, pool: CATALOG.first_wave.italian },
        { weight: 7, pool: CATALOG.first_wave.english },
        { weight: 22, pool: CATALOG.second_wave.swahili },
        { weight: 15, pool: CATALOG.second_wave.south_asian },
        { weight: 5, pool: CATALOG.magrail },
    ], 'third:' + seed)
}

/** Rich / shareholder local capital: megacorp naming tones blended. */
function pickRich(seed) {
    return pickWeighted([
        { weight: 30, pool: CATALOG.soylent },
        { weight: 30, pool: CATALOG.brazos.corporate },
        { weight: 25, pool: CATALOG.magrail },
        { weight: 15, pool: CATALOG.brazos.tejano },
    ], 'rich:' + seed)
}

/**
 * Pick a display name for an owner.
 * @param {object} opts
 * @param {'ig'|'stratum'|'public'} opts.ownerType
 * @param {string} opts.owner — Soylent | Magrail | Brazos | first | second | third_wave | rich | …
 * @param {string} [opts.id] — stable id for seeding
 * @param {boolean} [opts.isHome]
 */
function pickOwnerDisplayName(opts) {
    opts = opts || {}
    var owner = String(opts.owner || '')
    var seed = opts.id || (owner + '_' + (opts.district || '') + '_' + (opts.isHome ? 'home' : 'asset'))

    if (opts.ownerType === 'ig') {
        if (owner === 'Soylent') { return pickSoylent(seed) }
        if (owner === 'Magrail') { return pickMagrail(seed) }
        if (owner === 'Brazos') { return pickBrazos(seed) }
        return pick(owner.toLowerCase(), seed) || owner + ' Facility'
    }

    if (owner === 'first') { return pickFirstWave(seed) }
    if (owner === 'second') { return pickSecondWave(seed) }
    if (owner === 'third_wave') { return pickThirdWave(seed) }
    if (owner === 'rich') { return pickRich(seed) }
    if (owner === 'deeper') { return pickDeeper(seed) }
    if (owner === 'coop') { return pickCoop(seed) }

    return pickThirdWave(seed)
}

module.exports = {
    CATALOG,
    pick,
    pickFirstWave,
    pickSecondWave,
    pickCoop,
    pickBrazos,
    pickSoylent,
    pickMagrail,
    pickThirdWave,
    pickRich,
    pickDeeper,
    pickOwnerDisplayName,
}
