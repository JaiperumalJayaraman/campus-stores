# Language Lab · YouTube AI Dubbing Quality Studio (concept)

**The product question:** How might we let education creators correct AI-dubbed technical terminology without recreating the entire language track?

This is an **independent YouTube Studio concept**, not a live YouTube integration. YouTube currently supports reviewing auto-dub transcripts, but official help documentation says automatically generated dubs are not directly editable. See [YouTube Help](https://support.google.com/youtube/answer/15569972).

## What works today

- Searchable-by-selection segment timeline with original English and Tamil demo translation.
- Edit, save, restore, approve, reopen individual segments.
- Flag low-confidence segments and pre-seeded terminology concerns (confidence is **synthetic**, not a real ASR score).
- Protected-terminology checklist, progress metrics, unfinished-review state.
- Import validated JSON (1–200 segments), export JSON and SRT, autosave to `localStorage`, reset all state.
- An interactive **Quality Insights** panel and a **Product Strategy** panel.
- No credentials, secrets, external API calls, or dependencies (optional web font falls back to system fonts).

## Try the prototype

```bash
python -m http.server 8000
# Open http://localhost:8000
```

Select flagged segment 3, edit the Tamil line, select **Save correction**, select **Approve segment**, and export the corrected SRT. Reload to verify persistence. The player is a **text-only mock preview**; audio playback, TTS, and real publishing are outside scope.

## Architecture

```text
index.html + style.css
        |
      app.mjs  ── DOM rendering / localStorage / import & download
        |
      logic.mjs ── segment validation / metrics / subtitle serialization
        |
   tests/logic.test.mjs (Node.js built-in test runner)
```

Product design artifacts: [PRD](docs/PRD.md) · [Research plan](docs/UX_RESEARCH.md) · [Architecture](docs/TECH_ARCHITECTURE.md) · [Business case](docs/BUSINESS_CASE.md) · [Validation checklist](docs/VALIDATION.md).

## MVP vs production

| Implemented MVP | Later/production requirements |
| --- | --- |
| Text correction and review | Precise word-to-audio alignment and partial voice re-synthesis |
| Local transcript storage | Creator authorization, production storage, account policies |
| JSON and subtitle export | YouTube publishing API or internal product infrastructure |
| Local quality metrics | Consent-based telemetry and randomized experiment |

## APM interview story

**UX:** Users might worry about jargon mistranslation. Verify with interviews rather than assuming.

**Tech:** Segment-first correction offers a testable low-cost wedge; partial dubbed-audio regeneration is the bigger engineering trade-off.

**Business:** Hypothesis that greater quality control may increase dub publish rate, creator satisfaction, and global audience engagement. Test before claiming a revenue benefit.

### References
- [YouTube Help: Use automatic dubbing](https://support.google.com/youtube/answer/15569972)
- [YouTube Help: Multi-language audio](https://support.google.com/youtube/answer/13338784)
