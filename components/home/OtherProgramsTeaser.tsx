import Link from 'next/link';
import { ArrowLeftRight, Home, Building2, ArrowRight } from 'lucide-react';

interface OtherProgramsTeaserProps {
  /** Override the headline copy based on context (home page vs. end of F&F page). */
  headline?: string;
  subheadline?: string;
  /** Dark background variant for use on warm-gray surfaces. */
  background?: 'white' | 'warm-gray';
}

const programs = [
  {
    name: 'Bridge Loans',
    slug: 'bridge',
    description: 'Short-term capital to seize time-sensitive opportunities.',
    icon: ArrowLeftRight,
  },
  {
    name: 'Rental / DSCR',
    slug: 'rental',
    description: 'Long-term financing based on property cash flow.',
    icon: Home,
  },
  {
    name: 'New Construction',
    slug: 'new-construction',
    description: 'Ground-up financing for builders and developers.',
    icon: Building2,
  },
];

export function OtherProgramsTeaser({
  headline = 'Beyond Fix & Flip',
  subheadline = 'We also offer bridge, rental, and new construction financing through our lending network.',
  background = 'warm-gray',
}: OtherProgramsTeaserProps) {
  return (
    <section
      className={`${background === 'warm-gray' ? 'bg-warm-gray' : 'bg-white'} py-(--spacing-section)`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-section font-bold text-gray-900">{headline}</h2>
          <p className="text-body-lg text-gray-600 mt-4">{subheadline}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {programs.map((program) => {
            const Icon = program.icon;
            return (
              <Link
                key={program.slug}
                href={`/loans/${program.slug}`}
                className="group bg-white rounded-card shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200 p-6 flex flex-col border border-gray-100"
              >
                <Icon className="w-8 h-8 text-teal" strokeWidth={1.5} />
                <h3 className="font-semibold text-card text-gray-900 mt-4">
                  {program.name}
                </h3>
                <p className="text-sm text-gray-600 mt-2 flex-1">
                  {program.description}
                </p>
                <span className="text-sm font-semibold text-navy mt-4 inline-flex items-center gap-1 group-hover:text-teal transition-colors">
                  Contact Us to Discuss
                  <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
