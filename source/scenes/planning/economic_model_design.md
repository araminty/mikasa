# Economic Model Design: Solow + Firm Employment + Demographic Flows

**Status:** Draft  
**Date:** 2026-10-20  
**Author:** Mistral Vibe (with Araminty)  
**Supersedes:** Current prosperity connection system

---

## 🎯 Executive Summary

Replace the current ad-hoc prosperity system with a **three-layer political economy model**:

1. **Solow Production Layer** - Output = TFP × Capital^α × Labor^(1-α)
2. **Firm Employment Layer** - Workers hired by megacorps (Soylent, Magrail, Brazos) and other firms based on firm performance
3. **Demographic Flow Layer** - Movement between strata (1st/2nd wave ⇄ drones ⇄ coops) based on economic conditions

This provides a **theoretically sound, flexible foundation** for Mikasa's economic simulation while maintaining the political dynamics that drive the game.

**Key clarification:** The Big 3 megacorps are **conglomerates**, not narrow sector specialists. They span nearly the entire economy with specialties. Employment tracks **firm growth/attrition**, not industry health.

**Critical distinction:** Megacorps follow a **capital-based Solow model**. Syndicates (Families, Edges, Sharks) are **organized crime** with **virtually no capital dependency** - their power comes from suborned police and illegal market size, not physical assets.

---

## 📊 Layer 1: Solow Production Model

### Core Equation

```
Output_i = TFP_i × Capital_i^α × Labor_i^(1-α)
```

**Where:**
- `i` = industry/sector/district combination
- `TFP_i` = Total Factor Productivity (baseline efficiency)
- `Capital_i` = Count of economic assets assigned to industry i
- `Labor_i` = Number of workers employed in industry i
- `α` = Capital share parameter (recommended: 0.35)

### Parameters

| Parameter | Value | Notes |
|-----------|-------|-------|
| α (capital share) | 0.35 | Standard Solow value; can be tuned per industry |
| TFP baseline | 1.0 | District/industry specific; grows very slowly |
| TFP growth rate | 0.001/month | Represents centuries-old tech; minimal innovation |

### TFP by District/Industry

```javascript
const TFP_BASE = {
    // District baselines
    Docks: 1.00,
    Aurora: 0.95,
    Vats: 0.90,
    Railyard: 1.05,
    Pitts: 1.10,
    Limelight: 1.00,
    Deeps: 0.85,
    
    // Industry modifiers (multiplicative on district baseline)
    industry: {
        chemical: 1.05,      // Soylent
        transportation: 1.10, // Magrail
        media: 1.00,         // Brazos
        finance: 1.05,       // Families
        tech: 0.95,          // Edges
        security: 0.90,      // Sharks
        coop: 1.00           // Cooperatives
    }
}
```

### Output Calculation

```javascript
function calculateSectorOutput(district, industry) {
    const A = TFP_BASE[district] * (TFP_BASE.industry[industry] || 1.0)
    const K = getCapitalCount(district, industry)
    const L = getEmployedLabor(district, industry)
    const alpha = 0.35
    
    // Handle edge cases
    if (K <= 0 || L <= 0) return 0
    
    return A * Math.pow(K, alpha) * Math.pow(L, 1 - alpha)
}
```

### Prosperity Derivation

```javascript
function calculateProsperity(district, stratum) {
    // Sum output from all industries in district that employ this stratum
    // Normalize by population
    // Apply district baseline prosperity
    
    const totalOutput = sumIndustryOutput(district, stratum)
    const population = getPopulation(district, stratum)
    
    if (population <= 0) return BASE_PROSPERITY
    
    const outputPerCapita = totalOutput / population
    return BASE_PROSPERITY + outputPerCapita * PROSPERITY_SCALAR
}
```

---

## 🏢 Layer 2: Firm Employment Model

**Framing:** The Big 3 megacorps (Soylent, Magrail, Brazos) are **conglomerates**, not narrow sector specialists. They span nearly the entire economy with specialties. Employment tracks **firm growth/attrition**, not industry health.

### Firm Types

**Two distinct categories with different economic models:**

#### Megacorps (Capital-Dependent)
| Firm | Primary District | Specialty | Description |
|------|------------------|----------|-------------|
| Soylent | Vats | Chemical/Food | "We feed the city" - food production, processing, distribution |
| Magrail | Railyard | Transportation/Logistics | "We move the city" - rail, freight, infrastructure |
| Brazos | Limelight | Media/Entertainment | "We inform the city" - broadcasting, content, culture |

