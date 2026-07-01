// ---------------------------------------------------------------------------
// Site Configuration
// ---------------------------------------------------------------------------

export const SITE_CONFIG = {
  name: 'The Capital Cove',
  legalName: 'Guinn Consulting LLC',
  legalString: 'Guinn Consulting LLC d/b/a The Capital Cove',
  tagline: "Most lenders don't understand investors. I do — because I am one.",
  phone: '(904) 480-6147',
  phoneHref: 'tel:+19044806147',
  email: 'guinnconsulting@proton.me',
  emailHref: 'mailto:guinnconsulting@proton.me',
  locationLine: 'Serving investors in 47 states from Jacksonville, FL',
  city: 'Jacksonville',
  stateCode: 'FL',
  // Base site URL — override per environment via NEXT_PUBLIC_SITE_URL (Railway),
  // falls back to the production domain. Drives canonical/OG/sitemap/robots/JSON-LD.
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://thecapitalcove.com',
  description:
    'Fix & flip funding from 9%. Up to 75% ARV, 100% rehab financing, close in as few as 5 days. No income verification. 47 states.',
  socialLinks: {
    instagram: 'https://instagram.com/904.dalton',
    instagramHandle: '@904.dalton',
    facebook: 'https://www.facebook.com/profile.php?id=61585011284601',
  },
} as const;

// States we do NOT lend in
export const EXCLUDED_STATES = ['CA', 'AZ', 'HI', 'PR'] as const;
export type ExcludedState = (typeof EXCLUDED_STATES)[number];

export function isExcludedState(code: string): boolean {
  return (EXCLUDED_STATES as readonly string[]).includes(code);
}

// ---------------------------------------------------------------------------
// Navigation Types & Data
// ---------------------------------------------------------------------------

export interface NavItem {
  label: string;
  href: string;
}

export interface NavGroup {
  label: string;
  href?: string;
  children?: NavItem[];
}

// Full program list — used for footer, sitemap, and Phase 2 placeholder pages
export const LOAN_PROGRAMS: NavItem[] = [
  { label: 'Fix & Flip', href: '/loans' },
  { label: 'Bridge Loans', href: '/loans/bridge' },
  { label: 'Rental / DSCR', href: '/loans/rental' },
  { label: 'New Construction', href: '/loans/new-construction' },
];

export const RESOURCES: NavItem[] = [
  { label: 'Blog', href: '/resources' },
  { label: 'Flip Calculator', href: '/resources/calculator' },
  { label: 'FAQ', href: '/faq' },
];

// Nav at launch: Fix & Flip is the only top-level loan link. No dropdown.
export const NAV_ITEMS: NavGroup[] = [
  { label: 'Fix & Flip Loans', href: '/loans' },
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'Resources', children: RESOURCES },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

// ---------------------------------------------------------------------------
// Fix & Flip Loan Program Data (primary product at launch)
// ---------------------------------------------------------------------------

export interface RateTermRow {
  label: string;
  value: string;
}

export const FIX_AND_FLIP_RATE_TERMS: RateTermRow[] = [
  { label: 'Interest Rate', value: '9% – 11.5% (based on credit and experience)' },
  { label: 'Payment Type', value: 'Interest-only' },
  { label: 'Max LTV (ARV)', value: 'Up to 75%' },
  { label: 'Rehab Financing', value: '100% of renovation costs' },
  { label: 'Min Loan Amount', value: '$100,000' },
  { label: 'Loan Term', value: '12 – 24 months' },
  { label: 'Min Credit Score', value: '640' },
  { label: 'Experience Required', value: 'None — first-time investors welcome' },
  { label: 'Fastest Closing', value: '5 days' },
  { label: 'Prepayment Penalty', value: 'None' },
  { label: 'Extensions', value: 'Available' },
  { label: 'Income Verification', value: 'Bank statement only — no tax returns, no W-2s' },
  { label: 'Entity Requirement', value: 'LLC required' },
  { label: 'Coverage', value: '47 states (all except CA, AZ, HI, PR)' },
];

