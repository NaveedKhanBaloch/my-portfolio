import { put } from "@vercel/blob";
import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import { isBlobConfigured } from "@/lib/storage";

export async function POST(request: Request) {
  const isAuthed = await isAdminAuthenticated();
  if (!isAuthed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!isBlobConfigured()) {
    return NextResponse.json(
      { error: "BLOB_READ_WRITE_TOKEN is not configured yet." },
      { status: 503 }
    );
  }

  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file uploaded." }, { status: 400 });
  }

  const blob = await put(`portfolio/${Date.now()}-${file.name}`, file, {
    access: "public",
    addRandomSuffix: true
  });

  return NextResponse.json({ url: blob.url, message: "Upload complete." });
}
