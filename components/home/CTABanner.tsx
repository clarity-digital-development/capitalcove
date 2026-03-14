import { CTAButton } from '@/components/shared/CTAButton';

interface CTABannerProps {
  headline?: string;
  subheadline?: string;
  ctaText?: string;
  ctaHref?: string;
}

export function CTABanner({
  headline = 'Ready to Fund Your Next Deal?',
  subheadline = 'Submit your deal and get a term sheet within 24 hours.',
  ctaText = 'Get Started',
  ctaHref = '/apply',
}: CTABannerProps) {
  return (
    <section className="bg-navy py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-section font-bold text-white">{headline}</h2>
        <p className="text-body-lg text-white/90 mt-4 max-w-2xl mx-auto">
          {subheadline}
        </p>
        <div className="mt-8">
          <CTAButton href={ctaHref} variant="primary" size="lg">
            {ctaText}
          </CTAButton>
        </div>
      </div>
    </section>
  );
}
