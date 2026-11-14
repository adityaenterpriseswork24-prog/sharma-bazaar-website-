import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format Indian Rupee currency (e.g. ₹52,990)
 */
export function formatINR(amount: number): string {
  if (typeof amount !== 'number' || isNaN(amount)) return '₹0';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Calculate savings and percentage
 */
export function calculateSavings(mrp: number, ourPrice: number) {
  if (!mrp || !ourPrice || mrp <= ourPrice) {
    return { savingsAmount: 0, discountPercent: 0, hasSavings: false };
  }
  const savingsAmount = mrp - ourPrice;
  const discountPercent = Math.round((savingsAmount / mrp) * 100);
  return { savingsAmount, discountPercent, hasSavings: true };
}

/**
 * Build WhatsApp click-to-chat URL with prefilled message
 */
export function buildWhatsAppUrl(phone: string, message: string): string {
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}

/**
 * Generate product specific WhatsApp inquiry message
 */
export function generateProductWhatsAppMessage(productName: string, modelNumber?: string, ourPrice?: number): string {
  let msg = `Hi Sharma Electronics,\n\nI visited your website and I am interested in:\n📌 *${productName}*`;
  if (modelNumber) {
    msg += `\nModel: ${modelNumber}`;
  }
  if (ourPrice) {
    msg += `\nListed Price: ${formatINR(ourPrice)}`;
  }
  msg += `\n\nPlease share your best showroom price, current availability, and delivery/installation details for Vasant Kunj / South Delhi.\n\nThank you!`;
  return msg;
}