export const FIX_AND_FLIP_ELIGIBILITY = {
  whatWeLookFor: [
    'Non-owner occupied 1-4 family, condos, or townhomes',
    'LLC entity (formed or in process)',
    '640+ credit score',
    'Bank statement showing capital for down payment & reserves',
    'Realistic scope of work and ARV',
  ],
  whatWeDontRequire: [
    'Tax returns',
    'W-2s or pay stubs',
    'Income verification',
    'Prior flip experience',
    'Prepayment penalties',
  ],
} as const;

export interface ProcessStepShort {
  title: string;
  description: string;
}

export const FIX_AND_FLIP_PROCESS_STEPS: ProcessStepShort[] = [
  {
    title: 'Find Your Deal',
    description:
      'Lock down a property and build a realistic scope of work. Submit your deal and we review it the same day.',
  },
  {
    title: 'Get Funded',
    description:
      'Terms in hand, docs collected, underwriting closed. Wires hit the title company in as few as 5 days.',
  },
  {
    title: 'Renovate & Sell',
    description:
      '100% of your rehab budget is funded in draws. Pay off the loan when you sell — no prepayment penalty.',
  },
];

export interface ComparisonRow {
  feature: string;
  capitalCove: string;
  traditional: string;
}

export const FIX_AND_FLIP_COMPARISON: ComparisonRow[] = [
  {
    feature: 'Closing Speed',
    capitalCove: 'As fast as 5 days',
    traditional: '30 – 60 days',
  },
  {
    feature: 'Documentation',
    capitalCove: 'Bank statement only',
    traditional: 'Tax returns, pay stubs, W-2s',
  },
  {
    feature: 'Experience Required',
    capitalCove: 'None — first-timers welcome',
    traditional: 'Extensive history required',
  },
  {
    feature: 'Rehab Funding',
    capitalCove: '100% funded',
    traditional: 'Not available',
  },
  {
    feature: 'Flexibility',
    capitalCove: 'Investor-focused underwriting',
    traditional: 'Rigid bank criteria',
  },
  {
    feature: 'Prepayment Penalty',
    capitalCove: 'None',
    traditional: 'Often 1 – 3%',
  },
];

export interface LoanFAQItem {
  question: string;
  answer: string;
}

export const FIX_AND_FLIP_FAQ: LoanFAQItem[] = [
  {
    question: 'How fast can I close?',
    answer: 'As fast as 5 days. Our average is 10-14 days.',
  },
  {
    question: 'Do I need experience?',
    answer:
      "No. We've funded first-time flippers. Your deal and scope of work matter more than your track record.",
  },
  {
    question: 'What documents do I need?',
    answer:
      'Purchase contract, scope of work, LLC docs, and a recent bank statement. No tax returns, no W-2s.',
  },
  {
    question: 'Do I need an LLC?',
    answer: 'Yes. All loans require an LLC or entity. We can help you get set up if you need to.',
  },
  {
    question: 'What states do you lend in?',
    answer: '47 states — everywhere except California, Arizona, Hawaii, and Puerto Rico.',
  },
  {
    question: 'Is there a prepayment penalty?',
    answer: 'No. Pay it off whenever you’re ready.',
  },
  {
    question: 'How does rehab funding work?',
    answer:
      'We fund 100% of your renovation costs, disbursed in draws. When a phase of work is complete, we inspect and release funds.',
  },
  {
    question: 'What’s your minimum credit score?',
    answer: '640.',
  },
];

export const FIX_AND_FLIP_HERO_PILLS = [
  'Rates from 9%',
  'Up to 75% ARV',
  '100% Rehab Funded',
] as const;

// ---------------------------------------------------------------------------
// Phase 2 Programs (placeholder pages — no rate tables)
// ---------------------------------------------------------------------------

