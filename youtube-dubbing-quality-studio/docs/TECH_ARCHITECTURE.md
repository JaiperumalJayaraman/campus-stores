# Technical design · Language Lab

## MVP components

- `logic.mjs`: default demo segments, term-risk metrics, subtitle serialization, defensive import validation.
- `app.mjs`: view updates, DOM interactions, JSON/SRT blob downloads, localStorage cache and restore.
- `index.html`: semantic controls, standalone sections for review/insights/strategy.
- `style.css`: responsive desktop/tablet/mobile layout.

No server, authentication, video processing, translation model or external state. For a real product, client storage would need encryption/privacy review and a signed-in service tier.

## Data schema

```json
{"id":"s3","start":14,"end":23,"source":"Gradient descent reduces loss.","dub":"...","originalDub":"...","confidence":0.62,"issue":"terminology check","status":"pending"}
```

Import requires `source`, `dub`, and numeric `start`/`end` fields, with `end > start`. The application assigns its own sequential IDs and clamps `confidence` to [0,1]. A production parser would add overlap detection and language-aware validation.

## Future systems design

1. Ingest transcript and alignment metadata from a permissioned video workflow.
2. Use ASR and NMT confidence + glossary matching to score candidate segments.
3. Create versioned correction requests with human approvals.
4. Run constrained partial TTS regeneration; validate audio duration, alignment, and speaker fidelity.
5. Preview the new track, revert if quality worsens; audit every publish action.

Critical engineering constraints: voice preservation, timecode drift, cache invalidation, idempotency and moderation. Production **must not** treat raw local text edit as a generated dubbed audio edit.

## Quality strategy

```bash
node --test tests/*.test.mjs
```

Tests cover review state metrics, correction count, SRT serialization and malformed imports. Add integration/UI/accessibility tests before any actual deployment.
