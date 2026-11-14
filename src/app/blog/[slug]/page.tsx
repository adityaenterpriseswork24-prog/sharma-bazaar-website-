import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import {
  ChevronRight,
  Clock,
  Calendar,
  UserCheck,
  ArrowLeft,
  ArrowRight,
  MessageCircle,
  Phone,
  Sparkles,
  Building2,
  CheckCircle2
} from 'lucide-react';
import { BLOG_POSTS } from '@/data/blog-posts';
import { SITE_CONFIG } from '@/data/site-config';
import { buildWhatsAppUrl } from '@/lib/utils';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = BLOG_POSTS.find((p) => p.slug === params.slug);
  if (!post) {
    return { title: 'Article Not Found | Sharma Electronics' };
  }

  return {
    title: `${post.title} | Sharma Electronics`,
    description: post.excerpt,
    alternates: {
      canonical: `https://www.sharmaelectronics.com/blog/${post.slug}`,
    },
    openGraph: {
      title: `${post.title} | Sharma Electronics`,
      description: post.excerpt,
      images: [
        {
          url: post.coverImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
  };
}

export const dynamicParams = true;

export async function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({
    slug: p.slug,
  }));
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = BLOG_POSTS.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  const whatsappUrl = buildWhatsAppUrl(
    SITE_CONFIG.whatsapp,
    `Hi Sharma Electronics, I just read your article "${post.title}" and would like to ask a question or get showroom pricing.`
  );

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: post.coverImage,
    datePublished: '2026-05-01',
    dateModified: '2026-08-15',
    author: {
      '@type': 'Person',
      name: post.author,
      jobTitle: post.authorRole,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_CONFIG.businessName,
      logo: {
        '@type': 'ImageObject',
        url: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=200&q=80',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://www.sharmaelectronics.com/blog/${post.slug}`,
    },
  };

  const breadcrumbsSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://www.sharmaelectronics.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: 'https://www.sharmaelectronics.com/blog',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: `https://www.sharmaelectronics.com/blog/${post.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsSchema) }}
      />

      <article className="bg-white min-h-screen py-10 sm:py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-1.5 text-xs text-slate-500 overflow-x-auto py-1">
            <Link href="/" className="hover:text-brand-blue shrink-0">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <Link href="/blog" className="hover:text-brand-blue shrink-0">
              Blog
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="text-slate-800 font-semibold truncate max-w-xs">{post.title}</span>
          </nav>

          {/* Article Header */}
          <header className="space-y-4">
            <div className="flex items-center gap-3 text-xs font-semibold">
              <span className="text-brand-blue bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                {post.category}
              </span>
              <span className="flex items-center gap-1 text-slate-500">
                <Clock className="w-3.5 h-3.5" />
                {post.readTime}
              </span>
              <span className="flex items-center gap-1 text-slate-500">
                <Calendar className="w-3.5 h-3.5" />
                {post.publishedDate}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-brand-navy tracking-tight leading-tight">
              {post.title}
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              {post.excerpt}
            </p>

            {/* Author Byline */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-50 text-brand-blue flex items-center justify-center font-bold">
                  <UserCheck className="w-5 h-5 text-brand-blue" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-bold text-slate-900">{post.author}</p>
                  <p className="text-[11px] text-slate-500">{post.authorRole}</p>
                </div>
              </div>

              <Link
                href={`/electronics?category=${post.relatedCategorySlug}`}
                className="text-xs font-bold text-brand-blue hover:underline flex items-center gap-1"
              >
                <span>View {post.category} in Store</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </header>

          {/* Cover Image */}
          <div className="rounded-3xl overflow-hidden aspect-[16/9] bg-slate-100 border border-slate-200 shadow-card">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Article Body Content */}
          <div className="space-y-8 text-slate-800 leading-relaxed text-sm sm:text-base">
            {post.content.map((sec, idx) => (
              <section key={idx} className="space-y-4">
                <h2 className="text-2xl font-black text-brand-navy pt-2">
                  {sec.heading}
                </h2>
                {sec.paragraphs.map((p, pIdx) => (
                  <p key={pIdx} className="text-slate-700 leading-relaxed">
                    {p}
                  </p>
                ))}

                {sec.keyTakeaways && sec.keyTakeaways.length > 0 && (
                  <div className="p-5 sm:p-6 rounded-2xl bg-blue-50/70 border border-blue-100 space-y-2.5 my-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-brand-blue flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-brand-blue" />
                      <span>Key Takeaways for Buyers</span>
                    </h4>
                    <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700">
                      {sec.keyTakeaways.map((item, tIdx) => (
                        <li key={tIdx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </section>
            ))}
          </div>

          {/* In-Article WhatsApp Counter-Quote Box */}
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white space-y-4 shadow-elevated">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Direct Showroom Advantage
            </span>
            <h3 className="text-xl sm:text-2xl font-black">
              Found a price online? Compare it with us before you order.
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Selected models at our 5-floor Masoodpur showroom can be ₹1,000–₹2,000 cheaper than major e-commerce platforms, with genuine brand warranty and same-day South Delhi dispatch.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-xl bg-brand-whatsapp hover:bg-brand-whatsappHover text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 fill-white text-brand-whatsapp" />
                <span>Ask Showroom Price on WhatsApp</span>
              </a>
              <a
                href={`tel:${SITE_CONFIG.phone}`}
                className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 border border-white/10"
              >
                <Phone className="w-4 h-4 text-blue-400" />
                <span>Call Showroom ({SITE_CONFIG.phone})</span>
              </a>
            </div>
          </div>

          {/* Back link */}
          <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-brand-blue"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to All Guides</span>
            </Link>

            <Link
              href="/electronics"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-blue hover:underline"
            >
              <span>Explore Electronics Catalogue</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
