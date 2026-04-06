import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPosts, getPostBySlug } from "@/lib/mdx";
import { formatDate } from "@/lib/utils";
import { FiArrowLeft, FiClock, FiCalendar } from "react-icons/fi";
import type { Metadata } from "next";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  if (!post) return {};
  return {
    title:       post.title,
    description: post.description,
    openGraph: {
      title:       post.title,
      description: post.description,
      type:        "article",
      publishedTime: post.date,
      tags:        post.tags,
    },
  };
}

export default function BlogPostPage({ params }: Props) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  return (
    <>
      {/* BlogPosting JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type":    "BlogPosting",
            headline:   post.title,
            description: post.description,
            datePublished: post.date,
            author: {
              "@type": "Person",
              name:    "Muhammad Awais",
              url:     "https://muhammadawais.dev",
            },
            keywords: post.tags.join(", "),
          }),
        }}
      />

      <main className="min-h-screen bg-bg-primary pt-24 pb-20">
        <div className="container-max max-w-3xl">
          {/* Back */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-text-secondary hover:text-accent-primary text-sm mb-10 transition-colors"
          >
            <FiArrowLeft size={14} /> All posts
          </Link>

          {/* Post header */}
          <header className="mb-10">
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs text-accent-primary bg-accent-primary/10 border border-accent-primary/20 px-2.5 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-text-primary leading-tight mb-4">
              {post.title}
            </h1>

            <p className="text-text-secondary text-lg leading-relaxed mb-6">
              {post.description}
            </p>

            <div className="flex items-center gap-5 text-text-tertiary text-sm pb-8 border-b border-white/10">
              <span className="flex items-center gap-1.5">
                <FiCalendar size={13} /> {formatDate(post.date)}
              </span>
              <span className="flex items-center gap-1.5">
                <FiClock size={13} /> {post.readingTime} min read
              </span>
            </div>
          </header>

          {/* MDX Content */}
          <article className="prose prose-invert prose-lg max-w-none
            prose-headings:text-text-primary prose-headings:font-bold
            prose-p:text-text-secondary prose-p:leading-relaxed
            prose-a:text-accent-primary prose-a:no-underline hover:prose-a:underline
            prose-strong:text-text-primary
            prose-code:text-accent-primary prose-code:bg-bg-secondary prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:before:content-none prose-code:after:content-none
            prose-pre:bg-bg-secondary prose-pre:border prose-pre:border-white/10 prose-pre:rounded-xl
            prose-blockquote:border-l-accent-primary prose-blockquote:text-text-secondary
            prose-hr:border-white/10
            prose-li:text-text-secondary
            prose-table:text-text-secondary prose-th:text-text-primary prose-th:border-white/10 prose-td:border-white/10">
            <MDXRemote source={post.content} />
          </article>

          {/* Footer */}
          <footer className="mt-16 pt-8 border-t border-white/10 flex items-center justify-between">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-text-secondary hover:text-accent-primary text-sm transition-colors"
            >
              <FiArrowLeft size={14} /> More posts
            </Link>
            <Link
              href="/#contact"
              className="text-sm font-medium text-accent-primary border border-accent-primary/30 px-4 py-2 rounded-full hover:bg-accent-primary hover:text-bg-primary transition-all"
            >
              Get in touch
            </Link>
          </footer>
        </div>
      </main>
    </>
  );
}
