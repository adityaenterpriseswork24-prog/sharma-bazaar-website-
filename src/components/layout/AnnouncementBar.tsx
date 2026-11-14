'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Phone, MapPin, Lock, ArrowUpRight } from 'lucide-react';
import { SITE_CONFIG } from '@/data/site-config';

export function AnnouncementBar() {
  const pathname = usePathname();

  if (pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <div className="bg-brand-navy text-white text-[11px] py-2 px-4 sm:px-8 border-b border-white/10 tracking-wide">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left: Location & Showroom scale */}
        <div className="flex items-center gap-3">
          <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-400 border border-white/15 px-2 py-0.5 rounded-sm">
            Showroom Direct
          </span>
          <span className="text-neutral-200 hidden sm:inline">
            Your Home Appliance Destination · Masoodpur Dairy, Vasant Kunj · Authorized Distributor Network
          </span>
          <span className="text-neutral-200 sm:hidden">
            Your Home Appliance Destination · Vasant Kunj
          </span>
        </div>

        {/* Right: Direct Contacts */}
        <div className="flex items-center gap-5 text-neutral-300 font-medium">
          <a
            href={SITE_CONFIG.googleMapsDirectionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <MapPin className="w-3 h-3 text-neutral-400" />
            <span>Find on Map</span>
          </a>

          <a
            href={`tel:${SITE_CONFIG.phone}`}
            className="inline-flex items-center gap-1.5 text-white hover:text-neutral-200 transition-colors font-mono"
          >
            <Phone className="w-3 h-3 text-neutral-400" />
            <span>{SITE_CONFIG.phone}</span>
          </a>

          <Link
            href="/admin/login"
            className="hidden lg:inline-flex items-center gap-1 text-neutral-400 hover:text-white transition-colors border-l border-white/15 pl-4 text-[10px] uppercase font-mono tracking-wider"
          >
            <Lock className="w-3 h-3" />
            <span>Staff</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
