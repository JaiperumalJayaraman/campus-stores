# PRD · EntranceIQ

**Status:** Working fictional-campus MVP · **Date:** 2026-11-24

## User problem

Finding the destination on a map is insufficient when a campus, hospital, mall, or venue has different entrances for visitors, staff, deliveries or walking traffic. Users may reach the right building while entering through a prohibited or inconvenient gate. This is a **hypothesis to validate** with users, not evidence of an observed failure rate.

## Personas / JTBD

- Visitor: “Take me to the entrance I can use for my appointment, not just a building pin.”
- Delivery driver: “Avoid public-only gates and avoid being turned away.”
- Facility manager: “Report inaccurate access information before it causes confusion.”

## Prioritized requirements

| Priority | Story | Acceptance criteria |
| --- | --- | --- |
| P0 | Choose destination, role, mode, arrival | Options update shortest eligible gate live |
| P0 | Enforce eligibility | Invalid gates never appear as recommendations |
| P0 | Show usable last-mile route | SVG path includes valid gate and ends at destination |
| P0 | Handle impossibility | Explicit no-route state when all gates ineligible |
| P1 | Explain recommendation | Show gate access rules, route index, relative alternatives |
| P1 | File issue feedback | Stored locally with issue type and selected context |
| P2 | Export feedback | CSV available with appropriate quote escaping |

## Scope / non-goals

No real entrance coordinates, live road access, accessibility guarantees, navigation ETA, government or campus verification, Google Maps APIs, map tile services, or crowd telemetry. Synthetic graph is intentionally non-operational.

## North Star

Percentage of trips reaching a **usable entrance on the first attempt**, validated by opt-in study (not currently measured). Leading metrics: gate recommendation acceptance rate, wrong-gate reports, route change rate. Guardrails: safety reports, accessibility errors, privacy and added routing latency.

## Product trade-offs

- Choose a role-aware gate ranking rather than guessing a generic shortest route.
- If no eligible gate exists, show a no-route state rather than advising restricted entry.
- Use fixed, explainable access rules in MVP; production requires verified and versioned facility data.
- Do not present fictional route weights as real-world metres or travel time.

## Pilot criteria

First verify route and access correctness with a facility administrator. Then test with actual campus visitors using observed entry tasks. Only after validation should a product consider real geospatial data or live directions.
