'use client';

import { usePathname } from 'next/navigation';
import { MessageCircle, Phone } from 'lucide-react';
import { SITE_CONFIG } from '@/data/site-config';
import { buildWhatsAppUrl } from '@/lib/utils';

export function FloatingWhatsApp() {
  const pathname = usePathname();

  if (pathname.startsWith('/admin') || pathname === '/contact') {
    return null;
  }

  const defaultMsg = `Hi Sharma Bazaar, I am on your website and want to check your best showroom price & availability.`;
  const url = buildWhatsAppUrl(SITE_CONFIG.whatsapp, defaultMsg);

  return (
    <div className="hidden md:flex fixed bottom-6 right-6 z-40 flex-col items-end gap-2.5 pointer-events-none">
      {/* Floating Call Button */}
      <a
        href={`tel:${SITE_CONFIG.phone}`}
        aria-label={`Call Sharma Bazaar showroom at ${SITE_CONFIG.phone}`}
        className="pointer-events-auto group flex items-center gap-2 px-3.5 py-2.5 sm:px-4 sm:py-3 bg-brand-navy hover:bg-neutral-900 text-white rounded-full shadow-hover hover:shadow-elevated transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 border border-white/15"
      >
        <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
          <Phone className="w-3.5 h-3.5 text-emerald-400" />
        </div>
        <span className="hidden sm:inline text-xs font-semibold tracking-wide">
          Call Showroom
        </span>
        <span className="hidden md:inline font-mono text-[11px] text-neutral-300">
          {SITE_CONFIG.phone}
        </span>
      </a>

      {/* Floating WhatsApp Button */}
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Inquire on WhatsApp with Sharma Bazaar"
        className="pointer-events-auto group flex items-center gap-2.5 px-3.5 py-2.5 sm:px-4 sm:py-3 bg-brand-whatsapp hover:bg-brand-whatsappDark text-white rounded-full shadow-hover hover:shadow-elevated transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
      >
        <MessageCircle className="w-5 h-5 fill-white text-transparent shrink-0" />
        <span className="hidden sm:inline text-xs font-semibold tracking-wide">
          WhatsApp Price Quote
        </span>
      </a>
    </div>
  );
}
