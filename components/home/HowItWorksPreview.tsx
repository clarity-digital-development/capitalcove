import Link from 'next/link';

const steps = [
  {
    number: 1,
    title: 'Submit Your Deal',
    description:
      'Fill out our quick online form with your property and project details. Takes less than 5 minutes.',
  },
  {
    number: 2,
    title: 'Get Your Terms',
    description:
      'Receive a same-day term sheet outlining your rate, leverage, and loan structure.',
  },
  {
    number: 3,
    title: 'Close & Fund',
    description:
      'We handle appraisal, title, and underwriting so you can close in as few as 10 business days.',
  },
];

export function HowItWorksPreview() {
  return (
    <section className="py-(--spacing-section) bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="uppercase tracking-wide text-teal font-semibold text-sm">
            HOW IT WORKS
          </span>
          <h2 className="text-section font-bold text-gray-900 mt-2">
            From Application to Funding
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, index) => (
            <div key={step.number} className="flex flex-col items-center text-center relative">
              {/* Connecting line (desktop only) */}
              {index < steps.length - 1 && (
                <div
                  className="hidden md:block absolute top-6 left-[calc(50%+1.5rem)] w-[calc(100%-3rem)] border-t-2 border-dashed border-gray-200"
                  aria-hidden="true"
                />
              )}

              {/* Number badge */}
              <div className="w-12 h-12 bg-teal text-white rounded-full font-bold flex items-center justify-center text-lg relative z-10">
                {step.number}
              </div>

              <h3 className="font-semibold text-card text-gray-900 mt-4">
                {step.title}
              </h3>
              <p className="text-sm text-gray-600 mt-2 max-w-xs">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/how-it-works"
            className="text-navy font-semibold hover:text-navy-light transition-colors inline-flex items-center gap-1"
          >
            See Our Full Process <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
