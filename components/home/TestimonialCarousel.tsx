'use client';

const testimonials = [
  {
    /* TODO: Replace with real testimonial */
    quote:
      'Capital Cove funded my fix-and-flip in just 12 days. Their team made the process seamless from start to finish.',
    name: 'Marcus T.',
    location: 'Phoenix, AZ',
    dealType: 'Fix & Flip',
  },
  {
    /* TODO: Replace with real testimonial */
    quote:
      'I needed bridge financing fast to secure a off-market deal. Capital Cove delivered a term sheet the same day I applied.',
    name: 'Sarah K.',
    location: 'Dallas, TX',
    dealType: 'Bridge Loan',
  },
  {
    /* TODO: Replace with real testimonial */
    quote:
      'The DSCR rental loan was perfect for growing my portfolio. No tax returns, no hassle, just straightforward lending.',
    name: 'James R.',
    location: 'Atlanta, GA',
    dealType: 'DSCR Rental',
  },
];

export function TestimonialCarousel() {
  return (
    <section className="bg-warm-gray py-(--spacing-section)">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="uppercase tracking-wide text-teal font-semibold text-sm">
            TESTIMONIALS
          </span>
          <h2 className="text-section font-bold text-gray-900 mt-2">
            Trusted by Real Estate Investors
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="bg-white rounded-card shadow-card p-6 flex flex-col"
            >
              <blockquote className="italic text-gray-600 flex-1">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
              <div className="mt-6 pt-4 border-t border-gray-100">
                <p className="font-semibold text-gray-900">
                  {testimonial.name}
                </p>
                <p className="text-sm text-gray-600">
                  {testimonial.location} &middot; {testimonial.dealType}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
