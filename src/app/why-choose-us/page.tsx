import { Metadata } from 'next';
import Link from 'next/link';
import {
  CheckCircle2,
  XCircle,
  HelpCircle,
  Building2,
  Percent,
  ShieldCheck,
  Truck,
  Phone,
  MessageCircle,
  ArrowRight,
  Sparkles,
  MapPin,
  Clock,
  ExternalLink,
  ChevronRight,
  Tv,
  Layers
} from 'lucide-react';
import { SITE_CONFIG } from '@/data/site-config';
import { buildWhatsAppUrl } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Why Choose Us | Sharma Electronics vs Online & Mall Chains',
  description:
    'Discover why Vasant Kunj and South Delhi homeowners buy from Sharma Electronics. Compare our showroom prices, 5-floor facility, lift access, and WhatsApp counter-quotes against Amazon, Flipkart, and Croma.',
  alternates: {
    canonical: 'https://www.sharmaelectronics.com/why-choose-us',
  },
};

export default function WhyChooseUsPage() {
  const counterQuoteWhatsAppUrl = buildWhatsAppUrl(
    SITE_CONFIG.whatsapp,
    `Hi Sharma Electronics, I am on your Why Choose Us page. I have an online price quote and would like to get your best showroom counter-price.`
  );

  const comparisonRows = [
    {
      feature: 'Pricing Advantage',
      sharma: 'Selected models ₹1,000–₹2,000 cheaper than major online portals',
      online: 'Platform commission (8–15%) and dynamic pricing spikes',
      mall: 'High mall rental overheads priced into MRP markup',
      highlight: true,
    },
    {
      feature: 'Physical Seal & Panel Inspection',
      sharma: 'Inspect the brand seal and panel live before or at delivery',
      online: 'High risk of courier transit shock, open-box returns, or courier drops',
      mall: 'Floor displays only; deliveries dispatched from regional godowns',
      highlight: false,
    },
    {
      feature: 'Doorstep Delivery & Floor Lifting',
      sharma: 'Dedicated showroom staff lifts heavy units directly into your flat',
      online: 'Couriers frequently dump heavy 80kg boxes at gate/ground floor',
      mall: 'Third-party delivery partners with unpredictable arrival windows',
      highlight: true,
    },
    {
      feature: 'Customer Accountability',
      sharma: 'Direct access to store owner & manager on call or WhatsApp',
      online: 'Impersonal automated chatbots and difficult return tickets',
      mall: 'Shift-based sales staff with little post-sales personal ownership',
      highlight: true,
    },
    {
      feature: 'Official Manufacturer Warranty',
      sharma: '100% Genuine authorized distributor stock + GST invoice',
      online: 'Risk of unauthorized third-party marketplace sellers',
      mall: 'Authorized brand warranty',
      highlight: false,
    },
    {
      feature: 'Custom Model Procurement',
      sharma: 'Arranged from Delhi regional distributors within 24 hours on demand',
      online: 'If out of stock, wait weeks for restocking',
      mall: 'Limited to chain-mandated warehouse SKU inventory',
      highlight: false,
    },
  ];

  const faqs = [
    {
      q: 'Are your products 100% original with official manufacturer warranty?',
      a: 'Yes, absolutely. We source all electronics directly through authorized regional distributor networks for Sony, Samsung, LG, Daikin, Bosch, IFB, and Voltas. Every product comes in a factory-sealed box with an authentic GST tax invoice. Brand engineers handle doorstep installation and comprehensive manufacturer warranty.',
    },
    {
      q: 'How can your prices be ₹1,000–₹2,000 cheaper than Amazon or Flipkart?',
      a: 'Online marketplaces charge merchants 8% to 15% in platform commissions, gateway fees, and return logistics fees. Furthermore, shopping mall retailers pay massive monthly mall rentals. Because we operate from our owned 5-floor commercial property in Masoodpur Dairy and procure directly from regional distributors, we operate on lower margins and pass those savings directly to local buyers.',
    },
    {
      q: 'Can you arrange a specific electronics model that is not on display?',
      a: 'Yes. Our showroom maintains active demonstration models and core packed stock. If you need a specific high-end OLED TV, large French-door refrigerator, or commercial AC tonnage, we can arrange it from our distributor hub within 24 hours.',
    },
    {
      q: 'How fast do you deliver across Vasant Kunj and South Delhi?',
      a: 'For in-stock models, we offer same-day delivery across Vasant Kunj, Masoodpur, Mahipalpur, Vasant Vihar, Chattarpur, and Munirka within 2 to 6 hours. Our dedicated showroom delivery team brings the appliance directly into your apartment, avoiding curbside drops.',
    },
    {
      q: 'How does the WhatsApp price counter-quote work?',
      a: 'Simply take a screenshot of any electronic product price you find on Amazon, Flipkart, or a retail quote. Send it to our WhatsApp (+91 70119 62356). Our store manager checks distributor inventory and gives you our best local showroom counter-price within minutes.',
    },
  ];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.a,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="bg-white min-h-screen py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-1.5 text-xs text-slate-500 overflow-x-auto py-1">
            <Link href="/" className="hover:text-brand-blue shrink-0">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="text-slate-800 font-semibold truncate">Why Choose Us</span>
          </nav>

          {/* Hero Section */}
          <div className="max-w-4xl space-y-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-brand-blue text-xs font-bold uppercase tracking-widest border border-blue-200">
              <ShieldCheck className="w-3.5 h-3.5" />
              Transparent Local Value
            </span>

            <h1 className="text-3xl sm:text-5xl font-black text-brand-navy tracking-tight leading-tight">
              Why Buy From Sharma Electronics in Vasant Kunj?
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Before you place a high-ticket electronics order on a faceless e-commerce portal or pay shopping mall markups, discover the tangible benefits of purchasing from South Delhi&apos;s premier five-floor showroom.
            </p>
          </div>

          {/* ====================================================
              SECTION 1: HEAD-TO-HEAD COMPARISON MATRIX
          ==================================================== */}
          <section className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-widest text-brand-blue">
                  Clear Head-to-Head Comparison
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-brand-navy tracking-tight mt-1">
                  Sharma Electronics vs. Online Portals vs. Mall Retailers
                </h2>
              </div>
              <span className="text-xs text-slate-500">
                *Verified showroom buying policies vs industry averages
              </span>
            </div>

            <div className="rounded-3xl border border-slate-200 shadow-card overflow-hidden bg-white">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-slate-900 text-white font-bold text-xs uppercase tracking-wider">
                    <tr>
                      <th className="py-4 px-5">Buying Consideration</th>
                      <th className="py-4 px-5 bg-brand-blue text-white">Sharma Electronics (Vasant Kunj)</th>
                      <th className="py-4 px-5">Online Marketplaces</th>
                      <th className="py-4 px-5">Mall Retail Chains</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {comparisonRows.map((row, idx) => (
                      <tr
                        key={idx}
                        className={`transition-colors ${
                          row.highlight ? 'bg-blue-50/40 hover:bg-blue-50/70' : 'hover:bg-slate-50'
                        }`}
                      >
                        <td className="py-4 px-5 font-bold text-slate-900">
                          {row.feature}
                        </td>
                        <td className="py-4 px-5 font-semibold text-brand-navy bg-blue-50/60 border-x border-blue-100">
                          <div className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{row.sharma}</span>
                          </div>
                        </td>
                        <td className="py-4 px-5 text-slate-600">
                          <div className="flex items-start gap-2">
                            <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                            <span>{row.online}</span>
                          </div>
                        </td>
                        <td className="py-4 px-5 text-slate-600">
                          <div className="flex items-start gap-2">
                            <HelpCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                            <span>{row.mall}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* ====================================================
              SECTION 2: THE 3-STEP WHATSAPP COUNTER-QUOTE
          ==================================================== */}
          <section className="bg-slate-50 rounded-3xl border border-slate-200 p-8 sm:p-12 space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="text-xs font-extrabold uppercase tracking-widest text-brand-blue">
                Transparent Local Counter-Quotes
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-brand-navy tracking-tight">
                How Our WhatsApp Price Match Works
              </h2>
              <p className="text-sm text-slate-600">
                Found an electronic model online? Don&apos;t click &ldquo;Buy Now&rdquo; without checking our local showroom price first.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-subtle space-y-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-brand-blue font-black flex items-center justify-center text-lg">
                  1
                </div>
                <h3 className="font-bold text-slate-900 text-base">Screenshot Any Online Price</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Browse Amazon, Flipkart, or any electronics store. Take a quick screenshot of the exact model number and total cart price.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-subtle space-y-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 font-black flex items-center justify-center text-lg">
                  2
                </div>
                <h3 className="font-bold text-slate-900 text-base">Send to Our Store WhatsApp</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Send the image or model name to <strong>+91 70119 62356</strong>. Our store manager verifies distributor inventory immediately.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-subtle space-y-3">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 font-black flex items-center justify-center text-lg">
                  3
                </div>
                <h3 className="font-bold text-slate-900 text-base">Get Better Price &amp; Delivery</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  We reply with our best counter-quote—often saving you ₹1,000–₹2,000—plus schedule same-day doorstep delivery with lift assistance.
                </p>
              </div>
            </div>

            <div className="text-center pt-2">
              <a
                href={counterQuoteWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-brand-whatsapp hover:bg-brand-whatsappHover text-white font-bold text-sm shadow-md"
              >
                <MessageCircle className="w-4 h-4 fill-white text-brand-whatsapp" />
                <span>Send WhatsApp Counter-Quote Request</span>
              </a>
            </div>
          </section>

          {/* ====================================================
              SECTION 3: THE 5-FLOOR COMMERCIAL ADVANTAGE
          ==================================================== */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-5">
              <span className="text-xs font-extrabold uppercase tracking-widest text-brand-blue">
                Physical Retail Infrastructure
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-brand-navy tracking-tight leading-tight">
                An Owned Five-Floor Showroom with Commercial Passenger Lift
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Many online sellers operate from temporary shared godowns. In contrast, Sharma Electronics is located in an owned commercial building spanning five full floors (~200 Gaj / 1,800 sq.ft per floor) in Masoodpur Dairy, Vasant Kunj.
              </p>

              <div className="space-y-3 text-xs sm:text-sm text-slate-700">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Commercial Passenger Lift:</strong> Effortless floor-to-floor access for families and senior citizens.
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Zero Mall Rent Markup:</strong> Because the property is owned, our retail overheads remain minimal, allowing wholesale-tier pricing.
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Live Demonstration Rooms:</strong> Compare Sony Bravia OLED vs Samsung QLED side-by-side in real ambient lighting.
                  </span>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-4">
                <Link
                  href="/contact"
                  className="px-6 py-3 rounded-xl bg-brand-navy hover:bg-slate-800 text-white font-bold text-xs sm:text-sm inline-flex items-center gap-2"
                >
                  <MapPin className="w-4 h-4" />
                  <span>Visit Showroom in Masoodpur</span>
                </Link>
                <Link
                  href="/electronics"
                  className="text-xs sm:text-sm font-bold text-brand-blue hover:underline"
                >
                  Browse Catalogue &rarr;
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
              <div className="rounded-2xl overflow-hidden aspect-[4/5] bg-slate-100 border border-slate-200 shadow-subtle">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=600&q=80"
                  alt="Television showroom floor display"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-2xl overflow-hidden aspect-[4/5] bg-slate-100 border border-slate-200 shadow-subtle pt-6">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?auto=format&fit=crop&w=600&q=80"
                  alt="Refrigerator and appliance department"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </section>

          {/* ====================================================
              SECTION 4: FREQUENTLY ASKED QUESTIONS
          ==================================================== */}
          <section className="space-y-8 pt-4">
            <div className="max-w-2xl">
              <span className="text-xs font-extrabold uppercase tracking-widest text-brand-blue">
                Frequently Asked Questions
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-brand-navy tracking-tight mt-1">
                Common Questions from South Delhi Shoppers
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-white border border-slate-200 shadow-subtle space-y-2.5"
                >
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base flex items-start gap-2">
                    <span className="text-brand-blue font-black">Q.</span>
                    <span>{faq.q}</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-5">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* ====================================================
              FINAL CTA BAR
          ==================================================== */}
          <section className="bg-brand-navy text-white rounded-3xl p-8 sm:p-12 text-center space-y-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-widest border border-emerald-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              Before You Purchase Anywhere Else
            </span>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight max-w-2xl mx-auto">
              Ready to Experience Better Prices &amp; Genuine Local Care?
            </h2>
            <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto">
              Visit our showroom at Masoodpur Dairy, Vasant Kunj or message our store manager on WhatsApp.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <a
                href={counterQuoteWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-xl bg-brand-whatsapp hover:bg-brand-whatsappHover text-white font-bold text-sm flex items-center gap-2 shadow-md"
              >
                <MessageCircle className="w-4 h-4 fill-white text-brand-whatsapp" />
                <span>Inquire on WhatsApp</span>
              </a>

              <a
                href={`tel:${SITE_CONFIG.phone}`}
                className="px-6 py-3.5 rounded-xl bg-brand-blue hover:bg-brand-blueHover text-white font-bold text-sm flex items-center gap-2"
              >
                <Phone className="w-4 h-4" />
                <span>Call {SITE_CONFIG.phone}</span>
              </a>

              <Link
                href="/contact"
                className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20"
              >
                <span>Get Driving Directions</span>
              </Link>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
