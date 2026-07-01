# Estimated Term Sheet Preview — Compliance Requirements Checklist

This checklist translates the legal memo conclusions into atomic, verifiable build requirements for the Estimated Term Sheet Preview feature. Every item must be independently checkable by a developer or QA tester. No item may be marked complete based on interpretation; only by direct observation of the live UI, source, or recorded output.

---

## 1. Pre-Submission Gates

- [ ] **1.1** The preview form MUST render an "Entity Borrower" gate question before any rate-related input is collected.
  - **Verify by:** Load the preview page in a fresh browser session; confirm the first interactive question is the entity gate and that no rate, ARV, or loan-amount inputs are visible above or before it.

- [ ] **1.2** The Entity Borrower gate question text MUST read exactly: `Are you applying as an LLC, corporation, or trust?`
  - **Verify by:** Inspect DOM text content of the gate question; compare character-for-character.

- [ ] **1.3** The Entity Borrower gate MUST offer exactly two options: `Yes` and `No / Individual`.
  - **Verify by:** Count and read the radio/button labels; confirm there is no third option, no "Maybe," no "Not sure."

- [ ] **1.4** Selecting `No / Individual` on the Entity Borrower gate MUST hard-block the form from proceeding.
  - **Verify by:** Select `No / Individual`; confirm the "Continue" / "Get Preview" button is disabled OR a blocking modal appears AND no rate estimate is rendered.

- [ ] **1.5** On `No / Individual` selection, a block message MUST display containing the text: `We only lend to entity borrowers (LLC, corporation, or trust) for business-purpose loans.`
  - **Verify by:** Trigger the block; copy-paste the displayed message and compare to the required text.

- [ ] **1.6** On `No / Individual` selection, no downstream form fields (loan amount, ARV, state, property type) MAY become editable or submittable.
  - **Verify by:** After selecting `No / Individual`, attempt to tab through or click any later field; confirm all are disabled or hidden.

- [ ] **1.7** The preview form MUST render an "Owner-Occupied" gate question before any rate-related input is collected.
  - **Verify by:** Confirm the occupancy gate appears in the form flow before any rate, ARV, or loan-amount input becomes active.

- [ ] **1.8** The Owner-Occupied gate question text MUST read exactly: `Will this property be owner-occupied (your primary residence or second home)?`
  - **Verify by:** DOM text inspection; character-for-character match.

- [ ] **1.9** The Owner-Occupied gate MUST offer exactly two options: `Yes` and `No`.
  - **Verify by:** Count and read the option labels.

- [ ] **1.10** Selecting `Yes` on the Owner-Occupied gate MUST hard-block the form from proceeding.
  - **Verify by:** Select `Yes`; confirm the submit/continue button is disabled OR a blocking message appears AND no estimate renders.

- [ ] **1.11** On `Yes` selection for owner-occupied, a block message MUST display containing the text: `We do not offer consumer or owner-occupied loans. Our loans are for non-owner-occupied investment property only.`
  - **Verify by:** Trigger the block; copy-paste the displayed message.

- [ ] **1.12** Both gates MUST be required (non-skippable). The "Continue" / "Get Preview" button MUST remain disabled until both gates have an explicit selection.
  - **Verify by:** Leave one or both gates unselected; attempt to submit; confirm button is disabled and no estimate is shown.

- [ ] **1.13** Gate selections MUST persist if the user navigates back within the form, and MUST clear if the user reloads the page.
  - **Verify by:** Select gates → navigate forward → navigate back; confirm selections retained. Then reload the page; confirm selections cleared.

- [ ] **1.14** Hard-block messages MUST NOT include any phrases that suggest a workaround (e.g., "contact us anyway," "we may make exceptions," "talk to a loan officer").
  - **Verify by:** Read full text of both block messages; confirm absence of any softening / workaround language.

---

## 2. State Exclusion Behavior

- [ ] **2.1** The state input MUST be a controlled dropdown or radio set, not a free-text field.
  - **Verify by:** Inspect the state input element; confirm it is `<select>` or radio group, not `<input type="text">`.

- [ ] **2.2** Selecting any of the four hard-excluded states — `CA`, `AZ`, `HI`, `PR` — MUST hard-block the form from proceeding.
  - **Verify by:** Select each of the four states one at a time; confirm the submit button is disabled and no estimate renders for any of them.

