import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Clock, Calendar } from 'lucide-react';
import { BLOG_POSTS } from '@/data/blog-posts';
import { SITE_CONFIG } from '@/data/site-config';
import { buildWhatsAppUrl } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Electronics Buying Guides & Showroom Advice | Vasant Kunj Delhi',
  description:
    'Expert consumer electronics advice for Delhi homeowners. AC tonnage calculation, TV OLED vs QLED comparisons, washing machine hard water protection, and smart shopping tips.',
  alternates: {
    canonical: 'https://www.sharmabazaar.com/blog',
  },
};

export default function BlogIndexPage() {
  const featuredPost = BLOG_POSTS[0];
  const remainingPosts = BLOG_POSTS.slice(1);

  const whatsappUrl = buildWhatsAppUrl(
    SITE_CONFIG.whatsapp,
    `Hi Sharma Bazaar, I was reading your blog guides and have a question regarding an electronics purchase.`
  );

  return (
    <div className="bg-white min-h-screen py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="max-w-3xl space-y-3">
          <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-400">
            Showroom Editorial Journal
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-brand-navy">
            Electronics Buying Guides
          </h1>
          <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-normal">
            Practical, unbiased buying guides tailored specifically for Delhi NCR climate,
            Indian household requirements, and smart local showroom shopping.
          </p>
        </div>

        {/* Featured Post */}
        {featuredPost && (
          <div className="border border-neutral-200 rounded-sm overflow-hidden bg-neutral-50/40">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
              <div className="lg:col-span-6 relative aspect-[16/10] lg:aspect-auto bg-neutral-100 border-b lg:border-b-0 lg:border-r border-neutral-200">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={featuredPost.coverImage}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-4 left-4 font-mono text-[10px] uppercase tracking-wider text-white bg-black/70 px-2 py-0.5 rounded-sm">
                  Featured Guide
                </span>
              </div>

              <div className="lg:col-span-6 p-6 sm:p-10 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-xs font-mono text-neutral-400">
                    <span className="text-brand-navy font-bold uppercase">{featuredPost.category}</span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {featuredPost.readTime}
                    </span>
                    <span>·</span>
                    <span>{featuredPost.publishedDate}</span>
                  </div>

                  <Link href={`/blog/${featuredPost.slug}`}>
                    <h2 className="text-2xl sm:text-3xl font-bold text-brand-navy hover:underline leading-snug">
                      {featuredPost.title}
                    </h2>
                  </Link>

                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                    {featuredPost.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-neutral-200/80 flex items-center justify-between">
                  <div className="text-xs">
                    <p className="font-bold text-neutral-900">{featuredPost.author}</p>
                    <p className="font-mono text-[11px] text-neutral-400">{featuredPost.authorRole}</p>
                  </div>

                  <Link
                    href={`/blog/${featuredPost.slug}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-brand-navy hover:bg-black text-white text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors"
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          {remainingPosts.map((post) => (
            <div
              key={post.slug}
              className="group border border-neutral-200 rounded-sm overflow-hidden flex flex-col bg-white hover:border-brand-navy transition-colors"
            >
              <div className="relative aspect-[16/10] bg-neutral-100 overflow-hidden border-b border-neutral-200">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                  loading="lazy"
                />
              </div>

              <div className="p-5 flex flex-col flex-grow space-y-3">
                <div className="flex items-center gap-2 font-mono text-[10px] text-neutral-400 uppercase tracking-wider">
                  <span className="font-bold text-brand-navy">{post.category}</span>
                  <span>·</span>
                  <span>{post.readTime}</span>
                </div>

                <Link href={`/blog/${post.slug}`}>
                  <h3 className="text-base font-bold text-neutral-900 group-hover:text-brand-navy leading-snug">
                    {post.title}
                  </h3>
                </Link>

                <p className="text-xs text-neutral-500 leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="mt-auto pt-3 border-t border-neutral-100 flex items-center justify-between text-xs font-mono text-neutral-400">
                  <span>{post.author}</span>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="font-semibold text-brand-navy hover:underline flex items-center gap-1"
                  >
                    <span>Read</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
