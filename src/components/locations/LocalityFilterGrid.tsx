'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, MapPin, Clock, ArrowRight, MessageCircle, ShieldCheck, Truck } from 'lucide-react';
import { DeliveryLocality } from '@/data/locations';
import { SITE_CONFIG } from '@/data/site-config';
import { buildWhatsAppUrl } from '@/lib/utils';

interface LocalityFilterGridProps {
  localities: DeliveryLocality[];
}

export function LocalityFilterGrid({ localities }: LocalityFilterGridProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLocalities = localities.filter((loc) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      loc.name.toLowerCase().includes(q) ||
      loc.pincodes.some((pin) => pin.includes(q)) ||
      loc.landmarkCoverage.some((lm) => lm.toLowerCase().includes(q)) ||
      loc.keySectors.some((sec) => sec.toLowerCase().includes(q))
    );
  });

  return (
    <div className="space-y-8">
      {/* Search & Filter Header */}
      <div className="bg-neutral-50 border border-neutral-200 p-4 sm:p-6 rounded-sm">
        <div className="max-w-2xl">
          <label
            htmlFor="locality-search"
            className="block font-mono text-[11px] uppercase tracking-widest text-neutral-500 mb-2"
          >
            Check Delivery Availability for Your Sector or Locality
          </label>
          <div className="relative">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              id="locality-search"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by sector (e.g. Sector B, Pocket 1), locality (e.g. Chattarpur, Vasant Kunj), or pincode (110070)..."
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-white border border-neutral-300 rounded-sm focus:outline-none focus:border-brand-navy focus:ring-1 focus:ring-brand-navy placeholder:text-neutral-400 font-sans"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono text-neutral-400 hover:text-neutral-700"
              >
                Clear
              </button>
            )}
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2 text-[11px] font-mono text-neutral-500">
            <span className="text-neutral-400">Quick Filters:</span>
            {['Vasant Kunj', 'Chattarpur', 'Mahipalpur', 'Vasant Vihar', 'Saket', '110070'].map(
              (tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setSearchQuery(tag)}
                  className="px-2 py-0.5 rounded-sm bg-white border border-neutral-200 hover:border-brand-navy text-neutral-700 transition-colors"
                >
                  {tag}
                </button>
              )
            )}
          </div>
        </div>
      </div>

      {/* Grid of Locality Cards */}
      {filteredLocalities.length === 0 ? (
        <div className="p-12 text-center border border-dashed border-neutral-300 rounded-sm bg-white">
          <MapPin className="w-8 h-8 text-neutral-400 mx-auto mb-3" />
          <h3 className="text-base font-bold text-brand-navy">No exact match found for &ldquo;{searchQuery}&rdquo;</h3>
          <p className="text-xs text-neutral-500 mt-1 max-w-md mx-auto">
            We deliver to virtually all residential and commercial addresses in South Delhi. Contact our dispatch team directly on WhatsApp to check immediate van availability.
          </p>
          <div className="mt-4">
            <a
              href={buildWhatsAppUrl(
                SITE_CONFIG.whatsapp,
                `Hi Sharma Bazaar, can you deliver an appliance to my location: "${searchQuery}"? Please confirm delivery turnaround time.`
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-brand-whatsapp hover:bg-brand-whatsappDark rounded-sm transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-white" />
              <span>Inquire for &ldquo;{searchQuery}&rdquo; on WhatsApp</span>
            </a>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLocalities.map((loc) => {
            const waUrl = buildWhatsAppUrl(
              SITE_CONFIG.whatsapp,
              `Hi Sharma Bazaar, I would like same-day doorstep appliance delivery in ${loc.name}. Please share available models and today's showroom price.`
            );

            return (
              <div
                key={loc.slug}
                className="bg-white border border-neutral-200 rounded-sm hover:border-brand-navy transition-all duration-200 flex flex-col justify-between group shadow-subtle hover:shadow-md"
              >
                <div className="p-6 space-y-4">
                  {/* Top Bar: Distance & Turnaround Pill */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-500 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-neutral-400" />
                      {loc.distanceFromShowroom.split('(')[0].trim()}
                    </span>
                    <span className="font-mono text-[10px] font-semibold tracking-wider text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-sm">
                      {loc.deliveryPill}
                    </span>
                  </div>

                  {/* Locality Title & Description */}
                  <div>
                    <h3 className="text-lg font-bold text-brand-navy group-hover:text-neutral-900 transition-colors">
                      {loc.name}
                    </h3>
                    <p className="text-xs text-neutral-500 font-mono mt-0.5">
                      Pincodes: {loc.pincodes.join(', ')}
                    </p>
                    <p className="text-xs text-neutral-600 font-sans mt-2.5 line-clamp-3 leading-relaxed">
                      {loc.overview}
                    </p>
                  </div>

                  {/* Key Coverage Tags */}
                  <div className="pt-2 border-t border-neutral-100">
                    <p className="font-mono text-[10px] uppercase tracking-widest text-neutral-400 mb-2">
                      Key Coverage Zones
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {loc.keySectors.slice(0, 5).map((sector) => (
                        <span
                          key={sector}
                          className="text-[10px] font-mono bg-neutral-50 text-neutral-600 px-2 py-0.5 rounded-sm border border-neutral-200/70"
                        >
                          {sector}
                        </span>
                      ))}
                      {loc.keySectors.length > 5 && (
                        <span className="text-[10px] font-mono text-neutral-400 px-1 py-0.5">
                          +{loc.keySectors.length - 5} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Quick Perks */}
                  <div className="pt-2 space-y-1 text-[11px] font-sans text-neutral-600">
                    <div className="flex items-center gap-1.5">
                      <Truck className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                      <span>In-room flat carry-in (no gate dumps)</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Inspect manufacturer seal before payment</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="p-4 bg-neutral-50 border-t border-neutral-100 flex items-center justify-between gap-2">
                  <Link
                    href={`/locations/${loc.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-brand-navy hover:text-neutral-900 transition-colors group-hover:underline"
                  >
                    <span>View Area Details</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                  </Link>

                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-semibold text-white bg-brand-whatsapp hover:bg-brand-whatsappDark rounded-sm transition-colors shadow-subtle shrink-0"
                    title={`Order doorstep delivery for ${loc.name}`}
                  >
                    <MessageCircle className="w-3 h-3 fill-white" />
                    <span>WhatsApp Order</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
