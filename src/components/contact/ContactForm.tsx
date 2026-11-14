'use client';

import { useState } from 'react';
import { MessageCircle, Check, ShieldCheck } from 'lucide-react';
import { SITE_CONFIG, ELECTRONICS_CATEGORIES } from '@/data/site-config';
import { buildWhatsAppUrl } from '@/lib/utils';
import { ProductCategory } from '@/types';

export function ContactForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState<ProductCategory>(ELECTRONICS_CATEGORIES[0].id);
  const [modelOrRequirement, setModelOrRequirement] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [targetWhatsAppUrl, setTargetWhatsAppUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    let message = `Hi Sharma Electronics,\n\nI am submitting a showroom inquiry from your website:\n\n`;
    message += `Name: ${name}\n`;
    if (phone.trim()) {
      message += `Phone: ${phone}\n`;
    }
    message += `Category: ${category}\n`;
    if (modelOrRequirement.trim()) {
      message += `Requirement / Online Quote: ${modelOrRequirement}\n`;
    }
    message += `\nPlease check your best showroom price and availability. Thank you!`;

    const url = buildWhatsAppUrl(SITE_CONFIG.whatsapp, message);
    setTargetWhatsAppUrl(url);
    setSubmitted(true);

    try {
      window.open(url, '_blank');
    } catch {
      // browser popup blocker fallback handled below
    }
  };

  return (
    <div className="bg-white rounded-sm border border-neutral-200 p-6 sm:p-8 space-y-6">
      <div className="space-y-1">
        <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-400">
          Direct Store Communication
        </span>
        <h3 className="text-xl font-bold text-brand-navy">
          Inquire About Prices &amp; Availability
        </h3>
        <p className="text-xs text-neutral-500 font-normal">
          Have an online price quote? Send the model number below directly to our store manager on WhatsApp.
        </p>
      </div>

      {submitted ? (
        <div className="p-6 rounded-sm bg-neutral-50 border border-neutral-200 text-center space-y-4">
          <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
            <Check className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-base font-bold text-neutral-900">Inquiry Ready to Send</h4>
            <p className="text-xs text-neutral-600 mt-1 max-w-sm mx-auto">
              If WhatsApp did not open automatically on your device, click the button below:
            </p>
          </div>
          <div className="pt-2">
            <a
              href={targetWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-sm bg-brand-whatsapp hover:bg-brand-whatsappDark text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-subtle"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Open WhatsApp Now</span>
            </a>
          </div>
          <button
            onClick={() => {
              setSubmitted(false);
              setName('');
              setPhone('');
              setModelOrRequirement('');
            }}
            className="text-xs font-mono text-neutral-500 hover:text-brand-navy hover:underline block mx-auto pt-2"
          >
            Submit Another Inquiry
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans">
          <div>
            <label className="block font-mono text-[11px] uppercase tracking-wider text-neutral-500 mb-1.5">
              Your Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Rahul Sharma"
              className="w-full px-3.5 py-2.5 rounded-sm bg-white border border-neutral-200 text-xs text-neutral-900 focus:outline-none focus:border-brand-navy transition-colors font-sans"
            />
          </div>

          <div>
            <label className="block font-mono text-[11px] uppercase tracking-wider text-neutral-500 mb-1.5">
              Phone Number (Optional)
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="e.g. 98110XXXXX"
              className="w-full px-3.5 py-2.5 rounded-sm bg-white border border-neutral-200 text-xs text-neutral-900 focus:outline-none focus:border-brand-navy transition-colors font-mono"
            />
          </div>

          <div>
            <label className="block font-mono text-[11px] uppercase tracking-wider text-neutral-500 mb-1.5">
              Electronics Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as ProductCategory)}
              className="w-full px-3.5 py-2.5 rounded-sm bg-white border border-neutral-200 text-xs text-neutral-900 focus:outline-none focus:border-brand-navy transition-colors font-sans"
            >
              {ELECTRONICS_CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-mono text-[11px] uppercase tracking-wider text-neutral-500 mb-1.5">
              Model Number or Online Link
            </label>
            <textarea
              rows={3}
              value={modelOrRequirement}
              onChange={(e) => setModelOrRequirement(e.target.value)}
              placeholder="e.g. Sony 55-inch 4K TV or Daikin 1.5T 5-star AC. Got an Amazon quote of ₹53,000. What is your best showroom price?"
              className="w-full px-3.5 py-2.5 rounded-sm bg-white border border-neutral-200 text-xs text-neutral-900 focus:outline-none focus:border-brand-navy transition-colors font-sans"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 px-6 rounded-sm bg-brand-whatsapp hover:bg-brand-whatsappDark text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-subtle"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>Send to Showroom WhatsApp</span>
          </button>
        </form>
      )}

      <div className="pt-2 border-t border-neutral-100 flex items-center gap-2 text-[11px] font-mono text-neutral-400">
        <ShieldCheck className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
        <span>Direct showroom communication. We never sell or spam your data.</span>
      </div>
    </div>
  );
}
