// Policy data (you can expand this later)
const policies = [
  {
    id: "culture",
    title: "Organizational Culture & Environment",
    summary:
      "Expected behavior, respect, non-discrimination, conflict of interest, moonlighting, gifts, communication.",
    points: [
      "Act professionally, ethically, and in the company’s best interest.",
      "No discrimination or harassment; inclusive and respectful workplace.",
      "Disclose conflicts of interest to HR.",
      "No moonlighting without written approval.",
      "No cash gifts; only nominal customary gifts with disclosure.",
      "Use company communication channels responsibly.",
      "Social media: do not disclose confidential info or misrepresent the company.",
    ],
  },
  {
    id: "grievance",
    title: "Grievance Redressal",
    summary:
      "How to raise workplace concerns safely and get them resolved.",
    points: [
      "First discuss with Reporting Manager (if appropriate).",
      "If unresolved or involves manager, write to HR.",
      "If still unresolved, escalate to Senior Management.",
      "Include: name, ID, department, date(s), description, evidence, desired resolution.",
      "HR acknowledges within 2 working days; resolution target within 15 working days.",
      "No retaliation for good-faith complaints.",
    ],
  },
  {
    id: "posh",
    title: "Prevention of Sexual Harassment (POSH)",
    summary:
      "Zero-tolerance policy; reporting to Internal Committee; confidentiality.",
    points: [
      "Complaints go to the Internal Committee (IC).",
      "File within 3 months from incident (or last incident).",
      "Written complaint with details & witnesses (if any); email to IC member allowed.",
      "Confidential inquiry; protection against retaliation.",
      "Disciplinary action if allegations are substantiated.",
    ],
  },
  {
    id: "leave",
    title: "Working Hours, Attendance & Leave",
    summary:
      "8 hours/day, Mon–Sat; CL, SL, EL; sandwich rule; maternity & paternity leave.",
    points: [
      "Normal hours: 8 hours/day, Mon–Sat; Sunday weekly off.",
      "Leave per year: CL 7 days, SL 7 days, EL 8 days.",
      "CL & SL lapse if unused; EL may be encashed as per policy & law.",
      "Sandwich rule: leave on both sides of weekly off includes the off days.",
      "Maternity leave as per Maternity Benefit Act; Paternity leave: 15 days (after 12 months).",
      "Apply for leave in advance; LWP possible at company discretion.",
    ],
  },
  {
    id: "mediclaim",
    title: "Mediclaim Policy",
    summary:
      "Health insurance cover for employees after probation.",
    points: [
      "Coverage: up to INR 2,00,000 per employee per policy year.",
      "Eligible after probation for permanent employees.",
      "Covers hospitalization, surgeries, diagnostics (as per policy).",
      "Inform HR within 24 hours of hospitalization/treatment.",
      "Coverage ends when employment ends.",
    ],
  },
  {
    id: "confidentiality",
    title: "Confidentiality, IP, Data Privacy & Trade Secrets",
    summary:
      "Protect company data, IP ownership, IT asset usage, non-poaching.",
    points: [
      "Do not disclose confidential info during or after employment.",
      "All IP created during employment belongs to the company.",
      "Use company hardware/software only for business; no unauthorized software.",
      "Report loss/theft of assets immediately.",
      "Non-poaching: 12 months post-employment for clients, vendors, employees.",
      "Consent to processing of personal data for employment purposes.",
    ],
  },
  {
    id: "dismissal",
    title: "Dismissal",
    summary:
      "Immediate termination for serious misconduct and related rules.",
    points: [
      "Grounds: fraud, gross negligence, POSH violations, criminal acts, asset abuse, misrepresentation, breach of contract.",
      "Must return all company property and confirm no copies retained.",
      "Benefits only as per law, agreement, and policy.",
      "Company may pursue legal remedies for losses.",
    ],
  },
  {
    id: "termination",
    title: "Termination of Employment",
    summary:
      "Notice period, early departure, leave adjustments, exit formalities.",
    points: [
      "Notice period: 3 months after confirmation (for either party).",
      "Leaving early: liable to pay salary for unfulfilled notice period.",
      "No leave during notice period unless approved in emergencies.",
      "Excess leave adjusted from final settlement.",
      "Exit: knowledge transfer, exit form, return assets, share passwords, delete company data from personal devices.",
    ],
  },
  {
    id: "restrictive",
    title: "Restrictive Covenants",
    summary:
      "Non-solicitation, no moonlighting, injunctive relief.",
    points: [
      "12 months post-employment: no soliciting clients/customers or employees.",
      "During employment: devote full time; no other business without consent.",
      "Company can seek court orders (injunctions) for breaches.",
      "No waiver: delay in enforcement doesn’t mean rights are waived.",
    ],
  },
  {
    id: "ip",
    title: "Intellectual Property (IP)",
    summary:
      "Ownership and assignment of work created during employment.",
    points: [
      "All IP created during tenure belongs to the company.",
      "Employee assigns all rights to the company; moral rights waived.",
      "Must disclose and deliver all IP-related materials on request/exit.",
      "No personal use of company IP without written consent.",
    ],
  },
  {
    id: "travel",
    title: "Travel Policy",
    summary:
      "Booking via Travel Desk, grade-wise limits, reimbursement rules.",
    points: [
      "All bookings via Travel Desk: traveldesk@gototheaddress.com",
      "Request must include: date, time, destination, duration, purpose.",
      "Independent bookings: no reimbursement.",
      "Grade-wise limits for hotel, food, travel mode, taxi/fuel.",
      "Fraudulent claims lead to disciplinary action.",
    ],
  },
];

