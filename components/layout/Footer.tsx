import Link from 'next/link';
import Image from 'next/image';
import { Instagram, Linkedin, Phone, Mail, MapPin } from 'lucide-react';
import { SITE_CONFIG, LOAN_PROGRAMS, RESOURCES } from '@/lib/constants';

export function Footer() {
  return (
    <footer className="bg-navy-dark text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Company */}
          <div>
            <Link href="/">
              <Image
                src="/images/logo.svg"
                alt="Capital Cove Real Estate Funding"
                width={150}
                height={42}
                className="brightness-0 invert"
              />
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-gray-200/70">
              Fast, flexible private real estate financing for investors and
              borrowers. Close with confidence.
            </p>
            <p className="mt-4 text-xs text-gray-200/50">{SITE_CONFIG.nmls}</p>
          </div>

          {/* Loan Programs */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gold">
              Loan Programs
            </h3>
            <ul className="mt-4 space-y-3">
              {LOAN_PROGRAMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-200/70 transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gold">
              Resources
            </h3>
            <ul className="mt-4 space-y-3">
              {RESOURCES.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-200/70 transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gold">
              Contact
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href={SITE_CONFIG.phoneHref}
                  className="flex items-center gap-2 text-sm text-gray-200/70 transition-colors hover:text-white"
                >
                  <Phone className="h-4 w-4 shrink-0" />
                  {SITE_CONFIG.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="flex items-center gap-2 text-sm text-gray-200/70 transition-colors hover:text-white"
                >
                  <Mail className="h-4 w-4 shrink-0" />
                  {SITE_CONFIG.email}
                </a>
              </li>
              <li>
                <div className="flex items-start gap-2 text-sm text-gray-200/70">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                  {SITE_CONFIG.address}
                </div>
              </li>
            </ul>

            {/* Social */}
            <div className="mt-6 flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-gray-200/50 transition-colors hover:text-white"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-gray-200/50 transition-colors hover:text-white"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 text-xs text-gray-200/50 sm:flex-row sm:px-6 lg:px-8">
          <p>
            &copy; {new Date().getFullYear()} {SITE_CONFIG.name}. All rights
            reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="transition-colors hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-white">
              Terms of Service
            </Link>
          </div>
          <p>Equal Housing Lender</p>
        </div>
      </div>
    </footer>
  );
}
