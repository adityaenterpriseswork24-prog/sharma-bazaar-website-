import { Metadata } from 'next';
import Link from 'next/link';
import {
  Phone,
  MessageCircle,
  ArrowRight,
  MapPin,
  Check,
  Minus,
} from 'lucide-react';
import { SITE_CONFIG } from '@/data/site-config';
import { buildWhatsAppUrl } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Electronics Cheaper Than Amazon Delhi | Beat Online Prices | Sharma Bazaar',
  description:
    'Save money on electronics in Delhi. Sharma Bazaar beats Amazon & Flipkart prices by ₹1,000–₹2,000 on 4K TVs, split ACs, refrigerators & washers with authentic brand warranty & same-day delivery.',
  keywords: [
    'electronics cheaper than amazon delhi',
    'tv price cheaper than flipkart delhi',
    'buy tv cheaper than amazon vasant kunj',
    'ac price less than amazon south delhi',
    'beat amazon price electronics delhi',
    'best price led tv delhi',
    'washing machine best price delhi',
    'refrigerator lowest price delhi',
    'home appliances discount vasant kunj',
    'electronics best deal south delhi',
    'save money on electronics delhi',
    'tv at amazon price local store delhi',
  ],
  alternates: {
    canonical: 'https://www.sharmabazaar.com/why-choose-us',
  },
};

