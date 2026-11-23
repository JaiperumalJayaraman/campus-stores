# Business case and product strategy · Language Lab

## Value hypothesis (not measured)

If multilingual creators can correct technical errors without abandoning auto-dubbing, a larger share of started dubbing reviews might lead to published language tracks. More usable language tracks **may** drive international watch time, creator retention, and downstream monetization. No uplift or revenue claim has been measured here.

## Alternatives

| Option | User value | Engineering effort | Key risk | Decision |
| --- | --- | --- | --- | --- |
| Review-only | Basic quality check | Low | Cannot fix a segment | Existing baseline |
| Segment text correction + export | High review control | Low–medium | Subtitle may differ from audio | **Prototype first** |
| Partial TTS regenerate | More complete creator value | High | Voice/timing/quality issues | Explore with feasibility spike |
| Full-track manual re-dub | Maximum control | Very high user effort | Creator abandonment | Not MVP |

## Proposed metric tree

North Star: monthly reviewed dubbed tracks **published** per active auto-dubbing creator.

Leading metrics: % creators opening review; median time to first correction; correction completion; track approval. Guardrails: time-to-publish p95, reported accuracy defects, rollback rate and abuse moderation.

## Experiment

Run 14-day randomized rollout on eligible creators with comparable language/video mix. Estimate treatment effect on publish rate with confidence intervals; pre-register thresholds and guardrails. Track new vs established creators separately. Instrument events `review_opened`, `segment_edited`, `segment_approved`, `dub_published`, `dub_reverted`.

## Stakeholder alignment

- Design: minimal complexity for creators who rarely review dubs.
- Engineering: audio alignment viability, edit versioning, quality regressions.
- Trust & safety: misrepresentation and misleading translated speech.
- Partnerships/creator operations: creator education, documentation, support.

## Prioritization (relative, directional)

P0 editable transcript + review checklist; P1 terminology glossary + report; P2 scoped voice regeneration. Scores require actual user and feasibility research before a production roadmap.
