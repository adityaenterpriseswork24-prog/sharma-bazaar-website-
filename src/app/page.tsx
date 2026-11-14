import Link from 'next/link';
import {
  ArrowRight,
  MessageCircle,
  Phone,
  ShieldCheck,
  Building2,
  CheckCircle2,
  Tv,
  Wind,
  Refrigerator,
  Flame,
  Sparkles,
  Droplets,
  MapPin,
  Star,
  Clock,
  ArrowUpRight,
  Truck,
  RotateCcw,
  Zap,
} from 'lucide-react';
import { SITE_CONFIG, ELECTRONICS_CATEGORIES, GOOGLE_REVIEWS_MOCK } from '@/data/site-config';
import { getActiveProducts } from '@/lib/products';
import { ProductCard } from '@/components/ui/ProductCard';
import { buildWhatsAppUrl } from '@/lib/utils';

export const metadata = {
  title: `${SITE_CONFIG.businessName} | Premier Electronics Showroom Vasant Kunj`,
  description:
    'Vasant Kunj premier multi-brand consumer electronics showroom. Competitive local showroom prices on Sony, Samsung, LG, Daikin, Bosch TVs, ACs, Refrigerators and Washing Machines. 5-floor showroom at Masoodpur Dairy.',
  alternates: {
    canonical: 'https://www.sharmaelectronics.com',
  },
};

