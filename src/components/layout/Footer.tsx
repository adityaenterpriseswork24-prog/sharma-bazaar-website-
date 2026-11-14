import Link from 'next/link';
import { Phone, MessageCircle, MapPin, Clock, Building2, ExternalLink } from 'lucide-react';
import { SITE_CONFIG, ELECTRONICS_CATEGORIES } from '@/data/site-config';
import { buildWhatsAppUrl } from '@/lib/utils';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const whatsappUrl = buildWhatsAppUrl(
    SITE_CONFIG.whatsapp,
    `Hi Sharma Electronics, I would like to inquire about showroom prices & visit directions.`
  );

  return (
    <footer className="bg-brand-navy text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-slate-800">
          {/* Brand & Showroom Credibility */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-4">
              <span className="text-2xl font-black text-white tracking-tight">
                Sharma<span className="text-brand-blue">.</span>Electronics
              </span>
            </Link>
            <p className="text-sm text-slate-400 mb-6 leading-relaxed max-w-sm">
              South Delhi&apos;s premier multi-brand consumer electronics destination.
              Part of Sharma Furniture (Est. 2019) operating from our 5-floor commercial showroom
              in Masoodpur Dairy, Vasant Kunj with commercial lift access.
            </p>

            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2 text-xs">
              <div className="flex items-center gap-2 text-white font-semibold">
                <Building2 className="w-4 h-4 text-brand-blue" />
                <span>5-Floor Commercial Showroom (~200 Gaj/Floor)</span>
              </div>
              <p className="text-slate-400">
                Commercial lift available · Limited display & packed stock · Multi-dealer procurement on demand.
              </p>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
              Categories
            </h3>
            <ul className="space-y-2.5 text-sm">
              {ELECTRONICS_CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/electronics?category=${cat.id}`}
                    className="hover:text-white transition-colors text-slate-400"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links & Local Areas */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
              South Delhi Areas Served
            </h3>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>Vasant Kunj (Sectors A, B, C, D)</li>
              <li>Masoodpur & Mahipalpur</li>
              <li>Vasant Vihar & Anand Niketan</li>
              <li>Chattarpur & Mehrauli</li>
              <li>Munirka & Malviya Nagar</li>
              <li>Delhi Aerocity & Gurgaon Border</li>
            </ul>
            <div className="mt-4 pt-3 border-t border-slate-800">
              <Link href="/about" className="text-xs text-brand-blue hover:underline">
                Our 2019 Business Story &rarr;
              </Link>
            </div>
          </div>

          {/* Showroom Visit & Direct Contact */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
              Visit Showroom
            </h3>
            <ul className="space-y-3 text-xs text-slate-400">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-brand-blue shrink-0 mt-0.5" />
                <span>
                  {SITE_CONFIG.address}, {SITE_CONFIG.area}, {SITE_CONFIG.city} - {SITE_CONFIG.pincode}
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{SITE_CONFIG.workingHours}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                <a href={`tel:${SITE_CONFIG.phone}`} className="hover:text-white transition-colors text-slate-300 font-medium">
                  {SITE_CONFIG.phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors text-slate-300 font-medium">
                  WhatsApp: +91 {SITE_CONFIG.whatsapp}
                </a>
              </li>
            </ul>

            <div className="mt-4">
              <a
                href={SITE_CONFIG.googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-brand-blue font-semibold hover:underline"
              >
                <span>Get Google Maps Directions</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar with Admin Link */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © {currentYear} {SITE_CONFIG.businessName}. All rights reserved. Physical electronics showroom serving South Delhi.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/electronics" className="hover:text-slate-300 transition-colors">
              Product Catalogue
            </Link>
            <Link href="/about" className="hover:text-slate-300 transition-colors">
              About Showroom
            </Link>
            <Link href="/contact" className="hover:text-slate-300 transition-colors">
              Directions & Contact
            </Link>
            <Link href="/admin" className="hover:text-slate-300 transition-colors text-slate-400 hover:text-white font-medium">
              Staff / Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
