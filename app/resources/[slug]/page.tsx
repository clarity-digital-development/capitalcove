import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { CTABanner } from '@/components/home/CTABanner';
import { getAllBlogSlugs, getBlogPost } from '@/lib/blog';

export function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return { title: 'Article Not Found | The Capital Cove' };
  }

  const description =
    post.excerpt || post.body.slice(0, 160).replace(/\s+/g, ' ') + '...';

  return {
    title: `${post.title} | The Capital Cove`,
    description,
  };
}

/**
 * Renders a markdown paragraph as React nodes, supporting `**bold**` only.
 * Safe — no HTML strings are ever inserted into the DOM.
 */
function renderInline(text: string): React.ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, idx) => {
    const boldMatch = part.match(/^\*\*([^*]+)\*\*$/);
    if (boldMatch) {
      return (
        <strong key={idx} className="text-gray-900">
          {boldMatch[1]}
        </strong>
      );
    }
    return <span key={idx}>{part}</span>;
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const paragraphs = post.body.split(/\n\n+/);

  return (
    <>
      {/* Header */}
      <section className="bg-navy py-16 lg:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/resources"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Resources
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-semibold text-teal-light bg-teal/20 px-2 py-1 rounded-full">
              {post.category}
            </span>
            <span className="text-xs text-white/60">{post.readTime}</span>
          </div>
          <h1 className="font-display text-hero text-white">{post.title}</h1>
        </div>
      </section>

      {/* Body */}
      <section className="py-(--spacing-section) bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-gray max-w-none">
            {paragraphs.map((paragraph, idx) => (
              <p key={idx} className="text-gray-700 leading-relaxed mb-6">
                {renderInline(paragraph)}
              </p>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        headline="Ready to Fund Your Next Deal?"
        subheadline="Submit your deal and Dalton will reach out within minutes."
        ctaText="Apply for Funding"
        ctaHref="/apply?type=fix-and-flip"
      />
    </>
  );
}
