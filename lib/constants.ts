// ---------------------------------------------------------------------------
// Site Configuration
// ---------------------------------------------------------------------------

export const SITE_CONFIG = {
  name: 'Capital Cove',
  fullName: 'Capital Cove Real Estate Funding',
  tagline: 'Real Estate Funding',
  phone: '(555) 888-0123',
  phoneHref: 'tel:+15558880123',
  email: 'info@capitalcove.com',
  address: '123 Capital Avenue, Suite 400, Los Angeles, CA 90071',
  nmls: 'NMLS #123456',
  url: 'https://capitalcove.com',
  description:
    'Capital Cove provides fast, flexible private real estate funding for investors and borrowers. Bridge loans, fix & flip, DSCR rentals, and new construction financing.',
  socialLinks: {
    instagram: 'https://instagram.com/capitalcove',
    linkedin: 'https://linkedin.com/company/capitalcove',
  },
} as const;

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

export const LOAN_PROGRAMS: NavItem[] = [
  { label: 'Fix & Flip', href: '/loans/fix-and-flip' },
  { label: 'Bridge Loans', href: '/loans/bridge' },
  { label: 'Rental / DSCR', href: '/loans/rental' },
  { label: 'New Construction', href: '/loans/new-construction' },
];

export const RESOURCES: NavItem[] = [
  { label: 'Blog', href: '/resources' },
  { label: 'Flip Calculator', href: '/resources/calculator' },
  { label: 'FAQ', href: '/faq' },
];

export const NAV_ITEMS: NavGroup[] = [
  { label: 'Loan Programs', children: LOAN_PROGRAMS },
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'Resources', children: RESOURCES },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

// ---------------------------------------------------------------------------
// Loan Program Detail
// ---------------------------------------------------------------------------

export interface LoanProgramRates {
  interestRate: string;
  originationPoints: string;
  maxLTV: string;
  maxLTVARV?: string;
  loanRange: string;
  termLength: string;
  closingTimeline: string;
  eligiblePropertyTypes: string[];
}

export interface LoanProgramKeyStat {
  label: string;
  value: string;
}

export interface LoanProgramProcessStep {
  title: string;
  description: string;
}

export interface LoanProgramEligibility {
  whatWeLookFor: string[];
  whatWeDontRequire: string[];
}

export interface LoanProgramFAQ {
  question: string;
  answer: string;
}

export interface LoanProgramComparisonRow {
  feature: string;
  dalton: string;
  traditional: string;
}

export interface LoanProgram {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  icon: string;
  rates: LoanProgramRates;
  keyStats: LoanProgramKeyStat[];
  processSteps: LoanProgramProcessStep[];
  eligibility: LoanProgramEligibility;
  faqs: LoanProgramFAQ[];
  comparisonRows: LoanProgramComparisonRow[];
}

