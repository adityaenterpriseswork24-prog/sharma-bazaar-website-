import { Metadata } from 'next';
import {
  Phone,
  MessageCircle,
  ExternalLink,
  Train,
  Navigation,
} from 'lucide-react';
import { SITE_CONFIG, METRO_DIRECTIONS } from '@/data/site-config';
import { buildWhatsAppUrl } from '@/lib/utils';
import { ContactForm } from '@/components/contact/ContactForm';

export const metadata: Metadata = {
  title: 'Contact Showroom & Driving Directions | Sharma Electronics Vasant Kunj',
  description:
    'Visit Sharma Electronics at Masoodpur Dairy, Vasant Kunj, New Delhi 110070. Call +91 70119 62356 or WhatsApp. Complete directions from Chattarpur, Aerocity & Vasant Vihar Metro Stations.',
  alternates: {
    canonical: 'https://www.sharmaelectronics.com/contact',
  },
};

export default function ContactPage() {
  const whatsappUrl = buildWhatsAppUrl(
    SITE_CONFIG.whatsapp,
    `Hi Sharma Electronics, I am on your contact page and would like to get directions or check showroom opening today.`
  );

  return (
    <div className="bg-slate-50/60 min-h-screen py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="max-w-3xl space-y-3">
          <span className="text-xs font-extrabold uppercase tracking-widest text-brand-blue">
            Physical Showroom &amp; Direct Assistance
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-brand-navy tracking-tight">
            Visit Our Vasant Kunj Showroom
          </h1>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            We are situated on the main road in Masoodpur Dairy, Vasant Kunj with 5 floors of electronics and furniture displays and a commercial lift.
          </p>
        </div>

        {/* 3 Quick Contact Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <a
            href={`tel:${SITE_CONFIG.phone}`}
            className="p-6 rounded-2xl bg-white border border-slate-200 shadow-subtle hover:shadow-card hover:border-brand-blue transition-all group"
          >
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-brand-blue flex items-center justify-center font-bold text-xl mb-4 group-hover:bg-brand-blue group-hover:text-white transition-colors">
              <Phone className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1">Telephone Inquiries</h3>
            <p className="text-lg font-extrabold text-brand-navy mb-1">{SITE_CONFIG.phone}</p>
            <p className="text-xs text-slate-500">Instant response during showroom hours (10 AM - 9 PM)</p>
          </a>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-6 rounded-2xl bg-white border border-slate-200 shadow-subtle hover:shadow-card hover:border-emerald-500 transition-all group"
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-xl mb-4 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <MessageCircle className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1">WhatsApp Chat &amp; Quotes</h3>
            <p className="text-lg font-extrabold text-emerald-700 mb-1">+91 {SITE_CONFIG.whatsapp}</p>
            <p className="text-xs text-slate-500">Send model screenshot for instant counter-offer</p>
          </a>

          <a
            href={SITE_CONFIG.googleMapsDirectionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-6 rounded-2xl bg-white border border-slate-200 shadow-subtle hover:shadow-card hover:border-indigo-500 transition-all group"
          >
            <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-xl mb-4 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
              <Navigation className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1">Google Maps Navigation</h3>
            <p className="text-sm font-extrabold text-slate-800 mb-1">Masoodpur Dairy, Vasant Kunj</p>
            <p className="text-xs text-slate-500">Tap for live turn-by-turn driving directions</p>
          </a>
        </div>

        {/* Map & Inquiry Form Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Map & Showroom Hours */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-subtle">
              <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Showroom Location</h3>
                  <p className="text-xs text-slate-500">
                    {SITE_CONFIG.address}, {SITE_CONFIG.area}, New Delhi - {SITE_CONFIG.pincode}
                  </p>
                </div>
                <a
                  href={SITE_CONFIG.googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 rounded-lg bg-brand-blue text-white text-xs font-semibold hover:bg-brand-blueHover flex items-center gap-1"
                >
                  <span>Open Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <div className="aspect-[16/10] w-full bg-slate-100">
                <iframe
                  title="Sharma Electronics Location Map"
                  src={SITE_CONFIG.googleMapsEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                ></iframe>
              </div>
            </div>

            {/* Metro Directions Section */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-subtle space-y-4">
              <div className="flex items-center gap-2 text-brand-navy">
                <Train className="w-5 h-5 text-brand-blue" />
                <h3 className="text-lg font-bold">Directions from Nearby Metro Stations</h3>
              </div>
              <p className="text-xs text-slate-500">
                Our showroom is easily accessible by auto, taxi, or personal vehicle from 3 major Delhi Metro lines:
              </p>

              <div className="space-y-3 pt-2">
                {METRO_DIRECTIONS.map((dir, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-slate-900">{dir.metroLine}</span>
                      <span className="font-semibold text-brand-blue bg-blue-50 px-2 py-0.5 rounded">
                        {dir.distance} · {dir.travelTime}
                      </span>
                    </div>
                    <p className="text-slate-600 leading-relaxed">{dir.route}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Instant WhatsApp Lead Form */}
          <div className="lg:col-span-5">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