export interface Phase2Program {
  slug: 'bridge' | 'rental' | 'new-construction';
  name: string;
  tagline: string;
  description: string[];
  stats: { label: string; value: string }[];
  metaTitle: string;
  metaDescription: string;
}

export const PHASE_2_PROGRAMS: Phase2Program[] = [
  {
    slug: 'bridge',
    name: 'Bridge Loans',
    tagline: 'Short-term financing to seize time-sensitive opportunities.',
    description: [
      'Bridge loans provide fast, flexible capital when you need to move quickly — acquiring a property before selling an existing one, closing on an auction purchase, or stabilizing a property before permanent financing.',
      'Our bridge program is designed for real estate investors who need certainty of close and a lender who understands deal dynamics. Every bridge deal is structured around your timeline and exit strategy.',
      'Because terms vary significantly by deal, send us the details and we’ll come back with a structure that fits.',
    ],
    stats: [
      { label: 'Typical LTV', value: 'Up to 80%' },
      { label: 'Typical Term', value: '6 – 24 months' },
      { label: 'Payment Type', value: 'Interest-only' },
    ],
    metaTitle: 'Bridge Loans for Real Estate Investors | The Capital Cove',
    metaDescription:
      'Short-term bridge financing for real estate acquisitions. Contact us for current terms.',
  },
  {
    slug: 'rental',
    name: 'Rental / DSCR',
    tagline: 'Long-term financing based on property cash flow, not your W-2.',
    description: [
      'DSCR rental loans qualify you based on the rental income of the property — not your personal income. Perfect for investors building a portfolio of cash-flowing rental properties who want a streamlined qualification process.',
      'No tax returns. No employment verification. If the property cash-flows, we can finance it.',
      'Because rates move frequently and vary by scenario, send us the details and we’ll come back with current pricing.',
    ],
    stats: [
      { label: 'Typical LTV', value: 'Up to 80%' },
      { label: 'Term Length', value: '30-year (fixed & ARM)' },
      { label: 'Income Docs', value: 'None' },
    ],
    metaTitle: 'DSCR Rental Loans | The Capital Cove',
    metaDescription:
      'Rental property financing based on property cash flow. No tax returns required. Contact us for terms.',
  },
  {
    slug: 'new-construction',
    name: 'New Construction',
    tagline: 'Ground-up financing for builders and developers.',
    description: [
      'New construction loans fund you from lot acquisition through final completion. Whether you’re building a single spec home or a small subdivision, we can structure a loan with a realistic draw schedule.',
      '100% of construction costs can be funded. Interest is charged only on funds that have been disbursed, keeping carrying costs low during early phases.',
      'Because construction deals are heavily scenario-dependent, send us your plans, budget, and ARV and we’ll come back with terms.',
    ],
    stats: [
      { label: 'Construction Costs', value: '100% funded' },
      { label: 'Typical Term', value: '12 – 24 months' },
      { label: 'Payment Type', value: 'Interest-only' },
    ],
    metaTitle: 'New Construction Loans | The Capital Cove',
    metaDescription:
      'Ground-up construction financing. 100% construction costs funded. Interest-only payments.',
  },
];

// ---------------------------------------------------------------------------
// Funded Deals (replaces generic testimonials)
// ---------------------------------------------------------------------------

export interface FundedDeal {
  borrowers: string;
  location: string;
  program: string;
  loanAmount: string;
  closingHighlight: string;
  borrowerType: string;
  notes: string;
  /** Testimonial quote when available (undefined = show without quote). */
  quote?: string;
}