- [ ] **2.3** The hard-block message for `CA`, `AZ`, `HI`, `PR` MUST contain the text: `We do not currently lend in this state.`
  - **Verify by:** Trigger block for each of the four states; verify message contents.

- [ ] **2.4** Selecting any of the eight soft-warn states — `NV`, `ND`, `SD`, `VT`, `MN`, `OR`, `UT`, `ID` — MUST display a non-blocking warning banner adjacent to the state field.
  - **Verify by:** Select each of the eight states; confirm a visible warning appears within 100px of the state input AND the submit button remains enabled.

- [ ] **2.5** The soft-warn banner MUST contain the text: `Lending in this state may be subject to additional review. We will confirm availability before issuing terms.`
  - **Verify by:** Trigger the soft-warn for any one of the eight states; copy the banner text.

- [ ] **2.6** The soft-warn banner MUST NOT be dismissible in a way that removes it from DOM before submit.
  - **Verify by:** Attempt to close the banner; confirm it either has no close affordance OR re-renders on any state-field interaction.

- [ ] **2.7** Selecting any of the 38 remaining states MUST NOT show any warning or block.
  - **Verify by:** Spot-check at least 5 non-listed states (e.g., FL, TX, GA, NC, OH); confirm no warning, no block, submit button enabled.

- [ ] **2.8** The state list shown to the user MUST NOT include `CA`, `AZ`, `HI`, `PR` as selectable options OR if included, MUST be disabled with a hover/inline label of `Not available`.
  - **Verify by:** Open the state dropdown; confirm CA/AZ/HI/PR are either absent or visibly disabled with the "Not available" label.

- [ ] **2.9** No marketing or hero copy on the preview page MAY claim "all 50 states" or "nationwide lending."
  - **Verify by:** Grep the page DOM and source for `50 states`, `nationwide`, `all states`; confirm zero matches.

- [ ] **2.10** Copy that references coverage MUST use the exact phrasing `47 states` (matching the CTO decision).
  - **Verify by:** Locate any coverage claim on the preview page; confirm the wording is `47 states`.

---

## 3. Preview Output Rules

- [ ] **3.1** The rate output field MUST display a range (two numbers separated by an en-dash or hyphen), never a single number.
  - **Verify by:** Submit any valid input; inspect the rate field; confirm format matches pattern `\d+(\.\d+)?%\s*[–-]\s*\d+(\.\d+)?%` (e.g., `9.5%–10.5%`).

- [ ] **3.2** The rate output field label MUST read `Estimated Rate Range` (not `Rate`, not `Your Rate`, not `APR`).
  - **Verify by:** Inspect the label text of the rate output field; character-for-character match.

- [ ] **3.3** The loan-amount output field label MUST read `Estimated Loan Amount` (not `Loan Amount`, not `Your Loan Amount`).
  - **Verify by:** Inspect the label text; character-for-character match.

- [ ] **3.4** The ARV cap output MUST be displayed with soft wording exactly: `up to ~75% of ARV, subject to appraisal & underwriting`.
  - **Verify by:** Submit input; locate the ARV display; copy the text; compare verbatim.

- [ ] **3.5** The ARV cap output MUST NOT display as a fixed dollar number (e.g., never `Max Loan: $750,000`).
  - **Verify by:** Submit input with a high ARV value; confirm no field anywhere on the preview shows ARV as a hard-capped dollar amount labeled as a maximum.

- [ ] **3.6** The term/duration output field label MUST read `Estimated Term` (not `Term`, not `Loan Term`).
  - **Verify by:** Inspect the label text.

- [ ] **3.7** The points/fees output field label MUST read `Estimated Points` or `Estimated Origination Range` and MUST show a range, not a single number.
  - **Verify by:** Inspect the label text and value format; confirm range pattern.

- [ ] **3.8** The estimate card MUST echo back the user's inputs (loan amount requested, ARV, state, property type) in a clearly labeled "Your Inputs" or "Based On" section.
  - **Verify by:** Submit known input values; confirm each value appears verbatim on the result card under an "inputs" / "based on" heading.

- [ ] **3.9** The echoed inputs section MUST visually precede or sit adjacent to the estimate outputs, never below them.
  - **Verify by:** Inspect DOM order and visual layout; confirm inputs render above or beside (not below) the estimate values.

- [ ] **3.10** The word `APR` MUST NOT appear anywhere on the preview page, in any output field, label, helper text, tooltip, or accessibility attribute.
  - **Verify by:** Grep rendered DOM (including `aria-label`, `title`, `alt`) for `APR`; expect zero matches. Case-sensitive and case-insensitive checks both required.

