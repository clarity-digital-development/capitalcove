import type { Metadata } from 'next';
import { Zap, Eye, Users } from 'lucide-react';
import { CTABanner } from '@/components/home/CTABanner';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { SITE_CONFIG } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'About Capital Cove | Private Lender for Real Estate Investors',
  description:
    'Capital Cove was built by a real estate investor who understood the frustration of slow, rigid financing. Learn our story and why investors trust us.',
};

const values = [
  {
    icon: Zap,
    title: 'Speed Over Red Tape',
    description:
      'We eliminated the bureaucracy that slows traditional lending. Our process is designed to get you from application to closing in days, not months.',
  },
  {
    icon: Eye,
    title: 'Transparent Terms',
    description:
      'No hidden fees, no last-minute surprises. Every cost is laid out in your term sheet upfront so you can underwrite your deal with confidence.',
  },
  {
    icon: Users,
    title: 'Investor-First Approach',
    description:
      'We evaluate deals the way you do — by the numbers. Your experience and the property matter more to us than a credit score.',
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-hero text-white">
            Built by an Investor, for Investors
          </h1>
          <p className="text-body-lg text-white/80 mt-6 max-w-2xl mx-auto">
            We started {SITE_CONFIG.name} because we lived the problem firsthand.
          </p>
        </div>
      </section>

      {/* Founder Story */}
      <section className="py-section bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Headshot placeholder */}
            <div className="aspect-[3/4] max-w-md mx-auto lg:mx-0 bg-gray-200 rounded-card flex items-center justify-center">
              <span className="text-gray-600 text-lg font-medium">Photo</span>
            </div>

            {/* Narrative */}
            <div>
              <SectionHeading
                badge="Our Story"
                title="From Investor to Lender"
              />
              <div className="mt-6 space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Before founding {SITE_CONFIG.name}, our team spent years as
                  active real estate investors — flipping houses, building rental
                  portfolios, and navigating the frustrating world of traditional
                  lending.
                </p>
                <p>
                  We experienced firsthand what it feels like to lose a deal
                  because a bank needed six more weeks of paperwork. We know the
                  pain of hidden fees buried in fine print and underwriters who
                  have never evaluated an investment property.
                </p>
                <p>
                  That experience led us to build {SITE_CONFIG.name} — a lending
                  company that operates the way we always wished our lenders
                  would. Fast decisions, transparent terms, and a team that
                  actually understands your deals.
                </p>
                <p>
                  Today, we&apos;ve funded hundreds of deals for investors across
                  the country. Whether it&apos;s your first flip or your
                  fiftieth, we bring the same speed and attention to every
                  transaction.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-section bg-warm-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Our Values"
            subtitle="The principles that guide every deal we fund."
            centered
          />
          <div className="mt-12 grid md:grid-cols-3 gap-8">
            {values.map((value) => {
              const Icon = value.icon;
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

      {/* Trust & Credentials */}
      <section className="py-section bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SectionHeading
            title="Trust & Credentials"
            subtitle="Licensed, compliant, and committed to industry best practices."
            centered
          />
          <div className="mt-10 flex flex-wrap justify-center gap-8">
            <div className="bg-warm-gray rounded-card px-8 py-6 text-center">
              <p className="text-sm text-gray-600 uppercase tracking-wide font-medium">
                NMLS Registered
              </p>
              <p className="text-lg font-bold text-navy mt-1">
                {SITE_CONFIG.nmls}
              </p>
            </div>
            <div className="bg-warm-gray rounded-card px-8 py-6 text-center">
              <p className="text-sm text-gray-600 uppercase tracking-wide font-medium">
                State Licensed
              </p>
              <p className="text-lg font-bold text-navy mt-1">
                California DRE
              </p>
            </div>
            <div className="bg-warm-gray rounded-card px-8 py-6 text-center">
              <p className="text-sm text-gray-600 uppercase tracking-wide font-medium">
                Member
              </p>
              <p className="text-lg font-bold text-navy mt-1">
                AAPL (American Association of Private Lenders)
              </p>
            </div>
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
