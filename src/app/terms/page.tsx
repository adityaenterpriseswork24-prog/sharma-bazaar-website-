import { Metadata } from 'next';
import Link from 'next/link';
import { FileCheck, ShieldCheck, Truck, Scale } from 'lucide-react';
import { SITE_CONFIG } from '@/data/site-config';

export const metadata: Metadata = {
  title: 'Terms of Service & Purchase Terms | Sharma Bazaar Vasant Kunj',
  description:
    'Terms of service, showroom counter quotation policies, doorstep delivery standards, and manufacturer warranty terms for Sharma Bazaar consumer electronics in South Delhi.',
  alternates: {
    canonical: 'https://www.sharmabazaar.com/terms',
  },
};

export default function TermsPage() {
  const lastUpdated = 'November 17, 2026';

  return (
    <div className="bg-white min-h-screen py-12 sm:py-16 font-sans">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="space-y-3 border-b border-neutral-200 pb-8">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-neutral-100 text-neutral-700 text-[10px] font-mono uppercase tracking-widest">
            <Scale className="w-3.5 h-3.5 text-brand-navy" />
            <span>Commercial Showroom Standards · Delhi Jurisdiction</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-brand-navy">
            Terms of Service &amp; Showroom Policies
          </h1>
          <p className="text-xs font-mono text-neutral-400">
            Last Updated: {lastUpdated} · Governed by {SITE_CONFIG.businessName}
          </p>
        </div>

        {/* Core Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
          <div className="p-4 bg-neutral-50 border border-neutral-200 rounded-sm space-y-1">
            <p className="text-[10px] uppercase text-neutral-400 font-bold">PRICING ASSURANCE</p>
            <p className="font-bold text-brand-navy font-sans text-sm">Distributor Wholesale</p>
            <p className="text-neutral-500 font-sans text-[11px]">Fair counter-quotes beating platform commissions</p>
          </div>
          <div className="p-4 bg-neutral-50 border border-neutral-200 rounded-sm space-y-1">
            <p className="text-[10px] uppercase text-neutral-400 font-bold">WARRANTY BASIS</p>
            <p className="font-bold text-brand-navy font-sans text-sm">100% Brand Sealed</p>
            <p className="text-neutral-500 font-sans text-[11px]">Official GST tax invoice &amp; OEM installation</p>
          </div>
          <div className="p-4 bg-neutral-50 border border-neutral-200 rounded-sm space-y-1">
            <p className="text-[10px] uppercase text-neutral-400 font-bold">DOORSTEP PROTOCOL</p>
            <p className="font-bold text-brand-navy font-sans text-sm">Inspect Before Pay</p>
            <p className="text-neutral-500 font-sans text-[11px]">In-room delivery across South Delhi</p>
          </div>
        </div>

        {/* Detailed Terms */}
        <div className="space-y-8 text-xs sm:text-sm text-neutral-700 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-brand-navy">
              1. Showroom Counter Quotes &amp; Pricing
            </h2>
            <p>
              Product prices displayed on this website or quoted via WhatsApp and telephone represent our verified local showroom prices at our physical store at <strong>Dairy Farm, 80-B, Masoodpur, G/F, Vasant Kunj</strong>.
            </p>
            <p>
              Due to rapid fluctuations in brand distributor incentives and seasonal promotions (such as summer AC campaigns or festive television offers), prices are subject to confirmation at the time of order booking. Quoted prices include applicable GST and doorstep delivery to designated South Delhi localities unless otherwise specified.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-brand-navy">
              2. Product Authenticity &amp; Warranty
            </h2>
            <p>
              All electronics supplied by Sharma Bazaar are 100% brand-new, factory-sealed units sourced directly through authorized regional distributor networks (including Sony India, Samsung India, LG Electronics, Daikin Airconditioning, Bosch Home Appliances, IFB Industries, and Voltas).
            </p>
            <p>
              Every unit is accompanied by an authentic GST tax invoice containing matching serial numbers and barcodes. All warranty coverage is provided directly by the respective manufacturer, with certified brand service centers and doorstep installation engineers.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-brand-navy">
              3. Doorstep Delivery &amp; Inspection
            </h2>
            <p>
              Our dedicated showroom logistics crew delivers major appliances into your apartment via lift or staircase. Under our Zero-Risk Doorstep Inspection Protocol, the outer carton is unboxed in your presence to verify unbroken factory seals and pristine exterior condition before payment is made.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-brand-navy">
              4. Payment Methods
            </h2>
            <p>
              We accept:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs text-neutral-600">
              <li>Cash on Delivery (COD) upon box inspection</li>
              <li>Doorstep UPI (Google Pay, PhonePe, Paytm, BHIM) via dynamic QR code</li>
              <li>Credit and Debit Cards at our physical Masoodpur showroom</li>
              <li>Direct NEFT / RTGS bank transfer for institutional and commercial billing</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-brand-navy">
              5. Governing Law &amp; Jurisdiction
            </h2>
            <p>
              All transactions, agreements, and disputes arising from purchases or interactions with {SITE_CONFIG.businessName} shall be governed exclusively by the laws of India, subject to the jurisdiction of the competent courts in New Delhi.
            </p>
          </section>
        </div>

        {/* Navigation */}
        <div className="pt-6 border-t border-neutral-200 flex items-center justify-between text-xs font-mono">
          <Link href="/privacy-policy" className="text-neutral-500 hover:text-brand-navy">
            &larr; View Privacy Policy
          </Link>
          <Link href="/return-policy" className="text-brand-navy hover:underline">
            View Delivery &amp; Return Policy &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