- [ ] **3.11** Every estimate output field MUST be prefixed with the word `Estimated` OR labeled as `Preview` somewhere within the same field's visible label.
  - **Verify by:** Read every output field label on the result card; confirm each contains either `Estimated` or `Preview`.

- [ ] **3.12** If a monthly payment is displayed, it MUST be labeled `Estimated Monthly Payment (interest only)` or `Estimated Monthly Payment Range`, and MUST NOT use the label `Your Payment`.
  - **Verify by:** Inspect monthly payment label, if present; confirm exact wording.

- [ ] **3.13** No output field MAY use the bare word `Rate` as a standalone label.
  - **Verify by:** Grep all output-card labels for an exact match of `Rate`; expect zero matches.

- [ ] **3.14** No output field MAY use possessive language ("your rate," "your loan," "your payment").
  - **Verify by:** Grep the estimate card for `your rate`, `your loan`, `your payment` (case-insensitive); expect zero matches.

---

## 4. Disclaimer Placement & Styling

- [ ] **4.1** The disclaimer MUST render in the same DOM container as the estimate output card (not in the footer, not in a separate page section).
  - **Verify by:** Inspect DOM; confirm the disclaimer element is a child of the same container element that wraps the estimate values.

- [ ] **4.2** The disclaimer MUST be visible without scrolling once the estimate card is in view.
  - **Verify by:** Submit valid input on a 1366×768 viewport; confirm the disclaimer is fully visible in the viewport at the moment the estimate card finishes rendering.

- [ ] **4.3** The disclaimer MUST NOT be inside a collapsed `<details>`, accordion, tooltip, modal, or "read more" toggle.
  - **Verify by:** Inspect DOM; confirm the disclaimer text is rendered as static visible text, not inside any collapse/disclosure element.

- [ ] **4.4** The disclaimer font weight MUST be equal to or greater than the font weight of the estimate output values.
  - **Verify by:** Inspect computed `font-weight` of disclaimer vs estimate values; disclaimer weight ≥ value weight.

- [ ] **4.5** The disclaimer font size MUST be at least 14px (no fine-print sub-12px text).
  - **Verify by:** Inspect computed `font-size` of disclaimer; confirm value ≥ 14px.

- [ ] **4.6** The disclaimer color MUST have a contrast ratio of at least 4.5:1 against its background.
  - **Verify by:** Use a contrast checker (e.g., Chrome DevTools, axe) on the disclaimer; confirm ratio ≥ 4.5:1.

- [ ] **4.7** The disclaimer text MUST appear within 200 pixels (vertical distance) of the estimate output values.
  - **Verify by:** Measure pixel distance from bottom of last estimate value to top of disclaimer; confirm ≤ 200px.

- [ ] **4.8** The disclaimer MUST contain the following verbatim text (subject to final attorney wording lock):
  - **Verify by:** Copy disclaimer text from DOM; compare character-for-character to:
  ```
  Estimate only. Not a commitment to lend, loan approval, or rate lock. All loans are business-purpose loans available only to entity borrowers (LLC, corporation, or trust) for investment in non-owner-occupied real property. Actual rate, fees, and loan amount are subject to full underwriting, appraisal, title review, and capital-partner approval and may differ materially from this estimate. No consumer or owner-occupied loans are offered.
  ```

- [ ] **4.9** The disclaimer MUST render on every state of the preview output (initial render, after edit/recalculate, after error retry).
  - **Verify by:** Trigger initial render, edit an input and recalculate, force a validation error and retry; confirm disclaimer present in all three states.

- [ ] **4.10** The disclaimer MUST NOT be removable by any user action (no "dismiss," "close," or "x" affordance).
  - **Verify by:** Inspect the disclaimer element; confirm no close button, no dismiss control, no JS handler that removes it.

- [ ] **4.11** The disclaimer text MUST NOT be paraphrased, summarized, or split across multiple containers.
  - **Verify by:** Confirm the disclaimer renders as a single contiguous text block matching the verbatim version.

---

## 5. Banned Terminology

- [ ] **5.1** The phrase `mortgage broker` MUST NOT appear anywhere on the preview page (case-insensitive).
  - **Verify by:** Grep rendered DOM and meta tags for `mortgage broker`; expect zero matches.

