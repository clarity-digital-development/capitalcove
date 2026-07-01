import fs from 'node:fs';
import path from 'node:path';

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

export interface BlogPostMeta {
  slug: string;
  title: string;
  /** SEO <title> tag; falls back to `title`. */
  metaTitle: string;
  /** Meta description; falls back to excerpt. */
  metaDescription: string;
  category: string;
  readTime: string;
  excerpt: string;
  /** Comma-separated target keywords. */
  keywords: string;
  /** Publish date, ISO `YYYY-MM-DD`. */
  date: string;
  /** Cover image path under /public, e.g. /images/blog/slug.jpg */
  image: string;
  imageAlt: string;
}

export interface BlogPost extends BlogPostMeta {
  body: string;
}

/** Very small YAML-ish frontmatter parser — handles `key: "value"` pairs only. */
function parseFrontmatter(raw: string): {
  data: Record<string, string>;
  body: string;
} {
  const match = raw.match(/^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/);
  if (!match) {
    return { data: {}, body: raw };
  }
  const [, frontMatter, body] = match;
  const data: Record<string, string> = {};
  for (const line of frontMatter.split('\n')) {
    const fieldMatch = line.match(/^\s*([a-zA-Z0-9_]+)\s*:\s*(.*)\s*$/);
    if (!fieldMatch) continue;
    const [, key, rawValue] = fieldMatch;
    // Strip surrounding quotes
    const value = rawValue.replace(/^"(.*)"$/, '$1').replace(/^'(.*)'$/, '$1');
    data[key] = value;
  }
  return { data, body: body.trim() };
}

function postFromSlug(slug: string): BlogPost | null {
  const filePath = path.join(BLOG_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, 'utf8');
  const { data, body } = parseFrontmatter(raw);
  return {
    slug,
    title: data.title ?? slug,
    metaTitle: data.metaTitle ?? data.title ?? slug,
    metaDescription: data.metaDescription ?? data.excerpt ?? '',
    category: data.category ?? 'Article',
    readTime: data.readTime ?? '5 min read',
    excerpt: data.excerpt ?? '',
    keywords: data.keywords ?? '',
    date: data.date ?? '',
    image: data.image ?? '',
    imageAlt: data.imageAlt ?? data.title ?? '',
    body,
  };
}

export function getAllBlogSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith('.md'))
    .map((f) => f.replace(/\.md$/, ''));
}

/** All posts, newest first (by `date`). */
export function getAllBlogPosts(): BlogPostMeta[] {
  return getAllBlogSlugs()
    .map((slug) => postFromSlug(slug))
    .filter((p): p is BlogPost => p !== null)
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0))
    .map(({ body: _body, ...meta }) => meta);
}

export function getBlogPost(slug: string): BlogPost | null {
  return postFromSlug(slug);
}
