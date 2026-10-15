"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { connectDB } from "@/lib/db";
import { digits } from "@/lib/settings";
import { Review } from "@/lib/models/Review";
import { Coupon } from "@/lib/models/Coupon";
import { PaymentMethod } from "@/lib/models/PaymentMethod";
import { BlogPost } from "@/lib/models/BlogPost";
import { Submission } from "@/lib/models/Submission";
import { AdminUser } from "@/lib/models/AdminUser";
import { SiteSetting } from "@/lib/models/SiteSetting";
import { createSession, hashPassword, verifyPassword } from "@/lib/auth";
import { requireSession } from "@/app/admin/actions/auth";

const str = (fd: FormData, key: string) => String(fd.get(key) || "").trim();
const num = (fd: FormData, key: string) => {
  const n = Number(str(fd, key).replace(/[^0-9.]/g, ""));
  return Number.isFinite(n) ? n : 0;
};
const slugify = (input: string) =>
  input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);

/* Reviews */

export async function setReviewStatusAction(fd: FormData) {
  await requireSession();
  await connectDB();
  await Review.updateOne({ _id: str(fd, "id") }, { $set: { status: str(fd, "status") } });
  revalidatePath("/admin/reviews");
  redirect("/admin/reviews");
}

export async function deleteReviewAction(fd: FormData) {
  await requireSession();
  await connectDB();
  await Review.deleteOne({ _id: str(fd, "id") });
  revalidatePath("/admin/reviews");
  redirect("/admin/reviews");
}

/* Coupons */

export async function createCouponAction(fd: FormData) {
  await requireSession();
  await connectDB();
  const code = str(fd, "code").toUpperCase();
  if (!code) redirect("/admin/coupons?error=code");
  try {
    await Coupon.create({
      code,
      type: str(fd, "type") || "percent",
      value: num(fd, "value"),
      minSubtotal: Math.round(num(fd, "minSubtotal") * 100),
      usageLimit: num(fd, "usageLimit"),
      active: true,
    });
  } catch {
    redirect("/admin/coupons?error=duplicate");
  }
  revalidatePath("/admin/coupons");
  redirect("/admin/coupons");
}

export async function toggleCouponAction(fd: FormData) {
  await requireSession();
  await connectDB();
  await Coupon.updateOne({ _id: str(fd, "id") }, { $set: { active: fd.get("active") === "1" } });
  revalidatePath("/admin/coupons");
  redirect("/admin/coupons");
}

export async function deleteCouponAction(fd: FormData) {
  await requireSession();
  await connectDB();
  await Coupon.deleteOne({ _id: str(fd, "id") });
  revalidatePath("/admin/coupons");
  redirect("/admin/coupons");
}

/* Payment methods */

export async function savePaymentMethodAction(fd: FormData) {
  await requireSession();
  await connectDB();
  const id = str(fd, "id");
  const label = str(fd, "label");
  const slug = str(fd, "slug") || slugify(label);
  const payload = {
    slug,
    label,
    description: str(fd, "description"),
    instructions: str(fd, "instructions"),
    order: num(fd, "order"),
    isActive: fd.get("isActive") === "on",
  };
  if (id) {
    await PaymentMethod.updateOne({ _id: id }, { $set: payload });
  } else {
    await PaymentMethod.create(payload);
  }
  revalidatePath("/admin/payment-methods");
  revalidatePath("/api/payment-methods");
  redirect("/admin/payment-methods");
}

export async function deletePaymentMethodAction(fd: FormData) {
  await requireSession();
  await connectDB();
  await PaymentMethod.deleteOne({ _id: str(fd, "id") });
  revalidatePath("/admin/payment-methods");
  redirect("/admin/payment-methods");
}

/* Blog */

export async function savePostAction(fd: FormData) {
  await requireSession();
  await connectDB();
  const id = str(fd, "id");
  const title = str(fd, "title");
  const payload = {
    title,
    slug: str(fd, "slug") || slugify(title),
    excerpt: str(fd, "excerpt"),
    content: str(fd, "content"),
    coverImage: str(fd, "coverImage"),
    category: str(fd, "category") || "Guides",
    author: str(fd, "author") || "PokéStore Direct",
    readingMinutes: num(fd, "readingMinutes") || 5,
    status: str(fd, "status") || "draft",
    publishedAt: str(fd, "status") === "published" ? new Date() : undefined,
  };
  if (id) {
    await BlogPost.updateOne({ _id: id }, { $set: payload });
  } else {
    await BlogPost.create(payload);
  }
  revalidatePath("/admin/blog");
  redirect("/admin/blog");
}

export async function deletePostAction(fd: FormData) {
  await requireSession();
  await connectDB();
  await BlogPost.deleteOne({ _id: str(fd, "id") });
  revalidatePath("/admin/blog");
  redirect("/admin/blog");
}

/* Submissions */

export async function setSubmissionStatusAction(fd: FormData) {
  await requireSession();
  await connectDB();
  await Submission.updateOne({ _id: str(fd, "id") }, { $set: { status: str(fd, "status") } });
  revalidatePath("/admin/submissions");
  redirect("/admin/submissions");
}

export async function deleteSubmissionAction(fd: FormData) {
  await requireSession();
  await connectDB();
  await Submission.deleteOne({ _id: str(fd, "id") });
  revalidatePath("/admin/submissions");
  redirect("/admin/submissions");
}

/* Settings */

export async function saveSiteSettingsAction(fd: FormData) {
  await requireSession();
  await connectDB();

  const whatsapp = digits(str(fd, "whatsapp"));

  await SiteSetting.updateOne(
    { key: "site" },
    {
      $set: {
        phone: str(fd, "phone"),
        whatsapp,
        whatsappMessage: str(fd, "whatsappMessage"),
        address: {
          line1: str(fd, "addressLine1"),
          line2: str(fd, "addressLine2"),
          city: str(fd, "addressCity"),
          country: str(fd, "addressCountry"),
        },
      },
    },
    { upsert: true }
  );

  revalidatePath("/", "layout");
  redirect("/admin/settings?saved=1");
}

export async function changeAdminEmailAction(fd: FormData) {
  const session = await requireSession();
  await connectDB();

  const email = str(fd, "email").toLowerCase();
  const password = str(fd, "password");

  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    redirect("/admin/settings?error=email");
  }

  const user = await AdminUser.findById(session.sub).lean();
  if (!user || !(await verifyPassword(password, user.passwordHash))) {
    redirect("/admin/settings?error=current");
  }

  if (email !== user.email) {
    const taken = await AdminUser.findOne({ email }).lean();
    if (taken) redirect("/admin/settings?error=taken");
  }

  await AdminUser.updateOne({ _id: session.sub }, { $set: { email } });
  await SiteSetting.updateOne({ key: "site" }, { $set: { adminEmail: email } }, { upsert: true });

  // Refresh the signed cookie so the session carries the new address.
  await createSession({ ...session, email });

  revalidatePath("/", "layout");
  redirect("/admin/settings?saved=email");
}

export async function changePasswordAction(fd: FormData) {
  const session = await requireSession();
  await connectDB();
  const current = str(fd, "current");
  const next = str(fd, "next");
  if (next.length < 8) redirect("/admin/settings?error=short");

  const user = await AdminUser.findById(session.sub).lean();
  if (!user || !(await verifyPassword(current, user.passwordHash))) {
    redirect("/admin/settings?error=current");
  }

  await AdminUser.updateOne(
    { _id: session.sub },
    { $set: { passwordHash: await hashPassword(next) } }
  );
  redirect("/admin/settings?changed=1");
}