- [ ] **5.2** The phrase `mortgage lender` MUST NOT appear anywhere on the preview page (case-insensitive).
  - **Verify by:** Grep rendered DOM and meta tags for `mortgage lender`; expect zero matches.

- [ ] **5.3** The phrase `loan originator` MUST NOT appear anywhere on the preview page (case-insensitive).
  - **Verify by:** Grep rendered DOM and meta tags for `loan originator`; expect zero matches.

- [ ] **5.4** The consumer-marketing phrase `your dream home` MUST NOT appear anywhere on the preview page.
  - **Verify by:** Grep DOM for `dream home`; expect zero matches.

- [ ] **5.5** The phrase `lock in` (or `lock-in`, `lock your rate`) MUST NOT appear anywhere on the preview page.
  - **Verify by:** Grep DOM for `lock in`, `lock-in`, `lock your rate`; expect zero matches.

- [ ] **5.6** The word `APR` MUST NOT appear anywhere on the preview page (re-asserted from 3.10 for terminology coverage).
  - **Verify by:** Grep rendered DOM for `APR` (case-sensitive and case-insensitive); expect zero matches.

- [ ] **5.7** The phrases `pre-approved`, `pre-qualified`, `approved` (as a standalone claim about the user) MUST NOT appear on the preview page.
  - **Verify by:** Grep DOM for `pre-approved`, `pre-qualified`, `you are approved`, `you're approved`; expect zero matches.

- [ ] **5.8** The phrase `guaranteed rate` (or `guaranteed approval`, `guaranteed financing`) MUST NOT appear on the preview page.
  - **Verify by:** Grep DOM for `guaranteed`; expect zero matches in any rate/approval context.

- [ ] **5.9** The phrases `consumer loan`, `home loan`, `home mortgage`, `primary residence loan` MUST NOT appear on the preview page.
  - **Verify by:** Grep DOM for each phrase; expect zero matches.

- [ ] **5.10** No CTA button MAY use language implying a binding commitment (`Lock My Rate`, `Get My Loan`, `Apply for Mortgage`).
  - **Verify by:** Read every button label on the preview flow; confirm none use binding-commitment phrasing.

---

## 6. Required Terminology

- [ ] **6.1** The ARV cap field MUST use the literal soft-cap wording `up to ~75% of ARV, subject to appraisal & underwriting`.
  - **Verify by:** Locate the ARV field on the estimate card; copy text; compare verbatim.

- [ ] **6.2** Any self-description of the company on the preview page MUST use one or more of the approved labels: `private lender`, `capital partner`, `business-purpose lender`, `investor-focused lender`.
  - **Verify by:** Locate any phrase describing what the company is; confirm it matches one of the four approved labels.

- [ ] **6.3** Any reference to the loan purpose MUST include the phrase `business-purpose` at least once on the preview page.
  - **Verify by:** Grep DOM for `business-purpose` or `business purpose`; expect at least one match.

- [ ] **6.4** Any reference to the borrower type MUST use the phrase `entity borrower` (or `LLC, corporation, or trust`) — never `borrower` standalone in a way that implies an individual.
  - **Verify by:** Inspect every reference to the borrower; confirm entity-qualified language is used.

- [ ] **6.5** Any reference to the property type MUST include the qualifier `non-owner-occupied` or `investment` at least once on the preview page.
  - **Verify by:** Grep DOM for `non-owner-occupied`, `investment property`; expect at least one match.

- [ ] **6.6** Rate output labels MUST use the word `Estimated` as a prefix (re-asserted from 3.11).
  - **Verify by:** Inspect all rate-related labels.

---

## 7. Footer Brand Line

- [ ] **7.1** The global site footer MUST contain the verbatim text:
  - **Verify by:** Load any page on the site; scroll to the footer; copy the brand-line text; compare character-for-character to:
  ```
  The Capital Cove is a d/b/a of Guinn Consulting LLC. Business-purpose lending only. Not a consumer mortgage lender.
  ```

- [ ] **7.2** The footer brand line MUST appear on the preview page itself, not only the site marketing pages.
  - **Verify by:** Load the preview page; confirm footer renders with the brand line.

- [ ] **7.3** The footer brand line text MUST have a computed font size of at least 12px and contrast ratio of at least 4.5:1 against background.
  - **Verify by:** Inspect computed styles; run contrast check.

- [ ] **7.4** The footer brand line MUST NOT be inside a collapsed disclosure element.
  - **Verify by:** Inspect DOM; confirm the text renders as static visible content.

