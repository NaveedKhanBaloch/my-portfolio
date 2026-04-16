import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import { getBlogPosts, saveBlogPost } from "@/lib/storage";
import type { BlogPost } from "@/lib/types";

export async function POST(request: Request) {
  const isAuthed = await isAdminAuthenticated();
  if (!isAuthed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const post = (await request.json()) as BlogPost;
  await saveBlogPost(post);
  return NextResponse.json({ post, message: "Post created." });
}

export async function GET() {
  const posts = await getBlogPosts({ includeDrafts: true });
  return NextResponse.json({ posts });
}
