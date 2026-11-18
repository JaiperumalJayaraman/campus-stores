# Campus Stores — action-first equipment desk

A responsive, offline-friendly Product Engineer work sample for a **fictional campus media equipment desk**. Open **[index.html](./index.html)** in a browser to use it; no install, account, server, or external CSS framework is required.

> **Reviewer starting point:** click **Restart sample shift**, then follow the three stages below. The prototype combines a live **Overview**, request-level partial-return tracking, and a physical-tag-verified morning handover.

## Product decision — would I keep it?

**Yes, with a focused change.** I would **keep** one loan slip per physical equipment unit, the approved-request checks, and persistent cross-shift records. I would **change** the counter workflow so staff can immediately answer: **What needs my attention, which parts of a request remain out, and what exactly should the next clerk check?**

**Evidence of what works:** On Friday at 3:45 pm, Isha Rao's Desk book message permits Kabir Sen to collect the Film Society screening kit under RQ-214. Issuing PR-04 (projector), SP-02 (speaker) and AD-12 (USB-C adapter) creates separate slips L-402, L-403 and L-404. Kabir can return the projector and speaker independently while AD-12 stays out. The unrelated microphone MI-09 on L-401 also remains correctly on loan. An in-repair projector, PR-06, cannot be issued.

**Evidence of what needed work:** In the original flat register, the clerk had to mentally join three Film Society slips to understand a partial return. On Friday at 7:30 pm Kabir says Leela Das will return the adapter Saturday at 9 am. A loose Desk book note did not make the expected person and time visible on the actual AD-12 slip. Even worse, two adapters (AD-12 and AD-15) are stored in shelf C4; returning one by description alone can close the wrong slip.

## What I changed, and why

1. **Action-first overview and live summary.** The first view now asks **“What needs attention now?”** The strip directly above the navigation reports **Items out / Due soon / Overdue / Handovers** from real slip data. The recommended action changes with the shift and the kit's state. Information is not fabricated: the opening sample includes MI-09 already on loan, so the opening count is **1**, not an arbitrary dashboard number.
2. **Grouped, visible partial-return progress.** The Loan register now groups slips under **Film Society · RQ-214**, **Debate Union · RQ-209**, etc., with **X/Y items returned**, issued count, and an accessible progress bar. When Kabir returns two units, Film Society shows **2/3 returned** while AD-12 remains an explicit outstanding line. Completed requests are marked **Complete**. The **Outstanding / All slips** switch hides history until needed; individual physical tags and slips remain distinct.
3. **Linked handovers and safer check-in.** **Leave handover** is attached to the open slip, and the same structured note appears in the Desk book. On Saturday the clerk must enter the physical tag. **AD-15** returns a mismatch and keeps **L-404** open; **AD-12** closes it. Simple same-shift returns still take one click, with **Undo last return** if the clerk makes a mistake. Restart requires confirmation. The Desk book has a **Print handover sheet** action.

**Attention and accessibility choices:** Clear text status labels accompany semantic colours (red overdue/repair, amber due soon/partial, green returned/available, blue on loan). The layout is responsive, supports keyboard focus and browser dark mode, and avoids gratuitous animation and charts. The top KPIs and progress survive refresh through browser localStorage; no personal or real-campus data is stored.

## Try the complete shift

| Desk time | Reviewer action | Expected result |
| --- | --- | --- |
| **Friday 3:45 pm — pickup** | In **Overview**, click **Issue next unit**. Read **Requests → Film Society** and Isha's message in **Desk book**. In **Loan register → New issue slip**, select **RQ-214 / Kabir Sen / Fri 8 pm** and issue **PR-04**, **SP-02**, then **AD-12** (one slip per item). | Three Film Society slips **L-402, L-403, L-404**; the summary shows **4 items out** including Tara's MI-09. The grouped register shows **0/3 returned**. |
| **Friday 7:30 pm — partial return** | Click **Move to return time**. In the grouped Film Society section, **Record return** for **PR-04** and **SP-02**. Leave **AD-12** open; use **Leave handover**, set **Leela Das** and **Sat 9 am**. | Film Society **2/3 returned**, **1 outstanding**. The handover follows L-404 into Desk book. The summary shows **2 items out** (AD-12 and MI-09) and **1 handover**. |
| **Saturday 9 am — handover** | Click **Move to next morning**. The app opens **Desk book** when there is an open handover. Try entering tag **AD-15** on L-404; then enter **AD-12**. | The first entry reports a **tag mismatch** and does not close the slip; the second closes **L-404**, returns AD-12 to stock and moves the handover to **Completed handovers**. Film Society becomes **3/3 returned** under **All slips**. Tara's MI-09 remains out. |

Try **Undo last return** after checking in a unit to confirm an accidental closure can be reversed (the undo is available during the current page session). **Restart sample shift** clears the saved fictional shift after confirmation.

## How I would evaluate it at a real desk

Observe **10 split-kit returns on the existing workflow** and **10 with the prototype**, with different staff taking over the next shift. Track:

- **Correct first-attempt check-in** — whether the incoming clerk closes the slip whose asset tag matches the physical item, with no help from the previous clerk.
- **Time to locate the outstanding item** — from opening the register to correctly naming the still-out physical tag.
- **Handover completeness** — whether the next clerk can find expected person, expected time, original borrower, and the correct loan slip without searching free-text notes.

Compare medians or counts across both sessions. A higher correct-first-attempt rate and shorter lookup time would support shipping the change. **These are proposed measurements, not claimed test results.**

## Run and inspect

Open `index.html` directly in any modern browser. To serve locally, run `python3 -m http.server 8000 --bind 127.0.0.1` in the repository folder and visit `http://localhost:8000`.

- `app.js`: fictional records, dashboard metrics, approval rules, request grouping, return validation, persistence, shift progression.
- `index.html`: accessible page structure, candidate brief, four live KPI containers, bundled icons.
- `styles.css`: semantic colour system, responsive layout, dark mode, focus states, print sheet.
- `third-party/lucide-LICENSE.txt`: icon licence.

This is a front-end work sample, **not a live inventory backend**. State is saved per browser, not synchronized between clerks. For a production rollout, permissions, audit history, data synchronization, and shared inventory consistency would need to be designed and tested.

## Submission

Submit the URL of the **latest commit**, not the repository homepage:

`https://github.com/JaiperumalJayaraman/campus-stores/commit/COMMIT-SHA`

Use the [candidate submission form](https://docs.google.com/forms/d/e/1FAIpQLScvzoh1R4WS-SkiwAVBQbMvniieJYSoOEfLMyVo5CyjOvYUgQ/viewform). Enter the required roll number and email **in the form only**.
