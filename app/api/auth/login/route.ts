import { NextResponse } from "next/server";
import { setAdminSession } from "@/lib/auth";

export async function POST(request: Request) {
  const { password } = (await request.json()) as { password?: string };
  const expectedPassword = process.env.ADMIN_PASSWORD;

  if (!expectedPassword) {
    return NextResponse.json(
      { error: "ADMIN_PASSWORD is not configured yet." },
      { status: 503 }
    );
  }

  if (!password || password !== expectedPassword) {
    return NextResponse.json({ error: "Invalid password." }, { status: 401 });
  }

  await setAdminSession();
  return NextResponse.json({ message: "Logged in successfully." });
}
