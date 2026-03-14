import type { Metadata } from 'next';
import { SITE_CONFIG } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: `Terms of service for ${SITE_CONFIG.name}. Read our terms regarding loan requests, website usage, and disclaimers.`,
};

export default function TermsPage() {
  return (
    <section className="py-section bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-gray max-w-none">
        <h1 className="text-section font-bold text-gray-900">Terms of Service</h1>
        <p className="text-sm text-gray-600 mt-2">
          Last updated: January 1, 2025
        </p>

        <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
          1. Acceptance of Terms
        </h2>
        <p className="text-gray-600 leading-relaxed">
          By accessing and using the {SITE_CONFIG.name} website
          (&quot;Site&quot;), you agree to be bound by these Terms of Service.
          If you do not agree with these terms, please do not use our Site.
        </p>

        <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
          2. Loan Request Disclaimer
        </h2>
        <p className="text-gray-600 leading-relaxed">
          <strong>
            Submitting a loan application or inquiry through this website does
            not constitute a loan approval, commitment to lend, or guarantee of
            financing.
          </strong>{' '}
          All loan requests are subject to underwriting review, property
          evaluation, and final approval by {SITE_CONFIG.name}.
        </p>
        <p className="text-gray-600 leading-relaxed mt-3">
          Term sheets provided are indicative and non-binding until a formal
          loan agreement is executed by all parties. Rates, terms, and
          conditions are subject to change based on underwriting findings and
          market conditions.
        </p>

        <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
          3. Not a Commitment to Lend
        </h2>
        <p className="text-gray-600 leading-relaxed">
          Nothing on this website shall be construed as a commitment or promise
          to lend. {SITE_CONFIG.name} reserves the right to decline any loan
          request for any reason. All financing is subject to satisfactory
          completion of due diligence, including but not limited to property
          appraisal, title review, and borrower verification.
        </p>

        <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
          4. Website Use
        </h2>
        <p className="text-gray-600 leading-relaxed">
          You agree to use this website only for lawful purposes and in
          accordance with these terms. You may not:
        </p>
        <ul className="list-disc pl-6 mt-3 space-y-1 text-gray-600">
          <li>
            Submit false, misleading, or fraudulent information through any form
          </li>
          <li>
            Attempt to access restricted areas of the website or its systems
          </li>
          <li>
            Use automated tools to scrape, collect, or extract data from the
            website
          </li>
          <li>
            Interfere with the proper functioning of the website
          </li>
        </ul>

        <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
          5. Intellectual Property
        </h2>
        <p className="text-gray-600 leading-relaxed">
          All content on this website, including text, graphics, logos, and
          software, is the property of {SITE_CONFIG.name} and is protected by
          applicable copyright and trademark laws. You may not reproduce,
          distribute, or create derivative works from this content without our
          written permission.
        </p>

        <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
          6. Calculator and Tools Disclaimer
        </h2>
        <p className="text-gray-600 leading-relaxed">
          Calculators and tools provided on this website are for informational
          and educational purposes only. Results are estimates and should not be
          relied upon as financial advice or a guarantee of loan terms.
          Actual loan terms, costs, and returns may vary significantly from
          calculator estimates.
        </p>

        <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
          7. Limitation of Liability
        </h2>
        <p className="text-gray-600 leading-relaxed">
          {SITE_CONFIG.name} shall not be liable for any direct, indirect,
          incidental, special, or consequential damages arising from your use of
          this website or reliance on information provided herein. This includes,
          without limitation, damages for loss of profits, business
          interruption, or loss of data.
        </p>

        <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
          8. Third-Party Links
        </h2>
        <p className="text-gray-600 leading-relaxed">
          This website may contain links to third-party websites or services. We
          are not responsible for the content, privacy practices, or terms of
          any third-party sites. Accessing linked sites is at your own risk.
        </p>

        <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
          9. Modifications
        </h2>
        <p className="text-gray-600 leading-relaxed">
          We reserve the right to modify these Terms of Service at any time.
          Changes will be posted on this page with an updated effective date.
          Your continued use of the website after changes are posted constitutes
          acceptance of the revised terms.
        </p>

        <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
          10. Governing Law
        </h2>
        <p className="text-gray-600 leading-relaxed">
          These terms shall be governed by and construed in accordance with the
          laws of the State of California, without regard to its conflict of law
          provisions.
        </p>

        <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
          11. Contact
        </h2>
        <p className="text-gray-600 leading-relaxed">
          For questions about these terms, contact us at:
        </p>
        <p className="text-gray-600 mt-3">
          {SITE_CONFIG.name}
          <br />
          {SITE_CONFIG.address}
          <br />
          Email:{' '}
          <a href={`mailto:${SITE_CONFIG.email}`} className="text-teal hover:underline">
            {SITE_CONFIG.email}
          </a>
          <br />
          Phone:{' '}
          <a href={SITE_CONFIG.phoneHref} className="text-teal hover:underline">
            {SITE_CONFIG.phone}
          </a>
        </p>
      </div>
    </section>
  );
}
