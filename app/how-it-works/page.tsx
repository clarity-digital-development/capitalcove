import type { Metadata } from 'next';
import { UserCircle, Hammer, Banknote } from 'lucide-react';
import { CTABanner } from '@/components/home/CTABanner';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { Timeline } from '@/components/how-it-works/Timeline';
import { DIFFERENTIATORS } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'How It Works | The Capital Cove',
  description:
    'From application to funding in as few as 5 days. See our simple process for getting your deal funded.',
};

const differentiatorIcons = [UserCircle, Hammer, Banknote];

export default function HowItWorksPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-hero text-white">
            From Application to Funding in 5 Days
          </h1>
          <p className="text-body-lg text-white/80 mt-6 max-w-2xl mx-auto">
            No bank bureaucracy. No committees. One human on the phone, one clear process.
          </p>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-(--spacing-section) bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Our 5-Step Process"
            subtitle="From first call to funded deal, we keep it simple."
            centered
          />

          <Timeline />
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className="py-(--spacing-section) bg-warm-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="What Makes Us Different"
            subtitle="Private lending should be simple. We make sure it is."
            centered
          />
          <div className="mt-12 grid md:grid-cols-3 gap-8">
            {DIFFERENTIATORS.map((item, idx) => {
              const Icon = differentiatorIcons[idx] ?? UserCircle;
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
