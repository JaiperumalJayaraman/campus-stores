# EntranceIQ · Last-metre entrance guidance (Google Maps concept)

**The product question:** How might navigation guide a person to a *usable entrance* rather than stopping at the destination pin?

This is an **independent Google Maps concept** using a completely **fictional campus, entrance locations, and access rules**. Google Maps already supports correcting addresses, pins and some road data; the novel hypothesis here is proactive, role-aware entrance recommendation. See [Google Maps Help](https://support.google.com/maps/answer/10010575).

## Working prototype

- Choose one of four destinations and an incoming approach.
- Select a role (**visitor**, **staff**, **delivery**) and travel mode (**walking**, **driving**).
- Rank eligible entrance gates by the lowest total weighted path using a testable Dijkstra graph algorithm.
- Visualize the proposed route and all gate choices on a self-contained SVG schematic.
- Explain access constraints and handle **no valid entrance** explicitly.
- Compare alternative gates and select a different eligible route.
- File local gate issue feedback and export the reports as a CSV.
- Inspect technical/product trade-offs via **How it works**; metrics update with user selection.
- No API keys, Google Maps API, external maps, location permissions, account, or backend required.

## Run

```bash
python -m http.server 8001
# Open http://localhost:8001
node --test tests/*.test.mjs
```

Try **delivery + driving** from East approach to Innovation hall. Only the staff/service entrance is eligible. Change to **delivery + walking** and verify the application shows no route instead of falsely implying access.

## Core technique

`logic.mjs` declares a fictional entrance graph, splits it into outside and inside road networks, filters gates by role + mode, runs Dijkstra on both sides of each valid gate, then ranks paths by **synthetic route weight**. Index values are *not* real metres or travel times. `app.mjs` renders the SVG and handles interactions, persistence, feedback and export.

## APM skill coverage

| UX | Tech | Business |
| --- | --- | --- |
| User journey past the destination pin, role and mode inputs, clear error state, field research plan | Explicit access constraints, two-network graph routing, deterministic unit tests, no external dependencies | First-attempt usable-entrance arrival metric, avoidable rerouting costs, optional venue partnership hypothesis, A/B test |

Product artifacts: [PRD](docs/PRD.md) · [UX research](docs/UX_RESEARCH.md) · [Technical architecture](docs/TECH_ARCHITECTURE.md) · [Business case](docs/BUSINESS_CASE.md) · [Validation](docs/VALIDATION.md).

**Important:** Do not use this prototype to travel anywhere. The gate names, roads, eligibility constraints and scores are designed exclusively for product experimentation, not as facts about IIT Madras or any real facility.
