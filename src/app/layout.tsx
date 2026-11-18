import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import { AnnouncementBar } from '@/components/layout/AnnouncementBar';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FloatingWhatsApp } from '@/components/layout/FloatingWhatsApp';
import { MobileBottomBar } from '@/components/layout/MobileBottomBar';
import { SITE_CONFIG } from '@/data/site-config';
import { SOUTH_DELHI_LOCALITIES } from '@/data/locations';

export const metadata: Metadata = {
  title: {
    default: 'Electronics Store Vasant Kunj | Sharma Bazaar | South Delhi Showroom',
    template: '%s',
  },
  description:
    'Premier electronics showroom & home appliances store in Vasant Kunj, South Delhi. Beat Amazon & Flipkart prices on Sony 4K TVs, Daikin ACs, Samsung refrigerators & Bosch washers at Dairy Farm, 80-B, Masoodpur, G/F, Vasant Kunj showroom.',
  metadataBase: new URL('https://www.sharmabazaar.com'),
  keywords: [
    'electronics store vasant kunj',
    'electronics showroom vasant kunj',
    'electronics shop vasant kunj delhi',
    'home appliances store vasant kunj',
    'consumer electronics vasant kunj',
    'electronics store near vasant kunj metro',
    'best electronics store south delhi',
    'home appliances shop south delhi',
    'electronics showroom south delhi',
    'cheap electronics vasant kunj',
    'best price electronics vasant kunj',
    'electronics dealer vasant kunj',
    'buy electronics vasant kunj',
    'electronics store masoodpur vasant kunj',
    'electronics store near me',
    'home appliances shop near me',
    'tv showroom near me',
    'ac dealer near me',
    'washing machine shop near me',
    'fridge store near me',
    'electronics cheaper than amazon delhi',
    'tv price cheaper than flipkart delhi',
    'beat amazon price electronics delhi',
    'electronics store mahipalpur',
    'electronics showroom munirka delhi',
    'tv dealer mehrauli delhi',
    'ac showroom saket delhi',
    'electronics store vasant vihar delhi',
  ],
  authors: [{ name: SITE_CONFIG.businessName }],
  creator: SITE_CONFIG.businessName,
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://www.sharmabazaar.com',
    siteName: SITE_CONFIG.businessName,
    title: 'Electronics Store Vasant Kunj | Sharma Bazaar | South Delhi Showroom',
    description:
      'Compare quotes with us before buying online. Selected models cheaper than Amazon with authentic brand warranties, Dairy Farm, 80-B, Masoodpur, G/F physical showroom & same-day South Delhi delivery.',
    images: [
      {
        url: 'https://www.sharmabazaar.com/images/showroom/sharma-bazaar-showroom-interior.jpg',
        width: 1200,
        height: 675,
        alt: 'Sharma Bazaar Electronics Showroom Dairy Farm Masoodpur Vasant Kunj South Delhi',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Electronics Store Vasant Kunj | Sharma Bazaar Showroom',
    description: 'Shop TVs, ACs, Refrigerators & Washers at best prices in Vasant Kunj, South Delhi.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google2050aee4a489568f',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const globalOrganizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'ElectronicsStore',
    '@id': 'https://www.sharmabazaar.com/#organization',
    name: SITE_CONFIG.businessName,
    alternateName: [
      'Sharma Bazaar Electronics',
      'Sharma Bazaar Vasant Kunj',
      'Sharma Electronics Vasant Kunj',
    ],
    url: 'https://www.sharmabazaar.com',
    logo: 'https://www.sharmabazaar.com/images/sharma-bazaar-symbol.png',
    image: 'https://www.sharmabazaar.com/images/showroom/sharma-bazaar-showroom-interior.jpg',
    telephone: '+917065009006',
    email: SITE_CONFIG.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE_CONFIG.address,
      addressLocality: SITE_CONFIG.area,
      addressRegion: 'New Delhi',
      postalCode: SITE_CONFIG.pincode,
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: SITE_CONFIG.coordinates.latitude,
      longitude: SITE_CONFIG.coordinates.longitude,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: '10:00',
        closes: '21:00',
      },
    ],
    priceRange: '₹₹',
    currenciesAccepted: 'INR',
    paymentAccepted: 'Cash, UPI, Credit Card, Debit Card, Net Banking',
    hasMap: SITE_CONFIG.googleMapsDirectionsUrl,
    sameAs: [
      SITE_CONFIG.googleMapsDirectionsUrl,
      'https://share.google/YEQYNtCiA110LNgOs',
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '184',
      bestRating: '5',
      worstRating: '1',
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: SITE_CONFIG.phone,
        contactType: 'sales and customer service',
        areaServed: 'IN',
        availableLanguage: ['English', 'Hindi'],
      },
    ],
    areaServed: SOUTH_DELHI_LOCALITIES.map((loc) => ({
      '@type': 'AdministrativeArea',
      name: loc.name,
      postalCode: loc.pincodes.join(', '),
    })),
    department: [
      {
        '@type': 'ElectronicsStore',
        name: 'Sharma Bazaar Televisions & 4K Smart TVs',
      },
      {
        '@type': 'ElectronicsStore',
        name: 'Sharma Bazaar Air Conditioners & Inverter ACs',
      },
      {
        '@type': 'ElectronicsStore',
        name: 'Sharma Bazaar Refrigerators & Frost-Free Fridges',
      },
      {
        '@type': 'ElectronicsStore',
        name: 'Sharma Bazaar Washing Machines & Home Appliances',
      },
      {
        '@type': 'ElectronicsStore',
        name: 'Sharma Bazaar Microwave Ovens & Kitchen Appliances',
      },
      {
        '@type': 'ElectronicsStore',
        name: 'Sharma Bazaar Water Dispensers & Coolers',
      },
    ],
  };

  const globalWebsiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://www.sharmabazaar.com/#website',
    url: 'https://www.sharmabazaar.com',
    name: 'Sharma Bazaar',
    description: 'Your Home Appliance Destination in Vasant Kunj, South Delhi.',
    publisher: {
      '@id': 'https://www.sharmabazaar.com/#organization',
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://www.sharmabazaar.com/electronics?search={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(globalOrganizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(globalWebsiteSchema) }}
        />
      </head>
      <body className="min-h-screen flex flex-col font-sans bg-white text-slate-900 antialiased selection:bg-brand-navy selection:text-white pb-20 md:pb-0">
        {/* Google Tag Manager (noscript fallback) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MSC3WWB3"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>

        {/* Google Tag Manager (GTM-MSC3WWB3) & dataLayer Initialization */}
        <Script
          id="google-tag-manager"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-MSC3WWB3');
            `,
          }}
        />

        <AnnouncementBar />
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
        <FloatingWhatsApp />
        <MobileBottomBar />
      </body>
    </html>
  );
}
