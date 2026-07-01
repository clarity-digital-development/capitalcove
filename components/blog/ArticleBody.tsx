import Link from 'next/link';
import type { ReactNode } from 'react';

/**
 * Minimal, SAFE markdown renderer for blog article bodies. Renders to React
 * nodes only — no HTML strings are ever inserted into the DOM. Supports:
 *   ## H2 / ### H3, paragraphs, "- " unordered lists, "1. " ordered lists,
 *   "> " blockquotes, **bold**, *italic*, and [text](url) links.
 */

/** Render inline markdown (links, bold, italic) within a line of text. */
function renderInline(text: string): ReactNode[] {
  const pattern = /(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*|\*[^*]+\*)/g;
  const parts = text.split(pattern);
  return parts.filter(Boolean).map((part, idx) => {
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) {
      const [, label, href] = link;
      const isInternal = href.startsWith('/');
      if (isInternal) {
        return (
          <Link key={idx} href={href} className="text-teal font-medium underline underline-offset-2 hover:text-teal-dark">
            {label}
          </Link>
        );
      }
      return (
        <a key={idx} href={href} target="_blank" rel="noopener noreferrer" className="text-teal font-medium underline underline-offset-2 hover:text-teal-dark">
          {label}
        </a>
      );
    }
    const bold = part.match(/^\*\*([^*]+)\*\*$/);
    if (bold) {
      return (
        <strong key={idx} className="font-semibold text-gray-900">
          {bold[1]}
        </strong>
      );
    }
    const italic = part.match(/^\*([^*]+)\*$/);
    if (italic) {
      return <em key={idx}>{italic[1]}</em>;
    }
    return <span key={idx}>{part}</span>;
  });
}

export function ArticleBody({ body }: { body: string }) {
  const lines = body.split(/\r?\n/);
  const blocks: ReactNode[] = [];
  let i = 0;
  let key = 0;

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    if (trimmed === '') {
      i++;
      continue;
    }

    // Headings
    if (trimmed.startsWith('### ')) {
      blocks.push(
        <h3 key={key++} className="font-display text-2xl text-navy mt-8 mb-3">
          {renderInline(trimmed.slice(4))}
        </h3>,
      );
      i++;
      continue;
    }
    if (trimmed.startsWith('## ')) {
      blocks.push(
        <h2 key={key++} className="font-display text-3xl text-navy mt-12 mb-4">
          {renderInline(trimmed.slice(3))}
        </h2>,
      );
      i++;
      continue;
    }

    // Unordered list
    if (/^[-*]\s+/.test(trimmed)) {
      const items: ReactNode[] = [];
      while (i < lines.length && /^[-*]\s+/.test(lines[i].trim())) {
        items.push(
          <li key={items.length} className="text-gray-700 leading-relaxed">
            {renderInline(lines[i].trim().replace(/^[-*]\s+/, ''))}
          </li>,
        );
        i++;
      }
      blocks.push(
        <ul key={key++} className="list-disc pl-6 space-y-2 mb-6">
          {items}
        </ul>,
      );
      continue;
    }

    // Ordered list
    if (/^\d+\.\s+/.test(trimmed)) {
      const items: ReactNode[] = [];
      while (i < lines.length && /^\d+\.\s+/.test(lines[i].trim())) {
        items.push(
          <li key={items.length} className="text-gray-700 leading-relaxed">
            {renderInline(lines[i].trim().replace(/^\d+\.\s+/, ''))}
          </li>,
        );
        i++;
      }
      blocks.push(
        <ol key={key++} className="list-decimal pl-6 space-y-2 mb-6">
          {items}
        </ol>,
      );
      continue;
    }

    // Blockquote
    if (trimmed.startsWith('> ')) {
      const quote: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('> ')) {
        quote.push(lines[i].trim().slice(2));
        i++;
      }
      blocks.push(
        <blockquote key={key++} className="border-l-4 border-gold pl-5 my-6 text-lg italic text-navy">
          {renderInline(quote.join(' '))}
        </blockquote>,
      );
      continue;
    }

    // Paragraph — accumulate until blank line or a block-level marker
    const para: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() !== '' &&
      !/^(#{2,3}\s|[-*]\s|\d+\.\s|>\s)/.test(lines[i].trim())
    ) {
      para.push(lines[i].trim());
      i++;
    }
    blocks.push(
      <p key={key++} className="text-gray-700 leading-relaxed mb-6">
        {renderInline(para.join(' '))}
      </p>,
    );
  }

  return <>{blocks}</>;
}