- [ ] **7.5** The footer brand line MUST be present in server-side rendered HTML (not injected client-side only).
  - **Verify by:** View page source (Ctrl+U) or `curl` the page; grep for `d/b/a of Guinn Consulting LLC`; expect a match in raw HTML.

---

## 8. Behavioral Rules

- [ ] **8.1** On successful submit, the estimate card MUST render without navigating away from the preview page (no full-page reload, no redirect).
  - **Verify by:** Submit valid input; confirm URL does not change AND no full document reload occurs.

- [ ] **8.2** On submit, the user inputs, gate answers, state, and computed estimate range MUST be POSTed to the GHL lead-capture endpoint.
  - **Verify by:** Open network tab; submit; confirm a POST request fires to the GHL endpoint with all expected fields in the payload.

- [ ] **8.3** The GHL payload MUST include a field tagged `entity_borrower = true` (or equivalent confirmed-yes value).
  - **Verify by:** Inspect outbound payload; confirm field present and value reflects gate answer.

- [ ] **8.4** The GHL payload MUST include a field tagged `owner_occupied = false` (or equivalent confirmed-no value).
  - **Verify by:** Inspect outbound payload; confirm field present and value reflects gate answer.

- [ ] **8.5** The GHL payload MUST include the user's selected state code.
  - **Verify by:** Inspect outbound payload; confirm `state` field with two-letter code.

- [ ] **8.6** The GHL payload MUST include the displayed estimate range as a string field (e.g., `estimated_rate_range = "9.5%–10.5%"`).
  - **Verify by:** Inspect outbound payload.

- [ ] **8.7** The GHL payload MUST include a flag indicating whether a soft-warn state was selected (e.g., `soft_warn_state = true/false`).
  - **Verify by:** Submit with a soft-warn state and a non-soft-warn state; inspect both payloads; confirm flag flips appropriately.

- [ ] **8.8** On validation failure (missing required field, invalid input), the submit button MUST remain disabled or show inline errors AND MUST NOT render a partial estimate.
  - **Verify by:** Submit with one field blank; confirm no estimate values render and inline errors are shown next to the invalid field.

- [ ] **8.9** If either gate is answered with a hard-block value (`No / Individual` or `Yes` to owner-occupied), no GHL POST MAY fire.
  - **Verify by:** Trigger each hard-block; monitor network tab; confirm zero outbound GHL POST requests.

- [ ] **8.10** If a hard-block state (`CA`, `AZ`, `HI`, `PR`) is selected, no GHL POST MAY fire on submit.
  - **Verify by:** Select each hard-block state; attempt submit; confirm no GHL POST.

- [ ] **8.11** The GHL payload MUST include a timestamp field in ISO 8601 format.
  - **Verify by:** Inspect payload; confirm presence and format of timestamp.

- [ ] **8.12** The disclaimer text content MUST be included in the GHL payload as a field (e.g., `disclaimer_shown`) for audit purposes.
  - **Verify by:** Inspect payload; confirm the verbatim disclaimer string is present as a field value.

- [ ] **8.13** No PII MUST be logged to the browser console at any point during the preview flow.
  - **Verify by:** Open DevTools console; complete the full flow; confirm no email, name, phone, or address values appear in console output.

- [ ] **8.14** On successful submission, the user MUST see a confirmation message within the preview page (no redirect to a separate "thank you" page is required, but if used, MUST also include the disclaimer and footer brand line).
  - **Verify by:** Submit valid input; confirm visible success state. If redirected, verify destination includes disclaimer and brand line.

- [ ] **8.15** The form MUST be re-submittable with edited inputs without a page reload, and each submission MUST fire its own GHL POST.
  - **Verify by:** Submit → edit a value → submit again; confirm two distinct POST requests in the network tab.

---

## 9. Feature Flag Behavior (`TERM_SHEET_PREVIEW_ENABLED`)

- [ ] **9.1** The flag `TERM_SHEET_PREVIEW_ENABLED` MUST default to `false` in all environments until explicitly enabled.
  - **Verify by:** Inspect default flag value in config / env file; confirm `false`.

- [ ] **9.2** When `TERM_SHEET_PREVIEW_ENABLED = false`, the preview route MUST return a 404 OR redirect to the standard contact / apply page.
  - **Verify by:** Set flag to false; navigate to the preview route; confirm 404 response or redirect.

