'use client';

import { Star, MapPin, CheckCircle2, ArrowUpRight } from 'lucide-react';
import { SITE_CONFIG } from '@/data/site-config';

export interface ReviewItem {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  text: string;
  category: string;
}

interface ReviewsMarqueeProps {
  reviews: ReviewItem[];
}

function getInitials(name: string): string {
  return (
    name
      .split(' ')
      .filter((part) => !part.startsWith('(') && !part.includes('.'))
      .slice(0, 2)
      .map((n) => n[0])
      .join('')
      .toUpperCase() || 'SB'
  );
}

export function ReviewsMarquee({ reviews }: ReviewsMarqueeProps) {
  // Duplicate the reviews array to ensure an infinite, seamless loop
  const duplicatedReviews = [...reviews, ...reviews];

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-5">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-400">
              Verified Feedback
            </span>
            <span className="text-neutral-300">·</span>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200/70 px-2.5 py-0.5 rounded-full">
              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
              Verified Local Customer Feedback
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-brand-navy">
            South Delhi Customer Experiences
          </h2>

          <p className="text-xs sm:text-sm text-neutral-600 max-w-2xl leading-relaxed">
            Real feedback from homeowners across Vasant Kunj, Chattarpur, Saket, and Vasant Vihar who saved on genuine home appliances.
          </p>
        </div>

        {/* Right side: Google Business Link */}
        <div className="shrink-0">
          <a
            href={SITE_CONFIG.googleMapsDirectionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-mono font-semibold uppercase tracking-wider text-brand-navy bg-white hover:bg-neutral-100 border border-neutral-200/90 rounded-lg shadow-xs transition-all"
          >
            <span>Google Profile</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Marquee Container with Gradient Edge Masks */}
      <div className="relative w-full overflow-hidden py-2">
        {/* Left Gradient Edge Mask */}
        <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-neutral-50/90 via-neutral-50/40 to-transparent pointer-events-none z-10" />

        {/* Right Gradient Edge Mask */}
        <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-neutral-50/90 via-neutral-50/40 to-transparent pointer-events-none z-10" />

        {/* Continuous Left-Sliding Track */}
        <div className="animate-marquee-left flex gap-5 select-none">
          {duplicatedReviews.map((review, idx) => (
            <div
              key={`${review.id}-${idx}`}
              className="w-[310px] sm:w-[370px] shrink-0 bg-white rounded-xl border border-neutral-200/90 shadow-xs hover:shadow-lg hover:border-brand-navy/30 transition-all duration-300 p-5 sm:p-6 flex flex-col justify-between space-y-4"
            >
              {/* Card Header: Stars, Verified Tag & Category */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(review.rating)].map((_, sIdx) => (
                      <Star key={sIdx} className="w-3.5 h-3.5 fill-amber-500" />
                    ))}
                  </div>

                  <span className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-wider text-emerald-800 bg-emerald-50 border border-emerald-200/70 px-2 py-0.5 rounded-full font-semibold">
                    <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600" />
                    Verified
                  </span>
                </div>

                {/* Review Text */}
                <p className="text-[13px] text-neutral-700 leading-relaxed italic line-clamp-4">
                  &ldquo;{review.text}&rdquo;
                </p>
              </div>

              {/* Card Footer: Author, Locality & Date */}
              <div className="pt-3 border-t border-neutral-100 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-full bg-brand-navy text-white text-xs font-bold flex items-center justify-center shrink-0 shadow-xs">
                    {getInitials(review.author)}
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-neutral-900 text-xs sm:text-sm truncate">
                      {review.author}
                    </p>
                    <p className="text-[11px] text-neutral-500 flex items-center gap-1 truncate">
                      <MapPin className="w-3 h-3 text-neutral-400 shrink-0" />
                      <span className="truncate">{review.location}</span>
                    </p>
                  </div>
                </div>

                <span className="font-mono text-[10px] text-neutral-400 shrink-0">
                  {review.date}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
