# Prosperity bumps on cards

`Q.applyStratumProsperityBumps()` is defined in `organize_phase_tick.scene.dry` and runs from the monthly tick; call it in `on-arrival` when a card should apply a bump the same month it is played.

Deferred until month tick (set bump, apply on advance):

```dry
on-arrival: coop_bump = 0.05
```

Apply immediately when the card is played:

```dry
on-arrival: coop_bump = 0.05; {! Q.applyStratumProsperityBumps() !}
```