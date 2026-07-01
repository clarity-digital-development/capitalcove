# GHL Custom Fields Setup — The Capital Cove Website

**Audience:** Dalton Guinn
**Time required:** ~15 minutes
**When to do this:** Before the website goes live, or at minimum before you start running paid traffic to it.

## Why this matters

Every form on the website sends data to your GHL account. GHL stores standard contact fields (name, email, phone) automatically — but for everything specific to your business (loan type, ARV, exit strategy, entity, etc.), GHL needs **custom fields**.

If you don't create these fields with the exact names below, the form data will be silently dropped and you'll lose deal context on every lead.

---

## Where to go

1. Log into **GoHighLevel**
2. Make sure you're in the right location — top-left location switcher. The location ID for The Capital Cove is `5VvXdqWzabMZ7HBBo47G`. The location name is whatever you called it in GHL setup.
3. Left sidebar → **Settings** (gear icon at the bottom)
4. Inside Settings: scroll down to **Custom Fields**
5. Click **+ Add Custom Field**

---

## How to add each field

For every field below, click **+ Add Custom Field** and fill in:

- **Object type:** Contact (default)
- **Folder:** Create a new folder called `Loan Application` to keep them organized
- **Field Name:** Use the "Field Name" column below — this is what *you* see in GHL
- **Field Key:** Click "Edit" next to the auto-generated key and replace it with the exact value in the "Field Key" column below — **this must match exactly** or the data drops on the floor
- **Field Type:** As shown in the "Type" column
- **For Dropdown fields:** Use the exact values listed in the "Dropdown Options" column — order doesn't matter, but spelling and capitalization do

---

## The 38 fields to create

| # | Field Name (display) | Field Key (must match exactly) | Type | Dropdown Options |
|---|---|---|---|---|
| 1 | Loan Type | `loan_type` | Dropdown | `Fix & Flip`, `Bridge`, `Rental / DSCR`, `New Construction` |
| 2 | Property Type | `property_type` | Dropdown | `single-family`, `2-4-unit`, `5-plus-unit`, `mixed-use` |
| 3 | Property Address | `property_address` | Single Line | — |
| 4 | Property State | `property_state` | Dropdown | All 50 US state codes (`AL`, `AK`, `AZ`, `AR`, `CA`, ... `WY`) plus `DC`. GHL has a built-in "US States" picker for this — use that |
| 5 | Purchase Price | `purchase_price` | Monetary | — |
| 6 | Loan Amount Requested | `loan_amount_requested` | Monetary | — |
| 7 | Rehab Budget | `rehab_budget` | Monetary | — |
| 8 | ARV (After Repair Value) | `arv` | Monetary | — |
| 9 | Estimated Property Value | `estimated_property_value` | Monetary | — |
| 10 | Monthly Rental Income | `monthly_rental_income` | Monetary | — |
| 11 | Deal Exit Strategy | `deal_exit_strategy` | Dropdown | `sell`, `refinance-permanent`, `hold-rental`, `other` |
| 12 | Desired Timeline | `desired_timeline` | Dropdown | `asap`, `30-days`, `60-days`, `exploring` |
| 13 | Deals Completed (Last 24 Mo) | `deals_completed` | Dropdown | `0`, `1-4`, `5-10`, `10-20`, `20+` |
| 14 | Entity Type | `entity_type` | Dropdown | `LLC`, `Corporation`, `Trust`, `Other` |
| 15 | Entity Name | `llc_name` | Single Line | Writes into your existing "LLC Name" field — no new field needed |
| 16 | Entity State | `entity_state` | Dropdown | Same 50 US state codes as #4 |
| 17 | Preferred Contact | `preferred_contact` | Dropdown | `phone`, `email`, `text` |
| 18 | Lead Source Detail | `lead_source_detail` | Dropdown | `Instagram`, `Referral`, `Google Search`, `Facebook`, `Other` |
| 19 | UTM Source | `utm_source` | Single Line | — |
| 20 | UTM Medium | `utm_medium` | Single Line | — |
| 21 | UTM Campaign | `utm_campaign` | Single Line | — |
| 22 | UTM Term | `utm_term` | Single Line | — |
| 23 | UTM Content | `utm_content` | Single Line | — |
| 24 | Google Click ID | `gclid` | Single Line | — |
| 25 | Facebook Click ID | `fbclid` | Single Line | — |
| 26 | Referrer URL | `referrer` | Single Line | — |
| 27 | Landing Page | `landing_page` | Single Line | — |

### Attribution fields (#19–#27)

These get auto-populated whenever a lead clicks through from a UTM-tagged link (e.g., your Instagram bio, a Facebook ad, a Google ad). They let you answer "which channel produced this lead?" in GHL without any extra work on your end. If the lead came in via direct traffic (typed URL, app), these will be blank — that's expected.

### Eligibility + term-sheet preview fields (#28–#35)

These fields are populated when the borrower goes through the eligibility gates and (eventually) sees the on-page term-sheet preview. The preview feature is **currently behind a feature flag** and won't activate until Florida lending counsel signs off — but the gates run from day one, so fields #28 and #29 will populate on every Quick Quote submission immediately. The estimate fields (#30–#35) stay empty until the preview flag flips to `true`.

