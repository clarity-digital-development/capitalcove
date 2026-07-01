import type { Metadata } from 'next';
import { LoanHero } from '@/components/loans/LoanHero';
import { RateTermsTable } from '@/components/loans/RateTermsTable';
import { EligibilityChecklist } from '@/components/loans/EligibilityChecklist';
import { LoanProcessSteps } from '@/components/loans/LoanProcessSteps';
import { ComparisonChart } from '@/components/loans/ComparisonChart';
import { LoanFAQ } from '@/components/loans/LoanFAQ';
import { OtherProgramsTeaser } from '@/components/home/OtherProgramsTeaser';
import { CTABanner } from '@/components/home/CTABanner';
import {
  FIX_AND_FLIP_RATE_TERMS,
  FIX_AND_FLIP_ELIGIBILITY,
  FIX_AND_FLIP_PROCESS_STEPS,
  FIX_AND_FLIP_COMPARISON,
  FIX_AND_FLIP_FAQ,
  FIX_AND_FLIP_HERO_PILLS,
} from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Fix and Flip Loans | The Capital Cove',
  description:
    'Fix & flip funding from 9%. Up to 75% ARV, 100% rehab financing, close in 5 days. No experience required. 47 states.',
};

export default function FixAndFlipPage() {
  return (
    <>
      <LoanHero
        name="Fix & Flip Loans"
        tagline="Fast funding for your next flip. Close in as few as 5 days."
        applyHref="/apply?type=fix-and-flip"
        applyLabel="Apply for Fix & Flip Funding"
        pills={FIX_AND_FLIP_HERO_PILLS}
      />

      {/* Rates & Terms */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-section font-bold text-gray-900 mb-8">
            Rates & Terms
          </h2>
          <RateTermsTable rows={FIX_AND_FLIP_RATE_TERMS} />
        </div>
      </section>

      {/* Eligibility */}
      <section className="bg-warm-gray py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-section font-bold text-gray-900 mb-8 text-center">
            Eligibility
          </h2>
          <EligibilityChecklist
            whatWeLookFor={[...FIX_AND_FLIP_ELIGIBILITY.whatWeLookFor]}
            whatWeDontRequire={[...FIX_AND_FLIP_ELIGIBILITY.whatWeDontRequire]}
          />
        </div>
      </section>

      {/* How Fix & Flip Loans Work */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-section font-bold text-gray-900 mb-12 text-center">
            How Fix & Flip Loans Work
          </h2>
          <LoanProcessSteps steps={FIX_AND_FLIP_PROCESS_STEPS} />
        </div>
      </section>

      {/* Comparison */}
      <section className="bg-warm-gray py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-section font-bold text-gray-900 mb-8 text-center">
            The Capital Cove vs. Traditional Banks
          </h2>
          <ComparisonChart rows={FIX_AND_FLIP_COMPARISON} />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-section font-bold text-gray-900 mb-8 text-center">
            Fix & Flip FAQ
          </h2>
          <LoanFAQ faqs={FIX_AND_FLIP_FAQ} />
        </div>
      </section>

      {/* Other Programs */}
      <OtherProgramsTeaser
        headline="Other Programs We Offer"
        subheadline="Bridge, rental, and new construction financing available through our lending network."
        background="white"
      />

      <CTABanner
        headline="Ready to Submit Your Flip?"
        subheadline="Send us the deal — scope of work, purchase price, and ARV. Dalton reviews every application personally."
        ctaText="Apply for Fix & Flip Funding"
        ctaHref="/apply?type=fix-and-flip"
      />
    </>
  );
}
