import Link from "next/link";
import { getAllPosts } from "@/lib/mdx";
import { formatDate } from "@/lib/utils";
import { FiArrowRight, FiClock, FiCalendar } from "react-icons/fi";

export default function Blog() {
  const posts = getAllPosts().slice(0, 3);

  return (
    <section id="blog" className="section-padding bg-bg-primary">
      <div className="container-max">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-accent-primary text-sm font-medium tracking-widest uppercase">
            Thoughts & Learnings
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mt-2">
            Blog
          </h2>
          <p className="text-text-secondary mt-3 max-w-xl mx-auto">
            Deep dives into AI engineering, production systems, and lessons learned building
            real products.
          </p>
        </div>

        {posts.length === 0 ? (
          <p className="text-center text-text-tertiary">No posts yet. Check back soon.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="card-base p-6 flex flex-col group hover:border-accent-primary/30 hover:accent-glow transition-all duration-300"
              >
                {/* Tags */}
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

                {/* Title */}
                <h3 className="text-text-primary font-bold text-base leading-snug mb-2 group-hover:text-accent-primary transition-colors flex-1">
                  {post.title}
                </h3>

                {/* Description */}
                <p className="text-text-secondary text-sm leading-relaxed mb-4 line-clamp-2">
                  {post.description}
                </p>

                {/* Meta */}
                <div className="flex items-center gap-4 text-text-tertiary text-xs mt-auto pt-3 border-t border-white/5">
                  <span className="flex items-center gap-1">
                    <FiCalendar size={11} />
                    {formatDate(post.date)}
                  </span>
                  <span className="flex items-center gap-1">
                    <FiClock size={11} />
                    {post.readingTime} min read
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-accent-primary border border-accent-primary/30 px-5 py-2.5 rounded-full hover:bg-accent-primary hover:text-bg-primary transition-all"
          >
            View All Posts <FiArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
