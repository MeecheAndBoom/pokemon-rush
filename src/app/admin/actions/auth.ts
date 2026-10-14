"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { connectDB } from "@/lib/db";
import { AdminUser } from "@/lib/models/AdminUser";
import { createSession, destroySession, getSession, verifyPassword } from "@/lib/auth";

export async function loginAction(formData: FormData) {
  const email = String(formData.get("email") || "").toLowerCase().trim();
  const password = String(formData.get("password") || "");
  const next = String(formData.get("next") || "/admin");

  if (!email || !password) {
    redirect("/admin/login?error=missing");
  }

  try {
    await connectDB();
  } catch {
    redirect("/admin/login?error=db");
  }

  const user = await AdminUser.findOne({ email }).lean();
  if (!user || !(await verifyPassword(password, user.passwordHash))) {
    redirect("/admin/login?error=invalid");
  }

  await createSession({
    sub: String(user._id),
    email: user.email,
    name: user.name || "Admin",
    role: user.role || "admin",
  });

  await AdminUser.updateOne({ _id: user._id }, { $set: { lastLoginAt: new Date() } });

  redirect(next.startsWith("/admin") ? next : "/admin");
}

export async function logoutAction() {
  await destroySession();
  redirect("/admin/login");
}

export async function requireSession() {
  const session = await getSession();
  if (!session) redirect("/admin/login");
  return session;
}

export async function refreshAdmin() {
  revalidatePath("/admin");
}
