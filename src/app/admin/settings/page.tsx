'use client';

import { useState, useEffect } from 'react';
import { Save, Check } from 'lucide-react';
import { SITE_CONFIG } from '@/data/site-config';

export default function AdminSettingsPage() {
  const [businessName, setBusinessName] = useState(SITE_CONFIG.businessName);
  const [phone, setPhone] = useState(SITE_CONFIG.phone);
  const [whatsapp, setWhatsapp] = useState(SITE_CONFIG.whatsapp);
  const [email, setEmail] = useState(SITE_CONFIG.email);
  const [address, setAddress] = useState(SITE_CONFIG.address);
  const [workingHours, setWorkingHours] = useState(SITE_CONFIG.workingHours);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('sharma_admin_settings');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.businessName) setBusinessName(parsed.businessName);
        if (parsed.phone) setPhone(parsed.phone);
        if (parsed.whatsapp) setWhatsapp(parsed.whatsapp);
        if (parsed.email) setEmail(parsed.email);
        if (parsed.address) setAddress(parsed.address);
        if (parsed.workingHours) setWorkingHours(parsed.workingHours);
      }
    } catch {
      // ignore
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { businessName, phone, whatsapp, email, address, workingHours };
    localStorage.setItem('sharma_admin_settings', JSON.stringify(payload));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-200">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-400">
            System Preferences
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-brand-navy">
            Showroom Configuration
          </h1>
          <p className="text-xs text-neutral-500 font-mono mt-0.5">
            Manage showroom contact channels, operating hours, and location metadata.
          </p>
        </div>

        {saved && (
          <div className="px-3.5 py-2 rounded-sm bg-neutral-900 text-white text-xs font-mono flex items-center gap-1.5 shadow-subtle">
            <Check className="w-3.5 h-3.5 text-emerald-400" />
            <span>Settings Saved</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 border border-neutral-200 rounded-sm space-y-6 text-xs">
        <h3 className="font-mono text-xs uppercase tracking-widest text-neutral-400 border-b border-neutral-100 pb-2">
          Business Contact &amp; Metadata
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-mono text-[10px] uppercase tracking-wider text-neutral-500 mb-1.5">
              Trading Business Name
            </label>
            <input
              type="text"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              className="w-full px-3.5 py-2 bg-neutral-50 border border-neutral-200 rounded-sm text-xs focus:outline-none focus:border-brand-navy font-sans"
            />
          </div>

          <div>
            <label className="block font-mono text-[10px] uppercase tracking-wider text-neutral-500 mb-1.5">
              Official Store Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3.5 py-2 bg-neutral-50 border border-neutral-200 rounded-sm text-xs font-mono focus:outline-none focus:border-brand-navy"
            />
          </div>

          <div>
            <label className="block font-mono text-[10px] uppercase tracking-wider text-neutral-500 mb-1.5">
              Telephone Number
            </label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-3.5 py-2 bg-neutral-50 border border-neutral-200 rounded-sm text-xs font-mono focus:outline-none focus:border-brand-navy"
            />
          </div>

          <div>
            <label className="block font-mono text-[10px] uppercase tracking-wider text-neutral-500 mb-1.5">
              WhatsApp Business Number
            </label>
            <input
              type="text"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              className="w-full px-3.5 py-2 bg-neutral-50 border border-neutral-200 rounded-sm text-xs font-mono focus:outline-none focus:border-brand-navy"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block font-mono text-[10px] uppercase tracking-wider text-neutral-500 mb-1.5">
              Showroom Physical Address
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-3.5 py-2 bg-neutral-50 border border-neutral-200 rounded-sm text-xs focus:outline-none focus:border-brand-navy font-sans"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block font-mono text-[10px] uppercase tracking-wider text-neutral-500 mb-1.5">
              Operating Hours
            </label>
            <input
              type="text"
              value={workingHours}
              onChange={(e) => setWorkingHours(e.target.value)}
              className="w-full px-3.5 py-2 bg-neutral-50 border border-neutral-200 rounded-sm text-xs focus:outline-none focus:border-brand-navy font-sans"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-neutral-100 flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 bg-brand-navy hover:bg-black text-white text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors flex items-center gap-2 shadow-subtle"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Configuration</span>
          </button>
        </div>
      </form>
    </div>
  );
}
