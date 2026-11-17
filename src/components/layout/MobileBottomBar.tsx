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
    `Hi Sharma Bazaar, I am viewing your website and want to check current showroom prices.`
  );

  return (
    <nav
      aria-label="Mobile quick actions"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-neutral-200/90 px-3 pt-2 pb-[max(0.6rem,env(safe-area-inset-bottom))] shadow-elevated"
    >
      <div className="grid grid-cols-3 gap-2 text-center">
        {/* Call Button */}
        <a
          href={`tel:${SITE_CONFIG.phone}`}
          className="flex flex-col items-center justify-center py-2 px-1 min-h-[44px] bg-neutral-50 hover:bg-neutral-100 active:scale-98 text-brand-navy rounded-lg text-[11px] font-semibold transition-all border border-neutral-200/80 font-mono shadow-xs"
        >
          <Phone className="w-3.5 h-3.5 text-neutral-600 mb-0.5" />
          <span>Call</span>
        </a>

        {/* Directions */}
        <a
          href={SITE_CONFIG.googleMapsDirectionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-2 px-1 min-h-[44px] bg-neutral-50 hover:bg-neutral-100 active:scale-98 text-brand-navy rounded-lg text-[11px] font-semibold transition-all border border-neutral-200/80 shadow-xs"
        >
          <Navigation className="w-3.5 h-3.5 text-neutral-600 mb-0.5" />
          <span>Directions</span>
        </a>

        {/* WhatsApp Inquiry Button */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-2 px-1 min-h-[44px] bg-[#25D366] hover:bg-[#20bd5a] active:scale-98 text-white rounded-lg text-[11px] font-semibold transition-all shadow-xs"
        >
          <MessageCircle className="w-3.5 h-3.5 fill-white mb-0.5" />
          <span>WhatsApp</span>
        </a>
      </div>
    </nav>
  );
}
