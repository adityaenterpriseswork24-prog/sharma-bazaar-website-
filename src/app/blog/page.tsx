import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Clock, Calendar, MessageCircle, Phone, Sparkles } from 'lucide-react';
import { BLOG_POSTS } from '@/data/blog-posts';
import { SITE_CONFIG } from '@/data/site-config';
import { buildWhatsAppUrl } from '@/lib/utils';
import { BlogFilterView } from '@/components/blog/BlogFilterView';

export const metadata: Metadata = {
  title: 'Electronics Buying Guides & Showroom Advice | Sharma Bazaar',
  description:
    'Expert electronics buying guides for Delhi homes: 55-inch TV prices, AC tonnage calculators, washing machine hard water tips & beating online prices.',
  alternates: {
    canonical: 'https://www.sharmabazaar.com/blog',
  },
};

export default function BlogIndexPage() {
  const featuredPost = BLOG_POSTS[0];

  const whatsappUrl = buildWhatsAppUrl(
    SITE_CONFIG.whatsapp,
    `Hi Sharma Bazaar, I am reading your electronics buying guides and have a question regarding an appliance purchase.`
  );

  return (
    <div className="bg-[#faf8f5]/40 min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs font-mono text-neutral-400">
          <Link href="/" className="hover:text-brand-navy">
            Showroom
          </Link>
          <span>/</span>
          <span className="text-neutral-800 font-semibold">Buying Guides</span>
        </nav>

        {/* Header */}
        <div className="max-w-3xl space-y-3">
          <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-400">
            Showroom Editorial Journal
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-brand-navy">
            Electronics Buying Guides &amp; Expert Advice
          </h1>
          <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-normal">
            Authoritative, unbiased guides tailored specifically for Delhi NCR climate,
            hard groundwater conditions, and smart local showroom shopping.
          </p>
        </div>

        {/* Featured Post (Hero Card) */}
        {featuredPost && (
          <div className="border border-neutral-200 rounded-lg overflow-hidden bg-white shadow-subtle hover:border-brand-navy/60 transition-all duration-200">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
              <div className="lg:col-span-6 relative aspect-[16/10] lg:aspect-auto min-h-[280px] bg-neutral-100 border-b lg:border-b-0 lg:border-r border-neutral-200">
                <Image
                  src={featuredPost.coverImage}
                  alt={featuredPost.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <span className="absolute top-4 left-4 font-mono text-[10px] uppercase tracking-wider text-white bg-black/80 px-2.5 py-1 rounded-sm shadow-subtle">
                  Featured Guide
                </span>
                <span className="absolute bottom-4 left-4 px-2.5 py-0.5 rounded-full bg-brand-navy text-white text-[10px] font-bold uppercase tracking-wider shadow-subtle">
                  {featuredPost.category}
                </span>
              </div>

              <div className="lg:col-span-6 p-6 sm:p-10 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-xs font-mono text-neutral-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {featuredPost.readTime}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {featuredPost.publishedDate}
                    </span>
                  </div>

                  <Link href={`/blog/${featuredPost.slug}`}>
                    <h2 className="text-2xl sm:text-3xl font-bold text-brand-navy hover:underline leading-snug">
                      {featuredPost.title}
                    </h2>
                  </Link>

                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                    {featuredPost.subtitle || featuredPost.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-neutral-100 flex items-center justify-between">
                  <div className="text-xs font-mono">
                    <p className="font-bold text-neutral-900 font-sans">{featuredPost.author}</p>
                    <p className="text-neutral-400 text-[11px]">{featuredPost.authorRole}</p>
                  </div>

                  <Link
                    href={`/blog/${featuredPost.slug}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-brand-navy hover:bg-black text-white text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors shadow-subtle"
                  >
                    <span>Read Full Guide</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Dynamic Interactive Blog Filter & Catalogue */}
        <div className="space-y-6 pt-4">
          <div className="flex items-center justify-between border-b border-neutral-200/80 pb-3">
            <h2 className="text-xl sm:text-2xl font-bold text-brand-navy tracking-tight">
              All Appliance Buying Guides
            </h2>
            <span className="text-xs font-mono text-neutral-400">
              {BLOG_POSTS.length} Published Articles
            </span>
          </div>

          <BlogFilterView posts={BLOG_POSTS} />
        </div>

        {/* High-Contrast Conversion Banner */}
        <div className="p-8 sm:p-12 bg-brand-navy text-white rounded-lg text-center space-y-4 shadow-elevated">
          <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-400">
            Delhi Showroom Consultation
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white max-w-xl mx-auto">
            Need Personalized Sizing Advice for Your Home?
          </h2>
          <p className="text-xs sm:text-sm text-neutral-300 max-w-lg mx-auto leading-relaxed">
            Our showroom engineers at <strong>Dairy Farm, 80-B, Masoodpur, G/F, Vasant Kunj</strong> can evaluate your room dimensions, electrical load, or water TDS and share wholesale counter-prices directly on WhatsApp.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-brand-whatsapp hover:bg-brand-whatsappDark text-white text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors flex items-center gap-2 shadow-subtle"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Ask on WhatsApp</span>
            </a>

            <a
              href={`tel:${SITE_CONFIG.phone}`}
              className="px-6 py-3 bg-white text-brand-navy hover:bg-neutral-100 text-xs font-bold uppercase tracking-wider rounded-sm transition-colors flex items-center gap-2"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call {SITE_CONFIG.phone}</span>
            </a>

            <Link
              href="/contact"
              className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold uppercase tracking-wider rounded-sm border border-white/20 transition-colors"
            >
              <span>Showroom Directions</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
