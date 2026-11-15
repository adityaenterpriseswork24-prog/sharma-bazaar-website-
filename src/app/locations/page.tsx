import { Metadata } from 'next';
import Link from 'next/link';
import {
  Truck,
  ShieldCheck,
  Clock,
  MapPin,
  CheckCircle2,
  XCircle,
  Phone,
  MessageCircle,
  PackageCheck,
  Wrench,
  Sparkles,
} from 'lucide-react';
import { SOUTH_DELHI_LOCALITIES } from '@/data/locations';
import { SITE_CONFIG } from '@/data/site-config';
import { buildWhatsAppUrl } from '@/lib/utils';
import { LocalityFilterGrid } from '@/components/locations/LocalityFilterGrid';

export const metadata: Metadata = {
  title: 'Same-Day Doorstep Appliance Delivery in South Delhi | Sharma Bazaar',
  description:
    'White-glove home appliance doorstep delivery across South Delhi. 2–6 hr same-day delivery to Vasant Kunj, Chattarpur, Mahipalpur, Vasant Vihar, Saket & Hauz Khas. Room carry-in, COD & seal check.',
  alternates: {
    canonical: 'https://www.sharmabazaar.com/locations',
  },
  openGraph: {
    title: 'Same-Day Doorstep Appliance Delivery in South Delhi | Sharma Bazaar',
    description:
      'Order TVs, ACs, Refrigerators & Washing Machines with white-glove doorstep delivery directly from our Masoodpur Dairy showroom.',
    url: 'https://www.sharmabazaar.com/locations',
    siteName: 'Sharma Bazaar',
    type: 'website',
  },
};