| # | Field Name (display) | Field Key (must match exactly) | Type | Notes |
|---|---|---|---|---|
| 28 | Entity Borrower Confirmed | `entity_borrower_confirmed` | Single Line | `true` or `false` — borrower attested they're using LLC/Corp/Trust |
| 29 | Non Owner Occupied Confirmed | `non_owner_occupied_confirmed` | Single Line | `true` or `false` — borrower attested property is investment-only |
| 30 | Estimate — Rate Low | `estimate_rate_low` | Monetary | Low end of rate band shown to borrower (e.g., `9.5`) |
| 31 | Estimate — Rate High | `estimate_rate_high` | Monetary | High end of rate band shown (e.g., `11.0`) |
| 32 | Estimate — Monthly Payment Low | `estimate_monthly_low` | Monetary | Low end of monthly interest-only payment range |
| 33 | Estimate — Monthly Payment High | `estimate_monthly_high` | Monetary | High end of monthly payment range |
| 34 | Estimate — Cash to Close Low | `estimate_cash_to_close_low` | Monetary | Estimated cash to close, low |
| 35 | Estimate — Cash to Close High | `estimate_cash_to_close_high` | Monetary | Estimated cash to close, high |

**Why this matters to you, Dalton:** When the borrower clicks "Get my real term sheet" and you call them back, you'll know exactly what numbers they were shown. Anchors the conversation and protects against any "but the website said..." misunderstanding later.

### Consent + free-text fields (#36–#38)

These capture the borrower's SMS/TCPA opt-in (with a timestamp, for your compliance record) and the free-text message from the Quick Quote form. The consent fields populate on **every** Quick Quote and Full Application submission — the consent checkbox is required to submit.

| # | Field Name (display) | Field Key (must match exactly) | Type | Notes |
|---|---|---|---|---|
| 36 | SMS Consent | `sms_consent` | Single Line | `true` when the borrower checked the SMS/TCPA consent box (required to submit) |
| 37 | SMS Consent Timestamp | `sms_consent_timestamp` | Single Line | ISO 8601 timestamp (e.g. `2026-07-01T14:30:00.000Z`) of when consent was given |
| 38 | Lead Notes | `lead_notes` | Multi Line | Free-text "anything else we should know" message from the Quick Quote form |

**Why this matters:** For A2P/TCPA, you want an auditable record that the borrower opted in and exactly when. `sms_consent` + `sms_consent_timestamp` give you that on every lead.

### ⚠️ Critical note on field #11 — Deal Exit Strategy

The field key is **`deal_exit_strategy`**, NOT `exit_strategy`. You may already have a field called `exit_strategy` from your earlier GHL setup. Leave that one alone and create a new one with the key `deal_exit_strategy`. Tanner can switch the site to use whichever key you prefer — just let him know which one.

### ℹ️ Note on field #4 and #16 — State dropdowns

You can either:
- **Option A:** Pick GHL's built-in "US States" dropdown type (it auto-populates all states as 2-letter codes — easiest)
- **Option B:** Create a custom dropdown manually with all 51 codes

Either works. Option A is faster.

### ℹ️ Note on dropdown values

The website sends values exactly as shown in the "Dropdown Options" column — including slugs like `fix-and-flip`, `1-4`, `asap`. This isn't the prettiest display in GHL, but it's bulletproof — labels and values are identical so nothing ever drifts.

If you'd rather display human-readable labels in GHL (e.g., "ASAP — within 2 weeks" instead of `asap`), let Tanner know and he'll update the site to send display names instead of slugs. Don't change them in GHL unilaterally or the data won't match.

---

## How to verify it's working

After creating all 38 fields:

1. Open the website (https://thecapitalcove.com — or local dev URL if pre-launch)
2. Fill out the **Quick Quote form** on the homepage with test data:
   - Loan type: Fix & Flip
   - State: FL
   - Property type: Single Family
   - Purchase price: $250,000
   - Loan amount: $200,000
   - Name: `Test Lead`
   - Phone: your cell
   - Email: a fake @gmail.com you can throw away
3. Submit
4. Within ~10 seconds: in GHL → **Contacts**, find "Test Lead"
5. Scroll down to the **Custom Fields** section on the contact
6. You should see:
   - Loan Type: `fix-and-flip` (or `Fix & Flip` if you renamed)
   - Property State: `FL`
   - Property Type: `single-family`
   - Purchase Price: `250000`
   - Loan Amount Requested: `200000`
7. In GHL → **Opportunities** → Investor Loan Pipeline → look in the `1️⃣ New Lead` stage
8. You should see a new opportunity named like `Test Lead - FL - Fix & Flip` with `$200,000` as the monetary value

### If a field is missing

That means the field key didn't match. Edit the field in GHL → check the "Field Key" matches the table above exactly (case-sensitive, no spaces) → re-test.

### If the opportunity is missing

Check that the pipeline ID and stage ID in `.env.local` match your actual pipeline. If you set up a new pipeline after Tanner pulled the IDs, send him the URL of the pipeline so he can refresh.

---

## After everything works

1. Delete the test contact + opportunity from GHL
2. You're ready to receive real leads. Every form submission will:
   - Create or update a contact in GHL (deduped by email)
   - Create a new opportunity in the `1️⃣ New Lead` stage
   - Populate all the custom fields above
   - Trigger any GHL workflows you've wired to that pipeline/stage (e.g., SMS notification to your phone, welcome email sequence)

## Questions?

Anything not clear — Tanner can hop on a 5-min call and walk you through it screen-share. Don't guess on field keys; one typo wastes hours later.
