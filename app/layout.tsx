import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { StickyMobileCTA } from '@/components/layout/StickyMobileCTA';
import { SITE_CONFIG } from '@/lib/constants';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    template: '%s | Capital Cove',
    default: 'Capital Cove | Private Real Estate Loans',
  },
  description:
    'Capital Cove provides fast, flexible private real estate loans for investors and borrowers. Bridge loans, fix & flip, DSCR rentals, and commercial financing.',
  metadataBase: new URL(SITE_CONFIG.url),
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_CONFIG.name,
  url: SITE_CONFIG.url,
  description: SITE_CONFIG.description,
  telephone: SITE_CONFIG.phone,
  email: SITE_CONFIG.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: '123 Capital Avenue, Suite 400',
    addressLocality: 'Los Angeles',
    addressRegion: 'CA',
    postalCode: '90071',
    addressCountry: 'US',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <link rel="preconnect" href="https://services.leadconnectorhq.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased">
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <StickyMobileCTA />
      </body>
    </html>
  );
}
