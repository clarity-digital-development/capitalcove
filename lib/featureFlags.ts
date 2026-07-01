/**
 * Build-time feature flags. Toggle by PR — no env vars, no runtime overrides.
 *
 * Compliance note: TERM_SHEET_PREVIEW_ENABLED must NOT flip to `true` until
 * Florida lending counsel has signed off on the disclaimer wording and the
 * full checklist in docs/term-sheet-compliance-checklist.md is green.
 * EligibilityGates run regardless of this flag — they're always-on compliance.
 */
export const FEATURE_FLAGS = {
  TERM_SHEET_PREVIEW_ENABLED: false,
} as const;
