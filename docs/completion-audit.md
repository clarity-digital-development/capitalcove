# Completion Audit — The Capital Cove Website

**Date:** 2026-07-01 · **Verdict:** ~74% launch-ready — content-complete & buildable, but a small cluster of launch-blockers remain in the lead-data pipeline, compliance layer, and git/deploy hygiene.

Ground-truth checks: `tsc --noEmit` passes, `next build` succeeds (all 23 routes compile, 3 blog posts SSG). No broken imports despite deleted files.

---

## ✅ What's done and working

- **All pages have real, launch-quality content** — no lorem ipsum, no "coming soon", no unfinished copy. Home, Fix & Flip (`/loans`), About (real founder narrative + headshot), How It Works, Contact, FAQ (~20 Q&A + JSON-LD), Apply, Calculator (374-line flip calculator), Privacy & Terms (substantial FL-specific legal content), 3 blog posts.
- **Navigation integrity** — every Navbar/MobileNav/Footer link resolves to a real route; no links to deleted `/loans/fix-and-flip`; no orphaned components; all contact/social values from `SITE_CONFIG` (real data).
- **Forms wired end-to-end** — react-hook-form + inline zod (replaced deleted `lib/validators.ts`), multi-step logic, eligibility gates hard-block individual/owner-occupied, localStorage drafts, deep-link prefill, error/success states.
- **SEO foundation** — every page has title/description; root layout emits Organization/FinancialService/LocalBusiness JSON-LD; sitemap, robots, and dynamic 1200×630 OG image all present.
- **Build/deploy config sound** — `next.config` standalone, correct 2-stage Dockerfile, Tailwind v4 + fonts, `.env.local` gitignored (token won't leak via git), blog markdown traced into standalone build.
- **Term-sheet preview correctly flagged OFF** (`TERM_SHEET_PREVIEW_ENABLED = false`), so its incompleteness does NOT block the marketing-site launch.

---

## 🚫 Launch blockers (code — must fix before launch / paid traffic)

| # | Blocker | File | Effort |
|---|---------|------|--------|
| 1 | **GHL custom fields silently dropped.** Payload sends `{ id: cf.key, value }`; v2 API needs `{ key: cf.key, field_value: value }`. Result: every lead arrives with name/phone only — **zero deal context** (loan type, ARV, exit, entity, UTM, gate confirmations). Defeats the CRM integration even if Dalton sets up fields perfectly. | `lib/ghl.ts:83-86` | quick |
| 2 | **Most of the feature set is UNTRACKED in git.** AttributionTracker, all 5 lotties, both Dalton images, all blog markdown, opengraph-image, `lib/attribution.ts`/`featureFlags.ts`/`termSheet.ts`, many components are `??`. Git-based Railway deploy will fail (module-not-found) unless `git add -A` before commit. | working tree | quick |
| 3 | **SMS/TCPA consent never persisted.** Required on both forms but stripped by zod / never written to GHL. No auditable consent record for a lender. Add `sms_consent` (+timestamp) field + wire it. | `api/leads`, `api/apply`, `lib/ghl` | quick |
| 4 | **Missing compliance footer brand line.** "The Capital Cove is a d/b/a of Guinn Consulting LLC. Business-purpose lending only. Not a consumer mortgage lender." absent site-wide. Required for GENERAL launch (per compliance checklist 7.x/HS-10), not just term sheet. | `Footer.tsx:141` | quick |
| 5 | **Excluded states not hard-blocked on live quote form.** CA/AZ/HI/PR selectable; shows "send us your details anyway" workaround copy and still submits. Compliance checklist requires a hard block + "We do not currently lend in this state." | `QuickQuoteForm.tsx:268-278` | medium |
| 6 | **EligibilityGates use non-verbatim wording.** Always-on gates don't match the legally-specified question/option/block text (checklist 1.2/1.3/1.5/1.8/1.9/1.11). Confirm exact wording w/ counsel, then fix. | `EligibilityGates.tsx` | quick |
| 7 | **`NEXT_PUBLIC_SITE_URL` documented but never read.** Base URL hardcoded to `thecapitalcove.com` in `SITE_CONFIG.url`; canonical/OG/sitemap/robots/JSON-LD break silently if launched on a different domain. Wire the env var (with fallback) OR lock the domain + remove from deploy doc. | `lib/constants.ts:17` | quick |

---

## 🟡 Should-have (fix soon; not strictly blocking)

- **Contact/opportunity not decoupled** — an opportunity failure orphans the just-created contact and 500s the whole request (user resubmits → duplicate contact). Wrap `createOpportunity` in its own try/catch. (`api/*`)
- **`notes` field has no GHL destination** — Quick Quote message uses an undocumented `notes` key. Add a documented `lead_notes` field or write to GHL Notes object.
- **ContactForm creates a sales opportunity** for every general inquiry — confirm desired CRM behavior with client; branch to skip opportunity if not wanted.
- **No favicon / app icons** — serves default Next favicon. Add `app/icon.png` + `apple-icon`.
- **"Featured Image" gray placeholder** on `/resources` blog cards — replace with real thumbnails or remove the box.
- **Blog posts have no Article/BlogPosting JSON-LD** and no publish date in frontmatter.
- **Gold CTA inconsistency + contrast fail** — nav "Get Your Rate" is white-on-gold (~1.9:1, fails WCAG AA); in-page CTAButton is navy-on-gold (passes). Unify.
- **`ButtonSelector` has no `grid-cols-5` case** — "Deals Completed" (5 options) renders as lopsided 2-col.
- **Broken `lint` script** — `next lint` removed in Next 16, no eslint config. Fix or remove.
- **No `.dockerignore`** — local docker build bakes `.env.local` (real token) + node_modules into a layer.

---

## ⚠️ Risk areas NOT yet covered (recommend before paid traffic)

- **Rate-limiting / bot protection** — `/api/leads` and `/api/apply` are public, unauthenticated, create GHL contacts+opportunities on every POST. Trivially floodable. Add Cloudflare Turnstile / honeypot / per-IP throttle.
- **Analytics conversion events** — GA gated on env var, but no `form_submit`/`quote_complete` events are dispatched. Even once the ID is set, GA sees only pageviews → nothing for paid-traffic optimization.
- **Custom 404 / error / loading pages** — verify `not-found.tsx` / `error.tsx` / `global-error.tsx` exist.
- **Accessibility pass** — form labels/aria, focus management across multi-step flows, `prefers-reduced-motion` for framer-motion/lottie, keyboard operability.
- **GHL API resilience** — no timeout/retry/idempotency; double-submit → duplicate contacts.
- **Mobile/responsive pass** — comparison/rate tables + calculator overflow risk on phones; sticky CTA gap 768–1023px.
- **Performance/Lighthouse** — framer-motion + 5 lotties on homepage; LCP matters for a paid-traffic landing page.
- **Cookie consent** — GA + GHL chat set cookies; no consent banner/mode.

---

## 👤 External human gates (client / Dalton / attorney — not code)

1. **FL lending counsel sign-off in writing** on term-sheet disclaimer + footer brand-line wording before flipping `TERM_SHEET_PREVIEW_ENABLED` (HS-14). Rename `TERM_SHEET_DISCLAIMER_DRAFT` once locked.
2. **Dalton creates all ~35 GHL custom fields** with exact keys (incl. new `sms_consent`) per `ghl-custom-fields-setup.md`.
3. **Confirm final production domain** (code hardcodes `thecapitalcove.com`).
4. **Provide GA4 measurement ID** → set `NEXT_PUBLIC_GA_ID` in Railway.
5. **Rotate `GHL_API_TOKEN`** (sat in plaintext on disk + pasted in deploy doc); set as Railway env var only.
6. **Confirm/refresh "Last updated" date** on Privacy & Terms (currently 2026-04-18).
7. **Substantiate marketing claims** ($6M+ transactions, $367K funded, 47 states, funded-deal testimonials).
8. **Decide** whether ContactForm inquiries should create a pipeline opportunity.

---

## Term-Sheet Preview feature (separate, legally-gated workstream — ~35% done)

Correctly flagged OFF; NOT a launch blocker for the marketing site. To eventually flip the flag true, remaining work includes: re-architect flag to runtime/server-side env var (currently build-time constant), give it a real gated route, add 8 soft-warn states + non-dismissible banner, verbatim output labels + "Your Inputs" echo, missing GHL audit fields (`estimated_rate_range` string, `disclaimer_shown`, ISO timestamp, soft-warn flag), wire the no-op "Get my real term sheet" CTA, plus counsel + QA sign-off (HS-14/HS-15). See `docs/term-sheet-compliance-checklist.md`.

---

## Recommended sequence to launch

1. `git add -A` + verify a clean-clone `npm ci && npm run build` (blocker #2 — unblocks everything).
2. Fix GHL field-shape bug (#1), persist SMS consent (#3) → run the doc's end-to-end GHL test lead.
3. Add footer compliance line (#4), hard-block excluded states (#5), verbatim gates (#6).
4. Confirm domain → wire/lock `SITE_CONFIG.url` (#7).
5. Add bot protection + analytics events (risk areas) before spending on traffic.
6. Human gates (counsel, GHL fields, GA ID, token rotation) in parallel.
