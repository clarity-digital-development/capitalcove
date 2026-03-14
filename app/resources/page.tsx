import type { Metadata } from 'next';
import Link from 'next/link';
import { Calculator } from 'lucide-react';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { CTABanner } from '@/components/home/CTABanner';

export const metadata: Metadata = {
  title: 'Resources',
  description:
    'Tools, guides, and insights for real estate investors. Use our flip profit calculator and read our latest articles on private lending strategies.',
};

const blogPosts = [
  {
    slug: 'what-is-hard-money',
    title: 'What Is a Hard Money Loan? The Complete Guide for Investors',
    excerpt:
      'Everything you need to know about hard money lending: how it works, when to use it, and how to choose the right lender for your deal.',
    category: 'Education',
    readTime: '8 min read',
  },
  {
    slug: 'fix-and-flip-101',
    title: 'Fix and Flip 101: A Step-by-Step Guide to Your First Flip',
    excerpt:
      'From finding deals to managing rehab budgets, here is a practical roadmap for completing your first profitable fix and flip project.',
    category: 'Strategy',
    readTime: '10 min read',
  },
  {
    slug: 'brrrr-method-explained',
    title: 'The BRRRR Method Explained: Build Wealth Through Rental Properties',
    excerpt:
      'Buy, Rehab, Rent, Refinance, Repeat. Learn how the BRRRR strategy works and how to finance each step of the process.',
    category: 'Strategy',
    readTime: '7 min read',
  },
];

export default function ResourcesPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-hero text-white">Resources</h1>
          <p className="text-body-lg text-white/80 mt-4 max-w-2xl mx-auto">
            Tools and guides to help you make smarter investment decisions.
          </p>
        </div>
      </section>

      {/* Featured Calculator */}
      <section className="py-section bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/resources/calculator"
            className="block bg-gradient-to-r from-navy to-navy-light rounded-card p-8 lg:p-12 hover:shadow-card-hover transition-shadow group"
          >
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
              <div className="w-16 h-16 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0">
                <Calculator className="w-8 h-8 text-gold" />
              </div>
              <div className="flex-1">
                <span className="text-teal-light text-sm font-semibold uppercase tracking-wide">
                  Featured Tool
                </span>
                <h2 className="text-2xl font-bold text-white mt-1">
                  Flip Profit Calculator
                </h2>
                <p className="text-white/70 mt-2 max-w-xl">
                  Run the numbers on your next fix and flip deal. Calculate total
                  project costs, estimated profit, ROI, and cash needed to close
                  — all in real time.
                </p>
              </div>
              <span className="text-gold font-semibold group-hover:translate-x-1 transition-transform">
                Try It Now &rarr;
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-section bg-warm-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Guides & Articles"
            subtitle="Insights to help you navigate the private lending landscape."
            centered
          />

          <div className="mt-12 grid md:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/resources/${post.slug}`}
                className="bg-white rounded-card overflow-hidden shadow-card hover:shadow-card-hover transition-shadow group"
              >
                {/* Placeholder image */}
                <div className="aspect-[16/9] bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-600 text-sm">Featured Image</span>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-semibold text-teal bg-teal/10 px-2 py-1 rounded-full">
                      {post.category}
                    </span>
                    <span className="text-xs text-gray-600">
                      {post.readTime}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-teal transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm mt-2 line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
