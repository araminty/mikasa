/**
 * Display-name pools for economic homes vs non-home assets.
 *
 * All strings here are original to Mikasa (not copied from newspapers or articles).
 *
 * Flavor follows library.scenes demographics + author notes:
 *   first  → Japanese-heavy + EU/US settler roots
 *   second → East African (Swahili-leaning) + South Asian
 *   brazos → Tejano/Texas + hollow corporate
 *   soylent → faux-friendly corporate ("Fauxmy")
 *   magrail → bland Eastern Bloc–style bureaucratic names
 *   third_wave → weighted mix of all migrant pools
 *   coop → even mix of first_wave + second_wave
 *   rich → mix of megacorp naming styles
 *   deeper → childish / dismissive place names (homes only)
 *
 * DEV / REFERENCE ONLY — not compiled into the game. Authoritative copy:
 *   source/scenes/economic_assets_runtime.scene.dry (economic-name-catalog block).
 * After editing this file: node scripts/sync-economic-name-catalog-to-scene.js
 */

'use strict'

const CATALOG = {
    homes: {
        first_wave: {
            japanese: [
                'Hoshino Lane Flats',
                'Nishikawa Commons',
                'Sakuragi Row Apartments',
                'Tanabe Gravity Tower',
                'Misaki Row Housing',
                'Kawaguchi Mutual Hall',
                'Amano Street Block',
                'Ishikura Cook Block',
                'Fujimori Family Housing',
                'Yamashita Transit Loft',
                'Okada Court',
                'Morita Family Block',
            ],
            french: [
                'Belleville Housing Block',
                'Quai du Nord Apartments',
                'Montmartre Row Flats',
                'Saint-Cloud Family Annex',
                'Rue Lafayette Commons',
            ],
            german: [
                'Neuhausen Row Housing',
                'Bergmann Lane Collective',
                'Weissmart Workers Block',
                'Hafenstraße Tenement Hall',
            ],
            italian: [
                'Via Roma Housing',
                'Trastevere Row Flats',
                'Porto Vecchio Family Block',
                'San Marco Mutual Yard',
            ],
            english: [
                'Station Point Commons',
                'Pioneer Row Housing',
                'Cedar Wharf Flats',
                'North Harbor Family Block',
            ],
        },

        second_wave: {
            swahili: [
                'Umoja Tower',
                'Kilimani Cook Commons',
                'Mtoni Housing Block',
                'Maji Mazuri Commons',
                'Amani Block',
                'Mwangaza Housing Annex',
            ],
            south_asian: [
                'Shanti Row Megaplex',
                'Bengal Quarter Towers',
                'Chennai Cook Commons',
                'Kerala Mutual Hall',
                'Sundarban Housing Block',
            ],
        },

        brazos: {
            tejano: [
                'Alamo Row Housing',
                'Rio Grande Family Flats',
                'Tejano Norte Rest Court',
                'Lone Star Workers Block',
                'Mission Trail Flats',
                'Gulf Coast Tenement Hall',
                'San Antonio Row Tower',
                'El Paso Border Housing',
                'Corpus Christi Family Block',
                'Big Bend Relay Court',
                'Maverick Row Flats',
                'Lone Star Grande Housing',
                'Chaparral Rest Hall',
                'Brazos Bend Workers Block',
                'Norteño Row Court',
            ],
            corporate: [
                'Limelight Staff Housing Block',
                'Brazos Employee Rest Center',
                'Zaibatsu Contract Row',
                'Omniview Dormitory Node',
                'Hyperstream Bunk Annex',
                'TotalShare Sleep Vault',
                'BrandLoyalty Immersion Dorm',
                'ConsumerJoy Compliance Barracks',
                'Brazos Synergy Housing Pavilion',
                'SponsoredReality Rest Wing',
                'AdNauseam Workers Block',
                'ClickHarvest Housing Hub',
            ],
        },

        soylent: [
            'NutriSmile Hub',
            'Wellness Valley Annex',
            'Community Grin Facility',
            'Togetherness Protein Yard',
            'Friendly Fields Annex',
            'VitalHarmony Commons',
            'NurtureNest Commons',
            'WelcomeHome Protein Center',
            'WarmHearth Meal Commons',
            'JoyfulYield Cultivation Block',
            'OpenArms Meal Forge',
            'HappyPath Cultivation Vault',
            'ShareJoy Nutrient Annex',
            'PureTrust Agrinutrient Hub',
            'ComfortCrate Refillery',
        ],

        magrail: [
            "Heavy Industry Company Housing Block A",
            "Municipal Rail Executives' Rest Block B",
            "Rolling Stock Personnel Wash Facility",
            "Junior Executive Maglev Training Annex",
            "Executive Wellness Retreat Near the Yards",
            "Night Shift Canteen and Locker Building",
            "Temporary Housing for Surplus Contract Labor",
            "Rail Executives' Country Club Meeting Hall",
        ],

        deeper: [
            'Piss Off Valley',
            'Get Lost Ravine',
            'Buzz Off Commons',
            'Clear Out Cut',
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
            'Dégage Gorge',
            'Hau Ab Works',
            'Dummkopf Hollow',
            'Levati Block',
            'Têtes de Linotte Cut',
            'Vete Ravine',
            'Largo Valley',
            'Sai Fora Gallery',
            'Rot Op Cut',
            'Tonto Valley',
            'Baka Baka Block',
            'Deteke Gorge',
            'Nenda Hollow',
            'Pumbavu Ravine',
            'Jao Jao Commons',
            'Wypad Valley',
            'Stick Your Nose In It Tunnel',
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
            'Schwachkopf Cut',
            'Depp Tunnel',
            'Vollpfosten Ravine',
            'Hohlkopf Works',
            'Trottel Commons',
            'Crétin Canyon',
            'Balourd Hollow',
            'Nigaud Valley',
            'Andouille Gorge',
            'Nuls des Tunnels Block',
            'Cretino Works',
            'Buffone Cut',
            'Stupido Block',
            'Fuori dai Piedi Ravine',
            'Testa di Rapa Hollow',
            'Gil Valley',
            'Idiota Hollow',
            'Maleducado Cut',
            'Otário Ravine',
            'Babaca Block',
            'Zopenco Cut',
            'Oen Tunnel',
            'Idioot Cut',
            'Tåpe Block',
            'Fjutt Tunnel',
            'Głupku Valley',
            'Wynocha Cut',
            'Debil Commons',
            'Aho Aho Commons',
            'Baka Yaro Cut',
            'Babo Block',
            'Mjinga Hollow',
            'Buddhu Ravine',
            'Ullu ka Pattha Works',
            'Aptal Valley',
            'Ilithios Cut',
            'Durak Hollow',
            '165-Degree Flip Housing',
            'Annex This Cut',
            'Wrong Way Gravity Plaza',
        ],
    },

    assets: {
        first_wave: {
            japanese: [
                'Hoshino Lane Workshop',
                'Nishikawa Maker Annex',
                'Sakuragi Repair Annex',
                'Tanabe Gravity Works',
                'Misaki Row Atelier',
                'Kawaguchi Tool Hall',
                'Amano Street Foundry',
                'Ishikura Fabrication Block',
                'Fujimori Tool Collective',
                'Yamashita Transit Works',
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
                'Bergmann Lane Machine Shop',
            ],
            italian: [
                'Via Roma Workshop',
                'Trastevere Repair Loft',
                'Porto Vecchio Maker Hall',
                'San Marco Fabrication Yard',
            ],
            english: [
                'Cedar Wharf Studios',
                'North Harbor Works',
                'Pioneer Row Atelier',
                'Station Point Machine Shop',
            ],
        },

        second_wave: {
            swahili: [
                'Harambee Maker Yard',
                'Bahari Street Workshop',
                'Kijito Repair Hall',
                'Safari Row Collective',
                'Twende Lane Works',
                'Jua Kali Foundry',
            ],
            south_asian: [
                'Anand Yard',
                'Ganesh Industrial Annex',
                'Delhi Gate Workshop',
                'Lahore Street Works',
                'Mumbai Lane Repair Loft',
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
            'Harmony Acres Processing',
            'FreshStart Silo Complex',
            'BrightBowl Catering Vault',
            'Wholesome Reach Center',
            'CareCircle Nutrient Works',
            'Sunrise Assurance Plant',
            'KindBite Distribution Center',
            'WeCare Protein Annex',
            'TogetherToday Silo Complex',
            'SmileSync Nutrient Works',
            'Heartfelt Harvest Facility',
            'GentleGrain Assurance Plant',
            'BloomTogether Processing Yard',
            'ThriveMate Catering Complex',
            'TrustBite Assurance Silo',
        ],

        magrail: [
            'Freight Consolidation Point No. 4',
            'Privatized Grain Transfer Elevator',
            'District Utility Relay Substation',
            'Corporate Unity Marshalling Hall',
            'Fiscal Year-End Brake Testing Facility',
            'Tether Approach Sorting Shed',
            'Block 7 Refrigerated Siding Complex',
            'Board of Directors Siding Office',
            'Cold Storage Transfer Depot',
            'Track Maintenance Contractor Equipment Shed',
            'Inter-District Freight Accounting Center',
            'Agribusiness Produce Loading Ramp',
            'Manifest Verification Office',
            'Building 12 Gauge Conversion Workshop',
            'Authorized Personnel Only Crossing Gate',
            'Hump Yard Operations Bunker',
            'Capitalist Competition Scoreboard Pavilion',
            'Intermodal Transfer Platform No. 2',
            'Corporate Security Freight Inspection Booth',
            'Mandatory Productivity Overtime Assembly Point',
            'Executive Committee Supply Distribution Shed',
            'Brake Van Repair Subsidiary No. 3',
        ],

        deeper: [
            'Ty Malá Opice Inc.',
            'Nobody Cares Workshop',
            'Go Away Fabrication Shed',
            'Mind Yer Business Yard',
            'Cul Collective'
        ],
    },
}

/** @type {Record<string, number>} */
const FIRST_WAVE_WEIGHTS = {
    japanese: 50,
    french: 13,
    german: 13,
    italian: 12,
    english: 12,
}

function catalogKind(isHome) {
    return isHome ? 'homes' : 'assets'
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

function pickFirstWave(seed, isHome) {
    var wave = CATALOG[catalogKind(isHome)].first_wave
    var buckets = []
    for (var key in FIRST_WAVE_WEIGHTS) {
        if (!Object.prototype.hasOwnProperty.call(FIRST_WAVE_WEIGHTS, key)) { continue }
        buckets.push({
            weight: FIRST_WAVE_WEIGHTS[key],
            pool: wave[key],
        })
    }
    return pickWeighted(buckets, 'first:' + seed)
}

function pickSecondWave(seed, isHome) {
    var wave = CATALOG[catalogKind(isHome)].second_wave
    return pickWeighted([
        { weight: 50, pool: wave.swahili },
        { weight: 50, pool: wave.south_asian },
    ], 'second:' + seed)
}

function pickCoop(seed, isHome) {
    if (hashSeed('coop-branch:' + seed) % 2 === 0) {
        return pickFirstWave('coop:' + seed, isHome)
    }
    return pickSecondWave('coop:' + seed, isHome)
}

function pickBrazos(seed, isHome) {
    var b = CATALOG[catalogKind(isHome)].brazos
    return pickWeighted([
        { weight: 45, pool: b.tejano },
        { weight: 55, pool: b.corporate },
    ], 'brazos:' + seed)
}

function pickSoylent(seed, isHome) {
    return pick(CATALOG[catalogKind(isHome)].soylent, 'soylent:' + seed)
}

function pickMagrail(seed, isHome) {
    return pick(CATALOG[catalogKind(isHome)].magrail, 'magrail:' + seed)
}

function pickDeeper(seed, isHome) {
    var pool = CATALOG[catalogKind(isHome)].deeper
    var name = pick(pool, 'deeper:' + seed)
    if (!name && !isHome) {
        return pick(CATALOG.homes.deeper, 'deeper:' + seed)
    }
    return name
}

function pickThirdWave(seed, isHome) {
    var kind = catalogKind(isHome)
    var fw = CATALOG[kind].first_wave
    var sw = CATALOG[kind].second_wave
    return pickWeighted([
        { weight: 28, pool: fw.japanese },
        { weight: 8, pool: fw.french },
        { weight: 8, pool: fw.german },
        { weight: 7, pool: fw.italian },
        { weight: 7, pool: fw.english },
        { weight: 22, pool: sw.swahili },
        { weight: 15, pool: sw.south_asian },
        { weight: 5, pool: CATALOG[kind].magrail },
    ], 'third:' + seed)
}

function pickRich(seed, isHome) {
    var kind = catalogKind(isHome)
    return pickWeighted([
        { weight: 30, pool: CATALOG[kind].soylent },
        { weight: 30, pool: CATALOG[kind].brazos.corporate },
        { weight: 25, pool: CATALOG[kind].magrail },
        { weight: 15, pool: CATALOG[kind].brazos.tejano },
    ], 'rich:' + seed)
}

/**
 * Pick a display name for an owner.
 * @param {object} opts
 * @param {'ig'|'stratum'|'public'} opts.ownerType
 * @param {string} opts.owner
 * @param {string} [opts.id]
 * @param {boolean} [opts.isHome]
 */
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

module.exports = {
    CATALOG,
    CATALOG_HOMES: CATALOG.homes,
    CATALOG_ASSETS: CATALOG.assets,
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
