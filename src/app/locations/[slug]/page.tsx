import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  MapPin,
  Clock,
  Truck,
  ShieldCheck,
  CheckCircle2,
  MessageCircle,
  Phone,
  ArrowLeft,
  ChevronRight,
  TrendingDown,
  Navigation,
} from 'lucide-react';
import {
  SOUTH_DELHI_LOCALITIES,
  getLocalityBySlug,
  getAllLocalitySlugs,
} from '@/data/locations';
import { SITE_CONFIG } from '@/data/site-config';
import { buildWhatsAppUrl } from '@/lib/utils';

interface LocalityPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllLocalitySlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: LocalityPageProps): Promise<Metadata> {
  const { slug } = await params;
  const locality = getLocalityBySlug(slug);

  if (!locality) {
    return {
      title: 'Location Not Found | Sharma Bazaar',
    };
  }

  return {
    title: locality.metaTitle,
    description: locality.metaDescription,
    alternates: {
      canonical: `https://www.sharmabazaar.com/locations/${locality.slug}`,
    },
    openGraph: {
      title: locality.metaTitle,
      description: locality.metaDescription,
      url: `https://www.sharmabazaar.com/locations/${locality.slug}`,
      siteName: 'Sharma Bazaar',
      type: 'website',
    },
  };
}

