# Campus Stores

Campus Stores is a Product Engineer work sample set at a fictional campus media equipment desk. Work through a club’s screening, from equipment pickup to a partial return and the next morning’s handover. Open **Candidate brief** in the app for the assignment.

## Would I keep it?

Yes. I would keep one loan slip per physical unit and attach the next shift’s return instructions to the slip that is still open. The working prototype is in [index.html](./index.html). The changed interaction starts under **Loan register → Leave handover**.

**What worked.** At 3:45 pm, Isha’s message authorized Kabir Sen to collect the Film Society’s kit under request RQ-214. I issued projector PR-04, speaker SP-02 and adapter AD-12 to Kabir. When he brought back the first two at 7:30 pm, I could close just those two slips. The register still showed the adapter on L-404 and Tara Shah’s unrelated microphone on L-401. That is exactly the inventory position the morning clerk needs.

**What I would change.** Kabir said Leela Das would bring the adapter at 9 am Saturday. In the original app I copied that promise and the tag into a Desk book note. On Saturday the outstanding slip still showed Kabir and the Friday 8 pm deadline. The clerk had to connect those records, and **Record return** would close whichever slip they clicked. Both AD-12 and AD-15 are USB-C to HDMI adapters from shelf C4. “Leela brought an adapter” is too little information to close L-404.

## Try the same shift

Open the app and choose **Restart sample shift** to start at Friday pickup.

| Desk time | What to do | What the clerk sees |
| --- | --- | --- |
| Friday, 3:45 pm | Open the Film Society request and read Isha’s message in **Desk book**. In **Loan register**, use **New issue slip** three times. Select RQ-214, Kabir Sen and Fri 8 pm each time. Issue PR-04, SP-02 and AD-12 in that order. | The three tags have their own slips, L-402 through L-404. PR-06 is in repair and cannot be selected. |
| Friday, 7:30 pm | Choose **Move to return time**. Record the returns of PR-04 and SP-02. On AD-12, open **Leave handover**, choose **Leela Das** and **Sat 9 am**, then save. | The handover appears in the Desk book with the tag, slip number, expected person and time. The original borrower and deadline stay visible. AD-12 is still on loan. |
| Saturday, 9:00 am | Choose **Move to next morning**. The Desk book opens to the handover. Try entering the spare adapter’s tag, **AD-15**, and confirming. Then enter the issued adapter’s tag, **AD-12**, and confirm. | AD-15 gives a mismatch and L-404 stays open. AD-12 closes L-404 and returns that unit to stock. The handover moves to **Completed handovers**. The only outstanding loan is Tara’s MI-09. |

The extra tag check applies to units left for another shift. The projector and speaker still take one click each to return. Changing the expected person or time updates the same handover in both views.

**What I would observe at a real counter.** Watch ten split returns with the current desk and ten with the prototype. For each, record whether the incoming clerk closes the slip matching the physical tag on the first attempt without asking the previous clerk for help. Compare the two counts. A higher count would support keeping the change.

## Run the app

Open `index.html` in a modern browser. The app includes its scripts, styles, and icons and can run offline.

To serve it over local HTTP, run this from the repository folder and visit `http://localhost:8000`.

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

Each browser stores its own sample shift locally when browser storage is available. **Restart sample shift** restores the fictional starting records.

## Source

- `index.html` contains the desk layout, candidate brief, and bundled icons.
- `app.js` contains the sample records and interactions.
- `styles.css` defines the desktop and mobile layouts.

Icon license notices are in [third-party/lucide-LICENSE.txt](third-party/lucide-LICENSE.txt).


## Submit your work

1. [Fork Campus Stores](https://github.com/virinchi-healthcare/campus-stores/fork) into your GitHub account. Complete the candidate brief and push your changes to your public fork. In your README, point reviewers to your work and explain the decision you made.
2. In your fork, open **Commits**, select the final commit you want reviewed, and copy the page URL. It should look like `https://github.com/YOUR-USERNAME/campus-stores/commit/COMMIT-SHA`.
3. [Submit your work through the Google Form](https://docs.google.com/forms/d/e/1FAIpQLScvzoh1R4WS-SkiwAVBQbMvniieJYSoOEfLMyVo5CyjOvYUgQ/viewform). Your **roll number**, **email ID**, and **final commit link from your public fork** are required. Enter your roll number and email ID in the form only.