**Economic Model:** Solow production function (Output = TFP × Capital^α × Labor^(1-α))

#### Organized Crime Syndicates (Corruption-Dependent)
| Syndicate | Primary District | Main Lines | Description |
|-----------|------------------|------------|-------------|
| Families | Pitts | Drugs, smuggling | Traditional organized crime, physical distribution networks |
| Edges | Aurora | Cybercrime, drugs | Tech-enabled crime, digital operations |
| Sharks | Deeps | Smuggling, protection | Physical crime, tunnel-based operations |

**Economic Model:** Corruption-based (Power = Corruption_Level × Market_Size)
- **No capital dependency** - Power comes from suborned police, not physical assets
- **Market size** - Illegal goods demand in their territories
- **Corruption level** - How effectively they've compromised law enforcement

### Firm Performance Metrics

Each firm has:
- **Prosperity** - Current economic health (`prosperity_soylent`, etc.)
- **Employment** - Number of workers (`employment_soylent`, etc.)
- **Wage Level** - Average wage paid (`wage_soylent`, etc.)
- **Hiring Demand** - Desired employment based on prosperity

### Employment Allocation

**Core Principle:** Different models for different firm types.

#### Megacorps: Prosperity-Driven Employment

```javascript
// Megacorp hiring demand based on prosperity
function calculateHiringDemand(firm) {
    const prosperity = Q['prosperity_' + firm] || 10
    const targetRatio = FIRM_TARGET_EMPLOYMENT[firm] || 1.0
    
    // Higher prosperity = more hiring demand
    const baseline = 10  // Default prosperity
    const prosperityMultiplier = prosperity / baseline
    
    return targetRatio * prosperityMultiplier
}

// Available labor pool per stratum per district
function getAvailableLabor(district, stratum) {
    const totalPopulation = getPopulation(district, stratum)
    const currentlyEmployed = sumFirmEmployment(district, stratum)
    return totalPopulation - currentlyEmployed
}
```

#### Syndicates: Corruption-Driven Employment

```javascript
// Syndicate hiring demand based on corruption and market
function calculateSyndicateHiringDemand(syndicate) {
    const corruptionLevel = Q['corruption_' + syndicate] || 0  // 0-1 scale
    const marketSize = calculateIllegalMarketSize(syndicate)  // Pop-based
    
    // More corruption + bigger market = more gang members needed
    const baseDemand = corruptionLevel * marketSize
    
    // Cap based on stratum willingness to join
    return Math.min(baseDemand, MAX_SYNDICATE_EMPLOYMENT)
}

// Market size based on district population and demand
function calculateIllegalMarketSize(syndicate) {
    const district = FIRM_PRIMARY_DISTRICT[syndicate]
    const pop = getDistrictPopulation(district)
    const demandFactor = SYNDICATE_DEMAND_FACTORS[syndicate] || 0.1
    return pop * demandFactor
}
```

### Wage Determination

#### Megacorps: Market Wages

```javascript
function calculateFirmWage(firm, stratum) {
    // Only applies to megacorps
    if (isSyndicate(firm)) {
        return calculateSyndicateCompensation(firm, stratum)
    }
    
    const firmProsperity = Q['prosperity_' + firm] || 10
    const stratumWagePremium = FIRM_WAGE_PREMIUMS[firm][stratum] || 1.0
    const baselineWage = BASE_WAGE
    
    // Wages scale with firm prosperity
    const prosperityMultiplier = firmProsperity / 10
    
    return baselineWage * prosperityMultiplier * stratumWagePremium
}
```

#### Syndicates: Profit Sharing

```javascript
function calculateSyndicateCompensation(syndicate, stratum) {
    // Syndicates don't pay "wages" - members share in profits
    const syndicatePower = calculateSyndicatePower(syndicate)
    const averageProfit = syndicatePower * ILLEGAL_MARKET_VALUE
    const sharePerMember = averageProfit / getSyndicateMembers(syndicate)
    
    // This is effectively "compensation" - what members earn
    return sharePerMember
}

function calculateSyndicatePower(syndicate) {
    const corruption = Q['corruption_' + syndicate] || 0
    const marketSize = calculateIllegalMarketSize(syndicate)
    const policeCompromise = Q['police_corruption_' + syndicate] || 0
    
    // Power = corruption × market × police compromise
    return corruption * marketSize * policeCompromise
}
```

### Employment Adjustment (Monthly)

