import type { Metadata } from 'next';
import { Hero } from '@/components/home/Hero';
import { TrustBar } from '@/components/home/TrustBar';
import { LoanProgramCards } from '@/components/home/LoanProgramCards';
import { HowItWorksPreview } from '@/components/home/HowItWorksPreview';
import { TestimonialCarousel } from '@/components/home/TestimonialCarousel';
import { CTABanner } from '@/components/home/CTABanner';
import QuickQuoteForm from '@/components/forms/QuickQuoteForm';

export const metadata: Metadata = {
  title: 'Capital Cove | Private Real Estate Loans - Fast Funding for Investors',
  description:
    'Capital Cove provides fast, flexible private real estate loans for investors. Bridge loans, fix & flip, DSCR rentals, and commercial financing with closings in as few as 10 days.',
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />

      {/* Quick Quote Form Section */}
      <section className="bg-warm-gray py-(--spacing-section)">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-section font-bold text-gray-900">
              Get a Rate Quote in 60 Seconds
            </h2>
            <p className="text-body-lg text-gray-600 mt-4">
              No credit check required
            </p>
          </div>
          <div className="bg-white rounded-card shadow-card p-6 sm:p-8">
            <QuickQuoteForm />
          </div>
        </div>
      </section>

      <LoanProgramCards />
      <HowItWorksPreview />
      <TestimonialCarousel />
      <CTABanner />
    </>
  );
}
