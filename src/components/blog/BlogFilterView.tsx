'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, Calendar, ArrowRight, Search, X } from 'lucide-react';
import { BlogPost } from '@/data/blog-posts';

interface BlogFilterViewProps {
  posts: BlogPost[];
}

export function BlogFilterView({ posts }: BlogFilterViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = useMemo(() => {
    const cats = new Set<string>();
    posts.forEach((p) => {
      if (p.category) cats.add(p.category);
    });
    return ['All', ...Array.from(cats)];
  }, [posts]);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      if (selectedCategory !== 'All' && post.category !== selectedCategory) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        return (
          post.title.toLowerCase().includes(q) ||
          post.excerpt.toLowerCase().includes(q) ||
          post.category.toLowerCase().includes(q) ||
          post.author.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [posts, selectedCategory, searchQuery]);

  return (
    <div className="space-y-8">
      {/* Category Pills & Search Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-b border-neutral-200/80 pb-4">
        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            const count = cat === 'All' ? posts.length : posts.filter((p) => p.category === cat).length;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all ${
                  isSelected
                    ? 'bg-brand-navy text-white shadow-subtle font-bold'
                    : 'bg-white hover:bg-neutral-100 text-neutral-700 border border-neutral-200'
                }`}
              >
                <span>{cat === 'All' ? 'All Guides' : cat}</span>
                <span className={`ml-1.5 text-[10px] font-mono ${isSelected ? 'text-neutral-300' : 'text-neutral-400'}`}>
                  ({count})
                </span>
              </button>
            );
          })}
        </div>

        {/* Search Field */}
        <div className="relative sm:w-64">
          <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search guides..."
            className="w-full pl-8 pr-7 py-1.5 bg-white border border-neutral-200 rounded-full text-xs text-neutral-900 focus:outline-none focus:border-brand-navy"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
              aria-label="Clear search"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>

      {/* Posts Grid */}
      {filteredPosts.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-sm border border-neutral-200 p-8 space-y-3">
          <p className="text-sm font-bold text-brand-navy">No buying guides found matching your search.</p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSearchQuery('');
            }}
            className="text-xs font-mono text-neutral-500 hover:text-brand-navy hover:underline"
          >
            Clear Filters &amp; View All Guides
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredPosts.map((post) => (
            <article
              key={post.slug}
              className="flex flex-col bg-white border border-neutral-200 rounded-lg overflow-hidden shadow-subtle hover:border-brand-navy/60 hover:shadow-hover transition-all duration-300 group"
            >
              {/* Cover Image */}
              <Link href={`/blog/${post.slug}`} className="block relative aspect-[16/10] bg-neutral-100 overflow-hidden border-b border-neutral-100">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover group-hover:scale-102 transition-transform duration-300"
                  loading="lazy"
                />
                <span className="absolute bottom-3 left-3 px-2.5 py-0.5 rounded-full bg-brand-navy text-white text-[10px] font-bold uppercase tracking-wider shadow-subtle z-10">
                  {post.category}
                </span>
              </Link>

              {/* Content */}
              <div className="p-5 sm:p-6 flex flex-col flex-grow justify-between space-y-4">
                <div className="space-y-2.5">
                  <div className="flex items-center gap-3 text-[11px] font-mono text-neutral-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-neutral-400" />
                      {post.readTime}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-neutral-300"></span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-neutral-400" />
                      {post.publishedDate}
                    </span>
                  </div>

                  <Link href={`/blog/${post.slug}`} className="block group-hover:text-brand-navy transition-colors">
                    <h2 className="text-base sm:text-lg font-bold text-neutral-900 leading-snug line-clamp-2">
                      {post.title}
                    </h2>
                  </Link>

                  <p className="text-xs text-neutral-600 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-3 border-t border-neutral-100 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-neutral-400 truncate max-w-[160px]">
                    {post.author}
                  </span>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-brand-navy group-hover:underline"
                  >
                    <span>Read Guide</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
