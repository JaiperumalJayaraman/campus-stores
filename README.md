# APM Product Portfolio · Two working product case studies

Two independent, browser-based product prototypes created to demonstrate **UX desirability**, **technical feasibility**, and **business viability**. No account, external API key, npm install, or backend required.

| Project | Real user problem | Working demonstration | North Star hypothesis |
| --- | --- | --- | --- |
| [Language Lab — YouTube dubbing review concept](youtube-dubbing-quality-studio/) | Creators need finer-grained control over machine-dubbed technical terms | Edit transcript segments, track review completion, approve, save, import JSON, export corrected subtitle SRT, quality dashboard | Monthly reviewed dubs published per active dubbing creator |
| [EntranceIQ — Google Maps entrance navigation concept](smart-entrance-navigation/) | A destination pin may not guide a visitor through an accessible entrance | Filter by visitor access, trip mode and arrival; graph-based gate ranking; route explanations; issue feedback and CSV export | Successful first-attempt arrival via a usable entrance |

## Run locally

Requires Python 3 (or any static HTTP server). Open separate terminals:

```bash
cd youtube-dubbing-quality-studio
python -m http.server 8000
# Open http://localhost:8000
```

```bash
cd smart-entrance-navigation
python -m http.server 8001
# Open http://localhost:8001
```

Run deterministic domain-logic tests with Node.js 20+:

```bash
node --test youtube-dubbing-quality-studio/tests/*.test.mjs smart-entrance-navigation/tests/*.test.mjs
```

## Portfolio principles

- **UX:** user task, friction, journey maps, interview and usability test scripts, accessibility and edge cases.
- **Tech:** offline browser UIs, local persistence, deterministic evaluation, input validation, graph algorithm and unit tests.
- **Business:** value hypothesis, growth implications, north-star and guardrail metrics, prioritization, and experimentation design.
- **Evidence integrity:** Synthetic demo content and proposed experiments are labeled. No interviews, conversion uplift, revenue gains, or model accuracy figures are falsely claimed.

Neither app is affiliated with or connected to Google, YouTube, or Google Maps. The fictitious campus cannot be used for real navigation. The YouTube app does not edit real online videos or generate audio.

## Next validation steps

1. Recruit 5–8 real users per prototype and conduct moderated usability sessions.
2. Log user-observed task success, completion time, and qualitative quotes separately from seeded demo data.
3. Reprioritize based on actual evidence, and add anonymized results, with consent, to the case studies.
