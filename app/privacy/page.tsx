import type { Metadata } from 'next';
import { SITE_CONFIG } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Privacy Policy | The Capital Cove',
  description: `Privacy policy for ${SITE_CONFIG.legalString}. How we collect, use, and protect your personal information.`,
};

export default function PrivacyPage() {
  return (
    <section className="py-(--spacing-section) bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-gray max-w-none">
        <h1 className="text-section font-bold text-gray-900">Privacy Policy</h1>
        <p className="text-sm text-gray-600 mt-2">
          Last updated: April 18, 2026
        </p>

        <p className="text-gray-700 leading-relaxed mt-6">
          This Privacy Policy describes how {SITE_CONFIG.legalString}{' '}
          (&quot;{SITE_CONFIG.name},&quot; &quot;we,&quot; &quot;us,&quot; or
          &quot;our&quot;) collects, uses, and protects your personal information
          when you visit{' '}
          <a href={SITE_CONFIG.url} className="text-teal hover:underline">
            {SITE_CONFIG.url}
          </a>{' '}
          or submit a funding request.
        </p>

        <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
          1. Information We Collect
        </h2>
        <p className="text-gray-700 leading-relaxed">
          We collect personal information that you voluntarily provide when using
          our website, submitting a loan application, or contacting us. This may
          include:
        </p>
        <ul className="list-disc pl-6 mt-3 space-y-1 text-gray-700">
          <li>Full name, email address, and phone number</li>
          <li>Property address and details</li>
          <li>Purchase price, loan amount, rehab budget, and ARV</li>
          <li>Entity information (LLC name, entity type, state of formation)</li>
          <li>
            Financial information necessary to evaluate your loan request (e.g.,
            bank statements supplied during underwriting)
          </li>
          <li>Information collected via cookies and analytics tools</li>
        </ul>

        <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
          2. How We Use Your Information
        </h2>
        <p className="text-gray-700 leading-relaxed">
          We use the information we collect to:
        </p>
        <ul className="list-disc pl-6 mt-3 space-y-1 text-gray-700">
          <li>Review and evaluate your loan request</li>
          <li>Communicate with you regarding funding — status updates, document requests, term sheets, closing coordination</li>
          <li>Place loans with our capital partners where appropriate</li>
          <li>Improve our website and service quality</li>
          <li>Comply with legal and regulatory requirements</li>
        </ul>

        <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
          3. SMS / Text Message Consent
        </h2>
        <p className="text-gray-700 leading-relaxed">
          By providing your phone number and checking the SMS consent box on our
          forms, you agree to receive text messages from {SITE_CONFIG.name}{' '}
          regarding your funding request. Messages may include application status
          updates, document requests, term sheet delivery, and closing coordination.
        </p>
        <ul className="list-disc pl-6 mt-3 space-y-1 text-gray-700">
          <li>Message frequency varies. Message and data rates may apply.</li>
          <li>
            You may opt out at any time by replying <strong>STOP</strong> to any
            message. Reply <strong>HELP</strong> for assistance.
          </li>
          <li>
            Contact us at{' '}
            <a
              href={SITE_CONFIG.emailHref}
              className="text-teal hover:underline"
            >
              {SITE_CONFIG.email}
            </a>{' '}
            or{' '}
            <a href={SITE_CONFIG.phoneHref} className="text-teal hover:underline">
              {SITE_CONFIG.phone}
            </a>{' '}
            for any SMS-related questions.
          </li>
          <li>
            Your consent to receive SMS messages is not a condition of obtaining
            any goods or services.
          </li>
          <li>
            We will not share your phone number or SMS consent data with third
            parties for marketing purposes.
          </li>
        </ul>

        <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
          4. Cookies and Tracking Technologies
        </h2>
        <p className="text-gray-700 leading-relaxed">
          Our website uses cookies and similar technologies to enhance your
          browsing experience, analyze site traffic, and understand usage
          patterns. These include:
        </p>
        <ul className="list-disc pl-6 mt-3 space-y-1 text-gray-700">
          <li>
            <strong>Essential cookies:</strong> Required for the website to function properly.
          </li>
          <li>
            <strong>Analytics cookies:</strong> Help us understand how visitors use our site (e.g., Google Analytics).
          </li>
          <li>
            <strong>Chat cookies:</strong> Required by the GoHighLevel chat widget to maintain your conversation with us.
          </li>
        </ul>
        <p className="text-gray-700 leading-relaxed mt-3">
          You may control cookie preferences through your browser settings.
          Disabling cookies may affect website functionality.
        </p>

        <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
          5. Third-Party Services
        </h2>
        <p className="text-gray-700 leading-relaxed">
          We may share your information with trusted third-party service providers
          who assist us in operating our business, including:
        </p>
        <ul className="list-disc pl-6 mt-3 space-y-1 text-gray-700">
          <li>CRM and communication platforms (GoHighLevel)</li>
          <li>Capital partners who may underwrite or fund your loan</li>
          <li>Title, escrow, and appraisal companies</li>
          <li>Analytics providers (e.g., Google Analytics)</li>
          <li>Legal and compliance advisors</li>
        </ul>
        <p className="text-gray-700 leading-relaxed mt-3">
          We do not sell your personal information.
        </p>

        <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
          6. Data Security
        </h2>
        <p className="text-gray-700 leading-relaxed">
          We implement appropriate technical and organizational measures to
          protect your personal information against unauthorized access,
          alteration, disclosure, or destruction. Data transmitted through our
          website is encrypted using industry-standard TLS.
        </p>

        <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
          7. Your Rights
        </h2>
        <p className="text-gray-700 leading-relaxed">
          Depending on your location, you may have the right to:
        </p>
        <ul className="list-disc pl-6 mt-3 space-y-1 text-gray-700">
          <li>Access the personal information we hold about you</li>
          <li>Request correction or deletion of your data</li>
          <li>Opt out of marketing communications</li>
          <li>Request a copy of your data in a portable format</li>
        </ul>
        <p className="text-gray-700 leading-relaxed mt-3">
          To exercise any of these rights, contact us at{' '}
          <a href={SITE_CONFIG.emailHref} className="text-teal hover:underline">
            {SITE_CONFIG.email}
          </a>
          .
        </p>

        <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
          8. Contact Us
        </h2>
        <p className="text-gray-700 leading-relaxed">
          If you have questions about this privacy policy, contact us at:
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
