import Link from 'next/link';
import { Hammer, ArrowRightLeft, Home, Building2 } from 'lucide-react';
import { LOAN_PROGRAMS_DETAIL } from '@/lib/constants';
import { SectionHeading } from '@/components/shared/SectionHeading';

const iconMap: Record<string, React.ReactNode> = {
  'fix-and-flip': <Hammer className="w-8 h-8 text-teal" />,
  bridge: <ArrowRightLeft className="w-8 h-8 text-teal" />,
  rental: <Home className="w-8 h-8 text-teal" />,
  'new-construction': <Building2 className="w-8 h-8 text-teal" />,
};

export function LoanProgramCards() {
  return (
    <section className="bg-warm-gray py-(--spacing-section)">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="LOAN PROGRAMS"
          title="Funding Solutions for Every Strategy"
          centered
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {LOAN_PROGRAMS_DETAIL.map((program) => (
            <Link
              key={program.slug}
              href={`/loans/${program.slug}`}
              className="bg-white rounded-card shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200 p-6 flex flex-col"
            >
              <div className="mb-4">{iconMap[program.slug]}</div>
              <h3 className="font-semibold text-card text-gray-900">
                {program.name}
              </h3>
              <p className="text-sm text-gray-600 mt-2 flex-1">
                {program.description}
              </p>
              <p className="text-sm font-semibold text-teal mt-4">
                {program.keyStats[0].value} {program.keyStats[0].label}
              </p>
              <span className="text-sm font-semibold text-navy mt-3 inline-flex items-center gap-1">
                Learn More <span aria-hidden="true">&rarr;</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