```javascript
function adjustFirmEmployment() {
    // Megacorps: prosperity-driven
    for (const firm of MEGACORP_LIST) {
        const demand = calculateHiringDemand(firm)
        const current = Q['employment_' + firm] || 0
        const wage = calculateFirmWage(firm)
        
        // Calculate target employment
        const target = demand * getFirmScale(firm)
        
        // Natural growth/attrition (automatic)
        const naturalChange = calculateNaturalAdjustment(firm, target, current)
        
        // Apply changes
        Q['employment_' + firm] = Math.max(0, current + naturalChange)
        
        // Update wages based on demand pressure
        updateWages(firm, wage, demand, current)
    }
    
    // Syndicates: corruption-driven
    for (const syndicate of SYNDICATE_LIST) {
        const demand = calculateSyndicateHiringDemand(syndicate)
        const current = Q['employment_' + syndicate] || 0
        
        // Natural growth/attrition
        const naturalChange = calculateNaturalAdjustment(syndicate, demand, current)
        
        // Apply changes
        Q['employment_' + syndicate] = Math.max(0, current + naturalChange)
        
        // Update corruption level based on employment
        updateCorruption(syndicate, current + naturalChange)
    }
    
    // Then handle worker flows between megacorps
    // (Syndicates don't compete in labor market; they recruit differently)
    reallocateWorkersBetweenMegacorps()
}

// Natural adjustment toward target (with friction)
function calculateNaturalAdjustment(firm, target, current) {
    const gap = target - current
    const mobility = FIRM_EMPLOYMENT_MOBILITY[firm] || 0.05
    
    // Move toward target at mobility rate
    return gap * mobility
}

// Reallocate workers between megacorps only
function reallocateWorkersBetweenMegacorps() {
    for (const stratum of STRATUM_LIST) {
        for (const district of DISTRICT_LIST) {
            const workers = getAvailableWorkers(district, stratum)
            
            // Rank megacorps by wage for this stratum
            const rankedFirms = rankMegacorpsByWage(district, stratum)
            
            // Allocate workers to highest-wage megacorps first
            allocateWorkersToFirms(workers, rankedFirms, district, stratum)
        }
    }
}
```

### Firm Employment Parameters

#### Firm Lists
```javascript
const MEGACORP_LIST = ['Soylent', 'Magrail', 'Brazos']
const SYNDICATE_LIST = ['Families', 'Edges', 'Sharks']
const ALL_FIRMS = [...MEGACORP_LIST, ...SYNDICATE_LIST]
```

#### Megacorps
| Firm | Target Employment Scale | Mobility Rate | Wage Premium | Notes |
|------|------------------------|--------------|--------------|-------|
| Soylent | 1.0 | 0.05 | 1.0 | Stable, essential |
| Magrail | 1.0 | 0.05 | 1.0 | Stable, essential |
| Brazos | 1.0 | 0.05 | 1.0 | Stable, essential |

#### Syndicates
| Syndicate | Target Scale | Mobility | Compensation Notes | Notes |
|-----------|--------------|----------|-------------------|-------|
| Families | N/A | 0.08 | Profit share | Drugs/smuggling; relies on corruption |
| Edges | N/A | 0.10 | Profit share | Cybercrime; tech-savvy |
| Sharks | N/A | 0.07 | Profit share | Smuggling/protection; tunnel-based |

#### Constants
```javascript
// Syndicate-specific parameters
const SYNDICATE_DEMAND_FACTORS = {
    Families: 0.12,  // High demand for drugs
    Edges: 0.15,    // High demand for cybercrime services
    Sharks: 0.10     // Moderate demand for smuggling/protection
}

const ILLEGAL_MARKET_VALUE = 50  // Base value per unit of market
```

**Key Difference:** Syndicates don't have "wages" in the traditional sense. Their "employees" are gang members who share in profits. Compensation is tied to syndicate success, not labor market rates. **They have virtually no capital dependency** - their power comes from suborned police and market size, not physical assets.

---

## 👥 Layer 3: Demographic Flow Model

### Stratum Definitions

| Stratum | Description | Initial Size | Economic Role |
|---------|-------------|--------------|---------------|
| Rich | Wealthy elites | Small | Capital owners, investors |
| 1st Wave | Early settlers | Medium | Skilled and semi-skilled labor |
| 2nd Wave | Later settlers | Large | Ditto but lower skill |
| Coop | Coop members | Medium | Collective labor |
| Drone | Corp employees | Large | Wage labor |
| Otherworlder | Magical groups | Small | Specialized labor |
| Deepers | Annexed community | Medium | Independent labor |

