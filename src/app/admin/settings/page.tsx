'use client';

import { useState } from 'react';
import { Save, CheckCircle2, Building2 } from 'lucide-react';
import { SITE_CONFIG } from '@/data/site-config';

export default function AdminSettingsPage() {
  const [businessName, setBusinessName] = useState(SITE_CONFIG.businessName);
  const [phone, setPhone] = useState(SITE_CONFIG.phone);
  const [whatsapp, setWhatsapp] = useState(SITE_CONFIG.whatsapp);
  const [email, setEmail] = useState(SITE_CONFIG.email);
  const [address, setAddress] = useState(SITE_CONFIG.address);
  const [workingHours, setWorkingHours] = useState(SITE_CONFIG.workingHours);
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-brand-navy">Showroom Configuration</h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
          Manage business contact numbers, showroom operating hours, and location metadata.
        </p>
      </div>

      {saved && (
        <div className="p-4 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Showroom settings saved successfully.</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-subtle space-y-6 text-xs sm:text-sm">
        <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
          <Building2 className="w-4 h-4 text-brand-blue" />
          <span>General Business Settings</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Business Name</label>
            <input
              type="text"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-blue"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Official Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-blue"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Telephone Number</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-blue"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">WhatsApp Business Number</label>
            <input
              type="text"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-blue"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block font-semibold text-slate-700 mb-1">Showroom Address</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-blue"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block font-semibold text-slate-700 mb-1">Showroom Operating Hours</label>
            <input
              type="text"
              value={workingHours}
              onChange={(e) => setWorkingHours(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-blue"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-brand-navy hover:bg-slate-800 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-sm transition-all"
          >
            <Save className="w-4 h-4 text-emerald-400" />
            <span>Update Showroom Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
}
