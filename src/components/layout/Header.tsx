'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone, MessageCircle, ChevronRight, Lock } from 'lucide-react';
import { SITE_CONFIG, ELECTRONICS_CATEGORIES } from '@/data/site-config';
import { buildWhatsAppUrl } from '@/lib/utils';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { label: 'Showroom', href: '/' },
    { label: 'Catalogue', href: '/electronics' },
    { label: 'Why Choose Us', href: '/why-choose-us' },
    { label: 'Buying Guides', href: '/blog' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  const defaultWhatsAppUrl = buildWhatsAppUrl(
    SITE_CONFIG.whatsapp,
    `Hi Sharma Bazaar, I am on your website and would like to inquire about current showroom prices & stock availability.`
  );

  if (pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 bg-white/95 backdrop-blur-md ${
        scrolled ? 'border-b border-neutral-200 py-3 shadow-subtle' : 'border-b border-neutral-100 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Architectural Brand Identity */}
          <Link href="/" className="flex items-center gap-3.5 group">
            <div className="w-9 h-9 rounded-sm bg-brand-navy flex items-center justify-center text-white font-mono text-sm font-bold tracking-tight shadow-sm group-hover:bg-black transition-colors">
              SB
            </div>
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-lg font-bold tracking-tight text-brand-navy font-sans">
                  SHARMA
                </span>
                <span className="text-xs font-mono tracking-widest text-neutral-500 uppercase">
                  BAZAAR
                </span>
              </div>
              <p className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest flex items-center gap-1.5">
                <span>Vasant Kunj</span>
                <span className="w-1 h-1 rounded-full bg-neutral-300"></span>
                <span>Premier Showroom</span>
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 text-xs font-semibold uppercase tracking-wider text-neutral-600">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`transition-colors py-1 relative ${
                    isActive
                      ? 'text-brand-navy font-bold'
                      : 'hover:text-brand-navy text-neutral-600'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-brand-navy rounded-full"></span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Call & WhatsApp Actions */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={`tel:${SITE_CONFIG.phone}`}
              className="flex items-center gap-2 px-3.5 py-2 text-xs font-mono font-medium text-brand-navy hover:bg-neutral-50 rounded-sm transition-colors border border-neutral-200"
              title="Call Showroom"
            >
              <Phone className="w-3.5 h-3.5 text-neutral-500" />
              <span>{SITE_CONFIG.phone}</span>
            </a>

            <a
              href={defaultWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-brand-whatsapp hover:bg-brand-whatsappDark rounded-sm transition-colors shadow-subtle"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-white" />
              <span>Inquire on WhatsApp</span>
            </a>

            <Link
              href="/admin/login"
              className="p-2 text-neutral-400 hover:text-brand-navy transition-colors rounded-sm hover:bg-neutral-50 border border-transparent hover:border-neutral-200"
              title="Staff Portal"
            >
              <Lock className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile Menu & Quick WhatsApp Button */}
          <div className="flex items-center gap-2 sm:hidden">
            <a
              href={defaultWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-white bg-brand-whatsapp rounded-sm"
              aria-label="WhatsApp"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-brand-navy hover:bg-neutral-100 rounded-sm transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-full bg-white border-b border-neutral-200 shadow-xl px-6 py-6 transition-all duration-200 z-50">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center justify-between text-sm font-semibold tracking-wide text-neutral-800 hover:text-brand-navy py-2.5 border-b border-neutral-100"
              >
                <span>{link.label}</span>
                <ChevronRight className="w-4 h-4 text-neutral-400" />
              </Link>
            ))}
          </nav>

          <div className="mt-6 pt-4 border-t border-neutral-100">
            <p className="font-mono text-[10px] uppercase tracking-widest text-neutral-400 mb-3">
              Categories
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {ELECTRONICS_CATEGORIES.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/electronics?category=${cat.id}`}
                  className="px-3 py-2 rounded-sm bg-neutral-50 text-neutral-700 hover:text-brand-navy hover:bg-neutral-100 border border-neutral-200/60 transition-colors font-medium"
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-2.5">
            <a
              href={defaultWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 text-xs font-semibold text-white bg-brand-whatsapp hover:bg-brand-whatsappDark rounded-sm shadow-sm"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>WhatsApp Price Inquiry</span>
            </a>
            <a
              href={`tel:${SITE_CONFIG.phone}`}
              className="flex items-center justify-center gap-2 w-full py-2.5 text-xs font-mono font-medium text-brand-navy bg-neutral-50 border border-neutral-200 rounded-sm"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call Showroom ({SITE_CONFIG.phone})</span>
            </a>
            <Link
              href="/admin/login"
              className="flex items-center justify-center gap-1.5 w-full py-2 text-[11px] font-mono text-neutral-500 hover:text-brand-navy text-center"
            >
              <Lock className="w-3 h-3" />
              <span>Staff Portal Login</span>
            </Link>
          </div>

          <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between text-[11px] font-mono text-neutral-400">
            <span>Masoodpur Dairy, Vasant Kunj</span>
            <span className="text-emerald-700 font-sans font-semibold">Open 10 AM - 9 PM</span>
          </div>
        </div>
      )}
    </header>
  );
}
