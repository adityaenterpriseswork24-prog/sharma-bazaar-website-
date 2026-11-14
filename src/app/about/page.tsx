import { Metadata } from 'next';
import Link from 'next/link';
import {
  Building2,
  Percent,
  MessageCircle,
  CheckCircle2,
  MapPin,
  ShieldCheck,
  Tv,
  Award,
  Sparkles
} from 'lucide-react';
import { SITE_CONFIG } from '@/data/site-config';
import { buildWhatsAppUrl } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'About Us | Sharma Electronics Showroom Vasant Kunj',
  description:
    'Established in 2019 in Masoodpur Dairy, Vasant Kunj. 5-floor commercial showroom offering multi-brand electronics: TVs, ACs, Refrigerators, Washing Machines & Microwaves with lift access.',
  alternates: {
    canonical: 'https://www.sharmaelectronics.com/about',
  },
};

export default function AboutPage() {
  const whatsappUrl = buildWhatsAppUrl(
    SITE_CONFIG.whatsapp,
    `Hi Sharma Electronics, I read your About page and would like to visit the showroom or inquire about a product.`
  );

  return (
    <div className="bg-white min-h-screen py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Hero Section */}
        <div className="max-w-4xl space-y-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-brand-blue text-xs font-bold uppercase tracking-widest border border-blue-200">
            <Building2 className="w-3.5 h-3.5" />
            Rooted in Vasant Kunj Since 2019
          </span>

          <h1 className="text-3xl sm:text-5xl font-black text-brand-navy tracking-tight leading-tight">
            South Delhi&apos;s Dedicated Multi-Brand Consumer Electronics Showroom
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Established in 2019 in Masoodpur Dairy, Vasant Kunj, Sharma Electronics has grown into one of South Delhi&apos;s most reliable physical electronics destinations. Operating from our owned five-floor commercial property, we bring leading global electronics brands closer to you with competitive showroom prices and genuine personal service.
          </p>
        </div>

        {/* 5-Floor Showroom Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 shadow-subtle">
            <div className="w-12 h-12 rounded-xl bg-blue-100 text-brand-blue flex items-center justify-center font-black text-xl mb-4">
              5
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">5 Full Commercial Floors</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Approximately 200 Gaj (~1,800 sq.ft) per floor of owned retail space, providing spacious display zones for televisions, refrigeration, air conditioning, and laundry care.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 shadow-subtle">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-black text-xl mb-4">
              <Building2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Commercial Passenger Lift</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Equipped with a modern commercial lift so senior citizens and families can easily explore all electronics display floors comfortably without climbing stairs.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 shadow-subtle">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-black text-xl mb-4">
              <Percent className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Wholesale-Tier Local Pricing</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Direct distributor partnerships mean selected models are ₹1,000–₹2,000 cheaper than Amazon and Flipkart, with genuine GST bills and official manufacturer warranty.
            </p>
          </div>
        </div>

        {/* Genuine Business Journey */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-5 text-slate-700 leading-relaxed text-sm sm:text-base">
            <h2 className="text-2xl sm:text-3xl font-black text-brand-navy tracking-tight">
              Direct Distributor Alliances. Zero Marketplace Middlemen.
            </h2>
            <p>
              Since 2019, our mission at Masoodpur Dairy has been simple: provide South Delhi families with the authentic showroom buying experience they deserve, without the artificially inflated overheads of shopping mall chains.
            </p>
            <p>
              We established direct procurement channels with authorized regional distributors of Sony, Samsung, LG, Daikin, Bosch, IFB, and Voltas. When you visit our showroom or inquire via WhatsApp, you receive honest product recommendations tailored to Delhi&apos;s climate, room sizes, and water hardness.
            </p>
            <p>
              Every television, air conditioner, and refrigerator we supply is backed by official brand warranty, sealed packaging, and authorized doorstep installation by brand-certified engineers.
            </p>

            <div className="pt-2">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Zero Grey Market Units · 100% Brand Sealed Boxes · Official GST Invoices</span>
              </div>
            </div>
          </div>

          {/* Visual Showcase */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="rounded-2xl overflow-hidden aspect-[3/4] bg-slate-100 border border-slate-200 shadow-subtle">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=600&q=80"
                  alt="Modern TV display room at Sharma Electronics"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 rounded-xl bg-slate-900 text-white text-center">
                <p className="text-lg font-bold">Physical Showroom</p>
                <p className="text-xs text-slate-400">Masoodpur Dairy, Vasant Kunj</p>
              </div>
            </div>

            <div className="space-y-4 pt-6">
              <div className="p-4 rounded-xl bg-blue-50 text-center border border-blue-100">
                <p className="text-lg font-bold text-brand-navy">Since 2019</p>
                <p className="text-xs text-slate-600">Trusted Electronics Retailer</p>
              </div>
              <div className="rounded-2xl overflow-hidden aspect-[3/4] bg-slate-100 border border-slate-200 shadow-subtle">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?auto=format&fit=crop&w=600&q=80"
                  alt="Home appliances and refrigerator department"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Operating Philosophy */}
        <div className="bg-slate-50 rounded-3xl border border-slate-200 p-8 sm:p-12 space-y-8">
          <div className="max-w-2xl">
            <span className="text-xs font-extrabold uppercase tracking-widest text-brand-blue">
              Our Retail Philosophy
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-brand-navy tracking-tight mt-1">
              How We Keep Prices Lower Than Online Marketplaces
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <h4 className="font-bold text-slate-900 text-base">1. Owned Commercial Property</h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Unlike mall stores that pay exorbitant monthly rents which inflate product tags, our five-floor building is an owned commercial property in Masoodpur.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-slate-900 text-base">2. Agile Inventory Model</h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                We maintain active demonstration units and core packed inventory, while sourcing specialized high-ticket SKUs directly on demand from distributor hubs.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-slate-900 text-base">3. Zero Marketplace Commissions</h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Online marketplaces charge sellers 8% to 15% in platform commissions and return logistics fees. When you buy locally from us, that margin stays in your wallet.
              </p>
            </div>
          </div>
        </div>

        {/* Showroom CTA */}
        <div className="bg-brand-navy text-white rounded-3xl p-8 sm:p-12 text-center space-y-6">
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
            Meet Us at the Showroom or Connect on WhatsApp
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
            Experience our personal service, compare prices with an open mind, and discover why your neighbours choose Sharma Electronics.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-xl bg-brand-whatsapp hover:bg-brand-whatsappHover text-white font-bold text-sm flex items-center gap-2 shadow-md"
            >
              <MessageCircle className="w-4 h-4 fill-white text-brand-whatsapp" />
              <span>Connect on WhatsApp</span>
            </a>

            <Link
              href="/contact"
              className="px-6 py-3.5 rounded-xl bg-brand-blue hover:bg-brand-blueHover text-white font-bold text-sm flex items-center gap-2"
            >
              <MapPin className="w-4 h-4" />
              <span>Showroom Directions</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
