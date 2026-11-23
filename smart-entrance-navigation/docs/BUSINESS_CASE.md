# Business strategy · EntranceIQ

## Customer value

Fewer wrong-gate arrivals might reduce visitor confusion, delays and venue staff interruptions. For a maps provider, reliable arrival guidance could increase product trust and reuse. For venues, verified access control guidance might reduce operational support burden. **No financial savings, actual improvement, or current partnership is asserted.**

## Business choices

| Option | Expected value | Cost/risk | MVP decision |
| --- | --- | --- | --- |
| Static destination pin | Simple default | May obscure a usable entrance | Baseline |
| Role-aware gate suggestions | Strong potential user benefit | Gate metadata quality | Prototype |
| Verified live gate hours | Improved reliability | Data collection + change management | Later |
| Predictive access and capacity | Potential peak-time efficiency | Complex telemetry/privacy | Not now |

## Metrics and economic model

Primary: successful first-attempt usable-gate arrival rate = successful correct-first entrances / measured entrance attempts.

Leading: selected gate acceptance, wrong-entrance feedback per 1,000 guided arrivals, path reroute rate. Guardrails: unsafe entry suggestions, barrier-free routing failures, data staleness, latency and support incidents. Economic case to test: operational staff time spent providing directions, not invented revenue.

## Experiment plan

Conduct user-task testing on fictional scenarios first. If working with a venue on real verified data, compare baseline destination directions vs gate-aware routing in a controlled pilot. Measure entry success, reroutes and reported safety issues, stratified by visitor group. Hold rollout if access metadata is not verified.

## Strategy and stakeholder tradeoffs

- Engineering: robust access-controlled routing requires continuously valid gate metadata.
- UX: a simple recommendation may trump excessive choices; explain alternatives on demand.
- Operations/facilities: authoritative updates and a correction workflow are essential.
- Privacy/trust: avoid recording precise travel history without consent.
- Accessibility: barrier-free entrance selection cannot be an afterthought.

## Prioritization

P0 eligibility and no-route safety, P1 verified gate source and explanation, P2 feedback/closure updates, P3 routing personalization. Any ROI assumptions require field evidence.