export const LOAN_PROGRAMS_DETAIL: LoanProgram[] = [
  // -------------------------------------------------------------------------
  // Fix & Flip
  // -------------------------------------------------------------------------
  {
    id: 'fix-and-flip',
    slug: 'fix-and-flip',
    name: 'Fix & Flip',
    tagline: 'Fast capital to buy, renovate, and sell for profit.',
    description:
      'Our fix & flip loans are designed for real estate investors who buy distressed properties, renovate them, and sell for a profit. We fund based on the deal — not your tax returns — so you can move fast and close before the competition.',
    icon: 'Hammer',
    rates: {
      interestRate: '10 – 12%',
      originationPoints: '1.5 – 3 pts',
      maxLTV: 'Up to 90% LTC',
      maxLTVARV: 'Up to 75% ARV',
      loanRange: '$75K – $2M',
      termLength: '6 – 18 months',
      closingTimeline: 'As fast as 10 days',
      eligiblePropertyTypes: [
        'Single-family residences',
        'Condos & townhouses',
        'Small multifamily (2-4 units)',
        'Mixed-use (case-by-case)',
      ],
    },
    keyStats: [
      { label: 'Close In', value: '10 Days' },
      { label: 'Max Leverage', value: '90% LTC' },
      { label: 'Loan Range', value: '$75K–$2M' },
    ],
    processSteps: [
      {
        title: 'Submit Your Deal',
        description:
          'Share the property address, purchase price, rehab budget, and your estimated ARV. We review and issue a term sheet within 24 hours.',
      },
      {
        title: 'Appraisal & Underwriting',
        description:
          'We order a BPO or full appraisal and verify the numbers. Our underwriting focuses on the asset and your rehab plan, not income docs.',
      },
      {
        title: 'Close & Fund',
        description:
          'Loan documents are prepared and sent to the title company. Funds are wired at closing so you can start your renovation immediately.',
      },
    ],
    eligibility: {
      whatWeLookFor: [
        'Viable rehab plan with realistic ARV',
        'Property in a marketable location',
        'Borrower with at least 1 completed project (preferred but not required)',
        'Skin in the game — some borrower equity in the deal',
        'Clear exit strategy (sale or refinance)',
      ],
      whatWeDontRequire: [
        'W-2s or tax returns',
        'Minimum credit score',
        'Lengthy employment history',
        'Bank statements for income verification',
        'Seasoning on funds for down payment',
      ],
    },
    faqs: [
      {
        question: 'How much rehab budget will you finance?',
        answer:
          'We can finance up to 100% of the rehab budget as part of the total loan, as long as the all-in loan amount stays within 75% of the after-repair value (ARV). Rehab funds are held in escrow and disbursed in draws as work is completed.',
      },
      {
        question: 'How do rehab draws work?',
        answer:
          'Once a phase of work is completed, you request a draw. We send an inspector to verify the work, and funds are typically released within 2-3 business days of passing inspection.',
      },
      {
        question: 'Do I need prior flip experience?',
        answer:
          'While experience is preferred and may help you secure better rates, we do fund first-time flippers. We evaluate each deal individually and can work with newer investors who have a strong plan and adequate reserves.',
      },
      {
        question: 'Can I borrow in an LLC?',
        answer:
          'Yes — in fact, we prefer it. Most of our fix & flip loans are made to LLCs or other business entities. A personal guarantee from the managing member is typically required.',
      },
      {
        question: 'What if my project takes longer than expected?',
        answer:
          'We offer loan extensions on a case-by-case basis, usually in 3 or 6 month increments. Extension fees are outlined in your original term sheet so there are no surprises.',
      },
      {
        question: 'Is there a prepayment penalty?',
        answer:
          'No. Our fix & flip loans have no prepayment penalty. You can sell or refinance at any time without extra fees.',
      },
      {
        question: 'What areas do you cover for fix & flip loans?',
        answer:
          'We lend in most U.S. states. Rural properties and very small markets may have additional requirements. Contact us with your specific deal for confirmation.',
      },
      {
        question: 'How is the interest calculated?',
        answer:
          'Interest is calculated on the outstanding principal balance and payments are interest-only during the loan term. You only pay interest on funds that have been disbursed, including rehab draws.',
      },
    ],
    comparisonRows: [
      { feature: 'Closing Speed', dalton: 'As fast as 10 days', traditional: '45 – 60+ days' },
      { feature: 'Income Docs Required', dalton: 'None', traditional: '2 years of tax returns' },
      { feature: 'Credit Score Minimum', dalton: 'No minimum', traditional: '680+' },
      { feature: 'Rehab Financing', dalton: 'Up to 100% of budget', traditional: 'Rarely offered' },
      { feature: 'Prepayment Penalty', dalton: 'None', traditional: 'Often 1 – 3%' },
      { feature: 'Decision Based On', dalton: 'The deal & the asset', traditional: 'Borrower income & credit' },
    ],
  },

  // -------------------------------------------------------------------------
  // Bridge Loans
  // -------------------------------------------------------------------------
  {
    id: 'bridge',
    slug: 'bridge',
    name: 'Bridge Loans',
    tagline: 'Short-term financing to seize time-sensitive opportunities.',
    description:
      'Bridge loans provide quick, flexible capital when you need to act fast. Whether you are acquiring a new property before selling an existing one, need to close on an auction purchase, or want to stabilize a property before permanent financing, our bridge program has you covered.',
    icon: 'ArrowLeftRight',
    rates: {
      interestRate: '9.5 – 11%',
      originationPoints: '1 – 2.5 pts',
      maxLTV: 'Up to 80% LTV',
      loanRange: '$100K – $3M',
      termLength: '6 – 24 months',
      closingTimeline: 'As fast as 14 days',
      eligiblePropertyTypes: [
        'Single-family residences',
        'Condos & townhouses',
        'Multifamily (2-20 units)',
        'Mixed-use properties',
        'Light commercial',
      ],
    },
    keyStats: [
      { label: 'Close In', value: '14 Days' },
      { label: 'Max Leverage', value: '80% LTV' },
      { label: 'Loan Range', value: '$100K–$3M' },
    ],
    processSteps: [
      {
        title: 'Share Your Scenario',
        description:
          'Tell us about the property, your current situation, and your exit plan. We will structure a bridge solution that fits your timeline.',
      },
      {
        title: 'Quick Underwriting',
        description:
          'We focus on property value and your exit strategy. A BPO or appraisal is ordered and underwriting is completed in days, not weeks.',
      },
      {
        title: 'Close & Execute',
        description:
          'Documents are prepared, funds are wired, and you can execute your investment plan without waiting on bank bureaucracy.',
      },
    ],
    eligibility: {
      whatWeLookFor: [
        'Strong property value supporting the loan amount',
        'Clear and realistic exit strategy',
        'Borrower with real estate investment experience (preferred)',
        'Property in a marketable location',
        'Adequate reserves or demonstrated ability to service the loan',
      ],
      whatWeDontRequire: [
        'Income verification or tax returns',
        'Minimum credit score',
        'Property to be in perfect condition',
        'Lengthy approval committees',
        'Seasoning on source of funds',
      ],
    },
    faqs: [
      {
        question: 'What is a bridge loan used for?',
        answer:
          'Bridge loans cover the gap between transactions. Common uses include acquiring a property before selling another, purchasing at auction where fast closing is required, stabilizing a property before refinancing into long-term debt, and taking advantage of time-sensitive deals.',
      },
      {
        question: 'Can I use a bridge loan on a property I already own?',
        answer:
          'Yes. We offer cash-out bridge loans on properties you already own, up to 70-75% of the current appraised value. This is a great way to pull equity for a new acquisition or project.',
      },
      {
        question: 'What exit strategies do you accept?',
        answer:
          'Common exit strategies include sale of the property, refinance into a conventional or DSCR loan, payoff from the sale of another asset, or a combination. We want to see a realistic, well-thought-out plan.',
      },
      {
        question: 'Are payments interest-only?',
        answer:
          'Yes. All of our bridge loans are interest-only with the principal due at maturity. This keeps your monthly carrying costs low while you execute your plan.',
      },
      {
        question: 'Can I get a bridge loan on a commercial property?',
        answer:
          'Yes. We fund bridge loans on light commercial and mixed-use properties on a case-by-case basis. Maximum LTV may be lower for commercial assets. Contact us with the details of your deal.',
      },
      {
        question: 'What happens if I need more time?',
        answer:
          'We offer extensions, typically in 6-month increments. Extension terms and fees are outlined upfront in your loan agreement so you know exactly what to expect.',
      },
    ],
    comparisonRows: [
      { feature: 'Closing Speed', dalton: 'As fast as 14 days', traditional: '30 – 60+ days' },
      { feature: 'Documentation', dalton: 'Minimal — asset-focused', traditional: 'Full income & employment docs' },
      { feature: 'Flexibility', dalton: 'Custom structures per deal', traditional: 'Rigid underwriting guidelines' },
      { feature: 'Property Condition', dalton: 'As-is value accepted', traditional: 'Must meet condition standards' },
      { feature: 'Prepayment Penalty', dalton: 'None', traditional: 'Varies, often 1 – 5%' },
    ],
  },

  // -------------------------------------------------------------------------
  // Rental / DSCR
  // -------------------------------------------------------------------------
  {
    id: 'rental',
    slug: 'rental',
    name: 'Rental / DSCR',
    tagline: 'Long-term financing based on your property\'s cash flow, not your W-2.',
    description:
      'Our DSCR (Debt Service Coverage Ratio) rental loans allow you to qualify based on the property\'s rental income rather than your personal income. Perfect for investors building a portfolio of cash-flowing rental properties who want a streamlined qualification process without piles of paperwork.',
    icon: 'Home',
    rates: {
      interestRate: '7.5 – 9.5%',
      originationPoints: '0.5 – 2 pts',
      maxLTV: 'Up to 80% LTV',
      loanRange: '$75K – $2M',
      termLength: '30-year (fixed & adjustable)',
      closingTimeline: 'As fast as 21 days',
      eligiblePropertyTypes: [
        'Single-family residences',
        'Condos & townhouses',
        'Multifamily (2-8 units)',
        'Short-term rentals (Airbnb/VRBO)',
        'Warrantable condos',
      ],
    },
    keyStats: [
      { label: 'Term Length', value: '30 Years' },
      { label: 'Max Leverage', value: '80% LTV' },
      { label: 'Loan Range', value: '$75K–$2M' },
    ],
    processSteps: [
      {
        title: 'Property & Rent Analysis',
        description:
          'Share the property details and current or projected rental income. We calculate the DSCR to determine qualification — no personal income docs needed.',
      },
      {
        title: 'Appraisal & Rent Verification',
        description:
          'We order a full appraisal with a rent schedule or use a third-party rent analysis to verify the property supports the loan amount.',
      },
      {
        title: 'Close & Start Collecting',
        description:
          'Loan documents are prepared, the deal closes, and you begin collecting rent with a long-term loan locked in at favorable terms.',
      },
    ],
    eligibility: {
      whatWeLookFor: [
        'Property with a DSCR of 1.0 or higher (rent covers the mortgage payment)',
        'Property in rentable condition or recently renovated',
        'Borrower with at least one rental property (preferred)',
        'Title held in an LLC or individual name',
        'Adequate reserves (typically 6 months of payments)',
      ],
      whatWeDontRequire: [
        'W-2s, pay stubs, or tax returns',
        'Debt-to-income ratio calculations',
        'Employment verification',
        'Minimum number of years self-employed',
        'Complex documentation packages',
      ],
    },
    faqs: [
      {
        question: 'What is a DSCR loan?',
        answer:
          'A DSCR (Debt Service Coverage Ratio) loan qualifies you based on the rental income of the property, not your personal income. If the property\'s rent covers the mortgage payment (DSCR of 1.0 or above), you can qualify regardless of your W-2 or self-employment income.',
      },
      {
        question: 'How is DSCR calculated?',
        answer:
          'DSCR = Monthly Rental Income / Monthly Mortgage Payment (PITIA — principal, interest, taxes, insurance, and association dues). A DSCR of 1.25 means the property earns 25% more than the mortgage payment. We generally require a minimum DSCR of 1.0.',
      },
      {
        question: 'Can I use projected rent for a property I am purchasing?',
        answer:
          'Yes. For purchases, we use a rent schedule from the appraisal or a third-party rent analysis to determine projected rental income. This applies to both long-term and short-term rental strategies.',
      },
      {
        question: 'Do you finance short-term rentals (Airbnb/VRBO)?',
        answer:
          'Yes. We offer DSCR loans on short-term rental properties. Income is typically verified using a third-party STR revenue projection tool (such as AirDNA) or 12 months of actual booking history.',
      },
      {
        question: 'What rate structures are available?',
        answer:
          'We offer 30-year fixed rates, 5/1 ARMs, 7/1 ARMs, and interest-only options. Fixed rates provide payment stability, while ARMs may offer lower initial rates for investors planning to hold for a shorter period.',
      },
      {
        question: 'Is there a prepayment penalty?',
        answer:
          'Most DSCR loan options include a prepayment penalty (typically a 3-year or 5-year stepdown structure). We also offer no-prepayment-penalty options at a slightly higher rate. All terms are clearly disclosed upfront.',
      },
      {
        question: 'Can I do a cash-out refinance?',
        answer:
          'Yes. Cash-out refinances are available up to 75% LTV. This is a popular strategy for investors who want to pull equity from a stabilized rental to fund their next acquisition.',
      },
      {
        question: 'How many rental properties can I finance?',
        answer:
          'There is no limit on the number of properties you can finance with us. Many of our borrowers have 10, 20, or even 50+ properties. Each deal is evaluated individually based on the property\'s DSCR.',
      },
    ],
    comparisonRows: [
      { feature: 'Income Verification', dalton: 'None — DSCR-based', traditional: '2 years tax returns + W-2s' },
      { feature: 'Closing Speed', dalton: 'As fast as 21 days', traditional: '45 – 60+ days' },
      { feature: 'Portfolio Limit', dalton: 'No limit', traditional: 'Often capped at 10 financed properties' },
      { feature: 'LLC Vesting', dalton: 'Close directly in LLC', traditional: 'Usually requires individual name' },
      { feature: 'Cash-Out Available', dalton: 'Up to 75% LTV', traditional: 'Varies, more restrictions' },
      { feature: 'Self-Employed Friendly', dalton: 'Yes — no income docs', traditional: 'Requires 2+ years of returns' },
    ],
  },

  // -------------------------------------------------------------------------
  // New Construction
  // -------------------------------------------------------------------------
  {
    id: 'new-construction',
    slug: 'new-construction',
    name: 'New Construction',
    tagline: 'Ground-up financing for builders and developers.',
    description:
      'Our new construction loans provide the capital you need to build from the ground up. Whether you are building a single spec home or a small subdivision, we offer flexible draw schedules, competitive rates, and a streamlined process designed for experienced builders.',
    icon: 'Building2',
    rates: {
      interestRate: '10 – 13%',
      originationPoints: '2 – 3.5 pts',
      maxLTV: 'Up to 85% LTC',
      maxLTVARV: 'Up to 70% ARV',
      loanRange: '$150K – $3M',
      termLength: '12 – 24 months',
      closingTimeline: '14 – 21 days',
      eligiblePropertyTypes: [
        'Single-family new builds',
        'Townhome developments',
        'Small multifamily (2-4 units)',
        'Spec homes',
        'Infill lots',
      ],
    },
    keyStats: [
      { label: 'Close In', value: '14–21 Days' },
      { label: 'Max Leverage', value: '85% LTC' },
      { label: 'Loan Range', value: '$150K–$3M' },
    ],
    processSteps: [
      {
        title: 'Submit Plans & Budget',
        description:
          'Provide your building plans, construction budget, lot details, and projected sale price or ARV. We review and issue a term sheet quickly.',
      },
      {
        title: 'Appraisal & Feasibility',
        description:
          'We order an as-complete appraisal and review your construction budget for feasibility. Our underwriting focuses on the project economics and your track record.',
      },
      {
        title: 'Close & Build',
        description:
          'Lot acquisition is funded at closing. Construction draws are released on a schedule as you hit milestones — foundation, framing, drywall, and final completion.',
      },
    ],
    eligibility: {
      whatWeLookFor: [
        'Detailed construction budget and building plans',
        'Permits obtained or in process',
        'Builder with at least 2 completed ground-up projects',
        'Lot under contract or already owned',
        'Realistic ARV supported by comparable sales',
      ],
      whatWeDontRequire: [
        'Personal income documentation',
        'Minimum credit score (though it is a factor)',
        'Years of W-2 employment history',
        'Extensive financial statements',
        'Bank approval committees',
      ],
    },
    faqs: [
      {
        question: 'How do construction draws work?',
        answer:
          'Funds are disbursed in stages as construction milestones are completed. A typical draw schedule includes: lot acquisition at closing, then draws at foundation, framing, mechanical/rough-in, drywall, and final completion. An inspector verifies progress before each draw is released.',
      },
      {
        question: 'Do I need to own the lot already?',
        answer:
          'No. We can finance the lot acquisition as part of the construction loan. If you already own the lot, we can use its equity toward your required contribution, potentially reducing your cash out of pocket.',
      },
      {
        question: 'What builder experience do you require?',
        answer:
          'We typically require that the builder (or a member of the project team) has completed at least 2 ground-up construction projects. More experience may help secure better terms and higher leverage.',
      },
      {
        question: 'Can I build multiple properties at once?',
        answer:
          'Yes. We regularly work with builders developing multiple spec homes or small subdivisions simultaneously. Each project is underwritten individually, and we can structure blanket loans for multi-lot projects on a case-by-case basis.',
      },
      {
        question: 'What if construction costs run over budget?',
        answer:
          'We recommend building a 10-15% contingency into your original budget. If overruns occur, we can sometimes adjust the draw schedule. Significant overruns may require additional borrower equity. Communication is key — keep us informed early.',
      },
      {
        question: 'Do you require plans and permits before closing?',
        answer:
          'We require approved building plans for underwriting and appraisal. Permits must be obtained (or demonstrably in process) before construction draws begin. We can close on lot acquisition while permits are being finalized.',
      },
      {
        question: 'What is the typical exit strategy?',
        answer:
          'Most builders sell the completed property (spec home). Alternatively, you can refinance into a DSCR rental loan if you plan to hold the property as a rental. Both are acceptable exit strategies.',
      },
      {
        question: 'Is interest charged on the full loan amount from day one?',
        answer:
          'No. Interest is charged only on the funds that have been disbursed. As draws are released, your interest payment increases accordingly. This keeps your carrying costs lower during the early phases of construction.',
      },
    ],
    comparisonRows: [
      { feature: 'Closing Speed', dalton: '14 – 21 days', traditional: '60 – 90+ days' },
      { feature: 'Draw Process', dalton: 'Fast inspections, 2-3 day draws', traditional: 'Slow inspections, 1-2 week draws' },
      { feature: 'Builder Requirements', dalton: '2+ completed projects', traditional: 'Extensive financial review' },
      { feature: 'Income Documentation', dalton: 'None', traditional: 'Full income & financial statements' },
      { feature: 'Lot Financing', dalton: 'Included in loan', traditional: 'Often separate loan required' },
      { feature: 'Flexibility', dalton: 'Tailored to each project', traditional: 'One-size-fits-all guidelines' },
    ],
  },
];

