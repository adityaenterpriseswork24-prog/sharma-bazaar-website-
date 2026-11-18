import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
  Building2,
  Percent,
  MessageCircle,
  MapPin,
  ShieldCheck,
  Award,
  ArrowRight,
} from 'lucide-react';
import { SITE_CONFIG } from '@/data/site-config';
import { buildWhatsAppUrl } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'About Sharma Bazaar | Leading Electronics Dealer Vasant Kunj, South Delhi',
  description:
    'Established in 2019 at Dairy Farm, 80-B, Masoodpur, G/F, Vasant Kunj, Sharma Bazaar is South Delhi\'s trusted consumer electronics dealer & showroom serving Vasant Kunj, Munirka, Mehrauli, Saket & Dwarka.',
  keywords: [
    'electronics showroom vasant kunj',
    'electronics dealer vasant kunj',
    'consumer electronics vasant kunj',
    'electronics store masoodpur vasant kunj',
    'best electronics store south delhi',
    'electronics showroom munirka delhi',
    'tv dealer mehrauli delhi',
    'electronics store mahipalpur',
    'electronics store vasant vihar delhi',
  ],
  alternates: {
    canonical: 'https://www.sharmabazaar.com/about',
  },
};

export default function AboutPage() {
  const whatsappUrl = buildWhatsAppUrl(
    SITE_CONFIG.whatsapp,
    `Hi Sharma Bazaar, I read your About page and would like to visit the showroom or inquire about a product.`
  );

  return (
    <div className="bg-white min-h-screen py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Hero Section */}
        <div className="max-w-3xl space-y-4">
          <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-400">
            Heritage &amp; Infrastructure
          </span>

          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-brand-navy leading-tight">
            South Delhi&apos;s Dedicated Multi-Brand Electronics Showroom
          </h1>

          <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-normal">
            Established in 2019 at Dairy Farm, 80-B, Masoodpur, G/F, Vasant Kunj, Sharma Bazaar has grown into one of South Delhi&apos;s most dependable physical retail destinations. Operating from our owned commercial showroom property, we bring leading global electronics brands closer to you with competitive showroom prices and personal service.
          </p>
        </div>

        {/* 3 Infrastructure Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
          <div className="p-6 bg-neutral-50 border border-neutral-200 rounded-sm space-y-2">
            <p className="text-neutral-400 text-[10px]">01 · FACILITY</p>
            <h3 className="text-base font-bold text-brand-navy font-sans">Physical Showroom</h3>
            <p className="text-neutral-600 font-sans text-xs leading-relaxed">
              Dedicated retail showroom space at Dairy Farm, 80-B, Masoodpur, G/F, Vasant Kunj, providing spacious display zones for televisions, refrigeration, air conditioning, and washing machines.
            </p>
          </div>

          <div className="p-6 bg-neutral-50 border border-neutral-200 rounded-sm space-y-2">
            <p className="text-neutral-400 text-[10px]">02 · EXPERIENCE</p>
            <h3 className="text-base font-bold text-brand-navy font-sans">Live Demonstration</h3>
            <p className="text-neutral-600 font-sans text-xs leading-relaxed">
              Active display units allowing homeowners and families to test picture quality, viewing angles, audio performance, and build finishes before deciding.
            </p>
          </div>

          <div className="p-6 bg-neutral-50 border border-neutral-200 rounded-sm space-y-2">
            <p className="text-neutral-400 text-[10px]">03 · ADVANTAGE</p>
            <h3 className="text-base font-bold text-brand-navy font-sans">Direct Dealer Pricing</h3>
            <p className="text-neutral-600 font-sans text-xs leading-relaxed">
              Direct regional distributor agreements mean select models offer ₹1,000–₹5,000 in savings compared to major online portals, with authentic GST bills and manufacturer warranty.
            </p>
          </div>
        </div>

        {/* Brand Narrative */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-6 border-t border-neutral-200">
          <div className="lg:col-span-6 space-y-4 text-xs sm:text-sm text-neutral-700 leading-relaxed">
            <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-400">
              The Showroom Story
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-brand-navy font-sans">
              Direct Regional Distributor Networks. Zero Platform Intermediaries.
            </h2>
            <p>
              Since 2019, our philosophy at Dairy Farm, 80-B, Masoodpur, G/F, Vasant Kunj has been straightforward: deliver the authentic physical buying experience that homeowners deserve, free from the bloated overheads and commission surcharges of shopping mall retailers.
            </p>
            <p>
              We established direct procurement relationships with authorized regional distributors of Sony, Samsung, LG, Daikin, Bosch, IFB, and Voltas. When you speak with us, you receive honest recommendations tailored to Delhi&apos;s climate, room dimensions, and water conditions.
            </p>
            <p>
              Every unit we supply is guaranteed brand new in a factory-sealed carton, backed by authorized manufacturer warranty, and installed at your doorstep by brand-certified engineers.
            </p>
          </div>

          <div className="lg:col-span-6 border border-neutral-200 p-3 bg-neutral-50 rounded-sm">
            <div className="relative aspect-[4/3] bg-white overflow-hidden border border-neutral-200">
              <Image
                src="/images/showroom/sharma-bazaar-showroom-interior.jpg"
                alt="Sharma Bazaar physical showroom facility at Dairy Farm Masoodpur Vasant Kunj South Delhi"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="mt-3 flex items-center justify-between text-xs font-mono text-neutral-500">
              <span>Dairy Farm, 80-B, Masoodpur, G/F, Vasant Kunj</span>
              <span>Serving South Delhi Since 2019</span>
            </div>
          </div>
        </div>

        {/* Direct Action */}
        <div className="p-8 sm:p-12 bg-brand-navy text-white rounded-sm text-center space-y-4">
          <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-400">
            Visit Our Showroom
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white max-w-xl mx-auto">
            Experience Our Showroom in Person
          </h2>
          <p className="text-xs sm:text-sm text-neutral-300 max-w-md mx-auto">
            Walk into our showroom at Dairy Farm, 80-B, Masoodpur, G/F, Vasant Kunj or message us on WhatsApp for price comparisons.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 bg-brand-whatsapp hover:bg-brand-whatsappDark text-white text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors flex items-center gap-2 shadow-subtle"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Inquire on WhatsApp</span>
            </a>

            <Link
              href="/contact"
              className="px-6 py-3.5 bg-white text-brand-navy hover:bg-neutral-100 text-xs font-bold uppercase tracking-wider rounded-sm transition-colors"
            >
              <span>Get Directions</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