export default async function LocalityDetailPage({ params }: LocalityPageProps) {
  const { slug } = await params;
  const locality = getLocalityBySlug(slug);

  if (!locality) {
    notFound();
  }

  const directWhatsAppUrl = buildWhatsAppUrl(
    SITE_CONFIG.whatsapp,
    `Hi Sharma Bazaar, I need doorstep delivery of an appliance in ${locality.name}. Please share current availability and best price.`
  );

  // Schema.org LocalBusiness & ServiceArea structured data
  const localityJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'DeliveryService',
    name: `Sharma Bazaar Doorstep Appliance Delivery - ${locality.name}`,
    provider: {
      '@type': 'ElectronicsStore',
      name: SITE_CONFIG.businessName,
      telephone: SITE_CONFIG.phone,
      address: {
        '@type': 'PostalAddress',
        streetAddress: SITE_CONFIG.address,
        addressLocality: SITE_CONFIG.area,
        addressRegion: 'New Delhi',
        postalCode: SITE_CONFIG.pincode,
        addressCountry: 'IN',
      },
    },
    areaServed: {
      '@type': 'AdministrativeArea',
      name: locality.name,
      postalCode: locality.pincodes.join(', '),
    },
    serviceOutput: {
      '@type': 'Product',
      name: 'Consumer Electronics & Home Appliances',
    },
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: locality.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  const otherLocalities = SOUTH_DELHI_LOCALITIES.filter((l) => l.slug !== locality.slug);

  return (
    <div className="bg-white min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localityJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Breadcrumb Navigation */}
      <div className="border-b border-neutral-200 bg-neutral-50/60 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-1.5 text-xs font-mono text-neutral-500">
            <Link href="/" className="hover:text-brand-navy transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3 h-3 text-neutral-400" />
            <Link href="/locations" className="hover:text-brand-navy transition-colors">
              Delivery Locations
            </Link>
            <ChevronRight className="w-3 h-3 text-neutral-400" />
            <span className="text-brand-navy font-semibold">{locality.name}</span>
          </nav>
        </div>
      </div>

      {/* Locality Hero */}
      <section className="border-b border-neutral-200 bg-white py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-brand-navy text-white text-[10px] font-mono uppercase tracking-widest">
                <MapPin className="w-3 h-3 text-emerald-400" />
                <span>South Delhi Delivery Hub</span>
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-sm bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-mono font-semibold">
                <Clock className="w-3 h-3 text-emerald-700" />
                {locality.deliveryPill}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-brand-navy">
              Home Appliance Doorstep Delivery in {locality.name}
            </h1>

            <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-normal">
              {locality.tagline}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href={directWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-brand-whatsapp hover:bg-brand-whatsappDark rounded-sm transition-colors shadow-subtle"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-white" />
                <span>Order for {locality.name} on WhatsApp</span>
              </a>

              <a
                href={`tel:${SITE_CONFIG.phone}`}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-mono font-medium text-brand-navy bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 rounded-sm transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-neutral-500" />
                <span>Call Dispatch Desk ({SITE_CONFIG.phone})</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Grid: Locality Data & Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-14">
        {/* Key Logistics Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Editorial Overview & Coverage */}
          <div className="lg:col-span-8 space-y-8">
            <div className="space-y-4">
              <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-400">
                Logistics &amp; Fulfillment
              </span>
              <h2 className="text-2xl font-bold text-brand-navy">
                Fast, Safe Appliance Delivery Directly from Masoodpur Dairy
              </h2>
              <p className="text-sm text-neutral-700 leading-relaxed font-sans">
                {locality.overview}
              </p>
            </div>

            {/* Delivery Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {locality.deliveryHighlights.map((hl, i) => (
                <div
                  key={i}
                  className="p-5 bg-neutral-50 border border-neutral-200 rounded-sm space-y-2"
                >
                  <div className="flex items-center gap-2 text-brand-navy font-bold text-xs">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{hl.title}</span>
                  </div>
                  <p className="text-xs text-neutral-600 leading-relaxed">{hl.description}</p>
                </div>
              ))}
            </div>

            {/* Popular Appliances & Typical Savings */}
            <div className="space-y-4 pt-4 border-t border-neutral-200">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-400">
                    High Demand Categories
                  </span>
                  <h3 className="text-xl font-bold text-brand-navy mt-0.5">
                    Popular Appliances Delivered in {locality.name}
                  </h3>
                </div>
                <TrendingDown className="w-5 h-5 text-emerald-600 hidden sm:block" />
              </div>

              <div className="border border-neutral-200 rounded-sm overflow-hidden">
                <div className="divide-y divide-neutral-200">
                  {locality.popularAppliances.map((app, idx) => (
                    <div
                      key={idx}
                      className="p-4 bg-white hover:bg-neutral-50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                    >
                      <div>
                        <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-400 block">
                          {app.category}
                        </span>
                        <h4 className="text-sm font-bold text-brand-navy mt-0.5">{app.models}</h4>
                      </div>
                      <div className="sm:text-right shrink-0">
                        <span className="inline-block px-2.5 py-1 rounded-sm bg-emerald-50 text-emerald-800 border border-emerald-200 font-mono text-xs font-semibold">
                          {app.avgSavings}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Localized FAQs */}
            <div className="space-y-4 pt-4 border-t border-neutral-200">
              <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-400">
                Delivery FAQ
              </span>
              <h3 className="text-xl font-bold text-brand-navy">
                Questions About Delivery in {locality.name}
              </h3>
              <div className="space-y-3">
                {locality.faqs.map((faq, idx) => (
                  <div
                    key={idx}
                    className="p-5 bg-neutral-50 border border-neutral-200 rounded-sm space-y-2"
                  >
                    <h4 className="font-bold text-brand-navy text-xs sm:text-sm">{faq.question}</h4>
                    <p className="text-xs text-neutral-600 leading-relaxed font-sans">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Quick Delivery Card & Sector List */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-6 bg-brand-navy text-white rounded-sm space-y-5">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-emerald-400">
                  Fulfillment Card
                </span>
                <h3 className="text-lg font-bold mt-1">{locality.name} Logistics</h3>
              </div>

              <div className="space-y-3 font-mono text-xs border-y border-white/10 py-4">
                <div className="flex items-center justify-between">
                  <span className="text-neutral-400">Distance:</span>
                  <span className="font-bold text-white">{locality.distanceFromShowroom}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-neutral-400">Delivery Time:</span>
                  <span className="font-bold text-emerald-400">{locality.deliveryWindow}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-neutral-400">Pincodes:</span>
                  <span className="font-bold text-white">{locality.pincodes.join(', ')}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-neutral-400">Showroom Base:</span>
                  <span className="font-bold text-white">80-B Masoodpur</span>
                </div>
              </div>

              <div className="space-y-2.5">
                <a
                  href={directWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 text-xs font-semibold text-white bg-brand-whatsapp hover:bg-brand-whatsappDark rounded-sm transition-colors shadow-subtle"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Order for {locality.name}</span>
                </a>

                <a
                  href={`tel:${SITE_CONFIG.phone}`}
                  className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-mono font-medium text-white bg-white/10 hover:bg-white/15 border border-white/20 rounded-sm transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call {SITE_CONFIG.phone}</span>
                </a>
              </div>
            </div>

            {/* Coverage Landmarks in this locality */}
            <div className="p-5 border border-neutral-200 rounded-sm bg-neutral-50/70 space-y-3">
              <h4 className="font-mono text-[11px] uppercase tracking-widest text-brand-navy font-bold">
                Covered Sectors &amp; Pockets
              </h4>
              <ul className="space-y-1.5 text-xs font-sans text-neutral-600">
                {locality.landmarkCoverage.map((landmark, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-navy shrink-0" />
                    <span>{landmark}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Other South Delhi Delivery Neighborhoods */}
        <section className="pt-8 border-t border-neutral-200 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-400">
                Neighboring Zones
              </span>
              <h3 className="text-xl font-bold text-brand-navy">
                Other South Delhi Delivery Locations
              </h3>
            </div>
            <Link
              href="/locations"
              className="text-xs font-semibold text-brand-navy hover:underline flex items-center gap-1"
            >
              <span>View All Locations</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {otherLocalities.map((other) => (
              <Link
                key={other.slug}
                href={`/locations/${other.slug}`}
                className="p-3 bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 rounded-sm transition-colors text-center block space-y-1 group"
              >
                <span className="text-xs font-bold text-brand-navy group-hover:underline block truncate">
                  {other.name}
                </span>
                <span className="text-[10px] font-mono text-emerald-700 block truncate">
                  {other.deliveryPill}
                </span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