/** Alias for LOAN_PROGRAMS_DETAIL — preferred name for new code. */
export const LOAN_PROGRAMS_FULL = LOAN_PROGRAMS_DETAIL;

// ---------------------------------------------------------------------------
// Trust Stats (Hero / Trust Strip)
// ---------------------------------------------------------------------------

export interface TrustStat {
  label: string;
  value: string;
}

export const TRUST_STATS: TrustStat[] = [
  { label: 'Loans Funded', value: '$250M+' },
  { label: 'Avg. Close Time', value: '10 Days' },
  { label: 'Repeat Borrowers', value: '85%' },
  { label: 'States Covered', value: '40+' },
];

// ---------------------------------------------------------------------------
// Testimonials
// ---------------------------------------------------------------------------

export interface Testimonial {
  quote: string;
  name: string;
  title: string;
  location: string;
}

// TODO: Replace with real testimonials once collected
export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      'Capital Cove closed my fix & flip loan in 9 days. The process was seamless, and the team was responsive every step of the way. I have already funded three more deals with them.',
    name: 'Marcus R.',
    title: 'Real Estate Investor',
    location: 'Dallas, TX',
  },
  {
    quote:
      'As a self-employed investor, getting a rental loan used to be a nightmare. Capital Cove qualified me based on the property cash flow alone — no tax returns, no hassle. Highly recommend.',
    name: 'Jennifer L.',
    title: 'Portfolio Investor',
    location: 'Phoenix, AZ',
  },
  {
    quote:
      'I needed bridge financing to close on a 6-unit before my existing property sold. Capital Cove structured a deal that worked perfectly and I was able to close on time. Great team.',
    name: 'David K.',
    title: 'Multifamily Investor',
    location: 'Atlanta, GA',
  },
];

