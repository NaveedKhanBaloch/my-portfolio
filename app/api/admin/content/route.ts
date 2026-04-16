import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import { savePortfolioContent } from "@/lib/storage";
import type { PortfolioContent } from "@/lib/types";

export async function PUT(request: Request) {
  const isAuthed = await isAdminAuthenticated();
  if (!isAuthed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const content = (await request.json()) as PortfolioContent;
  await savePortfolioContent(content);
  return NextResponse.json({ message: "Site content saved." });
}
