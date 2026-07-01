import type { Metadata } from 'next';
import Image from 'next/image';
import { Zap, Eye, Users } from 'lucide-react';
import { CTABanner } from '@/components/home/CTABanner';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { ABOUT_STATS, VALUES, SITE_CONFIG } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'About | The Capital Cove',
  description:
    'Founded by an active investor with $6M+ in real estate transactions. Fast closings, transparent terms, investor-first lending.',
};

const valueIcons = {
  'Speed Over Red Tape': Zap,
  'Transparency First': Eye,
  'Investor to Investor': Users,
} as const;

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-hero text-white">
            Built by an Investor Who Gets It
          </h1>
          <p className="text-body-lg text-white/80 mt-6 max-w-2xl mx-auto">
            $6M+ in real estate transactions. Now helping investors fund their next deal.
          </p>
        </div>
      </section>

      {/* Founder Story */}
      <section className="py-(--spacing-section) bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Headshot */}
            <div className="relative aspect-[3/4] max-w-md mx-auto lg:mx-0 rounded-card overflow-hidden bg-warm-gray shadow-card-hover">
              <Image
                src="/images/dalton-headshot.png"
                alt="Dalton Guinn, founder of The Capital Cove"
                fill
                sizes="(max-width: 1024px) 100vw, 448px"
                className="object-cover object-top"
                priority
              />
            </div>

            {/* Narrative — first-person Dalton */}
            <div>
              <SectionHeading
                badge="MY STORY"
                title="I’m Dalton. I’ve done the deals."
              />
              <blockquote className="mt-6 border-l-4 border-gold pl-5 italic text-lg text-navy-dark font-medium">
                &ldquo;{SITE_CONFIG.tagline}&rdquo;
              </blockquote>
              <div className="mt-6 space-y-4 text-gray-700 leading-relaxed">
                <p>
                  I’m an active real estate investor first and a lender second. I own
                  $2.5M in rental properties that generate $2K a month in positive
                  cash flow, and I’ve completed $3.5M+ in flips — my largest single
                  project netted $200K.
                </p>
                <p>
                  Along the way, I kept running into the same problem: lenders who
                  didn’t understand the deals they were funding. Slow communication,
                  rigid underwriting, hidden fees, and a lot of wasted time. A lot
                  of them just see it as a paycheck.
                </p>
                <p>
                  I started The Capital Cove to be the lender I wished I had when I
                  was starting out. Fast decisions, transparent terms, and a real
                  human on the phone — me. I don’t need the money. I want to help
                  other investors win.
                </p>
                <p>
                  Today I fund fix &amp; flip deals across 47 states out of
                  Jacksonville, Florida. Both of my first two funded deals were for
                  first-time investors, and I’m proud of that. If your deal makes
                  sense, I can fund it.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-navy-dark py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {ABOUT_STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-gold">
                  {stat.value}
                </p>
                <p className="text-sm text-white/70 mt-1 leading-tight">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-(--spacing-section) bg-warm-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="How We Work"
            subtitle="The principles that guide every deal we fund."
            centered
          />
          <div className="mt-12 grid md:grid-cols-3 gap-8">
            {VALUES.map((value) => {
              const Icon = valueIcons[value.title as keyof typeof valueIcons] ?? Zap;
              return (
                <div
                  key={value.title}
                  className="bg-white rounded-card p-8 shadow-card text-center"
                >
                  <div className="mx-auto w-14 h-14 rounded-full bg-teal/10 flex items-center justify-center">
                    <Icon className="w-7 h-7 text-teal" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mt-5">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 mt-2">{value.description}</p>
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
