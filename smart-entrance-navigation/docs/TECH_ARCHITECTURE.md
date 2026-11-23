# Technical architecture · EntranceIQ

## MVP stack

HTML + CSS + vanilla JavaScript ES modules + inline SVG. No dependencies, external map tiles or API keys. The demo can be run with a static HTTP server and tested with Node's built-in test runner.

## Routing pipeline

```text
User selects arrival / destination / role / travel mode
                    |
           Gate access filter
     (role allowed AND mode allowed)
                    |
      For each remaining entrance:
     Dijkstra: approach → gate (outside graph)
     Dijkstra: gate → destination (inside graph)
                    |
         Sum fictional edge weights
                    |
    Rank valid options and render path/alternatives
```

Nodes include 4 origins, 4 gates, internal junctions, and 4 destinations. The **schematic graph is fictional** and route weights are arbitrary unitless costs. Two distinct road graphs ensure routes must cross an entrance rather than bypass access-control restrictions.

Complexity: with a simple unoptimized Dijkstra, per-gate evaluation is approximately O(G × V² + G × E), acceptable for a tiny prototype. For production, switch to A* or a graph-routing service with verified coordinates and a suitable spatial index.

## Data/security strategy

- `state`: {arrival, destination, role, mode, optional gate choice}; persisted to localStorage.
- Feedback: {time, gate, issue type, comment, current state}; persisted to localStorage, never transmitted.
- CSV exports escape double quotes, protecting field boundaries. Avoid importing a CSV into unsafe spreadsheet execution without additional sanitization; production feedback pipeline must neutralize formula injection.
- Never collect precise location, personally identifying data, or sensitive access permissions without a privacy review.

## Future systems

Verified entrance registry (geo coordinates + provenance), role-aware routing policies, updated temporary closures, offline fallback, route confidence, user feedback moderation, consent-based observability and accessibility details.

## Tests

`node --test tests/*.test.mjs` verifies shortest path, access filtering, delivery policies, no-route behavior and valid route endpoints. Not yet covered: browser end-to-end, internationalization, accessibility, or live geospatial accuracy.