- [ ] **9.3** When `TERM_SHEET_PREVIEW_ENABLED = false`, no navigation link to the preview MAY appear anywhere on the site (navbar, footer, mobile nav, CTAs, homepage modules).
  - **Verify by:** Set flag to false; grep the rendered site for any link with `href` pointing to the preview route; expect zero matches.

- [ ] **9.4** When `TERM_SHEET_PREVIEW_ENABLED = true`, the preview route MUST render the full feature with all gates, disclaimer, and footer brand line.
  - **Verify by:** Set flag to true; load route; confirm complete feature.

- [ ] **9.5** The flag MUST be evaluated server-side (not client-side only) to prevent route exposure via client tampering.
  - **Verify by:** With flag false, manipulate client-side state to attempt to render the preview; confirm server still blocks access.

- [ ] **9.6** Changing the flag MUST NOT require a code deploy (it must be readable from env var or runtime config).
  - **Verify by:** Toggle the flag via env var; restart the running app; confirm behavior change without code changes.

- [ ] **9.7** The flag state MUST be logged or observable in app health / status output so ops can confirm current production value.
  - **Verify by:** Check the app's status / health endpoint or logs; confirm current flag value is reported.

- [ ] **9.8** When the flag is flipped from `true` to `false` mid-session, in-flight preview sessions MUST gracefully degrade (no broken UI; redirect or error state).
  - **Verify by:** Start a preview session with flag true → flip to false → attempt to submit; confirm graceful failure, no JS crash.

- [ ] **9.9** The flag MUST NOT be bypassable via query string, cookie, or localStorage override (no `?preview=1` backdoor).
  - **Verify by:** With flag false, attempt common bypass patterns (query string, cookie injection, localStorage flag); confirm none expose the feature.

- [ ] **9.10** A separate flag or environment check MUST gate the GHL POST endpoint so dev/staging submissions do not write to the production GHL pipeline.
  - **Verify by:** Submit in staging; confirm payload routes to staging GHL endpoint (or no-op), not production.

---

## HARD STOPS — Items That Must Be 100% Complete Before Feature Flag Flips to True

The following items are blocking. If any one is incomplete or failing, `TERM_SHEET_PREVIEW_ENABLED` MUST remain `false`.

- [ ] **HS-1** Entity-borrower gate hard-blocks `No / Individual` selection (items 1.1–1.6, 1.12, 1.14).
- [ ] **HS-2** Owner-occupied gate hard-blocks `Yes` selection (items 1.7–1.12, 1.14).
- [ ] **HS-3** Hard-excluded states `CA`, `AZ`, `HI`, `PR` cannot proceed past the state input (items 2.1–2.3, 2.8, 8.10).
- [ ] **HS-4** Soft-warn banner renders for `NV`, `ND`, `SD`, `VT`, `MN`, `OR`, `UT`, `ID` and cannot be dismissed (items 2.4–2.6).
- [ ] **HS-5** Disclaimer renders verbatim, adjacent to the estimate, undismissable, font weight ≥ value weight, font size ≥ 14px (items 4.1–4.11).
- [ ] **HS-6** The word `APR` appears zero times on the preview page (items 3.10, 5.6).
- [ ] **HS-7** Rate output is a range, not a single number (item 3.1).
- [ ] **HS-8** ARV cap uses the verbatim soft-cap wording, not a dollar figure (items 3.4, 3.5, 6.1).
- [ ] **HS-9** Banned terms `mortgage broker`, `mortgage lender`, `loan originator` appear zero times on the preview page (items 5.1–5.3).
- [ ] **HS-10** Footer brand line `The Capital Cove is a d/b/a of Guinn Consulting LLC. Business-purpose lending only. Not a consumer mortgage lender.` appears in SSR HTML on the preview page (items 7.1, 7.2, 7.5).
- [ ] **HS-11** No GHL POST fires when any hard-block (gate or state) is triggered (items 8.9, 8.10).
- [ ] **HS-12** GHL payload includes `entity_borrower`, `owner_occupied`, `state`, `estimated_rate_range`, `disclaimer_shown` fields (items 8.3–8.6, 8.12).
- [ ] **HS-13** Feature flag defaults to `false`, is evaluated server-side, and cannot be bypassed client-side (items 9.1, 9.2, 9.5, 9.9).
- [ ] **HS-14** Attorney has signed off on the final disclaimer wording and footer brand line wording in writing.
- [ ] **HS-15** Full end-to-end QA pass on this checklist completed and signed off by a non-author reviewer.
