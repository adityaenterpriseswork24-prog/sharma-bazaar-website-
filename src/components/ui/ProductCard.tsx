'use client';

import Link from 'next/link';
import Image from 'next/image';
import { MessageCircle, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Product } from '@/types';
import { formatINR, calculateSavings, buildWhatsAppUrl, generateProductWhatsAppMessage } from '@/lib/utils';
import { SITE_CONFIG } from '@/data/site-config';

interface ProductCardProps {
  product: Product;
}

/**
 * Extract 2-3 key technical highlights for display as clean chips on the card
 */
function extractKeySpecs(product: Product): string[] {
  const specs = product.specifications || {};
  const chips: string[] = [];

  // 1. Primary size or capacity
  const sizeKey = Object.keys(specs).find((k) =>
    /(screen size|total capacity|cavity capacity|^capacity)/i.test(k)
  );
  if (sizeKey && specs[sizeKey]) {
    const raw = specs[sizeKey].split('(')[0].replace(/Ideal.*/i, '').trim();
    if (raw) chips.push(raw);
  }

  // 2. Star or Energy Rating
  const energyKey = Object.keys(specs).find((k) =>
    /(energy rating|energy star|star rating)/i.test(k)
  );
  if (energyKey && specs[energyKey]) {
    const starMatch = specs[energyKey].match(/(\d\s*Star)/i);
    if (starMatch) {
      chips.push(starMatch[1]);
    } else {
      chips.push(specs[energyKey].split(' ').slice(0, 2).join(' '));
    }
  }

  // 3. Key technology, type, or mode
  const techKey = Object.keys(specs).find((k) =>
    /(display technology|resolution|condenser coil|compressor type|loading type|dispensing modes|dispense types|cooking modes|heating system)/i.test(
      k
    )
  );
  if (techKey && specs[techKey] && chips.length < 3) {
    let cleanTech = specs[techKey].split('(')[0].split(',')[0].trim();
    if (/3840\s*x\s*2160/i.test(cleanTech)) cleanTech = '4K UHD';
    else if (/copper/i.test(cleanTech)) cleanTech = '100% Copper';
    else if (/digital inverter/i.test(cleanTech)) cleanTech = 'Digital Inverter';
    else if (/charcoal/i.test(cleanTech)) cleanTech = 'Charcoal Heater';
    else if (/faucets/i.test(cleanTech) || /dispens/i.test(cleanTech))
      cleanTech = 'Hot/Cold/Normal';
    else if (cleanTech.length > 18) cleanTech = cleanTech.slice(0, 16) + '…';

    if (cleanTech && !chips.includes(cleanTech)) chips.push(cleanTech);
  }

  // 4. Subcategory or fallback if needed
  if (chips.length < 2 && product.subcategory) {
    chips.push(product.subcategory);
  }

  return chips.slice(0, 3);
}

