window.game={"compiled":"{\"title\":\"Mikasa Democracy: A Future History\",\"author\":\"Araminty Whitesell\",\"content\":\"\",\"scenes\":{\"prevScene\":{\"id\":\"prevScene\",\"content\":{\"content\":\"\",\"type\":\"paragraph\"}},\"prevTopScene\":{\"id\":\"prevTopScene\",\"content\":{\"content\":\"\",\"type\":\"paragraph\"}},\"jumpScene\":{\"id\":\"jumpScene\",\"content\":{\"content\":\"\",\"type\":\"paragraph\"}},\"backSpecialScene\":{\"id\":\"backSpecialScene\",\"content\":{\"content\":\"\",\"type\":\"paragraph\"}},\"returnScene\":{\"id\":\"returnScene\",\"content\":{\"content\":\"\",\"type\":\"paragraph\"}},\"cancel_advisor_action\":{\"id\":\"cancel_advisor_action\",\"type\":\"scene\",\"title\":\"Cancel action.\",\"viewIf\":{\"$code\":\"return (((Q['last_advisor_action'] || 0)===1) || ((Q['last_cabinet_action'] || 0)===1));\"},\"goTo\":[{\"id\":\"root\"}],\"onArrival\":[{\"$code\":\"if (Q.month_actions > 0) {\\n    Q.month_actions -= 1;\\n}\\nif (Q.last_advisor_action) {\\n    Q.advisor_action_timer = 0;\\n    Q.last_advisor_action = 0;\\n}\\nif (Q.last_cabinet_action) {\\n    Q.last_cabinet_action = 0;\\n}\\n// reset the timer...\\nvar card = this.game.scenes[this.state.prevTopSceneId];\\nif (Q[card.id + \\\"_timer\\\"]) {\\n    Q[card.id + \\\"_timer\\\"] = 0;\\n}\\n// reduce visit count\\nif (this.state.visits[card.id]) {\\n    this.state.visits[card.id] -= 1;\\n}\"}],\"content\":{\"content\":\"\",\"type\":\"paragraph\"}},\"credits\":{\"id\":\"credits\",\"type\":\"scene\",\"title\":\"Credits\",\"options\":[{\"id\":\"@root\",\"title\":\"Back\"}],\"content\":[{\"type\":\"paragraph\",\"content\":\"Autumn Chen: for making the original Parker Williamson: lead technical expert on scrying Catsy Morgan: Haruspicy assistance Cassandra Elizabeth Morgan: author of The Autobiography of Stacy Primogen Marie Anne Williamson: translator of the Manifest of Righteous Operating, commentary on the clans of the Mother.\"},{\"type\":\"paragraph\",\"content\":\"images https://commons.wikimedia.org/wiki/File:Building_collapse_in_S%C3%A3o_Paulo_2018_067.jpg https://commons.wikimedia.org/wiki/File:PSYCHE_(Asteroid).jpg https://commons.wikimedia.org/wiki/File:Ballotbox325CSCVL.png https://commons.wikimedia.org/wiki/File:LegCoChambers2025.jpg (image trimmed) https://commons.wikimedia.org/wiki/File:WorldWide_Telescope_(WWT)_-_Solar_system.png (image trimmed) https://commons.wikimedia.org/wiki/File:BigComboTrailer.jpg (image trimmed)\"}]},\"easy_discard\":{\"id\":\"easy_discard\",\"type\":\"scene\",\"title\":\"Return card to hand.\",\"viewIf\":{\"$code\":\"return ((((Q['difficulty'] || 0) <= 0) && ((Q['last_advisor_action'] || 0)===0)) && ((Q['last_cabinet_action'] || 0)===0));\"},\"goTo\":[{\"id\":\"root\"}],\"onArrival\":[{\"$code\":\"if (Q.month_actions > 0) {\\n    Q.month_actions -= 1;\\n}\\n// return card to hand\\nvar card = this.state.lastPlayedCard;\\ncard.image = card.cardImage;\\nif (Q.difficulty >= 0) {\\n    this.state.currentHands['main'].push(card);\\n} else {\\n    this.state.currentHands['main.main_easy'].push(card);\\n}\\n// reset the timer...\\nif (Q[card.id + \\\"_timer\\\"]) {\\n    Q[card.id + \\\"_timer\\\"] = 0;\\n}\\n// reduce visit count\\nif (this.state.visits[card.id]) {\\n    this.state.visits[card.id] -= 1;\\n}\"}],\"content\":{\"content\":\"\",\"type\":\"paragraph\"}},\"election_simulation.2300\":{\"id\":\"election_simulation.2300\",\"onArrival\":[{\"$code\":\"Q.update_projections({ allDistricts: true })\"}],\"goTo\":[{\"id\":\"election_simulation.show_results\"}],\"content\":{\"content\":\"\",\"type\":\"paragraph\"}},\"game_over.eg_menu\":{\"id\":\"game_over.eg_menu\",\"options\":[{\"id\":\"#endings\"},{\"id\":\"@game_over.end_game\",\"title\":\"End game.\"}],\"content\":{\"content\":\"\",\"type\":\"paragraph\"}},\"library.menu\":{\"id\":\"library.menu\",\"title\":\"menu\",\"options\":[{\"id\":\"@library.guilds_library\",\"title\":\"Guild Descriptions\"},{\"id\":\"@library.demographics_library\",\"title\":\"Demographic Descriptions\"},{\"id\":\"@library.districts_library\",\"title\":\"District Descriptions\"},{\"id\":\"@backSpecialScene\",\"title\":\"Exit library.\"}],\"content\":{\"content\":\"\",\"type\":\"paragraph\"}},\"main.main_easy\":{\"id\":\"main.main_easy\",\"setBg\":\"img/solar_system.jpg\",\"isHand\":true,\"maxCards\":4,\"options\":[{\"id\":\"@main.party\"},{\"id\":\"@main.govt\"},{\"id\":\"@advance\"},{\"id\":\"#advisor\"}],\"content\":{\"content\":\"\",\"type\":\"paragraph\"}},\"mod_loader\":{\"id\":\"mod_loader\",\"type\":\"scene\",\"title\":\"Mods\",\"isSpecial\":true,\"onDisplay\":[{\"$code\":\"var mods_list = document.getElementById('mods_list');\\n// load mods from url\\nvar mods_url = 'https://aucchen.github.io/social_democracy_mods/mod_list.tsv';\\nvar table = document.createElement('table');\\ntable.style.border = '1px solid';\\ntable.style['border-collapse'] = 'collapse';\\ntable.style['font-size'] = '0.8em';\\nQ.mods_table = {};\\nfetch(mods_url)\\n.then(response => response.text())\\n.then(text => {\\n    // split text\\n    var lines = text.split('\\\\n');\\n    for (var i = 0; i < lines.length; i++) {\\n        var line_data = lines[i].split('\\\\t');\\n        if (line_data.length < 5) {\\n            continue;\\n        }\\n        var tr = document.createElement('tr');\\n        for (var j = 0; j < 4; j++) {\\n            var td = document.createElement('td');\\n            if (i == 0) {\\n                td = document.createElement('th');\\n            }\\n            td.style.border = '1px solid';\\n            td.style.padding = '0.5em';\\n            td.textContent = line_data[j];\\n\\n            tr.appendChild(td);\\n        }\\n        if (i > 0) {\\n            Q.mods_table[line_data[2]] = {\\n                name: line_data[0],\\n                author: line_data[1],\\n                description: line_data[3],\\n            };\\n\\n        }\\n        table.appendChild(tr);\\n    }\\n    mods_list.appendChild(table);\\n})\\n.catch(err => console.log(err));\\n\\nvar submit = document.getElementById('submit');\\nsubmit.onclick = function() {\\n    var mod_url = document.getElementById('mod_url').value;\\n    // if it's a known mod, set the game's titlebar and author.\\n    if (Q.mods_table[mod_url]) {\\n        var mod_data = Q.mods_table[mod_url];\\n        var title = document.getElementById('game-title');\\n        title.textContent = mod_data.name;\\n        var author = document.getElementById('game-author');\\n        author.textContent = mod_data.author;\\n    }\\n    window.loadMod(mod_url);\\n};\"}],\"options\":[{\"id\":\"@backSpecialScene\",\"title\":\"Back\"}],\"content\":[{\"type\":\"paragraph\",\"content\":\"Curated mods:\"},{\"type\":\"paragraph\",\"content\":[{\"type\":\"magic\",\"content\":\"<div id=\\\"mods_list\\\"></div>\"},\"\"]},{\"type\":\"paragraph\",\"content\":\"Enter a mod's URL:\"},{\"type\":\"paragraph\",\"content\":{\"type\":\"magic\",\"content\":\"<input type=\\\"text\\\" size=\\\"25\\\" id=\\\"mod_url\\\" name=\\\"mod_url\\\"/> <button id=\\\"submit\\\">Submit</button>\"}}]},\"post_event.events_choice\":{\"id\":\"post_event.events_choice\",\"options\":[{\"id\":\"#event\"}],\"content\":{\"content\":\"\",\"type\":\"paragraph\"}},\"post_event\":{\"id\":\"post_event\",\"type\":\"scene\",\"title\":\"Post Event\",\"newPage\":true,\"onArrival\":[{\"$code\":\"// --- Electorate modifiers (applied after vote-label sync in Q.update_projections) ---\\n// stackId: Q quality bumped in events (e.g. favor_second_wave_housing_dispute += 1).\\n// Several rows may share one stackId (multiple effects per choice).\\n// Dendry initializes missing qualities to 0 before +=. Each poll applies delta * stacks.\\n// Scopes: stratum (demographic), district (region), global.\\n\\nvar ELECTORATE_PARTY_KEYS = ['D', 'I', 'C', 'G', 'H']\\n\\nfunction electorateZeroScores() {\\n    return { D: 0, I: 0, C: 0, G: 0, H: 0 }\\n}\\n\\nfunction electorateCopyScores(src) {\\n    var out = electorateZeroScores()\\n    for (var i = 0; i < ELECTORATE_PARTY_KEYS.length; i++) {\\n        var k = ELECTORATE_PARTY_KEYS[i]\\n        out[k] = (src && src[k]) || 0\\n    }\\n    return out\\n}\\n\\nfunction electorateAddDelta(scores, party, delta) {\\n    if (scores && scores[party] !== undefined) {\\n        scores[party] += delta\\n    }\\n}\\n\\nvar ELECTORATE_SCOPES = { stratum: 1, district: 1, global: 1 }\\n\\nclass ElectorateModifier {\\n    /**\\n     * Positional (table-friendly):\\n     *   new ElectorateModifier(rowId, stackId, scope, target, party, delta [, activeIf])\\n     *   new ElectorateModifier(stackId, scope, target, party, delta [, activeIf])  // legacy: rowId = stackId\\n     * stackId: Q quality for stacks (favor_second_wave_housing_dispute += 1).\\n     * scope: 'stratum' | 'district' | 'global' — use '' for target when global.\\n     * Object form: { id, stackId?, scope, target, party, delta, activeIf? }\\n     */\\n    constructor(rowId, stackId, scope, target, party, delta, activeIf) {\\n        var fromObject = rowId && typeof rowId === 'object'\\n        if (fromObject) {\\n            var opts = rowId\\n            rowId = opts.id\\n            stackId = opts.stackId != null ? opts.stackId : opts.id\\n            scope = opts.scope\\n            target = opts.target\\n            party = opts.party\\n            delta = opts.delta\\n            activeIf = opts.activeIf\\n            this.gateWithActiveIf = activeIf != null\\n        } else if (ELECTORATE_SCOPES[stackId]) {\\n            // legacy: (stackId, scope, target, party, delta [, activeIf])\\n            activeIf = delta\\n            delta = party\\n            party = target\\n            target = scope\\n            scope = stackId\\n            stackId = rowId\\n            this.gateWithActiveIf = arguments.length >= 6 && activeIf != null\\n        } else {\\n            this.gateWithActiveIf = arguments.length >= 7 && activeIf != null\\n        }\\n        this.id = rowId\\n        this.stackId = stackId || rowId\\n        this.scope = scope\\n        this.target = target || ''\\n        this.party = party\\n        this.delta = delta || 0\\n        this.activeIf = activeIf || function() { return true }\\n    }\\n\\n    /** Stack count from Q[stackId]; non-numeric or <= 0 → no effect. */\\n    stacksFromQ(q) {\\n        if (!q || q[this.stackId] == null) { return 0 }\\n        var n = Number(q[this.stackId])\\n        if (isNaN(n) || n <= 0) { return 0 }\\n        return n\\n    }\\n\\n    isActive(q) {\\n        try {\\n            return !!this.activeIf(q)\\n        } catch (e) {\\n            return false\\n        }\\n    }\\n\\n    apply(state, q) {\\n        var stacks = this.stacksFromQ(q)\\n        if (stacks <= 0) { return }\\n        if (this.gateWithActiveIf && !this.isActive(q)) { return }\\n        var shift = this.delta * stacks\\n        if (this.scope === 'stratum') {\\n            var dem = state.demographicsById[this.target]\\n            if (dem) { electorateAddDelta(dem.competitiveScores, this.party, shift) }\\n        } else if (this.scope === 'district') {\\n            var dist = state.districtsById[this.target]\\n            if (dist) { electorateAddDelta(dist.competitiveScores, this.party, shift) }\\n        } else if (this.scope === 'global') {\\n            electorateAddDelta(state.global.competitiveScores, this.party, shift)\\n        }\\n    }\\n}\\n\\nQ.ElectorateModifier = ElectorateModifier\\n\\n// rowId | stackId (= Q) | scope | target | party | delta — target '' for global\\n// In events:  dundalk_reform += 1\\n\\nQ.electorateModifierCatalog = [\\n    new ElectorateModifier('alien_dems_feb2300', 'stratum', 'alien', 'D', 0.2),\\n    new ElectorateModifier('pitts_gang_jun2300', 'district', 'Pitts', 'G', 0.3),\\n    new ElectorateModifier('refugee_pressure_hate', 'global', '', 'H', 0.1),\\n    new ElectorateModifier('dundalk_rally_reform', 'dundalk_reform', 'global', '', 'D', 1),\\n    new ElectorateModifier('dundalk_stake_rally_corp', 'dundalk_stakeholder', 'global', '', 'C', -2),\\n    new ElectorateModifier('dundalk_stake_rally_dems', 'dundalk_stakeholder', 'global', '', 'D', 1),\\n    new ElectorateModifier('dundalk_vigil_rally_gang', 'dundalk_vigil', 'global', '', 'G', -2),\\n    new ElectorateModifier('dundalk_vigil_rally_dems', 'dundalk_vigil', 'global', '', 'D', +.5),\\n    new ElectorateModifier('dundalk_nationalist_dems', 'dundalk_nationalist', 'global', '', 'D', 1.5),\\n    new ElectorateModifier('dundalk_nationalist_dems', 'dundalk_nationalist', 'global', '', 'H', 1.5),\\n    new ElectorateModifier('anti_corp_media_dem', 'anti_corp_media', 'global', '', 'D', 2),\\n    new ElectorateModifier('anti_corp_media_rich', 'anti_corp_media', 'stratum', 'rich', 'D', -4), // they dont like being villainized\\n\\n\\n    // --- parochialism → xenophobia_derived / xenophobia_clawed_back (stacks set in syncParochialismXenophobiaStacks)\\n    // Full outsider-hostility: H up, C down (corps scapegoated either way). Claw applies only to H/D.\\n    new ElectorateModifier('xenophobia_boost_H1', 'xenophobia_derived', 'stratum', 'first', 'H', 0.02),\\n    new ElectorateModifier('xenophobia_boost_H2', 'xenophobia_derived', 'stratum', 'second', 'H', 0.01),\\n    new ElectorateModifier('xenophobia_hurt_C1', 'xenophobia_derived', 'stratum', 'first', 'C', -0.02),\\n    new ElectorateModifier('xenophobia_hurt_C2', 'xenophobia_derived', 'stratum', 'second', 'C', -0.01),\\n    new ElectorateModifier('xenophobia_claw_H1', 'xenophobia_clawed_back', 'stratum', 'first', 'H', -0.01),\\n    new ElectorateModifier('xenophobia_claw_H2', 'xenophobia_clawed_back', 'stratum', 'second', 'H', -0.005),\\n    new ElectorateModifier('xenophobia_claw_D1', 'xenophobia_clawed_back', 'stratum', 'first', 'D', 0.01),\\n    new ElectorateModifier('xenophobia_claw_D2', 'xenophobia_clawed_back', 'stratum', 'second', 'D', 0.005),\\n\\n\\n    // --- organize_phase card stacks (placeholder; tune when cards are written) ---\\n    new ElectorateModifier('vocational_track_second_C', 'vocational_track', 'stratum', 'second', 'C', 0.15),\\n    new ElectorateModifier('vocational_track_second_D', 'vocational_track', 'stratum', 'second', 'D', 0.1),\\n    new ElectorateModifier('contract_outside_global_C', 'contract_outside', 'global', '', 'C', 0.1),\\n    new ElectorateModifier('contract_big3_drone_C', 'contract_big3', 'stratum', 'drone', 'C', 0.2),\\n    new ElectorateModifier('contract_petty_first_I', 'contract_petty', 'stratum', 'first', 'I', 0.1),\\n    new ElectorateModifier('contract_petty_first_G', 'contract_petty', 'stratum', 'first', 'G', 0.1),\\n    new ElectorateModifier('contract_coop_coop_D', 'contract_coop', 'stratum', 'coop', 'D', 0.15),\\n    new ElectorateModifier('coop_markets_coop_D', 'coop_markets', 'stratum', 'coop', 'D', 0.12),\\n    new ElectorateModifier('coop_markets_coop_C', 'coop_markets', 'stratum', 'coop', 'C', -0.08),\\n    new ElectorateModifier('coop_mother_coop_D', 'coop_mother', 'stratum', 'coop', 'D', 0.1),\\n    new ElectorateModifier('coop_mother_alien_D', 'coop_mother', 'stratum', 'alien', 'D', 0.08),\\n    new ElectorateModifier('coop_investment_coop_D', 'coop_investment', 'stratum', 'coop', 'D', 0.12),\\n    new ElectorateModifier('coop_investment_coop_C', 'coop_investment', 'stratum', 'coop', 'C', -0.1),\\n    new ElectorateModifier('magic_control_alien_C', 'magic_control', 'stratum', 'alien', 'C', 0.1),\\n    new ElectorateModifier('magic_control_alien_D', 'magic_control', 'stratum', 'alien', 'D', -0.1),\\n    new ElectorateModifier('magic_assimilate_alien_D', 'magic_assimilate', 'stratum', 'alien', 'D', 0.12),\\n    new ElectorateModifier('magic_school_alien_D', 'magic_school', 'stratum', 'alien', 'D', 0.15),\\n    new ElectorateModifier('magic_school_global_D', 'magic_school', 'global', '', 'D', 0.05),\\n    new ElectorateModifier('orc_marriage_wood_auto', 'orc_marriage_wood', 'global', '', 'D', 0),\\n    new ElectorateModifier('orc_marriage_civil_auto', 'orc_marriage_civil', 'global', '', 'D', 0),\\n    new ElectorateModifier('orc_marriage_minimum_auto', 'orc_marriage_minimum', 'global', '', 'D', 0),\\n\\n    // --- otherworld event stacks (placeholder) ---\\n    new ElectorateModifier('otherworld_outpost_alien_D', 'otherworld_outpost', 'stratum', 'alien', 'D', 0.1),\\n    new ElectorateModifier('otherworld_outpost_global_C', 'otherworld_outpost', 'global', '', 'C', 0.08),\\n    new ElectorateModifier('great_protector_appease_global_C', 'great_protector_appeasement', 'global', '', 'C', 0.12),\\n    new ElectorateModifier('great_protector_appease_global_D', 'great_protector_appeasement', 'global', '', 'D', -0.05),\\n\\n\\n\\n\\n    // --- auto-synced electorate stacks (delta 0) ---\\n    new ElectorateModifier('kiss_ass_media_auto', 'kiss_ass_media', 'global', '', 'D', 0),\\n    new ElectorateModifier('self_sufficiency_media_auto', 'self_sufficiency_media', 'global', '', 'D', 0),\\n    new ElectorateModifier('militia_auxiliary_auto', 'militia_auxiliary', 'global', '', 'D', 0),\\n    new ElectorateModifier('police_defund_auto', 'police_defund', 'global', '', 'D', 0),\\n    new ElectorateModifier('police_investigated_auto', 'police_investigated', 'global', '', 'D', 0),\\n    new ElectorateModifier('budget_auto', 'budget', 'global', '', 'D', 0),\\n    new ElectorateModifier('jovian_refugee_dread_auto', 'jovian_refugee_dread', 'global', '', 'D', 0),\\n    new ElectorateModifier('jovian_refugee_prepare_auto', 'jovian_refugee_prepare', 'global', '', 'D', 0),\\n    new ElectorateModifier('militia_auto', 'militia', 'global', '', 'D', 0),\\n    new ElectorateModifier('militia_police_auto', 'militia_police', 'global', '', 'D', 0),\\n    new ElectorateModifier('non_violence_auto', 'non_violence', 'global', '', 'D', 0),\\n    new ElectorateModifier('patriot_meme_strength_auto', 'patriot_meme_strength', 'global', '', 'D', 0),\\n    new ElectorateModifier('police_reform_auto', 'police_reform', 'global', '', 'D', 0),\\n    new ElectorateModifier('sabotage_auto', 'sabotage', 'global', '', 'D', 0),\\n\\n]\\n\\n// --- Reference only: competitiveScores from root buildDemographics / buildDistricts ---\\n// Not in the live catalog. Real baselines live in root (_baseCompetitiveScores at init).\\n// Shown as modifiers so you can compare scales when authoring story stacks (delta * Q[stackId]).\\n//\\n// Strata (buildDemographics):\\n// new ElectorateModifier('_ref_rich_D', 'stratum', 'rich', 'D', -1),\\n// new ElectorateModifier('_ref_rich_C', 'stratum', 'rich', 'C', 1),\\n// new ElectorateModifier('_ref_rich_I', 'stratum', 'rich', 'I', 0.5),\\n// new ElectorateModifier('_ref_rich_G', 'stratum', 'rich', 'G', -0.5),\\n// new ElectorateModifier('_ref_rich_H', 'stratum', 'rich', 'H', 0),\\n// new ElectorateModifier('_ref_first_D', 'stratum', 'first', 'D', 0.5),\\n// new ElectorateModifier('_ref_first_C', 'stratum', 'first', 'C', -0.5),\\n// new ElectorateModifier('_ref_first_G', 'stratum', 'first', 'G', 0),\\n// new ElectorateModifier('_ref_first_H', 'stratum', 'first', 'H', -0.5),\\n// new ElectorateModifier('_ref_second_D', 'stratum', 'second', 'D', 0.8),\\n// new ElectorateModifier('_ref_second_C', 'stratum', 'second', 'C', -0.8),\\n// new ElectorateModifier('_ref_second_G', 'stratum', 'second', 'G', 0.2),\\n// new ElectorateModifier('_ref_second_H', 'stratum', 'second', 'H', 0),\\n// new ElectorateModifier('_ref_coop_D', 'stratum', 'coop', 'D', 1),\\n// new ElectorateModifier('_ref_coop_C', 'stratum', 'coop', 'C', -1.5),\\n// new ElectorateModifier('_ref_coop_G', 'stratum', 'coop', 'G', -0.5),\\n// new ElectorateModifier('_ref_coop_H', 'stratum', 'coop', 'H', -0.5),\\n// new ElectorateModifier('_ref_drone_D', 'stratum', 'drone', 'D', 0.2),\\n// new ElectorateModifier('_ref_drone_C', 'stratum', 'drone', 'C', 1.5),\\n// new ElectorateModifier('_ref_drone_G', 'stratum', 'drone', 'G', 0.3),\\n// new ElectorateModifier('_ref_drone_H', 'stratum', 'drone', 'H', 0),\\n// new ElectorateModifier('_ref_alien_D', 'stratum', 'alien', 'D', 1.2),\\n// new ElectorateModifier('_ref_alien_H', 'stratum', 'alien', 'H', -1),\\n// new ElectorateModifier('_ref_alien_G', 'stratum', 'alien', 'G', -0.5),\\n// new ElectorateModifier('_ref_alien_C', 'stratum', 'alien', 'C', -0.5),\\n// new ElectorateModifier('_ref_deeper_D', 'stratum', 'deeper', 'D', 1.5),\\n// new ElectorateModifier('_ref_deeper_I', 'stratum', 'deeper', 'I', 1),\\n// new ElectorateModifier('_ref_deeper_C', 'stratum', 'deeper', 'C', -1),\\n// new ElectorateModifier('_ref_deeper_G', 'stratum', 'deeper', 'G', -0.5),\\n// new ElectorateModifier('_ref_deeper_H', 'stratum', 'deeper', 'H', -0.5),\\n//\\n// Districts (buildDistricts):\\n// new ElectorateModifier('_ref_Docks_C', 'district', 'Docks', 'C', 0.3),\\n// new ElectorateModifier('_ref_Docks_G', 'district', 'Docks', 'G', 0.2),\\n// new ElectorateModifier('_ref_Aurora_D', 'district', 'Aurora', 'D', 0.2),\\n// new ElectorateModifier('_ref_Aurora_I', 'district', 'Aurora', 'I', 0.2),\\n// new ElectorateModifier('_ref_Vats_C', 'district', 'Vats', 'C', 0.8),\\n// new ElectorateModifier('_ref_Vats_D', 'district', 'Vats', 'D', -0.3),\\n// new ElectorateModifier('_ref_Railyard_C', 'district', 'Railyard', 'C', 0.6),\\n// new ElectorateModifier('_ref_Railyard_G', 'district', 'Railyard', 'G', 0.1),\\n// new ElectorateModifier('_ref_Pitts_G', 'district', 'Pitts', 'G', 0.5),\\n// new ElectorateModifier('_ref_Pitts_D', 'district', 'Pitts', 'D', 0.2),\\n// new ElectorateModifier('_ref_Limelight_C', 'district', 'Limelight', 'C', 0.4),\\n// new ElectorateModifier('_ref_Limelight_G', 'district', 'Limelight', 'G', 0.3),\\n// new ElectorateModifier('_ref_Deeps_D', 'district', 'Deeps', 'D', 0.6),\\n// new ElectorateModifier('_ref_Deeps_I', 'district', 'Deeps', 'I', 0.4),\\n// new ElectorateModifier('_ref_Deeps_H', 'district', 'Deeps', 'H', -0.3),\\n\\n/** How radical the xenophobia is (0–1 linear, then sqrt above 1). Higher → harder for Dems to claw back. */\\nfunction effectiveParochialRadicalism(rad) {\\n    if (isNaN(rad) || rad <= 0) { return 0 }\\n    if (rad <= 1) { return rad }\\n    return Math.sqrt(rad)\\n}\\n\\n/** Share of derived xenophobia Dems can claw off H (1 − radicalism, floored at 0). */\\nfunction demClawBackFraction(rad) {\\n    return Math.max(0, 1 - effectiveParochialRadicalism(rad))\\n}\\n\\n/**\\n * Derive modifier stacks from Q.parochialism (0–100).\\n * xenophobia_derived: ramps above Suspicion (41+). H+/C− on 1st/2nd via catalog.\\n * xenophobia_clawed_back: derived * demClawBackFraction(rad); C still hit by derived only.\\n */\\nQ.syncParochialismXenophobiaStacks = function(q) {\\n    q = q || Q\\n    var p = Number(q.parochialism)\\n    if (isNaN(p)) { p = 0 }\\n    var rad = Number(q.parochial_radicalism)\\n    if (isNaN(rad)) { rad = 0.65 }\\n    var clawMult = demClawBackFraction(rad)\\n\\n    var suspicionFloor = 41\\n    var maxStack = 20\\n    var raw = p <= suspicionFloor ? 0 : ((p - suspicionFloor) / (100 - suspicionFloor)) * maxStack\\n\\n    q.xenophobia_derived = raw\\n    q.xenophobia_clawed_back = raw * clawMult\\n}\\n\\nQ.applyElectorateModifiers = function() {\\n    var state = Q.electionV2\\n    if (!state) { return }\\n\\n    Q.syncParochialismXenophobiaStacks(Q)\\n\\n    state.demographicsById = state.demographicsById || Object.fromEntries(\\n        state.demographics.map(function(d) { return [d.id, d] })\\n    )\\n    state.districtsById = state.districtsById || Object.fromEntries(\\n        state.districts.map(function(d) { return [d.id, d] })\\n    )\\n\\n    // Districts are not rebuilt by syncAllVoteAppeals; reset from baseline each poll.\\n    for (var j = 0; j < state.districts.length; j++) {\\n        var dist = state.districts[j]\\n        dist.competitiveScores = electorateCopyScores(\\n            dist._baseCompetitiveScores || dist.competitiveScores\\n        )\\n    }\\n    // Strata/global already base+appeals from root sync; add stack deltas only.\\n\\n    for (var m = 0; m < Q.electorateModifierCatalog.length; m++) {\\n        Q.electorateModifierCatalog[m].apply(state, Q)\\n    }\\n}\\n\\nQ.update_projections();\\n\\nQ.has_event = 0;\\n// check if there are any cards in #event, and then go to main if not.\\nvar scene = this.game.scenes['post_event.events_choice'];\\nvar choices = this._compileChoices(scene);\\nif (choices && choices[0].title != \\\"Continue...\\\") {\\n    Q.has_event = 1;\\n} else {\\n    has_event = 0;\\n}\\n// pre-load all of the event images\\nif (this.ui && this.ui.show_portraits) {\\n    for (var choice of choices) {\\n        var cc = this.game.scenes[choice.id];\\n        if (cc.faceImage) {\\n            var im = new Image();\\n            im.url = cc.faceImage;\\n        }\\n    }\\n}\\n\\nif (typeof window !== \\\"undefined\\\" && window.generateBar) {\\n}\"}],\"goTo\":[{\"id\":\"post_event.events_choice\",\"predicate\":{\"$code\":\"return ((Q['has_event'] || 0)===1);\"}},{\"id\":\"main\",\"predicate\":{\"$code\":\"return (((Q['has_event'] || 0)===0) && ((Q['difficulty'] || 0) >= 0));\"}},{\"id\":\"main.main_easy\",\"predicate\":{\"$code\":\"return (((Q['has_event'] || 0)===0) && ((Q['difficulty'] || 0) < 0));\"}}],\"content\":{\"content\":{\"type\":\"heading\",\"content\":[\"\",{\"type\":\"insert\",\"insert\":0},\" \",{\"type\":\"insert\",\"insert\":1}]},\"stateDependencies\":[{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['month'] || 0);\"},\"qdisplay\":\"month\"},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['year'] || 0);\"}}]}},\"violence\":{\"id\":\"violence\",\"type\":\"scene\",\"content\":{\"content\":\"(1) A car bomb attack (2) A public assassination with collaterol damage (3) A violent facility raid\",\"type\":\"paragraph\"}},\"return\":{\"id\":\"return\",\"type\":\"scene\",\"title\":\"Back to main\",\"goTo\":[{\"id\":\"root\"}],\"onArrival\":[{\"$code\":\"if (((Q['difficulty'] || 0) < 0) ) { Q['month_actions'] = (Q['month_actions'] || 0) - 1; }\"}],\"content\":{\"content\":\"\",\"type\":\"paragraph\"}},\"root.start_menu\":{\"id\":\"root.start_menu\",\"newPage\":true,\"goTo\":[{\"id\":\"root.start_menu_2\"}],\"content\":{\"type\":\"heading\",\"content\":\"Mikasa Democracy: A Future History\"}},\"set_next_election_time\":{\"id\":\"set_next_election_time\",\"type\":\"scene\",\"title\":\"next election time\",\"onArrival\":[{\"$code\":\"if (((Q['next_election_time'] || 0) >= ((Q['time'] || 0) + (Q['time_to_election'] || 0))) ) { Q['next_election_time'] = ((Q['time'] || 0) + (Q['time_to_election'] || 0)); } \\n if (((Q['next_election_time'] || 0) >= ((Q['time'] || 0) + (Q['time_to_election'] || 0))) ) { Q['next_election_month'] = ((Q['month'] || 0) + 3); } \\n if (((Q['next_election_time'] || 0) >= ((Q['time'] || 0) + (Q['time_to_election'] || 0))) ) { Q['next_election_year'] = (Q['year'] || 0); } \\n if (((Q['next_election_month'] || 0) > 12) ) { Q['next_election_year'] = (Q['next_election_year'] || 0) + 1; } \\n if (((Q['next_election_month'] || 0) > 12) ) { Q['next_election_month'] = (Q['next_election_month'] || 0) - 12; }\"}],\"content\":{\"content\":\"\",\"type\":\"paragraph\"}},\"status.politics\":{\"id\":\"status.politics\",\"content\":{\"content\":[{\"type\":\"heading\",\"content\":\"Public attitude towards outsiders\"},{\"type\":\"paragraph\",\"content\":[{\"type\":\"insert\",\"insert\":0},\" (\",{\"type\":\"insert\",\"insert\":1},\")\"]},{\"type\":\"heading\",\"content\":\"Intensity of anti-outsider movement\"},{\"type\":\"paragraph\",\"content\":[{\"type\":\"insert\",\"insert\":2},\" (\",{\"type\":\"insert\",\"insert\":3},\")\"]}],\"stateDependencies\":[{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['parochialism'] || 0);\"},\"qdisplay\":\"parochialism\"},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['parochialism'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['parochial_radicalism'] || 0);\"},\"qdisplay\":\"parochial_radicalism\"},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['parochial_radicalism'] || 0);\"}}]}},\"magic.control\":{\"id\":\"magic.control\",\"title\":\"Restrict magical practice\",\"onArrival\":[{\"$code\":\"Q['magic_control'] = (Q['magic_control'] || 0) + 1;\"}],\"content\":{\"content\":\"\",\"type\":\"paragraph\"}},\"callista.callista_toggle_on\":{\"id\":\"callista.callista_toggle_on\",\"title\":\"Purge Demons\",\"subtitle\":\"The corporate drones will resent us disrupting the systems they rely on\",\"viewIf\":{\"$code\":\"return ((Q['callista_toggle'] || 0)===0);\"},\"onArrival\":[{\"$code\":\"Q['callista_toggle'] = 1;\"}],\"options\":[{\"id\":\"@callista.callista_toggle_off\"},{\"id\":\"@return\"}],\"content\":{\"content\":\"Callista and her Guardian Spirit help make the internet a little less dead\",\"type\":\"paragraph\"}},\"jacobs.jacobs_renovate_on\":{\"id\":\"jacobs.jacobs_renovate_on\",\"title\":\"Streamline infrastructure\",\"subtitle\":\"More with less\",\"viewIf\":{\"$code\":\"return ((Q['jacobs_on'] || 0)===0);\"},\"onArrival\":[{\"$code\":\"Q['jacobs_on'] = 1;\"}],\"content\":{\"content\":\"Jacobs helps streamline our infrastructure maintenance keeping up with the demands of a rising population\",\"type\":\"paragraph\"}},\"sage.sage_toggle_on\":{\"id\":\"sage.sage_toggle_on\",\"title\":\"Cultivate magic users\",\"viewIf\":{\"$code\":\"return ((Q['sage_toggle'] || 0)===0);\"},\"subtitle\":\"The cooperatives find these vagrants distasteful\",\"onArrival\":[{\"$code\":\"Q['sage_toggle'] = 1;\"}],\"content\":{\"content\":\"\",\"type\":\"paragraph\"}},\"stacy.stacy_toggle_on\":{\"id\":\"stacy.stacy_toggle_on\",\"title\":\"Stir up unrest\",\"subtitle\":\"Great content\",\"viewIf\":{\"$code\":\"return ((Q['stacy_toggle'] || 0)===0);\"},\"onArrival\":[{\"$code\":\"Q['stacy_toggle'] = 1;\"}],\"options\":[{\"id\":\"@stacy.stacy_toggle_off\"},{\"id\":\"@return\"}],\"content\":{\"content\":\"Stacy stirs up passions with social media and questionable energy drinks\",\"type\":\"paragraph\"}},\"corp_conflict\":{\"id\":\"corp_conflict\",\"type\":\"scene\",\"title\":\"Corporate Violence\",\"newPage\":false,\"onArrival\":[{\"$code\":\"if (soylent_magrail_rel < 0) {\\n    district3_infra += soylent_magrail_rel/10;\\n    district4_infra += soylent_magrail_rel/10;\\n}\\n\\nif (soylent_brazos_rel < 0) {\\n    district3_infra += soylent_magrail_rel/10;\\n    district6_infra += soylent_magrail_rel/10;\\n}\\n\\nif (magrail_brazos_rel < 0) {\\n    district4_infra += soylent_magrail_rel/10;\\n    district6_infra += soylent_magrail_rel/10;\\n}\"}],\"content\":{\"content\":\"\",\"type\":\"paragraph\"}},\"security.defund\":{\"id\":\"security.defund\",\"title\":\"Purge the ranks\",\"subtitle\":\"are corrupt police worse then no police at all?\",\"chooseIf\":{\"$code\":\"return (((Q['police_defund'] || 0)===0) && ((Q['police_reform'] || 0) < 2));\"},\"onArrival\":[{\"$code\":\"Q['police_defund'] = 1;\"}],\"content\":{\"content\":[{\"type\":\"paragraph\",\"content\":\"Purging the ranks of the police is a drastic move but ironically one that neither the corporations or syndicates can interfere with. This frees up budget which could hopefully go towards making less corrupt institutions.\"},{\"type\":\"paragraph\",\"content\":[{\"type\":\"conditional\",\"content\":\"Hopefully our militia forces can prevent the streets decending into chaos \",\"predicate\":0},\"\"]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"conditional\",\"content\":\"We better have a plan to prevent anarchy in the streets \",\"predicate\":1},\"\"]}],\"stateDependencies\":[{\"type\":\"predicate\",\"fn\":{\"$code\":\"return ((Q['militia_police'] || 0)===1);\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return ((Q['militia_police'] || 0)===0);\"}}]}},\"shuffle_cabinet.shuffle\":{\"id\":\"shuffle_cabinet.shuffle\",\"onArrival\":[{\"$code\":\"Q['coalition_dissent'] = (Q['coalition_dissent'] || 0) + 1;\\nQ['month_actions'] = (Q['month_actions'] || 0) + 1;\"}],\"goTo\":[{\"id\":\"main\"}],\"content\":{\"content\":\"\",\"type\":\"paragraph\"}},\"shuffle_cabinet\":{\"id\":\"shuffle_cabinet\",\"type\":\"scene\",\"title\":\"Shuffle Cabinet\",\"newPage\":true,\"isCard\":true,\"tags\":[\"govt_affairs\",\"cabinet\"],\"onArrival\":[{\"$code\":\"Q['shuffle_cabinet_timer'] = 6;\"}],\"viewIf\":{\"$code\":\"return (((((((Q['spd_in_government'] || 0) == 1) && ((Q['shuffle_cabinet_timer'] || 0) == 0)) && (Q['chancellor_party'] == \\\"SPD\\\")) && (!(((Q['in_spd_majority'] || 0)) !== 0))) && (!(((Q['in_emergency_government'] || 0)) !== 0))) && (!(((Q['in_left_front'] || 0)) !== 0)));\"},\"cardImage\":\"img/muller_cabinet.jpg\",\"options\":[{\"id\":\"@shuffle_cabinet.shuffle\",\"title\":\"Yes, do it.\"},{\"id\":\"@root\",\"title\":\"No, there is no need.\"},{\"id\":\"@easy_discard\"},{\"id\":\"@cancel_advisor_action\"}],\"content\":{\"content\":[{\"type\":\"paragraph\",\"content\":\"Do we wish to shuffle our cabinet? This might upset our current coalition.\"},{\"type\":\"paragraph\",\"content\":\"Current cabinet:\"},{\"type\":\"paragraph\",\"content\":[\"Labor: \",{\"type\":\"insert\",\"insert\":0},\"\"]},{\"type\":\"paragraph\",\"content\":[\"Interior: \",{\"type\":\"insert\",\"insert\":1},\"\"]},{\"type\":\"paragraph\",\"content\":[\"Finance: \",{\"type\":\"insert\",\"insert\":2},\"\"]},{\"type\":\"paragraph\",\"content\":[\"Economic: \",{\"type\":\"insert\",\"insert\":3},\"\"]},{\"type\":\"paragraph\",\"content\":[\"Justice: \",{\"type\":\"insert\",\"insert\":4},\"\"]},{\"type\":\"paragraph\",\"content\":[\"Foreign: \",{\"type\":\"insert\",\"insert\":5},\"\"]},{\"type\":\"paragraph\",\"content\":[\"Reichswehr: \",{\"type\":\"insert\",\"insert\":6},\"\"]},{\"type\":\"paragraph\",\"content\":[\"Agriculture: \",{\"type\":\"insert\",\"insert\":7}]}],\"stateDependencies\":[{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['labor_minister_party'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['interior_minister_party'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['finance_minister_party'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['economic_minister_party'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['justice_minister_party'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['foreign_minister_party'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['reichswehr_minister_party'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['agriculture_minister_party'] || 0);\"}}]}},\"mss_dundalk_affair.justice_reform\":{\"id\":\"mss_dundalk_affair.justice_reform\",\"title\":\"Purge corruption from our legal system\",\"onArrival\":[{\"$code\":\"Q['budget'] = (Q['budget'] || 0) + 2;\\nQ['dundalk_reform'] = (Q['dundalk_reform'] || 0) + 1;\"}],\"content\":[{\"type\":\"paragraph\",\"content\":\"Attacking the corrupt judiciary is a safe course of action right now. The guilty parties resign and their replacements swiftly move to impound the Dundalk. At the impromptu celebrations afterwards people wonder if this might be the start of something more.\"},{\"type\":\"paragraph\",\"content\":\"We dont stir up any trouble but some wonder if we should have been more daring.\"}]},\"great_protector.just_say_no\":{\"id\":\"great_protector.just_say_no\",\"title\":\"We will have nothing to do with demons\",\"onArrival\":[],\"content\":{\"content\":{\"type\":\"paragraph\",\"content\":[\"The less we have to do with demons the better. \",{\"type\":\"conditional\",\"content\":\"Although it's troubling how in the dark we are about the Otherworld. \",\"predicate\":0},\"\"]},\"stateDependencies\":[{\"type\":\"predicate\",\"fn\":{\"$code\":\"return ((Q['otherworld_relations'] || 0)===0);\"}}]}},\"organize_phase_start\":{\"id\":\"organize_phase_start\",\"type\":\"scene\",\"title\":\"The political situation\",\"priority\":1,\"maxVisits\":1,\"tags\":[\"event\"],\"viewIf\":{\"$code\":\"return ((Q['year'] || 0) >= 2300);\"},\"onArrival\":[{\"$code\":\"Q['organizing_unlock'] = 1;\\nQ['phase'] = 1;\"}],\"goTo\":[{\"id\":\"organize_phase_tick\"}],\"content\":[{\"type\":\"paragraph\",\"content\":\"The city government in Mikasa only holds substantial power in one district: the Aurora district. The \\\"big 3\\\" corporations run their home districts as fiefs. The ganglands of the old mine district are run by the syndicates to the extent they are run at all. The wealth Docks are controlled by a patchwork of private security forces. And finally the isolationist Deepers are intent on keeping the government out of the Deeps.\"},{\"type\":\"paragraph\",\"content\":\"The Aurora district holds the old capital building from which the Aurora Bank used to run Mikasa before it's sudden disappearance. It's still nominally the government of the whole city but it's half abandoned due to both lack of funds and lack of need. If we want to bring real democracy to Mikasa, we need to find cultivate a power base.\"},{\"type\":\"paragraph\",\"content\":\"The local Aurora district council operates out of the same building and has elements of genuine democratic power.\"}],\"countVisitsMax\":1},\"migrations.problem\":{\"id\":\"migrations.problem\",\"title\":\"When it rains it pours.\",\"content\":{\"type\":\"paragraph\",\"content\":[\"The \",{\"type\":\"magic\",\"content\":\"<span class=\\\"tooltip-text\\\" style=\\\"color:rgba(18, 44, 4, 1);\\\" title=\\\"A greyish-green skinned sentient race from the otherworld. They are frequently refered to by the racial slur 'Orcs' due to their close association with the sorcerers of the otherworld and their Orci creations. To the limited extent that Otherworld biology has been scientifically studied, no link has been found between Uruks and Orci.\\\">Uruks</span>\"},\" are just one of countless cultures teeming in the depths of Mikasa. Unlike most of the other's they tend to be illiterate and completely unfamiliar with modern technology. While it would be humane to help them, they aren't a priority\"]}},\"militia_degrade.decline\":{\"id\":\"militia_degrade.decline\",\"title\":\"The ranks are shrinking\",\"onArrival\":[{\"$code\":\"Q['militia'] = (Q['militia'] || 0) * (2 / 3);\"}],\"content\":{\"content\":\"Damn\",\"type\":\"paragraph\"}},\"great_protector_dispute.silence\":{\"id\":\"great_protector_dispute.silence\",\"title\":\"Promise to do something\",\"onArrival\":[{\"$code\":\"Q['great_protector_appeasement'] = (Q['great_protector_appeasement'] || 0) + 1;\"}],\"content\":{\"content\":\"We issue orders for our otherworld outpost to avoid alienating our neighbors with talk of democracy and freedom\",\"type\":\"paragraph\"}},\"organize_phase_tick\":{\"id\":\"organize_phase_tick\",\"type\":\"scene\",\"title\":\"Setup organizing tick functions\",\"maxVisits\":1,\"newPage\":false,\"onArrival\":[{\"$code\":\"Q.trade_level = 1.123\\nQ.corp_money = 5000\\nQ.corp_capital = 50000\\nQ.drone_money = 2000\\nQ.affluent_money = 500\\nQ.poor_money = 1000\\nQ.coop_money = 1500\\nQ.coop_capital = 10000\\n\\n// might want to put some spending inertia into this system later on\\n\\n\\nfunction organize_tick(){\\n    Q.protest_good += Q.non_violence -1.5 // hurt corp popularity with all every time it reaches 10\\n    Q.protest_bad += 2.25 - Q.non_violence // corp gain popularity with drones and affluent and lose with poor every time it reaches 10\\n}\\n\\nfunction trade_level_tick(){\\n    if (Q.phase == 1) { Q.trade_level *= 1.0016667 }\\n    if (Q.phase == 2) { Q.trade_level *= 0.9994444 }\\n    if (Q.phase == 3) { Q.trade_level *= 0.9983333 }\\n    if (Q.phase == 4) { Q.trade_level *= 0.9994444 }\\n\\n}\\n\\n// Tourism would also cover high end bespoke services like ship detailing\\nfunction tourism_revenue() {\\n    Q.overall_tourism = 2345 * Q.trade_level / (Q.crime_level * Q.crime_level)\\n\\n    Q.corp_tourism_rev = Q.overall_tourism * .41 + Q.overall_tourism * Q.trade_level\\n    Q.affluent_tourism_rev = Q.overall_tourism * .39 - Q.overall_tourism * Q.trade_level\\n    Q.coop_tourism_rev =  (Q.overall_tourism - Q.corp_tourism - Q.affluent_tourism)*.43\\n    Q.poor_tourism_rev =  (Q.overall_tourism - Q.corp_tourism - Q.affluent_tourism)*.57\\n}\\n\\nfunction longshore_revenue() {\\n    Q.overall_longshore = 2678 * Q.trade_level / (Q.crime_level * Q.crime_level)\\n\\n    Q.coop_longshore_rev = Q.overall_longshore * .38 - Q.overall_longshore * Q.trade_level\\n    Q.affluent_longshore_rev = Q.overall_longshore * .41 - Q.overall_longshore * Q.trade_level\\n    Q.corp_longshore_rev =  (Q.overall_longshore - Q.corp_longshore - Q.affluent_longshore)*.31\\n    Q.poor_longshore_rev =  (Q.overall_longshore - Q.corp_longshore - Q.affluent_longshore)*.33\\n    Q.drone_longshore_rev =  (Q.overall_longshore - Q.corp_longshore - Q.affluent_longshore)*.36\\n}\\n\\n// would be nice if there was a way to make drones shift to buying local as they get more independent minded\\nfunction corp_purchase(){\\n    corp_spend = Q.corp_money / 84\\n    Q.corp_local_spend = corp_spend / Q.trade_level * .2\\n    drone_spend = Q.drone_money * 0.60\\n    Q.drone_local_spend = drone_spend / Q.trade_level * .4\\n\\n    Q.corp_capital_change = Q.corp_capital*.01 + (corp_spend *0.8 * Math.sqrt(Q.trade_level))\\n\\n    Q.corp_capital_revenue = corp_capital / 240\\n}\\n\\nfunction coop_purchase(){\\n    coop_spend = Q.coop_money / 36\\n    Q.coop_spend\\n\\n}\\n\\n\\nfunction economy_tick(){\\n    trade_level()\\n    corp_purchase()\\n\\n\\n}\\n\\nfunction monthly_tick_phase1() {\\n    organize_tick()\\n    trade_level_tick()\\n    econmy_tick()\\n}\\n\\nQ.monthly_tick_phase1 = monthly_tick_phase1\"}],\"content\":{\"content\":\"\",\"type\":\"paragraph\"},\"countVisitsMax\":1},\"orc_marriage1\":{\"id\":\"orc_marriage1\",\"type\":\"scene\",\"title\":\"Amira-Sponsa vs Mikasa\",\"priority\":1,\"maxVisits\":1,\"tags\":[\"event\"],\"newPage\":true,\"viewIf\":{\"$code\":\"return (((Q['month'] || 0)===10) && ((Q['year'] || 0)===2301));\"},\"content\":[{\"type\":\"paragraph\",\"content\":[\"The appeals court surprised the marriage equality movement today by deciding in favor of the plaintiffs in Amira vs Mikasa. The issue at stake was the recognition of civil unions between humans and non humans imigrants from the Otherworld. Mikasa's legal codes do not make provision for marriage with non-human sentients or even civil unions despite the trend throughout the solar system to permit such marriages. The plaintiffs (\",{\"type\":\"magic\",\"content\":\"<span class=\\\"tooltip-text\\\" style=\\\"color:rgb(243, 105, 229);\\\" title=\\\"A data scientist from the Tidewater Reclaimation Zone on Earth.\\\">Menthe Amira</span>\"},\" and \",{\"type\":\"magic\",\"content\":\"<span class=\\\"tooltip-text\\\" style=\\\"color:rgb(243, 105, 229);\\\" title=\\\"An orcish immigrant from the Caelums Exile, a town in the otherworld.\\\">Dura Sponsa</span>\"},\") were legally married on Earth before immigrating to Mikasa and sued the city for the right to have their marriage acknowledged. The appeals court of Mikasa is generally viewed as deeply reactionary but apparently the corporations did not want the bad publicity of denying their petition.\"]},{\"type\":\"paragraph\",\"content\":\"The Amira-Sponsa marriage has been legally recognized and the court has ordered the city legislature to update the laws to allow such unions.\"},{\"type\":\"paragraph\",\"content\":\"The appeals court obeys their corporate masters.\"}],\"countVisitsMax\":1},\"orc_marriage2.civil_unions_minimum\":{\"id\":\"orc_marriage2.civil_unions_minimum\",\"onArrival\":[{\"$code\":\"Q['orc_marriage_minimum'] = 1;\"}],\"options\":[{\"id\":\"@orc_marriage2.what_did_I_do\",\"title\":\"The F**** did we do?\"}],\"content\":[{\"type\":\"paragraph\",\"content\":\"Neither advocates or opponents of the Otherworlder rights seem to credit or resent us for introducing the bill, they just think we were obeying the courts by doing what the advocates call \\\"the bare minimum\\\". However the corporate and syndicate factions wont even accept the bare minimum, they overhwlemingly ignore the court order and vote against the bill. The megacorps aren't happy about this outcome and a Brazos Zaibatsu spokesperson even has the audacity to claim \\\"Brazos Zaibatsu strongly condemns the vote against this bill but at least this incident shows that there is no truth to the claim that the Mikasa legislative assembly is a rubber stamp for corporate interests.\\\"\"},{\"type\":\"paragraph\",\"content\":\"For what it's worth the voters seem to mostly blame the legislators who voted against the bill although the corporations somehow blame us for the failure. Neither of them care very much though.\"}]},\"september_convention.explain\":{\"id\":\"september_convention.explain\",\"options\":[{\"id\":\"@september_convention.ban\",\"title\":\"I dont know what the hell these people are doing but it can't be good\"},{\"id\":\"@september_convention.permit\",\"title\":\"Allow it! Dont falsely accuse this autodictat of autodictatism!\"}],\"content\":{\"type\":\"paragraph\",\"content\":[{\"type\":\"magic\",\"content\":\"<span class=\\\"tooltip-text\\\" style=\\\"color:rgb(243, 105, 229);\\\" title=\\\"A autodidact polymath who is a leading expert in non-binary Aretical structures. She is also the heir to the senior branch of the ancient Lunar family (distinct from the neo-Novo-Luno branch), leading shareholders of the March Corporation.\\\">September Novo-Luna</span>\"},\" is trying to organize a convention on the 10th to discuss the \",{\"type\":\"magic\",\"content\":\"<span class=\\\"tooltip-text\\\" style=\\\"color:rgb(105, 173, 78);\\\" title=\\\"An academic theory that Jovian culture became averse to cultural elements that they believed were related to earth but in fact orginated within the moons of Jupiter. This was first proposed by MIT scholar Dr. Atticus Siloh at the Aretical conference of Terrestrial studies held at Shiloh University.\\\">Jovian autodictation hypothesis</span>\"},\". This timing would be just before \",{\"type\":\"magic\",\"content\":\"<span class=\\\"tooltip-text\\\" style=\\\"color:rgb(62, 34, 203);\\\" title=\\\"The 17 year old great-granddaughter and sole surviving scion of Reginald Young. This makes her the sole surviving member of the junior ('distaff') branch of the Older Order, those descended from 21st century author Malka Older who wrote speculative fiction describing a hypothetical 23rd century society.\\\">Regina Old</span>\"},\"'s eulogy at the penultimate day of observance for \",{\"type\":\"magic\",\"content\":\"<span class=\\\"tooltip-text\\\" style=\\\"color:rgb(137, 137, 48);\\\" title=\\\"A deceased late night news host who is the great-grandson of Malka Older, a 21st century speculative fiction author. He served as President of the Juvenal Older an office primarily concerned with giving a satirical eulogy before the Biannual Reception held every year in honor of Sayyed Biannual.\\\">Reginald Young</span>\"},\". The Young cremation is scheduled three days after the \",{\"type\":\"magic\",\"content\":\"<span class=\\\"tooltip-text\\\" style=\\\"color:rgb(82, 241, 255);\\\" title=\\\"a ritual sheering of a sheep, inspired by purification rituals from antiquity.\\\">lustrum</span>\"},\" of the \",{\"type\":\"magic\",\"content\":\"<span class=\\\"tooltip-text\\\" style=\\\"color:rgb(123, 243, 105);\\\" title=\\\"A philanthropic organization formed around the recreation of festivals from early human history, named after the traditional practice of the Lustrum which tradition used to anachronistically believe was held on the first day of the Severian Calender every five years but which is now typically practiced around midwinter of every four synods of a modern lunar calender of Shackleton City.\\\">March Corporation</span>\"},\". This confluence of academic events would mean that if \",{\"type\":\"magic\",\"content\":\"<span class=\\\"tooltip-text\\\" style=\\\"color:rgb(243, 105, 229);\\\" title=\\\"A autodidact polymath who is a leading expert in non-binary Aretical structures. She is also the heir to the senior branch of the ancient Lunar family (distinct from the neo-Novo-Luno branch), leading shareholders of the March Corporation.\\\">September Novo-Luna</span>\"},\"'s convention was organized this would likely be the largest gathering of \",{\"type\":\"magic\",\"content\":\"<span class=\\\"tooltip-text\\\" style=\\\"color:rgb(255, 63, 63);\\\" title=\\\"The martian academic movement to study the way that native born residents of the Jovian moons attributed greater significance to cultural touchstones believed to come from earth compared to relatively low importance that first generation immigrants from earth gave those cultural touchstones.\\\">Terrestrial</span>\"},\" academics since the settling of Mikasa \",{\"type\":\"magic\",\"content\":\"<span class=\\\"tooltip-text\\\" style=\\\"color:rgb(28, 72, 32);\\\" title=\\\"Swahili word meaning tragedy in English.\\\">Mikasa</span>\"},\" and the largest academic conference since the \",{\"type\":\"magic\",\"content\":\"<span class=\\\"tooltip-text\\\" style=\\\"color:rgb(28, 72, 32);\\\" title=\\\" A corporation that mysterious stopped all operations a decade ago. It's reclusive owners were all made persona non gratia in Mikasa.\\\">Aurora Bank</span>\"},\" went defunct. The \",{\"type\":\"magic\",\"content\":\"<span class=\\\"tooltip-text\\\" style=\\\"color:rgb(65, 92, 67);\\\" title=\\\"Those with the wealth to qualify for full corporate citizenship in Mikasa, originally refering to those owning shares in Aurora Bank.\\\">shareholders</span>\"},\" are worried about this gathering, claiming it is too many potential \",{\"type\":\"magic\",\"content\":\"<span class=\\\"tooltip-text\\\" style=\\\"color:rgb(98, 0, 0);\\\" title=\\\"An anticorporate movement in the mid 22nd century, often referred to as an anticorporate bogeyman.\\\">stakeholders</span>\"},\" in one place. The \",{\"type\":\"magic\",\"content\":\"<span class=\\\"tooltip-text\\\" style=\\\"color:rgb(243, 105, 229);\\\" title=\\\"Title for the spokesperson of the March Corporation.\\\">November</span>\"},\" has made a statement saying that \",{\"type\":\"magic\",\"content\":\"<span class=\\\"tooltip-text\\\" style=\\\"color:rgb(243, 105, 229);\\\" title=\\\"A autodidact polymath who is a leading expert in non-binary Aretical structures. She is also the heir to the senior branch of the Luno family, leading shareholders of the March Corporation.\\\">September Novo-Luna</span>\"},\"'s convention will not permit any discussion of \",{\"type\":\"magic\",\"content\":\"<span class=\\\"tooltip-text\\\" style=\\\"color:rgb(112, 0, 0);\\\" title=\\\"The practice of non compliance with corporations, named after an early 22nd century homeschooling movement that was a precursor to the shareholders.\\\">autodidactism</span>\"},\" at the convention. They say such fears are ironically just an example of the very autodictation they study and shows the need to expand dialogue with the \",{\"type\":\"magic\",\"content\":\"<span class=\\\"tooltip-text\\\" style=\\\"color:rgb(47, 167, 248);\\\" title=\\\"A society of acedemics whose name is a tongue in cheek reference to a printing error in the early posters from the Guianease organization first advertizing to Hisphanophone students from Quebec when forming their first chapters at the College of New Caledonia in the USNW reconstruction zone (formerly British Columbia). They study the influence of ancient (21st century) speculative fiction depicting future (now contemporary) settlement of extraterrestrial worlds.\\\">Juvenal Older</span>\"},\" in order to further \",{\"type\":\"magic\",\"content\":\"<span class=\\\"tooltip-text\\\" style=\\\"color:rgb(51, 180, 255);\\\" title=\\\"The martian academic movement to study the way that native born residents of the Jovian moons attributed greater significance to cultural touchstones believed to come from Earth compared to relatively low importance that first generation immigrants from Earth gave those cultural touchstones.\\\">Terrestrial</span>\"},\" studies for the benefit of the \",{\"type\":\"magic\",\"content\":\"<span class=\\\"tooltip-text\\\" style=\\\"color:rgb(225, 117, 209);\\\" title=\\\"Concerned with the coevolution of non-terrestrial culture as distinct from their coevolution with Earth.\\\">non-binary academic community</span>\"},\" of \",{\"type\":\"magic\",\"content\":\"<span class=\\\"tooltip-text\\\" style=\\\"color:rgb(0, 147, 12);\\\" title=\\\"Japanese word meaning beauty in English.\\\">Mikasa</span>\"},\".\"]}},\"syndicate_infighting\":{\"id\":\"syndicate_infighting\",\"type\":\"scene\",\"title\":\"Syndicate violence\",\"subtitle\":\"Gang wars cause mayhem\",\"onArrival\":[{\"$code\":\"Q.second_wave_prosperity -= 1;\"}],\"tags\":[\"event\"],\"viewIf\":{\"$code\":\"return ((((Q['month'] || 0) == 6)) && (((Q['year'] || 0) == 2300)));\"},\"priority\":1,\"maxVisits\":1,\"content\":{\"content\":\"Gang violence has flared up, in particular hitting the second wave refugee communities hard.\",\"type\":\"paragraph\"},\"countVisitsMax\":1},\"cable_break.full_peace\":{\"id\":\"cable_break.full_peace\",\"title\":\"Create a DMZ in space and inside Mikasa\",\"subtitle\":\"The megacorps might limit themselves to deniable operations for a while\",\"content\":{\"content\":\"Even if the megacorps were willing to stop this conflict, they have too many hardline splinter groups and organized crime proxies for the conflict to stop completely. But they are willing to keep their distances in space and cease overt operations in each other's districts. The violence in the Vats and Railyard districts has abatted and the two megacorps are grateful. However violence has only worsened in the Pits and Brazos Zaibatsu is disappointed.\",\"type\":\"paragraph\"}},\"refugees_earth.damn\":{\"id\":\"refugees_earth.damn\",\"title\":\"First the Jovians now Terrestrials?\",\"content\":{\"content\":\"\",\"type\":\"paragraph\"}},\"refugees_earth\":{\"id\":\"refugees_earth\",\"type\":\"scene\",\"title\":\"Microkipple Crisis\",\"subtitle\":\"Earth in trouble\",\"priority\":5,\"maxVisits\":1,\"tags\":[\"event\"],\"viewIf\":{\"$code\":\"return (((Q['month'] || 0)===3) && ((Q['year'] || 0)===2300));\"},\"options\":[{\"id\":\"@refugees_earth.damn\"}],\"content\":[{\"type\":\"paragraph\",\"content\":\"The mysterious kipple accumulation on earth has been ongoing for centuries, growing worse over time. Neither scientists nor sages can explain why the every solution to the kipple keeps \\\"mutating\\\" as if deliberately trying to sabotage efforts to contain it. Nor is it understood why the kipple stays on earth and doesn't propogate elsewhere.\"},{\"type\":\"paragraph\",\"content\":\"Now the kipple has taken a turn for the worse. Terrestrial cities are being inuandated by \\\"microkipple\\\" which has been linked to a host of medical complications. The flow of terrestrial refugees is skyrocketing upwards. Although Mikasa is currently far from earth, they are fleeing towards every corner of the solar system.\"}],\"countVisitsMax\":1},\"refugees_otherworld.okay\":{\"id\":\"refugees_otherworld.okay\",\"title\":\"When it rains it pours.\",\"content\":{\"content\":\"\",\"type\":\"paragraph\"}},\"refugees_titan.help\":{\"id\":\"refugees_titan.help\",\"title\":\"We need to prepare to recieve these refugees\",\"onArrival\":[{\"$code\":\"Q['jovian_refugee_prepare'] = (Q['jovian_refugee_prepare'] || 0) + 1;\"}],\"content\":{\"content\":\"Opinions on the efforts to help the refugees are mixed. Mikasa's inadequate and aged infrastructure already struggles to provide for the existing population. On the other hand the city thinks of itself as a city of immigrants so some applaud the effort.\",\"type\":\"paragraph\"}},\"advance\":{\"id\":\"advance\",\"type\":\"scene\",\"title\":\"Advance a month\",\"newPage\":true,\"isCard\":true,\"isPinnedCard\":true,\"cardImage\":\"img/solar_system.png\",\"onArrival\":[{\"$code\":\"Q.month += 1; if (Q.month>12){ Q.year += 1; Q.month -=12;}\"}],\"goTo\":[{\"id\":\"post_event.events_choice\"}],\"content\":{\"content\":\"\",\"type\":\"paragraph\"}},\"peer_media.labor\":{\"id\":\"peer_media.labor\",\"title\":\"Abusive working conditions and the need for worker protections\",\"subtitle\":\"Popular among the poor and pisses off nobody but the megacorps\",\"onArrival\":[{\"$code\":\"Q['anti_corp_media'] = (Q['anti_corp_media'] || 0) + 1;\"}],\"content\":{\"content\":\"Populist rhetoric is an easy way to get people wanting change. The Stakeholder revolt might have been crushed but plenty of people are stakeholders in everything but name.\",\"type\":\"paragraph\"}},\"activist_training.nonviolence\":{\"id\":\"activist_training.nonviolence\",\"title\":\"Train disciplined activists for non-violent demostrations\",\"chooseIf\":{\"$code\":\"return ((Q['non_violence'] || 0) < 3);\"},\"unavailableSubtitle\":\"We already have a well trained vanguard\",\"onArrival\":[{\"$code\":\"Q['non_violence'] = (Q['non_violence'] || 0) + 1;\"}],\"content\":{\"content\":[{\"type\":\"paragraph\",\"content\":\"Non-violent discipline requires the utmost discipline to resist provocation and win the media war. We are training a vanguard of activists for this difficult course of action.\"},{\"type\":\"paragraph\",\"content\":[{\"type\":\"conditional\",\"content\":\"We are spreading knownledge of non-violent personal protection techniques and our activists can keep recording despite corporate suppression efforts \",\"predicate\":0},\"\"]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"conditional\",\"content\":\"Our activists are prepared for non-violent resistance and first -aid procedures \",\"predicate\":1},\"\"]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"conditional\",\"content\":\"Our activists are disciplined and committed, the corporations wont be able to portray them as the instigators of violence \",\"predicate\":2},\"\"]}],\"stateDependencies\":[{\"type\":\"predicate\",\"fn\":{\"$code\":\"return ((Q['non_violence'] || 0) == 1);\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return ((Q['non_violence'] || 0) == 2);\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return ((Q['non_violence'] || 0) == 3);\"}}]}},\"contracting.outside_corporations\":{\"id\":\"contracting.outside_corporations\",\"title\":\"Outside corporation suppliers\",\"onArrival\":[{\"$code\":\"Q['contract_outside'] = (Q['contract_outside'] || 0) + 1;\"}],\"content\":{\"content\":\"\",\"type\":\"paragraph\"}},\"coop_economy.markets\":{\"id\":\"coop_economy.markets\",\"title\":\"Interclan markets\",\"onArrival\":[{\"$code\":\"Q['coop_markets'] = (Q['coop_markets'] || 0) + 1;\"}],\"content\":{\"content\":\"\",\"type\":\"paragraph\"}},\"education.vocational\":{\"id\":\"education.vocational\",\"title\":\"Focus on vocational training to reduce poverty\",\"chooseIf\":{\"$code\":\"return ((1) !== 0);\"},\"onArrival\":[{\"$code\":\"Q['vocational_track'] = (Q['vocational_track'] || 0) + 1;\"}],\"content\":{\"content\":\"Improving vocational training helps workers get better jobs, in particular with the corporations. School attendence has risen somewhat as students are attracted by the prospect of higher incomes. The megacorps approve of this curriculum and agree to contract some of their internal training programs over to our education system which allows us to offset the costs of this expansion.\",\"type\":\"paragraph\"}},\"election_simulation.show_results\":{\"id\":\"election_simulation.show_results\",\"content\":{\"content\":[{\"type\":\"paragraph\",\"content\":\"The results are based on executive (oligarchic), functional (professional) and geographic (democratic) constituencies.\"},{\"type\":\"paragraph\",\"content\":[\"Due to the multitudinous and ever shifting parties, they are considered a poor measure of political outcomes. Instead the results are tabulated according to politicians who favor or in the pocket of the Mega\",{\"type\":\"magic\",\"content\":\"<span style=\\\"color: #44b88f;\\\">C</span>\"},\"orporations, the organized crime \",{\"type\":\"magic\",\"content\":\"<span style=\\\"color: #cf6e19;\\\">G</span>\"},\"angs, \",{\"type\":\"magic\",\"content\":\"<span style=\\\"color: #1100cc;\\\">D</span>\"},\"emocrats, xenopobic \",{\"type\":\"magic\",\"content\":\"<span style=\\\"color: #3a0000ff;\\\">H</span>\"},\"ate groups or \",{\"type\":\"magic\",\"content\":\"<span style=\\\"color: #404040;\\\">I</span>\"},\"ndependents such as the Deepers. \",{\"type\":\"emphasis-2\",\"content\":\"Election results:\"},\"\"]},{\"type\":\"paragraph\",\"content\":\"Executive Committee:\"},{\"type\":\"paragraph\",\"content\":[\"\",{\"type\":\"magic\",\"content\":\"<span style=\\\"color: #44b88f;\\\">C</span>\"},\": \",{\"type\":\"insert\",\"insert\":0},\"  \",{\"type\":\"magic\",\"content\":\"<span style=\\\"color: #cf6e19;\\\">G</span>\"},\": \",{\"type\":\"insert\",\"insert\":1},\"  \",{\"type\":\"magic\",\"content\":\"<span style=\\\"color: #1100cc;\\\">D</span>\"},\": \",{\"type\":\"insert\",\"insert\":2},\"  \",{\"type\":\"magic\",\"content\":\"<span style=\\\"color: #3a0000ff;\\\">H</span>\"},\": \",{\"type\":\"insert\",\"insert\":3},\"  \",{\"type\":\"magic\",\"content\":\"<span style=\\\"color: #404040;\\\">I</span>\"},\": \",{\"type\":\"insert\",\"insert\":4},\"\"]},{\"type\":\"paragraph\",\"content\":\"Guilds:\"},{\"type\":\"paragraph\",\"content\":[\"Gold Collar: \",{\"type\":\"magic\",\"content\":\"<span style=\\\"color: #44b88f;\\\">C</span>\"},\":\",{\"type\":\"insert\",\"insert\":5},\" \",{\"type\":\"magic\",\"content\":\"<span style=\\\"color: #cf6e19;\\\">G</span>\"},\":\",{\"type\":\"insert\",\"insert\":6},\" \",{\"type\":\"magic\",\"content\":\"<span style=\\\"color: #1100cc;\\\">D</span>\"},\":\",{\"type\":\"insert\",\"insert\":7},\" \",{\"type\":\"magic\",\"content\":\"<span style=\\\"color: #3a0000ff;\\\">H</span>\"},\":\",{\"type\":\"insert\",\"insert\":8},\" \",{\"type\":\"magic\",\"content\":\"<span style=\\\"color: #404040;\\\">I</span>\"},\":\",{\"type\":\"insert\",\"insert\":9},\"\"]},{\"type\":\"paragraph\",\"content\":[\"White Collar: \",{\"type\":\"magic\",\"content\":\"<span style=\\\"color: #44b88f;\\\">C</span>\"},\":\",{\"type\":\"insert\",\"insert\":10},\" \",{\"type\":\"magic\",\"content\":\"<span style=\\\"color: #cf6e19;\\\">G</span>\"},\":\",{\"type\":\"insert\",\"insert\":11},\" \",{\"type\":\"magic\",\"content\":\"<span style=\\\"color: #1100cc;\\\">D</span>\"},\":\",{\"type\":\"insert\",\"insert\":12},\" \",{\"type\":\"magic\",\"content\":\"<span style=\\\"color: #3a0000ff;\\\">H</span>\"},\":\",{\"type\":\"insert\",\"insert\":13},\" \",{\"type\":\"magic\",\"content\":\"<span style=\\\"color: #404040;\\\">I</span>\"},\":\",{\"type\":\"insert\",\"insert\":14},\"\"]},{\"type\":\"paragraph\",\"content\":[\"Blue Collar: \",{\"type\":\"magic\",\"content\":\"<span style=\\\"color: #44b88f;\\\">C</span>\"},\":\",{\"type\":\"insert\",\"insert\":15},\" \",{\"type\":\"magic\",\"content\":\"<span style=\\\"color: #cf6e19;\\\">G</span>\"},\":\",{\"type\":\"insert\",\"insert\":16},\" \",{\"type\":\"magic\",\"content\":\"<span style=\\\"color: #1100cc;\\\">D</span>\"},\":\",{\"type\":\"insert\",\"insert\":17},\" \",{\"type\":\"magic\",\"content\":\"<span style=\\\"color: #3a0000ff;\\\">H</span>\"},\":\",{\"type\":\"insert\",\"insert\":18},\" \",{\"type\":\"magic\",\"content\":\"<span style=\\\"color: #404040;\\\">I</span>\"},\":\",{\"type\":\"insert\",\"insert\":19},\"\"]},{\"type\":\"paragraph\",\"content\":\"Districts:\"},{\"type\":\"paragraph\",\"content\":[\"Populations (in 10,000s): \",{\"type\":\"magic\",\"content\":\"<table>\"},\" \",{\"type\":\"magic\",\"content\":\"<tr><td>Class</td><td>Docks</td><td>Aurora</td><td>Vats</td><td>Railyard</td><td>Pitts</td><td>Limelight</td><td>Deeps</td></tr>\"},\" \",{\"type\":\"magic\",\"content\":\"<tr><td>\"},\"Rich\",{\"type\":\"magic\",\"content\":\"</td><td>\"},\" \",{\"type\":\"insert\",\"insert\":20},{\"type\":\"magic\",\"content\":\"</td><td>\"},{\"type\":\"insert\",\"insert\":21},{\"type\":\"magic\",\"content\":\"</td><td>\"},{\"type\":\"insert\",\"insert\":22},{\"type\":\"magic\",\"content\":\"</td><td>\"},{\"type\":\"insert\",\"insert\":23},{\"type\":\"magic\",\"content\":\"</td><td>\"},{\"type\":\"insert\",\"insert\":24},{\"type\":\"magic\",\"content\":\"</td><td>\"},{\"type\":\"insert\",\"insert\":25},{\"type\":\"magic\",\"content\":\"</td><td>\"},{\"type\":\"insert\",\"insert\":26},{\"type\":\"magic\",\"content\":\"</td></tr>\"},\"\"]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"magic\",\"content\":\"<tr><td>\"},\"First\",{\"type\":\"magic\",\"content\":\"</td><td>\"},\" \",{\"type\":\"insert\",\"insert\":27},{\"type\":\"magic\",\"content\":\"</td><td>\"},{\"type\":\"insert\",\"insert\":28},{\"type\":\"magic\",\"content\":\"</td><td>\"},{\"type\":\"insert\",\"insert\":29},{\"type\":\"magic\",\"content\":\"</td><td>\"},{\"type\":\"insert\",\"insert\":30},{\"type\":\"magic\",\"content\":\"</td><td>\"},{\"type\":\"insert\",\"insert\":31},{\"type\":\"magic\",\"content\":\"</td><td>\"},{\"type\":\"insert\",\"insert\":32},{\"type\":\"magic\",\"content\":\"</td><td>\"},{\"type\":\"insert\",\"insert\":33},{\"type\":\"magic\",\"content\":\"</td></tr>\"},\"\"]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"magic\",\"content\":\"<tr><td>\"},\"Second\",{\"type\":\"magic\",\"content\":\"</td><td>\"},\" \",{\"type\":\"insert\",\"insert\":34},{\"type\":\"magic\",\"content\":\"</td><td>\"},{\"type\":\"insert\",\"insert\":35},{\"type\":\"magic\",\"content\":\"</td><td>\"},{\"type\":\"insert\",\"insert\":36},{\"type\":\"magic\",\"content\":\"</td><td>\"},{\"type\":\"insert\",\"insert\":37},{\"type\":\"magic\",\"content\":\"</td><td>\"},{\"type\":\"insert\",\"insert\":38},{\"type\":\"magic\",\"content\":\"</td><td>\"},{\"type\":\"insert\",\"insert\":39},{\"type\":\"magic\",\"content\":\"</td><td>\"},{\"type\":\"insert\",\"insert\":40},{\"type\":\"magic\",\"content\":\"</td></tr>\"},\"\"]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"magic\",\"content\":\"<tr><td>\"},\"Deepers\",{\"type\":\"magic\",\"content\":\"</td><td>\"},\" \",{\"type\":\"insert\",\"insert\":41},{\"type\":\"magic\",\"content\":\"</td><td>\"},{\"type\":\"insert\",\"insert\":42},{\"type\":\"magic\",\"content\":\"</td><td>\"},{\"type\":\"insert\",\"insert\":43},{\"type\":\"magic\",\"content\":\"</td><td>\"},{\"type\":\"insert\",\"insert\":44},{\"type\":\"magic\",\"content\":\"</td><td>\"},{\"type\":\"insert\",\"insert\":45},{\"type\":\"magic\",\"content\":\"</td><td>\"},{\"type\":\"insert\",\"insert\":46},{\"type\":\"magic\",\"content\":\"</td><td>\"},{\"type\":\"insert\",\"insert\":47},{\"type\":\"magic\",\"content\":\"</td></tr>\"},\"\"]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"magic\",\"content\":\"<tr><td>\"},\"Clans\",{\"type\":\"magic\",\"content\":\"</td><td>\"},\" \",{\"type\":\"insert\",\"insert\":48},{\"type\":\"magic\",\"content\":\"</td><td>\"},{\"type\":\"insert\",\"insert\":49},{\"type\":\"magic\",\"content\":\"</td><td>\"},{\"type\":\"insert\",\"insert\":50},{\"type\":\"magic\",\"content\":\"</td><td>\"},{\"type\":\"insert\",\"insert\":51},{\"type\":\"magic\",\"content\":\"</td><td>\"},{\"type\":\"insert\",\"insert\":52},{\"type\":\"magic\",\"content\":\"</td><td>\"},{\"type\":\"insert\",\"insert\":53},{\"type\":\"magic\",\"content\":\"</td><td>\"},{\"type\":\"insert\",\"insert\":54},{\"type\":\"magic\",\"content\":\"</td></tr>\"},\"\"]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"magic\",\"content\":\"<tr><td>\"},\"Corp Drone\",{\"type\":\"magic\",\"content\":\"</td><td>\"},\" \",{\"type\":\"insert\",\"insert\":55},{\"type\":\"magic\",\"content\":\"</td><td>\"},{\"type\":\"insert\",\"insert\":56},{\"type\":\"magic\",\"content\":\"</td><td>\"},{\"type\":\"insert\",\"insert\":57},{\"type\":\"magic\",\"content\":\"</td><td>\"},{\"type\":\"insert\",\"insert\":58},{\"type\":\"magic\",\"content\":\"</td><td>\"},{\"type\":\"insert\",\"insert\":59},{\"type\":\"magic\",\"content\":\"</td><td>\"},{\"type\":\"insert\",\"insert\":60},{\"type\":\"magic\",\"content\":\"</td><td>\"},{\"type\":\"insert\",\"insert\":61},{\"type\":\"magic\",\"content\":\"</td></tr>\"},\"\"]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"magic\",\"content\":\"<tr><td>\"},\"Otherworlder\",{\"type\":\"magic\",\"content\":\"</td><td>\"},\" \",{\"type\":\"insert\",\"insert\":62},{\"type\":\"magic\",\"content\":\"</td><td>\"},{\"type\":\"insert\",\"insert\":63},{\"type\":\"magic\",\"content\":\"</td><td>\"},{\"type\":\"insert\",\"insert\":64},{\"type\":\"magic\",\"content\":\"</td><td>\"},{\"type\":\"insert\",\"insert\":65},{\"type\":\"magic\",\"content\":\"</td><td>\"},{\"type\":\"insert\",\"insert\":66},{\"type\":\"magic\",\"content\":\"</td><td>\"},{\"type\":\"insert\",\"insert\":67},{\"type\":\"magic\",\"content\":\"</td><td>\"},{\"type\":\"insert\",\"insert\":68},{\"type\":\"magic\",\"content\":\"</td></tr>\"},\"\"]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"magic\",\"content\":\"</table>\"},\"\"]},{\"type\":\"paragraph\",\"content\":\"District 1 (The Docks)\"},{\"type\":\"paragraph\",\"content\":[\"\",{\"type\":\"magic\",\"content\":\"<span style=\\\"color: #44b88f;\\\">C</span>\"},\":\",{\"type\":\"insert\",\"insert\":69},\" \",{\"type\":\"magic\",\"content\":\"<span style=\\\"color: #cf6e19;\\\">G</span>\"},\":\",{\"type\":\"insert\",\"insert\":70},\" \",{\"type\":\"magic\",\"content\":\"<span style=\\\"color: #1100cc;\\\">D</span>\"},\":\",{\"type\":\"insert\",\"insert\":71},\" \",{\"type\":\"magic\",\"content\":\"<span style=\\\"color: #3a0000ff;\\\">H</span>\"},\":\",{\"type\":\"insert\",\"insert\":72},\" \",{\"type\":\"magic\",\"content\":\"<span style=\\\"color: #404040;\\\">I</span>\"},\":\",{\"type\":\"insert\",\"insert\":73},\"\"]},{\"type\":\"paragraph\",\"content\":\"District 2 (Aurora District)\"},{\"type\":\"paragraph\",\"content\":[\"\",{\"type\":\"magic\",\"content\":\"<span style=\\\"color: #44b88f;\\\">C</span>\"},\":\",{\"type\":\"insert\",\"insert\":74},\" \",{\"type\":\"magic\",\"content\":\"<span style=\\\"color: #cf6e19;\\\">G</span>\"},\":\",{\"type\":\"insert\",\"insert\":75},\" \",{\"type\":\"magic\",\"content\":\"<span style=\\\"color: #1100cc;\\\">D</span>\"},\":\",{\"type\":\"insert\",\"insert\":76},\" \",{\"type\":\"magic\",\"content\":\"<span style=\\\"color: #3a0000ff;\\\">H</span>\"},\":\",{\"type\":\"insert\",\"insert\":77},\" \",{\"type\":\"magic\",\"content\":\"<span style=\\\"color: #404040;\\\">I</span>\"},\":\",{\"type\":\"insert\",\"insert\":78},\"\"]},{\"type\":\"paragraph\",\"content\":\"District 3 (The Vats)\"},{\"type\":\"paragraph\",\"content\":[\"\",{\"type\":\"magic\",\"content\":\"<span style=\\\"color: #44b88f;\\\">C</span>\"},\":\",{\"type\":\"insert\",\"insert\":79},\" \",{\"type\":\"magic\",\"content\":\"<span style=\\\"color: #cf6e19;\\\">G</span>\"},\":\",{\"type\":\"insert\",\"insert\":80},\" \",{\"type\":\"magic\",\"content\":\"<span style=\\\"color: #1100cc;\\\">D</span>\"},\":\",{\"type\":\"insert\",\"insert\":81},\" \",{\"type\":\"magic\",\"content\":\"<span style=\\\"color: #3a0000ff;\\\">H</span>\"},\":\",{\"type\":\"insert\",\"insert\":82},\" \",{\"type\":\"magic\",\"content\":\"<span style=\\\"color: #404040;\\\">I</span>\"},\":\",{\"type\":\"insert\",\"insert\":83},\"\"]},{\"type\":\"paragraph\",\"content\":\"District 4 (The Railyard)\"},{\"type\":\"paragraph\",\"content\":[\"\",{\"type\":\"magic\",\"content\":\"<span style=\\\"color: #44b88f;\\\">C</span>\"},\":\",{\"type\":\"insert\",\"insert\":84},\" \",{\"type\":\"magic\",\"content\":\"<span style=\\\"color: #cf6e19;\\\">G</span>\"},\":\",{\"type\":\"insert\",\"insert\":85},\" \",{\"type\":\"magic\",\"content\":\"<span style=\\\"color: #1100cc;\\\">D</span>\"},\":\",{\"type\":\"insert\",\"insert\":86},\" \",{\"type\":\"magic\",\"content\":\"<span style=\\\"color: #3a0000ff;\\\">H</span>\"},\":\",{\"type\":\"insert\",\"insert\":87},\" \",{\"type\":\"magic\",\"content\":\"<span style=\\\"color: #404040;\\\">I</span>\"},\":\",{\"type\":\"insert\",\"insert\":88},\"\"]},{\"type\":\"paragraph\",\"content\":\"District 5 (The Pitts)\"},{\"type\":\"paragraph\",\"content\":[\"\",{\"type\":\"magic\",\"content\":\"<span style=\\\"color: #44b88f;\\\">C</span>\"},\":\",{\"type\":\"insert\",\"insert\":89},\" \",{\"type\":\"magic\",\"content\":\"<span style=\\\"color: #cf6e19;\\\">G</span>\"},\":\",{\"type\":\"insert\",\"insert\":90},\" \",{\"type\":\"magic\",\"content\":\"<span style=\\\"color: #1100cc;\\\">D</span>\"},\":\",{\"type\":\"insert\",\"insert\":91},\" \",{\"type\":\"magic\",\"content\":\"<span style=\\\"color: #3a0000ff;\\\">H</span>\"},\":\",{\"type\":\"insert\",\"insert\":92},\" \",{\"type\":\"magic\",\"content\":\"<span style=\\\"color: #404040;\\\">I</span>\"},\":\",{\"type\":\"insert\",\"insert\":93},\"\"]},{\"type\":\"paragraph\",\"content\":\"District 6 (The Limelight)\"},{\"type\":\"paragraph\",\"content\":[\"\",{\"type\":\"magic\",\"content\":\"<span style=\\\"color: #44b88f;\\\">C</span>\"},\":\",{\"type\":\"insert\",\"insert\":94},\" \",{\"type\":\"magic\",\"content\":\"<span style=\\\"color: #cf6e19;\\\">G</span>\"},\":\",{\"type\":\"insert\",\"insert\":95},\" \",{\"type\":\"magic\",\"content\":\"<span style=\\\"color: #1100cc;\\\">D</span>\"},\":\",{\"type\":\"insert\",\"insert\":96},\" \",{\"type\":\"magic\",\"content\":\"<span style=\\\"color: #3a0000ff;\\\">H</span>\"},\":\",{\"type\":\"insert\",\"insert\":97},\" \",{\"type\":\"magic\",\"content\":\"<span style=\\\"color: #404040;\\\">I</span>\"},\":\",{\"type\":\"insert\",\"insert\":98},\"\"]},{\"type\":\"paragraph\",\"content\":\"District 7 (The Deeps)\"},{\"type\":\"paragraph\",\"content\":[\"\",{\"type\":\"magic\",\"content\":\"<span style=\\\"color: #44b88f;\\\">C</span>\"},\":\",{\"type\":\"insert\",\"insert\":99},\" \",{\"type\":\"magic\",\"content\":\"<span style=\\\"color: #cf6e19;\\\">G</span>\"},\":\",{\"type\":\"insert\",\"insert\":100},\" \",{\"type\":\"magic\",\"content\":\"<span style=\\\"color: #1100cc;\\\">D</span>\"},\":\",{\"type\":\"insert\",\"insert\":101},\" \",{\"type\":\"magic\",\"content\":\"<span style=\\\"color: #3a0000ff;\\\">H</span>\"},\":\",{\"type\":\"insert\",\"insert\":102},\" \",{\"type\":\"magic\",\"content\":\"<span style=\\\"color: #404040;\\\">I</span>\"},\":\",{\"type\":\"insert\",\"insert\":103}]}],\"stateDependencies\":[{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Proj_Exec_C'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Proj_Exec_G'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Proj_Exec_D'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Proj_Exec_H'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Proj_Exec_I'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Proj_Gold_C'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Proj_Gold_G'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Proj_Gold_D'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Proj_Gold_H'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Proj_Gold_I'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Proj_White_C'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Proj_White_G'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Proj_White_D'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Proj_White_H'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Proj_White_I'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Proj_Blue_C'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Proj_Blue_G'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Proj_Blue_D'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Proj_Blue_H'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Proj_Blue_I'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Docks_rich_pop'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Aurora_rich_pop'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Vats_rich_pop'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Railyard_rich_pop'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Pitts_rich_pop'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Limelight_rich_pop'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Deeps_rich_pop'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Docks_first_pop'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Aurora_first_pop'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Vats_first_pop'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Railyard_first_pop'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Pitts_first_pop'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Limelight_first_pop'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Deeps_first_pop'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Docks_second_pop'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Aurora_second_pop'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Vats_second_pop'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Railyard_second_pop'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Pitts_second_pop'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Limelight_second_pop'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Deeps_second_pop'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Docks_deeper_pop'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Aurora_deeper_pop'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Vats_deeper_pop'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Railyard_deeper_pop'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Pitts_deeper_pop'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Limelight_deeper_pop'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Deeps_deeper_pop'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Docks_coop_pop'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Aurora_coop_pop'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Vats_coop_pop'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Railyard_coop_pop'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Pitts_coop_pop'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Limelight_coop_pop'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Deeps_coop_pop'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Docks_drone_pop'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Aurora_drone_pop'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Vats_drone_pop'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Railyard_drone_pop'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Pitts_drone_pop'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Limelight_drone_pop'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Deeps_drone_pop'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Docks_alien_pop'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Aurora_alien_pop'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Vats_alien_pop'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Railyard_alien_pop'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Pitts_alien_pop'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Limelight_alien_pop'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Deeps_alien_pop'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Proj_Docks_C'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Proj_Docks_G'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Proj_Docks_D'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Proj_Docks_H'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Proj_Docks_I'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Proj_Aurora_C'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Proj_Aurora_G'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Proj_Aurora_D'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Proj_Aurora_H'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Proj_Aurora_I'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Proj_Vats_C'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Proj_Vats_G'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Proj_Vats_D'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Proj_Vats_H'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Proj_Vats_I'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Proj_Railyard_C'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Proj_Railyard_G'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Proj_Railyard_D'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Proj_Railyard_H'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Proj_Railyard_I'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Proj_Pitts_C'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Proj_Pitts_G'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Proj_Pitts_D'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Proj_Pitts_H'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Proj_Pitts_I'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Proj_Limelight_C'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Proj_Limelight_G'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Proj_Limelight_D'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Proj_Limelight_H'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Proj_Limelight_I'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Proj_Deeps_C'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Proj_Deeps_G'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Proj_Deeps_D'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Proj_Deeps_H'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Proj_Deeps_I'] || 0);\"}}]}},\"election_simulation\":{\"id\":\"election_simulation\",\"type\":\"scene\",\"title\":\"Election Simulation\",\"options\":[{\"id\":\"@election_simulation.2300\",\"title\":\"2300\"}],\"content\":{\"content\":\"\",\"type\":\"paragraph\"}},\"game_over.hitler_wins\":{\"id\":\"game_over.hitler_wins\",\"viewIf\":{\"$code\":\"return ((((Q['chancellor'] == \\\"Hitler\\\") || (Q['president'] == \\\"Hitler\\\"))) && ((((Q['total_defeat'] || 0) == 1) || ((Q['civil_war_seen'] || 0) == 0))));\"},\"title\":\"Adolf Hitler is in undisputed control over Germany.\",\"tags\":[\"endings\"],\"goTo\":[{\"id\":\"game_over.eg_menu\"}],\"content\":{\"content\":[{\"type\":\"paragraph\",\"content\":\"Adolf Hitler is in undisputed control over Germany. The SPD, along with all of the democratic forces, have failed.\"},{\"type\":\"paragraph\",\"content\":{\"type\":\"conditional\",\"content\":\"At the very least, we fought back. Perhaps our resistance will be celebrated in an impossible-to-forsee future.\",\"predicate\":0}}],\"stateDependencies\":[{\"type\":\"predicate\",\"fn\":{\"$code\":\"return ((Q['civil_war_seen'] || 0) == 1);\"}}]}},\"library.demographics_library\":{\"id\":\"library.demographics_library\",\"options\":[{\"id\":\"@library.menu\"},{\"id\":\"@backSpecialScene\",\"title\":\"Exit library.\"}],\"content\":[{\"type\":\"paragraph\",\"content\":\"Demographics of Mikasa in 2300:\"},{\"type\":\"paragraph\",\"content\":\"First Wave: Communities that formed around the cliques of original settlers from Japan, the EU and USA. The most prosperous non corporate group. Approximately 1.9 million people\"},{\"type\":\"paragraph\",\"content\":\"Second Wave: Communities that emerged during the refugee waves of the 23rd centuries. Predominantly from East Africa and South East Asia. Generally poorer then any group but Otherworlders. Approximately 2.2 million people\"},{\"type\":\"paragraph\",\"content\":\"Corporate Citizens, aka \\\"Drones\\\": employees of the international corporations, primarily the \\\"Big Three\\\" of Community Soylent Incorperated, Combined Magrail Trust and the Brazos Zaibatsu. They have traded away most of their freedom for a higher standard of living. They are not allowed to vote for candidates who are not approved by their employeer meaning their only choice is the corporate approved candidate and absention. Approximately 1.7 million people.\"},{\"type\":\"paragraph\",\"content\":\"Deepers: The inhabitants of a secondary colony that formed away from the main city-state located at the base of the orbital tether-port. The main colony subsequently expanded out to border \\\"the Deep\\\" which lead to annexation 25 years ago. Approximately 1.7 million people.\"},{\"type\":\"paragraph\",\"content\":\"Clans of the Mother: Isolationist groups that live disconnected from the city infrastructure in primarily small independent habitats hidden within the asteroid. Approximately 0.5 million people, few of them inside the districts. A consecrated group named \\\"Comptrollers\\\" are the only clan members who are allowed to touch money and handle most interactions with the outside world.\"},{\"type\":\"paragraph\",\"content\":\"Otherworlders: People who came from the Otherworld through portals or other magical means of transport. The largest groups are Humans, Fae and Orcs. Many members of this group are ill equipped to navigate a modern society and literacy rates let alone computer literacy rates are very low. However this group does have by far the largest proportion of those trained in the magical arts. Approximately 100 thousand people\"},{\"type\":\"paragraph\",\"content\":\"Shareholders: Literally those holding shares in the big three but used as a catch all term to describe anyone of significant wealth. Besides the permanent residents who are members of the ownership class, there is a constant churn of wealthy travellers on the space liners that stop at Mikasa and the other four way stations on the way between the inner and outer solar system. Approximately 50,000 permanent residents, 150,000 off world stakeholders with voting rights in absentia and a fluctuating visiting population around 50,000 people.\"}]},\"main.party\":{\"id\":\"main.party\",\"title\":\"Party Affairs\",\"cardImage\":\"img/ballot.png\",\"isDeck\":true,\"options\":[{\"id\":\"#party_affairs\"}],\"content\":{\"content\":\"\",\"type\":\"paragraph\"}},\"root.start_menu_2\":{\"id\":\"root.start_menu_2\",\"onDisplay\":[{\"$code\":\"if (typeof Q.ensureBuildStampFooter === 'function') { Q.ensureBuildStampFooter() }\"}],\"options\":[{\"id\":\"@root.start\",\"title\":\"Start game\"},{\"id\":\"@election_simulation\",\"title\":\"Election simulation\"},{\"id\":\"@credits\",\"title\":\"Credits\"},{\"id\":\"@game_over.achievements\"}],\"content\":{\"content\":\"\",\"type\":\"paragraph\"}},\"status.polls\":{\"id\":\"status.polls\",\"onArrival\":[{\"$code\":\"Q.update_projections();\"}],\"content\":{\"content\":[{\"type\":\"heading\",\"content\":\"Projected election results\"},{\"type\":\"paragraph\",\"content\":\"(if district elections were held now — citywide popular vote under the general electorate model; figures are percent):\"},{\"type\":\"paragraph\",\"content\":[{\"type\":\"magic\",\"content\":\"<table style=\\\"width:100%; border-collapse:collapse; font-size:0.85em; margin:0.25em 0;\\\">\"},\" \",{\"type\":\"magic\",\"content\":\"<tr><th style=\\\"text-align:left; font-weight:normal;\\\"></th><th style=\\\"text-align:center;\\\"><span class=\\\"tooltip-text\\\" title=\\\"Megacorporations and their approved candidates\\\" style=\\\"color: #44b88f;\\\">C</span></th><th style=\\\"text-align:center;\\\"><span class=\\\"tooltip-text\\\" title=\\\"Syndicates and organized crime\\\" style=\\\"color: #cf6e19;\\\">G</span></th><th style=\\\"text-align:center;\\\"><span class=\\\"tooltip-text\\\" title=\\\"Democrats and reform movements\\\" style=\\\"color: #1100cc;\\\">D</span></th><th style=\\\"text-align:center;\\\"><span class=\\\"tooltip-text\\\" title=\\\"Xenophobic and hate movements\\\" style=\\\"color: #3a0000ff;\\\">H</span></th><th style=\\\"text-align:center;\\\"><span class=\\\"tooltip-text\\\" title=\\\"Independents, Deepers, and unaligned voters\\\" style=\\\"color: #404040;\\\">I</span></th></tr>\"},\" \",{\"type\":\"magic\",\"content\":\"<tr><td style=\\\"text-align:left;\\\">Citywide</td><td style=\\\"text-align:right;\\\">\"},{\"type\":\"insert\",\"insert\":0},{\"type\":\"magic\",\"content\":\"</td><td style=\\\"text-align:right;\\\">\"},{\"type\":\"insert\",\"insert\":1},{\"type\":\"magic\",\"content\":\"</td><td style=\\\"text-align:right;\\\">\"},{\"type\":\"insert\",\"insert\":2},{\"type\":\"magic\",\"content\":\"</td><td style=\\\"text-align:right;\\\">\"},{\"type\":\"insert\",\"insert\":3},{\"type\":\"magic\",\"content\":\"</td><td style=\\\"text-align:right;\\\">\"},{\"type\":\"insert\",\"insert\":4},{\"type\":\"magic\",\"content\":\"</td></tr>\"},\" \",{\"type\":\"magic\",\"content\":\"</table>\"},\"\"]},{\"type\":\"heading\",\"content\":\"Detailed results by demographic\"},{\"type\":\"paragraph\",\"content\":\"Share of the popular vote within each stratum (general electorate model; figures are percent):\"},{\"type\":\"paragraph\",\"content\":[{\"type\":\"magic\",\"content\":\"<table style=\\\"width:100%; border-collapse:collapse; font-size:0.85em; margin:0.25em 0 0 0;\\\">\"},\" \",{\"type\":\"magic\",\"content\":\"<tr><th style=\\\"text-align:left; font-weight:normal;\\\"></th><th style=\\\"text-align:center;\\\">\"},{\"type\":\"magic\",\"content\":\"<span style=\\\"color: #44b88f;\\\">C</span>\"},{\"type\":\"magic\",\"content\":\"</th><th style=\\\"text-align:center;\\\">\"},{\"type\":\"magic\",\"content\":\"<span style=\\\"color: #cf6e19;\\\">G</span>\"},{\"type\":\"magic\",\"content\":\"</th><th style=\\\"text-align:center;\\\">\"},{\"type\":\"magic\",\"content\":\"<span style=\\\"color: #1100cc;\\\">D</span>\"},{\"type\":\"magic\",\"content\":\"</th><th style=\\\"text-align:center;\\\">\"},{\"type\":\"magic\",\"content\":\"<span style=\\\"color: #3a0000ff;\\\">H</span>\"},{\"type\":\"magic\",\"content\":\"</th><th style=\\\"text-align:center;\\\">\"},{\"type\":\"magic\",\"content\":\"<span style=\\\"color: #404040;\\\">I</span>\"},{\"type\":\"magic\",\"content\":\"</th></tr>\"},\" \",{\"type\":\"magic\",\"content\":\"<tr><td style=\\\"text-align:left;\\\">Rich</td><td style=\\\"text-align:right;\\\">\"},{\"type\":\"insert\",\"insert\":5},{\"type\":\"magic\",\"content\":\"</td><td style=\\\"text-align:right;\\\">\"},{\"type\":\"insert\",\"insert\":6},{\"type\":\"magic\",\"content\":\"</td><td style=\\\"text-align:right;\\\">\"},{\"type\":\"insert\",\"insert\":7},{\"type\":\"magic\",\"content\":\"</td><td style=\\\"text-align:right;\\\">\"},{\"type\":\"insert\",\"insert\":8},{\"type\":\"magic\",\"content\":\"</td><td style=\\\"text-align:right;\\\">\"},{\"type\":\"insert\",\"insert\":9},{\"type\":\"magic\",\"content\":\"</td></tr>\"},\" \",{\"type\":\"magic\",\"content\":\"<tr><td style=\\\"text-align:left;\\\">1st</td><td style=\\\"text-align:right;\\\">\"},{\"type\":\"insert\",\"insert\":10},{\"type\":\"magic\",\"content\":\"</td><td style=\\\"text-align:right;\\\">\"},{\"type\":\"insert\",\"insert\":11},{\"type\":\"magic\",\"content\":\"</td><td style=\\\"text-align:right;\\\">\"},{\"type\":\"insert\",\"insert\":12},{\"type\":\"magic\",\"content\":\"</td><td style=\\\"text-align:right;\\\">\"},{\"type\":\"insert\",\"insert\":13},{\"type\":\"magic\",\"content\":\"</td><td style=\\\"text-align:right;\\\">\"},{\"type\":\"insert\",\"insert\":14},{\"type\":\"magic\",\"content\":\"</td></tr>\"},\" \",{\"type\":\"magic\",\"content\":\"<tr><td style=\\\"text-align:left;\\\">2nd</td><td style=\\\"text-align:right;\\\">\"},{\"type\":\"insert\",\"insert\":15},{\"type\":\"magic\",\"content\":\"</td><td style=\\\"text-align:right;\\\">\"},{\"type\":\"insert\",\"insert\":16},{\"type\":\"magic\",\"content\":\"</td><td style=\\\"text-align:right;\\\">\"},{\"type\":\"insert\",\"insert\":17},{\"type\":\"magic\",\"content\":\"</td><td style=\\\"text-align:right;\\\">\"},{\"type\":\"insert\",\"insert\":18},{\"type\":\"magic\",\"content\":\"</td><td style=\\\"text-align:right;\\\">\"},{\"type\":\"insert\",\"insert\":19},{\"type\":\"magic\",\"content\":\"</td></tr>\"},\" \",{\"type\":\"magic\",\"content\":\"<tr><td style=\\\"text-align:left;\\\">Coops</td><td style=\\\"text-align:right;\\\">\"},{\"type\":\"insert\",\"insert\":20},{\"type\":\"magic\",\"content\":\"</td><td style=\\\"text-align:right;\\\">\"},{\"type\":\"insert\",\"insert\":21},{\"type\":\"magic\",\"content\":\"</td><td style=\\\"text-align:right;\\\">\"},{\"type\":\"insert\",\"insert\":22},{\"type\":\"magic\",\"content\":\"</td><td style=\\\"text-align:right;\\\">\"},{\"type\":\"insert\",\"insert\":23},{\"type\":\"magic\",\"content\":\"</td><td style=\\\"text-align:right;\\\">\"},{\"type\":\"insert\",\"insert\":24},{\"type\":\"magic\",\"content\":\"</td></tr>\"},\" \",{\"type\":\"magic\",\"content\":\"</table>\"},\" \",{\"type\":\"magic\",\"content\":\"<table style=\\\"width:100%; border-collapse:collapse; font-size:0.85em; margin:0;\\\">\"},\" \",{\"type\":\"magic\",\"content\":\"<tr><td style=\\\"text-align:left;\\\">Drone</td><td style=\\\"text-align:right;\\\">\"},{\"type\":\"insert\",\"insert\":25},{\"type\":\"magic\",\"content\":\"</td><td colspan=\\\"4\\\" style=\\\"text-align:right;\\\">\"},\"Abstentions: \",{\"type\":\"insert\",\"insert\":26},{\"type\":\"magic\",\"content\":\"</td></tr>\"},\" \",{\"type\":\"magic\",\"content\":\"</table>\"},\" \",{\"type\":\"magic\",\"content\":\"<table style=\\\"width:100%; border-collapse:collapse; font-size:0.85em; margin:0 0 0.25em 0;\\\">\"},\" \",{\"type\":\"magic\",\"content\":\"<tr><td style=\\\"text-align:left;\\\">OtherW</td><td style=\\\"text-align:right;\\\">\"},{\"type\":\"insert\",\"insert\":27},{\"type\":\"magic\",\"content\":\"</td><td style=\\\"text-align:right;\\\">\"},{\"type\":\"insert\",\"insert\":28},{\"type\":\"magic\",\"content\":\"</td><td style=\\\"text-align:right;\\\">\"},{\"type\":\"insert\",\"insert\":29},{\"type\":\"magic\",\"content\":\"</td><td style=\\\"text-align:right;\\\">\"},{\"type\":\"insert\",\"insert\":30},{\"type\":\"magic\",\"content\":\"</td><td style=\\\"text-align:right;\\\">\"},{\"type\":\"insert\",\"insert\":31},{\"type\":\"magic\",\"content\":\"</td></tr>\"},\" \",{\"type\":\"magic\",\"content\":\"<tr><td style=\\\"text-align:left;\\\">Deepers</td><td style=\\\"text-align:right;\\\">\"},{\"type\":\"insert\",\"insert\":32},{\"type\":\"magic\",\"content\":\"</td><td style=\\\"text-align:right;\\\">\"},{\"type\":\"insert\",\"insert\":33},{\"type\":\"magic\",\"content\":\"</td><td style=\\\"text-align:right;\\\">\"},{\"type\":\"insert\",\"insert\":34},{\"type\":\"magic\",\"content\":\"</td><td style=\\\"text-align:right;\\\">\"},{\"type\":\"insert\",\"insert\":35},{\"type\":\"magic\",\"content\":\"</td><td style=\\\"text-align:right;\\\">\"},{\"type\":\"insert\",\"insert\":36},{\"type\":\"magic\",\"content\":\"</td></tr>\"},\" \",{\"type\":\"magic\",\"content\":\"</table>\"},\"\"]},{\"type\":\"heading\",\"content\":\"Results by district\"},{\"type\":\"paragraph\",\"content\":\"Expected general-population vote share in each district (district-election model; figures are percent):\"},{\"type\":\"paragraph\",\"content\":[{\"type\":\"magic\",\"content\":\"<table style=\\\"width:100%; border-collapse:collapse; font-size:0.85em; margin:0.25em 0;\\\">\"},\" \",{\"type\":\"magic\",\"content\":\"<tr><th style=\\\"text-align:left; font-weight:normal;\\\"></th><th style=\\\"text-align:center;\\\">\"},{\"type\":\"magic\",\"content\":\"<span style=\\\"color: #44b88f;\\\">C</span>\"},{\"type\":\"magic\",\"content\":\"</th><th style=\\\"text-align:center;\\\">\"},{\"type\":\"magic\",\"content\":\"<span style=\\\"color: #cf6e19;\\\">G</span>\"},{\"type\":\"magic\",\"content\":\"</th><th style=\\\"text-align:center;\\\">\"},{\"type\":\"magic\",\"content\":\"<span style=\\\"color: #1100cc;\\\">D</span>\"},{\"type\":\"magic\",\"content\":\"</th><th style=\\\"text-align:center;\\\">\"},{\"type\":\"magic\",\"content\":\"<span style=\\\"color: #3a0000ff;\\\">H</span>\"},{\"type\":\"magic\",\"content\":\"</th><th style=\\\"text-align:center;\\\">\"},{\"type\":\"magic\",\"content\":\"<span style=\\\"color: #404040;\\\">I</span>\"},{\"type\":\"magic\",\"content\":\"</th></tr>\"},\" \",{\"type\":\"magic\",\"content\":\"<tr><td style=\\\"text-align:left;\\\">D1 Docks</td><td style=\\\"text-align:right;\\\">\"},{\"type\":\"insert\",\"insert\":37},{\"type\":\"magic\",\"content\":\"</td><td style=\\\"text-align:right;\\\">\"},{\"type\":\"insert\",\"insert\":38},{\"type\":\"magic\",\"content\":\"</td><td style=\\\"text-align:right;\\\">\"},{\"type\":\"insert\",\"insert\":39},{\"type\":\"magic\",\"content\":\"</td><td style=\\\"text-align:right;\\\">\"},{\"type\":\"insert\",\"insert\":40},{\"type\":\"magic\",\"content\":\"</td><td style=\\\"text-align:right;\\\">\"},{\"type\":\"insert\",\"insert\":41},{\"type\":\"magic\",\"content\":\"</td></tr>\"},\" \",{\"type\":\"magic\",\"content\":\"<tr><td style=\\\"text-align:left;\\\">D2 Aurora</td><td style=\\\"text-align:right;\\\">\"},{\"type\":\"insert\",\"insert\":42},{\"type\":\"magic\",\"content\":\"</td><td style=\\\"text-align:right;\\\">\"},{\"type\":\"insert\",\"insert\":43},{\"type\":\"magic\",\"content\":\"</td><td style=\\\"text-align:right;\\\">\"},{\"type\":\"insert\",\"insert\":44},{\"type\":\"magic\",\"content\":\"</td><td style=\\\"text-align:right;\\\">\"},{\"type\":\"insert\",\"insert\":45},{\"type\":\"magic\",\"content\":\"</td><td style=\\\"text-align:right;\\\">\"},{\"type\":\"insert\",\"insert\":46},{\"type\":\"magic\",\"content\":\"</td></tr>\"},\" \",{\"type\":\"magic\",\"content\":\"<tr><td style=\\\"text-align:left;\\\">D3 Vats</td><td style=\\\"text-align:right;\\\">\"},{\"type\":\"insert\",\"insert\":47},{\"type\":\"magic\",\"content\":\"</td><td style=\\\"text-align:right;\\\">\"},{\"type\":\"insert\",\"insert\":48},{\"type\":\"magic\",\"content\":\"</td><td style=\\\"text-align:right;\\\">\"},{\"type\":\"insert\",\"insert\":49},{\"type\":\"magic\",\"content\":\"</td><td style=\\\"text-align:right;\\\">\"},{\"type\":\"insert\",\"insert\":50},{\"type\":\"magic\",\"content\":\"</td><td style=\\\"text-align:right;\\\">\"},{\"type\":\"insert\",\"insert\":51},{\"type\":\"magic\",\"content\":\"</td></tr>\"},\" \",{\"type\":\"magic\",\"content\":\"<tr><td style=\\\"text-align:left;\\\">D4 Railyard</td><td style=\\\"text-align:right;\\\">\"},{\"type\":\"insert\",\"insert\":52},{\"type\":\"magic\",\"content\":\"</td><td style=\\\"text-align:right;\\\">\"},{\"type\":\"insert\",\"insert\":53},{\"type\":\"magic\",\"content\":\"</td><td style=\\\"text-align:right;\\\">\"},{\"type\":\"insert\",\"insert\":54},{\"type\":\"magic\",\"content\":\"</td><td style=\\\"text-align:right;\\\">\"},{\"type\":\"insert\",\"insert\":55},{\"type\":\"magic\",\"content\":\"</td><td style=\\\"text-align:right;\\\">\"},{\"type\":\"insert\",\"insert\":56},{\"type\":\"magic\",\"content\":\"</td></tr>\"},\" \",{\"type\":\"magic\",\"content\":\"<tr><td style=\\\"text-align:left;\\\">D5 Pitts</td><td style=\\\"text-align:right;\\\">\"},{\"type\":\"insert\",\"insert\":57},{\"type\":\"magic\",\"content\":\"</td><td style=\\\"text-align:right;\\\">\"},{\"type\":\"insert\",\"insert\":58},{\"type\":\"magic\",\"content\":\"</td><td style=\\\"text-align:right;\\\">\"},{\"type\":\"insert\",\"insert\":59},{\"type\":\"magic\",\"content\":\"</td><td style=\\\"text-align:right;\\\">\"},{\"type\":\"insert\",\"insert\":60},{\"type\":\"magic\",\"content\":\"</td><td style=\\\"text-align:right;\\\">\"},{\"type\":\"insert\",\"insert\":61},{\"type\":\"magic\",\"content\":\"</td></tr>\"},\" \",{\"type\":\"magic\",\"content\":\"<tr><td style=\\\"text-align:left;\\\">D6 Limelight</td><td style=\\\"text-align:right;\\\">\"},{\"type\":\"insert\",\"insert\":62},{\"type\":\"magic\",\"content\":\"</td><td style=\\\"text-align:right;\\\">\"},{\"type\":\"insert\",\"insert\":63},{\"type\":\"magic\",\"content\":\"</td><td style=\\\"text-align:right;\\\">\"},{\"type\":\"insert\",\"insert\":64},{\"type\":\"magic\",\"content\":\"</td><td style=\\\"text-align:right;\\\">\"},{\"type\":\"insert\",\"insert\":65},{\"type\":\"magic\",\"content\":\"</td><td style=\\\"text-align:right;\\\">\"},{\"type\":\"insert\",\"insert\":66},{\"type\":\"magic\",\"content\":\"</td></tr>\"},\" \",{\"type\":\"magic\",\"content\":\"<tr><td style=\\\"text-align:left;\\\">D7 Deeps</td><td style=\\\"text-align:right;\\\">\"},{\"type\":\"insert\",\"insert\":67},{\"type\":\"magic\",\"content\":\"</td><td style=\\\"text-align:right;\\\">\"},{\"type\":\"insert\",\"insert\":68},{\"type\":\"magic\",\"content\":\"</td><td style=\\\"text-align:right;\\\">\"},{\"type\":\"insert\",\"insert\":69},{\"type\":\"magic\",\"content\":\"</td><td style=\\\"text-align:right;\\\">\"},{\"type\":\"insert\",\"insert\":70},{\"type\":\"magic\",\"content\":\"</td><td style=\\\"text-align:right;\\\">\"},{\"type\":\"insert\",\"insert\":71},{\"type\":\"magic\",\"content\":\"</td></tr>\"},\" \",{\"type\":\"magic\",\"content\":\"</table>\"}]}],\"stateDependencies\":[{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['poll_exec_C'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['poll_exec_G'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['poll_exec_D'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['poll_exec_H'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['poll_exec_I'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['rich_poll_C'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['rich_poll_G'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['rich_poll_D'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['rich_poll_H'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['rich_poll_I'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['first_poll_C'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['first_poll_G'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['first_poll_D'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['first_poll_H'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['first_poll_I'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['second_poll_C'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['second_poll_G'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['second_poll_D'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['second_poll_H'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['second_poll_I'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['coop_poll_C'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['coop_poll_G'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['coop_poll_D'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['coop_poll_H'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['coop_poll_I'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['drone_poll_C'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['drone_poll_abstain'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['alien_poll_C'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['alien_poll_G'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['alien_poll_D'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['alien_poll_H'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['alien_poll_I'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['deeper_poll_C'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['deeper_poll_G'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['deeper_poll_D'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['deeper_poll_H'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['deeper_poll_I'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Docks_poll_C'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Docks_poll_G'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Docks_poll_D'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Docks_poll_H'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Docks_poll_I'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Aurora_poll_C'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Aurora_poll_G'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Aurora_poll_D'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Aurora_poll_H'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Aurora_poll_I'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Vats_poll_C'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Vats_poll_G'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Vats_poll_D'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Vats_poll_H'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Vats_poll_I'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Railyard_poll_C'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Railyard_poll_G'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Railyard_poll_D'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Railyard_poll_H'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Railyard_poll_I'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Pitts_poll_C'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Pitts_poll_G'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Pitts_poll_D'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Pitts_poll_H'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Pitts_poll_I'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Limelight_poll_C'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Limelight_poll_G'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Limelight_poll_D'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Limelight_poll_H'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Limelight_poll_I'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Deeps_poll_C'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Deeps_poll_G'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Deeps_poll_D'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Deeps_poll_H'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Deeps_poll_I'] || 0);\"}}]}},\"status\":{\"id\":\"status\",\"type\":\"scene\",\"title\":\"Status\",\"newPage\":true,\"isSpecial\":true,\"onDisplay\":[{\"$code\":\"if (typeof Q.ensureBuildStampFooter === 'function') { Q.ensureBuildStampFooter() }\"}],\"content\":{\"content\":[{\"type\":\"heading\",\"content\":\"Status\"},{\"type\":\"paragraph\",\"content\":[{\"type\":\"insert\",\"insert\":0},\" \",{\"type\":\"insert\",\"insert\":1},\"\"]},{\"type\":\"heading\",\"content\":\"Current seats\"},{\"type\":\"paragraph\",\"content\":\"Council composition from the opening election (January 2300):\"},{\"type\":\"paragraph\",\"content\":[{\"type\":\"magic\",\"content\":\"<table style=\\\"width:100%; border-collapse:collapse; font-size:0.85em; margin:0.25em 0;\\\">\"},\" \",{\"type\":\"magic\",\"content\":\"<tr><th style=\\\"text-align:left; font-weight:normal;\\\"></th><th style=\\\"text-align:center;\\\">\"},{\"type\":\"magic\",\"content\":\"<span style=\\\"color: #44b88f;\\\">C</span>\"},{\"type\":\"magic\",\"content\":\"</th><th style=\\\"text-align:center;\\\">\"},{\"type\":\"magic\",\"content\":\"<span style=\\\"color: #cf6e19;\\\">G</span>\"},{\"type\":\"magic\",\"content\":\"</th><th style=\\\"text-align:center;\\\">\"},{\"type\":\"magic\",\"content\":\"<span style=\\\"color: #1100cc;\\\">D</span>\"},{\"type\":\"magic\",\"content\":\"</th><th style=\\\"text-align:center;\\\">\"},{\"type\":\"magic\",\"content\":\"<span style=\\\"color: #3a0000ff;\\\">H</span>\"},{\"type\":\"magic\",\"content\":\"</th><th style=\\\"text-align:center;\\\">\"},{\"type\":\"magic\",\"content\":\"<span style=\\\"color: #404040;\\\">I</span>\"},{\"type\":\"magic\",\"content\":\"</th></tr>\"},\" \",{\"type\":\"magic\",\"content\":\"<tr><td style=\\\"text-align:left;\\\">Executive</td><td style=\\\"text-align:right;\\\">\"},{\"type\":\"insert\",\"insert\":2},{\"type\":\"magic\",\"content\":\"</td><td style=\\\"text-align:right;\\\">\"},{\"type\":\"insert\",\"insert\":3},{\"type\":\"magic\",\"content\":\"</td><td style=\\\"text-align:right;\\\">\"},{\"type\":\"insert\",\"insert\":4},{\"type\":\"magic\",\"content\":\"</td><td style=\\\"text-align:right;\\\">\"},{\"type\":\"insert\",\"insert\":5},{\"type\":\"magic\",\"content\":\"</td><td style=\\\"text-align:right;\\\">\"},{\"type\":\"insert\",\"insert\":6},{\"type\":\"magic\",\"content\":\"</td></tr>\"},\" \",{\"type\":\"magic\",\"content\":\"<tr><td style=\\\"text-align:left;\\\">Gold</td><td style=\\\"text-align:right;\\\">\"},{\"type\":\"insert\",\"insert\":7},{\"type\":\"magic\",\"content\":\"</td><td style=\\\"text-align:right;\\\">\"},{\"type\":\"insert\",\"insert\":8},{\"type\":\"magic\",\"content\":\"</td><td style=\\\"text-align:right;\\\">\"},{\"type\":\"insert\",\"insert\":9},{\"type\":\"magic\",\"content\":\"</td><td style=\\\"text-align:right;\\\">\"},{\"type\":\"insert\",\"insert\":10},{\"type\":\"magic\",\"content\":\"</td><td style=\\\"text-align:right;\\\">\"},{\"type\":\"insert\",\"insert\":11},{\"type\":\"magic\",\"content\":\"</td></tr>\"},\" \",{\"type\":\"magic\",\"content\":\"<tr><td style=\\\"text-align:left;\\\">White</td><td style=\\\"text-align:right;\\\">\"},{\"type\":\"insert\",\"insert\":12},{\"type\":\"magic\",\"content\":\"</td><td style=\\\"text-align:right;\\\">\"},{\"type\":\"insert\",\"insert\":13},{\"type\":\"magic\",\"content\":\"</td><td style=\\\"text-align:right;\\\">\"},{\"type\":\"insert\",\"insert\":14},{\"type\":\"magic\",\"content\":\"</td><td style=\\\"text-align:right;\\\">\"},{\"type\":\"insert\",\"insert\":15},{\"type\":\"magic\",\"content\":\"</td><td style=\\\"text-align:right;\\\">\"},{\"type\":\"insert\",\"insert\":16},{\"type\":\"magic\",\"content\":\"</td></tr>\"},\" \",{\"type\":\"magic\",\"content\":\"<tr><td style=\\\"text-align:left;\\\">Blue</td><td style=\\\"text-align:right;\\\">\"},{\"type\":\"insert\",\"insert\":17},{\"type\":\"magic\",\"content\":\"</td><td style=\\\"text-align:right;\\\">\"},{\"type\":\"insert\",\"insert\":18},{\"type\":\"magic\",\"content\":\"</td><td style=\\\"text-align:right;\\\">\"},{\"type\":\"insert\",\"insert\":19},{\"type\":\"magic\",\"content\":\"</td><td style=\\\"text-align:right;\\\">\"},{\"type\":\"insert\",\"insert\":20},{\"type\":\"magic\",\"content\":\"</td><td style=\\\"text-align:right;\\\">\"},{\"type\":\"insert\",\"insert\":21},{\"type\":\"magic\",\"content\":\"</td></tr>\"},\" \",{\"type\":\"magic\",\"content\":\"<tr><td style=\\\"text-align:left;\\\">D1 Docks</td><td style=\\\"text-align:right;\\\">\"},{\"type\":\"insert\",\"insert\":22},{\"type\":\"magic\",\"content\":\"</td><td style=\\\"text-align:right;\\\">\"},{\"type\":\"insert\",\"insert\":23},{\"type\":\"magic\",\"content\":\"</td><td style=\\\"text-align:right;\\\">\"},{\"type\":\"insert\",\"insert\":24},{\"type\":\"magic\",\"content\":\"</td><td style=\\\"text-align:right;\\\">\"},{\"type\":\"insert\",\"insert\":25},{\"type\":\"magic\",\"content\":\"</td><td style=\\\"text-align:right;\\\">\"},{\"type\":\"insert\",\"insert\":26},{\"type\":\"magic\",\"content\":\"</td></tr>\"},\" \",{\"type\":\"magic\",\"content\":\"<tr><td style=\\\"text-align:left;\\\">D2 Aurora</td><td style=\\\"text-align:right;\\\">\"},{\"type\":\"insert\",\"insert\":27},{\"type\":\"magic\",\"content\":\"</td><td style=\\\"text-align:right;\\\">\"},{\"type\":\"insert\",\"insert\":28},{\"type\":\"magic\",\"content\":\"</td><td style=\\\"text-align:right;\\\">\"},{\"type\":\"insert\",\"insert\":29},{\"type\":\"magic\",\"content\":\"</td><td style=\\\"text-align:right;\\\">\"},{\"type\":\"insert\",\"insert\":30},{\"type\":\"magic\",\"content\":\"</td><td style=\\\"text-align:right;\\\">\"},{\"type\":\"insert\",\"insert\":31},{\"type\":\"magic\",\"content\":\"</td></tr>\"},\" \",{\"type\":\"magic\",\"content\":\"<tr><td style=\\\"text-align:left;\\\">D3 Vats</td><td style=\\\"text-align:right;\\\">\"},{\"type\":\"insert\",\"insert\":32},{\"type\":\"magic\",\"content\":\"</td><td style=\\\"text-align:right;\\\">\"},{\"type\":\"insert\",\"insert\":33},{\"type\":\"magic\",\"content\":\"</td><td style=\\\"text-align:right;\\\">\"},{\"type\":\"insert\",\"insert\":34},{\"type\":\"magic\",\"content\":\"</td><td style=\\\"text-align:right;\\\">\"},{\"type\":\"insert\",\"insert\":35},{\"type\":\"magic\",\"content\":\"</td><td style=\\\"text-align:right;\\\">\"},{\"type\":\"insert\",\"insert\":36},{\"type\":\"magic\",\"content\":\"</td></tr>\"},\" \",{\"type\":\"magic\",\"content\":\"<tr><td style=\\\"text-align:left;\\\">D4 Railyard</td><td style=\\\"text-align:right;\\\">\"},{\"type\":\"insert\",\"insert\":37},{\"type\":\"magic\",\"content\":\"</td><td style=\\\"text-align:right;\\\">\"},{\"type\":\"insert\",\"insert\":38},{\"type\":\"magic\",\"content\":\"</td><td style=\\\"text-align:right;\\\">\"},{\"type\":\"insert\",\"insert\":39},{\"type\":\"magic\",\"content\":\"</td><td style=\\\"text-align:right;\\\">\"},{\"type\":\"insert\",\"insert\":40},{\"type\":\"magic\",\"content\":\"</td><td style=\\\"text-align:right;\\\">\"},{\"type\":\"insert\",\"insert\":41},{\"type\":\"magic\",\"content\":\"</td></tr>\"},\" \",{\"type\":\"magic\",\"content\":\"<tr><td style=\\\"text-align:left;\\\">D5 Pitts</td><td style=\\\"text-align:right;\\\">\"},{\"type\":\"insert\",\"insert\":42},{\"type\":\"magic\",\"content\":\"</td><td style=\\\"text-align:right;\\\">\"},{\"type\":\"insert\",\"insert\":43},{\"type\":\"magic\",\"content\":\"</td><td style=\\\"text-align:right;\\\">\"},{\"type\":\"insert\",\"insert\":44},{\"type\":\"magic\",\"content\":\"</td><td style=\\\"text-align:right;\\\">\"},{\"type\":\"insert\",\"insert\":45},{\"type\":\"magic\",\"content\":\"</td><td style=\\\"text-align:right;\\\">\"},{\"type\":\"insert\",\"insert\":46},{\"type\":\"magic\",\"content\":\"</td></tr>\"},\" \",{\"type\":\"magic\",\"content\":\"<tr><td style=\\\"text-align:left;\\\">D6 Limelight</td><td style=\\\"text-align:right;\\\">\"},{\"type\":\"insert\",\"insert\":47},{\"type\":\"magic\",\"content\":\"</td><td style=\\\"text-align:right;\\\">\"},{\"type\":\"insert\",\"insert\":48},{\"type\":\"magic\",\"content\":\"</td><td style=\\\"text-align:right;\\\">\"},{\"type\":\"insert\",\"insert\":49},{\"type\":\"magic\",\"content\":\"</td><td style=\\\"text-align:right;\\\">\"},{\"type\":\"insert\",\"insert\":50},{\"type\":\"magic\",\"content\":\"</td><td style=\\\"text-align:right;\\\">\"},{\"type\":\"insert\",\"insert\":51},{\"type\":\"magic\",\"content\":\"</td></tr>\"},\" \",{\"type\":\"magic\",\"content\":\"<tr><td style=\\\"text-align:left;\\\">D7 Deeps</td><td style=\\\"text-align:right;\\\">\"},{\"type\":\"insert\",\"insert\":52},{\"type\":\"magic\",\"content\":\"</td><td style=\\\"text-align:right;\\\">\"},{\"type\":\"insert\",\"insert\":53},{\"type\":\"magic\",\"content\":\"</td><td style=\\\"text-align:right;\\\">\"},{\"type\":\"insert\",\"insert\":54},{\"type\":\"magic\",\"content\":\"</td><td style=\\\"text-align:right;\\\">\"},{\"type\":\"insert\",\"insert\":55},{\"type\":\"magic\",\"content\":\"</td><td style=\\\"text-align:right;\\\">\"},{\"type\":\"insert\",\"insert\":56},{\"type\":\"magic\",\"content\":\"</td></tr>\"},\" \",{\"type\":\"magic\",\"content\":\"</table>\"}]}],\"stateDependencies\":[{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['month'] || 0);\"},\"qdisplay\":\"month\"},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['year'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Exec_C'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Exec_G'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Exec_D'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Exec_H'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Exec_I'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Gold_C'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Gold_G'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Gold_D'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Gold_H'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Gold_I'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['White_C'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['White_G'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['White_D'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['White_H'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['White_I'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Blue_C'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Blue_G'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Blue_D'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Blue_H'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Blue_I'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Docks_C'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Docks_G'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Docks_D'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Docks_H'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Docks_I'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Aurora_C'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Aurora_G'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Aurora_D'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Aurora_H'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Aurora_I'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Vats_C'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Vats_G'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Vats_D'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Vats_H'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Vats_I'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Railyard_C'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Railyard_G'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Railyard_D'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Railyard_H'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Railyard_I'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Pitts_C'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Pitts_G'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Pitts_D'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Pitts_H'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Pitts_I'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Limelight_C'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Limelight_G'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Limelight_D'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Limelight_H'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Limelight_I'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Deeps_C'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Deeps_G'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Deeps_D'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Deeps_H'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['Deeps_I'] || 0);\"}}]}},\"magic.assimilate\":{\"id\":\"magic.assimilate\",\"title\":\"Assimilate magical traditions\",\"onArrival\":[{\"$code\":\"Q['magic_assimilate'] = (Q['magic_assimilate'] || 0) + 1;\"}],\"content\":{\"content\":\"\",\"type\":\"paragraph\"}},\"callista.callista_toggle_off\":{\"id\":\"callista.callista_toggle_off\",\"title\":\"Stop Purging Demons\",\"subtitle\":\"Appease the corporate drones\",\"viewIf\":{\"$code\":\"return ((Q['callista_toggle'] || 0)===1);\"},\"onArrival\":[{\"$code\":\"Q['callista_toggle'] = 0;\"}],\"options\":[{\"id\":\"@callista.callista_toggle_on\"},{\"id\":\"@return\"}],\"content\":{\"content\":\"Callista doesn't understand how anybody could leave computers in this state\",\"type\":\"paragraph\"}},\"callista\":{\"id\":\"callista\",\"type\":\"scene\",\"title\":\"Callista and Mei\",\"isPinnedCard\":true,\"tags\":[\"advisor\",\"tunnel_clans\"],\"cardImage\":\"img/callista.webp\",\"newPage\":true,\"options\":[{\"id\":\"@callista.callista_toggle_on\"},{\"id\":\"@callista.callista_toggle_off\"},{\"id\":\"@return\"}],\"content\":[{\"type\":\"heading\",\"content\":\"Callista and Mei\"},{\"type\":\"paragraph\",\"content\":\"Callista is a rare member of the \\\"Clans of the Mother\\\" who has left the deep tunnels and entered the city of Mikasa. Even rarer, she is not one of the comptrollers who handle monetary affairs, the first non-comptroller member of the Clans to visit Mikasa in at least a generation.\"},{\"type\":\"paragraph\",\"content\":\"Callista has been raised since birth to interact with AI, what the Clans call \\\"Guardian Spirits\\\". The Clans have zealously avoided the degredation that has affected other AI systems. Although there are substantial differences between the AI in Mikasa and Guardian Spirits, Callista could help us with fighting the system corruption which is slowly degrading our systems\"}]},\"jacobs.jacobs_renovate_of\":{\"id\":\"jacobs.jacobs_renovate_of\",\"title\":\"Stop streamlining\",\"subtitle\":\"Placate the deepers\",\"viewIf\":{\"$code\":\"return ((Q['jacobs_on'] || 0)===1);\"},\"onArrival\":[{\"$code\":\"Q['jacobs_on'] = 0;\"}],\"content\":{\"content\":\"\",\"type\":\"paragraph\"}},\"jacobs\":{\"id\":\"jacobs\",\"type\":\"scene\",\"title\":\"Jason Jacobs\",\"isPinnedCard\":true,\"tags\":[\"advisor\",\"nerds\"],\"cardImage\":\"img/asteroid.jpg\",\"newPage\":true,\"viewIf\":{\"$code\":\"return ((Q['jacobs_advisor'] || 0) > 0);\"},\"options\":[{\"id\":\"@jacobs.jacobs_renovate_on\"}],\"content\":[{\"type\":\"heading\",\"content\":\"Jason Jacobs\"},{\"type\":\"paragraph\",\"content\":\"Jason Jacobs is a software engineer from the Deeps with an obsessive hobby for urban planning. He was chased out of the Deeps after trying to implement \\\"guerilla urbanism\\\". He has abundent proposals for how we could streamline our infrastructure, but the deepers will be displeased by us associating with him\"}]},\"sage.sage_toggle_off\":{\"id\":\"sage.sage_toggle_off\",\"title\":\"Stop cultivating magic users\",\"viewIf\":{\"$code\":\"return ((Q['sage_toggle'] || 0)===1);\"},\"subtitle\":\"Placate the cooperatives\",\"onArrival\":[{\"$code\":\"Q['sage_toggle'] = 0;\"}],\"content\":{\"content\":\"\",\"type\":\"paragraph\"}},\"sage\":{\"id\":\"sage\",\"type\":\"scene\",\"title\":\"T. Sage\",\"isPinnedCard\":true,\"tags\":[\"advisor\",\"nerds\"],\"cardImage\":\"img/asteroid.jpg\",\"newPage\":true,\"viewIf\":{\"$code\":\"return ((Q['sage_advisor'] || 0) > 0);\"},\"options\":[{\"id\":\"@sage.sage_toggle_on\"},{\"id\":\"@sage.sage_toggle_off\"},{\"id\":\"@return\"}],\"content\":[{\"type\":\"heading\",\"content\":\"T. Sage\"},{\"type\":\"paragraph\",\"content\":\"The sage dresses like a vagrant but is one of the most experienced otherworld explorers in Mikasa.\"}]},\"stacy.stacy_toggle_off\":{\"id\":\"stacy.stacy_toggle_off\",\"title\":\"Lay low\",\"subtitle\":\"Stacy could annoy someone besides the corporations for a bit\",\"viewIf\":{\"$code\":\"return ((Q['stacy_toggle'] || 0)===1);\"},\"onArrival\":[{\"$code\":\"Q['stacy_toggle'] = 0;\"}],\"options\":[{\"id\":\"@stacy.stacy_toggle_on\"},{\"id\":\"@return\"}],\"content\":{\"content\":\"If Stacy doesn't have enemies available, she can always make more\",\"type\":\"paragraph\"}},\"stacy\":{\"id\":\"stacy\",\"type\":\"scene\",\"title\":\"Stacy Primogen (Titan's Strongest Daughter)\",\"isPinnedCard\":true,\"tags\":[\"advisor\",\"punk\"],\"cardImage\":\"img/stacy.webp\",\"newPage\":true,\"options\":[{\"id\":\"@stacy.stacy_toggle_on\"},{\"id\":\"@stacy.stacy_toggle_off\"},{\"id\":\"@return\"}],\"content\":[{\"type\":\"heading\",\"content\":\"Stacy Primogen\"},{\"type\":\"paragraph\",\"content\":\"Stacy Primogen is a second generation offspring of the Jovian supersoldier project, incubated into a plutocratic Jovian family of arms dealers, she struck out on her own to become a mercenary and influencer. She recently has started using the catch phrase \\\"Let's raise the stakes\\\" in an obvious but deniable reference to the Stakeholder movement.\"}]},\"security.improve_pay\":{\"id\":\"security.improve_pay\",\"title\":\"Improve pay and training\",\"onArrival\":[{\"$code\":\"Q['police_reform'] = (Q['police_reform'] || 0) + 1;\\n if (((Q['militia_police'] || 0) > 1) ) { Q['police_reform'] = (Q['police_reform'] || 0) + 1; } \\n if (((Q['police_defund'] || 0)===1) ) { Q['police_reform'] = (Q['police_reform'] || 0) + 1; }\"}],\"content\":{\"content\":[{\"type\":\"paragraph\",\"content\":\"Paying the police more then a poverty wage can make them less dependent on bribes.\"},{\"type\":\"paragraph\",\"content\":[{\"type\":\"conditional\",\"content\":\"We can hire more honest replacements for the police we previously purged. \",\"predicate\":0},\"\"]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"conditional\",\"content\":\"The local militia's serve as a recruiting pool for non corrupt security officers. \",\"predicate\":1},\"\"]}],\"stateDependencies\":[{\"type\":\"predicate\",\"fn\":{\"$code\":\"return (((Q['police_defund'] || 0)===1) && ((Q['militia_police'] || 0) < 2));\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return ((Q['militia_police'] || 0) > 1);\"}}]}},\"mss_dundalk_affair.anti_corp\":{\"id\":\"mss_dundalk_affair.anti_corp\",\"title\":\"Careful and circumspect criticism of the megacorps\",\"onArrival\":[{\"$code\":\"budget += 2;\\ndundalk_stakeholder += 1;\\nsoylent_anger +=0.10;\\nmagrail_anger += 0.10;\\nbrazos_anger += 0.10;\\nmartyrs.push(\\\"Aisha Renee\\\");\"}],\"content\":[{\"type\":\"paragraph\",\"content\":\"Overtly criticizing the megacorps would be a swift path to a slander trial. But the proliferation of euphemisms leaves room for plausible deniability. A common talking point is how we can't return to harmony until the people get what they are owed. The people understand the oblique meaning and get whipped up into a frenzy. The courts imprison several scapegoats and impound the Dundalk. At the impromptu celebrations afterwards people wonder if this might be the start of something more.\"},{\"type\":\"paragraph\",\"content\":\"The corporations understand the double meaning as well. Several speakers suffer from street crime in the weeks after the rally. A particularly inflamatory speaker named Aisha Renee dies in what is called a suicide and becomes immortalized as a martyr.\"}]},\"great_protector.token_tribute\":{\"id\":\"great_protector.token_tribute\",\"title\":\"A case of cola for peace is a bargain\",\"onArrival\":[],\"content\":{\"content\":\"\",\"type\":\"paragraph\"}},\"migrations.opportunity\":{\"id\":\"migrations.opportunity\",\"title\":\"...or another opportunity to sieze?\",\"content\":{\"content\":\"The solar system has shown little interest in the otherworld besides in the magical arts of it's people. An outreach effort could help us be less blind to affairs in the otherworld. The Uruk migrants in particular appear to have migrated great distances across the otherworld. A few community centers to teach languages and basic technical literacy go a long way towards winning over the population. Some do resent the otherworlder's for getting special accomodations when city services are so threadbare.\",\"type\":\"paragraph\"}},\"migrations\":{\"id\":\"migrations\",\"type\":\"scene\",\"title\":\"Otherworld migrations\",\"priority\":1,\"maxVisits\":1,\"tags\":[\"event\"],\"newPage\":true,\"viewIf\":{\"$code\":\"return (((Q['month'] || 0)===1) && ((Q['year'] || 0)===2300));\"},\"options\":[{\"id\":\"@migrations.problem\",\"title\":\"Another crisis to deal with...\"},{\"id\":\"@migrations.opportunity\",\"title\":\"...or another opportunity to sieze?\"}],\"content\":[{\"type\":\"paragraph\",\"content\":[\"Magical passages between Mikasa and the arcane Otherworld have existed since soon after colonization. The links between Mikasa and the Otherworld are not the most accessible or best travelled in the solar system but the Otherworlder population is proportonally large compared to the small population of Mikasa. The situation hasn't drawn much notice to date except for the thriving \",{\"type\":\"magic\",\"content\":\"<span class=\\\"tooltip-text\\\" style=\\\"color:rgba(149, 139, 0, 1);\\\" title=\\\"An non human sentient race from the otherworld, commonly called 'Elves' due to the cultural legacy of 20th century author and Otherworld explorer J.R.R. Tolkein.\\\">Kwendi</span>\"},\" resturaunt culture in the Docks district.\"]},{\"type\":\"paragraph\",\"content\":[\"Otherworld migration has changed of late. There are a larger number of otherworld travellers and an increase in \",{\"type\":\"magic\",\"content\":\"<span class=\\\"tooltip-text\\\" style=\\\"color:rgba(18, 44, 4, 1);\\\" title=\\\"A greyish-green skinned sentient race from the otherworld. They are frequently refered to by the racial slur 'Orcs' due to their close association with the sorcerers of the otherworld and their Orci creations. To the limited extent that Otherworld biology has been scientifically studied, no link has been found between Uruks and Orci.\\\">Uruks</span>\"},\". Our magical sages tell us the influx is driven by the overall trend towards travel getting easier (the long term cycle of otherworld alignment) and towards a new wave of demonic tyranny in the otherworld.\"]}],\"countVisitsMax\":1},\"militia_degrade.corrupt\":{\"id\":\"militia_degrade.corrupt\",\"title\":\"Crime is rising\",\"content\":{\"content\":\"Damn\",\"type\":\"paragraph\"}},\"great_protector_dispute.ignore\":{\"id\":\"great_protector_dispute.ignore\",\"title\":\"We wont curtail free speech\",\"onArrival\":[{\"$code\":\"Q.otherworld_outpost = 2\"}],\"content\":{\"content\":\"Our refusal is met with complete silence.\",\"type\":\"paragraph\"}},\"great_protector_dispute\":{\"id\":\"great_protector_dispute\",\"type\":\"scene\",\"title\":\"Dispute with Great Protector\",\"priority\":1,\"maxVisits\":1,\"tags\":[\"event\"],\"newPage\":true,\"viewIf\":{\"$code\":\"return ((((Q['month'] || 0)===6) && ((Q['year'] || 0)===2301)) && ((Q['otherworld_outpost'] || 0)===1));\"},\"options\":[{\"id\":\"@great_protector_dispute.silence\"},{\"id\":\"@great_protector_dispute.ignore\"}],\"content\":{\"content\":\"The Great Protector sent a diplomatic complaint alleging that our Otherworld outpost has been spreading seditious ideas. This could imperil our friendly relations.\",\"type\":\"paragraph\"},\"countVisitsMax\":1},\"orc_marriage2.civil_unions_modern\":{\"id\":\"orc_marriage2.civil_unions_modern\",\"onArrival\":[{\"$code\":\"Q['orc_marriage_civil'] = 1;\"},{\"$code\":\"// Q.first[\\\"Dems\\\"]+=.3 ; Q.alien[\\\"Dems\\\"]+=5 ; Q.second[\\\"Dems\\\"]+= -.3; Q.first[\\\"Hate\\\"]+=.1;\"}],\"options\":[{\"id\":\"@orc_marriage2.what_did_I_do\",\"title\":\"The F**** did we do?\"}],\"content\":[{\"type\":\"paragraph\",\"content\":\"Equality advocates are delighted by our boldness although we have alienated the anti-Otherworlder movements. The issue turns out to be moot though. The legislature not only overwhelmingly votes down our bill to start issueing civil union certificates, they also overwhelmingly vote down a compromise bill to simply comply with the court order. The megacorps aren't happy about this outcome and a Brazos Zaibatsu spokesperson even has the audacity to claim \\\"Brazos Zaibatsu strongly condemns the vote against this bill but at least this incident shows that three is no truth to the claim that the Mikasa legislative assembly is a rubber stamp for corporate interests.\\\"\"},{\"type\":\"paragraph\",\"content\":\"For what it's worth the voters seem to mostly blame the legislators who voted against the bill although the corporations somehow blame us for the failure.\"}]},\"september_convention.ban\":{\"id\":\"september_convention.ban\",\"content\":{\"content\":\"The academics are unhappy about academic freedom being curtailed. They blame both the megacorps and the city government.\",\"type\":\"paragraph\"}},\"cable_break.favor_brazos\":{\"id\":\"cable_break.favor_brazos\",\"title\":\"Create a space DMZ and urge a ceasefire inside Mikasa\",\"subtitle\":\"Brazos Zaibatsu would enjoy seeing CS and MC stay weak and distracted\",\"content\":{\"content\":\"The peace holds in space but the violence inside Mikasa barely abates. While Brazos Zaibatsu joins in the international condemenation of the ongoing conflict, they make it clear through backchannels and off the record communications that the appreciate this outcome.\",\"type\":\"paragraph\"}},\"refugees_otherworld.yay\":{\"id\":\"refugees_otherworld.yay\",\"title\":\"I guess variety is the spice of life\",\"content\":{\"content\":\"\",\"type\":\"paragraph\"}},\"refugees_otherworld\":{\"id\":\"refugees_otherworld\",\"type\":\"scene\",\"title\":\"And an Other refugee problem\",\"subtitle\":\"When it rains it pours\",\"priority\":1,\"maxVisits\":1,\"tags\":[\"event\"],\"viewIf\":{\"$code\":\"return (((Q['month'] || 0)===3) && ((Q['year'] || 0)===2300));\"},\"options\":[{\"id\":\"@refugees_otherworld.okay\"},{\"id\":\"@refugees_otherworld.yay\"}],\"content\":[{\"type\":\"paragraph\",\"content\":\"One of the most stable connections between our universe and the Otherworld is located in the Aurora district of Mikasa. Due to the connection linking to a relatively remote area of the otherworld the number of otherworld migrants has been fairly limited. Now the number of travellers has greatly increased, apparently a war between the demons has nearly depopulated one of the floating islands with refugees fleeing anywhere they can, including Mikasa.\"},{\"type\":\"paragraph\",\"content\":\"The scale of this migration is far smaller then the people fleeing Earth and Titan however the Otherworlders are far more difficult to integrate into Mikasa. Coming from the a world without technology they lack essential life skills. They are frequently recruited into the syndicates.\"}],\"countVisitsMax\":1},\"refugees_titan.slow\":{\"id\":\"refugees_titan.slow\",\"title\":\"Our systems can't handle more people\",\"onArrival\":[{\"$code\":\"Q['jovian_refugee_dread'] = (Q['jovian_refugee_dread'] || 0) + 1;\"}],\"content\":{\"content\":\"Our city is already faltering under the strain of providing safety and basic living conditions for our residents. There is no legal mechanism to keep the refugees out but we can try to encourage the refugees to keep travelling to reach the other, slightly wealthier interplanetary stations.\",\"type\":\"paragraph\"}},\"refugees_titan\":{\"id\":\"refugees_titan\",\"type\":\"scene\",\"title\":\"Attacks on Titan\",\"subtitle\":\"Jovian successor wars reignite\",\"priority\":5,\"maxVisits\":1,\"tags\":[\"event\"],\"viewIf\":{\"$code\":\"return (((Q['month'] || 0)===2) && ((Q['year'] || 0)===2300));\"},\"options\":[{\"id\":\"@refugees_titan.help\"},{\"id\":\"@refugees_titan.slow\"}],\"content\":[{\"type\":\"paragraph\",\"content\":\"The Jovian moons have developed a unique system of warfare since the collapse of the Jovian federation. The corporate councils ruling the moons allow acts of warfare by non-government bodies but have far ranging restrictions on what weapons can be used in order to limit property damage. Restrictions on munition weights coupled with the low gravity of the moons have made giant fighting robots the primary form of combat, not to mention a major source of media.\"},{\"type\":\"paragraph\",\"content\":\"The warfare between different clans of corporate sponsered mercenaries has long waxed and waned. After the discovery of valuable mineral rights in contested territory, a particularly vicious round of fighting has broken out all over the moon of Titan and even spilling over to other moons. With civilian casualties mounting, the number of refugees from the clan wars has grown. These refugees are stateless persons making Mikasa and the other interplanetary transit stations one of the few places they can flee to. Of the interplanetary transit stations, Mikasa is currently the one closest to Jupiter and thus the easiest to reach. It seems like Mikasa might be about to experience a third wave of mass migration.\"}],\"countVisitsMax\":1},\"peer_media.wealthy\":{\"id\":\"peer_media.wealthy\",\"title\":\"stress the need for self sufficiency and protection of businesses\",\"subtitle\":\"High skilled workers and cooperatives would like this but the establishment tone would be offputting to workers\",\"viewIf\":{\"$code\":\"return ((Q['self_sufficiency_media'] || 0)===0);\"},\"onArrival\":[{\"$code\":\"Q['self_sufficiency_media'] = (Q['self_sufficiency_media'] || 0) + 1;\"}],\"content\":{\"content\":\"Terrestrials or Martians might be surprised that discussions on IP restrictions on agrinutritional growth mediums can draw an audience but the matter is literally a matter of life and death for many in the cooperatives. The wealthy usually are hostile towards the cooperatives but the discussion creates some cross-class solidarity, at least among the non-shareholder wealthy.\",\"type\":\"paragraph\"}},\"activist_training.sabotage\":{\"id\":\"activist_training.sabotage\",\"title\":\"Deniable sabotage techniques\",\"chooseIf\":{\"$code\":\"return ((Q['sabotage'] || 0) < 3);\"},\"unavailableSubtitle\":\"We already have a well established doctrine\",\"onArrival\":[{\"$code\":\"Q['sabotage'] = (Q['sabotage'] || 0) + 1;\"}],\"content\":{\"content\":\"The corporations harshly punish destruction of property but the workers have developed a wide range of techniques to throw sand in the corporate gears that can't be traced.\",\"type\":\"paragraph\"}},\"contracting.big_3\":{\"id\":\"contracting.big_3\",\"title\":\"Big Three suppliers\",\"onArrival\":[{\"$code\":\"Q['contract_big3'] = (Q['contract_big3'] || 0) + 1;\"}],\"content\":{\"content\":\"\",\"type\":\"paragraph\"}},\"coop_economy.mother\":{\"id\":\"coop_economy.mother\",\"title\":\"Clans of mother outreach\",\"onArrival\":[{\"$code\":\"Q['coop_mother'] = (Q['coop_mother'] || 0) + 1;\"}],\"content\":{\"content\":\"\",\"type\":\"paragraph\"}},\"education.home_ec\":{\"id\":\"education.home_ec\",\"title\":\"Expand teaching of home economics skills like nutrition, health, electronics and mechanics\",\"content\":{\"content\":\"We strive to give students the skills to be more self reliant, making their food nuYen go farther, preventing health complications and repairing their home goods instead of buying new ones. The cooperatives approve of this curriculum and some of their home schooled students have started attending classes part time.\",\"type\":\"paragraph\"}},\"game_over.war_against_hitler\":{\"id\":\"game_over.war_against_hitler\",\"viewIf\":{\"$code\":\"return ((((Q['chancellor'] == \\\"Hitler\\\") || (Q['president'] == \\\"Hitler\\\"))) && (((Q['long_war'] || 0) == 1)));\"},\"title\":\"Adolf Hitler is in power, but we are fighting to stop him.\",\"tags\":[\"endings\"],\"goTo\":[{\"id\":\"game_over.eg_menu\"}],\"content\":{\"content\":\"Adolf Hitler has taken power in Germany. However, we have rallied the democratic forces of the country against him, and are fighting back. The outcome of this war is uncertain.\",\"type\":\"paragraph\"}},\"library.guilds_library\":{\"id\":\"library.guilds_library\",\"options\":[{\"id\":\"@library.menu\"},{\"id\":\"@backSpecialScene\",\"title\":\"Exit library.\"}],\"content\":[{\"type\":\"paragraph\",\"content\":\"The government of Mikasa recognizes 8 different trade organizations, informally called \\\"guilds\\\". These city government charter awards about a third of the government council voting power to the representatives of these groups. The groups are:\"},{\"type\":\"paragraph\",\"content\":\"Mikasan Financial Organization \\\"Gold Guild\\\": Due to Mikasa's history as a tax haven, there is a robust financial services and corporate arbitration sector. There are only a few thousand members of this trade organization, they heavily reflect corporate interests although not quite to the extent of the executive council. Unlike the executive council, this organization represents a large number of corporate subsidiaries, not just the Big Three.\"},{\"type\":\"paragraph\",\"content\":\"Mikasan Medical Association \\\"Pink Guild\\\": Although Mikasa's medical sector is anything but comprehensive, there is a thriving market for both cybernet augmentation (which is considerably less regulated then in other jurisdictions) and \\\"boutique\\\" medical services. This group tends to be upper middle class and tends to be one of the more progressive elements in the council. Tens of thousands of voting members.\"},{\"type\":\"paragraph\",\"content\":\"Mikasan Buisiness Association \\\"Platinum Guild\\\": Ostensibly to represent small business interests, this organization tends to be co-opted by corporations, usually the Big Three. A bit under 1000 voting members.\"},{\"type\":\"paragraph\",\"content\":\"Federated Professional Associations of Mikasa \\\"Blue Guild\\\": A trade association of industrial trades which provides certifications and apprenticeships in fields where the corporations need a trustworthy outside certification. Tens of thousands of voting members.\"},{\"type\":\"paragraph\",\"content\":\"Mikasan Federation of Trade Unions \\\"White Guild\\\": A \\\"Company Union\\\" of corporate (mostly white collar) workers, over 80% have lifetime contracts with the Big Three and most of the remainder are in Big Three employment. This group lacks any ability to organize collective action but the corporations sometimes find it useful to tolerate limited criticism from this group. Hundreds of thousands of voting members but turnout tends to be extremely low.\"},{\"type\":\"paragraph\",\"content\":\"Independent Contractors Association \\\"Grey Guild\\\": Originally this group was an association of Aurora Bank employees. Strangely when Aurora Bank disappeared, this organization did not. It still operates a headquarters in the Aurora district and tends to be a receptive forum for the use of independent contractors, a group that can range from luxury spacecraft detailers to professional assassins. The number of voting members of this secretive organization is unknown and thanks to their ties to the cities best intelligence operations their membership is unlikely to be known anytime soon.\"},{\"type\":\"paragraph\",\"content\":\"Public Image Council \\\"Green Guild\\\": Something much closer to a true small business organization then the Platinum Guild, this group represents hospitality, retail and longshore interests. Tens of thousands of voting members.\"},{\"type\":\"paragraph\",\"content\":\"Public Sector Union \\\"Biege Guild\\\": The asssociation of public sector employees, the largest union with collective bargaining powers in the city by far. Tens of thousands of voting members.\"}]},\"main.govt\":{\"id\":\"main.govt\",\"title\":\"Government Affairs\",\"cardImage\":\"img/chamber.jpg\",\"isDeck\":true,\"options\":[{\"id\":\"#govt_affairs\"}],\"content\":{\"content\":\"\",\"type\":\"paragraph\"}},\"root.start\":{\"id\":\"root.start\",\"onArrival\":[{\"$code\":\"Q.started = 1;\\nQ.time = 1;\\nQ.year = 2300;\\nQ.month = 1;\\nQ.month_actions = 0;\\nQ.parochialism = 25;\\nQ.parochial_radicalism = 0.65; // moderate radicalism → ~35% clawed back to Dems, rest stays on H\\n\\nQ.difficulty = 0;\\nQ.use_decimals = 0;\\n\\nQ.stacy_advisor = 1;\\n\\nQ.soylent_magrail_rel = -50\\nQ.soylent_brazos_rel = 10\\nQ.magrail_brazos_rel = 20\\n\\nQ.soylent_anger = 0.05;\\nQ.magrail_anger = 0.05;\\nQ.brazos_anger = 0.05;\\n\\nQ.martyrs = [];\\n\\nQ.government_families_rel = -75;\\nQ.government_edges_rel = 10;\\nQ.government_sharks_rel = 20;\\n\\nQ.soylent_families_rel = 20;\\nQ.soylent_edges_rel = 0;\\nQ.soylent_sharks_rel = 0;\\n\\nQ.magrail_families_rel = 10;\\nQ.magrail_edges_rel = 10;\\nQ.magrail_sharks_rel = 10;\\n\\nQ.brazos_families_rel = 10;\\nQ.brazos_edges_rel = -50;\\nQ.brazos_sharks_rel = 50;\"}],\"setBg\":\"img/solar_system.jpg\",\"newPage\":true,\"options\":[{\"id\":\"@root.2300_main\",\"title\":\"Begin (normal difficulty)\"}],\"content\":[{\"type\":\"quotation\",\"content\":[\"\",{\"type\":\"emphasis-1\",\"content\":\"\\\"They named it Mikasa, 'Beauty'\\\"\"},\" -Kenji Fukushima, JAXA engineer, 2115\"]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"emphasis-1\",\"content\":\"\\\"They named it Mikasa, 'Tragedy'\\\"\"},\" -Asani Ubuntu, Earth refugee, 2282\"]},{\"type\":\"paragraph\",\"content\":\"This is a game of future history. While historical accuracy is a major concern, scrying is an inexact science so large amounts of guesswork and interpolation were required.\"}]},\"magic.establish_school\":{\"id\":\"magic.establish_school\",\"title\":\"Establish a formal school\",\"onArrival\":[{\"$code\":\"Q['magic_school'] = (Q['magic_school'] || 0) + 1;\"}],\"content\":{\"content\":\"\",\"type\":\"paragraph\"}},\"magic\":{\"id\":\"magic\",\"type\":\"scene\",\"title\":\"Magic Policy\",\"newPage\":true,\"isCard\":true,\"cardImage\":\"img/asteroid.jpg\",\"tags\":[\"organize_phase\"],\"viewIf\":{\"$code\":\"return ((Q['organizing_unlock'] || 0)===1);\"},\"options\":[{\"id\":\"@magic.control\"},{\"id\":\"@magic.assimilate\"},{\"id\":\"@magic.establish_school\"}],\"content\":{\"content\":\"Mikasa has more magical users then most of the solar system thanks to passageways to the Otherworld in the Aurora district.\",\"type\":\"paragraph\"}},\"security.organize_militias\":{\"id\":\"security.organize_militias\",\"title\":\"Organize volunteer community militias to take over police duties\",\"chooseIf\":{\"$code\":\"return ((Q['corporate_long_leash'] || 0)===1);\"},\"unavailableSubtitle\":{\"content\":[{\"type\":\"conditional\",\"content\":\"The megacorps dont trust us enough to allow this. \",\"predicate\":0},{\"type\":\"conditional\",\"content\":\"There are limits to what volunteers can accomplish\",\"predicate\":1}],\"stateDependencies\":[{\"type\":\"predicate\",\"fn\":{\"$code\":\"return ((Q['corporate_long_leash'] || 0)===0);\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return ((Q['miltia'] || 0) >= 2);\"}}]},\"onArrival\":[{\"$code\":\"Q['megacorps_angry_TBD'] = (Q['megacorps_angry_TBD'] || 0) + 1;\\nQ['militia_police'] = (Q['militia_police'] || 0) + 1;\"}],\"content\":{\"content\":\"We have established volunteer neighborhood protection services. This is an alternative to the police but we should be careful about relying on them indefinitely, over time their strength will wane and they could turn into protection rackets themselves.\",\"type\":\"paragraph\"}},\"mss_dundalk_affair.anti_crime\":{\"id\":\"mss_dundalk_affair.anti_crime\",\"title\":\"Attack the criminal syndicates for eroding justice\",\"onArrival\":[{\"$code\":\"budget += 2;\\ndundalk_vigil += 1;\\nmartyrs.push(\\\"Alex Platea\\\");\"}],\"content\":[{\"type\":\"paragraph\",\"content\":\"The speakers shout vitrol at the gangsters while many in the crowds mutter under their breath that the corporations are gangsters under a different name. The courts cave and impound the vessel. At the impromptu celebrations afterwards people wonder if this might be the start of something more.\"},{\"type\":\"paragraph\",\"content\":\"Syndicate hitmen attempt to publicly assassinate a particularly inflamatory speaker named Aisha Lee but are thwarted and lynched by members of the crowd. A young person named Alex Platea dies stopping the assassination and becomes immortalized as a martyr.\"}]},\"great_protector.trade_links\":{\"id\":\"great_protector.trade_links\",\"title\":\"Dont stop at soda, let's establish trade relations\",\"chooseIf\":{\"$code\":\"return ((Q['otherworld_relations'] || 0) > 3);\"},\"unavailableSubtitle\":\"We dont know enough about the otherworld for this\",\"onArrival\":[],\"content\":{\"content\":\"Some of our consumer goods seem just as exotic to them as their magic seems to us.\",\"type\":\"paragraph\"}},\"militia_degrade.oversight\":{\"id\":\"militia_degrade.oversight\",\"title\":\"Have the police oversee them\",\"chooseIf\":{\"$code\":\"return ((Q['police_reform'] || 0) > 4);\"},\"unavailableSubtitle\":\"the police are too corrupt to trust\",\"onArrival\":[{\"$code\":\"Q['militia_auxiliary'] = 1;\"}],\"content\":{\"content\":\"Now that the police are reformed, the militia are turned into an auxiliary for the police.\",\"type\":\"paragraph\"}},\"militia_degrade\":{\"id\":\"militia_degrade\",\"type\":\"scene\",\"title\":\"Trouble maintaining militia's\",\"newPage\":true,\"isCard\":true,\"cardImage\":\"img/asteroid.jpg\",\"tags\":[\"govt_affairs\"],\"viewIf\":{\"$code\":\"return (((Q['militia'] || 0) >= 1) && ((Q['militia_auxiliary'] || 0) < 1));\"},\"options\":[{\"id\":\"@militia_degrade.decline\"},{\"id\":\"@militia_degrade.corrupt\"},{\"id\":\"@militia_degrade.oversight\"}],\"content\":{\"content\":\"Our militia forces are a stopgap security solution. There are reports of members drifting away and even accusations of militias organizing protection rackets.\",\"type\":\"paragraph\"}},\"orc_marriage2.civil_unions_orci\":{\"id\":\"orc_marriage2.civil_unions_orci\",\"onArrival\":[{\"$code\":\"Q['orc_marriage_wood'] = 1;\"},{\"$code\":\"// Q.first[\\\"Dems\\\"]-=.1 ; Q.alien[\\\"Dems\\\"]+=.2 ; Q.second[\\\"Dems\\\"]+= -.01\"}],\"options\":[{\"id\":\"@orc_marriage2.what_did_I_do\",\"title\":\"The F**** did we do?\"}],\"content\":[{\"type\":\"paragraph\",\"content\":\"Our party leadership make fools of themselves confusing Orci and Uruk rights. While the Orci may be created from sentient creatures, they lack free will due to the magic controlling them. The small Orci rights movement is not seeking for Orci to be treated as members of society but to be treated as compassion as souls (often the family of advocates) enslaved to a horrible fate. There aren't even any Orci in Mikasa in the first place but talking about them just emboldens the anti-Uruk movement which loves to use Orci as a bogeyman.\"},{\"type\":\"paragraph\",\"content\":\"Although the committee hastily corrects course and drafts a bill which does not conflate Orci with Uruks, the issue has blown up in our face. The solar system is laughing at us and the city legislature ignores the court order and overwhelmingly votes down all changes to the marriage laws.\"},{\"type\":\"paragraph\",\"content\":\"At least the whole debacle has distracted people from Mikasa's outdated marriage laws.\"}]},\"september_convention.permit\":{\"id\":\"september_convention.permit\",\"onArrival\":[{\"$code\":\"Q['patriot_meme_strength'] = (Q['patriot_meme_strength'] || 0) + 1;\"}],\"content\":{\"content\":\"The academics steer clear of any anticorporate speech. The largest impact of their discussion is greater awareness of the non-binary movement in Mikasa. Nativist elements have been latching onto the non-binary academic tradition in recent years and are slightly encouraged by this convention even though most academics reject the nativist interpretations.\",\"type\":\"paragraph\"}},\"september_convention\":{\"id\":\"september_convention\",\"type\":\"scene\",\"title\":\"September Convention\",\"priority\":1,\"maxVisits\":1,\"tags\":[\"event\"],\"newPage\":true,\"viewIf\":{\"$code\":\"return (((Q['month'] || 0)===2) && ((Q['year'] || 0)===2300));\"},\"options\":[{\"id\":\"@september_convention.explain\",\"title\":\"Um... could I get an explanation?\"},{\"id\":\"@september_convention.ban\",\"title\":\"Ban this conference. The Martians keep us out so turnabout is fair play.\"},{\"id\":\"@september_convention.permit\",\"title\":\"Allow it. Shareholders need to stop seeing stakeholders.\"}],\"content\":{\"content\":\"A September Conference has been scheduled for February 10th, right after the largest March celebration of the year and just before the Old Young Older eulogy. The Shareholders suspect the autodidactat of being an Autodidact while the academic community insists they should be treated as stakeholders because they are not Stakeholders. The March November insists Lunar heritage is Jovian and fear of Autodidactism should not create Autodictation.\",\"type\":\"paragraph\"},\"countVisitsMax\":1},\"cable_break.divide_and_conquer\":{\"id\":\"cable_break.divide_and_conquer\",\"title\":\"It would be useful if the negotiations weren't too successful\",\"subtitle\":\"Play them against each other\",\"content\":{\"content\":\"The violence continues both in space and in the city. The corporations grudgingly agree to an expansion of city policy forces to serve as peacekeepers and enforce DMZs. Community Soylent and Magrail Combine are angry but they still need the government and hate each other more for now.\",\"type\":\"paragraph\"}},\"cable_break\":{\"id\":\"cable_break\",\"type\":\"scene\",\"title\":\"The Rupture\",\"subtitle\":\"Tether snaps the political scene\",\"priority\":5,\"maxVisits\":1,\"tags\":[\"event\"],\"viewIf\":{\"$code\":\"return (((Q['month'] || 0)===6) && ((Q['year'] || 0)===2301));\"},\"options\":[{\"id\":\"@cable_break.full_peace\"},{\"id\":\"@cable_break.favor_brazos\"},{\"id\":\"@cable_break.divide_and_conquer\"}],\"content\":[{\"type\":\"paragraph\",\"content\":[\"Shockwaves were sent through the Mikasa docks today as the primary trunkline of the tethers was broken. Corporate warfare between Community Soylent and Magrail Combine flared up violently due to a dispute over the space freighter MSS Dundalk. The violence not only happened within Mikasa but also spilled over into a shootout between their respective navies. Several of the tethers which serve to accelerate travel between the inner and outer solar system were damaged, including the primary trunk. This has sent shockwaves throughout the solar system, the \",{\"type\":\"magic\",\"content\":\"<span class=\\\"tooltip-text\\\" style=\\\"color:rgba(8, 99, 111, 1);\\\" title=\\\"Largest Terrestrial Stock Exchange.\\\">EUNDX</span>\"},\" and \",{\"type\":\"magic\",\"content\":\"<span class=\\\"tooltip-text\\\" style=\\\"color:rgba(112, 6, 0, 1);\\\" title=\\\"Largest Martian Stock Exchange.\\\">MDEX</span>\"},\" indexes both fell nearly 5% in daily trading.\"]},{\"type\":\"paragraph\",\"content\":\"Amidst the combined fury of the solar system's interstellar conglomerates, the two megacorps are willing to deescalate tensions. A neutral party is needed and with all three Megacorps distrusting each other, allowing the city government to enforce the peace has been accepted as a compromise. We will need to form a governing coalition but the first order of business will be in arbitrating terms of ceasefire.\"}],\"countVisitsMax\":1},\"peer_media.diplomatic\":{\"id\":\"peer_media.diplomatic\",\"title\":\"discussion of Mikasa's place in the solar system economy and negotiations with megacorps\",\"subtitle\":\"We might be able to negotiate with corps in good faith, but any economic compromise would undermine self sufficiency\",\"onArrival\":[{\"$code\":\"Q['kiss_ass_media'] = (Q['kiss_ass_media'] || 0) + 1;\"}],\"content\":{\"content\":\"Most people aren't interested in solarpolitical theory crafting but the podcast crowd keeps talking about it. It doesn't move the needle on public opinion but maybe some good ideas will emerge from it.\",\"type\":\"paragraph\"}},\"peer_media\":{\"id\":\"peer_media\",\"type\":\"scene\",\"title\":\"Media ideology\",\"newPage\":true,\"isCard\":true,\"cardImage\":\"img/asteroid.jpg\",\"tags\":[\"party_affairs\"],\"options\":[{\"id\":\"@peer_media.labor\"},{\"id\":\"@peer_media.wealthy\"},{\"id\":\"@peer_media.diplomatic\"}],\"content\":[{\"type\":\"paragraph\",\"content\":\"There are few proper outlets on Mikasa, the corporations shut down any independent competition with their propoganda that is too successful. A handful of small outlets get by under the radar of the megacorps but most independent journalists rely on annonymous online peer to peer networks to get their reporting out. Since most members of this small community follow each other's stories, the zeitgeist of the underground media shifts from time to time.\"},{\"type\":\"paragraph\",\"content\":\"Depending on what topics the underground is most interested in, different groups might become politically active. What topics is the underground covering?\"}]},\"activist_training.defense\":{\"id\":\"activist_training.defense\",\"title\":\"Community self defense\",\"chooseIf\":{\"$code\":\"return ((Q['militia'] || 0) < 3);\"},\"unavailableSubtitle\":\"We've already built up the militia\",\"onArrival\":[{\"$code\":\"Q['militia'] = (Q['militia'] || 0) + 1;\"}],\"content\":{\"content\":\"We have established local community watch efforts to try to protect the citizens from crime.\",\"type\":\"paragraph\"}},\"activist_training\":{\"id\":\"activist_training\",\"type\":\"scene\",\"title\":\"Movement Organizing\",\"newPage\":true,\"isCard\":true,\"cardImage\":\"img/asteroid.jpg\",\"tags\":[\"organize_phase\"],\"viewIf\":{\"$code\":\"return ((Q['organizing_unlock'] || 0)===1);\"},\"options\":[{\"id\":\"@activist_training.nonviolence\"},{\"id\":\"@activist_training.sabotage\"},{\"id\":\"@activist_training.defense\"}],\"content\":{\"content\":\"Turn popular support into power.\",\"type\":\"paragraph\"}},\"contracting.petty_capitalists\":{\"id\":\"contracting.petty_capitalists\",\"title\":\"Petty capitalists\",\"onArrival\":[{\"$code\":\"Q['contract_petty'] = (Q['contract_petty'] || 0) + 1;\"}],\"content\":{\"content\":\"\",\"type\":\"paragraph\"}},\"coop_economy.investment\":{\"id\":\"coop_economy.investment\",\"title\":\"Self-sufficiency investments\",\"onArrival\":[{\"$code\":\"Q['coop_investment'] = (Q['coop_investment'] || 0) + 1;\"}],\"content\":{\"content\":\"\",\"type\":\"paragraph\"}},\"coop_economy\":{\"id\":\"coop_economy\",\"type\":\"scene\",\"title\":\"Cooperatives organizing\",\"newPage\":true,\"isCard\":true,\"cardImage\":\"img/asteroid.jpg\",\"tags\":[\"organize_phase\"],\"viewIf\":{\"$code\":\"return ((Q['organizing_unlock'] || 0)===1);\"},\"options\":[{\"id\":\"@coop_economy.markets\"},{\"id\":\"@coop_economy.mother\"},{\"id\":\"@coop_economy.investment\"}],\"content\":{\"content\":\"The cooperatives are the bedrock of the non-corporate economy on Mikasa. Cooperatives tend to be semi-insular groups that live together, strive for self sufficiency and have an established trade to bring in outside revenues.\",\"type\":\"paragraph\"}},\"education.well_rounded\":{\"id\":\"education.well_rounded\",\"title\":\"Provide a well rounded education\",\"content\":{\"content\":\"We are laying the foundation for a true public education system. This is an expensive choice but will improve education outcomes across the board in the long term. This is particularly beneficial for the otherworld population.\",\"type\":\"paragraph\"}},\"game_over.no_hitler\":{\"id\":\"game_over.no_hitler\",\"viewIf\":{\"$code\":\"return ((((Q['chancellor'] != \\\"Hitler\\\") && (Q['president'] != \\\"Hitler\\\")) && (Q['president'] != \\\"Göring\\\")) && (Q['chancellor_party'] != \\\"NSDAP\\\"));\"},\"title\":\"Hitler does not yet control Germany...\",\"tags\":[\"endings\"],\"goTo\":[{\"id\":\"game_over.eg_menu\"}],\"content\":{\"content\":[{\"type\":\"paragraph\",\"content\":[\"Hitler does not yet control Germany. \",{\"type\":\"conditional\",\"content\":\"However, Chancellor Papen's authoritarianism and far-right politics are paving the way for Hitler, or someone like him, to take power. \",\"predicate\":0},\" \",{\"type\":\"conditional\",\"content\":\"However, Chancellor Schleicher's authoritarianism and scheming is paving the way for Hitler, or someone like him, to take power. \",\"predicate\":1},{\"type\":\"conditional\",\"content\":\"Given our defeat in the Prussian coup, the far-right appears to be ascendant. \",\"predicate\":2},{\"type\":\"conditional\",\"content\":\"However, Chancellor Brüning's austerity policies and the continuation of the depression are paving the way for Hitler, or someone like him, to take power. \",\"predicate\":3},\"\"]},{\"type\":\"paragraph\",\"content\":{\"type\":\"conditional\",\"content\":\"We have deported Hitler back to Austria. Hopefully he will never return.\",\"predicate\":4}}],\"stateDependencies\":[{\"type\":\"predicate\",\"fn\":{\"$code\":\"return (Q['chancellor'] == \\\"Papen\\\");\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return (Q['chancellor'] == \\\"Schleicher\\\");\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return (((((Q['resist_coup'] || 0) == 1) && ((Q['republic_victory'] || 0) == 0)) && ((Q['long_war'] || 0) == 0)) && ((Q['coup_victory'] || 0) == 0));\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return (Q['chancellor'] == \\\"Brüning\\\");\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return ((Q['hitler_deported'] || 0) == 1);\"}}]}},\"library.districts_library\":{\"id\":\"library.districts_library\",\"options\":[{\"id\":\"@library.menu\"},{\"id\":\"@backSpecialScene\",\"title\":\"Exit library.\"}],\"content\":[{\"type\":\"paragraph\",\"content\":\"The Docks: The oldest and wealthiest part of Mikasa, clustered around the tethers which give Mikasa it's role as a trade hub. Both wealthy Mikasans and expatriates live here and it has a bustling industry of luxury services.\"},{\"type\":\"paragraph\",\"content\":\"Aurora: The eyeline of Aurora is dominated by the forbidden Aurora Pyramid, headquarters of the Aurora bank before it's mysterious dissolution. The other corporations have mostly been kept out of this district by the independent minded communities of the area. Some of the solar system's most elite high end craftspeople and services operate out of the Aurora district yet there are also places (such as the Aurora Pyramid) that have been abandoned to vagrants. This district has the second most independent communes after the Deeps.\"},{\"type\":\"paragraph\",\"content\":\"The Pits: The rusted out remnents of Mikasa's mining and refining industries long ago. Today it's a brutal warzone and most people here are those with nowhere else to go.\"},{\"type\":\"paragraph\",\"content\":\"The Deeps: Originally an independent city from Mikasa, the Deeps still resent their annexation. This community is highly insular and highly independent. The Deeps will do things differently from Mikasa simply for the sake of doing things differently, for instance they keep their standard gravity plate orientation 165 degrees off station standard orientation, meaning all travel into or out of the Deeps requires a flip.\"},{\"type\":\"paragraph\",\"content\":\"The Vats: Dominated by the corporate compounds of the megacorp Community Soylent. Large export industry of GMO foodstuffs (guarenteed to put a smile on your face thanks to psychoactive bacterial cultures). Since the conflict between Community Soylent and the Magrail Combine, this district has been moving towards a bunker mentality, structures are fortified and the population is highly suspicious of outsiders.\"},{\"type\":\"paragraph\",\"content\":\"Limelight: The home turf of the electronics powerhouse Brazos Zaibatsu. Cheap digital displays cover every available surface in this district, constantly playing public domain media and corporate propoganda.\"},{\"type\":\"paragraph\",\"content\":\"The Railyard: Dominated by the corporate compounds of the megacorp Magrail Combine. The best armed district in Mikasa, they take a pride in displaying the signiture product of their flagship corporation. Their open carry culture tends to make outsiders stay away.\"},{\"type\":\"paragraph\",\"content\":\"The Outside: small independent communities call The Clans of The Mother inhabit tunnels throughout Mikasa. Their communities are seperated by sections of vacuum and operate autonomously. They make The Deeps look cosmopolitan by comparison and dont accept outside currency. The clans are unusually proficient at homegrown AI they call Guardian Spirits but are homocidally suspicious of artificial intelligence that they did not make themselves.\"}]},\"library\":{\"id\":\"library\",\"type\":\"scene\",\"title\":\"library\",\"newPage\":true,\"isSpecial\":true,\"goTo\":[{\"id\":\"library.menu\"}],\"content\":{\"type\":\"heading\",\"content\":\"The Library\"}},\"main.violence\":{\"id\":\"main.violence\",\"title\":\"Corp/Syndicate Violence\",\"cardImage\":\"img/collapse.jpg\",\"isDeck\":true,\"options\":[{\"id\":\"#govt_affairs\"}],\"content\":{\"content\":\"\",\"type\":\"paragraph\"}},\"main\":{\"id\":\"main\",\"type\":\"scene\",\"title\":\"Main\",\"setBg\":\"img/solar_system.jpg\",\"isHand\":true,\"maxCards\":3,\"onDisplay\":[{\"$code\":\"if (typeof Q.ensureBuildStampFooter === 'function') { Q.ensureBuildStampFooter() }\"}],\"options\":[{\"id\":\"@main.party\"},{\"id\":\"@main.govt\"},{\"id\":\"@advance\"},{\"id\":\"#advisor\"}],\"content\":{\"content\":\"\",\"type\":\"paragraph\"}},\"root.2300_main\":{\"id\":\"root.2300_main\",\"newPage\":true,\"onArrival\":[{\"$code\":\"Q.assignSeatsFromInitialPolling();\"}],\"goTo\":[{\"id\":\"main\",\"predicate\":{\"$code\":\"return ((Q['difficulty'] || 0) >= 0);\"}},{\"id\":\"main.main_easy\",\"predicate\":{\"$code\":\"return ((Q['difficulty'] || 0) < 0);\"}}],\"content\":[{\"type\":\"heading\",\"content\":\"2300\"},{\"type\":\"paragraph\",\"content\":\"It is a dark time for humanity. Earth is mired in endless national conflicts while the off planet colonies are torn by violence between lawless corporations.\"},{\"type\":\"paragraph\",\"content\":\"As the corporations of the interplanetary waystation Mikasa become too distracted fighting each other, real power has started to fall into the hands of the city government for the first time in decades. Now our task is to somehow maintain this newfound autonomy while beating back corruption. Perhaps Mikasa might one day control the corporations instead of the other way around.\"}]},\"root\":{\"id\":\"root\",\"type\":\"scene\",\"title\":\"Root Scene\",\"newPage\":true,\"goTo\":[{\"id\":\"post_event\",\"predicate\":{\"$code\":\"return ((Q['started'] || 0)===1);\"}},{\"id\":\"root.start_menu\",\"predicate\":{\"$code\":\"return ((Q['started'] || 0)===0);\"}}],\"onArrival\":[{\"$code\":\"// Election v2 — IG floor + competitive softmax. Keep in sync with source/lib/election-v2.js\\n// CLI: npm run simulate-election:v2\\n\\n(function initMikasaElectionV2() {\\n\\nconst VOTE_TO_PARTY = { Dems: \\\"D\\\", Ind: \\\"I\\\", Corp: \\\"C\\\", Gang: \\\"G\\\", Hate: \\\"H\\\" }\\n\\nconst PARTY_KEYS = ['D', 'I', 'C', 'G', 'H']\\nconst PARTY_LABELS = {\\n    D: 'Dems',\\n    I: 'Ind',\\n    C: 'Corp',\\n    G: 'Gang',\\n    H: 'Hate',\\n}\\n\\nconst STRATUM_IDS = ['rich', 'first', 'second', 'coop', 'drone', 'alien', 'deeper']\\n\\nconst STRATUM_DISPLAY = {\\n    rich: 'Rich',\\n    first: 'First',\\n    second: 'Second',\\n    coop: 'Clans',\\n    drone: 'Corp Drone',\\n    alien: 'Otherworlder',\\n    deeper: 'Deepers',\\n}\\n\\nconst DISTRICT_IDS = [\\n    'Docks', 'Aurora', 'Vats', 'Railyard', 'Pitts', 'Limelight', 'Deeps',\\n]\\n\\nconst DISTRICT_DISPLAY = {\\n    Docks: 'District 1 (The Docks)',\\n    Aurora: 'District 2 (Aurora District)',\\n    Vats: 'District 3 (The Vats)',\\n    Railyard: 'District 4 (The Railyard)',\\n    Pitts: 'District 5 (The Pitts)',\\n    Limelight: 'District 6 (The Limelight)',\\n    Deeps: 'District 7 (The Deeps)',\\n}\\n\\n/** Home-district multiplier for IG membership share in that district. */\\nconst DISTRICT_IG_BOOST = {\\n    Soylent: { Vats: 1.4, Railyard: 1.25, Docks: 1.1 },\\n    Magrail: { Railyard: 1.35, Docks: 1.3, Aurora: 1.1 },\\n    Brazos: { Limelight: 1.4, Vats: 1.15, Pitts: 1.1 },\\n    Families: { Pitts: 1.5, Aurora: 1.2, Docks: 1.15 },\\n    Edges: { Aurora: 1.35, Railyard: 1.2, Limelight: 1.15 },\\n    Sharks: { Pitts: 1.6, Limelight: 1.2, Deeps: 1.1 },\\n}\\n\\nconst EXEC_SEATS = 150\\nconst GUILD_SEATS = 35\\nconst DISTRICT_SEATS = 15\\nconst VOTE_SCALE = 10000\\n\\n// --- utilities ----------------------------------------------------------------\\n\\nconst sum = (nums) => nums.reduce((a, b) => a + b, 0)\\n\\nconst zeroPartyVotes = () => ({ D: 0, I: 0, C: 0, G: 0, H: 0 })\\n\\nfunction assign_percentages(rawByParty, nSeats) {\\n    const raw = PARTY_KEYS.map((k) => rawByParty[k] || 0)\\n    const total = sum(raw)\\n    if (total === 0 || nSeats === 0) {\\n        return Object.fromEntries(PARTY_KEYS.map((k) => [k, 0]))\\n    }\\n    const votesPerSeat = total / nSeats\\n    const remainders = raw.map((v) => v % votesPerSeat)\\n    const whole = raw.map((v, i) => (v - remainders[i]) / votesPerSeat)\\n    let unassigned = nSeats - sum(whole.map(Math.floor))\\n    const rem = remainders.slice()\\n    for (let i = 0; i < unassigned; i++) {\\n        const idx = rem.reduce((best, x, j, arr) => (x > arr[best] ? j : best), 0)\\n        whole[idx] += 1\\n        rem[idx] = 0\\n    }\\n    return Object.fromEntries(PARTY_KEYS.map((k, i) => [k, Math.round(whole[i])]))\\n}\\n\\nfunction softmax(scores, temperature = 1) {\\n    const keys = PARTY_KEYS\\n    const exps = keys.map((k) => Math.exp((scores[k] || 0) / temperature))\\n    const total = sum(exps) || 1\\n    return Object.fromEntries(keys.map((k, i) => [k, exps[i] / total]))\\n}\\n\\n/** Legacy vote-label appeals (Dems, Corp, …) → competitive logit scale. */\\nconst APPEAL_TO_SCORE = 0.05\\n\\nfunction applyAppealsTo(target, labels, values) {\\n    for (let i = 0; i < labels.length; i++) {\\n        target[labels[i]] = values[i] || 0\\n    }\\n}\\n\\nfunction voteLabelAppealsToScores(entity) {\\n    const scores = zeroPartyVotes()\\n    for (const [label, party] of Object.entries(VOTE_TO_PARTY)) {\\n        scores[party] = (entity[label] || 0) * APPEAL_TO_SCORE\\n    }\\n    return scores\\n}\\n\\nfunction syncVoteAppealsToCompetitive(entity) {\\n    const base = entity._baseCompetitiveScores || zeroPartyVotes()\\n    const fromAppeals = voteLabelAppealsToScores(entity)\\n    entity.competitiveScores = {}\\n    for (const k of PARTY_KEYS) {\\n        entity.competitiveScores[k] = (base[k] || 0) + (fromAppeals[k] || 0)\\n    }\\n}\\n\\nfunction syncGlobalVoteAppeals(state, labels, shifts) {\\n    const base = state._baseGlobalScores || zeroPartyVotes()\\n    const row = Object.fromEntries(labels.map((l, i) => [l, shifts[i] || 0]))\\n    const fromAppeals = voteLabelAppealsToScores(row)\\n    state.global.competitiveScores = {}\\n    for (const k of PARTY_KEYS) {\\n        state.global.competitiveScores[k] = (base[k] || 0) + (fromAppeals[k] || 0)\\n    }\\n}\\n\\nfunction syncAllVoteAppeals(stratums, state, labels, globalShifts) {\\n    for (const s of stratums) {\\n        syncVoteAppealsToCompetitive(s)\\n    }\\n    if (state) {\\n        syncGlobalVoteAppeals(state, labels, globalShifts)\\n    }\\n}\\n\\n// --- VoterBlock: demographic × district only ----------------------------------\\n\\nclass VoterBlock {\\n    constructor(demographic, district, population) {\\n        this.demographic = demographic\\n        this.district = district\\n        this.population = population\\n        /** Competitive party scores (events modify these). */\\n        this.competitiveScores = { D: 0, I: 0, C: 0, G: 0, H: 0 }\\n        /** Fringe=low steepness, mainstream=high. */\\n        this.competitiveSteepness = { D: 1, I: 1, C: 1, G: 1, H: 1 }\\n        demographic.blocks.push(this)\\n        district.blocks.push(this)\\n    }\\n\\n    get id() {\\n        return `${this.district.id}_${this.demographic.id}`\\n    }\\n}\\n\\nclass Demographic {\\n    constructor(id, config, appeals) {\\n        this.id = id\\n        this.blocks = []\\n        this.competitiveScores = Object.assign(\\n            { D: 0, I: 0, C: 0, G: 0, H: 0 },\\n            config.competitiveScores || {}\\n        )\\n        this.competitiveSteepness = Object.assign(\\n            { D: 1, I: 1, C: 1, G: 1, H: 1 },\\n            config.competitiveSteepness || {}\\n        )\\n        this._baseCompetitiveScores = Object.assign({}, this.competitiveScores)\\n        /** Max share of this stratum claimed by all IGs combined (rest = competitive). */\\n        this.igClaimCap = config.igClaimCap ?? 0.5\\n        this.executiveWeight = config.executiveWeight ?? 1\\n        /** Optional BLOCK_VOTE_RULES key, e.g. 'corp_or_abstain' for drones. */\\n        this.voteRule = config.voteRule || null\\n        if (appeals) {\\n            applyAppealsTo(this, Q.vote_labels, appeals)\\n            syncVoteAppealsToCompetitive(this)\\n        }\\n        this.name = this.id\\n        Q.stratums.push(this)\\n        Q.lookups[this.id] = this\\n        Q[this.id] = this\\n    }\\n}\\n\\nclass District {\\n    constructor(id, populations, config) {\\n        this.id = id\\n        this.blocks = []\\n        this.populations = populations\\n        this.competitiveScores = Object.assign(\\n            { D: 0, I: 0, C: 0, G: 0, H: 0 },\\n            config.competitiveScores || {}\\n        )\\n        this._baseCompetitiveScores = Object.assign({}, this.competitiveScores)\\n        this.competitiveTurnoutBonus = config.competitiveTurnoutBonus ?? 0\\n        this.lowTurnoutGangBonus = config.lowTurnoutGangBonus ?? 0\\n        this.electionMonth = config.electionMonth ?? 1\\n        this.name = this.id\\n        for (let i = 0; i < Q.stratum_labels.length; i++) {\\n            this[Q.stratum_labels[i]] = populations[i] || 0\\n        }\\n        Q.regions.push(this)\\n        Q.lookups[this.id] = this\\n        Q[this.id] = this\\n    }\\n}\\n\\n/**\\n * Interest group: claims a fraction of each stratum and votes with a fixed party mix.\\n * @param {object} config\\n * @param {'corporate'|'syndicate'|'guild'} config.kind\\n * @param {number[]} config.membership - per-stratum share (of entire stratum) in this IG\\n * @param {object} config.partyShares - D,I,C,G,H summing ~1\\n */\\nclass InterestGroup {\\n    constructor(id, config) {\\n        this.id = id\\n        this.kind = config.kind\\n        this.membership = config.membership || STRATUM_IDS.map(() => 0)\\n        this.partyShares = normalizeShares(config.partyShares || { C: 1 })\\n        this.turnout = config.turnout ?? 0.9\\n        this.guildSeatKey = config.guildSeatKey || null\\n    }\\n\\n    /** Effective membership in a block (national share × district home boost, capped). */\\n    effectiveMembership(block) {\\n        const idx = STRATUM_IDS.indexOf(block.demographic.id)\\n        const base = this.membership[idx] || 0\\n        const boost = (DISTRICT_IG_BOOST[this.id] || {})[block.district.id] || 1\\n        return base * boost\\n    }\\n}\\n\\nfunction normalizeShares(shares) {\\n    const total = sum(PARTY_KEYS.map((k) => shares[k] || 0)) || 1\\n    return Object.fromEntries(PARTY_KEYS.map((k) => [k, (shares[k] || 0) / total]))\\n}\\n\\n// --- chamber config -----------------------------------------------------------\\n\\nconst CHAMBERS = {\\n    executive: {\\n        seats: EXEC_SEATS,\\n        prefix: 'Exec',\\n        elects: 'global',\\n        igKinds: ['corporate', 'syndicate', 'guild'],\\n        igTurnoutMult: 1,\\n        competitiveTurnout: 0.35,\\n        useExecutiveWeight: true,\\n    },\\n    guild: {\\n        seats: GUILD_SEATS,\\n        elects: 'perGuild',\\n        igKinds: ['guild'],\\n        igTurnoutMult: 1.1,\\n        competitiveTurnout: 0.05,\\n        useExecutiveWeight: false,\\n    },\\n    district: {\\n        seats: DISTRICT_SEATS,\\n        elects: 'perDistrict',\\n        igKinds: ['corporate', 'syndicate'],\\n        igTurnoutMult: 0.85,\\n        competitiveTurnout: 0.4,\\n        useExecutiveWeight: false,\\n    },\\n}\\n\\n// --- world bootstrap ----------------------------------------------------------\\n\\nfunction buildInterestGroups() {\\n    const z = () => STRATUM_IDS.map(() => 0)\\n\\n    return [\\n        // Corporate shareholder blocs (→ Corp)\\n        new InterestGroup('Soylent', {\\n            kind: 'corporate',\\n            membership: [0.08, 0.02, 0.01, 0, 0.22, 0, 0],\\n            partyShares: { C: 0.92, I: 0.05, D: 0.02, G: 0, H: 0.01 },\\n            turnout: 0.95,\\n        }),\\n        new InterestGroup('Magrail', {\\n            kind: 'corporate',\\n            membership: [0.06, 0.02, 0.01, 0, 0.18, 0, 0],\\n            partyShares: { C: 0.9, I: 0.06, D: 0.03, G: 0, H: 0.01 },\\n            turnout: 0.93,\\n        }),\\n        new InterestGroup('Brazos', {\\n            kind: 'corporate',\\n            membership: [0.07, 0.02, 0.02, 0, 0.15, 0, 0],\\n            partyShares: { C: 0.88, I: 0.07, D: 0.03, G: 0.01, H: 0.01 },\\n            turnout: 0.92,\\n        }),\\n\\n        // Criminal syndicate blocs (→ Gang)\\n        new InterestGroup('Families', {\\n            kind: 'syndicate',\\n            membership: [0.02, 0.04, 0.08, 0.01, 0.01, 0, 0],\\n            partyShares: { G: 0.85, H: 0.05, D: 0.05, C: 0.03, I: 0.02 },\\n            turnout: 0.88,\\n        }),\\n        new InterestGroup('Edges', {\\n            kind: 'syndicate',\\n            membership: [0.01, 0.05, 0.07, 0.01, 0.01, 0, 0],\\n            partyShares: { G: 0.82, H: 0.04, D: 0.06, C: 0.05, I: 0.03 },\\n            turnout: 0.86,\\n        }),\\n        new InterestGroup('Sharks', {\\n            kind: 'syndicate',\\n            membership: [0.01, 0.03, 0.1, 0, 0.01, 0, 0],\\n            partyShares: { G: 0.88, H: 0.06, D: 0.03, C: 0.02, I: 0.01 },\\n            turnout: 0.9,\\n        }),\\n\\n        // Guild blocs (guild chamber; also add executive floor)\\n        new InterestGroup('Executive', {\\n            kind: 'guild',\\n            membership: [0.35, 0.01, 0, 0, 0.02, 0, 0],\\n            partyShares: { C: 0.75, I: 0.1, D: 0.05, G: 0.05, H: 0.05 },\\n            turnout: 0.98,\\n            guildSeatKey: null,\\n        }),\\n        new InterestGroup('Gold', {\\n            kind: 'guild',\\n            membership: [0.15, 0.01, 0, 0, 0, 0, 0],\\n            partyShares: { C: 0.7, I: 0.15, D: 0.05, G: 0.05, H: 0.05 },\\n            turnout: 0.96,\\n            guildSeatKey: 'Gold',\\n        }),\\n        new InterestGroup('White', {\\n            kind: 'guild',\\n            membership: [0, 0.12, 0.04, 0.01, 0, 0, 0],\\n            partyShares: { D: 0.35, I: 0.2, C: 0.2, G: 0.1, H: 0.15 },\\n            turnout: 0.94,\\n            guildSeatKey: 'White',\\n        }),\\n        new InterestGroup('Blue', {\\n            kind: 'guild',\\n            membership: [0, 0.05, 0.1, 0.02, 0.08, 0, 0],\\n            partyShares: { D: 0.45, I: 0.15, C: 0.15, G: 0.15, H: 0.1 },\\n            turnout: 0.92,\\n            guildSeatKey: 'Blue',\\n        }),\\n    ]\\n}\\n\\nconst DEMO_APPEALS = {\\n    rich: [0, 0, 0, 6, 1, 0, 2],\\n    first: [1, 2, 0, 1, -3, 0, 5],\\n    second: [2, 1, 0, 0, 2, 0, 6],\\n    coop: [2, 0, 20, -3, -3, 0, 6],\\n    drone: [3, 0, 0, 3, 2, 0, 2],\\n    alien: [2, 0, 0, -6, -3, 0, 9],\\n    deeper: [2, 36, -5, 2, -2, 0, 6],\\n}\\n\\nfunction buildDemographics() {\\n    return STRATUM_IDS.map((id) => {\\n        const configs = {\\n            rich: {\\n                igClaimCap: 0.88,\\n                executiveWeight: 3,\\n                competitiveScores: { D: -1, C: 1, I: 0.5, G: -0.5, H: 0 },\\n                competitiveSteepness: { D: 0.4, C: 1.2, G: 0.5, H: 0.5 },\\n            },\\n            first: {\\n                igClaimCap: 0.45,\\n                executiveWeight: 1.2,\\n                competitiveScores: { D: 0.5, C: -0.5, G: 0, H: -0.5 },\\n            },\\n            second: {\\n                igClaimCap: 0.38,\\n                competitiveScores: { D: 0.8, C: -0.8, G: 0.2, H: 0 },\\n            },\\n            coop: {\\n                igClaimCap: 0.35,\\n                competitiveScores: { D: 1, C: -1.5, G: -0.5, H: -0.5 },\\n            },\\n            drone: {\\n                igClaimCap: 0.8,\\n                executiveWeight: 0.6,\\n                voteRule: 'corp_or_abstain',\\n                competitiveScores: { D: 0.2, C: 1.5, G: 0.3, H: 0 },\\n                competitiveSteepness: { D: 0.3, C: 1 },\\n            },\\n            alien: {\\n                igClaimCap: 0.25,\\n                competitiveScores: { D: 1.2, H: -1, G: -0.5, C: -0.5 },\\n            },\\n            deeper: {\\n                igClaimCap: 0.3,\\n                executiveWeight: 0.8,\\n                competitiveScores: { D: 1.5, I: 1, C: -1, G: -0.5, H: -0.5 },\\n            },\\n        }\\n        return new Demographic(id, configs[id] || {}, DEMO_APPEALS[id])\\n    })\\n}\\n\\nfunction buildDistricts() {\\n    const pops = [\\n        [17, 42, 30, 1, 11, 1, 1],\\n        [0, 58, 57, 1, 2, 9, 3],\\n        [1, 8, 11, 1, 48, 0, 1],\\n        [0, 12, 10, 1, 52, 0, 1],\\n        [0, 28, 71, 1, 2, 0, 1],\\n        [1, 19, 22, 1, 55, 0, 1],\\n        [1, 24, 17, 3, 1, 1, 166],\\n    ]\\n    const configs = {\\n        Docks: { electionMonth: 3, competitiveScores: { C: 0.3, G: 0.2 } },\\n        Aurora: { electionMonth: 6, competitiveScores: { D: 0.2, I: 0.2 } },\\n        Vats: { electionMonth: 9, competitiveScores: { C: 0.8, D: -0.3 } },\\n        Railyard: { electionMonth: 12, competitiveScores: { C: 0.6, G: 0.1 } },\\n        Pitts: {\\n            electionMonth: 2,\\n            competitiveScores: { G: 0.5, D: 0.2 },\\n            competitiveTurnoutBonus: -0.15,\\n            lowTurnoutGangBonus: 1.2,\\n        },\\n        Limelight: { electionMonth: 5, competitiveScores: { C: 0.4, G: 0.3 } },\\n        Deeps: { electionMonth: 8, competitiveScores: { D: 0.6, I: 0.4, H: -0.3 } },\\n    }\\n    return DISTRICT_IDS.map((id, i) => new District(id, pops[i], configs[id] || {}))\\n}\\n\\nfunction buildVoterBlocks(demographics, districts) {\\n    const blocks = []\\n    for (const district of districts) {\\n        for (let s = 0; s < STRATUM_IDS.length; s++) {\\n            const pop = district.populations[s]\\n            if (pop > 0) {\\n                blocks.push(new VoterBlock(demographics[s], district, pop))\\n            }\\n        }\\n    }\\n    return blocks\\n}\\n\\n// --- tabulation ---------------------------------------------------------------\\n\\nfunction blockCompetitiveScores(block, state) {\\n    const scores = zeroPartyVotes()\\n    for (const k of PARTY_KEYS) {\\n        scores[k] =\\n            (block.demographic.competitiveScores[k] || 0)\\n            + (block.district.competitiveScores[k] || 0)\\n            + (block.competitiveScores[k] || 0)\\n            + (state.global.competitiveScores[k] || 0)\\n    }\\n    return scores\\n}\\n\\nfunction blockSteepness(block) {\\n    const out = {}\\n    for (const k of PARTY_KEYS) {\\n        out[k] =\\n            (block.demographic.competitiveSteepness[k] || 1)\\n            * (block.competitiveSteepness[k] || 1)\\n    }\\n    return out\\n}\\n\\n/** Sum of IG membership shares for this block, capped by demographic igClaimCap. */\\nfunction claimedFraction(block, interestGroups, chamber) {\\n    const igs = interestGroups.filter((ig) => chamber.igKinds.includes(ig.kind))\\n    let raw = sum(igs.map((ig) => ig.effectiveMembership(block)))\\n    return Math.min(raw, block.demographic.igClaimCap)\\n}\\n\\n/**\\n * Per–interest-group IG ballots from one VoterBlock (before party split).\\n * @returns {{ contributions: Array, votes: object }}\\n */\\nfunction igContributionsForBlock(block, interestGroups, chamber, state) {\\n    const votes = zeroPartyVotes()\\n    const contributions = []\\n    const igs = interestGroups.filter((ig) => chamber.igKinds.includes(ig.kind))\\n    const pop = block.population * VOTE_SCALE\\n    const cap = block.demographic.igClaimCap\\n    const rawShares = igs.map((ig) => ig.effectiveMembership(block))\\n    const rawTotal = sum(rawShares) || 1\\n    const scale = rawTotal > cap ? cap / rawTotal : 1\\n    const turnoutMult =\\n        chamber.igTurnoutMult * (state.global.igTurnoutMult || 1)\\n\\n    for (let i = 0; i < igs.length; i++) {\\n        const ig = igs[i]\\n        const rawShare = rawShares[i]\\n        const scaledShare = rawShare * scale\\n        const ballots = pop * scaledShare * ig.turnout * turnoutMult\\n        const igVotes = zeroPartyVotes()\\n        for (const k of PARTY_KEYS) {\\n            igVotes[k] = ballots * ig.partyShares[k]\\n            votes[k] += igVotes[k]\\n        }\\n        if (ballots <= 0 && rawShare <= 0) { continue }\\n        contributions.push({\\n            igId: ig.id,\\n            igKind: ig.kind,\\n            blockId: block.id,\\n            district: block.district.id,\\n            demographic: block.demographic.id,\\n            demographicLabel: STRATUM_DISPLAY[block.demographic.id] || block.demographic.id,\\n            population: block.population,\\n            rawMembership: rawShare,\\n            scaledMembership: scaledShare,\\n            ballots,\\n            votes: igVotes,\\n        })\\n    }\\n    return { contributions, votes }\\n}\\n\\nfunction allocateIgVotes(block, interestGroups, chamber, state) {\\n    return igContributionsForBlock(block, interestGroups, chamber, state).votes\\n}\\n\\n/**\\n * Aggregate IG-determined ballots by interest group and source VoterBlock.\\n * @param {object} state\\n * @param {string} chamberId\\n * @param {{ minBallots?: number }} options\\n */\\nfunction buildIgBlockTabulation(state, chamberId = 'executive', options = {}) {\\n    const chamber = CHAMBERS[chamberId]\\n    const minBallots = options.minBallots ?? 1\\n    const byIg = {}\\n\\n    for (const ig of state.interestGroups) {\\n        if (!chamber.igKinds.includes(ig.kind)) { continue }\\n        byIg[ig.id] = {\\n            igId: ig.id,\\n            igKind: ig.kind,\\n            partyShares: Object.assign({}, ig.partyShares),\\n            totalBallots: 0,\\n            totalVotes: zeroPartyVotes(),\\n            blocks: [],\\n            zeroBlocks: [],\\n        }\\n    }\\n\\n    const includeZeroBlocks = options.includeZeroBlocks === true\\n    const igById = Object.fromEntries(\\n        state.interestGroups.map((ig) => [ig.id, ig])\\n    )\\n\\n    for (const block of state.blocks) {\\n        const { contributions } = igContributionsForBlock(\\n            block, state.interestGroups, chamber, state\\n        )\\n        const contributedIg = new Set()\\n        for (const row of contributions) {\\n            if (row.ballots < minBallots) { continue }\\n            contributedIg.add(row.igId)\\n            const bucket = byIg[row.igId]\\n            if (!bucket) { continue }\\n            bucket.blocks.push(row)\\n            bucket.totalBallots += row.ballots\\n            for (const k of PARTY_KEYS) {\\n                bucket.totalVotes[k] += row.votes[k]\\n            }\\n        }\\n        if (includeZeroBlocks) {\\n            for (const igId of Object.keys(byIg)) {\\n                if (contributedIg.has(igId)) { continue }\\n                const ig = igById[igId]\\n                byIg[igId].zeroBlocks.push({\\n                    blockId: block.id,\\n                    district: block.district.id,\\n                    demographic: block.demographic.id,\\n                    demographicLabel:\\n                        STRATUM_DISPLAY[block.demographic.id] || block.demographic.id,\\n                    population: block.population,\\n                    rawMembership: ig ? ig.effectiveMembership(block) : 0,\\n                })\\n            }\\n        }\\n    }\\n\\n    const blockSort = (a, b) =>\\n        a.district.localeCompare(b.district)\\n        || a.demographic.localeCompare(b.demographic)\\n\\n    for (const igId of Object.keys(byIg)) {\\n        byIg[igId].blocks.sort((a, b) => b.ballots - a.ballots)\\n        if (includeZeroBlocks) {\\n            byIg[igId].zeroBlocks.sort(blockSort)\\n        }\\n    }\\n\\n    return { chamberId, chamberLabel: chamberId, byIg }\\n}\\n\\nfunction competitiveTurnout(block, chamber, state) {\\n    let t = chamber.competitiveTurnout * (state.global.competitiveTurnout || 1)\\n    t += block.district.competitiveTurnoutBonus || 0\\n    t += state.global.competitiveTurnoutBonus || 0\\n    if (t < 0.05) { t = 0.05 }\\n    if (t > 1) { t = 1 }\\n    return t\\n}\\n\\nfunction allocateCompetitiveVotes(block, interestGroups, chamber, state) {\\n    const votes = zeroPartyVotes()\\n    const claimed = claimedFraction(block, interestGroups, chamber)\\n    const competitivePop = block.population * (1 - claimed) * VOTE_SCALE\\n    if (competitivePop <= 0) { return votes }\\n\\n    let turnout = competitiveTurnout(block, chamber, state)\\n    // Low turnout helps gangs in syndicate turf (Pitts)\\n    if (block.district.lowTurnoutGangBonus && turnout < 0.45) {\\n        state._gangLowTurnoutBoost = block.district.lowTurnoutGangBonus\\n    }\\n\\n    const scores = blockCompetitiveScores(block, state)\\n    const steep = blockSteepness(block)\\n    const weighted = {}\\n    for (const k of PARTY_KEYS) {\\n        let s = (scores[k] || 0) * (steep[k] || 1)\\n        if (k === 'G' && state._gangLowTurnoutBoost) {\\n            s += state._gangLowTurnoutBoost\\n        }\\n        weighted[k] = s\\n    }\\n    state._gangLowTurnoutBoost = 0\\n\\n    const shares = softmax(weighted, state.global.softmaxTemperature || 1)\\n    const ballots = competitivePop * turnout\\n    for (const k of PARTY_KEYS) {\\n        votes[k] += ballots * shares[k]\\n    }\\n    return votes\\n}\\n\\n/** Non-Corp ballots abstain (not counted); Corp (C) unchanged. */\\nfunction corpOrAbstainPartyVotes(votes) {\\n    const out = zeroPartyVotes()\\n    out.C = votes.C || 0\\n    return out\\n}\\n\\nfunction sumPartyVoteObjects(a, b) {\\n    const out = zeroPartyVotes()\\n    for (const k of PARTY_KEYS) {\\n        out[k] = (a[k] || 0) + (b[k] || 0)\\n    }\\n    return out\\n}\\n\\n/** Megacorp drone contracts: competitive and IG splits may only add Corp votes; all else abstains. */\\n/** TODO: when the corporations have three different parties, the drones will be restricted for\\ntheir own employer, potentially allowing lower turnout for one corporation then another */\\nfunction applyDroneCorpOrAbstainRule(block, result, state, chamber) {\\n    if (block.demographic.voteRule !== 'corp_or_abstain') { return result }\\n    result.ig = corpOrAbstainPartyVotes(result.ig)\\n    result.comp = corpOrAbstainPartyVotes(result.comp)\\n    result.total = sumPartyVoteObjects(result.ig, result.comp)\\n    return result\\n}\\n\\nconst BLOCK_VOTE_RULES = [\\n    applyDroneCorpOrAbstainRule,\\n]\\n\\nfunction applyBlockVoteRules(block, result, state, chamber) {\\n    for (let r = 0; r < BLOCK_VOTE_RULES.length; r++) {\\n        result = BLOCK_VOTE_RULES[r](block, result, state, chamber) || result\\n    }\\n    return result\\n}\\n\\nfunction tabulateBlockWithAbstention(block, interestGroups, chamber, state) {\\n    const ig = allocateIgVotes(block, interestGroups, chamber, state)\\n    const comp = allocateCompetitiveVotes(block, interestGroups, chamber, state)\\n    const preRule = sumPartyVoteObjects(ig, comp)\\n    let result = {\\n        ig,\\n        comp,\\n        total: preRule,\\n    }\\n    result = applyBlockVoteRules(block, result, state, chamber)\\n    const weight = chamber.useExecutiveWeight ? block.demographic.executiveWeight : 1\\n    let ballotMass = sum(PARTY_KEYS.map((k) => preRule[k] || 0))\\n    let countedMass = sum(PARTY_KEYS.map((k) => result.total[k] || 0))\\n    if (weight !== 1) {\\n        ballotMass *= weight\\n        for (const k of PARTY_KEYS) {\\n            result.total[k] = (result.total[k] || 0) * weight\\n        }\\n        countedMass = sum(PARTY_KEYS.map((k) => result.total[k] || 0))\\n    }\\n    return {\\n        ig: result.ig,\\n        comp: result.comp,\\n        total: result.total,\\n        ballotMass,\\n        countedMass,\\n        abstentionMass: Math.max(0, ballotMass - countedMass),\\n    }\\n}\\n\\nfunction tabulateBlock(block, interestGroups, chamber, state) {\\n    const t = tabulateBlockWithAbstention(block, interestGroups, chamber, state)\\n    return { ig: t.ig, comp: t.comp, total: t.total }\\n}\\n\\nclass ElectionEngineV2 {\\n    constructor(state) {\\n        this.state = state\\n    }\\n\\n    runChamber(chamberId, options = {}) {\\n        const chamber = CHAMBERS[chamberId]\\n        const { interestGroups, blocks, districts } = this.state\\n        const totals = zeroPartyVotes()\\n        const byDistrict = {}\\n        const byGuild = { Gold: zeroPartyVotes(), White: zeroPartyVotes(), Blue: zeroPartyVotes() }\\n\\n        const activeBlocks =\\n            options.districtId\\n                ? blocks.filter((b) => b.district.id === options.districtId)\\n                : blocks\\n\\n        for (const block of activeBlocks) {\\n            const { ig, comp, total } = tabulateBlock(\\n                block, interestGroups, chamber, this.state\\n            )\\n            for (const k of PARTY_KEYS) {\\n                totals[k] += total[k]\\n            }\\n            if (chamber.elects === 'perDistrict') {\\n                const d = block.district.id\\n                if (!byDistrict[d]) { byDistrict[d] = zeroPartyVotes() }\\n                for (const k of PARTY_KEYS) {\\n                    byDistrict[d][k] += total[k]\\n                }\\n            }\\n            if (chamber.elects === 'perGuild') {\\n                for (const igroup of interestGroups) {\\n                    if (igroup.kind !== 'guild' || !igroup.guildSeatKey) { continue }\\n                    const mem = igroup.effectiveMembership(block) * block.population * VOTE_SCALE\\n                    for (const k of PARTY_KEYS) {\\n                        byGuild[igroup.guildSeatKey][k] += mem * igroup.partyShares[k]\\n                    }\\n                }\\n            }\\n        }\\n\\n        if (chamber.elects === 'global') {\\n            return { votes: totals, seats: assign_percentages(totals, chamber.seats) }\\n        }\\n        if (chamber.elects === 'perDistrict') {\\n            const seats = {}\\n            for (const d of Object.keys(byDistrict)) {\\n                seats[d] = assign_percentages(byDistrict[d], chamber.seats)\\n            }\\n            return { byDistrict, seats }\\n        }\\n        if (chamber.elects === 'perGuild') {\\n            const seats = {}\\n            for (const g of ['Gold', 'White', 'Blue']) {\\n                seats[g] = assign_percentages(byGuild[g], chamber.seats)\\n            }\\n            return { byGuild, seats }\\n        }\\n        return { votes: totals }\\n    }\\n\\n    runAll(options = {}) {\\n        const month = options.month ?? 1\\n        const results = {\\n            executive: this.runChamber('executive'),\\n            guild: this.runChamber('guild'),\\n            districts: {},\\n        }\\n        for (const district of this.state.districts) {\\n            if (district.electionMonth === month || options.allDistricts) {\\n                results.districts[district.id] = this.runChamber('district', {\\n                    districtId: district.id,\\n                })\\n            }\\n        }\\n        return results\\n    }\\n\\n    writeToQ(Q, results) {\\n        const ex = results.executive.seats\\n        for (const k of PARTY_KEYS) {\\n            Q['Exec_' + k] = ex[k]\\n        }\\n        for (const g of ['Gold', 'White', 'Blue']) {\\n            const seats = results.guild.seats[g]\\n            for (const k of PARTY_KEYS) {\\n                Q[g + '_' + k] = seats[k]\\n            }\\n        }\\n        for (const d of DISTRICT_IDS) {\\n            const run = results.districts[d]\\n            if (!run) { continue }\\n            const seats = run.seats[d]\\n            for (const k of PARTY_KEYS) {\\n                Q[d + '_' + k] = seats[k]\\n            }\\n        }\\n    }\\n}\\n\\nfunction votesToPollPercents(votes) {\\n    const total = sum(PARTY_KEYS.map((k) => votes[k] || 0))\\n    const out = {}\\n    for (const k of PARTY_KEYS) {\\n        out[k] = total > 0 ? Math.round(((votes[k] || 0) / total) * 1000) / 10 : 0\\n    }\\n    return out\\n}\\n\\n/** Popular-vote shares for status polls tab (district / general-electorate model). */\\nfunction writePollDisplaysToQ(Q, state, results) {\\n    const chamber = CHAMBERS.district\\n    const citywide = zeroPartyVotes()\\n    for (const did of DISTRICT_IDS) {\\n        const run = results.districts[did]\\n        if (run && run.byDistrict && run.byDistrict[did]) {\\n            for (const k of PARTY_KEYS) {\\n                citywide[k] += run.byDistrict[did][k] || 0\\n            }\\n        }\\n    }\\n    if (sum(PARTY_KEYS.map((k) => citywide[k])) === 0) {\\n        for (const block of state.blocks) {\\n            const { total } = tabulateBlock(\\n                block, state.interestGroups, chamber, state\\n            )\\n            for (const k of PARTY_KEYS) {\\n                citywide[k] += total[k] || 0\\n            }\\n        }\\n    }\\n    const cityPct = votesToPollPercents(citywide)\\n    for (const k of PARTY_KEYS) {\\n        Q['poll_exec_' + k] = cityPct[k]\\n    }\\n    const byStratum = {}\\n    for (const sid of STRATUM_IDS) {\\n        byStratum[sid] = zeroPartyVotes()\\n    }\\n    for (const block of state.blocks) {\\n        const { total } = tabulateBlock(\\n            block, state.interestGroups, chamber, state\\n        )\\n        const sid = block.demographic.id\\n        for (const k of PARTY_KEYS) {\\n            byStratum[sid][k] += total[k] || 0\\n        }\\n    }\\n    for (const sid of STRATUM_IDS) {\\n        if (sid === 'drone') { continue }\\n        const pct = votesToPollPercents(byStratum[sid] || zeroPartyVotes())\\n        for (const k of PARTY_KEYS) {\\n            Q[sid + '_poll_' + k] = pct[k]\\n        }\\n    }\\n    let droneBallotMass = 0\\n    let droneCorpMass = 0\\n    let droneAbstainMass = 0\\n    for (const block of state.blocks) {\\n        if (block.demographic.id !== 'drone') { continue }\\n        const t = tabulateBlockWithAbstention(\\n            block, state.interestGroups, chamber, state\\n        )\\n        droneBallotMass += t.ballotMass\\n        droneCorpMass += t.total.C || 0\\n        droneAbstainMass += t.abstentionMass\\n    }\\n    const dronePct = (mass) =>\\n        droneBallotMass > 0 ? Math.round((mass / droneBallotMass) * 1000) / 10 : 0\\n    Q.drone_poll_C = dronePct(droneCorpMass)\\n    Q.drone_poll_abstain = dronePct(droneAbstainMass)\\n    for (const k of PARTY_KEYS) {\\n        if (k !== 'C') {\\n            Q['drone_poll_' + k] = 0\\n        }\\n    }\\n    for (const did of DISTRICT_IDS) {\\n        let votes = zeroPartyVotes()\\n        const run = results.districts[did]\\n        if (run && run.byDistrict && run.byDistrict[did]) {\\n            votes = run.byDistrict[did]\\n        } else {\\n            for (const block of state.blocks) {\\n                if (block.district.id !== did) { continue }\\n                const { total } = tabulateBlock(\\n                    block, state.interestGroups, chamber, state\\n                )\\n                for (const k of PARTY_KEYS) {\\n                    votes[k] += total[k] || 0\\n                }\\n            }\\n        }\\n        const pct = votesToPollPercents(votes)\\n        for (const k of PARTY_KEYS) {\\n            Q[did + '_poll_' + k] = pct[k]\\n        }\\n    }\\n}\\n\\nfunction qified_pops(state) {\\n    for (const block of state.blocks) {\\n        Q[block.district.id + \\\"_\\\" + block.demographic.id + \\\"_pop\\\"] = block.population\\n    }\\n}\\n\\nQ.stratum_labels = STRATUM_IDS.slice()\\nQ.vote_labels = [\\\"Dems\\\", \\\"Ind\\\", \\\"Corp\\\", \\\"Gang\\\", \\\"Hate\\\", \\\"Swing\\\", \\\"Apathy\\\"]\\nQ.global_shifts = [0, -20, 0, -1, -3, 0, 0]\\nQ.lookups = {}\\nQ.stratums = []\\nQ.regions = []\\nQ.interests = []\\nQ.voter_blocks = []\\n\\nconst demographics = buildDemographics()\\nconst districts = buildDistricts()\\nconst interestGroups = buildInterestGroups()\\nQ.interest_labels = interestGroups.map((ig) => ig.id)\\nconst blocks = buildVoterBlocks(demographics, districts)\\n\\nconst electionState = {\\n    demographics,\\n    districts,\\n    interestGroups,\\n    blocks,\\n    global: {\\n        competitiveTurnout: 1,\\n        igTurnoutMult: 1,\\n        competitiveTurnoutBonus: 0,\\n        competitiveScores: zeroPartyVotes(),\\n        softmaxTemperature: 1,\\n    },\\n}\\nelectionState._baseGlobalScores = Object.assign({}, electionState.global.competitiveScores)\\n\\nconst engine = new ElectionEngineV2(electionState)\\n\\n/** Held council seats (Exec_*, Gold_*, Docks_*, …) — only updated when commitSeats is true. */\\nfunction writeCommittedSeatsToQ(Q, results) {\\n    engine.writeToQ(Q, results)\\n}\\n\\n/** Latest tabulation for election sim / debugging (Proj_*); refreshed every update_projections. */\\nfunction writeProjectionSeatsToQ(Q, results) {\\n    const ex = results.executive.seats\\n    for (const k of PARTY_KEYS) {\\n        Q['Proj_Exec_' + k] = ex[k]\\n    }\\n    for (const g of ['Gold', 'White', 'Blue']) {\\n        const seats = results.guild.seats[g]\\n        for (const k of PARTY_KEYS) {\\n            Q['Proj_' + g + '_' + k] = seats[k]\\n        }\\n    }\\n    for (const d of DISTRICT_IDS) {\\n        const run = results.districts[d]\\n        if (!run) { continue }\\n        const seats = run.seats[d]\\n        for (const k of PARTY_KEYS) {\\n            Q['Proj_' + d + '_' + k] = seats[k]\\n        }\\n    }\\n}\\n\\nfunction runElectionsAndWriteQ(opts) {\\n    opts = opts || {}\\n    // Appeals first; story-stack modifiers add on top (see post_event applyElectorateModifiers).\\n    syncAllVoteAppeals(Q.stratums, electionState, Q.vote_labels, Q.global_shifts)\\n    if (typeof Q.applyElectorateModifiers === 'function') {\\n        Q.applyElectorateModifiers()\\n    }\\n    const results = engine.runAll({\\n        month: opts.month != null ? opts.month : (Q.month || 1),\\n        allDistricts: opts.allDistricts !== false,\\n    })\\n    if (opts.commitSeats) {\\n        writeCommittedSeatsToQ(Q, results)\\n    }\\n    writeProjectionSeatsToQ(Q, results)\\n    writePollDisplaysToQ(Q, electionState, results)\\n    qified_pops(electionState)\\n    Q.electionResults = results\\n    return results\\n}\\n\\nQ.stratumDisplay = STRATUM_DISPLAY\\nQ.districtDisplay = DISTRICT_DISPLAY\\n\\nrunElectionsAndWriteQ({ allDistricts: true, commitSeats: false })\\n\\nQ.electionV2 = electionState\\nQ.electionEngine = engine\\nQ.electorate = engine\\nQ.voter_blocks = blocks\\nQ.qified_pops = function() { qified_pops(electionState) }\\nQ.update_projections = function(opts) {\\n    return runElectionsAndWriteQ(Object.assign({ commitSeats: false }, opts || {}))\\n}\\nQ.assignSeatsFromInitialPolling = function() {\\n    return runElectionsAndWriteQ({ month: 1, allDistricts: true, commitSeats: true })\\n}\\nengine.assign_seats = function(opts) {\\n    return runElectionsAndWriteQ(Object.assign({ commitSeats: true }, opts || {}))\\n}\\n\\n// ElectorateModifier catalog lives in post_event.scene.dry; stub until that scene runs.\\nQ.electorateModifierCatalog = []\\nQ.applyElectorateModifiers = function() {}\\n\\n})()\\n\\nQ.ensureBuildStampFooter = function() {\\n    if (typeof document === 'undefined') { return }\\n    var id = 'mikasa-build-stamp'\\n    var el = document.getElementById(id)\\n    var stampStyle = 'position:fixed;bottom:8px;right:10px;z-index:9999;pointer-events:none;font:11px/1.4 ui-monospace,monospace;color:#ccc;background:rgba(0,0,0,0.55);padding:2px 6px;border-radius:3px;text-align:right;text-shadow:none;-webkit-font-smoothing:antialiased;'\\n    if (!el) {\\n        el = document.createElement('div')\\n        el.id = id\\n        document.body.appendChild(el)\\n    }\\n    el.style.cssText = stampStyle\\n    el.textContent = 'Build: ' + (Q.build_time_label || 'unknown')\\n}\\n// MIKASA_BUILD_STAMP\\nQ.build_time_label = '2026-05-22 13:25:01 local';\\n// /MIKASA_BUILD_STAMP\\nQ.ensureBuildStampFooter()\"}],\"content\":{\"content\":\"\",\"type\":\"paragraph\"}},\"security.investigation\":{\"id\":\"security.investigation\",\"title\":\"Start a discrete investigation\",\"subtitle\":\"Who watches the watchman?\",\"chooseIf\":{\"$code\":\"return ((Q['police_investigated'] || 0)===0);\"},\"onArrival\":[{\"$code\":\"Q['police_reform'] = (Q['police_reform'] || 0) + 1;\\n if (((Q['police_reform'] || 0) > 1) ) { Q['police_reform'] = (Q['police_reform'] || 0) + 1; } \\n if (((Q['police_reform'] || 0) > 1) ) { Q['megacorps_angry_TBD'] = (Q['megacorps_angry_TBD'] || 0) + 1; } \\nQ['police_investigated'] = 1;\"}],\"content\":{\"content\":[{\"type\":\"paragraph\",\"content\":[{\"type\":\"conditional\",\"content\":\"Finding corrupt police is like shooting fish in a barrel. Our investigation unit makes dozens of arrest before word gets out and the corrupt officials get better at covering their tracks. \",\"predicate\":0},\"\"]},{\"type\":\"paragraph\",\"content\":{\"type\":\"conditional\",\"content\":\"Two gunshots ring out from a highrise appartment in the docks district in the early hours of the morning. Two bodies go flying through the window, showering the street below in glass. One figure clings precariously to a piece of signage, the other grabs him by the neck. \\\"Stop you fool, we'll both die!\\\" the choked man sputters. \\\"Then I'll see you in hell.\\\" says the trenchcoated investigator before finishing the job.\",\"predicate\":1}}],\"stateDependencies\":[{\"type\":\"predicate\",\"fn\":{\"$code\":\"return ((Q['police_reform'] || 0)===1);\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return ((Q['police_reform'] || 0) > 1);\"}}]}},\"security\":{\"id\":\"security\",\"type\":\"scene\",\"title\":\"Security\",\"newPage\":true,\"isCard\":true,\"cardImage\":\"img/asteroid.jpg\",\"tags\":[\"govt_affairs\"],\"viewIf\":{\"$code\":\"return ((Q['police_reform'] || 0) < 4);\"},\"onArrival\":[{\"$code\":\"Q['corporate_long_leash'] = (Q['TBD'] || 0);\"}],\"options\":[{\"id\":\"@security.defund\"},{\"id\":\"@security.improve_pay\"},{\"id\":\"@security.organize_militias\"},{\"id\":\"@security.investigation\"}],\"content\":{\"content\":[{\"type\":\"paragraph\",\"content\":\"City security historically has earned little faith from the people of Mikasa. The corporations long used the police as a dumping ground for the cast off of their private security forces. The poor payment of the police made them easy targets for syndicate bribery.\"},{\"type\":\"paragraph\",\"content\":[{\"type\":\"conditional\",\"content\":\"We have taken some steps to clean up the police but have a long way to go \",\"predicate\":0},\"\"]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"conditional\",\"content\":\"We are reforming the police but there is more to do \",\"predicate\":1},\"\"]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"conditional\",\"content\":\"We have extensively purged the police of corruption, leaving them short staffed \",\"predicate\":2},\"\"]}],\"stateDependencies\":[{\"type\":\"predicate\",\"fn\":{\"$code\":\"return ((Q['police_reform'] || 0)===1);\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return ((Q['police_reform'] || 0)===2);\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return ((Q['police_defund'] || 0) > 2);\"}}]}},\"mss_dundalk_affair.mikasa_first\":{\"id\":\"mss_dundalk_affair.mikasa_first\",\"title\":\"Stir up anger at offworld exploitation\",\"onArrival\":[{\"$code\":\"budget +=2;\\ndundalk_nationalist += 20;\\nsoylent_anger -=0.10;\\nmagrail_anger -= 0.10;\\nbrazos_anger -= 0.10;\"}],\"content\":{\"content\":\"Stiring up anger about outsiders rallies the people behind the government in a way that the megacorps and syndicates can't object to. The courts imprison several scapegoats and impound the Dundalk. But attacking outsiders stokes the fires of xenophobia, clashes between communities is on the rise.\",\"type\":\"paragraph\"}},\"mss_dundalk_affair\":{\"id\":\"mss_dundalk_affair\",\"type\":\"scene\",\"title\":\"MSS Dundalk Affair\",\"priority\":1,\"maxVisits\":1,\"tags\":[\"event\"],\"viewIf\":{\"$code\":\"return (((Q['month'] || 0)===11) && ((Q['year'] || 0)===2301));\"},\"options\":[{\"id\":\"@mss_dundalk_affair.justice_reform\"},{\"id\":\"@mss_dundalk_affair.anti_corp\"},{\"id\":\"@mss_dundalk_affair.anti_crime\"},{\"id\":\"@mss_dundalk_affair.mikasa_first\"}],\"content\":[{\"type\":\"paragraph\",\"content\":\"The city government and democratic movement in Mikasa has an unusual opportunity. The offstation corporation that owns the freight MSS Dundalk which incited the Battle of the Tether has been caught red handed bribing the judiciary. Normally they would simply keep their assets outside of Mikasa jurisdiction and refuse to pay the fines but the MSS Dundalk is currently undergoing repairs in Mikasa and vulnerable to siezure.\"},{\"type\":\"paragraph\",\"content\":\"Naturally Canterbary Logistics is trying to get the Dundalk out of port before the courts decide anything. But the thousands of workers put out of work by their actions are obstructing access to the spaceport with mass protests while their fellow workers in the docks slow walk the repairs. Mikasa's three megacorps are eager to use Canterbary Logistics as a scapegoat and make no effort to suppress the demonstrations. The first legal mass political protests in a century are underway with crowds cheering on speakers denouncing injustice. What should be the main thrust of the speeches at these protests?\"}],\"countVisitsMax\":1},\"great_protector.green_zone\":{\"id\":\"great_protector.green_zone\",\"title\":\"Organize an Otherworld security zone\",\"onArrival\":[{\"$code\":\"Q.otherworld_outpost = 1\"}],\"chooseIf\":{\"$code\":\"return (((Q['otherworld_relations'] || 0) > 3) && ((1) !== 0));\"},\"unavailableSubtitle\":{\"content\":[{\"type\":\"conditional\",\"content\":\"We dont know enough about the otherworld for this. \",\"predicate\":0},{\"type\":\"conditional\",\"content\":\"We need a well armed force and permission from the corporations to use it.\",\"predicate\":1}],\"stateDependencies\":[{\"type\":\"predicate\",\"fn\":{\"$code\":\"return ((Q['otherworld_relations'] || 0) < 4);\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return ((Q['otherworld_relations'] || 0) > 3);\"}}]},\"content\":{\"content\":\"We send an expedition to the Otherworld and secure the region near the pathways to Mikasa. So long as we maintain goodwill with the Great Protector this outpost could be lucrative.\",\"type\":\"paragraph\"}},\"great_protector\":{\"id\":\"great_protector\",\"type\":\"scene\",\"title\":\"Realm of the Great Protector\",\"priority\":1,\"maxVisits\":1,\"tags\":[\"event\"],\"newPage\":true,\"viewIf\":{\"$code\":\"return (((Q['month'] || 0)===8) && ((Q['year'] || 0)===2300));\"},\"options\":[{\"id\":\"@great_protector.just_say_no\"},{\"id\":\"@great_protector.token_tribute\"},{\"id\":\"@great_protector.trade_links\"},{\"id\":\"@great_protector.green_zone\",\"title\":\"Organize an Otherworld security zone\"}],\"content\":[{\"type\":\"paragraph\",\"content\":\"The flow of refugees from the otherworld has slowed in recent weeks, apparently due to the success of a demon warlord who stylizes herself as the Great Protector. She is relatively benign by demon standards, prone to exemplary executions but not towards widescale slaughter. If she succeeds in pacifying the region is should end the current refugee wave.\"},{\"type\":\"paragraph\",\"content\":\"Now a herald has arrived from the Great Protector with a diplomatic offer. In exchange for a weekly shipment of carbonated beverages, the Great Protector promises peace between our realms. Our sages have advised the council that entanglements with demons are extremely dangerous but that demons will generally issue demands of token tribute as a matter of course even when they have no farther motive.\"}],\"countVisitsMax\":1},\"orc_marriage2.what_did_I_do\":{\"id\":\"orc_marriage2.what_did_I_do\",\"content\":{\"content\":\"Nuts.\",\"type\":\"paragraph\"}},\"orc_marriage2\":{\"id\":\"orc_marriage2\",\"type\":\"scene\",\"title\":\"Otherworld Civil Unions\",\"priority\":1,\"maxVisits\":1,\"tags\":[\"event\"],\"newPage\":true,\"viewIf\":{\"$code\":\"return (((Q['month'] || 0)===12) && ((Q['year'] || 0)===2301));\"},\"options\":[{\"id\":\"@orc_marriage2.civil_unions_minimum\",\"title\":\"Just try to obey the court order and recognize civil unions from outside Mikasa.\"},{\"id\":\"@orc_marriage2.civil_unions_modern\",\"title\":\"Let's get with the times, Mikasa should start issuing civil union certificates.\"},{\"id\":\"@orc_marriage2.civil_unions_orci\",\"title\":\"Mikasa should stop following and start leading. We wont just settle for Kwendo and Uruk rights but Orco rights as well!\"}],\"content\":{\"type\":\"paragraph\",\"content\":[\"In the October ruling of the Amira-Sponsa case, the appeals court ordered the city council to recognize foreign civil unions between humans and sentient otherworlder races such as \",{\"type\":\"magic\",\"content\":\"<span class=\\\"tooltip-text\\\" style=\\\"color:rgba(149, 139, 0, 1);\\\" title=\\\"An non human sentient race from the otherworld, commonly called 'Elves' due to the cultural legacy of 20th century author and Otherworld explorer J.R.R. Tolkein.\\\">Kwendi</span>\"},\" and \",{\"type\":\"magic\",\"content\":\"<span class=\\\"tooltip-text\\\" style=\\\"color:rgba(18, 44, 4, 1);\\\" title=\\\"A greyish-green skinned sentient race from the otherworld. They are frequently refered to by the racial slur 'Orcs' due to their close association with the sorcerers of the otherworld and their Orci creations. To the limited extent that Otherworld biology has been scientifically studied, no link has been found between Uruks and Orci.\\\">Uruks</span>\"},\". Legal recognition of civil unions or full marriage rights for such couples is increasingly common throughout the solar system and Mikasa is seen as backwards for limiting marriages to human couples only. Marriage equality advocates are pushing for the government to not only recognize foreign civil unions but legalize them in Mikasa as well. It is likely that a majority of the population is not opposed to permitting sentient interracial civil unions but the rank and file of the corporate and syndicate wings of the legislature have been hostile towards such unions. The anti-civil-union partisans in particular draw on the similarity between the racial slur \\\"Orc\\\" and the (non sentient) creatures \\\"\",{\"type\":\"magic\",\"content\":\"<span class=\\\"tooltip-text\\\" style=\\\"color:rgba(41, 48, 38, 1);\\\" title=\\\"A magical creature frequently used by sorcerers in the Otherworld. An Orcus is created by binding the soul of person to wood or stone. It is not entirely clear how the soul of the (deceased) individual is connected to an Orcus but it is clear that they are bound to the will of the sorcerer who created them. It is believed that the word entered into the lexicon of Indo-European precursor languages although the Orci are closer to the creatures called Changlings or Shui Gui then what the term Orc came to mean in the modern parlence. Orci can be made in close immitation of people but exposure to fire will reveal an Orcus disguised as an adult. Fear of 'greenwod orci' who can not be reveal by fire is the primary reason Otherworlders are fearful of unattended children.\\\">Orci</span>\"},\"\\\" with appeals like \\\"First Orcs then Orci!\\\" Some think that the court case gives an opportunity to overcome this hostility while others think even complying with the court order will be difficult.\"]},\"countVisitsMax\":1},\"contracting.cooperatives\":{\"id\":\"contracting.cooperatives\",\"title\":\"Cooperative suppliers\",\"onArrival\":[{\"$code\":\"Q['contract_coop'] = (Q['contract_coop'] || 0) + 1;\"}],\"content\":{\"content\":\"\",\"type\":\"paragraph\"}},\"contracting\":{\"id\":\"contracting\",\"type\":\"scene\",\"title\":\"Contracts and supplies\",\"newPage\":true,\"isCard\":true,\"cardImage\":\"img/asteroid.jpg\",\"tags\":[\"organize_phase\"],\"viewIf\":{\"$code\":\"return ((Q['organizing_unlock'] || 0)===1);\"},\"options\":[{\"id\":\"@contracting.outside_corporations\"},{\"id\":\"@contracting.big_3\"},{\"id\":\"@contracting.petty_capitalists\"},{\"id\":\"@contracting.cooperatives\"}],\"content\":{\"content\":\"\",\"type\":\"paragraph\"}},\"education.too_broke\":{\"id\":\"education.too_broke\",\"title\":\"We dont have the resources right now\",\"onArrival\":[],\"content\":{\"content\":\"\",\"type\":\"paragraph\"}},\"education\":{\"id\":\"education\",\"type\":\"scene\",\"title\":\"Education and training\",\"newPage\":true,\"isCard\":true,\"cardImage\":\"img/asteroid.jpg\",\"tags\":[\"organize_phase\"],\"viewIf\":{\"$code\":\"return ((Q['organizing_unlock'] || 0)===1);\"},\"options\":[{\"id\":\"@education.too_broke\",\"title\":\"We dont have the resources right now\"},{\"id\":\"@education.vocational\"},{\"id\":\"@education.home_ec\"},{\"id\":\"@education.well_rounded\"}],\"content\":{\"content\":\"The education system has both greatly advanced and greatly regressed since the pre-spaceflight era. On the positive side, ubiquitous open sourced computerized educational resources have made it trivial for parents to provide children with basic life skills. On the negative side, most children are not recieving formal schooling. Unschooled children are often left unprepared to the workforce and ignorant of world affairs. The problem is particularly severe among the non-human populations from the otherworld.\",\"type\":\"paragraph\"}},\"game_over.nsdap_win\":{\"id\":\"game_over.nsdap_win\",\"viewIf\":{\"$code\":\"return ((Q['chancellor'] == \\\"Goebbels\\\") || (Q['president'] == \\\"Göring\\\"));\"},\"title\":\"Despite the deportation of Hitler, the Nazis have still taken power...\",\"tags\":[\"endings\"],\"goTo\":[{\"id\":\"game_over.eg_menu\"}],\"content\":{\"content\":{\"type\":\"paragraph\",\"content\":[\"Despite the deportation of Hitler, the NSDAP has somehow still wormed its way into power. \",{\"type\":\"conditional\",\"content\":\"We are fighting them for control of Germany.\",\"predicate\":0}]},\"stateDependencies\":[{\"type\":\"predicate\",\"fn\":{\"$code\":\"return ((Q['long_war'] || 0) == 1);\"}}]}},\"game_over.civil_war_won\":{\"id\":\"game_over.civil_war_won\",\"title\":\"We have won the civil war.\",\"viewIf\":{\"$code\":\"return ((Q['republic_victory'] || 0) == 1);\"},\"tags\":[\"endings\"],\"goTo\":[{\"id\":\"game_over.eg_menu\"}],\"content\":{\"content\":\"We have won the civil war against the reactionary forces. Germany will be changed forever, but it is too early to know how.\",\"type\":\"paragraph\"}},\"game_over.civil_war_lost\":{\"id\":\"game_over.civil_war_lost\",\"title\":\"We lost the civil war.\",\"viewIf\":{\"$code\":\"return ((Q['total_defeat'] || 0) == 1);\"},\"tags\":[\"endings\"],\"goTo\":[{\"id\":\"game_over.eg_menu\"}],\"content\":{\"content\":\"We have lost the civil war. At least it was a quick coup, and ended before Germany could be plunged into total war.\",\"type\":\"paragraph\"}},\"game_over.long_war\":{\"id\":\"game_over.long_war\",\"title\":\"Germany is gripped by civil war.\",\"viewIf\":{\"$code\":\"return ((Q['long_war'] || 0) == 1);\"},\"tags\":[\"endings\"],\"goTo\":[{\"id\":\"game_over.eg_menu\"}],\"content\":{\"content\":[{\"type\":\"paragraph\",\"content\":\"Germany is currently in the grip of a civil war, a brutal affair that has no obvious end. Thousands of lives have already been extinguished, and it is likely that the war will not stop until Germany's cities are reduced to ruins.\"},{\"type\":\"paragraph\",\"content\":[{\"type\":\"conditional\",\"content\":\"The current conditions are not favorable for us. \",\"predicate\":0},{\"type\":\"conditional\",\"content\":\"Our cause is popular in the West, but their sclerotic governments are reluctant to send us aid. \",\"predicate\":1},{\"type\":\"conditional\",\"content\":\"The Soviet Union has aided the Communists, but not the socialists and democrats, in an attempt to shape Germany's future government. \",\"predicate\":2},{\"type\":\"conditional\",\"content\":\"Poland and Czechoslovakia have sent some assistance against the fascists.\",\"predicate\":3}]}],\"stateDependencies\":[{\"type\":\"predicate\",\"fn\":{\"$code\":\"return ((Q['is_favorable'] || 0) == 0);\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return ((Q['west_relation'] || 0) >= 2);\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return ((Q['soviet_aid'] || 0) >= 1);\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return ((Q['east_aid'] || 0) >= 1);\"}}]}},\"game_over.braun_victorious\":{\"id\":\"game_over.braun_victorious\",\"title\":\"Otto Braun victorious\",\"viewIf\":{\"$code\":\"return (Q['president'] == \\\"Braun\\\");\"},\"tags\":[\"endings\"],\"goTo\":[{\"id\":\"game_over.eg_menu\"}],\"content\":{\"content\":\"Otto Braun has been elected as President of Germany. He had never desired to be the most powerful man in Germany, but now he is.\",\"type\":\"paragraph\"}},\"game_over.president_schumacher\":{\"id\":\"game_over.president_schumacher\",\"title\":\"Kurt Schumacher victorious\",\"viewIf\":{\"$code\":\"return (Q['president'] == \\\"Schumacher\\\");\"},\"tags\":[\"endings\"],\"goTo\":[{\"id\":\"game_over.eg_menu\"}],\"content\":{\"content\":\"Kurt Schumacher has been elected as President of Germany. As a young and ambitious SPD member, he will be shaping Germany for years to come.\",\"type\":\"paragraph\"}},\"game_over.president_juchacz\":{\"id\":\"game_over.president_juchacz\",\"title\":\"Marie Juchacz is President\",\"viewIf\":{\"$code\":\"return (Q['president'] == \\\"Juchacz\\\");\"},\"tags\":[\"endings\"],\"goTo\":[{\"id\":\"game_over.eg_menu\"}],\"content\":{\"content\":\"Marie Juchacz has been elected as President of Germany. She is the first woman to be elected as the head of state of any republic, and will contribute to shaping Germany for years to come.\",\"type\":\"paragraph\"}},\"game_over.president_einstein\":{\"id\":\"game_over.president_einstein\",\"title\":\"Albert Einstein is President\",\"viewIf\":{\"$code\":\"return (Q['president'] == \\\"Einstein\\\");\"},\"tags\":[\"endings\"],\"goTo\":[{\"id\":\"game_over.eg_menu\"}],\"content\":{\"content\":\"Albert Einstein, possibly the most famous scientist in the world, has been elected as President of Germany. As a German Jew and a pacifist, he is the repudiation of everything the Nazis stood for, and a symbol of a new German Republic that has moved beyond its checkered past.\",\"type\":\"paragraph\"}},\"game_over.spd_victorious\":{\"id\":\"game_over.spd_victorious\",\"title\":\"SPD still in government\",\"viewIf\":{\"$code\":\"return (((((Q['spd_in_government'] || 0) == 1) && (Q['chancellor_party'] == \\\"SPD\\\")) && ((Q['total_defeat'] || 0) == 0)) && ((Q['long_war'] || 0) == 0));\"},\"tags\":[\"endings\"],\"goTo\":[{\"id\":\"game_over.eg_menu\"}],\"content\":{\"content\":{\"type\":\"paragraph\",\"content\":[\"The SPD is still in government, under Chancellor \",{\"type\":\"insert\",\"insert\":0},\". Given the circumstances, this is a substantial accomplishment.\"]},\"stateDependencies\":[{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['chancellor'] || 0);\"}}]}},\"game_over.communist_victory\":{\"id\":\"game_over.communist_victory\",\"title\":\"Communist victory\",\"viewIf\":{\"$code\":\"return ((((Q['chancellor_party'] == \\\"KPD\\\") || (Q['president'] == \\\"Thälmann\\\")) && ((Q['total_defeat'] || 0) == 0)) && ((Q['long_war'] || 0) == 0));\"},\"tags\":[\"endings\"],\"goTo\":[{\"id\":\"game_over.eg_menu\"}],\"content\":{\"content\":\"The KPD has won power in Germany, with our assistance. They will try to remake Germany in the Soviet image. How much they succeed is yet to be determined.\",\"type\":\"paragraph\"}},\"game_over.works_program\":{\"id\":\"game_over.works_program\",\"title\":\"Works program enacted!\",\"viewIf\":{\"$code\":\"return ((Q['works_program'] || 0) > 0);\"},\"tags\":[\"endings\"],\"goTo\":[{\"id\":\"game_over.eg_menu\"}],\"content\":{\"content\":\"Our government has enacted a public works program!\",\"type\":\"paragraph\"}},\"game_over.unemployment_reduced\":{\"id\":\"game_over.unemployment_reduced\",\"title\":\"Unemployment has been reduced from its peak.\",\"viewIf\":{\"$code\":\"return ((((Q['unemployed'] || 0) <= 20) && ((Q['unemployed'] || 0) >= 10)) && ((Q['year'] || 0) >= 1930));\"},\"tags\":[\"endings\"],\"goTo\":[{\"id\":\"game_over.eg_menu\"}],\"content\":{\"content\":\"While still uncomfortably high, unemployment levels are nowhere near their peak. This is a success of our economic policy.\",\"type\":\"paragraph\"}},\"game_over.unemployment_reduced_2\":{\"id\":\"game_over.unemployment_reduced_2\",\"title\":\"Unemployment has been successfully reduced!\",\"viewIf\":{\"$code\":\"return (((Q['unemployed'] || 0) < 10) && ((Q['year'] || 0) >= 1930));\"},\"tags\":[\"endings\"],\"goTo\":[{\"id\":\"game_over.eg_menu\"}],\"content\":{\"content\":\"Unemployment levels have fallen substantially! This is a success of our economic policy.\",\"type\":\"paragraph\"}},\"game_over.unemployment_high\":{\"id\":\"game_over.unemployment_high\",\"title\":\"Unemployment is still too high.\",\"viewIf\":{\"$code\":\"return (((((Q['unemployed'] || 0) >= 20) && (((Q['chancellor'] != \\\"Hitler\\\") && (Q['president'] != \\\"Hitler\\\")))) && (((Q['total_defeat'] || 0) == 0))) && ((Q['long_war'] || 0) == 0));\"},\"tags\":[\"endings\"],\"goTo\":[{\"id\":\"game_over.eg_menu\"}],\"content\":{\"content\":\"Unemployment is still at dangerously high levels. Even though Hitler is not in power, the situation is ripe for instability and extremism.\",\"type\":\"paragraph\"}},\"game_over.emergency_government\":{\"id\":\"game_over.emergency_government\",\"title\":\"SPD ruling in an emergency government.\",\"viewIf\":{\"$code\":\"return ((Q['in_emergency_government'] || 0) == 1);\"},\"tags\":[\"endings\"],\"goTo\":[{\"id\":\"game_over.eg_menu\"}],\"content\":{\"content\":{\"type\":\"paragraph\",\"content\":[\"The SPD is ruling as part of an emergency minority government, led by President \",{\"type\":\"insert\",\"insert\":0},\" and Chancellor \",{\"type\":\"insert\",\"insert\":1},\". This is a temporary and unstable arrangement, leaving the door open to further authoritarianism.\"]},\"stateDependencies\":[{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['president'] || 0);\"}},{\"type\":\"insert\",\"fn\":{\"$code\":\"return (Q['chancellor'] || 0);\"}}]}},\"game_over.peoples_party_achieved\":{\"id\":\"game_over.peoples_party_achieved\",\"title\":\"The SPD is a \\\"People's Party\\\".\",\"viewIf\":{\"$code\":\"return ((Q['peoples_party'] || 0) == 1);\"},\"tags\":[\"endings\"],\"goTo\":[{\"id\":\"game_over.eg_menu\"}],\"content\":{\"content\":\"The SPD has been declared a \\\"People's Party\\\", representing all of the people, not just the working class. This policy has many supporters and detractors, and what will become of the party is still unclear.\",\"type\":\"paragraph\"}},\"game_over.nationalization_achieved\":{\"id\":\"game_over.nationalization_achieved\",\"title\":\"Socialization of the economy has commenced.\",\"viewIf\":{\"$code\":\"return ((Q['nationalization_progress'] || 0) >= 2);\"},\"tags\":[\"endings\"],\"goTo\":[{\"id\":\"game_over.eg_menu\"}],\"content\":{\"content\":\"As part of our socialist economic plan, we have nationalized a substantial portion of the economy, beginning the transition to actual socialism.\",\"type\":\"paragraph\"}},\"game_over.works_councils\":{\"id\":\"game_over.works_councils\",\"title\":\"Works councils have more power.\",\"viewIf\":{\"$code\":\"return ((Q['works_councils'] || 0) >= 3);\"},\"tags\":[\"endings\"],\"goTo\":[{\"id\":\"game_over.eg_menu\"}],\"content\":{\"content\":\"Works councils now have substantially greater influence, giving workers democratic control over their economic lives.\",\"type\":\"paragraph\"}},\"game_over.european_union\":{\"id\":\"game_over.european_union\",\"title\":\"There is now a European Union!\",\"viewIf\":{\"$code\":\"return ((Q['eu'] || 0)===1);\"},\"tags\":[\"endings\"],\"goTo\":[{\"id\":\"game_over.eg_menu\"}],\"content\":{\"content\":\"We have helped to form a European Union to bring peace and prosperity to the continent. Time will tell how effective it will be.\",\"type\":\"paragraph\"}},\"game_over.achievements\":{\"id\":\"game_over.achievements\",\"title\":\"Achievements\",\"viewIf\":{\"$code\":\"return ((Q['achievement_game_completed'] || 0) == 1);\"},\"tags\":[\"endings\"],\"goTo\":[{\"id\":\"game_over.eg_menu\",\"predicate\":{\"$code\":\"return ((Q['started'] || 0) == 1);\"}},{\"id\":\"root.start_menu_2\",\"predicate\":{\"$code\":\"return ((Q['started'] || 0) == 0);\"}}],\"content\":{\"content\":[{\"type\":\"heading\",\"content\":\"Completed Achievements in this Playthrough\"},{\"type\":\"paragraph\",\"content\":[{\"type\":\"conditional\",\"content\":[\"\",{\"type\":\"emphasis-2\",\"content\":\"Eiserne Front\"},\" - form the Iron Front. \"],\"predicate\":0},\"\"]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"conditional\",\"content\":[\"\",{\"type\":\"emphasis-2\",\"content\":\"Bürgerkrieg\"},\" - enter a long civil war. \"],\"predicate\":1},\"\"]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"conditional\",\"content\":[\"\",{\"type\":\"emphasis-2\",\"content\":\"Einigkeit\"},\" - reach the end of the game without a civil war on easy. \"],\"predicate\":2},\"\"]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"conditional\",\"content\":[\"\",{\"type\":\"emphasis-2\",\"content\":\"Einigkeit und Recht\"},\" - reach the end of the game without a civil war on normal. \"],\"predicate\":3},\"\"]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"conditional\",\"content\":[\"\",{\"type\":\"emphasis-2\",\"content\":\"Einigkeit und Recht und Freiheit\"},\" - reach the end of the game without a civil war on hard. \"],\"predicate\":4},\"\"]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"conditional\",\"content\":[\"\",{\"type\":\"emphasis-2\",\"content\":\"Schwarz-Rot-Gold\"},\" - reach the end of the game without a civil war on historical mode. \"],\"predicate\":5},\"\"]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"conditional\",\"content\":[\"\",{\"type\":\"emphasis-2\",\"content\":\"Sieg für die Republik\"},\" - win the civil war. \"],\"predicate\":6},\"\"]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"conditional\",\"content\":[\"\",{\"type\":\"emphasis-2\",\"content\":\"Bollwerk der Demokratie\"},\" - Resist the Prussian Coup and win. \"],\"predicate\":7},\"\"]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"conditional\",\"content\":[\"\",{\"type\":\"emphasis-2\",\"content\":\"Roter Zar von Preußen\"},\" - Otto Braun is President, Chancellor, and Minister-President. \"],\"predicate\":8},\"\"]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"conditional\",\"content\":[\"\",{\"type\":\"emphasis-2\",\"content\":\"Einheitsfront\"},\" - Form a government consisting of the SPD and KPD. \"],\"predicate\":9},\"\"]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"conditional\",\"content\":[\"\",{\"type\":\"emphasis-2\",\"content\":\"Sieg für die Einheitsfront\"},\" - Form a Left Front that survives the KPD demands. \"],\"predicate\":10},\"\"]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"conditional\",\"content\":[\"\",{\"type\":\"emphasis-2\",\"content\":\"Volksfront\"},\" - Form a government consisting of the SPD, KPD, Z, and DDP. \"],\"predicate\":11},\"\"]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"conditional\",\"content\":[\"\",{\"type\":\"emphasis-2\",\"content\":\"Große Volksfront\"},\" - With Joos leading the Center Party and the Conciliators leading the KPD, form a government consisting of the SPD, KPD, Z, and DDP. \"],\"predicate\":12},\"\"]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"conditional\",\"content\":[\"\",{\"type\":\"emphasis-2\",\"content\":\"Sieg für die Volksfront\"},\" - Form a Popular Front that survives the KPD demands. \"],\"predicate\":13},\"\"]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"conditional\",\"content\":[\"\",{\"type\":\"emphasis-2\",\"content\":\"Verfassungskoalition\"},\" - form a \\\"constitutional coalition\\\". \"],\"predicate\":14},\"\"]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"conditional\",\"content\":[\"\",{\"type\":\"emphasis-2\",\"content\":\"Weimarer Koalition\"},\" - form a Weimar coalition. \"],\"predicate\":15},\"\"]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"conditional\",\"content\":[\"\",{\"type\":\"emphasis-2\",\"content\":\"Mehrheitspartei\"},\" - form an SPD-only majority government. \"],\"predicate\":16},\"\"]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"conditional\",\"content\":[\"\",{\"type\":\"emphasis-2\",\"content\":\"Minderheitsregierung\"},\" - form an SPD minority government. \"],\"predicate\":17},\"\"]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"conditional\",\"content\":[\"\",{\"type\":\"emphasis-2\",\"content\":\"Volkspartei\"},\" - the SPD is a People's Party. \"],\"predicate\":18},\"\"]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"conditional\",\"content\":[\"\",{\"type\":\"emphasis-2\",\"content\":\"Sohn seiner Klasse\"},\" - Ernst Thälmann is either president or chancellor. \"],\"predicate\":19},\"\"]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"conditional\",\"content\":[\"\",{\"type\":\"emphasis-2\",\"content\":\"Der rote Millionär\"},\" - Willi Münzenberg is president. \"],\"predicate\":20},\"\"]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"conditional\",\"content\":[\"\",{\"type\":\"emphasis-2\",\"content\":\"Versöhnler\"},\" - the Conciliators lead the KPD. \"],\"predicate\":21},\"\"]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"conditional\",\"content\":[\"\",{\"type\":\"emphasis-2\",\"content\":\"Der österreichische Gefreite\"},\" - deported Hitler \"],\"predicate\":22},\"\"]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"conditional\",\"content\":[\"\",{\"type\":\"emphasis-2\",\"content\":\"Wirtschaftspolitik\"},\" - enact an economic plan. \"],\"predicate\":23},\"\"]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"conditional\",\"content\":[\"\",{\"type\":\"emphasis-2\",\"content\":\"Wirtschaftswunder\"},\" - After 1932, have unemployment less than in 1928, inflation below 5%, and a budget surplus. \"],\"predicate\":24},\"\"]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"conditional\",\"content\":[\"\",{\"type\":\"emphasis-2\",\"content\":\"Wirtschaftsexperiment\"},\" - enact two different economic plans. \"],\"predicate\":25},\"\"]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"conditional\",\"content\":[\"\",{\"type\":\"emphasis-2\",\"content\":\"Freie Marktwirtschaft\"},\" - survive to the end of the game without adopting an economic plan. \"],\"predicate\":26},\"\"]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"conditional\",\"content\":[\"\",{\"type\":\"emphasis-2\",\"content\":\"Gleichheit\"},\" - pass reforms for women's rights. \"],\"predicate\":27},\"\"]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"conditional\",\"content\":[\"\",{\"type\":\"emphasis-2\",\"content\":\"Hirschfeld\"},\" - pass reforms for homosexual rights. \"],\"predicate\":28},\"\"]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"conditional\",\"content\":[\"\",{\"type\":\"emphasis-2\",\"content\":\"Mädchen in Uniform\"},\" - a woman's place is in the Reichsbanner. \"],\"predicate\":29},\"\"]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"conditional\",\"content\":[\"\",{\"type\":\"emphasis-2\",\"content\":\"Anders als die Andern\"},\" - sexual minorities will defend the Republic. \"],\"predicate\":30},\"\"]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"conditional\",\"content\":[\"\",{\"type\":\"emphasis-2\",\"content\":\"Brüder, zur Sonne, zur Freiheit\"},\" - reduce unemployment, pause reparations, increase women's rights, elect an SPD president, and deport Hitler in one playthrough on at least normal difficulty. \"],\"predicate\":31},\"\"]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"conditional\",\"content\":[\"\",{\"type\":\"emphasis-2\",\"content\":\"Die Rote Fahne\"},\" - join the KPD in their May Day march. \"],\"predicate\":32},\"\"]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"conditional\",\"content\":[\"\",{\"type\":\"emphasis-2\",\"content\":\"Panik im Mittelstand\"},\" - SPD new middle class support is at least 50%. \"],\"predicate\":33},\"\"]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"conditional\",\"content\":[\"\",{\"type\":\"emphasis-2\",\"content\":\"Bauernrevolution\"},\" - SPD rural support is at least 50%. \"],\"predicate\":34},\"\"]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"conditional\",\"content\":[\"\",{\"type\":\"emphasis-2\",\"content\":\"Katholischer Sozialismus\"},\" - SPD Catholic support is at least 50%. \"],\"predicate\":35},\"\"]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"conditional\",\"content\":[\"\",{\"type\":\"emphasis-2\",\"content\":\"Große Volkspartei\"},\" - All classes have at least 40% SPD support. \"],\"predicate\":36},\"\"]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"conditional\",\"content\":[\"\",{\"type\":\"emphasis-2\",\"content\":\"Klassenkampf\"},\" - SPD worker support is at least 80%, while middle-class and rural supports are less than 20%. \"],\"predicate\":37},\"\"]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"conditional\",\"content\":[\"\",{\"type\":\"emphasis-2\",\"content\":\"Räterepublik\"},\" - begin the transformation to a socialist economy. \"],\"predicate\":38},\"\"]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"conditional\",\"content\":[\"\",{\"type\":\"emphasis-2\",\"content\":\"Polykrise\"},\" - survive a capital strike and a fascist coup. \"],\"predicate\":39},\"\"]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"conditional\",\"content\":[\"\",{\"type\":\"emphasis-2\",\"content\":\"Syndikalismus\"},\" - support factory takeovers by the workers. \"],\"predicate\":40},\"\"]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"conditional\",\"content\":[\"\",{\"type\":\"emphasis-2\",\"content\":\"Drei Pfeile\"},\" - defeat a coup without a civil war. \"],\"predicate\":41},\"\"]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"conditional\",\"content\":[\"\",{\"type\":\"emphasis-2\",\"content\":\"Ausnahmezustand\"},\" - use emergency powers to cancel elections. \"],\"predicate\":42},\"\"]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"conditional\",\"content\":[\"\",{\"type\":\"emphasis-2\",\"content\":\"Vereinigte Staaten von Europa\"},\" - form a \\\"European Union\\\". \"],\"predicate\":43},\"\"]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"conditional\",\"content\":[\"\",{\"type\":\"emphasis-2\",\"content\":\"Heidelberger Programm\"},\" - achieve the goals of the SPD's Heidelberg Program: social welfare, judicial reform, women's rights in the workplace and family, progressive taxation, works councils, and the formation of a European Union. \"],\"predicate\":44},\"\"]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"conditional\",\"content\":[\"\",{\"type\":\"emphasis-2\",\"content\":\"Verfassungsreform\"},\" - pass a constitutional amendment. \"],\"predicate\":45},\"\"]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"conditional\",\"content\":[\"\",{\"type\":\"emphasis-2\",\"content\":\"Zeppelinkapitän\"},\" - Hugo Eckener has been elected president. \"],\"predicate\":46},\"\"]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"conditional\",\"content\":[\"\",{\"type\":\"emphasis-2\",\"content\":\"Wahlrechts für Frauen\"},\" - Marie Juchacz has been elected president. \"],\"predicate\":47},\"\"]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"conditional\",\"content\":[\"\",{\"type\":\"emphasis-2\",\"content\":\"Bundesrepublik\"},\" - Konrad Adenauer or Kurt Schumacher has been elected president, and constitutional reforms have reduced presidential power. \"],\"predicate\":48},\"\"]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"conditional\",\"content\":[\"\",{\"type\":\"emphasis-2\",\"content\":\"Republik der Wissenschaft\"},\" - Albert Einstein has been elected president. \"],\"predicate\":49},\"\"]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"conditional\",\"content\":[\"\",{\"type\":\"emphasis-2\",\"content\":\"Arbeiter von Wien\"},\" - SDAPÖ victory in Austria. \"],\"predicate\":50},\"\"]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"conditional\",\"content\":[\"\",{\"type\":\"emphasis-2\",\"content\":\"Stolperstein\"},\" - we lost, but history might memorialize us... \"],\"predicate\":51},\"\"]},{\"type\":\"heading\",\"content\":\"Completed Achievements Overall\"},{\"type\":\"paragraph\",\"content\":[{\"type\":\"conditional\",\"content\":[\"\",{\"type\":\"emphasis-2\",\"content\":\"Eiserne Front\"},\" - form the Iron Front. \"],\"predicate\":52},\"\"]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"conditional\",\"content\":[\"\",{\"type\":\"emphasis-2\",\"content\":\"Bürgerkrieg\"},\" - enter a long civil war. \"],\"predicate\":53},\"\"]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"conditional\",\"content\":[\"\",{\"type\":\"emphasis-2\",\"content\":\"Einigkeit\"},\" - reach the end of the game without a civil war on easy. \"],\"predicate\":54},\"\"]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"conditional\",\"content\":[\"\",{\"type\":\"emphasis-2\",\"content\":\"Einigkeit und Recht\"},\" - reach the end of the game without a civil war on normal. \"],\"predicate\":55},\"\"]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"conditional\",\"content\":[\"\",{\"type\":\"emphasis-2\",\"content\":\"Einigkeit und Recht und Freiheit\"},\" - reach the end of the game without a civil war on hard. \"],\"predicate\":56},\"\"]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"conditional\",\"content\":[\"\",{\"type\":\"emphasis-2\",\"content\":\"Schwarz-Rot-Gold\"},\" - reach the end of the game without a civil war on historical mode. \"],\"predicate\":57},\"\"]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"conditional\",\"content\":[\"\",{\"type\":\"emphasis-2\",\"content\":\"Sieg für die Republik\"},\" - win the civil war. \"],\"predicate\":58},\"\"]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"conditional\",\"content\":[\"\",{\"type\":\"emphasis-2\",\"content\":\"Bollwerk der Demokratie\"},\" - Resist the Prussian Coup and win. \"],\"predicate\":59},\"\"]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"conditional\",\"content\":[\"\",{\"type\":\"emphasis-2\",\"content\":\"Roter Zar von Preußen\"},\" - Otto Braun is President, Chancellor, and Minister-President. \"],\"predicate\":60},\"\"]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"conditional\",\"content\":[\"\",{\"type\":\"emphasis-2\",\"content\":\"Einheitsfront\"},\" - Form a government consisting of the SPD and KPD. \"],\"predicate\":61},\"\"]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"conditional\",\"content\":[\"\",{\"type\":\"emphasis-2\",\"content\":\"Sieg für die Einheitsfront\"},\" - Form a Left Front that survives the KPD demands. \"],\"predicate\":62},\"\"]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"conditional\",\"content\":[\"\",{\"type\":\"emphasis-2\",\"content\":\"Volksfront\"},\" - Form a government consisting of the SPD, KPD, Z, and DDP. \"],\"predicate\":63},\"\"]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"conditional\",\"content\":[\"\",{\"type\":\"emphasis-2\",\"content\":\"Große Volksfront\"},\" - With Joos leading the Center Party and the Conciliators leading the KPD, form a government consisting of the SPD, KPD, Z, and DDP. \"],\"predicate\":64},\"\"]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"conditional\",\"content\":[\"\",{\"type\":\"emphasis-2\",\"content\":\"Sieg für die Volksfront\"},\" - Form a Popular Front that survives the KPD demands. \"],\"predicate\":65},\"\"]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"conditional\",\"content\":[\"\",{\"type\":\"emphasis-2\",\"content\":\"Verfassungskoalition\"},\" - form a \\\"constitutional coalition\\\". \"],\"predicate\":66},\"\"]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"conditional\",\"content\":[\"\",{\"type\":\"emphasis-2\",\"content\":\"Weimarer Koalition\"},\" - form a Weimar coalition. \"],\"predicate\":67},\"\"]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"conditional\",\"content\":[\"\",{\"type\":\"emphasis-2\",\"content\":\"Mehrheitspartei\"},\" - form an SPD-only majority government. \"],\"predicate\":68},\"\"]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"conditional\",\"content\":[\"\",{\"type\":\"emphasis-2\",\"content\":\"Minderheitsregierung\"},\" - form an SPD minority government. \"],\"predicate\":69},\"\"]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"conditional\",\"content\":[\"\",{\"type\":\"emphasis-2\",\"content\":\"Volkspartei\"},\" - the SPD is a People's Party. \"],\"predicate\":70},\"\"]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"conditional\",\"content\":[\"\",{\"type\":\"emphasis-2\",\"content\":\"Sohn seiner Klasse\"},\" - Ernst Thälmann is either president or chancellor. \"],\"predicate\":71},\"\"]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"conditional\",\"content\":[\"\",{\"type\":\"emphasis-2\",\"content\":\"Der rote Millionär\"},\" - Willi Münzenberg is president. \"],\"predicate\":72},\"\"]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"conditional\",\"content\":[\"\",{\"type\":\"emphasis-2\",\"content\":\"Versöhnler\"},\" - the Conciliators lead the KPD. \"],\"predicate\":73},\"\"]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"conditional\",\"content\":[\"\",{\"type\":\"emphasis-2\",\"content\":\"Der österreichische Gefreite\"},\" - deported Hitler \"],\"predicate\":74},\"\"]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"conditional\",\"content\":[\"\",{\"type\":\"emphasis-2\",\"content\":\"Wirtschaftspolitik\"},\" - enact an economic plan. \"],\"predicate\":75},\"\"]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"conditional\",\"content\":[\"\",{\"type\":\"emphasis-2\",\"content\":\"Wirtschaftswunder\"},\" - After 1932, have unemployment less than in 1928, inflation below 5%, and a budget surplus. \"],\"predicate\":76},\"\"]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"conditional\",\"content\":[\"\",{\"type\":\"emphasis-2\",\"content\":\"Wirtschaftsexperiment\"},\" - enact two different economic plans. \"],\"predicate\":77},\"\"]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"conditional\",\"content\":[\"\",{\"type\":\"emphasis-2\",\"content\":\"Freie Marktwirtschaft\"},\" - survive to the end of the game without adopting an economic plan. \"],\"predicate\":78},\"\"]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"conditional\",\"content\":[\"\",{\"type\":\"emphasis-2\",\"content\":\"Gleichheit\"},\" - pass reforms for women's rights. \"],\"predicate\":79},\"\"]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"conditional\",\"content\":[\"\",{\"type\":\"emphasis-2\",\"content\":\"Hirschfeld\"},\" - pass reforms for homosexual rights. \"],\"predicate\":80},\"\"]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"conditional\",\"content\":[\"\",{\"type\":\"emphasis-2\",\"content\":\"Mädchen in Uniform\"},\" - a woman's place is in the Reichsbanner. \"],\"predicate\":81},\"\"]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"conditional\",\"content\":[\"\",{\"type\":\"emphasis-2\",\"content\":\"Anders als die Andern\"},\" - sexual minorities will defend the Republic. \"],\"predicate\":82},\"\"]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"conditional\",\"content\":[\"\",{\"type\":\"emphasis-2\",\"content\":\"Brüder, zur Sonne, zur Freiheit\"},\" - reduce unemployment, pause reparations, increase women's rights, elect an SPD president, and deport Hitler in one playthrough on at least normal difficulty. \"],\"predicate\":83},\"\"]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"conditional\",\"content\":[\"\",{\"type\":\"emphasis-2\",\"content\":\"Die Rote Fahne\"},\" - join the KPD in their May Day march. \"],\"predicate\":84},\"\"]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"conditional\",\"content\":[\"\",{\"type\":\"emphasis-2\",\"content\":\"Panik im Mittelstand\"},\" - SPD new middle class support is at least 50%. \"],\"predicate\":85},\"\"]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"conditional\",\"content\":[\"\",{\"type\":\"emphasis-2\",\"content\":\"Bauernrevolution\"},\" - SPD rural support is at least 50%. \"],\"predicate\":86},\"\"]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"conditional\",\"content\":[\"\",{\"type\":\"emphasis-2\",\"content\":\"Katholischer Sozialismus\"},\" - SPD Catholic support is at least 50%. \"],\"predicate\":87},\"\"]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"conditional\",\"content\":[\"\",{\"type\":\"emphasis-2\",\"content\":\"Große Volkspartei\"},\" - All classes have at least 40% SPD support. \"],\"predicate\":88},\"\"]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"conditional\",\"content\":[\"\",{\"type\":\"emphasis-2\",\"content\":\"Klassenkampf\"},\" - SPD worker support is at least 80%, while middle-class and rural supports are less than 20%. \"],\"predicate\":89},\"\"]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"conditional\",\"content\":[\"\",{\"type\":\"emphasis-2\",\"content\":\"Räterepublik\"},\" - begin the transformation to a socialist economy. \"],\"predicate\":90},\"\"]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"conditional\",\"content\":[\"\",{\"type\":\"emphasis-2\",\"content\":\"Polykrise\"},\" - survive a capital strike and a fascist coup. \"],\"predicate\":91},\"\"]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"conditional\",\"content\":[\"\",{\"type\":\"emphasis-2\",\"content\":\"Syndikalismus\"},\" - support factory takeovers by the workers. \"],\"predicate\":92},\"\"]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"conditional\",\"content\":[\"\",{\"type\":\"emphasis-2\",\"content\":\"Drei Pfeile\"},\" - defeat a coup without a civil war. \"],\"predicate\":93},\"\"]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"conditional\",\"content\":[\"\",{\"type\":\"emphasis-2\",\"content\":\"Ausnahmezustand\"},\" - use emergency powers to cancel elections. \"],\"predicate\":94},\"\"]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"conditional\",\"content\":[\"\",{\"type\":\"emphasis-2\",\"content\":\"Vereinigte Staaten von Europa\"},\" - form a \\\"European Union\\\". \"],\"predicate\":95},\"\"]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"conditional\",\"content\":[\"\",{\"type\":\"emphasis-2\",\"content\":\"Heidelberger Programm\"},\" - achieve the goals of the SPD's Heidelberg Program: social welfare, judicial reform, women's rights in the workplace and family, progressive taxation, works councils, and the formation of a European Union. \"],\"predicate\":96},\"\"]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"conditional\",\"content\":[\"\",{\"type\":\"emphasis-2\",\"content\":\"Verfassungsreform\"},\" - pass a constitutional amendment. \"],\"predicate\":97},\"\"]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"conditional\",\"content\":[\"\",{\"type\":\"emphasis-2\",\"content\":\"Zeppelinkapitän\"},\" - Hugo Eckener has been elected president. \"],\"predicate\":98},\"\"]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"conditional\",\"content\":[\"\",{\"type\":\"emphasis-2\",\"content\":\"Wahlrechts für Frauen\"},\" - Marie Juchacz has been elected president. \"],\"predicate\":99},\"\"]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"conditional\",\"content\":[\"\",{\"type\":\"emphasis-2\",\"content\":\"Bundesrepublik\"},\" - Konrad Adenauer or Kurt Schumacher has been elected president, and constitutional reforms have reduced presidential power. \"],\"predicate\":100},\"\"]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"conditional\",\"content\":[\"\",{\"type\":\"emphasis-2\",\"content\":\"Republik der Wissenschaft\"},\" - Albert Einstein has been elected president. \"],\"predicate\":101},\"\"]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"conditional\",\"content\":[\"\",{\"type\":\"emphasis-2\",\"content\":\"Arbeiter von Wien\"},\" - SDAPÖ victory in Austria. \"],\"predicate\":102},\"\"]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"conditional\",\"content\":[\"\",{\"type\":\"emphasis-2\",\"content\":\"Stolperstein\"},\" - we lost, but history might memorialize us... \"],\"predicate\":103},\"\"]},{\"type\":\"heading\",\"content\":\"Incomplete Achievements\"},{\"type\":\"paragraph\",\"content\":[{\"type\":\"conditional\",\"content\":[\"\",{\"type\":\"emphasis-2\",\"content\":\"Eiserne Front\"},\" - form the Iron Front. \"],\"predicate\":104},\"\"]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"conditional\",\"content\":[\"\",{\"type\":\"emphasis-2\",\"content\":\"Bürgerkrieg\"},\" - enter a long civil war. \"],\"predicate\":105},\"\"]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"conditional\",\"content\":[\"\",{\"type\":\"emphasis-2\",\"content\":\"Einigkeit\"},\" - reach the end of the game without a civil war on easy. \"],\"predicate\":106},\"\"]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"conditional\",\"content\":[\"\",{\"type\":\"emphasis-2\",\"content\":\"Einigkeit und Recht\"},\" - reach the end of the game without a civil war on normal. \"],\"predicate\":107},\"\"]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"conditional\",\"content\":[\"\",{\"type\":\"emphasis-2\",\"content\":\"Einigkeit und Recht und Freiheit\"},\" - reach the end of the game without a civil war on hard. \"],\"predicate\":108},\"\"]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"conditional\",\"content\":[\"\",{\"type\":\"emphasis-2\",\"content\":\"Schwarz-Rot-Gold\"},\" - reach the end of the game without a civil war on historical mode. \"],\"predicate\":109},\"\"]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"conditional\",\"content\":[\"\",{\"type\":\"emphasis-2\",\"content\":\"Sieg für die Republik\"},\" - win the civil war. \"],\"predicate\":110},\"\"]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"conditional\",\"content\":[\"\",{\"type\":\"emphasis-2\",\"content\":\"Bollwerk der Demokratie\"},\" - Resist the Prussian Coup and win. \"],\"predicate\":111},\"\"]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"conditional\",\"content\":[\"\",{\"type\":\"emphasis-2\",\"content\":\"Roter Zar von Preußen\"},\" - Otto Braun is President, Chancellor, and Minister-President. \"],\"predicate\":112},\"\"]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"conditional\",\"content\":[\"\",{\"type\":\"emphasis-2\",\"content\":\"Einheitsfront\"},\" - Form a government consisting of the SPD and KPD. \"],\"predicate\":113},\"\"]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"conditional\",\"content\":[\"\",{\"type\":\"emphasis-2\",\"content\":\"Sieg für die Einheitsfront\"},\" - Form a Left Front that survives the KPD demands. \"],\"predicate\":114},\"\"]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"conditional\",\"content\":[\"\",{\"type\":\"emphasis-2\",\"content\":\"Volksfront\"},\" - Form a government consisting of the SPD, KPD, Z, and DDP. \"],\"predicate\":115},\"\"]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"conditional\",\"content\":[\"\",{\"type\":\"emphasis-2\",\"content\":\"Große Volksfront\"},\" - With Joos leading the Center Party and the Conciliators leading the KPD, form a government consisting of the SPD, KPD, Z, and DDP. \"],\"predicate\":116},\"\"]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"conditional\",\"content\":[\"\",{\"type\":\"emphasis-2\",\"content\":\"Sieg für die Volksfront\"},\" - Form a Popular Front that survives the KPD demands. \"],\"predicate\":117},\"\"]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"conditional\",\"content\":[\"\",{\"type\":\"emphasis-2\",\"content\":\"Verfassungskoalition\"},\" - form a \\\"constitutional coalition\\\". \"],\"predicate\":118},\"\"]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"conditional\",\"content\":[\"\",{\"type\":\"emphasis-2\",\"content\":\"Weimarer Koalition\"},\" - form a Weimar coalition. \"],\"predicate\":119},\"\"]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"conditional\",\"content\":[\"\",{\"type\":\"emphasis-2\",\"content\":\"Mehrheitspartei\"},\" - form an SPD-only majority government. \"],\"predicate\":120},\"\"]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"conditional\",\"content\":[\"\",{\"type\":\"emphasis-2\",\"content\":\"Minderheitsregierung\"},\" - form an SPD minority government. \"],\"predicate\":121},\"\"]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"conditional\",\"content\":[\"\",{\"type\":\"emphasis-2\",\"content\":\"Volkspartei\"},\" - the SPD is a People's Party. \"],\"predicate\":122},\"\"]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"conditional\",\"content\":[\"\",{\"type\":\"emphasis-2\",\"content\":\"Sohn seiner Klasse\"},\" - Ernst Thälmann is either president or chancellor. \"],\"predicate\":123},\"\"]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"conditional\",\"content\":[\"\",{\"type\":\"emphasis-2\",\"content\":\"Der rote Millionär\"},\" - Willi Münzenberg is president. \"],\"predicate\":124},\"\"]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"conditional\",\"content\":[\"\",{\"type\":\"emphasis-2\",\"content\":\"Versöhnler\"},\" - the Conciliators lead the KPD. \"],\"predicate\":125},\"\"]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"conditional\",\"content\":[\"\",{\"type\":\"emphasis-2\",\"content\":\"Der österreichische Gefreite\"},\" - deported Hitler \"],\"predicate\":126},\"\"]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"conditional\",\"content\":[\"\",{\"type\":\"emphasis-2\",\"content\":\"Wirtschaftspolitik\"},\" - enact an economic plan. \"],\"predicate\":127},\"\"]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"conditional\",\"content\":[\"\",{\"type\":\"emphasis-2\",\"content\":\"Wirtschaftswunder\"},\" - After 1932, have unemployment less than in 1928, inflation below 5%, and a budget surplus. \"],\"predicate\":128},\"\"]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"conditional\",\"content\":[\"\",{\"type\":\"emphasis-2\",\"content\":\"Wirtschaftsexperiment\"},\" - enact two different economic plans. \"],\"predicate\":129},\"\"]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"conditional\",\"content\":[\"\",{\"type\":\"emphasis-2\",\"content\":\"Freie Marktwirtschaft\"},\" - survive to the end of the game without adopting an economic plan. \"],\"predicate\":130},\"\"]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"conditional\",\"content\":[\"\",{\"type\":\"emphasis-2\",\"content\":\"Gleichheit\"},\" - pass reforms for women's rights. \"],\"predicate\":131},\"\"]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"conditional\",\"content\":[\"\",{\"type\":\"emphasis-2\",\"content\":\"Hirschfeld\"},\" - pass reforms for homosexual rights. \"],\"predicate\":132},\"\"]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"conditional\",\"content\":[\"\",{\"type\":\"emphasis-2\",\"content\":\"Mädchen in Uniform\"},\" - a woman's place is in the Reichsbanner. \"],\"predicate\":133},\"\"]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"conditional\",\"content\":[\"\",{\"type\":\"emphasis-2\",\"content\":\"Anders als die Andern\"},\" - sexual minorities will defend the Republic. \"],\"predicate\":134},\"\"]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"conditional\",\"content\":[\"\",{\"type\":\"emphasis-2\",\"content\":\"Brüder, zur Sonne, zur Freiheit\"},\" - reduce unemployment, pause reparations, increase women's rights, elect an SPD president, and deport Hitler in one playthrough on at least normal difficulty. \"],\"predicate\":135},\"\"]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"conditional\",\"content\":[\"\",{\"type\":\"emphasis-2\",\"content\":\"Die Rote Fahne\"},\" - join the KPD in their May Day march. \"],\"predicate\":136},\"\"]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"conditional\",\"content\":[\"\",{\"type\":\"emphasis-2\",\"content\":\"Panik im Mittelstand\"},\" - SPD new middle class support is at least 50%. \"],\"predicate\":137},\"\"]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"conditional\",\"content\":[\"\",{\"type\":\"emphasis-2\",\"content\":\"Bauernrevolution\"},\" - SPD rural support is at least 50%. \"],\"predicate\":138},\"\"]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"conditional\",\"content\":[\"\",{\"type\":\"emphasis-2\",\"content\":\"Katholischer Sozialismus\"},\" - SPD Catholic support is at least 50%. \"],\"predicate\":139},\"\"]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"conditional\",\"content\":[\"\",{\"type\":\"emphasis-2\",\"content\":\"Große Volkspartei\"},\" - All classes have at least 40% SPD support. \"],\"predicate\":140},\"\"]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"conditional\",\"content\":[\"\",{\"type\":\"emphasis-2\",\"content\":\"Klassenkampf\"},\" - SPD worker support is at least 80%, while middle-class and rural supports are less than 20%. \"],\"predicate\":141},\"\"]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"conditional\",\"content\":[\"\",{\"type\":\"emphasis-2\",\"content\":\"Räterepublik\"},\" - begin the transformation to a socialist economy. \"],\"predicate\":142},\"\"]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"conditional\",\"content\":[\"\",{\"type\":\"emphasis-2\",\"content\":\"Polykrise\"},\" - survive a capital strike and a fascist coup. \"],\"predicate\":143},\"\"]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"conditional\",\"content\":[\"\",{\"type\":\"emphasis-2\",\"content\":\"Syndikalismus\"},\" - support factory takeovers by the workers. \"],\"predicate\":144},\"\"]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"conditional\",\"content\":[\"\",{\"type\":\"emphasis-2\",\"content\":\"Drei Pfeile\"},\" - defeat a coup without a civil war. \"],\"predicate\":145},\"\"]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"conditional\",\"content\":[\"\",{\"type\":\"emphasis-2\",\"content\":\"Ausnahmezustand\"},\" - use emergency powers to cancel elections. \"],\"predicate\":146},\"\"]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"conditional\",\"content\":[\"\",{\"type\":\"emphasis-2\",\"content\":\"Vereinigte Staaten von Europa\"},\" - form a \\\"European Union\\\". \"],\"predicate\":147},\"\"]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"conditional\",\"content\":[\"\",{\"type\":\"emphasis-2\",\"content\":\"Heidelberger Programm\"},\" - achieve the goals of the SPD's Heidelberg Program: social welfare, judicial reform, women's rights in the workplace and family, progressive taxation, works councils, and the formation of a European Union. \"],\"predicate\":148},\"\"]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"conditional\",\"content\":[\"\",{\"type\":\"emphasis-2\",\"content\":\"Verfassungsreform\"},\" - pass a constitutional amendment. \"],\"predicate\":149},\"\"]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"conditional\",\"content\":[\"\",{\"type\":\"emphasis-2\",\"content\":\"Zeppelinkapitän\"},\" - Hugo Eckener has been elected president. \"],\"predicate\":150},\"\"]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"conditional\",\"content\":[\"\",{\"type\":\"emphasis-2\",\"content\":\"Wahlrechts für Frauen\"},\" - Marie Juchacz has been elected president. \"],\"predicate\":151},\"\"]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"conditional\",\"content\":[\"\",{\"type\":\"emphasis-2\",\"content\":\"Bundesrepublik\"},\" - Konrad Adenauer or Kurt Schumacher has been elected president, and constitutional reforms have reduced presidential power. \"],\"predicate\":152},\"\"]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"conditional\",\"content\":[\"\",{\"type\":\"emphasis-2\",\"content\":\"Republik der Wissenschaft\"},\" - Albert Einstein has been elected president. \"],\"predicate\":153},\"\"]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"conditional\",\"content\":[\"\",{\"type\":\"emphasis-2\",\"content\":\"Arbeiter von Wien\"},\" - SDAPÖ victory in Austria. \"],\"predicate\":154},\"\"]},{\"type\":\"paragraph\",\"content\":{\"type\":\"conditional\",\"content\":[\"\",{\"type\":\"emphasis-2\",\"content\":\"Stolperstein\"},\" - we lost, but history might memorialize us...\"],\"predicate\":155}}],\"stateDependencies\":[{\"type\":\"predicate\",\"fn\":{\"$code\":\"return (((Q['game_achievement_eiserne_front'] || 0)) !== 0);\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return (((Q['game_achievement_civil_war'] || 0)) !== 0);\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return (((Q['game_achievement_einigkeit'] || 0)) !== 0);\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return (((Q['game_achievement_einigkeit_und_recht'] || 0)) !== 0);\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return (((Q['game_achievement_einigkeit_und_recht_und_freiheit'] || 0)) !== 0);\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return (((Q['game_achievement_schwarz_rot_gold'] || 0)) !== 0);\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return (((Q['game_achievement_victory_for_the_republic'] || 0)) !== 0);\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return (((Q['game_achievement_bollwerk_der_demokratie'] || 0)) !== 0);\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return (((Q['game_achievement_red_tzar_of_prussia'] || 0)) !== 0);\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return (((Q['game_achievement_einheitsfront'] || 0)) !== 0);\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return (((Q['game_achievement_einheitsfront_2'] || 0)) !== 0);\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return (((Q['game_achievement_volksfront'] || 0)) !== 0);\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return (((Q['game_achievement_grosse_volksfront'] || 0)) !== 0);\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return (((Q['game_achievement_volksfront_2'] || 0)) !== 0);\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return (((Q['game_achievement_constitutional_coalition'] || 0)) !== 0);\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return (((Q['game_achievement_weimar_coalition'] || 0)) !== 0);\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return (((Q['game_achievement_majority_party'] || 0)) !== 0);\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return (((Q['game_achievement_minderheitsregierung'] || 0)) !== 0);\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return (((Q['game_achievement_volkspartei'] || 0)) !== 0);\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return (((Q['game_achievement_sohn_seiner_klasse'] || 0)) !== 0);\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return (((Q['game_achievement_rote_millionar'] || 0)) !== 0);\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return (((Q['game_achievement_versohnler'] || 0)) !== 0);\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return (((Q['game_achievement_deport_hitler'] || 0)) !== 0);\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return (((Q['game_achievement_wirtschaftspolitik'] || 0)) !== 0);\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return (((Q['game_achievement_wirtschaftswunder'] || 0)) !== 0);\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return (((Q['game_achievement_wirtschaftsexperiment'] || 0)) !== 0);\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return (((Q['game_achievement_freie_marktwirtschaft'] || 0)) !== 0);\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return (((Q['game_achievement_equality'] || 0)) !== 0);\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return (((Q['game_achievement_hirschfeld'] || 0)) !== 0);\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return (((Q['game_achievement_women_reichsbanner'] || 0)) !== 0);\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return (((Q['game_achievement_anders_als_die_andern'] || 0)) !== 0);\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return (((Q['game_achievement_bruder_zur_sonne'] || 0)) !== 0);\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return (((Q['game_achievement_die_rote_fahne'] || 0)) !== 0);\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return (((Q['game_achievement_panik_im_mittelstand'] || 0)) !== 0);\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return (((Q['game_achievement_bauernrevolution'] || 0)) !== 0);\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return (((Q['game_achievement_katholischer_sozialismus'] || 0)) !== 0);\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return (((Q['game_achievement_grosse_volkspartei'] || 0)) !== 0);\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return (((Q['game_achievement_klassenkampf'] || 0)) !== 0);\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return (((Q['game_achievement_raterepublik'] || 0)) !== 0);\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return (((Q['game_achievement_polykrise'] || 0)) !== 0);\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return (((Q['game_achievement_syndikalismus'] || 0)) !== 0);\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return (((Q['game_achievement_drei_pfeile'] || 0)) !== 0);\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return (((Q['game_achievement_ausnahmezustand'] || 0)) !== 0);\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return (((Q['game_achievement_eu'] || 0)) !== 0);\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return (((Q['game_achievement_heidelberger_programm'] || 0)) !== 0);\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return (((Q['game_achievement_verfassungsreform'] || 0)) !== 0);\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return (((Q['game_achievement_zeppelin_kapitan'] || 0)) !== 0);\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return (((Q['game_achievement_wahlrechts'] || 0)) !== 0);\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return (((Q['game_achievement_bundesrepublik'] || 0)) !== 0);\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return (((Q['game_achievement_republik_der_wissenschaft'] || 0)) !== 0);\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return (((Q['game_achievement_arbeiter_von_wien'] || 0)) !== 0);\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return (((Q['game_achievement_stolperstein'] || 0)) !== 0);\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return (((Q['achievement_eiserne_front'] || 0)) !== 0);\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return (((Q['achievement_civil_war'] || 0)) !== 0);\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return (((Q['achievement_einigkeit'] || 0)) !== 0);\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return (((Q['achievement_einigkeit_und_recht'] || 0)) !== 0);\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return (((Q['achievement_einigkeit_und_recht_und_freiheit'] || 0)) !== 0);\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return (((Q['achievement_schwarz_rot_gold'] || 0)) !== 0);\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return (((Q['achievement_victory_for_the_republic'] || 0)) !== 0);\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return (((Q['achievement_bollwerk_der_demokratie'] || 0)) !== 0);\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return (((Q['achievement_red_tzar_of_prussia'] || 0)) !== 0);\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return (((Q['achievement_einheitsfront'] || 0)) !== 0);\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return (((Q['achievement_einheitsfront_2'] || 0)) !== 0);\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return (((Q['achievement_volksfront'] || 0)) !== 0);\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return (((Q['achievement_grosse_volksfront'] || 0)) !== 0);\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return (((Q['achievement_volksfront_2'] || 0)) !== 0);\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return (((Q['achievement_constitutional_coalition'] || 0)) !== 0);\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return (((Q['achievement_weimar_coalition'] || 0)) !== 0);\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return (((Q['achievement_majority_party'] || 0)) !== 0);\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return (((Q['achievement_minderheitsregierung'] || 0)) !== 0);\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return (((Q['achievement_volkspartei'] || 0)) !== 0);\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return (((Q['achievement_sohn_seiner_klasse'] || 0)) !== 0);\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return (((Q['achievement_rote_millionar'] || 0)) !== 0);\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return (((Q['achievement_versohnler'] || 0)) !== 0);\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return (((Q['achievement_deport_hitler'] || 0)) !== 0);\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return (((Q['achievement_wirtschaftspolitik'] || 0)) !== 0);\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return (((Q['achievement_wirtschaftswunder'] || 0)) !== 0);\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return (((Q['achievement_wirtschaftsexperiment'] || 0)) !== 0);\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return (((Q['achievement_freie_marktwirtschaft'] || 0)) !== 0);\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return (((Q['achievement_equality'] || 0)) !== 0);\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return (((Q['achievement_hirschfeld'] || 0)) !== 0);\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return (((Q['achievement_women_reichsbanner'] || 0)) !== 0);\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return (((Q['achievement_anders_als_die_andern'] || 0)) !== 0);\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return (((Q['achievement_bruder_zur_sonne'] || 0)) !== 0);\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return (((Q['achievement_die_rote_fahne'] || 0)) !== 0);\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return (((Q['achievement_panik_im_mittelstand'] || 0)) !== 0);\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return (((Q['achievement_bauernrevolution'] || 0)) !== 0);\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return (((Q['achievement_katholischer_sozialismus'] || 0)) !== 0);\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return (((Q['achievement_grosse_volkspartei'] || 0)) !== 0);\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return (((Q['achievement_klassenkampf'] || 0)) !== 0);\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return (((Q['achievement_raterepublik'] || 0)) !== 0);\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return (((Q['achievement_polykrise'] || 0)) !== 0);\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return (((Q['achievement_syndikalismus'] || 0)) !== 0);\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return (((Q['achievement_drei_pfeile'] || 0)) !== 0);\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return (((Q['achievement_ausnahmezustand'] || 0)) !== 0);\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return (((Q['achievement_eu'] || 0)) !== 0);\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return (((Q['achievement_heidelberger_programm'] || 0)) !== 0);\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return (((Q['achievement_verfassungsreform'] || 0)) !== 0);\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return (((Q['achievement_zeppelin_kapitan'] || 0)) !== 0);\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return (((Q['achievement_wahlrechts'] || 0)) !== 0);\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return (((Q['achievement_bundesrepublik'] || 0)) !== 0);\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return (((Q['achievement_republik_der_wissenschaft'] || 0)) !== 0);\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return (((Q['achievement_arbeiter_von_wien'] || 0)) !== 0);\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return (((Q['achievement_stolperstein'] || 0)) !== 0);\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return (!(((Q['achievement_eiserne_front'] || 0)) !== 0));\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return (!(((Q['achievement_civil_war'] || 0)) !== 0));\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return (!(((Q['achievement_einigkeit'] || 0)) !== 0));\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return (!(((Q['achievement_einigkeit_und_recht'] || 0)) !== 0));\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return (!(((Q['achievement_einigkeit_und_recht_und_freiheit'] || 0)) !== 0));\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return (!(((Q['achievement_schwarz_rot_gold'] || 0)) !== 0));\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return (!(((Q['achievement_victory_for_the_republic'] || 0)) !== 0));\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return (!(((Q['achievement_bollwerk_der_demokratie'] || 0)) !== 0));\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return (!(((Q['achievement_red_tzar_of_prussia'] || 0)) !== 0));\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return (!(((Q['achievement_einheitsfront'] || 0)) !== 0));\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return (!(((Q['achievement_einheitsfront_2'] || 0)) !== 0));\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return (!(((Q['achievement_volksfront'] || 0)) !== 0));\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return (!(((Q['achievement_grosse_volksfront'] || 0)) !== 0));\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return (!(((Q['achievement_volksfront_2'] || 0)) !== 0));\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return (!(((Q['achievement_constitutional_coalition'] || 0)) !== 0));\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return (!(((Q['achievement_weimar_coalition'] || 0)) !== 0));\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return (!(((Q['achievement_majority_party'] || 0)) !== 0));\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return (!(((Q['achievement_minderheitsregierung'] || 0)) !== 0));\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return (!(((Q['achievement_volkspartei'] || 0)) !== 0));\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return (!(((Q['achievement_sohn_seiner_klasse'] || 0)) !== 0));\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return (!(((Q['achievement_rote_millionar'] || 0)) !== 0));\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return (!(((Q['achievement_versohnler'] || 0)) !== 0));\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return (!(((Q['achievement_deport_hitler'] || 0)) !== 0));\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return (!(((Q['achievement_wirtschaftspolitik'] || 0)) !== 0));\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return (!(((Q['achievement_wirtschaftswunder'] || 0)) !== 0));\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return (!(((Q['achievement_wirtschaftsexperiment'] || 0)) !== 0));\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return (!(((Q['achievement_freie_marktwirtschaft'] || 0)) !== 0));\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return (!(((Q['achievement_equality'] || 0)) !== 0));\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return (!(((Q['achievement_hirschfeld'] || 0)) !== 0));\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return (!(((Q['achievement_women_reichsbanner'] || 0)) !== 0));\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return (!(((Q['achievement_anders_als_die_andern'] || 0)) !== 0));\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return (!(((Q['achievement_bruder_zur_sonne'] || 0)) !== 0));\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return (!(((Q['achievement_die_rote_fahne'] || 0)) !== 0));\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return (!(((Q['achievement_panik_im_mittelstand'] || 0)) !== 0));\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return (!(((Q['achievement_bauernrevolution'] || 0)) !== 0));\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return (!(((Q['achievement_katholischer_sozialismus'] || 0)) !== 0));\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return (!(((Q['achievement_grosse_volkspartei'] || 0)) !== 0));\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return (!(((Q['achievement_klassenkampf'] || 0)) !== 0));\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return (!(((Q['achievement_raterepublik'] || 0)) !== 0));\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return (!(((Q['achievement_polykrise'] || 0)) !== 0));\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return (!(((Q['achievement_syndikalismus'] || 0)) !== 0));\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return (!(((Q['achievement_drei_pfeile'] || 0)) !== 0));\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return (!(((Q['achievement_ausnahmezustand'] || 0)) !== 0));\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return (!(((Q['achievement_eu'] || 0)) !== 0));\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return (!(((Q['achievement_heidelberger_programm'] || 0)) !== 0));\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return (!(((Q['achievement_verfassungsreform'] || 0)) !== 0));\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return (!(((Q['achievement_zeppelin_kapitan'] || 0)) !== 0));\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return (!(((Q['achievement_wahlrechts'] || 0)) !== 0));\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return (!(((Q['achievement_bundesrepublik'] || 0)) !== 0));\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return (!(((Q['achievement_republik_der_wissenschaft'] || 0)) !== 0));\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return (!(((Q['achievement_arbeiter_von_wien'] || 0)) !== 0));\"}},{\"type\":\"predicate\",\"fn\":{\"$code\":\"return (!(((Q['achievement_stolperstein'] || 0)) !== 0));\"}}]}},\"game_over.end_game\":{\"id\":\"game_over.end_game\",\"gameOver\":true,\"content\":{\"content\":\"\",\"type\":\"paragraph\"}},\"game_over\":{\"id\":\"game_over\",\"type\":\"scene\",\"title\":\"Game Over.\",\"newPage\":true,\"goTo\":[{\"id\":\"game_over.eg_menu\"}],\"onArrival\":[{\"$code\":\"Q.game_over = 1;\\n// Achievements:\\n// Große Koalition - form a grand coalition\\n// Eiserne Front - Form the Iron Front.\\nthis.achieve('game_completed');\\n\\n// Roter Zar von Preußen - At the end of the game, Otto Braun is president, chancellor, and minister-president of prussia at the same time.\\nif (Q.president == 'Braun' && Q.chancellor == 'Braun' && Q.spd_prussia) {\\n    this.achieve('red_tzar_of_prussia');\\n}\\n// Bürgerkrieg - enter a long civil war.\\nif (Q.long_war) {\\n    this.achieve('civil_war');\\n}\\n// Sieg für die Republik - victory for the republic\\nif (Q.republic_victory) {\\n    this.achieve('victory_for_the_republic');\\n}\\n// Einigkeit - survive on easy without a civil war.\\n// Einigkeit und Recht - survive on medium without a civil war.\\n// Einigkeit und Recht und Freiheit - survive on hard without a civil war.\\n\\n// Einheitsfront - form a united front with the KPD, and win the civil war.\\n\\n// Volksfront - form a popular front government, and win the civil war.\\n\\n// Verfassungskoalition - form a Constitutional Coalition.\\n// Wirtschaftspolitik - enact an economic plan.\\n// Wirtschaftswunder - reduce unemployment below 10% and have a non-negative budget by 1933.\\nif (Q.year >= 1932  && Q.unemployed < 8.6 && Q.budget > 0 && Q.inflation < 5) {\\n    this.achieve('wirtschaftswunder');\\n}\\n// Bollwerk der Demokratie - resist the Prussian Coup, and win.\\nif (Q.republic_victory && Q.resist_coup) {\\n    this.achieve('bollwerk_der_demokratie');\\n}\\n// Der österreichische Gefreiter - deport hitler\\n// Volkspartei - form a people's party\\n// Hirschfeld - legalize 2 of homosexual rights and trans rights.\\nif (Q.homosexual_rights >= 2) {\\n    this.achieve('hirschfeld');\\n}\\n// Mädchen und Uniform - a woman's place is in the Reichsbanner.\\n// Gleichheit - Support and enact reforms for women's rights.\\nif ((Q.womens_work && Q.womens_rights >= 5) || (Q.abortion_rights && Q.womens_rights >= 3)) {\\n    this.achieve('equality');\\n}\\n\\n// Sohn seiner Klasse - elect Ernst Thälmann as president or chancellor.\\nif (Q.chancellor == \\\"Thälmann\\\" || Q.president == \\\"Thälmann\\\") {\\n    this.achieve('sohn_seiner_klasse');\\n}\\n\\n// calculate normalized class voting for the achievements\\nfor (var c of Q.classes) {\\n    var class_votes = 0;\\n    for (var party of Q.parties) {\\n        if (Q[c+'_'+party] < 0) {\\n            Q[c+'_'+party] = 0;\\n        }\\n        class_votes += Q[c+'_'+party];\\n    }\\n    for (var party of Q.parties) {\\n        Q[c + '_' + party + '_normalized'] = Math.round(100*Q[c+'_'+party]/class_votes);\\n    }\\n}\\n\\n// Die Rote Fahne - join the KPD in the May Day march.\\n// Mehrheitspartei - form an SPD majority government in the Reichstag.\\n// Panik im Mittelstand - have over 50% of New Middle Class support.\\nif (Q.new_middle_spd_normalized && Q.new_middle_spd_normalized >= 50) {\\n    this.achieve('panik_im_mittelstand');\\n}\\n// Bauernrevolution - have over 50% rural support.\\nif (Q.rural_spd_normalized && Q.rural_spd_normalized >= 50) {\\n    this.achieve('bauernrevolution');\\n}\\nif (Q.catholics_spd_normalized && Q.catholics_spd_normalized >= 50) {\\n    this.achieve('katholischer_sozialismus');\\n}\\nif (Q.workers_spd_normalized >= 80 && Q.new_middle_spd_normalized <= 20 && Q.old_middle_spd_normalized <= 20 && Q.rural_spd_normalized <= 20) {\\n    this.achieve('klassenkampf');\\n}\\nif (Q.workers_spd_normalized >= 40 && Q.new_middle_spd_normalized >= 40 && Q.old_middle_spd_normalized >= 40 && Q.rural_spd_normalized >= 40) {\\n    this.achieve('grosse_volkspartei');\\n}\\n// Räterepublik - begin the transformation to a socialist economy.\\nif (Q.spd_in_government && ((Q.nationalization_progress >= 2 && Q.economic_democracy >= 3) || (Q.nationalization_progress >= 1 && Q.economic_democracy >= 4))) {\\n    this.achieve('raterepublik');\\n}\\n// Polykrise - survive both a fascist coup and a capital strike.\\nif (Q.march_on_berlin_seen && Q.capital_strike_seen && Q.chancellor != \\\"Hitler\\\" && Q.president != \\\"Hitler\\\" && !Q.total_defeat) {\\n    this.achieve(\\\"polykrise\\\");\\n}\\n// Wirtschaftsexperiment - implement two different economic plans.\\nif ((Q.nationalization_progress >= 1 && Q.wtb_implemented >= 1) || (Q.wtb_implemented >= 1 && Q.moderate_plan_progress >= 1) || (Q.nationalization_progress >= 1 && Q.moderate_plan_progress >= 1)) {\\n    this.achieve(\\\"wirtschaftsexperiment\\\");\\n}\\n// Syndikalismus - support factory takeovers by workers.\\nif (Q.factory_takeovers >= 2) {\\n    this.achieve(\\\"syndikalismus\\\");\\n}\\n// Stolperstein - lose the civil war against Hitler.\\nif ((Q.chancellor_party == \\\"NSDAP\\\" || Q.chancellor == \\\"Hitler\\\" || Q.president == \\\"Hitler\\\") && Q.total_defeat) {\\n    this.achieve('stolperstein');\\n}\\n// Heidelberger Programm - fulfill the goals of the Heidelberg programm - increase welfare, reform justice, support women's rights, progressive taxation, works councils, build a European Union.\\nif ((Q.welfare > 0 && Q.judicial_reform >= 2 && Q.womens_work >= 1 && Q.family_law >= 1 && Q.upper_tax_rates > Q.lower_tax_rates && Q.works_councils > 0 && Q.eu > 0)) {\\n    this.achieve('heidelberger_programm');\\n}\"}],\"content\":{\"type\":\"heading\",\"content\":\"End\"}}},\"qualities\":{},\"qdisplays\":{\"loyalty\":{\"id\":\"loyalty\",\"type\":\"qdisplay\",\"content\":[{\"max\":0.06,\"output\":\"completely disloyal\"},{\"min\":0.06,\"max\":0.19,\"output\":\"very disloyal\"},{\"min\":0.19,\"max\":0.31,\"output\":\"generally disloyal\"},{\"min\":0.31,\"max\":0.41,\"output\":\"mostly disloyal\"},{\"min\":0.41,\"max\":0.54,\"output\":\"divided\"},{\"min\":0.54,\"max\":0.71,\"output\":\"mostly loyal\"},{\"min\":0.71,\"max\":0.95,\"output\":\"generally loyal\"},{\"min\":0.95,\"output\":\"completely loyal\"}]},\"parochial_radicalism\":{\"id\":\"parochial_radicalism\",\"type\":\"qdisplay\",\"content\":[{\"max\":0.25,\"output\":\"Harmonius\"},{\"min\":0.25,\"max\":0.5,\"output\":\"Mollified\"},{\"min\":0.5,\"max\":0.7,\"output\":\"Moderate\"},{\"min\":0.7,\"max\":0.9,\"output\":\"Angry\"},{\"min\":0.9,\"max\":1,\"output\":\"Hateful\"},{\"min\":1,\"max\":1.5,\"output\":\"Full blown fascism\"}]},\"parochialism\":{\"id\":\"parochialism\",\"type\":\"qdisplay\",\"content\":[{\"min\":0,\"max\":6,\"output\":\"Welcome\"},{\"min\":6,\"max\":19,\"output\":\"Acceptance\"},{\"min\":19,\"max\":31,\"output\":\"Tolerance\"},{\"min\":31,\"max\":41,\"output\":\"Apathy\"},{\"min\":41,\"max\":54,\"output\":\"Suspicion\"},{\"min\":54,\"max\":71,\"output\":\"Shunning\"},{\"min\":71,\"max\":95,\"output\":\"Excluding\"},{\"min\":95,\"max\":500,\"output\":\"Sectarian\"}]},\"legality\":{\"id\":\"legality\",\"type\":\"qdisplay\",\"content\":[{\"max\":-99.9,\"output\":{\"type\":\"magic\",\"content\":\"<span style=\\\"color: #8c1700;\\\" class=\\\"tooltip-text\\\" title=\\\"Seeking to erradicate group\\\">Hunted</span>\"}},{\"min\":-99.9,\"max\":-49.9,\"output\":{\"type\":\"magic\",\"content\":\"<span style=\\\"color: #b86554;\\\" class=\\\"tooltip-text\\\" title=\\\"Targeting organization revenues and personal\\\">Suppression</span>\"}},{\"min\":-49.9,\"max\":-9.9,\"output\":{\"type\":\"magic\",\"content\":\"<span style=\\\"color: #c8c222;\\\" class=\\\"tooltip-text\\\" title=\\\"Targeting key assets to send a message\\\">Curtailing</span>\"}},{\"min\":-9.9,\"max\":9.9,\"output\":{\"type\":\"magic\",\"content\":\"<span style=\\\"color: #8dcff6;\\\" class=\\\"tooltip-text\\\" title=\\\"Unconcerned by activities\\\">Indifferent</span>\"}},{\"min\":9.9,\"max\":49.9,\"output\":{\"type\":\"magic\",\"content\":\"<span style=\\\"color: #336aa8;\\\" class=\\\"tooltip-text\\\" title=\\\"Making opportunistic deals\\\">Tolerated</span>\"}},{\"min\":49.9,\"max\":99.9,\"output\":{\"type\":\"magic\",\"content\":\"<span style=\\\"color: #021580;\\\" class=\\\"tooltip-text\\\" title=\\\"Turning a blind eye to all activities\\\">Conencted</span>\"}},{\"min\":99.9,\"output\":{\"type\":\"magic\",\"content\":\"<span style=\\\"color: #198900;\\\" class=\\\"tooltip-text\\\" title=\\\"Openly using organization\\\">Patronized</span>\"}}]},\"infrastructure\":{\"id\":\"infrastructure\",\"type\":\"qdisplay\",\"content\":[{\"max\":0.999,\"output\":\"collapsed\"},{\"min\":0.999,\"max\":1.999,\"output\":\"few areas supported\"},{\"min\":1.999,\"max\":2.999,\"output\":\"small areas supported\"},{\"min\":2.999,\"max\":3.999,\"output\":\"large patches supported\"},{\"min\":3.999,\"max\":4.999,\"output\":\"low capacity\"},{\"min\":4.999,\"max\":5.999,\"output\":\"medium capacity\"},{\"min\":5.999,\"max\":6.999,\"output\":\"above medium capacity\"},{\"min\":6.999,\"max\":7.999,\"output\":\"somewhat large capacity\"},{\"min\":7.999,\"max\":8.999,\"output\":\"large network capacity\"},{\"min\":8.999,\"max\":9.999,\"output\":\"very large network capacity\"},{\"min\":9.999,\"output\":\"robust infrastructure\"}]},\"dissent\":{\"id\":\"dissent\",\"type\":\"qdisplay\",\"content\":[{\"max\":4.999,\"output\":\"very low\"},{\"min\":4.999,\"max\":14.999,\"output\":\"low\"},{\"min\":14.999,\"max\":30.999,\"output\":\"medium\"},{\"min\":30.999,\"max\":49.999,\"output\":\"high\"},{\"min\":49.999,\"output\":\"very high\"}]},\"coalition_dissent\":{\"id\":\"coalition_dissent\",\"type\":\"qdisplay\",\"content\":[{\"max\":0,\"output\":\"very low\"},{\"min\":1,\"max\":1,\"output\":\"low\"},{\"min\":2,\"max\":2,\"output\":\"medium\"},{\"min\":3,\"max\":3,\"output\":\"high\"},{\"min\":4,\"output\":\"very high\"}]},\"taxation\":{\"id\":\"taxation\",\"type\":\"qdisplay\",\"content\":[{\"max\":-6,\"output\":\"extremely low\"},{\"min\":-5,\"max\":-4,\"output\":\"very low\"},{\"min\":-3,\"max\":-2,\"output\":\"low\"},{\"min\":-1,\"max\":-1,\"output\":\"below baseline\"},{\"min\":0,\"max\":0,\"output\":\"moderate\"},{\"min\":1,\"max\":1,\"output\":\"above baseline\"},{\"min\":2,\"max\":3,\"output\":\"high\"},{\"min\":4,\"max\":5,\"output\":\"very high\"},{\"min\":6,\"output\":\"extremely high\"}]},\"month\":{\"id\":\"month\",\"type\":\"qdisplay\",\"content\":[{\"min\":1,\"max\":1,\"output\":\"January\"},{\"min\":2,\"max\":2,\"output\":\"February\"},{\"min\":3,\"max\":3,\"output\":\"March\"},{\"min\":4,\"max\":4,\"output\":\"April\"},{\"min\":5,\"max\":5,\"output\":\"May\"},{\"min\":6,\"max\":6,\"output\":\"June\"},{\"min\":7,\"max\":7,\"output\":\"July\"},{\"min\":8,\"max\":8,\"output\":\"August\"},{\"min\":9,\"max\":9,\"output\":\"September\"},{\"min\":10,\"max\":10,\"output\":\"October\"},{\"min\":11,\"max\":11,\"output\":\"November\"},{\"min\":12,\"max\":12,\"output\":\"December\"}]},\"militancy\":{\"id\":\"militancy\",\"type\":\"qdisplay\",\"content\":[{\"max\":0.05,\"output\":\"Nonexistant\"},{\"min\":0.05,\"max\":0.14,\"output\":\"Very low\"},{\"min\":0.14,\"max\":0.24,\"output\":\"Low\"},{\"min\":0.24,\"max\":0.44,\"output\":\"Medium-low\"},{\"min\":0.44,\"max\":0.69,\"output\":\"Medium\"},{\"min\":0.69,\"max\":1,\"output\":\"High\"},{\"min\":1,\"output\":\"Very high\"}]},\"relationships\":{\"id\":\"relationships\",\"type\":\"qdisplay\",\"content\":[{\"max\":5,\"output\":\"hostile\"},{\"min\":5,\"max\":14.9,\"output\":\"frigid\"},{\"min\":14.9,\"max\":29.9,\"output\":\"cold\"},{\"min\":29.9,\"max\":39.9,\"output\":\"cool\"},{\"min\":39.9,\"max\":54.9,\"output\":\"neutral\"},{\"min\":54.9,\"max\":64.9,\"output\":\"warm\"},{\"min\":64.9,\"max\":74.9,\"output\":\"friendly\"},{\"min\":74.9,\"output\":\"very friendly\"}]},\"rival_relationships\":{\"id\":\"rival_relationships\",\"type\":\"qdisplay\",\"content\":[{\"max\":-99.999,\"output\":{\"type\":\"magic\",\"content\":\"<span style=\\\"color: #8c1700;\\\" class=\\\"tooltip-text\\\" title=\\\"Open use of corporate armies and warships\\\">Total War</span>\"}},{\"min\":-99.999,\"max\":-49.999,\"output\":{\"type\":\"magic\",\"content\":\"<span style=\\\"color: #b86554;\\\" class=\\\"tooltip-text\\\" title=\\\"Widespread use of assassinations and terror\\\">Bloody Conflict</span>\"}},{\"min\":-49.999,\"max\":-9.999,\"output\":{\"type\":\"magic\",\"content\":\"<span style=\\\"color: #c8c222;\\\" class=\\\"tooltip-text\\\" title=\\\"Trying to kill or destroy key assets\\\">Conflict</span>\"}},{\"min\":-9.999,\"max\":9.999,\"output\":{\"type\":\"magic\",\"content\":\"<span style=\\\"color: #8dcff6;\\\" class=\\\"tooltip-text\\\" title=\\\"Only clashing where profitable\\\">Detente</span>\"}},{\"min\":9.999,\"max\":49.999,\"output\":{\"type\":\"magic\",\"content\":\"<span style=\\\"color: #336aa8;\\\" class=\\\"tooltip-text\\\" title=\\\"Avoiding harming each other\\\">Truce</span>\"}},{\"min\":49.999,\"max\":99.999,\"output\":{\"type\":\"magic\",\"content\":\"<span style=\\\"color: #021580;\\\" class=\\\"tooltip-text\\\" title=\\\"Finding agreements\\\">Understanding</span>\"}},{\"min\":99.999,\"output\":{\"type\":\"magic\",\"content\":\"<span style=\\\"color: #198900;\\\" class=\\\"tooltip-text\\\" title=\\\"Far reaching cooperation\\\">Alliance</span>\"}}]},\"strength\":{\"id\":\"strength\",\"type\":\"qdisplay\",\"content\":[{\"min\":0,\"max\":10,\"output\":\"weak\"},{\"min\":10,\"max\":25,\"output\":\"moderate\"},{\"min\":25,\"max\":40,\"output\":\"strong\"},{\"min\":40,\"max\":60,\"output\":\"very strong\"},{\"min\":60,\"output\":\"dominant\"}]}},\"tagLookup\":{\"govt_affairs\":{\"shuffle_cabinet\":true,\"militia_degrade\":true,\"security\":true},\"cabinet\":{\"shuffle_cabinet\":true},\"event\":{\"organize_phase_start\":true,\"orc_marriage1\":true,\"syndicate_infighting\":true,\"refugees_earth\":true,\"migrations\":true,\"great_protector_dispute\":true,\"refugees_otherworld\":true,\"refugees_titan\":true,\"september_convention\":true,\"cable_break\":true,\"mss_dundalk_affair\":true,\"great_protector\":true,\"orc_marriage2\":true},\"endings\":{\"game_over.hitler_wins\":true,\"game_over.war_against_hitler\":true,\"game_over.no_hitler\":true,\"game_over.nsdap_win\":true,\"game_over.civil_war_won\":true,\"game_over.civil_war_lost\":true,\"game_over.long_war\":true,\"game_over.braun_victorious\":true,\"game_over.president_schumacher\":true,\"game_over.president_juchacz\":true,\"game_over.president_einstein\":true,\"game_over.spd_victorious\":true,\"game_over.communist_victory\":true,\"game_over.works_program\":true,\"game_over.unemployment_reduced\":true,\"game_over.unemployment_reduced_2\":true,\"game_over.unemployment_high\":true,\"game_over.emergency_government\":true,\"game_over.peoples_party_achieved\":true,\"game_over.nationalization_achieved\":true,\"game_over.works_councils\":true,\"game_over.european_union\":true,\"game_over.achievements\":true},\"advisor\":{\"callista\":true,\"jacobs\":true,\"sage\":true,\"stacy\":true},\"tunnel_clans\":{\"callista\":true},\"nerds\":{\"jacobs\":true,\"sage\":true},\"punk\":{\"stacy\":true},\"organize_phase\":{\"magic\":true,\"activist_training\":true,\"coop_economy\":true,\"contracting\":true,\"education\":true},\"party_affairs\":{\"peer_media\":true}}}"};(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/* dendry
 * http://github.com/idmillington/dendry
 *
 * MIT License
 */
/*jshint indent:2 */
(function() {
  'use strict';

  // To avoid the need to include any utility libraries when this is
  // used in a browser, define some helper functions we'd normally
  // rely on libraries for.

  var assert = function(mustBeTrue) {
    /* istanbul ignore if */
    if (!mustBeTrue) {
      throw new Error('Assertion failed.');
    }
  };

  var each = function(array, fn) {
    for (var i = 0; i < array.length; ++i) {
      fn(array[i]);
    }
  };

  var objEach = function(obj, fn) {
    for (var key in obj) {
      fn(key, obj[key]);
    }
  };

  var merge = function() {
    var result = {};
    for (var i = 0; i < arguments.length; ++i) {
      var obj = arguments[i];
      for (var key in obj) {
        result[key] = obj[key];
      }
    }
    return result;
  };

  // Credit: Taken from Lodash (MIT License). See CREDITS.
  var isObject = function(value) {
    var type = typeof value;
    return type === 'function' || (value && type === 'object') || false;
  };

  var makeFunctionFromSource = function(source) {
    source = source.trim();
    /*jshint -W054 */
    var fn = new Function('state', 'Q', source);
    /*jshint +W054 */
    fn.source = source;
    return fn;
  };

  var runActions = function(actions, context, state) {
    if (actions === undefined) {
      return;
    }
    each(actions, function(fn) {
      try {
        fn.call(context, state, state.qualities);
      } catch (err) {
        // Ignore errors. TODO: Log them somehow?
        console.log('Error:', err);
      }
    });
  };

  var runPredicate = function(predicate, default_, context, state) {
    var result = default_;
    if (predicate === undefined) {
      return result;
    }
    try {
      result = !!predicate.call(context, state, state.qualities);
    } catch (err) {
      // Ignore errors. TODO: Log them somehow?
      console.log('Error:', err);
    }
    return result;
  };

  var runExpression = function(expression, default_, context, state) {
    var result = default_;
    if (expression === undefined) {
      return result;
    }
    try {
      result = expression.call(context, state, state.qualities);
    } catch (err) {
      // Ignore errors. TODO: Log them somehow?
      console.log('Error in expression', expression, ':', err);
    }
    return result;
  };

  var convertJSONToGame = function(json, callback) {
    var reviver = function(key, value) {
      if (isObject(value) && value.$code !== undefined) {
        return makeFunctionFromSource(value.$code);
      } else {
        return value;
      }
    };

    try {
      var game = JSON.parse(json, reviver);
      return callback(null, game);
    } catch (err) {
      return callback(err);
    }
  };

  var simpleContent = function(text) {
    return [{type:'paragraph', content:text}];
  };

  var getCardinalNumber = function(value) {
    if (Math.floor(value) === value && value >= 0 && value <= 12) {
      // Integer, so use word.
      return ['zero', 'one', 'two', 'three', 'four', 'five', 'six',
              'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve'][value];
    } else {
      return value.toString();
    }
  };

  var getOrdinalNumber = function(value) {
    if (Math.floor(value) === value && value >= 0) {
      if (value <= 12) {
        return ['zeroth', 'first', 'second', 'third', 'fourth', 'fifth',
                'sixth', 'seventh', 'eighth', 'ninth', 'tenth', 'eleventh',
                'twelfth'][value];
      } else {
        value = value.toString();
        if (/1[0-9]$/.test(value)) {
          return value + 'th';
        } else {
          var last = value.substr(value.length - 1, 1);
          switch (last) {
            case '1': return value + 'st';
            case '2': return value + 'nd';
            case '3': return value + 'rd';
            default: return value + 'th';
          }
        }
      }
    } else {
      return value.toString();
    }
  };

  var getFudgeDisplay = function(value) {
    if (Math.floor(value) === value) {
      if (value > 3) {
        return 'superb+' + (value - 3);
      } else if (value < -3) {
        return 'terrible' + (value + 3);
      } else {
        switch (value) {
          case  3: return 'superb';
          case  2: return 'great';
          case  1: return 'good';
          case  0: return 'fair';
          case -1: return 'mediocre';
          case -2: return 'poor';
          case -3: return 'terrible';
        }
      }
    } else {
      return value.toString();
    }
  };

  var getUserQDisplay = function(value, qdisplay) {
    for (var i = 0; i < qdisplay.content.length; ++i) {
      var case_ = qdisplay.content[i];
      var min = case_.min;
      var max = case_.max;
      if ((min === undefined || min <= value) &&
          (max === undefined || max >= value)) {
        if (case_.output !== undefined) {
          return case_.output;
        } else {
          return value.toString();
        }
      }
    }
    return value.toString();
  };

  // broad difficulty from https://fallenlondon.wiki/wiki/Broad_difficulty
  
  var calculateBroadDifficulty = function(quality, difficulty, scaler, random) {
    if (!scaler) {
      scaler = 0.6;
    }
    if (scaler > 1) {
      scaler = scaler/100;
    }
    var success_prob = scaler*(quality/difficulty);
    if (success_prob > 1) {
      success_prob = 1;
    }
    return success_prob;
 };

  // narrow difficulty from https://fallenlondon.wiki/wiki/Narrow_difficulty
  var calculateNarrowDifficulty = function(quality, difficulty, increment) {
    if (!increment) {
      increment = 0.1;
    }
    if (increment > 1) {
      increment = increment/100;
    }
    var success_prob = (quality - difficulty)*increment + 0.5;
    if (success_prob > 1) {
      success_prob = 1;
    } else if (success_prob < increment) {
      success_prob = increment;
    }
    return success_prob;
  };

  // this function actually does the roll for success.
  var rollDifficulty = function(success_prob, random) {
    var rn;
    if (random) {
      rn = random.random();

    } else {
      rn = Math.random();
    }
    if (rn < success_prob) {
      return true;
    }
    return false;   
  };


  // use the storynexus adjectives
  var displayDifficulty = function(success_prob) {
    if (success_prob <= 0.1) {
      return "almost impossible";
    } else if (success_prob <= 0.3) {
      return "high-risk";
    } else if (success_prob <= 0.4) {
      return "tough";
    } else if (success_prob <= 0.5) {
      return "very chancy";
    } else if (success_prob <= 0.6) {
      return "chancy";
    } else if (success_prob <= 0.7) {
      return "modest";
    } else if (success_prob <= 0.8) {
      return "very modest";
    } else if (success_prob <= 0.9) {
      return "low risk";
    } else {
      return "straightforward";
    }
  };


  // ------------------------------------------------------------------------

  // Objects with this interface are passed to a game state to have it
  // display content.
  var UserInterface = function() {};
  UserInterface.prototype.beginGame = function() {};
  UserInterface.prototype.displayContent = function(paragraphs, faceImage) {};
  // these are the dendrynexus display functions
  // displays the decks
  UserInterface.prototype.displayDecks = function(decks) {};
  // displays cards in hand
  UserInterface.prototype.displayHand = function(hand) {};
  // displays pinned cards (these are basically an alternate way of displaying choices)
  UserInterface.prototype.displayPinnedCards = function(cards) {};

  UserInterface.prototype.displayChoices = function(choices) {};
  UserInterface.prototype.displayGameOver = function() {
    this.displayContent(simpleContent('Game Over'));
  };
  UserInterface.prototype.removeChoices = function() {};
  // Called when the player makes a choice and new content is about to be
  // added (i.e. isn't called between output when the next scene is arrived
  // at via go-to).
  UserInterface.prototype.beginOutput = function() {};
  UserInterface.prototype.endOutput = function() {};
  UserInterface.prototype.newPage = function() {};
  UserInterface.prototype.setStyle = function(style) {};
  UserInterface.prototype.signal = function(data) {};
  UserInterface.prototype.setBg = function(img) {};
  UserInterface.prototype.setSprites = function(data) {};
  UserInterface.prototype.setSpriteStyle = function(loc, style) {};
  UserInterface.prototype.audio = function(audio) {};
  // Not part of the UI, but allows us to simply subclass.
  UserInterface.makeParentOf = function(OtherConstructor) {
    OtherConstructor.prototype = new UserInterface();
    OtherConstructor.constructor = OtherConstructor;
  };

  // ------------------------------------------------------------------------

  // An engine is given a user interface, the game and the current
  // game state (can be omitted). It is responsible for the logic of
  // the game.
  var DendryEngine = function(ui, game) {
    this.ui = ui;
    this.game = game;
  };

  DendryEngine.prototype.displayGameOver = function() {
    this.ui.displayGameOver();
    return this;
  };

  DendryEngine.prototype.displayChoices = function() {
    // TODO: dendrynexus - if the current scene is a hand, display the decks, hand, and pinned cards.
    var choices = this.getCurrentChoices();
    assert(choices);
    var scene = this.getCurrentScene();
    if (scene.isHand) {
      // separate choices into decks and pinned cards
      var decks = [];
      var pinnedCards = [];
      for (var c of choices) {
        var choiceScene = this.game.scenes[c.id];
        if (choiceScene.isDeck) {
          // if the deck has
          if (!this._drawFromDeck(c.id)) {
            c.canChoose = false;
            c.subtitle = c.unavailableSubtitle || "No cards available from deck.";
          } else {
            c.canChoose = true;
          }
          c.isDeck = true;
          c.image = choiceScene.cardImage;
          decks.push(c);
        } else if (choiceScene.isPinnedCard) {
          c.isDeck = false;
          c.image = choiceScene.cardImage;
          pinnedCards.push(c);
        }
      }
      if (!this.state.currentHands[this.state.sceneId]) {
        this.state.currentHands[this.state.sceneId] = [];
      }
      var currentHand = this.state.currentHands[this.state.sceneId];
      // TODO: check the viewIf/chooseIf conditions for all cards in the current hand, and filter them if they no longer work...
      var handIds = {};
      for (var card of currentHand) {
        handIds[card.id] = card;
      }
      handIds = this.__filterViewable(handIds);
      for (var i = 0; i < currentHand.length; i++) {
        while (currentHand[i] && !handIds[currentHand[i].id]) {
          currentHand.splice(i, 1);
        }
      }
      if (decks.length > 0) {
          this.ui.displayDecks(decks);
      }
      if (scene.maxCards > 0) {
          this.ui.displayHand(currentHand, scene.maxCards);
      }
      this.ui.displayPinnedCards(pinnedCards);
    } else {
      if (this.state.enableTranscript) {
        this.transcript.push(choices);
      }
      this.ui.displayChoices(choices);
    }
    return this;
  };

  DendryEngine.prototype.displaySceneContent = function(restorePage) {
    var scene = this.getCurrentScene();
    assert(scene);
    // TODO: displaying images
    var faceImage = null;
    if (scene.faceImage) {
      faceImage = scene.faceImage;
    }
    var sceneSignal = scene.signal || this.game.sceneSignal;
    if (sceneSignal !== undefined) {
      this.ui.signal({signal:sceneSignal,
                      event:'scene-display',
                      id:this.state.sceneId});
    }
    if (restorePage) {
      this.ui.newPage();
      this.ui.displayContent(this.state.tempCurrentContent, faceImage);
      this.state.currentContent = this.state.tempCurrentContent.slice();
    } else if (scene.newPage) {
      this.ui.newPage();
      this.state.currentContent = [];
    }
    this.ui.setStyle(scene.style);
    this.ui.removeChoices();

    if (scene.content !== undefined && !restorePage) {
      var displayContent = this._makeDisplayContent(scene.content, true);
      if (this.state.enableTranscript) {
        this.transcript = this.transcript.concat(displayContent);
      }
      this.state.currentContent = this.state.currentContent.concat(displayContent);
      this.ui.displayContent(displayContent, faceImage);
    }
    this._runActions(scene.onDisplay);

    return this;
  };

  DendryEngine.prototype.choose = function(choiceIndex) {
    var choices = this.choiceCache;

    // Check for valid choice.
    assert(choices);
    if (choices.length <= choiceIndex) {
      throw new Error('No choice at index ' + choiceIndex + ', only ' +
                      choices.length + ' choices are available.');
    }

    // Commit the choice.
    var choice = choices[choiceIndex];
    if (!choice.canChoose) {
      throw new Error('Attempted to choose index ' + choiceIndex + ', but ' +
                      'that choice is unavailable.');
    }

    var id = choice.id;
    if (this.state.enableTranscript) {
      this.transcript.push('> ' + choice.title);
    }

    delete this.choiceCache;
    this.goToScene(id);

    return this;
  };

  DendryEngine.prototype.chooseSceneId = function(sceneId) {
    delete this.choiceCache;
    this.goToScene(id);

    return this;
  };

  // TODO: dendrynexus - draw card
  DendryEngine.prototype.drawCard = function(deckId) {
    var currentSceneId = this.state.sceneId;
    var scene = this.getCurrentScene();
    assert(scene);
    
    var currentHand = this.state.currentHands[currentSceneId];
    // return a message saying that there are too many cards
    if (scene.maxCards <= currentHand.length) {
      return {id: null, title: 'no_space_in_hand'};
    }
    // get an available card from deckId
    // card is {id: id, title: title}
    var card = this._drawFromDeck(deckId);
    // distinguish between the "no space left in hand" and "no card in deck" situations?
    if (!card) {
      return {id: null, title: 'no_card_in_deck'};
    }
    this.state.lastDrawnCard = card;
    var image = this.game.scenes[card.id].cardImage;
    card.image = image;
    this.state.currentHands[currentSceneId].push(card);

    // display the hand
    this.ui.displayHand(this.state.currentHands[currentSceneId], scene.maxCards);
    return card;
  };


  // dendrynexus - play a card (remove it from the current hand)
  // should this be the code for pinned cards as well?
  DendryEngine.prototype.playCard = function(cardId) {
    var currentSceneId = this.state.sceneId;
    var currentHand = this.state.currentHands[currentSceneId];
    // remove card from hand
    for (var i = 0; i < currentHand.length; i++) {
      if (currentHand[i].id == cardId) {
        currentHand.splice(i, 1);
        break;
      }
    }
    this.state.lastPlayedCard = this.game.scenes[cardId];
    delete this.choiceCache;
    this.goToScene(cardId);
  };

  DendryEngine.prototype.playPinnedCard = function(cardId) {
    delete this.choiceCache;
    this.goToScene(cardId);
  };

  DendryEngine.prototype.goToScene = function(id) {
    this.state.sceneIdsSinceGoTo = [];
    this.ui.beginOutput();
    this.__changeScene(id);
    this.ui.endOutput();
  };

  DendryEngine.prototype.beginGame = function(rndSeeds) {
    this.random = rndSeeds ? Random.fromSeeds(rndSeeds) : Random.fromUnique();
    this.state = {
      sceneId: null,
      sceneIdsSinceGoTo: [],
      rootSceneId: this.game.rootScene || this.game.firstScene || 'root',
      gameOver: false,
      visits: {},
      qualities: {},
      currentRandomState: null,
      currentContent: [],
      // tempCurrentContent is used for when the
      // player visits the stats or settings pages in order to remember
      // where the previous page was?
      tempCurrentContent: [],
      // prevSpecialSceneId is only set when visiting scene tagged with
      // isSpecial = true, and is the scene before the special scene.
      prevSpecialSceneId: null,
      prevSceneId: null,
      // every time a top-level scene changes,
      // this record the last-visited qualified id within that scene.
      prevTopSceneId: null,
      // jumpScene is defined within a scene file, indicating the scene that
      // @jumpScene will go to. Basically it's used to make subroutines.
      jumpSceneId: null,
      // achievements is a dict of all the current achievements.
      // persist achievements in the browser through localstorage?
      achievements: {},
      // current background image
      bg: null,
      // sceneStack is used for goSub
      sceneStack: [],
      // true if just popped out of a returnScene
      justReturned: false,
      // just returned from a goSubStart
      justReturnedStart: false,
      // just returned from a goSubEnd
      justReturnedEnd: false,
      // sprites is a mapping from location to file
      sprites: {},
      // dendrynexus stuff
      // mapping from sceneId to list of sceneIds - indicating the current hand in each of those scenes.
      currentHands: {},
      // last drawn card
      lastDrawnCard: null,
      lastPlayedCard: null,

      enableTranscript: false,
      // whether or not to disable saves
      disableSaves: false,
    };
    // TODO: transcript
    this.transcript = [];

    this._setUpQualities();
    this._loadAchievements();

    this.ui.beginGame();

    var id = this.game.firstScene || this.state.rootSceneId;
    this.goToScene(id);

    return this;
  };

  DendryEngine.prototype._loadAchievements = function() {
    if (typeof localStorage !== 'undefined') {
        if (localStorage[this.game.title + '_achievements']) {
            this.state.achievements = JSON.parse(
                localStorage[this.game.title + '_achievements']);
            // add a special quality named 'achievement_'
            for (var achievement in this.state.achievements) {
                this.state.qualities['achievement_' + achievement] = 1;
            }
        }
    }
  };

  DendryEngine.prototype.gameOver = function() {
    this.state.gameOver = true;
    this.displayGameOver();
    return this;
  };

  DendryEngine.prototype.isGameOver = function() {
    return this.state.gameOver;
  };

  DendryEngine.prototype.getCurrentScene = function() {
    var scene = this.game.scenes[this.state.sceneId];
    assert(scene !== undefined);
    return scene;
  };

  // Returns the choices for the current scene. Choices are objects
  // with an id and a title property, not to be confused with the
  // option objects in a scene (though options are used to generate
  // choices). Choices are compiled from the options belonging to the
  // current scene.
  DendryEngine.prototype.getCurrentChoices = function() {
    return this.choiceCache;
  };

  // Sets the current state of the engine from an exportable state.
  DendryEngine.prototype.setState = function(state) {
    // Set the state.
    this.state = state;
    this._setUpQualities();
    this.random = Random.fromState(this.state.currentRandomState);
    this._loadAchievements();

    // Display the current state.
    if (this.isGameOver()) {
      this.displayGameOver();
    } else {
      var scene = this.getCurrentScene();
      this.choiceCache = this._compileChoices(scene);
      this.ui.newPage();
      this.ui.removeChoices();
      this.ui.displayContent(this.state.currentContent);
      this.displayChoices();
      this.ui.setSprites(this.state.sprites);
      this.ui.setBg(this.state.bg);
    }
    return this;
  };

  // Returns a data structure for exporting without any accessors or
  // complex classes.
  DendryEngine.prototype.getExportableState = function() {
    // Because we only have complex state in the qualities (they have
    // accessors), and because we save with JSON (which calls
    // accessors correctly), we don't have to worry about giving the
    // actual state. Note that, if you want to keep this object, however,
    // you want to clone it somehow (turning it to and from json,
    // for example), otherwise it will change as the engine updates.
    return this.state;
  };

  // ------------------------------------------------------------------------

  DendryEngine.prototype._getQDisplay = function(value, qDisplayId) {
    switch (qDisplayId) {
    case 'cardinal': case 'number':
      return getCardinalNumber(value);
    case 'ordinal':
      return getOrdinalNumber(value);
    case 'fudge':
      return getFudgeDisplay(value);
    default:
      var qdisplay = this.game.qdisplays[qDisplayId];
      assert(qdisplay !== undefined);
      return getUserQDisplay(value, qdisplay);
    }
  };

  DendryEngine.prototype._evaluateStateDependencies = function(defs) {
    var result = [];

    for (var i = 0; i < defs.length; ++i) {
      var value;
      var def = defs[i];
      var fn = def.fn;
      switch (def.type) {
      case 'insert':
        value = this._runExpression(fn);
        if (def.qdisplay) {
          value = this._getQDisplay(value, def.qdisplay);
        } else {
          value = value.toString();
        }
        break;

      default:
        assert(def.type === 'predicate');
        value = this._runPredicate(fn);
        break;
      }

      // Recurse the resolution into the resulting value, if needed.
      if (value.stateDependencies !== undefined) {
        // We have to resolve the nested state dependencies.
        value = this._makeDisplayContent(value, false);
      }
      result.push(value);
    }
    return result;
  };

  DendryEngine.prototype._mergeStateEvalsInArray = function(array, evals) {
    if (!Array.isArray(array)) {
      array = [array];
    }
    var result = [];
    for (var i = 0; i < array.length; ++i) {
      result = result.concat(this._mergeStateEvals(array[i], evals));
    }
    return result;
  };

  DendryEngine.prototype._mergeStateEvals = function(content, evals) {
    if (content.type === undefined) {
      return [content];
    }

    var result;
    switch (content.type) {
    case 'conditional':
      if (evals[content.predicate]) {
        result = this._mergeStateEvalsInArray(content.content, evals);
      } else {
        result = [];
      }
      break;
    case 'insert':
      result = evals[content.insert];
      break;
    default:
      var newE = {type:content.type};
      newE.content = this._mergeStateEvalsInArray(content.content, evals);
      result = [newE];
      break;
    }
    return result;
  };

  DendryEngine.prototype._makeDisplayContent = function(content, useParas) {
    // Raw content can just be returned.
    if (content.content === undefined) {
      if (Array.isArray(content)) {
        return content;
      } else if (useParas) {
        return [{type:'paragraph', content:content}];
      } else {
        return [content];
      }
    } else if (content.stateDependencies === undefined &&
               content.type !== undefined) {
      return [content];
    }

    // Merge in dependencies if we have them
    var stateDepDefs = content.stateDependencies;
    var displayContent = content.content;
    if (stateDepDefs && stateDepDefs.length > 0) {
      var evals = this._evaluateStateDependencies(stateDepDefs);
      if (!Array.isArray(displayContent)) {
        displayContent = [displayContent];
      }
      displayContent = this._mergeStateEvalsInArray(
        displayContent, evals
      );
    }
    return displayContent;
  };

  DendryEngine.prototype._setUpQualities = function() {
    var _Q = this._qualitiesAccessorsPrivate = {};
    var Q = this.state.qualities;
    var that = this;
    objEach(this.game.qualities, function(id, quality) {
      var min = quality.min;
      var max = quality.max;
      var signal = quality.signal || that.game.qualitySignal;
      var predicate = quality.isValid;
      var needsAccessors = (
        min !== undefined ||
        max !== undefined ||
        signal !== undefined ||
        predicate !== undefined
      );
      if (needsAccessors) {
        if (Q[id] !== undefined) {
          _Q[id] = Q[id];
        }
        Q.__defineGetter__(id, function() {
          return _Q[id];
        });
        Q.__defineSetter__(id, function(value) {
          if (min !== undefined && value < min) {
            value = min;
          }
          if (max !== undefined && value > max) {
            value = max;
          }
          var was = _Q[id];
          _Q[id] = value;

          // Check if the new value is not allowed.
          if (!that._runPredicate(predicate, true)) {
            // Reverse the change.
            _Q[id] = value = was;
          }

          // Signal after the change is made.
          if (signal !== undefined && value !== was) {
            var signalObj = {
              signal: signal,
              event: 'quality-change',
              id: id,
              now: value
            };
            if (was !== undefined) {
              signalObj.was = was;
            }
            that.ui.signal(signalObj);
          }
        });
      }
      if (quality.initial !== undefined && Q[id] === undefined) {
        Q[id] = quality.initial;
      }
    });
  };

  DendryEngine.prototype._runActions = function(actions) {
    runActions(actions, this, this.state);
  };

  DendryEngine.prototype._runPredicate = function(predicate, default_) {
    return runPredicate(predicate, default_, this, this.state);
  };

  DendryEngine.prototype._runExpression = function(expression, default_) {
    return runExpression(expression, default_, this, this.state);
  };

  DendryEngine.prototype.__changeScene = function(id) {
    if (this.state.justReturned) {
        this.state.justReturned = false;
    }
    var scene = null;
    var restorePage = false;
    // if id is 'prevScene', go to the previous scene.
    if (id == 'prevScene') {
      if (this.prevSceneId === null) {
        // this really only comes up on the very first scene of the game.
      }
      scene = this.game.scenes[this.state.prevSceneId];
      id = this.state.prevSceneId;
      assert(scene);
    } else if (id == 'prevTopScene') {
      scene = this.game.scenes[this.state.prevTopSceneId];
      id = this.state.prevTopSceneId;
      assert(scene);
    } else if (id == 'jumpScene') {
      scene = this.game.scenes[this.state.jumpSceneId];
      id = this.state.jumpSceneId;
      assert(scene);
    } else if (id === 'backSpecialScene') {
      scene = this.game.scenes[this.state.prevSpecialSceneId];
      id = this.state.prevSpecialSceneId;
      restorePage = true;
      assert(scene);
      // if prevSpecialSceneId is null, this indicates that
      // we're not within a specialScene, and we can set a jump point.
      this.state.prevSpecialSceneId = null;
    } else {
      scene = this.game.scenes[id];
      assert(scene);
    }


    // Leave previous scene.
    var fromId = this.state.sceneId;
    var lastScene = this.game.scenes[fromId];
    if (!!fromId) {
      this.state.prevSceneId = fromId;
      if (lastScene.newPage) {
        this.state.prevTopSceneId = fromId;
      }
      if (scene.isSpecial && this.state.prevSpecialSceneId === null) {
        this.state.tempCurrentContent = this.state.currentContent.slice();
        this.state.prevSpecialSceneId = fromId;
      }
      var from = this.getCurrentScene();
      this._runActions(from.onDeparture);
      var fromSignal = from.signal || this.game.sceneSignal;
      if (fromSignal !== undefined) {
        this.ui.signal({signal:fromSignal,
                        event:'scene-departure',
                        id:this.state.sceneId,
                        'to':id});
      }
    }

    // Arrive at current scene.
    this.state.sceneId = id;
    this.state.sceneIdsSinceGoTo.push(id);

    if (scene.setRoot) {
      this.state.rootSceneId = id;
    }
    if (scene.setJump) {
      this.state.jumpSceneId = scene.setJump;
    }

    if (scene.countVisitsMax !== undefined) {
      if (this.state.visits[id] === undefined) {
        this.state.visits[id] = 1;
      } else if (this.state.visits[id] < scene.countVisitsMax) {
        this.state.visits[id]++;
      }
    }

    if (!restorePage && !this.state.justReturned) {
        // If we go back from a special scene (e.g. the stats page),
        // we probably don't want to run the scene actions again.
        this._runActions(scene.onArrival);
        // TODO: After running onArrival, we should run call if call has
        if (scene.call) {
          var callScene = this.game.scenes[scene.call];
          this._runActions(callScene.onArrival);
        }
    }
    var sceneSignal = scene.signal || this.game.sceneSignal;
    if (sceneSignal !== undefined) {
      var signal = {
        signal: sceneSignal,
        event: 'scene-arrival',
        id: id
      };
      if (!!fromId) {
        signal.from = fromId;
      }
      this.ui.signal(signal);
    }

    // We're done with any code that might generate random numbers
    // (except go-to, which will recurse into this method anyway), so we
    // can store the seed which can be used to replay the behavior
    // from here.
    this.state.currentRandomState = this.random.getState();
    //if (!this.state.justReturned) {
        // if the state has just returned from a goSub, we don't display
        // the content?
        // TODO: i'm not sure what the best logic for this is...
        // Maybe the text pre-gosub should be displayed only after the goSub?
    this.displaySceneContent(restorePage);
    //}
    // display background
    if (scene.setBg) {
        this.state.bg = scene.setBg;
        this.ui.setBg(scene.setBg);
    }
    if (scene.setSprites) {
        this.state.sprites = scene.setSprites;
        this.ui.setSprites(scene.setSprites);
    }
    if (scene.audio) {
        this.ui.audio(scene.audio);
    }
    // TODO: there has got to be a better way of doing this.
    if (scene.setTopLeftStyle) {
        this.ui.setSpriteStyle('topLeft', scene.setTopLeftStyle);
    }
    if (scene.setTopRightStyle) {
        this.ui.setSpriteStyle('topRight', scene.setTopRightStyle);
    }
    if (scene.setBottomLeftStyle) {
        this.ui.setSpriteStyle('bottomLeft', scene.setBottomLeftStyle);
    }
    if (scene.setBottomRightStyle) {
        this.ui.setSpriteStyle('bottomRight', scene.setBottomRightStyle);
    }
    // update achievement
    if (scene.achievement) {
        this.achieve(scene.achievement);

    }

    // Check if we have any reason to leave the scene, or end the game.
    var done = false;
    if (scene.gameOver === true) {
      done = true;
      this.gameOver();
    } else if (scene.goSubEnd && !this.state.justReturnedEnd) {
      // goSub
      var validSubs = [];
      for (var s1 = 0; s1 < scene.goSub.length; ++s1) {
        var sub = scene.goSub[s1];
        if (sub.predicate === undefined ||
            this._runPredicate(sub.predicate)) {
          validSubs.push(sub.id);
        }
      }
    } else if (scene.goTo) {
      // Find all valid gotos.
      var validGoToIds = [];
      for (var i = 0; i < scene.goTo.length; ++i) {
        var goTo = scene.goTo[i];
        if (goTo.predicate === undefined ||
            this._runPredicate(goTo.predicate)) {
          validGoToIds.push(goTo.id);
        }
      }
      if (validGoToIds.length === 1) {
        done = true;
        this.__changeScene(validGoToIds[0]);
      } else if (validGoToIds.length > 1) {
        var randomNumber = this.random.uint32();
        var choice = randomNumber % validGoToIds.length;
        var chosenGoToId = validGoToIds[choice];
        done = true;
        this.__changeScene(chosenGoToId);
      }
    } else if (scene.goToRef) {
      // do some gotoref
      var validRefs = [];
      for (var s = 0; s < scene.goToRef.length; ++s) {
        var ref = scene.goToRef[s];
        if (ref.predicate === undefined ||
            this._runPredicate(ref.predicate)) {
          validRefs.push(ref.id);
        }
      }
      if (validRefs.length === 1) {
        done = true;
        this.__changeScene(this.state.qualities[validRefs[0]]);
      } else if (validRefs.length > 1) {
        var c = this.random.uint32() % validRefs.length;
        var chosenRef = validRefs[c];
        done = true;
        this.__changeScene(this.state.qualities[chosenRef]);
      }
    }

    // dendrynexus: calculate checks
    // WHAT IF scenes have gotos and checks. huh. don't do that. Let's just say that is undefined behavior.
    var hasCheck = false;
    var successProb, isSuccess;
    if (scene.checkQuality && scene.broadDifficulty && scene.checkSuccessGoTo && scene.checkFailureGoTo) {
      var scaler = 0.6;
      if (scene.difficultyScaler) {
        scaler = scene.difficultyScaler;
      }
      successProb = calculateBroadDifficulty(this.state.qualities[scene.checkQuality] || 0, scene.broadDifficulty, scaler);
      hasCheck = true;
    } else if (scene.checkQuality && scene.narrowDifficulty && scene.checkSuccessGoTo && scene.checkFailureGoTo) {
      var increment = 0.1;
      if (scene.difficultyIncrement) {
        increment = scene.difficultyIncrement;
      }
      successProb = calculateNarrowDifficulty(this.state.qualities[scene.checkQuality] || 0, scene.narrowDifficulty, increment);
      hasCheck = true;
    }
    if (hasCheck) {
      isSuccess = rollDifficulty(successProb, this.random); 
      // logic for changing the scene on success/failure of the check
      done = true;
      if (isSuccess) {
        this.__changeScene(scene.checkSuccessGoTo);
      } else {
        this.__changeScene(scene.checkFailureGoTo);
      }
    }

    // If we've not ended, nor found a valid go-to, then we try choices.
    if (!done) {
      this.choiceCache = this._compileChoices(scene);
      if (this.choiceCache === null) {
        // Explicitly disallowing game over keeps us stuck here.
        if (scene.gameOver !== false) {
          this.gameOver();
        }
      } else {
        this.displayChoices();
      }
    }
  };

  DendryEngine.prototype.achieve = function(achievementName) {
    this.state.achievements[achievementName] = 1;
    // add a special quality named 'achievement_'
    this.state.qualities['achievement_' + achievementName] = 1;
    // add a new quality indicating that the achievement has been done for the current game
    this.state.qualities['game_achievement_' + achievementName] = 1;
    // set localStorage for achievement
    if (typeof localStorage !== 'undefined') {
      localStorage[this.game.title + '_achievements'] = JSON.stringify(this.state.achievements);
    }
  };

  DendryEngine.prototype.__getChoiceSelectionData = function(idToInfoMap) {
    var result = [];
    for (var id in idToInfoMap) {
      var optionScene = this.game.scenes[id];
      var optionInfo = idToInfoMap[id];

      optionInfo.order = optionInfo.order || optionScene.order || 0;
      optionInfo.priority = optionInfo.priority || optionScene.priority || 1;
      // Because 'null' is a valid frequency, we can't use || to do this.
      if (optionInfo.frequency === undefined) {
        optionInfo.frequency = optionScene.frequency;
        if (optionInfo.frequency === undefined) {
          optionInfo.frequency = 100;
        }
      }
      // get variable frequencies
      if (optionScene.frequencyVar) {
        optionInfo.frequency = this.runExpression(optionScene.frequencyVar);
      }
      optionInfo.selectionPriority = 0; // Used by __filterByPriority

      result.push(optionInfo);
    }
    return result;
  };

  DendryEngine.prototype.__filterViewable = function(idToInfoMap) {
    var result = {};
    for (var id in idToInfoMap) {
      var thisScene = this.game.scenes[id];

      // This id fails if it is past its max visits.
      var maxVisits = thisScene.maxVisits;
      if (maxVisits !== undefined) {
        var visits = this.state.visits[id] || 0;
        if (visits >= maxVisits) {
          continue;
        }
      }
      if (thisScene.maxVisitsVar !== undefined) {
        maxVisits = this._runExpression(thisScene.maxVisitsVar);
        var v2 = this.state.visits[id] || 0;
        if (v2 >= maxVisits) {
          continue;
        }
      }

      // Fiter out scenes that can't be viewed.
      var canView = this._runPredicate(thisScene.viewIf, true);
      if (!canView) {
        continue;
      }

      // It passes otherwise.
      result[id] = idToInfoMap[id];
    }
    return result;
  };

  DendryEngine.prototype.__getChoiceIdsFromOptions = function(options) {
    var that = this;

    var choices = {};
    each(options, function(option) {
      // Filter out options that can't be viewed.
      if (!that._runPredicate(option.viewIf, true)) {
        return;
      }

      if (option.id.substr(0, 1) === '@') {
        // This is an id, use it.
        var trimmedId = option.id.substring(1);
        var choice = merge(option, {id:trimmedId});
        choices[trimmedId] = choice;
      } else {
        assert(option.id.substr(0, 1) === '#');
        // This is a tag, add all matching ids.
        var ids = that.game.tagLookup[option.id.substring(1)];
        objEach(ids, function(id) {
          if (choices[id] === undefined) {
            choices[id] = merge(option, {id:id});
          }
        });
      }
    });
    return choices;
  };

  // Code based on Undum (MIT License). See CREDITS.
  DendryEngine.prototype.__filterByPriority = function(choices,
                                                       minChoices,
                                                       maxChoices) {
    assert(minChoices === null ||
           maxChoices === null ||
           maxChoices >= minChoices);
    var that = this;

    var committed = [];
    var candidates = [];
    var choice;

    // Work in descending priority order.
    choices.sort(function(a, b) {
      return b.priority - a.priority;
    });

    // First phase: we make sure we have at least our minimum number
    // of choices, and that we consider the minimum possible number of
    // priorities to reach that minimum.
    var lastPriority;
    for (var i = 0; i < choices.length; ++i) {
      choice = choices[i];
      if (choice.priority !== lastPriority) {
        if (lastPriority !== undefined) {
          // Priority has decreased, use the candidates if there are enough.
          if (minChoices === null || i >= minChoices) {
            break;
          }
        }

        // We're going on, so commit our current candidates.
        committed.push.apply(committed, candidates);
        candidates = [];
        lastPriority = choice.priority;
      }
      candidates.push(choice);
    }

    // Second phase: we commit as many candidates as we can without
    // exceeding our maximum.
    // TODO: think about tag choices vs builtin choices
    var committedChoices = committed.length;
    var totalChoices = committedChoices + candidates.length;
    if (maxChoices === null || maxChoices >= totalChoices) {
      // We can use all the candidates without exceeding our maximum.
      committed.push.apply(committed, candidates);
    } else {
      // Take a subset of the candidates, using their relative frequency.
      each(candidates, function(choice) {
        if (choice.frequency === null) {
          choice.selectionPriority = 0; // Always choose.
        } else {
          choice.selectionPriority = that.random.random() / choice.frequency;
        }
      });
      candidates.sort(function(a, b) {
        return a.selectionPriority - b.selectionPriority;
      });
      var extraChoices = maxChoices - committedChoices;
      var chosen = candidates.slice(0, extraChoices);
      committed.push.apply(committed, chosen);
    }

    return committed;
  };

  DendryEngine.prototype.__getChoiceDisplayData = function(choicesSelected) {
    var choiceOutput = [];
    var numChoosable = 0;

    for (var i = 0; i < choicesSelected.length; ++i) {
      var choice = choicesSelected[i];
      var choiceScene = this.game.scenes[choice.id];

      // Figure out if this choice can be chosen.
      var canChoose = true;
      if (choice.chooseIf) {
        canChoose = this._runPredicate(choice.chooseIf, true);
      }
      if (canChoose && choiceScene.chooseIf) {
        canChoose = this._runPredicate(choiceScene.chooseIf, true);
      }

      var title = choice.title || choiceScene.title;
      assert(title);

      var subtitle = null;
      if (!canChoose) {
        subtitle = choice.unavailableSubtitle ||
                   choiceScene.unavailableSubtitle;
      }
      if (!subtitle) {
        subtitle = choice.subtitle || choiceScene.subtitle;
      }


      var finalChoice = {
        id:choice.id,
        canChoose:canChoose,
        title:this._makeDisplayContent(title, false)
      };
      if (subtitle) {
        finalChoice.subtitle = this._makeDisplayContent(subtitle, false);
      }
      // dendrynexus - add success/failure probabilities, and challenges.
      var successProb;
      if (choiceScene.checkQuality && choiceScene.broadDifficulty && choiceScene.checkSuccessGoTo && choiceScene.checkFailureGoTo) {
        var scaler = 0.6;
        if (choiceScene.difficultyScaler) {
          scaler = choiceScene.difficultyScaler;
        }
        successProb = calculateBroadDifficulty(this.state.qualities[choiceScene.checkQuality] || 0, choiceScene.broadDifficulty, scaler);
        finalChoice.checkQuality = choiceScene.checkQuality;
        finalChoice.successProb = successProb;
        finalChoice.difficulty = displayDifficulty(successProb);
      } else if (choiceScene.checkQuality && choiceScene.narrowDifficulty && choiceScene.checkSuccessGoTo && choiceScene.checkFailureGoTo) {
        var increment = 0.1;
        if (choiceScene.difficultyIncrement) {
          increment = choiceScene.difficultyIncrement;
        }
        successProb = calculateNarrowDifficulty(this.state.qualities[choiceScene.checkQuality] || 0, choiceScene.narrowDifficulty, increment);
        finalChoice.checkQuality = choiceScene.checkQuality;
        finalChoice.successProb = successProb;
        finalChoice.difficulty = displayDifficulty(successProb);
      }

      choiceOutput.push(finalChoice);
      if (canChoose) {
        ++numChoosable;
      }
    }

    return {choices:choiceOutput, numChoosable:numChoosable};
  };

  DendryEngine.prototype._compileChoices = function(scene) {
    assert(scene);

    var options = scene.options;
    var choiceOutput = [];
    var numChoosable = 0;
    if (options !== undefined) {

      var choiceIds = this.__getChoiceIdsFromOptions(options);
      choiceIds = this.__filterViewable(choiceIds);

      var validChoiceData = this.__getChoiceSelectionData(choiceIds);
      var minChoices = scene.minChoices || null;
      var maxChoices = scene.maxChoices || null;
      validChoiceData = this.__filterByPriority(validChoiceData,
                                                minChoices, maxChoices);

      // Sort the result into display order.
      validChoiceData.sort(function(a, b) {
        return a.order - b.order;
      });

      // Now we've chosen our selection, get the final displayable data.
      var data = this.__getChoiceDisplayData(validChoiceData);
      choiceOutput = data.choices;
      numChoosable = data.numChoosable;
    }

    if (numChoosable === 0) {
      // We have no choosable options, so add the default option (NB:
      // this may take us over the max-choices limit).
      var root = this.state.rootSceneId;
      if (root !== this.state.sceneId) {
        var rootSceneChoose = this.game.scenes[root].chooseIf;
        if (!rootSceneChoose || this._runPredicate(rootSceneChoose, true)) {
          choiceOutput.push({id:root, title:'Continue...', canChoose:true});
          ++numChoosable;
        }
      }
    }
    if (numChoosable > 0) {
      return choiceOutput;
    } else {
      return null;
    }
  };


  // dendrynexus - this returns a single available card from the given deck, formatted as an object of the type {id: id, title: title}
  DendryEngine.prototype._drawFromDeck = function(deckId) {
    var scene = this.game.scenes[deckId];
    var viewableScenes = this._compileChoices(scene);
    if (!viewableScenes) {
      return null;
    }
    var choosableScenes = [];
    var currentHand = this.state.currentHands[this.state.sceneId];
    if (!currentHand) {
        currentHand = [];
    }
    currentHand = currentHand.map((x)=>x.id);
    for (var x of viewableScenes) {
      var choiceScene = this.game.scenes[x.id];
      // filter for whether the card is in the hand
      if (x.canChoose && choiceScene.isCard &&  currentHand.indexOf(x.id) < 0) {
        choosableScenes.push(x);
      }
    }
    if (!choosableScenes) {
      return null;
    }
    var randomNumber = this.random.uint32();
    var choice = randomNumber % choosableScenes.length;
    // this.state.currentRandomState = this.random.getState();
    return choosableScenes[choice];
  };

  // ------------------------------------------------------------------------

  // Marsaglia, George (July 2003). 'Xorshift RNGs'.
  // Journal of Statistical Software 8 (14).
  var Random = function(v, w, x, y, z) {
    this.getState = function() {
      return [v, w, x, y, z];
    };
    var uint32Multiply = function(a, b) {
      var aHigh = (a >> 16) & 0xffff;
      var aLow = a & 0xffff;
      var bHigh = (b >> 16) & 0xffff;
      var bLow = b & 0xffff;
      var prodHigh = ((aHigh * bLow) + (aLow * bHigh)) & 0xffff;
      return ((prodHigh << 16) >>> 0) + (aLow * bLow);
    };
    this.uint32 = function() {
      var t = (x ^ (x >>> 7)) >>> 0;
      x = y;
      y = z;
      z = w;
      w = v;
      v = (v ^ (v << 6)) ^ (t ^ (t << 13)) >>> 0;
      return uint32Multiply((y + y + 1), v) >>> 0;
    };
    this.random = function() {
      return this.uint32() * 2.3283064365386963e-10;
    };
  };

  var __next = 1;
  Random.fromUnique = function() {
    var seed = new Date().getTime();
    return Random.fromSeeds([seed, __next++]);
  };

  Random.fromTime = function() {
    return Random.fromSeeds([new Date().getTime()]);
  };

  Random.fromSeeds = function(seeds) {
    var v = 886756453;
    var w = 88675123;
    var x = 123456789;
    var y = 362436069;
    var z = 521288629;

    // The seed hashing function is based on Mash 0.9 (MIT License).
    // See CREDITS.
    var hashSeed = function(data) {
      data = data.toString();
      var n = 0xefc8249d;
      for (var i = 0; i < data.length; i++) {
        n += data.charCodeAt(i);
        var h = 0.02519603282416938 * n;
        n = h >>> 0;
        h -= n;
        h *= n;
        n = h >>> 0;
        h -= n;
        n += h * 0x100000000;
      }
      return (n >>> 0) * 2.3283064365386963e-10;
    };

    for (var i = 0; i < seeds.length; i++) {
      var hashedSeed = hashSeed(seeds[i]) * 0x100000000;
      v ^= hashedSeed;
      w ^= hashedSeed;
      x ^= hashedSeed;
      y ^= hashedSeed;
      z ^= hashedSeed;
    }
    return new Random(v, w, x, y, z);
  };

  Random.fromState = function(state) {
    return new Random(state[0], state[1], state[2], state[3], state[4]);
  };

  // ------------------------------------------------------------------------

  module.exports = {
    makeFunctionFromSource: makeFunctionFromSource,
    runActions: runActions,
    runPredicate: runPredicate,
    runExpression: runExpression,
    convertJSONToGame: convertJSONToGame,
    simpleContent: simpleContent,

    getCardinalNumber: getCardinalNumber,
    getOrdinalNumber: getOrdinalNumber,
    getUserQDisplay: getUserQDisplay,
    getFudgeDisplay: getFudgeDisplay,

    DendryEngine: DendryEngine,
    UserInterface: UserInterface,
    NullUserInterface: UserInterface,

    Random: Random
  };
}());

},{}],2:[function(require,module,exports){
/* dendry
 * http://github.com/idmillington/dendry
 *
 * MIT License
 */
/*jshint indent:2 */
(function($) {
  'use strict';

  var contentToHTML = require('./content/html');
  var engine = require('../engine');

  var BrowserUserInterface = function(game, $content) {
    this.game = game;
    this.$content = $content;
    this._registerEvents();

    this.dendryEngine = new engine.DendryEngine(this, game);
    // TODO: refactor how the settings work - move it all within a single object
    this.base_settings = {'disable_bg': false, 'animate':false, 'animate_bg': true, 'disable_audio': false, 'show_portraits': true, 'dark_mode': false};
    // current settings...
    this.current_settings = {'disable_bg': false, 'animate':false, 'animate_bg': true, 'disable_audio': false, 'show_portraits': true, 'dark_mode': false};
    this.disable_bg = false;
    this.animate = false;
    this.animate_bg = true;
    this.disable_audio = false;
    // backgrounds and portraits are 100% optional, and most games will not use them.
    this.show_portraits = true;
    this.fade_time = 600;
    this.bg_fade_out_time = 200;
    this.bg_fade_in_time = 1000;
    this.sound_fade_time = 2000;
    this.contentToHTML = contentToHTML;

    // sprites
    this.spriteLocs = {'topLeft': 1, 'topRight': 1, 'bottomLeft': 1, 'bottomRight': 1};
    // current HTMLAudioElement
    this.currentAudio = null;
    // current audio url
    this.currentAudioURL = '';
    this.audioQueue = [];
    // playlist is used for shuffling...
    this.audioPlaylist = [];
    // flag for determining if we're on a new page, up until the first choice.
    this.onNewPage = false;

    // for saving
    this.save_prefix = game.title + '_' + game.author + '_save';
    this.max_slots = 8; // max save slots
    this.DateOptions = {hour: 'numeric',
                 minute: 'numeric',
                 second: 'numeric',
                 year: 'numeric', 
                 month: 'short', 
                 day: 'numeric' };
  };
  engine.UserInterface.makeParentOf(BrowserUserInterface);

  // ------------------------------------------------------------------------
  // Main API

  //load a game as a json file from a url, and then run the game...
  BrowserUserInterface.prototype.loadGame = function(url) {
      var that = this;
      if (!url.endsWith('.json')) { 
          if (url.endsWith('/')) { 
              url = url + 'game.json';
          } else { 
              url = url + '/game.json';
          } 
      } 
      fetch(url)
      .then(response => response.text())
      .then(json => { 
          game = engine.convertJSONToGame(json, function(err, game) {
              if (err) {
                throw err;
              }
              return game;
          });
          that.game = game;
          that.dendryEngine = new engine.DendryEngine(that, game);

          that.dendryEngine.beginGame();
      })
      .catch(err => console.log(err));
  };


  BrowserUserInterface.prototype.displayContent = function(paragraphs, faceImage) {
    var $html = $(contentToHTML.convert(paragraphs));
    // TODO: maybe face image visibility should be controlled by a different setting?
    var hasImage = false;
    if (faceImage && this.show_portraits) {
        hasImage = true;
        // convert faceImage into an html object
        console.log(faceImage);
        //var cardEl = $('<div>').addClass('face-figure');
        var cardEl = document.createElement('div');
        cardEl.className = "face-figure";
        //var $image = $('<img>').addClass('face-img').attr({src : faceImage});
        var image = new Image();
        image.className = "face-img";
        cardEl.appendChild(image);
        $html.splice(1, 0, cardEl);
        image.src = faceImage;
        /*
        if (!this.animate) {
            var that = this;
            image.onload = function() {
                that.$content.append($html);
                console.log('image loaded');
            };
            image.src = faceImage;
        }
        */
    }
    if (this.animate) {
        $html.fadeIn(this.fade_time);
        this.$content.append($html);
    } else {
        if (!hasImage) {
            this.$content.append($html);
        } else {
            this.$content.append($html);
        }
    }
    $html.focus();
    // allow user to add custom stuff on display content (for sidebar in this case)
    if (window && window.onDisplayContent) {
        window.onDisplayContent();
    }
  };

  BrowserUserInterface.prototype.displayGameOver = function() {
    var $p = $('<p>').text(this.getGameOverMsg()).addClass('game-over');
    if (this.animate) {
        $p.fadeIn(this.fade_time);
        this.$content.append($p);
    } else {
        this.$content.append($p);
    }
    $p.focus();
  };

  BrowserUserInterface.prototype.displayChoices = function(choices) {
    var $ul = $('<ul>').addClass('choices');
    for (var i = 0; i < choices.length; ++i) {
      var choice = choices[i];

      var title = contentToHTML.convertLine(choice.title);
      var subtitle = "";
      if (choice.subtitle !== undefined) {
        subtitle = contentToHTML.convertLine(choice.subtitle);
      }

      var $li = $('<li>');
      var $titleHolder = $li;
      if (choice.canChoose) {
        $titleHolder = $('<a>').attr({href: '#', 'data-choice': i});
        $li.html($titleHolder);
      } else {
        $titleHolder.addClass('unavailable');
      }
      $titleHolder.html(title);
      if (choice.checkQuality && choice.difficulty && choice.successProb !== undefined) {
        if (subtitle) {
          subtitle += '<br>';
        }
        subtitle += 'Check: ' + choice.checkQuality + '<br>';
        subtitle += 'Difficulty: ' + choice.difficulty + ' (' + Math.floor(choice.successProb*100) + '%)';
      }
      if (subtitle) {
        $li.append($('<div>').addClass('subtitle').html(subtitle));
      }

      $ul.append($li);
    }
    if (this.animate) {
        $ul.fadeIn(this.fade_time);
        this.$content.append($ul);
    }
    else {
        this.$content.append($ul);
    }
    $ul.focus();
    if (this.onNewPage) {
      this.onNewPage = false;
      if (window && window.onNewPage) {
        window.onNewPage();
      }
    }
  };

  BrowserUserInterface.prototype.newPage = function() {
    if (this.animate) {
        var $content = this.$content;
        this.$content.empty();
        this.$content.children().fadeOut(this.fade_time, function() {
        });
    } else {
        this.$content.empty();
    }
    this.onNewPage = true;

  };

  BrowserUserInterface.prototype.setStyle = function(style) {
    this.$content.removeClass();
    if (style !== undefined) {
      this.$content.addClass(style);
    }
  };

  BrowserUserInterface.prototype.removeChoices = function() {
    $('.choices', this.$content).remove();
    $('.hidden', this.$content).remove();
  };

  BrowserUserInterface.prototype.beginOutput = function() {
    $("#read-marker", this.$content).remove();
    this.$content.append($('<hr>').attr('id', 'read-marker'));
  };

  BrowserUserInterface.prototype.endOutput = function() {
    var $marker = $("#read-marker");
    if (this.animate) {
        if ($marker.length > 0) {
          $('html, body').animate({scrollTop: $marker.offset().top}, this.fade_time);
        } else {
          $('html, body').animate({scrollTop: 0}, this.fade_time);
        }
    }
  };

  BrowserUserInterface.prototype.signal = function(data) {
    // TODO: implement signals - signals contain signal, event, and id
    console.log(data);
    var signal = data.signal;
    var event = data.event; // scene-arrival, scene-display, scene-departure, quality-change
    var scene_id = data.id;
    // TODO: handle this in the game.js for each specific game
    if (window && window.handleSignal) {
        window.handleSignal(signal, event, scene_id);
    }
  };

  // dendrynexus displays
  // displays the hand.
  BrowserUserInterface.prototype.displayHand = function(hand, maxCards) {
    if (window && window.displayHand) {
      window.displayHand(hand, maxCards);
      return null;
    }
    var handDescription = 'Hand - click a card to play.';
    if (window.handDescription) {
      handDescription = window.handDescription;
    }
    if (this.dendryEngine.state.qualities.handDescription) {
      handDescription = this.dendryEngine.state.qualities.handDescription;
    }
    var $handEl = $('.hand');
    var hasOldHand = false;
    if ($handEl.length == 0) {
        $handEl = $('<ul>').addClass('hand');
        this.$content.append($('<hr>'));
        this.$content.append($('<p>').addClass('hand-description').text(handDescription));
    } else {
        $handEl.empty();
        hasOldHand = true;
    }
    // display the hand
    for (var i = 0; i < maxCards; i++) {
      var $cardEl = $('<li>').addClass('card-in-hand');
      if (hand[i]) {
        var card = hand[i];
        // create an <a> element, with an image nested inside.
        var $cardLink = $('<a>').addClass('card').attr({href: '#', 'card-id': card.id, title: card.title});
        var $title = $('<span>').addClass('card-caption').text(card.title);
        // if there is an image, set the image; otherwise, set image to a gradient?
        if (card.image) {
          var $cardImage = $('<img>').addClass('card-img').attr({src: card.image});
          $cardLink.append($cardImage);
        } else {
        }
        if (card.subtitle) {
          var $cardSubtitle = $('<span>').addClass('card-tooltip').text(card.subtitle);
          $cardLink.append($cardSubtitle);
        }
        $cardEl.append($cardLink);
        $cardEl.append($title);
        $handEl.append($cardEl);
      } else {
        var $blankCardDiv = $('<div>').addClass('blank-card');
        $cardEl.append($blankCardDiv);
      }
      $handEl.append($cardEl);
    }
    if (!hasOldHand) {
        this.$content.append($handEl);
    }
  };


  BrowserUserInterface.prototype.displayDecks = function(decks) {
    if (window && window.displayDecks) {
      window.displayDecks(decks);
      return null;
    }
    var deckDescription = 'Decks - click a deck to draw a card.';
    if (window.deckDescription) {
      deckDescription = window.deckDescription;
    }
    if (this.dendryEngine.state.qualities.deckDescription) {
      deckDescription = this.dendryEngine.state.qualities.deckDescription;
    }
    this.$content.append($('<hr>'));
    this.$content.append($('<p>').addClass('deck-description').text(deckDescription));
    var $decksEl = $('<ul>').addClass('decks');
    for (var deck of decks) {
      var $deckEl = $('<li>').addClass('deck');
      // create an <a> element, with an image nested inside.
      var $deckLink = $('<a>').addClass('card').attr({href: '#', 'card-id': deck.id, title: deck.title});
      var $title = $('<span>').addClass('card-caption').text(deck.title);
      // if there is an image, set the image; otherwise, set image to a gradient?
      if (deck.image) {
        var $deckImage = $('<img>').addClass('card-img').attr({src: deck.image});
        $deckLink.append($deckImage);
      } else {
        // TODO: set alternative background for $deckLink to a gradient
      }
      if (deck.subtitle) {
        // if there's a subtitle, create a tooltip
        var $deckSubtitle = $('<span>').addClass('card-tooltip').text(deck.subtitle);
        $deckLink.append($deckSubtitle);
      }
      if (!deck.canChoose) {
        $deckEl = $deckEl.addClass('unavailable-card');
      }
      $deckEl.append($deckLink);
      $deckEl.append($title);
      $decksEl.append($deckEl);
    }
    this.$content.append($decksEl);
  };

  // displays pinned cards for dendrynexus
  BrowserUserInterface.prototype.displayPinnedCards = function(cards) {
    if (cards.length == 0) {
      return null;
    }
    if (window && window.displayPinnedCards) {
      window.displayPinnedCards(cards);
      return null;
    }
    var pinnedCardsDescription = 'Pinned cards - click a card to play.';
    if (window.pinnedCardsDescription) {
      pinnedCardsDescription = window.pinnedCardsDescription;
    }
    if (this.dendryEngine.state.qualities.pinnedCardsDescription) {
      pinnedCardsDescription = this.dendryEngine.state.qualities.pinnedCardsDescription;
    }
    this.$content.append($('<hr>'));
    this.$content.append($('<p>').addClass('pinned-text-description').text(pinnedCardsDescription));
    var $cardsEl = $('<ul>').addClass('pinned-cards');
    for (var card of cards) {
      var $cardEl = $('<li>').addClass('pinned-card');
      // create an <a> element, with an image nested inside.
      var $cardLink = $('<a>').addClass('card').attr({href: '#', 'card-id': card.id, title: card.title});
      var $title = $('<span>').addClass('card-caption').text(card.title);
      // if there is an image, set the image; otherwise, set image to a gradient?
      if (card.image) {
        var $cardImage = $('<img>').addClass('card-img').attr({src: card.image});
        $cardLink.append($cardImage);
      } else {
      }
      if (card.subtitle) {
        var $cardSubtitle = $('<span>').addClass('card-tooltip').text(card.subtitle);
        $cardLink.append($cardSubtitle);
      }
      $cardEl.append($cardLink);
      $cardEl.append($title);
      $cardsEl.append($cardEl);
    }
    this.$content.append($cardsEl);
  };

  // visual extensions

  BrowserUserInterface.prototype.setBg = function(image_url) {
      if (this.disable_bg) {
            $('#bg1').addClass('content_hidden');
            $('#bg1').removeClass('content_visible');
            $('#bg1').css('background-image', 'none'); 
      }
      else if (!image_url || image_url == 'none' || image_url == 'null') {
          if (this.animate_bg) {
            $('#bg1').addClass('content_hidden');
            $('#bg1').removeClass('content_visible');
            setTimeout(function() {
                $('#bg1').css('background-image', 'none'); 
                $('#bg1').removeClass('content_hidden');
                $('#bg1').addClass('content_visible');
            },
            100);
          } else {
              $('#bg1').css('background-image', 'none'); 
          }
      } else if (image_url.startsWith('#') || image_url.startsWith('rgba(') || image_url.startsWith('rgb(')) {
          if (this.animate_bg) {
            $('#bg1').fadeOut(this.bg_fade_out_time, function() {
                $('#bg1').css('background-image', 'none'); 
                $('#bg1').css('background-color', image_url);
            });
            $('#bg1').fadeIn(this.bg_fade_in_time, function() {
                $('#bg2').css('background-image', 'none'); 
            });
            console.log('changing background color ' + image_url);
          } else {
              $('#bg1').css('background-image', 'none'); 
              $('#bg1').css('bacground-color', image_url);
          }
      } else if (image_url.startsWith('linear-gradient(')) {
          if (this.animate_bg) {
            $('#bg1').fadeOut(this.bg_fade_out_time, function() {
                $('#bg1').css('background-image', image_url); 
            });
            $('#bg1').fadeIn(this.bg_fade_in_time, function() {
                $('#bg2').css('background-image', image_url); 
            });
            console.log('changing background gradient ' + image_url);
          } else {
              $('#bg1').css('background-image', image_url); 
          }
      } else {
          if (this.animate_bg) {
            $('#bg1').fadeOut(this.bg_fade_out_time, function() {
                $('#bg1').css('background-image', 'url("' + image_url + '")'); 
            });
            $('#bg1').fadeIn(this.bg_fade_in_time, function() {
                $('#bg2').css('background-image', $('#bg1').css('background-image'));
            });
      } else {
          $('#bg1').css('background-image', 'url("' + image_url + '")'); 
      }
    }
  };

  // set sprites given data
  // data is a list of two-element lists, where the first element is location
  // (one of topLeft, topRight, bottomLeft, bottomRight)
  // and the second element is the sprite.
  BrowserUserInterface.prototype.setSprites = function(data) {
      if (window && window.setSprites) {
          window.setSprites(data);
          return;
      }
      if (!this.show_portraits || data == 'none' || data == 'clear') {
          $('#topLeftSprite').children().fadeOut(this.fade_time, function() {$('#topLeftSprite').empty();});
          $('#topRightSprite').children().fadeOut(this.fade_time, function() {$('#topRightSprite').empty();});
          $('#bottomLeftSprite').children().fadeOut(this.fade_time, function() {$('#bottomLeftSprite').empty();});
          $('#bottomRightSprite').children().fadeOut(this.fade_time, function() {$('#bottomRightSprite').empty();});
          return;
      } else {
          if (data instanceof Array) {
              for (var i = 0; i < data.length; i++) {
                  var loc = data[i][0];
                  var img = data[i][1];
                  this.setSprite(loc, img);
              }
          } else if (data) {
                for (var key in Object.keys(data)) {
                  sprites.push([key, data[key]]);
              }
          }
      }
  };

  BrowserUserInterface.prototype.setSprite = function(loc, img) {
      if (!this.show_portraits) {
          return;
      }
      if (window && window.setSprite) {
          window.setSprite(loc, img);
          return;
      }
      loc = loc.toLowerCase();
      var targetSprite;
      if (loc == 'topleft') {
          targetSprite = $('#topLeftSprite');
      } else if (loc == 'topright') {
          targetSprite = $('#topRightSprite');
      } else if (loc == 'bottomleft') {
          targetSprite = $('#bottomLeftSprite');
      } else if (loc == 'bottomright') {
          targetSprite = $('#bottomRightSprite');
      }
      //targetSprite.empty();
      if (img == 'none' || img == 'clear') {
          delete this.dendryEngine.state.sprites[loc];
          targetSprite.fadeOut(this.fade_time, function() {targetSprite.empty();});
          return;
      } else {
          this.dendryEngine.state.sprites[loc] = img;
          targetSprite.fadeOut(this.fade_time, function() {
              targetSprite.emtpy();
              var image = new Image();
              image.src = img;
              targetSprite.append(image);
              console.log('fadeIn');
              targetSprite.fadeIn(this.fade_time);
          });
      }
  };

  BrowserUserInterface.prototype.setSpriteStyle = function(loc, style) {
      if (window && window.setSpriteStyle) {
          window.setSpriteStyle(loc, style);
          return;
      }
      var targetSprite;
      if (loc == 'topleft') {
          targetSprite = $('#topLeftSprite');
      } else if (loc == 'topright') {
          targetSprite = $('#topRightSprite');
      } else if (loc == 'bottomleft') {
          targetSprite = $('#bottomLeftSprite');
      } else if (loc == 'bottomright') {
          targetSprite = $('#bottomRightSprite');
      } else {
          return;
      }
      targetSprite.css(style);
  };

  // play audio with js
  // audio is a space-separated string with at least one entry.
  // the first entry will be a file url.
  // the second-nth entries are words describing how the file will be played:
  // 'queue' for playing the music next after the current audio ends
  // 'loop' if this music will loop indefinitely.
  // 'nofade' if the sound will be played instantly without a fadein or fadeout.
  // TODO: have a list of audio files...
  BrowserUserInterface.prototype.audio = function(audio) {
      if (this.disable_audio) {
          if (this.currentAudio) {
              this.currentAudio.pause();
              this.currentAudio.loop = false;
          }
          return;
      }
      var audioData = audio.split(' ');
      var audioFiles = [];
      var isLoop = false;
      var isQueue = false;
      var noFade = false;
      var isShuffle = false;
      var isClear = false;
      for (var name of audioData) {
          if (name == 'loop') {
              isLoop = true;
          } else if (name == 'queue') {
              isQueue = true;
          } else if (name == 'nofade') {
              noFade = true;
          } else if (name == 'shuffle') {
              isShuffle = true;
          } else if (name == 'clear') {
              isClear = true;
          } else {
              audioFiles.push(name);
          }
      }
      if (isClear) {
          this.audioPlaylist = [];
      }
      if (audioFiles.length >= 1 || isShuffle) {
          this.audioPlaylist = this.audioPlaylist.concat(audioFiles);
      }
      var audioFile = audioFiles[0];
      var currentAudio = this.currentAudio;
      var fadeTime = this.sound_fade_time;
      var loopCurrent = false;
      var playlist = this.audioPlaylist;
      // stop playing
      if (audioFile == 'null' || audioFile == 'none') {
          if (this.currentAudio) {
              $(currentAudio).animate({volume: 0},
                  this.sound_fade_time,
                  function() {
                      currentAudio.pause();
              });
              this.currentAudio.loop = false;
          }
      } else {
          // fadeout current audio, then fade-in new audio
          console.log('new audio:', audioFile, 'current audio:',  this.currentAudioURL);
          if (this.currentAudio && (this.currentAudioURL == audioFile || isQueue || isShuffle)) {
              if (!currentAudio.ended && !currentAudio.paused) {
                  console.log('adding music to queue');
                  this.audioQueue.push(audioFile);
                  var audioQueue = this.audioQueue;
                  this.currentAudio.onended = function() {
                      var newAudio;
                      if (isQueue) {
                          newAudio = audioQueue.pop();
                          console.log('playing from queue');
                      } else if (isShuffle) {
                          var index = Math.floor(Math.random()*playlist.length);
                          newAudio = playlist[index];
                          console.log('playing from playlist');
                      }
                      if (newAudio) {
                          currentAudio.src = newAudio;
                          console.log('Now playing', newAudio);
                          currentAudio.play();
                          $(currentAudio).animate({volume: 1},
                              fadeTime);
                          window.dendryUI.currentAudioURL = newAudio;
                      }
                  };
              } else {
                  this.currentAudioURL = audioFile;
                  currentAudio.src = audioFile;
                  console.log('Fading in new audio');
                  currentAudio.volume = 0;
                  currentAudio.play();
                  $(currentAudio).animate({volume: 1},
                      fadeTime);
                  this.currentAudio.onended = function() {
                      var newAudio;
                      if (isQueue) {
                          newAudio = audioQueue.pop();
                          console.log('playing from queue');
                      } else if (isShuffle) {
                          var index = Math.floor(Math.random()*playlist.length);
                          newAudio = playlist[index];
                          console.log('playing from playlist');
                      }
                      if (newAudio) {
                          currentAudio.src = newAudio;
                          console.log('Now playing', newAudio);
                          currentAudio.play();
                          $(currentAudio).animate({volume: 1},
                              fadeTime);
                          window.dendryUI.currentAudioURL = newAudio;
                      }
                  };
              }
          } else if (this.currentAudio) {
              // not queue or shuffle, so we stop playing the current audio.
              this.currentAudioURL = audioFile;
              console.log('currentAudio present,  fading out current audio');
              // reset the current audio function
              currentAudio.onended = function() {};
              if (noFade) {
                  currentAudio.pause();
                  currentAudio.src = audioFile;
                  currentAudio.play();
              } else {
                  $(currentAudio).animate({volume: 0},
                      this.sound_fade_time,
                      function() {
                          console.log(currentAudio);
                          currentAudio.src = audioFile;
                          console.log('Fading in new audio');
                          currentAudio.play();
                          $(currentAudio).animate({volume: 1},
                              fadeTime);
                  });
              }
          } else if (!this.currentAudio) {
              this.currentAudio = new Audio(audioFile);
              this.currentAudio.volume = 0;
              this.currentAudio.play();
              $(this.currentAudio).animate({volume: 1}, this.sound_fade_time);
              currentAudio = this.currentAudio;
              if (isShuffle) {
                  this.currentAudio.onended = function() {
                    var index = Math.floor(Math.random()*playlist.length);
                    var newAudio = playlist[index];
                    if (newAudio) {
                       currentAudio.src = newAudio;
                       console.log('playing from shuffle');
                       console.log('Now playing', newAudio);
                       currentAudio.play();
                       $(currentAudio).animate({volume: 1},
                              fadeTime);
                          // asdkfl;;sajd;lkjafdsdsaf;kjldjsfa;kl
                       window.dendryUI.currentAudioURL = newAudio;
                    }
                  };
              }
          }
          if (isLoop) {
              this.currentAudio.loop = true;
          } else {
              this.currentAudio.loop = false;
          }
          // https://stackoverflow.com/questions/7451508/html5-audio-playback-with-fade-in-and-fade-out
      }
  };

  BrowserUserInterface.prototype.saveSettings = function() {
    if (typeof localStorage !== 'undefined') {
        localStorage[this.game.title + '_animate'] = this.animate;
        localStorage[this.game.title + '_disable_bg'] = this.disable_bg;
        localStorage[this.game.title + '_animate_bg'] = this.animate_bg;
        localStorage[this.game.title + '_show_portraits'] = this.show_portraits;
        localStorage[this.game.title + '_disable_audio'] = this.disable_audio;
        localStorage[this.game.title + '_dark_mode'] = this.dark_mode;
        //localStorage[this.game.title + '_settings'] = JSON.stringify(this.current_settings);
    }
  };

  // TODO: this could be much cleaner...
  BrowserUserInterface.prototype.loadSettings = function(defaultSettings) {
    var defaults = {animate: false, disable_bg: false, animate_bg: true, 
                    show_portraits: true, disable_audio: false, dark_mode: false};
    if (typeof localStorage !== 'undefined') {
        for (var prop in defaults) {
            if (defaults.hasOwnProperty(prop)) {
                var lsKey = this.game.title + '_' + prop;
                if (lsKey in localStorage) {
                    this[prop] = localStorage[lsKey] != 'false';
                } else {
                    if (defaultSettings && defaultSettings.hasOwnProperty(prop)) {
                        this[prop] = defaultSettings[prop];
                    } else {
                        this[prop] = defaults[prop];
                    }
                }
            }
        }
    }
  };

  BrowserUserInterface.prototype.toggle_audio = function(enable_audio) {
      if (enable_audio) {
          this.disable_audio = false;
          if (this.currentAudio) {
              this.currentAudio.play();
          }
      } else {
          if (this.currentAudio) {
              this.currentAudio.pause();
              this.currentAudio.loop = false;
          }
          this.disable_audio = true;
      }
  };


  // save functions
  BrowserUserInterface.prototype.autosave = function() {
      var oldData = localStorage[this.save_prefix+'_a0'];
      if (oldData) {
          localStorage[this.save_prefix+'_a1'] = oldData;
          localStorage[this.save_prefix+'_timestamp_a1'] = localStorage[this.save_prefix+'_timestamp_a0'];
      }
      var slot = 'a0';
      var saveString = JSON.stringify(this.dendryEngine.getExportableState());
      localStorage[this.save_prefix + '_' + slot] = saveString;
      var scene = this.dendryEngine.state.sceneId;
      var date = new Date(Date.now());
      date = scene + '\n(' + date.toLocaleString(undefined, this.DateOptions) + ')';
      localStorage[this.save_prefix +'_timestamp_' + slot] = date;
      this.populateSaveSlots(slot + 1, 2);
  };

  BrowserUserInterface.prototype.quickSave = function() {
    var saveString = JSON.stringify(this.dendryEngine.getExportableState());
    localStorage[this.save_prefix + '_q'] = saveString;
    window.alert('Saved.');
  };

  BrowserUserInterface.prototype.saveSlot = function(slot) {
    var saveString = JSON.stringify(this.dendryEngine.getExportableState());
    localStorage[this.save_prefix + '_' + slot] = saveString;
    var scene = this.dendryEngine.state.sceneId;
    var date = new Date(Date.now());
    date = scene + '\n(' + date.toLocaleString(undefined, this.DateOptions) + ')';
    localStorage[this.save_prefix + '_timestamp_' + slot] = date;
    this.populateSaveSlots(slot + 1, 2);
  };

  BrowserUserInterface.prototype.quickLoad = function() {
    if (localStorage[this.save_prefix + '_q']) {
      var saveString = localStorage[this.save_prefix + '_q'];
      this.dendryEngine.setState(JSON.parse(saveString));
      window.alert('Loaded.');
    } else {
      window.alert('No save available.');
    }
  };

  BrowserUserInterface.prototype.loadSlot = function(slot) {
    if (localStorage[this.save_prefix + '_' + slot]) {
      var saveString = localStorage[this.save_prefix + '_' + slot];
      this.dendryEngine.setState(JSON.parse(saveString));
      // have a function for loading the game...
      if (window && window.onLoad) {
          window.onLoad();
      }
      this.hideSaveSlots();
      window.alert('Loaded.');
    } else {
      window.alert('No save available.');
    }
  };

  BrowserUserInterface.prototype.deleteSlot = function(slot) {
    if (localStorage[this.save_prefix + '_' + slot]) {
      localStorage[this.save_prefix + '_' + slot] = '';
      localStorage[this.save_prefix + '_timestamp_' + slot] = '';
      this.populateSaveSlots(slot + 1, 2);
    } else {
      window.alert('No save available.');
    }
  };

  BrowserUserInterface.prototype.exportSlot = function(slot) {
    if (localStorage[this.save_prefix + '_' + slot]) {
      var data = localStorage[this.save_prefix + '_' + slot];
      var a = document.createElement("a");
      var file = new Blob([data], {type: 'text/plain'});
      a.href = URL.createObjectURL(file);
      a.download = 'save.txt';
      a.click();
    } else {
      window.alert('No save available.');
    }
  };

  BrowserUserInterface.prototype.importSave = function(doc_id) {
      var that = this;
      function onFileLoad(e) {
          var data = e.target.result;
          that.dendryEngine.setState(JSON.parse(data));
          that.hideSaveSlots();
          window.alert('Loaded.');
      }
      var uploader = document.getElementById(doc_id);
      var reader = new FileReader();
      var file = uploader.files[0];
      console.log(uploader.files);
      reader.onload = onFileLoad;
      reader.readAsText(file);
  };

  BrowserUserInterface.prototype.populateSaveSlots = function(max_slots, max_auto_slots) {
    // this fills in the save information
    var that = this;
    function createLoadListener(i) {
      return function(evt) {
        that.loadSlot(i);
      };
    }
    function createSaveListener(i) {
      return function(evt) {
        that.saveSlot(i);
      };
    }
    function createDeleteListener(i) {
      return function(evt) {
        that.deleteSlot(i);
      };
    }
    function createExportListener(i) {
      return function(evt) {
        that.exportSlot(i);
      };
    }
      function populateSlot(id) {
          var save_element = document.getElementById('save_info_' + id);
          var save_button = document.getElementById('save_button_' + id);
          var delete_button = document.getElementById('delete_button_' + id);
          if (localStorage[that.save_prefix + '_' + id]) {
              var timestamp = localStorage[that.save_prefix+'_timestamp_' + id];
              save_element.textContent = timestamp;
              save_button.textContent = "Load";
              save_button.onclick = createLoadListener(id);
              delete_button.onclick = createDeleteListener(id);
          } else {
              save_button.textContent = "Save";
              save_element.textContent = "Empty";
              save_button.onclick = createSaveListener(id);
          }
          try {
              var export_button = document.getElementById('export_button_' + id);
              if (localStorage[that.save_prefix + '_' + id]) {
                  export_button.onclick = createExportListener(id);
              }
          } catch(error) {
          }

      }
      for (var i = 0; i < max_slots; i++) {
          populateSlot(i);
      }
      for (i = 0; i < max_auto_slots; i++) {
          populateSlot('a'+i);
      }

  };

  BrowserUserInterface.prototype.showSaveSlots = function() {
    if (this.dendryEngine.state.disableSaves) {
        window.alert('Saving and loading is currently disabled.');
        return;
    }
    var save_element = document.getElementById('save');
    save_element.style.display = 'block';
    this.populateSaveSlots(this.max_slots, 2);
    var that = this;
    if (!save_element.onclick) {
      save_element.onclick = function(evt) {
        var target = evt.target;
        var save_element = document.getElementById('save');
        if (target == save_element) {
          that.hideSaveSlots();
        }
      };
    }
  };

  BrowserUserInterface.prototype.hideSaveSlots = function() {
    var save_element = document.getElementById('save');
    save_element.style.display = 'none';
  };


  // functions for dealing with options
  BrowserUserInterface.prototype.setOption = function(option, toggle) {
      this[option] = toggle; 
      this.saveSettings();
  };

  BrowserUserInterface.prototype.populateOptions = function() {
    var disable_bg = this.disable_bg;
    var animate = this.animate;
    var animate_bg = this.animate_bg;
    if (disable_bg) {
        $('#backgrounds_no')[0].checked = true;
    } else {
        $('#backgrounds_yes')[0].checked = true;
    }
    if (animate) {
        $('#animate_yes')[0].checked = true;
    } else {
        $('#animate_no')[0].checked = true;
    }
    if (animate_bg) {
        $('#animate_bg_yes')[0].checked = true;
    } else {
        $('#animate_bg_no')[0].checked = true;
    }
  };

  BrowserUserInterface.prototype.hideOptions = function() {
      var save_element = document.getElementById('options');
      save_element.style.display = "none";
  };

  BrowserUserInterface.prototype.showOptions = function() {
      var that = this;
      var save_element = document.getElementById('options');
      this.populateOptions();
      save_element.style.display = "block";
      if (!save_element.onclick) {
          save_element.onclick = function(evt) {
              var target = evt.target;
              var save_element = document.getElementById('options');
              if (target == save_element) {
                  that.hideOptions();
              }
          };
      }
  };

  // ------------------------------------------------------------------------
  // Additional methods

  BrowserUserInterface.prototype.getGameOverMsg = function() {
    return 'Game Over (reload to read again)';
  };

  BrowserUserInterface.prototype._registerEvents = function() {
    var that = this;
    this.$content.on('click', 'ul.choices li a', function(event) {
      event.preventDefault();
      event.stopPropagation();
      var choice = parseInt($(this).attr('data-choice'));
      that.dendryEngine.choose(choice);
      return false;
    });
    this.$content.on('click', 'ul.choices li', function(event) {
      event.preventDefault();
      event.stopPropagation();
      $('a', this).click();
      return false;
    });
    // dendrynexus - onclick for decks and cards
    this.$content.on('click', 'ul.decks li a', function(event) {
      event.preventDefault();
      event.stopPropagation();
      var choice = $(this).attr('card-id');
      that.dendryEngine.drawCard(choice);
      return false;
    });
    this.$content.on('click', 'ul.hand li a', function(event) {
      event.preventDefault();
      event.stopPropagation();
      var choice = $(this).attr('card-id');
      that.dendryEngine.playCard(choice);
      return false;
    });
    this.$content.on('click', 'ul.pinned-cards li a', function(event) {
      event.preventDefault();
      event.stopPropagation();
      var choice = $(this).attr('card-id');
      that.dendryEngine.playPinnedCard(choice);
      return false;
    });
  };

  // ------------------------------------------------------------------------
  // Run when loaded.

  var main = function() {
    engine.convertJSONToGame(window.game.compiled, function(err, game) {
      if (err) {
        throw err;
      }

      var ui = new BrowserUserInterface(game, $('#content'));
      window.dendryUI = ui;
      // Allow the ui system to be customized before use.
      if (window.dendryModifyUI !== undefined) {
        // If it returns true, then we don't need to begin the game.
        var dontStart = window.dendryModifyUI(ui);
        if (dontStart) {
          return;
        }
      }
      ui.dendryEngine.beginGame();
    });
  };
  $(main);

}(jQuery));

},{"../engine":1,"./content/html":3}],3:[function(require,module,exports){
/* dendry
 * http://github.com/idmillington/dendry
 *
 * MIT License
 */
/*jshint indent:2 */
(function() {
  'use strict';

  var _contentObjectToHTML = function(contentObj) {
    if (contentObj.type === undefined) {
      // if the game defines the function window.displayText, then that function is called to format the text.
      // this is used for game-specific formatting.
      if (typeof(window) !== "undefined" && window.displayText) {
          contentObj = window.displayText(contentObj);
      }
      return contentObj;
    } else {
      switch (contentObj.type) {
      case 'emphasis-1':
        return '<em>' + _contentToHTML(contentObj.content) + '</em>';
      case 'emphasis-2':
        return '<strong>' + _contentToHTML(contentObj.content) + '</strong>';
      case 'emphasis-3':
        return '<code>' + _contentToHTML(contentObj.content) + '</code>';
      case 'hidden':
        return '<span class="hidden">' + _contentToHTML(contentObj.content) +
          '</span>';
      case 'line-break':
        return '<br>';

      // We can't handle elements that require state-dependency.
      // raw html for magic
      case 'magic':
        return contentObj.content;
      case 'insert':
        /* falls through */
      case 'conditional':
        throw new Error(
          contentObj.type + ' should have been evaluated by now.'
          );
      }
    }
  };

  var _contentToHTML = function(content) {
    if (Array.isArray(content)) {
      var result = [];
      for (var i = 0; i < content.length; ++i) {
        var contentObj = content[i];
        result.push(_contentObjectToHTML(contentObj));
      }
      return result.join('');
    } else {
      return _contentObjectToHTML(content);
    }
  };

  var _paragraphsToHTML = function(paragraphs) {
    var result = [];
    for (var i = 0; i < paragraphs.length; ++i) {
      var paragraph = paragraphs[i];
      switch (paragraph.type) {
      case 'heading':
        result.push('<h1>');
        result.push(_contentToHTML(paragraph.content));
        result.push('</h1>');
        break;
      case 'paragraph':
        result.push('<p>');
        result.push(_contentToHTML(paragraph.content));
        result.push('</p>');
        break;
      case 'quotation':
        result.push('<blockquote>');
        result.push(_contentToHTML(paragraph.content));
        result.push('</blockquote>');
        break;
      case 'attribution':
        result.push('<blockquote class="attribution">');
        result.push(_contentToHTML(paragraph.content));
        result.push('</blockquote>');
        break;
      case 'magic':
        result.push(paragraph.content);
        break;
      case 'hrule':
        result.push('<hr>');
        break;
      }
    }
    return result.join('');
  };

  module.exports = {
    convert: _paragraphsToHTML,
    convertLine: _contentToHTML
  };
}());

},{}]},{},[2]);
