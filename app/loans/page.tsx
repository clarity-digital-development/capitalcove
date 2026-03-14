import type { Metadata } from 'next';
import Link from 'next/link';
import { Hammer, ArrowRightLeft, Home, Building2, User, TrendingUp, Zap } from 'lucide-react';
import { LOAN_PROGRAMS_FULL } from '@/lib/constants';
import { CTABanner } from '@/components/home/CTABanner';

export const metadata: Metadata = {
  title: 'Loan Programs Built for Real Estate Investors | Capital Cove',
  description:
    'Explore our private lending programs: Fix & Flip, Bridge Loans, Rental DSCR, and New Construction. Fast closings, flexible terms, and no income documentation required.',
};

const iconMap: Record<string, React.ReactNode> = {
  Hammer: <Hammer className="w-8 h-8 text-teal" />,
  ArrowRightLeft: <ArrowRightLeft className="w-8 h-8 text-teal" />,
  Home: <Home className="w-8 h-8 text-teal" />,
  Building2: <Building2 className="w-8 h-8 text-teal" />,
};

const experienceSegments = [
  {
    icon: <User className="w-8 h-8 text-teal" />,
    title: 'New Investors',
    deals: '0–4 deals',
    description:
      'Start with our Fix & Flip or Bridge programs. We work with first-time investors who have a solid plan and realistic budget.',
    recommended: ['Fix & Flip', 'Bridge Loans'],
  },
  {
    icon: <TrendingUp className="w-8 h-8 text-teal" />,
    title: 'Experienced Investors',
    deals: '5–20 deals',
    description:
      'Scale your portfolio with competitive rates, faster closings, and streamlined underwriting for repeat borrowers.',
    recommended: ['Rental (DSCR)', 'Bridge Loans'],
  },
  {
    icon: <Zap className="w-8 h-8 text-teal" />,
    title: 'High-Volume Investors',
    deals: '20+ deals',
    description:
      'Access portfolio-level pricing, dedicated account management, and custom loan structures for your pipeline.',
    recommended: ['New Construction', 'Rental (DSCR)'],
  },
];

export default function LoanProgramsPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-hero text-white">
            Loan Programs Built for Real Estate Investors
          </h1>
          <p className="text-body-lg text-white/90 mt-4 max-w-3xl mx-auto">
            Whether you are flipping your first house or building a rental empire,
            we have a lending solution designed for your strategy.
          </p>
        </div>
      </section>

      {/* Program Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {LOAN_PROGRAMS_FULL.map((program) => (
              <Link
                key={program.slug}
                href={`/loans/${program.slug}`}
                className="bg-white rounded-card shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200 p-6 flex flex-col border border-gray-100"
              >
                <div className="mb-4">{iconMap[program.icon]}</div>
                <h3 className="font-semibold text-lg text-gray-900">
                  {program.name}
                </h3>
                <p className="text-sm text-gray-600 mt-2 flex-1">
                  {program.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {program.keyStats.map((stat) => (
                    <span
                      key={stat.label}
                      className="text-xs bg-warm-gray text-gray-700 rounded-full px-3 py-1"
                    >
                      {stat.value}
                    </span>
                  ))}
                </div>

                <span className="text-sm font-semibold text-teal mt-4 inline-flex items-center gap-1">
                  View Program <span aria-hidden="true">&rarr;</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Segmentation */}
      <section className="bg-warm-gray py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-section font-bold text-gray-900">
              Not Sure Which Program Fits?
            </h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              We work with investors at every stage. Find the right program based
              on your experience level.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {experienceSegments.map((segment) => (
              <div
                key={segment.title}
                className="bg-white rounded-card shadow-card p-8"
              >
                <div className="mb-4">{segment.icon}</div>
                <h3 className="font-semibold text-lg text-gray-900">
                  {segment.title}
                </h3>
                <p className="text-sm text-teal font-medium mt-1">
                  {segment.deals}
                </p>
                <p className="text-sm text-gray-600 mt-3 leading-relaxed">
                  {segment.description}
                </p>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                    Recommended
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {segment.recommended.map((name) => (
                      <span
                        key={name}
                        className="text-xs bg-teal/10 text-teal font-medium rounded-full px-3 py-1"
                      >
                        {name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
