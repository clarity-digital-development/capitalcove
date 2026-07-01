import type { Metadata } from 'next';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { FAQ_CATEGORIES } from '@/lib/constants';
import FAQAccordion from '@/components/shared/FAQAccordion';
import { CTABanner } from '@/components/home/CTABanner';

export const metadata: Metadata = {
  title: 'FAQ | The Capital Cove',
  description:
    'Answers to common questions about private lending, loan terms, rates, and the application process at The Capital Cove.',
};

function generateFAQJsonLd() {
  const allQuestions = FAQ_CATEGORIES.flatMap((cat) =>
    cat.questions.map((q) => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: q.answer,
      },
    }))
  );

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: allQuestions,
  };
}

export default function FAQPage() {
  const jsonLd = generateFAQJsonLd();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="bg-navy py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-hero text-white">
            Frequently Asked Questions
          </h1>
          <p className="text-body-lg text-white/80 mt-4 max-w-2xl mx-auto">
            Everything you need to know about working with us.
          </p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-(--spacing-section) bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion categories={FAQ_CATEGORIES} />
        </div>
      </section>

      <CTABanner
        headline="Still Have Questions?"
        subheadline="Reach out directly and we'll walk you through everything."
        ctaText="Contact Us"
        ctaHref="/contact"
      />
    </>
  );
}
