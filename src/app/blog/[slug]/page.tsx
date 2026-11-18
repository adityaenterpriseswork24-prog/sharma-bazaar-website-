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
  MapPin,
  Lightbulb,
  AlertTriangle,
  Building2,
  Tag,
  Share2,
} from 'lucide-react';
import { BLOG_POSTS, BlogPost } from '@/data/blog-posts';
import { SITE_CONFIG } from '@/data/site-config';
import { buildWhatsAppUrl } from '@/lib/utils';
import {
  BlogShareBar,
  BlogTableOfContents,
  BlogFaqAccordion,
} from '@/components/blog/BlogInteractions';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = BLOG_POSTS.find((p) => p.slug === params.slug);
  if (!post) {
    return { title: 'Article Not Found | Sharma Bazaar' };
  }

  const title = post.metaTitle || (post.title.length <= 48 ? `${post.title} | Sharma Bazaar` : post.title.slice(0, 60));
  const description = post.metaDescription || (post.excerpt.length > 155 ? `${post.excerpt.slice(0, 152)}...` : post.excerpt);

  return {
    title,
    description,
    alternates: {
      canonical: `https://www.sharmabazaar.com/blog/${post.slug}`,
    },
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime: post.publishedDate,
      modifiedTime: post.modifiedDate || post.publishedDate,
      authors: [post.author],
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

function renderParagraphWithLinks(text: string) {
  const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const elements: (string | JSX.Element)[] = [];
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      elements.push(text.substring(lastIndex, match.index));
    }
    const label = match[1];
    const href = match[2];
    const isInternal = href.startsWith('/') || href.startsWith('#');

    if (isInternal) {
      elements.push(
        <Link
          key={match.index}
          href={href}
          className="text-brand-navy font-semibold underline underline-offset-4 hover:text-brand-copper transition-colors"
        >
          {label}
        </Link>
      );
    } else {
      elements.push(
        <a
          key={match.index}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-brand-navy font-semibold underline underline-offset-4 hover:text-brand-copper transition-colors"
        >
          {label}
        </a>
      );
    }
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    elements.push(text.substring(lastIndex));
  }

  return elements.length > 0 ? elements : text;
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = BLOG_POSTS.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  // Related posts (excluding current post)
  const relatedPosts = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);

  const whatsappInquiryUrl = buildWhatsAppUrl(
    SITE_CONFIG.whatsapp,
    `Hi Sharma Bazaar, I am reading your article "${post.title}" and would like to ask a technical question or get showroom pricing.`
  );

  const articleCanonicalUrl = `https://www.sharmabazaar.com/blog/${post.slug}`;

  // 1. Article / BlogPosting Schema
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: post.coverImage,
    datePublished: post.publishedDate,
    dateModified: post.modifiedDate || post.publishedDate,
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
        url: 'https://www.sharmabazaar.com/images/sharma-bazaar-symbol.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': articleCanonicalUrl,
    },
  };

  // 2. Breadcrumbs Schema
  const breadcrumbsSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://www.sharmabazaar.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Buying Guides',
        item: 'https://www.sharmabazaar.com/blog',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: articleCanonicalUrl,
      },
    ],
  };

  // 3. FAQPage Schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: post.faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer,
      },
    })),
  };

  // 4. LocalBusiness Schema
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'ElectronicsStore',
    name: SITE_CONFIG.businessName,
    telephone: SITE_CONFIG.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE_CONFIG.address,
      addressLocality: SITE_CONFIG.area,
      addressRegion: SITE_CONFIG.city,
      postalCode: SITE_CONFIG.pincode,
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: SITE_CONFIG.coordinates.latitude,
      longitude: SITE_CONFIG.coordinates.longitude,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: '10:00',
        closes: '21:00',
      },
    ],
    priceRange: '₹₹₹',
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />

      <article className="bg-[#faf8f5]/40 min-h-screen py-8 sm:py-14">
        {/* Centered single-column reading container with 720px max inner prose */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-xs font-mono text-neutral-400 overflow-x-auto py-1">
            <Link href="/" className="hover:text-brand-navy shrink-0">
              Showroom
            </Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-brand-navy shrink-0">
              Buying Guides
            </Link>
            <span>/</span>
            <span className="text-neutral-800 font-semibold truncate max-w-xs sm:max-w-md">
              {post.title}
            </span>
          </nav>

          {/* Article Header & Title */}
          <header className="space-y-4 max-w-[720px] mx-auto">
            {/* Category Pill */}
            <div>
              <Link
                href={`/electronics?category=${post.relatedCategorySlug}`}
                className="inline-flex items-center px-3 py-1 rounded-full bg-brand-navy text-white text-[11px] font-bold uppercase tracking-wider hover:bg-black transition-colors"
              >
                {post.category}
              </Link>
            </div>

            {/* H1 Title */}
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-brand-navy tracking-tight leading-[1.15]">
              {post.title}
            </h1>

            {/* Subtitle */}
            {post.subtitle && (
              <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-normal">
                {post.subtitle}
              </p>
            )}

            {/* Author Byline & Metadata */}
            <div className="pt-4 border-t border-neutral-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono text-neutral-500">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-brand-navy text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-subtle">
                  SB
                </div>
                <div>
                  <p className="font-bold text-neutral-900 font-sans text-xs">{post.author}</p>
                  <p className="text-neutral-400 text-[11px]">{post.authorRole}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-[11px] text-neutral-400">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {post.publishedDate}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {post.readTime}
                </span>
              </div>
            </div>
          </header>

          {/* Featured Image */}
          <div className="max-w-[720px] mx-auto border border-neutral-200 rounded-lg overflow-hidden aspect-[16/9] bg-neutral-100 shadow-subtle">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Quick Takeaway Box ("at a Glance") */}
          {post.quickTakeaways && post.quickTakeaways.length > 0 && (
            <div className="max-w-[720px] mx-auto p-6 sm:p-8 bg-neutral-50 border border-neutral-200/90 rounded-lg space-y-4 shadow-subtle">
              <div className="flex items-center gap-2 text-brand-navy">
                <Lightbulb className="w-4 h-4 text-amber-600 shrink-0" />
                <h3 className="font-mono text-xs uppercase tracking-widest font-bold text-neutral-700">
                  Quick Overview · At a Glance
                </h3>
              </div>
              <ul className="space-y-2.5 text-xs sm:text-sm text-neutral-700">
                {post.quickTakeaways.map((takeaway, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Table of Contents */}
          <div className="max-w-[720px] mx-auto">
            <BlogTableOfContents
              sections={post.content.map((sec) => ({
                id: sec.id,
                heading: sec.heading,
              }))}
            />
          </div>

          {/* Main Article Body */}
          <div className="max-w-[720px] mx-auto space-y-10 text-neutral-800 leading-relaxed text-sm sm:text-base font-sans">
            {post.content.map((sec) => (
              <section key={sec.id} id={sec.id} className="space-y-4 scroll-mt-24">
                <h2 className="text-xl sm:text-2xl font-bold text-brand-navy tracking-tight pt-2 border-b border-neutral-100 pb-2">
                  {sec.heading}
                </h2>

                {sec.paragraphs.map((p, pIdx) => (
                  <p key={pIdx} className="text-neutral-700 leading-relaxed">
                    {renderParagraphWithLinks(p)}
                  </p>
                ))}

                {/* Optional In-Section Comparison Table */}
                {sec.table && (
                  <div className="my-6 space-y-2">
                    <h4 className="font-mono text-xs uppercase tracking-wider font-bold text-brand-navy">
                      {sec.table.title}
                    </h4>
                    <div className="overflow-x-auto border border-neutral-200 rounded-sm shadow-subtle">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead>
                          <tr className="bg-neutral-100 border-b border-neutral-200 font-mono text-[11px] uppercase tracking-wider text-neutral-700">
                            {sec.table.headers.map((h, hIdx) => (
                              <th key={hIdx} className="p-3 font-bold whitespace-nowrap">
                                {h}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-200 bg-white">
                          {sec.table.rows.map((row, rIdx) => (
                            <tr
                              key={rIdx}
                              className={rIdx % 2 === 0 ? 'bg-white' : 'bg-neutral-50/60'}
                            >
                              {row.map((cell, cIdx) => (
                                <td
                                  key={cIdx}
                                  className={`p-3 text-neutral-700 leading-relaxed ${
                                    cIdx === 0 ? 'font-semibold text-brand-navy font-mono' : ''
                                  }`}
                                >
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Optional In-Section Callout Box */}
                {sec.callout && (
                  <div
                    className={`p-5 rounded-sm border my-5 space-y-2 ${
                      sec.callout.type === 'alert'
                        ? 'bg-rose-50/50 border-rose-200 text-rose-900'
                        : sec.callout.type === 'showroom'
                        ? 'bg-brand-navy text-white border-brand-navy'
                        : 'bg-emerald-50/50 border-emerald-200 text-emerald-950'
                    }`}
                  >
                    <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider font-mono">
                      {sec.callout.type === 'alert' && (
                        <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                      )}
                      {sec.callout.type === 'tip' && (
                        <Lightbulb className="w-4 h-4 text-emerald-600 shrink-0" />
                      )}
                      {sec.callout.type === 'showroom' && (
                        <Building2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      )}
                      <span>{sec.callout.title}</span>
                    </div>
                    <p
                      className={`text-xs sm:text-sm leading-relaxed ${
                        sec.callout.type === 'showroom' ? 'text-neutral-200' : 'text-neutral-700'
                      }`}
                    >
                      {sec.callout.content}
                    </p>
                    {sec.callout.type === 'showroom' && (
                      <div className="pt-2">
                        <a
                          href={whatsappInquiryUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-brand-whatsapp hover:bg-brand-whatsappDark text-white text-xs font-semibold rounded-sm transition-colors"
                        >
                          <MessageCircle className="w-3.5 h-3.5 fill-white" />
                          <span>Inquire on WhatsApp</span>
                        </a>
                      </div>
                    )}
                  </div>
                )}

                {/* Key Takeaways list if present */}
                {sec.keyTakeaways && sec.keyTakeaways.length > 0 && (
                  <div className="p-5 bg-neutral-50 border border-neutral-200 rounded-sm space-y-2 my-4">
                    <h4 className="font-mono text-xs uppercase tracking-wider text-brand-navy font-bold">
                      Key Takeaways for Buyers
                    </h4>
                    <ul className="space-y-1.5 text-xs text-neutral-700">
                      {sec.keyTakeaways.map((item, tIdx) => (
                        <li key={tIdx} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </section>
            ))}
          </div>

          {/* Save & Share Bar */}
          <div className="max-w-[720px] mx-auto pt-6 border-t border-neutral-200">
            <BlogShareBar title={post.title} url={articleCanonicalUrl} />
          </div>

          {/* Interactive FAQ Accordion */}
          {post.faqs && post.faqs.length > 0 && (
            <div className="max-w-[720px] mx-auto pt-8 border-t border-neutral-200 space-y-6">
              <div className="space-y-1">
                <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-400">
                  Buyer Clarifications
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-brand-navy">
                  Frequently Asked Questions
                </h3>
                <p className="text-xs text-neutral-500">
                  Expert answers to the most common questions our showroom technicians receive from South Delhi buyers.
                </p>
              </div>

              <BlogFaqAccordion faqs={post.faqs} />

              {/* Direct Help Prompt */}
              <div className="p-4 bg-neutral-50 rounded-sm border border-neutral-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <span className="text-neutral-600">
                  Have a specific question about your room dimensions or water setup?
                </span>
                <a
                  href={whatsappInquiryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-brand-navy hover:underline inline-flex items-center gap-1.5 shrink-0"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Chat with Store Manager</span>
                </a>
              </div>
            </div>
          )}

          {/* Article SEO Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="max-w-[720px] mx-auto pt-6 border-t border-neutral-200 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-mono text-neutral-400">
                <Tag className="w-3.5 h-3.5" />
                <span className="uppercase tracking-wider">Related Topics:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-sm bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-mono transition-colors"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* High-Contrast Showroom Conversion CTA Banner */}
          <div className="max-w-[720px] mx-auto p-8 sm:p-10 bg-brand-navy text-white rounded-lg text-center space-y-4 shadow-elevated">
            <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-400">
              South Delhi Physical Showroom
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Ready to Upgrade Your Home Appliances?
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300 max-w-lg mx-auto leading-relaxed">
              Visit our showroom at <strong>Dairy Farm, 80-B, Masoodpur, G/F, Vasant Kunj</strong> or message our store manager on WhatsApp to get counter-prices that save up to ₹1,000–₹5,000 on select models.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <Link
                href={`/electronics?category=${post.relatedCategorySlug}`}
                className="px-6 py-3 bg-white text-brand-navy hover:bg-neutral-100 text-xs font-bold uppercase tracking-wider rounded-sm transition-colors"
              >
                <span>Browse {post.category}</span>
              </Link>

              <a
                href={whatsappInquiryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-brand-whatsapp hover:bg-brand-whatsappDark text-white text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors flex items-center gap-2 shadow-subtle"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Inquire on WhatsApp</span>
              </a>

              <a
                href={`tel:${SITE_CONFIG.phone}`}
                className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors flex items-center gap-2 border border-white/20"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call {SITE_CONFIG.phone}</span>
              </a>
            </div>
          </div>

          {/* Related Articles 3-Column Grid */}
          {relatedPosts.length > 0 && (
            <div className="pt-12 border-t border-neutral-200 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-400">
                    Continue Reading
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-brand-navy">
                    Related Buying Guides
                  </h3>
                </div>
                <Link
                  href="/blog"
                  className="font-mono text-xs font-semibold text-brand-navy hover:underline flex items-center gap-1"
                >
                  <span>View All Guides</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((rel) => (
                  <Link
                    key={rel.slug}
                    href={`/blog/${rel.slug}`}
                    className="group flex flex-col bg-white border border-neutral-200 rounded-sm overflow-hidden hover:border-brand-navy/60 hover:shadow-subtle transition-all duration-200"
                  >
                    <div className="relative aspect-[16/9] bg-neutral-100 overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={rel.coverImage}
                        alt={rel.title}
                        className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                      />
                      <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-brand-navy/90 text-white text-[10px] font-bold uppercase tracking-wider">
                        {rel.category}
                      </span>
                    </div>

                    <div className="p-4 flex flex-col flex-grow space-y-2">
                      <h4 className="text-sm font-bold text-neutral-900 group-hover:text-brand-navy transition-colors line-clamp-2 leading-snug">
                        {rel.title}
                      </h4>
                      <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed">
                        {rel.excerpt}
                      </p>
                      <div className="mt-auto pt-3 border-t border-neutral-100 flex items-center justify-between text-[11px] font-mono text-neutral-400">
                        <span>{rel.readTime}</span>
                        <span className="font-semibold text-brand-navy group-hover:underline flex items-center gap-1">
                          Read <ArrowRight className="w-2.5 h-2.5" />
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>
    </>
  );
}