export const FUNDED_DEALS: FundedDeal[] = [
  {
    borrowers: 'Nick & Laurissa',
    location: 'Jacksonville, FL',
    program: 'Fix & Flip',
    loanAmount: '$164,500',
    closingHighlight: 'Closed in 14 days',
    borrowerType: 'First-time investors',
    notes: 'First funded deal for first-time flippers.',
  },
  {
    borrowers: 'Bob & Lynda',
    location: 'Jacksonville, FL',
    program: 'Fix & Flip',
    loanAmount: '$202,500',
    closingHighlight: 'Clear-to-close in 5 days',
    borrowerType: 'Probate property',
    notes: 'Inherited probate property funded on an accelerated timeline.',
  },
];

// ---------------------------------------------------------------------------
// Trust / Stats Strips
// ---------------------------------------------------------------------------

export interface TrustStat {
  label: string;
  value: string;
}

// Top-of-fold hero pills
export const HERO_TRUST_PILLS: string[] = [
  '5-Day Closings',
  'Up to 75% ARV',
  '100% Rehab Funded',
  '47 States',
];

// Dark TrustBar below hero
export const TRUST_BAR_ITEMS: string[] = [
  '$6M+ in Real Estate Transactions',
  '$367K in Deals Funded',
  'First-Time Investors Welcome',
  'No Income Verification',
];

// About page stat grid
export const ABOUT_STATS: TrustStat[] = [
  { label: 'In Real Estate Transactions', value: '$6M+' },
  { label: 'Monthly Cash Flow', value: '$2K' },
  { label: 'Fastest Close', value: '5 Days' },
  { label: 'States Served', value: '47' },
];

// ---------------------------------------------------------------------------
// How It Works — Full 5-Step Timeline
// ---------------------------------------------------------------------------

export interface ProcessStep {
  number: number;
  title: string;
  description: string;
  timeline: string;
}

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: 1,
    title: 'Submit Your Deal',
    description:
      'Fill out our 2-minute application with property details — purchase price, scope of work, and loan amount needed.',
    timeline: 'Same day',
  },
  {
    number: 2,
    title: 'Get Your Term Sheet',
    description:
      'Dalton reviews your deal personally and sends terms. No credit pull, no obligation.',
    timeline: 'Often same day',
  },
  {
    number: 3,
    title: 'Upload Documents',
    description:
      'Purchase contract, scope of work, LLC docs, and a recent bank statement. That’s it — no tax returns, no W-2s.',
    timeline: 'Day 1-2',
  },
  {
    number: 4,
    title: 'Underwriting',
    description:
      'Deal and property review. We focus on the asset and the plan, not your income history.',
    timeline: 'Day 2-4',
  },
  {
    number: 5,
    title: 'Close & Fund',
    description:
      'We coordinate with title, schedule closing, and wire funds. You walk away with capital in hand.',
    timeline: 'As fast as Day 5',
  },
];

export interface Differentiator {
  title: string;
  description: string;
}

export const DIFFERENTIATORS: Differentiator[] = [
  {
    title: 'You Talk to Dalton, Not a Call Center',
    description:
      'One point of contact throughout. No transfers, no committees, no chasing down updates.',
  },
  {
    title: 'We’ve Done the Deals Ourselves',
    description:
      'Founded by an active investor with $6M+ in real estate transactions. We understand your deal because we’ve done them.',
  },
  {
    title: 'No Bank Bureaucracy',
    description:
      'No tax returns, no W-2s, no committee approvals. Just a deal that makes sense and a bank statement.',
  },
];

// ---------------------------------------------------------------------------
// Values (About page)
// ---------------------------------------------------------------------------

export interface Value {
  title: string;
  description: string;
}

export const VALUES: Value[] = [
  {
    title: 'Speed Over Red Tape',
    description: 'We close in days, not months. Your deal doesn’t wait for a committee.',
  },
  {
    title: 'Transparency First',
    description: 'No hidden fees, no surprises. You see your terms before you commit.',
  },
  {
    title: 'Investor to Investor',
    description:
      'We’ve bought, renovated, and sold properties. We understand your deal because we’ve done them ourselves.',
  },
];

