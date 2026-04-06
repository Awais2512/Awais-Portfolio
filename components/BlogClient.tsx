"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import { FiClock, FiCalendar, FiSearch, FiArrowLeft } from "react-icons/fi";
import type { PostMeta } from "@/lib/mdx";

interface BlogClientProps {
  posts: PostMeta[];
  tags:  string[];
}

export default function BlogClient({ posts, tags }: BlogClientProps) {
  const [search,    setSearch]    = useState("");
  const [activeTag, setActiveTag] = useState("All");

  const filtered = useMemo(() => {
    return posts.filter((p) => {
      const matchesTag    = activeTag === "All" || p.tags.includes(activeTag);
      const matchesSearch =
        !search ||
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase());
      return matchesTag && matchesSearch;
    });
  }, [posts, activeTag, search]);

  return (
    <main className="min-h-screen bg-bg-primary pt-24 pb-20">
      <div className="container-max">
        {/* Back */}
        <Link
          href="/#blog"
          className="inline-flex items-center gap-2 text-text-secondary hover:text-accent-primary text-sm mb-10 transition-colors"
        >
          <FiArrowLeft size={14} /> Back to home
        </Link>

        {/* Header */}
        <div className="mb-12">
          <span className="text-accent-primary text-sm font-medium tracking-widest uppercase">
            All Posts
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-text-primary mt-2 mb-3">
            Blog
          </h1>
          <p className="text-text-secondary max-w-xl">
            Deep dives into AI engineering, production systems, and lessons learned.
          </p>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-text-tertiary" size={16} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search posts..."
            className="w-full max-w-md bg-bg-secondary border border-white/10 rounded-xl pl-10 pr-4 py-3 text-text-primary placeholder:text-text-tertiary text-sm focus:outline-none focus:border-accent-primary transition-colors"
          />
        </div>

        {/* Tag filter */}
        <div className="flex flex-wrap gap-2 mb-10">
          {["All", ...tags].map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                activeTag === tag
                  ? "bg-accent-primary text-bg-primary"
                  : "border border-white/10 text-text-secondary hover:border-accent-primary/50"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Posts */}
        {filtered.length === 0 ? (
          <p className="text-text-tertiary text-center py-20">
            No posts match your search.
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="card-base p-6 flex flex-col group hover:border-accent-primary/30 hover:accent-glow transition-all duration-300"
              >
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {post.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="text-xs text-accent-primary bg-accent-primary/10 border border-accent-primary/20 px-2 py-0.5 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h2 className="text-text-primary font-bold text-base leading-snug mb-2 group-hover:text-accent-primary transition-colors flex-1">
                  {post.title}
                </h2>
                <p className="text-text-secondary text-sm leading-relaxed mb-4 line-clamp-2">
                  {post.description}
                </p>
                <div className="flex items-center gap-4 text-text-tertiary text-xs mt-auto pt-3 border-t border-white/5">
                  <span className="flex items-center gap-1">
                    <FiCalendar size={11} /> {formatDate(post.date)}
                  </span>
                  <span className="flex items-center gap-1">
                    <FiClock size={11} /> {post.readingTime} min read
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
