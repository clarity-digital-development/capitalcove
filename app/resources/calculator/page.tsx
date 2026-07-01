import type { Metadata } from 'next';
import FlipProfitCalculator from '@/components/calculator/FlipProfitCalculator';
import { SITE_CONFIG } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Fix and Flip Profit Calculator | The Capital Cove',
  description:
    'Free flip profit calculator. Estimate your ROI, cash needed, and projected profit on your next deal.',
};

const webAppJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Fix and Flip Profit Calculator',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  description:
    'Estimate projected profit, ROI, and cash needed for a fix and flip deal.',
  url: `${SITE_CONFIG.url}/resources/calculator`,
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  provider: {
    '@type': 'Organization',
    name: SITE_CONFIG.legalString,
    url: SITE_CONFIG.url,
  },
};

export default function CalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }}
      />

      {/* Hero */}
      <section className="bg-navy py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-hero text-white">
            Fix and Flip Profit Calculator
          </h1>
          <p className="text-body-lg text-white/80 mt-4 max-w-2xl mx-auto">
            Run the numbers on your next deal in seconds.
          </p>
        </div>
      </section>

      <section className="py-(--spacing-section) bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <FlipProfitCalculator />
        </div>
      </section>
    </>
  );
}
