'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone, MessageCircle, ChevronRight, Tv, Lock } from 'lucide-react';
import { SITE_CONFIG, ELECTRONICS_CATEGORIES } from '@/data/site-config';
import { buildWhatsAppUrl } from '@/lib/utils';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Electronics', href: '/electronics' },
    { label: 'Why Choose Us', href: '/why-choose-us' },
    { label: 'Buying Guides', href: '/blog' },
    { label: 'About Us', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  const defaultWhatsAppUrl = buildWhatsAppUrl(
    SITE_CONFIG.whatsapp,
    `Hi Sharma Electronics, I am visiting your website and would like to inquire about showroom prices & availability.`
  );

  if (pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-200 bg-white/95 backdrop-blur-md ${
        scrolled ? 'shadow-md border-b border-slate-200/80 py-2.5' : 'border-b border-slate-100 py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-brand-navy flex items-center justify-center text-white font-bold text-xl shadow-md group-hover:bg-brand-blue transition-colors">
              <Tv className="w-5 h-5 text-blue-400 group-hover:text-white transition-colors" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-brand-navy">
                  Sharma<span className="text-brand-blue">.</span>Electronics
                </span>
              </div>
              <p className="text-[11px] font-medium text-slate-500 uppercase tracking-wider flex items-center gap-1">
                <span>Vasant Kunj Showroom</span>
                <span className="w-1 h-1 rounded-full bg-emerald-500 inline-block"></span>
                <span className="text-emerald-700">5 Floors</span>
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-semibold text-slate-700">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`transition-colors py-1 relative ${
                    isActive ? 'text-brand-blue font-bold' : 'hover:text-brand-blue text-slate-700'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-blue rounded-full"></span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Call & WhatsApp & Staff Login Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={`tel:${SITE_CONFIG.phone}`}
              className="flex items-center gap-2 px-3 py-2 text-xs sm:text-sm font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors border border-slate-200"
              title="Call Vasant Kunj Showroom"
            >
              <Phone className="w-4 h-4 text-brand-blue" />
              <span>{SITE_CONFIG.phone}</span>
            </a>

            <a
              href={defaultWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-semibold text-white bg-brand-whatsapp hover:bg-brand-whatsappHover rounded-lg transition-all shadow-sm hover:shadow-md"
            >
              <MessageCircle className="w-4 h-4 fill-white text-brand-whatsapp" />
              <span>Enquire on WhatsApp</span>
            </a>

            {/* Staff Login Link */}
            <Link
              href="/admin/login"
              className="p-2 rounded-lg text-slate-400 hover:text-brand-navy hover:bg-slate-100 transition-colors border border-transparent hover:border-slate-200"
              title="Staff / Admin Portal Login"
            >
              <Lock className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <a
              href={defaultWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-emerald-600 bg-emerald-50 rounded-lg border border-emerald-200"
              aria-label="WhatsApp"
            >
              <MessageCircle className="w-5 h-5 fill-emerald-600 text-transparent" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-full bg-white border-b border-slate-200 shadow-xl px-5 py-6 transition-all duration-200 z-50 animate-in slide-in-from-top-2">
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center justify-between text-base font-medium text-slate-800 hover:text-brand-blue py-2 border-b border-slate-100"
              >
                <span>{link.label}</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>
            ))}
          </nav>

          <div className="mt-5 pt-4 border-t border-slate-100">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Browse Categories
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {ELECTRONICS_CATEGORIES.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/electronics?category=${cat.id}`}
                  className="px-2.5 py-1.5 rounded-md bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-brand-blue border border-slate-100 transition-colors"
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-2.5">
            <a
              href={`tel:${SITE_CONFIG.phone}`}
              className="flex items-center justify-center gap-2 w-full py-2.5 text-sm font-semibold text-brand-navy bg-slate-100 hover:bg-slate-200 rounded-lg border border-slate-200"
            >
              <Phone className="w-4 h-4 text-brand-blue" />
              <span>Call Showroom ({SITE_CONFIG.phone})</span>
            </a>
            <a
              href={defaultWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2.5 text-sm font-semibold text-white bg-brand-whatsapp hover:bg-brand-whatsappHover rounded-lg"
            >
              <MessageCircle className="w-4 h-4 fill-white text-brand-whatsapp" />
              <span>WhatsApp Price Inquiry</span>
            </a>
            <Link
              href="/admin/login"
              className="flex items-center justify-center gap-2 w-full py-2 text-xs font-semibold text-slate-600 hover:text-brand-navy bg-slate-50 hover:bg-slate-100 rounded-lg border border-slate-200"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Staff / Admin Portal</span>
            </Link>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>📍 Masoodpur Dairy, Vasant Kunj</span>
            <span className="font-semibold text-emerald-600">Open 10 AM - 9 PM</span>
          </div>
        </div>
      )}
    </header>
  );
}