// ---------------------------------------------------------------------------
// FAQ (Global FAQ Page)
// ---------------------------------------------------------------------------

export interface FAQQuestion {
  question: string;
  answer: string;
}

export interface FAQCategory {
  category: string;
  questions: FAQQuestion[];
}

export const FAQ_CATEGORIES: FAQCategory[] = [
  {
    category: 'About The Capital Cove',
    questions: [
      {
        question: 'Who is The Capital Cove?',
        answer:
          'The Capital Cove is a private lending operation founded by Dalton Guinn, an active real estate investor with $6M+ in transactions. We fund fix & flip, bridge, rental, and new construction loans for investors in 47 states.',
      },
      {
        question: 'Why choose The Capital Cove over a bank?',
        answer:
          'We close in days, not months. We don’t require tax returns or W-2s. You work directly with Dalton — no call centers, no committees, no runaround. And we’ve done the deals ourselves, so we actually understand what you’re up against.',
      },
      {
        question: 'Where are you based?',
        answer:
          'Jacksonville, Florida. We lend nationally in 47 states (all except California, Arizona, Hawaii, and Puerto Rico).',
      },
      {
        question: 'Who is behind The Capital Cove?',
        answer:
          'Dalton Guinn, an active real estate investor with $2.5M in rental properties ($2K/month positive cash flow) and $3.5M+ in completed flips (largest single profit $200K). He started The Capital Cove to be the lender he wished he had when he began investing.',
      },
    ],
  },
  {
    category: 'Loan Terms & Pricing',
    questions: [
      {
        question: 'What are your interest rates?',
        answer:
          'Fix & flip rates range from 9% to 11.5% depending on your credit and experience. Rates for bridge, rental, and new construction vary by scenario — contact us for current pricing on those programs.',
      },
      {
        question: 'What loan-to-value (LTV) do you offer?',
        answer:
          'Fix & flip loans go up to 75% of after-repair value (ARV) with 100% of rehab costs funded. Other programs vary — contact us for specifics on your deal.',
      },
      {
        question: 'Do you charge prepayment penalties?',
        answer: 'No. Our fix & flip loans have zero prepayment penalty. Pay off whenever you’re ready.',
      },
      {
        question: 'What’s the minimum loan amount?',
        answer: '$100,000 for fix & flip.',
      },
    ],
  },
  {
    category: 'Process & Timeline',
    questions: [
      {
        question: 'How fast can you close?',
        answer:
          'As fast as 5 days for fix & flip. Average is 10-14 days. The bottleneck is usually title and appraisal — we move quickly on our end.',
      },
      {
        question: 'What documents do I need to apply?',
        answer:
          'To apply, just the basics — property address, purchase price, loan amount, and contact info. For closing, we need a purchase contract, scope of work, LLC docs, and a recent bank statement. No tax returns, no W-2s.',
      },
      {
        question: 'What is the appraisal process?',
        answer:
          'Depending on deal size, we may order a desktop BPO, a drive-by appraisal, or a full interior appraisal. For fix & flip, it’s an as-complete appraisal based on your scope of work.',
      },
    ],
  },
  {
    category: 'Requirements & Eligibility',
    questions: [
      {
        question: 'What’s your minimum credit score?',
        answer: '640 for fix & flip.',
      },
      {
        question: 'Do you fund first-time investors?',
        answer: 'Yes. Both of our funded deals so far have been first-timers. If your deal makes sense, we can fund it.',
      },
      {
        question: 'Do I need an LLC?',
        answer:
          'Yes — all loans require an LLC or business entity. If you don’t have one yet, we can point you to resources to get set up quickly.',
      },
      {
        question: 'What states do you lend in?',
        answer: '47 states — everywhere except California, Arizona, Hawaii, and Puerto Rico.',
      },
      {
        question: 'Do you require a personal guarantee?',
        answer: 'Yes. The managing member of the LLC signs a personal guarantee. This is standard for private lending.',
      },
    ],
  },
  {
    category: 'After Closing',
    questions: [
      {
        question: 'How do I make payments?',
        answer:
          'Payments are monthly, interest-only, via ACH auto-debit. You’ll get servicing details in your closing package.',
      },
      {
        question: 'How do rehab draws work?',
        answer:
          'When a phase of work is complete, you request a draw. We send an inspector to verify, and funds are typically released within 2-3 business days of a passed inspection.',
      },
      {
        question: 'What if I need more time?',
        answer:
          'Extensions are available on a case-by-case basis, typically in 3- or 6-month increments. Terms are outlined in your original loan agreement.',
      },
    ],
  },
];

