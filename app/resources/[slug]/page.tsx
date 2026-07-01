import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { CTABanner } from '@/components/home/CTABanner';
import { ArticleBody } from '@/components/blog/ArticleBody';
import { getAllBlogSlugs, getBlogPost } from '@/lib/blog';
import { SITE_CONFIG } from '@/lib/constants';

export function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

/** Format an ISO `YYYY-MM-DD` string without timezone drift. */
function formatDate(iso: string): string {
  const m = iso.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (!m) return '';
  const [, y, mo, d] = m;
  return `${MONTHS[parseInt(mo, 10) - 1]} ${parseInt(d, 10)}, ${y}`;
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
    post.metaDescription ||
    post.excerpt ||
    post.body.slice(0, 155).replace(/\s+/g, ' ') + '...';
  const url = `${SITE_CONFIG.url}/resources/${post.slug}`;
  const image = post.image ? `${SITE_CONFIG.url}${post.image}` : undefined;
  // metaTitle may already include the brand — avoid doubling the suffix.
  const title = post.metaTitle.includes(SITE_CONFIG.name)
    ? post.metaTitle
    : `${post.metaTitle} | ${SITE_CONFIG.name}`;

  return {
    title,
    description,
    keywords: post.keywords || undefined,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      title: post.title,
      description,
      url,
      publishedTime: post.date || undefined,
      images: image ? [{ url: image, width: 1600, height: 900, alt: post.imageAlt }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description,
      images: image ? [image] : undefined,
    },
  };
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

  const url = `${SITE_CONFIG.url}/resources/${post.slug}`;
  const image = post.image ? `${SITE_CONFIG.url}${post.image}` : undefined;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.metaDescription || post.excerpt,
    image: image ? [image] : undefined,
    datePublished: post.date || undefined,
    dateModified: post.date || undefined,
    author: {
      '@type': 'Person',
      name: 'Dalton Guinn',
      url: `${SITE_CONFIG.url}/about`,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_CONFIG.url}/images/logo.svg`,
      },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    articleSection: post.category,
    keywords: post.keywords || undefined,
  };

  return (
    <>
      <script
        type="application/ld+json"
        // JSON-LD from our own content; escape `<` so a stray "</script>" in any
        // string can't break out of the tag.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />

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
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="text-xs font-semibold text-teal-light bg-teal/20 px-2 py-1 rounded-full">
              {post.category}
            </span>
            <span className="text-xs text-white/60">{post.readTime}</span>
            {post.date && (
              <span className="text-xs text-white/60">· {formatDate(post.date)}</span>
            )}
          </div>
          <h1 className="font-display text-hero text-white">{post.title}</h1>
        </div>
      </section>

      {/* Cover image */}
      {image && (
        <div className="bg-navy">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative aspect-[16/9] -mb-16 rounded-card overflow-hidden shadow-card-hover">
              <Image
                src={post.image}
                alt={post.imageAlt}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      )}

      {/* Body */}
      <section className={`pb-(--spacing-section) bg-white ${image ? 'pt-24' : 'pt-(--spacing-section)'}`}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-none">
            <ArticleBody body={post.body} />
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
