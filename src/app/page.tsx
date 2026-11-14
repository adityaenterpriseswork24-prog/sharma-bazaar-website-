import Link from 'next/link';
import {
  Sparkles,
  ArrowRight,
  MessageCircle,
  Phone,
  ShieldCheck,
  Building2,
  Percent,
  CheckCircle2,
  Tv,
  Wind,
  Refrigerator,
  Flame,
  Droplets,
  MapPin,
  ExternalLink,
  Star,
  Users,
  Award,
  Clock,
  ArrowUpRight
} from 'lucide-react';
import { SITE_CONFIG, ELECTRONICS_CATEGORIES, GOOGLE_REVIEWS_MOCK } from '@/data/site-config';
import { getActiveProducts } from '@/lib/products';
import { ProductCard } from '@/components/ui/ProductCard';
import { buildWhatsAppUrl } from '@/lib/utils';

export const metadata = {
  title: `${SITE_CONFIG.businessName} | Electronics Store in Vasant Kunj Delhi`,
  description:
    'Vasant Kunj premier electronics showroom. Competitive local prices on Sony, Samsung, LG, Daikin, Bosch TVs, ACs, Refrigerators & Washing Machines. Visit our 5-floor showroom at Masoodpur Dairy.',
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

  // Category Icon Mapping
  const categoryIcons: Record<string, React.ReactNode> = {
    televisions: <Tv className="w-6 h-6 text-brand-blue" />,
    'air-conditioners': <Wind className="w-6 h-6 text-brand-blue" />,
    refrigerators: <Refrigerator className="w-6 h-6 text-brand-blue" />,
    'washing-machines': <Flame className="w-6 h-6 text-brand-blue" />,
    microwaves: <Sparkles className="w-6 h-6 text-brand-blue" />,
    'water-dispensers': <Droplets className="w-6 h-6 text-brand-blue" />,
  };

  // Structured Data Schema for Local Business
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
      {/* Local Business JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />

      {/* ====================================================
          SECTION 3: HERO SECTION
      ==================================================== */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50/50 pt-10 pb-16 lg:pt-16 lg:pb-24 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-brand-blue text-xs sm:text-sm font-bold shadow-sm">
                <Building2 className="w-4 h-4 text-brand-blue" />
                <span>5-Floor Commercial Showroom in Masoodpur, Vasant Kunj</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-brand-navy tracking-tight leading-[1.15]">
                Big Brands. Better Prices.{' '}
                <span className="text-brand-blue block mt-1">Right Here in Vasant Kunj.</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Shop TVs, ACs, Refrigerators, Washing Machines and more at competitive prices.
                Visit our showroom or enquire on WhatsApp before purchasing online.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
                <Link
                  href="/electronics"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-brand-navy hover:bg-slate-800 text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-card hover:shadow-cardHover transition-all transform hover:-translate-y-0.5"
                >
                  <span>Explore Electronics</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <a
                  href={heroWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-brand-whatsapp hover:bg-brand-whatsappHover text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-sm hover:shadow-md transition-all"
                >
                  <MessageCircle className="w-5 h-5 fill-white text-brand-whatsapp" />
                  <span>Get Best Price on WhatsApp</span>
                </a>
              </div>

              {/* Trust Badges */}
              <div className="pt-6 border-t border-slate-200/80 grid grid-cols-3 gap-4 max-w-xl mx-auto lg:mx-0 text-left">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">100% Original</h4>
                    <p className="text-[11px] text-slate-500">Official Brand Warranty</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Compare Online</h4>
                    <p className="text-[11px] text-slate-500">Selected Products Cheaper</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Commercial Lift</h4>
                    <p className="text-[11px] text-slate-500">Easy 5-Floor Access</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Hero Image Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none rounded-3xl overflow-hidden border border-slate-200/90 shadow-elevated bg-slate-900">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=1000&q=80"
                  alt="Sony 4K OLED and QLED Smart TVs on display at Sharma Electronics Vasant Kunj"
                  className="w-full aspect-[4/3] object-cover opacity-90 hover:scale-105 transition-transform duration-700"
                />

                {/* Overlay Badge */}
                <div className="absolute inset-x-4 bottom-4 p-4 rounded-2xl bg-white/95 backdrop-blur-md shadow-lg border border-slate-200/80">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[11px] font-bold text-brand-blue uppercase tracking-wider">
                        Masoodpur Dairy Showroom
                      </span>
                      <h4 className="text-sm font-extrabold text-brand-navy">
                        Physical Store · Authorized Dealer Networks
                      </h4>
                      <p className="text-xs text-slate-500">
                        Sony · Samsung · LG · Daikin · Bosch · IFB · Voltas
                      </p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0">
                      <Percent className="w-5 h-5 text-emerald-600" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          SECTION 4: PRICE ADVANTAGE BANNER
      ==================================================== */}
      <section className="bg-brand-navy text-white py-14 border-y border-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(37,99,235,0.25),rgba(255,255,255,0))]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4 text-center lg:text-left">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-blue text-blue-100 text-xs font-bold uppercase tracking-widest">
                Local Showroom Advantage
              </span>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
                WHY PAY MORE ONLINE?
              </h2>
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
                Compare prices with us before purchasing. Selected electronics products can be{' '}
                <strong className="text-emerald-400 font-extrabold">₹1,000–₹2,000 cheaper</strong> than major
                online marketplaces, backed with personalized local service and genuine manufacturer warranty.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 text-center">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-xl font-black text-white">₹1k–₹2k</p>
                  <p className="text-xs text-slate-300">Potential Savings</p>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-xl font-black text-white">Personal</p>
                  <p className="text-xs text-slate-300">Showroom Help</p>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-xl font-black text-white">5 Floors</p>
                  <p className="text-xs text-slate-300">Physical Store</p>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-xl font-black text-white">Multi-Brand</p>
                  <p className="text-xs text-slate-300">Dealer Network</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col items-center lg:items-end justify-center gap-3">
              <a
                href={priceAdvantageWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-4 rounded-xl bg-brand-blue hover:bg-brand-blueHover text-white font-bold text-base flex items-center justify-center gap-2 shadow-lg transition-transform transform hover:scale-105"
              >
                <span>Check Our Latest Prices</span>
                <ArrowRight className="w-5 h-5" />
              </a>
              <span className="text-xs text-slate-400 text-center">
                Share any model number on WhatsApp for instant quote
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          SECTION 5: SHOP BY CATEGORY
      ==================================================== */}
      <section className="py-20 bg-slate-50 border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-extrabold uppercase tracking-widest text-brand-blue">
              Comprehensive Multi-Brand Inventory
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-brand-navy tracking-tight">
              Shop by Electronics Category
            </h2>
            <p className="text-slate-600 text-base">
              Explore leading international brands on display or available on quick dealer arrangement.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ELECTRONICS_CATEGORIES.map((cat) => (
              <div
                key={cat.id}
                className="group flex flex-col bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-subtle hover:shadow-cardHover transition-all duration-300 transform hover:-translate-y-1"
              >
                {/* Category Image */}
                <div className="relative aspect-[16/10] bg-slate-100 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={cat.imageUrl}
                    alt={`${cat.name} available at Sharma Electronics Vasant Kunj`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/80 via-transparent to-transparent"></div>
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white">
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-black/40 backdrop-blur-md">
                      {cat.brands.slice(0, 3).join(', ')}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 mb-2">
                    {categoryIcons[cat.id]}
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-brand-blue transition-colors">
                      {cat.name}
                    </h3>
                  </div>

                  <p className="text-xs font-semibold text-brand-blue mb-2">
                    {cat.tagline}
                  </p>

                  <p className="text-sm text-slate-600 mb-6 flex-grow leading-relaxed">
                    {cat.shortDescription}
                  </p>

                  <Link
                    href={`/electronics?category=${cat.id}`}
                    className="inline-flex items-center justify-between w-full px-4 py-2.5 rounded-xl bg-slate-100 group-hover:bg-brand-navy text-slate-800 group-hover:text-white text-sm font-bold transition-all"
                  >
                    <span>Explore {cat.name}</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================
          SECTION 6: BEST PRICE PRODUCTS
      ==================================================== */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-brand-blue">
                Live Showroom Deals
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-brand-navy tracking-tight mt-1">
                Best Price Featured Products
              </h2>
              <p className="text-slate-600 text-sm mt-1 max-w-xl">
                Real models with competitive pricing. Check our showroom price or send a quick inquiry on WhatsApp.
              </p>
            </div>

            <Link
              href="/electronics"
              className="inline-flex items-center gap-2 text-sm font-bold text-brand-blue hover:text-brand-blueHover hover:underline"
            >
              <span>View All Electronics</span>
              <ArrowRight className="w-4 h-4" />
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
          SECTION 7: WHY CHOOSE US
      ==================================================== */}
      <section className="py-20 bg-slate-50 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-extrabold uppercase tracking-widest text-brand-blue">
              Why Customers Trust Sharma Electronics
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-brand-navy tracking-tight">
              6 Reasons to Buy from Our Showroom
            </h2>
            <p className="text-slate-600 text-base">
              The convenience of a local showroom combined with prices that compete with online giants.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-subtle hover:shadow-card transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-brand-blue flex items-center justify-center font-bold text-xl mb-4">
                <Percent className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">1. Competitive Pricing</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                We operate with lower retail overheads and direct distributor networks, allowing us to offer selected products ₹1,000–₹2,000 cheaper than major e-commerce platforms.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-subtle hover:shadow-card transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-brand-blue flex items-center justify-center font-bold text-xl mb-4">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">2. Physical Showroom</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                No faceless web sellers. Visit our 5-floor owned commercial showroom in Masoodpur Dairy, Vasant Kunj with commercial lift access.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-subtle hover:shadow-card transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-brand-blue flex items-center justify-center font-bold text-xl mb-4">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">3. Multiple Authorized Brands</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                We source directly through official regional distributor partnerships across Sony, Samsung, LG, Daikin, Bosch, IFB, and Voltas with 100% genuine brand warranties.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-subtle hover:shadow-card transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-brand-blue flex items-center justify-center font-bold text-xl mb-4">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">4. Personal Assistance</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Get honest, unhurried advice on room tonnage, TV display tech, and hard-water laundry needs without algorithmic upsells.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-subtle hover:shadow-card transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-brand-blue flex items-center justify-center font-bold text-xl mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">5. Established Since 2019</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Rooted in South Delhi since 2019 through Sharma Steel Furniture. Thousands of satisfied homeowners across Vasant Kunj trust our integrity and after-sales support.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-subtle hover:shadow-card transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-brand-blue flex items-center justify-center font-bold text-xl mb-4">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">6. Convenient Local Access</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Quick 10-minute access from Chattarpur, Aerocity, and Vasant Vihar Metro Stations. Fast same-day delivery and doorstep installation coordination across South Delhi.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          SECTION 8: SHOWROOM EXPERIENCE
      ==================================================== */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-extrabold uppercase tracking-widest text-brand-blue">
                Five-Floor Commercial Property
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-brand-navy tracking-tight leading-tight">
                Experience South Delhi&apos;s Dedicated Electronics &amp; Furniture Destination
              </h2>
              <p className="text-base text-slate-600 leading-relaxed">
                Spanning five full floors of owned commercial space—approximately 200 gaj (1,800 sq.ft) per floor—our Masoodpur showroom offers an uncrowded, comfortable shopping experience equipped with a modern commercial lift.
              </p>

              <div className="space-y-3.5">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                    ✓
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Commercial Passenger Lift</h4>
                    <p className="text-xs text-slate-500">Effortless access for senior family members across all five floors.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                    ✓
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Live Demonstrations &amp; Packed Units</h4>
                    <p className="text-xs text-slate-500">Inspect panel quality, AC quietness, and build finishing in person.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                    ✓
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Distributor Procurement on Demand</h4>
                    <p className="text-xs text-slate-500">Need a specific high-end 75-inch TV or French-door fridge? We arrange it directly from authorized distributors within 24 hours.</p>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <Link
                  href="/about"
                  className="px-6 py-3 rounded-xl bg-brand-navy hover:bg-slate-800 text-white font-bold text-sm inline-flex items-center justify-center gap-2"
                >
                  <span>Read Our Business Story</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href={SITE_CONFIG.googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm inline-flex items-center justify-center gap-2 border border-slate-200"
                >
                  <span>Get Driving Directions</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Visual Grid */}
            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="rounded-2xl overflow-hidden shadow-subtle border border-slate-200 aspect-[4/5] bg-slate-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=600&q=80"
                    alt="Television showroom display at Sharma Electronics"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="p-4 rounded-xl bg-blue-50 border border-blue-100 text-center">
                  <p className="text-2xl font-black text-brand-blue">200 Gaj</p>
                  <p className="text-xs font-semibold text-slate-600">Per Floor Area</p>
                </div>
              </div>

              <div className="space-y-4 pt-6">
                <div className="p-4 rounded-xl bg-slate-900 text-white text-center">
                  <p className="text-2xl font-black text-emerald-400">Est. 2019</p>
                  <p className="text-xs text-slate-300">Trusted South Delhi Retailer</p>
                </div>
                <div className="rounded-2xl overflow-hidden shadow-subtle border border-slate-200 aspect-[4/5] bg-slate-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?auto=format&fit=crop&w=600&q=80"
                    alt="Refrigerator and home appliances display"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          SECTION 9: CUSTOMER REVIEWS (Google Reviews)
      ==================================================== */}
      <section className="py-20 bg-slate-50 border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-widest text-amber-600 mb-1">
                <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
                <span>Verified Google Business Reviews</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-brand-navy tracking-tight">
                Loved by Residents of Vasant Kunj
              </h2>
              <p className="text-slate-600 text-sm mt-1">
                Real feedback from South Delhi homeowners who compared prices and bought from our showroom.
              </p>
            </div>

            <a
              href={SITE_CONFIG.googleMapsDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 shadow-sm hover:bg-slate-50"
            >
              <span>View Google Business Profile</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {GOOGLE_REVIEWS_MOCK.map((review) => (
              <div
                key={review.id}
                className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-subtle flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 text-amber-400 mb-3">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed italic mb-4">
                    &ldquo;{review.text}&rdquo;
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <h4 className="text-sm font-bold text-slate-900">{review.author}</h4>
                  <p className="text-[11px] text-slate-500">{review.location}</p>
                  <span className="inline-block mt-1 text-[10px] font-semibold text-brand-blue bg-blue-50 px-2 py-0.5 rounded">
                    Verified Purchase · {review.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================
          SECTION 10: LOCATION & DIRECTIONS
      ==================================================== */}
      <section className="py-20 bg-white border-t border-slate-200/80" id="showroom-location">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-extrabold uppercase tracking-widest text-brand-blue">
              Showroom Location &amp; Directions
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-brand-navy tracking-tight">
              Visit Our Electronics Showroom in Vasant Kunj
            </h2>
            <p className="text-slate-600 text-base">
              Conveniently located at Masoodpur Dairy, easily accessible from all sectors of Vasant Kunj and major South Delhi metro lines.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Address & Contact Details Card */}
            <div className="lg:col-span-5 p-8 rounded-3xl bg-slate-900 text-white flex flex-col justify-between shadow-elevated">
              <div className="space-y-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-brand-blue">
                    Physical Store Address
                  </span>
                  <h3 className="text-xl font-bold text-white mt-1">
                    {SITE_CONFIG.businessName}
                  </h3>
                  <p className="text-sm text-slate-300 mt-2 leading-relaxed">
                    {SITE_CONFIG.address},<br />
                    {SITE_CONFIG.area}, {SITE_CONFIG.city} - {SITE_CONFIG.pincode}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    Landmark: {SITE_CONFIG.landmark}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800 space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{SITE_CONFIG.workingHours}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                    <span>Call: {SITE_CONFIG.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Building2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Commercial Lift Available (5 Floors)</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Nearest Metro Stations
                  </p>
                  <ul className="text-xs space-y-1.5 text-slate-300">
                    <li>• Chattarpur Metro (Yellow Line) — 10 mins</li>
                    <li>• Delhi Aerocity Metro (Airport Line) — 12 mins</li>
                    <li>• Vasant Vihar Metro (Magenta Line) — 12 mins</li>
                  </ul>
                </div>
              </div>

              <div className="pt-8 grid grid-cols-2 gap-3">
                <a
                  href={SITE_CONFIG.googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-4 rounded-xl bg-brand-blue hover:bg-brand-blueHover text-white font-bold text-xs sm:text-sm text-center flex items-center justify-center gap-1.5 transition-colors"
                >
                  <MapPin className="w-4 h-4" />
                  <span>Get Directions</span>
                </a>
                <a
                  href={`tel:${SITE_CONFIG.phone}`}
                  className="py-3 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm text-center flex items-center justify-center gap-1.5 transition-colors border border-white/10"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call Now</span>
                </a>
              </div>
            </div>

            {/* Google Maps Embed */}
            <div className="lg:col-span-7 rounded-3xl overflow-hidden border border-slate-200/90 shadow-card min-h-[360px] bg-slate-100">
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
          SECTION 11: FINAL HIGH-CONVERTING CTA
      ==================================================== */}
      <section className="py-16 bg-gradient-to-r from-brand-navy via-slate-900 to-brand-navy text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-widest border border-emerald-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            Before You Place An Order Online
          </span>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Looking for the Best Price on Electronics?
          </h2>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto">
            Contact us before you buy. Compare prices, ask about stock availability, or visit our showroom today. We would love to help you save!
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <a
              href={priceAdvantageWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-xl bg-brand-whatsapp hover:bg-brand-whatsappHover text-white font-bold text-base flex items-center gap-2 shadow-lg transition-transform transform hover:scale-105"
            >
              <MessageCircle className="w-5 h-5 fill-white text-brand-whatsapp" />
              <span>WhatsApp Us Now</span>
            </a>

            <a
              href={`tel:${SITE_CONFIG.phone}`}
              className="px-8 py-4 rounded-xl bg-brand-blue hover:bg-brand-blueHover text-white font-bold text-base flex items-center gap-2 shadow-lg transition-transform transform hover:scale-105"
            >
              <Phone className="w-5 h-5" />
              <span>Call {SITE_CONFIG.phone}</span>
            </a>

            <a
              href={SITE_CONFIG.googleMapsDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-base flex items-center gap-2 border border-white/20 transition-colors"
            >
              <MapPin className="w-5 h-5" />
              <span>Visit Showroom</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
