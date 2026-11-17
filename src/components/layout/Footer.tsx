'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Phone, MessageCircle, MapPin, Clock, ExternalLink, Lock } from 'lucide-react';
import { SITE_CONFIG, ELECTRONICS_CATEGORIES } from '@/data/site-config';
import { buildWhatsAppUrl } from '@/lib/utils';

export function Footer() {
  const pathname = usePathname();
  const currentYear = new Date().getFullYear();

  if (pathname.startsWith('/admin')) {
    return null;
  }

  const whatsappUrl = buildWhatsAppUrl(
    SITE_CONFIG.whatsapp,
    `Hi Sharma Bazaar, I am viewing your website and would like showroom assistance or driving directions.`
  );

  return (
    <footer className="bg-brand-navy text-neutral-300 pt-16 pb-12 border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main 4-Column Architectural Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          {/* Col 1: Identity & Showroom Context */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-sm bg-black overflow-hidden flex items-center justify-center border border-white/10 shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/sharma-bazaar-badge.png"
                  alt="Sharma Bazaar Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-xl font-bold tracking-tight text-white font-sans">
                    SHARMA
                  </span>
                  <span className="text-xs font-mono tracking-widest text-neutral-400 uppercase">
                    BAZAAR
                  </span>
                </div>
                <p className="text-[10px] font-mono text-neutral-400">
                  Your Home Appliance Destination.
                </p>
              </div>
            </Link>

            <p className="text-xs text-neutral-400 leading-relaxed max-w-sm">
              South Delhi&apos;s premier multi-brand consumer electronics showroom.
              Physical store located at Dairy Farm, 80-B, Masoodpur, G/F, Vasant Kunj with authorized distributor pricing.
            </p>

            <div className="p-3.5 rounded-sm bg-white/5 border border-white/10 space-y-1.5 font-mono text-[11px]">
              <div className="text-white font-medium flex items-center justify-between">
                <span>Physical Showroom</span>
                <span className="text-neutral-400">Est. 2019</span>
              </div>
              <p className="text-neutral-400 text-[10px] leading-normal">
                Direct regional dealer network · Televisions · Refrigeration · Air Conditioning · Washing Machines
              </p>
            </div>
          </div>

          {/* Col 2: Categories */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-mono text-[11px] uppercase tracking-widest text-white">
              Inventory Categories
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              {ELECTRONICS_CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/electronics?category=${cat.id}`}
                    className="text-neutral-400 hover:text-white transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: South Delhi Areas Served */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-mono text-[11px] uppercase tracking-widest text-white">
              Local Delivery Areas
            </h4>
            <ul className="space-y-1.5 text-xs font-mono text-[11px]">
              <li>
                <Link href="/locations/vasant-kunj" className="text-neutral-400 hover:text-white transition-colors">
                  Vasant Kunj (A–D)
                </Link>
              </li>
              <li>
                <Link href="/locations/chattarpur" className="text-neutral-400 hover:text-white transition-colors">
                  Chattarpur &amp; DLF
                </Link>
              </li>
              <li>
                <Link href="/locations/vasant-vihar" className="text-neutral-400 hover:text-white transition-colors">
                  Vasant Vihar &amp; Shanti Niketan
                </Link>
              </li>
              <li>
                <Link href="/locations/saket" className="text-neutral-400 hover:text-white transition-colors">
                  Saket &amp; Malviya Nagar
                </Link>
              </li>
              <li>
                <Link href="/locations/greater-kailash-1" className="text-neutral-400 hover:text-white transition-colors">
                  GK 1 &amp; GK 2
                </Link>
              </li>
              <li>
                <Link href="/locations/defence-colony" className="text-neutral-400 hover:text-white transition-colors">
                  Defence Colony &amp; South Ex
                </Link>
              </li>
              <li>
                <Link href="/locations/cr-park" className="text-neutral-400 hover:text-white transition-colors">
                  CR Park &amp; Alaknanda
                </Link>
              </li>
              <li>
                <Link href="/locations/dwarka" className="text-neutral-400 hover:text-white transition-colors">
                  Dwarka (Sec 1–24)
                </Link>
              </li>
              <li className="pt-1">
                <Link href="/locations" className="text-emerald-400 hover:text-emerald-300 font-sans font-semibold text-xs inline-flex items-center gap-1">
                  <span>View All 28 Areas &rarr;</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Showroom Hours & Direct Channels */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-mono text-[11px] uppercase tracking-widest text-white">
              Showroom Access
            </h4>
            <div className="space-y-2.5 text-xs text-neutral-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-neutral-400 shrink-0 mt-0.5" />
                <span className="text-neutral-400 leading-snug">
                  {SITE_CONFIG.address}, {SITE_CONFIG.area}, New Delhi - {SITE_CONFIG.pincode}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                <span className="font-mono text-[11px]">{SITE_CONFIG.workingHours}</span>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                <a href={`tel:${SITE_CONFIG.phone}`} className="font-mono hover:text-white transition-colors">
                  {SITE_CONFIG.phone}
                </a>
              </div>

              <div className="pt-1">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-sm bg-brand-whatsapp hover:bg-brand-whatsappDark text-white text-xs font-semibold transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-white" />
                  <span>WhatsApp Showroom</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-500 text-[11px]">
          <p>© {currentYear} {SITE_CONFIG.businessName}. Physical showroom serving South Delhi since 2019.</p>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="/return-policy" className="hover:text-white transition-colors">
              Delivery &amp; Returns
            </Link>
            <Link href="/contact" className="hover:text-white transition-colors">
              Directions
            </Link>
            <Link href="/admin/login" className="hover:text-white transition-colors inline-flex items-center gap-1">
              <Lock className="w-3 h-3" />
              <span>Staff Login</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