### Flow Mechanics

#### Drone ↔ 1st/2nd Wave

**Framing:** Drones are corporate employees of the Big 3. The flow depends on **firm wages** relative to other options, not industry-specific wages.

```
Migration Rate = f(avg(Big3 Wages) - Wage_OtherOptions, Conditions)
```

**Parameters:**

```javascript
const DRONE_FLOW = {
    // Base rates (per month, as fraction of population)
    joinRate: 0.02,      // 2% of 1st/2nd wave can join drones/month if conditions good
    leaveRate: 0.005,    // 0.5% of drones leave/month (slow)
    
    // Wage threshold multipliers
    wagePremiumThreshold: 1.10,  // Drones must offer 10%+ wage premium over alternatives
    wagePremiumCap: 2.0,        // Max 2x multiplier on join rate
    
    // Condition modifiers
    conditions: {
        housingShortage: -0.5,    // Reduces join rate (nowhere to live)
        socialStrife: -0.3,     // Reduces join rate (unstable)
        corporatePower: +0.2     // Increases join rate (corp advantages)
    }
}

function calculateDroneFlow(district) {
    // Calculate average Big 3 wage for this district
    const big3Wages = [
        calculateFirmWage('Soylent', getPrimaryStratum('Soylent')),
        calculateFirmWage('Magrail', getPrimaryStratum('Magrail')),
        calculateFirmWage('Brazos', getPrimaryStratum('Brazos'))
    ]
    const avgDroneWage = big3Wages.reduce((a,b) => a+b, 0) / big3Wages.length
    
    // Compare to average non-drone wage
    const avgNonDroneWage = calculateAverageWage(district, ['first', 'second', 'coop'])
    
    const wageRatio = avgDroneWage / Math.max(avgNonDroneWage, 1)
    
    if (wageRatio < DRONE_FLOW.wagePremiumThreshold) {
        // Net outflow from drones - they leave for better options
        return {
            join: 0,
            leave: DRONE_FLOW.leaveRate * getDronePopulation(district)
        }
    }
    
    // Net inflow to drones - Big 3 is attractive
    const wageMultiplier = Math.min(
        DRONE_FLOW.wagePremiumCap,
        1 + (wageRatio - DRONE_FLOW.wagePremiumThreshold)
    )
    
    return {
        join: DRONE_FLOW.joinRate * wageMultiplier * getNonDronePopulation(district),
        leave: DRONE_FLOW.leaveRate * getDronePopulation(district)
    }
}
```

#### Coop Gig Worker → Member Conversion

```javascript
const COOP_CONVERSION = {
    // Gig worker hiring
    hireRate: 0.01,           // 1% of coop members can sponsor a gig worker/month
    maxGigRatio: 0.5,         // Max 50% gig workers before crisis
    
    // Member conversion
    convertRate: 0.002,       // 0.2% of gig workers convert/month (very slow)
    crisisThreshold: 0.5,     // Crisis at 50% gig workers
    crisisPenalty: -0.5       // -50% to coop output when in crisis
}

function updateCoopComposition(coop) {
    const members = coop.members
    const gigWorkers = coop.gigWorkers
    const total = members + gigWorkers
    
    if (total === 0) return
    
    const gigRatio = gigWorkers / total
    
    // Hire gig workers (up to max ratio)
    const maxGigWorkers = members * COOP_CONVERSION.maxGigRatio
    const gigCapacity = maxGigWorkers - gigWorkers
    
    if (gigCapacity > 0) {
        const newHires = Math.min(
            COOP_CONVERSION.hireRate * members,
            gigCapacity
        )
        coop.gigWorkers += newHires
    }
    
    // Convert gig workers to members
    const conversions = COOP_CONVERSION.convertRate * gigWorkers
    coop.members += conversions
    coop.gigWorkers -= conversions
    
    // Check for crisis
    if (gigWorkers / (members + gigWorkers) >= COOP_CONVERSION.crisisThreshold) {
        coop.inCrisis = true
        coop.outputModifier = COOP_CONVERSION.crisisPenalty
    } else {
        coop.inCrisis = false
        coop.outputModifier = 0
    }
}
```

---

## 📁 Data Structures

### New Q Qualities