// ---------------------------------------------------------------------------
// Process Steps (How It Works)
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
      'Fill out our quick application or give us a call. Share the basics: property address, purchase price, loan amount, and your timeline.',
    timeline: '5 minutes',
  },
  {
    number: 2,
    title: 'Get a Term Sheet',
    description:
      'We review your deal and send you a detailed term sheet outlining rates, fees, and structure. No obligation, no credit pull at this stage.',
    timeline: 'Within 24 hours',
  },
  {
    number: 3,
    title: 'Underwriting & Appraisal',
    description:
      'Once you accept the terms, we order an appraisal and begin underwriting. We focus on the deal, not your tax returns.',
    timeline: '3 – 5 business days',
  },
  {
    number: 4,
    title: 'Approval & Docs',
    description:
      'Loan documents are prepared and sent to the title company. We coordinate with all parties to ensure a smooth closing.',
    timeline: '1 – 2 business days',
  },
  {
    number: 5,
    title: 'Funding',
    description:
      'Funds are wired to the title company and the deal is closed. You get the capital you need to execute your investment strategy.',
    timeline: 'Same day as doc signing',
  },
];

// ---------------------------------------------------------------------------
// FAQ Categories (Global FAQ Page)
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
    category: 'General',
    questions: [
      {
        question: 'What is a private or hard money loan?',
        answer:
          "A private or hard money loan is a short-term loan secured by real estate. Unlike conventional bank loans, private loans are funded by private investors or companies and focus primarily on the value of the property rather than the borrower's credit score or income documentation.",
      },
      {
        question: 'How is Capital Cove different from a bank?',
        answer:
          "Banks rely on extensive documentation, credit scores, and lengthy approval processes. We focus on the deal itself — the property value, your plan, and your experience. This allows us to move faster and fund deals that banks typically won't touch.",
      },
      {
        question: 'What states do you lend in?',
        answer:
          "We currently lend in over 40 U.S. states. Contact us with your specific deal and we'll confirm availability in your area.",
      },
      {
        question: 'Who are your typical borrowers?',
        answer:
          'Our borrowers include fix & flip investors, rental property owners, small developers, builders, and real estate entrepreneurs. We work with both first-time investors and seasoned professionals with large portfolios.',
      },
    ],
  },
  {
    category: 'Loan Terms & Pricing',
    questions: [
      {
        question: 'What are your interest rates?',
        answer:
          'Our rates typically range from 7.5% to 13% depending on the loan type, LTV, borrower experience, and property location. DSCR rental loans start at 7.5%, while construction loans may go up to 13%. We provide exact pricing in your term sheet within 24 hours of application.',
      },
      {
        question: 'What loan-to-value (LTV) do you offer?',
        answer:
          'We offer up to 90% of the purchase price (LTC) and up to 75% of the after-repair value (ARV) for fix & flip loans. Bridge loans go up to 80% LTV. DSCR rental loans are available up to 80% LTV. New construction loans go up to 85% LTC / 70% ARV. Each deal is evaluated individually.',
      },
      {
        question: 'Do you charge prepayment penalties?',
        answer:
          'Most of our short-term bridge and fix & flip loans have no prepayment penalty. DSCR rental loans typically have a prepayment penalty structure (3- or 5-year stepdown), with no-penalty options available at a slightly higher rate. All terms are clearly outlined in your term sheet.',
      },
      {
        question: 'What fees should I expect?',
        answer:
          'Typical fees include origination points (1-3.5% depending on loan type), appraisal/BPO fee, title and escrow fees, and processing/doc prep fees. We provide a full fee breakdown in your term sheet before you commit to anything.',
      },
    ],
  },
  {
    category: 'Process & Timeline',
    questions: [
      {
        question: 'How fast can you close?',
        answer:
          'We can close in as few as 7-10 business days for straightforward fix & flip and bridge deals. DSCR rental loans typically close in 21 days. New construction loans close in 14-21 days. Our average closing time is about 10 business days from accepted term sheet.',
      },
      {
        question: 'What documents do I need to apply?',
        answer:
          "To get started, we just need the property address, purchase price, your requested loan amount, and basic contact info. For full underwriting, we'll need a purchase contract, entity documents (if applicable), insurance binder, and a brief experience resume.",
      },
      {
        question: 'What is the appraisal process?',
        answer:
          'Depending on the loan type and amount, we may order a desktop BPO, a drive-by appraisal, or a full interior appraisal. For fix & flip and construction loans, we order an as-complete appraisal based on your renovation plans or building specs.',
      },
    ],
  },
  {
    category: 'Requirements & Eligibility',
    questions: [
      {
        question: 'Do you require a personal guarantee?',
        answer:
          'Yes, most of our loans require a personal guarantee from the borrower or managing member of the entity. This is standard practice in the private lending industry.',
      },
      {
        question: 'Will you check my credit?',
        answer:
          'We do a soft credit pull during underwriting, which does not affect your credit score. We do not have a hard minimum credit score, but your credit history is one factor we consider alongside the deal itself.',
      },
      {
        question: 'Can I borrow as a foreign national?',
        answer:
          'Yes, we lend to foreign nationals on a case-by-case basis. Additional documentation and a slightly higher down payment may be required. The property must be located in the U.S.',
      },
      {
        question: 'Do I need to have real estate experience?',
        answer:
          'Experience is preferred and can help you qualify for better terms. However, we work with first-time investors on certain programs, especially if you have a strong deal and adequate reserves. New construction loans generally require at least 2 completed projects.',
      },
    ],
  },
  {
    category: 'After Closing',
    questions: [
      {
        question: 'How do I make payments?',
        answer:
          'Payments are made via ACH auto-debit from your bank account on a monthly basis. You will receive a welcome package after closing with your payment schedule and servicing details.',
      },
      {
        question: 'Can I refinance my loan with Capital Cove?',
        answer:
          'Absolutely. Many of our borrowers refinance from a short-term bridge or fix & flip loan into a long-term DSCR rental loan once the property is stabilized. We make the transition seamless.',
      },
      {
        question: 'What happens if I need to extend my loan?',
        answer:
          'We offer extensions on short-term loans, typically in 3- or 6-month increments. Extension fees and terms are outlined in your original loan agreement. Contact our servicing team well before your maturity date to discuss options.',
      },
    ],
  },
];

// ---------------------------------------------------------------------------
// Experience Segments (Loan Overview Page)
// ---------------------------------------------------------------------------

export interface ExperienceSegment {
  label: string;
  description: string;
  recommended: string[];
}

export const EXPERIENCE_SEGMENTS: ExperienceSegment[] = [
  {
    label: 'First-Time Investor',
    description:
      'New to real estate investing? We offer programs for first-time investors with strong deals and realistic plans. Our team will guide you through the process step by step.',
    recommended: ['Fix & Flip', 'Bridge Loans', 'Rental / DSCR'],
  },
  {
    label: 'Experienced Investor',
    description:
      'You have a few deals under your belt and understand the process. Leverage your track record for better rates, higher leverage, and faster closings across all of our programs.',
    recommended: ['Fix & Flip', 'Bridge Loans', 'Rental / DSCR', 'New Construction'],
  },
  {
    label: 'Professional Builder / Developer',
    description:
      'You are building at scale. Our construction and bridge programs are designed for professionals who need reliable capital, fast draw processes, and a lender who understands development timelines.',
    recommended: ['New Construction', 'Bridge Loans'],
  },
];

// ---------------------------------------------------------------------------
// US States
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
