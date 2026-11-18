'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const fallbackImage =
    '/images/showroom/sharma-bazaar-showroom-interior.jpg';
  const initialImg = images && images.length > 0 ? images[0] : fallbackImage;
  const [selectedImage, setSelectedImage] = useState(initialImg);

  useEffect(() => {
    if (images && images.length > 0) {
      setSelectedImage(images[0]);
    }
  }, [images]);

  return (
    <div className="space-y-4">
      {/* Main Image Display */}
      <div className="relative aspect-[4/3] bg-neutral-50/70 border border-neutral-200 rounded-sm overflow-hidden p-8 flex items-center justify-center">
        <Image
          src={selectedImage}
          alt={productName}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 55vw"
          className="object-contain object-center transition-all duration-300 p-6"
        />
      </div>

      {/* Thumbnails */}
      {images && images.length > 1 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(img)}
              className={`relative w-16 h-16 rounded-sm bg-neutral-50 border overflow-hidden p-1 shrink-0 transition-all ${
                selectedImage === img
                  ? 'border-brand-navy shadow-subtle'
                  : 'border-neutral-200 hover:border-neutral-300 opacity-60 hover:opacity-100'
              }`}
              aria-label={`View image ${index + 1}`}
            >
              <Image
                src={img}
                alt={`${productName} thumbnail ${index + 1}`}
                fill
                sizes="64px"
                className="object-contain p-1"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
