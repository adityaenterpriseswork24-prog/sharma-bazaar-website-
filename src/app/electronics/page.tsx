import { Metadata } from 'next';
import { getActiveProducts } from '@/lib/products';
import { CatalogueView } from '@/components/electronics/CatalogueView';
import { SITE_CONFIG } from '@/data/site-config';

export const metadata: Metadata = {
  title: 'Consumer Electronics Catalogue | Best Prices in Vasant Kunj Delhi',
  description:
    'Browse 4K Smart TVs, Split Inverter ACs, Double Door Refrigerators, Washing Machines & Microwaves at Sharma Bazaar Vasant Kunj. Compare prices with online portals and visit our showroom.',
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

  return (
    <div className="bg-white min-h-screen py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Page Header */}
        <div className="space-y-3 max-w-2xl">
          <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-400">
            Showroom Inventory &amp; Distributor Index
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-brand-navy">
            Electronics Catalogue
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
  );
}
