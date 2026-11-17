import { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, Lock, EyeOff, FileText, CheckCircle2 } from 'lucide-react';
import { SITE_CONFIG } from '@/data/site-config';

export const metadata: Metadata = {
  title: 'Privacy Policy | Sharma Bazaar Vasant Kunj Showroom',
  description:
    'Privacy Policy for Sharma Bazaar consumer electronics showroom in Vasant Kunj, South Delhi. Learn how we handle customer inquiries, WhatsApp communications, and essential session data.',
  alternates: {
    canonical: 'https://www.sharmabazaar.com/privacy-policy',
  },
};

export default function PrivacyPolicyPage() {
  const lastUpdated = 'November 17, 2026';

  return (
    <div className="bg-white min-h-screen py-12 sm:py-16 font-sans">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="space-y-3 border-b border-neutral-200 pb-8">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-neutral-100 text-neutral-700 text-[10px] font-mono uppercase tracking-widest">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>DPDP Act 2023 Compliant · Privacy-First Architecture</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-brand-navy">
            Privacy Policy
          </h1>
          <p className="text-xs font-mono text-neutral-400">
            Last Updated: {lastUpdated} · Effective for {SITE_CONFIG.businessName}
          </p>
        </div>

        {/* Executive Summary Card */}
        <div className="p-6 bg-neutral-50 border border-neutral-200 rounded-sm space-y-3">
          <h2 className="text-sm font-bold uppercase tracking-wider text-brand-navy font-mono">
            Summary: How We Respect Your Privacy
          </h2>
          <ul className="space-y-2 text-xs text-neutral-700">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>
                <strong>No Invasive Tracking:</strong> We do not track, profile, or sell your personal data to ad networks, data brokers, or marketing syndicates.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>
                <strong>Direct Showroom Communication:</strong> Information you share through our contact form or WhatsApp links connects you directly with our showroom team for price quotes and delivery coordination.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>
                <strong>Minimal Cookie Footprint:</strong> We only use essential session tokens for authorized staff administration on our internal management portal.
              </span>
            </li>
          </ul>
        </div>

        {/* Detailed Policy Sections */}
        <div className="space-y-8 text-xs sm:text-sm text-neutral-700 leading-relaxed">
          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-brand-navy">
              1. Showroom Entity &amp; Scope
            </h2>
            <p>
              This Privacy Policy applies to the official website of <strong>{SITE_CONFIG.businessName}</strong> (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;), operating our physical consumer electronics showroom at:
            </p>
            <div className="p-3.5 bg-neutral-50 border border-neutral-200 rounded-sm font-mono text-xs text-neutral-800">
              {SITE_CONFIG.address}, {SITE_CONFIG.area}, New Delhi, Delhi {SITE_CONFIG.pincode}, India.
            </div>
            <p>
              This document outlines how we collect, process, and protect information when you browse our product catalogue, request price quotes, or contact our showroom.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-brand-navy">
              2. Information We Collect &amp; Why
            </h2>
            <div className="space-y-3">
              <div className="p-4 border border-neutral-200 rounded-sm space-y-1.5 bg-white">
                <h3 className="font-bold text-neutral-900 text-xs sm:text-sm">
                  A. Inquiries &amp; Customer Communication
                </h3>
                <p className="text-xs text-neutral-600">
                  When you submit an inquiry through our contact form, call our store line ({SITE_CONFIG.phone}), or click a WhatsApp price quote link, you may provide your name, phone number, and appliance interests. This information is used strictly to check distributor stock, calculate your showroom discount, and coordinate delivery.
                </p>
              </div>

              <div className="p-4 border border-neutral-200 rounded-sm space-y-1.5 bg-white">
                <h3 className="font-bold text-neutral-900 text-xs sm:text-sm">
                  B. Showroom Staff Credentials
                </h3>
                <p className="text-xs text-neutral-600">
                  Authorized employees accessing the showroom management dashboard are verified using cryptographically signed session tokens to ensure administrative security and maintain catalogue accuracy.
                </p>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-brand-navy">
              3. Cookies &amp; Device Storage Policy
            </h2>
            <p>
              Unlike conventional online eCommerce platforms, we respect your digital privacy and keep local storage minimal:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-neutral-600">
              <li>
                <strong>Zero Invasive Tracking Cookies:</strong> We do not deploy third-party advertising cookies, retargeting pixels, or behavioral tracking beacons.
              </li>
              <li>
                <strong>Essential Authentication Cookie:</strong> A single secure session cookie (`sharma_staff_session`) is utilized strictly for authenticated showroom staff accessing the private management portal.
              </li>
              <li>
                <strong>Browser Local Storage:</strong> Temporary preferences (such as your active category filter selection) are saved on your local device to ensure fast page loads.
              </li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-brand-navy">
              4. Data Sharing &amp; Third-Party Services
            </h2>
            <p>
              <strong>We do not sell, rent, or trade your personal data.</strong> Your data is shared only under the following limited circumstances:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-neutral-600">
              <li>
                <strong>Authorized Brand Warranty Registration:</strong> Upon confirmed appliance purchase, customer details (name, delivery address, phone) are submitted to official brand manufacturers (Sony, Samsung, LG, Daikin, Bosch, IFB, Voltas) so OEM engineers can perform doorstep installation and issue the manufacturer warranty certificate.
              </li>
              <li>
                <strong>Legal Compliance:</strong> When required by statutory authorities under applicable Indian laws.
              </li>
            </ul>
          </section>

          {/* Section 5 */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-brand-navy">
              5. Your Rights Under DPDP Act 2023
            </h2>
            <p>
              Under the Digital Personal Data Protection Act, 2023 of India, you retain the right to:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-neutral-600">
              <li>Request a summary of personal data processed about you.</li>
              <li>Request correction or updating of your contact details.</li>
              <li>Request erasure of your customer inquiry records once fulfilled.</li>
            </ul>
          </section>

          {/* Section 6 */}
          <section className="space-y-3 border-t border-neutral-200 pt-6">
            <h2 className="text-base sm:text-lg font-bold text-brand-navy">
              6. Grievance Officer &amp; Inquiries
            </h2>
            <p>
              For questions regarding this policy or to request data removal, please contact our showroom grievance desk:
            </p>
            <div className="p-4 bg-neutral-50 border border-neutral-200 rounded-sm font-mono text-xs space-y-1">
              <p className="font-bold text-brand-navy font-sans">{SITE_CONFIG.businessName} Grievance Desk</p>
              <p>Physical Showroom: {SITE_CONFIG.address}, {SITE_CONFIG.area}, New Delhi 110070</p>
              <p>Direct Phone: <a href={`tel:${SITE_CONFIG.phone}`} className="text-brand-navy underline">{SITE_CONFIG.phone}</a></p>
              <p>Email: <a href={`mailto:${SITE_CONFIG.email}`} className="text-brand-navy underline">{SITE_CONFIG.email}</a></p>
            </div>
          </section>
        </div>

        {/* Back Link */}
        <div className="pt-6 border-t border-neutral-200 flex items-center justify-between text-xs font-mono">
          <Link href="/" className="text-brand-navy hover:underline">
            &larr; Return to Showroom Home
          </Link>
          <Link href="/terms" className="text-neutral-500 hover:text-brand-navy">
            View Terms of Service &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
