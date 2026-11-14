'use client';

import { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { SITE_CONFIG } from '@/data/site-config';
import { buildWhatsAppUrl } from '@/lib/utils';

export function FloatingWhatsApp() {
  const [closed, setClosed] = useState(false);

  const defaultMsg = `Hi Sharma Electronics, I am on your website and want to check your best showroom price & availability.`;
  const url = buildWhatsAppUrl(SITE_CONFIG.whatsapp, defaultMsg);

  return (
    <div className="fixed bottom-20 md:bottom-6 right-4 sm:right-6 z-40 flex flex-col items-end gap-2">
      {/* Speech Bubble */}
      {!closed && (
        <div className="hidden sm:flex items-center gap-2 bg-white text-slate-800 text-xs font-semibold py-1.5 px-3 rounded-full shadow-lg border border-slate-200/80 animate-bounce">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          <span>Compare online price with us!</span>
          <button
            onClick={() => setClosed(true)}
            className="text-slate-400 hover:text-slate-600 ml-1"
            aria-label="Dismiss message"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Pulsing WhatsApp Button */}
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp with Sharma Electronics"
        className="group relative flex items-center justify-center w-14 h-14 bg-brand-whatsapp hover:bg-brand-whatsappHover text-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95"
      >
        <span className="absolute -inset-1 rounded-full bg-emerald-400 opacity-30 group-hover:opacity-60 blur-sm animate-ping duration-1000"></span>
        <MessageCircle className="w-7 h-7 fill-white text-brand-whatsapp relative z-10" />
      </a>
    </div>
  );
}