// ---------------------------------------------------------------------------
// US States (CA/AZ/HI not excluded from the selector — just flagged at the UX level)
// ---------------------------------------------------------------------------

export interface USState {
  value: string;
  label: string;
}

export const US_STATES: USState[] = [
  { value: 'AL', label: 'Alabama' },
  { value: 'AK', label: 'Alaska' },
  { value: 'AZ', label: 'Arizona' },
  { value: 'AR', label: 'Arkansas' },
  { value: 'CA', label: 'California' },
  { value: 'CO', label: 'Colorado' },
  { value: 'CT', label: 'Connecticut' },
  { value: 'DE', label: 'Delaware' },
  { value: 'DC', label: 'District of Columbia' },
  { value: 'FL', label: 'Florida' },
  { value: 'GA', label: 'Georgia' },
  { value: 'HI', label: 'Hawaii' },
  { value: 'ID', label: 'Idaho' },
  { value: 'IL', label: 'Illinois' },
  { value: 'IN', label: 'Indiana' },
  { value: 'IA', label: 'Iowa' },
  { value: 'KS', label: 'Kansas' },
  { value: 'KY', label: 'Kentucky' },
  { value: 'LA', label: 'Louisiana' },
  { value: 'ME', label: 'Maine' },
  { value: 'MD', label: 'Maryland' },
  { value: 'MA', label: 'Massachusetts' },
  { value: 'MI', label: 'Michigan' },
  { value: 'MN', label: 'Minnesota' },
  { value: 'MS', label: 'Mississippi' },
  { value: 'MO', label: 'Missouri' },
  { value: 'MT', label: 'Montana' },
  { value: 'NE', label: 'Nebraska' },
  { value: 'NV', label: 'Nevada' },
  { value: 'NH', label: 'New Hampshire' },
  { value: 'NJ', label: 'New Jersey' },
  { value: 'NM', label: 'New Mexico' },
  { value: 'NY', label: 'New York' },
  { value: 'NC', label: 'North Carolina' },
  { value: 'ND', label: 'North Dakota' },
  { value: 'OH', label: 'Ohio' },
  { value: 'OK', label: 'Oklahoma' },
  { value: 'OR', label: 'Oregon' },
  { value: 'PA', label: 'Pennsylvania' },
  { value: 'RI', label: 'Rhode Island' },
  { value: 'SC', label: 'South Carolina' },
  { value: 'SD', label: 'South Dakota' },
  { value: 'TN', label: 'Tennessee' },
  { value: 'TX', label: 'Texas' },
  { value: 'UT', label: 'Utah' },
  { value: 'VT', label: 'Vermont' },
  { value: 'VA', label: 'Virginia' },
  { value: 'WA', label: 'Washington' },
  { value: 'WV', label: 'West Virginia' },
  { value: 'WI', label: 'Wisconsin' },
  { value: 'WY', label: 'Wyoming' },
];

// ---------------------------------------------------------------------------
// SMS Consent Copy (used by both forms — must match verbatim across app)
// ---------------------------------------------------------------------------

export const SMS_CONSENT_COPY =
  'I agree to receive SMS messages from The Capital Cove regarding my funding request. Message frequency varies. Msg & data rates may apply. Reply STOP to opt out.';