```javascript
// Firm employment (total workers at each firm)
Q.employment_[firm] = number  // e.g., Q.employment_soylent = 50000

// Firm wages (average wage by stratum)
Q.wage_[firm]_[stratum] = number  // e.g., Q.wage_soylent_drone = 5.0

// Firm output (total production)
Q.output_[firm] = number  // e.g., Q.output_soylent = 1000

// Coop composition
Q.coop_[name]_members = number
Q.coop_[name]_gigWorkers = number
Q.coop_[name]_inCrisis = boolean

// Demographic flows (monthly)
Q.demographic_flow_[fromStratum]_to_[toStratum]_[district] = number

// Firm-specific prosperity (replaces current prosperity_* for firms)
Q.prosperity_[firm] = number
```

### Modified Data Structures

**VoterBlock Enhancement:**
```javascript
{
    id: "vats_second_wave",
    district: { id: "Vats", name: "..." },
    demographic: { id: "second_wave", name: "..." },
    population: 110000,  // in actual people (not 10k units)
    prosperity: 7.5,
    
    // NEW: Employment breakdown by firm
    employment: {
        soylent: 45000,     // Soylent (primary in Vats)
        magrail: 10000,     // Magrail
        brazos: 5000,       // Brazos
        coop: 15000,        // Local coops
        families: 2000,     // Families syndicate
        informal: 33000     // Employer of last resort
    }
}
```

---

## 🔌 Integration Points

### With Existing Systems

| System | Integration | Notes |
|--------|-------------|-------|
| **Election Runtime** | VoterBlock.prosperity | Replace with Solow-derived prosperity (firm output based) |
| **Economic Assets** | Capital counting | Keep asset structures, count as firm capital |
| **Organize Phase Tick** | Prosperity updates | Replace connection catalog with Solow firm output |
| **Electorate Modifiers** | Wage/employment effects | Add firm wage-based electoral effects |
| **Status Display** | Prosperity display | Update to show firm breakdowns |

### Preserved Components

- Asset name catalog (2000+ names) - **Keep unchanged**
- Housing inventory system - **Keep, adapt for labor force tracking**
- District/stratum definitions - **Keep, enhance**
- Corp/firm definitions - **Keep, extend with employment tracking**

---

## 🎯 Implementation Phases

### Phase 1: Solow Core (1-2 hours)
- [ ] Create `economic_model.scene.dry` with Solow equations
- [ ] Implement TFP baselines by district/firm
- [ ] Wire output to prosperity
- [ ] Test with single firm

### Phase 2: Firm Employment (2-3 hours)
- [ ] Define firm employment tracking
- [ ] Implement hiring/attrition logic per firm
- [ ] Add wage calculations by firm
- [ ] Test labor flows between firms

### Phase 3: Demographic Flows (2-3 hours)
- [ ] Implement drone ↔ 1st/2nd wave flows (firm wage-based)
- [ ] Add coop gig worker → member conversion
- [ ] Implement crisis mechanics
- [ ] Test demographic stability

### Phase 4: Integration (1-2 hours)
- [ ] Replace prosperity connections with Solow firm output
- [ ] Update election runtime to use firm-based prosperity
- [ ] Update status displays to show firm breakdowns
- [ ] Full regression test

### Phase 5: Polish (1-2 hours)
- [ ] Balance parameters
- [ ] Add UI for economic stats (firm employment, wages)
- [ ] Create cheat sheet for authors
- [ ] Final playtesting

**Total Estimated:** 8-12 hours

---

## ⚠️ Risks & Mitigations

| Risk | Mitigation |
|------|------------|
| **Scope creep** | Stick to phases; no features beyond core model |
| **Performance** | Solow is O(n); current system is O(n²); should be faster |
| **Balance issues** | Start with conservative parameters, iterate |
| **Save compatibility** | Create migration script for existing games |
| **Author confusion** | Create cheat sheet with common patterns |

---

## 📊 Parameters Cheat Sheet

```javascript
// Solow (megacorps only)
const ALPHA = 0.35
const TFP_GROWTH = 0.001  // per month (slow tech progress)

// Megacorp Employment Mobility
const FIRM_EMPLOYMENT_MOBILITY = {
    Soylent: 0.05,
    Magrail: 0.05,
    Brazos: 0.05
}

// Syndicate Employment Mobility
const SYNDICATE_EMPLOYMENT_MOBILITY = {
    Families: 0.08,
    Edges: 0.10,
    Sharks: 0.07
}

// Stratum Labor Mobility (for worker flows between strata)
const STRATUM_MOBILITY = {
    rich: 0.01,
    first: 0.03,
    second: 0.05,
    coop: 0.02,
    drone: 0.10,

// Syndicate-specific
const SYNDICATE_DEMAND_FACTORS = {
    Families: 0.12,  // Drug market
    Edges: 0.15,    // Cybercrime market
    Sharks: 0.10     // Smuggling/protection market
}
const ILLEGAL_MARKET_VALUE = 50
    otherworlder: 0.02,
    deeper: 0.01
}

// Drone Flows
const DRONE_JOIN_RATE = 0.02
const DRONE_LEAVE_RATE = 0.005
const DRONE_WAGE_THRESHOLD = 1.10

// Coop Crisis
const COOP_HIRE_RATE = 0.01
const COOP_CONVERT_RATE = 0.002
const COOP_CRISIS_THRESHOLD = 0.5
const COOP_CRISIS_PENALTY = -0.5

// Wages
const WAGE_PREMIUMS = {
    chemical: { drone: 1.0, second: 0.9, first: 0.8 },
    transportation: { drone: 1.1, second: 0.95, first: 0.9 },
    // ... etc
}
```

