import { SiteShell } from "@/components/site-shell";
import { getBlogPosts, getPortfolioContent } from "@/lib/storage";

export default async function HomePage() {
  const [content, posts] = await Promise.all([
    getPortfolioContent(),
    getBlogPosts()
  ]);

  return <SiteShell content={content} posts={posts.slice(0, 3)} />;
}
