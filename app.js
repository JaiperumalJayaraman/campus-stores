(() => {
  const storageKey = "campus-stores.shift.v1";
  const root = document.getElementById("campus-stores");
  const q = (selector) => root.querySelector(selector);
  const requests = [
    {
      id: "RQ-214",
      club: "Film Society",
      event: "Courtyard screening",
      owner: "Isha Rao",
      due: "Fri 8 pm",
      items: ["HDMI projector", "Portable speaker", "USB-C → HDMI adapter"],
      note: "Playback is from a USB-C-only laptop. The host will collect at 4 pm.",
    },
    {
      id: "RQ-209",
      club: "Debate Union",
      event: "Finals rehearsal",
      owner: "Tara Shah",
      due: "Sat 10 am",
      items: ["Wireless microphone"],
      note: "Rehearsal runs into the evening.",
    },
    {
      id: "RQ-217",
      club: "Photo Circle",
      event: "Street portrait walk",
      owner: "Dev Menon",
      due: "Sat noon",
      items: ["Digital camera"],
      note: "Collection on Saturday morning.",
    },
  ];
  const assets = [
    { id: "PR-04", type: "HDMI projector", model: "BenQ MH550", bin: "A2" },
    {
      id: "PR-06",
      type: "HDMI projector",
      model: "Epson EB-X49",
      bin: "Workshop",
      repair: true,
    },
    { id: "SP-02", type: "Portable speaker", model: "JBL Eon One", bin: "B1" },
    { id: "SP-05", type: "Portable speaker", model: "Bose S1", bin: "B2" },
    {
      id: "AD-12",
      type: "USB-C → HDMI adapter",
      model: "Belkin AVC002",
      bin: "C4",
    },
    {
      id: "AD-15",
      type: "USB-C → HDMI adapter",
      model: "Anker A8312",
      bin: "C4",
    },
    { id: "MI-09", type: "Wireless microphone", model: "Shure BLX", bin: "B3" },
    { id: "CA-03", type: "Digital camera", model: "Sony A6400", bin: "D2" },
  ];
  const people = [
    "Isha Rao",
    "Kabir Sen",
    "Leela Das",
    "Tara Shah",
    "Dev Menon",
  ];
  const returnTimes = ["Fri 8 pm", "Sat 9 am", "Sat 10 am", "Sat noon"];
  const personOptions = people.map((name) => [name, name]);
  const returnTimeOptions = returnTimes.map((time) => [time, time]);
  const shifts = [
    {
      time: "Friday · 3:45 pm",
      title: "Pickup at the counter",
      text: "Kabir is here for the Film Society screening. The film starts at four. Can he leave with everything he needs?",
      next: "Move to return time",
    },
    {
      time: "Friday · 7:30 pm",
      title: "The kit comes back in pieces",
      text: "Kabir has brought back the projector and speaker. “Leela still has the adapter. She’ll drop it off tomorrow at nine.” Take the return and hand over to the morning shift.",
      next: "Move to next morning",
    },
    {
      time: "Saturday · 9:00 am",
      title: "Morning shift",
      text: "You’ve just taken over. Leela walks in with an adapter. Work out what was outstanding from the screening and close the loan for the right item.",
    },
  ];
  const pages = [
    ["Overview", "layout-dashboard"],
    ["Requests", "clipboard-list"],
    ["Inventory", "package"],
    ["Loan register", "book-open"],
    ["Desk book", "messages-square"],
  ];
  const original = () => ({
    version: 1,
    tab: "Overview",
    phase: 0,
    selected: "",
    filter: "All items",
    loans: [
      {
        num: 401,
        req: "RQ-209",
        asset: "MI-09",
        who: "Tara Shah",
        due: "Sat 10 am",
        back: false,
      },
    ],
    notes: [],
    editing: false,
    onlyOpen: true,
    notice: "Sample shift · All records are fictional.",
  });
  let s = original();
  let lastReturn = null;
  const getAsset = (id) => assets.find((x) => x.id === id);
  const getReq = (id) => requests.find((x) => x.id === id);
  const out = (id) => s.loans.find((l) => l.asset === id && !l.back);
  const esc = (x) =>
    String(x).replace(
      /[&<>"']/g,
      (c) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        })[c],
    );
  const opts = (list, selected) =>
    list
      .map(
        ([value, label]) =>
          `<option value="${esc(value)}"${value === selected ? " selected" : ""}>${esc(label)}</option>`,
      )
      .join("");
  const selectField = (label, key, options, selected) =>
    `<label><span>${esc(label)}</span><select name="${esc(key)}" required>
      <option value="">Select…</option>${opts(options, selected)}
    </select></label>`;
  const btn = (label, act, val = "", style = "") =>
    '<button type="button" data-action="' +
    act +
    '" data-val="' +
    esc(val) +
    '" class="' +
    style +
    '">' +
    esc(label) +
    "</button>";
  const head = (title, sub, control = "") =>
    '<div class="sectionhead"><div><h2>' +
    title +
    "</h2><small>" +
    sub +
    "</small></div>" +
    control +
    "</div>";
  const row = (label, sub, right) =>
    '<div class="row"><div><strong>' +
    esc(label) +
    "</strong><small>" +
    esc(sub) +
    "</small></div><div>" +
    right +
    "</div></div>";
  const badge = (label, tone = "neutral") => {
    const safeTone = tone === true ? "good" : ["neutral", "good", "warning", "danger", "info"].includes(tone) ? tone : "neutral";
    return '<span class="tag tag--' + safeTone + '">' + esc(label) + "</span>";
  };
  const overdue = (loan) => !loan.back && s.phase === 2 && loan.due === "Fri 8 pm";
  const dueSoon = (loan) => !loan.back && (
    (s.phase < 2 && loan.due === "Fri 8 pm") ||
    (s.phase === 2 && ["Sat 9 am", "Sat 10 am"].includes(loan.due))
  );
  const loanStatus = (loan) => loan.back ? badge("Returned", "good") :
    overdue(loan) ? badge("Overdue", "danger") :
    dueSoon(loan) ? badge("Due soon", "warning") :
    badge("On loan", "info");
  const getStats = () => {
    const open = s.loans.filter((l) => !l.back);
    return {
      open: open.length,
      due: open.filter(dueSoon).length,
      late: open.filter(overdue).length,
      handovers: open.filter((l) => l.handover).length,
    };
  };
  const progress = (requestId) => {
    const request = getReq(requestId);
    const slips = s.loans.filter((l) => l.req === requestId);
    return { expected: request.items.length, issued: slips.length,
      returned: slips.filter((l) => l.back).length, slips };
  };
  const progressBar = (returned, issued) =>
    '<div class="progress-track" role="progressbar" aria-label="Items returned" aria-valuemin="0" aria-valuemax="' +
    issued + '" aria-valuenow="' + returned + '"><span style="width:' +
    (issued ? (returned / issued) * 100 : 0) + '%"></span></div>';
  function requestPage() {
    let html = head(
      "Approved requests",
      "Student Activities Office · 3 approved forms",
    );
    if (s.selected) {
      const r = getReq(s.selected);
      html +=
        btn("Back to list", "close") +
        '<div class="record"><small>' +
        r.id +
        " · Approved</small><h3>" +
        r.event +
        "</h3><p>" +
        r.club +
        " · Filed by " +
        r.owner +
        "</p><p><b>Return by</b> " +
        r.due +
        "</p><p><b>Approved equipment</b></p><ul>" +
        r.items.map((x) => "<li>" + x + "</li>").join("") +
        "</ul><p>" +
        r.note +
        "</p></div>";
    } else
      html += requests
        .map((r) =>
          row(
            r.event,
            r.id + " · " + r.club,
            btn("View form", "request", r.id),
          ),
        )
        .join("");
    return html;
  }
  function inventory() {
    let html = head(
      "Inventory",
      "Physical units · home shelf and current availability",
    );
    html +=
      '<div class="buttons"><label>Show <select data-filter>' +
      opts(
        ["All items", "On shelf", "On loan", "In repair"].map((f) => [f, f]),
      ) +
      "</select></label></div>";
    let visible = 0;
    for (const a of assets) {
      const status = a.repair
        ? "In repair"
        : out(a.id)
          ? "On loan"
          : "On shelf";
      if (s.filter !== "All items" && s.filter !== status) continue;
      visible++;
      html += row(
        a.id + " · " + a.type,
        a.model + " · Shelf " + a.bin,
        badge(status, status === "On shelf" ? "good" : status === "In repair" ? "danger" : "info"),
      );
    }
    if (!visible) html += '<div class="empty-state"><strong>No matching equipment</strong><p>Try another availability filter to find a unit.</p></div>';
    return html;
  }
  function handoverEditor(loan) {
    const saved = loan.handover;
    return `<details class="handover-editor">
      <summary>${saved ? "Edit handover" : "Leave handover"}</summary>
      <form data-handover="${loan.num}">
        <div class="form">
          ${selectField("Expected from", "from", personOptions, saved?.from)}
          ${selectField("Expected back", "expected", returnTimeOptions, saved?.expected)}
        </div>
        <button type="submit">Save handover</button>
      </form>
    </details>`;
  }
  function handoverCard(loan) {
    const handover = loan.handover;
    const unit = getAsset(loan.asset);
    const request = getReq(loan.req);
    const titleId = "handover-" + loan.num;
    const errorId = "tag-error-" + loan.num;
    return `<article class="handover-card" aria-labelledby="${titleId}">
      <header>
        <div><small>${esc(request.club)} · ${esc(request.id)} · Slip L-${loan.num}</small>
          <h3 id="${titleId}" tabindex="-1">${esc(unit.id)} · ${esc(unit.type)}</h3>
        </div>
        ${badge(loan.back ? "Returned" : "Awaiting return", loan.back)}
      </header>
      <dl class="handover-facts">
        <div><dt>Expected from</dt><dd>${esc(handover.from)}</dd></div>
        <div><dt>Expected back</dt><dd>${esc(handover.expected)}</dd></div>
      </dl>
      <p class="issue-detail">Issued to ${esc(loan.who)} · Original due ${esc(loan.due)}</p>
      ${loan.back
        ? `<p class="receipt">Tag checked · ${esc(handover.closedAt)}</p>`
        : `<form data-check-in="${loan.num}" class="tag-check">
            <label><span>Tag on returned unit</span>
              <input name="tag" required maxlength="32" autocomplete="off"
                autocapitalize="characters" spellcheck="false" aria-describedby="${errorId}" />
            </label>
            <button type="submit" class="primary">Confirm return</button>
            <p id="${errorId}" class="tag-error" role="alert"></p>
          </form>
          ${handoverEditor(loan)}`}
    </article>`;
  }
  function register() {
    let html = head(
      "Loan register",
      "Track each physical tag, with all items from a request together.",
      s.editing ? btn("Cancel", "cancel") : btn("+ New issue slip", "new", "", "primary"),
    );
    if (s.editing) {
      const available = assets.filter((a) => !a.repair && !out(a.id));
      return html + '<div class="form-panel"><p class="form-intro">Create one slip per physical unit. Only approved, available units can leave the counter.</p>' +
        '<form data-issue><div class="form">' +
        selectField("Approved request", "req", requests.map((r) => [r.id, r.id + " · " + r.club])) +
        selectField("Unit leaving the desk", "asset", available.map((a) => [a.id, a.id + " · " + a.type])) +
        selectField("Collected by", "who", personOptions) +
        selectField("Return by", "due", returnTimeOptions) +
        '</div><button type="submit" class="primary">Save issue slip</button></form></div>';
    }
    html += '<div class="buttons segmented">' +
      ["Outstanding", "All slips"].map((v, i) =>
        '<button type="button" data-action="scope" data-val="' + i +
        '" aria-pressed="' + (s.onlyOpen === (i === 0)) + '">' + v + '</button>'
      ).join("") + '</div>';
    const shown = s.loans.filter((l) => !s.onlyOpen || !l.back);
    if (!shown.length) {
      return html + '<div class="empty-state"><strong>No outstanding slips</strong><p>All issued equipment has been returned. You can view completed slips or issue a new unit.</p>' +
        btn("View all slips", "scope", "1") + '</div>';
    }
    for (const request of requests) {
      const slips = shown.filter((l) => l.req === request.id);
      if (!slips.length) continue;
      const p = progress(request.id);
      const complete = p.issued === p.expected && p.returned === p.expected;
      html += '<section class="request-group" aria-label="' + esc(request.club) + ' loan progress">' +
        '<div class="request-group-head"><div><small>' + esc(request.id) + ' · ' + esc(request.event) + '</small>' +
        '<h3>' + esc(request.club) + '</h3></div>' +
        badge(complete ? "Complete" : p.returned > 0 ? "Partially returned" : "In progress", complete ? "good" : p.returned > 0 ? "warning" : "info") +
        '</div><div class="request-progress"><strong>' + p.returned + '/' + p.issued + ' items returned</strong>' +
        '<span>' + p.issued + ' of ' + p.expected + ' approved items issued</span></div>' +
        progressBar(p.returned, p.issued) + '<div class="request-slips">';
      for (const loan of slips.slice().sort((a,b) => a.num-b.num)) {
        if (loan.handover) {
          html += handoverCard(loan);
        } else {
          html += '<article class="loan-entry" aria-label="Slip L-' + loan.num + ' for ' + esc(loan.asset) + '">' +
            '<div class="loan-info"><div><strong>' + esc(loan.asset) + '</strong><span class="loan-type">' +
            esc(getAsset(loan.asset).type) + '</span><small>L-' + loan.num + ' · ' +
            esc(loan.who) + ' · Due ' + esc(loan.due) + '</small></div>' +
            '<div class="loan-actions">' + loanStatus(loan) +
            (loan.back ? '' : btn("Record return", "return", String(loan.num), "return-button")) +
            '</div></div>' + (loan.back ? '' : handoverEditor(loan)) + '</article>';
        }
      }
      html += '</div></section>';
    }
    return html;
  }
  function deskbook() {
    let html = head(
      "Desk book",
      "Messages from clubs and notes for the next shift",
    );
    const handovers = s.loans.filter((l) => l.handover);
    html += '<div class="desk-actions">' + btn("Print handover sheet", "print") + '</div>';
    const open = handovers.filter((l) => !l.back);
    const closed = handovers.filter((l) => l.back);
    if (open.length) {
      html += `<section class="handover-section"><h3>Open handovers (${open.length})</h3>
        <p class="helper-text">Verify the physical tag before you close a slip for the next shift.</p>
        ${open.map(handoverCard).join("")}</section>`;
    } else {
      html += '<div class="empty-state compact"><strong>No handovers waiting</strong><p>When a unit must return on a later shift, open its loan slip and choose Leave handover.</p></div>';
    }
    if (closed.length) {
      html += `<details class="closed-handovers"><summary>Completed handovers (${closed.length})</summary>
        ${closed.map(handoverCard).join("")}</details>`;
    }
    const entries = [
      [
        "Friday · 3:20 pm",
        "Isha Rao · Film Society",
        "Kabir Sen is picking up our whole screening kit. Please issue it in his name. I’m setting up in the courtyard.",
      ],
      [
        "Friday · 3:30 pm",
        "Tara Shah · Debate Union",
        "Our microphone stays with me overnight. I’ll return it by 10 am Saturday.",
      ],
    ];
    if (s.phase >= 1)
      entries.push([
        "Friday · 7:30 pm",
        "Kabir Sen · Film Society",
        "I brought the projector and speaker. Leela Das has our adapter. She’ll be at the counter at 9 am tomorrow.",
      ]);
    for (const n of s.notes)
      entries.push([shifts[n.phase].time, "Counter handover", n.text]);
    for (const [t, author, body] of entries.slice().reverse())
      html +=
        '<article class="record"><small>' +
        esc(t) +
        "</small><h3>" +
        esc(author) +
        "</h3><p>" +
        esc(body) +
        "</p></article>";
    return (
      html +
      '<form data-note><div class="form"><label class="full"><span>Note for the next shift</span><textarea name="note" rows="2" maxlength="400" required></textarea></label></div><button type="submit">Add handover note</button></form>'
    );
  }
  function summaryStrip() {
    const stats = getStats();
    const cards = [
      ["Items out", stats.open, "neutral", "Physical units currently loaned"],
      ["Due soon", stats.due, stats.due ? "warning" : "neutral", "Items to collect at this shift"],
      ["Overdue", stats.late, stats.late ? "danger" : "neutral", "Past their original deadline"],
      ["Handovers", stats.handovers, stats.handovers ? "info" : "neutral", "Awaiting the next counter check"],
    ];
    return cards.map(([label, number, tone, detail]) =>
      '<div class="metric metric--' + tone + '"><div class="metric-label">' + label +
      '</div><strong class="metric-number">' + number +
      '</strong><small>' + detail + '</small></div>').join("");
  }
  function overview() {
    const stats = getStats();
    const film = progress("RQ-214");
    const remaining = film.slips.filter((l) => !l.back);
    const handovers = remaining.filter((l) => l.handover);
    let nextTitle, nextDescription, nextAction, nextLabel;
    if (s.phase === 2 && handovers.length) {
      nextTitle = "Verify the returned unit";
      nextDescription = "Leela is expected with the adapter. Check its physical tag against the open slip before closing it.";
      nextAction = "go-handovers"; nextLabel = "Open morning handover";
    } else if (film.issued < film.expected) {
      nextTitle = "Get the screening kit ready";
      nextDescription = "Film Society has " + film.issued + " of " + film.expected +
        " approved items issued. Create a separate slip for each unit.";
      nextAction = "start-issue"; nextLabel = "Issue next unit";
    } else if (remaining.length) {
      nextTitle = s.phase === 0 ? "Await the screening return" : "Finish the split return";
      nextDescription = remaining.length + " Film Society item" + (remaining.length === 1 ? " is" : "s are") +
        " still out. Record the units that have arrived and leave a linked handover for anything still missing.";
      nextAction = "go-loans"; nextLabel = "Review outstanding slips";
    } else {
      nextTitle = "Film Society kit completed";
      nextDescription = "All three screening items have been checked in. Review any remaining loans before ending the shift.";
      nextAction = "go-loans"; nextLabel = "View loan register";
    }
    let html = '<div class="overview-heading"><div class="eyebrow">DESK OVERVIEW</div>' +
      '<h2>What needs attention now?</h2><p>One clear next action, based on the live loan register.</p></div>' +
      '<section class="next-action"><div><div class="eyebrow">RECOMMENDED NEXT STEP</div><h3>' +
      esc(nextTitle) + '</h3><p>' + esc(nextDescription) + '</p></div>' +
      btn(nextLabel, nextAction, "", "primary") + '</section>' +
      '<div class="overview-grid"><section class="panel"><div class="panel-header"><div><h3>Screening kit</h3>' +
      '<p>Film Society · RQ-214</p></div>' +
      badge(film.returned === film.expected ? "Complete" :
        film.returned > 0 ? "Partially returned" : "In progress",
        film.returned === film.expected ? "good" : film.returned > 0 ? "warning" : "info") +
      '</div><div class="large-progress">' + film.returned + '<span> / ' + film.expected +
      ' returned</span></div>' + progressBar(film.returned, film.expected) +
      '<p class="helper-text">' + film.issued + ' issued · ' +
      film.slips.filter((l) => !l.back).length + ' still out</p>' +
      btn("View all kit slips", "go-loans") + '</section>' +
      '<section class="panel"><div class="panel-header"><div><h3>Counter priorities</h3>' +
      '<p>Only work that needs your attention</p></div></div>';
    if (stats.late) {
      html += '<div class="priority-row"><span>' + badge("Overdue", "danger") +
        '</span><div><strong>' + stats.late + ' past-due item' + (stats.late === 1 ? '' : 's') +
        '</strong><small>Check open slips and expected handovers</small></div></div>';
    }
    if (stats.handovers) {
      html += '<div class="priority-row"><span>' + badge("Handover", "warning") +
        '</span><div><strong>' + stats.handovers + ' awaiting tag verification</strong>' +
        '<small>Close the correct physical unit, not a similar spare</small></div></div>';
    }
    if (!stats.late && !stats.handovers) {
      html += '<div class="priority-row"><span>' + badge("Up to date", "good") +
        '</span><div><strong>No critical handovers</strong><small>Watch upcoming returns and current loans</small></div></div>';
    }
    html += btn("Open desk book", "go-handovers") + '</section></div>' +
      '<section class="workflow"><h3>Your shift at a glance</h3><div class="step-grid">' +
      shifts.map((shift, index) =>
        '<div class="workflow-step' + (s.phase === index ? ' active' : '') + '">' +
        '<span class="step-number">' + (index + 1) + '</span><div><strong>' +
        esc(shift.title) + '</strong><small>' + esc(shift.time) + '</small></div></div>'
      ).join("") + '</div></section>';
    return html;
  }
  const screens = {
    Overview: overview,
    Requests: requestPage,
    Inventory: inventory,
    "Loan register": register,
    "Desk book": deskbook,
  };
  function paint() {
    const phase = shifts[s.phase];
    q("[data-clock]").textContent = phase.time;
    q("[data-shift-title]").textContent = phase.title;
    q("[data-shift]").textContent = phase.text;
    const advance = q('[data-action="advance"]');
    advance.hidden = !phase.next;
    advance.textContent = phase.next || "";
    q("[data-nav]").innerHTML = pages
      .map(
        ([n, icon]) =>
          '<button type="button" data-action="tab" data-val="' +
          n +
          '" aria-pressed="' +
          (s.tab === n) +
          '"><svg aria-hidden="true" class="store-icon"><use href="#icon-' +
          icon +
          '"></use></svg>' +
          n +
          "</button>",
      )
      .join("");
    q("[data-pulse]").innerHTML = summaryStrip();
    q("[data-page]").innerHTML = screens[s.tab]();
    q('[data-action="undo-return"]').hidden = !lastReturn;
    if (q("[data-filter]")) q("[data-filter]").value = s.filter;
    q("[data-status]").textContent = s.notice;
  }
  function commit(msg) {
    if (msg) s.notice = msg;
    paint();
    try {
      localStorage.setItem(storageKey, JSON.stringify(s));
    } catch {
      q("[data-status]").textContent +=
        " Browser storage is unavailable. Progress lasts for this visit.";
    }
  }
  function closeLoan(loan) {
    lastReturn = { num: loan.num, closedAt: loan.handover?.closedAt };
    loan.back = true;
    if (loan.handover) loan.handover.closedAt = shifts[s.phase].time;
    commit(loan.asset + " returned to stock. Slip L-" + loan.num + " closed.");
  }
  root.addEventListener("click", (e) => {
    const b = e.target.closest("[data-action]");
    if (!b) return;
    const v = b.dataset.val;
    switch (b.dataset.action) {
      case "restart":
        if (!window.confirm("Restart the sample shift? All current issues, returns and handovers will be reset.")) return;
        s = original(); lastReturn = null;
        break;
      case "start-issue":
        s.tab = "Loan register"; s.editing = true; break;
      case "go-loans":
        s.tab = "Loan register"; s.editing = false; s.onlyOpen = true; break;
      case "go-handovers":
        s.tab = "Desk book"; s.editing = false; break;
      case "print":
        window.print(); return;
      case "undo-return": {
        const loan = s.loans.find((l) => l.num === lastReturn?.num);
        if (!loan || !loan.back) return;
        loan.back = false;
        if (loan.handover) {
          if (lastReturn.closedAt === undefined) delete loan.handover.closedAt;
          else loan.handover.closedAt = lastReturn.closedAt;
        }
        lastReturn = null;
        commit("Return undone. Slip L-" + loan.num + " is open again.");
        return;
      }
      case "advance":
        if (s.phase < 2) s.phase++;
        s.notice = "Shift time updated.";
        if (s.phase === 2 && s.loans.some((l) => l.handover && !l.back)) {
          s.tab = "Desk book";
          s.editing = false;
        }
        break;
      case "tab":
        s.tab = v;
        s.editing = false;
        break;
      case "close":
        s.selected = "";
        break;
      case "request":
        s.selected = v;
        break;
      case "new":
        s.editing = true;
        break;
      case "cancel":
        s.editing = false;
        break;
      case "scope":
        s.onlyOpen = v === "0";
        break;
      case "return": {
        const l = s.loans.find((l) => l.num === Number(v));
        if (l && !l.back && !l.handover) closeLoan(l);
        return;
      }
    }
    commit();
  });
  root.addEventListener("change", (e) => {
    if (e.target.matches("[data-filter]")) {
      s.filter = e.target.value;
      commit();
    }
  });
  root.addEventListener("submit", (e) => {
    e.preventDefault();
    const f = e.target;
    const form = new FormData(f);
    if (f.matches("[data-handover], [data-check-in]")) {
      const num = Number(f.dataset.handover ?? f.dataset.checkIn);
      const loan = s.loans.find((l) => l.num === num);
      if (!loan || loan.back) return;
      if (f.matches("[data-handover]")) {
        const from = form.get("from");
        const expected = form.get("expected");
        if (!people.includes(from) || !returnTimes.includes(expected)) return;
        loan.handover = { from, expected };
        commit("Handover saved for " + loan.asset + " in the Desk book.");
        q("#handover-" + num)?.focus();
        return;
      }
      if (!loan.handover) return;
      const tag = f.elements.namedItem("tag");
      if (tag.value.trim().toUpperCase() !== loan.asset) {
        tag.setAttribute("aria-invalid", "true");
        f.querySelector(".tag-error").textContent =
          "Tag mismatch. Slip L-" + num + " is for " + loan.asset + " and is still open.";
        tag.focus();
        tag.select();
        return;
      }
      closeLoan(loan);
      q("[data-status]").focus();
      return;
    }
    if (f.matches("[data-note]")) {
      const text = String(form.get("note")).trim();
      if (!text) return;
      s.notes.push({ phase: s.phase, text });
      commit("Handover note saved.");
      return;
    }
    if (!f.matches("[data-issue]")) return;
    const [req, asset, who, due] = ["req", "asset", "who", "due"].map((k) =>
      form.get(k),
    );
    const unit = getAsset(asset),
      r = getReq(req);
    if (!r || !unit || unit.repair || out(asset) || !people.includes(who))
      return;
    if (!r.items.includes(unit.type)) {
      q("[data-status]").textContent =
        "This equipment type is outside the approved request. Choose an approved unit.";
      return;
    }
    if (
      s.loans.some(
        (l) => l.req === req && !l.back && getAsset(l.asset).type === unit.type,
      )
    ) {
      q("[data-status]").textContent =
        "The approved quantity of this equipment type is already on loan.";
      return;
    }
    const num = Math.max(...s.loans.map((l) => l.num)) + 1;
    s.loans.push({ num, req, asset, who, due, back: false });
    s.editing = false;
    commit("Issued " + asset + " to " + who + " on slip L-" + num + ".");
  });
  function restore(d) {
    if (
      !d ||
      d.version !== 1 ||
      !Object.hasOwn(screens, d.tab) ||
      !shifts[d.phase] ||
      (d.selected && !getReq(d.selected)) ||
      !Array.isArray(d.notes) ||
      !d.notes.every(
        (n) => n && shifts[n.phase] && typeof n.text === "string",
      ) ||
      !Array.isArray(d.loans) ||
      !d.loans.length ||
      !d.loans.every(
        (l) =>
          l && getReq(l.req) && getAsset(l.asset) && Number.isInteger(l.num),
      )
    )
      return;
    s = {
      ...original(),
      ...d,
      loans: d.loans.map(({ handover, ...loan }) => {
        if (
          people.includes(handover?.from) &&
          returnTimes.includes(handover.expected) &&
          (!loan.back || shifts.some((shift) => shift.time === handover.closedAt))
        ) {
          loan.handover = { ...handover };
        }
        return loan;
      }),
      notes: d.notes.map((n) => ({ ...n })),
    };
    paint();
  }
  paint();
  try {
    restore(JSON.parse(localStorage.getItem(storageKey)));
  } catch {
    // Keep the fresh shift when storage is unavailable or the saved data is invalid.
  }
})();
