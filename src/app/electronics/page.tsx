import { Metadata } from 'next';
import { getActiveProducts } from '@/lib/products';
import { CatalogueView } from '@/components/electronics/CatalogueView';
import { SITE_CONFIG } from '@/data/site-config';

export const metadata: Metadata = {
  title: 'Buy Electronics in Vasant Kunj | Sharma Bazaar Showroom',
  description:
    'Shop 4K TVs, ACs, Refrigerators & Washers in Vasant Kunj. Beat online prices with brand warranty, GST invoice & same-day delivery across South Delhi.',
  keywords: [
    'tv showroom near me',
    'electronics showroom near me',
    '55k tv',
    'best tv under 50000',
    'best 55 inch tv under 55000',
    'smart tv dealer south delhi',
    'ac showroom near me',
    'refrigerator showroom near me',
    'washing machine showroom near me',
    'buy electronics vasant kunj',
    'electronics store vasant kunj',
    'electronics showroom vasant kunj',
    'electronics showroom south delhi',
    'electronics shop vasant kunj delhi',
    'home appliances store vasant kunj',
    'consumer electronics vasant kunj',
    'best electronics store south delhi',
    'electronics store masoodpur vasant kunj',
    'tv store vasant kunj',
    '55 inch tv price vasant kunj',
    'ac dealer vasant kunj',
    '1.5 ton ac price vasant kunj',
    'fridge store vasant kunj',
    'double door fridge price vasant kunj',
    'washing machine store vasant kunj',
    'front load washing machine vasant kunj',
    'microwave oven store vasant kunj',
    'convection microwave vasant kunj',
    'water dispenser dealer south delhi',
    'hot cold water dispenser vasant kunj',
    'best price electronics vasant kunj',
    'cheap electronics vasant kunj',
    'electronics cheaper than amazon delhi',
    'beat amazon price electronics delhi',
    'tv price cheaper than flipkart delhi',
  ],
  alternates: {
    canonical: 'https://www.sharmabazaar.com/electronics',
  },
};

interface ElectronicsPageProps {
  searchParams: {
    category?: string;
    search?: string;
  };
}

export default async function ElectronicsPage({ searchParams }: ElectronicsPageProps) {
  const products = await getActiveProducts();

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Sharma Bazaar Consumer Electronics Catalogue Vasant Kunj',
    description: '4K Smart TVs, Inverter ACs, Refrigerators and Washing Machines available at Sharma Bazaar showroom.',
    itemListElement: products.map((prod, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: `https://www.sharmabazaar.com/electronics/${prod.slug}`,
      name: prod.name,
      image: prod.imageUrl,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <div className="bg-white min-h-screen py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Page Header */}
        <div className="space-y-3 max-w-2xl">
          <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-400">
            Showroom Inventory &amp; Distributor Index
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-brand-navy">
            Electronics &amp; Appliances
          </h1>
          <p className="text-sm text-neutral-600 leading-relaxed">
            All prices reflect genuine manufacturer merchandise with authentic GST tax invoice.
            Compare prices with online portals and get our best quote on WhatsApp.
          </p>
        </div>

        {/* Dynamic Catalogue View with interactive filters */}
        <CatalogueView
          initialProducts={products}
          initialCategory={searchParams.category || 'all'}
          initialSearch={searchParams.search || ''}
        />
      </div>
    </div>
    </>
  );
}
