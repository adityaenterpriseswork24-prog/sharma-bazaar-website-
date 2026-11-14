import Link from 'next/link';
import { Phone, MapPin, Sparkles, Lock } from 'lucide-react';
import { SITE_CONFIG } from '@/data/site-config';

export function AnnouncementBar() {
  return (
    <div className="bg-brand-navy text-white text-xs sm:text-sm py-2 px-4 border-b border-white/10">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1 sm:gap-4 text-center sm:text-left">
        <div className="flex items-center gap-2 font-medium tracking-wide">
          <span className="inline-flex items-center gap-1 bg-brand-blue/30 text-blue-300 text-[11px] font-semibold px-2 py-0.5 rounded-full border border-brand-blue/40">
            <Sparkles className="w-3 h-3 text-blue-300" />
            Vasant Kunj Showroom
          </span>
          <span className="text-slate-200">
            Premium Electronics · Competitive Local Prices · Visit Our 5-Floor Showroom
          </span>
        </div>

        <div className="hidden md:flex items-center gap-5 text-slate-300 text-xs">
          <a
            href={SITE_CONFIG.googleMapsDirectionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-white transition-colors"
          >
            <MapPin className="w-3.5 h-3.5 text-brand-blue" />
            <span>Masoodpur Dairy, Vasant Kunj</span>
          </a>
          <a
            href={`tel:${SITE_CONFIG.phone}`}
            className="flex items-center gap-1 hover:text-white transition-colors font-medium text-white"
          >
            <Phone className="w-3.5 h-3.5 text-emerald-400" />
            <span>{SITE_CONFIG.phone}</span>
          </a>
          <Link
            href="/admin/login"
            className="inline-flex items-center gap-1 bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white px-2 py-0.5 rounded transition-colors text-[11px] font-semibold"
            title="Showroom Staff Portal"
          >
            <Lock className="w-3 h-3 text-amber-300" />
            <span>Staff Login</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
