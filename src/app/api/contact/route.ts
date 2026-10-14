export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { z } from "zod";
import { sendMail, contactAutoReply, contactNotification } from "@/lib/emails";
import { connectDB } from "@/lib/db";
import { Submission } from "@/lib/models/Submission";

const schema = z.object({
  type: z.enum(["contact", "support", "specialist", "wholesale"]),
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  orderNumber: z.string().optional(),
  subject: z.string().optional(),
  message: z.string().min(1),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid form" }, { status: 400 });
    }

    const data = parsed.data;
    await connectDB();
    await Submission.create({ ...data });

    await sendMail({
      to: data.email,
      subject: "Pokemon Rush – We received your message",
      html: contactAutoReply(data.name),
    });

    await sendMail({
      to: "meecheandboom@gmail.com",
      subject: `New ${data.type} message`,
      html: contactNotification(data),
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to submit" }, { status: 500 });
  }
}
