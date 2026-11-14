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
    `Hi Sharma Electronics, I am viewing your website and want to check current showroom prices.`
  );

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-neutral-200 px-3 py-2 shadow-elevated">
      <div className="grid grid-cols-3 gap-2 text-center">
        {/* Call Button */}
        <a
          href={`tel:${SITE_CONFIG.phone}`}
          className="flex flex-col items-center justify-center py-2 px-1 bg-neutral-50 hover:bg-neutral-100 text-brand-navy rounded-sm text-[11px] font-semibold transition-colors border border-neutral-200 font-mono"
        >
          <Phone className="w-3.5 h-3.5 text-neutral-600 mb-0.5" />
          <span>Call</span>
        </a>

        {/* Directions */}
        <a
          href={SITE_CONFIG.googleMapsDirectionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-2 px-1 bg-neutral-50 hover:bg-neutral-100 text-brand-navy rounded-sm text-[11px] font-semibold transition-colors border border-neutral-200"
        >
          <Navigation className="w-3.5 h-3.5 text-neutral-600 mb-0.5" />
          <span>Directions</span>
        </a>

        {/* WhatsApp Inquiry Button */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-2 px-1 bg-brand-whatsapp hover:bg-brand-whatsappDark text-white rounded-sm text-[11px] font-semibold transition-colors shadow-subtle"
        >
          <MessageCircle className="w-3.5 h-3.5 fill-white mb-0.5" />
          <span>WhatsApp</span>
        </a>
      </div>
    </div>
  );
}
