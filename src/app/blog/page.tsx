import { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen, Clock, Calendar, ArrowRight, MessageCircle, Sparkles, UserCheck } from 'lucide-react';
import { BLOG_POSTS } from '@/data/blog-posts';
import { SITE_CONFIG } from '@/data/site-config';
import { buildWhatsAppUrl } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Electronics Buying Guides & Showroom Advice | Vasant Kunj Delhi',
  description:
    'Expert consumer electronics advice for Delhi homeowners. AC tonnage calculation, TV OLED vs QLED comparisons, washing machine hard water protection, and smart shopping tips.',
  alternates: {
    canonical: 'https://www.sharmaelectronics.com/blog',
  },
};

export default function BlogIndexPage() {
  const featuredPost = BLOG_POSTS[0];
  const remainingPosts = BLOG_POSTS.slice(1);

  const whatsappUrl = buildWhatsAppUrl(
    SITE_CONFIG.whatsapp,
    `Hi Sharma Electronics, I was reading your blog guides and have a question regarding an electronics purchase.`
  );

  return (
    <div className="bg-slate-50/60 min-h-screen py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="max-w-3xl space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-brand-blue text-xs font-bold uppercase tracking-widest border border-blue-200">
            <BookOpen className="w-3.5 h-3.5" />
            Showroom Knowledge Base
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-brand-navy tracking-tight">
            Electronics Buying Guides &amp; Expert Advice
          </h1>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Practical, unbiased buying guides tailored specifically for Delhi NCR climate, Indian household requirements, and smart local showroom shopping.
          </p>
        </div>

        {/* Featured Post Card */}
        {featuredPost && (
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-card overflow-hidden hover:shadow-cardHover transition-all">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
              <div className="lg:col-span-6 relative aspect-[16/10] lg:aspect-auto bg-slate-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={featuredPost.coverImage}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-4 left-4 bg-brand-navy text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                  Featured Guide
                </span>
              </div>

              <div className="lg:col-span-6 p-6 sm:p-10 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-xs text-slate-500 font-semibold">
                    <span className="text-brand-blue bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-100">
                      {featuredPost.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {featuredPost.readTime}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {featuredPost.publishedDate}
                    </span>
                  </div>

                  <Link href={`/blog/${featuredPost.slug}`}>
                    <h2 className="text-2xl sm:text-3xl font-black text-brand-navy hover:text-brand-blue transition-colors leading-snug">
                      {featuredPost.title}
                    </h2>
                  </Link>

                  <p className="text-sm text-slate-600 leading-relaxed">
                    {featuredPost.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs">
                    <UserCheck className="w-4 h-4 text-emerald-600" />
                    <div>
                      <p className="font-bold text-slate-900">{featuredPost.author}</p>
                      <p className="text-slate-400 text-[11px]">{featuredPost.authorRole}</p>
                    </div>
                  </div>

                  <Link
                    href={`/blog/${featuredPost.slug}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-navy hover:bg-slate-800 text-white text-xs font-bold transition-colors"
                  >
                    <span>Read Guide</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Remaining Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {remainingPosts.map((post) => (
            <article
              key={post.slug}
              className="bg-white rounded-3xl border border-slate-200/90 shadow-subtle hover:shadow-cardHover transition-all flex flex-col overflow-hidden group"
            >
              <div className="relative aspect-[16/10] bg-slate-100 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm text-slate-800 text-xs font-bold px-2.5 py-0.5 rounded-lg border border-slate-200">
                  {post.category}
                </span>
              </div>

              <div className="p-6 flex flex-col flex-grow justify-between space-y-4">
                <div className="space-y-2.5">
                  <div className="flex items-center gap-3 text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                    <span>•</span>
                    <span>{post.publishedDate}</span>
                  </div>

                  <Link href={`/blog/${post.slug}`} className="group-hover:text-brand-blue transition-colors">
                    <h3 className="text-lg font-bold text-slate-900 leading-snug line-clamp-2">
                      {post.title}
                    </h3>
                  </Link>

                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500 font-medium">
                    By {post.author}
                  </span>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-xs font-bold text-brand-blue hover:underline inline-flex items-center gap-1"
                  >
                    <span>Read More</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Consultation Callout */}
        <div className="p-8 sm:p-10 rounded-3xl bg-brand-navy text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-emerald-400">
              <Sparkles className="w-3.5 h-3.5" />
              Need Personal Showroom Advice?
            </span>
            <h3 className="text-xl sm:text-2xl font-black">
              Unsure which TV size, AC tonnage, or fridge capacity fits your room?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Message our store manager directly on WhatsApp. We provide honest sizing advice and compare local showroom prices for free.
            </p>
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 px-6 py-3.5 rounded-xl bg-brand-whatsapp hover:bg-brand-whatsappHover text-white font-bold text-sm flex items-center gap-2 shadow-md"
          >
            <MessageCircle className="w-4 h-4 fill-white text-brand-whatsapp" />
            <span>Consult on WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}
