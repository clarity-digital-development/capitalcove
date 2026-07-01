import type { Metadata } from 'next';
import Script from 'next/script';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { StickyMobileCTA } from '@/components/layout/StickyMobileCTA';
import { AttributionTracker } from '@/components/shared/AttributionTracker';
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
    template: '%s',
    default: 'The Capital Cove | Fix & Flip Loans — Close in 5 Days',
  },
  description: SITE_CONFIG.description,
  metadataBase: new URL(SITE_CONFIG.url),
  openGraph: {
    type: 'website',
    siteName: SITE_CONFIG.name,
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
  },
};

const orgJsonLd = {
  '@context': 'https://schema.org',
  '@type': ['Organization', 'FinancialService', 'LocalBusiness'],
  '@id': `${SITE_CONFIG.url}#organization`,
  name: SITE_CONFIG.legalName,
  alternateName: SITE_CONFIG.name,
  legalName: SITE_CONFIG.legalString,
  url: SITE_CONFIG.url,
  description: SITE_CONFIG.description,
  telephone: SITE_CONFIG.phone,
  email: SITE_CONFIG.email,
  priceRange: '$$',
  areaServed: {
    '@type': 'Country',
    name: 'United States',
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: SITE_CONFIG.city,
    addressRegion: SITE_CONFIG.stateCode,
    addressCountry: 'US',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 30.3322,
    longitude: -81.6557,
  },
  knowsAbout: [
    'Fix and Flip Loans',
    'Bridge Loans',
    'DSCR Rental Loans',
    'New Construction Loans',
    'Private Lending',
    'Hard Money Loans',
    'Real Estate Investment Financing',
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Loan Programs',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'LoanOrCredit',
          name: 'Fix & Flip Loan',
          loanTerm: { '@type': 'QuantitativeValue', minValue: 12, maxValue: 24, unitCode: 'MON' },
          amount: { '@type': 'MonetaryAmount', currency: 'USD', minValue: 100000 },
        },
      },
      { '@type': 'Offer', itemOffered: { '@type': 'LoanOrCredit', name: 'Bridge Loan' } },
      { '@type': 'Offer', itemOffered: { '@type': 'LoanOrCredit', name: 'DSCR Rental Loan' } },
      { '@type': 'Offer', itemOffered: { '@type': 'LoanOrCredit', name: 'New Construction Loan' } },
    ],
  },
  sameAs: [SITE_CONFIG.socialLinks.instagram, SITE_CONFIG.socialLinks.facebook],
};

const gaId = process.env.NEXT_PUBLIC_GA_ID;
const chatWidgetId = process.env.GHL_CHAT_WIDGET_ID;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <link rel="preconnect" href="https://services.leadconnectorhq.com" />
        <link rel="preconnect" href="https://widgets.leadconnectorhq.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
      </head>
      <body className="font-sans antialiased">
        <AttributionTracker />
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <StickyMobileCTA />

        {/* GHL Chat Widget */}
        {chatWidgetId && (
          <Script
            id="ghl-chat-widget"
            src="https://widgets.leadconnectorhq.com/loader.js"
            data-resources-url="https://widgets.leadconnectorhq.com/chat-widget/loader.js"
            data-widget-id={chatWidgetId}
            strategy="afterInteractive"
          />
        )}

        {/* Google Analytics 4 */}
        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script
              id="ga-init"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${gaId}');
                `,
              }}
            />
          </>
        )}
      </body>
    </html>
  );
}
