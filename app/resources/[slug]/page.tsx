import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { CTABanner } from '@/components/home/CTABanner';

interface BlogPost {
  slug: string;
  title: string;
  category: string;
  readTime: string;
  body: string;
}

const posts: Record<string, BlogPost> = {
  'what-is-hard-money': {
    slug: 'what-is-hard-money',
    title: 'What Is a Hard Money Loan? The Complete Guide for Investors',
    category: 'Education',
    readTime: '8 min read',
    body: `Hard money loans are short-term, asset-based loans secured by real estate. Unlike traditional bank loans that focus on a borrower's income and credit history, hard money lenders evaluate the property itself — its current value, after-repair value, and the strength of the investment plan.

These loans are commonly used by real estate investors for fix and flip projects, bridge financing, and other time-sensitive acquisitions where speed and flexibility are more important than getting the lowest possible interest rate.

Hard money loans typically feature higher interest rates (9-14%) and shorter terms (6-24 months) compared to conventional mortgages. However, they offer significant advantages: faster closings (as quick as 7-10 days), less documentation, and approval based on the deal rather than the borrower's personal financial profile.

Common uses for hard money loans include purchasing distressed properties at auction, funding renovation projects, bridging the gap between buying a new property and selling an existing one, and acquiring properties that do not qualify for traditional financing.

When choosing a hard money lender, look for transparency in pricing, a track record of closing on time, and a team that understands real estate investing. The best lenders operate as partners in your success, not just capital providers.`,
  },
  'fix-and-flip-101': {
    slug: 'fix-and-flip-101',
    title: 'Fix and Flip 101: A Step-by-Step Guide to Your First Flip',
    category: 'Strategy',
    readTime: '10 min read',
    body: `Fix and flip investing is one of the most popular strategies in real estate. The concept is straightforward: buy a property below market value, renovate it to increase its value, and sell it for a profit. While the concept is simple, successful execution requires careful planning and disciplined execution.

Step 1: Find the Right Deal. The profit in a flip is made at purchase, not at sale. Look for properties in desirable neighborhoods that are priced below comparable sales due to cosmetic or functional issues. The 70% rule is a good starting point: your maximum purchase price should be no more than 70% of the after-repair value minus renovation costs.

Step 2: Secure Financing. Private or hard money loans are the most common financing method for flips. These loans are designed for speed and can close in as little as 10 days. Expect to bring 10-15% of the purchase price as a down payment, with the lender covering the remaining acquisition cost and often 100% of the rehab budget.

Step 3: Plan Your Renovation. Create a detailed scope of work with your contractor before closing. Know exactly what work needs to be done, how much it will cost, and how long it will take. Over-improving for the neighborhood is one of the most common mistakes new flippers make.

Step 4: Execute the Rehab. Time is money on a flip — every month you hold the property costs you in interest, insurance, utilities, and taxes. Stay on top of your timeline and budget. Regular site visits and clear communication with your contractor are essential.

Step 5: Sell for Profit. Price your renovated property competitively based on recent comparable sales. Work with an agent who understands investor timelines and can move quickly. A well-renovated property in a good market should sell within 30-60 days.

The key to long-term success in fix and flip investing is building reliable systems: a pipeline of deals, a trusted contractor network, a responsive lender, and accurate estimating skills that improve with every project.`,
  },
  'brrrr-method-explained': {
    slug: 'brrrr-method-explained',
    title: 'The BRRRR Method Explained: Build Wealth Through Rental Properties',
    category: 'Strategy',
    readTime: '7 min read',
    body: `The BRRRR method stands for Buy, Rehab, Rent, Refinance, Repeat. It is a real estate investment strategy that allows investors to build a portfolio of rental properties while recycling their capital from deal to deal.

Buy: Acquire a property below market value. This is typically a distressed or outdated property in a good rental market. Use a hard money or bridge loan for the initial purchase to move quickly.

Rehab: Renovate the property to increase its value and make it rent-ready. The renovation should be tailored for durability and tenant appeal rather than luxury finishes. Focus on kitchens, bathrooms, flooring, and paint.

Rent: Place a qualified tenant and establish consistent rental income. The property should generate positive cash flow — meaning the rent covers the mortgage payment, taxes, insurance, and maintenance with room to spare.

Refinance: Once the property is stabilized with a tenant in place, refinance into a long-term DSCR loan. Because the property is now worth more (thanks to your rehab), you can often pull out most or all of your original investment. DSCR loans qualify based on the rental income, not your personal income.

Repeat: Take the capital you recovered through the refinance and use it to fund your next BRRRR deal. This is how investors scale from one property to an entire portfolio without continually injecting new capital.

The BRRRR method works best when you can acquire properties at a significant discount, execute efficient renovations, and refinance at favorable terms. The combination of a reliable private lender for acquisition and a DSCR lender for the refinance is essential to making this strategy work at scale.`,
  },
};

export function generateStaticParams() {
  return [
    { slug: 'what-is-hard-money' },
    { slug: 'fix-and-flip-101' },
    { slug: 'brrrr-method-explained' },
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = posts[slug];

  if (!post) {
    return { title: 'Article Not Found' };
  }

  return {
    title: post.title,
    description: post.body.slice(0, 160) + '...',
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = posts[slug];

  if (!post) {
    return (
      <section className="py-section bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-section font-bold text-gray-900">
            Article Not Found
          </h1>
          <p className="text-gray-600 mt-4">
            The article you are looking for does not exist.
          </p>
          <Link
            href="/resources"
            className="inline-flex items-center gap-2 text-teal font-medium mt-6 hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Resources
          </Link>
        </div>
      </section>
    );
  }

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
      <section className="py-section bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-gray max-w-none">
            {post.body.split('\n\n').map((paragraph, idx) => (
              <p key={idx} className="text-gray-600 leading-relaxed mb-6">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        headline="Ready to Fund Your Next Deal?"
        subheadline="Apply now and get a term sheet within 24 hours."
        ctaText="Apply for Funding"
        ctaHref="/apply"
      />
    </>
  );
}
