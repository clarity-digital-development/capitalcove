import type { Metadata } from 'next';
import { Clock, Shield, TrendingUp } from 'lucide-react';
import { CTABanner } from '@/components/home/CTABanner';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { PROCESS_STEPS } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'How Private Lending Works',
  description:
    'Learn how Capital Cove funds real estate deals in days, not months. From application to funding, our streamlined process keeps your investment on track.',
};

const differentiators = [
  {
    icon: Clock,
    title: 'Speed',
    description:
      'Close in as few as 7-10 days. We move fast so you never lose a deal to slow financing.',
  },
  {
    icon: Shield,
    title: 'Transparency',
    description:
      'No hidden fees, no surprises. Your term sheet lays out every cost before you commit.',
  },
  {
    icon: TrendingUp,
    title: 'Investor Focus',
    description:
      'Built by an investor, for investors. We understand your deals because we\'ve done them ourselves.',
  },
];

export default function HowItWorksPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-hero text-white">
            From Application to Funding in Days, Not Months
          </h1>
          <p className="text-body-lg text-white/80 mt-6 max-w-2xl mx-auto">
            Our streamlined process is designed for speed without sacrificing
            reliability. Here&apos;s exactly what to expect.
          </p>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-section bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Our 5-Step Process"
            subtitle="From first call to funded deal, we keep it simple."
            centered
          />

          <div className="mt-16 relative">
            {/* Desktop center line */}
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 -translate-x-1/2" />

            {/* Mobile left line */}
            <div className="lg:hidden absolute left-6 top-0 bottom-0 border-l-2 border-gray-200" />

            <div className="space-y-12 lg:space-y-16">
              {PROCESS_STEPS.map((step, idx) => {
                const isLeft = idx % 2 === 0;
                return (
                  <div key={step.number} className="relative">
                    {/* Desktop layout */}
                    <div className="hidden lg:grid lg:grid-cols-2 lg:gap-12 items-center">
                      {isLeft ? (
                        <>
                          <div className="text-right pr-12">
                            <h3 className="text-xl font-bold text-gray-900">
                              {step.title}
                            </h3>
                            <p className="text-gray-600 mt-2">
                              {step.description}
                            </p>
                            <span className="inline-block mt-3 px-3 py-1 bg-teal/10 text-teal text-sm font-medium rounded-full">
                              {step.timeline}
                            </span>
                          </div>
                          <div className="pl-12" />
                        </>
                      ) : (
                        <>
                          <div className="pr-12" />
                          <div className="pl-12">
                            <h3 className="text-xl font-bold text-gray-900">
                              {step.title}
                            </h3>
                            <p className="text-gray-600 mt-2">
                              {step.description}
                            </p>
                            <span className="inline-block mt-3 px-3 py-1 bg-teal/10 text-teal text-sm font-medium rounded-full">
                              {step.timeline}
                            </span>
                          </div>
                        </>
                      )}
                    </div>

                    {/* Desktop center badge */}
                    <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-teal text-white items-center justify-center font-bold text-lg shadow-md z-10">
                      {step.number}
                    </div>

                    {/* Mobile layout */}
                    <div className="lg:hidden flex items-start gap-6">
                      <div className="relative z-10 flex-shrink-0 w-12 h-12 rounded-full bg-teal text-white flex items-center justify-center font-bold text-lg shadow-md">
                        {step.number}
                      </div>
                      <div className="pt-1">
                        <h3 className="text-lg font-bold text-gray-900">
                          {step.title}
                        </h3>
                        <p className="text-gray-600 mt-1 text-sm">
                          {step.description}
                        </p>
                        <span className="inline-block mt-2 px-3 py-1 bg-teal/10 text-teal text-xs font-medium rounded-full">
                          {step.timeline}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className="py-section bg-warm-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="What Makes Us Different"
            subtitle="Private lending should be simple. We make sure it is."
            centered
          />
          <div className="mt-12 grid md:grid-cols-3 gap-8">
            {differentiators.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="bg-white rounded-card p-8 shadow-card text-center"
                >
                  <div className="mx-auto w-14 h-14 rounded-full bg-teal/10 flex items-center justify-center">
                    <Icon className="w-7 h-7 text-teal" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mt-5">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 mt-2">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
