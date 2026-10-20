# Activism Card Templates (Entry Tier)

**Purpose:** Direct copy-paste templates for creating entry-tier activism organizations.

**Action System:**
- **Generic actions** (`month_actions_remaining`): Available to all groups
- **Worker actions** (`worker_actions_remaining`): Available to workers/unions, used first before generic
- **Professional actions** (`professional_actions_remaining`): Available to coop_experts, used first before generic
- Each type has a flat budget of 1/month

**Workflow:**
1. Copy the appropriate `.scene.dry.template` file
2. Rename to `[your_group].scene.dry`
3. Replace all `[PLACEHOLDER]` text with actual values
4. Fill in flavor text
5. Pass to Mistral for wiring

---

## Available Templates

| Template | Power Base | Actions Used | Notes |
|----------|------------|--------------|-------|
| [`workers.scene.dry.template`](workers.scene.dry.template) | Workers/Unions | `worker_actions_remaining` → `month_actions_remaining` | Worker-specific actions first |
| [`coop_experts.scene.dry.template`](coop_experts.scene.dry.template) | Cooperatives/Experts | `professional_actions_remaining` → `month_actions_remaining` | Professional-specific actions first |
| [`business_low.scene.dry.template`](business_low.scene.dry.template) | Low-wealth Business | `month_actions_remaining` only | Has anti-racket pledge |
| [`business_high.scene.dry.template`](business_high.scene.dry.template) | High-wealth Business | `month_actions_remaining` only | Has investment network |
| [`location_based.scene.dry.template`](location_based.scene.dry.template) | Generic | `month_actions_remaining` only | Neighborhood watch, militia |

---

## Implementation Details

### Action Priority
Worker and Professional cards check their specific action budget first, then fall back to generic:
```dry
choose-if: worker_actions_remaining > 0 or month_actions_remaining > 0
unavailable-subtitle: [! if worker_actions_remaining > 0: No worker actions left ?][! if month_actions_remaining > 0: No generic actions left ?]No organizing actions left this month.

on-arrival: {!
if (typeof Q.spendWorkerAction === 'function' && Q.spendWorkerAction()) {}
else if (typeof Q.spendOrganizingAction === 'function') { Q.spendOrganizingAction(); }
[EFFECT_CODE_HERE]
!}
```

### New Functions (in organize_phase_tick.scene.dry)
- `Q.beginActionEconomyMonth()`: Initializes all action budgets at month start
- `Q.spendWorkerAction()`: Spends from worker budget
- `Q.spendProfessionalAction()`: Spends from professional budget
- `Q.canSpendWorkerAction()`: Checks if worker actions available
- `Q.canSpendProfessionalAction()`: Checks if professional actions available

### Budget Initialization
Each month, all groups get:
- `worker_actions_limit = 1`
- `professional_actions_limit = 1`
- `month_actions_limit = 2 or 3` (depending on last month's usage)

---

## See Also

- `notes` - Design notes and advanced mechanics
- [`source/scenes/cards/activism/`](../) - Actual implementation files
