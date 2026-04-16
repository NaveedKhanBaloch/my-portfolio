import { notFound } from "next/navigation";
import { BlogArticle } from "@/components/site-shell";
import { getBlogPost } from "@/lib/storage";

export default async function BlogPostPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  return <BlogArticle post={post} />;
}
