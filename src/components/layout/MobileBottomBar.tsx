'use client';

import { usePathname } from 'next/navigation';
import { Phone, MessageCircle, Navigation } from 'lucide-react';
import { SITE_CONFIG } from '@/data/site-config';
import { buildWhatsAppUrl } from '@/lib/utils';

export function MobileBottomBar() {
  const pathname = usePathname();

  if (pathname.startsWith('/admin')) {
    return null;
  }

  const whatsappUrl = buildWhatsAppUrl(
    SITE_CONFIG.whatsapp,
    `Hi Sharma Electronics, I am on your website and want to check showroom prices and current availability.`
  );

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-3 py-2.5 shadow-2xl">
      <div className="grid grid-cols-3 gap-2 text-center">
        {/* Call Button */}
        <a
          href={`tel:${SITE_CONFIG.phone}`}
          className="flex flex-col items-center justify-center py-1.5 px-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-bold transition-colors border border-slate-200"
        >
          <Phone className="w-4 h-4 text-brand-blue mb-0.5" />
          <span>Call Now</span>
        </a>

        {/* Directions */}
        <a
          href={SITE_CONFIG.googleMapsDirectionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-1.5 px-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-bold transition-colors border border-slate-200"
        >
          <Navigation className="w-4 h-4 text-emerald-600 mb-0.5" />
          <span>Directions</span>
        </a>

        {/* WhatsApp Inquiry Button */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-1.5 px-2 bg-brand-whatsapp hover:bg-brand-whatsappHover text-white rounded-lg text-xs font-bold transition-colors shadow-sm"
        >
          <MessageCircle className="w-4 h-4 fill-white text-brand-whatsapp mb-0.5" />
          <span>WhatsApp</span>
        </a>
      </div>
    </div>
  );
}
