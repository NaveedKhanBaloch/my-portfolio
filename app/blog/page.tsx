import { BlogListing } from "@/components/site-shell";
import { getBlogPosts } from "@/lib/storage";

export default async function BlogPage() {
  const posts = await getBlogPosts();
  return <BlogListing posts={posts} />;
}
