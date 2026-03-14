import Image from 'next/image';
import { CTAButton } from '@/components/shared/CTAButton';
import { CheckCircle } from 'lucide-react';

const trustMetrics = [
  'Same-Day Term Sheets',
  'Up to 90% LTV',
  'Loans from $75K\u2013$2M+',
];

export function Hero() {
  return (
    <section className="bg-warm-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-12">
          {/* Content - 55% */}
          <div className="w-full lg:w-[55%]">
            <h1 className="font-display text-hero text-navy-dark">
              Fast, Flexible Funding for Real Estate Investors
            </h1>
            <p className="text-body-lg text-gray-600 mt-6 max-w-xl">
              Close your next deal in as few as 10 business days. Fix &amp; flip,
              bridge, and rental loans built for investors who move fast.
            </p>

            <div className="flex flex-wrap gap-4 mt-8">
              <CTAButton href="/apply" variant="primary" size="lg">
                Get Your Rate
              </CTAButton>
              <CTAButton href="/loans" variant="ghost" size="lg">
                See Loan Programs
              </CTAButton>
            </div>

            {/* Trust metric strip */}
            <div className="flex flex-wrap gap-x-6 gap-y-2 mt-8">
              {trustMetrics.map((metric) => (
                <span
                  key={metric}
                  className="inline-flex items-center gap-2 text-sm text-gray-600"
                >
                  <CheckCircle className="w-4 h-4 text-teal flex-shrink-0" />
                  {metric}
                </span>
              ))}
            </div>
          </div>

          {/* Hero image - 45% */}
          <div className="w-full lg:w-[45%]">
            <div className="rounded-card overflow-hidden shadow-card-hover">
              <Image
                src="/images/hero.jpg"
                alt="Capital Cove - Real Estate Funding for Investors"
                width={600}
                height={800}
                className="w-full h-auto object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
