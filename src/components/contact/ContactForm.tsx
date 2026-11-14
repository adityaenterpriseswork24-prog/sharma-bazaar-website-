'use client';

import { useState } from 'react';
import { MessageCircle, CheckCircle2, ShieldCheck } from 'lucide-react';
import { SITE_CONFIG, ELECTRONICS_CATEGORIES } from '@/data/site-config';
import { buildWhatsAppUrl } from '@/lib/utils';
import { ProductCategory } from '@/types';

export function ContactForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState<ProductCategory>(ELECTRONICS_CATEGORIES[0].id);
  const [modelOrRequirement, setModelOrRequirement] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    let message = `Hi Sharma Electronics,\n\nI am submitting a showroom inquiry from your website:\n`;
    message += `👤 *Name:* ${name}\n`;
    if (phone.trim()) {
      message += `📞 *Phone:* ${phone}\n`;
    }
    message += `🏷️ *Category:* ${category}\n`;
    if (modelOrRequirement.trim()) {
      message += `📝 *Product / Requirement:* ${modelOrRequirement}\n`;
    }
    message += `\nPlease check your best showroom price and availability. Thank you!`;

    const url = buildWhatsAppUrl(SITE_CONFIG.whatsapp, message);
    setSubmitted(true);

    window.open(url, '_blank');
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-subtle space-y-6">
      <div>
        <span className="text-[11px] font-bold uppercase tracking-wider text-brand-blue">
          Direct Showroom Assistance
        </span>
        <h3 className="text-xl font-black text-brand-navy mt-1">
          Inquire About Prices &amp; Availability
        </h3>
        <p className="text-xs text-slate-500 mt-1">
          Have an online price quote? Enter the model name below and send it directly to our store manager on WhatsApp.
        </p>
      </div>

      {submitted ? (
        <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
          <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
          <h4 className="text-base font-bold text-emerald-900">Inquiry Prepared!</h4>
          <p className="text-xs text-emerald-700 leading-relaxed">
            WhatsApp has been opened with your inquiry details. If it did not open automatically, click the button below:
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="text-xs font-semibold text-brand-blue hover:underline block mx-auto pt-2"
          >
            Submit Another Inquiry
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Your Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Rahul Sharma"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-blue"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Phone Number (Optional)
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="e.g. 98110XXXXX"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-blue"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Electronics Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as ProductCategory)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-blue bg-white"
            >
              {ELECTRONICS_CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Model Number or Requirements
            </label>
            <textarea
              rows={3}
              value={modelOrRequirement}
              onChange={(e) => setModelOrRequirement(e.target.value)}
              placeholder="e.g. Looking for Sony 55-inch 4K TV or Daikin 1.5T 5-star AC. Got an Amazon quote of ₹53,000. What is your showroom price?"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-blue"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 px-6 rounded-xl bg-brand-whatsapp hover:bg-brand-whatsappHover text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-all"
          >
            <MessageCircle className="w-4 h-4 fill-white text-brand-whatsapp" />
            <span>Send to Showroom WhatsApp</span>
          </button>
        </form>
      )}

      <div className="pt-2 border-t border-slate-100 flex items-center gap-2 text-[11px] text-slate-500">
        <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
        <span>We never spam or sell your information. Direct store communication only.</span>
      </div>
    </div>
  );
}
