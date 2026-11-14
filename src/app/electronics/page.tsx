import { Metadata } from 'next';
import { getActiveProducts } from '@/lib/products';
import { CatalogueView } from '@/components/electronics/CatalogueView';
import { SITE_CONFIG } from '@/data/site-config';

export const metadata: Metadata = {
  title: 'Consumer Electronics Catalogue | Best Prices in Vasant Kunj Delhi',
  description:
    'Browse 4K Smart TVs, Split Inverter ACs, Double Door Refrigerators, Washing Machines & Microwaves at Sharma Electronics Vasant Kunj. Compare prices with online portals and visit our showroom.',
  alternates: {
    canonical: 'https://www.sharmaelectronics.com/electronics',
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

  return (
    <div className="bg-slate-50/60 min-h-screen py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Page Header */}
        <div className="space-y-2">
          <span className="text-xs font-extrabold uppercase tracking-widest text-brand-blue">
            {SITE_CONFIG.businessName} Multi-Brand Catalogue
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-brand-navy tracking-tight">
            Electronics Showroom &amp; Price Catalogue
          </h1>
          <p className="text-slate-600 text-sm sm:text-base max-w-2xl leading-relaxed">
            All prices reflect genuine brand merchandise with authorized manufacturer warranty.
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
  );
}
