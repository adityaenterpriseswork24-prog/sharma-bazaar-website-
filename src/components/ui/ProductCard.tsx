'use client';

import Link from 'next/link';
import { MessageCircle, ArrowRight } from 'lucide-react';
import { Product } from '@/types';
import { formatINR, calculateSavings, buildWhatsAppUrl, generateProductWhatsAppMessage } from '@/lib/utils';
import { SITE_CONFIG } from '@/data/site-config';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { savingsAmount, discountPercent, hasSavings } = calculateSavings(
    product.mrpPrice,
    product.ourPrice
  );

  const whatsappMessage = generateProductWhatsAppMessage(
    product.name,
    product.modelNumber,
    product.ourPrice
  );

  const whatsappUrl = buildWhatsAppUrl(SITE_CONFIG.whatsapp, whatsappMessage);

  return (
    <div className="group flex flex-col bg-white rounded-sm border border-neutral-200 hover:border-brand-navy/60 transition-all duration-200 overflow-hidden">
      {/* Product Image Frame */}
      <div className="relative aspect-[4/3] bg-neutral-50/70 overflow-hidden border-b border-neutral-100 flex items-center justify-center p-6">
        {/* Subtle Savings Pill */}
        {hasSavings && (
          <div className="absolute top-3 left-3 z-10">
            <span className="font-mono text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-sm bg-neutral-900 text-white shadow-subtle">
              Save {formatINR(savingsAmount)}
            </span>
          </div>
        )}

        {/* Brand Tag */}
        <span className="absolute top-3 right-3 font-mono text-[10px] uppercase tracking-widest text-neutral-400">
          {product.brand}
        </span>

        {/* Product Image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.imageUrl}
          alt={`${product.name} - Electronics Showroom Vasant Kunj`}
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=800&q=80';
          }}
          className="w-full h-full object-contain object-center group-hover:scale-102 transition-transform duration-300"
          loading="lazy"
        />
      </div>

      {/* Card Content */}
      <div className="flex flex-col flex-grow p-5 space-y-3">
        {/* Metadata */}
        <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400">
          <span className="uppercase tracking-widest">{product.category.replace('-', ' ')}</span>
          <span>{product.modelNumber}</span>
        </div>

        {/* Product Name */}
        <Link href={`/electronics/${product.slug}`} className="block group-hover:text-brand-navy transition-colors">
          <h3 className="text-sm font-semibold text-neutral-900 leading-snug line-clamp-2">
            {product.name}
          </h3>
        </Link>

        {/* Price Section */}
        <div className="mt-auto pt-3 border-t border-neutral-100 flex items-baseline justify-between">
          <div>
            <p className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">
              Showroom Price
            </p>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold tracking-tight text-brand-navy font-sans">
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
            <span className="font-mono text-[11px] text-emerald-700 font-semibold">
              {discountPercent}% OFF
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-2">
          <Link
            href={`/electronics/${product.slug}`}
            className="flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-neutral-800 bg-neutral-50 hover:bg-neutral-100 rounded-sm border border-neutral-200 transition-colors"
          >
            <span>Details</span>
            <ArrowRight className="w-3.5 h-3.5 text-neutral-400" />
          </Link>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-white bg-brand-whatsapp hover:bg-brand-whatsappDark rounded-sm transition-colors shadow-subtle"
            title="Get Best Price on WhatsApp"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-white" />
            <span>Enquire</span>
          </a>
        </div>
      </div>
    </div>
  );
}
