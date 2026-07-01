import type { Metadata } from 'next';
import { Hero } from '@/components/home/Hero';
import { TrustBar } from '@/components/home/TrustBar';
import { HowItWorksPreview } from '@/components/home/HowItWorksPreview';
import { FundedDeals } from '@/components/home/FundedDeals';
import { OtherProgramsTeaser } from '@/components/home/OtherProgramsTeaser';
import { CTABanner } from '@/components/home/CTABanner';
import QuickQuoteFlow from '@/components/forms/QuickQuoteFlow';

export const metadata: Metadata = {
  title: 'The Capital Cove | Fix & Flip Loans — Close in 5 Days',
  description:
    'Fix & flip funding from 9%. Up to 75% ARV, 100% rehab financing, close in as few as 5 days. No income verification. 47 states.',
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />

      {/* Quick Quote Form Section */}
      <section id="quick-quote" className="bg-warm-gray py-(--spacing-section)">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-section font-bold text-gray-900">
              Get a Rate Quote in 60 Seconds
            </h2>
            <p className="text-body-lg text-gray-600 mt-4">
              No credit check required. No obligation.
            </p>
          </div>
          <div className="bg-white rounded-card shadow-card p-6 sm:p-8">
            <QuickQuoteFlow />
          </div>
        </div>
      </section>

      <HowItWorksPreview />
      <FundedDeals />
      <OtherProgramsTeaser />
      <CTABanner />
    </>
  );
}