export default function WhyChooseUsPage() {
  const counterQuoteWhatsAppUrl = buildWhatsAppUrl(
    SITE_CONFIG.whatsapp,
    `Hi Sharma Bazaar, I am on your Why Choose Us page. I have an online price quote and would like to get your best showroom counter-price.`
  );

  const comparisonRows = [
    {
      feature: 'Pricing Advantage',
      sharma: 'Selected models ₹1,000–₹2,000 cheaper than major online portals',
      online: 'Platform commissions (8–15%) and dynamic surge pricing',
      mall: 'High mall rental overheads priced into retail markup',
      highlight: true,
    },
    {
      feature: 'Physical Seal & Panel Inspection',
      sharma: 'Inspect the brand seal and active panel before or upon delivery',
      online: 'Risk of transit damage, courier shock, or open-box returns',
      mall: 'Floor displays only; delivery dispatched from regional godowns',
      highlight: false,
    },
    {
      feature: 'White-Glove Home Delivery',
      sharma: 'Dedicated showroom staff delivers heavy units directly into your flat',
      online: 'Couriers frequently leave heavy 80kg boxes at ground floor/gate',
      mall: 'Third-party delivery partners with unpredictable arrival windows',
      highlight: true,
    },
    {
      feature: 'Direct Store Ownership',
      sharma: 'Direct access to store owner & manager on call or WhatsApp',
      online: 'Impersonal automated chatbots and difficult return tickets',
      mall: 'Shift-based sales representatives without personal accountability',
      highlight: true,
    },
    {
      feature: 'Official Manufacturer Warranty',
      sharma: '100% Genuine authorized distributor stock + authentic GST invoice',
      online: 'Risk of unauthorized third-party marketplace sellers',
      mall: 'Authorized brand warranty',
      highlight: false,
    },
    {
      feature: 'Custom Model Sourcing',
      sharma: 'Arranged from Delhi regional distributors within 24 hours on demand',
      online: 'Out-of-stock items require weeks of waiting',
      mall: 'Strictly limited to chain-mandated warehouse SKU inventory',
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
      a: 'Online marketplaces charge merchants 8% to 15% in platform commissions, payment gateway fees, and return logistics overhead. Furthermore, shopping mall retailers pay massive monthly mall rentals. Because we operate from our owned commercial showroom property in Masoodpur Dairy and procure directly from regional distributors, we operate on lower margins and pass those savings directly to local buyers.',
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
          {/* Header */}
          <div className="max-w-3xl space-y-3">
            <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-400">
              The Real Comparison
            </span>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-brand-navy">
              Why Choose Sharma Bazaar?
            </h1>
            <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-normal">
              Compare our local showroom pricing, physical demonstration displays,
              and WhatsApp counter-quotes against online marketplaces and mall chains.
            </p>
          </div>

          {/* Head-to-Head Comparison Matrix */}
          <div className="border border-neutral-200 rounded-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-neutral-200 bg-neutral-50 font-mono text-[11px] uppercase tracking-wider text-neutral-500">
                    <th className="py-4 px-5 w-1/4">Key Consideration</th>
                    <th className="py-4 px-5 w-1/3 text-brand-navy font-bold bg-neutral-100/60">
                      Sharma Bazaar (Vasant Kunj)
                    </th>
                    <th className="py-4 px-5 w-1/4">Amazon / Flipkart</th>
                    <th className="py-4 px-5 w-1/4">Mall Retail Chains</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200">
                  {comparisonRows.map((row, idx) => (
                    <tr
                      key={idx}
                      className={row.highlight ? 'bg-neutral-50/40' : 'bg-white'}
                    >
                      <td className="py-4 px-5 font-semibold text-neutral-900">
                        {row.feature}
                      </td>
                      <td className="py-4 px-5 font-medium text-brand-navy bg-neutral-100/40">
                        <div className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{row.sharma}</span>
                        </div>
                      </td>
                      <td className="py-4 px-5 text-neutral-600">
                        <div className="flex items-start gap-2">
                          <Minus className="w-3.5 h-3.5 text-neutral-400 shrink-0 mt-0.5" />
                          <span>{row.online}</span>
                        </div>
                      </td>
                      <td className="py-4 px-5 text-neutral-600">
                        <div className="flex items-start gap-2">
                          <Minus className="w-3.5 h-3.5 text-neutral-400 shrink-0 mt-0.5" />
                          <span>{row.mall}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 3-Step WhatsApp Counter-Quote Protocol */}
          <div className="space-y-6">
            <div className="max-w-2xl">
              <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-400">
                Transparent Process
              </span>
              <h2 className="text-2xl font-bold tracking-tight text-brand-navy mt-1">
                How Our WhatsApp Price Match Works
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
              <div className="p-6 bg-neutral-50 border border-neutral-200 rounded-sm space-y-2">
                <p className="text-neutral-400 text-[10px]">STEP 01</p>
                <h3 className="text-sm font-bold text-brand-navy font-sans">Find Any Online Price</h3>
                <p className="text-neutral-600 font-sans text-xs leading-relaxed">
                  Browse Amazon, Flipkart, or a retail quote for your desired TV, AC, or refrigerator model.
                </p>
              </div>

              <div className="p-6 bg-neutral-50 border border-neutral-200 rounded-sm space-y-2">
                <p className="text-neutral-400 text-[10px]">STEP 02</p>
                <h3 className="text-sm font-bold text-brand-navy font-sans">Share With Showroom</h3>
                <p className="text-neutral-600 font-sans text-xs leading-relaxed">
                  Send the screenshot or model name directly to our store WhatsApp (+91 70119 62356).
                </p>
              </div>

              <div className="p-6 bg-neutral-50 border border-neutral-200 rounded-sm space-y-2">
                <p className="text-neutral-400 text-[10px]">STEP 03</p>
                <h3 className="text-sm font-bold text-brand-navy font-sans">Receive Counter-Quote</h3>
                <p className="text-neutral-600 font-sans text-xs leading-relaxed">
                  Our manager reviews distributor margins and shares our best local showroom counter-offer.
                </p>
              </div>
            </div>
          </div>

          {/* FAQs */}
          <div className="space-y-6 pt-6 border-t border-neutral-200">
            <div className="max-w-2xl">
              <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-400">
                Common Questions
              </span>
              <h2 className="text-2xl font-bold tracking-tight text-brand-navy mt-1">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="border border-neutral-200 rounded-sm divide-y divide-neutral-200">
              {faqs.map((f, i) => (
                <div key={i} className="p-6 space-y-2 bg-white">
                  <h3 className="text-sm font-bold text-neutral-900">{f.q}</h3>
                  <p className="text-xs text-neutral-600 leading-relaxed">{f.a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Direct CTA */}
          <div className="p-8 sm:p-12 bg-brand-navy text-white rounded-sm text-center space-y-4">
            <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-400">
              Before You Purchase Anywhere Else
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white max-w-xl mx-auto">
              Ready to Experience Better Prices &amp; Genuine Local Care?
            </h2>
            <p className="text-xs sm:text-sm text-neutral-300 max-w-lg mx-auto">
              Visit our showroom at Masoodpur Dairy, Vasant Kunj or message our store manager on WhatsApp.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <a
                href={counterQuoteWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 bg-brand-whatsapp hover:bg-brand-whatsappDark text-white text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors flex items-center gap-2 shadow-subtle"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Inquire on WhatsApp</span>
              </a>

              <a
                href={`tel:${SITE_CONFIG.phone}`}
                className="px-6 py-3.5 bg-white text-brand-navy hover:bg-neutral-100 text-xs font-bold uppercase tracking-wider rounded-sm transition-colors flex items-center gap-2"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call {SITE_CONFIG.phone}</span>
              </a>

              <Link
                href="/contact"
                className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold uppercase tracking-wider rounded-sm border border-white/20 transition-colors"
              >
                <span>Get Driving Directions</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
