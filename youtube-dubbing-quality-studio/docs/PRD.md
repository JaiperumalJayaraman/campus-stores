# PRD · Language Lab

**Status:** Proposed MVP / functional concept · **Owner:** Portfolio case study · **Date:** 2026-11-24

## Problem and opportunity

Educational creators distributing multilingual videos may need to verify technical terms before publishing. The official YouTube help page describes reviewing auto dubs and says direct editing of automatically generated dubs is not supported. The opportunity is **a targeted correction workflow**, not a claim that Google has announced this feature.

## Target users and jobs-to-be-done

- Primary: independent educational creators who publish across languages and care about term consistency.
- Secondary: editors who review scripts and translated media on behalf of creators.
- JTBD: “When I inspect a translated video, help me find and correct doubtful phrases quickly, so I can publish confidently.”

## In-scope requirements

| Priority | User story | Acceptance criteria |
| --- | --- | --- |
| P0 | Compare the source and dub | One selected segment shows the English source, translated text and time range |
| P0 | Correct one segment | Saved edit persists after refresh; can restore original |
| P0 | Approve / reopen review | Approved status is reversible and affects completion metrics |
| P0 | Export corrected transcript | JSON and valid SRT files contain saved corrections |
| P0 | Understand review state | Unresolved issues and reviewed percent recalculate live |
| P1 | Bring a transcript | Validate JSON shape, reject invalid timestamps, cap imported items |
| P1 | Protect technical terms | Show a review glossary for relevant flagged segments |

## Not in MVP

No AI inference, voice cloning, automatic translation, YouTube API publishing, speech alignment, collaboration, or user identity. These require product permissions and technical validation.

## North Star and guardrails

**North Star hypothesis:** reviewed dubbed tracks published per monthly active auto-dubbing creator. Leading indicators: proportion of flagged segments resolved; task completion rate; review time per video. Guardrails: edit-related defects, time-to-publish, translation safety and creator trust.

## Decision trade-offs

1. Segment vs whole-video editing: choose segment-first to limit cost and cognitive load.
2. Manual edit vs automatic rewrite: choose human-in-control for MVP, revisit after measured trust.
3. Text export vs audio regeneration: implement text now; design for future alignment but do not fake audio output.
4. Language breadth: Tamil demonstration only, because quality checks differ by language and should be researched.

## Proposed experiment

Eligible creators randomly receive either existing review workflow (control) or a correction-capable review workflow (treatment). Primary: approved dubbed-track publish rate within 14 days. Segment by language and creator size. Avoid shipping without reliable caption/audio synchronization and user consent.

## Risks

Incorrect edits could worsen translations; repeated review may slow publication; models may struggle with pronunciation; subtitles may not match speech after edits. Address with previews, undo, validation, and fallback to original.
