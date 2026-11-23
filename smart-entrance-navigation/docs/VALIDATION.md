# Validation and handoff

## Automated tests run in repository

- [x] Dijkstra returns the expected shortest external route
- [x] Visitor car route excludes service and pedestrian-only entrances
- [x] Deliveries by car only receive the service entrance
- [x] Walking delivery receives no route (clear failure state)
- [x] Every suggested path starts at origin and ends at destination

## Manual browser checks to complete

- [ ] Update any of the four inputs; check route and summary change
- [ ] Select an alternate eligible gate, inspect drawn route
- [ ] Submit feedback and export CSV
- [ ] Confirm persisted preferences and feedback across refresh
- [ ] Test keyboard navigation and phone-sized layout
- [ ] Obtain real campus gate data and user study results **before any live navigation use**

No real gate/access data and no user research outcomes are claimed.
