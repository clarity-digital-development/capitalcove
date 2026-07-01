import { CTAButton } from '@/components/shared/CTAButton';
import { CTABanner } from '@/components/home/CTABanner';
import { SITE_CONFIG, type Phase2Program } from '@/lib/constants';

interface PlaceholderProgramTemplateProps {
  program: Phase2Program;
}

export function PlaceholderProgramTemplate({ program }: PlaceholderProgramTemplateProps) {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-hero text-white">{program.name}</h1>
          <p className="text-body-lg text-white/90 mt-4 max-w-2xl mx-auto">
            {program.tagline}
          </p>
        </div>
      </section>

      {/* Body */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {program.description.map((paragraph, idx) => (
              <p
                key={idx}
                className="text-body-lg text-gray-700 leading-relaxed"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Stat Grid */}
      <section className="bg-warm-gray py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {program.stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-white rounded-card shadow-card p-6 text-center"
              >
                <p className="text-sm uppercase tracking-wide text-gray-600 font-medium">
                  {stat.label}
                </p>
                <p className="text-2xl font-bold text-navy mt-2">{stat.value}</p>
              </div>
            ))}
          </div>

          <p className="text-center text-sm text-gray-600 mt-8 max-w-2xl mx-auto">
            Terms vary by scenario. Contact us with the details of your deal and we’ll
            come back with a structure that fits.
          </p>
        </div>
      </section>

      {/* CTAs */}
      <section className="py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-section font-bold text-gray-900">
            Ready to discuss a {program.name.toLowerCase().replace(/ loans?/i, '')} deal?
          </h2>
          <p className="text-body-lg text-gray-600 mt-4">
            Reach Dalton directly. We’ll talk through your scenario and come back with real numbers.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <CTAButton href="/contact" variant="primary" size="lg">
              Contact Us to Discuss
            </CTAButton>
            <CTAButton href={SITE_CONFIG.phoneHref} variant="ghost" size="lg">
              Call {SITE_CONFIG.phone}
            </CTAButton>
          </div>
        </div>
      </section>

      <CTABanner
        headline="Prefer a fix & flip deal instead?"
        subheadline="See our published rates and terms for fix & flip funding."
        ctaText="See Fix & Flip Loans"
        ctaHref="/loans"
      />
    </>
  );
}
