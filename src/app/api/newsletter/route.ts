import { NextResponse } from "next/server";
import { z } from "zod";
import { connectDB } from "@/lib/db";
import { Submission } from "@/lib/models/Submission";

export const runtime = "nodejs";

const schema = z.object({
  email: z.string().email(),
});

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Enter a valid email address" }, { status: 400 });
  }

  try {
    await connectDB();
    await Submission.create({
      type: "newsletter",
      email: parsed.data.email,
      name: "",
      subject: "Newsletter signup",
      message: "Subscribed from the site footer.",
      status: "new",
    });
  } catch (err) {
    console.error("Newsletter signup failed", err);
    return NextResponse.json({ error: "Could not subscribe right now" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
