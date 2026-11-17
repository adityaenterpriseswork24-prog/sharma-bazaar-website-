import Link from 'next/link';
import { ArrowLeft, MessageCircle, Phone, Search, Home, Package, MapPin, BookOpen } from 'lucide-react';
import { SITE_CONFIG } from '@/data/site-config';
import { buildWhatsAppUrl } from '@/lib/utils';

export default function NotFound() {
  const whatsappUrl = buildWhatsAppUrl(
    SITE_CONFIG.whatsapp,
    'Hi Sharma Bazaar, I arrived at a missing page on your website and would like assistance finding a product or showroom detail.'
  );

  return (
    <div className="bg-white min-h-[75vh] flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full text-center space-y-8">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 border border-neutral-200/80 font-mono text-[11px] text-neutral-600 uppercase tracking-widest">
          <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
          <span>404 · Page Not Found</span>
        </div>

        {/* Headline & Description */}
        <div className="space-y-3">
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-brand-navy">
            Looking for an Appliance or Showroom Page?
          </h1>
          <p className="text-sm sm:text-base text-neutral-600 max-w-lg mx-auto leading-relaxed">
            The page or model link you requested may have been relocated or updated in our showroom inventory database.
          </p>
        </div>

        {/* 4 Quick Jump Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left pt-2">
          <Link
            href="/electronics"
            className="p-4 rounded-xl border border-neutral-200 hover:border-brand-navy/40 hover:shadow-md transition-all group bg-neutral-50/50 hover:bg-white"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-brand-navy text-white flex items-center justify-center shrink-0">
                <Package className="w-4 h-4" />
              </div>
              <div>
                <p className="text-sm font-bold text-neutral-900 group-hover:text-brand-navy transition-colors">
                  Product Catalogue
                </p>
                <p className="text-xs text-neutral-500">Explore 4K TVs, ACs, Fridges &amp; Washers</p>
              </div>
            </div>
          </Link>

          <Link
            href="/locations"
            className="p-4 rounded-xl border border-neutral-200 hover:border-brand-navy/40 hover:shadow-md transition-all group bg-neutral-50/50 hover:bg-white"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-brand-navy text-white flex items-center justify-center shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <p className="text-sm font-bold text-neutral-900 group-hover:text-brand-navy transition-colors">
                  Delivery Locations
                </p>
                <p className="text-xs text-neutral-500">Same-Day delivery across 28 South Delhi areas</p>
              </div>
            </div>
          </Link>

          <Link
            href="/blog"
            className="p-4 rounded-xl border border-neutral-200 hover:border-brand-navy/40 hover:shadow-md transition-all group bg-neutral-50/50 hover:bg-white"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-brand-navy text-white flex items-center justify-center shrink-0">
                <BookOpen className="w-4 h-4" />
              </div>
              <div>
                <p className="text-sm font-bold text-neutral-900 group-hover:text-brand-navy transition-colors">
                  Appliance Guides
                </p>
                <p className="text-xs text-neutral-500">AC tonnage, OLED vs QLED &amp; buying tips</p>
              </div>
            </div>
          </Link>

          <Link
            href="/contact"
            className="p-4 rounded-xl border border-neutral-200 hover:border-brand-navy/40 hover:shadow-md transition-all group bg-neutral-50/50 hover:bg-white"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-brand-navy text-white flex items-center justify-center shrink-0">
                <Home className="w-4 h-4" />
              </div>
              <div>
                <p className="text-sm font-bold text-neutral-900 group-hover:text-brand-navy transition-colors">
                  Visit Showroom
                </p>
                <p className="text-xs text-neutral-500">Dairy Farm, Masoodpur, Vasant Kunj</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Direct Action Channels */}
        <div className="pt-4 border-t border-neutral-100 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-brand-navy hover:bg-black text-white text-xs font-semibold uppercase tracking-wider transition-all shadow-xs"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Home</span>
          </Link>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-semibold transition-all shadow-xs"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-white" />
            <span>Ask Store Manager on WhatsApp</span>
          </a>

          <a
            href={`tel:${SITE_CONFIG.phone}`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-neutral-50 hover:bg-neutral-100 text-neutral-700 border border-neutral-200 text-xs font-mono transition-all"
          >
            <Phone className="w-3.5 h-3.5 text-neutral-500" />
            <span>Call Showroom</span>
          </a>
        </div>
      </div>
    </div>
  );
}
