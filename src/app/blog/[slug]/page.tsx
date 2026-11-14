import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import {
  Clock,
  Calendar,
  ArrowRight,
  MessageCircle,
  Phone,
  Check,
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

      <article className="bg-white min-h-screen py-10 sm:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-xs font-mono text-neutral-400 overflow-x-auto py-1">
            <Link href="/" className="hover:text-brand-navy shrink-0">
              Showroom
            </Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-brand-navy shrink-0">
              Journal
            </Link>
            <span>/</span>
            <span className="text-neutral-800 font-semibold truncate max-w-xs">{post.title}</span>
          </nav>

          {/* Article Header */}
          <header className="space-y-4">
            <div className="flex items-center gap-3 font-mono text-xs text-neutral-400 uppercase tracking-wider">
              <span className="font-bold text-brand-navy">{post.category}</span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {post.readTime}
              </span>
              <span>·</span>
              <span>{post.publishedDate}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-navy tracking-tight leading-[1.15]">
              {post.title}
            </h1>

            <p className="text-base text-neutral-600 leading-relaxed font-normal">
              {post.excerpt}
            </p>

            {/* Author Byline */}
            <div className="pt-4 border-t border-neutral-200 flex items-center justify-between text-xs font-mono">
              <div>
                <p className="font-bold text-neutral-900 font-sans">{post.author}</p>
                <p className="text-neutral-400 text-[11px]">{post.authorRole}</p>
              </div>

              <Link
                href={`/electronics?category=${post.relatedCategorySlug}`}
                className="font-semibold text-brand-navy hover:underline flex items-center gap-1"
              >
                <span>View {post.category} in Store</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </header>

          {/* Cover Image */}
          <div className="border border-neutral-200 rounded-sm overflow-hidden aspect-[16/9] bg-neutral-100">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Article Body Content */}
          <div className="space-y-8 text-neutral-800 leading-relaxed text-sm sm:text-base">
            {post.content.map((sec, idx) => (
              <section key={idx} className="space-y-4">
                <h2 className="text-xl sm:text-2xl font-bold text-brand-navy pt-2">
                  {sec.heading}
                </h2>
                {sec.paragraphs.map((p, pIdx) => (
                  <p key={pIdx} className="text-neutral-700 leading-relaxed">
                    {p}
                  </p>
                ))}

                {sec.keyTakeaways && sec.keyTakeaways.length > 0 && (
                  <div className="p-5 bg-neutral-50 border border-neutral-200 rounded-sm space-y-2 my-4">
                    <h4 className="font-mono text-xs uppercase tracking-wider text-brand-navy font-bold">
                      Key Takeaways for Buyers
                    </h4>
                    <ul className="space-y-1.5 text-xs text-neutral-700">
                      {sec.keyTakeaways.map((item, tIdx) => (
                        <li key={tIdx} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </section>
            ))}
          </div>

          {/* Showroom Direct WhatsApp CTA Box */}
          <div className="p-6 sm:p-8 bg-brand-navy text-white rounded-sm space-y-4 mt-12">
            <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-400">
              Personal Showroom Advice
            </span>
            <h3 className="text-xl font-bold text-white">
              Have a question about this appliance?
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
              Our store manager at Masoodpur Dairy showroom can review room dimensions, water TDS, or online quotes with you directly.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 bg-brand-whatsapp hover:bg-brand-whatsappDark text-white text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors flex items-center gap-2 shadow-subtle"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Ask on WhatsApp</span>
              </a>

              <a
                href={`tel:${SITE_CONFIG.phone}`}
                className="px-5 py-3 bg-white text-brand-navy hover:bg-neutral-100 text-xs font-bold uppercase tracking-wider rounded-sm transition-colors flex items-center gap-2"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call {SITE_CONFIG.phone}</span>
              </a>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