---

## 🎓 Author Guide

### Adding a New Megacorp

```javascript
// 1. Add to megacorp list
MEGACORP_LIST.push("NewCorp")

// 2. Define employment parameters
FIRM_EMPLOYMENT_MOBILITY.NewCorp = 0.05
FIRM_TARGET_EMPLOYMENT.NewCorp = 1.0

// 3. Define wage premiums by stratum
FIRM_WAGE_PREMIUMS.NewCorp = {
    drone: 1.0,
    second: 0.9,
    first: 0.85,
    rich: 0.8
}

// 4. Set primary district and specialty
FIRM_PRIMARY_DISTRICT.NewCorp = "Aurora"
FIRM_SPECIALTY.NewCorp = "biotech"

// 5. Add TFP baseline
TFP_BASE.NewCorp = 1.0
```

### Adding a New Syndicate

```javascript
// 1. Add to syndicate list
SYNDICATE_LIST.push("NewSyndicate")

// 2. Define employment parameters
SYNDICATE_EMPLOYMENT_MOBILITY.NewSyndicate = 0.08

// 3. Define market demand factor
SYNDICATE_DEMAND_FACTORS.NewSyndicate = 0.12

// 4. Set primary district
FIRM_PRIMARY_DISTRICT.NewSyndicate = "Deeps"

// 5. No TFP needed - syndicates use corruption model
```

### Tuning a District

```javascript
// Adjust district TFP baseline (affects all firms in district)
TFP_BASE.Aurora = 1.05  // +5% for cultural capital

// Adjust district wage adjustment
DISTRICT_WAGE_ADJUSTMENTS.Vats = 0.95  // -5% for harsh working conditions
```

### Creating a Coop

```javascript
Q.coop_newcoop_members = 100
Q.coop_newcoop_gigWorkers = 0
Q.coop_newcoop_inCrisis = false
Q.coop_newcoop_primaryFirm = "Soylent"  // or null if independent
Q.coop_newcoop_district = "Aurora"
```

---

## 📚 References

- Current system: `source/scenes/economic_assets_runtime.scene.dry`
- Current prosperity: `source/scenes/cards/local_organizing/organize_phase_tick.scene.dry`
- Election integration: `source/scenes/election_runtime.scene.dry`
- Population data: `DISTRICT_POPULATIONS` in election_runtime

---

## ✅ Next Steps

1. **Review this design** - Does it capture your vision?
2. **Prioritize phases** - Which parts are most important first?
3. **Set parameters** - Do the default values make sense?
4. **Identify preserved content** - What else must survive the rip-and-replace?

---

## 📝 Future Enhancements

| Enhancement | Description | Priority |
|-------------|-------------|----------|
| **Variable alpha** | Allow capital share (α) to decline as Mikasa transitions from low-income to middle-income city, reflecting empirical development economics (structural transformation).  The Mankiw-Romer-Wiel or a non Cobbs-Douglass derived function would be worth looking at if this ever gets done. | Low - clean swap later |
| **Syndicate two-track system** | Syndicates have both legitimate businesses (Solow model: capital + labor → output) AND illegal operations (price index-based with diminishing returns on headcount). Allows syndicates to transition to legitimacy if illegal activities are clamped down. Families' illegal side ties to C9 index; Edges to tech black market; Sharks to smuggling rates. | Low - elegant extension |

**Note on syndicate two-track:** This allows for interesting political economy where cracking down on illegal markets doesn't destroy syndicates - it forces them to either adapt to legitimate business or wither. Creates a natural "redemption arc" mechanic for syndicates.

---
*Design doc created: 2026-10-20*
*Last updated: 2026-10-20*
