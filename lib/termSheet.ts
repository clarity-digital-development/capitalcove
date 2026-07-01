/**
 * Term sheet estimate calculator — pure functions, zero React deps.
 *
 * Compliance: all outputs are RANGES, never single numbers. The word "APR"
 * must never appear. Values are tuned to Dalton's Fix & Flip program
 * (9–11.5% rate band, interest-only, 12–24 month, ≤75% ARV).
 *
 * Loan-amount-tiered bands reflect industry pricing logic: smaller loans
 * carry higher rates because origination cost is closer to break-even.
 */

export interface TermSheetInput {
  /** Quick-quote loan type slug. Only `fix-and-flip` produces a preview today. */
  loanType: string;
  /** Property purchase price, raw dollars. */
  purchasePrice: number;
  /** Requested loan amount, raw dollars. */
  loanAmount: number;
}

export interface DollarRange {
  low: number;
  high: number;
}

export interface PercentRange {
  low: number;
  high: number;
}

export interface TermSheetEstimate {
  rate: PercentRange;
  monthlyPayment: DollarRange;
  cashToClose: DollarRange;
  loanAmount: number;
  /** Pure-text statement of the ARV rule — no computed dollar amount. */
  arvRule: string;
  /** Loan term displayed alongside the rate (interest-only). */
  loanTermLabel: string;
}

/**
 * Loan-amount-tiered rate bands within the published 9–11.5% Fix & Flip range.
 * Edit only with Dalton + capital-partner alignment.
 */
function rateBandForLoanAmount(loanAmount: number): PercentRange {
  if (loanAmount < 200_000) return { low: 10.0, high: 11.5 };
  if (loanAmount <= 500_000) return { low: 9.5, high: 11.0 };
  return { low: 9.0, high: 10.5 };
}

/** Round to nearest $500 for display — avoids false precision on estimates. */
function roundTo500(value: number): number {
  return Math.round(value / 500) * 500;
}

/**
 * Conservative origination + closing-cost assumptions for cash-to-close.
 * Origination: 2.0%–3.0% of loan amount (midpoint 2.5%).
 * Closing buffer: $3,500–$5,500 (midpoint $4,500) for title, recording, insurance prepaid.
 */
const ORIGINATION_POINTS = 2.5;
const CLOSING_BUFFER_LOW = 3_500;
const CLOSING_BUFFER_HIGH = 5_500;

export function estimateTermSheet(input: TermSheetInput): TermSheetEstimate {
  const rate = rateBandForLoanAmount(input.loanAmount);

  const monthlyLow = (input.loanAmount * (rate.low / 100)) / 12;
  const monthlyHigh = (input.loanAmount * (rate.high / 100)) / 12;

  const downPayment = Math.max(0, input.purchasePrice - input.loanAmount);
  const originationFee = input.loanAmount * (ORIGINATION_POINTS / 100);
  const cashLow = downPayment + originationFee + CLOSING_BUFFER_LOW;
  const cashHigh = downPayment + originationFee + CLOSING_BUFFER_HIGH;

  return {
    rate,
    monthlyPayment: {
      low: roundTo500(monthlyLow),
      high: roundTo500(monthlyHigh),
    },
    cashToClose: {
      low: roundTo500(cashLow),
      high: roundTo500(cashHigh),
    },
    loanAmount: input.loanAmount,
    arvRule:
      'Up to ~75% of your property’s after-repair value. Subject to appraisal and underwriting.',
    loanTermLabel: 'Interest-only, 12-month term',
  };
}

/** Format a percent range as "9.5% – 11.0%". */
export function formatPercentRange(range: PercentRange): string {
  const fmt = (n: number) => (Number.isInteger(n) ? `${n}.0%` : `${n.toFixed(1)}%`);
  return `${fmt(range.low)} – ${fmt(range.high)}`;
}

/** Format a dollar range as "$1,500 – $1,750" (no cents). */
export function formatDollarRange(range: DollarRange): string {
  const fmt = (n: number) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(n);
  if (range.low === range.high) return fmt(range.low);
  return `${fmt(range.low)} – ${fmt(range.high)}`;
}

/** Format a single dollar amount, e.g. the loan amount echoed back. */
export function formatDollar(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);
}

/**
 * Verbatim disclaimer copy from the Florida lending compliance memo.
 * Treat this as DRAFT — must be reviewed and finalized by Florida lending
 * counsel before TERM_SHEET_PREVIEW_ENABLED flips to true.
 */
export const TERM_SHEET_DISCLAIMER_DRAFT =
  'Estimate only. Not a commitment to lend, loan approval, or rate lock. ' +
  'All loans are business-purpose loans available only to entity borrowers ' +
  '(LLC, corporation, or trust) for investment in non-owner-occupied real ' +
  'property. Actual rate, fees, and loan amount are subject to full ' +
  'underwriting, appraisal, title review, and capital-partner approval and ' +
  'may differ materially from this estimate. No consumer or owner-occupied ' +
  'loans are offered.';
