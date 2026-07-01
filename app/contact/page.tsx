import type { Metadata } from 'next';
import { Phone, Mail, MapPin, Clock, Instagram, Facebook } from 'lucide-react';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { SITE_CONFIG } from '@/lib/constants';
import ContactForm from '@/components/shared/ContactForm';

export const metadata: Metadata = {
  title: 'Contact | The Capital Cove',
  description:
    'Get in touch with The Capital Cove. Call, email, or send a message to discuss your real estate financing.',
};

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-hero text-white">Get in Touch</h1>
          <p className="text-body-lg text-white/80 mt-4 max-w-2xl mx-auto">
            Have a deal to discuss or a question? Reach Dalton directly.
          </p>
        </div>
      </section>

      <section className="py-(--spacing-section) bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left: Contact Info */}
            <div>
              <SectionHeading
                badge="CONTACT INFO"
                title="Let's Talk About Your Deal"
              />

              <div className="mt-8 space-y-6">
                <a
                  href={SITE_CONFIG.phoneHref}
                  className="flex items-start gap-4 group"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-teal/10 flex items-center justify-center">
                    <Phone className="w-5 h-5 text-teal" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Phone</p>
                    <p className="text-lg font-semibold text-gray-900 group-hover:text-teal transition-colors">
                      {SITE_CONFIG.phone}
                    </p>
                  </div>
                </a>

                <a
                  href={SITE_CONFIG.emailHref}
                  className="flex items-start gap-4 group"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-teal/10 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-teal" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Email</p>
                    <p className="text-lg font-semibold text-gray-900 group-hover:text-teal transition-colors">
                      {SITE_CONFIG.email}
                    </p>
                  </div>
                </a>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-teal/10 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-teal" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Location</p>
                    <p className="text-gray-900">{SITE_CONFIG.locationLine}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-teal/10 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-teal" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Business Hours
                    </p>
                    <p className="text-gray-900">
                      Monday - Friday: 8:00 AM - 6:00 PM ET
                    </p>
                    <p className="text-gray-600 text-sm">
                      Saturday: 9:00 AM - 1:00 PM ET
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-10 pt-8 border-t border-gray-200">
                <p className="text-sm font-medium text-gray-600 mb-4">
                  Follow Us
                </p>
                <div className="flex items-center gap-4">
                  <a
                    href={SITE_CONFIG.socialLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-navy/10 flex items-center justify-center hover:bg-navy hover:text-white text-navy transition-colors"
                    aria-label={`Instagram ${SITE_CONFIG.socialLinks.instagramHandle}`}
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a
                    href={SITE_CONFIG.socialLinks.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-navy/10 flex items-center justify-center hover:bg-navy hover:text-white text-navy transition-colors"
                    aria-label="Facebook"
                  >
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a
                    href={SITE_CONFIG.socialLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-700 hover:text-teal transition-colors"
                  >
                    {SITE_CONFIG.socialLinks.instagramHandle}
                  </a>
                </div>
              </div>
            </div>

            {/* Right: Contact Form */}
            <div className="bg-warm-gray rounded-card p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Send Us a Message
              </h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