export default function LocationsHubPage() {
  const masterWhatsAppUrl = buildWhatsAppUrl(
    SITE_CONFIG.whatsapp,
    `Hi Sharma Bazaar, I am on your delivery locations page and would like to check same-day doorstep delivery for my area.`
  );

  // Delivery FAQs for SEO and User Clarity
  const deliveryFaqs = [
    {
      q: 'How fast can Sharma Bazaar deliver an appliance to my South Delhi flat?',
      a: 'We offer genuine same-day delivery. For our immediate neighborhood (Vasant Kunj, Masoodpur, Kishangarh, Mehrauli), delivery typically takes 2 to 3 hours. For Chattarpur, Mahipalpur, Aerocity, Vasant Vihar, and Saket, delivery takes between 3 to 6 hours from order confirmation.',
    },
    {
      q: 'Do your delivery staff carry the appliance upstairs into my apartment?',
      a: 'Yes, absolutely. Unlike generic eCommerce couriers who often refuse to carry heavy appliances up staircases or leave boxes unattended at the society security gate, our dedicated two-person logistics team brings the appliance straight into your living room, kitchen, or balcony via lift or stairs.',
    },
    {
      q: 'Can I inspect the box and manufacturer seal before paying?',
      a: 'Yes. In fact, we insist on it! Our delivery personnel will unbox the outer carton in front of you so you can verify that the appliance is brand new, with unbroken factory seals, pristine panels, and matching serial numbers before you pay via Cash or UPI.',
    },
    {
      q: 'What if an appliance gets damaged or scratched during transit?',
      a: 'Because we operate our own delivery vehicles directly from our Masoodpur Dairy showroom, transit damages are exceedingly rare. However, if any imperfection is spotted during unboxing, you do not have to accept or pay for it. We immediately swap it with a fresh unit from our showroom stock—no tedious online return tickets or weeks of waiting.',
    },
    {
      q: 'How does installation work for Air Conditioners and Wall-Mount Televisions?',
      a: 'All installations are carried out by certified brand technicians (Daikin, LG, Samsung, Sony, Voltas, Bosch). The moment your order is dispatched, our team registers your official installation ticket with the brand, and the brand engineer visits your home within 24 to 48 hours with full warranty documentation.',
    },
  ];

  // Schema.org JSON-LD structured data for Google Local Ranking
  const locationsJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'DeliveryService',
    name: 'Sharma Bazaar South Delhi Appliance Doorstep Delivery',
    provider: {
      '@type': 'ElectronicsStore',
      name: SITE_CONFIG.businessName,
      address: {
        '@type': 'PostalAddress',
        streetAddress: SITE_CONFIG.address,
        addressLocality: SITE_CONFIG.area,
        addressRegion: 'New Delhi',
        postalCode: SITE_CONFIG.pincode,
        addressCountry: 'IN',
      },
      telephone: SITE_CONFIG.phone,
      url: 'https://www.sharmabazaar.com',
    },
    areaServed: SOUTH_DELHI_LOCALITIES.map((loc) => ({
      '@type': 'AdministrativeArea',
      name: loc.name,
      postalCode: loc.pincodes.join(', '),
    })),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Doorstep Delivery Appliances',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Product',
            name: 'Inverter Split & Window Air Conditioners',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Product',
            name: '4K Ultra HD & OLED Smart Televisions',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Product',
            name: 'Double Door & Side-by-Side Refrigerators',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Product',
            name: 'Front Load & Top Load Washing Machines',
          },
        },
      ],
    },
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: deliveryFaqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Inject Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(locationsJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Hero Section */}
      <section className="border-b border-neutral-200 bg-neutral-50/60 py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-sm bg-brand-navy text-white text-[10px] font-mono uppercase tracking-widest">
              <Truck className="w-3 h-3 text-emerald-400" />
              <span>Same-Day White-Glove Dispatch Hub</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-brand-navy">
              Same-Day Doorstep Appliance Delivery Across South Delhi
            </h1>

            <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-normal">
              Dispatched directly from our physical showroom at{' '}
              <strong className="text-brand-navy font-semibold">
                80-B, Masoodpur Dairy, Vasant Kunj
              </strong>
              . We carry the appliance right into your flat, verify the unbroken manufacturer seal with you, and you pay only after you are 100% satisfied.
            </p>

            {/* Quick Metrics Bar */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 font-mono text-xs">
              <div className="p-3 bg-white border border-neutral-200 rounded-sm">
                <span className="text-[10px] uppercase text-neutral-400 block">Dispatch Time</span>
                <span className="text-sm font-bold text-brand-navy">2 – 6 Hours</span>
                <span className="text-[10px] text-emerald-700 block mt-0.5">Same-Day Express</span>
              </div>
              <div className="p-3 bg-white border border-neutral-200 rounded-sm">
                <span className="text-[10px] uppercase text-neutral-400 block">Carry-In</span>
                <span className="text-sm font-bold text-brand-navy">100% In-Room</span>
                <span className="text-[10px] text-neutral-500 block mt-0.5">No Curbside Dumps</span>
              </div>
              <div className="p-3 bg-white border border-neutral-200 rounded-sm">
                <span className="text-[10px] uppercase text-neutral-400 block">Payment</span>
                <span className="text-sm font-bold text-brand-navy">Inspect &amp; Pay</span>
                <span className="text-[10px] text-neutral-500 block mt-0.5">Cash / UPI QR</span>
              </div>
              <div className="p-3 bg-white border border-neutral-200 rounded-sm">
                <span className="text-[10px] uppercase text-neutral-400 block">Installation</span>
                <span className="text-sm font-bold text-brand-navy">Within 24 Hrs</span>
                <span className="text-[10px] text-neutral-500 block mt-0.5">OEM Brand Engineers</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
        {/* Interactive Locality Browser & Pincode Filter */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-400">
                Delivery Neighborhoods
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-brand-navy mt-1">
                Explore South Delhi Coverage Zones
              </h2>
              <p className="text-xs sm:text-sm text-neutral-600 mt-1 max-w-2xl">
                Click any neighborhood below to view specific sector coverage, average delivery transit times, and direct WhatsApp order prompts.
              </p>
            </div>
            <a
              href={masterWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-brand-whatsapp hover:bg-brand-whatsappDark rounded-sm transition-colors shadow-subtle shrink-0"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-white" />
              <span>Direct WhatsApp Dispatch Desk</span>
            </a>
          </div>

          <LocalityFilterGrid localities={SOUTH_DELHI_LOCALITIES} />
        </section>

        {/* Feature Comparison: Sharma Bazaar vs. Generic Online Marketplaces */}
        <section className="border border-neutral-200 rounded-sm overflow-hidden bg-white">
          <div className="p-6 sm:p-8 bg-neutral-900 text-white space-y-2">
            <span className="font-mono text-[10px] uppercase tracking-widest text-emerald-400">
              The Local Showroom Difference
            </span>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
              Why South Delhi Families Prefer Sharma Bazaar Over Anonymous Couriers
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 max-w-2xl">
              Buying heavy electronics shouldn&apos;t feel like a lottery with third-party delivery personnel who vanish the second the box touches the ground.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-neutral-200">
            {/* Sharma Bazaar White-Glove Standard */}
            <div className="p-6 sm:p-8 space-y-5 bg-white">
              <div className="flex items-center gap-2 text-brand-navy font-bold text-base">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>Sharma Bazaar White-Glove Delivery</span>
              </div>
              <ul className="space-y-4 text-xs text-neutral-700 font-sans">
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                  <div>
                    <strong className="text-neutral-900 block font-semibold">Same-Day 2–6 Hour Delivery:</strong>
                    Get your refrigerator or AC installed today—no waiting 4 to 7 business days for cross-country trucks.
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                  <div>
                    <strong className="text-neutral-900 block font-semibold">In-Room Placement &amp; Unboxing:</strong>
                    Our trained 2-person staff carries the unit into your living room, unboxes the carton, and takes packaging material away.
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                  <div>
                    <strong className="text-neutral-900 block font-semibold">Zero-Risk Doorstep Payment:</strong>
                    Inspect the intact manufacturer seal, panel surfaces, and bill details before paying via cash or UPI.
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                  <div>
                    <strong className="text-neutral-900 block font-semibold">Instant Local Accountability:</strong>
                    If anything is amiss, our physical showroom is located right at Masoodpur Dairy, Vasant Kunj. We swap units immediately.
                  </div>
                </li>
              </ul>
            </div>

            {/* Generic Online eCommerce Delivery */}
            <div className="p-6 sm:p-8 space-y-5 bg-neutral-50/70">
              <div className="flex items-center gap-2 text-neutral-600 font-bold text-base">
                <XCircle className="w-5 h-5 text-neutral-400 shrink-0" />
                <span>Generic Marketplace Courier Delivery</span>
              </div>
              <ul className="space-y-4 text-xs text-neutral-500 font-sans">
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-neutral-300 mt-1.5 shrink-0" />
                  <div>
                    <strong className="text-neutral-700 block font-medium">Unpredictable 4–7 Day Delays:</strong>
                    Broad multi-day delivery windows with frequent last-minute reschedules.
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-neutral-300 mt-1.5 shrink-0" />
                  <div>
                    <strong className="text-neutral-700 block font-medium">Curbside &amp; Gate Dumps:</strong>
                    Third-party logistics drivers often refuse to climb stairs or leave heavy 80kg boxes at the apartment gate.
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-neutral-300 mt-1.5 shrink-0" />
                  <div>
                    <strong className="text-neutral-700 block font-medium">Mandatory Advance Online Payment:</strong>
                    You pay upfront before even knowing if the internal screen or compressor is intact.
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-neutral-300 mt-1.5 shrink-0" />
                  <div>
                    <strong className="text-neutral-700 block font-medium">Automated Bot Return Nightmares:</strong>
                    Resolving a transit-damaged TV or dented fridge requires submitting photos to chatbots and waiting weeks for pickup.
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* 5-Step Order & White-Glove Fulfillment Journey */}
        <section className="space-y-8">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-400">
              Seamless Process
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-brand-navy mt-1">
              How Doorstep Delivery Works in 5 Simple Steps
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[
              {
                step: '01',
                title: 'Share Requirement',
                desc: 'Message us on WhatsApp or call our showroom with the model name, size, or appliance you need.',
                icon: MessageCircle,
              },
              {
                step: '02',
                title: 'Get Best Quote',
                desc: 'We check live wholesale distributor pricing and give you our lowest South Delhi quote with full GST bill.',
                icon: Sparkles,
              },
              {
                step: '03',
                title: 'Express Van Dispatch',
                desc: 'Your appliance is loaded from our Masoodpur stock and dispatched with a dedicated 2-person handling crew.',
                icon: Truck,
              },
              {
                step: '04',
                title: 'Inspect & Pay',
                desc: 'The unit is carried into your room and unboxed. You verify the pristine seals, then pay via UPI or Cash.',
                icon: PackageCheck,
              },
              {
                step: '05',
                title: 'Brand Installation',
                desc: 'Official company engineers (Daikin, Sony, LG, Samsung, Bosch) arrive within 24h for complete setup.',
                icon: Wrench,
              },
            ].map((st) => (
              <div
                key={st.step}
                className="p-5 bg-white border border-neutral-200 rounded-sm space-y-3 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-neutral-400 font-mono text-xs">
                    <span className="text-[11px] font-bold text-brand-navy bg-neutral-100 px-2 py-0.5 rounded-sm">
                      STEP {st.step}
                    </span>
                    <st.icon className="w-4 h-4 text-neutral-500" />
                  </div>
                  <h4 className="font-bold text-brand-navy text-sm mt-3">{st.title}</h4>
                  <p className="text-xs text-neutral-600 mt-1 leading-relaxed">{st.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQs on Doorstep Deliveries */}
        <section className="space-y-6 pt-4 border-t border-neutral-200">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-400">
              Frequently Asked Questions
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-brand-navy mt-1">
              South Delhi Delivery &amp; Inspection Queries
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {deliveryFaqs.map((faq, idx) => (
              <div
                key={idx}
                className="p-6 bg-neutral-50 border border-neutral-200 rounded-sm space-y-2"
              >
                <h4 className="font-bold text-brand-navy text-sm">{faq.q}</h4>
                <p className="text-xs text-neutral-600 leading-relaxed font-sans">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Direct Action Banner */}
        <section className="bg-brand-navy text-white p-8 sm:p-12 rounded-sm space-y-6">
          <div className="max-w-2xl space-y-3">
            <span className="font-mono text-[10px] uppercase tracking-widest text-emerald-400">
              Need Same-Day Appliance Delivery Today?
            </span>
            <h3 className="text-2xl sm:text-4xl font-bold tracking-tight">
              Speak Directly with Our Masoodpur Showroom Dispatcher
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
              Share any product link from Amazon, Flipkart, or Croma. We will beat or match the price, arrange rapid same-day transit, and let you inspect the box inside your home before paying.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href={masterWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 text-xs font-semibold text-white bg-brand-whatsapp hover:bg-brand-whatsappDark rounded-sm transition-colors shadow-subtle"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Inquire &amp; Order on WhatsApp</span>
            </a>

            <a
              href={`tel:${SITE_CONFIG.phone}`}
              className="inline-flex items-center gap-2 px-5 py-3 text-xs font-mono font-medium text-white bg-white/10 hover:bg-white/15 border border-white/20 rounded-sm transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call Dispatch Desk ({SITE_CONFIG.phone})</span>
            </a>

            <Link
              href="/electronics"
              className="inline-flex items-center gap-2 px-5 py-3 text-xs font-semibold text-neutral-300 hover:text-white transition-colors"
            >
              <span>Browse Catalog &rarr;</span>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
