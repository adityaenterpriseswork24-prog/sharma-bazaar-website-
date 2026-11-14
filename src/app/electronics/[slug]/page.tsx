import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldCheck,
  Building2,
  Phone,
  MessageCircle,
  CheckCircle2,
  ArrowRight,
  MapPin,
  Truck,
  RotateCcw,
} from 'lucide-react';
import { getProductBySlug, getRelatedProducts, getActiveProducts } from '@/lib/products';
import { formatINR, calculateSavings, buildWhatsAppUrl, generateProductWhatsAppMessage } from '@/lib/utils';
import { SITE_CONFIG } from '@/data/site-config';
import { ProductGallery } from '@/components/electronics/ProductGallery';
import { ProductCard } from '@/components/ui/ProductCard';

interface ProductDetailPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: ProductDetailPageProps): Promise<Metadata> {
  const product = await getProductBySlug(params.slug);
  if (!product) {
    return {
      title: 'Product Not Found | Sharma Electronics',
    };
  }

  const { savingsAmount, hasSavings } = calculateSavings(product.mrpPrice, product.ourPrice);
  const formattedPrice = formatINR(product.ourPrice);

  return {
    title: `${product.name} | Best Showroom Price Vasant Kunj`,
    description: `Buy ${product.name} (Model: ${product.modelNumber}) at Sharma Electronics Vasant Kunj. Listed at ${formattedPrice}${
      hasSavings ? ` (Save ${formatINR(savingsAmount)} vs MRP)` : ''
    }. Visit our 5-floor showroom at Masoodpur Dairy or enquire on WhatsApp.`,
    alternates: {
      canonical: `https://www.sharmaelectronics.com/electronics/${product.slug}`,
    },
    openGraph: {
      title: `${product.name} | Sharma Electronics Vasant Kunj`,
      description: `Best showroom price on ${product.brand} ${product.category}. Visit Sharma Electronics Masoodpur Dairy, Vasant Kunj or message us on WhatsApp.`,
      images: [
        {
          url: product.imageUrl,
          width: 800,
          height: 600,
          alt: product.name,
        },
      ],
    },
  };
}

export const dynamicParams = true;

