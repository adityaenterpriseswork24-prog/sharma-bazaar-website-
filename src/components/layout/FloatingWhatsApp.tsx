'use client';

import { usePathname } from 'next/navigation';
import { MessageCircle } from 'lucide-react';
import { SITE_CONFIG } from '@/data/site-config';
import { buildWhatsAppUrl } from '@/lib/utils';

export function FloatingWhatsApp() {
  const pathname = usePathname();

  if (pathname.startsWith('/admin')) {
    return null;
  }

  const defaultMsg = `Hi Sharma Bazaar, I am on your website and want to check your best showroom price & availability.`;
  const url = buildWhatsAppUrl(SITE_CONFIG.whatsapp, defaultMsg);

  return (
    <div className="fixed bottom-20 md:bottom-6 right-5 sm:right-8 z-40">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Inquire on WhatsApp with Sharma Bazaar"
        className="group flex items-center gap-2.5 px-4 py-3 bg-brand-whatsapp hover:bg-brand-whatsappDark text-white rounded-full shadow-hover hover:shadow-elevated transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
      >
        <MessageCircle className="w-5 h-5 fill-white text-transparent shrink-0" />
        <span className="hidden sm:inline text-xs font-semibold tracking-wide">
          WhatsApp Price Quote
        </span>
      </a>
    </div>
  );
}
