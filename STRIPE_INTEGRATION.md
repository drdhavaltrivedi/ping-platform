# Stripe Production Integration Guide — Ping

This document outlines the roadmap and requirements for transitioning from the **Investor Demo (Sandbox)** to a **Production Environment**.

---

## 1. Integration Scenarios

### Scenario A: Stripe Payments (Loading Funds)
*   **Purpose:** Allows users to load money into their Ping wallet using their home credit/debit cards.
*   **Requirement:** Stripe Standard Account.
*   **Verification Time:** 24–48 hours.
*   **Key Tasks:** 
    *   Switch `sk_test_...` to `sk_live_...`.
    *   Set up Webhooks to handle payment successes (e.g., updating the user's ledger on the backend).

### Scenario B: Stripe Issuing (Virtual Cards)
*   **Purpose:** Issues virtual Visa/Mastercards to users for spending in USD.
*   **Requirement:** Stripe Issuing Approval (Stricter).
*   **Approval Time:** 5–10 business days.
*   **Key Tasks:**
    *   Submit a detailed business "Use Case" to Stripe.
    *   Configure Cardholder KYC requirements.
    *   Design the physical card (if applicable) or finalize virtual card styling.

---

## 2. Requirements & Prerequisites

### Business Documentation
1.  **Legal Entity:** Registered company details (EIN in USA, RFC in Mexico, or equivalent).
2.  **Bank Account:** A business bank account for settling funds.
3.  **Identity Verification:** Government-issued ID for all owners with >25% stake.

### Technical & Compliance
1.  **PCI-DSS Compliance:** Stripe handles most of this, but you must complete a "Self-Assessment Questionnaire" (SAQ-A) provided by Stripe.
2.  **KYC Provider:** Integration with a 3rd party like **MetaMap** or **Persona** to verify user identities before issuing cards.
3.  **Terms of Service:** A clear legal agreement for your users, covering money transmission and card usage.

---

## 3. Timeline Breakdown

| Phase | Task | Estimated Time |
|---|---|---|
| **Phase 1** | Stripe Account Onboarding & Verification | 1–2 Days |
| **Phase 2** | Stripe Issuing Application & Review | 5–10 Days |
| **Phase 3** | KYC Provider Integration (API/SDK) | 7–10 Days |
| **Phase 4** | Webhook Logic (Backend Ledger Security) | 3–5 Days |
| **Phase 5** | Sandbox-to-Live Data Migration & Final Audit | 2–3 Days |
| **Total** | **Go-Live Readiness** | **3–4 Weeks** |

---

## 4. Why Use Test Mode (Sandbox) for the Demo?

For your investor pitch, we have implemented everything in **Stripe Test Mode** for the following reasons:
1.  **Instant Deployment:** No need to wait 10 days for Issuing approval.
2.  **Zero Risk:** Perform transactions with $0 actual cost while showing the "Real" API flow.
3.  **Feature Accuracy:** The code logic (fetching payment intents, issuing card data) remains 95% identical when switching to production.

---

## 5. Moving to Production Checklist

- [ ] Complete Stripe Business Verification.
- [ ] Apply for Stripe Issuing Access.
- [ ] Integrate MetaMap/Persona for User KYC.
- [ ] Update `.env` variables to `LIVE` keys.
- [ ] Configure Production Webhook secret in backend.
- [ ] Conduct final security penetration test on APIs.
