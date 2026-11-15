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
    default: 'Electronics Store Vasant Kunj | Sharma Bazaar | South Delhi Showroom',
    template: `%s | ${SITE_CONFIG.businessName}`,
  },
  description:
    'Premier electronics showroom & home appliances store in Vasant Kunj, South Delhi. Beat Amazon & Flipkart prices on Sony 4K TVs, Daikin ACs, Samsung refrigerators & Bosch washers at Masoodpur Dairy showroom.',
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
      'Compare quotes with us before buying online. Selected models cheaper than Amazon with authentic brand warranties, Masoodpur Dairy physical showroom & same-day South Delhi delivery.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'Sharma Bazaar Electronics Showroom Vasant Kunj New Delhi',
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
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col font-sans bg-white text-slate-900 antialiased selection:bg-brand-navy selection:text-white pb-16 md:pb-0">
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
