import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import {
  ChevronRight,
  ShieldCheck,
  Building2,
  Phone,
  MessageCircle,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  MapPin,
  Truck,
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
    title: `${product.name} Price in Vasant Kunj | ${formattedPrice}`,
    description: `Buy ${product.name} (Model: ${product.modelNumber}) at Sharma Electronics Vasant Kunj. Listed at ${formattedPrice}${
      hasSavings ? ` (Save ${formatINR(savingsAmount)} vs MRP)` : ''
    }. Visit our 5-floor showroom at Masoodpur Dairy or enquire on WhatsApp.`,
    alternates: {
      canonical: `https://www.sharmaelectronics.com/electronics/${product.slug}`,
    },
    openGraph: {
      title: `${product.name} Price in Vasant Kunj | ${formattedPrice}`,
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

      <div className="bg-slate-50/50 min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-1.5 text-xs text-slate-500 overflow-x-auto py-1">
            <Link href="/" className="hover:text-brand-blue shrink-0">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <Link href="/electronics" className="hover:text-brand-blue shrink-0">
              Electronics
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <Link
              href={`/electronics?category=${product.category}`}
              className="hover:text-brand-blue capitalize shrink-0"
            >
              {product.category.replace('-', ' ')}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="text-slate-800 font-semibold truncate max-w-xs">{product.name}</span>
          </nav>

          {/* Main Product Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left: Gallery */}
            <div className="lg:col-span-7">
              <ProductGallery images={images} productName={product.name} />

              {/* Showroom Verification Note */}
              <div className="mt-6 p-4 rounded-2xl bg-white border border-slate-200/90 shadow-subtle flex items-start gap-3">
                <Building2 className="w-5 h-5 text-brand-blue shrink-0 mt-0.5" />
                <div className="text-xs text-slate-600 space-y-1">
                  <p className="font-bold text-slate-900">
                    Physical Showroom Display &amp; Instant Arrangement
                  </p>
                  <p>
                    This product is available at our 5-floor Masoodpur showroom or can be procured within 24 hours directly from authorized brand distributors.
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Pricing, Specs & CTAs */}
            <div className="lg:col-span-5 space-y-6">
              {/* Product Header */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-subtle space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-blue-50 text-brand-blue font-bold text-xs uppercase tracking-wider">
                    {product.brand}
                  </span>
                  <span className="font-mono text-xs text-slate-500">
                    Model: {product.modelNumber}
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-black text-brand-navy leading-snug">
                  {product.name}
                </h1>

                {/* Pricing Box */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                        Our Showroom Price
                      </span>
                      <div className="flex items-baseline gap-2.5">
                        <span className="text-3xl font-black text-brand-navy">
                          {formatINR(product.ourPrice)}
                        </span>
                        {product.mrpPrice > product.ourPrice && (
                          <span className="text-sm text-slate-400 line-through">
                            MRP {formatINR(product.mrpPrice)}
                          </span>
                        )}
                      </div>
                    </div>

                    {hasSavings && (
                      <span className="px-3 py-1 rounded-xl bg-emerald-600 text-white font-bold text-xs shadow-sm">
                        Save {formatINR(savingsAmount)} ({discountPercent}% OFF)
                      </span>
                    )}
                  </div>

                  <p className="text-[11px] text-slate-500">
                    *Taxes included. Additional competitive savings available on selected cash/store pickup purchases.
                  </p>
                </div>

                {/* Prominent Lead Generation Actions */}
                <div className="space-y-3 pt-2">
                  <div className="space-y-1">
                    <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-brand-blue" />
                      <span>Get Our Best Price</span>
                    </h3>
                    <p className="text-xs text-slate-500">
                      Found a price online? Send us a screenshot or model name on WhatsApp for a competitive counter-quote.
                    </p>
                  </div>

                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-4 px-6 rounded-2xl bg-brand-whatsapp hover:bg-brand-whatsappHover text-white font-extrabold text-base flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
                  >
                    <MessageCircle className="w-5 h-5 fill-white text-brand-whatsapp" />
                    <span>Enquire on WhatsApp</span>
                  </a>

                  <a
                    href={`tel:${SITE_CONFIG.phone}`}
                    className="w-full py-3 px-6 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm flex items-center justify-center gap-2 transition-colors border border-slate-200"
                  >
                    <Phone className="w-4 h-4 text-brand-blue" />
                    <span>Call Showroom: {SITE_CONFIG.phone}</span>
                  </a>
                </div>

                {/* Assurance points */}
                <div className="pt-4 border-t border-slate-100 grid grid-cols-2 gap-3 text-xs text-slate-600">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Brand Warranty</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Truck className="w-4 h-4 text-brand-blue shrink-0" />
                    <span>Fast Delhi NCR Delivery</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Building2 className="w-4 h-4 text-indigo-600 shrink-0" />
                    <span>5-Floor Showroom</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>Sealed Box Guarantee</span>
                  </div>
                </div>
              </div>

              {/* Showroom Visit Box */}
              <div className="bg-brand-navy text-white p-5 rounded-3xl space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-white">Prefer to see it in person?</h4>
                    <p className="text-xs text-slate-300 mt-0.5">
                      Visit our showroom at Masoodpur Dairy, Vasant Kunj. Open daily 10 AM – 9 PM with lift access.
                    </p>
                  </div>
                </div>
                <a
                  href={SITE_CONFIG.googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center justify-center gap-1.5 border border-white/10 transition-colors"
                >
                  <span>Open Directions in Google Maps</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Description & Technical Specifications Section */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-subtle p-6 sm:p-8 space-y-8">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-brand-navy mb-3">
                Product Overview
              </h2>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed max-w-4xl">
                {product.description}
              </p>
            </div>

            {/* Specifications Table */}
            {product.specifications && Object.keys(product.specifications).length > 0 && (
              <div>
                <h3 className="text-lg font-bold text-brand-navy mb-4">
                  Technical Specifications
                </h3>
                <div className="border border-slate-200 rounded-2xl overflow-hidden divide-y divide-slate-100">
                  {Object.entries(product.specifications).map(([key, value], idx) => (
                    <div
                      key={key}
                      className={`grid grid-cols-1 sm:grid-cols-3 p-3.5 text-xs sm:text-sm ${
                        idx % 2 === 0 ? 'bg-slate-50/70' : 'bg-white'
                      }`}
                    >
                      <span className="font-semibold text-slate-600 sm:col-span-1">{key}</span>
                      <span className="text-slate-900 sm:col-span-2 font-medium mt-1 sm:mt-0">
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
            <div className="space-y-6 pt-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-black text-brand-navy tracking-tight">
                  Related {product.category.replace('-', ' ')}
                </h2>
                <Link
                  href={`/electronics?category=${product.category}`}
                  className="text-xs sm:text-sm font-bold text-brand-blue hover:underline flex items-center gap-1"
                >
                  <span>View All in {product.category.replace('-', ' ')}</span>
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
