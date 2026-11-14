import Link from 'next/link';
import { MessageCircle, ArrowRight, ShieldCheck } from 'lucide-react';
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
    <div className="group flex flex-col bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-subtle hover:shadow-cardHover transition-all duration-300 transform hover:-translate-y-1">
      {/* Product Image & Badges */}
      <div className="relative aspect-[4/3] bg-slate-50 overflow-hidden border-b border-slate-100 flex items-center justify-center p-4">
        {/* Availability / Savings Badge */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
          {hasSavings && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-600 text-white shadow-sm">
              Save {formatINR(savingsAmount)}
            </span>
          )}
          {product.isFeatured && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-brand-navy text-white tracking-wide uppercase">
              Showroom Best Seller
            </span>
          )}
        </div>

        {/* Product Image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-contain object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Quick Brand Tag */}
        <span className="absolute bottom-3 right-3 text-[11px] font-bold text-slate-500 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded border border-slate-200">
          {product.brand}
        </span>
      </div>

      {/* Card Content */}
      <div className="flex flex-col flex-grow p-5">
        {/* Category & Model */}
        <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
          <span className="font-semibold uppercase tracking-wider text-brand-blue">
            {product.category.replace('-', ' ')}
          </span>
          <span className="font-mono text-slate-400 text-[11px]">
            Model: {product.modelNumber}
          </span>
        </div>

        {/* Title */}
        <Link href={`/electronics/${product.slug}`} className="group-hover:text-brand-blue transition-colors">
          <h3 className="text-base font-bold text-slate-900 line-clamp-2 leading-snug mb-3">
            {product.name}
          </h3>
        </Link>

        {/* Key Feature Highlight */}
        <div className="flex items-center gap-1.5 text-xs text-slate-600 mb-4 bg-slate-50 p-2 rounded-lg border border-slate-100">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span className="truncate">100% Genuine Brand Seal & Warranty</span>
        </div>

        <div className="mt-auto pt-3 border-t border-slate-100">
          {/* Price Section */}
          <div className="flex items-baseline justify-between mb-3">
            <div>
              <p className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">
                Showroom Price
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-xl sm:text-2xl font-black text-brand-navy">
                  {formatINR(product.ourPrice)}
                </span>
                {product.mrpPrice > product.ourPrice && (
                  <span className="text-xs text-slate-400 line-through">
                    MRP {formatINR(product.mrpPrice)}
                  </span>
                )}
              </div>
            </div>

            {hasSavings && (
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">
                {discountPercent}% OFF
              </span>
            )}
          </div>

          {/* Action Buttons: Details + WhatsApp */}
          <div className="grid grid-cols-2 gap-2">
            <Link
              href={`/electronics/${product.slug}`}
              className="flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors border border-slate-200"
            >
              <span>View Details</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-white bg-brand-whatsapp hover:bg-brand-whatsappHover text-center rounded-lg transition-colors shadow-sm"
              title="Get Best Showroom Price on WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-white text-brand-whatsapp" />
              <span>Enquire</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
