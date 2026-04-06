import BlogClient from "@/components/BlogClient";
import { getAllPosts, getAllTags } from "@/lib/mdx";

export const metadata = {
  title: "Blog",
  description:
    "Deep dives into AI engineering, production systems, RAG, multi-agent orchestration, and lessons learned building real AI products.",
};

export default function BlogPage() {
  const posts = getAllPosts();
  const tags  = getAllTags();
  return <BlogClient posts={posts} tags={tags} />;
}
