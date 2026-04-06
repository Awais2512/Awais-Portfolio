import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { readingTime } from "@/lib/utils";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

export interface PostMeta {
  slug:        string;
  title:       string;
  date:        string;
  description: string;
  tags:        string[];
  readingTime: number;
}

export interface Post extends PostMeta {
  content: string;
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx"));

  return files
    .map((file) => {
      const slug    = file.replace(/\.mdx$/, "");
      const source  = fs.readFileSync(path.join(BLOG_DIR, file), "utf8");
      const { data, content } = matter(source);

      return {
        slug,
        title:       data.title       ?? slug,
        date:        data.date        ?? "",
        description: data.description ?? "",
        tags:        data.tags        ?? [],
        readingTime: readingTime(content),
      } satisfies PostMeta;
    })
    .sort((a, b) => (a.date > b.date ? -1 : 1));
}

export function getPostBySlug(slug: string): Post | null {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const source = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(source);

  return {
    slug,
    title:       data.title       ?? slug,
    date:        data.date        ?? "",
    description: data.description ?? "",
    tags:        data.tags        ?? [],
    readingTime: readingTime(content),
    content,
  };
}

export function getAllTags(): string[] {
  const posts = getAllPosts();
  const tagSet = new Set<string>();
  posts.forEach((p) => p.tags.forEach((t) => tagSet.add(t)));
  return Array.from(tagSet).sort();
}
