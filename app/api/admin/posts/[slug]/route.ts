import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import { deleteBlogPost, getBlogPosts, saveBlogPost } from "@/lib/storage";
import type { BlogPost } from "@/lib/types";

export async function PUT(request: Request) {
  const isAuthed = await isAdminAuthenticated();
  if (!isAuthed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const post = (await request.json()) as BlogPost;
  await saveBlogPost(post);
  return NextResponse.json({ post, message: "Post updated." });
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const isAuthed = await isAdminAuthenticated();
  if (!isAuthed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { slug } = await params;
  await deleteBlogPost(slug);
  const posts = await getBlogPosts({ includeDrafts: true });
  return NextResponse.json({ posts, message: "Post deleted." });
}
