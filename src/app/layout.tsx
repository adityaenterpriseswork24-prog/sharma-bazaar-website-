import type { Metadata } from 'next';
import './globals.css';
import { AnnouncementBar } from '@/components/layout/AnnouncementBar';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FloatingWhatsApp } from '@/components/layout/FloatingWhatsApp';
import { MobileBottomBar } from '@/components/layout/MobileBottomBar';
import { SITE_CONFIG } from '@/data/site-config';

export const metadata: Metadata = {
  title: {
    default: `${SITE_CONFIG.businessName} | Electronics Store in Vasant Kunj Delhi`,
    template: `%s | ${SITE_CONFIG.businessName}`,
  },
  description:
    'Vasant Kunj premier multi-brand electronics showroom. Competitive local showroom prices on Sony, Samsung, LG, Daikin, Bosch TVs, ACs, Refrigerators and Washing Machines. Masoodpur Dairy, Vasant Kunj.',
  metadataBase: new URL('https://www.sharmaelectronics.com'),
  keywords: [
    'Electronics store Vasant Kunj Delhi',
    'Electronics shop near me',
    'TV price Vasant Kunj',
    'AC dealer South Delhi',
    'Refrigerator price Vasant Kunj',
    'Washing machine Vasant Kunj',
    'Microwave price Delhi',
    'Electronics shop Masoodpur',
    'Electronics store near Vasant Kunj Metro',
    'Best electronics price Vasant Kunj',
  ],
  authors: [{ name: SITE_CONFIG.businessName }],
  creator: SITE_CONFIG.businessName,
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://www.sharmaelectronics.com',
    siteName: SITE_CONFIG.businessName,
    title: `${SITE_CONFIG.businessName} | Electronics Store in Vasant Kunj Delhi`,
    description:
      'Compare prices with us before purchasing online. Competitive local prices on TVs, ACs, Refrigerators, Washing Machines & more at our 5-floor Vasant Kunj showroom.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 630,
        alt: `${SITE_CONFIG.businessName} Vasant Kunj Showroom`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_CONFIG.businessName} | Electronics Store in Vasant Kunj`,
    description: 'Shop TVs, ACs, Refrigerators at competitive local showroom prices in Vasant Kunj.',
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col font-sans bg-white text-slate-800 antialiased pb-16 md:pb-0">
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
