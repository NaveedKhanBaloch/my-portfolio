import { kv } from "@vercel/kv";
import { seedBlogPosts, seedPortfolioContent } from "@/lib/seed";
import type { BlogPost, PortfolioContent } from "@/lib/types";

const CONTENT_KEY = "portfolio:content";
const POSTS_KEY = "portfolio:posts";

let memoryContent = structuredClone(seedPortfolioContent);
let memoryPosts = structuredClone(seedBlogPosts);

function hasKv() {
  return Boolean(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);
}

function sortPosts(posts: BlogPost[]) {
  return [...posts].sort((a, b) => {
    return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
  });
}

export function getStorageMode() {
  return hasKv() ? "vercel-kv" : "memory-demo";
}

export function isBlobConfigured() {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

export async function getPortfolioContent() {
  if (!hasKv()) {
    return memoryContent;
  }

  const stored = await kv.get<PortfolioContent>(CONTENT_KEY);
  if (!stored) {
    await kv.set(CONTENT_KEY, seedPortfolioContent);
    return seedPortfolioContent;
  }

  return stored;
}

export async function savePortfolioContent(content: PortfolioContent) {
  memoryContent = content;
  if (hasKv()) {
    await kv.set(CONTENT_KEY, content);
  }
  return content;
}

export async function getBlogPosts(options?: { includeDrafts?: boolean }) {
  let posts: BlogPost[];

  if (!hasKv()) {
    posts = memoryPosts;
  } else {
    const stored = await kv.get<BlogPost[]>(POSTS_KEY);
    if (!stored) {
      await kv.set(POSTS_KEY, seedBlogPosts);
      posts = seedBlogPosts;
    } else {
      posts = stored;
    }
  }

  const sorted = sortPosts(posts);
  if (options?.includeDrafts) {
    return sorted;
  }
  return sorted.filter((post) => post.status === "published");
}

export async function getBlogPost(slug: string, includeDraft = false) {
  const posts = await getBlogPosts({ includeDrafts: true });
  return posts.find((post) => post.slug === slug && (includeDraft || post.status === "published")) ?? null;
}

export async function saveBlogPost(post: BlogPost) {
  const posts = await getBlogPosts({ includeDrafts: true });
  const nextPosts = posts.filter((item) => item.slug !== post.slug).concat(post);
  memoryPosts = nextPosts;
  if (hasKv()) {
    await kv.set(POSTS_KEY, nextPosts);
  }
  return post;
}

export async function deleteBlogPost(slug: string) {
  const posts = await getBlogPosts({ includeDrafts: true });
  const nextPosts = posts.filter((post) => post.slug !== slug);
  memoryPosts = nextPosts;
  if (hasKv()) {
    await kv.set(POSTS_KEY, nextPosts);
  }
}
