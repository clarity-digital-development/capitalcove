import type { LoanProgram } from '@/lib/constants';
import { LoanHero } from './LoanHero';
import { RateTermsTable } from './RateTermsTable';
import { LoanProcessSteps } from './LoanProcessSteps';
import { EligibilityChecklist } from './EligibilityChecklist';
import { ComparisonChart } from './ComparisonChart';
import { LoanFAQ } from './LoanFAQ';
import { CTABanner } from '@/components/home/CTABanner';

interface LoanProgramLayoutProps {
  program: LoanProgram;
}

export function LoanProgramLayout({ program }: LoanProgramLayoutProps) {
  return (
    <>
      <LoanHero
        name={program.name}
        tagline={program.tagline}
        slug={program.slug}
        keyStats={program.keyStats}
      />

      {/* Rates & Terms */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-section font-bold text-gray-900 mb-8">
            Rates & Terms
          </h2>
          <RateTermsTable rates={program.rates} eligiblePropertyTypes={program.rates.eligiblePropertyTypes} />
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-warm-gray py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-section font-bold text-gray-900 mb-12 text-center">
            How It Works
          </h2>
          <LoanProcessSteps steps={program.processSteps} />
        </div>
      </section>

      {/* Eligibility */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-section font-bold text-gray-900 mb-8 text-center">
            Eligibility
          </h2>
          <EligibilityChecklist
            whatWeLookFor={program.eligibility.whatWeLookFor}
            whatWeDontRequire={program.eligibility.whatWeDontRequire}
          />
        </div>
      </section>

      {/* Comparison */}
      <section className="bg-warm-gray py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-section font-bold text-gray-900 mb-8 text-center">
            Capital Cove vs. Traditional Banks
          </h2>
          <ComparisonChart rows={program.comparisonRows} />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-section font-bold text-gray-900 mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <LoanFAQ faqs={program.faqs} />
        </div>
      </section>

      <CTABanner
        headline={`Ready to Get Started with a ${program.name} Loan?`}
        subheadline="Submit your deal and get a term sheet within 24 hours."
        ctaText="Apply Now"
        ctaHref={`/apply?type=${program.slug}`}
      />
    </>
  );
}
