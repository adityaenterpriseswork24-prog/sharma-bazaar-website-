'use client';

import { useState } from 'react';
import { Share2, Check, Copy, MessageCircle, ChevronDown, ListOrdered } from 'lucide-react';

interface ShareProps {
  title: string;
  url: string;
}

export function BlogShareBar({ title, url }: ShareProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const whatsappShareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
    `${title} - Read this guide from Sharma Bazaar: ${url}`
  )}`;

  return (
    <div className="p-5 bg-neutral-50 border border-neutral-200 rounded-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs">
      <div className="flex items-center gap-2 text-neutral-600 font-semibold">
        <Share2 className="w-4 h-4 text-neutral-400" />
        <span className="uppercase tracking-wider text-[11px]">Save &amp; Share Guide</span>
      </div>

      <div className="flex items-center gap-2">
        <a
          href={whatsappShareUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-brand-whatsapp hover:bg-brand-whatsappDark text-white text-[11px] font-semibold transition-colors"
        >
          <MessageCircle className="w-3.5 h-3.5 fill-white" />
          <span>Share on WhatsApp</span>
        </a>

        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-white hover:bg-neutral-100 text-neutral-700 border border-neutral-300 text-[11px] font-semibold transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-emerald-700">Link Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-neutral-500" />
              <span>Copy Link</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export function BlogTableOfContents({ sections }: { sections: { id: string; heading: string }[] }) {
  return (
    <nav className="p-6 bg-neutral-50/70 border border-neutral-200 rounded-sm space-y-3 font-sans">
      <div className="flex items-center gap-2 text-brand-navy">
        <ListOrdered className="w-4 h-4 text-neutral-500" />
        <h3 className="font-mono text-xs uppercase tracking-widest font-bold text-neutral-600">
          In This Article (Jump to Section)
        </h3>
      </div>
      <ul className="space-y-2 text-xs sm:text-sm">
        {sections.map((sec, idx) => (
          <li key={sec.id} className="flex items-baseline gap-2">
            <span className="font-mono text-[11px] text-neutral-400 shrink-0">
              0{idx + 1}.
            </span>
            <a
              href={`#${sec.id}`}
              className="text-neutral-700 hover:text-brand-navy hover:underline transition-colors leading-relaxed font-medium"
            >
              {sec.heading}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function BlogFaqAccordion({ faqs }: { faqs: { question: string; answer: string }[] }) {
  return (
    <div className="space-y-3">
      {faqs.map((f, i) => (
        <details
          key={i}
          className="group border border-neutral-200 rounded-sm bg-white overflow-hidden transition-all duration-200"
        >
          <summary className="flex items-center justify-between p-4 sm:p-5 text-xs sm:text-sm font-bold text-brand-navy cursor-pointer list-none select-none hover:bg-neutral-50 transition-colors">
            <span className="pr-4 leading-snug">{f.question}</span>
            <span className="w-5 h-5 rounded-full bg-neutral-100 flex items-center justify-center shrink-0 group-open:rotate-180 transition-transform duration-200">
              <ChevronDown className="w-3.5 h-3.5 text-neutral-600" />
            </span>
          </summary>
          <div className="px-4 pb-5 sm:px-5 sm:pb-6 text-xs sm:text-sm text-neutral-600 leading-relaxed border-t border-neutral-100 pt-3">
            <p>{f.answer}</p>
          </div>
        </details>
      ))}
    </div>
  );
}
