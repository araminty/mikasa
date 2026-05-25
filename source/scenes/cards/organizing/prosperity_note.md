Card usage
Deferred until month tick (set bump, apply on advance):
on-arrival: coop_bump = 0.05

Apply immediately when the card is played:
on-arrival: coop_bump = 0.05; {! Q.applyStratumProsperityBumps() !}