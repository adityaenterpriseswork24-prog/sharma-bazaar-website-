import { Metadata } from 'next';
import Link from 'next/link';
import { Truck, RotateCcw, ShieldCheck, CheckCircle2, Phone, MessageCircle } from 'lucide-react';
import { SITE_CONFIG } from '@/data/site-config';
import { buildWhatsAppUrl } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Delivery, Inspection & Replacement Policy | Sharma Bazaar South Delhi',
  description:
    'Transparent doorstep delivery, unboxing inspection, zero-risk COD, and 7-day transit replacement policy for electronics purchases at Sharma Bazaar Vasant Kunj showroom.',
  alternates: {
    canonical: 'https://www.sharmabazaar.com/return-policy',
  },
};

export default function ReturnPolicyPage() {
  const lastUpdated = 'November 17, 2026';
  const whatsappUrl = buildWhatsAppUrl(
    SITE_CONFIG.whatsapp,
    `Hi Sharma Bazaar, I have a question regarding delivery and return terms.`
  );

  return (
    <div className="bg-white min-h-screen py-12 sm:py-16 font-sans">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="space-y-3 border-b border-neutral-200 pb-8">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-neutral-100 text-neutral-700 text-[10px] font-mono uppercase tracking-widest">
            <Truck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Zero-Risk White Glove Delivery Protocol</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-brand-navy">
            Delivery, Inspection &amp; Replacement Policy
          </h1>
          <p className="text-xs font-mono text-neutral-400">
            Last Updated: {lastUpdated} · Official Policy of {SITE_CONFIG.businessName}
          </p>
        </div>

        {/* 4 Guarantee Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-5 bg-neutral-50 border border-neutral-200 rounded-sm space-y-2">
            <div className="flex items-center gap-2 text-brand-navy font-bold text-xs font-mono uppercase">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>1. Inspect Box Inside Your Flat</span>
            </div>
            <p className="text-xs text-neutral-600 leading-relaxed">
              We bring the appliance into your living room, unbox it with you, and verify that all seals and glass/cabinet panels are flawless before you pay.
            </p>
          </div>

          <div className="p-5 bg-neutral-50 border border-neutral-200 rounded-sm space-y-2">
            <div className="flex items-center gap-2 text-brand-navy font-bold text-xs font-mono uppercase">
              <RotateCcw className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>2. Instant Transit Swap</span>
            </div>
            <p className="text-xs text-neutral-600 leading-relaxed">
              If an imperfection or transit scratch is spotted during unboxing, you do not pay. We immediately dispatch a fresh replacement from showroom stock.
            </p>
          </div>

          <div className="p-5 bg-neutral-50 border border-neutral-200 rounded-sm space-y-2">
            <div className="flex items-center gap-2 text-brand-navy font-bold text-xs font-mono uppercase">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>3. 7-Day DOA Replacement</span>
            </div>
            <p className="text-xs text-neutral-600 leading-relaxed">
              If a certified brand engineer confirms an internal Dead-On-Arrival (DOA) manufacturing flaw within 7 days, we facilitate an expedited brand replacement.
            </p>
          </div>

          <div className="p-5 bg-neutral-50 border border-neutral-200 rounded-sm space-y-2">
            <div className="flex items-center gap-2 text-brand-navy font-bold text-xs font-mono uppercase">
              <Truck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>4. 2–6 Hour Express Transit</span>
            </div>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Dispatched directly from Dairy Farm, 80-B, Masoodpur, G/F, Vasant Kunj across 28 South Delhi localities with zero third-party courier delays.
            </p>
          </div>
        </div>

        {/* Detailed Guidelines */}
        <div className="space-y-8 text-xs sm:text-sm text-neutral-700 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-brand-navy">
              Doorstep Delivery Protocol
            </h2>
            <p>
              Unlike generic online eCommerce couriers who leave heavy appliances curbside at the security gate, our logistics crew delivers into your room, handles unboxing, and removes disposal packaging if desired.
            </p>
            <p>
              Delivery time windows range from 2 to 6 hours depending on your South Delhi sector. Our team coordinates arrival times in advance via call or WhatsApp.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-brand-navy">
              Dead-On-Arrival (DOA) &amp; Manufacturer Warranty Support
            </h2>
            <p>
              Once an appliance is accepted and installed by an authorized OEM technician (Sony, Samsung, LG, Daikin, Bosch, IFB, Voltas), standard operational defects are covered under the comprehensive manufacturer warranty.
            </p>
            <p>
              In the unlikely event of a technical defect discovered during installation within 7 days of delivery, Sharma Bazaar coordinates directly with brand service managers to ensure prompt resolution or full product replacement without prolonged service center delays.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-brand-navy">
              Order Cancellations
            </h2>
            <p>
              Because no advance payment is mandated for standard showroom inventory, orders can be cancelled free of charge prior to van dispatch by calling or messaging our showroom team.
            </p>
          </section>
        </div>

        {/* Showroom Help Desk Banner */}
        <div className="p-6 bg-brand-navy text-white rounded-sm space-y-4">
          <div className="space-y-1">
            <h3 className="font-bold text-sm sm:text-base">
              Need Assistance with an Order or Delivery?
            </h3>
            <p className="text-xs text-neutral-300">
              Speak directly with our store manager at Dairy Farm, 80-B, Masoodpur, G/F, Vasant Kunj.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-brand-whatsapp hover:bg-brand-whatsappDark text-white text-xs font-semibold rounded-sm transition-colors flex items-center gap-2 shadow-subtle"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-white" />
              <span>WhatsApp Showroom</span>
            </a>
            <a
              href={`tel:${SITE_CONFIG.phone}`}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-mono rounded-sm transition-colors flex items-center gap-2 border border-white/20"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{SITE_CONFIG.phone}</span>
            </a>
          </div>
        </div>

        {/* Back Link */}
        <div className="pt-6 border-t border-neutral-200 flex items-center justify-between text-xs font-mono">
          <Link href="/terms" className="text-neutral-500 hover:text-brand-navy">
            &larr; View Terms of Service
          </Link>
          <Link href="/contact" className="text-brand-navy hover:underline">
            View Showroom Directions &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