// Render policy cards
const policyCardsContainer = document.getElementById("policyCards");

function renderPolicies(filterText = "") {
  policyCardsContainer.innerHTML = "";
  const text = filterText.toLowerCase().trim();

  const filtered = policies.filter(
    (p) =>
      p.title.toLowerCase().includes(text) ||
      p.summary.toLowerCase().includes(text) ||
      p.points.some((pt) => pt.toLowerCase().includes(text))
  );

  if (filtered.length === 0) {
    policyCardsContainer.innerHTML =
      '<div style="grid-column:1/-1;color:#6b7280;">No matching policies found.</div>';
    return;
  }

  filtered.forEach((p) => {
    const card = document.createElement("div");
    card.className = "policy-card";
    card.innerHTML = `
      <div class="policy-title">${p.title}</div>
      <div class="policy-summary">${p.summary}</div>
    `;
    card.addEventListener("click", () => openPolicyModal(p));
    policyCardsContainer.appendChild(card);
  });
}

renderPolicies();

// Search
const searchInput = document.getElementById("searchInput");
searchInput.addEventListener("input", () => {
  renderPolicies(searchInput.value);
});

// Modal logic
const modal = document.getElementById("policyModal");
const modalTitle = document.getElementById("modalTitle");
const modalBody = document.getElementById("modalBody");
const closeModal = document.getElementById("closeModal");

function openPolicyModal(policy) {
  modalTitle.textContent = policy.title;
  modalBody.innerHTML = `
    <p style="margin-bottom:10px;color:#4b5563;">${policy.summary}</p>
    <ul style="margin-left:18px;">
      ${policy.points
        .map((pt) => `<li style="margin-bottom:6px;">${pt}</li>`)
        .join("")}
    </ul>
    <p style="margin-top:14px;font-size:0.85rem;color:#6b7280;">
      This is a simplified summary. For exact wording and legal effect, refer to
      the official Employee Handbook and your Employment Agreement.
    </p>
  `;
  modal.style.display = "flex";
}

closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});

modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

// Smooth scroll for quick actions
document.querySelectorAll(".action-card").forEach((btn) => {
  btn.addEventListener("click", () => {
    const id = btn.getAttribute("data-scroll");
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// Simple leave calculator (naive: just counts calendar days)
const leaveStart = document.getElementById("leaveStart");
const leaveEnd = document.getElementById("leaveEnd");
const calcLeaveBtn = document.getElementById("calcLeaveBtn");
const leaveResult = document.getElementById("leaveResult");

calcLeaveBtn.addEventListener("click", () => {
  if (!leaveStart.value || !leaveEnd.value) {
    leaveResult.textContent = "Please select both start and end dates.";
    return;
  }

  const start = new Date(leaveStart.value);
  const end = new Date(leaveEnd.value);

  if (end < start) {
    leaveResult.textContent = "End date cannot be before start date.";
    return;
  }

  const diffTime = end.getTime() - start.getTime();
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24)) + 1;

  leaveResult.textContent =
    `Approximate calendar days: ${diffDays}. ` +
    `Actual leave days depend on weekends, holidays, and the sandwich rule. " +
    `Confirm with HR for exact calculation.`;
});

// Travel calculator
const travelGrade = document.getElementById("travelGrade");
const calcTravelBtn = document.getElementById("calcTravelBtn");
const travelResult = document.getElementById("travelResult");

const travelEntitlements = {
  G1: {
    hotel: "INR 2,000 (incl. taxes)",
    food: "INR 500 per day",
    mode: "Train 3AC / Taxi (≥3 people) / Bus",
    taxi: "Ola/Uber (only if ≥3 people)",
    remarks: "Taxi applicable in case of a minimum of 3 people.",
  },
  G2: {
    hotel: "INR 3,000 (incl. taxes)",
    food: "INR 1,000 per day",
    mode: "Cab / Cab Pool (≥3) / Bus / Train (if solo)",
    taxi: "Ola/Uber",
    remarks: "—",
  },
  G3: {
    hotel: "INR 5,000 (incl. taxes)",
    food: "INR 1,250 per day",
    mode: "Cab / Car / Flight / Train",
    taxi: "Actuals (use company Uber account)",
    remarks: "Company Uber account to be used for cab bookings.",
  },
  G4: {
    hotel: "INR 7,500 (incl. taxes)",
    food: "INR 1,500 per day",
    mode: "Car / Flight / Train",
    taxi: "Actuals (use company Uber account)",
    remarks:
      "Company Uber account for cabs. HDFC card for food or reimbursement after CEO approval.",
  },
};

calcTravelBtn.addEventListener("click", () => {
  const grade = travelGrade.value;
  const t = travelEntitlements[grade];
  if (!t) {
    travelResult.textContent = "Invalid grade selected.";
    return;
  }

  travelResult.innerHTML = `
    <strong>For grade ${grade}:</strong><br>
    Hotel allowance: ${t.hotel}<br>
    Food allowance: ${t.food}<br>
    Mode of travel: ${t.mode}<br>
    Taxi / Fuel: ${t.taxi}<br>
    Remarks: ${t.remarks}
  `;
});