export function ProductCard({ product }: ProductCardProps) {
  const { savingsAmount, hasSavings } = calculateSavings(
    product.mrpPrice,
    product.ourPrice
  );

  const whatsappMessage = generateProductWhatsAppMessage(
    product.name,
    product.modelNumber,
    product.ourPrice
  );

  const whatsappUrl = buildWhatsAppUrl(SITE_CONFIG.whatsapp, whatsappMessage);
  const keySpecs = extractKeySpecs(product);

  return (
    <div className="group flex flex-col bg-white rounded-xl border border-neutral-200/80 hover:border-brand-navy/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden h-full">
      {/* Product Image Frame */}
      <div className="relative aspect-[4/3] bg-gradient-to-b from-neutral-50/90 via-neutral-50/30 to-white overflow-hidden border-b border-neutral-100/80 flex items-center justify-center p-5">
        {/* Live Showroom Stock Status Badge */}
        <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5">
          <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md text-emerald-800 border border-emerald-200/80 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            In Showroom
          </span>
        </div>

        {/* Brand Tag */}
        <div className="absolute top-3 right-3 z-10">
          <span className="font-mono text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md text-neutral-800 border border-neutral-200/80 shadow-xs">
            {product.brand}
          </span>
        </div>

        {/* Product Image with smooth hover zoom */}
        <div className="relative w-full h-full">
          <Image
            src={product.imageUrl}
            alt={`${product.name} - Electronics Showroom Vasant Kunj`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-contain object-center transition-transform duration-500 ease-out group-hover:scale-105"
            loading="lazy"
          />
        </div>
      </div>

      {/* Card Content */}
      <div className="flex flex-col flex-grow p-5 space-y-3">
        {/* Metadata Header */}
        <div className="flex items-center justify-between gap-2 text-[11px]">
          <span className="font-mono text-[10px] uppercase tracking-widest text-brand-navy/70 font-semibold truncate">
            {product.category.replace('-', ' ')}
          </span>
          <span className="font-mono text-[10px] text-neutral-500 bg-neutral-100/80 px-2 py-0.5 rounded text-right shrink-0">
            {product.modelNumber}
          </span>
        </div>

        {/* Product Name */}
        <Link
          href={`/electronics/${product.slug}`}
          className="block group-hover:text-brand-navy transition-colors"
        >
          <h3 className="text-sm sm:text-[15px] font-semibold text-neutral-900 leading-snug line-clamp-2 min-h-[42px]">
            {product.name}
          </h3>
        </Link>

        {/* Key Spec Badges */}
        {keySpecs.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5 pt-0.5 min-h-[26px]">
            {keySpecs.map((spec, idx) => (
              <span
                key={idx}
                className={`inline-flex items-center text-[10.5px] font-medium text-neutral-600 bg-neutral-100/90 border border-neutral-200/70 rounded-md px-2 py-0.5 ${
                  idx === 2 ? 'hidden sm:inline-flex' : ''
                }`}
              >
                {spec}
              </span>
            ))}
          </div>
        )}

        {/* Price Section */}
        <div className="mt-auto pt-3 border-t border-neutral-100/90">
          <div className="flex items-end justify-between gap-2">
            <div>
              <p className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 font-medium">
                Showroom Counter Price
              </p>
              <div className="flex items-baseline gap-2 pt-0.5">
                <span className="text-xl sm:text-2xl font-bold tracking-tight text-brand-navy font-sans">
                  {formatINR(product.ourPrice)}
                </span>
                {product.mrpPrice > product.ourPrice && (
                  <span className="text-xs text-neutral-400 line-through font-mono">
                    MRP {formatINR(product.mrpPrice)}
                  </span>
                )}
              </div>
            </div>

            {hasSavings && (
              <span className="inline-flex items-center text-[10.5px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200/70 px-2 py-0.5 rounded-full shrink-0">
                Save {formatINR(savingsAmount)}
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <Link
            href={`/electronics/${product.slug}`}
            className="flex items-center justify-center gap-1.5 px-3 py-2.5 min-h-[40px] text-xs font-semibold text-neutral-700 bg-neutral-50 hover:bg-neutral-100 hover:text-brand-navy active:scale-[0.98] rounded-lg border border-neutral-200/90 transition-all shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-navy"
          >
            <span>View Specs</span>
            <ArrowRight className="w-3.5 h-3.5 text-neutral-400 group-hover:translate-x-0.5 transition-transform" />
          </Link>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 px-3 py-2.5 min-h-[40px] text-xs font-semibold text-white bg-[#25D366] hover:bg-[#20bd5a] active:scale-[0.98] rounded-lg transition-all shadow-xs hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
            title="Get Best Price on WhatsApp"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-white" />
            <span>WhatsApp Quote</span>
          </a>
        </div>

        {/* Reassurance Micro-Footer */}
        <div className="pt-2 border-t border-neutral-100/80 flex items-center justify-between text-[10.5px] text-neutral-500">
          <span className="flex items-center gap-1 font-medium text-emerald-700">
            <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
            <span>Same-Day Delivery</span>
          </span>
          <span className="text-neutral-400 font-mono text-[10px]">
            100% Brand Seal
          </span>
        </div>
      </div>
    </div>
  );
}
