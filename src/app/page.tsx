import Link from 'next/link';
import Image from 'next/image';
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
import { SOUTH_DELHI_LOCALITIES } from '@/data/locations';
import { getHomepageShowcaseProducts } from '@/lib/products';
import { FeaturedShowcaseSection } from '@/components/home/FeaturedShowcaseSection';
import { ReviewsMarquee } from '@/components/home/ReviewsMarquee';
import { buildWhatsAppUrl } from '@/lib/utils';

export const metadata = {
  title: 'Electronics Store Vasant Kunj | Sharma Bazaar Showroom',
  description:
    'Premier electronics store in Vasant Kunj, Delhi. Beat Amazon & Flipkart prices on Sony 4K TVs, Daikin ACs, fridges & washers with authentic brand warranty.',
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
    'electronics cheaper than amazon delhi',
    'tv price cheaper than flipkart delhi',
    'beat amazon price electronics delhi',
    'tv store vasant kunj',
    'ac dealer vasant kunj',
    'fridge store vasant kunj',
    'washing machine store vasant kunj',
    'electronics store near me',
  ],
  alternates: {
    canonical: 'https://www.sharmabazaar.com',
  },
};

export default async function HomePage() {
  const featuredProducts = await getHomepageShowcaseProducts();

  const heroWhatsAppUrl = buildWhatsAppUrl(
    SITE_CONFIG.whatsapp,
    `Hi Sharma Bazaar, I visited your website and would like to compare online prices for electronics before buying.`
  );

  const priceAdvantageWhatsAppUrl = buildWhatsAppUrl(
    SITE_CONFIG.whatsapp,
    `Hi Sharma Bazaar, I have an online price quote for an electronic product. Can you share your best local showroom price?`
  );

  // AEO & Local Search FAQs
  const homeFaqs = [
    {
      q: 'Where is the best electronics store in Vasant Kunj, South Delhi?',
      a: 'Sharma Bazaar is located at Dairy Farm, 80-B, Masoodpur, G/F, Vasant Kunj, New Delhi, Delhi 110070 (opposite Masoodpur flyover). Established in 2019, we are an authorized multi-brand electronics showroom for Sony, Samsung, LG, Daikin, Bosch, IFB, and Voltas with live demonstration units and direct distributor pricing.',
    },
    {
      q: 'Can I buy electronics cheaper than Amazon and Flipkart in Delhi?',
      a: 'Yes. Sharma Bazaar offers highly competitive showroom counter-quotes, allowing customers to save up to ₹1,000 to ₹5,000 on selected 4K smart TVs, inverter split ACs, frost-free refrigerators, and washing machines compared to online portals, complete with original brand GST tax invoices and manufacturer warranties.',
    },
    {
      q: 'How can I reach Sharma Bazaar from Vasant Kunj Metro or Nelson Mandela Marg?',
      a: 'Our showroom is situated at Dairy Farm, 80-B, Masoodpur, G/F, Vasant Kunj, just 8 to 12 minutes from Chattarpur Metro Station (Yellow Line), Delhi Aerocity Metro (Airport Express), and Vasant Vihar Metro (Magenta Line), directly accessible via Nelson Mandela Marg.',
    },
    {
      q: 'Which air conditioner brands and tonnages are available for same-day delivery?',
      a: 'We stock Daikin, Voltas, LG Dual Inverter, Hitachi, and Blue Star 1.5 Ton and 2.0 Ton 3-Star and 5-Star copper split ACs. All units come with express 2 to 6-hour same-day doorstep delivery across South Delhi and authorized brand installation coordination within 24 hours.',
    },
    {
      q: 'Do you deliver appliances to nearby areas like Mahipalpur, Dwarka, Munirka, Saket, and Vasant Vihar?',
      a: 'Yes, Sharma Bazaar provides white-glove doorstep delivery to 28 South Delhi localities, including Vasant Kunj, Mahipalpur, Dwarka, Munirka, Mehrauli, Saket, Vasant Vihar, Hauz Khas, Greater Kailash, and Defence Colony. Our 2-person delivery crew carries the appliance directly into your flat and unboxes it for seal inspection before payment.',
    },
    {
      q: 'What payment options are available upon delivery?',
      a: 'We offer zero-risk Cash on Delivery (COD) and doorstep UPI QR code scanning. You can physically verify the intact manufacturer seals, carton barcodes, and appliance condition inside your home before paying.',
    },
  ];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: homeFaqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* ====================================================
          SECTION 1: HERO (Architectural Editorial)
      ==================================================== */}
      <section className="relative bg-white pt-12 pb-16 lg:pt-20 lg:pb-24 border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-500 border border-neutral-200 px-2.5 py-1 rounded-sm">
                  Dairy Farm, 80-B, Masoodpur, G/F, Vasant Kunj
                </span>
                <span className="text-xs font-mono text-neutral-400">
                  Est. 2019
                </span>
                <span className="w-1 h-1 rounded-full bg-neutral-300 hidden sm:inline"></span>
                <span className="text-xs font-medium text-brand-navy font-sans">
                  Your Home Appliance Destination.
                </span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-brand-navy leading-[1.08]">
                Big Brands. Better Prices.{' '}
                <span className="block text-neutral-500 font-medium mt-1">
                  Right Here in South Delhi.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-neutral-600 leading-relaxed max-w-xl font-normal">
                Welcome to Sharma Bazaar, your premier consumer electronics showroom and home appliances store in Vasant Kunj, South Delhi. Located at Dairy Farm, 80-B, Masoodpur, G/F (near Vasant Kunj Metro), we offer wholesale showroom prices on 4K Smart TVs, Inverter Air Conditioners, Frost-Free Refrigerators, and Washing Machines. Compare online prices with us before you buy.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <Link
                  href="/electronics"
                  className="px-6 py-3.5 bg-brand-navy hover:bg-black text-white text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors text-center flex items-center justify-center gap-2"
                >
                  <span>Explore Products</span>
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
                  <p className="font-bold text-brand-navy mt-0.5">Physical Showroom</p>
                </div>
                <div>
                  <p className="text-neutral-400 text-[10px] uppercase tracking-wider">Demos</p>
                  <p className="font-bold text-brand-navy mt-0.5">Live Display Units</p>
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
                  <Image
                    src="/images/showroom/sharma-bazaar-showroom-interior.jpg"
                    alt="Sharma Bazaar electronics and home appliance showroom at Dairy Farm Masoodpur Vasant Kunj"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    className="object-cover"
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
                Compare prices with us before purchasing. Selected electronics products can save you{' '}
                <span className="text-white font-bold underline decoration-neutral-500">₹1,000–₹5,000</span> compared to major online portals,
                backed by verified brand warranty, doorstep white-glove delivery, and genuine store ownership.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 text-xs font-mono">
                <div className="p-3 bg-white/5 border border-white/10 rounded-sm">
                  <p className="text-neutral-400 text-[10px]">SAVINGS</p>
                  <p className="text-base font-bold text-white mt-0.5">₹1k–₹5k</p>
                </div>
                <div className="p-3 bg-white/5 border border-white/10 rounded-sm">
                  <p className="text-neutral-400 text-[10px]">ASSISTANCE</p>
                  <p className="text-base font-bold text-white mt-0.5">Personal</p>
                </div>
                <div className="p-3 bg-white/5 border border-white/10 rounded-sm">
                  <p className="text-neutral-400 text-[10px]">FACILITY</p>
                  <p className="text-base font-bold text-white mt-0.5">Physical</p>
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
              <span>View All Products</span>
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
                  <Image
                    src={cat.imageUrl}
                    alt={cat.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-102 transition-transform duration-500"
                    loading="lazy"
                  />
                  <span className="absolute bottom-2 left-3 font-mono text-[10px] text-white bg-black/60 px-2 py-0.5 rounded-sm z-10">
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
          SECTION 4: FEATURED SHOWROOM INVENTORY (Dynamic & Real-Time)
      ==================================================== */}
      <FeaturedShowcaseSection initialProducts={featuredProducts} />

      {/* ====================================================
          SECTION 5: THE PHYSICAL SHOWROOM EXPERIENCE
      ==================================================== */}
      <section className="py-20 bg-neutral-50/70 border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-5">
              <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-400">
                Physical Retail Infrastructure
              </span>
              <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-brand-navy">
                A Real Showroom Experience. Dairy Farm, 80-B, Masoodpur, G/F, Vasant Kunj.
              </h2>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Unlike online-only platforms operating without physical stock or local touchpoints, Sharma Bazaar
                welcomes you to our dedicated consumer electronics showroom at Dairy Farm, 80-B, Masoodpur, G/F, Vasant Kunj.
              </p>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Families, seniors, and homeowners can walk in and inspect active television panels,
                refrigerators, and air conditioning units under real living-room lighting before making a decision.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-4 font-mono text-xs">
                <div className="p-4 bg-white border border-neutral-200 rounded-sm">
                  <p className="text-neutral-400 text-[10px]">INSPECTION</p>
                  <p className="text-base font-bold text-brand-navy mt-1">Live Display Units</p>
                  <p className="text-neutral-500 text-[11px] mt-0.5">Test picture & sound</p>
                </div>
                <div className="p-4 bg-white border border-neutral-200 rounded-sm">
                  <p className="text-neutral-400 text-[10px]">DELIVERY</p>
                  <p className="text-base font-bold text-brand-navy mt-1">White-Glove Service</p>
                  <p className="text-neutral-500 text-[11px] mt-0.5">Direct to your doorstep</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative border border-neutral-200 p-3 bg-white rounded-sm">
                <div className="relative aspect-[4/3] bg-neutral-100 overflow-hidden">
                  <Image
                    src="/images/showroom/sharma-bazaar-showroom-interior.jpg"
                    alt="Sharma Bazaar Showroom interior display at Dairy Farm, 80-B, Masoodpur, G/F, Vasant Kunj"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="mt-3 flex items-center justify-between text-xs font-mono text-neutral-500">
                  <span>Dairy Farm, 80-B, Masoodpur, G/F</span>
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
              Why South Delhi Chooses Sharma Bazaar
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="space-y-2 border-l border-neutral-200 pl-4">
              <p className="font-mono text-[11px] text-neutral-400 uppercase">01</p>
              <h3 className="text-base font-bold text-neutral-900">Wholesale Local Pricing</h3>
              <p className="text-xs text-neutral-500 leading-relaxed">
                Direct regional dealer agreements allow customers to save ₹1,000–₹5,000 on select models compared to marketplace listings.
              </p>
            </div>

            <div className="space-y-2 border-l border-neutral-200 pl-4">
              <p className="font-mono text-[11px] text-neutral-400 uppercase">02</p>
              <h3 className="text-base font-bold text-neutral-900">Spacious Physical Showroom</h3>
              <p className="text-xs text-neutral-500 leading-relaxed">
                Dedicated retail showroom at Dairy Farm, 80-B, Masoodpur, G/F with genuine display models and courteous product specialists.
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
              <h3 className="text-base font-bold text-neutral-900">White-Glove Home Delivery</h3>
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
          SECTION 7: REVIEWS & COMMUNITY TESTIMONIALS (AUTO-SLIDING MARQUEE)
      ==================================================== */}
      <section className="py-20 bg-neutral-50/50 border-b border-neutral-200 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ReviewsMarquee reviews={GOOGLE_REVIEWS_MOCK} />
        </div>
      </section>

      {/* ====================================================
          SECTION 8: DOORSTEP DELIVERY ACROSS SOUTH DELHI
      ==================================================== */}
      <section className="py-20 bg-neutral-50/70 border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="max-w-2xl">
              <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-400">
                White-Glove Logistics Hub
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-brand-navy mt-1">
                Same-Day Doorstep Delivery Across South Delhi
              </h2>
              <p className="text-xs sm:text-sm text-neutral-600 mt-2 leading-relaxed">
                Direct dispatch from our Dairy Farm, 80-B, Masoodpur, G/F showroom. We carry appliances into your apartment, unbox to inspect seals together, and you pay only after verifying your unit.
              </p>
            </div>
            <Link
              href="/locations"
              className="px-5 py-3 bg-brand-navy hover:bg-black text-white text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors flex items-center justify-center gap-2 shadow-subtle shrink-0 font-sans"
            >
              <span>Explore All 28 Delivery Locations</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* 4 Value Pillars */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 font-mono text-xs">
            <div className="p-4 bg-white border border-neutral-200 rounded-sm">
              <span className="text-[10px] uppercase text-neutral-400 block">Dispatch Window</span>
              <span className="text-sm font-bold text-brand-navy">2 – 6 Hours</span>
              <span className="text-[10px] text-emerald-700 block mt-0.5 font-sans">Same-Day Express</span>
            </div>
            <div className="p-4 bg-white border border-neutral-200 rounded-sm">
              <span className="text-[10px] uppercase text-neutral-400 block">Carry-In Service</span>
              <span className="text-sm font-bold text-brand-navy">In-Room Flat Delivery</span>
              <span className="text-[10px] text-neutral-500 block mt-0.5 font-sans">No Gate Dumps</span>
            </div>
            <div className="p-4 bg-white border border-neutral-200 rounded-sm">
              <span className="text-[10px] uppercase text-neutral-400 block">Zero Risk</span>
              <span className="text-sm font-bold text-brand-navy">Inspect &amp; Pay</span>
              <span className="text-[10px] text-neutral-500 block mt-0.5 font-sans">Cash or UPI on Delivery</span>
            </div>
            <div className="p-4 bg-white border border-neutral-200 rounded-sm">
              <span className="text-[10px] uppercase text-neutral-400 block">Brand Installation</span>
              <span className="text-sm font-bold text-brand-navy">Within 24 Hours</span>
              <span className="text-[10px] text-neutral-500 block mt-0.5 font-sans">OEM Certified Engineers</span>
            </div>
          </div>


        </div>
      </section>

      {/* ====================================================
          SECTION 9: SHOWROOM LOCATION & TRANSIT
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
                  Located at Dairy Farm, 80-B, Masoodpur, G/F, Vasant Kunj with accessible ground-floor showroom entry and parking.
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

            <div className="lg:col-span-7 border border-neutral-200 bg-neutral-50 rounded-sm overflow-hidden flex flex-col justify-between p-6 sm:p-8 space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-sm font-semibold">
                    Open Today: 10:00 AM – 9:00 PM
                  </span>
                  <span className="text-xs font-mono text-neutral-400">
                    Opposite Masoodpur Flyover
                  </span>
                </div>

                <div className="relative aspect-[16/9] border border-neutral-200 rounded-sm overflow-hidden bg-neutral-900 group">
                  <Image
                    src="/images/showroom/sharma-bazaar-showroom-interior.jpg"
                    alt="Sharma Bazaar physical electronics showroom in Dairy Farm Masoodpur Vasant Kunj"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-4 z-10">
                    <p className="text-white text-xs font-sans">
                      Ground Floor Physical Retail Facility · Dedicated Display Zones for TVs, Refrigerators, ACs &amp; Washing Machines
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-neutral-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 text-xs">
                <Link
                  href="/contact"
                  className="px-4 py-2.5 bg-neutral-900 hover:bg-black text-white text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors text-center"
                >
                  View Metro Routes &amp; Map on Contact Page →
                </Link>

                <a
                  href={SITE_CONFIG.googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-navy hover:underline font-mono text-[11px] font-semibold text-center sm:text-right flex items-center justify-center sm:justify-end gap-1"
                >
                  <span>Open Coordinates in Google Maps</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          SECTION 9.5: STORE ENTITY & QUICK FACTS (GEO / Generative Engine Optimization)
      ==================================================== */}
      <section className="py-16 bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="max-w-3xl space-y-2">
            <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-400">
              Verified Entity Profile · South Delhi Appliance Directory
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-brand-navy">
              Sharma Bazaar at a Glance: Quick Facts & Store Summary
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600">
              Authoritative details on our Vasant Kunj showroom location, authorized brand partnerships, pricing advantage, and South Delhi doorstep delivery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div className="p-4 bg-neutral-50 border border-neutral-200 rounded-sm space-y-1">
              <span className="font-mono text-[10px] uppercase text-neutral-400 font-bold">Physical Showroom</span>
              <p className="font-semibold text-brand-navy">Dairy Farm, 80-B, Masoodpur, G/F, Vasant Kunj</p>
              <p className="text-neutral-500">New Delhi, Delhi 110070 (Opp. Masoodpur Flyover)</p>
            </div>

            <div className="p-4 bg-neutral-50 border border-neutral-200 rounded-sm space-y-1">
              <span className="font-mono text-[10px] uppercase text-neutral-400 font-bold">Phone & WhatsApp</span>
              <p className="font-semibold text-brand-navy">+91 70650 09006</p>
              <p className="text-neutral-500">Call or WhatsApp for immediate live price quotes</p>
            </div>

            <div className="p-4 bg-neutral-50 border border-neutral-200 rounded-sm space-y-1">
              <span className="font-mono text-[10px] uppercase text-neutral-400 font-bold">Authorized Brands</span>
              <p className="font-semibold text-brand-navy">Sony · Samsung · LG · Daikin</p>
              <p className="text-neutral-500">Voltas · Bosch · IFB · Blue Star</p>
            </div>

            <div className="p-4 bg-neutral-50 border border-neutral-200 rounded-sm space-y-1">
              <span className="font-mono text-[10px] uppercase text-neutral-400 font-bold">Showroom Savings</span>
              <p className="font-semibold text-brand-navy">Save ₹1,000–₹5,000</p>
              <p className="text-neutral-500">On select models vs standard retail prices</p>
            </div>

            <div className="p-4 bg-neutral-50 border border-neutral-200 rounded-sm space-y-1">
              <span className="font-mono text-[10px] uppercase text-neutral-400 font-bold">Doorstep Delivery</span>
              <p className="font-semibold text-brand-navy">Same-Day White Glove</p>
              <p className="text-neutral-500">Room carry-in across all 28 South Delhi localities</p>
            </div>

            <div className="p-4 bg-neutral-50 border border-neutral-200 rounded-sm space-y-1">
              <span className="font-mono text-[10px] uppercase text-neutral-400 font-bold">Payment & Inspection</span>
              <p className="font-semibold text-brand-navy">Zero-Risk Pay on Delivery</p>
              <p className="text-neutral-500">Inspect box seals in your flat before UPI / Cash payment</p>
            </div>

            <div className="p-4 bg-neutral-50 border border-neutral-200 rounded-sm space-y-1">
              <span className="font-mono text-[10px] uppercase text-neutral-400 font-bold">Operating Hours</span>
              <p className="font-semibold text-brand-navy">Open Daily: 10 AM – 9 PM</p>
              <p className="text-neutral-500">Open 7 days a week including Sunday & bank holidays</p>
            </div>

            <div className="p-4 bg-neutral-50 border border-neutral-200 rounded-sm space-y-1">
              <span className="font-mono text-[10px] uppercase text-neutral-400 font-bold">Warranty Assurance</span>
              <p className="font-semibold text-brand-navy">100% Brand Warranty</p>
              <p className="text-neutral-500">Official manufacturer GST invoice & brand engineer installation</p>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          SECTION 10: FREQUENTLY ASKED QUESTIONS (AEO & Local Search)
      ==================================================== */}
      <section className="py-20 bg-neutral-50/60 border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="max-w-3xl space-y-2">
            <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-400">
              Frequently Asked Questions · Vasant Kunj Electronics Showroom
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-brand-navy">
              Everything You Need to Know About Buying from Sharma Bazaar
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600">
              Clear answers on local showroom pricing, brand warranties, metro directions, and same-day South Delhi doorstep delivery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {homeFaqs.map((faq, idx) => (
              <div
                key={idx}
                className="p-6 bg-white border border-neutral-200 rounded-sm space-y-2 shadow-subtle"
              >
                <h3 className="font-bold text-brand-navy text-sm sm:text-base">{faq.q}</h3>
                <p className="text-xs text-neutral-600 leading-relaxed font-sans">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================
          SECTION 11: FINAL CONVERSION CTA
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
            Contact us before you buy. Compare prices, check showroom stock, or visit our Vasant Kunj showroom today.
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