export default async function HomePage() {
  const featuredProducts = await getActiveProducts({ featuredOnly: true, limitCount: 6 });

  const heroWhatsAppUrl = buildWhatsAppUrl(
    SITE_CONFIG.whatsapp,
    `Hi Sharma Electronics, I visited your website and would like to compare online prices for electronics before buying.`
  );

  const priceAdvantageWhatsAppUrl = buildWhatsAppUrl(
    SITE_CONFIG.whatsapp,
    `Hi Sharma Electronics, I have an online price quote for an electronic product. Can you share your best local showroom price?`
  );

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'ElectronicsStore',
    name: SITE_CONFIG.businessName,
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=1200&q=80',
    telephone: SITE_CONFIG.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE_CONFIG.address,
      addressLocality: SITE_CONFIG.area,
      addressRegion: 'Delhi',
      postalCode: SITE_CONFIG.pincode,
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: SITE_CONFIG.coordinates.latitude,
      longitude: SITE_CONFIG.coordinates.longitude,
    },
    url: 'https://www.sharmaelectronics.com',
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
    priceRange: '₹₹₹',
    areaServed: [
      'Vasant Kunj',
      'Masoodpur',
      'Mahipalpur',
      'Vasant Vihar',
      'Chattarpur',
      'Munirka',
      'South Delhi',
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />

      {/* ====================================================
          SECTION 1: HERO (Architectural Editorial)
      ==================================================== */}
      <section className="relative bg-white pt-12 pb-16 lg:pt-20 lg:pb-24 border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-500 border border-neutral-200 px-2.5 py-1 rounded-sm">
                  Masoodpur Dairy · Vasant Kunj
                </span>
                <span className="text-xs font-mono text-neutral-400">
                  Est. 2019
                </span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-brand-navy leading-[1.08]">
                Big Brands. Better Prices.{' '}
                <span className="block text-neutral-500 font-medium mt-1">
                  Right Here in Vasant Kunj.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-neutral-600 leading-relaxed max-w-xl font-normal">
                Shop 4K Smart TVs, Inverter Air Conditioners, Multi-Door Refrigerators,
                and Laundry Care at competitive local showroom prices. Compare quotes with us before buying online.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <Link
                  href="/electronics"
                  className="px-6 py-3.5 bg-brand-navy hover:bg-black text-white text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors text-center flex items-center justify-center gap-2"
                >
                  <span>Explore Catalogue</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <a
                  href={heroWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 bg-brand-whatsapp hover:bg-brand-whatsappDark text-white text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors text-center flex items-center justify-center gap-2 shadow-subtle"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Get Quote on WhatsApp</span>
                </a>
              </div>

              {/* Showroom Specs Line */}
              <div className="pt-6 border-t border-neutral-100 grid grid-cols-3 gap-4 font-mono text-xs">
                <div>
                  <p className="text-neutral-400 text-[10px] uppercase tracking-wider">Facility</p>
                  <p className="font-bold text-brand-navy mt-0.5">5 Full Floors</p>
                </div>
                <div>
                  <p className="text-neutral-400 text-[10px] uppercase tracking-wider">Access</p>
                  <p className="font-bold text-brand-navy mt-0.5">Commercial Lift</p>
                </div>
                <div>
                  <p className="text-neutral-400 text-[10px] uppercase tracking-wider">Warranty</p>
                  <p className="font-bold text-brand-navy mt-0.5">100% Brand Seal</p>
                </div>
              </div>
            </div>

            {/* Right Hero Image Frame */}
            <div className="lg:col-span-5">
              <div className="relative border border-neutral-200 bg-neutral-50 p-4 sm:p-6 rounded-sm">
                <div className="relative aspect-[4/3] bg-white border border-neutral-200/80 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=1000&q=80"
                    alt="Premium 4K Smart TV display at Sharma Electronics showroom Vasant Kunj"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="mt-4 pt-3 border-t border-neutral-200/80 flex items-center justify-between text-xs font-mono text-neutral-500">
                  <span>Authorised Distributor Dealer</span>
                  <span className="text-neutral-900 font-semibold">Sony · Samsung · LG · Daikin</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          SECTION 2: WHY PAY MORE ONLINE? (Editorial Statement)
      ==================================================== */}
      <section className="bg-brand-navy text-white py-14 sm:py-20 border-b border-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-400">
                The Local Showroom Advantage
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
                WHY PAY MORE ONLINE?
              </h2>
              <p className="text-neutral-300 text-sm sm:text-base leading-relaxed max-w-2xl">
                Compare prices with us before purchasing. Selected electronics products can be{' '}
                <span className="text-white font-bold underline decoration-neutral-500">₹1,000–₹2,000 cheaper</span> than major online portals,
                backed by verified brand warranty, doorstep floor delivery, and genuine store ownership.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 text-xs font-mono">
                <div className="p-3 bg-white/5 border border-white/10 rounded-sm">
                  <p className="text-neutral-400 text-[10px]">SAVINGS</p>
                  <p className="text-base font-bold text-white mt-0.5">₹1k–₹2k</p>
                </div>
                <div className="p-3 bg-white/5 border border-white/10 rounded-sm">
                  <p className="text-neutral-400 text-[10px]">ASSISTANCE</p>
                  <p className="text-base font-bold text-white mt-0.5">Personal</p>
                </div>
                <div className="p-3 bg-white/5 border border-white/10 rounded-sm">
                  <p className="text-neutral-400 text-[10px]">FACILITY</p>
                  <p className="text-base font-bold text-white mt-0.5">5 Floors</p>
                </div>
                <div className="p-3 bg-white/5 border border-white/10 rounded-sm">
                  <p className="text-neutral-400 text-[10px]">SOURCING</p>
                  <p className="text-base font-bold text-white mt-0.5">Authorized</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col items-start lg:items-end gap-3">
              <a
                href={priceAdvantageWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-4 bg-white text-brand-navy hover:bg-neutral-100 text-xs font-bold uppercase tracking-wider rounded-sm transition-colors text-center flex items-center justify-center gap-2"
              >
                <span>Check Our Latest Prices</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
              <span className="text-[11px] font-mono text-neutral-400">
                Send any model number or screenshot
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          SECTION 3: SHOP BY CATEGORY (Curated Directory)
      ==================================================== */}
      <section className="py-20 bg-neutral-50/50 border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-400">
                Department Directory
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-brand-navy mt-1">
                Shop by Electronics Category
              </h2>
            </div>
            <Link
              href="/electronics"
              className="text-xs font-mono font-semibold uppercase tracking-wider text-brand-navy hover:underline flex items-center gap-1.5"
            >
              <span>View All Catalogue</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ELECTRONICS_CATEGORIES.map((cat) => (
              <div
                key={cat.id}
                className="group flex flex-col bg-white border border-neutral-200 rounded-sm overflow-hidden hover:border-brand-navy transition-colors"
              >
                <div className="relative aspect-[16/10] bg-neutral-100 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={cat.imageUrl}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                    loading="lazy"
                  />
                  <span className="absolute bottom-2 left-3 font-mono text-[10px] text-white bg-black/60 px-2 py-0.5 rounded-sm">
                    {cat.brands.slice(0, 3).join(' · ')}
                  </span>
                </div>

                <div className="p-5 flex flex-col flex-grow space-y-2">
                  <h3 className="text-lg font-bold text-neutral-900 group-hover:text-brand-navy">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-neutral-500 leading-relaxed line-clamp-2">
                    {cat.shortDescription}
                  </p>

                  <div className="mt-auto pt-4 border-t border-neutral-100">
                    <Link
                      href={`/electronics?category=${cat.id}`}
                      className="inline-flex items-center justify-between w-full text-xs font-semibold uppercase tracking-wider text-brand-navy hover:underline"
                    >
                      <span>Explore Collection</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================
          SECTION 4: FEATURED SHOWROOM INVENTORY
      ==================================================== */}
      <section className="py-20 bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-400">
                Verified Inventory
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-brand-navy mt-1">
                Featured Showroom Models
              </h2>
            </div>
            <Link
              href="/electronics"
              className="text-xs font-mono font-semibold uppercase tracking-wider text-brand-navy hover:underline flex items-center gap-1.5"
            >
              <span>Explore All Models</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================
          SECTION 5: THE 5-FLOOR COMMERCIAL SHOWROOM
      ==================================================== */}
      <section className="py-20 bg-neutral-50/70 border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-5">
              <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-400">
                Physical Retail Infrastructure
              </span>
              <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-brand-navy">
                Five Floors. Owned Commercial Property. Masoodpur Dairy.
              </h2>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Unlike online brokers operating without physical locations, Sharma Electronics
                operates from our owned commercial showroom spanning five floors (~200 Gaj per floor).
              </p>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Families, seniors, and homeowners can walk in and inspect active television panels,
                refrigerators, and air conditioning units. Our commercial passenger lift makes every display floor accessible without stairs.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-4 font-mono text-xs">
                <div className="p-4 bg-white border border-neutral-200 rounded-sm">
                  <p className="text-neutral-400 text-[10px]">FLOOR SCALE</p>
                  <p className="text-base font-bold text-brand-navy mt-1">~200 Gaj/Floor</p>
                  <p className="text-neutral-500 text-[11px] mt-0.5">Spacious displays</p>
                </div>
                <div className="p-4 bg-white border border-neutral-200 rounded-sm">
                  <p className="text-neutral-400 text-[10px]">COMMERCIAL LIFT</p>
                  <p className="text-base font-bold text-brand-navy mt-1">Full Accessibility</p>
                  <p className="text-neutral-500 text-[11px] mt-0.5">Senior-friendly</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative border border-neutral-200 p-3 bg-white rounded-sm">
                <div className="aspect-[4/3] bg-neutral-100 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=1000&q=80"
                    alt="Sharma Electronics 5-Floor Showroom at Masoodpur Dairy Vasant Kunj"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="mt-3 flex items-center justify-between text-xs font-mono text-neutral-500">
                  <span>Masoodpur Dairy, Vasant Kunj</span>
                  <span>Open Daily 10 AM – 9 PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          SECTION 6: WHY CHOOSE US (6 Trust Pillars)
      ==================================================== */}
      <section className="py-20 bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-2xl">
            <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-400">
              Showroom Standards
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-brand-navy mt-1">
              Why South Delhi Chooses Sharma Electronics
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="space-y-2 border-l border-neutral-200 pl-4">
              <p className="font-mono text-[11px] text-neutral-400 uppercase">01</p>
              <h3 className="text-base font-bold text-neutral-900">Wholesale Local Pricing</h3>
              <p className="text-xs text-neutral-500 leading-relaxed">
                Direct regional dealer agreements allow us to offer select models ₹1,000–₹2,000 cheaper than marketplace listings.
              </p>
            </div>

            <div className="space-y-2 border-l border-neutral-200 pl-4">
              <p className="font-mono text-[11px] text-neutral-400 uppercase">02</p>
              <h3 className="text-base font-bold text-neutral-900">Physical Five-Floor Showroom</h3>
              <p className="text-xs text-neutral-500 leading-relaxed">
                Owned commercial retail space at Masoodpur Dairy with commercial lift access and real display models.
              </p>
            </div>

            <div className="space-y-2 border-l border-neutral-200 pl-4">
              <p className="font-mono text-[11px] text-neutral-400 uppercase">03</p>
              <h3 className="text-base font-bold text-neutral-900">Multi-Brand Dealer Alliances</h3>
              <p className="text-xs text-neutral-500 leading-relaxed">
                Direct supply chains for Sony, Samsung, LG, Daikin, Bosch, IFB, and Voltas with authorized brand warranty.
              </p>
            </div>

            <div className="space-y-2 border-l border-neutral-200 pl-4">
              <p className="font-mono text-[11px] text-neutral-400 uppercase">04</p>
              <h3 className="text-base font-bold text-neutral-900">Dedicated Floor Lifting</h3>
              <p className="text-xs text-neutral-500 leading-relaxed">
                Showroom delivery staff brings heavy appliances directly into your flat, eliminating curbside delivery drops.
              </p>
            </div>

            <div className="space-y-2 border-l border-neutral-200 pl-4">
              <p className="font-mono text-[11px] text-neutral-400 uppercase">05</p>
              <h3 className="text-base font-bold text-neutral-900">Rooted Locally Since 2019</h3>
              <p className="text-xs text-neutral-500 leading-relaxed">
                Trusted commercial presence serving Vasant Kunj, Vasant Vihar, Chattarpur, and South Delhi households.
              </p>
            </div>

            <div className="space-y-2 border-l border-neutral-200 pl-4">
              <p className="font-mono text-[11px] text-neutral-400 uppercase">06</p>
              <h3 className="text-base font-bold text-neutral-900">24h Custom Model Sourcing</h3>
              <p className="text-xs text-neutral-500 leading-relaxed">
                If a specific capacity or flagship model is not on floor display, we arrange it from regional distributors within 24 hours.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          SECTION 7: REVIEWS & COMMUNITY TESTIMONIALS
      ==================================================== */}
      <section className="py-20 bg-neutral-50/50 border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-400">
                Verified Feedback
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-brand-navy mt-1">
                South Delhi Customer Experiences
              </h2>
            </div>
            <a
              href={SITE_CONFIG.googleMapsDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono font-semibold uppercase tracking-wider text-brand-navy hover:underline flex items-center gap-1.5"
            >
              <span>Google Business Profile</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {GOOGLE_REVIEWS_MOCK.map((review, i) => (
              <div
                key={i}
                className="p-6 bg-white border border-neutral-200 rounded-sm space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(review.rating)].map((_, idx) => (
                      <Star key={idx} className="w-3.5 h-3.5 fill-amber-500" />
                    ))}
                  </div>
                  <p className="text-xs text-neutral-600 leading-relaxed italic">
                    &ldquo;{review.text}&rdquo;
                  </p>
                </div>

                <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-[11px] font-mono text-neutral-400">
                  <span className="font-bold text-neutral-800 font-sans">{review.author}</span>
                  <span>{review.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================
          SECTION 8: SHOWROOM LOCATION & TRANSIT
      ==================================================== */}
      <section className="py-20 bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-400">
                  Directions &amp; Hours
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-brand-navy mt-1">
                  Visit Our Vasant Kunj Showroom
                </h2>
                <p className="text-xs text-neutral-500 mt-2 leading-relaxed">
                  Located conveniently on the main thoroughfare of Masoodpur Dairy, Vasant Kunj with commercial lift access.
                </p>
              </div>

              <div className="space-y-3 font-mono text-xs">
                <div className="p-3.5 bg-neutral-50 border border-neutral-200 rounded-sm">
                  <p className="text-neutral-400 text-[10px] uppercase">ADDRESS</p>
                  <p className="text-neutral-800 font-sans font-medium mt-0.5">
                    {SITE_CONFIG.address}, {SITE_CONFIG.area}, New Delhi - {SITE_CONFIG.pincode}
                  </p>
                </div>

                <div className="p-3.5 bg-neutral-50 border border-neutral-200 rounded-sm">
                  <p className="text-neutral-400 text-[10px] uppercase">TIMINGS</p>
                  <p className="text-neutral-800 font-sans font-medium mt-0.5">
                    {SITE_CONFIG.workingHours} (Open All 7 Days)
                  </p>
                </div>

                <div className="p-3.5 bg-neutral-50 border border-neutral-200 rounded-sm">
                  <p className="text-neutral-400 text-[10px] uppercase">METRO STATIONS</p>
                  <p className="text-neutral-800 text-[11px] mt-0.5">
                    Chattarpur (Yellow Line) · Aerocity (Airport Express) · Vasant Vihar (Magenta Line)
                  </p>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-3">
                <a
                  href={SITE_CONFIG.googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 bg-brand-navy hover:bg-black text-white text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors flex items-center gap-2"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Get Driving Directions</span>
                </a>

                <a
                  href={`tel:${SITE_CONFIG.phone}`}
                  className="px-5 py-3 bg-neutral-50 hover:bg-neutral-100 text-brand-navy text-xs font-mono font-semibold rounded-sm border border-neutral-200 transition-colors flex items-center gap-2"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>{SITE_CONFIG.phone}</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-7 border border-neutral-200 bg-neutral-100 rounded-sm overflow-hidden min-h-[380px]">
              <iframe
                title="Sharma Electronics Location in Masoodpur Vasant Kunj"
                src={SITE_CONFIG.googleMapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '380px' }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          SECTION 9: FINAL CONVERSION CTA
      ==================================================== */}
      <section className="bg-brand-navy text-white py-16 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-400">
            Before You Place An Order Online
          </span>

          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Looking for the Best Price on Electronics?
          </h2>

          <p className="text-sm sm:text-base text-neutral-300 max-w-xl mx-auto leading-relaxed">
            Contact us before you buy. Compare prices, check showroom stock, or visit our 5-floor facility today.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <a
              href={priceAdvantageWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 bg-brand-whatsapp hover:bg-brand-whatsappDark text-white text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors flex items-center gap-2 shadow-subtle"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>WhatsApp Store Manager</span>
            </a>

            <a
              href={`tel:${SITE_CONFIG.phone}`}
              className="px-6 py-3.5 bg-white text-brand-navy hover:bg-neutral-100 text-xs font-bold uppercase tracking-wider rounded-sm transition-colors flex items-center gap-2"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call Showroom</span>
            </a>

            <Link
              href="/contact"
              className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold uppercase tracking-wider rounded-sm border border-white/20 transition-colors"
            >
              <span>Visit Showroom</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
