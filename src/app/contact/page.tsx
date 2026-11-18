import { Metadata } from 'next';
import {
  Phone,
  MessageCircle,
  Navigation,
  Clock,
  MapPin,
} from 'lucide-react';
import { SITE_CONFIG } from '@/data/site-config';
import { buildWhatsAppUrl } from '@/lib/utils';
import { ContactForm } from '@/components/contact/ContactForm';

export const metadata: Metadata = {
  title: 'Contact & Directions | Electronics Store Vasant Kunj',
  description:
    'Visit Sharma Bazaar showroom at Dairy Farm, Masoodpur, Vasant Kunj, New Delhi 110070. Near Chattarpur Metro. Call +91 70650 09006 for instant quotes.',
  keywords: [
    'electronics store near vasant kunj metro',
    'electronics store near me',
    'electronics shop near nelson mandela marg',
    'electronics near vasant kunj extension',
    'tv shop near vasant kunj metro',
    'ac shop near vasant kunj metro',
    'electronics showroom vasant kunj',
    'electronics store masoodpur vasant kunj',
    'electronics store mahipalpur',
  ],
  alternates: {
    canonical: 'https://www.sharmabazaar.com/contact',
  },
};

export default function ContactPage() {
  const whatsappUrl = buildWhatsAppUrl(
    SITE_CONFIG.whatsapp,
    `Hi Sharma Bazaar, I am on your contact page and would like to get directions or check showroom opening today.`
  );

  return (
    <div className="bg-white min-h-screen py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="max-w-3xl space-y-3">
          <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-400">
            Showroom Access &amp; Concierge
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-brand-navy">
            Visit Our Vasant Kunj Showroom
          </h1>
          <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-normal">
            Located at Dairy Farm, 80-B, Masoodpur, G/F, Vasant Kunj with spacious electronics display zones and convenient showroom parking.
          </p>
        </div>

        {/* 3 Contact Pillar Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
          <a
            href={`tel:${SITE_CONFIG.phone}`}
            className="p-6 bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 rounded-sm transition-colors block space-y-2"
          >
            <div className="flex items-center justify-between text-neutral-400">
              <span className="text-[10px] uppercase">Telephone</span>
              <Phone className="w-3.5 h-3.5" />
            </div>
            <p className="text-base font-bold text-brand-navy">{SITE_CONFIG.phone}</p>
            <p className="text-neutral-500 font-sans text-xs">Direct line during showroom hours (10 AM - 9 PM)</p>
          </a>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-6 bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 rounded-sm transition-colors block space-y-2"
          >
            <div className="flex items-center justify-between text-neutral-400">
              <span className="text-[10px] uppercase">WhatsApp Quote</span>
              <MessageCircle className="w-3.5 h-3.5" />
            </div>
            <p className="text-base font-bold text-brand-navy">{SITE_CONFIG.phone}</p>
            <p className="text-neutral-500 font-sans text-xs">Share online link for instant showroom match</p>
          </a>

          <a
            href={SITE_CONFIG.googleMapsDirectionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-6 bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 rounded-sm transition-colors block space-y-2"
          >
            <div className="flex items-center justify-between text-neutral-400">
              <span className="text-[10px] uppercase">Location</span>
              <Navigation className="w-3.5 h-3.5" />
            </div>
            <p className="text-base font-bold text-brand-navy">Dairy Farm, Masoodpur</p>
            <p className="text-neutral-500 font-sans text-xs">Turn-by-turn Google Maps navigation</p>
          </a>
        </div>

        {/* Map & Inquiry Form Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Map & Showroom Hours */}
          <div className="lg:col-span-7 space-y-6">
            <div className="border border-neutral-200 rounded-sm overflow-hidden bg-white">
              <div className="p-5 border-b border-neutral-200 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-brand-navy">Masoodpur Showroom (G/F)</h3>
                  <p className="text-xs text-neutral-500 font-mono mt-0.5">
                    {SITE_CONFIG.address}, {SITE_CONFIG.area}, New Delhi - {SITE_CONFIG.pincode}
                  </p>
                </div>
                <span className="font-mono text-xs text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded-sm border border-emerald-200">
                  Open Today: 10 AM – 9 PM
                </span>
              </div>

              <div className="aspect-[16/10] bg-neutral-100 min-h-[340px]">
                <iframe
                  title="Sharma Bazaar Location in Masoodpur Vasant Kunj"
                  src={SITE_CONFIG.googleMapsEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: '340px' }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>

            {/* Metro directions */}
            <div className="p-6 border border-neutral-200 bg-neutral-50 rounded-sm space-y-3 font-mono text-xs">
              <span className="text-[10px] uppercase tracking-widest text-neutral-400">
                Transit &amp; Metro Connectivity
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                <div className="p-3 bg-white border border-neutral-200 rounded-sm">
                  <p className="font-bold text-brand-navy">Chattarpur Metro</p>
                  <p className="text-neutral-500 text-[11px] mt-0.5">Yellow Line · 8 mins</p>
                </div>
                <div className="p-3 bg-white border border-neutral-200 rounded-sm">
                  <p className="font-bold text-brand-navy">Delhi Aerocity</p>
                  <p className="text-neutral-500 text-[11px] mt-0.5">Airport Line · 10 mins</p>
                </div>
                <div className="p-3 bg-white border border-neutral-200 rounded-sm">
                  <p className="font-bold text-brand-navy">Vasant Vihar</p>
                  <p className="text-neutral-500 text-[11px] mt-0.5">Magenta Line · 12 mins</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="lg:col-span-5">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
