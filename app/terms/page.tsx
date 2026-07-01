import type { Metadata } from 'next';
import { SITE_CONFIG } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Terms of Service | The Capital Cove',
  description: `Terms of service for ${SITE_CONFIG.legalString}. Read our terms regarding loan requests, SMS communication, and website usage.`,
};

export default function TermsPage() {
  return (
    <section className="py-(--spacing-section) bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-gray max-w-none">
        <h1 className="text-section font-bold text-gray-900">Terms of Service</h1>
        <p className="text-sm text-gray-600 mt-2">
          Last updated: April 18, 2026
        </p>

        <p className="text-gray-700 leading-relaxed mt-6">
          These Terms of Service (&quot;Terms&quot;) govern your use of the{' '}
          {SITE_CONFIG.name} website operated by {SITE_CONFIG.legalString}{' '}
          (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;). By accessing or
          using{' '}
          <a href={SITE_CONFIG.url} className="text-teal hover:underline">
            {SITE_CONFIG.url}
          </a>
          , you agree to be bound by these Terms. If you do not agree, please do
          not use the site.
        </p>

        <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
          1. Loan Request Disclaimer
        </h2>
        <p className="text-gray-700 leading-relaxed">
          <strong>
            Submitting a loan application or inquiry through this website does
            not constitute a loan approval, commitment to lend, or guarantee of
            financing.
          </strong>{' '}
          All loan requests are subject to underwriting review, property
          evaluation, and final approval.
        </p>
        <p className="text-gray-700 leading-relaxed mt-3">
          Term sheets provided are indicative and non-binding until a formal loan
          agreement is executed by all parties. Rates, terms, and conditions are
          subject to change based on underwriting findings and market conditions.
          Loans are originated by {SITE_CONFIG.legalString} and may be placed
          with third-party capital partners.
        </p>

        <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
          2. Not a Commitment to Lend
        </h2>
        <p className="text-gray-700 leading-relaxed">
          Nothing on this website shall be construed as a commitment or promise
          to lend. We reserve the right to decline any loan request for any
          reason. All financing is subject to satisfactory completion of due
          diligence, including but not limited to property appraisal, title
          review, and borrower verification.
        </p>

        <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
          3. SMS / Text Message Terms
        </h2>
        <p className="text-gray-700 leading-relaxed">
          By providing your phone number and checking the SMS consent box on any
          of our forms, you agree to receive text messages from {SITE_CONFIG.name}{' '}
          regarding your funding request. Message frequency varies. Message and
          data rates may apply.
        </p>
        <ul className="list-disc pl-6 mt-3 space-y-1 text-gray-700">
          <li>
            <strong>Opt out:</strong> Reply <strong>STOP</strong> to any SMS message to
            opt out. You will receive a confirmation message and no further
            SMS messages.
          </li>
          <li>
            <strong>Help:</strong> Reply <strong>HELP</strong> to any SMS message for
            assistance, or contact us at{' '}
            <a href={SITE_CONFIG.emailHref} className="text-teal hover:underline">
              {SITE_CONFIG.email}
            </a>
            .
          </li>
          <li>
            <strong>Not a condition:</strong> Your consent to receive SMS messages is
            not a condition of obtaining any loan, good, or service.
          </li>
          <li>
            <strong>Content:</strong> Messages may include application status updates,
            document requests, term sheet delivery, closing coordination, and
            responses to your inquiries.
          </li>
          <li>
            <strong>Carrier liability:</strong> We are not responsible for delays or
            non-delivery of SMS messages due to carrier issues outside our control.
          </li>
        </ul>

        <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
          4. Website Use
        </h2>
        <p className="text-gray-700 leading-relaxed">
          You agree to use this website only for lawful purposes and in accordance
          with these Terms. You may not:
        </p>
        <ul className="list-disc pl-6 mt-3 space-y-1 text-gray-700">
          <li>Submit false, misleading, or fraudulent information through any form</li>
          <li>Attempt to access restricted areas of the website or its systems</li>
          <li>Use automated tools to scrape, collect, or extract data from the website</li>
          <li>Interfere with the proper functioning of the website</li>
        </ul>

        <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
          5. Intellectual Property
        </h2>
        <p className="text-gray-700 leading-relaxed">
          All content on this website, including text, graphics, logos, and
          software, is the property of {SITE_CONFIG.legalString} and is protected
          by applicable copyright and trademark laws. You may not reproduce,
          distribute, or create derivative works from this content without our
          written permission.
        </p>

        <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
          6. Calculator and Tools Disclaimer
        </h2>
        <p className="text-gray-700 leading-relaxed">
          Calculators and tools provided on this website are for informational
          and educational purposes only. Results are estimates and should not be
          relied upon as financial advice or a guarantee of loan terms. Actual
          loan terms, costs, and returns may vary significantly.
        </p>

        <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
          7. Limitation of Liability
        </h2>
        <p className="text-gray-700 leading-relaxed">
          To the fullest extent permitted by law, {SITE_CONFIG.legalString}{' '}
          shall not be liable for any direct, indirect, incidental, special, or
          consequential damages arising from your use of this website or reliance
          on information provided herein.
        </p>

        <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
          8. Third-Party Links
        </h2>
        <p className="text-gray-700 leading-relaxed">
          This website may contain links to third-party websites or services. We
          are not responsible for the content, privacy practices, or terms of
          any third-party sites. Accessing linked sites is at your own risk.
        </p>

        <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
          9. Modifications
        </h2>
        <p className="text-gray-700 leading-relaxed">
          We reserve the right to modify these Terms at any time. Changes will be
          posted on this page with an updated effective date. Your continued use
          of the website after changes are posted constitutes acceptance of the
          revised terms.
        </p>

        <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
          10. Governing Law
        </h2>
        <p className="text-gray-700 leading-relaxed">
          These Terms shall be governed by and construed in accordance with the
          laws of the State of Florida, without regard to its conflict of law
          provisions. Any disputes arising from these Terms shall be resolved in
          the state or federal courts located in Duval County, Florida.
        </p>

        <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
          11. Contact
        </h2>
        <p className="text-gray-700 leading-relaxed">
          For questions about these Terms, contact us at:
        </p>
        <p className="text-gray-700 mt-3">
          {SITE_CONFIG.legalString}
          <br />
          {SITE_CONFIG.locationLine}
          <br />
          Email:{' '}
          <a href={SITE_CONFIG.emailHref} className="text-teal hover:underline">
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