export async function generateStaticParams() {
  const products = await getActiveProducts();
  return products.map((p) => ({
    slug: p.slug,
  }));
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const product = await getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = await getRelatedProducts(product.id, product.category, 3);
  const { savingsAmount, discountPercent, hasSavings } = calculateSavings(
    product.mrpPrice,
    product.ourPrice
  );

  const whatsappMessage = generateProductWhatsAppMessage(
    product.name,
    product.modelNumber,
    product.ourPrice
  );
  const whatsappUrl = buildWhatsAppUrl(SITE_CONFIG.whatsapp, whatsappMessage);

  const images = product.gallery && product.gallery.length > 0 ? product.gallery : [product.imageUrl];

  const productSchema = {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: product.name,
    image: images,
    description: product.description,
    sku: product.modelNumber,
    mpn: product.modelNumber,
    brand: {
      '@type': 'Brand',
      name: product.brand,
    },
    offers: {
      '@type': 'Offer',
      url: `https://www.sharmaelectronics.com/electronics/${product.slug}`,
      priceCurrency: 'INR',
      price: product.ourPrice,
      priceValidUntil: '2027-12-31',
      itemCondition: 'https://schema.org/NewCondition',
      availability:
        product.availability === 'in-stock'
          ? 'https://schema.org/InStock'
          : 'https://schema.org/PreOrder',
      seller: {
        '@type': 'LocalBusiness',
        name: SITE_CONFIG.businessName,
        telephone: SITE_CONFIG.phone,
        address: {
          '@type': 'PostalAddress',
          streetAddress: SITE_CONFIG.address,
          addressLocality: SITE_CONFIG.area,
          addressRegion: 'Delhi',
          postalCode: SITE_CONFIG.pincode,
          addressCountry: 'IN',
        },
      },
    },
  };

  const breadcrumbsSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://www.sharmaelectronics.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Electronics',
        item: 'https://www.sharmaelectronics.com/electronics',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: product.category,
        item: `https://www.sharmaelectronics.com/electronics?category=${product.category}`,
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: product.name,
        item: `https://www.sharmaelectronics.com/electronics/${product.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsSchema) }}
      />

      <div className="bg-white min-h-screen py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-xs font-mono text-neutral-400 overflow-x-auto py-1">
            <Link href="/" className="hover:text-brand-navy shrink-0">
              Showroom
            </Link>
            <span>/</span>
            <Link href="/electronics" className="hover:text-brand-navy shrink-0">
              Catalogue
            </Link>
            <span>/</span>
            <Link
              href={`/electronics?category=${product.category}`}
              className="hover:text-brand-navy uppercase tracking-wider shrink-0"
            >
              {product.category.replace('-', ' ')}
            </Link>
            <span>/</span>
            <span className="text-neutral-800 font-semibold truncate max-w-xs">{product.name}</span>
          </nav>

          {/* Main Product Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Left: Gallery & Showroom Note */}
            <div className="lg:col-span-7 space-y-6">
              <ProductGallery images={images} productName={product.name} />

              <div className="p-4 border border-neutral-200 bg-neutral-50 rounded-sm flex items-start gap-3">
                <Building2 className="w-4 h-4 text-brand-navy shrink-0 mt-0.5" />
                <div className="text-xs text-neutral-600 space-y-1">
                  <p className="font-bold text-neutral-900 font-sans">
                    Physical Showroom Display &amp; Instant Arrangement
                  </p>
                  <p className="leading-relaxed">
                    This unit is available at our 5-floor Masoodpur showroom or can be procured within 24 hours directly from authorized brand distributors.
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Pricing, Specs & CTAs */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-4 pb-6 border-b border-neutral-200">
                <div className="flex items-center justify-between text-xs font-mono text-neutral-400">
                  <span className="font-bold uppercase tracking-widest text-brand-navy">
                    {product.brand}
                  </span>
                  <span>Model: {product.modelNumber}</span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-brand-navy leading-snug">
                  {product.name}
                </h1>

                {/* Pricing Box */}
                <div className="p-4 bg-neutral-50 border border-neutral-200 rounded-sm space-y-2">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-400">
                    Showroom Verified Price
                  </span>
                  <div className="flex items-baseline justify-between">
                    <div className="flex items-baseline gap-3">
                      <span className="text-3xl font-extrabold text-brand-navy font-sans tracking-tight">
                        {formatINR(product.ourPrice)}
                      </span>
                      {product.mrpPrice > product.ourPrice && (
                        <span className="text-sm font-mono text-neutral-400 line-through">
                          MRP {formatINR(product.mrpPrice)}
                        </span>
                      )}
                    </div>

                    {hasSavings && (
                      <span className="font-mono text-xs font-bold text-white bg-neutral-900 px-2.5 py-1 rounded-sm shadow-subtle">
                        Save {formatINR(savingsAmount)}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-neutral-500 font-mono">
                    *GST invoice included. Authorized brand engineer doorstep installation.
                  </p>
                </div>

                {/* Direct Action Buttons */}
                <div className="space-y-2.5 pt-2">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 px-6 bg-brand-whatsapp hover:bg-brand-whatsappDark text-white text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors flex items-center justify-center gap-2 shadow-subtle"
                  >
                    <MessageCircle className="w-4 h-4 fill-white" />
                    <span>Inquire Best Price on WhatsApp</span>
                  </a>

                  <a
                    href={`tel:${SITE_CONFIG.phone}`}
                    className="w-full py-3 px-6 bg-white hover:bg-neutral-50 text-brand-navy text-xs font-mono font-medium rounded-sm border border-neutral-200 transition-colors flex items-center justify-center gap-2"
                  >
                    <Phone className="w-3.5 h-3.5 text-neutral-500" />
                    <span>Call Showroom: {SITE_CONFIG.phone}</span>
                  </a>
                </div>

                {/* 4 Trust points */}
                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-neutral-100 text-xs font-mono text-neutral-600">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                    <span>Brand Warranty</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Truck className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                    <span>Doorstep Lift</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Building2 className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                    <span>5-Floor Store</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                    <span>Sealed Box</span>
                  </div>
                </div>
              </div>

              {/* Showroom Visit Card */}
              <div className="p-4 bg-brand-navy text-white rounded-sm space-y-2.5">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <p className="font-bold text-white">Prefer to inspect in showroom?</p>
                    <p className="text-neutral-400 mt-0.5 text-[11px] leading-relaxed">
                      Visit Masoodpur Dairy, Vasant Kunj. Open daily 10 AM – 9 PM with lift access.
                    </p>
                  </div>
                </div>
                <a
                  href={SITE_CONFIG.googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 bg-white/10 hover:bg-white/20 text-white text-[11px] font-mono uppercase tracking-wider rounded-sm flex items-center justify-center gap-1.5 transition-colors border border-white/10"
                >
                  <span>Open Directions</span>
                  <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          {/* Specifications Table */}
          <div className="border border-neutral-200 rounded-sm p-6 sm:p-8 space-y-6">
            <div className="space-y-2">
              <h2 className="text-lg font-bold text-brand-navy">Product Overview</h2>
              <p className="text-sm text-neutral-600 leading-relaxed max-w-4xl font-normal">
                {product.description}
              </p>
            </div>

            {product.specifications && Object.keys(product.specifications).length > 0 && (
              <div className="pt-4 border-t border-neutral-200 space-y-3">
                <h3 className="font-mono text-xs uppercase tracking-widest text-neutral-400">
                  Technical Specifications
                </h3>
                <div className="border border-neutral-200 rounded-sm divide-y divide-neutral-200 text-xs">
                  {Object.entries(product.specifications).map(([key, value], idx) => (
                    <div
                      key={key}
                      className={`grid grid-cols-1 sm:grid-cols-3 p-3.5 ${
                        idx % 2 === 0 ? 'bg-neutral-50/70' : 'bg-white'
                      }`}
                    >
                      <span className="font-mono text-neutral-500 uppercase text-[11px] sm:col-span-1">
                        {key}
                      </span>
                      <span className="text-neutral-900 font-medium sm:col-span-2 mt-1 sm:mt-0 font-sans">
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="space-y-6 pt-6 border-t border-neutral-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-brand-navy tracking-tight">
                  Related {product.category.replace('-', ' ')}
                </h2>
                <Link
                  href={`/electronics?category=${product.category}`}
                  className="text-xs font-mono font-semibold uppercase tracking-wider text-brand-navy hover:underline flex items-center gap-1"
                >
                  <span>View All in Category</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedProducts.map((rel) => (
                  <ProductCard key={rel.id} product={rel} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
